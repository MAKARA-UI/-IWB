import { useState } from "react";
import '../styles/dashboard/client-dashboard.css';
import Products from "../pages/Products";
import ClientPurchaseForm from "../dashboard/ClientPurchaseForm";

export default function ClientDashboard() {
  const user = {
    name: "Client User",
    role: "client",
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBuyNow = (product) => {
    setSelectedProduct(product); // product should contain name and amount/price
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    // TODO: Submit to backend using fetch/axios
    setSelectedProduct(null); // hide form after submission
  };

  return (
    <main className="client-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>Explore and purchase our recycling services</p>
      </header>

      <section className="dashboard-content">
        {!selectedProduct ? (
          <Products userRole={user.role} onBuyNow={handleBuyNow} />
        ) : (
          <ClientPurchaseForm
            prefillItem={selectedProduct.name}
            prefillAmount={selectedProduct.price}
            onSubmit={handleFormSubmit}
          />
        )}
      </section>
    </main>
  );
}
