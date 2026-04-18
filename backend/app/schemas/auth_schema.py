from pydantic import BaseModel, EmailStr
from typing import Optional, List
from app.models.user_model import UserRole

class GoogleAuthRequest(BaseModel):
    token: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    picture: Optional[str] = None
    role: UserRole
    is_active: bool
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    picture: Optional[str] = None
    dietary_preferences: Optional[List[str]] = None
    allergies: Optional[List[str]] = None
    health_goals: Optional[List[str]] = None
    bio: Optional[str] = None
    years_experience: Optional[int] = None
    specialization: Optional[str] = None
    certifications: Optional[List[str]] = None
    kcal_diarias: Optional[float] = None

# ── Registro de usuarios ───────────────────────────────────────────────────────
class RegisterRequest(BaseModel):
    """Schema para registrar cualquier tipo de usuario."""
    email: EmailStr
    full_name: str
    password: str
    role: str = "client"  # client | nutritionist | coach

    # Campos exclusivos para clientes
    dietary_preferences: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    health_goals: Optional[List[str]] = []

    # Campos exclusivos para profesionales
    license_number: Optional[str] = None
    specialization: Optional[str] = None
    years_experience: Optional[int] = None

class RegisterResponse(BaseModel):
    """Respuesta tras un registro exitoso."""
    message: str
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

