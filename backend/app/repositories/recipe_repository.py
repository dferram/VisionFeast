from typing import List, Optional
from beanie import PydanticObjectId
from app.models.recipe_model import Recipe

async def create_recipe(recipe: Recipe) -> Recipe:
    """Crea una nueva receta."""
    return await recipe.insert()

async def get_all_recipes() -> List[Recipe]:
    """Devuelve todas las recetas."""
    return await Recipe.find_all().to_list()

async def get_recipe_by_id(recipe_id: PydanticObjectId) -> Optional[Recipe]:
    """Busca una receta por su ID."""
    return await Recipe.get(recipe_id)
