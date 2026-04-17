"""Tests for authentication endpoints."""
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_google_auth_missing_token(client: AsyncClient):
    """Test Google auth endpoint without token."""
    response = await client.post("/api/v1/auth/google", json={})
    assert response.status_code == 422  # Validation error

@pytest.mark.asyncio
async def test_google_auth_invalid_token(client: AsyncClient, mock_google_token: str):
    """Test Google auth endpoint with invalid token."""
    response = await client.post(
        "/api/v1/auth/google",
        json={"token": "invalid_token_12345"}
    )
    # Should return error (401 or 400) since token is invalid
    assert response.status_code in [400, 401, 500]

@pytest.mark.asyncio
async def test_get_me_without_auth(client: AsyncClient):
    """Test get current user without authentication."""
    response = await client.get("/api/v1/auth/me")
    assert response.status_code == 401  # Unauthorized

@pytest.mark.asyncio
async def test_update_me_without_auth(client: AsyncClient):
    """Test update current user without authentication."""
    response = await client.patch(
        "/api/v1/auth/me",
        json={"full_name": "Test User"}
    )
    assert response.status_code == 401  # Unauthorized
