import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout({ children }){
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-6">
        <div className="text-2xl font-bold text-indigo-600 mb-6">BoutiqueRent</div>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="px-3 py-2 rounded hover:bg-indigo-50">Dashboard</Link>
          <Link to="/inventory" className="px-3 py-2 rounded hover:bg-indigo-50">Inventory</Link>
          <Link to="/customers" className="px-3 py-2 rounded hover:bg-indigo-50">Customers</Link>
          <Link to="/rentals" className="px-3 py-2 rounded hover:bg-indigo-50">Rentals</Link>
        </nav>
        <div className="mt-8">
          <div className="text-sm text-slate-500">Signed in as</div>
          <div className="font-medium">{user?.username}</div>
          <div className="mt-4"><button onClick={logout} className="text-sm text-red-600">Logout</button></div>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-slate-50">
        {children}
      </main>
    </div>
  );
}
