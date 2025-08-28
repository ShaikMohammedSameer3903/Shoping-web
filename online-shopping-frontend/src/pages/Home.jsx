import { useEffect, useState } from 'react'
import { productService } from '../services/productService.js'
import ProductCard from '../components/ProductCard.jsx'
import { Link } from 'react-router-dom'

export default function Home() {
  const [items, setItems] = useState([])
  useEffect(()=>{
    productService.list({ limit: 8 }).then(setItems)
  },[])

  return (
    <div>
      <section className="container" style={{paddingTop:16}}>
        <div className="space-between">
          <h2>Top Picks</h2>
          <Link to="/products">View all</Link>
        </div>
        <div className="grid" style={{marginTop:12}}>
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
