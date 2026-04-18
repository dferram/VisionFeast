"""Plan models for nutrition and training plans."""
from datetime import datetime
from enum import Enum
from typing import Optional, List, Dict, Any

from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field

class TipoPlan(str, Enum):
    """Plan type enumeration."""
    ENTRENAMIENTO = "entrenamiento"
    NUTRICION = "nutricion"

class OrigenPlan(str, Enum):
    """Plan origin enumeration."""
    IA_GENERADO = "ia_generado"
    PROFESIONAL = "profesional"

class EstadoPlan(str, Enum):
    """Plan status enumeration."""
    ACTIVO = "activo"
    BORRADOR = "borrador"
    ARCHIVADO = "archivado"

class Plan(Document):
    """Plan document for nutrition or training plans."""
    user_id: PydanticObjectId  # Cliente al que se le asigna
    created_by: PydanticObjectId  # Coach/Nutri que lo creó
    tipo_plan: TipoPlan
    origen: OrigenPlan = OrigenPlan.PROFESIONAL
    estado: EstadoPlan = EstadoPlan.ACTIVO
    titulo: str = ""
    descripcion: str = ""
    contenido: Dict[str, Any] = {}  # Flexible: ejercicios, comidas, etc.
    creado_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        """Beanie document settings."""
        name = "plans"
