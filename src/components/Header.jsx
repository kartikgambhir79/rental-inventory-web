import React from 'react'
export default function Header({title, actions}){
  return (
    <div className="header">
      <div>
        <h2 style={{margin:0}}>{title}</h2>
        <div className="small">Boutique rental inventory</div>
      </div>
      <div>{actions}</div>
    </div>
  )
}
