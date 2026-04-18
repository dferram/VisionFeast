// Configuración de la URL base del backend
const USE_PRODUCTION = false;

const BACKEND_URLS = {
  production: 'https://visualfeast-production.up.railway.app',
  local: 'http://172.20.10.2:8000'
};

export const API_BASE_URL = USE_PRODUCTION ? BACKEND_URLS.production : BACKEND_URLS.local;

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
// Exportamos el objeto 'api' directamente
export const api = {
  ping: () => request('/api/v1/test/ping'),

  login: (email, password) =>
    request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data) =>
    request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: (token) => authRequest('/api/v1/auth/me', token),

  getMealLogs: (token) => authRequest('/api/v1/ai/my-meals', token),

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

  // --- AI / FOOD ANALYSIS ---
  
  // Analizar imagen de comida (base64)
  analyzeFood: async (token, base64Image, momento = 'comida') => {
    return request('/ai/analyze-food', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        image_base64: base64Image,
        momento: momento
      })
    });
  },

  // Obtener historial de comidas
  getMealLogs: async (token, limit = 20) => {
    return request(`/ai/my-meals?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Mantener por compatibilidad con MealsScreen.jsx
  analyzeFoodFromUrl: async (token, base64Image) => {
    return api.analyzeFood(token, base64Image);
  },
};

// También lo exportamos por defecto por si alguna pantalla lo pide así
export default api;
