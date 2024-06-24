from fastapi import APIRouter
from typing import List
from datetime import datetime
import api.schemes.event as event_schema

router = APIRouter()

@router.get("/events", response_model=List[event_schema.EventBase])
async def list_events():
    return [event_schema.EventBase(id=1, event_name="イベント1", organizer="主催者1", start_date=datetime(2024, 5, 10), end_date=datetime(2025, 3, 22))]

@router.post("/events/create", response_model=event_schema.EventCreateResponse)
async def create_event(event_body: event_schema.EventCreate):
    # 新しいイベントのIDを生成します（ここでは仮に1としていますが、実際にはDBから取得します）
    new_id = 1
    event_data = event_body.model_dump()
    event_data["id"] = new_id
    return event_schema.EventCreateResponse(**event_data)

@router.get("/events/{event_id}", response_model=event_schema.EventDetail)
async def read_event():
    return event_schema.EventDetail(id=1, event_name="イベント1", organizer="主催者", start_date=datetime(2024, 5, 10), end_date=datetime(2025, 3, 22), overview="概要の説明", badge_img="ieyasu", target_img="hamamatsu_castle_img", target_name="hamamatsu_castle_name", latitude=12.345, longitude=234.5556)

# NOTE:イベント情報を更新する処理はeventCreateと同様の処理でいいのか？という疑問あり
@router.put("/events/{event_id}/edit", response_model=event_schema.EventCreateResponse)
async def update_event(event_id: int, event_body: event_schema.EventCreateResponse):
    event_data = event_body.model_dump()
    event_data["id"] = event_id

    return event_schema.EventCreateResponse(**event_data)

@router.delete("/events/{event_id}/delete", response_model=None)
async def delete_event(event_id: int):
    #
    # DB内のイベント情報を削除する処理
    #
    return # NULLを返す


