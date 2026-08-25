/**
 * test_clientes.js
 * Script de prueba para los endpoints de clientes del backend VisionFeast.
 * Corre con: node test_clientes.js
 *
 * Asegúrate de que el backend esté corriendo en http://localhost:8000
 */

const BASE = 'http://localhost:8000';
const TEST_EMAIL = `testcliente_${Date.now()}@visionfeast.com`;
const TEST_PASS  = 'Test12345';

// ── Colores para la consola ──────────────────────────────────────────────────
const OK  = (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`);
const ERR = (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`);
const INF = (msg) => console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`);

async function req(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function runTests() {
  console.log('\n════════════════════════════════════════');
  console.log('  VisionFeast — Pruebas de clientes');
  console.log('════════════════════════════════════════\n');

  let token = null;

  // ── Test 1: Ping ──────────────────────────────────────────────────────────
  INF('Test 1: Verificando que el backend responde...');

  // Probar root primero
  const root = await req('GET', '/');
  if (root.ok) {
    OK(`Root "/" responde → backend está corriendo ✅`);
  } else {
    ERR(`Backend no responde en "/"  (status ${root.status})`);
    ERR('Asegúrate de correr: py -m uvicorn main:app --host 0.0.0.0 --port 8000');
    process.exit(1);
  }

  // Probar ping
  const ping = await req('GET', '/api/v1/test/ping');
  if (ping.ok) {
    OK(`Ping exitoso → ${JSON.stringify(ping.data)}`);
  } else {
    ERR(`/api/v1/test/ping devolvió ${ping.status} — revisando rutas registradas...`);
    // Probar health como alternativa
    const health = await req('GET', '/health');
    if (health.ok) OK(`/health responde → ${JSON.stringify(health.data)}`);
    ERR('El router de test no está registrado. Continúo con los demás tests...');
  }

  // ── Test 2: Registro de cliente nuevo ─────────────────────────────────────
  INF(`\nTest 2: Registro de cliente nuevo (${TEST_EMAIL})...`);
  const reg = await req('POST', '/api/v1/auth/register', {
    email: TEST_EMAIL,
    full_name: 'Cliente Test',
    password: TEST_PASS,
    role: 'client',
    dietary_preferences: ['sin gluten'],
    allergies: ['lactosa'],
    health_goals: ['bajar de peso'],
  });
  if (reg.ok) {
    OK(`Registro exitoso → ${reg.data.message}`);
    token = reg.data.access_token;
    INF(`Token recibido: ${token?.slice(0, 30)}...`);
  } else {
    ERR(`Registro falló (${reg.status}) → ${JSON.stringify(reg.data)}`);
  }

  // ── Test 3: Login con el usuario recién creado ────────────────────────────
  INF('\nTest 3: Login con email y contraseña...');
  const login = await req('POST', '/api/v1/auth/login', {
    email: TEST_EMAIL,
    password: TEST_PASS,
  });
  if (login.ok) {
    OK(`Login exitoso → rol: ${login.data.user?.role}, nombre: ${login.data.user?.full_name}`);
    token = token || login.data.access_token;
  } else {
    ERR(`Login falló (${login.status}) → ${JSON.stringify(login.data)}`);
  }

  // ── Test 4: GET /auth/me con el token ─────────────────────────────────────
  if (token) {
    INF('\nTest 4: Obtener perfil con token...');
    const me = await req('GET', '/api/v1/auth/me', null, token);
    if (me.ok) {
      OK(`Perfil obtenido → email: ${me.data.email}, rol: ${me.data.role}`);
    } else {
      ERR(`/auth/me falló (${me.status}) → ${JSON.stringify(me.data)}`);
    }
  }

  // ── Test 5: Login con contraseña incorrecta ───────────────────────────────
  INF('\nTest 5: Login con contraseña incorrecta (debe rechazar)...');
  const badLogin = await req('POST', '/api/v1/auth/login', {
    email: TEST_EMAIL,
    password: 'contrasena_incorrecta',
  });
  if (!badLogin.ok && badLogin.status === 401) {
    OK(`Rechazo correcto (401) → ${badLogin.data.detail}`);
  } else {
    ERR(`Error: debería haber rechazado pero devolvió ${badLogin.status}`);
  }

  // ── Test 6: Registro con email duplicado ──────────────────────────────────
  INF('\nTest 6: Registro con email duplicado (debe rechazar)...');
  const dup = await req('POST', '/api/v1/auth/register', {
    email: TEST_EMAIL,
    full_name: 'Duplicado',
    password: TEST_PASS,
    role: 'client',
  });
  if (!dup.ok && dup.status === 400) {
    OK(`Rechazo correcto (400) → ${dup.data.detail}`);
  } else {
    ERR(`Error: debería haber rechazado pero devolvió ${dup.status} → ${JSON.stringify(dup.data)}`);
  }

  console.log('\n════════════════════════════════════════');
  console.log('  Pruebas completadas');
  console.log('════════════════════════════════════════\n');
}

runTests().catch((e) => {
  ERR(`Error inesperado: ${e.message}`);
  process.exit(1);
});
