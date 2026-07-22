from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    profile=Column(String,nullable=True)
    bio=Column(String,nullable=True)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    followers=Column(Integer,default=0)
    following=Column(Integer,default=0)
    posts = relationship("Post", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    likes=relationship("Likes",back_populates="user")
    follower_id_1=relationship("Followers",foreign_keys="[Followers.user_id]",back_populates="user1")
    followed_id_2=relationship("Followers",foreign_keys="[Followers.follower_id]",back_populates="user2")


