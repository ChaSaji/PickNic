# schemas.py
from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    #email: str
    subusername : str
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    #email: Optional[str] = None
    subusername : Optional[str] = None
    password: Optional[str] = None

class User(BaseModel):
    id: int
    username: str
    #email: str
    subusername : str
    class Config:
        orm_mode = True
