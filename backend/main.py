from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.models.user_model import User
from app.repositories.user_repository import create_user
from app.api.v1 import auth
from app.core.config import settings

app = FastAPI(title="VisionFeast API")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    yield
    await close_mongo_connection()

@app.get("/")
async def root():
    return {"message": "VisionFeast API is running"}
