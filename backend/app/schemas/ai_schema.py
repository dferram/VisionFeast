from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class MacrosResponse(BaseModel):
    p: float
    c: float
    g: float

class FoodAnalysisRequest(BaseModel):
    image_base64: str
    momento: str

class ManualMealRequest(BaseModel):
    nombre: str
    kcal: float
    p: float
    c: float
    g: float
    momento: str = "comida"

class FoodAnalysisResponse(BaseModel):
    nombre: str
    kcal: float
    macros: MacrosResponse
    confidence_score: float
    coach_insight: str
    ingredientes: List[str]
    advertencias: Optional[List[str]] = []

class RecipeRequest(BaseModel):
    ingredients: List[str]
    dietary_preferences: Optional[List[str]] = None
    target_macros: Optional[Dict[str, float]] = None

class RecipeResponse(BaseModel):
    titulo: str
    descripcion: str
    instrucciones: List[str]
    tiempo_preparacion: str
    porciones: int
    nutricion: Dict[str, Any]
    ingredientes_detallados: List[Dict[str, str]]

class PlanRequest(BaseModel):
    plan_type: str
    duration_days: int = 7

class PlanResponse(BaseModel):
    titulo: str
    descripcion: str
    contenido: Dict[str, Any]
    consejos: List[str]

class PatternAnalysisResponse(BaseModel):
    patron_detectado: str
    nivel_alerta: str
    indicadores: List[str]
    recomendaciones: List[str]
    requiere_atencion_profesional: bool
    notas_para_especialista: str
