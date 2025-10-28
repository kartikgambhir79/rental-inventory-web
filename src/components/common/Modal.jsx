import { motion } from 'framer-motion';
export default function Modal({ open, onClose, title, children }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} className="bg-white rounded-lg shadow-lg w-full max-w-3xl z-10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-500">Close</button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
