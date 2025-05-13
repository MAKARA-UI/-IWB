import { useState } from 'react';
import '../styles/pages/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("You must consent to data storage.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'pending',
          date: new Date()
        })
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        consent: false
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    }
  };

  return (
    <main className="contact">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have questions? Reach out to our team</p>
      </section>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={formData.name}
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              value={formData.email}
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              value={formData.subject}
              required
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="5"
              value={formData.message}
              required
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              />{' '}
              I consent to having this website store my submitted information so they can respond to my inquiry.
            </label>
          </div>
          <button type="submit" className="submit-btn">SEND YOUR MESSAGE</button>
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

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.172058156898!2d27.47930261540115!3d-29.316222981994755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e8c58f8b7dbb5e7%3A0x3f0d8e66d77df6e3!2sMaseru%2C%20Lesotho!5e0!3m2!1sen!2sls!4v1620893408359!5m2!1sen!2sls"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
}
