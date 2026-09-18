import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import './App.css';

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Smooth Scroll Setup & Link Click Handler
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.hash && link.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          window.history.pushState(null, null, link.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Background Subtle Grid Accent */}
      <div className="bg-grid-overlay" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className="layout-content-wrapper">
        <BentoGrid />
      </div>
    </div>
  );
}

