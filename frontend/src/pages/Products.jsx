import '../styles/pages/products.css';

const products = [
  {
    id: 1,
    name: "RAM Recycling",
    price: 120,
    desc: "Secure data wiping and material recovery",
    img: "ram-recycle.jpg",
    details: "We process DDR3, DDR4, and other memory modules with certified data erasure techniques."
  },
  {
    id: 2,
    name: "Hard Drive Destruction",
    price: 200,
    desc: "NIST-certified physical destruction",
    img: "hdd-recycle.jpg",
    details: "HDD and SSD shredding with certificate of destruction provided."
  },
  {
    id: 3,
    name: "Motherboard Processing",
    price: 180,
    desc: "Hazardous material handling",
    img: "mb-recycle.jpg",
    details: "Component recovery and safe disposal of lead, mercury, and other hazardous materials."
  }
];

export default function Products({ userRole, onBuyNow }) {
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
                  <button className="buy-btn" onClick={() => onBuyNow({ name: product.name, price: product.price })}>
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
