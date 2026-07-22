from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse,Register,FollowerResponse,Add_Follower
from app.crud.user import create_user,register_user,getUser,followUser,getFollower,getFollowings
from app.core.oauth2 import get_current_user
from typing import List
router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/")
def create_new_user(request: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, request)



@router.put("/register/{user_id}")
def registerUser(request:Register,user_id:int,db:Session=Depends(get_db),user:UserResponse=Depends(get_current_user)):
    return register_user(db,request,user_id)

@router.get("/{id}")
def  current_user(id:int,db:Session=Depends(get_db)):
    return getUser(db,id)


@router.post("/follow")
def follow_user(request:Add_Follower,db:Session=Depends(get_db)):
    return followUser(request,db)

@router.get("/follower/{user_id}",response_model=FollowerResponse)
def get_Follower(user_id,db:Session=Depends(get_db)):
    return getFollower(user_id,db)

@router.get("/following/{user_id}",response_model=FollowerResponse)
def get_Following(user_id:int,db:Session=Depends(get_db)):
    return getFollowings(user_id,db)