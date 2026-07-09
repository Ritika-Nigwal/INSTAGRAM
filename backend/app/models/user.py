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
    posts = relationship("Post", back_populates="user")
    comments = relationship("Comment", back_populates="user")

