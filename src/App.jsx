import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeaturedSolutions from './components/FeaturedSolutions';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TechnicalExpertise from './components/TechnicalExpertise';
import TrackRecord from './components/TrackRecord';
import SocialProof from './components/SocialProof';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  useEffect(() => {
    // Smooth scroll for anchor links with sticky navbar offset
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.hash && link.hash.startsWith('#') && link.hash.length > 1) {
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          window.history.pushState(null, '', link.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Background Subtle Gradient & Grid Accents */}
      <div className="ambient-background-mesh" />
      <div className="bg-grid-overlay" />

      {/* Sticky High-End Navigation */}
      <Navbar />

      {/* Main Narrative Flow */}
      <main className="main-content-flow">
        {/* 1. Hero Section: The Hook */}
        <Hero />

        {/* 2. About Me: Who I Am, What Problems I Solve, How I Think */}
        <AboutSection />

        {/* 3. Featured Solutions: Problem, Solution, Tech, Impact Case Studies */}
        <FeaturedSolutions />

        {/* 4. Live Telemetry & BI Analytics Showcase */}
        <AnalyticsDashboard />

        {/* 5. Technical Expertise Matrix: Frontend, Backend, AI/ML, Cloud */}
        <TechnicalExpertise />

        {/* 6. Experience & Track Record: Impact-focused Accomplishments & Certifications */}
        <TrackRecord />

        {/* 7. Social Proof: Endorsements & The Strategic Redesign Statement */}
        <SocialProof />

        {/* 8. Conversion Gateway: Contact Form, Resume Download, Availability */}
        <ContactSection />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
