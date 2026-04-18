// Configuración de la URL base del backend
// Cambia esta IP si el backend corre en otro puerto o máquina
const API_BASE_URL = 'http://10.0.2.2:8000'; // 10.0.2.2 apunta a localhost en Android Emulator
// Si usas Expo en tu teléfono físico, cambia esto a la IP de tu computadora:
// const API_BASE_URL = 'http://192.168.x.x:8000';

export const api = {
  /**
   * Autentica con Google enviando el token al backend
   */
  loginWithGoogle: async (googleToken) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleToken }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error en autenticación');
    }
    return response.json(); // { access_token, token_type, user }
  },

  /**
   * Obtiene el perfil del usuario autenticado
   */
  getMe: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Token inválido o expirado');
    return response.json();
  },

  /**
   * Verifica que el backend esté funcionando
   */
  ping: async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/test/ping`);
    return response.json();
  },

  /**
   * Registra un nuevo cliente
   */
  registerClient: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/register/client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error en el registro');
    }
    return response.json();
  },

  /**
   * Registra un nuevo entrenador
   */
  registerCoach: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/register/coach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error en el registro');
    }
    return response.json();
  },

  /**
   * Registra un nuevo nutriólogo
   */
  registerNutritionist: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/register/nutritionist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error en el registro');
    }
    return response.json();
  },
};

export default API_BASE_URL;
