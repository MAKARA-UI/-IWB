import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import '../styles/dashboard/SalesMetrics.css';

export default function SalesMetrics({ totalRevenue, productStock }) {
  const productData = Object.entries(productStock).map(([name, stock]) => ({
    name,
    stock,
    revenue: (stock * 100) // Replace with actual revenue calculation
  }));

  const monthlyData = [
    { month: 'Jan', revenue: 500000 },
    { month: 'Feb', revenue: 750000 },
    // Add more months with actual data
  ];

  return (
    <div className="sales-metrics">
      <h2>Sales Dashboard</h2>
      
      <div className="summary-cards">
        <div className="card total-revenue">
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toLocaleString()}</p>
        </div>
        
        <div className="card top-product">
          <h3>Most Stock Available</h3>
          <p>{Object.entries(productStock).sort((a, b) => b[1] - a[1])[0]?.[0]}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h4>Revenue by Product</h4>
          <BarChart width={500} height={300} data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="chart-container">
          <h4>Monthly Revenue Trend</h4>
          <LineChart width={500} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}