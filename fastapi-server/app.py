from fastapi import FastAPI


from database import SessionLocal, create_tables
from models import Event
from schemas import EventCreate, EventResponse, EventUpdate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()


@app.get("/events")
def get_events():
    db = SessionLocal()
    events = db.query(Event).all()
    return events


@app.post("/events")
def create_event(event: EventCreate):
    db = SessionLocal()
    db_event = Event(title=event.title, date=event.date)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


@app.put("/events/{event_id}", response_model=EventResponse)
def update_event(event_id: int, event: EventUpdate):
    db = SessionLocal()
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        return {"error": "Event not found"}
    db_event.title = event.title
    db_event.description = event.description
    db.commit()
    db.refresh(db_event)
    return db_event


@app.delete("/events/{event_id}")
def delete_event(event_id: int):
    db = SessionLocal()
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        return {"error": "Event not found"}
    db.delete(db_event)
    db.commit()
    return {"message": "Event deleted"}
