# 🍽️ VisionFeast

<div align="center">

**Aplicación móvil inteligente de nutrición y bienestar potenciada por IA**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.12-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.13+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tests](https://img.shields.io/badge/Tests-20_passing-success?style=for-the-badge)](./backend/tests)

*Hackathon FIF 2026*

</div>

---

## 📖 Descripción

**VisionFeast** es una aplicación móvil revolucionaria que combina inteligencia artificial con nutrición personalizada para transformar la manera en que las personas gestionan su salud y bienestar. Utilizando **Google Gemini AI** y visión por computadora, VisionFeast permite a los usuarios analizar sus alimentos mediante fotografías, recibir coaching nutricional personalizado, generar recetas inteligentes y crear planes dinámicos de nutrición y entrenamiento.

### 🎯 Problema que Resuelve

Las aplicaciones de nutrición actuales tienen limitaciones significativas:
- ❌ Registro manual tedioso de alimentos
- ❌ Bases de datos limitadas que no incluyen comidas locales
- ❌ Falta de personalización real basada en patrones individuales
- ❌ Planes genéricos que no se adaptan al progreso del usuario
- ❌ Desconexión entre nutrición y entrenamiento
- ❌ Falta de validación profesional

### ✨ Nuestra Solución

VisionFeast aborda estos problemas con:
- ✅ **Análisis visual automático** de alimentos con IA
- ✅ **Reconocimiento universal** de comidas (incluso platillos locales)
- ✅ **Coaching personalizado** que aprende de tus patrones
- ✅ **Planes dinámicos** que se adaptan a tu progreso
- ✅ **Integración nutrición-ejercicio** en una sola plataforma
- ✅ **Validación profesional** por nutriólogos certificados

---

## 🌟 Características Principales

### 📸 Análisis Visual de Alimentos
- Toma una foto de tu comida y obtén análisis nutricional instantáneo
- Detección automática de ingredientes y porciones
- Cálculo preciso de calorías y macronutrientes (proteínas, carbohidratos, grasas)
- Funciona con cualquier tipo de comida, incluyendo platillos locales

### 🎯 Coaching Personalizado con IA
- Insights personalizados basados en tus objetivos de salud
- Recomendaciones adaptadas a tus patrones alimentarios
- Detección de tendencias y sugerencias de mejora
- Alertas inteligentes sobre deficiencias nutricionales

### 🍳 Generación de Recetas Inteligentes
- Crea recetas basadas en ingredientes disponibles
- Adaptadas a tus objetivos nutricionales y restricciones
- Instrucciones paso a paso con información nutricional completa
- Recetas públicas compartidas por la comunidad

### 📊 Planes Dinámicos
- **Planes de Nutrición**: Menús semanales personalizados
- **Planes de Entrenamiento**: Rutinas adaptadas a tu nivel
- Ajuste automático basado en tu progreso
- Validación y seguimiento por profesionales certificados

### 📈 Análisis de Patrones
- Visualización de tendencias alimentarias
- Identificación de hábitos positivos y áreas de mejora
- Predicción de necesidades nutricionales
- Reportes detallados de progreso

### 👥 Sistema de Roles Dual

#### Para Usuarios
- Registro y seguimiento de comidas
- Acceso a recetas y planes personalizados
- Comunicación con nutriólogos
- Seguimiento de progreso y objetivos

#### Para Profesionales (Nutriólogos)
- Validación de planes generados por IA
- Creación de planes personalizados
- Seguimiento de pacientes
- Herramientas de análisis profesional

---

## 🏗️ Arquitectura del Proyecto

```
VisionFeast/
├── backend/                    # API Backend (FastAPI)
│   ├── app/
│   │   ├── api/               # Endpoints REST
│   │   ├── services/          # Lógica de negocio + IA
│   │   ├── models/            # Modelos de datos (MongoDB)
│   │   ├── schemas/           # Validación (Pydantic)
│   │   └── repositories/      # Capa de persistencia
│   ├── tests/                 # Suite de tests (pytest)
│   └── main.py               # Punto de entrada
│
├── frontend/                  # Aplicación Móvil (React Native)
│   ├── src/
│   │   ├── features/         # Características por módulo
│   │   ├── core/             # Servicios y utilidades
│   │   └── assets/           # Recursos estáticos
│   └── README.md
│
└── docs/                      # Documentación del proyecto
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.115.12
- **Lenguaje**: Python 3.13+
- **Base de Datos**: MongoDB + Beanie ODM
- **IA**: Google Gemini AI (gemini-1.5-flash)
- **Autenticación**: Google OAuth 2.0 + JWT
- **Testing**: pytest (20 tests, 100% passing)

### Frontend (Móvil)
- **Framework**: React Native
- **Navegación**: React Navigation
- **Estado**: Context API / Redux
- **UI**: Componentes nativos + bibliotecas modernas

### Servicios Externos
- **Google Gemini AI**: Análisis de imágenes y generación de contenido
- **Google OAuth**: Autenticación segura
- **ElevenLabs**: Síntesis de voz (opcional)
- **MongoDB Atlas**: Base de datos en la nube

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Python 3.13+
- Node.js 18+ (para frontend)
- MongoDB (local o Atlas)
- API Keys de Google Cloud y Gemini

### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload
```

📚 Ver documentación completa en [`backend/README.md`](./backend/README.md)

### Frontend

```bash
cd frontend
npm install
npm start
```

📱 Ver documentación completa en [`frontend/README.md`](./frontend/README.md)

---

## 📚 Documentación

- **[Backend API](./backend/README.md)** - Documentación completa del backend
- **[AI Features](./backend/AI_FEATURES_DOCUMENTATION.md)** - Funcionalidades de IA
- **[Tests](./backend/tests/README.md)** - Suite de tests y cobertura
- **[Context](./CONTEXT.md)** - Contexto y especificaciones del proyecto
- **[Swagger UI](http://localhost:8000/docs)** - Documentación interactiva de API

---

## 🎯 Ventajas Competitivas

### ¿Por qué VisionFeast es mejor?

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

## 🔒 Privacidad y Seguridad

- 🔐 Autenticación segura con Google OAuth 2.0
- 🔑 Tokens JWT para sesiones
- 🛡️ Encriptación de datos sensibles
- 📊 Datos de salud protegidos según normativas
- 🚫 No compartimos información personal con terceros

---

## 🌍 Modelo de Negocio

### Freemium

**Gratis**
- Análisis básico de alimentos
- Registro de comidas (limitado)
- Recetas de la comunidad
- Insights básicos

**Premium** (Suscripción mensual)
- Análisis ilimitado de alimentos
- Planes personalizados de nutrición y ejercicio
- Acceso a nutriólogos certificados
- Análisis avanzado de patrones
- Recetas premium y personalizadas
- Soporte prioritario

### Impacto en Profesionales

**No reemplaza a nutriólogos, los potencia:**
- ✅ Herramientas para gestionar más pacientes eficientemente
- ✅ IA como asistente, no como reemplazo
- ✅ Validación profesional requerida para planes críticos
- ✅ Nuevas oportunidades de ingreso (consultas en plataforma)
- ✅ Datos y análisis que facilitan el seguimiento

---

## 🧪 Testing

```bash
cd backend
pytest tests/ -v
```

**Cobertura actual**: 20 tests, 100% passing
- ✅ Endpoints principales
- ✅ Autenticación y autorización
- ✅ Funcionalidades de IA
- ✅ Validación de datos

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Roadmap

### Fase 1 (Actual) - MVP
- [x] Backend API con FastAPI
- [x] Integración con Gemini AI
- [x] Autenticación con Google OAuth
- [x] Análisis de alimentos
- [x] Generación de recetas
- [x] Planes dinámicos
- [ ] Aplicación móvil React Native

### Fase 2 - Mejoras
- [ ] Análisis de técnica de ejercicio con video
- [ ] Síntesis de voz con ElevenLabs
- [ ] Comunidad y red social
- [ ] Marketplace de recetas
- [ ] Integración con wearables

### Fase 3 - Escalabilidad
- [ ] Machine Learning personalizado
- [ ] Análisis predictivo avanzado
- [ ] Expansión internacional
- [ ] API pública para desarrolladores

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
- **Comunidad Open Source** - Por las increíbles herramientas

---

<div align="center">

**Hecho con ❤️ para el Hackathon FIF 2026**

[Documentación](./backend/README.md) • [API Docs](http://localhost:8000/docs) • [Reportar Bug](https://github.com/dferram/VisionFeast/issues)

</div>
