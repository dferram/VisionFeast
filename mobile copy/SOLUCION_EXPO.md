# 🔧 Solución: Cómo Abrir la App con Expo Go

## ✅ Cambios Realizados

1. ✅ Corregido `package.json` - Punto de entrada correcto
2. ✅ Simplificado `app.json` - Removidos assets opcionales
3. ✅ Removido `expo-router` - Usando React Navigation clásica

---

## 🚀 Pasos para Correr la App

### 1. Reinstalar dependencias (importante)

```bash
cd mobile
rm -rf node_modules package-lock.json
npm install
```

O en Windows PowerShell:
```powershell
cd mobile
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### 2. Iniciar Expo

```bash
npm start
```

### 3. Opciones para Abrir

Cuando se abra el menú de Expo, presiona:

- **`a`** - Para Android emulator
- **`i`** - Para iOS simulator (solo macOS)
- **`w`** - Para web browser
- **Escanear QR** - Con Expo Go app en tu teléfono

---

## 📱 Usando Expo Go en tu Teléfono

### Instalación de Expo Go:

**Android:**
1. Abre Google Play Store
2. Busca "Expo Go"
3. Instala la app

**iOS:**
1. Abre App Store
2. Busca "Expo Go"
3. Instala la app

### Conectar tu App:

1. Asegúrate de que tu teléfono y computadora estén en la **misma red WiFi**
2. Corre `npm start` en la terminal
3. Abre Expo Go en tu teléfono
4. **Android**: Presiona "Scan QR code" y escanea el código
5. **iOS**: Abre la cámara y escanea el código QR

---

## ⚠️ Problemas Comunes

### Problema 1: "Unable to resolve module"
**Solución:**
```bash
cd mobile
npm install
npm start --clear
```

### Problema 2: "Network response timed out"
**Solución:**
- Verifica que estés en la misma red WiFi
- Desactiva VPN si tienes una activa
- Intenta con modo túnel: `npm start --tunnel`

### Problema 3: "Something went wrong"
**Solución:**
```bash
cd mobile
rm -rf node_modules .expo
npm install
npm start
```

### Problema 4: No aparece el QR
**Solución:**
```bash
npm start
# Luego presiona 'r' para recargar
```

---

## 🔍 Verificar que Todo Funciona

Después de `npm start`, deberías ver:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

---

## 📱 Flujo de las Pantallas

Una vez que la app se abra en tu teléfono:

1. **SplashScreen** (3 segundos)
   - Logo de VisionFeast
   - "Powered by Gemini"
   - Auto-navega a Welcome

2. **WelcomeScreen**
   - Imagen de fondo con alimentos
   - Botón "Comenzar"
   - Link "Inicia sesión"

3. **LoginScreen**
   - Formulario de login
   - Campos de email y contraseña
   - Botón "Iniciar sesión"

---

## 🆘 Si Nada Funciona

Intenta el reset completo:

```bash
cd mobile

# Limpiar todo
rm -rf node_modules package-lock.json .expo

# Reinstalar
npm install

# Iniciar limpio
npm start --clear
```

---

## ✅ Checklist de Verificación

Antes de correr la app, verifica:

- [ ] Estás en la carpeta `mobile/` (no `frontend/`)
- [ ] Corriste `npm install`
- [ ] Tu teléfono tiene Expo Go instalado
- [ ] Estás en la misma red WiFi
- [ ] No tienes VPN activa
- [ ] El firewall no está bloqueando el puerto 8081

---

## 📞 Comando Final

```bash
cd mobile
npm install
npm start
```

¡Y escanea el QR con Expo Go! 🎉
