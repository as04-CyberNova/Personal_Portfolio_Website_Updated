import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import BentoGrid from './components/BentoGrid';
import './App.css';

export default function App() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Glowing mouse cursor background trail */}
      <div 
        id="cursor-glow" 
        style={{
          position: 'fixed',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'left 0.15s cubic-bezier(0.25, 1, 0.5, 1), top 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
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
