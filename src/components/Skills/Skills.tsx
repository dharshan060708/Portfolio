'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench, ArrowRight } from 'lucide-react';

const skillCategories = [
  {
    title: 'FRONTEND DEVELOPMENT',
    icon: Layout,
    description: 'Modern, accessible, and responsive user interfaces built with typed components and clean styling.',
    skills: [
      { name: 'React', role: 'Component Architecture' },
      { name: 'Next.js', role: 'Full-Stack SSR / SSG' },
      { name: 'TypeScript', role: 'Type Safety & Contracts' },
      { name: 'Tailwind CSS', role: 'Design Systems & Utility' },
      { name: 'JavaScript (ES6+)', role: 'Core Logic & DOM' },
      { name: 'HTML5 & CSS3', role: 'Semantic & Responsive' },
    ],
  },
  {
    title: 'BACKEND & APIS',
    icon: Server,
    description: 'High-performance API services, authentication layers, and asynchronous event processors.',
    skills: [
      { name: 'Python 3.11', role: 'Primary Language' },
      { name: 'FastAPI', role: 'High-Speed Async APIs' },
      { name: 'Flask', role: 'Microservices & Routing' },
      { name: 'Node.js', role: 'Runtime & Server Logic' },
      { name: 'Express', role: 'Middleware & Endpoints' },
      { name: 'RESTful APIs', role: 'Resource Architecture' },
    ],
  },
  {
    title: 'DATABASE & AI ARCHITECTURE',
    icon: Database,
    description: 'Relational data modeling, vector embeddings, and sovereign local LLM deployments.',
    skills: [
      { name: 'PostgreSQL', role: 'Relational & Structured' },
      { name: 'MySQL', role: 'Database Queries & Joins' },
      { name: 'MongoDB', role: 'Document Storage' },
      { name: 'ChromaDB', role: 'Vector Search & Embeddings' },
      { name: 'Local LLMs (GGUF)', role: 'Quantized Air-Gapped AI' },
      { name: 'RAG Architecture', role: 'Document Retrieval' },
    ],
  },
  {
    title: 'TOOLS & AUTOMATION',
    icon: Wrench,
    description: 'Automated workflows, containerization, and developer productivity tooling.',
    skills: [
      { name: 'n8n Automation', role: 'Webhook & Workflow Pipelines' },
      { name: 'Git & GitHub', role: 'Version Control & PRs' },
      { name: 'Docker', role: 'Containerized Environments' },
      { name: 'Linux / Bash', role: 'Shell Scripting & Server Ops' },
      { name: 'Postman', role: 'API Testing & Contracts' },
      { name: 'Vercel / Cloud', role: 'Continuous Deployment' },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative z-10 py-20 sm:py-24" aria-label="Skills & Expertise">
      <div className="section-container">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="section-tag">02 — SKILLS & EXPERTISE</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Tools and technologies I use to <span className="text-[#D4AF37]">build systems</span>.
          </h2>
        </div>

        {/* 4 Categorical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className="luxury-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#D4AF37]">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="grid grid-cols-2 gap-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-lg bg-[#141414] border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                    >
                      <span className="text-xs font-mono font-bold text-white block">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-[#8A8A8A] block">
                        {skill.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom decorative hint */}
              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8A8A8A]">
                <span>APPLIED IN PRODUCTION</span>
                <span className="text-[#D4AF37] font-semibold">6 SKILLS</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}