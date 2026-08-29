'use client';

import React from 'react';
import { Github, Linkedin, Mail, Code2, ArrowUp } from 'lucide-react';
import { profiles } from '../data';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const githubLink = profiles.find((p) => p.name === 'GitHub')?.url || 'https://github.com/dharshan060708';
  const linkedinLink = profiles.find((p) => p.name === 'LinkedIn')?.url || 'https://www.linkedin.com/in/dharshan-v-121341369/';
  const leetcodeLink = profiles.find((p) => p.name === 'LeetCode')?.url || 'https://leetcode.com/u/efImqpWfmd/';

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#050505] py-12 sm:py-16 text-[#8A8A8A]">
      <div className="section-container space-y-10">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-white font-mono tracking-tight">
              DHARSHAN VELUMANI<span className="text-[#D4AF37]">.</span>
            </h4>
            <p className="text-xs font-mono text-[#8A8A8A]">
              Full Stack & AI Developer • Coimbatore, India
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-chip"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={linkedinLink}
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
              href={leetcodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-chip"
              aria-label="LeetCode Profile"
            >
              <Code2 className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#8A8A8A] text-center sm:text-left">
            © 2026 Dharshan Velumani. Crafted with React, TypeScript & Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}