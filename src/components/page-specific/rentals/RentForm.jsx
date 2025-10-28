import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function RentForm({ customers, onRent }){
  const { register, handleSubmit } = useForm();
  const [search, setSearch] = useState('');
  const filtered = customers.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  return (
    <form onSubmit={handleSubmit(onRent)} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white p-4 rounded shadow">
      <div>
        <label className="text-sm font-medium">Scan Code</label>
        <input {...register('code', { required: true })} placeholder="Scan barcode / RFID" className="mt-1 w-full border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm font-medium">Search Customer</label>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or phone" className="mt-1 w-full border p-2 rounded" />
        <select {...register('customerId')} className="mt-2 border p-2 rounded w-full">
          <option value="">Select customer</option>
          {filtered.map(c=> <option key={c._id} value={c._id}>{c.name} ({c.phone})</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Rent Days</label>
        <input type="number" {...register('rentDays', { valueAsNumber: true })} defaultValue={1} className="mt-1 w-full border p-2 rounded" />
      </div>
      <div className="flex items-center">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Rent</button>
      </div>
    </form>
  );
}
