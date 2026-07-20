from sqlalchemy.orm import Session

from app.models.post import Post
from app.models.like import Likes
from app.schemas.post import PostCreate
from fastapi import HTTPException ,status
import datetime
from app.schemas.post import likeSchema
from typing import Optional

def create_post(db: Session, request: PostCreate):
    new_post = Post(
        image_url=request.image_url,
        image_url_type=request.image_url_type,
        caption=request.caption,
        timestamp=datetime.datetime.utcnow(),
     
        user_id=request.creator_id,
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db:Session):
    return db.query(Post).all()

def get_current_user_post(db:Session,user_id:int):
    post=db.query(Post).filter(Post.user_id==user_id).all()
    if not post :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    return post

def delete_post(db: Session, post_id: int, user_id: int):
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        return None

    if post.user_id != user_id:
        return "Forbidden"

    db.delete(post)
    db.commit()
    return True

def postLike(post_id:int,user_id:int,state:Optional[bool],db:Session):
    user=db.query(Likes).filter(Likes.post_id==post_id,Likes.user_id==user_id).first()
    if user:
        user.like=state
        db.commit()
        db.refresh(user)
        return state
    like=Likes(like=state,post_id=post_id,user_id=user_id)
    db.add(like)
    db.commit()
    db.refresh(like)
