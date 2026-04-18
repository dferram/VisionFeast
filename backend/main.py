"""VisionFeast API - Main application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.api.v1 import auth, ai, test, register
from app.core.config import settings

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
    return {"status": "healthy"}
