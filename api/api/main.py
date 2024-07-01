from fastapi import FastAPI
from api.routers import event
from api.routers import auth


app = FastAPI()

@app.get("/hello")
async def root():
    return {"message": "Hello World"}

app.include_router(event.router)
app.include_router(auth.router)


