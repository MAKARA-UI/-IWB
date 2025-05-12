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
          status: 'pending', // Default
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
            <input type="text" value={formData.name} required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" value={formData.email} required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" value={formData.subject} required
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" value={formData.message} required
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              />
              {' '}
              I consent to having this website store my submitted information so they can respond to my inquiry.
            </label>
          </div>
          <button type="submit" className="submit-btn">SEND YOUR MESSAGE</button>
        </form>
      </div>
    </main>
  );
}
