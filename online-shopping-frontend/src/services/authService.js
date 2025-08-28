import api from './api.js'

const useMocks = (import.meta.env.VITE_USE_MOCKS || 'false') === 'true'

export const authService = {
  async login({ email, password }) {
    if (useMocks) {
      const demo = { id: 1, name: 'Demo User', email, roles: ['CUSTOMER'], token: 'demo-token' }
      localStorage.setItem('token', demo.token)
      return demo
    }
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    return data.user || data
  },
  async register(payload) {
    if (useMocks) {
      const demo = { id: 1, name: payload.name, email: payload.email, roles: ['CUSTOMER'], token: 'demo-token' }
      localStorage.setItem('token', demo.token)
      return demo
    }
    const { data } = await api.post('/auth/register', payload)
    localStorage.setItem('token', data.token)
    return data.user || data
  },
  async me() {
    if (useMocks) {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token')
      return { id: 1, name: 'Demo User', email: 'demo@shop.com', roles: ['CUSTOMER'] }
    }
    const { data } = await api.get('/auth/me')
    return data
  },
  logout() {
    localStorage.removeItem('token')
  }
}
