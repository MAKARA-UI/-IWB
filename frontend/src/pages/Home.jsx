import '../styles/pages/home.css';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <h1>Power Up Your Recycling Efforts</h1>
          <h2>Dispose of E-Waste Safely</h2>
          <p>
            IWB specializes in recycling RAM, Hard Drives, and Motherboard components 
            across Southern Africa since 2024.
          </p>
          <a href="/products" className="cta-button">Our Services</a>
        </div>
        <div className="hero-image">
        <img src="/re.jpg" alt="E-Waste Recycling" />

        </div>
      </section>
    </main>
  );
}
