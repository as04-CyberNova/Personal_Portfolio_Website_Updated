import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import BentoGrid from './components/BentoGrid';
import './App.css';

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const glowRef = useRef(null);
  const mouseCoords = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const glowCoords = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    // 1. Smooth Scroll Setup & Link Click Handler
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.hash && link.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          const headerOffset = 90; // Adjust offset for fixed header navbar
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update browser history hash
          window.history.pushState(null, null, link.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 2. Scroll Listener
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Mouse Movement Glow Tracker (RequestAnimationFrame interpolation loop)
    const handleMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const updateGlowPosition = () => {
      // Snappy LERP tracking: higher factor (0.15) for faster cursor glow speed
      glowCoords.current.x += (mouseCoords.current.x - glowCoords.current.x) * 0.15;
      glowCoords.current.y += (mouseCoords.current.y - glowCoords.current.y) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.left = `${glowCoords.current.x}px`;
        glowRef.current.style.top = `${glowCoords.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(updateGlowPosition);
    };
    updateGlowPosition();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* High-performance glowing mouse cursor trail */}
      <div 
        ref={glowRef}
        id="cursor-glow" 
        style={{
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'left, top'
        }}
      />

      {/* 3D WebGL Constellation */}
      <HeroCanvas scrollY={scrollY} />

      {/* Navigation Bar */}
      <Navbar recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />

      {/* Bento Layout content wrapper */}
      <div className="layout-content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        <BentoGrid recruiterMode={recruiterMode} />
      </div>

      {/* Ambient background canvas elements */}
      <div className="ambient-canvas" />
    </div>
  );
}
