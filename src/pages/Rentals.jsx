import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Spinner from '../components/common/Spinner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  // Rent form fields
  const [form, setForm] = useState({
    customerId: '',
    itemCode: '',
    advancePayment: '',
    duePayment: '',
    totalPayment: '',
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [fetchingItem, setFetchingItem] = useState(false);

  // Load all rentals
  const loadRentals = async () => {
    setLoading(true);
    try {
      const res = await api.get('/rentals');
      setRentals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load all customers
  const loadCustomers = async () => {
    try {
      const res = await api.get('/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRentals();
    loadCustomers();
  }, []);

  // Fetch item by code
  const fetchItemByCode = async (code) => {
    if (!code) return setSelectedItem(null);
    setFetchingItem(true);
    try {
      const res = await api.get(`/items/${code}`);
      setSelectedItem(res.data?.item);
    } catch (err) {
      setSelectedItem(null);
    } finally {
      setFetchingItem(false);
    }
  };

  // Rent item
  const onRent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rentals/rent', {
        customerId: form.customerId,
        itemCode: form.itemCode,
        advancePayment: form.advancePayment,
        duePayment: form.duePayment,
        totalPayment: form.totalPayment,
      });
      setForm({ customerId: '', itemCode: '', advancePayment: '', duePayment: '', totalPayment: '' });
      setSelectedItem(null);
      loadRentals();
    } catch (err) {
    }
  };

  // Return item
  const doReturn = async (rentalId, duePaymentReceived) => {
    if (!confirm('Confirm return of this item?')) return;
    try {
      await api.post('/rentals/return', { rentalId, duePaymentReceived });
      loadRentals();
    } catch (err) {
    }
  };

  // Filtered rentals
  const filtered = rentals.filter((r) => {
    const q = query.toLowerCase();
    return (
      !q ||
      r.itemId?.name?.toLowerCase().includes(q) ||
      r.customerId?.name?.toLowerCase().includes(q) ||
      r.customerId?.phone?.includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Rentals</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search rentals..."
          className="border p-2 rounded"
        />
      </div>

      {/* Rent Form */}
      <form onSubmit={onRent} className="bg-white p-4 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">Rent an Item</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Customer</label>
            <select
              className="border p-2 w-full rounded"
              value={form.customerId}
              onChange={(e) => setForm({ ...form, customerId: e.target.value })}
              required
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.phone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Item Code</label>
            <input
              className="border p-2 w-full rounded"
              placeholder="Enter Item Code"
              value={form.itemCode}
              onChange={(e) => {
                setForm({ ...form, itemCode: e.target.value });
                if (e.target.value.length > 5) fetchItemByCode(e.target.value);
              }}
              onBlur={() => {
                if (form.itemCode?.trim()) fetchItemByCode(form.itemCode.trim());
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (form.itemCode?.trim()) fetchItemByCode(form.itemCode.trim());
                }
              }}
              required
            />
          </div>
        </div>

        {fetchingItem ? (
          <div className="text-slate-500 p-2">Fetching item details...</div>
        ) : (
          selectedItem && (
            <div className="grid md:grid-cols-2 gap-4 mt-4 border-t pt-4">
              <div>
                <img
                  src={`${BACKEND_URL}/${selectedItem.productImage}`}
                  alt=""
                  className="w-52 h-52 object-fill rounded"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedItem.name}</h3>
                <div className="text-sm text-slate-500 mb-2">
                  {selectedItem.category} • {selectedItem.size} • {selectedItem.color}
                </div>
                <div className="mb-2">
                  Code: <strong>{selectedItem.itemCode}</strong>
                </div>
                {selectedItem.barcodeImage && (
                  <div className="mb-4">
                    <img
                      src={`${BACKEND_URL}/${selectedItem.barcodeImage}`}
                      alt="barcode"
                      className="w-48 h-24 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        )}

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Advance Payment</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={form.advancePayment}
              onChange={(e) => setForm({ ...form, advancePayment: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Due Payment</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={form.duePayment}
              onChange={(e) => setForm({ ...form, duePayment: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Total Payment</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={form.totalPayment}
              onChange={(e) => setForm({ ...form, totalPayment: e.target.value })}
              required
            />
          </div>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" type="submit">
          Rent Item
        </button>
      </form>

      {/* Rentals Table */}
      {loading ? (
        <div className="p-8">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Dates</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-t hover:bg-slate-50">
                  <td className="p-3">{r.itemId?.name}</td>
                  <td className="p-3">
                    {r.customerId?.name}
                    <div className="text-xs text-slate-400">{r.customerId?.phone}</div>
                  </td>
                  <td className="p-3">
                    {new Date(r.rentDate).toLocaleDateString()} -{' '}
                    {r.returnDate ? new Date(r.returnDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-3">
                    ₹{r.advancePayment} + ₹{r.duePayment} = <strong>₹{r.totalPayment}</strong>
                  </td>
                  <td className="p-3 capitalize">{r.status}</td>
                  <td className="p-3 text-center">
                    {r.status === 'rented' ? (
                      <button
                        onClick={() => doReturn(r._id, r.duePayment)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Return
                      </button>
                    ) : (
                      <span className="text-slate-400">Returned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
