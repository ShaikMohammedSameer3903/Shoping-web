import { useCart } from '../context/CartContext.jsx'
import { orderService } from '../services/orderService.js'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const navigate = useNavigate()

  async function placeOrder() {
    await orderService.create({ items })
    clear()
    navigate('/orders')
  }

  return (
    <div>
      <h2>Checkout</h2>
      <div className="card">
        <p>Items: {items.length}</p>
        <p>Total: ₹{total}</p>
        <button className="btn" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  )
}
