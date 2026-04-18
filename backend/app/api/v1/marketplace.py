from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any, Dict, Optional
from app.models.user_model import User, UserRole
from app.models.request_model import CoachingRequest, RequestStatus
from app.core.security import get_current_active_user
from beanie import PydanticObjectId

router = APIRouter(prefix="/marketplace", tags=["Marketplace & Social"])

@router.get("/professionals", response_model=List[Dict[str, Any]])
async def list_professionals(role: Optional[UserRole] = None):
    """
    Lista todos los profesionales disponibles (Coaches o Nutriólogos).
    """
    query = {"role": {"$in": [UserRole.COACH, UserRole.NUTRITIONIST]}}
    if role:
        query["role"] = role
    
    professionals = await User.find(query).to_list()
    
    return [
        {
            "id": str(p.id),
            "full_name": p.full_name,
            "email": p.email,
            "role": p.role,
            "picture": p.picture,
            "specialization": p.specialization,
            "years_experience": p.years_experience,
            "bio": p.bio
        } for p in professionals
    ]

@router.post("/request-advice")
async def request_advice(
    professional_id: str,
    message: Optional[str] = None,
    current_user: User = Depends(get_current_active_user)
):
    """
    Envía una petición de asesoría a un profesional.
    """
    # Verificar si el profesional existe
    prof = await User.get(professional_id)
    if not prof or prof.role not in [UserRole.COACH, UserRole.NUTRITIONIST]:
        raise HTTPException(status_code=404, detail="Profesional no encontrado")
    
    # Verificar si ya existe una petición pendiente
    existing = await CoachingRequest.find_one(
        CoachingRequest.client_id == str(current_user.id),
        CoachingRequest.professional_id == professional_id,
        CoachingRequest.status == RequestStatus.PENDING
    )
    if existing:
        raise HTTPException(status_code=400, detail="Ya tienes una petición pendiente con este profesional")
    
    # Crear la petición
    new_request = CoachingRequest(
        client_id=str(current_user.id),
        professional_id=professional_id,
        professional_role=prof.role,
        client_name=current_user.full_name,
        message=message
    )
    await new_request.insert()
    
    return {"message": "Petición enviada correctamente", "request_id": str(new_request.id)}

@router.get("/my-requests")
async def get_my_requests(current_user: User = Depends(get_current_active_user)):
    """
    Lista las peticiones enviadas por el usuario actual.
    """
    requests = await CoachingRequest.find(CoachingRequest.client_id == str(current_user.id)).to_list()
    return requests
