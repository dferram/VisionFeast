# Script para iniciar VisionFeast con Docker
# Uso: .\docker-start.ps1

Write-Host "Starting VisionFeast with Docker..." -ForegroundColor Cyan
Write-Host ""

# Verificar que Docker esté corriendo
$dockerRunning = docker info 2>&1 | Select-String "Server Version"
if (-not $dockerRunning) {
    Write-Host "Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar que existe el archivo .env
if (-not (Test-Path ".env")) {
    Write-Host ".env file not found" -ForegroundColor Yellow
    Write-Host "Copying .env.example to .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ".env file created. Please configure your API keys before continuing." -ForegroundColor Green
    Write-Host ""
    Write-Host "Edit the .env file and configure:" -ForegroundColor Cyan
    Write-Host "  - GEMINI_API_KEY" -ForegroundColor White
    Write-Host "  - ELEVENLABS_API_KEY" -ForegroundColor White
    Write-Host "  - GOOGLE_CLIENT_ID" -ForegroundColor White
    Write-Host "  - GOOGLE_CLIENT_SECRET" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "Do you want to continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 0
    }
}

Write-Host "Building and starting containers..." -ForegroundColor Cyan
docker-compose up --build

Write-Host ""
Write-Host "VisionFeast running" -ForegroundColor Green
Write-Host "Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Documentación: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "MongoDB: mongodb://localhost:27017" -ForegroundColor Cyan
