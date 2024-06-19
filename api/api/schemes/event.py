from pydantic import BaseModel, Field
from typing import Tuple

class Event(BaseModel):
    id:int
    name:str = Field(None, title="イベント名")
    organizer:str = Field(None, title="主催者")
    term:str = Field(None, title="期間") # TODO: 日付型に変換するか？

class EventDetail(BaseModel):
    id:int
    event_name:str = Field(None, title="イベント名")
    organizer:str = Field(None, title="主催者")
    term:str = Field(None, title="期間") # TODO: 日付型に変換するか？
    overview:str = Field(None, title="概要")
    badge_img:str = Field(None, title="バッジ画像(Base64)")
    target_img:str = Field(None, title="撮影対象画像(Base64)")
    target_name:str = Field(None, title="撮影対象名前")
    position:Tuple[float, float] = Field(None, title="撮影場所") # TODO: 座標の型どう？
