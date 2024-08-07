# main.py
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from jose import JWTError, jwt
from api.models.database_models import Base
from api.schemes.mobile import MobileCreate, MobileUpdate, Mobile,MobileIdAsk,Upload_file
from api.schemes.photo2user import Photo2User,Photo2UserCreate,Photo2UserUpdate
import api.cruds.event as event_cruds
from api.cruds.mobile import get_event_photo_by_id,get_mobile_user_by_Id,create_mobile_user,get_mobile_user_all,delete_mobile_user_by_id,delete_mobile_user_by_name, get_event_list_for_mobile, get_event_detail_for_mobile, get_photo2users
from api.cruds.photo2user import get_photo2Mobile_Relation_by_id,get_photo2Mobile_Relation_by_mobile_id,get_photo2Mobile_Relation_by_photo_id,create_photo2Mobile,update_photo2Mobile_Relation_by_id,delete_photo2mobile_by_id,delete_photo2mobile_by_mobile_id,delete_photo2mobile_by_photo_id,get_potho_ranking, update_user_photo, get_photo2Mobile_Relation_by_user_and_event
from api.database import engine, get_db
from api.lib.r2.download_image_from_s3 import download_file_from_s3
from pydantic import BaseModel
from typing import List, Union
import api.schemes.event as event_schema
from fastapi import File,UploadFile,Form
from api.lib.akaze import akaze
from pathlib import Path
import aiofiles
import math
from datetime import datetime

dist_limit=100

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

#距離の計算(m)で回答
def calc_distance(lat1, lon1, lat2, lon2):
        # 地球の半径 (キロメートル)
    R = 6371.0

    # 緯度と経度をラジアンに変換
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # ハバーサイン公式
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # 距離の計算(mに変換)
    distance = R * c * 1000

    return distance

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


@router.get("/mobile/events/{event_id}", response_model=event_schema.MobileEventDetail)
def read_events(event_id: int, db: Session = Depends(get_db), x_user_id: str = Header(...)):
    event_detail = get_event_detail_for_mobile(db, event_id)
    photo_2_mobile = get_photo2Mobile_Relation_by_user_and_event(db, x_user_id, event_id)
    score = 0
    if photo_2_mobile is None:
        score = -1
    else:
        score = photo_2_mobile.score
    return event_schema.MobileEventDetail(event_id=event_detail.event_id, organization_id=event_detail.organization_id, organization=event_detail.organization, photo_id=event_detail.photo_id, overview=event_detail.overview, badge_img=event_detail.badge_img, badge_name=event_detail.badge_name, target_img=event_detail.target_img, target_name=event_detail.target_name, latitude=event_detail.latitude, longitude=event_detail.longitude, event_name=event_detail.event_name, start_date=event_detail.start_date, end_date=event_detail.end_date, score=score)

@router.get("/mobile/get_photo2users")
def photo2users_list(db:Session = Depends(get_db)):
    return get_photo2users(db)

@router.post("/mobile/events/{event_id}/uploadfile")
async def upload_files(event_id: int,db:Session = Depends(get_db), file: UploadFile = File(...),latitude:float=Form(...),longitude:float=Form(...), x_user_id: str = Header(...)):
    contents = await file.read()

    event = event_cruds.get_event_detail(event_id, db)
    original = await download_file_from_s3(event.target_name)

    # 距離計算処理
    pos=get_event_photo_by_id(db=db,event_id=event_id)
    dist=calc_distance(lat1=pos.latitude,lat2=latitude,lon1=pos.longitude,lon2=longitude)
    ret=None
    if (dist>=dist_limit):
        ret=0
    else:
        try:
            ret = int(akaze(contents,original))
        except Exception as e:
            # 任意でログを追加すると良い
            print(f"Error occurred in akaze function: {e}")
            ret = 0

    photo_2_mobile = get_photo2Mobile_Relation_by_user_and_event(db, x_user_id, event_id)
    if photo_2_mobile == None:
        # おこ
        new_photo = event_schema.EventCreate(latitude=latitude, longitude=longitude, start_date=datetime.now(), end_date=datetime.now(), overview='', badge_img='', badge_name='', target_img='', target_name='', event_name='')
        db_photo_id = event_cruds.create_photo(db, new_photo, event_id)
        new_photo_2_mobile = Photo2UserCreate(user_id=x_user_id, photo_id=db_photo_id, score=ret)
        create_photo2Mobile(db, new_photo_2_mobile)
        _ = update_user_photo(db, contents, x_user_id, event_id)
    elif ret > photo_2_mobile.score:
        new_photo_2_mobile = Photo2UserUpdate(id=photo_2_mobile.id, user_id=x_user_id, photo_id=photo_2_mobile.photo_id, score=ret)
        update_photo2Mobile_Relation_by_id(db, new_photo_2_mobile)
        _ = update_user_photo(db, contents, x_user_id, event_id)

    return {"return":str(ret)}

class PhotoRankingModel(BaseModel):
    user_id: int
    score: int

@router.post("/mobile/events/{event_id}/photo_ranking")
def upload_files(event_id:int, db:Session=Depends(get_db)):
    rankings=get_potho_ranking(db,event_id)
    print(rankings)
    #if not rankings:
        #raise HTTPException(status_code=404, detail="No rankings found for this event")
        # Pydanticモデルに変換
    # 2列目を"user_id"、3列目を"score"としてリストを辞書に変換
    json_data = [{"user_id": user_id, "user_name": user_name,"score": score} for _, user_id, score, user_name in rankings]
    return json_data