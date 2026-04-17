# Backend - VisionFeast
Esta carpeta contiene la lógica del servidor construida con FastAPI siguiendo una arquitectura N-Tier (Capas).

## Estructura
- `app/api`: Definición de rutas y endpoints.
- `app/services`: Lógica de negocio y comunicación con servicios externos (IA).
- `app/models`: Definición de esquemas de base de datos (MongoDB).
- `app/schemas`: Validaciones de entrada y salida (Pydantic).
- `app/repositories`: Capa de persistencia y consultas a la base de datos.
