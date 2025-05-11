import { useState, useEffect } from 'react';
import ProductsManagement from '../components/ProductsManagement';
import ClientQueries from '../components/ClientQueries';
import SalesMetrics from '../components/SalesMetrics';
import ClientPurchaseForm from '../dashboard/ClientPurchaseForm';
import '../styles/dashboard/SalesDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SalesDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [products, setProducts] = useState([]);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [productsRes, queriesRes, revenueRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/products`),
        fetch(`${API_BASE_URL}/api/queries`),
        fetch(`${API_BASE_URL}/api/revenue`)
      ]);
      
      if (!productsRes.ok || !queriesRes.ok || !revenueRes.ok) {
        throw new Error('Failed to fetch initial data');
      }
      
      setProducts(await productsRes.json());
      setQueries(await queriesRes.json());
      setTotalRevenue((await revenueRes.json()).total);
    } catch (error) {
      console.error('Initial data error:', error);
      alert('Failed to load data. Please refresh.');
    }
  };

  const handlePurchaseAlert = async (purchaseData) => {
    try {
      if (!purchaseData?.item || typeof purchaseData.amount !== 'number') {
        throw new Error('Invalid purchase data');
      }

      const purchaseRes = await fetch(`${API_BASE_URL}/api/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseData)
      });

      if (!purchaseRes.ok) {
        const errorData = await purchaseRes.json();
        throw new Error(errorData.error || 'Purchase failed');
      }

      const [productsRes, revenueRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/products`),
        fetch(`${API_BASE_URL}/api/revenue`)
      ]);

      if (!productsRes.ok || !revenueRes.ok) {
        throw new Error('Failed to refresh data');
      }

      setProducts(await productsRes.json());
      setTotalRevenue((await revenueRes.json()).total);
      
      alert(`Purchase successful: ${purchaseData.item}`);

    } catch (error) {
      console.error('Purchase Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="sales-dashboard">
      <nav className="dashboard-nav">
        <button 
          onClick={() => setActiveTab('purchase')} 
          className={activeTab === 'purchase' ? 'active' : ''}
        >
       
          Manage Products
        </button>
        <button 
          onClick={() => setActiveTab('queries')} 
          className={activeTab === 'queries' ? 'active' : ''}
        >
          Client Queries ({queries.filter(q => q.status === 'pending').length})
        </button>
        <button 
          onClick={() => setActiveTab('metrics')} 
          className={activeTab === 'metrics' ? 'active' : ''}
        >
          Sales Metrics
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'purchase' && (
          <ClientPurchaseForm 
            onSubmit={handlePurchaseAlert}
            prefillItem=""
            prefillAmount=""
          />
        )}
        {activeTab === 'products' && (
          <ProductsManagement refreshData={fetchInitialData} />
        )}
        {activeTab === 'queries' && (
          <ClientQueries queries={queries} setQueries={setQueries} />
        )}
        {activeTab === 'metrics' && (
          <SalesMetrics 
            totalRevenue={totalRevenue} 
            products={products} 
          />
        )}
      </div>
    </div>
  );
}
