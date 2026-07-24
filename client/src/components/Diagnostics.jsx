import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cpu, BatteryCharging, Disc3, Wind, Activity } from 'lucide-react';
import './Diagnostics.css';

const Diagnostics = () => {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="diagnostics-section section-padding" id="diagnostics">
      <div className="container">
        <div className="diag-header-top">
          <h2 className="section-title text-gradient">Live Diagnostics Dashboard</h2>
          <p className="services-subtitle">Real-time telemetry and system analysis simulation</p>
        </div>

        <div className="diag-dashboard">
          <div className="diag-main-panel glass-panel">
            <div className="diag-car-wireframe">
              {/* Abstract vehicle wireframe visualization */}
              <svg viewBox="0 0 400 200" className="wireframe-svg">
                <path 
                  d="M50 150 L30 100 L70 70 L150 70 L180 50 L250 50 L300 70 L350 90 L370 150 Z" 
                  fill="none" 
                  stroke="rgba(0, 255, 234, 0.3)" 
                  strokeWidth="2"
                />
                <circle cx="100" cy="150" r="30" fill="none" stroke="rgba(0, 210, 255, 0.5)" strokeWidth="2" />
                <circle cx="300" cy="150" r="30" fill="none" stroke="rgba(0, 210, 255, 0.5)" strokeWidth="2" />
                
                {/* Scanning line */}
                <motion.line 
                  x1={50 + (scanProgress * 3)} 
                  y1="30" 
                  x2={50 + (scanProgress * 3)} 
                  y2="190" 
                  stroke="#00FFEA" 
                  strokeWidth="1"
                  style={{ opacity: 0.8 }}
                />
              </svg>
            </div>
            
            <div className="diag-metrics">
              <div className="metric-box">
                <Cpu size={20} color="#00FFEA" />
                <div>
                  <span className="metric-label">Engine Health</span>
                  <span className="metric-val">98% OPTIMAL</span>
                </div>
              </div>
              <div className="metric-box">
                <BatteryCharging size={20} color="#00D2FF" />
                <div>
                  <span className="metric-label">Battery Status</span>
                  <span className="metric-val">12.6V NOMINAL</span>
                </div>
              </div>
              <div className="metric-box">
                <Disc3 size={20} color="#A9B0B7" />
                <div>
                  <span className="metric-label">Brake Condition</span>
                  <span className="metric-val">PADS OK (8MM)</span>
                </div>
              </div>
              <div className="metric-box">
                <Wind size={20} color="#00FFEA" />
                <div>
                  <span className="metric-label">AC Performance</span>
                  <span className="metric-val">5.2°C COOLING</span>
                </div>
              </div>
              <div className="metric-box">
                <Activity size={20} color="#00D2FF" />
                <div>
                  <span className="metric-label">Suspension</span>
                  <span className="metric-val">DAMPING NORMAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diagnostics;
