'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Target, BookOpen, GraduationCap, ArrowUpRight } from 'lucide-react';

const infoCards = [
  {
    icon: MapPin,
    label: 'LOCATION',
    value: 'Coimbatore, Tamil Nadu, India',
    subtext: 'Open to Remote & On-site roles',
  },
  {
    icon: Briefcase,
    label: 'ROLE',
    value: 'Full Stack & AI Developer',
    subtext: 'Web Apps, RAG & Automation',
  },
  {
    icon: Target,
    label: 'FOCUS',
    value: 'Sovereign AI & Scalable Systems',
    subtext: 'FastAPI, Next.js, ChromaDB, n8n',
  },
  {
    icon: BookOpen,
    label: 'CURRENTLY LEARNING',
    value: 'Distributed Architectures & Quantization',
    subtext: 'Targeting 300+ LeetCode DSA',
  },
];

export function About() {
  return (
    <section id="about" className="relative z-10 py-20 sm:py-24" aria-label="About Me">
      <div className="section-container">
        
        {/* Editorial 2-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading & Impact Statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="section-tag">01 / ABOUT</div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Engineering with <span className="text-[#D4AF37]">precision</span>, curiosity, and purpose.
            </h2>

            <div className="pt-4">
              <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">EDUCATION BACKGROUND</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Bachelor of Computer Applications (BCA)</h3>
                  <p className="text-xs font-mono text-[#8A8A8A] mt-0.5">KG College of Arts and Science • 2022 – 2025</p>
                </div>
                <p className="text-xs text-[#D4D4D4] leading-relaxed">
                  Solid foundation in data structures, algorithms, object-oriented programming, and relational database systems.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Info Cards */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-[#D4D4D4] leading-relaxed font-normal">
              <p>
                I am a passionate <strong className="text-white font-semibold">Full Stack Developer</strong> and <strong className="text-[#D4AF37] font-semibold">AI Automation Builder</strong> dedicated to crafting robust digital products that solve real-world problems.
              </p>
              <p>
                My engineering focus revolves around creating <strong className="text-white">intelligent full-stack web applications</strong>, deploying <strong className="text-white">sovereign air-gapped AI models</strong> that run completely offline without expensive API subscriptions, and engineering <strong className="text-white">event-driven automation pipelines</strong> that streamline complex workflows.
              </p>
              <p>
                Whether designing a high-accuracy clinical RAG triage system, building clean TypeScript web applications, or solving algorithmic challenges on LeetCode, I prioritize clean code, modular architecture, and exceptional user experiences.
              </p>
            </div>

            {/* 4 Info Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {infoCards.map((card) => (
                <div
                  key={card.label}
                  className="luxury-card p-5 space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                      {card.label}
                    </span>
                    <card.icon className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {card.value}
                  </h3>
                  <p className="text-xs text-[#8A8A8A]">
                    {card.subtext}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}