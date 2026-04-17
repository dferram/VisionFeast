# 🍽️ VisionFeast - Backend API

**VisionFeast** es una aplicación móvil inteligente de nutrición y bienestar que utiliza IA para analizar alimentos mediante fotografías, generar recetas personalizadas, crear planes nutricionales y de entrenamiento dinámicos, y proporcionar insights de coaching personalizados.

Este repositorio contiene el backend API construido con **FastAPI**, siguiendo una arquitectura N-Tier (Capas) y utilizando **Google Gemini AI** para las capacidades de inteligencia artificial.

---

## 📋 Descripción General

VisionFeast permite a los usuarios:

- 📸 **Analizar alimentos** mediante fotografías usando visión por computadora (Gemini Vision)
- 🥗 **Registrar comidas** con análisis nutricional automático (calorías, macros)
- 🍳 **Generar recetas inteligentes** basadas en ingredientes disponibles y objetivos nutricionales
- 📊 **Crear planes dinámicos** de nutrición y entrenamiento personalizados
- 🎯 **Recibir insights de coaching** con recomendaciones personalizadas basadas en patrones alimentarios
- 📈 **Analizar patrones** de alimentación y progreso hacia objetivos de salud

---

## 🏗️ Arquitectura

### Arquitectura N-Tier (Capas)

```
┌─────────────────────────────────────┐
│         API Layer (FastAPI)         │  ← Endpoints REST
├─────────────────────────────────────┤
│      Services Layer (Business)      │  ← Lógica de negocio + IA
├─────────────────────────────────────┤
│    Repositories Layer (Data)        │  ← Acceso a datos
├─────────────────────────────────────┤
│      Models Layer (Database)        │  ← Esquemas MongoDB
└─────────────────────────────────────┘
```

### Estructura de Carpetas

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py          # Endpoints de autenticación
│   │       ├── ai.py            # Endpoints de IA
│   │       └── test.py          # Endpoints de prueba
│   ├── core/
│   │   ├── config.py            # Configuración y variables de entorno
│   │   └── security.py          # JWT y seguridad
│   ├── models/
│   │   ├── user_model.py        # Modelo de usuarios
│   │   ├── meal_log_model.py    # Modelo de registros de comidas
│   │   ├── recipe_model.py      # Modelo de recetas
│   │   └── plan_model.py        # Modelo de planes
│   ├── schemas/
│   │   ├── auth_schema.py       # Schemas de autenticación
│   │   └── ai_schema.py         # Schemas de IA
│   ├── services/
│   │   └── gemini_service.py    # Servicio de Google Gemini AI
│   ├── repositories/            # Capa de persistencia
│   └── database.py              # Configuración de MongoDB
├── tests/                       # Suite de tests (pytest)
├── main.py                      # Punto de entrada de la aplicación
├── requirements.txt             # Dependencias Python
└── .env                         # Variables de entorno (no versionado)
```

---

## 🛠️ Tech Stack

### **Backend Framework**
- **[FastAPI](https://fastapi.tiangolo.com/)** `0.115.12` - Framework web moderno y rápido para construir APIs
- **[Uvicorn](https://www.uvicorn.org/)** - Servidor ASGI de alto rendimiento
- **[Python](https://www.python.org/)** `3.13+` - Lenguaje de programación

### **Base de Datos**
- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL orientada a documentos
- **[Motor](https://motor.readthedocs.io/)** `3.3.2` - Driver asíncrono de MongoDB para Python
- **[Beanie](https://beanie-odm.dev/)** `1.26.0` - ODM (Object Document Mapper) asíncrono para MongoDB
- **[PyMongo](https://pymongo.readthedocs.io/)** `4.6.3` - Driver oficial de MongoDB

### **Inteligencia Artificial**
- **[Google Gemini AI](https://ai.google.dev/)** (`google-generativeai`) - Modelos de IA multimodal
  - `gemini-1.5-flash` - Análisis de imágenes de alimentos
  - Generación de insights de coaching
  - Creación de recetas inteligentes
  - Generación de planes dinámicos
- **[ElevenLabs](https://elevenlabs.io/)** - Síntesis de voz (opcional)

### **Autenticación y Seguridad**
- **[Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)** - Autenticación con Google
  - `google-auth` - Biblioteca de autenticación de Google
  - `google-auth-oauthlib` - Flujo OAuth 2.0
  - `google-auth-httplib2` - Transporte HTTP
- **[python-jose](https://python-jose.readthedocs.io/)** - JWT (JSON Web Tokens)
- **[passlib](https://passlib.readthedocs.io/)** - Hashing de contraseñas (bcrypt)

### **Validación y Serialización**
- **[Pydantic](https://docs.pydantic.dev/)** `2.13+` - Validación de datos y configuración
- **[pydantic-settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)** - Gestión de configuración

### **Testing**
- **[pytest](https://pytest.org/)** `9.0.3` - Framework de testing
- **[pytest-asyncio](https://pytest-asyncio.readthedocs.io/)** `1.3.0` - Soporte para tests asíncronos
- **[httpx](https://www.python-httpx.org/)** `0.28.1` - Cliente HTTP asíncrono para tests

### **Utilidades**
- **[python-dotenv](https://github.com/theskumar/python-dotenv)** - Carga de variables de entorno
- **[python-multipart](https://github.com/andrew-d/python-multipart)** - Soporte para formularios multipart

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Python 3.13+
- MongoDB (local o Atlas)
- API Keys:
  - Google Cloud (OAuth 2.0)
  - Google AI Studio (Gemini)
  - ElevenLabs (opcional)

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
# MongoDB
MONGODB_URI=mongodb://localhost:27017/visionfeast

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# ElevenLabs (opcional)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
FRONTEND_URL=http://localhost:3000
```

### 5. Iniciar MongoDB

```bash
# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# O usar MongoDB Atlas (cloud)
```

### 6. Ejecutar el Servidor

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El servidor estará disponible en:
- **API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📚 Documentación de API

### Endpoints Principales

#### **Autenticación** (`/api/v1/auth`)
- `POST /auth/google` - Autenticación con Google OAuth
- `GET /auth/me` - Obtener usuario actual
- `PATCH /auth/me` - Actualizar perfil de usuario

#### **IA - Análisis de Alimentos** (`/api/v1/ai`)
- `POST /ai/analyze-food` - Analizar imagen de comida
- `GET /ai/my-meals` - Obtener historial de comidas
- `GET /ai/analyze-patterns` - Analizar patrones alimentarios

#### **IA - Recetas** (`/api/v1/ai`)
- `POST /ai/create-recipe` - Generar receta inteligente

#### **IA - Planes** (`/api/v1/ai`)
- `POST /ai/generate-plan` - Generar plan de nutrición/entrenamiento

#### **Testing** (`/api/v1/test`)
- `GET /test/ping` - Health check
- `GET /test/ai-config` - Verificar configuración de IA
- `POST /test/ai-mock-analysis` - Análisis mock sin Gemini
- `GET /test/database-status` - Estado de la base de datos

Ver documentación completa en `/docs` (Swagger UI) o consultar `AI_FEATURES_DOCUMENTATION.md`.

---

## 🧪 Testing

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

### Cobertura Actual

```
20 tests - 100% passing
- 3 tests de endpoints principales
- 4 tests de endpoints de prueba
- 4 tests de autenticación
- 9 tests de endpoints de IA
```

Ver más detalles en `tests/README.md`.

---

## 🔐 Seguridad

- **JWT** para autenticación stateless
- **Google OAuth 2.0** para autenticación segura
- **CORS** configurado para frontend específico
- **Validación** de datos con Pydantic
- **Variables de entorno** para secretos
- **Bcrypt** para hashing de contraseñas

---

## 📦 Dependencias Principales

```txt
fastapi                    # Framework web
uvicorn[standard]          # Servidor ASGI
motor==3.3.2              # Driver MongoDB asíncrono
beanie==1.26.0            # ODM para MongoDB
pymongo==4.6.3            # Driver MongoDB
google-generativeai       # Google Gemini AI
google-auth               # Autenticación Google
python-jose[cryptography] # JWT
pydantic[email]           # Validación de datos
pytest==9.0.3             # Testing
```

---

## 🌟 Características Principales

### 1. **Análisis de Alimentos con IA**
- Análisis visual de comidas mediante Gemini Vision
- Detección automática de ingredientes
- Cálculo de calorías y macronutrientes
- Insights de coaching personalizados

### 2. **Generación de Recetas Inteligentes**
- Basadas en ingredientes disponibles
- Adaptadas a objetivos nutricionales
- Instrucciones paso a paso
- Información nutricional completa

### 3. **Planes Dinámicos**
- Planes de nutrición personalizados
- Planes de entrenamiento adaptados
- Validación por especialistas
- Seguimiento de progreso

### 4. **Análisis de Patrones**
- Detección de tendencias alimentarias
- Recomendaciones basadas en historial
- Predicción de necesidades nutricionales

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es parte del Hackathon FIF 2026.

---

## 👥 Autores

- **Daniel Ferram** - [@dferram](https://github.com/dferram)

---

## 🙏 Agradecimientos

- Google Gemini AI por las capacidades de IA
- FastAPI por el excelente framework
- MongoDB por la base de datos flexible
- Comunidad de Python por las increíbles bibliotecas
