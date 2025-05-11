import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ProductsManagement from '../components/ProductsManagement';
import ClientQueries from '../components/ClientQueries';
import SalesMetrics from '../components/SalesMetrics';
import ClientPurchaseForm from '../components/ClientPurchaseForm';
import '../styles/dashboard/SalesDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SalesDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [products, setProducts] = useState([]);
  const [queries, setQueries] = useState([]);
  const [authStatus, setAuthStatus] = useState({ 
    loading: true, 
    authenticated: false 
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/sales/verify`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('salesToken')}` 
          }
        });
        setAuthStatus({ 
          loading: false, 
          authenticated: res.ok 
        });
        if (res.ok) fetchInitialData();
      } catch (error) {
        console.error('Auth verification failed:', error);
        setAuthStatus({ 
          loading: false, 
          authenticated: false 
        });
      }
    };
    verifyAuth();
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

  if (authStatus.loading) return <div className="loading">Loading...</div>;
  if (!authStatus.authenticated) return <Navigate to="/login" />;

  return (
    <div className="sales-dashboard">
      <nav className="dashboard-nav">
        <button 
          onClick={() => setActiveTab('purchase')} 
          className={activeTab === 'purchase' ? 'active' : ''}
        >
          New Purchase
        </button>
        <button 
          onClick={() => setActiveTab('products')} 
          className={activeTab === 'products' ? 'active' : ''}
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