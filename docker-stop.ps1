# Script para detener VisionFeast Docker
# Uso: .\docker-stop.ps1

Write-Host "Stopping VisionFeast..." -ForegroundColor Yellow
docker-compose down

Write-Host ""
Write-Host "Containers stopped" -ForegroundColor Green
Write-Host ""
Write-Host "To remove volumes (MongoDB data):" -ForegroundColor Cyan
Write-Host "docker-compose down -v" -ForegroundColor White
