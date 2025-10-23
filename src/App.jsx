import React, { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
// import Dashboard from './pages/Dashboard.jsx'
// import Inventory from './pages/Inventory.jsx'
// import Rentals from './pages/Rentals.jsx'
// import Customers from './pages/Customers.jsx'
// import Scan from './pages/Scan.jsx'
// import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import { seedDemoData, getAuthUser, logout } from './api/mockApi.js'

export default function App() {
  const [user, setUser] = useState(getAuthUser())
  const navigate = useNavigate()

  useEffect(() => { seedDemoData() }, [])

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  const doLogout = () => { logout(); setUser(null); navigate('/login') }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
        <Route path="*" element={<Login onLogin={(u) => setUser(u)} />} />
      </Routes>
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="dot" /> Timeless Trunk</div>
        <nav className="nav">
          {user.role === 'customer' ? (
            <>
              <NavLink to="/scan">Scan</NavLink>
              <a href="#" onClick={(e) => { e.preventDefault(); doLogout() }}>Logout</a>
            </>
          ) : (
            <>
              <NavLink to="/" end>Dashboard</NavLink>
              <NavLink to="/inventory">Inventory</NavLink>
              <NavLink to="/rentals">Rentals</NavLink>
              <NavLink to="/customers">Customers</NavLink>
              <NavLink to="/scan">Scan</NavLink>
              <NavLink to="/settings">Settings</NavLink>
              <a href="#" onClick={(e) => { e.preventDefault(); doLogout() }}>Logout</a>
            </>
          )}
        </nav>
        <div style={{ marginTop: 20 }} className="small">Signed in as <strong>{user.name}</strong></div>
      </aside>
      <main className="content">
        <Routes>
          {/* <Route path="/" element={<Dashboard/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/rentals" element={<Rentals/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/scan" element={<Scan/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="*" element={<Dashboard/>} /> */}
        </Routes>
      </main>
    </div>
  )
}
