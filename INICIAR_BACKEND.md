# 🚀 Cómo Iniciar el Backend

## ✅ Pasos Rápidos

### 1. Activar entorno virtual
```powershell
cd "d:\Ferram\Personal\Hackathons-College\Hackathon FIF 2026\VisionFeast"
.\.venv\Scripts\Activate.ps1
```

### 2. Ir al directorio backend
```powershell
cd backend
```

### 3. Instalar/Actualizar dependencias (solo primera vez o si hay cambios)
```powershell
pip install -r requirements.txt
```

### 4. Ejecutar el script de fix de bcrypt (solo si hay error de bcrypt)
```powershell
.\fix-bcrypt.ps1
```

### 5. Iniciar el servidor
```powershell
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 🔍 Verificar que funciona

Abre tu navegador en: http://localhost:8000/docs

Deberías ver la documentación de Swagger con todos los endpoints.

## 📱 Configuración para la App Móvil

### Si usas dispositivo físico (Expo Go):
La IP de tu computadora es: **10.40.132.153**

El archivo `mobile/app/services/api.js` ya está configurado con esta IP:
```javascript
const API_BASE_URL = 'http://10.40.132.153:8000';
```

### Si usas emulador Android:
Cambia en `mobile/app/services/api.js`:
```javascript
const API_BASE_URL = 'http://10.0.2.2:8000';
```

## 🧪 Probar Endpoints

Desde el directorio `backend`:
```powershell
python test_register_endpoints.py
```

Deberías ver:
```
Health Check: ✅ PASS
Register Client: ✅ PASS
Register Nutritionist: ✅ PASS
Register Coach: ✅ PASS
Login: ✅ PASS

Total: 5/5 tests pasaron
```

## ❌ Solución de Problemas

### Error: "No module named 'motor'"
```powershell
pip install -r requirements.txt
```

### Error: "bcrypt password cannot be longer than 72 bytes"
```powershell
.\fix-bcrypt.ps1
```

### Error: "Network request failed" en la app
1. Verifica que el backend esté corriendo
2. Verifica que estés usando la IP correcta en `api.js`
3. Asegúrate de que tu teléfono y computadora estén en la misma red WiFi

### Verificar tu IP actual:
```powershell
ipconfig
# Busca "Dirección IPv4" en "Adaptador de LAN inalámbrica Wi-Fi"
```

## 📊 Endpoints Disponibles

- `POST /api/v1/register/client` - Registrar cliente
- `POST /api/v1/register/coach` - Registrar entrenador
- `POST /api/v1/register/nutritionist` - Registrar nutriólogo
- `POST /api/v1/auth/login` - Login unificado
- `GET /api/v1/auth/me` - Obtener perfil del usuario
- `GET /health` - Health check
- `GET /docs` - Documentación Swagger
