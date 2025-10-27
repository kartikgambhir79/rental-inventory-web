import { useForm } from 'react-hook-form';

export default function CustomerForm({ onSubmit }){
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-3">
      <input {...register('name', { required: 'Name required' })} placeholder="Name" className="border p-2 rounded" />
      <input {...register('phone', { required: 'Phone required' })} placeholder="Phone" className="border p-2 rounded" />
      <input {...register('email')} placeholder="Email" className="border p-2 rounded" />
      <input {...register('address')} placeholder="Address" className="border p-2 rounded" />
      <div className="col-span-2 flex justify-end">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Customer</button>
      </div>
    </form>
  );
}
