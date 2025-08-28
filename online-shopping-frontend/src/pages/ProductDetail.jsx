import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productService } from '../services/productService.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const { addToCart } = useCart()

  useEffect(()=>{ productService.get(id).then(setP) }, [id])

  if (!p) return <p>Loading...</p>
  return (
    <div className="row" style={{gap:24}}>
      <img src={p.imageUrl} alt={p.name} style={{width:380, maxWidth:'100%', borderRadius:16}} />
      <div style={{flex:1}}>
        <h2>{p.name}</h2>
        <div className="badge">{p.category}</div>
        <p style={{color:'#374151'}}>{p.description}</p>
        <h3 className="price">₹{p.price}</h3>
        <div className="row">
          <button className="btn" onClick={()=>addToCart(p,1)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
