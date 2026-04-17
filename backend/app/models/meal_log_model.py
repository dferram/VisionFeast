"""Meal log models for food tracking and AI analysis."""
from datetime import datetime
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field

class Macros(BaseModel):
    """Macronutrients data model."""
    p: float
    c: float
    g: float

class AnalisisIA(BaseModel):
    """AI analysis results for a meal."""
    kcal: float
    macros: Macros
    confidence_score: float
    coach_insight: str

class Comida(BaseModel):
    """Food/meal information."""
    nombre: str
    foto_url: str
    momento: str

class MealLog(Document):
    """Meal log document with AI analysis."""
    user_id: PydanticObjectId
    comida: Comida
    analisis_ia: Optional[AnalisisIA] = None
    creado_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        """Beanie document settings."""
        name = "meal_logs"