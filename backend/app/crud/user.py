from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate,Register
from app.core.security import Hash
from fastapi import HTTPException,status
from app.sendEmail import sendEmail
def create_user(db: Session, request: UserCreate):
    new_user = User(
        username=request.username,
        profile="",
        bio="Tell us about yourself😊😊😊....",
        email=request.email,
        password=Hash.bcrypt(request.password),
    )
    existing_user=db.query(User).filter(User.username==request.username and User.email==request.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="username or email already exists")
    if not new_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Unprocessable content..")
    # success=sendEmail({"username":request.username,"email":request.email},"user created successFully !!!!")
    # if not success:
    #     raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,detail="Please enter VAlid email...")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"new_user":new_user,"detail":"user created successfully"}

def getUser(db:Session,id:int):
    user=db.query(User).filter(User.id==id).first()
    return {"id":user.id,"profile":user.profile,"bio":user.bio,"username":user.username}

def register_user(db:Session,request:Register,user_id:int):
    db.query(User).filter(User.id==user_id).update({User.profile:request.image_url,User.bio:request.Bio})
    db.commit()
    user=db.query(User).filter(User.id==user_id).first()
    return user