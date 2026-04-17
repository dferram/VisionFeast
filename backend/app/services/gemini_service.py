"""Servicio de IA con Google Gemini para análisis nutricional y generación de contenido."""
import google.generativeai as genai
from app.core.config import settings
from typing import Dict, Any, Optional, List
import json
import base64

genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    """Servicio para interactuar con Google Gemini AI."""
    
    def __init__(self):
        self.vision_model = genai.GenerativeModel('gemini-1.5-flash')
        self.text_model = genai.GenerativeModel('gemini-1.5-flash')
    
    async def analyze_food_image(
        self, 
        image_data: bytes, 
        user_goals: Dict[str, Any],
        medical_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Análisis de Visión Nutricional: Procesa la fotografía de la comida para identificar 
        los alimentos y estimar automáticamente las calorías y los macronutrientes.
        
        Args:
            image_data: Bytes de la imagen de la comida
            user_goals: Objetivos del usuario (meta, kcal_diarias, macros_target)
            medical_context: Contexto médico del usuario (alergias, condiciones)
            
        Returns:
            Dict con análisis nutricional completo
        """
        prompt = f"""Analiza esta imagen de comida y proporciona un análisis nutricional detallado.

Contexto del usuario:
- Meta: {user_goals.get('meta', 'Mantener')}
- Calorías objetivo diarias: {user_goals.get('kcal_diarias', 2000)} kcal
- Macros objetivo: {user_goals.get('macros_target', {})}
{f"- Contexto médico: {medical_context}" if medical_context else ""}

Proporciona la respuesta en formato JSON con esta estructura exacta:
{{
    "nombre": "Nombre descriptivo del platillo",
    "kcal": número estimado de calorías,
    "macros": {{
        "p": gramos de proteína,
        "c": gramos de carbohidratos,
        "g": gramos de grasas
    }},
    "confidence_score": número entre 0 y 1 indicando confianza del análisis,
    "ingredientes": ["lista", "de", "ingredientes", "identificados"],
    "advertencias": ["lista de advertencias si hay ingredientes no recomendados según contexto médico"]
}}

Sé preciso y realista en las estimaciones."""

        try:
            response = self.vision_model.generate_content([prompt, {"mime_type": "image/jpeg", "data": image_data}])
            
            result_text = response.text.strip()
            if result_text.startswith("```json"):
                result_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                result_text = result_text[3:-3].strip()
            
            analysis = json.loads(result_text)
            return analysis
            
        except Exception as e:
            raise Exception(f"Error al analizar imagen con Gemini: {str(e)}")
    
    async def generate_coach_insight(
        self,
        meal_analysis: Dict[str, Any],
        user_profile: Dict[str, Any],
        daily_progress: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generación de "Coach Insights": Genera un comentario de retroalimentación inmediata
        sobre si la comida se alinea con los objetivos del usuario.
        
        Args:
            meal_analysis: Análisis nutricional de la comida
            user_profile: Perfil completo del usuario con objetivos
            daily_progress: Progreso del día hasta el momento
            
        Returns:
            Mensaje personalizado del coach virtual
        """
        prompt = f"""Eres un coach nutricional virtual amigable y motivador. 

Información del usuario:
- Nombre: {user_profile.get('nombre', 'Usuario')}
- Meta: {user_profile.get('meta', 'Mantener')} peso
- Objetivo calórico diario: {user_profile.get('kcal_diarias', 2000)} kcal
- Macros objetivo: Proteínas {user_profile.get('macros_target', {}).get('proteinas', 0)}g, Carbohidratos {user_profile.get('macros_target', {}).get('carbohidratos', 0)}g, Grasas {user_profile.get('macros_target', {}).get('grasas', 0)}g

Comida actual:
- {meal_analysis.get('nombre', 'Comida')}
- Calorías: {meal_analysis.get('kcal', 0)} kcal
- Proteínas: {meal_analysis.get('macros', {}).get('p', 0)}g
- Carbohidratos: {meal_analysis.get('macros', {}).get('c', 0)}g
- Grasas: {meal_analysis.get('macros', {}).get('g', 0)}g

{f"Progreso del día: {daily_progress.get('kcal_consumidas', 0)} kcal consumidas de {user_profile.get('kcal_diarias', 2000)} kcal" if daily_progress else ""}

Genera un comentario breve (2-3 oraciones) que:
1. Reconozca la elección de comida
2. Indique si se alinea con sus objetivos
3. Proporcione un consejo práctico o motivación

Sé positivo, específico y personalizado. No uses formato markdown."""

        try:
            response = self.text_model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            raise Exception(f"Error al generar coach insight: {str(e)}")
    
    async def create_intelligent_recipe(
        self,
        ingredients: List[str],
        dietary_preferences: Optional[List[str]] = None,
        target_macros: Optional[Dict[str, float]] = None,
        medical_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Creador de Recetas Inteligentes: Utiliza los ingredientes detectados o las preferencias
        del usuario para proponer instrucciones de cocina detalladas y su información nutricional.
        
        Args:
            ingredients: Lista de ingredientes disponibles
            dietary_preferences: Preferencias dietéticas (vegetariano, vegano, etc.)
            target_macros: Macros objetivo para la receta
            medical_context: Contexto médico (alergias, restricciones)
            
        Returns:
            Receta completa con instrucciones y análisis nutricional
        """
        prompt = f"""Crea una receta saludable y deliciosa con los siguientes parámetros:

Ingredientes disponibles: {', '.join(ingredients)}
{f"Preferencias dietéticas: {', '.join(dietary_preferences)}" if dietary_preferences else ""}
{f"Macros objetivo: Proteínas {target_macros.get('proteinas', 0)}g, Carbohidratos {target_macros.get('carbohidratos', 0)}g, Grasas {target_macros.get('grasas', 0)}g" if target_macros else ""}
{f"Restricciones médicas: {medical_context}" if medical_context else ""}

Proporciona la respuesta en formato JSON con esta estructura:
{{
    "titulo": "Nombre atractivo de la receta",
    "descripcion": "Descripción breve y apetitosa",
    "instrucciones": ["Paso 1", "Paso 2", "Paso 3", ...],
    "tiempo_preparacion": "tiempo en minutos",
    "porciones": número de porciones,
    "nutricion": {{
        "kcal_totales": calorías totales,
        "macros": {{
            "p": gramos de proteína,
            "c": gramos de carbohidratos,
            "g": gramos de grasas
        }}
    }},
    "ingredientes_detallados": [
        {{"ingrediente": "nombre", "cantidad": "cantidad con unidad"}},
        ...
    ]
}}

Asegúrate de que la receta sea práctica, saludable y respete las restricciones médicas."""

        try:
            response = self.text_model.generate_content(prompt)
            result_text = response.text.strip()
            
            if result_text.startswith("```json"):
                result_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                result_text = result_text[3:-3].strip()
            
            recipe = json.loads(result_text)
            return recipe
            
        except Exception as e:
            raise Exception(f"Error al crear receta inteligente: {str(e)}")
    
    async def generate_dynamic_plan(
        self,
        user_profile: Dict[str, Any],
        plan_type: str,
        duration_days: int = 7
    ) -> Dict[str, Any]:
        """
        Sugerencia de Planes Dinámicos: Propone borradores de planes semanales de nutrición
        o rutinas de ejercicio basados en la meta del usuario.
        
        Args:
            user_profile: Perfil completo del usuario
            plan_type: Tipo de plan ("nutricion" o "entrenamiento")
            duration_days: Duración del plan en días
            
        Returns:
            Plan completo generado por IA
        """
        if plan_type == "nutricion":
            return await self._generate_nutrition_plan(user_profile, duration_days)
        elif plan_type == "entrenamiento":
            return await self._generate_training_plan(user_profile, duration_days)
        else:
            raise ValueError(f"Tipo de plan no válido: {plan_type}")
    
    async def _generate_nutrition_plan(
        self,
        user_profile: Dict[str, Any],
        duration_days: int
    ) -> Dict[str, Any]:
        """Genera un plan nutricional personalizado."""
        prompt = f"""Crea un plan nutricional personalizado de {duration_days} días.

Perfil del usuario:
- Meta: {user_profile.get('meta', 'Mantener')} peso
- Calorías diarias objetivo: {user_profile.get('kcal_diarias', 2000)} kcal
- Macros objetivo: Proteínas {user_profile.get('macros_target', {}).get('proteinas', 0)}g, Carbohidratos {user_profile.get('macros_target', {}).get('carbohidratos', 0)}g, Grasas {user_profile.get('macros_target', {}).get('grasas', 0)}g
- Nivel de actividad: {user_profile.get('nivel_actividad', 3)}/5
- Preferencias dietéticas: {user_profile.get('dieta_especifica', 'Ninguna')}
{f"- Contexto médico: {user_profile.get('medical_context', '')}" if user_profile.get('medical_context') else ""}

Genera un plan variado y balanceado en formato JSON:
{{
    "titulo": "Nombre del plan",
    "descripcion": "Descripción breve del enfoque del plan",
    "objetivo_kcal_diario": calorías objetivo,
    "dias": [
        {{
            "dia": 1,
            "comidas": [
                {{
                    "momento": "desayuno",
                    "nombre": "Nombre del platillo",
                    "descripcion": "Descripción breve",
                    "kcal": calorías,
                    "macros": {{"p": 0, "c": 0, "g": 0}}
                }},
                // ... más comidas (comida, cena, snacks)
            ]
        }},
        // ... más días
    ],
    "consejos": ["Consejo 1", "Consejo 2", ...]
}}

Asegúrate de que el plan sea variado, respete las restricciones médicas y se alinee con la meta del usuario."""

        try:
            response = self.text_model.generate_content(prompt)
            result_text = response.text.strip()
            
            if result_text.startswith("```json"):
                result_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                result_text = result_text[3:-3].strip()
            
            plan = json.loads(result_text)
            return plan
            
        except Exception as e:
            raise Exception(f"Error al generar plan nutricional: {str(e)}")
    
    async def _generate_training_plan(
        self,
        user_profile: Dict[str, Any],
        duration_days: int
    ) -> Dict[str, Any]:
        """Genera un plan de entrenamiento personalizado."""
        prompt = f"""Crea un plan de entrenamiento personalizado de {duration_days} días.

Perfil del usuario:
- Meta: {user_profile.get('meta', 'Mantener')} peso
- Nivel de actividad: {user_profile.get('nivel_actividad', 3)}/5
- Edad: {user_profile.get('edad', 25)} años
- Género: {user_profile.get('genero', 'No especificado')}
{f"- Contexto médico: {user_profile.get('medical_context', '')}" if user_profile.get('medical_context') else ""}

Genera un plan de entrenamiento progresivo en formato JSON:
{{
    "titulo": "Nombre del plan de entrenamiento",
    "descripcion": "Descripción del enfoque y objetivos",
    "nivel": "principiante/intermedio/avanzado",
    "dias": [
        {{
            "dia": 1,
            "nombre_sesion": "Nombre de la sesión (ej: Pecho y Tríceps)",
            "ejercicios": [
                {{
                    "nombre": "Nombre del ejercicio",
                    "series": 4,
                    "reps": "8-12",
                    "descanso_segundos": 60,
                    "notas": "Notas técnicas importantes"
                }},
                // ... más ejercicios
            ],
            "duracion_estimada_min": 60
        }},
        // ... más días
    ],
    "advertencias": ["Advertencia 1 basada en contexto médico", ...],
    "consejos": ["Consejo técnico 1", "Consejo 2", ...]
}}

IMPORTANTE: 
- Respeta las limitaciones del contexto médico (lesiones, condiciones)
- Ajusta la intensidad al nivel de actividad del usuario
- Incluye calentamiento y enfriamiento
- Proporciona alternativas para ejercicios que puedan ser problemáticos"""

        try:
            response = self.text_model.generate_content(prompt)
            result_text = response.text.strip()
            
            if result_text.startswith("```json"):
                result_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                result_text = result_text[3:-3].strip()
            
            plan = json.loads(result_text)
            return plan
            
        except Exception as e:
            raise Exception(f"Error al generar plan de entrenamiento: {str(e)}")
    
    async def analyze_eating_patterns(
        self,
        meal_logs: List[Dict[str, Any]],
        user_profile: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Análisis de Patrones para Alertas: Analiza la frecuencia y el tipo de registros
        para detectar patrones de conducta que sugieran ansiedad o trastornos alimentarios.
        
        Args:
            meal_logs: Historial de comidas del usuario
            user_profile: Perfil del usuario
            
        Returns:
            Análisis de patrones con alertas si es necesario
        """
        meals_summary = "\n".join([
            f"- {log.get('comida', {}).get('nombre', 'Comida')} ({log.get('analisis_ia', {}).get('kcal', 0)} kcal) - {log.get('creado_at', '')}"
            for log in meal_logs[-30:]  # Últimos 30 registros
        ])
        
        prompt = f"""Analiza los patrones alimentarios de este usuario como un profesional de la salud mental.

Perfil del usuario:
- Meta: {user_profile.get('meta', 'Mantener')}
- Objetivo calórico: {user_profile.get('kcal_diarias', 2000)} kcal/día

Historial reciente de comidas:
{meals_summary}

Analiza y proporciona respuesta en JSON:
{{
    "patron_detectado": "descripción del patrón observado",
    "nivel_alerta": "bajo/medio/alto",
    "indicadores": ["indicador 1", "indicador 2", ...],
    "recomendaciones": ["recomendación 1", "recomendación 2", ...],
    "requiere_atencion_profesional": true/false,
    "notas_para_especialista": "Notas técnicas para el psicólogo/nutriólogo"
}}

Busca señales de:
- Restricción calórica extrema
- Atracones o consumo excesivo
- Patrones irregulares de alimentación
- Falta de variedad nutricional
- Comportamientos compensatorios"""

        try:
            response = self.text_model.generate_content(prompt)
            result_text = response.text.strip()
            
            if result_text.startswith("```json"):
                result_text = result_text[7:-3].strip()
            elif result_text.startswith("```"):
                result_text = result_text[3:-3].strip()
            
            analysis = json.loads(result_text)
            return analysis
            
        except Exception as e:
            raise Exception(f"Error al analizar patrones alimentarios: {str(e)}")

gemini_service = GeminiService()
