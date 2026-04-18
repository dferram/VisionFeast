"""Endpoints para gestión de planes de entrenamiento y nutrición."""
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_active_user
from app.models.user_model import User
from app.models.plan_model import Plan, TipoPlan, OrigenPlan, EstadoPlan
from beanie import PydanticObjectId
from typing import Optional
from datetime import datetime

router = APIRouter(prefix="/plans", tags=["Plans"])


@router.post("/create")
async def create_plan(
    plan_data: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Crear un plan (entrenamiento o nutrición). Solo profesionales."""
    if current_user.role not in ["coach", "nutritionist", "admin"]:
        raise HTTPException(status_code=403, detail="Solo profesionales pueden crear planes")
    
    client_id = plan_data.get("client_id")
    if not client_id:
        raise HTTPException(status_code=400, detail="Se requiere client_id")
    
    plan = Plan(
        user_id=PydanticObjectId(client_id),
        created_by=current_user.id,
        tipo_plan=plan_data.get("tipo_plan", "entrenamiento"),
        origen=OrigenPlan.PROFESIONAL,
        estado=EstadoPlan.ACTIVO,
        titulo=plan_data.get("titulo", "Plan sin título"),
        descripcion=plan_data.get("descripcion", ""),
        contenido=plan_data.get("contenido", {}),
    )
    await plan.insert()
    
    return {"message": "Plan creado exitosamente", "plan_id": str(plan.id)}


@router.get("/my-plans")
async def get_my_plans(
    tipo: Optional[str] = None,
    current_user: User = Depends(get_current_active_user)
):
    """Obtener planes asignados al usuario actual."""
    query = {"user_id": current_user.id}
    if tipo:
        query["tipo_plan"] = tipo
    
    plans = await Plan.find(query).sort("-creado_at").to_list()
    
    result = []
    for p in plans:
        result.append({
            "id": str(p.id),
            "tipo_plan": p.tipo_plan,
            "titulo": p.titulo,
            "descripcion": p.descripcion,
            "contenido": p.contenido,
            "estado": p.estado,
            "origen": p.origen,
            "creado_at": p.creado_at.isoformat(),
        })
    
    return {"plans": result}


@router.get("/client-plans/{client_id}")
async def get_client_plans(
    client_id: str,
    tipo: Optional[str] = None,
    current_user: User = Depends(get_current_active_user)
):
    """Obtener planes de un cliente específico (para coaches/nutriólogos)."""
    if current_user.role not in ["coach", "nutritionist", "admin"]:
        raise HTTPException(status_code=403, detail="Solo profesionales")
    
    query = {"user_id": PydanticObjectId(client_id)}
    if tipo:
        query["tipo_plan"] = tipo
    
    plans = await Plan.find(query).sort("-creado_at").to_list()
    
    result = []
    for p in plans:
        result.append({
            "id": str(p.id),
            "tipo_plan": p.tipo_plan,
            "titulo": p.titulo,
            "descripcion": p.descripcion,
            "contenido": p.contenido,
            "estado": p.estado,
            "creado_at": p.creado_at.isoformat(),
        })
    
    return {"plans": result}


@router.put("/update/{plan_id}")
async def update_plan(
    plan_id: str,
    plan_data: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Actualizar un plan existente."""
    plan = await Plan.get(PydanticObjectId(plan_id))
    if not plan:
        raise HTTPException(status_code=404, detail="Plan no encontrado")
    
    if plan_data.get("titulo"):
        plan.titulo = plan_data["titulo"]
    if plan_data.get("descripcion"):
        plan.descripcion = plan_data["descripcion"]
    if plan_data.get("contenido"):
        plan.contenido = plan_data["contenido"]
    if plan_data.get("estado"):
        plan.estado = plan_data["estado"]
    
    await plan.save()
    return {"message": "Plan actualizado"}


@router.delete("/delete/{plan_id}")
async def delete_plan(
    plan_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Eliminar un plan."""
    plan = await Plan.get(PydanticObjectId(plan_id))
    if not plan:
        raise HTTPException(status_code=404, detail="Plan no encontrado")
    
    await plan.delete()
    return {"message": "Plan eliminado"}
