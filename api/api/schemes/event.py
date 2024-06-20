from pydantic import BaseModel, Field
from datetime import date

class EventBase(BaseModel):
    id: int = None  # DBで自動生成されるIDを入れるので, とりあえずNULLにしました
    event_name: str = Field(..., title="イベント名")
    organizer: str = Field(..., title="主催者")
    start_date: date = Field(..., title="開始日")
    end_date: date = Field(..., title="終了日")

class EventDetail(EventBase): # EventBaseを継承する
    overview: str = Field(..., title="概要")
    badge_img: str = Field(..., title="バッジ画像(Base64)")
    target_img: str = Field(..., title="撮影対象画像(Base64)")
    target_name: str = Field(..., title="撮影対象名前")
    latitude: float = Field(..., title="緯度")
    longitude: float = Field(..., title="経度")
