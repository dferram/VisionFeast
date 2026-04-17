from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    USER = "user"
    NUTRITIONIST = "nutritionist"
    ADMIN = "admin"

class AuthProvider(str, Enum):
    GOOGLE = "google"
    EMAIL = "email"

class User(Document):
    email: EmailStr
    full_name: str
    picture: Optional[str] = None
    auth_provider: AuthProvider = AuthProvider.EMAIL
    google_id: Optional[str] = None
    role: UserRole = UserRole.USER
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    dietary_preferences: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    health_goals: Optional[List[str]] = []
    
    class Settings:
        name = "users"
        indexes = [
            "email",
            "google_id",
        ]