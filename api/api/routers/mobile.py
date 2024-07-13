# main.py
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import timedelta

from ..models.mobile import SessionLocal, engine,Base
from ..schemes.mobile import MobileCreate, MobileUpdate, Mobile,MobileIdAsk
from ..cruds.mobile import get_mobile_user_by_Id,create_mobile_user,get_mobile_user_all,delete_mobile_user_by_id,delete_mobile_user_by_name
# データベースの初期化
from dotenv import load_dotenv
import os
from typing import List
# .envファイルを読み込む
load_dotenv()
# 環境変数の取得
database_url = os.getenv('DATABASE_URL')
print(database_url)
if not os.path.exists(database_url):
    Base.metadata.create_all(bind=engine)
#app = FastAPI()
router = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.post("/mobile/create_user/", response_model=Mobile)
def register_user(user: MobileCreate, db: Session = Depends(get_db)):
    print("print:",user)
    return create_mobile_user(db, user)


@router.get("/mobile/users/", response_model=List[Mobile])
def register_user(db: Session = Depends(get_db)):
    userlist=get_mobile_user_all(db)
    return userlist


@router.post("/mobile/user/", response_model=Mobile)
def create_user(mobileuser: MobileIdAsk, db: Session = Depends(get_db)):
    mobile_user = get_mobile_user_by_Id(db,mobileuser.id)
    if mobile_user is None:
         raise HTTPException(status_code=404, detail="User not found")
    return mobile_user 

@router.post("/mobile/user/", response_model=Mobile)
def create_user(mobileuser: MobileIdAsk, db: Session = Depends(get_db)):
    mobile_user = get_mobile_user_by_Id(db,mobileuser.id)
    if mobile_user is None:
         raise HTTPException(status_code=404, detail="User not found")
    return mobile_user 

@router.delete("/mobile/user/By_id", response_model=Mobile)
def create_user(mobileuser: MobileIdAsk, db: Session = Depends(get_db)):
    mobile_user = delete_mobile_user_by_id(db,mobileuser.id)
    if mobile_user is None:
         raise HTTPException(status_code=404, detail="User not found")
    return mobile_user 

@router.delete("/mobile/user/By_name", response_model=List[Mobile])
def create_user(mobileuser: MobileCreate, db: Session = Depends(get_db)):
    mobile_user = delete_mobile_user_by_name(db,mobileuser.name)
    if mobile_user is None:
         raise HTTPException(status_code=404, detail="User not found")
    return mobile_user 


