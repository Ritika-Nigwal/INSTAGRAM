from pydantic import BaseModel
from sqlalchemy import DateTime
from datetime import datetime

class CommentCreate(BaseModel):
    text: str
    post_id: int

class CommentResponse(BaseModel):
    id: int
    text: str
    timestamp:datetime

    class Config:
        from_attribute = True