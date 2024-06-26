# crud.py
from sqlalchemy.orm import Session
from .database import User
from .schemas import UserCreate
from .auth_utils import get_password_hash

def get_user_by_username(db: Session, username: str):
    print("get_user_by_username In crud.py",username)
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
