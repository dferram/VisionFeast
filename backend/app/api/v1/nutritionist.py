from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any, Dict
from app.models.user_model import User, UserRole
from app.models.request_model import CoachingRequest, RequestStatus
from app.core.security import get_current_active_user
from beanie import PydanticObjectId
from datetime import datetime

router = APIRouter(prefix="/nutritionist", tags=["Nutritionist Services"])

@router.get("/my-patients", response_model=List[Dict[str, Any]])
async def get_my_patients(current_user: User = Depends(get_current_active_user)):
    """
    Obtiene la lista de pacientes asignados al nutriólogo actual.
    """
    if current_user.role != UserRole.NUTRITIONIST:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo los nutriólogos pueden acceder a esta información"
        )
    
    patients = await User.find(User.nutritionist_id == str(current_user.id)).to_list()
    
    return [
        {
            "id": str(p.id),
            "full_name": p.full_name,
            "email": p.email,
            "picture": p.picture,
            "dietary_preferences": p.dietary_preferences,
            "kcal_diarias": p.kcal_diarias
        } for p in patients
    ]

@router.get("/dashboard-stats")
async def get_nutri_stats(current_user: User = Depends(get_current_active_user)):
    """
    Estadísticas para el dashboard del nutriólogo.
    """
    if current_user.role != UserRole.NUTRITIONIST:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    total_patients = await User.find(User.nutritionist_id == str(current_user.id)).count()
    pending_requests = await CoachingRequest.find(
        CoachingRequest.professional_id == str(current_user.id),
        CoachingRequest.status == RequestStatus.PENDING
    ).count()

    return {
        "total_patients": total_patients,
        "pending_reviews": 5, 
        "weekly_completions": 92,
        "pending_requests": pending_requests
    }

@router.get("/pending-requests", response_model=List[CoachingRequest])
async def get_pending_requests(current_user: User = Depends(get_current_active_user)):
    """
    Lista las peticiones de asesoría pendientes para el nutriólogo.
    """
    if current_user.role != UserRole.NUTRITIONIST:
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
    if current_user.role != UserRole.NUTRITIONIST:
        raise HTTPException(status_code=403, detail="No autorizado")
    
    req = await CoachingRequest.get(request_id)
    if not req or req.professional_id != str(current_user.id):
        raise HTTPException(status_code=404, detail="Petición no encontrada")
    
    req.status = RequestStatus(action)
    req.updated_at = datetime.utcnow()
    await req.save()
    
    if action == "accepted":
        patient = await User.get(req.client_id)
        if patient:
            patient.nutritionist_id = str(current_user.id)
            await patient.save()
            
    return {"message": f"Petición {action} correctamente"}