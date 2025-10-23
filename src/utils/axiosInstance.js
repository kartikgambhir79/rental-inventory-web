
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor: attach token if present
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('auth');
    if (raw) {
      const auth = JSON.parse(raw);
      if (auth && auth.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor: handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      localStorage.removeItem('auth');
      // optional: redirect to login page (handled by frontend)
    }
    return Promise.reject(error);
  }
);

export default api;
