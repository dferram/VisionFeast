# 📸 Funcionalidad de Cámara y Análisis de Alimentos

## ✅ Estado: COMPLETAMENTE IMPLEMENTADO

La aplicación VisionFeast ya cuenta con un sistema completo de análisis de alimentos mediante cámara y IA.

---

## 🎯 Flujo Completo

### 1. **Cliente toma foto del alimento**
- **Ubicación**: `mobile/app/screens/Clientes/MealsScreen.jsx`
- **Función**: `pickImage()` (línea 39-57)
- **Tecnología**: `expo-image-picker`

```javascript
const pickImage = async () => {
  // Solicita permisos de cámara
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
  // Abre la cámara
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.7,
    base64: true,  // ✅ Convierte a base64 automáticamente
  });
  
  if (!result.canceled) {
    analyzeImage(result.assets[0].base64);
  }
};
```

### 2. **Envío al backend para análisis**
- **API Client**: `mobile/app/services/api.js`
- **Endpoint**: `POST /api/v1/ai/analyze-food`
- **Función**: `analyzeFoodFromUrl(token, base64Image, momento)`

```javascript
analyzeFoodFromUrl: (token, imageUrl, momento = 'comida') =>
  authRequest('/api/v1/ai/analyze-food', token, {
    method: 'POST',
    body: JSON.stringify({ 
      image_base64: imageUrl,  // ✅ Imagen en base64
      momento                   // ✅ Desayuno/comida/cena
    }),
  }),
```

### 3. **Backend procesa con Gemini Vision AI**
- **Endpoint**: `backend/app/api/v1/ai.py` (línea 21-83)
- **Servicio**: `backend/app/services/gemini_service.py`
- **Modelo**: `gemini-1.5-flash` (Vision)

**Proceso:**
1. Decodifica imagen base64
2. Obtiene objetivos del usuario (meta, calorías, macros)
3. Envía a Gemini Vision para análisis
4. Genera "Coach Insight" personalizado
5. Guarda en base de datos (`MealLog`)
6. Retorna análisis completo

### 4. **Respuesta JSON con Macronutrientes**

**Formato de respuesta:**
```json
{
  "nombre": "Ensalada César con Pollo",
  "kcal": 450,
  "macros": {
    "p": 35,  // Proteínas en gramos
    "c": 25,  // Carbohidratos en gramos
    "g": 22   // Grasas en gramos
  },
  "confidence_score": 0.92,
  "ingredientes": [
    "Pechuga de pollo",
    "Lechuga romana",
    "Queso parmesano",
    "Crutones",
    "Aderezo César"
  ],
  "advertencias": [],
  "coach_insight": "¡Excelente elección! Esta ensalada aporta 35g de proteína, perfecto para tu meta de ganancia muscular. Las 450 kcal se ajustan bien a tu objetivo diario. Considera agregar más vegetales para aumentar la fibra."
}
```

---

## 📱 Interfaz de Usuario

### **Pantalla Principal (MealsScreen)**

#### Características:
- ✅ **Hero Card** con botón "Escanear Plato"
- ✅ **FAB (Floating Action Button)** con ícono de cámara
- ✅ **Loading indicator** durante análisis
- ✅ **Alert** con resultados del análisis
- ✅ **Lista de comidas** registradas hoy
- ✅ **Dashboard nutricional** con macros del día

#### Componentes visuales:
```
┌─────────────────────────────────┐
│  VISION FEAST                   │
├─────────────────────────────────┤
│  🎯 AI VISION PROTOCOL          │
│  Análisis Instantáneo           │
│  [📷 Escanear Plato]            │
│  [Imagen de ejemplo]            │
│  ✓ 98.2% Precisión IA           │
├─────────────────────────────────┤
│  Estado Nutricional Diario      │
│  ⭕ 1420 KCAL RESTANTES         │
│  ▓▓▓▓▓░░░ PROTEÍNA 84G/180G    │
├─────────────────────────────────┤
│  Comidas de Hoy                 │
│  🍽️ Ensalada César              │
│     450 kcal | 35g prot         │
└─────────────────────────────────┘
        [📷 FAB]
```

---

## 🔧 Tecnologías Utilizadas

### Frontend (Mobile)
- **React Native** + **Expo**
- **expo-image-picker** - Acceso a cámara
- **fetch API** - Comunicación con backend

### Backend
- **FastAPI** - Framework web
- **Google Gemini 1.5 Flash** - Análisis de visión
- **MongoDB** - Almacenamiento de meal logs
- **Beanie ODM** - ORM para MongoDB

---

## 🎨 Personalización del Análisis

El análisis de Gemini considera:

1. **Objetivos del usuario**
   - Meta (Bajar/Subir/Mantener peso)
   - Calorías diarias objetivo
   - Macros objetivo (proteínas, carbos, grasas)

2. **Contexto médico**
   - Alergias alimentarias
   - Condiciones médicas
   - Restricciones dietéticas

3. **Coach Insights**
   - Retroalimentación personalizada
   - Consejos prácticos
   - Motivación según objetivos

---

## 📊 Almacenamiento en MongoDB

**Colección**: `meal_logs`

```javascript
{
  "_id": ObjectId("..."),
  "user_id": "usuario_123",
  "comida": {
    "nombre": "Ensalada César con Pollo",
    "foto_url": "",
    "momento": "comida"
  },
  "analisis_ia": {
    "kcal": 450,
    "macros": {
      "proteinas": 35,
      "carbohidratos": 25,
      "grasas": 22
    },
    "confidence_score": 0.92,
    "coach_insight": "¡Excelente elección!..."
  },
  "created_at": ISODate("2026-04-18T03:00:00Z"),
  "estado": "pendiente"
}
```

---

## 🚀 Cómo Probar

### 1. **Iniciar Backend**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 2. **Iniciar App Móvil**
```bash
cd mobile
npm start
```

### 3. **Usar la Funcionalidad**
1. Abre la app en tu dispositivo/emulador
2. Navega a la pantalla "MEALS"
3. Toca el botón "📷 Escanear Plato" o el FAB
4. Permite permisos de cámara
5. Toma foto del alimento
6. Espera el análisis (2-5 segundos)
7. ¡Revisa los resultados!

---

## 🔐 Seguridad

- ✅ Autenticación JWT requerida
- ✅ Imágenes procesadas en memoria (no se guardan)
- ✅ Validación de permisos de cámara
- ✅ Rate limiting en API (configurado en Railway)

---

## 📈 Mejoras Futuras Sugeridas

1. **Caché de análisis** - Guardar análisis de comidas comunes
2. **Modo offline** - Análisis básico sin conexión
3. **Historial de fotos** - Guardar imágenes en cloud storage
4. **Comparación visual** - Mostrar foto junto a análisis
5. **Escaneo de códigos de barras** - Para alimentos empaquetados
6. **Reconocimiento de porciones** - Mejorar precisión de cantidades

---

## ✅ Checklist de Funcionalidad

- [x] Acceso a cámara del dispositivo
- [x] Captura de foto con edición
- [x] Conversión a base64
- [x] Envío al backend
- [x] Análisis con Gemini Vision
- [x] Cálculo de macronutrientes
- [x] Generación de coach insights
- [x] Almacenamiento en MongoDB
- [x] Visualización de resultados
- [x] Lista de comidas del día
- [x] Dashboard nutricional
- [x] Manejo de errores
- [x] Loading states
- [x] Permisos de cámara

---

## 🎯 Conclusión

**La funcionalidad está 100% implementada y lista para usar.** El cliente puede:

1. ✅ Tomar foto de su alimento
2. ✅ Recibir análisis automático de macronutrientes en JSON
3. ✅ Ver coach insights personalizados
4. ✅ Revisar historial de comidas
5. ✅ Monitorear progreso nutricional diario

**Todo funciona con Railway (producción) y MongoDB Atlas (cloud).**
