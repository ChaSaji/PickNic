from fastapi import FastAPI
from api.routers import event

app = FastAPI()

@app.get("/hello")
async def root():
    return {"message": "Hello World"}

app.include_router(event.router)
