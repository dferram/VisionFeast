# VisionFeast - Documentación de Funcionalidades de IA con Gemini

## 📋 Resumen

El backend de VisionFeast integra Google Gemini AI para proporcionar análisis nutricional inteligente, generación de recetas, planes personalizados y detección de patrones alimentarios.

## 🤖 Funcionalidades Implementadas

### 1. Análisis de Visión Nutricional
**Endpoint:** `POST /api/v1/ai/analyze-food`

Gemini procesa fotografías de comida para identificar alimentos y estimar automáticamente calorías y macronutrientes.

**Request:**
```json
{
  "image_base64": "base64_encoded_image_data",
  "momento": "desayuno|comida|cena|snack"
}
```

**Response:**
```json
{
  "nombre": "Pechuga de pollo con arroz y brócoli",
  "kcal": 550,
  "macros": {
    "p": 45,
    "c": 60,
    "g": 12
  },
  "confidence_score": 0.98,
  "coach_insight": "Excelente plato balanceado. Tienes un buen aporte de proteína para tu meta de subir peso.",
  "ingredientes": ["pechuga de pollo", "arroz blanco", "brócoli"],
  "advertencias": []
}
```

**Alternativa con Upload:**
```bash
POST /api/v1/ai/analyze-food-upload
Content-Type: multipart/form-data

file: [imagen.jpg]
momento: comida
```

### 2. Generación de Coach Insights
**Integrado en el análisis de comidas**

Tras el análisis, la IA genera retroalimentación inmediata personalizada sobre si la comida se alinea con los objetivos del usuario.

**Características:**
- Considera la meta del usuario (subir/bajar/mantener peso)
- Evalúa calorías y macros objetivo
- Proporciona consejos prácticos
- Tono motivador y personalizado

### 3. Creador de Recetas Inteligentes
**Endpoint:** `POST /api/v1/ai/create-recipe`

Gemini genera recetas detalladas basadas en ingredientes disponibles y preferencias del usuario.

**Request:**
```json
{
  "ingredients": ["pollo", "arroz", "brócoli", "aceite de oliva"],
  "dietary_preferences": ["alto en proteína"],
  "target_macros": {
    "proteinas": 40,
    "carbohidratos": 50,
    "grasas": 15
  }
}
```

**Response:**
```json
{
  "titulo": "Bowl de Pollo y Arroz Integral",
  "descripcion": "Plato balanceado alto en proteína perfecto para después del entrenamiento",
  "instrucciones": [
    "Cocinar el arroz integral según instrucciones del paquete",
    "Sazonar y cocinar la pechuga de pollo a la plancha",
    "Saltear el brócoli con aceite de oliva",
    "Servir todo junto en un bowl"
  ],
  "tiempo_preparacion": "25 minutos",
  "porciones": 1,
  "nutricion": {
    "kcal_totales": 520,
    "macros": {
      "p": 42,
      "c": 55,
      "g": 14
    }
  },
  "ingredientes_detallados": [
    {"ingrediente": "Pechuga de pollo", "cantidad": "150g"},
    {"ingrediente": "Arroz integral", "cantidad": "80g (crudo)"},
    {"ingrediente": "Brócoli", "cantidad": "100g"},
    {"ingrediente": "Aceite de oliva", "cantidad": "1 cucharada"}
  ]
}
```

### 4. Sugerencia de Planes Dinámicos
**Endpoint:** `POST /api/v1/ai/generate-plan`

Genera planes semanales de nutrición o rutinas de ejercicio basados en la meta del usuario.

**Request:**
```json
{
  "plan_type": "nutricion|entrenamiento",
  "duration_days": 7
}
```

**Response - Plan de Nutrición:**
```json
{
  "titulo": "Plan Nutricional para Ganancia Muscular - Semana 1",
  "descripcion": "Plan de 2800 kcal diarias con énfasis en proteína",
  "contenido": {
    "objetivo_kcal_diario": 2800,
    "dias": [
      {
        "dia": 1,
        "comidas": [
          {
            "momento": "desayuno",
            "nombre": "Avena con proteína y plátano",
            "descripcion": "Desayuno energético alto en carbohidratos",
            "kcal": 450,
            "macros": {"p": 25, "c": 65, "g": 10}
          },
          // ... más comidas
        ]
      }
      // ... más días
    ]
  },
  "consejos": [
    "Mantén una hidratación adecuada (2-3L diarios)",
    "Distribuye las proteínas en todas las comidas",
    "Ajusta las porciones según tu progreso"
  ]
}
```

**Response - Plan de Entrenamiento:**
```json
{
  "titulo": "Rutina de Hipertrofia - 4 días",
  "descripcion": "Plan progresivo para ganancia de masa muscular",
  "contenido": {
    "nivel": "intermedio",
    "dias": [
      {
        "dia": 1,
        "nombre_sesion": "Pecho y Tríceps",
        "ejercicios": [
          {
            "nombre": "Press Banca",
            "series": 4,
            "reps": "8-12",
            "descanso_segundos": 90,
            "notas": "Mantén los omóplatos retraídos"
          }
          // ... más ejercicios
        ],
        "duracion_estimada_min": 60
      }
      // ... más días
    ],
    "advertencias": ["Evitar press inclinado por lesión en hombro"],
    "consejos": ["Calienta 10 min antes de empezar", "Estira al finalizar"]
  }
}
```

### 5. Análisis de Patrones Alimentarios
**Endpoint:** `GET /api/v1/ai/analyze-patterns`

Analiza el historial de comidas para detectar patrones que puedan requerir atención profesional.

**Response:**
```json
{
  "patron_detectado": "Restricción calórica moderada con baja ingesta de carbohidratos",
  "nivel_alerta": "medio",
  "indicadores": [
    "Consumo promedio de 1400 kcal/día (objetivo: 2000)",
    "Carbohidratos por debajo del 30% de calorías totales",
    "Frecuencia irregular de comidas (saltos de desayuno)"
  ],
  "recomendaciones": [
    "Incrementar gradualmente la ingesta calórica",
    "Incluir carbohidratos complejos en cada comida",
    "Establecer horarios regulares de alimentación"
  ],
  "requiere_atencion_profesional": true,
  "notas_para_especialista": "Patrón sugiere posible restricción alimentaria. Evaluar relación con la comida y objetivos realistas."
}
```

### 6. Historial de Comidas
**Endpoint:** `GET /api/v1/ai/my-meals?limit=20`

Obtiene el historial de comidas analizadas del usuario.

**Response:**
```json
{
  "meals": [
    {
      "id": "507f1f77bcf86cd799439011",
      "comida": {
        "nombre": "Ensalada César con pollo",
        "foto_url": "https://...",
        "momento": "comida"
      },
      "analisis_ia": {
        "kcal": 420,
        "macros": {"p": 35, "c": 25, "g": 18},
        "confidence_score": 0.95,
        "coach_insight": "Buena opción baja en carbohidratos..."
      },
      "creado_at": "2026-04-17T14:30:00Z"
    }
    // ... más comidas
  ]
}
```

## 🔧 Configuración Requerida

### Variables de Entorno

Asegúrate de tener configuradas estas variables en `backend/.env`:

```env
# Gemini API Key (obtener en https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=tu_api_key_de_gemini_aqui

# MongoDB
MONGODB_URI=mongodb://localhost:27017/visionfeast_db

# JWT para autenticación
JWT_SECRET_KEY=tu_clave_secreta_aqui
```

### Modelos de Datos

Los siguientes modelos están implementados en Beanie (MongoDB ODM):

1. **User** - Usuarios con perfil y objetivos
2. **MealLog** - Registro de comidas con análisis IA
3. **Recipe** - Recetas generadas o creadas
4. **Plan** - Planes de nutrición/entrenamiento

## 🚀 Uso de las APIs

### Autenticación

Todas las APIs de IA requieren autenticación con JWT:

```bash
# 1. Autenticarse con Google
POST /api/v1/auth/google
{
  "token": "google_id_token"
}

# Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {...}
}

# 2. Usar el token en las peticiones de IA
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Ejemplo Completo: Análisis de Comida

```python
import requests
import base64

# 1. Autenticarse
auth_response = requests.post(
    "http://localhost:8000/api/v1/auth/google",
    json={"token": "google_id_token"}
)
access_token = auth_response.json()["access_token"]

# 2. Leer imagen
with open("comida.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

# 3. Analizar comida
headers = {"Authorization": f"Bearer {access_token}"}
analysis_response = requests.post(
    "http://localhost:8000/api/v1/ai/analyze-food",
    headers=headers,
    json={
        "image_base64": image_data,
        "momento": "comida"
    }
)

result = analysis_response.json()
print(f"Comida: {result['nombre']}")
print(f"Calorías: {result['kcal']} kcal")
print(f"Coach dice: {result['coach_insight']}")
```

### Ejemplo: Generar Receta

```python
headers = {"Authorization": f"Bearer {access_token}"}

recipe_response = requests.post(
    "http://localhost:8000/api/v1/ai/create-recipe",
    headers=headers,
    json={
        "ingredients": ["pollo", "quinoa", "espinacas", "aguacate"],
        "dietary_preferences": ["alto en proteína", "bajo en carbohidratos"],
        "target_macros": {
            "proteinas": 40,
            "carbohidratos": 30,
            "grasas": 20
        }
    }
)

recipe = recipe_response.json()
print(f"Receta: {recipe['titulo']}")
print(f"Instrucciones: {recipe['instrucciones']}")
```

### Ejemplo: Generar Plan de Entrenamiento

```python
headers = {"Authorization": f"Bearer {access_token}"}

plan_response = requests.post(
    "http://localhost:8000/api/v1/ai/generate-plan",
    headers=headers,
    json={
        "plan_type": "entrenamiento",
        "duration_days": 7
    }
)

plan = plan_response.json()
print(f"Plan: {plan['titulo']}")
print(f"Descripción: {plan['descripcion']}")
```

## 🏥 Funciones para Profesionales

### Detección de Riesgos en Contexto Médico

La IA filtra sugerencias basándose en el `medical_context` del usuario:

- **Alergias:** Evita ingredientes alergénicos en recetas
- **Lesiones:** Excluye ejercicios que puedan agravar lesiones
- **Condiciones médicas:** Ajusta recomendaciones nutricionales

Ejemplo de contexto médico en el perfil de usuario:
```
"Lesión en rodilla izquierda, asma leve, alergia a mariscos"
```

La IA automáticamente:
- ❌ No sugerirá ejercicios de alto impacto en rodilla
- ❌ No incluirá mariscos en recetas
- ✅ Considerará el asma en planes de cardio

### Pre-validación de Planes

Los planes generados por IA tienen estado `pendiente_revision` para que profesionales los validen antes de asignarlos a usuarios.

## 📊 Modelos de Datos

### MealLog
```python
{
  "user_id": ObjectId,
  "comida": {
    "nombre": str,
    "foto_url": str,
    "momento": str  # desayuno, comida, cena, snack
  },
  "analisis_ia": {
    "kcal": float,
    "macros": {"p": float, "c": float, "g": float},
    "confidence_score": float,
    "coach_insight": str
  },
  "creado_at": datetime
}
```

### Recipe
```python
{
  "creador_id": Optional[ObjectId],
  "detalles": {
    "titulo": str,
    "descripcion": str,
    "instrucciones": List[str],
    "is_public": bool
  },
  "nutricion": {
    "kcal_totales": float,
    "macros": {"p": float, "c": float, "g": float}
  }
}
```

### Plan
```python
{
  "user_id": ObjectId,
  "tipo_plan": "entrenamiento" | "nutricion",
  "origen": "ia_generado" | "profesional",
  "estado": "pendiente_revision" | "aprobado" | "rechazado",
  "contenido": dict,
  "validacion": {
    "especialista_id": Optional[ObjectId],
    "notas_ajuste": Optional[str],
    "fecha_aprobacion": Optional[datetime]
  }
}
```

## 🔍 Documentación Interactiva

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva de Swagger:

```
http://localhost:8000/docs
```

O la documentación alternativa de ReDoc:

```
http://localhost:8000/redoc
```

## 🧪 Testing

### Probar Análisis de Comida

```bash
# Usando cURL
curl -X POST "http://localhost:8000/api/v1/ai/analyze-food-upload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@comida.jpg" \
  -F "momento=comida"
```

### Probar Generación de Receta

```bash
curl -X POST "http://localhost:8000/api/v1/ai/create-recipe" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["pollo", "arroz", "brócoli"],
    "dietary_preferences": ["alto en proteína"]
  }'
```

## ⚠️ Consideraciones Importantes

1. **Rate Limits de Gemini:** Google Gemini tiene límites de uso. Monitorea tu consumo en [Google AI Studio](https://aistudio.google.com/)

2. **Tamaño de Imágenes:** Las imágenes muy grandes pueden causar timeouts. Recomendado: máximo 5MB

3. **Precisión del Análisis:** El `confidence_score` indica la confianza del análisis. Valores < 0.7 pueden requerir validación manual

4. **Contexto Médico:** Siempre valida que el contexto médico esté actualizado para recomendaciones seguras

5. **Privacidad:** Las imágenes no se almacenan permanentemente, solo el análisis resultante

## 📚 Recursos Adicionales

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Beanie ODM](https://beanie-odm.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 🎯 Próximas Funcionalidades

- [ ] Integración con ElevenLabs para coach de voz
- [ ] Análisis de progreso semanal/mensual
- [ ] Recomendaciones de suplementos
- [ ] Detección de deficiencias nutricionales
- [ ] Integración con wearables para datos de actividad
