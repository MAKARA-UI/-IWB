import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/dashboard/FinanceDashboard.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function FinanceDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', date: '' });
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, profit: 0 });

  const fetchExpenses = async () => {
    const res = await fetch(`${API_BASE_URL}/api/finance`);
    const data = await res.json();
    setExpenses(data);
  };

  const fetchSummary = async () => {
    const res = await fetch(`${API_BASE_URL}/api/finance/summary`);
    const data = await res.json();
    setSummary(data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/api/finance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ description: '', amount: '', date: '' });
    fetchExpenses();
    fetchSummary();
  };

  const calculateTotal = () => {
    return expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0).toFixed(2);
  };

  const USD_TO_LSL = 18.30; // Example conversion rate from USD to Maloti

  return (
    <div className="finance-dashboard">
      <h2>Expense Report</h2>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Expense Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount (USD)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Expense Description</th>
              <th>Date</th>
              <th>Amount (M)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.description}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>M{(parseFloat(exp.amount) * USD_TO_LSL).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="expense-summary">
        <p>Total Expense Amount: <span className="total">M{(calculateTotal() * USD_TO_LSL).toFixed(2)}</span></p>
        <p>Non-reimbursable amount: M0.00</p>
        <p>Advance amount received: M0.00</p>
        <p className="total">Total: M{(calculateTotal() * USD_TO_LSL).toFixed(2)}</p>
      </div>

      <div className="finance-chart">
        <h3>Financial Summary (in Maloti)</h3>
        <Bar
          data={{
            labels: ['Income', 'Expenses', 'Profit'],
            datasets: [
              {
                label: 'Financial Summary (M)',
                backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
                data: [
                  (summary.totalIncome * USD_TO_LSL).toFixed(2),
                  (summary.totalExpenses * USD_TO_LSL).toFixed(2),
                  (summary.profit * USD_TO_LSL).toFixed(2)
                ]
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false }
            }
          }}
        />
      </div>
    </div>
  );
}
