from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class EventBase(BaseModel):
    event_name: str = Field(..., title="イベント名")
    start_date: datetime = Field(..., title="開始日")
    end_date: datetime = Field(..., title="終了日")

class EventDetailBase(EventBase): # EventBaseを継承する
    overview: str = Field(..., title="概要")
    badge_img: str = Field(..., title="バッジ画像(Base64)")
    badge_name: str = Field(..., title="バッジ名")
    target_img: str = Field(..., title="撮影対象画像(Base64)")
    target_name: str = Field(..., title="撮影対象名前")
    latitude: float = Field(..., title="緯度")
    longitude: float = Field(..., title="経度")

class Event(EventBase): # Event
    event_id: int = Field(..., title="イベント番号")
    event_name: str = Field(..., title="イベント名")
    organization: str = Field(..., title="主催団体")
    start_date: datetime = Field(..., title="開始日")
    end_date: datetime = Field(..., title="終了日")

    class Config:
        from_attributes = True

class EventDetailBase(EventBase): # EventBaseを継承する
    overview: str = Field(..., title="概要")
    badge_img: str = Field(..., title="バッジ画像(Base64)")
    badge_name: str = Field(..., title="バッジ名")
    target_img: str = Field(..., title="撮影対象画像(Base64)")
    target_name: str = Field(..., title="撮影対象名前")
    latitude: float = Field(..., title="緯度")
    longitude: float = Field(..., title="経度")

class EventDetail(EventDetailBase):
    event_id: int = Field(..., title="イベント番号")
    organization_id: int = Field(..., title="団体番号")
    organization: Optional[str] = Field(..., title="団体名")
    photo_id: int = Field(..., title="ターゲット写真番号")
    class Config:
        from_attributes = True

class EventCreate(EventDetailBase):
    pass
class EventUpdate(EventDetailBase):
    status: bool = Field(..., title="情報公開の有無")

class EventCreateResponse(EventCreate):
    event_id: int = Field(..., title="ID")
    organization_id: int = Field(..., title="団体番号")
    badge_id: int = Field(..., title="バッジ番号")
    photo_id: int = Field(..., title="写真番号")
    class Config:
        from_attributes = True

class EventUpdateResponse(EventUpdate):
    event_id: int = Field(..., title="ID")
    organization_id: int = Field(..., title="団体番号")
    badge_id: int = Field(..., title="バッジ番号")
    photo_id: int = Field(..., title="写真番号")
    class Config:
        from_attributes = True

class EventDeleteResponse(EventDetail):
    event_id: int = Field(..., title="ID")
    organization_id: int = Field(..., title="団体番号")
    badge_id: int = Field(..., title="バッジ番号")
    photo_id: int = Field(..., title="写真番号")
    class Config:
        from_attributes = True

class MobileEventDetail(EventDetail):
    score: int = Field(..., title="スコア")