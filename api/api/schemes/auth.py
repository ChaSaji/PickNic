from pydantic import BaseModel
from typing import Optional, List

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: int
    organization_id:int

    class Config:
        from_attributes = True

class UserResponse(User):
    organization_name: str

    class Config:
        from_attributes = True

class UsersResponse(BaseModel):
    users: List[User]

    class Config:
        from_attributes = True

class BelongedOrganization(User):
    organization_name: str

    class Config:
        from_attributes = True

class LoginResponse(UserResponse):
    access_token: str
    token_type: str = "bearer"

    class Config:
        from_attributes = True