import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard(){
  const [stats, setStats] = useState({ total:0, available:0, rented:0 });
  useEffect(()=>{ (async ()=>{
    try{
      const res = await api.get('/items');
      const total = res.data.length;
      const available = res.data.filter(i=>i.available).length;
      setStats({ total, available, rented: total - available });
    }catch(err){}
  })(); },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Total Items</div>
          <div className="text-3xl font-semibold">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Available</div>
          <div className="text-3xl font-semibold text-green-600">{stats.available}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Rented</div>
          <div className="text-3xl font-semibold text-red-600">{stats.rented}</div>
        </div>
      </div>
    </div>
  );
}
