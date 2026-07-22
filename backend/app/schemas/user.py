from pydantic import BaseModel, EmailStr

from typing import List
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class Register(BaseModel):
    image_url:str
    Bio:str
    class Config:
        from_attributes=True

class Add_Follower(BaseModel):
    follow:bool
    follower_id:int
    user_id:int
    class Config:
        from_attributes=True

class UserResponse(BaseModel):
    id: int
    username: str
    profile:str
    bio:str
    class Config:
        from_attributes = True

class FollowerResponse(BaseModel):
    user_id:int
    followers:List[UserResponse]
    class Config:
        from_attributes=True

