from sqlalchemy.orm import Session
from api.models.database_models import User
from api.schemes.auth import UserCreate,UserUpdate
from api.lib.auth.auth_utils import get_password_hash

def get_user_by_username(db: Session, username: str):
    print("get_user_by_username In crud.py",username)
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(
        username=user.username,
        email=user.email,
        organization_id=user.organization_id,
        hashed_password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        if user.username is not None:
            db_user.username = user.username
        if user.email is not None:
            db_user.email = user.email
        if user.password is not None:
            db_user.hashed_password = get_password_hash(user.password)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user