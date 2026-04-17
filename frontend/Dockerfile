# Dockerfile para VisionFeast Frontend (React + Vite)
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias (se cachea si no cambian)
COPY package*.json ./

# Instalar dependencias (se cachea si package.json no cambia)
RUN npm ci --prefer-offline --no-audit

# Copiar archivos de configuración
COPY vite.config.js tailwind.config.js postcss.config.js index.html ./

# Copiar código fuente
COPY src ./src

# Build de producción
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine

# Copiar build al servidor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
