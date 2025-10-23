import React from 'react'
export default function ItemCard({item, onRent}){
  return (
    <div className="card">
      <img src={item.img} alt={item.name} style={{width:'100%',height:150,objectFit:'cover',borderRadius:8,marginBottom:10}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:700}}>{item.name}</div>
          <div className="small">{item.category} • SKU {item.sku}</div>
        </div>
        <div className="small">{item.qty} in stock</div>
      </div>
      <div style={{display:'flex',gap:8,marginTop:10}}>
      <button className="btn" onClick={()=>onRent(item)}>Rent</button>
        <div className="small">₹{item.price}/day</div>
      </div>
    </div>
  )
}
