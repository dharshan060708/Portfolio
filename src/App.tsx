'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Stats } from './components/Stats/Stats';
import { Technologies } from './components/Technologies/Technologies';
import { Projects } from './components/Projects/Projects';
import { DSAGitHub } from './components/DSAGitHub/DSAGitHub';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
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

      <div className="relative min-h-screen bg-[#050607] text-[#F5F5F5] selection:bg-[#D6A63A]/30 selection:text-[#F2C45E]">
        {/* Fixed Navigation Bar */}
        <Navbar />

        {/* Main Content Sections matching the exact sequence of the design reference */}
        <main id="main-content" className="relative">
          {/* 1. Hero with 3D Developer Workstation */}
          <Hero />

          {/* 2. Horizontal Stats Strip */}
          <Stats />

          {/* 3. Technologies Strip */}
          <Technologies />

          {/* 4. Featured Projects Grid */}
          <Projects />

          {/* 5. DSA Journey & GitHub Activity (Side-by-Side) */}
          <DSAGitHub />

          {/* 6. About Me */}
          <About />

          {/* 7. Technical Skills Matrix */}
          <Skills />

          {/* 8. Let's Build Something CTA & Contact */}
          <Contact />
        </main>

        {/* Minimal Footer */}
        <Footer />
      </div>
    </CursorProvider>
  );
}

export default App;