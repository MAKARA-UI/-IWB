// src/dashboard/InvestorDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard/InvestorDashboard.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function InvestorDashboard() {
  const [incomes, setIncomes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'investor') {
      return navigate('/login');
    }
    fetchIncome();
  }, [navigate]);

  const fetchIncome = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/api/finance/income`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.status === 403 || res.status === 401) {
      return alert('Access Denied');
    }
    const data = await res.json();
    setIncomes(data);
  };

  return (
    <div className="investor-dashboard">
      <h1>Investor View</h1>
      <p>Read-only access to income statements</p>
      <table className="income-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount (USD)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((inc) => (
            <tr key={inc._id}>
              <td>{inc.description}</td>
              <td>${inc.amount.toFixed(2)}</td>
              <td>{new Date(inc.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
