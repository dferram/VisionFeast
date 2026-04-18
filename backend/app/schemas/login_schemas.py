"""Schemas for login."""
from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    """Schema for email/password login."""
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    """Schema for login response."""
    message: str
    user: dict
    access_token: str
    token_type: str = "bearer"
