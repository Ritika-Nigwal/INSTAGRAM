from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File,Query
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.post import PostCreate, PostResponse,likeSchema,LikePostSchema
from app.crud.post import create_post, get_all_posts, delete_post,get_current_user_post,postLike
from app.core.imageUpload import upload_image
from app.schemas.user import UserResponse
from app.core.oauth2 import get_current_user
from app.crud.uploadVideo import videoUpload
from dotenv import load_dotenv
from app.models.post import Post
from typing import Optional
from app.models.like import Likes
import os
import string
import random
import shutil
load_dotenv() 
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
@router.patch("/like/{post_id}")
def likes(request:likeSchema,db:Session=Depends(get_db)):
    post=db.query(Post).filter(Post.id==request.post_id).first()
    if not post:
        return "hello"
    like=request.model_dump(exclude_unset=True)
    for key,value in like.items():
        setattr(post,key,value)
    db.commit()
    db.refresh(post)
    return {"likes":like}

@router.delete("/{post_id}")
def delete_existing_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user),
):
    result = delete_post(db=db, post_id=post_id, user_id=current_user.id)

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
async def uploadImage(
    image: UploadFile = File(...),
    current_user: UserResponse = Depends(get_current_user),
):
    return await upload_image(image)

@router.post("/video")
def video_upload(video:UploadFile=File(...),user:UploadFile=Depends(get_current_user)):
    return videoUpload(video)

@router.post("/likes")
def likePost(request:LikePostSchema,db:Session=Depends(get_db)):
    return postLike(request.post_id,request.user_id,request.state,db)

@router.get("/like/{post_id}/{user_id}")
def getLike(post_id:int,user_id:int,db:Session=Depends(get_db)):
    likes=db.query(Likes).filter(Likes.post_id==post_id , Likes.user_id==user_id).first()
    if not likes :
        return {"liked":False}
    return {"liked":likes.like}