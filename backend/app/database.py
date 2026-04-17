from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import os
from dotenv import load_dotenv

from app.models.user_model import User
from app.models.meal_log_model import MealLog
from app.models.recipe_model import Recipe

load_dotenv()

# Configuración de MongoDB
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/visionfeast_db")
DATABASE_NAME = os.getenv("DATABASE_NAME", "visionfeast_db")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    """Establece la conexión con MongoDB"""
    db.client = AsyncIOMotorClient(MONGODB_URI)
    db.db = db.client[DATABASE_NAME]
    
    await init_beanie(database=db.db, document_models=[User, MealLog, Recipe])
    print(f"[OK] Conectado a MongoDB: {DATABASE_NAME} y Beanie inicializado")

async def close_mongo_connection():
    """Cierra la conexión con MongoDB"""
    if db.client:
        db.client.close()
        print("[CLOSED] Conexión a MongoDB cerrada")
