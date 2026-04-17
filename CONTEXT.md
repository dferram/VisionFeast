# VisionFeast - Esquema de Base de Datos MongoDB

> **Base de datos:** `visionfeast_db`  
> **Fecha de generación:** 2026-04-17  
> **Propósito:** Contexto para prompts de IA y desarrollo

---

## 📊 Colecciones

### 1. **users** - Usuarios de la aplicación

```json
{
  "_id": "ObjectId('69e27e41b8197c54e78846f8')",
  "auth": {
    "email": "fer@visionfeast.com",
    "hashed_password": "$2b$12$EixZaYVK1bRzivw336Nj..8OTW",
    "role": "usuario",
    "google_id": null
  },
  "perfil": {
    "nombre": "Fer",
    "apellido": "Developer",
    "biometria": {
      "estatura_cm": 180,
      "peso_kg": 85,
      "edad": 22,
      "genero": "Masculino"
    },
    "estilo_vida": {
      "nivel_actividad": 3,
      "dieta_especifica": "Nada",
      "medical_context": "Lesión en rodilla izquierda, asma leve"
    }
  },
  "objetivos": {
    "meta": "Subir",
    "kcal_diarias": 2800,
    "macros_target": {
      "proteinas": 180,
      "carbohidratos": 350,
      "grasas": 80
    }
  },
  "asignaciones": {
    "nutriologo_id": null,
    "entrenador_id": null
  },
  "creado_at": "ISODate('2026-04-17T12:00:00.000Z')"
}
```

**Campos clave:**
- `auth.role`: Rol del usuario (usuario, nutriologo, entrenador)
- `perfil.biometria`: Datos físicos del usuario
- `perfil.estilo_vida.medical_context`: Contexto médico importante para personalización
- `objetivos.meta`: Meta del usuario (Subir, Bajar, Mantener)
- `objetivos.macros_target`: Objetivos de macronutrientes

---

### 2. **professionals** - Nutriólogos y Entrenadores

```json
{
  "_id": "ObjectId('69e27e58b8197c54e78846fc')",
  "tipo": "nutriologo",
  "nombre_completo": "Dra. Mariana Nutri",
  "perfil_profesional": {
    "certificado_url": "https://visionfeast.blob.core.windows.net/certs/id123.pdf",
    "especialidad": "Nutrición Deportiva y Masa Muscular",
    "biografia": "Más de 5 años ayudando a atletas de alto rendimiento a optimizar su alimentación."
  },
  "stats": {
    "calificacion_promedio": 4.9,
    "total_resenas": 24
  }
}
```

**Campos clave:**
- `tipo`: Tipo de profesional (nutriologo, entrenador)
- `perfil_profesional.certificado_url`: URL del certificado profesional
- `perfil_profesional.especialidad`: Área de especialización
- `stats`: Métricas de desempeño y reseñas

---

### 3. **meal_logs** - Registro de comidas con análisis IA

```json
{
  "_id": "ObjectId('69e27e6db8197c54e78846ff')",
  "user_id": null,
  "comida": {
    "nombre": "Pechuga de pollo con arroz y brócoli",
    "foto_url": "https://visionfeast.blob.core.windows.net/meals/upload_test.jpg",
    "momento": "comida"
  },
  "analisis_ia": {
    "kcal": 550,
    "macros": {
      "p": 45,
      "c": 60,
      "g": 12
    },
    "confidence_score": 0.98,
    "coach_insight": "Excelente plato balanceado. Tienes un buen aporte de proteína para tu meta de subir peso."
  },
  "creado_at": "ISODate('2026-04-17T14:30:00.000Z')"
}
```

**Campos clave:**
- `comida.foto_url`: URL de la imagen de la comida
- `comida.momento`: Momento del día (desayuno, comida, cena, snack)
- `analisis_ia.macros`: Macronutrientes (p=proteínas, c=carbohidratos, g=grasas)
- `analisis_ia.confidence_score`: Confianza del análisis de IA (0-1)
- `analisis_ia.coach_insight`: Retroalimentación personalizada del coach virtual

---

### 4. **recipes** - Recetas de comida

```json
{
  "_id": "ObjectId('69e27e80b8197c54e7884702')",
  "creador_id": null,
  "detalles": {
    "titulo": "Bowl de Avena Energético",
    "descripcion": "Desayuno alto en fibra y carbohidratos complejos.",
    "instrucciones": [
      "Hervir la avena con leche de almendras",
      "Agregar crema de cacahuate y plátano",
      "Finalizar con semillas de chía"
    ],
    "is_public": true
  },
  "nutricion": {
    "kcal_totales": 420,
    "macros": {
      "p": 15,
      "c": 55,
      "g": 14
    }
  }
}
```

**Campos clave:**
- `creador_id`: ID del usuario o profesional que creó la receta
- `detalles.instrucciones`: Array de pasos para preparar la receta
- `detalles.is_public`: Si la receta es pública o privada
- `nutricion`: Información nutricional completa

---

### 5. **nutrition_plans** - Planes nutricionales semanales

```json
{
  "_id": "ObjectId('69e27ed6b8197c54e7884705')",
  "user_id": null,
  "nombre_plan": "Corte y Definición - Semana 1",
  "configuracion": {
    "fecha_inicio": "ISODate('2026-04-20T00:00:00.000Z')",
    "fecha_fin": "ISODate('2026-04-27T00:00:00.000Z')",
    "objetivo_kcal_diario": 2100
  },
  "cronograma": {
    "lunes": {
      "desayuno": "ID_RECETA_AVENA",
      "comida": "ID_RECETA_POLLO",
      "cena": "ID_RECETA_ENSALADA"
    },
    "martes": {
      "desayuno": "ID_RECETA_HUEVOS",
      "comida": "ID_RECETA_PESCADO",
      "cena": "ID_RECETA_YOGURT"
    }
  }
}
```

**Campos clave:**
- `nombre_plan`: Nombre descriptivo del plan
- `configuracion.objetivo_kcal_diario`: Meta calórica diaria
- `cronograma`: Estructura de comidas por día de la semana
- Los valores en cronograma son referencias a documentos en la colección `recipes`

---

### 6. **plans** - Planes de entrenamiento y validación

```json
{
  "_id": "ObjectId('69e27fd8b8197c54e7884708')",
  "user_id": null,
  "tipo_plan": "entrenamiento",
  "origen": "ia_generado",
  "estado": "pendiente_revision",
  "contenido": {
    "titulo": "Rutina Hipertrofia - Pecho",
    "ejercicios": [
      {
        "nombre": "Press Banca",
        "series": 4,
        "reps": 12
      },
      {
        "nombre": "Aperturas",
        "series": 3,
        "reps": 15
      }
    ]
  },
  "validacion": {
    "especialista_id": null,
    "notas_ajuste": "Evitar press inclinado por la tendinitis en el hombro",
    "fecha_aprobacion": null
  }
}
```

**Campos clave:**
- `tipo_plan`: Tipo de plan (entrenamiento, nutricion)
- `origen`: Origen del plan (ia_generado, profesional)
- `estado`: Estado del plan (pendiente_revision, aprobado, rechazado)
- `validacion.especialista_id`: ID del profesional que valida
- `validacion.notas_ajuste`: Ajustes personalizados basados en contexto médico

---

## 🔗 Relaciones entre Colecciones

```
users
  ├─> asignaciones.nutriologo_id → professionals._id
  ├─> asignaciones.entrenador_id → professionals._id
  └─> _id → meal_logs.user_id
           → nutrition_plans.user_id
           → plans.user_id
           → recipes.creador_id

professionals
  └─> _id → plans.validacion.especialista_id

recipes
  └─> _id → nutrition_plans.cronograma.{dia}.{momento}

plans
  └─> validacion.especialista_id → professionals._id
```

---

## 🎯 Casos de Uso Principales

1. **Análisis de comida con IA:**
   - Usuario sube foto → `meal_logs` con análisis de Gemini
   - Coach virtual genera `coach_insight` personalizado

2. **Asignación de profesionales:**
   - Usuario puede tener `nutriologo_id` y `entrenador_id` en `users.asignaciones`
   - Profesionales en colección `professionals` con certificaciones

3. **Planes personalizados:**
   - IA genera planes en `plans` con `estado: "pendiente_revision"`
   - Profesional valida y ajusta según `medical_context` del usuario
   - Planes aprobados se usan para generar `nutrition_plans`

4. **Recetas y cronogramas:**
   - `recipes` pueden ser públicas o privadas
   - `nutrition_plans` referencian recetas en el cronograma semanal

---

## 📝 Notas de Implementación

- **Autenticación:** Hash de contraseñas con bcrypt (`$2b$12$...`)
- **Roles:** `usuario`, `nutriologo`, `entrenador`
- **Almacenamiento de archivos:** Azure Blob Storage (`visionfeast.blob.core.windows.net`)
- **IA:** Gemini para análisis de comidas y generación de insights
- **Macros:** Formato abreviado `p` (proteínas), `c` (carbohidratos), `g` (grasas)
