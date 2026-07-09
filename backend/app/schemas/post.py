from pydantic import BaseModel
from datetime import datetime
from typing import List

from app.schemas.comment import CommentResponse


class PostCreate(BaseModel):
    image_url: str
    image_url_type: str
    caption: str
    creator_id: int


class UserResponse(BaseModel):
    id:int
    username: str
    profile:str
    class Config:
        from_attribute = True


class PostResponse(BaseModel):
    id: int
    image_url: str
    image_url_type: str
    caption: str
    timestamp: datetime
    user: UserResponse
    comments: List[CommentResponse]

    class Config:
        from_attribute = True
