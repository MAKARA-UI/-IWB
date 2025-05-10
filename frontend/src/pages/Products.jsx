import '../styles/pages/products.css';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: "RAM Recycling",
    desc: "Secure data wiping and material recovery",
    img: "ram-recycle.jpg",
    details: "We process DDR3, DDR4, and other memory modules with certified data erasure techniques."
  },
  {
    id: 2,
    name: "Hard Drive Destruction",
    desc: "NIST-certified physical destruction",
    img: "hdd-recycle.jpg",
    details: "HDD and SSD shredding with certificate of destruction provided."
  },
  {
    id: 3,
    name: "Motherboard Processing",
    desc: "Hazardous material handling",
    img: "mb-recycle.jpg",
    details: "Component recovery and safe disposal of lead, mercury, and other hazardous materials."
  }
];

export default function Products({ userRole }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBuy = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
  };

  return (
    <main className="products">
      <h1>Our Recycling Services</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={`/src/assets/images/${product.img}`} 
                alt={product.name}
                loading="lazy"
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <div className="product-details">
                <p>{product.details}</p>

                {userRole === "client" ? (
                  <button className="buy-btn" onClick={() => handleBuy(product)}>
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

      {selectedProduct && (
        <div className="payment-form-overlay">
          <div className="payment-form">
            <h2>Buy {selectedProduct.name}</h2>
            <form>
              <label>Name on Card</label>
              <input type="text" placeholder="John Doe" required />
              
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" required />

              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" required />

              <label>CVV</label>
              <input type="text" placeholder="123" required />

              <button type="submit">Confirm Purchase</button>
              <button type="button" onClick={handleCloseForm}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
