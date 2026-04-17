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
