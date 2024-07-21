from fastapi import FastAPI
from api.routers import picture2item, event, auth, mobile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/hello")
async def root():
    return {"message": "Hello World"}

app.include_router(picture2item.router)
app.include_router(event.router)
app.include_router(auth.router)
app.include_router(mobile.router)
