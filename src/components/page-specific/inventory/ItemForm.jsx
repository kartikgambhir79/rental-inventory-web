import { useForm } from 'react-hook-form';

export default function ItemForm({ onSubmit, initial = {} }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initial });
  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input {...register('name', { required: 'Name required' })} className="mt-1 w-full border p-2 rounded" />
        {errors.name && <div className="text-red-600 text-sm">{errors.name.message}</div>}
      </div>
      <div>
        <label className="text-sm font-medium">Category</label>
        <input {...register('category')} className="mt-1 w-full border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm font-medium">Size</label>
        <select {...register('size')} className="mt-1 w-full border p-2 rounded">
          <option value="">Select Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="XXXL">XXXL</option>
          <option value="XXXXL">XXXXL</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Color</label>
        <input {...register('color')} className="mt-1 w-full border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm font-medium">Rent</label>
        <input type="number" {...register('rent', { valueAsNumber: true })} className="mt-1 w-full border p-2 rounded" />
      </div>
      <div>
        <label className="text-sm font-medium">Product Image</label>
        <input type="file" {...register('image')} className="mt-1 w-full" />
      </div>
      <div className="col-span-2 flex justify-end">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </form>
  );
}
