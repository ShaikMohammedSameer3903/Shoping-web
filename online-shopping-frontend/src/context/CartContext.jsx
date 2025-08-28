import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const i = prev.find(p => p.id === product.id)
      if (i) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      return [...prev, { ...product, qty }]
    })
  }
  function removeFromCart(id) {
    setItems(prev => prev.filter(p => p.id !== id))
  }
  function updateQty(id, qty) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p))
  }
  function clear() { setItems([]) }

  const total = useMemo(()=> items.reduce((s, p)=> s + p.price * p.qty, 0), [items])
  const cartCount = useMemo(()=> items.reduce((s, p)=> s + p.qty, 0), [items])

  return <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clear, total, cartCount }}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }
