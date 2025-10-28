import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem('user')) || null; }catch{ return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token && !user){
      (async ()=>{
        try{ setLoading(true); const res = await api.get('/auth/me'); setUser(res.data); localStorage.setItem('user', JSON.stringify(res.data)); }
        catch(e){ localStorage.removeItem('token'); localStorage.removeItem('user'); }
        finally{ setLoading(false); }
      })();
    }
  },[]);

  const login = async ({ email, password })=>{
    setLoading(true);
    try{
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Logged in');
      return user;
    }finally{ setLoading(false); }
  };

  const logout = ()=>{
    localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); window.location.href = '/login';
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
