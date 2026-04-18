import os
from elevenlabs.client import ElevenLabs
from app.core.config import settings

# El cliente se inicializa usando la configuración global (que ya leyó el .env)
api_key = settings.ELEVENLABS_API_KEY
if not api_key or api_key == "your_elevenlabs_api_key_here":
    api_key = os.environ.get("ELEVENLABS_API_KEY")

elevenlabs_client = ElevenLabs(api_key=api_key)

def generate_speech(text: str, voice_id: str = "EXAVITQu4vr4xnSDxMaL") -> bytes: # EXAVITQu4vr4xnSDxMaL es el ID de Bella (Voz estándar)
    """
    Convierte texto a voz utilizando ElevenLabs.
    """
    try:
        # Usando la sintaxis del SDK más reciente
        audio_generator = elevenlabs_client.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id="eleven_multilingual_v2" # Soporta perfecto el Español
        )
        
        # El generador devuelve chunks de bytes, los unimos todos
        audio_bytes = b"".join(audio_generator)
        return audio_bytes
    except Exception as e:
        print(f"Error generando audio con ElevenLabs: {e}")
        raise e