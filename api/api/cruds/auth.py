# crud.py
from sqlalchemy.orm import Session
from ..models.auth import User
from ..schemes.auth import UserCreate,UserUpdate
from ..lib.auth.auth_utils import get_password_hash

def get_user_by_username(db: Session, user_name: str):
    print("get_user_by_username In crud.py",user_name)
    return db.query(User).filter(User.user_name == user_name).first()

def get_user_by_email(db: Session, email: str):
    print("get_user_by_username In crud.py",email)
    return db.query(User).filter(User.email == email).first()

"""
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
"""

def create_user(db: Session, user: UserCreate):
    db_user = User(
        user_name=user.user_name,
        email=user.email,
        #email = user.email,
        hashed_password=get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        if user.user_name is not None:
            db_user.user_name = user.user_name
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