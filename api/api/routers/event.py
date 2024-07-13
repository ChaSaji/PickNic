from fastapi import APIRouter, Depends
from typing import List
import api.schemes.event as event_schema
from api.database import get_db
import api.cruds.event as event_cruds
from sqlalchemy.orm import Session
from api.routers.auth import get_current_user
from api.models.database_models import User

router = APIRouter()

@router.get("/events", response_model=List[event_schema.Event])
def list_events(db:Session=Depends(get_db), current_user: User = Depends(get_current_user)):
    return event_cruds.get_event_list(db, current_user.organization_id)

@router.post("/events/create", response_model=event_schema.EventCreateResponse) #TODO: 同じ名前のイベントでも複数登録できてしまうので変える必要あります.
def create_event(event_body: event_schema.EventCreate, current_user: User = Depends(get_current_user), db:Session=Depends(get_db)):
    db_organization_id = current_user.id

    db_event_id = event_cruds.create_event(db, event_body, db_organization_id)

    db_photo_id = event_cruds.create_photo(db, event_body, db_event_id)

    db_event_badge = event_cruds.create_event_badge(db, event_body, db_event_id)

    create_event_data = event_body.model_dump()
    create_event_data["event_id"] = db_event_id
    create_event_data["organization_id"] = db_organization_id
    create_event_data["badge_id"] = db_event_badge
    create_event_data["photo_id"] = db_photo_id
    return event_schema.EventCreateResponse(**create_event_data)

@router.get("/events/{event_id}", response_model=event_schema.EventDetail)
def read_event(event_id: int, db: Session = Depends(get_db)):
    return event_cruds.get_event_detail(event_id, db)

# NOTE:organization_idをリクエストで受けとる必要がある．
@router.put("/events/{event_id}/edit", response_model=event_schema.EventUpdateResponse)
def update_event(event_id: int, event_body: event_schema.EventUpdate, current_user: User = Depends(get_current_user), db: Session=Depends(get_db)):

    db_organization_id = current_user.organization_id
    db_event_id = event_cruds.update_event(db, event_id, event_body)
    db_photo_id = event_cruds.update_photo(db, event_id, event_body)
    db_badge_id = event_cruds.update_badge(db, event_id, event_body)

    update_info = event_schema.EventUpdateResponse(
            event_id = db_event_id,
            organization_id = db_organization_id,
            badge_id= db_badge_id,
            photo_id = db_photo_id,
            event_name=event_body.event_name,
            organization=event_body.organization,
            start_date=event_body.start_date,
            end_date=event_body.end_date,
            overview=event_body.overview,
            badge_img=event_body.badge_img,
            badge_name=event_body.badge_name,
            target_img=event_body.target_img,
            target_name=event_body.target_name,
            latitude= event_body.latitude,
            longitude=event_body.longitude,
            status = event_body.status
        )

    return update_info

@router.delete("/events/{event_id}/delete", response_model=None)
def delete_event(event_id: int, current_user: User = Depends(get_current_user), db: Session=Depends(get_db)):
    return event_cruds.delete_event(db, event_id, current_user.organization_id)



