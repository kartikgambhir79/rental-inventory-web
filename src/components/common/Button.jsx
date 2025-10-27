export default function Button({ children, className = '', ...props }){
  return (
    <button {...props} className={"px-4 py-2 rounded-md shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-60 " + className}>
      {children}
    </button>
  );
}
