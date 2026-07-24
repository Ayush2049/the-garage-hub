import { motion } from 'framer-motion';
import { Wrench, Zap, ThermometerSnowflake, Disc, CircleDashed, Sparkles, Settings, Battery, Gauge } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    category: "Periodic Maintenance",
    icon: <Settings className="service-icon" />,
    items: ["Engine Oil Change", "Oil Filter Change", "Air Filter Replacement", "Fuel Filter Replacement", "Coolant Replacement"]
  },
  {
    category: "Engine Services",
    icon: <Wrench className="service-icon" />,
    items: ["Engine Repair", "Engine Overhaul", "Timing Belt Replacement", "Head Gasket Repair"]
  },
  {
    category: "Electrical",
    icon: <Zap className="service-icon" />,
    items: ["Battery Replacement", "Alternator Repair", "Starter Motor Repair", "Wiring Diagnosis"]
  },
  {
    category: "Diagnostics",
    icon: <Gauge className="service-icon" />,
    items: ["ECU Diagnostics", "OBD Scanning", "Warning Light Diagnosis", "Sensor Testing"]
  },
  {
    category: "AC Services",
    icon: <ThermometerSnowflake className="service-icon" />,
    items: ["AC Gas Refill", "Compressor Repair", "Cooling System Inspection"]
  },
  {
    category: "Brake Services",
    icon: <Disc className="service-icon" />,
    items: ["Brake Pad Replacement", "Disc Inspection", "Brake Repair"]
  },
  {
    category: "Suspension & Wheel",
    icon: <CircleDashed className="service-icon" />,
    items: ["Suspension Repair", "Shock Absorber Replacement", "Wheel Alignment", "Wheel Balancing", "Tyre Inspection"]
  },
  {
    category: "Detailing",
    icon: <Sparkles className="service-icon" />,
    items: ["Interior Cleaning", "Exterior Polishing", "Ceramic Coating", "Paint Protection"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
};

const Services = () => {
  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-title text-gradient">System Modules</h2>
          <p className="services-subtitle">Comprehensive Automotive Care & Diagnostics</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service, index) => (
            <motion.div key={index} className="service-card glass-panel" variants={cardVariants}>
              <div className="service-card-header">
                <div className="icon-wrapper">
                  {service.icon}
                </div>
                <h3 className="service-category">{service.category}</h3>
              </div>
              <ul className="service-list">
                {service.items.map((item, i) => (
                  <li key={i} className="service-item">
                    <span className="bullet"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="card-glare"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
