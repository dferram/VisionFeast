from typing import List, Optional
from beanie import PydanticObjectId
from app.models.meal_log_model import MealLog

async def create_meal_log(meal_log: MealLog) -> MealLog:
    """Crea un nuevo registro de comida."""
    return await meal_log.insert()

async def get_all_meal_logs() -> List[MealLog]:
    """Devuelve todos los registros de comidas."""
    return await MealLog.find_all().to_list()

async def get_meal_log_by_id(meal_id: PydanticObjectId) -> Optional[MealLog]:
    """Busca un registro de comida por su ID."""
    return await MealLog.get(meal_id)
