import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  function onSearch(e) {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  return (
    <nav className="header">
      <div className="container space-between">
        <Link to="/" className="row">
          <img src={logo} alt="logo" width="32" height="32" />
          <span className="brand">ShopHub</span>
        </Link>
        <form className="searchbar" onSubmit={onSearch} style={{maxWidth:'520px', flex:1, margin:'0 16px'}}>
          <input placeholder="Search products..." value={q} onChange={(e)=>setQ(e.target.value)} />
          <button className="btn">Search</button>
        </form>
        <div className="links row">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          {user ? (
            <div className="row">
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/profile">{user.name || 'Account'}</NavLink>
              {user.roles?.includes('SELLER') && <NavLink to="/seller">Seller</NavLink>}
              <button className="btn ghost" onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="row">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
