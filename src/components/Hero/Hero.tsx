'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, ArrowRight, ArrowUpRight, Terminal, CheckCircle2, Copy, Sparkles, ChevronDown } from 'lucide-react';
import { profiles } from '../../data';

const codeSnippets = [
  {
    id: 'rag',
    filename: 'meridian_rag.py',
    badge: 'HEALTHCARE RAG',
    runtime: 'Python 3.11',
    code: `import fastapi, chromadb
from core.ai import ClinicalEngine

# Sovereign clinical AI retrieval engine
engine = ClinicalEngine({
    "model": "llama-3.2-3b-instruct",
    "vector_db": "clinical_chroma",
    "citations": ["PubMed", "WHO_ICD11"],
    "offline_mode": True,
})

@app.post("/api/triage")
async def analyze_symptoms(payload: TriageQuery):
    context = await engine.retrieve(payload.query)
    assessment = await engine.evaluate(context)
    return {
        "risk_level": assessment.level,
        "recommended_action": assessment.triage,
        "verified_citations": assessment.sources,
    }`,
  },
  {
    id: 'devil-in',
    filename: 'devil_in_launcher.bat',
    badge: 'LOCAL OFFLINE AI',
    runtime: 'C++ / AVX2',
    code: `@echo off
title DEVIL-IN AIR-GAPPED AI RUNTIME
echo [SYSTEM] Verifying hardware environment...
echo [SYSTEM] AVX2 hardware acceleration detected.

:: Launch quantized GGUF inference server on localhost
llama-server.exe ^
  --model ./models/llama-3.2-3b-q4_k_m.gguf ^
  --port 8080 ^
  --ctx-size 4096 ^
  --n-gpu-layers 0

echo [READY] 100% Air-Gapped • Local API active at http://127.0.0.1:8080`,
  },
  {
    id: 'n8n',
    filename: 'lead_pipeline.ts',
    badge: 'EVENT AUTOMATION',
    runtime: 'TypeScript / n8n',
    code: `import { WebhookEvent, OllamaTriage } from '@/automation';

export async function processInboundLead(event: WebhookEvent) {
  // Validate incoming payload
  const lead = validateLeadSchema(event.body);

  // Intent classification via local LLM
  const analysis = await OllamaTriage.classify({
    message: lead.message,
    model: 'llama3:latest',
  });

  // Automated CRM creation & instant Telegram alert
  await Promise.all([
    CRM.createContact({ ...lead, score: analysis.score }),
    Telegram.notify(\`🚨 New Lead (\${analysis.urgency}): \${lead.name}\`),
  ]);
}`,
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentSnippet = codeSnippets[activeTab];
  const githubLink = profiles.find((p) => p.name === 'GitHub')?.url || 'https://github.com/dharshan060708';
  const linkedinLink = profiles.find((p) => p.name === 'LinkedIn')?.url || 'https://www.linkedin.com/in/dharshan-v-121341369/';
  const leetcodeLink = profiles.find((p) => p.name === 'LeetCode')?.url || 'https://leetcode.com/u/efImqpWfmd/';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-ambient-hero bg-grid-pattern"
      aria-label="Hero"
    >
      <div className="section-container relative z-10 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (approx 52%) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Small Label matching requested structure */}
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0D0D] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>FULL STACK & AI DEVELOPER</span>
            </motion.div>

            {/* Large Dominant Headline */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight leading-[1.08] text-white">
                Building <span className="text-[#D4AF37]">Digital Experiences</span> That Matter.
              </h1>
            </motion.div>

            {/* Actual Name & Identity Statement */}
            <motion.div
              className="space-y-2 pt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm font-mono tracking-widest text-[#D4AF37] uppercase">
                DHARSHAN VELUMANI
              </p>
              <p className="text-[#D4D4D4] text-base sm:text-lg leading-relaxed max-w-lg">
                Building modern web applications, AI-powered solutions, and sovereign automation systems with clean, production-grade architecture.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-3.5 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => scrollTo('projects')}
                className="btn-gold"
              >
                <span>VIEW PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <span>VIEW GITHUB</span>
                <Github className="w-4 h-4 ml-1 text-[#D4AF37]" />
              </a>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              className="flex items-center gap-3 pt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
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
            </motion.div>
          </div>

          {/* Right Column: Sophisticated 2D Developer Architecture Studio (48%) */}
          <motion.div
            className="lg:col-span-6 w-full"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="luxury-card overflow-hidden shadow-2xl border border-white/10">
              
              {/* Window Title Bar with Tab Selectors */}
              <div className="bg-[#111111] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[260px] sm:max-w-md scrollbar-none">
                  {codeSnippets.map((snippet, idx) => (
                    <button
                      key={snippet.id}
                      onClick={() => setActiveTab(idx)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                        activeTab === idx
                          ? 'bg-[#1A1A1A] text-[#E6C65C] border border-[#D4AF37]/30'
                          : 'text-[#8A8A8A] hover:text-white hover:bg-[#151515]'
                      }`}
                    >
                      {snippet.filename}
                    </button>
                  ))}
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-white/5 text-[#8A8A8A] hover:text-white transition-colors"
                  aria-label="Copy snippet"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[#D4D4D4] overflow-x-auto min-h-[270px] bg-[#080808]">
                <pre className="text-left font-mono">
                  <code>{currentSnippet.code}</code>
                </pre>
              </div>

              {/* Status Bar */}
              <div className="bg-[#111111] border-t border-white/5 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-[#8A8A8A]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white font-medium">{currentSnippet.badge}</span>
                  <span className="hidden sm:inline">• {currentSnippet.runtime}</span>
                </div>
                <span className="text-[#D4AF37] font-semibold">100% VERIFIED SOURCE</span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Subtle Scroll Indicator */}
        <div className="hidden lg:flex items-center justify-center pt-12 text-[#8A8A8A]">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-xs font-mono tracking-widest hover:text-[#D4AF37] transition-colors group"
          >
            <span>SCROLL</span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </section>
  );
}