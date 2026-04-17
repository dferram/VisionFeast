from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user_model import User

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def connect_to_mongo():
    """Establece la conexión con MongoDB y inicializa Beanie"""
    db.client = AsyncIOMotorClient(settings.MONGODB_URI)
    
    await init_beanie(
        database=db.client.get_default_database(),
        document_models=[User]
    )
    
    print(f"✅ Conectado a MongoDB y Beanie inicializado")

async def close_mongo_connection():
    """Cierra la conexión con MongoDB"""
    if db.client:
        db.client.close()
        print("❌ Conexión a MongoDB cerrada")
