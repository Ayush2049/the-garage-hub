import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// We will create these components next
import Preloader from './components/Preloader';
import Global3DBackground from './components/Global3DBackground';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Chatbot from './components/Chatbot';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loading experience
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <div className="app-container">
          <div className="global-3d-canvas-container">
            <Global3DBackground />
          </div>
          
          <div className="content-layer">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointment" element={<Appointment />} />
            </Routes>
            <Chatbot />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
