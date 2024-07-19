# main.py
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from jose import JWTError, jwt
from api.models.database_models import Base
from api.schemes.mobile import MobileCreate, MobileUpdate, Mobile,MobileIdAsk
from api.schemes.photo2user import Photo2User,Photo2UserCreate,Photo2UserUpdate
from api.cruds.mobile import get_mobile_user_by_Id,create_mobile_user,get_mobile_user_all,delete_mobile_user_by_id,delete_mobile_user_by_name, get_event_list_for_mobile, get_event_detail_for_mobile
from api.cruds.photo2user import get_photo2Mobile_Relation_by_id,get_photo2Mobile_Relation_by_mobile_id,get_photo2Mobile_Relation_by_photo_id,create_photo2Mobile,update_photo2Mobile_Relation_by_id,delete_photo2mobile_by_id,delete_photo2mobile_by_mobile_id,delete_photo2mobile_by_photo_id, update_user_photo
from api.database import engine, get_db
from pydantic import BaseModel
from typing import List, Union
import api.schemes.event as event_schema
from fastapi import UploadFile, File
from api.lib.akaze import akaze
from pathlib import Path
import aiofiles


router = APIRouter()

inspector = inspect(engine)

# テーブルの存在確認
table_name = 'photo2mobileuser'
if not inspector.has_table(table_name):
    # テーブルが存在しない場合は作成
    Base.metadata.create_all(engine)
    print(f"Table '{table_name}' has been created.")
else:
    print(f"Table '{table_name}' already exists.")

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

# Pydanticモデルを使用してリクエストボディを定義
class NumberData(BaseModel):
    number: int
    
@router.post("/mobile/testrelation")
async def create_user(num: NumberData,db: Session = Depends(get_db)):
    print("xxxxxxx",num.number)
    message=""
    if(num.number==0):
        message="create"
    
        print("number:0")
        newItem=Photo2UserCreate
        newItem.user_id="testUserId"
        newItem.photo_id=123456789
        create_photo2Mobile(db,newItem)
        
        newItem.user_id="Id1"
        newItem.photo_id=10
        create_photo2Mobile(db,newItem)
        
        newItem.user_id="Id1"
        newItem.photo_id=11
        create_photo2Mobile(db,newItem)
        
        newItem.user_id="Id2"
        newItem.photo_id=2
        create_photo2Mobile(db,newItem)
        
        newItem.user_id="Id3"
        newItem.photo_id=2
        create_photo2Mobile(db,newItem)
        
        newItem.user_id="testUserId"
        newItem.photo_id=111
        create_photo2Mobile(db,newItem)
        
        newItem.user_id="Id4"
        newItem.photo_id=123456789
        create_photo2Mobile(db,newItem)
        litResult=get_photo2Mobile_Relation_by_mobile_id(db,newItem.user_id)
        for x in litResult:
            print("id",x.id,"userId,",x.user_id,"photoId",x.photo_id)
    elif(num.number==1):
        message="read"
    
        print("number:1")
        newItem=Photo2User
        newItem.id=1
        newItem.photo_id=123456789
        newItem.user_id="testUserId"
        litResult=get_photo2Mobile_Relation_by_mobile_id(db,newItem.user_id)
        for x in litResult:
            print("id",x.id,"userId,",x.user_id,"photoId",x.photo_id)
        litResult=get_photo2Mobile_Relation_by_photo_id(db,newItem.photo_id)
        for x in litResult:
            print("id",x.id,"userId,",x.user_id,"photoId",x.photo_id)
        x=get_photo2Mobile_Relation_by_id(db,newItem.id)
        #print(x)
        if not x==None:
            print("id=",x.id,",userId=",x.user_id,",photoId=",x.photo_id)
        else:
            print("id=",newItem.id,"is",x)
        
    elif(num.number==2):
        message="update"
    
        print("number:2")
        newItem=Photo2UserUpdate
        newItem.id=1
        newItem.user_id="updatedId"
        newItem.photo_id=987654321
        update_photo2Mobile_Relation_by_id(db,newItem)
    elif(num.number==3):
        message="delete"
    
        print("number:3")
        newItem=Photo2User
        newItem.id=1
        newItem.photo_id=123456789
        newItem.user_id="testUserId"

        delete_photo2mobile_by_id(db,newItem.id)
        delete_photo2mobile_by_mobile_id(db,newItem.user_id)
        delete_photo2mobile_by_photo_id(db,newItem.photo_id)
        litResult=get_photo2Mobile_Relation_by_mobile_id(db,newItem.user_id)
        for x in litResult:
            print("id",x.id,"userId,",x.user_id,"photoId",x.photo_id)
        litResult=get_photo2Mobile_Relation_by_photo_id(db,newItem.photo_id)
        for x in litResult:
            print("id",x.id,"userId,",x.user_id,"photoId",x.photo_id)
        x=get_photo2Mobile_Relation_by_id(db,newItem.id)
        if not x==None:
            print("id=",x.id,",userId=",x.user_id,",photoId=",x.photo_id)
        else:
            print("id=",newItem.id,"is",x)
    else:
        message="No Operation, (C,R,U,R)=(0,1,2,3)"
        print(message)
    return {"received_number": num.number,"message":message}

@router.get("/mobile/events", response_model=List[event_schema.Event])
def list_events(db:Session=Depends(get_db)):
    return get_event_list_for_mobile(db)

@router.get("/mobile/events/{event_id}", response_model=event_schema.EventDetail)
def read_events(event_id:int, db:Session=Depends(get_db)):
    return get_event_detail_for_mobile(db, event_id)

@router.post("/mobile/events/{event_id}/uploadfile")
async def upload_files(db:Session = Depends(get_db), file: UploadFile = File(...), x_user_id: int = Header(...)):
    contents = await file.read()

    path = update_user_photo(db, contents, file, x_user_id)
    print(path)
    # Path to the static file2 in the directory
    file2_path = Path("./banana.jpg")

    # Read the content of file2 from the directory
    async with aiofiles.open(file2_path, 'rb') as file2:
        original = await file2.read()

    ret = akaze(contents,original)
    return {"return":str(ret)}
