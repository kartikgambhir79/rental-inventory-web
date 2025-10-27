import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login(){
  const [email, setEmail] = useState('admin@boutique.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      await login({ email, password });
      navigate('/');
    }catch(err){}
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white rounded p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={submit} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border p-2 rounded" />
          <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">{loading ? 'Signing...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
}
