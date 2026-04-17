from datetime import datetime
from pydantic import BaseModel
from beanie import Document

class Macros(BaseModel):
    proteinas: float
    grasas: float
    carbohidratos: float

class MealLog(Document):
    fecha: datetime
    imagen_comida: str
    calorias_calculadas_ia: float
    macros: Macros

    class Settings:
        name = "meal_logs"