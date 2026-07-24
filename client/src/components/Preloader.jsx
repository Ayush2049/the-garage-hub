import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5; // increment randomly
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-container">
      <div className="preloader-content">
        {/* Abstract car silhouette using SVG */}
        <motion.div 
          className="car-silhouette"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Chassis Outline */}
            <motion.path 
              d="M10 60 L30 40 L60 30 L120 30 L160 40 L190 60 Z" 
              stroke="url(#gradient)" 
              strokeWidth="3"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Wheels */}
            <motion.circle 
              cx="50" cy="60" r="15" 
              stroke="#00D2FF" strokeWidth="2" fill="transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle 
              cx="140" cy="60" r="15" 
              stroke="#00D2FF" strokeWidth="2" fill="transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F4F4F4" />
                <stop offset="1" stopColor="#00FFEA" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h1 
          className="preloader-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          INDORE CAR GARAGE
        </motion.h1>
        
        <motion.p 
          className="preloader-subtitle text-gradient-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Initializing Vehicle Diagnostics... {Math.min(progress, 100)}%
        </motion.p>
        
        <div className="progress-bar-container">
          <motion.div 
            className="progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
            layout
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
