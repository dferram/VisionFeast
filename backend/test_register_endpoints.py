"""Script de testing para endpoints de registro."""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Probar endpoint de health."""
    print("\n🔍 Probando /health...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_register_client():
    """Probar registro de cliente."""
    print("\n🔍 Probando /api/v1/register/client...")
    
    data = {
        "email": "test_client@example.com",
        "full_name": "Test Client",
        "password": "password123",
        "dietary_preferences": ["Vegetariano"],
        "allergies": ["Nueces"],
        "health_goals": ["Perder peso"]
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/register/client",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 201
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_register_nutritionist():
    """Probar registro de nutriólogo."""
    print("\n🔍 Probando /api/v1/register/nutritionist...")
    
    data = {
        "email": "test_nutri@example.com",
        "full_name": "Dr. Test Nutriólogo",
        "password": "password123",
        "license_number": "NUT-12345",
        "specialization": "Nutrición deportiva",
        "years_experience": 5,
        "certifications": ["Certificación A", "Certificación B"],
        "bio": "Nutriólogo especializado en deportes",
        "phone": "+52 123 456 7890"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/register/nutritionist",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 201
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_register_coach():
    """Probar registro de entrenador."""
    print("\n🔍 Probando /api/v1/register/coach...")
    
    data = {
        "email": "test_coach@example.com",
        "full_name": "Coach Test",
        "password": "password123",
        "license_number": "COACH-12345",
        "specialization": "Entrenamiento de fuerza",
        "years_experience": 3,
        "certifications": ["NSCA-CPT"],
        "bio": "Entrenador especializado en fuerza",
        "phone": "+52 987 654 3210"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/register/coach",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 201
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_login():
    """Probar login."""
    print("\n🔍 Probando /api/v1/auth/login...")
    
    data = {
        "email": "test_nutri@example.com",
        "password": "password123"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/v1/auth/login",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🧪 TESTING DE ENDPOINTS DE REGISTRO")
    print("=" * 60)
    
    results = {
        "Health Check": test_health(),
        "Register Client": test_register_client(),
        "Register Nutritionist": test_register_nutritionist(),
        "Register Coach": test_register_coach(),
        "Login": test_login(),
    }
    
    print("\n" + "=" * 60)
    print("📊 RESULTADOS")
    print("=" * 60)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name}: {status}")
    
    total = len(results)
    passed = sum(results.values())
    print(f"\nTotal: {passed}/{total} tests pasaron")
