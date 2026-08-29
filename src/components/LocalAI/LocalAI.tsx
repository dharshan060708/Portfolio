'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '../3D/Common/Canvas';
import { AIOrb } from '../3D/AIOrb/AIOrb';
import { useIntersectionObserver, useDeviceCapabilities } from '../../hooks';
import { Github, ArrowDown, Terminal, Cpu, ShieldCheck, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils';

const localAIStack = [
  { name: 'Ollama', desc: 'Local LLM server & model manager', version: 'v0.1+' },
  { name: 'llama.cpp', desc: 'C/C++ inference engine for GGUF', version: 'Latest' },
  { name: 'GGUF', desc: 'Quantized 4-bit model format', version: 'Q4_K_M' },
  { name: 'Local LLMs', desc: 'Llama 3, Mistral, Qwen, Phi', version: '3B-70B' },
  { name: 'Offline AI', desc: 'No internet required after setup', version: '100% Private' },
  { name: 'Portable AI', desc: 'USB-deployable, zero-install', version: 'Plug & Run' },
];

const devilInFeatures = [
  'Zero Python runtime dependencies',
  'No Docker daemon required',
  'USB portable across drive letters',
  'Multi-model GGUF auto-discovery',
  'Custom Red & Gold Cyber Web UI',
  'Optional LAN subnet sharing',
  'CPU & optional GPU AVX2 inference',
  'Works 100% offline & air-gapped',
];

export function LocalAI() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const { isMobile } = useDeviceCapabilities();

  return (
    <section
      ref={sectionRef}
      id="local-ai"
      className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-12 overflow-hidden"
      aria-labelledby="local-ai-heading"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-dark-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 noise-texture pointer-events-none" />

      {/* 3D AI Orb in Background */}
      <div className="absolute top-0 left-0 right-0 h-[380px] sm:h-[480px] pointer-events-none opacity-50 sm:opacity-80">
        <Canvas cameraPosition={[0, 0, 5]} fov={45} className="w-full h-full">
          <AIOrb position={[0, 0, 0]} scale={isMobile ? 1.2 : 1.5} intensity={1} />
        </Canvas>
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-mono text-xs sm:text-sm tracking-widest uppercase">
            SOVEREIGN INTELLIGENCE
          </span>
          <h2 id="local-ai-heading" className="section-title mt-3">
            RUN AI. <span className="text-gradient-gold">LOCALLY.</span>
          </h2>
          <div className="gold-line mx-auto mt-4" />
          <p className="section-subtitle mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg">
            No cloud subscriptions. No third-party API keys. No data leaks. Your private models on your local workstation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: DEVIL-IN AI Showcase */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -25 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-gold/30 relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 via-amber-600 to-yellow-500 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                  😈
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary">DEVIL-IN AI</h3>
                  <p className="text-gold font-mono text-xs tracking-wider uppercase">
                    PORTABLE LOCAL LLM LAUNCHER
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                A zero-dependency Windows desktop runtime for running GGUF LLMs offline. Plug in any USB, place your weights, and execute with zero installation or Python configuration.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['llama.cpp', 'GGUF', 'Offline', 'Portable USB', 'Privacy-First'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono font-medium text-gold bg-gold/10 border border-gold/30 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="https://github.com/dharshan060708/Devil-In-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Explore Devil-In AI Repo</span>
              </a>
            </div>

            {/* Devil-In Features List */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-border">
              <h4 className="text-gold font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                SYSTEM ADVANTAGES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {devilInFeatures.map((feature, i) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-dark/60 border border-border/80 text-xs sm:text-sm text-text-secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Local Inference Pipeline & Terminal */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: 25 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 25 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Inference Architecture Pipeline */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-gold/30">
              <h3 className="text-gold font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                AIR-GAPPED INFERENCE FLOW
              </h3>
              
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark/60 border border-border">
                  <span className="text-text-primary font-bold">1. QUANTIZED GGUF WEIGHTS</span>
                  <span className="text-gold text-xs px-2 py-0.5 rounded bg-gold/10 border border-gold/20">4-BIT Q4_K_M</span>
                </div>
                
                <div className="flex justify-center text-gold/60 py-0.5">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark/60 border border-border">
                  <span className="text-text-primary font-bold">2. LLAMA.CPP INFERENCE SERVER</span>
                  <span className="text-cyan-400 text-xs">C++ ENGINE</span>
                </div>

                <div className="flex justify-center text-gold/60 py-0.5">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-gold/10 border border-gold/40">
                  <span className="text-gold font-bold">3. SOVEREIGN REST / WEB API</span>
                  <span className="text-green-400 text-xs font-semibold">100% PRIVATE</span>
                </div>
              </div>
            </div>

            {/* Local AI Tooling Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {localAIStack.map((tech, i) => (
                <div
                  key={tech.name}
                  className="glass-panel p-4 rounded-2xl border-border hover:border-gold/40 transition-colors"
                >
                  <p className="font-bold text-xs sm:text-sm text-text-primary">{tech.name}</p>
                  <p className="text-[10px] font-mono text-gold my-1">{tech.version}</p>
                  <p className="text-[11px] text-text-secondary line-clamp-2">{tech.desc}</p>
                </div>
              ))}
            </div>

            {/* Live Local Terminal Simulation */}
            <div className="glass-panel p-6 rounded-3xl border-border">
              <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                <span className="text-gold font-mono text-xs tracking-widest uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  STATION_TERMINAL.SH
                </span>
                <span className="text-[10px] font-mono text-green-400">SESSION: LOCAL</span>
              </div>
              <LocalAITerminal />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LocalAITerminal() {
  const lines = [
    { text: '$ ollama pull llama3.2:3b', type: 'cmd' },
    { text: 'pulling manifest... 100% ████████████ 2.0GB', type: 'info' },
    { text: 'success: model registered locally', type: 'success' },
    { text: '$ ./devil-in-ai/start.bat --model llama-3.2-3b.gguf', type: 'cmd' },
    { text: '[DEVIL-IN] Initializing llama-server on 127.0.0.1:8080', type: 'log' },
    { text: '[DEVIL-IN] Memory mapped 2.1 GB RAM. Ready for inference.', type: 'log' },
  ];

  return (
    <div className="font-mono text-xs text-text-secondary bg-dark/70 rounded-xl p-4 overflow-x-auto space-y-1.5 border border-border">
      {lines.map((line, i) => (
        <div
          key={i}
          className={
            line.type === 'cmd'
              ? 'text-gold font-semibold'
              : line.type === 'success'
              ? 'text-green-400'
              : line.type === 'log'
              ? 'text-amber-400'
              : 'text-text-secondary'
          }
        >
          {line.text}
        </div>
      ))}
      <div className="flex items-center gap-1 pt-1 text-gold">
        <span>$</span>
        <span className="w-2 h-3.5 bg-gold animate-pulse inline-block" />
      </div>
    </div>
  );
}