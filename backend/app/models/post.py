from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

import datetime


class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    image_url_type = Column(String, nullable=False)
    caption = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    likes=Column(Integer,default=0)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")
    like=relationship("Likes",back_populates="post")

