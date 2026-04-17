from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# Configuración de MongoDB
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/visionfeast")
DATABASE_NAME = "visionfeast"

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    """Establece la conexión con MongoDB"""
    db.client = AsyncIOMotorClient(MONGODB_URI)
    db.db = db.client[DATABASE_NAME]
    print(f"✅ Conectado a MongoDB: {DATABASE_NAME}")

async def close_mongo_connection():
    """Cierra la conexión con MongoDB"""
    if db.client:
        db.client.close()
        print("❌ Conexión a MongoDB cerrada")
