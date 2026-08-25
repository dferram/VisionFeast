# VisionFeast Mobile - React Native con Expo

App móvil de VisionFeast con las interfaces generadas desde Figma.

## Instalación y Ejecución

### 1. Instalar dependencias
```bash
cd mobile
npm install
```

### 2. Iniciar el proyecto

Opción A: Expo Go (Recomendado para desarrollo)
```bash
npm start
```
Luego escanea el código QR con la cámara de iOS o la App Expo Go en Android.

Opción B: Emulador Android
```bash
npm run android
```

Opción C: Simulador iOS (solo macOS)
```bash
npm run ios
```

Opción D: Web (para preview rápido)
```bash
npm run web
```

## Pantallas Implementadas

### 1. SplashScreen
- Logo de VisionFeast centrado
- Auto-navegación a Welcome después de 3 segundos
- Colores exactos de Figma (#9ed02f)

### 2. WelcomeScreen
- Imagen de fondo con alimentos
- Card blanco redondeado
- Botón Comenzar
- Link Inicia sesión

### 3. LoginScreen
- Formulario completo de login
- Campos de email y contraseña
- Checkbox Recordarme
- Link Olvidaste tu contraseña
- Link para registro

## Fidelidad al Diseño de Figma

- Colores exactos: Verde principal (#9ed02f), Verde secundario (#87b128), Negro, Blanco
- Tipografía: Estilos ajustados según especificaciones
- Dimensiones: Radios de borde de 30px y tamaños de logo precisos
- Imágenes: Integradas fluidamente en las interfaces

## Estructura del Proyecto

- app/screens/ : Contiene las pantallas principales (SplashScreen, WelcomeScreen, LoginScreen)
- assets/ : Recursos estáticos, fuentes e imágenes

## Tecnologías

- React Native 0.76.5
- Expo ~52.0.0
- React Navigation 6.x
- React Native Safe Area Context
- React Native Screens

## Notas

- La navegación está configurada con React Navigation Native Stack
- El diseño es responsive y se adapta a diferentes tamaños de pantalla
- Usa KeyboardAvoidingView en LoginScreen para mejor experiencia de usuario

## Próximos Pasos

1. Descargar imágenes localmente para producción
2. Implementar pantalla de registro (SignupScreen)
3. Conectar con backend de autenticación
4. Agregar validación de formularios
5. Implementar manejo de errores
6. Agregar animaciones de transición
