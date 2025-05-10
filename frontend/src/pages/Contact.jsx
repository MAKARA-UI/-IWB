import { useState } from 'react';
import '../styles/pages/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <main className="contact">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have questions? Reach out to our team</p>
      </section>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Send a Message</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <div className="contact-info">
          <h2>Our Location</h2>
          <address>
            <p>123 Recycling Park</p>
            <p>Maseru, Lesotho</p>
            <br />
            <p>Email: info@iwb.co.ls</p>
            <p>Phone: +266 1234 5678</p>
          </address>
        </div>
      </div>
    </main>
  );
}