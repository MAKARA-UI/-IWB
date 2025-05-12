import { useEffect, useState } from 'react';
import '../styles/pages/products.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Products({ userRole, onBuyNow }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="products">
      <h1>Our Recycling Services</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img 
                src={`/src/assets/images/${product.image}`} 
                alt={product.name}
                loading="lazy"
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-details">
                <p>{product.details || ''}</p>

                {userRole === "client" ? (
                  <button 
                    className="buy-btn" 
                    onClick={() => onBuyNow({ name: product.name, price: product.price })}
                  >
                    Buy Now
                  </button>
                ) : (
                  <a href="/contact" className="service-btn">Request Service</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
