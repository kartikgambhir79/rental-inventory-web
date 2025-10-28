import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Modal from '../components/common/Modal';
import CustomerForm from '../components/page-specific/customers/CustomerForm';
import Spinner from '../components/common/Spinner';

export default function Customers(){
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const load = async ()=>{ setLoading(true); try{ const res = await api.get('/customers'); setCustomers(res.data); }catch(err){} finally{ setLoading(false); } };
  useEffect(()=>{ load(); },[]);

  const add = async (data)=>{ await api.post('/customers', data); setOpen(false); load(); };

  const filtered = customers.filter(c=> {
    const q = query.toLowerCase();
    return !q || c.name?.toLowerCase().includes(q) || c.phone?.toLowerCase().includes(q);
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customers</h2>
        <div>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search customers..." className="border p-2 rounded" />
          <button onClick={()=>setOpen(true)} className="ml-2 bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
        </div>
      </div>

      {loading ? <div className="p-8"><Spinner /></div> : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="table-head">
              <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Email</th><th className="p-3">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(c=>(
                <tr key={c._id} className="border-t hover:bg-slate-50">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3"><button onClick={async ()=>{ if(confirm('Delete?')){ await api.delete(`/customers/${c._id}`); load(); } }} className="text-red-600">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={()=>setOpen(false)} title="Add Customer">
        <CustomerForm onSubmit={add} />
      </Modal>
    </div>
  );
}
