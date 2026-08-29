'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '../3D/Common/Canvas';
import { WorkflowScene } from '../3D/WorkflowScene/WorkflowScene';
import { useIntersectionObserver } from '../../hooks';
import { Sparkles, ArrowDown, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { cn } from '../../utils';

const aiStack = [
  { name: 'Ollama', desc: 'Local LLM runtime', color: '#00FFFF' },
  { name: 'n8n', desc: 'Workflow automation', color: '#D4AF37' },
  { name: 'llama.cpp', desc: 'GGUF inference engine', color: '#F5D76E' },
  { name: 'FastAPI', desc: 'High-performance APIs', color: '#009688' },
  { name: 'ChromaDB', desc: 'Vector database', color: '#7C3AED' },
  { name: 'Google Sheets', desc: 'Data storage & sync', color: '#34A853' },
  { name: 'Docker', desc: 'Container orchestration', color: '#2496ED' },
  { name: 'Trello', desc: 'Task management', color: '#0052CC' },
];

const workflowStepsData = [
  { id: '01', title: 'USER TRIGGER', desc: 'Incoming payload or web action', tag: 'INPUT' },
  { id: '02', title: 'WEBHOOK DISPATCH', desc: 'Secure payload ingestion & validation', tag: 'INGESTION' },
  { id: '03', title: 'AI MODEL CLASSIFICATION', desc: 'Local Llama 3 / Mistral inference', tag: 'REASONING' },
  { id: '04', title: 'DATABASE SYNC', desc: 'ChromaDB vector & Postgres write', tag: 'PERSISTENCE' },
  { id: '05', title: 'AUTOMATION ACTIONS', desc: 'Automated task routing & alerting', tag: 'EXECUTION' },
  { id: '06', title: 'CLIENT NOTIFICATION', desc: 'Instant status feedback & confirmation', tag: 'OUTPUT' },
];

export function AILab() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="ai-lab"
      className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-12 overflow-hidden"
      aria-labelledby="ai-lab-heading"
    >
      {/* Atmosphere Background */}
      <div className="absolute inset-0 bg-dark-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 noise-texture pointer-events-none" />

      {/* 3D Workflow Scene */}
      <div className="absolute top-0 left-0 right-0 h-[450px] sm:h-[550px] pointer-events-none opacity-60 sm:opacity-90">
        <Canvas cameraPosition={[0, 0, 8]} fov={50} className="w-full h-full">
          <WorkflowScene position={[0, 0, 0]} scale={1.1} animated={true} />
        </Canvas>
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-mono text-xs sm:text-sm tracking-widest uppercase">
            AUTOMATION ARCHITECTURE
          </span>
          <h2 id="ai-lab-heading" className="section-title mt-3">
            I DON'T JUST BUILD APPS.<br />
            <span className="text-gradient-gold">I AUTOMATE SYSTEMS.</span>
          </h2>
          <div className="gold-line mx-auto mt-4" />
          <p className="section-subtitle mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg">
            End-to-end automation pipelines powered by local AI — from lead capture to classification, storage, and notification.
          </p>
        </motion.div>

        {/* Responsive Interactive Workflow Pipeline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-gold/30 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-gold">
                <Zap className="w-4 h-4" />
                <span>ACTIVE PIPELINE EXECUTION FLOW</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 text-[10px] font-mono">
                ZERO-TOUCH AUTOMATION
              </span>
            </div>

            {/* Pipeline grid: 1 col on mobile, 2 col on tablet, 3/6 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflowStepsData.map((step, i) => (
                <div
                  key={step.id}
                  className="p-4 sm:p-5 rounded-2xl bg-dark/60 border border-border/80 hover:border-gold/40 transition-all duration-200 group relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-lg font-bold text-gold">{step.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gold/10 text-gold border border-gold/20">
                      {step.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-text-primary group-hover:text-gold transition-colors mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-gold font-mono text-xs tracking-widest uppercase mb-6 text-center">
            AUTOMATION & AI TOOLING
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {aiStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="glass-panel p-4 sm:p-6 rounded-2xl border-border hover:border-gold/40 transition-all duration-300 group relative overflow-hidden"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
              >
                <div className="w-2.5 h-2.5 rounded-full mb-3 shadow-sm" style={{ background: tech.color }} />
                <h4 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-gold transition-colors mb-1">
                  {tech.name}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Architecture Code Block */}
        <motion.div
          className="glass-panel p-6 sm:p-8 rounded-3xl border-gold/30"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gold font-mono text-xs tracking-widest uppercase">
              ORCHESTRATION MANIFEST
            </span>
            <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              STATUS: READY
            </span>
          </div>
          <pre className="text-text-secondary text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed bg-dark/70 p-4 rounded-xl border border-border">
<code>{`workflow:
  trigger: Webhook (/api/v1/leads)
  actions:
    - step: sanitize_and_validate
    - step: local_rag_triage
      model: Llama-3-8B-Instruct.Q4_K_M
      runtime: Ollama / llama.cpp
    - step: parallel_dispatch
      tasks:
        - alert: admin_telegram_notification
        - storage: postgres_lead_records
        - vector_index: chromadb_embedding
        - crm: trello_board_routing
  response:
    code: 200
    message: "Triage complete, specialist assigned"`}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}