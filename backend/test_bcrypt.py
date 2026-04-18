"""Test bcrypt installation."""
try:
    from passlib.context import CryptContext
    
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    # Test hash
    password = "test123"
    hashed = pwd_context.hash(password)
    print(f"✅ Hash generado: {hashed[:50]}...")
    
    # Test verify
    is_valid = pwd_context.verify(password, hashed)
    print(f"✅ Verificación: {is_valid}")
    
    print("\n✅ bcrypt está funcionando correctamente!")
    
except Exception as e:
    print(f"❌ Error con bcrypt: {e}")
    print("\nInstala bcrypt con: pip install bcrypt==4.1.2")
