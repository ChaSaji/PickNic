from fastapi import FastAPI
from api.routers import event

app = FastAPI()

app.include_router(event.router)

