from app.db.session import Base
from sqlalchemy import Column,String,Integer
class Followers(Base):
    __tablename__="followers"
    id=Column(Integer,primary_key=True,index=True)
    current_user=Column(Integer)
    user_id=Column(Integer)
