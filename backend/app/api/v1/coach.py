from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any, Dict
from app.models.user_model import User, UserRole
from app.models.request_model import CoachingRequest, RequestStatus
from app.core.security import get_current_active_user
from beanie import PydanticObjectId
from datetime import datetime

router = APIRouter(prefix="/coach", tags=["Coach Services"])

@router.get("/my-clients", response_model=List[Dict[str, Any]])
async def get_my_clients(current_user: User = Depends(get_current_active_user)):
    """
    Obtiene la lista de clientes asignados al coach actual.
    """
    if current_user.role != UserRole.COACH:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo los entrenadores pueden acceder a esta información"
        )
    
    clients = await User.find(User.coach_id == str(current_user.id)).to_list()
    
    return [
        {
            "id": str(c.id),
            "full_name": c.full_name,
            "email": c.email,
            "picture": c.picture,
            "goals": c.health_goals,
            "created_at": c.created_at
        } for c in clients
    ]

@router.get("/dashboard-stats")
async def get_coach_stats(current_user: User = Depends(get_current_active_user)):
    """
    Obtiene estadísticas generales para el dashboard del coach.
    """
    if current_user.role != UserRole.COACH:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    total_clients = await User.find(User.coach_id == str(current_user.id)).count()
    pending_requests = await CoachingRequest.find(
        CoachingRequest.professional_id == str(current_user.id),
        CoachingRequest.status == RequestStatus.PENDING
    ).count()

    return {
        "total_clients": total_clients,
        "avg_compliance": 85 if total_clients > 0 else 0,
        "active_programs": 12,
        "recent_alerts": 3,
        "pending_requests": pending_requests
    }

@router.get("/pending-requests", response_model=List[CoachingRequest])
async def get_pending_requests(current_user: User = Depends(get_current_active_user)):
    """
    Lista las peticiones de asesoría pendientes para el coach.
    """
    if current_user.role != UserRole.COACH:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    return await CoachingRequest.find(
        CoachingRequest.professional_id == str(current_user.id),
        CoachingRequest.status == RequestStatus.PENDING
    ).to_list()

@router.post("/handle-request/{request_id}")
async def handle_request(
    request_id: str,
    action: str, # 'accepted' or 'rejected'
    current_user: User = Depends(get_current_active_user)
):
    """
    Acepta o rechaza una petición de asesoría.
    """
    if current_user.role != UserRole.COACH:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    req = await CoachingRequest.get(request_id)
    if not req or req.professional_id != str(current_user.id):
        raise HTTPException(status_code=404, detail="Petición no encontrada")
    
    req.status = RequestStatus(action)
    req.updated_at = datetime.utcnow()
    await req.save()
    
    if action == "accepted":
        client = await User.get(req.client_id)
        if client:
            client.coach_id = str(current_user.id)
            await client.save()
            
    return {"message": f"Petición {action} correctamente"}