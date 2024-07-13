# crud.py
from sqlalchemy.orm import Session
#from ..models.mobile import MobileUser
from ..models.database_models import MobileUser
from ..schemes.mobile import MobileCreate,MobileUpdate,MobileCommit,Mobile
from ..lib.auth.auth_utils import get_password_hash
from datetime import datetime

def get_mobile_user_all(db: Session):
    return db.query(MobileUser).all()

def get_mobile_user_by_Id(db: Session, id: str):
    print("get_user_by_username In crud.py",id)
    return db.query(MobileUser).filter(MobileUser.id == id).first()

def create_mobile_user(db: Session, user: MobileCreate):
    
    new_id=get_password_hash(user.name+str(datetime.now()))
    while(None != db.query(MobileUser).filter(MobileUser.id == new_id).first()):
        new_id=get_password_hash(new_id+str(1))
        print(db.query(MobileUser).filter(MobileUser.id == new_id).first())
        print(new_id)
    
    #print("create:",new_id,user)
    db_user = MobileUser(
        id=new_id,
        name=user.name
    )
    #print("add")
    db.add(db_user)
    #print("comit")
    db.commit()
    #print("refresh")
    db.refresh(db_user)
    #print("fin")
    return db_user

def update_mobile_user(db: Session, user_id: int, user: MobileUpdate):
    db_user = db.query(MobileUser).filter(MobileUser.id == user_id).first()
    if db_user:
        if user.name is not None:
            db_user.name = user.email
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_mobile_user_by_id(db: Session, user_id: str):
    db_user = db.query(MobileUser).filter(MobileUser.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

def delete_mobile_user_by_name(db: Session, user_name: str):
    db_users = db.query(MobileUser).filter(MobileUser.name == user_name).all()
    if not db_users:
        return False
    for user in db_users:
        db.delete(user)
    db.commit()
    return db_users
