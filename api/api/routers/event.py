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
    # コメントアウト部分は次回のプルリクで出します．
    # new_id = 1 # ここはDBから取得する
    # event_data = event_body.model_dump(exclude={'id'})
    # return event_schema.EventCreateResponse(id=new_id, **event_data)
    return event_schema.EventCreateResponse(**event_body.model_dump())

@router.get("/events/{event_id}", response_model=List[event_schema.EventDetail])
async def read_event():
    #
    # ここにreturn文に必要なデータをDBから取得する処理, 下には仮のものを入れてある
    #
    return [event_schema.EventDetail(id=1, event_name="イベント1", organizer="主催者", term=date(2024, 5, 10), overview="概要の説明", badge_img="ieyasu", target_img="hamamatsu_castle_img", target_name="hamamatsu_castle_name", position=[12.345, 3456.777])]

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


