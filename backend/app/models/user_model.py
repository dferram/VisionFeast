"""User model with Google OAuth support."""
from datetime import datetime
from enum import Enum
from typing import Optional, List

from beanie import Document
from pydantic import EmailStr, Field

class UserRole(str, Enum):
    """User role enumeration."""
    CLIENT = "client"
    COACH = "coach"
    NUTRITIONIST = "nutritionist"
    ADMIN = "admin"

class AuthProvider(str, Enum):
    """Authentication provider enumeration."""
    GOOGLE = "google"
    EMAIL = "email"

class User(Document):
    """User document with authentication and profile information."""
    email: EmailStr
    full_name: str
    hashed_password: Optional[str] = None
    picture: Optional[str] = None
    auth_provider: AuthProvider = AuthProvider.EMAIL
    google_id: Optional[str] = None
    role: UserRole = UserRole.CLIENT
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Client-specific fields
    dietary_preferences: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    health_goals: Optional[List[str]] = []
    
    # Professional-specific fields (coach/nutritionist)
    license_number: Optional[str] = None
    specialization: Optional[str] = None
    years_experience: Optional[int] = None
    certifications: Optional[List[str]] = []
    bio: Optional[str] = None
    phone: Optional[str] = None
    
    class Settings:
        """Beanie document settings."""
        name = "users"
        indexes = [
            "email",
            "google_id",
        ]