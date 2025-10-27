export default function ItemCard({ item, onDelete }){
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <div className="text-sm text-slate-500">{item.category} • {item.size}</div>
        </div>
        <div className={"px-2 py-1 rounded text-white " + (item.available ? 'bg-green-600' : 'bg-red-600')}>{item.available ? 'Available' : 'Rented'}</div>
      </div>
      <div className="mt-3 text-xs text-slate-500">Code: {item.itemCode}</div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onDelete(item._id)} className="text-sm text-red-600">Delete</button>
      </div>
    </div>
  );
}
