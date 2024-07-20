# schemas.py
from pydantic import BaseModel
from typing import Optional
from fastapi import UploadFile
class MobileCreate(BaseModel):
    name: str

class MobileIdAsk(BaseModel):
    id : str

class MobileCommit(BaseModel):
    id : str
    name: str
    
class MobileUpdate(BaseModel):
    id: str
    name: str
    
class Mobile(BaseModel):
    id: str
    name: str
    
class Upload_file(BaseModel):
    file : UploadFile
    latitude:float
    longitude:float
