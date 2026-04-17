"""Test endpoints for API functionality."""
from fastapi import APIRouter, Depends
from app.core.security import get_current_active_user
from app.models.user_model import User
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter(prefix="/test", tags=["Testing"])

class TestResponse(BaseModel):
    """Test response model."""
    message: str
    status: str
    data: Dict[str, Any]

@router.get("/ping", response_model=TestResponse)
async def ping():
    """
    Simple ping endpoint to test API connectivity.
    
    Returns:
        TestResponse with status information
    """
    return TestResponse(
        message="VisionFeast API is running",
        status="ok",
        data={
            "version": "1.0.0",
            "features": [
                "Google OAuth",
                "AI Food Analysis",
                "Coach Insights",
                "Recipe Generator",
                "Dynamic Plans"
            ]
        }
    )

@router.get("/auth-test", response_model=TestResponse)
async def test_authentication(current_user: User = Depends(get_current_active_user)):
    """
    Test authentication endpoint - requires valid JWT token.
    
    Args:
        current_user: Authenticated user from JWT token
        
    Returns:
        TestResponse with authenticated user information
    """
    return TestResponse(
        message="Authentication successful",
        status="ok",
        data={
            "user_id": str(current_user.id),
            "email": current_user.email,
            "full_name": current_user.full_name,
            "role": current_user.role
        }
    )

@router.get("/ai-config", response_model=TestResponse)
async def test_ai_configuration():
    """
    Test AI configuration and availability.
    
    Returns:
        TestResponse with AI service configuration status
    """
    from app.core.config import settings
    
    return TestResponse(
        message="AI Configuration Status",
        status="ok",
        data={
            "gemini_configured": bool(settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here"),
            "elevenlabs_configured": bool(settings.ELEVENLABS_API_KEY and settings.ELEVENLABS_API_KEY != "your_elevenlabs_api_key_here"),
            "mongodb_uri": settings.MONGODB_URI,
            "available_endpoints": [
                "/api/v1/ai/analyze-food",
                "/api/v1/ai/analyze-food-upload",
                "/api/v1/ai/create-recipe",
                "/api/v1/ai/generate-plan",
                "/api/v1/ai/analyze-patterns",
                "/api/v1/ai/my-meals"
            ]
        }
    )

@router.post("/ai-mock-analysis", response_model=Dict[str, Any])
async def mock_food_analysis():
    """
    Mock food analysis endpoint for testing without Gemini API.
    
    Returns:
        Mock analysis response similar to real AI analysis
    """
    return {
        "nombre": "Ensalada César con Pollo (MOCK)",
        "kcal": 420,
        "macros": {
            "p": 35,
            "c": 25,
            "g": 18
        },
        "confidence_score": 0.95,
        "coach_insight": "¡Excelente elección! Esta ensalada tiene un buen balance de proteínas y es baja en carbohidratos. Perfecto para tu meta.",
        "ingredientes": ["lechuga romana", "pollo a la parrilla", "queso parmesano", "crutones", "aderezo césar"],
        "advertencias": [],
        "note": "Este es un análisis MOCK para pruebas. Usa /api/v1/ai/analyze-food para análisis real con Gemini."
    }

@router.get("/database-status", response_model=TestResponse)
async def test_database_connection():
    """
    Test database connection and models.
    
    Returns:
        TestResponse with database status
    """
    from app.database import db
    
    try:
        is_connected = db.client is not None
        
        return TestResponse(
            message="Database Status",
            status="ok" if is_connected else "disconnected",
            data={
                "connected": is_connected,
                "models_registered": [
                    "User",
                    "MealLog",
                    "Recipe",
                    "Plan"
                ],
                "note": "Database connection is established on app startup"
            }
        )
    except Exception as e:
        return TestResponse(
            message="Database Error",
            status="error",
            data={
                "error": str(e),
                "connected": False
            }
        )
