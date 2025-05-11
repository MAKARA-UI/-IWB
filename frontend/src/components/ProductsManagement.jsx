import { useState, useEffect } from 'react';
import '../styles/dashboard/ProductsManagement.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductsManagement({ refreshData }) {  // Removed productStock prop
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [refreshData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct 
        ? `${API_BASE_URL}/api/products/${editingProduct._id}`
        : `${API_BASE_URL}/api/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        refreshData();
        setFormData({ name: '', description: '', price: 0, stock: 0, image: '' });
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image
    });
  };

  return (
    <div className="products-management">
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <button type="submit" className="save-btn">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>Stock: {product.stock}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}