"""Recipe models for intelligent recipe generation."""
from typing import Optional, List

from beanie import Document, PydanticObjectId
from pydantic import BaseModel

class Detalles(BaseModel):
    """Recipe details and instructions."""
    titulo: str
    descripcion: str
    instrucciones: List[str]
    is_public: bool = True

class Macros(BaseModel):
    """Macronutrients data model."""
    p: float
    c: float
    g: float

class Nutricion(BaseModel):
    """Nutritional information for a recipe."""
    kcal_totales: float
    macros: Macros

class Recipe(Document):
    """Recipe document with nutritional information."""
    creador_id: Optional[PydanticObjectId] = None
    detalles: Detalles
    nutricion: Nutricion

    class Settings:
        """Beanie document settings."""
        name = "recipes"