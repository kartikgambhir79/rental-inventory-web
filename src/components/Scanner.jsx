import React, { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'

export default function Scanner({onDetected}){
  const videoRef = useRef(null)
  const reader = useRef(null)
  const [active, setActive] = useState(false)
  const [err, setErr] = useState('')

  useEffect(()=>{
    reader.current = new BrowserMultiFormatReader()
    return ()=> { try{ reader.current?.reset() }catch{} }
  },[])

  const start = async ()=>{
    setErr(''); setActive(true)
    try{
      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      const id = devices?.[0]?.deviceId
      await reader.current.decodeFromVideoDevice(id, videoRef.current, (res, e)=>{
        if(res) onDetected?.(res.getText())
      })
    }catch(e){ setErr(e?.message || 'Camera error'); setActive(false) }
  }
  const stop = ()=>{ setActive(false); try{ reader.current.reset() }catch{} }

  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="small">Point camera at barcode / QR</div>
        <div>
          {!active ? <button className="btn" onClick={start}>Start Camera</button> : <button className="btn secondary" onClick={stop}>Stop</button>}
        </div>
      </div>
      <div style={{marginTop:10}}><video ref={videoRef} style={{width:'100%',borderRadius:8}}/></div>
      {err && <div style={{color:'#fca5a5',marginTop:8}}>⚠ {err}</div>}
    </div>
  )
}
