import { useForm } from 'react-hook-form';

export default function CustomerForm({ onSubmit }){
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input {...register('name', { required: 'Name required' })} placeholder="Full name" className="mt-1 w-full border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm font-medium">Phone</label>
        <input {...register('phone', { required: 'Phone required' })} placeholder="Phone" className="mt-1 w-full border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input {...register('email')} placeholder="Email" className="mt-1 w-full border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm font-medium">Address</label>
        <input {...register('address')} placeholder="Address" className="mt-1 w-full border p-2 rounded" />
      </div>
      <div className="col-span-2 flex justify-end">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Customer</button>
      </div>
    </form>
  );
}
