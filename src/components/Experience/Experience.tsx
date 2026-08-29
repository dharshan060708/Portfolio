'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Code2, GitBranch, Trophy, Star, ArrowUpRight } from 'lucide-react';
import { achievements } from '../../data';

const timelineItems = [
  {
    year: '2022 — 2025',
    title: 'Bachelor of Computer Applications (BCA)',
    organization: 'KG College of Arts and Science, Coimbatore',
    category: 'EDUCATION',
    description:
      'Rigorous academic coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems (SQL), and Software Engineering methodologies.',
    highlight: 'Graduation Year: 2025',
  },
  {
    year: '2024',
    title: 'Project Competition 2nd Runner Up',
    organization: 'KG College Technical Symposium',
    category: 'ACHIEVEMENT',
    description:
      'Awarded 2nd Runner Up for conceptualizing and developing an end-to-end full-stack software application demonstrating practical architecture and database optimization.',
    highlight: 'Award & Certificate of Merit',
  },
  {
    year: '2024 — Present',
    title: 'Algorithmic Problem Solving & Data Structures',
    organization: 'LeetCode & HackerRank',
    category: 'DSA & LOGIC',
    description:
      'Consistently solving algorithmic challenges across Arrays, Two Pointers, Trees, Dynamic Programming, and SQL. 50 verified problems solved (41 Python3, 5 Java, 4 MySQL) with an active roadmap to 300+.',
    highlight: '50 Verified Solved • Goal 300+',
  },
  {
    year: '2024 — Present',
    title: 'Open Source AI Systems & Automation Engineering',
    organization: 'Independent Architecture Research',
    category: 'OPEN SOURCE',
    description:
      'Engineered and released production-grade open-source systems including Meridian (Clinical RAG engine), Devil-In (Offline GGUF local AI launcher), and n8n event-driven automation pipelines.',
    highlight: '6 Public Repositories',
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative z-10 py-20 sm:py-24" aria-label="Experience & Achievements">
      <div className="section-container">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="section-tag">04 / EXPERIENCE</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Academic milestones, <span className="text-[#D4AF37]">awards</span>, and journey.
          </h2>
        </div>

        {/* 2 Achievement Headline Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16">
          
          <motion.div
            className="luxury-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-[#0D0D0D] to-[#141414]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3 text-[#D4AF37] mb-3">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">PROJECT COMPETITION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-2">
              2ND RUNNER UP
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
              Recognized in college-wide project symposium for outstanding software engineering and architectural execution.
            </p>
          </motion.div>

          <motion.div
            className="luxury-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-[#0D0D0D] to-[#141414]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 text-[#1683FF] mb-3">
              <Code2 className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">LEETCODE MILESTONE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-2">
              50 PROBLEMS SOLVED
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
              41 Python3 • 5 Java • 4 MySQL. Actively advancing algorithmic problem-solving skills toward 300+ target.
            </p>
          </motion.div>

        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-white/[0.08] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          {timelineItems.map((item, idx) => (
            <motion.div
              key={item.title}
              className="relative group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              {/* Gold Node Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#050505] border-2 border-[#D4AF37] group-hover:scale-125 transition-transform" />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-[#141414] border border-white/10 text-xs font-mono text-[#D4AF37] font-bold">
                    {item.year}
                  </span>
                  <span className="text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#E6C65C] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm font-mono text-[#8A8A8A]">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm text-[#D4D4D4] leading-relaxed max-w-3xl pt-1">
                  {item.description}
                </p>

                <div className="pt-2">
                  <span className="inline-block text-xs font-mono text-[#D4AF37]">
                    ✓ {item.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
