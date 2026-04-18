# VisionFeast Mobile - React Native con Expo

App móvil de VisionFeast con las 3 interfaces de onboarding generadas desde Figma.

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
cd mobile
npm install
```

### 2. Iniciar el proyecto

**Opción A: Expo Go (Recomendado para desarrollo)**
```bash
npm start
```
Luego escanea el código QR con:
- **iOS**: Cámara del iPhone
- **Android**: App Expo Go

**Opción B: Emulador Android**
```bash
npm run android
```

**Opción C: Simulador iOS** (solo macOS)
```bash
npm run ios
```

**Opción D: Web** (para preview rápido)
```bash
npm run web
```

## 📱 Pantallas Implementadas

### 1. SplashScreen
- Logo de VisionFeast centrado
- Auto-navegación a Welcome después de 3 segundos
- Colores exactos de Figma (#9ed02f)

### 2. WelcomeScreen
- Imagen de fondo con alimentos
- Card blanco redondeado
- Botón "Comenzar"
- Link "Inicia sesión"

### 3. LoginScreen
- Formulario completo de login
- Campos de email y contraseña
- Checkbox "Recordarme"
- Link "¿Olvidaste tu contraseña?"
- Link para registro

## 🎨 Fidelidad al Diseño de Figma

✅ **Colores exactos:**
- Verde principal: `#9ed02f`
- Verde secundario: `#87b128`
- Negro: `#000000`
- Blanco: `#ffffff`

✅ **Tipografía:**
- Título: 40px, peso 800
- Subtítulo: 20px, peso 600
- Botones: 18-21px, peso 600

✅ **Dimensiones:**
- Logo grande: 192x192px
- Logo pequeño: 102x102px
- Border radius: 30px
- Sombras aplicadas

✅ **Imágenes:**
- Cargadas directamente desde Figma API
- URLs válidas por 7 días

## 📦 Estructura del Proyecto

```
mobile/
├── app/
│   └── screens/
│       ├── SplashScreen.jsx
│       ├── WelcomeScreen.jsx
│       └── LoginScreen.jsx
├── assets/
├── App.js
├── app.json
├── package.json
└── babel.config.js
```

## 🔧 Tecnologías

- **React Native** 0.76.5
- **Expo** ~52.0.0
- **React Navigation** 6.x
- **React Native Safe Area Context**
- **React Native Screens**

## 📝 Notas

- Las imágenes de Figma expiran en 7 días. Para producción, descárgalas y guárdalas en `assets/`
- La navegación está configurada con React Navigation Native Stack
- El diseño es responsive y se adapta a diferentes tamaños de pantalla
- Usa `KeyboardAvoidingView` en LoginScreen para mejor UX

## 🎯 Próximos Pasos

1. Descargar imágenes localmente
2. Implementar pantalla de registro (SignupScreen)
3. Conectar con backend de autenticación
4. Agregar validación de formularios
5. Implementar manejo de errores
6. Agregar animaciones de transición
