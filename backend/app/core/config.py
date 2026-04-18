from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017/visionfeast_db"
    
    GEMINI_API_KEY: str
    ELEVENLABS_API_KEY: str
    
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    
    JWT_SECRET_KEY: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    
    FRONTEND_URL: str = "http://localhost:5173"
    ENVIRONMENT: str = "development" # Añadido para evitar el error de validación
    
    # Usar model_config para Pydantic V2
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore" # Esto evita que el servidor explote por variables extra en el .env
    )

settings = Settings()
