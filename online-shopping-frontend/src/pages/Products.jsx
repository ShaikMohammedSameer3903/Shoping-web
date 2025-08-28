import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productService } from '../services/productService.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Products() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [params] = useSearchParams()
  const q = params.get('q') || ''

  useEffect(()=>{
    setLoading(true)
    productService.list({ q }).then(setItems).finally(()=>setLoading(false))
  }, [q])

  return (
    <div>
      <h2>Products {q && <span className="badge">search: {q}</span>}</h2>
      {loading ? <p>Loading...</p> : (
        <div className="grid" style={{marginTop:12}}>
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
