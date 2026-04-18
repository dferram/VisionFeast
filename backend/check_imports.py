"""
Script para verificar si todos los módulos del backend importan correctamente.
Corre con: py check_imports.py
"""
import sys

errors = []

tests = [
    ("app.core.config", "settings"),
    ("app.models.user_model", "User"),
    ("app.models.professional_model", "ProfessionalProfile"),
    ("app.models.meal_log_model", "MealLog"),
    ("app.models.recipe_model", "Recipe"),
    ("app.models.plan_model", "Plan"),
    ("app.schemas.auth_schema", "RegisterRequest"),
    ("app.schemas.login_schemas", "LoginRequest"),
    ("app.schemas.register_schemas", "ClientRegisterRequest"),
    ("app.api.v1.auth", "router"),
    ("app.api.v1.register", "router"),
    ("app.api.v1.test", "router"),
    ("app.api.v1.ai", "router"),
]

print("\n════════════════════════════════════════")
print("  VisionFeast — Verificación de imports")
print("════════════════════════════════════════\n")

for module, attr in tests:
    try:
        mod = __import__(module, fromlist=[attr])
        getattr(mod, attr)
        print(f"✅ {module}")
    except Exception as e:
        print(f"❌ {module}  →  {e}")
        errors.append((module, str(e)))

print()
if errors:
    print(f"⚠️  {len(errors)} módulo(s) con error:")
    for m, e in errors:
        print(f"   • {m}: {e}")
else:
    print("✅ Todos los imports están bien — el problema es otro.")

print()
