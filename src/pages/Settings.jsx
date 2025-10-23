import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import { getSettings, saveSettings } from '../api/mockApi.js'

export default function Settings(){
  const [s, setS] = useState(getSettings())
  return (
    <div>
      <Header title="Settings" />
      <div className="card">
        <div className="field"><label>Currency</label><input value={s.currency} onChange={e=>setS({...s,currency:e.target.value})} /></div>
        <div className="field"><label>Tax %</label><input type="number" value={s.taxPercent} onChange={e=>setS({...s,taxPercent:Number(e.target.value)})} /></div>
        <div style={{marginTop:8}}><button className="btn" onClick={()=>{ saveSettings(s); alert('Saved') }}>Save</button></div>
      </div>
    </div>
  )
}
