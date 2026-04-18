"""Schemas for user registration."""
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, validator


class ClientRegisterRequest(BaseModel):
    """Schema for client registration."""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    password: str = Field(..., min_length=8)
    dietary_preferences: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    health_goals: Optional[List[str]] = []
    
    @validator('full_name')
    def validate_full_name(cls, v):
        if not v.strip():
            raise ValueError('El nombre completo no puede estar vacío')
        return v.strip()


class CoachRegisterRequest(BaseModel):
    """Schema for coach registration."""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    password: str = Field(..., min_length=8)
    license_number: str = Field(..., min_length=3)
    specialization: str = Field(..., min_length=3)
    years_experience: int = Field(..., ge=0, le=50)
    certifications: Optional[List[str]] = []
    bio: Optional[str] = Field(None, max_length=500)
    phone: Optional[str] = None
    
    @validator('full_name')
    def validate_full_name(cls, v):
        if not v.strip():
            raise ValueError('El nombre completo no puede estar vacío')
        return v.strip()


class NutritionistRegisterRequest(BaseModel):
    """Schema for nutritionist registration."""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    password: str = Field(..., min_length=8)
    license_number: str = Field(..., min_length=3)
    specialization: str = Field(..., min_length=3)
    years_experience: int = Field(..., ge=0, le=50)
    certifications: Optional[List[str]] = []
    bio: Optional[str] = Field(None, max_length=500)
    phone: Optional[str] = None
    
    @validator('full_name')
    def validate_full_name(cls, v):
        if not v.strip():
            raise ValueError('El nombre completo no puede estar vacío')
        return v.strip()


class RegisterResponse(BaseModel):
    """Schema for registration response."""
    message: str
    user: dict
    access_token: str
    token_type: str = "bearer"
