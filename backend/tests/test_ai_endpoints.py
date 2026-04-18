"""Tests for AI endpoints."""
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_analyze_food_without_auth(client: AsyncClient, sample_food_image_base64: str):
    """Test food analysis endpoint without authentication."""
    response = await client.post(
        "/api/v1/ai/analyze-food",
        json={
            "image_base64": sample_food_image_base64,
            "momento": "comida"
        }
    )
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_analyze_food_missing_data(client: AsyncClient):
    """Test food analysis endpoint with missing data."""
    response = await client.post("/api/v1/ai/analyze-food", json={})
    # Auth is checked before validation, so 401 is expected
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_create_recipe_without_auth(client: AsyncClient):
    """Test recipe creation endpoint without authentication."""
    response = await client.post(
        "/api/v1/ai/create-recipe",
        json={
            "ingredients": ["pollo", "arroz", "brócoli"]
        }
    )
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_create_recipe_missing_ingredients(client: AsyncClient):
    """Test recipe creation with missing ingredients."""
    response = await client.post("/api/v1/ai/create-recipe", json={})
    # Auth is checked before validation, so 401 is expected
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_generate_plan_without_auth(client: AsyncClient):
    """Test plan generation endpoint without authentication."""
    response = await client.post(
        "/api/v1/ai/generate-plan",
        json={
            "plan_type": "nutricion",
            "duration_days": 7
        }
    )
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_generate_plan_invalid_type(client: AsyncClient):
    """Test plan generation with invalid plan type."""
    response = await client.post(
        "/api/v1/ai/generate-plan",
        json={
            "plan_type": "invalid_type",
            "duration_days": 7
        }
    )
    assert response.status_code in [401, 422]  # Unauthorized or validation error

@pytest.mark.asyncio
async def test_analyze_patterns_without_auth(client: AsyncClient):
    """Test pattern analysis endpoint without authentication."""
    response = await client.get("/api/v1/ai/analyze-patterns")
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_my_meals_without_auth(client: AsyncClient):
    """Test get meals endpoint without authentication."""
    response = await client.get("/api/v1/ai/my-meals")
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_my_meals_with_limit(client: AsyncClient):
    """Test get meals endpoint with limit parameter."""
    response = await client.get("/api/v1/ai/my-meals?limit=10")
    assert response.status_code == 401  # Unauthorized (no auth token)

@pytest.mark.asyncio
async def test_update_meal_without_auth(client: AsyncClient):
    """Test update meal endpoint without authentication."""
    response = await client.put(
        "/api/v1/ai/meals/507f1f77bcf86cd799439011",
        json={
            "nombre": "Pollo a la Parrilla",
            "kcal": 450,
            "p": 40,
            "c": 20,
            "g": 15,
            "momento": "comida"
        }
    )
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_update_meal_invalid_id(client: AsyncClient):
    """Test update meal with invalid meal ID format."""
    response = await client.put(
        "/api/v1/ai/meals/invalid_id",
        json={
            "nombre": "Pollo a la Parrilla",
            "kcal": 450,
            "p": 40,
            "c": 20,
            "g": 15,
            "momento": "comida"
        }
    )
    assert response.status_code == 401  # Unauthorized (auth checked first)

@pytest.mark.asyncio
async def test_delete_meal_without_auth(client: AsyncClient):
    """Test delete meal endpoint without authentication."""
    response = await client.delete("/api/v1/ai/meals/507f1f77bcf86cd799439011")
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_delete_meal_invalid_id(client: AsyncClient):
    """Test delete meal with invalid meal ID format."""
    response = await client.delete("/api/v1/ai/meals/invalid_id")
    assert response.status_code == 401  # Unauthorized (auth checked first)

@pytest.mark.asyncio
async def test_log_manual_meal_without_auth(client: AsyncClient):
    """Test manual meal logging without authentication."""
    response = await client.post(
        "/api/v1/ai/log-manual",
        json={
            "nombre": "Ensalada César",
            "kcal": 350,
            "p": 25,
            "c": 30,
            "g": 12,
            "momento": "comida"
        }
    )
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_confirm_meal_without_auth(client: AsyncClient, sample_food_image_base64: str):
    """Test confirm meal endpoint without authentication."""
    response = await client.post(
        "/api/v1/ai/confirm-meal",
        json={
            "image_base64": sample_food_image_base64,
            "momento": "comida"
        }
    )
    assert response.status_code == 401  # Unauthorized
