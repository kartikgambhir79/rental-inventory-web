import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Nav(){
  const { user, logout } = useAuth();
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-slate-700">BoutiqueRent</Link>
        <nav className="hidden md:flex gap-3">
          <Link to="/inventory" className="text-slate-600 hover:text-slate-900">Inventory</Link>
          <Link to="/customers" className="text-slate-600 hover:text-slate-900">Customers</Link>
          <Link to="/rentals" className="text-slate-600 hover:text-slate-900">Rentals</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-slate-600">{user.username} <span className="text-sm text-slate-400">({user.role})</span></span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-indigo-600 text-white px-3 py-1 rounded">Login</Link>
        )}
      </div>
    </div>
  );
}
