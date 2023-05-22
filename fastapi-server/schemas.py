from datetime import datetime
from pydantic import BaseModel


class EventCreate(BaseModel):
    title: str
    date: datetime


class EventUpdate(BaseModel):
    title: str
    date: datetime


class EventResponse(BaseModel):
    id: int
    title: str
    date: datetime
