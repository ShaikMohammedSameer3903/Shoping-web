import { useEffect, useState } from 'react'
import { orderService } from '../services/orderService.js'

export default function Orders() {
  const [orders, setOrders] = useState([])
  useEffect(()=>{ orderService.list().then(setOrders) },[])
  return (
    <div>
      <h2>Orders</h2>
      {!orders.length ? <p>No orders yet.</p> : (
        <div className="grid">
          {orders.map(o => (
            <div className="card" key={o.id}>
              <div className="space-between">
                <div>Order #{o.id}</div>
                <div className="badge">{o.status}</div>
              </div>
              <div>{o.items?.length} items • ₹{o.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
