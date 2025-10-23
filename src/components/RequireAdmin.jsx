
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../api/api';

export default function RequireAdmin({ children }) {
  const auth = getAuth();
  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }
  const role = auth.role || (auth.user && auth.user.role) || 'customer';
  if (role !== 'admin') {
    return <Navigate to="/scan" replace />;
  }
  return children;
}
