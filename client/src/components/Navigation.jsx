import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/#services' },
  { name: 'Diagnostics', path: '/#diagnostics' },
  { name: 'Gallery', path: '/#gallery' },
  { name: 'Reviews', path: '/#reviews' },
  { name: 'About Us', path: '/#about' },
  { name: 'Appointment', path: '/appointment' },
  { name: 'Location', path: '/#location' },
  { name: 'Contact', path: '/#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navigation ${isScrolled ? 'nav-scrolled' : ''} glass-panel`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo text-gradient">
          INDORE CAR GARAGE
        </Link>

        <div className="nav-desktop">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`nav-link ${location.pathname === link.path && !location.hash ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button 
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X color="#00FFEA" /> : <Menu color="#00FFEA" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu glass-panel ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path}
            className="nav-mobile-link"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
