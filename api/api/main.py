from fastapi import FastAPI
from api.routers import picture2item
from api.routers.events import match

app = FastAPI()

@app.get("/hello")
async def root():
    return {"message": "Hello World"}

app.include_router(picture2item.router)
app.include_router(match.router)