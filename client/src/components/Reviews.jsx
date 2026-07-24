import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Reviews.css';

const reviewsData = [
  {
    name: "Rahul Sharma",
    location: "Indore",
    text: "Got my Hyundai Creta serviced here. Honest pricing and timely delivery.",
    rating: 5
  },
  {
    name: "Ankit Verma",
    location: "Vijay Nagar",
    text: "My Tata Nexon AC issue was solved in a single visit.",
    rating: 5
  },
  {
    name: "Pooja Mishra",
    location: "Indore",
    text: "Very professional diagnostics and transparent communication.",
    rating: 5
  },
  {
    name: "Deepak Jain",
    location: "Scheme 54",
    text: "Wheel alignment and balancing done perfectly. The workshop is very clean.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    location: "Bhawarkua",
    text: "They treated my Swift like their own. The engine overhaul was flawless.",
    rating: 5
  },
  {
    name: "Sneha Patel",
    location: "Palasia",
    text: "Best garage in Indore. Love the transparent pricing and the high-tech equipment.",
    rating: 5
  }
];

const Reviews = () => {
  return (
    <section className="reviews-section section-padding" id="reviews">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="section-title text-gradient">Client Feedback</h2>
          <p className="services-subtitle">Trusted by vehicle owners across Indore</p>
        </div>

        <div className="reviews-3d-container">
          {reviewsData.map((review, i) => {
            // Calculate random starting positions and animation delays
            const randomX = Math.random() * 40 - 20; // -20 to 20
            const randomY = Math.random() * 40 - 20;
            const delay = i * 0.5;

            return (
              <motion.div 
                key={i}
                className="review-card glass-panel"
                initial={{ opacity: 0, y: 50, rotateX: 20, rotateY: 10 }}
                whileInView={{ 
                  opacity: 1, 
                  y: [randomY, randomY - 15, randomY],
                  x: [randomX, randomX + 10, randomX],
                  rotateX: [5, 0, 5],
                  rotateY: [-5, 0, -5]
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  opacity: { duration: 1 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
                  rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
                  rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut", delay }
                }}
                whileHover={{ scale: 1.05, zIndex: 10, rotateX: 0, rotateY: 0 }}
              >
                <div className="stars">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={16} fill="#00D2FF" color="#00D2FF" />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">
                  <span className="author-name">{review.name}</span>
                  <span className="author-loc">{review.location}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
