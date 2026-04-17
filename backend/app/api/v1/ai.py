"""Endpoints de IA para análisis nutricional, recetas y planes."""
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from app.schemas.ai_schema import (
    FoodAnalysisRequest,
    FoodAnalysisResponse,
    RecipeRequest,
    RecipeResponse,
    PlanRequest,
    PlanResponse,
    PatternAnalysisResponse
)
from app.services.gemini_service import gemini_service
from app.core.security import get_current_active_user
from app.models.user_model import User
from app.models.meal_log_model import MealLog
import base64
from typing import List

router = APIRouter(prefix="/ai", tags=["AI Services"])

@router.post("/analyze-food", response_model=FoodAnalysisResponse)
async def analyze_food_image(
    request: FoodAnalysisRequest,
    current_user: User = Depends(get_current_active_user)
):
    """
    Análisis de Visión Nutricional: Analiza una imagen de comida y proporciona
    información nutricional completa con coach insights personalizados.
    """
    try:
        image_data = base64.b64decode(request.image_base64)
        
        user_goals = {
            "meta": getattr(current_user, "meta", "Mantener"),
            "kcal_diarias": getattr(current_user, "kcal_diarias", 2000),
            "macros_target": getattr(current_user, "macros_target", {})
        }
        
        medical_context = getattr(current_user, "medical_context", None)
        
        analysis = await gemini_service.analyze_food_image(
            image_data=image_data,
            user_goals=user_goals,
            medical_context=medical_context
        )
        
        user_profile = {
            "nombre": current_user.full_name,
            "meta": user_goals["meta"],
            "kcal_diarias": user_goals["kcal_diarias"],
            "macros_target": user_goals["macros_target"]
        }
        
        coach_insight = await gemini_service.generate_coach_insight(
            meal_analysis=analysis,
            user_profile=user_profile
        )
        
        analysis["coach_insight"] = coach_insight
        
        meal_log = MealLog(
            user_id=current_user.id,
            comida={
                "nombre": analysis["nombre"],
                "foto_url": "",
                "momento": request.momento
            },
            analisis_ia={
                "kcal": analysis["kcal"],
                "macros": analysis["macros"],
                "confidence_score": analysis["confidence_score"],
                "coach_insight": coach_insight
            }
        )
        await meal_log.insert()
        
        return FoodAnalysisResponse(**analysis)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al analizar imagen: {str(e)}"
        )

@router.post("/analyze-food-upload")
async def analyze_food_upload(
    file: UploadFile = File(...),
    momento: str = "comida",
    current_user: User = Depends(get_current_active_user)
):
    """
    Análisis de comida mediante upload directo de archivo.
    """
    try:
        image_data = await file.read()
        
        user_goals = {
            "meta": getattr(current_user, "meta", "Mantener"),
            "kcal_diarias": getattr(current_user, "kcal_diarias", 2000),
            "macros_target": getattr(current_user, "macros_target", {})
        }
        
        medical_context = getattr(current_user, "medical_context", None)
        
        analysis = await gemini_service.analyze_food_image(
            image_data=image_data,
            user_goals=user_goals,
            medical_context=medical_context
        )
        
        user_profile = {
            "nombre": current_user.full_name,
            "meta": user_goals["meta"],
            "kcal_diarias": user_goals["kcal_diarias"],
            "macros_target": user_goals["macros_target"]
        }
        
        coach_insight = await gemini_service.generate_coach_insight(
            meal_analysis=analysis,
            user_profile=user_profile
        )
        
        analysis["coach_insight"] = coach_insight
        
        return FoodAnalysisResponse(**analysis)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al analizar imagen: {str(e)}"
        )

@router.post("/create-recipe", response_model=RecipeResponse)
async def create_intelligent_recipe(
    request: RecipeRequest,
    current_user: User = Depends(get_current_active_user)
):
    """
    Creador de Recetas Inteligentes: Genera recetas personalizadas basadas en
    ingredientes disponibles y preferencias del usuario.
    """
    try:
        medical_context = getattr(current_user, "medical_context", None)
        
        recipe = await gemini_service.create_intelligent_recipe(
            ingredients=request.ingredients,
            dietary_preferences=request.dietary_preferences,
            target_macros=request.target_macros,
            medical_context=medical_context
        )
        
        return RecipeResponse(**recipe)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear receta: {str(e)}"
        )

@router.post("/generate-plan", response_model=PlanResponse)
async def generate_dynamic_plan(
    request: PlanRequest,
    current_user: User = Depends(get_current_active_user)
):
    """
    Sugerencia de Planes Dinámicos: Genera planes personalizados de nutrición
    o entrenamiento basados en los objetivos del usuario.
    """
    try:
        user_profile = {
            "meta": getattr(current_user, "meta", "Mantener"),
            "kcal_diarias": getattr(current_user, "kcal_diarias", 2000),
            "macros_target": getattr(current_user, "macros_target", {}),
            "nivel_actividad": getattr(current_user, "nivel_actividad", 3),
            "dieta_especifica": getattr(current_user, "dieta_especifica", "Ninguna"),
            "medical_context": getattr(current_user, "medical_context", None),
            "edad": getattr(current_user, "edad", 25),
            "genero": getattr(current_user, "genero", "No especificado")
        }
        
        plan = await gemini_service.generate_dynamic_plan(
            user_profile=user_profile,
            plan_type=request.plan_type,
            duration_days=request.duration_days
        )
        
        return PlanResponse(
            titulo=plan.get("titulo", ""),
            descripcion=plan.get("descripcion", ""),
            contenido=plan,
            consejos=plan.get("consejos", [])
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al generar plan: {str(e)}"
        )

@router.get("/analyze-patterns", response_model=PatternAnalysisResponse)
async def analyze_eating_patterns(
    current_user: User = Depends(get_current_active_user)
):
    """
    Análisis de Patrones para Alertas: Analiza el historial de comidas del usuario
    para detectar patrones que puedan requerir atención profesional.
    """
    try:
        meal_logs = await MealLog.find(
            MealLog.user_id == current_user.id
        ).sort("-creado_at").limit(30).to_list()
        
        meal_logs_dict = [
            {
                "comida": log.comida,
                "analisis_ia": log.analisis_ia,
                "creado_at": log.creado_at.isoformat() if log.creado_at else ""
            }
            for log in meal_logs
        ]
        
        user_profile = {
            "meta": getattr(current_user, "meta", "Mantener"),
            "kcal_diarias": getattr(current_user, "kcal_diarias", 2000)
        }
        
        analysis = await gemini_service.analyze_eating_patterns(
            meal_logs=meal_logs_dict,
            user_profile=user_profile
        )
        
        return PatternAnalysisResponse(**analysis)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al analizar patrones: {str(e)}"
        )

@router.get("/my-meals")
async def get_my_meals(
    limit: int = 20,
    current_user: User = Depends(get_current_active_user)
):
    """
    Obtiene el historial de comidas del usuario.
    """
    try:
        meals = await MealLog.find(
            MealLog.user_id == current_user.id
        ).sort("-creado_at").limit(limit).to_list()
        
        return {
            "meals": [
                {
                    "id": str(meal.id),
                    "comida": meal.comida,
                    "analisis_ia": meal.analisis_ia,
                    "creado_at": meal.creado_at.isoformat() if meal.creado_at else None
                }
                for meal in meals
            ]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener comidas: {str(e)}"
        )
