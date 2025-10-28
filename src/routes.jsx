import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Rentals from './pages/Rentals';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';

function Protected({ children }){
  const { user, loading } = useAuth();
  if(loading) return <div className='p-6'>Loading...</div>;
  if(!user) return <Navigate to='/login' replace />;
  return children;
}

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><AdminLayout><Dashboard /></AdminLayout></Protected>} />
      <Route path="/inventory" element={<Protected><AdminLayout><Inventory /></AdminLayout></Protected>} />
      <Route path="/customers" element={<Protected><AdminLayout><Customers /></AdminLayout></Protected>} />
      <Route path="/rentals" element={<Protected><AdminLayout><Rentals /></AdminLayout></Protected>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
