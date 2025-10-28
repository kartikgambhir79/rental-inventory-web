import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import RentForm from '../components/page-specific/rentals/RentForm';
import Spinner from '../components/common/Spinner';

export default function Rentals(){
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const load = async ()=>{ setLoading(true); try{ const res = await api.get('/rentals'); setRentals(res.data); }catch(err){} finally{ setLoading(false); } };
  const loadCustomers = async ()=>{ try{ const res = await api.get('/customers'); setCustomers(res.data); }catch{} };

  useEffect(()=>{ load(); loadCustomers(); },[]);

  const onRent = async (data)=>{
    await api.post('/rentals/rent', { customerId: data.customerId, itemCode: data.code, rentDays: data.rentDays });
    load();
  };

  const doReturn = async (id)=>{ if(!confirm('Confirm return?')) return; await api.post('/rentals/return', { rentalId: id }); load(); };

  const filtered = rentals.filter(r=>{
    const q = query.toLowerCase();
    return !q || r.itemId?.name?.toLowerCase().includes(q) || r.customerId?.name?.toLowerCase().includes(q) || r.customerId?.phone?.includes(q);
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Rentals</h2>
        <div>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search rentals..." className="border p-2 rounded" />
        </div>
      </div>

      <div className="mb-4">
        <RentForm customers={customers} onRent={onRent} />
      </div>

      {loading ? <div className="p-8"><Spinner /></div> : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="table-head">
              <tr><th className="p-3 text-left">Item</th><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Dates</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r._id} className="border-t hover:bg-slate-50">
                  <td className="p-3">{r.itemId?.name}</td>
                  <td className="p-3">{r.customerId?.name} <div className="text-xs text-slate-400">{r.customerId?.phone}</div></td>
                  <td className="p-3">{new Date(r.rentDate).toLocaleDateString()} - {r.returnDate ? new Date(r.returnDate).toLocaleDateString() : '-'}</td>
                  <td className="p-3">{r.status}</td>
                  <td className="p-3">{r.status==='Rented' && <button onClick={()=>doReturn(r._id)} className="bg-indigo-600 text-white px-3 py-1 rounded">Return</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
