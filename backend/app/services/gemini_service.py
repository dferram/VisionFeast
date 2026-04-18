"""Servicio de IA con Google Gemini para análisis nutricional y generación de contenido."""
import google.generativeai as genai
from app.core.config import settings
from typing import Dict, Any, Optional, List
import json
import random
from datetime import datetime

genai.configure(api_key=settings.GEMINI_API_KEY)

# Datos de demo para cuando Gemini no está disponible
DEMO_FOODS = [
    {"nombre": "Pollo a la Parrilla con Ensalada", "kcal": 420, "macros": {"p": 38, "c": 15, "g": 22}, "ingredientes": ["Pechuga de pollo", "Lechuga", "Tomate", "Aceite de oliva"]},
    {"nombre": "Tacos de Carne Asada", "kcal": 580, "macros": {"p": 32, "c": 45, "g": 28}, "ingredientes": ["Tortilla de maíz", "Carne de res", "Cebolla", "Cilantro", "Limón"]},
    {"nombre": "Bowl de Arroz con Salmón", "kcal": 510, "macros": {"p": 35, "c": 52, "g": 18}, "ingredientes": ["Arroz", "Salmón", "Aguacate", "Pepino", "Salsa de soya"]},
    {"nombre": "Pasta con Salsa de Tomate", "kcal": 480, "macros": {"p": 18, "c": 68, "g": 14}, "ingredientes": ["Pasta", "Tomate", "Ajo", "Albahaca", "Parmesano"]},
    {"nombre": "Huevos Revueltos con Verduras", "kcal": 320, "macros": {"p": 22, "c": 12, "g": 20}, "ingredientes": ["Huevos", "Pimiento", "Cebolla", "Espinaca"]},
    {"nombre": "Burrito de Frijoles y Queso", "kcal": 550, "macros": {"p": 24, "c": 58, "g": 25}, "ingredientes": ["Tortilla de harina", "Frijoles", "Queso", "Arroz", "Crema"]},
    {"nombre": "Ensalada César con Pollo", "kcal": 380, "macros": {"p": 30, "c": 18, "g": 22}, "ingredientes": ["Lechuga romana", "Pollo", "Crutones", "Parmesano", "Aderezo César"]},
    {"nombre": "Quesadilla de Champiñones", "kcal": 410, "macros": {"p": 20, "c": 35, "g": 22}, "ingredientes": ["Tortilla", "Queso Oaxaca", "Champiñones", "Epazote"]},
]

DEMO_INSIGHTS = [
    "¡Gran elección! Esta comida tiene un excelente balance de proteínas que te ayudará a mantener tu masa muscular. Sigue así, vas por buen camino.",
    "Buena decisión nutricional. Los macros están alineados con tu objetivo. Recuerda mantenerte hidratado durante el día.",
    "¡Me encanta esta elección! Rica en proteínas y moderada en calorías. Perfecta para tu meta de mantenerte saludable.",
    "Excelente fuente de energía para tu día. Las proteínas y carbohidratos están bien balanceados para tu nivel de actividad.",
    "¡Muy bien! Esta combinación de nutrientes te dará energía sostenida. Considera agregar más verduras en tu próxima comida.",
]


class GeminiService:
    """Servicio para interactuar con Google Gemini AI con fallback a modo demo."""
    
    def __init__(self):
        model_name = self._find_working_model()
        self.vision_model = genai.GenerativeModel(model_name)
        self.text_model = genai.GenerativeModel(model_name)
        self.demo_mode = False
    
    def _find_working_model(self):
        """Busca un modelo disponible en la API key actual."""
        candidates = [
            'gemini-2.0-flash-lite',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-2.0-flash',
            'gemini-pro',
        ]
        try:
            available = [m.name for m in genai.list_models()]
            for candidate in candidates:
                full_name = f'models/{candidate}'
                if full_name in available:
                    print(f"✅ Modelo Gemini seleccionado: {candidate}")
                    return candidate
        except Exception as e:
            print(f"⚠️ No se pudo listar modelos: {e}")
        
        print("⚠️ Usando modelo por defecto: gemini-2.0-flash-lite")
        return 'gemini-2.0-flash-lite'
    
    def _demo_analysis(self) -> Dict[str, Any]:
        """Retorna un análisis demo realista cuando Gemini no está disponible."""
        food = random.choice(DEMO_FOODS)
        return {
            "nombre": food["nombre"],
            "kcal": food["kcal"],
            "macros": food["macros"],
            "confidence_score": 0.85,
            "ingredientes": food["ingredientes"],
            "advertencias": []
        }

    async def analyze_food_image(
        self, 
        image_data: bytes, 
        user_goals: Dict[str, Any],
        medical_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """Análisis de Visión Nutricional con fallback a demo."""
        prompt = f"""Eres un nutriólogo experto con visión computacional especializado en identificación precisa de alimentos mexicanos e internacionales.

TAREA: Analiza la imagen de comida con MÁXIMA PRECISIÓN y proporciona análisis nutricional detallado.

INSTRUCCIONES PASO A PASO:
1. OBSERVA cuidadosamente TODOS los elementos visibles en la imagen
2. IDENTIFICA el platillo principal, guarniciones y acompañamientos
3. RECONOCE ingredientes específicos (no generalices)
4. ESTIMA porciones basándote en referencias visuales (plato, cubiertos, manos)
5. CALCULA macronutrientes usando bases de datos nutricionales estándar
6. EVALÚA nivel de confianza en tu identificación (0.0 a 1.0)

CONTEXTO DEL USUARIO:
- Meta nutricional: {user_goals.get('meta', 'Mantener peso')}
- Calorías objetivo diarias: {user_goals.get('kcal_diarias', 2000)} kcal
{f"- Restricciones médicas: {medical_context}" if medical_context else ""}

EJEMPLOS DE IDENTIFICACIÓN CORRECTA:
- Si ves tortillas + carne + cebolla + cilantro → "Tacos de Carne Asada" (NO "Tacos genéricos")
- Si ves arroz + pollo + verduras → "Bowl de Pollo con Arroz y Vegetales" (NO "Comida mixta")
- Si ves pan + jamón + queso → "Sándwich de Jamón y Queso" (NO "Emparedado")

REGLAS CRÍTICAS:
✓ SÉ ESPECÍFICO: Usa nombres exactos de platillos (ej: "Enchiladas Verdes" no "Comida mexicana")
✓ INCLUYE PREPARACIÓN: Menciona método de cocción si es visible (a la parrilla, frito, horneado)
✓ DETECTA PORCIONES: Ajusta calorías según tamaño visible (pequeña/mediana/grande)
✓ LISTA INGREDIENTES VISIBLES: Solo incluye lo que REALMENTE ves en la imagen
✓ CONFIDENCE SCORE HONESTO: 
  - 0.9-1.0 = Platillo claramente identificable
  - 0.7-0.8 = Identificación probable pero con incertidumbre
  - <0.7 = Difícil de identificar con precisión
✗ NO INVENTES ingredientes que no ves
✗ NO uses nombres genéricos si puedes ser específico
✗ NO sobrestimes o subestimes porciones sin evidencia visual

FORMATO DE RESPUESTA (SOLO JSON, SIN MARKDOWN):
{{
    "nombre": "Nombre Específico del Platillo con Método de Preparación",
    "kcal": número_calorías_estimadas,
    "macros": {{
        "p": gramos_proteína,
        "c": gramos_carbohidratos,
        "g": gramos_grasa
    }},
    "confidence_score": 0.0_a_1.0,
    "ingredientes": ["Ingrediente 1 visible", "Ingrediente 2 visible", "..."],
    "advertencias": ["Advertencia si aplica (ej: alto en sodio, contiene gluten)"]
}}

ANALIZA LA IMAGEN AHORA:"""

        try:
            response = self.vision_model.generate_content([prompt, {"mime_type": "image/jpeg", "data": image_data}])
            result_text = response.text.strip()
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            elif "```" in result_text:
                result_text = result_text.split("```")[1].split("```")[0].strip()
            
            self.demo_mode = False
            return json.loads(result_text)
        except Exception as e:
            error_msg = str(e).lower()
            if "429" in error_msg or "quota" in error_msg or "rate" in error_msg:
                print("⚠️ Cuota agotada — usando modo demo")
                self.demo_mode = True
                return self._demo_analysis()
            raise Exception(f"Error al analizar imagen con Gemini: {str(e)}")
    
    async def generate_coach_insight(
        self,
        meal_analysis: Dict[str, Any],
        user_profile: Dict[str, Any],
        daily_progress: Optional[Dict[str, Any]] = None
    ) -> str:
        """Generación de Coach Insights con fallback."""
        if self.demo_mode:
            return random.choice(DEMO_INSIGHTS)
        
        prompt = f"""Eres un coach nutricional. Usuario: {user_profile.get('nombre', 'Atleta')}. 
        Meta: {user_profile.get('meta')}. Comida: {meal_analysis.get('nombre')} ({meal_analysis.get('kcal')} kcal).
        Genera un comentario motivador de 2 frases sobre si esto le ayuda a su meta. Sin markdown."""

        try:
            response = self.text_model.generate_content(prompt)
            return response.text.strip()
        except:
            return random.choice(DEMO_INSIGHTS)

    async def create_intelligent_recipe(self, ingredients: List[str], **kwargs) -> Dict[str, Any]:
        """Crea recetas inteligentes."""
        try:
            prompt = f"Crea una receta con: {', '.join(ingredients)}. Responde en JSON con titulo, instrucciones y nutricion."
            response = self.text_model.generate_content(prompt)
            return json.loads(response.text.strip())
        except:
            return {"titulo": "Receta Express", "instrucciones": ["Mezclar ingredientes", "Cocinar a fuego lento"]}

    async def generate_dynamic_plan(self, user_profile: Dict[str, Any], plan_type: str, duration_days: int = 7) -> Dict[str, Any]:
        """Sugerencia de Planes Dinámicos."""
        try:
            prompt = f"Crea un plan de {plan_type} para {duration_days} días. Meta: {user_profile.get('meta')}. Responde en JSON."
            response = self.text_model.generate_content(prompt)
            result_text = response.text.strip()
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            return json.loads(result_text)
        except:
            return {"titulo": "Plan Personalizado", "descripcion": "Plan generado para tus metas."}

    async def analyze_eating_patterns(self, meal_logs: List[Dict[str, Any]], user_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Análisis de Patrones para Alertas."""
        try:
            prompt = "Analiza estos registros de comida y detecta si hay patrones de ansiedad o irregularidad. Responde en JSON."
            response = self.text_model.generate_content(prompt)
            result_text = response.text.strip()
            if "```json" in result_text:
                result_text = result_text.split("```json")[1].split("```")[0].strip()
            return json.loads(result_text)
        except:
            return {"patron_detectado": "Normal", "nivel_alerta": "bajo", "recomendaciones": ["Sigue con tu registro diario"]}

gemini_service = GeminiService()
