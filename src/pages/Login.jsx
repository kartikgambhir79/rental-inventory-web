import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-white">
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="max-w-md w-full bg-white rounded p-8 shadow">
        <h2 className="text-2xl font-bold mb-4 text-slate-700">Sign in to BoutiqueRent</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" className="mt-1 w-full border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Your password" className="mt-1 w-full border p-2 rounded" />
          </div>
          <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">{loading ? 'Signing...' : 'Sign in'}</button>
        </form>
      </motion.div>
    </div>
  );
}
