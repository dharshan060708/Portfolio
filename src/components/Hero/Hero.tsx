'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '../3D/Common/Canvas';
import { DeveloperWorkstation } from '../3D/DeveloperDesk/DeveloperDesk';
import { Github, Linkedin, Mail, Code2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useDeviceCapabilities } from '../../hooks';

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceCapabilities();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            const progress = 1 - Math.max(0, Math.min(1, rect.bottom / window.innerHeight));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-12 overflow-hidden bg-ambient-hero"
      aria-label="Hero"
    >
      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Text & Actions (approx 48%) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Status Pill matching reference */}
            <motion.div
              className="hero-pill inline-flex"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="hero-pill-dot" />
              <span>AI DEVELOPER & AUTOMATION BUILDER</span>
            </motion.div>

            {/* Main Headline matching reference */}
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.05] text-[#F5F5F5]">
                DHARSHAN
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.05] text-[#D6A63A]">
                VELUMANI
              </h1>
            </motion.div>

            {/* Subtitle description */}
            <motion.p
              className="text-[#A7A7A7] text-base sm:text-lg leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              I build intelligent web apps, automate workflows and solve real-world problems with code.
            </motion.p>

            {/* Action Buttons matching reference */}
            <motion.div
              className="flex flex-wrap items-center gap-3.5 pt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-gold"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://github.com/dharshan060708"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <span>View GitHub</span>
                <Github className="w-4 h-4 ml-1" />
              </a>
            </motion.div>

            {/* Social Icons row matching reference */}
            <motion.div
              className="flex items-center gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.4 }}
            >
              <a
                href="https://github.com/dharshan060708"
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/dharshan-v-121341369/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:dharshanvelumani06@gmail.com"
                className="social-chip"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://leetcode.com/u/efImqpWfmd/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-chip"
                aria-label="LeetCode Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Developer Workstation (approx 52%) */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
            <Canvas
              cameraPosition={[0, 0.28, isMobile ? 5.8 : 4.8]}
              fov={isMobile ? 48 : 39}
              className="w-full h-full"
            >
              <DeveloperWorkstation scrollProgress={scrollProgress} />
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
}