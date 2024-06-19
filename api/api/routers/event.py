from fastapi import APIRouter
from typing import List
import api.schemes.event as event_schema
from datetime import date

router = APIRouter()

@router.get("/events", response_model=List[event_schema.EventBase])
async def list_events():
    return [event_schema.EventBase(id=1, event_name="イベント1", organizer="主催者1", term=date(2024, 5, 10))]

@router.post("/events/create", response_model=event_schema.EventCreateResponse)
async def create_event(event_body: event_schema.EventCreate):
    return event_schema.EventCreateResponse(**event_body.model_dump()) # 現状はidをNULLで返す

@router.get("/events/{event_id}", response_model=List[event_schema.EventDetail])
async def read_event():
    return [event_schema.EventDetail(id=1, event_name="イベント1", organizer="主催者", term=date(2024, 5, 10), overview="概要の説明", badge_img="ieyasu", target_img="hamamatsu_castle_img", target_name="hamamatsu_castle_name", position=[12.345, 3456.777])]

@router.put("/events/{event_id}/edit")
async def update_event():
    pass

@router.delete("/events/{event_id}/delete")
async def delete_event():
    pass


