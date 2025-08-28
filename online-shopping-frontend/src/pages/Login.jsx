import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('demo@shop.com')
  const [password, setPassword] = useState('password')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await login({ email, password })
    navigate('/')
  }

  return (
    <div style={{maxWidth:420, margin:'0 auto'}}>
      <h2>Login</h2>
      <form className="card" onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
      <p>New user? <Link to="/register">Create an account</Link></p>
    </div>
  )
}
