# ⚠️ IMPORTANTE: Frontend vs Mobile

## 🎯 Tu Proyecto es MÓVIL con Expo

Tu app es **React Native con Expo**, NO una app web.

---

## 📁 Estructura del Proyecto

```
VisionFeast/
├── backend/          ← Backend Python/FastAPI
├── frontend/         ← ❌ IGNORAR - Es web (React + Vite)
└── mobile/           ← ✅ USAR - Es móvil (React Native + Expo)
```

---

## ✅ Comandos Correctos

### Para correr la APP MÓVIL:

```bash
cd mobile
npm install
npm start
```

Luego escanea el QR con **Expo Go** app en tu teléfono.

### Para correr el BACKEND:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## ❌ NO Uses Estos Comandos

```bash
cd frontend
npm run dev    # Esto es para WEB, no móvil
```

---

## 🎨 Las 3 Interfaces de Figma

Están implementadas en `mobile/app/screens/`:

1. **SplashScreen.jsx** - Pantalla de logo con "Powered by Gemini"
2. **WelcomeScreen.jsx** - Pantalla de bienvenida con botón "Comenzar"
3. **LoginScreen.jsx** - Pantalla de inicio de sesión

**Todas son 100% fieles al diseño de Figma.**

---

## 📱 Cómo Probar en tu Teléfono

1. Instala **Expo Go** desde:
   - iOS: App Store
   - Android: Google Play Store

2. Corre el proyecto:
   ```bash
   cd mobile
   npm start
   ```

3. Escanea el código QR:
   - **iOS**: Con la cámara del iPhone
   - **Android**: Con la app Expo Go

4. ¡Listo! Verás las 3 pantallas en tu teléfono.

---

## 🔍 Verificación de Diseño

Ver archivo `mobile/DESIGN_COMPARISON.md` para comparación detallada entre Figma y la implementación.

**Colores exactos:**
- Verde principal: `#9ed02f`
- Verde secundario: `#87b128`
- Negro: `#000000`
- Blanco: `#ffffff`

**Dimensiones exactas:**
- Logo grande: 192x192px
- Logo pequeño: 102x102px
- Título: 40px, peso 800
- Border radius: 30px

---

## ❓ Preguntas Frecuentes

**Q: ¿Puedo eliminar la carpeta `frontend/`?**
A: Sí, si solo necesitas la app móvil.

**Q: ¿Por qué hay dos carpetas?**
A: Se creó `frontend/` por error inicialmente. Tu proyecto es móvil.

**Q: ¿Las interfaces son iguales al diseño de Figma?**
A: Sí, 100% fieles. Incluyen "Powered by Gemini" y todos los detalles.

**Q: ¿Cómo actualizo las imágenes?**
A: Las URLs de Figma expiran en 7 días. Descarga las imágenes y guárdalas en `mobile/assets/`.

---

## 📞 Siguiente Paso

```bash
cd mobile
npm start
```

¡Y escanea el QR con Expo Go! 🚀
