import { useState, useEffect } from 'react';
import '../styles/dashboard/FinanceDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FinanceDashboard() {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', date: '' });

  const fetchIncome = async () => {
    const res = await fetch(`${API_BASE_URL}/api/finance`);
    const data = await res.json();
    setIncomes(data);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/api/finance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ description: '', amount: '', date: '' });
    fetchIncome();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE_URL}/api/finance/${id}`, { method: 'DELETE' });
    fetchIncome();
  };

  return (
    <div className="finance-dashboard">
      <h2>Finance Dashboard</h2>

      <form onSubmit={handleSubmit} className="income-form">
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button type="submit">Add Income</button>
      </form>

      <div className="income-list">
        {incomes.map(income => (
          <div key={income._id} className="income-entry">
            <p><strong>{income.description}</strong></p>
            <p>Amount: ${income.amount}</p>
            <p>Date: {new Date(income.date).toLocaleDateString()}</p>
            <button onClick={() => handleDelete(income._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
