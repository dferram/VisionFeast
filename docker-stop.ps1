# Script para detener VisionFeast Docker
# Uso: .\docker-stop.ps1

Write-Host "🛑 Deteniendo VisionFeast..." -ForegroundColor Yellow
docker-compose down

Write-Host ""
Write-Host "✅ Contenedores detenidos" -ForegroundColor Green
Write-Host ""
Write-Host "Para eliminar también los volúmenes (datos de MongoDB):" -ForegroundColor Cyan
Write-Host "  docker-compose down -v" -ForegroundColor White
