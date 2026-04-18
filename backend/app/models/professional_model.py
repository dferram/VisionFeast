"""Professional model for nutritionists and coaches."""
from typing import Optional, List
from datetime import datetime
from beanie import Document
from pydantic import EmailStr, Field


class ProfessionalProfile(Document):
    """Modelo para profesionales (nutriólogos y entrenadores)."""
    
    # Información básica
    tipo: str  # "nutriologo" o "entrenador"
    nombre_completo: str
    email: EmailStr
    hashed_password: str
    
    # Perfil profesional
    perfil_profesional: dict = Field(default_factory=dict)  # certificado_url, especialidad, biografia
    
    # Estadísticas
    stats: dict = Field(default_factory=lambda: {
        "calificacion_promedio": 0.0,
        "total_resenas": 0
    })
    
    # Campos adicionales
    telefono: Optional[str] = None
    cedula_profesional: Optional[str] = None
    anos_experiencia: Optional[int] = 0
    certificaciones: List[str] = Field(default_factory=list)
    
    # Metadata
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "professionals"
        
    class Config:
        json_schema_extra = {
            "example": {
                "tipo": "nutriologo",
                "nombre_completo": "Dra. Mariana Nutri",
                "email": "mariana@example.com",
                "perfil_profesional": {
                    "certificado_url": "https://example.com/cert.pdf",
                    "especialidad": "Nutrición Deportiva",
                    "biografia": "Más de 5 años de experiencia"
                },
                "cedula_profesional": "NUT-12345",
                "anos_experiencia": 5,
                "certificaciones": ["Certificación A", "Certificación B"]
            }
        }
