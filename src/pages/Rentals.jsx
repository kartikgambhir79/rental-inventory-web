import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import RentForm from '../components/page-specific/rentals/RentForm';

export default function Rentals(){
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);

  const load = async ()=>{ try{ const res = await api.get('/rentals'); setRentals(res.data); }catch{} };
  const loadCustomers = async ()=>{ try{ const res = await api.get('/customers'); setCustomers(res.data); }catch{} };
  useEffect(()=>{ load(); loadCustomers(); },[]);

  const onRent = async (data)=>{
    try{
      await api.post('/rentals/rent', { customerId: data.customerId, itemCode: data.code, rentDays: data.rentDays });
      load();
    }catch(err){}
  };

  const doReturn = async (id)=>{ if(!confirm('Confirm return?')) return; await api.post('/rentals/return', { rentalId: id }); load(); };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Rentals</h2>
      <RentForm customers={customers} onRent={onRent} />

      <div className="mt-4 grid grid-cols-1 gap-3">
        {rentals.map(r=> (
          <div key={r._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{r.itemId?.name || '—'}</div>
              <div className="text-sm text-slate-500">{r.customerId?.name || '—'}</div>
              <div className="text-xs text-slate-400">{r.status}</div>
            </div>
            <div>
              {r.status === 'Rented' && <button onClick={()=>doReturn(r._id)} className="bg-indigo-600 text-white px-3 py-1 rounded">Return</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
