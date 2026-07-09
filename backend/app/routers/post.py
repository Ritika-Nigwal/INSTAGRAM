from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File,Query
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.post import PostCreate, PostResponse
from app.crud.post import create_post, get_all_posts, delete_post,get_current_user_post

from app.schemas.user import UserResponse
from app.core.oauth2 import get_current_user
from app.crud.uploadVideo import videoUpload

import os
import string
import random
import shutil

router = APIRouter(prefix="/posts", tags=["Posts"])

IMAGE_URL_TYPES = ["absolute", "relative"]
UPLOAD_DIR = "images"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/", response_model=PostResponse)
def create_new_post(
    request: PostCreate,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    if request.image_url_type not in IMAGE_URL_TYPES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="image_url_type must be absolute or relative",
        )

    return create_post(db, request)


@router.get("/", response_model=List[PostResponse])
def get_posts(db: Session = Depends(get_db),get_user:UserResponse=Depends(get_current_user)):
    return get_all_posts(db)

@router.get("/user/{id}")
def getCurrentUserPost(id:int,db:Session=Depends(get_db),user:UserResponse=Depends(get_current_user)):
    return get_current_user_post(db,id)

@router.delete("/{post_id}")
def delete_existing_post(
    post_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    result = delete_post(db=db, post_id=post_id, user_id=user_id)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post with id {post_id} not found",
        )

    if result == "Forbidden":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only creator can delete this post",
        )

    return {"message": "Post deleted successfully"}


@router.post("/image")
def upload_image(
    image: UploadFile = File(...),
    current_user: UserResponse = Depends(get_current_user),
):
    letters = string.ascii_letters
    rand_str = "".join(random.choice(letters) for _ in range(6))
    filename = image.filename
    extension = filename.split(".")[-1]
    new_filename = f"{rand_str}.{extension}"
    path = f"{UPLOAD_DIR}/{new_filename}"

    with open(path, "wb+") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {"filename": path}
@router.post("/video")
def video_upload(video:UploadFile=File(...),user:UploadFile=Depends(get_current_user)):
    return videoUpload(video)