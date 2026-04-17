from google.oauth2 import id_token
from google.auth.transport import requests
from fastapi import HTTPException, status
from app.core.config import settings
from app.models.user_model import User, AuthProvider
from app.core.security import create_access_token
from datetime import datetime

class AuthService:
    @staticmethod
    async def verify_google_token(token: str) -> dict:
        try:
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                settings.GOOGLE_CLIENT_ID
            )
            
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            
            return idinfo
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid Google token: {str(e)}"
            )
    
    @staticmethod
    async def authenticate_with_google(token: str) -> tuple[str, User]:
        idinfo = await AuthService.verify_google_token(token)
        
        google_id = idinfo['sub']
        email = idinfo['email']
        full_name = idinfo.get('name', '')
        picture = idinfo.get('picture', None)
        
        user = await User.find_one(User.google_id == google_id)
        
        if not user:
            user = await User.find_one(User.email == email)
            
            if user:
                user.google_id = google_id
                user.auth_provider = AuthProvider.GOOGLE
                user.picture = picture
                user.updated_at = datetime.utcnow()
                await user.save()
            else:
                user = User(
                    email=email,
                    full_name=full_name,
                    picture=picture,
                    google_id=google_id,
                    auth_provider=AuthProvider.GOOGLE,
                )
                await user.insert()
        else:
            user.picture = picture
            user.full_name = full_name
            user.updated_at = datetime.utcnow()
            await user.save()
        
        access_token = create_access_token(data={"sub": str(user.id)})
        
        return access_token, user
