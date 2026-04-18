"""Servicio de Text-to-Speech con ElevenLabs para respuestas de voz."""
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs
from app.core.config import settings
from typing import Optional
import base64

class ElevenLabsService:
    """Servicio para convertir texto a voz usando ElevenLabs."""
    
    def __init__(self):
        self.client = ElevenLabs(api_key=settings.ELEVENLABS_API_KEY)
        # Voz femenina profesional y amigable para el coach nutricional
        self.voice_id = "EXAVITQu4vr4xnSDxMaL"  # Sarah - voz femenina clara
        
    async def text_to_speech(
        self,
        text: str,
        voice_id: Optional[str] = None,
        model_id: str = "eleven_multilingual_v2"
    ) -> bytes:
        """
        Convierte texto a audio usando ElevenLabs.
        
        Args:
            text: Texto a convertir a voz
            voice_id: ID de la voz a usar (opcional, usa default si no se especifica)
            model_id: Modelo de voz a usar
            
        Returns:
            Bytes del audio generado en formato MP3
        """
        try:
            voice_to_use = voice_id or self.voice_id
            
            # Generar audio
            audio_generator = self.client.text_to_speech.convert(
                voice_id=voice_to_use,
                text=text,
                model_id=model_id,
                voice_settings=VoiceSettings(
                    stability=0.5,
                    similarity_boost=0.75,
                    style=0.0,
                    use_speaker_boost=True
                )
            )
            
            # Convertir generator a bytes
            audio_bytes = b"".join(audio_generator)
            return audio_bytes
            
        except Exception as e:
            raise Exception(f"Error al generar audio con ElevenLabs: {str(e)}")
    
    async def text_to_speech_base64(
        self,
        text: str,
        voice_id: Optional[str] = None
    ) -> str:
        """
        Convierte texto a audio y retorna en base64 para enviar al frontend.
        
        Args:
            text: Texto a convertir
            voice_id: ID de voz opcional
            
        Returns:
            Audio en formato base64
        """
        audio_bytes = await self.text_to_speech(text, voice_id)
        return base64.b64encode(audio_bytes).decode('utf-8')

# Instancia global del servicio
elevenlabs_service = ElevenLabsService()
