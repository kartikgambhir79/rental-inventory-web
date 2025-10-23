
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../api/api';

export default function ProtectedRoute({ children }) {
  const auth = getAuth();
  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
