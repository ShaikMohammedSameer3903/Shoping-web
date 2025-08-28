import api from './api.js'

const useMocks = (import.meta.env.VITE_USE_MOCKS || 'false') === 'true'

export const productService = {
  async list(params = {}) {
    if (useMocks) {
      const res = await fetch('/mock/products.json')
      const data = await res.json()
      const q = (params.q || '').toLowerCase()
      let items = data
      if (q) items = items.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      const limit = params.limit || items.length
      return items.slice(0, limit)
    }
    const { data } = await api.get('/products', { params })
    return data.content || data
  },
  async get(id) {
    if (useMocks) {
      const res = await fetch('/mock/products.json')
      const data = await res.json()
      return data.find(p => String(p.id) === String(id))
    }
    const { data } = await api.get(`/products/${id}`)
    return data
  }
}
