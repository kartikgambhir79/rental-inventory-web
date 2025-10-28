import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Modal from '../components/common/Modal';
import ItemForm from '../components/page-specific/inventory/ItemForm';
import Spinner from '../components/common/Spinner';
import { BACKEND_URL } from '../utils/constant';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const load = async () => { setLoading(true); try { const res = await api.get('/items'); setItems(res.data?.items); } catch (err) { } finally { setLoading(false); } };

  useEffect(() => { load(); }, []);

  const handleCreate = async (data) => {
    const form = new FormData();
    form.append('name', data.name);
    form.append('category', data.category);
    form.append('size', data.size);
    form.append('color', data.color);
    form.append('rent', data.pricePerDay || 0);
    form.append('rfidTag', data.rfidTag || '');
    if (data.image && data.image[0]) form.append('image', data.image[0]);
    await api.post('/items', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete item?')) return;
    await api.delete(`/items/${id}`);
    load();
  };

  const filtered = items.filter(it => {
    const q = query.toLowerCase();
    return !q || it.name?.toLowerCase().includes(q) || it.itemCode?.toLowerCase().includes(q) || it.category?.toLowerCase().includes(q);
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <div className="flex gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search items..." className="border p-2 rounded" />
          <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-3 py-1 rounded">Add Item</button>
        </div>
      </div>

      {loading ? <div className="p-8"><Spinner /></div> : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full divide-y">
            <thead className="table-head">
              <tr>
                <th className="p-3 text-left">Thumbnail</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(it => (
                <tr key={it._id} className="border-t hover:bg-slate-50 cursor-pointer" onClick={() => setSelected(it)}>
                  <td className="p-3"><img src={`${BACKEND_URL}/${it.productImage}`} alt="" className="w-16 h-12 object-fill rounded" /></td>
                  <td className="p-3">{it.name}</td>
                  <td className="p-3 text-sm text-slate-500">{it.category}</td>
                  <td className="p-3 text-indigo-600">{it.itemCode}</td>
                  <td className="p-3">{it.available ? <span className="text-green-600">Available</span> : <span className="text-red-600">Rented</span>}</td>
                  <td className="p-3">
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(it._id); }} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Item">
        <ItemForm onSubmit={handleCreate} />
      </Modal>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Item Details">
        {selected && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <img src={`${BACKEND_URL}/${selected.productImage}`} alt="" className="w-full h-80 object-fill rounded" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{selected.name}</h3>
              <div className="text-sm text-slate-500 mb-2">{selected.category} • {selected.size} • {selected.color}</div>
              <div className="mb-4">Code: <strong>{selected.itemCode}</strong></div>
              {selected.barcodeImage && <div className="mb-4">
                <img src={`${BACKEND_URL}/${selected.barcodeImage}`} alt="barcode" className="w-48 h-24 object-contain" />
                <div className="mt-2">
                  <button
                    onClick={() => {
                      const printWindow = window.open('');
                      printWindow.document.write(`
                      <html>
                        <head>
                          <title>Print Barcode</title>
                          <style>
                            body { text-align: center; margin-top: 50px; }
                            img { width: 250px; height: auto; }
                          </style>
                        </head>
                        <body>
                          <img src="${BACKEND_URL}/${selected.barcodeImage}" alt="barcode" />
                          <script>
                            window.onload = function() {
                              window.print();
                              window.onafterprint = function() { window.close(); };
                            };
                          </script>
                        </body>
                      </html>
                    `);
                      printWindow.document.close();
                    }}
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    Print Barcode
                  </button>
                </div>
              </div>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
