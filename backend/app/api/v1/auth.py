# Auth router

from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.auth_schema import GoogleAuthRequest, TokenResponse, UserResponse, UserUpdate
from app.services.auth_service import AuthService
from app.core.security import get_current_active_user
from app.models.user_model import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

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