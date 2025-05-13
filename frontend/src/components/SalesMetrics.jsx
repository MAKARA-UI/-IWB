import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from 'recharts';
import '../styles/components/SalesMetrics.css';

export default function SalesMetrics({ totalRevenue, products }) {
  const [summaryData, setSummaryData] = useState([]);
  const [filter, setFilter] = useState('monthly');

  useEffect(() => {
    fetchSummary(filter);
  }, [filter]);

  const fetchSummary = async (type) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sales/summary?type=${type}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setSummaryData(data);
    } catch (err) {
      console.error('Summary fetch error:', err);
    }
  };

  return (
    <div className="sales-metrics">
      <h2>Sales Metrics</h2>
      <div className="metric-box">Total Revenue: M{totalRevenue.toFixed(2)}</div>

      <h3>Units Sold per Product</h3>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.item}>
              <td>{p.item}</td>
              <td>{p.unitsSold}</td>
              <td>M{p.totalRevenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Sales Trends</h3>
      <div className="filter-buttons">
        <button onClick={() => setFilter('daily')} className={filter === 'daily' ? 'active' : ''}>Daily</button>
        <button onClick={() => setFilter('weekly')} className={filter === 'weekly' ? 'active' : ''}>Weekly</button>
        <button onClick={() => setFilter('monthly')} className={filter === 'monthly' ? 'active' : ''}>Monthly</button>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="units" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
