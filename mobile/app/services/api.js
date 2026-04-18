const API_BASE_URL = 'http://172.20.10.2:8000';

const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/api/v1${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Algo salió mal');
  }

  return data;
};

export const api = {
  // Autenticación
  login: async (email, password) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Perfil
  getMe: async (token) => {
    return request('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Profesionales
  approveMealLog: async (token, mealId, feedback) => {
    return request(`/professionals/approve-meal/${mealId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ feedback }),
    });
  },

  rejectMealLog: async (token, mealId, reason) =>
    request(`/professionals/reject-meal/${mealId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ reason, estado: 'pendiente_revision' }),
    }),

  // Coach
  getCoachClients: async (token) => {
    return request('/coach/my-clients', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getCoachStats: async (token) => {
    return request('/coach/dashboard-stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Nutritionist
  getNutriPatients: async (token) => {
    return request('/nutritionist/my-patients', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getNutriStats: async (token) => {
    return request('/nutritionist/dashboard-stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  handleRequest: async (token, role, requestId, action) => {
    return request(`/${role}/handle-request/${requestId}?action=${action}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getPendingRequests: async (token, role) => {
    return request(`/${role}/pending-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Marketplace
  getProfessionals: async (token, role = '') => {
    return request(`/marketplace/professionals${role ? `?role=${role}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  requestAdvice: async (token, professionalId, message = '') => {
    return request(`/marketplace/request-advice?professional_id=${professionalId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ message })
    });
  },

  getMyRequests: async (token) => {
    return request('/marketplace/my-requests', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // AI / FOOD ANALYSIS
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

  getMealLogs: async (token, limit = 20) => {
    return request(`/ai/my-meals?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  analyzeFoodFromUrl: async (token, base64Image) => {
    return api.analyzeFood(token, base64Image);
  },

  logManualMeal: async (token, mealData) => {
    return request('/ai/log-manual', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(mealData)
    });
  },

  generatePlan: async (token, planData) => {
    return request('/ai/generate-plan', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(planData)
    });
  },

  getAIAlerts: async (token) => {
    return request('/ai/analyze-patterns', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  generateRecipes: async (token, ingredients) => {
    return request('/ai/generate-recipes', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ingredients })
    });
  },

  // Plans
  getMyPlans: async (token, tipo = '') => {
    return request(`/plans/my-plans${tipo ? `?tipo=${tipo}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  createPlan: async (token, planData) => {
    return request('/plans/create', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(planData)
    });
  },

  getClientPlans: async (token, clientId, tipo = '') => {
    return request(`/plans/client-plans/${clientId}${tipo ? `?tipo=${tipo}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updateProfile: async (token, profileData) => {
    return request('/auth/update-profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(profileData)
    });
  },

  generateRoutine: async (token, goal) => {
    return request('/ai/generate-routine', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ goal })
    });
  },
};

export default api;
