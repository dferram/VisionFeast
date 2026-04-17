from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.database import connect_to_mongo, close_mongo_connection
# from app.api.v1 import auth, analysis, nutritionist, coach

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(title="VisionFeast API", lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "VisionFeast API is running"}
