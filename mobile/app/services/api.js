// Configuración de la URL base del backend
// Cambia USE_PRODUCTION a false para usar backend local
const USE_PRODUCTION = true;

const BACKEND_URLS = {
  production: 'https://visualfeast-production.up.railway.app',
  local: 'http://10.40.132.153:8000'
};

const API_BASE_URL = USE_PRODUCTION ? BACKEND_URLS.production : BACKEND_URLS.local;

// ── Helpers internos ─────────────────────────────────────────────────────────
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
  return data;
}

async function authRequest(path, token, options = {}) {
  return request(path, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
  });
}

// ── Cliente de API ────────────────────────────────────────────────────────────
export const api = {

  // ── Conectividad ──────────────────────────────────────────────────────────
  ping: () => request('/api/v1/test/ping'),

  // ── Autenticación ─────────────────────────────────────────────────────────
  loginWithGoogle: (googleToken) =>
    request('/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token: googleToken }),
    }),

  getMe: (token) => authRequest('/api/v1/auth/me', token),

  updateProfile: (token, data) =>
    authRequest('/api/v1/auth/me', token, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // ── Registro (endpoints correctos del backend) ────────────────────────────
  registerClient: (data) =>
    request('/api/v1/register/client', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        dietary_preferences: data.dietary_preferences || [],
        allergies: data.allergies || [],
        health_goals: data.health_goals || [],
      }),
    }),

  registerNutritionist: (data) =>
    request('/api/v1/register/nutritionist', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        license_number: data.license_number,
        specialization: data.specialization,
        years_experience: data.years_experience,
        certifications: data.certifications || [],
        bio: data.bio || '',
        phone: data.phone || '',
      }),
    }),

  registerCoach: (data) =>
    request('/api/v1/register/coach', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        license_number: data.license_number,
        specialization: data.specialization,
        years_experience: data.years_experience,
        certifications: data.certifications || [],
        bio: data.bio || '',
        phone: data.phone || '',
      }),
    }),

  // ── Login unificado ────────────────────────────────────────────────────────
  login: (email, password) =>
    request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // ── Meal Logs (CONTEXT.md: colección meal_logs) ───────────────────────────
  getMealLogs: (token) =>
    authRequest('/api/v1/ai/my-meals', token),

  analyzeFoodFromUrl: (token, imageUrl, momento = 'comida') =>
    authRequest('/api/v1/ai/analyze-food', token, {
      method: 'POST',
      body: JSON.stringify({ image_url: imageUrl, momento }),
    }),

  // ── Acciones del Nutriólogo (CONTEXT.md: plans.estado) ───────────────────
  approveMealLog: (token, mealId, feedback) =>
    authRequest(`/api/v1/ai/meals/${mealId}/approve`, token, {
      method: 'POST',
      body: JSON.stringify({ feedback, estado: 'aprobado' }),
    }),

  flagMealLog: (token, mealId, reason) =>
    authRequest(`/api/v1/ai/meals/${mealId}/flag`, token, {
      method: 'POST',
      body: JSON.stringify({ reason, estado: 'pendiente_revision' }),
    }),
};

export default API_BASE_URL;
