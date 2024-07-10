# main.py
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import timedelta

from ..models.auth import SessionLocal, engine,Base
from ..schemes.auth import UserCreate, UserUpdate, User
from ..cruds.auth import get_user_by_username,get_user_by_email, create_user,update_user,delete_user
from ..lib.auth.auth_utils import verify_password
from ..lib.auth.token_utils import create_access_token, decode_access_token,add_token_to_blacklist,is_token_in_blacklist,ACCESS_TOKEN_EXPIRE_MINUTES
# データベースの初期化
from dotenv import load_dotenv
import os

from fastapi import Form

class OAuth2EmailRequestForm:
    def __init__(
        self,
        grant_type: str = Form(None, regex="password"),
        username: str = Form("email"),  # ここを email に変更できます
        password: str = Form(...),
        scope: str = Form(""),
        client_id: str = Form(None),
        client_secret: str = Form(None),
    ):
        self.grant_type = grant_type
        self.username = username  # ここがメールアドレスを受け取る部分です
        self.password = password
        self.scopes = scope.split()
        self.client_id = client_id
        self.client_secret = client_secret

# .envファイルを読み込む
load_dotenv()
# 環境変数の取得
database_url = os.getenv('DATABASE_URL')
print(database_url)
if not os.path.exists(database_url):
    Base.metadata.create_all(bind=engine)

#app = FastAPI()
router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/auth/users/", response_model=User)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    print("print:",user)
    db_user = get_user_by_username(db, user.user_name)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    db_email = get_user_by_email(db, user.email)
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return create_user(db, user)

@router.post("/auth/login", response_model=dict)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    #user = get_user_by_username(db, form_data.username)
    user = get_user_by_email(db,form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.user_name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if is_token_in_blacklist(token):
        print("Token is in blacklist")
        raise credentials_exception
    try:
        payload = decode_access_token(token)
        if payload is None:
            print("Failed to decode token")
            raise credentials_exception
        print(f"Payload: {payload}")
        username: str = payload.get("sub")
        if username is None:
            print("Username not found in payload")
            raise credentials_exception
    except JWTError as e:
        print(f"JWTError: {e}")
        raise credentials_exception
    except Exception as e:
        print(f"Error: {e}")
        raise credentials_exception
    user = get_user_by_username(db, username)
    if user is None:
        print(f"User not found: {username}")
        raise credentials_exception
    return user

@router.post("/auth/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    add_token_to_blacklist(token)
    return {"message": "Successfully logged out"}

@router.get("/auth/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# 更新エンドポイントの追加
@router.put("/auth/users/update/{user_id}", response_model=User)
async def update_user_endpoint(user_id: int, user: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_user = update_user(db, user_id, user)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# 削除エンドポイントの追加
@router.delete("/auth/users/delete/{user_id}", response_model=User)
async def delete_user_endpoint(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_user = delete_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/auth/current_token/", response_model=dict)
async def login_for_access_token(token: str = Depends(oauth2_scheme)):
    return {"access_token": token}