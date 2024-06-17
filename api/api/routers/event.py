from fastapi import APIRouter

router = APIRouter()

@router.get("/events")
async def list_events():
    return {"message": "Hello events!"}

@router.post("/events/create")
async def create_event():
    pass

@router.get("/events/{event_id}")
async def read_event():
    pass

@router.put("/events/{event_id}/edit")
async def update_event():
    pass

@router.delete("/events/{event_id}/delete")
async def delete_event():
    pass


