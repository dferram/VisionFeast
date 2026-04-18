"""Registration endpoints for different user types."""
from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from datetime import datetime, timedelta

from app.schemas.register_schemas import (
    ClientRegisterRequest,
    CoachRegisterRequest,
    NutritionistRegisterRequest,
    RegisterResponse
)
from app.models.user_model import User, UserRole, AuthProvider
from app.core.config import settings
from jose import jwt

router = APIRouter(tags=["register"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict) -> str:
    """Create JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def hash_password(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


@router.post("/register/client", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register_client(request: ClientRegisterRequest):
    """
    Register a new client user.
    
    - **email**: Valid email address
    - **full_name**: User's full name
    - **password**: Minimum 8 characters
    - **dietary_preferences**: Optional list of dietary preferences
    - **allergies**: Optional list of allergies
    - **health_goals**: Optional list of health goals
    """
    # Check if user already exists
    existing_user = await User.find_one(User.email == request.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado"
        )
    
    # Create new client user
    user = User(
        email=request.email,
        full_name=request.full_name,
        hashed_password=hash_password(request.password),
        auth_provider=AuthProvider.EMAIL,
        role=UserRole.CLIENT,
        dietary_preferences=request.dietary_preferences,
        allergies=request.allergies,
        health_goals=request.health_goals,
    )
    
    await user.insert()
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    
    return RegisterResponse(
        message="Cliente registrado exitosamente",
        user={
            "id": str(user.id),
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
        },
        access_token=access_token,
        token_type="bearer"
    )


@router.post("/register/coach", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register_coach(request: CoachRegisterRequest):
    """
    Register a new coach/personal trainer.
    
    - **email**: Valid email address
    - **full_name**: Coach's full name
    - **password**: Minimum 8 characters
    - **license_number**: Professional license number
    - **specialization**: Area of specialization
    - **years_experience**: Years of professional experience
    - **certifications**: Optional list of certifications
    - **bio**: Optional professional biography
    - **phone**: Optional contact phone
    """
    # Check if user already exists
    existing_user = await User.find_one(User.email == request.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado"
        )
    
    # Create new coach user
    user = User(
        email=request.email,
        full_name=request.full_name,
        hashed_password=hash_password(request.password),
        auth_provider=AuthProvider.EMAIL,
        role=UserRole.COACH,
        license_number=request.license_number,
        specialization=request.specialization,
        years_experience=request.years_experience,
        certifications=request.certifications,
        bio=request.bio,
        phone=request.phone,
    )
    
    await user.insert()
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    
    return RegisterResponse(
        message="Entrenador registrado exitosamente",
        user={
            "id": str(user.id),
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "license_number": user.license_number,
            "specialization": user.specialization,
        },
        access_token=access_token,
        token_type="bearer"
    )


@router.post("/register/nutritionist", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register_nutritionist(request: NutritionistRegisterRequest):
    """
    Register a new nutritionist.
    
    - **email**: Valid email address
    - **full_name**: Nutritionist's full name
    - **password**: Minimum 8 characters
    - **license_number**: Professional license number
    - **specialization**: Area of specialization
    - **years_experience**: Years of professional experience
    - **certifications**: Optional list of certifications
    - **bio**: Optional professional biography
    - **phone**: Optional contact phone
    """
    # Check if user already exists
    existing_user = await User.find_one(User.email == request.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado"
        )
    
    # Create new nutritionist user
    user = User(
        email=request.email,
        full_name=request.full_name,
        hashed_password=hash_password(request.password),
        auth_provider=AuthProvider.EMAIL,
        role=UserRole.NUTRITIONIST,
        license_number=request.license_number,
        specialization=request.specialization,
        years_experience=request.years_experience,
        certifications=request.certifications,
        bio=request.bio,
        phone=request.phone,
    )
    
    await user.insert()
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    
    return RegisterResponse(
        message="Nutriólogo registrado exitosamente",
        user={
            "id": str(user.id),
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "license_number": user.license_number,
            "specialization": user.specialization,
        },
        access_token=access_token,
        token_type="bearer"
    )
