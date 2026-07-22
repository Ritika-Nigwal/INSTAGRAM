from app.db.session import Base
from sqlalchemy import Column,String,Integer,Boolean,ForeignKey
from sqlalchemy.orm import relationship
class Followers(Base):
    __tablename__="followers"
    id=Column(Integer,primary_key=True,index=True)
    follow=Column(Boolean,default=False)
    follower_id=Column(Integer,ForeignKey("users.id"))
    user_id=Column(Integer,ForeignKey("users.id"))
    user1=relationship("User",foreign_keys=[user_id],back_populates="follower_id_1")
    user2=relationship("User",foreign_keys=[follower_id],back_populates="followed_id_2")
