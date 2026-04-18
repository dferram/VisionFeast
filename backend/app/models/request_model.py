from datetime import datetime
from enum import Enum
from typing import Optional
from beanie import Document, Indexed
from pydantic import Field

class RequestStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

class CoachingRequest(Document):
    client_id: str
    professional_id: str
    professional_role: str # 'coach' or 'nutritionist'
    client_name: str
    status: RequestStatus = RequestStatus.PENDING
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "coaching_requests"
        indexes = [
            "client_id",
            "professional_id",
            "status"
        ]
