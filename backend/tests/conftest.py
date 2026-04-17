"""Pytest configuration and fixtures."""
import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.fixture
async def client():
    """Create async test client."""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:
        yield ac

@pytest.fixture
def mock_google_token():
    """Mock Google OAuth token."""
    return "mock_google_token_12345"

@pytest.fixture
def sample_food_image_base64():
    """Sample base64 encoded image for testing."""
    # Minimal valid base64 image (1x1 pixel PNG)
    return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
