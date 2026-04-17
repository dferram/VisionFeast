from typing import List
from pydantic import BaseModel
from beanie import Document

class NutritionalValue(BaseModel):
    calorias: float
    proteinas: float
    grasas: float
    carbohidratos: float

class Recipe(Document):
    titulo: str
    ingredientes: List[str]
    pasos: List[str]
    valor_nutricional: NutritionalValue

    class Settings:
        name = "recipes"