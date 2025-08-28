import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} style={{width:'100%', height:160, objectFit:'cover', borderRadius:12}} />
        <h3>{product.name}</h3>
      </Link>
      <div className="space-between">
        <span className="price">₹{product.price}</span>
        <span className="badge">{product.category}</span>
      </div>
      <div className="row" style={{marginTop:8}}>
        <button className="btn" onClick={()=>addToCart(product, 1)}>Add to Cart</button>
        <Link to={`/products/${product.id}`} className="btn ghost">View</Link>
      </div>
    </div>
  )
}
