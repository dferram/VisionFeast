"""Endpoints de IA para análisis nutricional, recetas y planes."""
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from app.schemas.ai_schema import (
    FoodAnalysisRequest,
    FoodAnalysisResponse,
    RecipeRequest,
    RecipeResponse,
    PlanRequest,
    PlanResponse,
    PatternAnalysisResponse,
    ManualMealRequest
)
from app.services.gemini_service import gemini_service
from app.services.elevenlabs_service import elevenlabs_service
from app.core.security import get_current_active_user
from app.models.user_model import User
from app.models.meal_log_model import MealLog
import base64
import logging
from typing import List, Dict, Any
import google.generativeai as genai

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI Services"])

@router.get("/debug-gemini")
async def debug_gemini():
    """Diagnóstico: lista modelos disponibles y prueba la API key."""
    try:
        models = []
        for m in genai.list_models():
            models.append({
                "name": m.name,
                "supported_methods": m.supported_generation_methods
            })
        
        # Prueba rápida de generación
        test_model = gemini_service.text_model
        test_response = test_model.generate_content("Di 'hola' en una palabra")
        
        return {
            "status": "ok",
            "model_in_use": test_model.model_name,
            "test_response": test_response.text[:100],
            "available_models": models[:10],
            "total_models": len(models)
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "error_type": type(e).__name__
        }


@router.post("/generate-recipes")
async def generate_recipes_endpoint(
    request: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Genera recetas con IA basadas en ingredientes disponibles."""
    ingredients = request.get("ingredients", [])
    DEMO_RECIPES = [
        {"titulo": "Bowl Proteico de Pollo y Frijol", "descripcion": "Alto en proteinas, perfecto post-gym.", "tiempo": "25 min", "kcal": 450, "macros": {"p": 38, "c": 42, "g": 12}, "pasos": ["Cocina arroz con sal y limon", "Saltea pechuga en cubos con ajo", "Calienta frijoles con cebolla", "Arma el bowl con todo", "Agrega limon y salsa"]},
        {"titulo": "Huevos Rancheros Fit", "descripcion": "Desayuno mexicano nutritivo.", "tiempo": "15 min", "kcal": 380, "macros": {"p": 24, "c": 30, "g": 18}, "pasos": ["Calienta tortillas en comal", "Frie huevos en aceite de oliva", "Prepara salsa con jitomate", "Sirve huevos sobre tortillas", "Acompana con frijoles"]},
        {"titulo": "Pasta con Verduras Salteadas", "descripcion": "Rapida, balanceada y con fibra.", "tiempo": "20 min", "kcal": 410, "macros": {"p": 16, "c": 58, "g": 14}, "pasos": ["Hierve pasta al dente", "Saltea brocoli y zanahoria", "Mezcla pasta con verduras", "Agrega aceite de oliva y queso", "Sazona al gusto"]},
        {"titulo": "Ensalada Power de Atun", "descripcion": "Ligera y super nutritiva.", "tiempo": "10 min", "kcal": 320, "macros": {"p": 30, "c": 15, "g": 16}, "pasos": ["Escurre y desmenuza atun", "Pica jitomate y aguacate", "Mezcla en un bowl", "Agrega limon y aceite", "Sirve sobre espinaca"]},
    ]
    try:
        import json as jmod
        prompt = f"Eres un chef nutriologo mexicano. Crea 3 recetas saludables con: {', '.join(ingredients)}. Responde SOLO en JSON: lista de objetos con titulo, descripcion, tiempo, kcal (numero), macros (p,c,g), pasos (lista strings)."
        response = gemini_service.text_model.generate_content(prompt)
        rt = response.text.strip()
        if "```json" in rt:
            rt = rt.split("```json")[1].split("```")[0].strip()
        elif "```" in rt:
            rt = rt.split("```")[1].split("```")[0].strip()
        recipes = jmod.loads(rt)
        return {"recipes": recipes, "source": "gemini"}
    except Exception as e:
        logger.warning(f"Gemini no disponible para recetas: {e}")
        return {"recipes": DEMO_RECIPES[:3], "source": "demo"}


@router.post("/generate-routine")
async def generate_routine(
    request: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Genera una rutina de ejercicios con IA basada en un objetivo."""
    goal = request.get("goal", "Entrenamiento General")
    
    DEMO_ROUTINE = [
        {"nombre": "Sentadilla con Barra", "series": 4, "reps": 10, "descanso": 90, "notas": "Baja controlado"},
        {"nombre": "Press de Banca", "series": 4, "reps": 12, "descanso": 60, "notas": "Retracción escapular"},
        {"nombre": "Peso Muerto Rumano", "series": 3, "reps": 12, "descanso": 75, "notas": "Siente el estiramiento"},
        {"nombre": "Dominadas", "series": 3, "reps": 8, "descanso": 60, "notas": "Pecho al cielo"},
    ]
    
    try:
        import json as jmod
        prompt = f"""Eres un experto Performance Coach. Crea una rutina de entrenamiento para este objetivo: "{goal}".
Responde SOLO en JSON: una lista de objetos. Cada objeto tiene: nombre, series (numero), reps (numero), descanso (segundos, numero), notas (string corto)."""
        
        response = gemini_service.text_model.generate_content(prompt)
        rt = response.text.strip()
        if "```json" in rt:
            rt = rt.split("```json")[1].split("```")[0].strip()
        elif "```" in rt:
            rt = rt.split("```")[1].split("```")[0].strip()
        
        routine = jmod.loads(rt)
        return {"routine": routine, "source": "gemini"}
    except Exception as e:
        logger.warning(f"Gemini no disponible para rutinas: {e}")
        return {"routine": DEMO_ROUTINE, "source": "demo"}


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
        
        # Generar audio del coach insight con ElevenLabs
        try:
            audio_base64 = await elevenlabs_service.text_to_speech_base64(coach_insight)
            analysis["audio_base64"] = audio_base64
        except Exception as e:
            print(f"Error generando audio: {e}")
            analysis["audio_base64"] = None
        
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
                "coach_insight": coach_insight,
                "ingredientes": analysis.get("ingredientes", []),
                "advertencias": analysis.get("advertencias", [])
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

@router.post("/log-manual", response_model=Dict[str, Any])
async def log_manual_meal(
    request: ManualMealRequest,
    current_user: User = Depends(get_current_active_user)
):
    """
    Registro manual de comida: Permite al usuario ingresar los datos nutricionales
    directamente sin usar análisis de imagen.
    """
    try:
        meal_log = MealLog(
            user_id=current_user.id,
            comida={
                "nombre": request.nombre,
                "foto_url": "",
                "momento": request.momento
            },
            analisis_ia={
                "kcal": request.kcal,
                "macros": {"p": request.p, "c": request.c, "g": request.g},
                "confidence_score": 1.0,
                "coach_insight": "Registro manual ingresado por el usuario."
            }
        )
        await meal_log.insert()
        return {"status": "success", "message": "Comida registrada correctamente", "id": str(meal_log.id)}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al registrar comida manual: {str(e)}"
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
        
        # Generar audio de las instrucciones con ElevenLabs
        try:
            instructions_text = f"{recipe['titulo']}. {recipe['descripcion']}. "
            instructions_text += "Instrucciones: " + ". ".join(recipe['instrucciones'])
            
            audio_base64 = await elevenlabs_service.text_to_speech_base64(instructions_text)
            recipe["audio_base64"] = audio_base64
        except Exception as e:
            print(f"Error generando audio de receta: {e}")
            recipe["audio_base64"] = None
        
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
        
        # Generar audio del resumen del plan con ElevenLabs
        try:
            plan_summary = f"{plan.get('titulo', '')}. {plan.get('descripcion', '')}. "
            if plan.get('consejos'):
                plan_summary += "Consejos principales: " + ". ".join(plan.get('consejos', [])[:3])
            
            audio_base64 = await elevenlabs_service.text_to_speech_base64(plan_summary)
        except Exception as e:
            print(f"Error generando audio de plan: {e}")
            audio_base64 = None
        
        return PlanResponse(
            titulo=plan.get("titulo", ""),
            descripcion=plan.get("descripcion", ""),
            contenido=plan,
            consejos=plan.get("consejos", []),
            audio_base64=audio_base64
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
