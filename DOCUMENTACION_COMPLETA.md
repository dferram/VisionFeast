# VisionFeast - Documentación Técnica Completa

<div align="center">

**Aplicación móvil inteligente de nutrición y bienestar potenciada por IA**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.12-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.13+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)

*Hackathon FIF 2026*

</div>

---

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Tech Stack Completo](#tech-stack-completo)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Base de Datos MongoDB](#base-de-datos-mongodb)
5. [Backend API](#backend-api)
6. [Frontend Móvil](#frontend-móvil)
7. [Funcionalidades de IA](#funcionalidades-de-ia)
8. [Sistema de Roles](#sistema-de-roles)
9. [Seguridad y Autenticación](#seguridad-y-autenticación)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Instalación y Configuración](#instalación-y-configuración)

---

## Descripción General

VisionFeast es una aplicación móvil que integra inteligencia artificial con nutrición personalizada para la gestión de salud y bienestar. Mediante Google Gemini AI y técnicas de visión por computadora, la plataforma permite el análisis automatizado de alimentos a través de fotografías, proporciona coaching nutricional personalizado, genera recetas adaptadas y crea planes dinámicos de nutrición y entrenamiento.

### Problemática Abordada

Las aplicaciones de nutrición actuales presentan limitaciones significativas:
- Registro manual tedioso de alimentos
- Bases de datos limitadas que no incluyen comidas locales
- Falta de personalización basada en patrones individuales
- Planes genéricos que no se adaptan al progreso del usuario
- Desconexión entre nutrición y entrenamiento
- Ausencia de validación profesional

### Solución Propuesta

VisionFeast aborda estas limitaciones mediante:
- Análisis visual automático de alimentos utilizando IA
- Reconocimiento universal de comidas, incluyendo platillos locales
- Sistema de coaching personalizado basado en patrones de comportamiento
- Planes dinámicos que se adaptan al progreso del usuario
- Integración de nutrición y ejercicio en una plataforma unificada
- Validación profesional por nutriólogos certificados

### Características Principales

#### Análisis Visual de Alimentos
- Toma una foto de tu comida y obtén análisis nutricional instantáneo
- Detección automática de ingredientes y porciones
- Cálculo preciso de calorías y macronutrientes (proteínas, carbohidratos, grasas)
- Funciona con cualquier tipo de comida, incluyendo platillos locales

#### Coaching Personalizado con IA
- Insights personalizados basados en tus objetivos de salud
- Recomendaciones adaptadas a tus patrones alimentarios
- Detección de tendencias y sugerencias de mejora
- Alertas inteligentes sobre deficiencias nutricionales

#### Generación de Recetas Inteligentes
- Crea recetas basadas en ingredientes disponibles
- Adaptadas a tus objetivos nutricionales y restricciones
- Instrucciones paso a paso con información nutricional completa
- Recetas públicas compartidas por la comunidad

#### Planes Dinámicos
- **Planes de Nutrición**: Menús semanales personalizados
- **Planes de Entrenamiento**: Rutinas adaptadas a tu nivel
- Ajuste automático basado en tu progreso
- Validación y seguimiento por profesionales certificados

---

## Stack Tecnológico

### **Backend**

#### Framework y Servidor
- **FastAPI** `0.115.12` - Framework web moderno y rápido para construir APIs
- **Uvicorn** `[standard]` - Servidor ASGI de alto rendimiento
- **Python** `3.13+` - Lenguaje de programación

#### Base de Datos
- **MongoDB** `7.0` - Base de datos NoSQL orientada a documentos
- **Motor** `3.3.2` - Driver asíncrono de MongoDB para Python
- **Beanie** `1.26.0` - ODM (Object Document Mapper) asíncrono para MongoDB
- **PyMongo** `4.6.3` - Driver oficial de MongoDB

#### Inteligencia Artificial
- **Google Gemini AI** (`google-generativeai`) - Modelos de IA multimodal
  - `gemini-1.5-flash` - Análisis de imágenes de alimentos
  - Generación de insights de coaching
  - Creación de recetas inteligentes
  - Generación de planes dinámicos
- **ElevenLabs** (`elevenlabs`) - Síntesis de voz (opcional)

#### Autenticación y Seguridad
- **Google OAuth 2.0** - Autenticación con Google
  - `google-auth` - Biblioteca de autenticación de Google
  - `google-auth-oauthlib` - Flujo OAuth 2.0
  - `google-auth-httplib2` - Transporte HTTP
- **python-jose[cryptography]** - JWT (JSON Web Tokens)
- **passlib** `1.7.4` - Hashing de contraseñas
- **bcrypt** `4.1.2` - Algoritmo de hashing

#### Validación y Serialización
- **Pydantic[email]** - Validación de datos y configuración
- **pydantic-settings** - Gestión de configuración

#### Testing
- **pytest** `9.0.3` - Framework de testing
- **pytest-asyncio** `1.3.0` - Soporte para tests asíncronos
- **httpx** `0.28.1` - Cliente HTTP asíncrono para tests

#### Utilidades
- **python-dotenv** - Carga de variables de entorno
- **python-multipart** - Soporte para formularios multipart

### **Frontend Móvil**

#### Framework Principal
- **React Native** `0.81.5` - Framework para aplicaciones móviles nativas
- **React** `19.1.0` - Biblioteca de UI
- **Expo** `~54.0.0` - Plataforma para desarrollo React Native

#### Navegación
- **@react-navigation/native** `^6.1.9` - Sistema de navegación
- **@react-navigation/native-stack** `^6.9.17` - Navegación tipo stack

#### Componentes y UI
- **react-native-safe-area-context** `~5.6.0` - Manejo de áreas seguras
- **react-native-screens** `~4.16.0` - Optimización de pantallas

#### Funcionalidades Nativas
- **expo-image-picker** `^55.0.18` - Selección de imágenes
- **expo-status-bar** `~3.0.9` - Control de barra de estado

#### Herramientas de Desarrollo
- **@babel/core** `^7.25.2` - Compilador JavaScript
- **babel-preset-expo** `~12.0.1` - Preset de Babel para Expo

### **DevOps y Deployment**

#### Containerización
- **Docker** - Containerización de aplicaciones
- **Docker Compose** - Orquestación de contenedores

#### Cloud Services
- **MongoDB Atlas** - Base de datos en la nube
- **Azure Web Apps** - Hosting del backend
- **Azure Blob Storage** - Almacenamiento de archivos (imágenes, certificados)

---

## Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND MÓVIL                          │
│                  (React Native + Expo)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Splash   │  │ Welcome  │  │  Login   │  │  Meals   │   │
│  │ Screen   │  │ Screen   │  │  Screen  │  │  Screen  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND API                             │
│                    (FastAPI + Python)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Layer (Endpoints)                   │  │
│  │  /auth  /ai  /plans  /recipes  /marketplace         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Services Layer (Business Logic)            │  │
│  │  GeminiService  AuthService  PlanService            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Repositories Layer (Data Access)             │  │
│  │  UserRepo  MealLogRepo  RecipeRepo  PlanRepo        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Models Layer (Database Schema)             │  │
│  │  User  MealLog  Recipe  Plan  Professional          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Beanie ODM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     MONGODB DATABASE                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  users   │  │meal_logs │  │ recipes  │  │  plans   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐                                │
│  │professionals│ │requests │                                │
│  └──────────┘  └──────────┘                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  SERVICIOS EXTERNOS                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Gemini  │  │  Google  │  │ElevenLabs│                 │
│  │    AI    │  │  OAuth   │  │   TTS    │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

### Arquitectura Backend N-Tier

```
backend/
├── app/
│   ├── api/                    # API Layer - Endpoints REST
│   │   └── v1/
│   │       ├── auth.py         # Autenticación (Google OAuth, JWT)
│   │       ├── ai.py           # IA (análisis, recetas, planes)
│   │       ├── coach.py        # Coach virtual
│   │       ├── nutritionist.py # Nutriólogos
│   │       ├── plans.py        # Planes de nutrición/entrenamiento
│   │       ├── marketplace.py  # Marketplace de recetas
│   │       ├── register.py     # Registro de usuarios
│   │       └── test.py         # Endpoints de prueba
│   │
│   ├── services/               # Services Layer - Lógica de negocio
│   │   └── gemini_service.py  # Servicio de Google Gemini AI
│   │
│   ├── repositories/           # Repositories Layer - Acceso a datos
│   │   └── (capa de persistencia)
│   │
│   ├── models/                 # Models Layer - Esquemas MongoDB
│   │   ├── user_model.py       # Modelo de usuarios
│   │   ├── meal_log_model.py   # Modelo de registros de comidas
│   │   ├── recipe_model.py     # Modelo de recetas
│   │   ├── plan_model.py       # Modelo de planes
│   │   ├── professional_model.py # Modelo de profesionales
│   │   └── request_model.py    # Modelo de solicitudes
│   │
│   ├── schemas/                # Schemas - Validación Pydantic
│   │   ├── auth_schema.py      # Schemas de autenticación
│   │   └── ai_schema.py        # Schemas de IA
│   │
│   ├── core/                   # Core - Configuración
│   │   ├── config.py           # Variables de entorno
│   │   └── security.py         # JWT y seguridad
│   │
│   └── database.py             # Conexión a MongoDB
│
├── tests/                      # Testing
│   ├── test_main.py
│   ├── test_auth_endpoints.py
│   ├── test_ai_endpoints.py
│   └── conftest.py
│
└── main.py                     # Punto de entrada
```

### Estructura Frontend Móvil

```
mobile/
├── app/
│   ├── screens/                # Pantallas
│   │   ├── SplashScreen.jsx    # Pantalla de inicio
│   │   ├── WelcomeScreen.jsx   # Pantalla de bienvenida
│   │   ├── LoginScreen.jsx     # Pantalla de login
│   │   └── Clientes/
│   │       └── MealsScreen.jsx # Pantalla de comidas
│   │
│   ├── components/             # Componentes reutilizables
│   │   └── AudioPlayer.jsx     # Reproductor de audio
│   │
│   └── services/               # Servicios API
│       └── api.js              # Cliente HTTP
│
├── assets/                     # Recursos estáticos
│   ├── Logo.png
│   └── gemini_logo.png
│
├── App.js                      # Punto de entrada
├── app.json                    # Configuración Expo
├── package.json                # Dependencias
└── babel.config.js             # Configuración Babel
```

---

## Base de Datos MongoDB

### Nombre de la Base de Datos
`visionfeast_db`

### Colecciones y Esquemas

#### 1. **users** - Usuarios de la aplicación

```javascript
{
  "_id": ObjectId,
  "auth": {
    "email": String,              // Email del usuario
    "hashed_password": String,    // Contraseña hasheada con bcrypt
    "role": String,               // "usuario", "nutriologo", "entrenador"
    "google_id": String | null    // ID de Google OAuth
  },
  "perfil": {
    "nombre": String,
    "apellido": String,
    "biometria": {
      "estatura_cm": Number,      // Estatura en centímetros
      "peso_kg": Number,          // Peso en kilogramos
      "edad": Number,
      "genero": String            // "Masculino", "Femenino", "Otro"
    },
    "estilo_vida": {
      "nivel_actividad": Number,  // 1-5 (sedentario a muy activo)
      "dieta_especifica": String, // "Vegana", "Vegetariana", "Nada", etc.
      "medical_context": String   // Contexto médico importante
    }
  },
  "objetivos": {
    "meta": String,               // "Subir", "Bajar", "Mantener"
    "kcal_diarias": Number,       // Calorías objetivo diarias
    "macros_target": {
      "proteinas": Number,        // Gramos de proteína
      "carbohidratos": Number,    // Gramos de carbohidratos
      "grasas": Number            // Gramos de grasas
    }
  },
  "asignaciones": {
    "nutriologo_id": ObjectId | null,
    "entrenador_id": ObjectId | null
  },
  "creado_at": ISODate
}
```

**Índices:**
- `auth.email` (unique)
- `auth.google_id` (unique, sparse)

#### 2. **professionals** - Nutriólogos y Entrenadores

```javascript
{
  "_id": ObjectId,
  "tipo": String,                 // "nutriologo", "entrenador"
  "nombre_completo": String,
  "perfil_profesional": {
    "certificado_url": String,    // URL del certificado en Azure Blob
    "especialidad": String,
    "biografia": String
  },
  "stats": {
    "calificacion_promedio": Number,  // 0-5
    "total_resenas": Number
  }
}
```

#### 3. **meal_logs** - Registro de comidas con análisis IA

```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,            // Referencia a users._id
  "comida": {
    "nombre": String,             // Nombre de la comida
    "foto_url": String,           // URL de la imagen en Azure Blob
    "momento": String             // "desayuno", "comida", "cena", "snack"
  },
  "analisis_ia": {
    "kcal": Number,               // Calorías totales
    "macros": {
      "p": Number,                // Proteínas (gramos)
      "c": Number,                // Carbohidratos (gramos)
      "g": Number                 // Grasas (gramos)
    },
    "confidence_score": Number,   // 0-1 (confianza del análisis)
    "coach_insight": String,      // Retroalimentación del coach virtual
    "ingredientes": [String],     // Lista de ingredientes detectados
    "advertencias": [String]      // Advertencias (alergias, etc.)
  },
  "creado_at": ISODate
}
```

**Índices:**
- `user_id`
- `creado_at` (descendente)

#### 4. **recipes** - Recetas de comida

```javascript
{
  "_id": ObjectId,
  "creador_id": ObjectId | null,  // Referencia a users._id o professionals._id
  "detalles": {
    "titulo": String,
    "descripcion": String,
    "instrucciones": [String],    // Array de pasos
    "tiempo_preparacion": String,
    "porciones": Number,
    "is_public": Boolean          // Si es pública o privada
  },
  "nutricion": {
    "kcal_totales": Number,
    "macros": {
      "p": Number,
      "c": Number,
      "g": Number
    }
  },
  "ingredientes_detallados": [
    {
      "ingrediente": String,
      "cantidad": String
    }
  ]
}
```

**Índices:**
- `detalles.is_public`
- `creador_id`

#### 5. **nutrition_plans** - Planes nutricionales semanales

```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "nombre_plan": String,
  "configuracion": {
    "fecha_inicio": ISODate,
    "fecha_fin": ISODate,
    "objetivo_kcal_diario": Number
  },
  "cronograma": {
    "lunes": {
      "desayuno": ObjectId,       // Referencia a recipes._id
      "comida": ObjectId,
      "cena": ObjectId,
      "snack": ObjectId | null
    },
    "martes": { /* ... */ },
    "miercoles": { /* ... */ },
    "jueves": { /* ... */ },
    "viernes": { /* ... */ },
    "sabado": { /* ... */ },
    "domingo": { /* ... */ }
  }
}
```

#### 6. **plans** - Planes de entrenamiento y validación

```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "tipo_plan": String,            // "entrenamiento", "nutricion"
  "origen": String,               // "ia_generado", "profesional"
  "estado": String,               // "pendiente_revision", "aprobado", "rechazado"
  "contenido": {
    "titulo": String,
    "descripcion": String,
    "dias": [
      {
        "dia": Number,
        "nombre_sesion": String,
        "ejercicios": [
          {
            "nombre": String,
            "series": Number,
            "reps": String,
            "descanso_segundos": Number,
            "notas": String
          }
        ]
      }
    ],
    "advertencias": [String],
    "consejos": [String]
  },
  "validacion": {
    "especialista_id": ObjectId | null,  // Referencia a professionals._id
    "notas_ajuste": String | null,
    "fecha_aprobacion": ISODate | null
  }
}
```

**Índices:**
- `user_id`
- `estado`
- `tipo_plan`

#### 7. **coaching_requests** - Solicitudes de coaching

```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "professional_id": ObjectId | null,
  "tipo": String,                 // "nutricion", "entrenamiento"
  "estado": String,               // "pendiente", "aceptada", "rechazada"
  "mensaje": String,
  "creado_at": ISODate
}
```

### Relaciones entre Colecciones

```
users
  ├─> asignaciones.nutriologo_id → professionals._id
  ├─> asignaciones.entrenador_id → professionals._id
  └─> _id → meal_logs.user_id
           → nutrition_plans.user_id
           → plans.user_id
           → recipes.creador_id
           → coaching_requests.user_id

professionals
  └─> _id → plans.validacion.especialista_id
           → coaching_requests.professional_id

recipes
  └─> _id → nutrition_plans.cronograma.{dia}.{momento}

plans
  └─> validacion.especialista_id → professionals._id
```

---

## Backend API

### Endpoints Principales

#### **Autenticación** (`/api/v1/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/google` | Autenticación con Google OAuth | No |
| POST | `/auth/register` | Registro tradicional con email/password | No |
| GET | `/auth/me` | Obtener usuario actual | Sí |
| PATCH | `/auth/me` | Actualizar perfil de usuario | Sí |

#### **IA - Análisis de Alimentos** (`/api/v1/ai`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/ai/analyze-food` | Analizar imagen de comida (base64) | Sí |
| POST | `/ai/analyze-food-upload` | Analizar imagen de comida (multipart) | Sí |
| GET | `/ai/my-meals` | Obtener historial de comidas | Sí |
| GET | `/ai/analyze-patterns` | Analizar patrones alimentarios | Sí |

#### **IA - Recetas** (`/api/v1/ai`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/ai/create-recipe` | Generar receta inteligente | Sí |

#### **IA - Planes** (`/api/v1/ai`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/ai/generate-plan` | Generar plan de nutrición/entrenamiento | Sí |

#### **Coach** (`/api/v1/coach`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/coach/request` | Solicitar coach personalizado | Sí |
| GET | `/coach/my-requests` | Ver mis solicitudes | Sí |

#### **Nutricionistas** (`/api/v1/nutritionist`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/nutritionist/list` | Listar nutriólogos disponibles | Sí |
| GET | `/nutritionist/{id}` | Ver perfil de nutriólogo | Sí |

#### **Planes** (`/api/v1/plans`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/plans/my-plans` | Obtener mis planes | Sí |
| POST | `/plans/validate` | Validar plan (solo profesionales) | Sí |

#### **Marketplace** (`/api/v1/marketplace`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/marketplace/recipes` | Listar recetas públicas | No |
| GET | `/marketplace/recipes/{id}` | Ver receta específica | No |

#### **Testing** (`/api/v1/test`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/test/ping` | Health check | No |
| GET | `/test/ai-config` | Verificar configuración de IA | No |
| POST | `/test/ai-mock-analysis` | Análisis mock sin Gemini | No |
| GET | `/test/database-status` | Estado de la base de datos | No |

### Documentación Interactiva

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## Frontend Móvil

### Pantallas Implementadas

#### 1. **SplashScreen**
- Logo de VisionFeast centrado
- Auto-navegación a Welcome después de 3 segundos
- Colores exactos de Figma (#9ed02f)

#### 2. **WelcomeScreen**
- Imagen de fondo con alimentos
- Card blanco redondeado
- Botón "Comenzar"
- Link "Inicia sesión"

#### 3. **LoginScreen**
- Formulario completo de login
- Campos de email y contraseña
- Checkbox "Recordarme"
- Link "¿Olvidaste tu contraseña?"
- Link para registro

#### 4. **MealsScreen** (Cliente)
- Visualización de comidas registradas
- Análisis nutricional
- Integración con cámara para captura de fotos

### Componentes Principales

#### **AudioPlayer**
- Reproductor de audio para coach de voz
- Integración con ElevenLabs TTS

### Navegación

```javascript
Stack Navigator:
  - Splash → Welcome → Login → Home
  - Home → Meals → MealDetail
  - Home → Recipes → RecipeDetail
  - Home → Plans → PlanDetail
```

### Diseño y UI

**Colores:**
- Verde principal: `#9ed02f`
- Verde secundario: `#87b128`
- Negro: `#000000`
- Blanco: `#ffffff`

**Tipografía:**
- Título: 40px, peso 800
- Subtítulo: 20px, peso 600
- Botones: 18-21px, peso 600

---

## Funcionalidades de IA

### 1. Análisis de Visión Nutricional

**Modelo:** `gemini-1.5-flash`

**Funcionalidad:**
- Procesa fotografías de comida
- Identifica alimentos y porciones
- Estima calorías y macronutrientes
- Genera insights de coaching personalizados

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
  "coach_insight": "Excelente plato balanceado...",
  "ingredientes": ["pechuga de pollo", "arroz blanco", "brócoli"],
  "advertencias": []
}
```

### 2. Generación de Coach Insights

**Características:**
- Considera la meta del usuario (subir/bajar/mantener peso)
- Evalúa calorías y macros objetivo
- Proporciona consejos prácticos
- Tono motivador y personalizado

### 3. Creador de Recetas Inteligentes

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
  "descripcion": "Plato balanceado alto en proteína...",
  "instrucciones": ["Paso 1...", "Paso 2..."],
  "tiempo_preparacion": "25 minutos",
  "porciones": 1,
  "nutricion": {
    "kcal_totales": 520,
    "macros": {"p": 42, "c": 55, "g": 14}
  }
}
```

### 4. Generación de Planes Dinámicos

**Tipos de planes:**
- Planes de nutrición (7 días)
- Planes de entrenamiento (4-7 días)

**Características:**
- Adaptados a objetivos del usuario
- Consideran contexto médico
- Requieren validación profesional
- Se ajustan según progreso

### 5. Análisis de Patrones Alimentarios

**Detecta:**
- Restricción calórica
- Deficiencias nutricionales
- Patrones irregulares
- Posibles trastornos alimentarios

**Response:**
```json
{
  "patron_detectado": "Restricción calórica moderada...",
  "nivel_alerta": "medio",
  "indicadores": ["Consumo promedio bajo..."],
  "recomendaciones": ["Incrementar ingesta..."],
  "requiere_atencion_profesional": true
}
```

---

## Sistema de Roles

### Roles Disponibles

#### 1. **Usuario** (Cliente)

**Permisos:**
- Analizar comidas con IA
- Ver historial de comidas
- Generar recetas personalizadas
- Solicitar planes de nutrición/entrenamiento
- Ver recetas públicas del marketplace
- Solicitar asignación de nutriólogo/entrenador

**Restricciones:**
- No puede validar planes
- No puede ver datos de otros usuarios

**Flujo típico:**
1. Registro/Login
2. Completar perfil (biometría, objetivos)
3. Tomar foto de comida
4. Recibir análisis y coaching
5. Generar plan personalizado
6. Solicitar validación profesional

#### 2. **Nutriólogo**

**Permisos:**
- Todos los permisos de usuario
- Validar planes de nutrición
- Crear planes profesionales
- Ver pacientes asignados
- Ajustar planes según contexto médico
- Crear recetas profesionales

**Restricciones:**
- No puede validar planes de entrenamiento

**Flujo típico:**
1. Recibir solicitud de paciente
2. Revisar perfil y contexto médico
3. Validar/ajustar plan generado por IA
4. Hacer seguimiento de progreso
5. Ajustar plan según resultados

#### 3. **Entrenador**

**Permisos:**
- Todos los permisos de usuario
- Validar planes de entrenamiento
- Crear rutinas profesionales
- Ver pacientes asignados
- Ajustar ejercicios según lesiones

**Restricciones:**
- No puede validar planes de nutrición

**Flujo típico:**
1. Recibir solicitud de paciente
2. Revisar perfil y contexto médico (lesiones)
3. Validar/ajustar rutina generada por IA
4. Hacer seguimiento de progreso
5. Ajustar rutina según resultados

### Asignación de Profesionales

**Proceso:**
1. Usuario solicita coach (`POST /coach/request`)
2. Sistema notifica a profesionales disponibles
3. Profesional acepta solicitud
4. Se crea relación en `users.asignaciones`
5. Profesional puede ver y validar planes del usuario

---

## Seguridad y Autenticación

### Autenticación

#### Google OAuth 2.0
- Login seguro con cuenta de Google
- No requiere gestión de contraseñas
- Flujo OAuth estándar

**Flujo:**
1. Frontend solicita login con Google
2. Usuario autoriza en Google
3. Google devuelve ID token
4. Backend valida token con Google
5. Backend crea/actualiza usuario
6. Backend genera JWT
7. Frontend almacena JWT

#### Autenticación Tradicional
- Email + contraseña
- Contraseñas hasheadas con bcrypt
- Salt rounds: 12

### Autorización

#### JWT (JSON Web Tokens)
- Algoritmo: HS256
- Expiración: 30 minutos
- Payload incluye: `user_id`, `email`, `role`

**Headers de autenticación:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Seguridad de Datos

#### Encriptación
- Contraseñas: bcrypt con salt
- Tokens: JWT firmados
- HTTPS en producción

#### Validación
- Pydantic para validación de datos
- Sanitización de inputs
- Prevención de inyección NoSQL

#### CORS
- Configurado para frontend específico
- Credenciales permitidas
- Headers controlados

### Privacidad

- ✅ Datos de salud protegidos
- ✅ Imágenes no almacenadas permanentemente
- ✅ Solo análisis guardado
- ✅ Contexto médico encriptado
- ✅ No compartimos datos con terceros

---

## 🧪 Testing

### Cobertura de Tests

**Total: 20 tests - 100% passing**

#### Endpoints Principales (3 tests)
- ✅ `test_root_endpoint` - Verifica endpoint raíz
- ✅ `test_health_check` - Verifica health check
- ✅ `test_openapi_docs` - Verifica documentación OpenAPI

#### Endpoints de Prueba (4 tests)
- ✅ `test_ping_endpoint` - Verifica ping
- ✅ `test_ai_config_endpoint` - Verifica configuración de IA
- ✅ `test_mock_analysis_endpoint` - Verifica análisis mock
- ✅ `test_database_status_endpoint` - Verifica estado de BD

#### Endpoints de Autenticación (4 tests)
- ✅ `test_google_auth_missing_token` - Auth sin token
- ✅ `test_google_auth_invalid_token` - Auth con token inválido
- ✅ `test_get_me_without_auth` - Obtener usuario sin auth
- ✅ `test_update_me_without_auth` - Actualizar usuario sin auth

#### Endpoints de IA (9 tests)
- ✅ `test_analyze_food_without_auth` - Análisis sin auth
- ✅ `test_analyze_food_missing_data` - Análisis sin datos
- ✅ `test_create_recipe_without_auth` - Crear receta sin auth
- ✅ `test_create_recipe_missing_ingredients` - Receta sin ingredientes
- ✅ `test_generate_plan_without_auth` - Generar plan sin auth
- ✅ `test_generate_plan_invalid_type` - Plan con tipo inválido
- ✅ `test_analyze_patterns_without_auth` - Patrones sin auth
- ✅ `test_my_meals_without_auth` - Obtener comidas sin auth
- ✅ `test_my_meals_with_limit` - Obtener comidas con límite

### Ejecutar Tests

```bash
# Todos los tests
pytest tests/ -v

# Tests específicos
pytest tests/test_ai_endpoints.py -v
pytest tests/test_auth_endpoints.py -v

# Con cobertura
pytest tests/ --cov=app --cov-report=html
```

---

## 🚀 Deployment

### Docker Compose (Local/Development)

**Servicios:**
- MongoDB 7.0
- Backend FastAPI

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Azure Web Apps (Production)

**Backend:**
- Servicio: Azure Web App
- Runtime: Python 3.13
- URL: `https://visionfeast-api.azurewebsites.net`

**Base de Datos:**
- Servicio: MongoDB Atlas
- Tier: M0 (Free)
- Región: US East

**Almacenamiento:**
- Servicio: Azure Blob Storage
- Contenedores:
  - `meals` - Imágenes de comidas
  - `certs` - Certificados profesionales

### Variables de Entorno (Production)

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/visionfeast_db

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret

# JWT
JWT_SECRET_KEY=your_production_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Azure
AZURE_STORAGE_CONNECTION_STRING=your_connection_string

# CORS
FRONTEND_URL=https://visionfeast.app
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Python 3.13+
- Node.js 18+
- MongoDB 7.0+ (local o Atlas)
- Docker (opcional)
- API Keys:
  - Google Cloud (OAuth 2.0)
  - Google AI Studio (Gemini)
  - ElevenLabs (opcional)

### Backend Setup

```bash
# 1. Clonar repositorio
git clone https://github.com/dferram/VisionFeast.git
cd VisionFeast/backend

# 2. Crear entorno virtual
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate # Linux/Mac

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus API keys

# 5. Iniciar MongoDB (si es local)
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# 6. Ejecutar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Servidor disponible en:**
- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Frontend Setup

```bash
# 1. Ir a carpeta mobile
cd mobile

# 2. Instalar dependencias
npm install

# 3. Iniciar Expo
npm start

# 4. Escanear QR con Expo Go (móvil)
# O presionar 'a' para Android emulator
# O presionar 'i' para iOS simulator (solo macOS)
```

### Docker Setup (Recomendado)

```bash
# 1. Configurar .env en root
cp .env.example .env
# Editar .env con tus API keys

# 2. Iniciar servicios
docker-compose up -d

# 3. Ver logs
docker-compose logs -f backend

# 4. Detener servicios
docker-compose down
```

---

## 📊 Modelo de Negocio

### Freemium

**Gratis:**
- Análisis básico de alimentos (5 por día)
- Registro de comidas (limitado)
- Recetas de la comunidad
- Insights básicos

**Premium** (Suscripción mensual - $9.99 USD):
- Análisis ilimitado de alimentos
- Planes personalizados de nutrición y ejercicio
- Acceso a nutriólogos certificados
- Análisis avanzado de patrones
- Recetas premium y personalizadas
- Soporte prioritario
- Coach de voz con ElevenLabs

### Impacto en Profesionales

**No reemplaza a nutriólogos, los potencia:**
- ✅ Herramientas para gestionar más pacientes eficientemente
- ✅ IA como asistente, no como reemplazo
- ✅ Validación profesional requerida para planes críticos
- ✅ Nuevas oportunidades de ingreso (consultas en plataforma)
- ✅ Datos y análisis que facilitan el seguimiento

---

## 🎯 Ventajas Competitivas

| Característica | Apps Tradicionales | VisionFeast |
|----------------|-------------------|-------------|
| Registro de alimentos | Manual, tedioso | Automático con foto |
| Base de datos | Limitada, genérica | Universal con IA |
| Personalización | Básica o nula | IA que aprende de ti |
| Planes | Estáticos | Dinámicos y adaptativos |
| Validación profesional | No disponible | Nutriólogos certificados |
| Integración ejercicio | Separada | Totalmente integrada |
| Recetas | Genéricas | Personalizadas a tus objetivos |

### 💡 Innovaciones Clave

1. **IA que Aprende**: El sistema mejora con cada interacción
2. **Análisis Visual**: Sin bases de datos limitadas
3. **Coaching Continuo**: Insights personalizados en tiempo real
4. **Validación Dual**: IA + Profesionales certificados
5. **Planes Adaptativos**: Se ajustan automáticamente a tu progreso

---

## 📝 Roadmap

### Fase 1 (Actual) - MVP ✅
- [x] Backend API con FastAPI
- [x] Integración con Gemini AI
- [x] Autenticación con Google OAuth
- [x] Análisis de alimentos
- [x] Generación de recetas
- [x] Planes dinámicos
- [x] Aplicación móvil React Native (en progreso)

### Fase 2 - Mejoras
- [ ] Análisis de técnica de ejercicio con video
- [ ] Síntesis de voz con ElevenLabs
- [ ] Comunidad y red social
- [ ] Marketplace de recetas
- [ ] Integración con wearables (Apple Health, Google Fit)

### Fase 3 - Escalabilidad
- [ ] Machine Learning personalizado
- [ ] Análisis predictivo avanzado
- [ ] Expansión internacional
- [ ] API pública para desarrolladores
- [ ] Programa de afiliados para profesionales

---

## 👥 Equipo

- **Daniel Ferram** - Full Stack Developer - [@dferram](https://github.com/dferram)

---

## 📄 Licencia

Este proyecto es parte del **Hackathon FIF 2026**.

---

## 🙏 Agradecimientos

- **Google Gemini AI** - Por las capacidades de inteligencia artificial
- **FastAPI** - Por el excelente framework
- **MongoDB** - Por la flexibilidad en el manejo de datos
- **React Native & Expo** - Por facilitar el desarrollo móvil
- **Comunidad Open Source** - Por las increíbles herramientas

---

<div align="center">

**Hecho con ❤️ para el Hackathon FIF 2026**

[Documentación Backend](./backend/README.md) • [Documentación Mobile](./mobile/README.md) • [API Docs](http://localhost:8000/docs)

</div>
