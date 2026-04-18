# Auth router

from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

from app.schemas.auth_schema import GoogleAuthRequest, TokenResponse, UserResponse, UserUpdate
from app.schemas.login_schemas import LoginRequest, LoginResponse
from app.services.auth_service import AuthService
from app.core.security import get_current_active_user
from app.models.user_model import User
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    """Create JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Login with email and password. Works for all user types (client, coach, nutritionist).
    
    - **email**: User's email address
    - **password**: User's password
    
    Returns user information and JWT access token.
    """
    # Find user by email
    user = await User.find_one(User.email == request.email)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
    
    # Verify password
    if not user.hashed_password or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    
    # Build user response based on role
    user_data = {
        "id": str(user.id),
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "picture": user.picture,
    }
    
    # Add role-specific fields
    if user.role == "client":
        user_data.update({
            "dietary_preferences": user.dietary_preferences,
            "allergies": user.allergies,
            "health_goals": user.health_goals,
        })
    elif user.role in ["coach", "nutritionist"]:
        user_data.update({
            "license_number": user.license_number,
            "specialization": user.specialization,
            "years_experience": user.years_experience,
            "certifications": user.certifications,
            "bio": user.bio,
            "phone": user.phone,
        })
    
    return LoginResponse(
        message="Login exitoso",
        user=user_data,
        access_token=access_token,
        token_type="bearer"
    )

@router.post("/google", response_model=TokenResponse)
async def google_auth(auth_request: GoogleAuthRequest):
    access_token, user = await AuthService.authenticate_with_google(auth_request.token)
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=str(user.id),
            email=user.email,
            full_name=user.full_name,
            picture=user.picture,
            role=user.role,
            is_active=user.is_active
        )
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        full_name=current_user.full_name,
        picture=current_user.picture,
        role=current_user.role,
        is_active=current_user.is_active
    )

@router.patch("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user)
):
    update_data = user_update.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    await current_user.save()
    
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        full_name=current_user.full_name,
        picture=current_user.picture,
        role=current_user.role,
        is_active=current_user.is_active
    )