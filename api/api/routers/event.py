from fastapi import APIRouter
from typing import List
import api.schemes.event as event_schema

router = APIRouter()

@router.get("/events", response_model=List[event_schema.Event])
async def list_events():
    return [event_schema.Event(id=1, name="イベント1", organizer="主催者1", term="2021-01-01 ~ 2021-01-02")]

@router.post("/events/create")
async def create_event():
    pass

@router.get("/events/{event_id}", response_model=List[event_schema.EventDetail])
async def read_event():
    return [event_schema.EventDetail(id=1, event_name="イベント1", organizer="主催者", term="2021-01-01 ~ 2021-01-02", overview="概要の説明", badge_img="ieyasu", target_img="hamamatsu_castle_img", target_name="hamamatsu_castle_name", position=[12.345, 234.5556])]

@router.put("/events/{event_id}/edit")
async def update_event():
    pass

@router.delete("/events/{event_id}/delete")
async def delete_event():
    pass


