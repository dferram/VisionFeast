# 🏆 Script de Build Automático para Hackathon - Windows
# VisionFeast - Generación de APK para Jueces

Write-Host "🚀 VisionFeast - Build para Hackathon" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la carpeta mobile
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Debes ejecutar este script desde la carpeta mobile" -ForegroundColor Red
    exit 1
}

# Verificar que EAS CLI está instalado
$easInstalled = Get-Command eas -ErrorAction SilentlyContinue
if (-not $easInstalled) {
    Write-Host "⚠️  EAS CLI no está instalado. Instalando..." -ForegroundColor Yellow
    npm install -g eas-cli
}

Write-Host "✅ EAS CLI encontrado" -ForegroundColor Green
Write-Host ""

# Verificar login
Write-Host "🔐 Verificando autenticación..."
$whoami = eas whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No estás autenticado. Por favor inicia sesión:" -ForegroundColor Yellow
    eas login
} else {
    Write-Host "✅ Ya estás autenticado como: $whoami" -ForegroundColor Green
}
Write-Host ""

# Preguntar qué tipo de build
Write-Host "📦 ¿Qué tipo de build quieres generar?"
Write-Host "1) Preview (APK para testing rápido)"
Write-Host "2) Production (APK final para jueces)"
$buildType = Read-Host "Selecciona (1 o 2)"

if ($buildType -eq "1") {
    $profile = "preview"
    Write-Host "📦 Generando build de PREVIEW..." -ForegroundColor Yellow
} elseif ($buildType -eq "2") {
    $profile = "production"
    Write-Host "📦 Generando build de PRODUCCIÓN..." -ForegroundColor Green
} else {
    Write-Host "❌ Opción inválida" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Obtener versión del app.json
$appJson = Get-Content "app.json" | ConvertFrom-Json
$version = $appJson.expo.version

# Mostrar información del build
Write-Host "ℹ️  Información del build:"
Write-Host "   - Plataforma: Android"
Write-Host "   - Perfil: $profile"
Write-Host "   - Versión: $version"
Write-Host ""

# Confirmar
$confirm = Read-Host "¿Continuar con el build? (y/n)"
if ($confirm -ne "y") {
    Write-Host "❌ Build cancelado"
    exit 0
}
Write-Host ""

# Iniciar build
Write-Host "🔨 Iniciando build..." -ForegroundColor Cyan
Write-Host "⏱️  Esto tomará aproximadamente 15-20 minutos" -ForegroundColor Yellow
Write-Host ""

eas build --platform android --profile $profile

# Verificar si el build fue exitoso
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Build completado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📥 Próximos pasos:"
    Write-Host "1. Descarga el APK del link de arriba"
    Write-Host "2. Pruébalo en tu celular"
    Write-Host "3. Súbelo a Google Drive"
    Write-Host "4. Comparte el link con los jueces"
    Write-Host ""
    Write-Host "📱 Instrucciones para jueces en: ..\GUIA_DEPLOYMENT_HACKATHON.md"
    Write-Host ""
    
    # Preguntar si quiere descargar el APK ahora
    $download = Read-Host "¿Descargar el APK ahora? (y/n)"
    if ($download -eq "y") {
        Write-Host "📥 Descargando APK..." -ForegroundColor Cyan
        eas build:download --platform android --latest
        Write-Host "✅ APK descargado!" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "❌ El build falló" -ForegroundColor Red
    Write-Host "📋 Revisa los logs arriba para ver el error"
    Write-Host "💡 Tip: Ejecuta 'eas build:list' para ver todos tus builds"
    exit 1
}
