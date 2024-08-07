# crud.py
from sqlalchemy.orm import Session
#from api.models.mobile import MobileUser
from api.models.database_models import Photo,Photo2MobileUser, MobileUser
from api.schemes.photo2user import Photo2UserCreate, Photo2UserUpdate
from api.lib.r2.upload_image_to_s3 import upload_image_to_s3
from api.cruds.mobile import get_mobile_photo_by_id, get_mobile_user_by_Id
import os

def get_photo2Mobile_Relation_by_id(db: Session, id: int):
    print("get_photo2Mobile_Relation_by_id In crud.py",id)
    return db.query(Photo2MobileUser).filter(Photo2MobileUser.id == id).first()

def get_photo2Mobile_Relation_by_photo_id(db: Session, id: int):
    print("get_photo2Mobile_Relation_by_photo_id In crud.py",id)
    return db.query(Photo2MobileUser).filter(Photo2MobileUser.photo_id == id).all()

def get_photo2Mobile_Relation_by_mobile_id(db: Session, id: str):
    print("get_photo2Mobile_Relation_by_mobile_id In crud.py",id)
    return db.query(Photo2MobileUser).filter(Photo2MobileUser.user_id == id).all()

def get_photo2Mobile_Relation_by_user_and_event(db: Session, user_id: str, event_id: int):
    photo_ids_subquery = db.query(Photo2MobileUser.photo_id).filter(Photo2MobileUser.user_id == user_id).subquery()
    return (db.query(Photo2MobileUser)
        .join(Photo, Photo2MobileUser.photo_id == Photo.id)
        .filter(Photo2MobileUser.photo_id.in_(photo_ids_subquery), Photo.event_id == event_id)
        .first())

def create_photo2Mobile(db: Session, newItem: Photo2UserCreate):
    #print("create:",new_id,user)
    db_user = Photo2MobileUser(
        photo_id=newItem.photo_id,
        user_id=newItem.user_id,
        score=newItem.score
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
        db_user.score = UpdateItem.score

        db.commit()
        db.refresh(db_user)
    return db_user


def update_user_photo(db:Session, contents:bytes, user_id:str, event_id:int):

    mobile_user= get_mobile_user_by_Id(db, user_id)
    if mobile_user is None:
        raise ValueError(f"No user found for user_id {user_id} in update_user_photo()")
    user_name = mobile_user.name

    file_key = f"{event_id}/user-photos/{user_name}.jpg"
    upload_image_to_s3(file_key, body=contents)

    photo = get_mobile_photo_by_id(db, mobile_user.id)
    if photo is None:
        raise ValueError(f"No photo found for mobile_user {mobile_user}")
    photo.pass_2_photo = file_key

    db.commit()
    db.refresh(photo)
    return file_key


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


def get_potho_ranking(db: Session, event_id:int):
    rankings=(db.query(Photo.id,Photo2MobileUser.user_id,Photo2MobileUser.score, MobileUser.name)
              .filter(Photo.event_id == event_id)
              .join(Photo2MobileUser,Photo.id == Photo2MobileUser.photo_id)
              .join(MobileUser, Photo2MobileUser.user_id == MobileUser.id)
              .order_by(Photo2MobileUser.score.desc())
              .limit(10)
              .all())
    return rankings