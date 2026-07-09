from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse,Register
from app.crud.user import create_user,register_user,getUser
from app.core.oauth2 import get_current_user

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


