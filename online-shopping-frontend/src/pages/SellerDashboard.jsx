// export default function SellerDashboard() {
//   return (
//     <div>
//       <h2>Seller Dashboard</h2>
//       <p>Coming soon. Hook to /api/seller/products and /api/seller/orders.</p>
//     </div>
//   )
// }
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock services for seller data
const sellerService = {
  getProducts: () => fetch('/api/seller/products').then(res => res.json()),
  getOrders: () => fetch('/api/seller/orders').then(res => res.json()),
};

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      sellerService.getProducts(),
      sellerService.getOrders(),
    ])
    .then(([sellerProducts, sellerOrders]) => {
      setProducts(sellerProducts);
      setOrders(sellerOrders);
    })
    .catch(err => setError('Failed to load dashboard data.'))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <div className="space-between" style={{alignItems: 'center'}}>
        <h2>Seller Dashboard</h2>
        <Link to="/seller/products/new" className="btn">Add New Product</Link>
      </div>

      <section style={{ marginTop: '2rem' }}>
        <h3>My Products</h3>
        {products.length > 0 ? (
          <div className="card-grid">
            {products.map(p => (
              <div key={p.id} className="card">
                <div><strong>{p.name}</strong></div>
                <div className="muted">Price: ₹{p.price} | Stock: {p.stock}</div>
                {/* Add Edit/Delete buttons here */}
              </div>
            ))}
          </div>
        ) : (
          <p>You have not listed any products yet.</p>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3>Received Orders</h3>
        {orders.length > 0 ? (
          <div className="card-grid">
            {orders.map(o => (
              <div key={o.id} className="card">
                <div className="space-between">
                  <div><strong>Order #{o.id}</strong></div>
                  <div className="badge">{o.status}</div>
                </div>
                <div className="muted">{o.items?.length} items • Total: ₹{o.total}</div>
                <div>Customer: {o.customerName}</div>
                 {/* Add a link to view order details */}
              </div>
            ))}
          </div>
        ) : (
          <p>You have not received any orders yet.</p>
        )}
      </section>
    </div>
  );
}