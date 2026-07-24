import { motion } from 'framer-motion';
import './Gallery.css';

const images = [
  { src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Mechanic working" },
  { src: "https://images.unsplash.com/photo-1503375894056-1eb6ee0626ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Clean garage" },
  { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Engine detail" },
  { src: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Suspension / Wheel" },
  { src: "https://images.unsplash.com/photo-1625047509168-a7006f815469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Modern diagnostics" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Premium service bay" }
];

const Gallery = () => {
  return (
    <section className="gallery-section section-padding" id="gallery">
      <div className="container">
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <h2 className="section-title text-gradient">Facility Gallery</h2>
          <p className="services-subtitle">A glimpse into our advanced diagnostic and repair center</p>
        </div>

        <div className="gallery-grid">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              className="gallery-item glass-panel"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <img src={img.src} alt={img.alt} className="gallery-image" loading="lazy" />
              <div className="gallery-overlay">
                <span>{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
