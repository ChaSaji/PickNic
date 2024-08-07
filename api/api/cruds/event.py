import api.models.database_models as event_model
import api.schemes.event as event_schema
from datetime import datetime
from sqlalchemy import select
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from api.database import get_db

dt_now = datetime.now() # 登録時の時間を取得したい


def get_event_list(db:Session, organization_id: int):
    print("Get event List...")
    result = db.execute(select(event_model.Event).filter(event_model.Event.organization_id == organization_id))
    events = result.scalars().all()

    event_list = [event_schema.Event(
        event_id=event.id,
        event_name=event.event_name,
        organization=event.organization.name,
        start_date=event.start_date,
        end_date=event.end_date
    ) for event in events]
    return event_list
def create_organization(db: Session, organization_name:str):
    print("Start registering organization...")
    db_organization = event_model.Organization(
        name=organization_name,
        create_date=dt_now,
        update_date=dt_now
    )
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    print("Organization registered!")

    return db_organization.id

def get_organization(db:Session, organization_id:int):
    return db.query(event_model.Organization).filter(event_model.Organization.id == organization_id).first()

def get_event_detail(event_id:int, db:Session):
    try:
        print("Get event Detail. ID is ...", event_id)
        result = db.execute(select(event_model.Event).filter(event_model.Event.id == event_id))
        event = result.scalars().first()
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        organization_id = event.organization_id

        result = db.execute(select(event_model.Organization).filter(event_model.Organization.id == organization_id))
        organization = result.scalars().first()
        if organization is None:
            raise HTTPException(status_code=404, detail="Organization not found")

        result = db.execute(select(event_model.Photo).filter(event_model.Photo.event_id == event_id))
        photo = result.scalars().first()
        if photo is None:
            raise HTTPException(status_code=404, detail="Photo not found")

        result = db.execute(select(event_model.EventBadge).filter(event_model.EventBadge.event_id == event_id))
        badge = result.scalars().first()
        if badge is None:
            raise HTTPException(status_code=404, detail="EventBadge not found")

        # print(event.event_badge.id)
        event_detail = event_schema.EventDetail(
        event_id=event.id,
        organization_id=event.organization_id,
        photo_id=event.photo_id,
        event_name=event.event_name,
        organization=organization.name,
        start_date=event.start_date,
        end_date=event.end_date,
        overview=event.description,
        badge_img=badge.pass_2_photo,
        badge_name=badge.name,
        target_img=photo.pass_2_photo,
        target_name= event.target_name,
        latitude=photo.latitude,
        longitude=photo.longitude,
        )
        return event_detail
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_event(
    db: Session, event_create: event_schema.EventCreate, organization_id: int
):
    try:
        print("Start registering event...")
        db_event = event_model.Event(
            organization_id=organization_id,
            event_name=event_create.event_name,
            target_name=event_create.target_name,
            start_date=event_create.start_date,
            end_date=event_create.end_date,
            description=event_create.overview,
            create_date=dt_now,
            update_date=dt_now,
            status=True
        )
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        print("Event registered!")
        return db_event.id
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
def create_photo(db: Session, photo_create: event_schema.EventCreate, event_id:int):
    try:

        print("Start registering event photo...")
        db_photo = event_model.Photo(
            event_id=event_id,
            pass_2_photo=photo_create.target_img,
            latitude=photo_create.latitude,
            longitude=photo_create.longitude,
            create_date=dt_now,
            update_date=dt_now
        )
        db.add(db_photo)
        db.commit()
        db.refresh(db_photo)
        print(db_photo.latitude, db_photo.longitude)
        print("Event photo registered!")
        return db_photo.id
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_event_badge(db: Session, event_badge_create: event_schema.EventCreate, event_id:int):
    try:

        print("Start registering event badge...")
        db_event_badge = event_model.EventBadge(
            event_id=event_id,
            name=event_badge_create.badge_name,
            pass_2_photo=event_badge_create.badge_img,
            create_date=dt_now,
            update_date=dt_now
        )
        db.add(db_event_badge)
        db.commit()
        db.refresh(db_event_badge)
        print("Event badge registered!")
        return db_event_badge.id
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_event(db: Session, event_id:int, event_update:event_schema.EventUpdate):

    try:
        print("Start updating event information... id:", event_id)
        result = db.execute(select(event_model.Event).filter(event_model.Event.id == event_id))
        event = result.scalars().first()
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        event.event_name=event_update.event_name
        event.start_date=event_update.start_date
        event.target_name=event_update.target_name
        event.end_date=event_update.end_date
        event.description=event_update.overview
        event.update_date=dt_now
        event.status=event_update.status

        db.add(event)
        db.commit()
        db.refresh(event)
        print("Event information updated!")

        return event_id

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def update_event_with_photo_id(db: Session, event_id: int, photo_id: int):
    db_event = db.query(event_model.Event).filter(event_model.Event.id == event_id).first()
    if db_event:
        db_event.photo_id = photo_id
        db_event.update_date = dt_now
        db.commit()
        db.refresh(db_event)
    return db_event

def update_organization(db: Session, organization_id:int, name:str):
    try:
        print("Start updating organization information... id:", organization_id)
        result = db.execute(select(event_model.Organization).filter(event_model.Organization.id == organization_id))
        organization = result.scalars().first()
        if organization is None:
            raise HTTPException(status_code=404, detail="Organization not found")
        print("organization_name", organization.name, name)
        organization.name=name
        organization.update_date=dt_now

        db.add(organization)
        db.commit()
        db.refresh(organization)
        print("Organization updated!")

        return organization_id

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_photo(db: Session, event_id:int, event_update:event_schema.EventUpdate):
    try:
        print("Start updating photo information... event_id:", )
        result = db.execute(select(event_model.Photo).filter(event_model.Photo.event_id == event_id))
        photo = result.scalars().first()
        if photo is None:
            raise HTTPException(status_code=404, detail="Photo not found")

        photo.pass_2_photo=event_update.target_img
        photo.latitude=event_update.latitude
        photo.longitude=event_update.longitude
        photo.update_date=dt_now

        print(photo.latitude, photo.longitude)

        db.add(photo)
        db.commit()
        db.refresh(photo)
        print("Event photo updated!")


        return photo.id

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def update_badge(db: Session, event_id:int, event_update:event_schema.EventUpdate):
    try:
        print("Start updating badge information... event_id:", event_id)
        result = db.execute(select(event_model.EventBadge).filter(event_model.EventBadge.event_id == event_id))
        badge = result.scalars().first()
        if badge is None:
            raise HTTPException(status_code=404, detail="Badge not found")

        badge.name=event_update.badge_name
        badge.pass_2_photo=event_update.badge_img
        badge.update_date=dt_now

        db.add(badge)
        db.commit()
        db.refresh(badge)
        print("Event badge updated!")

        return badge.id

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def delete_event(db:Session, event_id:int, organization_id:int):
    try:
        print("Get event Detail. ID is ...", event_id)
        result = db.execute(select(event_model.Event).filter(event_model.Event.id == event_id))
        event = result.scalars().first()
        if event is None:
            raise HTTPException(status_code=404, detail="Event not found")

        result = db.execute(select(event_model.Photo).filter(event_model.Photo.event_id == event_id))
        photo = result.scalars().first()
        if photo is None:
            raise HTTPException(status_code=404, detail="Photo not found")

        result = db.execute(select(event_model.EventBadge).filter(event_model.EventBadge.event_id == event_id))
        badge = result.scalars().first()
        if badge is None:
            raise HTTPException(status_code=404, detail="EventBadge not found")

        delete_event = event_schema.EventDeleteResponse(
        event_id=event.id,
        organization_id = organization_id,
        badge_id = badge.id,
        photo_id = photo.id,
        event_name=event.event_name,
        organization=event.organization.name,
        start_date=event.start_date,
        end_date=event.end_date,
        overview=event.description,
        badge_img=badge.pass_2_photo,
        badge_name=badge.name,
        target_img=photo.pass_2_photo,
        target_name= event.target_name, # TODO: ターゲットの名前入れる
        latitude=photo.latitude,
        longitude=photo.longitude,
        )

        db.delete(event)
        db.commit()
        print("Event deleted successfully.")

        db.delete(photo)
        db.commit()
        print("Photo deleted successfully.")

        db.delete(badge)
        db.commit()
        print("Badge deleted successfully.")

        return delete_event

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))