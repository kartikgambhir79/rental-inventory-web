import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BACKEND_URL } from '../utils/constant';

const baseURL = import.meta.env.VITE_API_BASE || `${BACKEND_URL}/api`;


const api = axios.create({ baseURL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Network error';
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    toast.error(message);
    return Promise.reject(err);
  }
);

export default api;
