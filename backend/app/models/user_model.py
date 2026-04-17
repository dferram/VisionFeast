from typing import List, Optional
from beanie import Document

class User(Document):
    nombre: str
    email: str
    edad: int
    peso: float
    altura: float
    metas: List[str]

    class Settings:
        name = "users"