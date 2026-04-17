"""Tests for test endpoints."""
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_ping_endpoint(client: AsyncClient):
    """Test ping endpoint returns correct response."""
    response = await client.get("/api/v1/test/ping")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "VisionFeast API is running"
    assert data["status"] == "ok"
    assert "data" in data
    assert "version" in data["data"]
    assert "features" in data["data"]

@pytest.mark.asyncio
async def test_ai_config_endpoint(client: AsyncClient):
    """Test AI configuration endpoint."""
    response = await client.get("/api/v1/test/ai-config")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "AI Configuration Status"
    assert data["status"] == "ok"
    assert "data" in data
    assert "gemini_configured" in data["data"]
    assert "available_endpoints" in data["data"]
    assert len(data["data"]["available_endpoints"]) > 0

@pytest.mark.asyncio
async def test_mock_analysis_endpoint(client: AsyncClient):
    """Test mock food analysis endpoint."""
    response = await client.post("/api/v1/test/ai-mock-analysis")
    assert response.status_code == 200
    data = response.json()
    assert "nombre" in data
    assert "kcal" in data
    assert "macros" in data
    assert "coach_insight" in data
    assert "note" in data
    assert "MOCK" in data["note"]

@pytest.mark.asyncio
async def test_database_status_endpoint(client: AsyncClient):
    """Test database status endpoint."""
    response = await client.get("/api/v1/test/database-status")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "status" in data
    assert "data" in data
    assert "models_registered" in data["data"]
    assert "User" in data["data"]["models_registered"]
    assert "MealLog" in data["data"]["models_registered"]
