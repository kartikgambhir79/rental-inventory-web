import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import AppToaster from './components/common/Toaster';
import Nav from './components/common/Nav';
import './index.css';

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50">
          <AppToaster />
          <Nav />
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
