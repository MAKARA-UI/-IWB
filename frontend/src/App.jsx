import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Dashboards
import ClientDashboard from './dashboard/ClientDashboard';
import SalesDashboard from './dashboard/SalesDashboard';
import DeveloperDashboard from './dashboard/DeveloperDashboard';
import InvestorDashboard from './dashboard/InvestorDashboard';
import FinanceDashboard from './dashboard/FinanceDashboard';
import PartnerDashboard from './dashboard/PartnerDashboard';

import './styles/index.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Role-based dashboards */}
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/dashboard/sales" element={<SalesDashboard />} />
            <Route path="/dashboard/developer" element={<DeveloperDashboard />} />
            <Route path="/dashboard/investor" element={<InvestorDashboard />} />
            <Route path="/dashboard/finance" element={<FinanceDashboard />} />
            <Route path="/dashboard/partner" element={<PartnerDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
