'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Stats } from './components/Stats/Stats';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorProvider } from './components/CustomCursor';
import './index.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CursorProvider>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-[#E6C65C]">
        {/* Floating Glass Navbar */}
        <Navbar />

        {/* Main Content Sections with Clear 01-05 Editorial Hierarchy */}
        <main id="main-content" className="relative">
          {/* Hero Section with 2D Architecture Studio */}
          <Hero />

          {/* Key Metrics Strip */}
          <Stats />

          {/* 01 — About Me */}
          <About />

          {/* 02 — Skills & Expertise */}
          <Skills />

          {/* 03 — Featured Projects & Case Studies */}
          <Projects />

          {/* 04 — Experience & Achievements */}
          <Experience />

          {/* 05 — Resume & Contact */}
          <Contact />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>
    </CursorProvider>
  );
}

export default App;