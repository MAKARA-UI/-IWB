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
          <p>
            Have you ever thought about what happens to your laptop, phone, speakers, keyboard, 
            printer, and other electronics when they stop working? If not recycled properly, they 
            can end up in landfills, polluting the environment and harming people and animals.
          </p>
          <p>
            E-waste is a big and growing problem around the world. Because new electronics come out 
            quickly, many people throw away their old devices after only a few years. In 2019, the 
            world created 53.6 million tonnes of e-waste. That’s about 7.3 kilograms for every person — 
            the same weight as 350 cruise ships.
          </p>
          <p>
            How can you get rid of your old electronics in Lesotho? Just contact IWB, Lesotho's 
            trusted e-waste recycler.
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
