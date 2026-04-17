"""Plan models for nutrition and training plans."""
from datetime import datetime
from enum import Enum
from typing import Optional, List

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
    PENDIENTE_REVISION = "pendiente_revision"
    APROBADO = "aprobado"
    RECHAZADO = "rechazado"

class Ejercicio(BaseModel):
    """Exercise information."""
    nombre: str
    series: int
    reps: int

class Validacion(BaseModel):
    """Plan validation by a professional."""
    especialista_id: Optional[PydanticObjectId] = None
    notas_ajuste: Optional[str] = None
    fecha_aprobacion: Optional[datetime] = None

class Contenido(BaseModel):
    """Plan content and exercises."""
    titulo: str
    ejercicios: Optional[List[Ejercicio]] = None

class Plan(Document):
    """Plan document for nutrition or training plans."""
    user_id: PydanticObjectId
    tipo_plan: TipoPlan
    origen: OrigenPlan = OrigenPlan.IA_GENERADO
    estado: EstadoPlan = EstadoPlan.PENDIENTE_REVISION
    contenido: Contenido
    validacion: Optional[Validacion] = None
    creado_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        """Beanie document settings."""
        name = "plans"

