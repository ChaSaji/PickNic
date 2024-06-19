from pydantic import BaseModel, Field
from typing import Tuple, Optional
from datetime import date

class EventBase(BaseModel):
    id: Optional[int] = None  # DBで自動生成されるIDを入れるので, とりあえずNULLにしました
    event_name: Optional[str] = Field(None, title="イベント名")
    organizer: Optional[str] = Field(None, title="主催者")
    term: Optional[date] = Field(None, title="期間")  # 日付型

    class Config:
        from_attributes = True

class EventDetail(EventBase): # EventBaseを継承する
    overview: Optional[str] = Field(None, title="概要")
    badge_img: Optional[str] = Field(None, title="バッジ画像(Base64)")
    target_img: Optional[str] = Field(None, title="撮影対象画像(Base64)")
    target_name: Optional[str] = Field(None, title="撮影対象名前")
    position: Optional[Tuple[float, float]] = Field(None, title="撮影場所")  # 座標型

class EventCreate(EventDetail):  # EventDetailを継承する
    pass

class EventCreateResponse(EventDetail):
    class Config:
        from_attributes = True
