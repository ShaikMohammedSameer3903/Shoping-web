import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const [name, setName] = useState('Demo User')
  const [email, setEmail] = useState('demo@shop.com')
  const [password, setPassword] = useState('password')
  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await register({ name, email, password })
    navigate('/')
  }

  return (
    <div style={{maxWidth:420, margin:'0 auto'}}>
      <h2>Register</h2>
      <form className="card" onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} />
        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
