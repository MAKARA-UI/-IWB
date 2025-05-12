import { useState, useEffect } from 'react';
import '../styles/dashboard/ClientPurchaseForm.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ClientPurchaseForm({ prefillItem = '', prefillAmount = '', onSubmit }) {
  const [formData, setFormData] = useState({
    item: prefillItem,
    amount: prefillAmount,
    paymentMethod: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      item: prefillItem,
      amount: prefillAmount
    }));
  }, [prefillItem, prefillAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { item, amount, paymentMethod, email, firstName, lastName } = formData;

      if (!item || !paymentMethod || !email || !firstName || !lastName) {
        alert("Please fill in all fields.");
        return;
      }

      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        throw new Error('Invalid amount value');
      }

      const saleData = {
        item,
        amount: numericAmount,
        paymentMethod,
        email,
        firstName,
        lastName
      };

      const res = await fetch(`${API_BASE_URL}/api/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Sale failed');
      }

      alert('Sale successful!');
      if (onSubmit) onSubmit(saleData);

      setFormData(prev => ({
        ...prev,
        paymentMethod: '',
        email: '',
        firstName: '',
        lastName: ''
      }));

    } catch (err) {
      console.error('Submission error:', err);
      alert(err.message || 'Failed to process sale');
    }
  };

  return (
    <div className="payment-container">
      <h2>Process New Sale</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="row">
          <input 
            type="text" 
            name="item" 
            value={formData.item} 
            readOnly 
            placeholder="Product Name"
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            readOnly
            placeholder="Amount"
          />
        </div>

        <div className="select-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Method</option>
            <option value="mpesa">M-Pesa</option>
            <option value="ecocash">EcoCash</option>
            <option value="mobilebanking">Mobile Banking</option>
          </select>
        </div>

        <div className="client-info">
          <label>Client Information</label>
          <div className="single-input">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="continue-btn">
          Complete Purchase
        </button>
      </form>
    </div>
  );
}
