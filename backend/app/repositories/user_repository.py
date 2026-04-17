from typing import Optional, List
from beanie import PydanticObjectId
from app.models.user_model import User

async def get_user_by_email(email: str) -> Optional[User]:
    """Busca un usuario por su correo electrónico."""
    return await User.find_one(User.email == email)

async def create_user(user: User) -> User:
    """Guarda un nuevo usuario en la base de datos."""
    return await user.insert()

async def get_user_by_id(user_id: PydanticObjectId) -> Optional[User]:
    """Busca un usuario por su ID."""
    return await User.get(user_id)

async def get_all_users() -> List[User]:
    """Devuelve todos los usuarios."""
    return await User.find_all().to_list()