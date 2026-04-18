# Script para iniciar VisionFeast con Docker
# Uso: .\docker-start.ps1

Write-Host "🍽️  Iniciando VisionFeast con Docker..." -ForegroundColor Cyan
Write-Host ""

# Verificar que Docker esté corriendo
$dockerRunning = docker info 2>&1 | Select-String "Server Version"
if (-not $dockerRunning) {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar que existe el archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  No se encontró el archivo .env" -ForegroundColor Yellow
    Write-Host "Copiando .env.example a .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Archivo .env creado. Por favor configura tus API keys antes de continuar." -ForegroundColor Green
    Write-Host ""
    Write-Host "Edita el archivo .env y configura:" -ForegroundColor Cyan
    Write-Host "  - GEMINI_API_KEY" -ForegroundColor White
    Write-Host "  - ELEVENLABS_API_KEY" -ForegroundColor White
    Write-Host "  - GOOGLE_CLIENT_ID" -ForegroundColor White
    Write-Host "  - GOOGLE_CLIENT_SECRET" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "¿Deseas continuar de todas formas? (s/n)"
    if ($continue -ne "s") {
        exit 0
    }
}

Write-Host "🐳 Construyendo e iniciando contenedores..." -ForegroundColor Cyan
docker-compose up --build

Write-Host ""
Write-Host "✅ VisionFeast está corriendo!" -ForegroundColor Green
Write-Host "📍 Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "📍 Documentación: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "📍 MongoDB: mongodb://localhost:27017" -ForegroundColor Cyan
