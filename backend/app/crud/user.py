from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate,Register
from app.core.security import Hash
from fastapi import HTTPException,status
from app.models.followers import Followers
from app.schemas.user import FollowerResponse,Add_Follower
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
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="user already exists  ")
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
    return {"id":user.id,"profile":user.profile,"bio":user.bio,"username":user.username,"followers":user.followers,"following":user.following}

def register_user(db:Session,request:Register,user_id:int):
    db.query(User).filter(User.id==user_id).update({User.profile:request.image_url,User.bio:request.Bio})
    db.commit()
    user=db.query(User).filter(User.id==user_id).first()
    return user

def followUser(request:Add_Follower,db:Session):
    isExist=db.query(Followers).filter(Followers.follower_id==request.follower_id , Followers.user_id==request.user_id).first()
    if isExist:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=403)
    follower=Followers(follow=request.follow,follower_id=request.follower_id,user_id=request.user_id)
    followed_user=db.query(User).filter(User.id==request.user_id).first()
    follower_user=db.query(User).filter(User.id==request.follower_id).first()
    followed_user.followers=followed_user.followers+1
    follower_user.following=follower_user.following+1
    db.add(follower)
    db.commit()
    db.refresh(follower)
    return {"detail":"you followed the user"}

def getFollower(user_id: int, db: Session):
    follower_rows = db.query(Followers).filter(Followers.user_id == user_id).all()
    if not follower_rows:
        raise HTTPException(status_code=404, detail="No followers found")
    follower_users = [f.user2 for f in follower_rows]

    return {
        "user_id": user_id,
        "followers": follower_users
    }

def getFollowings(user_id:int,db:Session):
    followings=db.query(Followers).filter(Followers.follower_id==user_id).all()
    return {
        "user_id":user_id,
        "followers":[f.user1 for f in followings]
    }