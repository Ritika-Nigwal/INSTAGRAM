from sqlalchemy.orm import Session

from app.models.comment import Comment
from app.schemas.comment import CommentCreate


def create_comment(db: Session, request: CommentCreate, user_id: int):
    new_comment = Comment(text=request.text, user_id=user_id, post_id=request.post_id)

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


def get_comments_by_post(db: Session, post_id: int):
    return db.query(Comment).filter(Comment.post_id == post_id).all()


def delete_comment(db: Session, comment_id: int, user_id: int):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()

    if not comment:
        return None

    if comment.user_id != user_id:
        return "Forbidden"

    db.delete(comment)
    db.commit()
    return True
