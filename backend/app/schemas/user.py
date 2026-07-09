from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    
    class Config:
        from_attributes = True

class Register(BaseModel):
    image_url:str
    Bio:str
    class Config:
        from_attributes=True

