'use client';

import React from 'react';
import { Github, Linkedin, Mail, Code2, Award, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 py-10 bg-[#050607]">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: DV — Dharshan Velumani */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D6A63A] via-[#F2C45E] to-[#B88A2E] flex items-center justify-center shadow-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6L9 18L12 11L15 18L20 6"
                  stroke="#050607"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#F5F5F5]">
              DV — Dharshan Velumani
            </span>
          </div>

          {/* Center/Right: Profiles List matching reference */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#A7A7A7]">
            <a
              href="https://github.com/dharshan060708"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2C45E] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://leetcode.com/u/efImqpWfmd/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2C45E] transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>LeetCode</span>
            </a>

            <a
              href="https://www.hackerrank.com/profile/dharshanvelumani"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2C45E] transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>HackerRank</span>
            </a>

            <a
              href="https://www.linkedin.com/in/dharshan-v-121341369/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2C45E] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:dharshanvelumani06@gmail.com"
              className="hover:text-[#F2C45E] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>

          {/* Right / Top Button */}
          <button
            onClick={scrollToTop}
            className="text-xs text-[#6F7378] hover:text-[#D6A63A] transition-colors flex items-center gap-1 p-1"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-[#6F7378] font-mono">
          © {currentYear} Dharshan Velumani. All rights reserved.
        </div>
      </div>
    </footer>
  );
}