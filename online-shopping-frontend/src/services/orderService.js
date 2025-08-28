import api from './api.js'

const useMocks = (import.meta.env.VITE_USE_MOCKS || 'false') === 'true'
let mockOrders = []

export const orderService = {
  async create(payload) {
    if (useMocks) {
      const total = payload.items.reduce((s, p)=> s + p.price * p.qty, 0)
      mockOrders.unshift({ id: mockOrders.length + 1, items: payload.items, total, status: 'PLACED' })
      return { ok: true }
    }
    const { data } = await api.post('/orders', payload)
    return data
  },
  async list() {
    if (useMocks) {
      return mockOrders
    }
    const { data } = await api.get('/orders')
    return data.content || data
  }
}
