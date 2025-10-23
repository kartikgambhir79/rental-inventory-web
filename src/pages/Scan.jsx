import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import Scanner from '../components/Scanner.jsx'
import { findItemBySKU, rentItem } from '../api/mockApi.js'

export default function Scan(){
  const [last, setLast] = useState(null)
  const handle = (code)=>{
    const sku = (code||'').trim()
    if(!sku) return
    const item = findItemBySKU(sku)
    if(!item){ setLast({type:'err',msg:'Item not found: '+sku}); return }
    try{
      const due = new Date(); due.setDate(due.getDate()+1)
      rentItem({ sku:item.sku, customerName:'Walk-in', qty:1, rate:item.price, deposit:200, dueOn: due.toISOString() })
      setLast({type:'ok',msg:'Rented 1 x '+item.name})
    }catch(e){ setLast({type:'err',msg:e.message}) }
  }

  return (
    <div>
      <Header title="Scan / Quick Rent" />
      <Scanner onDetected={handle} />
      <div style={{marginTop:12}} className="card">
        <div className="small">You can also paste SKU below</div>
        <QuickRent onRent={(sku)=>handle(sku)} last={last} />
      </div>
    </div>
  )
}

function QuickRent({onRent,last}){
  const [v, setV] = useState('')
  return (
    <div style={{display:'flex',gap:8,marginTop:8}}>
      <input className="field" style={{flex:1}} value={v} onChange={e=>setV(e.target.value)} placeholder="Enter SKU" />
      <button className="btn" onClick={()=>{ onRent(v); setV('') }}>Rent</button>
      {last && <div style={{marginLeft:8,color: last.type==='ok' ? '#86efac' : '#fca5a5'}}>{last.msg}</div>}
    </div>
  )
}
