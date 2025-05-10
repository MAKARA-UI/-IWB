import { useState, useEffect } from 'react';
import '../styles/dashboard/ClientPurchaseForm.css'; // Style as needed

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
    setFormData((prev) => ({
      ...prev,
      item: prefillItem,
      amount: prefillAmount,
    }));
  }, [prefillItem, prefillAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    try {
      const res = await fetch('http://localhost:3000/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
      } else {
        alert('Purchase successful!');
        if (onSubmit) onSubmit(formData);

        // Optional: clear some fields
        setFormData((prev) => ({
          ...prev,
          paymentMethod: '',
          email: '',
          firstName: '',
          lastName: '',
        }));
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="item"
            placeholder="Pay for"
            value={formData.item}
            onChange={handleChange}
            required
            readOnly
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            readOnly
          />
        </div>

        {/* Payment Method Dropdown */}
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
            <option value="mobilebanking">Mobile banking</option>
          </select>
        </div>

        {/* Client Info */}
        <div className="client-info">
          <label>Client Info</label>
          <div className="single-input">
            <input
              type="email"
              name="email"
              placeholder="Email"
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

        <button type="submit" className="continue-btn">Continue</button>
      </form>
    </div>
  );
}
