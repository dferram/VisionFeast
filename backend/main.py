from fastapi import FastAPI
from app.database import connect_to_mongo, close_mongo_connection
# from app.api.v1 import auth, analysis, nutritionist, coach

app = FastAPI(title="VisionFeast API")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.get("/")
async def root():
    return {"message": "VisionFeast API is running"}
