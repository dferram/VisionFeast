from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.database import connect_to_mongo, close_mongo_connection
from app.models.user_model import User
from app.repositories.user_repository import create_user
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

@app.get("/test-db")
async def test_db():
    test_user = User(
        nombre="Usuario Prueba",
        email="prueba@visionfeast.com",
        edad=25,
        peso=70.5,
        altura=1.75,
        metas=["ganar músculo", "salud"]
    )
    saved_user = await create_user(test_user)
    return {"message": "Usuario guardado exitosamente", "user_id": str(saved_user.id)}
