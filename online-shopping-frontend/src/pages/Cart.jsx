import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, removeFromCart, updateQty, total } = useCart()

  if (!items.length) return <div><h2>Your cart is empty</h2><Link to="/products">Continue shopping</Link></div>

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="card">
        {items.map(it => (
          <div key={it.id} className="space-between" style={{padding:'8px 0', borderBottom:'1px solid #eee'}}>
            <div className="row">
              <img src={it.imageUrl} alt={it.name} style={{width:64, height:64, objectFit:'cover', borderRadius:12}} />
              <div>
                <div>{it.name}</div>
                <div className="muted">₹{it.price}</div>
              </div>
            </div>
            <div className="row">
              <input type="number" min="1" value={it.qty} onChange={(e)=>updateQty(it.id, parseInt(e.target.value||'1'))} style={{width:72}} />
              <button className="btn ghost" onClick={()=>removeFromCart(it.id)}>Remove</button>
            </div>
          </div>
        ))}
        <div className="space-between" style={{paddingTop:12}}>
          <h3>Total: ₹{total}</h3>
          <Link to="/checkout" className="btn">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  )
}
