from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.comment import CommentCreate, CommentResponse
from app.crud.comment import create_comment, get_comments_by_post, delete_comment
from app.schemas.user import UserResponse
from app.core.oauth2 import get_current_user

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.get("/{post_id}")
def get_comments(post_id: int, db: Session = Depends(get_db)):
    return get_comments_by_post(db, post_id)


@router.post("/", response_model=CommentResponse)
def add_comment(
    request: CommentCreate,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    return create_comment(db, request, user_id=current_user.id)


@router.delete("/{comment_id}")
def deleteComment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    return delete_comment(db, comment_id, user_id=current_user.id)
