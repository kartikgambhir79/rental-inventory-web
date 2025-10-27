import { useState, useEffect } from 'react';

export default function useFetch(fn, deps = []){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      try{
        setLoading(true);
        const res = await fn();
        if(mounted) setData(res.data || res);
      }catch(err){ if(mounted) setError(err); }
      finally{ if(mounted) setLoading(false); }
    })();
    return ()=>{ mounted = false; };
  }, deps);

  return { data, loading, error };
}
