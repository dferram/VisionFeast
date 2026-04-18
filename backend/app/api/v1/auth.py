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
from app.models.professional_model import ProfessionalProfile
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
    # Try to find in users collection first (clients)
    user = await User.find_one(User.email == request.email)
    
    # If not found, try professionals collection (coaches and nutritionists)
    professional = None
    if not user:
        professional = await ProfessionalProfile.find_one(ProfessionalProfile.email == request.email)
    
    # Check if user/professional exists
    if not user and not professional:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
    
    # Determine which entity we're working with
    entity = user if user else professional
    
    # Verify password
    if not entity.hashed_password or not verify_password(request.password, entity.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )
    
    # Check if user/professional is active
    if not entity.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo"
        )
    
    # Build response based on entity type
    if user:
        # Client user
        role = user.role
        access_token = create_access_token(data={"sub": user.email, "role": role})
        user_data = {
            "id": str(user.id),
            "email": user.email,
            "full_name": user.full_name,
            "role": role,
            "picture": user.picture,
            "dietary_preferences": user.dietary_preferences,
            "allergies": user.allergies,
            "health_goals": user.health_goals,
        }
    else:
        # Professional (coach or nutritionist)
        role = "coach" if professional.tipo == "entrenador" else "nutritionist"
        access_token = create_access_token(data={"sub": professional.email, "role": role})
        user_data = {
            "id": str(professional.id),
            "email": professional.email,
            "full_name": professional.nombre_completo,
            "role": role,
            "picture": None,
            "license_number": professional.cedula_profesional,
            "specialization": professional.perfil_profesional.get("especialidad"),
            "years_experience": professional.anos_experiencia,
            "certifications": professional.certificaciones,
            "bio": professional.perfil_profesional.get("biografia"),
            "phone": professional.telefono,
        }
    
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