#!/bin/bash

# 🏆 Script de Build Automático para Hackathon
# VisionFeast - Generación de APK para Jueces

echo "🚀 VisionFeast - Build para Hackathon"
echo "======================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en la carpeta mobile
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Debes ejecutar este script desde la carpeta mobile${NC}"
    exit 1
fi

# Verificar que EAS CLI está instalado
if ! command -v eas &> /dev/null; then
    echo -e "${YELLOW}⚠️  EAS CLI no está instalado. Instalando...${NC}"
    npm install -g eas-cli
fi

echo -e "${GREEN}✅ EAS CLI encontrado${NC}"
echo ""

# Verificar login
echo "🔐 Verificando autenticación..."
if ! eas whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  No estás autenticado. Por favor inicia sesión:${NC}"
    eas login
else
    echo -e "${GREEN}✅ Ya estás autenticado como: $(eas whoami)${NC}"
fi
echo ""

# Preguntar qué tipo de build
echo "📦 ¿Qué tipo de build quieres generar?"
echo "1) Preview (APK para testing rápido)"
echo "2) Production (APK final para jueces)"
read -p "Selecciona (1 o 2): " build_type

if [ "$build_type" = "1" ]; then
    profile="preview"
    echo -e "${YELLOW}📦 Generando build de PREVIEW...${NC}"
elif [ "$build_type" = "2" ]; then
    profile="production"
    echo -e "${GREEN}📦 Generando build de PRODUCCIÓN...${NC}"
else
    echo -e "${RED}❌ Opción inválida${NC}"
    exit 1
fi
echo ""

# Mostrar información del build
echo "ℹ️  Información del build:"
echo "   - Plataforma: Android"
echo "   - Perfil: $profile"
echo "   - Versión: $(grep '"version"' app.json | head -1 | cut -d'"' -f4)"
echo ""

# Confirmar
read -p "¿Continuar con el build? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "❌ Build cancelado"
    exit 0
fi
echo ""

# Iniciar build
echo "🔨 Iniciando build..."
echo "⏱️  Esto tomará aproximadamente 15-20 minutos"
echo ""

eas build --platform android --profile $profile

# Verificar si el build fue exitoso
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ ¡Build completado exitosamente!${NC}"
    echo ""
    echo "📥 Próximos pasos:"
    echo "1. Descarga el APK del link de arriba"
    echo "2. Pruébalo en tu celular"
    echo "3. Súbelo a Google Drive"
    echo "4. Comparte el link con los jueces"
    echo ""
    echo "📱 Instrucciones para jueces en: ../GUIA_DEPLOYMENT_HACKATHON.md"
    echo ""
    
    # Preguntar si quiere descargar el APK ahora
    read -p "¿Descargar el APK ahora? (y/n): " download
    if [ "$download" = "y" ]; then
        echo "📥 Descargando APK..."
        eas build:download --platform android --latest
        echo -e "${GREEN}✅ APK descargado!${NC}"
    fi
else
    echo ""
    echo -e "${RED}❌ El build falló${NC}"
    echo "📋 Revisa los logs arriba para ver el error"
    echo "💡 Tip: Ejecuta 'eas build:list' para ver todos tus builds"
    exit 1
fi
