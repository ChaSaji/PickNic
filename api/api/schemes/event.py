from pydantic import BaseModel, Field
from datetime import datetime

class EventBase(BaseModel):
    event_name: str = Field(..., title="イベント名")
    organizer: str = Field(..., title="主催者")
    start_date: datetime = Field(..., title="開始日")
    end_date: datetime = Field(..., title="終了日")

class EventDetailBase(EventBase): # EventBaseを継承する
    overview: str = Field(..., title="概要")
    badge_img: str = Field(..., title="バッジ画像(Base64)")
    target_img: str = Field(..., title="撮影対象画像(Base64)")
    target_name: str = Field(..., title="撮影対象名前")
    latitude: float = Field(..., title="緯度")
    longitude: float = Field(..., title="経度")

class Event(EventBase): # Event
    id: int = None

class EventDetail(EventDetailBase): # Event
    id: int = None
class EventCreate(EventDetailBase):
    pass

class EventUpdate(EventDetailBase):
    pass
class EventCreateResponse(EventCreate):
    id: int = Field(..., title="ID")

    class Config:
        from_attributes = True

class EventUpdateResponse(EventUpdate):
    id: int = Field(..., title="ID")
    class Config:
        from_attributes = True