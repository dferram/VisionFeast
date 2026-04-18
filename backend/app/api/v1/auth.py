# Auth router

from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

from app.schemas.auth_schema import (
    GoogleAuthRequest, TokenResponse, UserResponse, UserUpdate,
    RegisterRequest, RegisterResponse
)
from app.schemas.login_schemas import LoginRequest, LoginResponse
from app.services.auth_service import AuthService
from app.core.security import get_current_active_user
from app.models.user_model import User, AuthProvider, UserRole
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

@router.post("/register", response_model=RegisterResponse, status_code=201)
async def register(request: RegisterRequest):
    """
    Registra un nuevo usuario (cliente, nutriólogo o entrenador).
    - **email**: Correo electrónico único
    - **full_name**: Nombre completo
    - **password**: Contraseña (mínimo 8 caracteres)
    - **role**: Rol del usuario: `client`, `nutritionist` o `coach`
    """
    # Verificar si el email ya existe
    existing = await User.find_one(User.email == request.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe una cuenta con este correo electrónico"
        )

    # Hashear la contraseña
    hashed_pw = pwd_context.hash(request.password)

    # Mapear rol del frontend al modelo
    role_map = {
        "client": "client",
        "usuario": "client",
        "nutritionist": "nutritionist",
        "nutriologo": "nutritionist",
        "coach": "coach",
        "entrenador": "coach",
    }
    role = role_map.get(request.role.lower(), "client")

    # Crear usuario con los campos correctos según el rol
    user = User(
        email=request.email,
        full_name=request.full_name,
        hashed_password=hashed_pw,
        role=role,
        auth_provider=AuthProvider.EMAIL,
        is_active=True,
        # Campos de cliente
        dietary_preferences=request.dietary_preferences or [],
        allergies=request.allergies or [],
        health_goals=request.health_goals or [],
        # Campos de profesional
        license_number=request.license_number,
        specialization=request.specialization,
        years_experience=request.years_experience,
    )
    await user.insert()

    # Generar token
    access_token = create_access_token(data={"sub": user.email, "role": user.role})

    return RegisterResponse(
        message=f"✅ Cuenta creada exitosamente para {user.full_name}",
        access_token=access_token,
        user=UserResponse(
            id=str(user.id),
            email=user.email,
            full_name=user.full_name,
            picture=user.picture,
            role=user.role,
            is_active=user.is_active,
        )
    )

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Login with email and password. Works for all user types (client, coach, nutritionist).
    """
    # Find user in the users collection
    user = await User.find_one(User.email == request.email)
    
    # Check if user exists
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
    
    # Build response
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    
    # Common user data
    user_data = {
        "id": str(user.id),
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "picture": user.picture,
    }
    
    # Add role-specific data
    if user.role == UserRole.CLIENT:
        user_data.update({
            "dietary_preferences": user.dietary_preferences,
            "allergies": user.allergies,
            "health_goals": user.health_goals,
        })
    else:
        # Professional (coach or nutritionist)
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