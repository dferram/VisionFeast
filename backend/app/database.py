"""Database configuration and connection management for MongoDB with Beanie ODM."""
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user_model import User
from app.models.professional_model import ProfessionalProfile
from app.models.meal_log_model import MealLog
from app.models.recipe_model import Recipe
from app.models.plan_model import Plan

logger = logging.getLogger(__name__)

class Database:
    """Database connection holder."""
    client: AsyncIOMotorClient = None

db = Database()

async def connect_to_mongo():
    """Establece la conexión con MongoDB y inicializa Beanie"""
    try:
        logger.info("🔄 Conectando a MongoDB...")
        
        # Configuración SSL para MongoDB Atlas
        import ssl
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        db.client = AsyncIOMotorClient(
            settings.MONGODB_URI,
            tlsCAFile=None,
            ssl_cert_reqs=ssl.CERT_NONE
        )
        
        # Verificar conexión
        await db.client.admin.command('ping')
        logger.info("✅ Ping exitoso a MongoDB")
        
        # Inicializar Beanie
        await init_beanie(
            database=db.client.get_default_database(),
            document_models=[User, ProfessionalProfile, MealLog, Recipe, Plan]
        )
        
        # Obtener info de la base de datos
        db_name = db.client.get_default_database().name
        logger.info(f"✅ Conectado a MongoDB - Base de datos: '{db_name}'")
        logger.info(f"✅ Beanie inicializado con {len([User, ProfessionalProfile, MealLog, Recipe, Plan])} modelos")
        
        # Listar colecciones
        collections = await db.client.get_default_database().list_collection_names()
        logger.info(f"📚 Colecciones disponibles: {collections if collections else 'Ninguna (nueva base de datos)'}")
        
    except Exception as e:
        logger.error(f"❌ Error al conectar a MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Cierra la conexión con MongoDB"""
    if db.client:
        db.client.close()
        logger.info("❌ Conexión a MongoDB cerrada")
