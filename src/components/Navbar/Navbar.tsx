'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils';
import { useDeviceCapabilities } from '../../hooks';

const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'dsa', label: 'DSA', href: '#dsa' },
  { id: 'github', label: 'GitHub', href: '#github' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sections = navLinks
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-70px 0px -40% 0px' }
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#050607]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
          : 'bg-transparent py-5'
      )}
      style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 1rem)' }}
    >
      <div className="section-container flex items-center justify-between">
        {/* Brand Logo matching reference */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#home');
          }}
          className="flex items-center gap-2.5 group"
          aria-label="Dharshan Velumani - Home"
        >
          {/* Stylized DV geometric monogram */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D6A63A] via-[#F2C45E] to-[#B88A2E] flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6L9 18L12 11L15 18L20 6"
                stroke="#050607"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-semibold text-base sm:text-lg tracking-tight text-[#F5F5F5] group-hover:text-[#F2C45E] transition-colors">
            Dharshan Velumani
          </span>
        </a>

        {/* Center / Right Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive ? 'text-[#F2C45E]' : 'text-[#A7A7A7] hover:text-[#F5F5F5]'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Far Right "Let's Connect" Button matching reference */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-4 py-2 text-xs font-medium text-[#F5F5F5] bg-[#0B0D0F] border border-white/10 hover:border-[#D6A63A]/50 hover:text-[#F2C45E] rounded-btn transition-all duration-200"
          >
            Let's Connect
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#0B0D0F] border border-white/10 text-[#A7A7A7] hover:text-[#F5F5F5] transition-colors"
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#050607]/98 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'text-[#F2C45E] bg-[#0B0D0F] border border-[#D6A63A]/30'
                        : 'text-[#A7A7A7] hover:text-[#F5F5F5] hover:bg-[#0B0D0F]'
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-gold w-full"
              >
                Let's Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}