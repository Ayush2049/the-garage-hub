import { motion } from 'framer-motion';
import { Target, ShieldCheck, Zap } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-gradient">About Indore Car Garage</h2>
            <p className="about-description">
              We are not just mechanics; we are automotive technologists. Located in the heart of Vijay Nagar, Indore, we bring next-generation vehicle diagnostics and repair to everyday Indian car owners. 
            </p>
            <p className="about-description">
              Our state-of-the-art facility is equipped with advanced ECU scanning tools, precision alignment machines, and a clean, organized environment that reflects our commitment to premium service.
            </p>
            
            <div className="about-features">
              <div className="about-feature">
                <div className="feature-icon"><Target size={20} color="#00FFEA"/></div>
                <div>
                  <h4>Precision Diagnostics</h4>
                  <p>Eliminating guesswork with computerized scans.</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="feature-icon"><ShieldCheck size={20} color="#00D2FF"/></div>
                <div>
                  <h4>Transparent Pricing</h4>
                  <p>Honest quotes before any work begins.</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="feature-icon"><Zap size={20} color="#00FFEA"/></div>
                <div>
                  <h4>Expert Technicians</h4>
                  <p>Highly trained professionals handling your vehicle.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-stats-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="stats-grid">
              <div className="stat-box glass-panel">
                <h3 className="text-gradient-accent">5000+</h3>
                <p>Vehicles Serviced</p>
              </div>
              <div className="stat-box glass-panel">
                <h3 className="text-gradient-accent">15+</h3>
                <p>Expert Mechanics</p>
              </div>
              <div className="stat-box glass-panel">
                <h3 className="text-gradient-accent">99%</h3>
                <p>Diagnostic Accuracy</p>
              </div>
              <div className="stat-box glass-panel">
                <h3 className="text-gradient-accent">24/7</h3>
                <p>Support via WhatsApp</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
