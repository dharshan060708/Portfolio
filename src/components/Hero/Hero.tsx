'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, ArrowRight, ArrowUpRight, Terminal, Cpu, Zap, CheckCircle2, Copy } from 'lucide-react';
import { profiles } from '../../data';

const codeSnippets = [
  {
    id: 'rag',
    filename: 'meridian_rag.py',
    language: 'Python 3.11',
    badge: 'AI HEALTHCARE',
    code: `import fastapi, chromadb
from core.ai import AIEngine

# Initialize sovereign clinical RAG engine
engine = AIEngine({
    "model": "llama-3.2-3b-instruct",
    "vector_db": "clinical_chroma",
    "citations": ["PubMed", "WHO_ICD11"],
    "offline_mode": True,
})

@app.post("/api/triage")
async def analyze_symptoms(payload: TriageQuery):
    context = await engine.retrieve(payload.query)
    assessment = await engine.evaluate(context)
    return {"risk": assessment.level, "sources": assessment.citations}`,
  },
  {
    id: 'devil-in',
    filename: 'devil_in_launcher.bat',
    language: 'Batch / C++',
    badge: 'OFFLINE AI',
    code: `@echo off
title DEVIL-IN AIR-GAPPED AI LAUNCHER
echo [INFO] Detecting hardware architecture...
echo [INFO] CPU AVX2 instructions supported.

:: Launch quantized GGUF server on localhost
llama-server.exe ^
  --model ./models/llama-3.2-3b-q4_k_m.gguf ^
  --port 8080 ^
  --ctx-size 4096 ^
  --n-gpu-layers 0

echo [READY] Zero Python runtime • Web UI at http://127.0.0.1:8080`,
  },
  {
    id: 'n8n',
    filename: 'lead_automation.ts',
    language: 'TypeScript / n8n',
    badge: 'EVENT WORKFLOW',
    code: `import { WebhookEvent, OllamaTriage } from '@/automation';

export async function processInboundLead(event: WebhookEvent) {
  // Validate incoming payload schema
  const payload = validateSchema(event.body);

  // Classify intent and budget urgency using local LLM
  const triage = await OllamaTriage.classify({
    query: payload.message,
    model: 'llama3:latest',
  });

  // Auto-sync qualified prospects to CRM and trigger alerts
  await Promise.all([
    CRM.createContact({ ...payload, score: triage.score }),
    Telegram.sendAlert(\`🚨 New Lead (\${triage.priority}): \${payload.name}\`),
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 64;
      const pos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - navOffset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center pt-24 sm:pt-28 pb-12 overflow-hidden bg-ambient-hero"
      aria-label="Hero"
    >
      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading & CTAs (approx 50%) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Status Pill matching reference */}
            <motion.div
              className="hero-pill inline-flex"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="hero-pill-dot" />
              <span>AI DEVELOPER & AUTOMATION BUILDER</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I build intelligent full-stack applications, sovereign local AI tools, and high-throughput automation workflows.
            </motion.p>

            {/* Action Buttons matching reference */}
            <motion.div
              className="flex flex-wrap items-center gap-3.5 pt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-gold"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={githubLink}
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

          {/* Right Column: Professional Interactive Developer Studio Showcase (50%) */}
          <motion.div
            className="lg:col-span-6 w-full"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#0B0D0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              
              {/* Window Title Bar with Tab Selectors */}
              <div className="bg-[#0E1116] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px] sm:max-w-md scrollbar-none">
                  {codeSnippets.map((snippet, idx) => (
                    <button
                      key={snippet.id}
                      onClick={() => setActiveTab(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        activeTab === idx
                          ? 'bg-[#151921] text-[#F2C45E] border border-[#D6A63A]/40'
                          : 'text-[#6F7378] hover:text-[#A7A7A7] hover:bg-[#12151B]'
                      }`}
                    >
                      {snippet.filename}
                    </button>
                  ))}
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-white/5 text-[#6F7378] hover:text-[#F5F5F5] transition-colors"
                  aria-label="Copy snippet"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[#C0C5CE] overflow-x-auto min-h-[260px] bg-[#07090C]">
                <pre className="text-left font-mono">
                  <code>{currentSnippet.code}</code>
                </pre>
              </div>

              {/* Diagnostics & Live Execution Bar */}
              <div className="bg-[#0E1116] border-t border-white/5 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-[#6F7378]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[#A7A7A7]">{currentSnippet.badge}</span>
                  <span className="hidden sm:inline">• {currentSnippet.language}</span>
                </div>
                <span className="text-[#1683FF]">BUILD • AUTOMATE • INNOVATE</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}