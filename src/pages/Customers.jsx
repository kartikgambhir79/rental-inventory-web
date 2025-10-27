import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CustomerForm from '../components/page-specific/customers/CustomerForm';

export default function Customers(){
  const [customers, setCustomers] = useState([]);
  const load = async ()=>{ try{ const res = await api.get('/customers'); setCustomers(res.data); }catch{} };
  useEffect(()=>{ load(); },[]);

  const add = async (data)=>{ await api.post('/customers', data); load(); };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Customers</h2>
      <CustomerForm onSubmit={add} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {customers.map(c=> (
          <div key={c._id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-slate-500">{c.phone}</div>
            <div className="text-xs text-slate-400">{c.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
