import os
from dotenv import load_dotenv
load_dotenv()
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key=os.environ.get("ELEVENLABS_API_KEY"))
try:
    voices_response = client.voices.get_all()
    # Depending on SDK version, it might be a list or an object with a .voices attribute
    voices_list = getattr(voices_response, 'voices', voices_response)
    for v in voices_list:
        print(f"Name: {getattr(v, 'name', v)}, ID: {getattr(v, 'voice_id', v)}")
except Exception as e:
    print(f"Error fetching voices: {e}")
