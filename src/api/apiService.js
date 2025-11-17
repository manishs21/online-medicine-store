import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Medicines
  getMedicines: () => api.get('/medicines'),
  getMedicineById: (id) => api.get(`/medicines/${id}`),
  createMedicine: (data) => api.post('/medicines', data),
  updateMedicine: (id, data) => api.put(`/medicines/${id}`, data),
  deleteMedicine: (id) => api.delete(`/medicines/${id}`),

  // Auth
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),

  // Orders
  getOrders: () => api.get('/orders'),
  createOrder: (data) => api.post('/orders', data),
  updateOrder: (id, data) => api.put(`/orders/${id}`, data),

  // Health
  checkHealth: () => api.get('/health')
};

export default api;
