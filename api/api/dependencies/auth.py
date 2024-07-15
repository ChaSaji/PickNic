from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError
from api.database import get_db
import api.cruds.event as event_cruds
from api.schemes.auth import User, BelongedOrganization
from api.cruds.auth import get_user_by_username
from api.lib.auth.token_utils import decode_access_token, is_token_in_blacklist


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if is_token_in_blacklist(token):
        print("Token is in blacklist")
        raise credentials_exception
    try:
        payload = decode_access_token(token)
        if payload is None:
            print("Failed to decode token")
            raise credentials_exception
        print(f"Payload: {payload}")
        username: str = payload.get("sub")
        if username is None:
            print("Username not found in payload")
            raise credentials_exception
    except JWTError as e:
        print(f"JWTError: {e}")
        raise credentials_exception
    except Exception as e:
        print(f"Error: {e}")
        raise credentials_exception
    user = get_user_by_username(db, username)
    print(user.organization_id)
    if user is None:
        print(f"User not found: {username}")
        raise credentials_exception
    return user

async def get_belonged_organization(db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        organization = event_cruds.get_organization(db, current_user.organization_id)

        if organization is None:
            raise HTTPException(status_code=404, detail="Event not found")

        return BelongedOrganization(
            id=current_user.id,
            username=current_user.username,
            email=current_user.email,
            organization_id=current_user.organization_id,
            organization_name=organization.name
        )

    except HTTPException as e:
        raise e

async def get_owned_event(event_id:int, db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    not_authorized_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not authorized to access this event"
    )
    try:
        event_detail = event_cruds.get_event_detail(event_id, db)

        if event_detail is None:
            raise HTTPException(status_code=404, detail="Event not found")
        
        if event_detail.organization_id != current_user.organization_id:
            raise not_authorized_exception
            
        return event_detail

    except HTTPException as e:
        raise e