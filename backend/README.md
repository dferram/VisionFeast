# VisionFeast - Backend API

VisionFeast es una aplicación móvil inteligente de nutrición y bienestar que utiliza IA para analizar alimentos mediante fotografías, generar recetas personalizadas, crear planes nutricionales y de entrenamiento dinámicos, y proporcionar insights de coaching personalizados.

Este repositorio contiene el backend API construido con FastAPI, siguiendo una arquitectura N-Tier (Capas) y utilizando Google Gemini AI para las capacidades de inteligencia artificial.

---

## Descripción General

VisionFeast permite a los usuarios:

- Analizar alimentos mediante fotografías usando visión por computadora (Gemini Vision)
- Registrar comidas con análisis nutricional automático (calorías, macros)
- Generar recetas inteligentes basadas en ingredientes disponibles y objetivos nutricionales
- Crear planes dinámicos de nutrición y entrenamiento personalizados
- Recibir insights de coaching con recomendaciones personalizadas basadas en patrones alimentarios
- Analizar patrones de alimentación y progreso hacia objetivos de salud

---

## Arquitectura

### Arquitectura N-Tier (Capas)

- API Layer (FastAPI): Endpoints REST
- Services Layer (Business): Lógica de negocio e IA
- Repositories Layer (Data): Acceso a datos
- Models Layer (Database): Esquemas MongoDB

### Estructura de Carpetas

- app/api/ : Endpoints REST agrupados por funcionalidad
- app/core/ : Configuración, variables de entorno y seguridad
- app/models/ : Modelos de MongoDB
- app/schemas/ : Esquemas de Pydantic para validación
- app/services/ : Lógica de servicios (ej. Gemini)
- app/repositories/ : Capa de acceso a base de datos
- tests/ : Pruebas unitarias

---

## Tech Stack

### Backend Framework
- FastAPI 0.115.12
- Uvicorn
- Python 3.13+

### Base de Datos
- MongoDB
- Motor 3.3.2 (Driver asíncrono)
- Beanie 1.26.0 (ODM asíncrono)
- PyMongo 4.6.3

### Inteligencia Artificial
- Google Gemini AI (gemini-1.5-flash) para análisis de imágenes, coaching, recetas y planes
- ElevenLabs para síntesis de voz (opcional)

### Autenticación y Seguridad
- Google OAuth 2.0
- JWT (JSON Web Tokens)
- Hashing con passlib (bcrypt)

### Validación y Serialización
- Pydantic 2.13+
- Pydantic-settings

### Testing
- Pytest 9.0.3
- Pytest-asyncio 1.3.0
- Httpx 0.28.1

---

## Instalación y Configuración

### Prerrequisitos

- Python 3.13+
- MongoDB (local o Atlas)
- API Keys: Google Cloud (OAuth 2.0), Google AI Studio (Gemini), ElevenLabs (opcional)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/dferram/VisionFeast.git
cd VisionFeast/backend
```

### 2. Crear Entorno Virtual

```bash
python -m venv venv

# Windows
.\venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
MONGODB_URI=mongodb://localhost:27017/visionfeast
GEMINI_API_KEY=tu_api_key
ELEVENLABS_API_KEY=tu_api_key_opcional
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
JWT_SECRET_KEY=tu_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
```

### 5. Iniciar MongoDB

Iniciar MongoDB localmente en el puerto 27017, o configurar la URL hacia Atlas.

### 6. Ejecutar el Servidor

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El servidor estará disponible en:
- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## Documentación de API

### Endpoints Principales

- /api/v1/auth : Autenticación con Google y manejo de usuarios
- /api/v1/ai : Análisis de alimentos, generación de recetas y planes
- /api/v1/test : Endpoints para verificar salud del sistema y configuraciones

---

## Testing

```bash
pytest tests/ -v
```

Cobertura actual: 100% (Endpoints principales, IA, autenticación y pruebas)

---

## Seguridad

- JWT para autenticación stateless
- Google OAuth 2.0 para autenticación segura
- Validación estricta con Pydantic y Bcrypt para contraseñas

---

## Licencia

Este proyecto es parte del Hackathon FIF 2026.
