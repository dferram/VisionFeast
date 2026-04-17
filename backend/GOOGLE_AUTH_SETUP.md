# Configuración de Google OAuth para VisionFeast Backend

## 📋 Resumen

El backend de VisionFeast está completamente configurado con Google OAuth. Los usuarios pueden autenticarse usando sus cuentas de Google y el sistema gestiona automáticamente la creación y actualización de usuarios.

## 🏗️ Arquitectura Implementada

### Modelos
- **`User`** (`app/models/user_model.py`): Modelo de usuario con soporte para Google OAuth
  - Campos: email, full_name, picture, google_id, role, auth_provider
  - Roles: USER, NUTRITIONIST, ADMIN
  - Proveedores: GOOGLE, EMAIL

### Servicios
- **`AuthService`** (`app/services/auth_service.py`): Maneja la autenticación con Google
  - `verify_google_token()`: Verifica el token de Google
  - `authenticate_with_google()`: Autentica usuario y retorna JWT

### Seguridad
- **`security.py`** (`app/core/security.py`): Manejo de JWT y autenticación
  - `create_access_token()`: Crea tokens JWT
  - `get_current_user()`: Middleware para obtener usuario actual
  - `get_current_active_user()`: Verifica que el usuario esté activo

### Endpoints API
- **`POST /api/v1/auth/google`**: Autenticación con Google
  - Body: `{ "token": "google_id_token" }`
  - Response: `{ "access_token": "jwt", "token_type": "bearer", "user": {...} }`

- **`GET /api/v1/auth/me`**: Obtener información del usuario actual
  - Headers: `Authorization: Bearer {token}`
  - Response: Información del usuario

- **`PATCH /api/v1/auth/me`**: Actualizar perfil del usuario
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ "full_name": "...", "dietary_preferences": [...], ... }`

## 🔧 Configuración Requerida

### 1. Obtener Credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API** o **Google Identity Services**
4. Ve a **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth 2.0**
5. Configura la pantalla de consentimiento OAuth
6. Crea credenciales para:
   - **Web** (para desarrollo/testing)
   - **iOS** (para la app móvil iOS)
   - **Android** (para la app móvil Android)

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/visionfeast_db

# Google OAuth
GOOGLE_CLIENT_ID=tu_google_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui

# JWT
JWT_SECRET_KEY=tu_clave_secreta_super_segura_aqui
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# APIs
GEMINI_API_KEY=tu_gemini_api_key
ELEVENLABS_API_KEY=tu_elevenlabs_api_key

# Frontend (para CORS)
FRONTEND_URL=http://localhost:8000
```

**IMPORTANTE**: 
- Usa el **Web Client ID** en `GOOGLE_CLIENT_ID`
- Genera una clave secreta fuerte para `JWT_SECRET_KEY`
- Nunca commitees el archivo `.env` al repositorio

### 3. Instalar Dependencias

```bash
cd backend
pip install -r requirements.txt
```

### 4. Iniciar MongoDB

```bash
# Con Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# O usa MongoDB local
mongod
```

### 5. Ejecutar el Backend

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🧪 Probar la Autenticación

### Usando cURL

```bash
# 1. Obtener un token de Google (desde tu app móvil o web)
# 2. Autenticar con el backend
curl -X POST http://localhost:8000/api/v1/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token": "tu_google_id_token_aqui"}'

# 3. Usar el access_token recibido
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer tu_access_token_aqui"
```

### Respuesta Exitosa

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "usuario@gmail.com",
    "full_name": "Usuario Ejemplo",
    "picture": "https://lh3.googleusercontent.com/...",
    "role": "user",
    "is_active": true
  }
}
```

## 📱 Integración con App Móvil

Para integrar con tu app móvil (React Native/Expo):

1. **Obtener el ID Token de Google** en la app móvil usando:
   - Expo: `expo-auth-session`
   - React Native: `@react-native-google-signin/google-signin`

2. **Enviar el token al backend**:
   ```javascript
   const response = await fetch('http://tu-backend/api/v1/auth/google', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ token: googleIdToken })
   });
   const { access_token, user } = await response.json();
   ```

3. **Guardar el access_token** y usarlo en todas las peticiones:
   ```javascript
   fetch('http://tu-backend/api/v1/auth/me', {
     headers: { 'Authorization': `Bearer ${access_token}` }
   });
   ```

## 🔒 Seguridad

- ✅ Tokens JWT con expiración (7 días por defecto)
- ✅ Verificación de tokens de Google con la API oficial
- ✅ CORS configurado para el frontend
- ✅ Middleware de autenticación en rutas protegidas
- ✅ Validación de usuarios activos

## 📚 Estructura de Archivos

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── auth.py          # Endpoints de autenticación
│   ├── core/
│   │   ├── config.py            # Configuración y variables de entorno
│   │   └── security.py          # JWT y middleware de seguridad
│   ├── models/
│   │   └── user_model.py        # Modelo de usuario
│   ├── schemas/
│   │   └── auth_schema.py       # Schemas de request/response
│   ├── services/
│   │   └── auth_service.py      # Lógica de autenticación
│   └── database.py              # Conexión a MongoDB con Beanie
├── main.py                      # Aplicación FastAPI principal
├── requirements.txt             # Dependencias Python
└── .env                         # Variables de entorno (NO commitear)
```

## 🐛 Troubleshooting

### Error: "Invalid Google token"
- Verifica que el `GOOGLE_CLIENT_ID` en `.env` coincida con el usado en la app móvil
- Asegúrate de que el token no haya expirado (tokens de Google expiran rápido)

### Error: "Could not validate credentials"
- El JWT puede haber expirado (7 días por defecto)
- Verifica que el token se esté enviando correctamente en el header

### Error: "Connection refused" a MongoDB
- Asegúrate de que MongoDB esté corriendo
- Verifica la URI en `MONGODB_URI`

## 🚀 Próximos Pasos

1. Implementar el frontend móvil con Expo
2. Agregar más endpoints protegidos (análisis, coach, nutricionista)
3. Implementar refresh tokens para mayor seguridad
4. Agregar rate limiting
5. Configurar logging y monitoreo

## 📞 Soporte

Para más información sobre la implementación, revisa:
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Beanie ODM](https://beanie-odm.dev/)
