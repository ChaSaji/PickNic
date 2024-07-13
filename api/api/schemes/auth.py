from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    organization_id: Optional[int] = None
    username: str
    email: str
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class User(BaseModel):
    id: int
    organization_id:int
    username: str
    email: str

    class Config:
        from_attributes = True
