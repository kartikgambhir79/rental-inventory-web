import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import { getCustomers, addCustomer } from '../api/mockApi.js'

export default function Customers(){
  const [customers, setCustomers] = useState(getCustomers())
  const [form, setForm] = useState({name:'',phone:'',email:'',note:''})

  const add = ()=>{ if(!form.name) return alert('Name required'); addCustomer(form); setCustomers(getCustomers()); setForm({name:'',phone:'',email:'',note:''}) }

  return (
    <div>
      <Header title="Customers" />
      <div className="card" style={{marginBottom:12}}>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>
          <div className="field"><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
          <div className="field"><label>Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
          <div className="field"><label>Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1 / -1'}}><label>Note</label><textarea value={form.note} onChange={e=>setForm({...form,note:e.target.value})}></textarea></div>
        </div>
        <div style={{marginTop:8}}><button className="btn" onClick={add}>Add Customer</button></div>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Phone</th><th>Email</th></tr></thead>
          <tbody>{customers.map(c=> <tr key={c.id}><td>{c.name}</td><td>{c.phone}</td><td>{c.email}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
