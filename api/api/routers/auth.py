from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError
from datetime import timedelta
from api.schemes.auth import UserCreate, UserUpdate, User, UserResponse, LoginResponse, BelongedOrganization, UsersResponse
from api.cruds.auth import get_user_by_username, get_user_by_email, create_user,update_user,delete_user, get_user_list_by_organization_id
from api.lib.auth.auth_utils import verify_password
from api.lib.auth.token_utils import create_access_token, decode_access_token,add_token_to_blacklist,is_token_in_blacklist,ACCESS_TOKEN_EXPIRE_MINUTES
from api.database import get_db
from api.cruds.event import get_organization
from api.dependencies.auth import oauth2_scheme, get_current_user, get_belonged_organization


router = APIRouter()

@router.post("/auth/users/", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db), belonged_organization: BelongedOrganization = Depends(get_belonged_organization)):
    db_user = get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    db_email = get_user_by_email(db, user.email)
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, user, belonged_organization.organization_id)
    return UserResponse(
        organization_name=belonged_organization.organization_name,
        **user.__dict__
    )

@router.post("/auth/login", response_model=LoginResponse)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    organization = get_organization(db, user.organization_id)
    return LoginResponse(
        access_token=access_token,
        organization_name=organization.name,
        **user.__dict__,
    )

@router.post("/auth/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    add_token_to_blacklist(token)
    return {"message": "Successfully logged out"}

@router.get("/auth/users/me", response_model=UserResponse)
async def read_users_me(belonged_organization: BelongedOrganization = Depends(get_belonged_organization)):
    return UserResponse(**belonged_organization.__dict__)

# 更新エンドポイントの追加
@router.put("/auth/users/update/{user_id}", response_model=User)
async def update_user_endpoint(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = update_user(db, user_id, user)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# 削除エンドポイントの追加
@router.delete("/auth/users/delete/{user_id}", response_model=User)
async def delete_user_endpoint(user_id: int, db: Session = Depends(get_db)):
    db_user = delete_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/auth/current_token/", response_model=dict)
async def login_for_access_token(token: str = Depends(oauth2_scheme)):
    return {"access_token": token}

@router.get("/auth/users/", response_model=UsersResponse)
async def read_users(db: Session = Depends(get_db), belonged_organization: BelongedOrganization = Depends(get_belonged_organization)):
    user_list = get_user_list_by_organization_id(db, belonged_organization.organization_id)
    print(user_list[0].username)
    return UsersResponse(users=user_list)