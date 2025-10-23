
import api from '../utils/axiosInstance';

// Auth
export const register = (data) => api.post('/auth/register', data).then(r=>r.data);
export const login = (data) => api.post('/auth/login', data).then(r=>r.data);

// Items
export const getItems = () => api.get('/items').then(r=>r.data);
export const getItem = (id) => api.get(`/items/${id}`).then(r=>r.data);
export const createItem = (data) => api.post('/items', data).then(r=>r.data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data).then(r=>r.data);
export const deleteItem = (id) => api.delete(`/items/${id}`).then(r=>r.data);

// Customers
export const getCustomers = () => api.get('/customers').then(r=>r.data);
export const getCustomer = (id) => api.get(`/customers/${id}`).then(r=>r.data);
export const createCustomer = (data) => api.post('/customers', data).then(r=>r.data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data).then(r=>r.data);

// Rentals
export const getRentals = () => api.get('/rentals').then(r=>r.data);
export const createRental = (data) => api.post('/rentals', data).then(r=>r.data);
export const returnRental = (id) => api.post(`/rentals/${id}/return`).then(r=>r.data);

// Settings
export const getSettings = () => api.get('/settings').then(r=>r.data);
export const saveSettings = (data) => api.post('/settings', data).then(r=>r.data);

// Helpers for auth state
export const saveAuth = ({ token, user }) => {
  const data = { token, user, role: user && user.role ? user.role : 'customer' };
  localStorage.setItem('auth', JSON.stringify(data));
};
export const clearAuth = () => localStorage.removeItem('auth');
export const getAuth = () => {
  try {
    return JSON.parse(localStorage.getItem('auth'));
  } catch(e){ return null; }
};

export default {
  register, login,
  getItems, getItem, createItem, updateItem, deleteItem,
  getCustomers, getCustomer, createCustomer, updateCustomer,
  getRentals, createRental, returnRental,
  getSettings, saveSettings,
  saveAuth, clearAuth, getAuth
};
