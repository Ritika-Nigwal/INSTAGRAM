from app.db.session import Base
from sqlalchemy import Column,String,Integer,ForeignKey,Boolean
from sqlalchemy.orm import relationship
class Likes(Base):
    __tablename__="likes"
    id=Column(Integer,primary_key=True,index=True)
    like=Column(Boolean)
    post_id=Column(Integer,ForeignKey("posts.id"))
    user_id=Column(Integer,ForeignKey("users.id"))
    user=relationship("User",back_populates="likes")
    post=relationship("Post",back_populates="like")