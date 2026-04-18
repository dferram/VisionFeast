"""VisionFeast API - Main application entry point."""
import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.api.v1 import auth, ai, test, register
from app.core.config import settings

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="VisionFeast API",
    description="""## VisionFeast - Análisis Nutricional con IA
    
    API completa para análisis nutricional inteligente usando Google Gemini AI.
    
    ### Características principales:
    
    * Autenticación Google OAuth - Login seguro con Google
    * Análisis de Comidas con IA - Sube fotos y obtén análisis nutricional automático
    * Coach Virtual Personalizado - Retroalimentación inmediata sobre tus comidas
    * Generador de Recetas Inteligente - Recetas basadas en tus ingredientes y objetivos
    * Planes Dinámicos - Planes de nutrición y entrenamiento personalizados
    * Análisis de Patrones - Detección de comportamientos alimentarios
    
    ### Endpoints de Prueba:
    
    * `/api/v1/test/ping` - Verificar que la API esté funcionando
    * `/api/v1/test/auth-test` - Probar autenticación
    * `/api/v1/test/ai-config` - Verificar configuración de IA
    * `/api/v1/test/ai-mock-analysis` - Análisis mock sin usar Gemini
    
    ### Documentación:
    
    * Consulta `/docs` para documentación interactiva (Swagger)
    * Consulta `/redoc` para documentación alternativa
    """,
    version="1.0.0",
    contact={
        "name": "VisionFeast Team",
        "url": "https://github.com/visionfeast",
    },
    license_info={
        "name": "MIT",
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection on application startup."""
    # Log deployment environment info
    logger.info("="*60)
    logger.info("🚀 VisionFeast Backend Starting...")
    logger.info("="*60)
    
    # Detectar entorno
    railway_env = os.getenv("RAILWAY_ENVIRONMENT")
    port = os.getenv("PORT", "8000")
    
    if railway_env:
        logger.info(f"📍 ENTORNO: Railway ({railway_env})")
        logger.info(f"🌐 PUERTO: {port}")
    else:
        logger.info("📍 ENTORNO: Local/Development")
        logger.info(f"🌐 PUERTO: {port}")
    
    # Log MongoDB info
    mongodb_uri = settings.MONGODB_URI
    if "mongodb+srv" in mongodb_uri:
        logger.info("💾 BASE DE DATOS: MongoDB Atlas (Cloud)")
    elif "railway" in mongodb_uri.lower():
        logger.info("💾 BASE DE DATOS: Railway MongoDB")
    elif "localhost" in mongodb_uri or "127.0.0.1" in mongodb_uri:
        logger.info("💾 BASE DE DATOS: MongoDB Local")
    else:
        logger.info("💾 BASE DE DATOS: MongoDB (Custom)")
    
    # Ocultar credenciales en el log
    safe_uri = mongodb_uri.split("@")[-1] if "@" in mongodb_uri else "localhost"
    logger.info(f"🔗 CONEXIÓN: {safe_uri}")
    
    # Log API Keys status
    logger.info(f"🤖 GEMINI API: {'✅ Configurado' if settings.GEMINI_API_KEY else '❌ No configurado'}")
    logger.info(f"🔐 GOOGLE OAuth: {'✅ Configurado' if settings.GOOGLE_CLIENT_ID else '❌ No configurado'}")
    
    logger.info("="*60)
    
    # Conectar a MongoDB
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on application shutdown."""
    await close_mongo_connection()

app.include_router(auth.router, prefix="/api/v1")
app.include_router(ai.router, prefix="/api/v1")
app.include_router(test.router, prefix="/api/v1")
app.include_router(register.router, prefix="/api/v1")

@app.get("/")
async def root():
    """Root endpoint with API information and available features."""
    return {
        "message": "VisionFeast API is running",
        "features": [
            "Google OAuth Authentication",
            "AI Food Analysis with Gemini Vision",
            "Personalized Coach Insights",
            "Intelligent Recipe Generator",
            "Dynamic Nutrition & Training Plans",
            "Eating Pattern Analysis"
        ]
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    from app.database import db
    
    # Verificar conexión a MongoDB
    db_status = "disconnected"
    if db.client:
        try:
            # Ping a la base de datos
            await db.client.admin.command('ping')
            db_status = "connected"
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            db_status = "error"
    
    # Detectar entorno
    environment = "railway" if os.getenv("RAILWAY_ENVIRONMENT") else "local"
    
    return {
        "status": "healthy",
        "database": db_status,
        "environment": environment,
        "port": os.getenv("PORT", "8000")
    }
