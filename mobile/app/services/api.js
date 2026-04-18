// Configuración de la URL base del backend
// En emulador Android usa 10.0.2.2, en teléfono físico usa tu IP local ej: 192.168.1.X
const API_BASE_URL = 'http://10.0.2.2:8000';

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

  // ── Registro (CONTEXT.md: roles usuario / nutriologo / entrenador) ────────
  registerClient: (data) =>
    request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        role: 'usuario',
        dietary_preferences: data.dietary_preferences || [],
        allergies: data.allergies || [],
        health_goals: data.health_goals || [],
      }),
    }),

  registerNutritionist: (data) =>
    request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        role: 'nutriologo',
        license_number: data.license_number,
        specialization: data.specialization,
        years_experience: data.years_experience,
      }),
    }),

  registerCoach: (data) =>
    request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        role: 'entrenador',
        license_number: data.license_number,
        specialization: data.specialization,
        years_experience: data.years_experience,
      }),
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
