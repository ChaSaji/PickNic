# crud.py
from sqlalchemy.orm import Session
#from api.models.mobile import MobileUser
from api.models.database_models import Photo,Photo2MobileUser,MobileUser
from api.schemes.mobile import MobileCreate,MobileUpdate,Mobile
from api.schemes.photo2user import Photo2User,Photo2UserCreate,Photo2UserUpdate
from api.lib.auth.auth_utils import get_password_hash
from datetime import datetime


def get_photo2Mobile_Relation_by_id(db: Session, id: int):
    print("get_photo2Mobile_Relation_by_id In crud.py",id)
    return db.query(Photo2MobileUser).filter(Photo2MobileUser.id == id).first()

def get_photo2Mobile_Relation_by_photo_id(db: Session, id: int):
    print("get_photo2Mobile_Relation_by_photo_id In crud.py",id)
    return db.query(Photo2MobileUser).filter(Photo2MobileUser.photo_id == id).all()

def get_photo2Mobile_Relation_by_mobile_id(db: Session, id: str):
    print("get_photo2Mobile_Relation_by_mobile_id In crud.py",id)
    return db.query(Photo2MobileUser).filter(Photo2MobileUser.user_id == id).all()

def create_photo2Mobile(db: Session, newItem: Photo2UserCreate):    
    #print("create:",new_id,user)
    db_user = Photo2MobileUser(
        photo_id=newItem.photo_id,
        user_id=newItem.user_id
    )
    #print("add")
    db.add(db_user)
    #print("comit")
    db.commit()
    #print("refresh")
    db.refresh(db_user)
    #print("fin")
    return db_user

def update_photo2Mobile_Relation_by_id(db: Session, UpdateItem:Photo2UserUpdate):
    db_user = db.query(Photo2MobileUser).filter(Photo2MobileUser.id == UpdateItem.id).first()
    if db_user:
        db_user.user_id = UpdateItem.user_id
        db_user.photo_id = UpdateItem.photo_id
            
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_photo2mobile_by_id(db: Session, id: int):
    db_user = db.query(Photo2MobileUser).filter(Photo2MobileUser.id == id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

def delete_photo2mobile_by_mobile_id(db: Session, user_id: str):
    db_users = db.query(Photo2MobileUser).filter(Photo2MobileUser.user_id == user_id).all()
    if not db_users:
        return False
    for user in db_users:
        db.delete(user)
    db.commit()
    return db_users

def delete_photo2mobile_by_photo_id(db: Session, photo_id: int):
    db_users = db.query(Photo2MobileUser).filter(Photo2MobileUser.photo_id == photo_id).all()
    if not db_users:
        return False
    for user in db_users:
        db.delete(user)
    db.commit()
    return db_users