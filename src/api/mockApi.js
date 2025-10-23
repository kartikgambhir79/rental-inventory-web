
// shim layer to adapt app's expected functions to real backend API.
// Exports: seedDemoData, getAuthUser, login, logout, saveAuth
import * as api from './api';

// seedDemoData kept as noop (backend should have real data)
export const seedDemoData = async () => { return; }

export const getAuthUser = () => {
  try {
    const raw = localStorage.getItem('auth');
    if (!raw) return null;
    const a = JSON.parse(raw);
    return a.user || null;
  } catch (e) { return null; }
}

export const saveAuth = (token, user) => {
  const obj = { token, user };
  localStorage.setItem('auth', JSON.stringify(obj));
}

export const login = async ({ email, password }) => {
  const res = await api.login({ email, password });
  if(res && res.token && res.user){
    saveAuth(res.token, res.user);
    return res.user;
  }
  throw new Error('Login failed');
}

export const register = async ({ name, email, password, role, adminSecret }) => {
  const res = await api.register({ name, email, password, role, adminSecret });
  if(res && res.token && res.user){
    saveAuth(res.token, res.user);
    return res.user;
  }
  throw new Error('Register failed');
}

export const logout = () => {
  localStorage.removeItem('auth');
}
export default { seedDemoData, getAuthUser, login, register, logout, saveAuth };
