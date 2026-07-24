import { MapPin, Phone, MessageCircle, Calendar } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="section-title text-gradient">Headquarters</h2>
          <p className="services-subtitle">Visit our advanced diagnostics center in Indore</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info glass-panel">
            <h3 className="contact-name">INDORE CAR GARAGE</h3>
            
            <div className="contact-detail">
              <div className="contact-icon"><MapPin size={24} color="#00FFEA" /></div>
              <div>
                <h4>Location</h4>
                <p>Behind C21 Mall, Vijay Nagar<br/>Indore, Madhya Pradesh 452010</p>
              </div>
            </div>
            
            <div className="contact-detail">
              <div className="contact-icon"><Phone size={24} color="#00D2FF" /></div>
              <div>
                <h4>Contact</h4>
                <p>+91 87700 18340</p>
              </div>
            </div>
            
            <div className="contact-actions">
              <a href="tel:+918770018340" className="btn-primary" style={{ width: '100%' }}>
                <Phone size={18} /> Call Now
              </a>
              <a href="https://wa.me/918770018340" target="_blank" rel="noreferrer" className="btn-secondary" style={{ width: '100%', borderColor: '#25D366', color: '#25D366' }}>
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a href="/appointment" className="btn-secondary" style={{ width: '100%' }}>
                <Calendar size={18} /> Book Service
              </a>
              <a href="https://maps.google.com/?q=Behind+C21+Mall,+Vijay+Nagar,+Indore" target="_blank" rel="noreferrer" className="btn-secondary" style={{ width: '100%' }}>
                <MapPin size={18} /> Navigate
              </a>
            </div>
          </div>

          <div className="contact-map glass-panel">
            <iframe 
              src="https://maps.google.com/maps?q=C21+Mall,+Vijay+Nagar,+Indore&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '8px', minHeight: '400px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Indore Car Garage Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
