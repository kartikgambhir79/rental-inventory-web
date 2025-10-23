import React from 'react'
import Header from '../components/Header.jsx'
import { getItems, getRentals } from '../api/mockApi.js'

export default function Dashboard(){
  const items = getItems(), rentals = getRentals()
  const active = rentals.filter(r=>r.status==='rented').length
  return (
    <div>
      <Header title="Dashboard" />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        <div className="card"><div className="small">Items</div><div style={{fontSize:28,fontWeight:800}}>{items.length}</div></div>
        <div className="card"><div className="small">Active Rentals</div><div style={{fontSize:28,fontWeight:800}}>{active}</div></div>
      </div>
    </div>
  )
}
