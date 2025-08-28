import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    authService.me().then(setUser).catch(()=>setUser(null))
  }, [])

  async function login(payload) {
    const u = await authService.login(payload)
    setUser(u)
  }
  async function register(payload) {
    const u = await authService.register(payload)
    setUser(u)
  }
  function logout() {
    authService.logout()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
