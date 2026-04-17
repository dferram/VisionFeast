# 🐳 Docker - VisionFeast

Documentación completa para ejecutar VisionFeast usando Docker y Docker Compose.

---

## 📋 Requisitos Previos

- **Docker**: >= 20.10
- **Docker Compose**: >= 2.0
- **Git**: Para clonar el repositorio

---

## 🏗️ Arquitectura de Contenedores

```
┌─────────────────────────────────────────────────────────┐
│                    VisionFeast Stack                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Frontend   │  │   Backend    │  │   MongoDB    │  │
│  │  React+Vite  │  │   FastAPI    │  │    7.0       │  │
│  │  Port: 3000  │  │  Port: 8000  │  │ Port: 27017  │  │
│  │   (Nginx)    │  │              │  │              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                 │           │
│         └─────────────────┴─────────────────┘           │
│                visionfeast-network                       │
└─────────────────────────────────────────────────────────┘
```

### Servicios

1. **mongodb**: Base de datos NoSQL
   - Imagen: `mongo:7.0`
   - Puerto: `27017`
   - Volúmenes persistentes para datos

2. **backend**: API REST con FastAPI
   - Build: `./backend/Dockerfile`
   - Puerto: `8000`
   - Hot-reload habilitado en desarrollo

3. **frontend**: Aplicación web React
   - Build: `./frontend/Dockerfile` (multi-stage)
   - Puerto: `3000` (Nginx)
   - Optimizado para producción

---

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# MongoDB
MONGODB_URI=mongodb://mongodb:27017/visionfeast_db

# APIs de IA
GEMINI_API_KEY=tu_api_key_de_gemini
ELEVENLABS_API_KEY=tu_api_key_de_elevenlabs

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# Frontend
VITE_API_URL=http://localhost:8000/api/v1
```

### 2. Levantar los Contenedores

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# O en modo detached (background)
docker-compose up -d --build
```

### 3. Verificar que todo funciona

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Docs de API**: http://localhost:8000/docs
- **MongoDB**: localhost:27017

---

## 🛠️ Comandos Útiles

### Gestión de Contenedores

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (⚠️ borra datos de MongoDB)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart backend

# Reconstruir un servicio
docker-compose up -d --build backend
```

### Acceso a Contenedores

```bash
# Entrar al contenedor del backend
docker-compose exec backend bash

# Entrar al contenedor de MongoDB
docker-compose exec mongodb mongosh visionfeast_db

# Ejecutar comando en el backend
docker-compose exec backend python -c "print('Hello from container')"
```

### Gestión de Base de Datos

```bash
# Ver colecciones en MongoDB
docker-compose exec mongodb mongosh visionfeast_db --eval "db.getCollectionNames()"

# Exportar datos
docker-compose exec mongodb mongodump --db=visionfeast_db --out=/data/backup

# Importar datos
docker-compose exec mongodb mongorestore --db=visionfeast_db /data/backup/visionfeast_db
```

---

## 📦 Estructura de Archivos Docker

```
VisionFeast/
├── docker-compose.yml          # Orquestación de servicios
├── .dockerignore               # Archivos a ignorar (root)
├── .env                        # Variables de entorno (no commitear)
├── .env.example                # Plantilla de variables
│
├── backend/
│   ├── Dockerfile              # Imagen del backend
│   ├── .dockerignore           # Archivos a ignorar
│   ├── requirements.txt        # Dependencias Python
│   └── ...
│
└── frontend/
    ├── Dockerfile              # Imagen del frontend (multi-stage)
    ├── nginx.conf              # Configuración de Nginx
    ├── .dockerignore           # Archivos a ignorar
    └── ...
```

---

## 🔧 Desarrollo

### Hot Reload

Ambos servicios tienen hot-reload habilitado:

- **Backend**: Uvicorn con `--reload`
- **Frontend**: Vite dev server (en desarrollo) o Nginx (en producción)

Los cambios en el código se reflejan automáticamente sin necesidad de reconstruir.

### Instalar Nuevas Dependencias

**Backend (Python):**
```bash
# 1. Agregar dependencia a requirements.txt
echo "nueva-libreria==1.0.0" >> backend/requirements.txt

# 2. Reconstruir el contenedor
docker-compose up -d --build backend
```

**Frontend (Node):**
```bash
# 1. Entrar al contenedor
docker-compose exec frontend sh

# 2. Instalar dependencia
npm install nueva-libreria

# 3. Salir y reconstruir
docker-compose up -d --build frontend
```

---

## 🐛 Troubleshooting

### El backend no se conecta a MongoDB

**Problema**: `Could not connect to MongoDB`

**Solución**:
```bash
# Verificar que MongoDB esté corriendo
docker-compose ps

# Ver logs de MongoDB
docker-compose logs mongodb

# Reiniciar MongoDB
docker-compose restart mongodb
```

### Puerto ya en uso

**Problema**: `Error: port is already allocated`

**Solución**:
```bash
# Opción 1: Detener el proceso que usa el puerto
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Opción 2: Cambiar el puerto en docker-compose.yml
# Editar: "8001:8000" en lugar de "8000:8000"
```

### Cambios no se reflejan

**Problema**: Los cambios en el código no se ven

**Solución**:
```bash
# Reconstruir sin caché
docker-compose build --no-cache backend
docker-compose up -d backend
```

### Error de permisos en volúmenes

**Problema**: `Permission denied` en archivos

**Solución**:
```bash
# Linux/Mac: Ajustar permisos
sudo chown -R $USER:$USER .

# Windows: Verificar que Docker Desktop tenga acceso a la carpeta
```

---

## 🚀 Producción

### Build Optimizado

```bash
# Construir imágenes optimizadas
docker-compose -f docker-compose.yml build --no-cache

# Variables de entorno de producción
cp .env.example .env.production
# Editar .env.production con valores de producción
```

### Despliegue

```bash
# Usar archivo de producción
docker-compose -f docker-compose.prod.yml up -d

# Verificar salud de servicios
docker-compose ps
```

### Seguridad

- ✅ No commitear `.env` al repositorio
- ✅ Usar secretos de Docker en producción
- ✅ Configurar CORS correctamente en el backend
- ✅ Usar HTTPS con certificados SSL
- ✅ Limitar acceso a MongoDB (no exponer puerto 27017 públicamente)

---

## 📊 Monitoreo

### Health Checks

Los servicios tienen health checks configurados:

```bash
# Ver estado de salud
docker-compose ps

# Detalles de un servicio
docker inspect visionfeast-backend | grep -A 10 Health
```

### Logs

```bash
# Logs en tiempo real
docker-compose logs -f --tail=100

# Logs de las últimas 24 horas
docker-compose logs --since 24h

# Guardar logs a archivo
docker-compose logs > logs.txt
```

---

## 🔄 Actualización

```bash
# 1. Detener servicios
docker-compose down

# 2. Actualizar código
git pull origin main

# 3. Reconstruir y levantar
docker-compose up -d --build

# 4. Verificar
docker-compose ps
docker-compose logs -f
```

---

## 📚 Referencias

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI Docker](https://fastapi.tiangolo.com/deployment/docker/)
- [MongoDB Docker](https://hub.docker.com/_/mongo)
- [Nginx Docker](https://hub.docker.com/_/nginx)

---

## 💡 Tips

1. **Limpieza periódica**: `docker system prune -a` para liberar espacio
2. **Backups**: Exportar datos de MongoDB regularmente
3. **Logs**: Rotar logs para evitar que crezcan demasiado
4. **Recursos**: Ajustar límites de memoria/CPU en docker-compose.yml si es necesario
5. **Red**: Usar `visionfeast-network` para comunicación entre servicios

---

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Consulta esta documentación
4. Revisa el archivo `CONTEXT.md` para el esquema de la base de datos
