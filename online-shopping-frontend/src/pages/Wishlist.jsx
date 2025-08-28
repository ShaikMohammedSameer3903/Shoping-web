// export default function Wishlist() {
//   return (
//     <div>
//       <h2>Wishlist</h2>
//       <p>Coming soon. Connect to /api/wishlist endpoints.</p>
//     </div>
//   )
// }
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Link } from 'react-router-dom';

// A custom service to handle wishlist API calls
const wishlistService = {
  get: () => fetch('/api/wishlist').then(res => res.json()),
  remove: (productId) => fetch(`/api/wishlist/${productId}`, { method: 'DELETE' }),
};

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    wishlistService.get()
      .then(setItems)
      .catch(err => setError('Could not fetch wishlist.'))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (productId) => {
    // Optimistically remove from UI
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
    try {
      await wishlistService.remove(productId);
      // You can add a success notification here
    } catch (err) {
      setError('Failed to remove item. Please try again.');
      // Optionally, add the item back to the list if the API call fails
    }
  };
  
  if (loading) return <p>Loading your wishlist...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>My Wishlist</h2>
      {items.length === 0 ? (
        <div>
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="btn">Explore Products</Link>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 12 }}>
          {items.map(product => (
            <div key={product.id} style={{ position: 'relative' }}>
              <ProductCard product={product} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button 
                  className="btn" 
                  style={{ flex: 1 }} 
                  onClick={() => {
                    addToCart(product, 1);
                    handleRemove(product.id); // Also remove from wishlist
                  }}>
                  Move to Cart
                </button>
                <button 
                  className="btn ghost" 
                  onClick={() => handleRemove(product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}