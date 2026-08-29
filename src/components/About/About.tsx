'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Terminal, ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import { education, achievements, profiles } from '../../data';

export function About() {
  const edu = education[0] || {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'KG College of Arts and Science',
    location: 'Coimbatore, Tamil Nadu',
    startYear: 2022,
    endYear: 2025,
  };

  const hackerrankLink = profiles.find((p) => p.name === 'HackerRank')?.url || 'https://www.hackerrank.com/profile/dharshanvelumani';
  const leetcodeLink = profiles.find((p) => p.name === 'LeetCode')?.url || 'https://leetcode.com/u/efImqpWfmd/';

  return (
    <section id="about" className="relative z-10 py-16 sm:py-20" aria-labelledby="about-heading">
      <div className="section-container">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <div className="section-heading mb-2">
            ABOUT ME
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Background & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F5]">
              Building intelligent systems with focus on <span className="text-[#D6A63A]">depth, speed & reliability</span>.
            </h3>
            
            <p className="text-[#A7A7A7] text-sm sm:text-base leading-relaxed">
              I am a final-year BCA student at <strong>{edu.institution}</strong> ({edu.location}), specializing in applied AI systems, Retrieval-Augmented Generation (RAG) pipelines, local LLM infrastructure, and event-driven automation.
            </p>

            <p className="text-[#A7A7A7] text-sm sm:text-base leading-relaxed">
              My engineering focus is on creating sovereign, high-utility software — from offline GGUF model runners requiring zero external dependencies to automated webhook triage workflows and citation-backed healthcare assistants.
            </p>

            {/* Core Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#0B0D0F] p-4 rounded-xl border border-white/5 space-y-1.5">
                <Cpu className="w-5 h-5 text-[#1683FF]" />
                <h4 className="text-sm font-semibold text-[#F5F5F5]">Applied AI</h4>
                <p className="text-xs text-[#A7A7A7]">RAG, Local LLMs, Vector DBs</p>
              </div>

              <div className="bg-[#0B0D0F] p-4 rounded-xl border border-white/5 space-y-1.5">
                <Terminal className="w-5 h-5 text-[#D6A63A]" />
                <h4 className="text-sm font-semibold text-[#F5F5F5]">Automation</h4>
                <p className="text-xs text-[#A7A7A7]">n8n, Webhooks, Python APIs</p>
              </div>

              <div className="bg-[#0B0D0F] p-4 rounded-xl border border-white/5 space-y-1.5">
                <ShieldCheck className="w-5 h-5 text-[#27C93F]" />
                <h4 className="text-sm font-semibold text-[#F5F5F5]">Reliability</h4>
                <p className="text-xs text-[#A7A7A7]">Tested, Typed, Air-gapped</p>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Developer Spec Card */}
          <div className="lg:col-span-5">
            <motion.div
              className="reference-card p-6 sm:p-7 space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#D6A63A] uppercase tracking-wider">DEVELOPER SPEC</span>
                  <h4 className="text-lg font-bold text-[#F5F5F5]">Dharshan Velumani</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-mono">
                  OPEN TO WORK
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#A7A7A7]">
                  <span>Degree</span>
                  <span className="text-[#F5F5F5] font-medium">{edu.degree}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#A7A7A7]">
                  <span>Institution</span>
                  <span className="text-[#F5F5F5] font-medium">{edu.institution}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#A7A7A7]">
                  <span>Timeline</span>
                  <span className="text-[#F5F5F5] font-medium">{edu.startYear} – {edu.endYear}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5 text-[#A7A7A7]">
                  <span>Primary Stack</span>
                  <span className="text-[#F2C45E] font-medium">Python • TypeScript • Next.js</span>
                </div>
              </div>

              {/* Verified Profiles */}
              <div className="pt-2">
                <p className="text-[11px] font-mono text-[#6F7378] uppercase mb-2">Verified Profiles</p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={hackerrankLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#101215] border border-white/5 hover:border-[#D6A63A]/40 text-xs font-medium text-[#A7A7A7] hover:text-[#F5F5F5] transition-colors flex items-center justify-between"
                  >
                    <span>HackerRank</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D6A63A]" />
                  </a>
                  <a
                    href={leetcodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#101215] border border-white/5 hover:border-[#D6A63A]/40 text-xs font-medium text-[#A7A7A7] hover:text-[#F5F5F5] transition-colors flex items-center justify-between"
                  >
                    <span>LeetCode (50 Solved)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D6A63A]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}