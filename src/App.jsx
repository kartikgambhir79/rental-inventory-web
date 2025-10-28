import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import AppToaster from './components/common/Toaster';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppToaster />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
