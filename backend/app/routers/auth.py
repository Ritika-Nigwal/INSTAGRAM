from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import Hash
from app.core.oauth2 import create_access_token
from app.db.session import get_db
from app.sendEmail import sendEmail
router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
def login(
    request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == request.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not Hash.verify(user.password,request.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # success=sendEmail({"username":user.username,"email":user.email},"loginned successfully!!")
    # if not success:
    #     raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED,detail=success);
    access_token = create_access_token(data={"username": user.username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "username": user.username,
        "bio":user.bio,
        "detail":"Loginned SuccessFull"
    }
