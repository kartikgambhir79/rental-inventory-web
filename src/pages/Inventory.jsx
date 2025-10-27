import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ItemCard from '../components/page-specific/inventory/ItemCard';
import ItemForm from '../components/page-specific/inventory/ItemForm';
import Modal from '../components/common/Modal';

export default function Inventory(){
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async ()=>{ try{ const res = await api.get('/items'); setItems(res.data); }catch{} };
  useEffect(()=>{ load(); },[]);

  const handleCreate = async (data) =>{
    await api.post('/items', data);
    setOpen(false);
    load();
  };

  const handleDelete = async (id) =>{
    if(!confirm('Delete item?')) return;
    await api.delete(`/items/${id}`);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <div>
          <button onClick={()=>setOpen(true)} className="bg-indigo-600 text-white px-3 py-1 rounded">Add Item</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(it=> <ItemCard key={it._id} item={it} onDelete={handleDelete} />)}
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Add Item">
        <ItemForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
}
