from pydantic import BaseModel, EmailStr
from typing import Optional
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
    dietary_preferences: Optional[list[str]] = None
    allergies: Optional[list[str]] = None
    health_goals: Optional[list[str]] = None
