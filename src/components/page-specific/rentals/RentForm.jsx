import { useForm } from 'react-hook-form';

export default function RentForm({ customers, onRent }){
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onRent)} className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
      <input {...register('code', { required: true })} placeholder="Scan barcode / RFID" className="border p-2 rounded" />
      <select {...register('customerId')} className="border p-2 rounded">
        <option value="">Select customer</option>
        {customers.map(c=> <option key={c._id} value={c._id}>{c.name} ({c.phone})</option>)}
      </select>
      <div className="flex gap-2">
        <input type="number" {...register('rentDays', { valueAsNumber: true })} defaultValue={1} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Rent</button>
      </div>
    </form>
  );
}
