import '../styles/pages/about.css';

export default function About() {
  return (
    <main className="about">
      <section className="about-hero">
        <h1>About IWB</h1>
        <p>Pioneering electronic recycling in Southern Africa</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2024 with M100,000 capital by Kenneth and Shadrack, 
            IWB has become a leader in responsible e-waste management.
          </p>
          <p>
            We specialize in recycling RAM, Hard Drives, and Motherboard components, 
            serving clients across Lesotho and neighboring regions.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-card">
            <span>1000+</span>
            <p>Components recycled monthly</p>
          </div>
          <div className="stat-card">
            <span>12</span>
            <p>Dedicated employees</p>
          </div>
          <div className="stat-card">
            <span>100%</span>
            <p>Data destruction guarantee</p>
          </div>
        </div>
      </section>
    </main>
  );
}