"""Database configuration and connection management for MongoDB with Beanie ODM."""
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user_model import User
from app.models.meal_log_model import MealLog
from app.models.recipe_model import Recipe
from app.models.plan_model import Plan

class Database:
    """Database connection holder."""
    client: AsyncIOMotorClient = None

db = Database()

async def connect_to_mongo():
    """Establece la conexión con MongoDB y inicializa Beanie"""
    db.client = AsyncIOMotorClient(settings.MONGODB_URI)

    await init_beanie(
        database=db.client.get_default_database(),
        document_models=[User, MealLog, Recipe, Plan]
    )

    print("✅ Conectado a MongoDB y Beanie inicializado con todos los modelos")

async def close_mongo_connection():
    """Cierra la conexión con MongoDB"""
    if db.client:
        db.client.close()
        print("❌ Conexión a MongoDB cerrada")
