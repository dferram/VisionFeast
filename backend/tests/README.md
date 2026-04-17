# Tests - VisionFeast API

Suite completa de tests para todos los endpoints de la API VisionFeast.

## 📁 Estructura

```
tests/
├── __init__.py                 # Package marker
├── conftest.py                 # Fixtures y configuración de pytest
├── test_main.py               # Tests para endpoints principales
├── test_endpoints_test.py     # Tests para endpoints de prueba
├── test_auth_endpoints.py     # Tests para autenticación
└── test_ai_endpoints.py       # Tests para endpoints de IA
```

## 🧪 Tests Implementados

### Endpoints Principales (3 tests)
- ✅ `test_root_endpoint` - Verifica endpoint raíz
- ✅ `test_health_check` - Verifica health check
- ✅ `test_openapi_docs` - Verifica documentación OpenAPI

### Endpoints de Prueba (4 tests)
- ✅ `test_ping_endpoint` - Verifica ping
- ✅ `test_ai_config_endpoint` - Verifica configuración de IA
- ✅ `test_mock_analysis_endpoint` - Verifica análisis mock
- ✅ `test_database_status_endpoint` - Verifica estado de BD

### Endpoints de Autenticación (4 tests)
- ✅ `test_google_auth_missing_token` - Auth sin token
- ✅ `test_google_auth_invalid_token` - Auth con token inválido
- ✅ `test_get_me_without_auth` - Obtener usuario sin auth
- ✅ `test_update_me_without_auth` - Actualizar usuario sin auth

### Endpoints de IA (9 tests)
- ✅ `test_analyze_food_without_auth` - Análisis de comida sin auth
- ✅ `test_analyze_food_missing_data` - Análisis sin datos
- ✅ `test_create_recipe_without_auth` - Crear receta sin auth
- ✅ `test_create_recipe_missing_ingredients` - Receta sin ingredientes
- ✅ `test_generate_plan_without_auth` - Generar plan sin auth
- ✅ `test_generate_plan_invalid_type` - Plan con tipo inválido
- ✅ `test_analyze_patterns_without_auth` - Análisis de patrones sin auth
- ✅ `test_my_meals_without_auth` - Obtener comidas sin auth
- ✅ `test_my_meals_with_limit` - Obtener comidas con límite

## 🚀 Ejecutar Tests

### Todos los tests
```bash
pytest tests/ -v
```

### Tests específicos
```bash
# Solo tests de IA
pytest tests/test_ai_endpoints.py -v

# Solo tests de autenticación
pytest tests/test_auth_endpoints.py -v

# Solo tests de endpoints de prueba
pytest tests/test_endpoints_test.py -v
```

### Con cobertura
```bash
pytest tests/ --cov=app --cov-report=html
```

### Tests en modo watch
```bash
pytest-watch tests/
```

## 📊 Resultados

```
20 passed, 7 warnings in 0.72s
```

**✅ Todos los tests pasan exitosamente**

## 🔧 Configuración

La configuración de pytest está en `pytest.ini`:
- Modo asyncio automático
- Verbose output
- Markers estrictos
- Traceback corto

## 📝 Fixtures Disponibles

### `client`
Cliente HTTP asíncrono para hacer requests a la API.

```python
async def test_example(client: AsyncClient):
    response = await client.get("/")
    assert response.status_code == 200
```

### `mock_google_token`
Token de Google OAuth simulado para tests.

```python
def test_example(mock_google_token: str):
    assert mock_google_token == "mock_google_token_12345"
```

### `sample_food_image_base64`
Imagen base64 de muestra (1x1 pixel PNG) para tests de análisis de comida.

```python
async def test_example(sample_food_image_base64: str):
    response = await client.post("/api/v1/ai/analyze-food", json={
        "image_base64": sample_food_image_base64,
        "momento": "comida"
    })
```

## 🎯 Cobertura de Tests

Los tests cubren:
- ✅ Endpoints públicos (root, health, docs)
- ✅ Endpoints de prueba (ping, config, mock)
- ✅ Autenticación y autorización
- ✅ Validación de datos de entrada
- ✅ Respuestas de error apropiadas
- ✅ Endpoints de IA (análisis, recetas, planes)

## 📚 Dependencias

```
pytest==9.0.3
pytest-asyncio==1.3.0
httpx==0.28.1
```

## 💡 Notas

- Los tests usan un cliente HTTP asíncrono (httpx)
- No requieren base de datos real para la mayoría de tests
- Los tests de autenticación verifican que los endpoints estén protegidos
- Los warnings de deprecación son normales y no afectan la funcionalidad
