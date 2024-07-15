# schemas.py
from pydantic import BaseModel
from typing import Optional

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
    
