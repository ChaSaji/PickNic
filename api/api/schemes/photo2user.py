# schemas.py
from pydantic import BaseModel
from typing import Optional

class Photo2UserCreate(BaseModel):
    photo_id : int
    user_id: str

class Photo2User(BaseModel):
    id: int
    photo_id : int
    user_id: str

class Photo2UserUpdate(BaseModel):
    id: int
    photo_id : int
    user_id: str
