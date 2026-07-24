import { motion } from 'framer-motion';
import { ChevronRight, Phone, MessageCircle, MapPin } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      {/* Background Image with Overlay */}
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1632732997184-cc0937a4e69b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Professional Car Garage" 
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content-wrapper">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="badge-dot"></span>
            NEXT-GEN AUTOMOTIVE DIAGNOSTICS
          </motion.div>
          
          <h1 className="hero-title">
            <span className="text-gradient">INDORE CAR</span> GARAGE
          </h1>
          
          <p className="hero-subtitle">
            Professional Vehicle Repair, Diagnostics & Maintenance Services in Indore
          </p>
          
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => document.getElementById('services').scrollIntoView({behavior: 'smooth'})}>
              Book Service <ChevronRight size={18} />
            </button>
            <a href="https://wa.me/918770018340" target="_blank" rel="noreferrer" className="btn-secondary whatsapp-btn">
              <MessageCircle size={18} /> WhatsApp Now
            </a>
            <a href="tel:+918770018340" className="btn-secondary">
              <Phone size={18} /> Call Garage
            </a>
            <a href="https://maps.google.com/?q=Behind+C21+Mall,+Vijay+Nagar,+Indore" target="_blank" rel="noreferrer" className="btn-secondary">
              <MapPin size={18} /> Get Directions
            </a>
          </div>
        </motion.div>

        {/* Abstract Diagnostic Elements */}
        <motion.div 
          className="hero-diagnostics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="diagnostic-box glass-panel">
            <div className="diag-header">SYSTEM STATUS</div>
            <div className="diag-row">
              <span>ECU Connection</span>
              <span className="diag-status ok">SECURE</span>
            </div>
            <div className="diag-row">
              <span>Diagnostics</span>
              <span className="diag-status active">SCANNING</span>
            </div>
            <div className="diag-bar-container">
              <motion.div 
                className="diag-bar"
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
