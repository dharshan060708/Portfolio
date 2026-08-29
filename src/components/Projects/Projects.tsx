'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '../../data';
import { ProjectModal } from '../Modal/ProjectModal';
import { ArrowRight, ArrowUpRight, Github, ExternalLink, Cpu, Zap, Code2, Database, Shield, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProject = projects[0]; // Meridian
  const secondaryProjects = projects.slice(1, 3); // Devil-In AI & AI Lead Management
  const remainingProjects = projects.slice(3); // StockSync, DevConnect, Portfolio

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const navigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    if (direction === 'prev') {
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      setSelectedProject(projects[prevIndex]);
    } else {
      const nextIndex = (currentIndex + 1) % projects.length;
      setSelectedProject(projects[nextIndex]);
    }
  };

  return (
    <section id="projects" className="relative z-10 py-20 sm:py-24" aria-label="Selected Work">
      <div className="section-container">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="section-tag">03 / SELECTED WORK</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Featured projects & <span className="text-[#D4AF37]">case studies</span>.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#8A8A8A]">
            06 PRODUCTION SYSTEMS & TOOLS
          </p>
        </div>

        {/* ================= 1. LARGE FEATURED CASE STUDY: MERIDIAN ================= */}
        <motion.div
          className="project-card luxury-card p-6 sm:p-10 mb-8 sm:mb-10 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[#D4AF37]/40"
          onClick={() => openModal(featuredProject)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Project Details (approx 55%) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37]">
                  ★ FEATURED CASE STUDY
                </span>
                <span className="text-xs font-mono text-[#8A8A8A]">
                  {featuredProject.number} • HEALTHCARE AI
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-[#F0D56A] transition-colors">
                  {featuredProject.name}
                </h3>
                <p className="text-sm font-mono text-[#D4AF37] mt-1 uppercase tracking-wider">
                  {featuredProject.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
                {featuredProject.description}
              </p>

              {/* Problem / Solution Snapshot */}
              <div className="p-4 rounded-xl bg-[#141414] border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">Core Engineering Breakthrough</span>
                <p className="text-xs text-[#D4D4D4] leading-relaxed">
                  Eliminates generic AI hallucinations by strictly grounding recommendations against verified PubMed clinical indices with sub-second response times.
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#141414] border border-white/5 text-xs font-mono text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(featuredProject);
                  }}
                  className="btn-gold text-xs py-2.5 px-4"
                >
                  <span>VIEW FULL CASE STUDY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-outline text-xs py-2.5 px-4"
                  >
                    <Github className="w-4 h-4 text-[#D4AF37]" />
                    <span>SOURCE CODE</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right: Rich Interactive UI Preview (45%) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-[#080808] border border-white/10 p-5 space-y-4 shadow-xl group-hover:border-[#D4AF37]/30 transition-colors">
                
                {/* Simulated Triage Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white font-bold">MERIDIAN CLINICAL v1.2</span>
                  </div>
                  <span className="text-[#8A8A8A]">FASTAPI :8000</span>
                </div>

                {/* Simulated Clinical Triage Cards */}
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#141414] border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-bold block">ChromaDB Vector Retrieval</span>
                      <span className="text-[#8A8A8A] text-[11px]">1,480 indexed clinical guidelines loaded</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#141414] border border-white/5 flex items-start gap-2.5">
                    <Activity className="w-4 h-4 text-[#1683FF] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-bold block">Air-Gapped Llama 3 Inference</span>
                      <span className="text-[#8A8A8A] text-[11px]">Zero patient data sent to external cloud APIs</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#141414] border border-white/5 flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-bold block">Verified Medical Citation Engine</span>
                      <span className="text-[#8A8A8A] text-[11px]">Exact PubMed / ICD-11 source validation</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] font-mono text-[#D4AF37]">CLICK CARD FOR COMPLETE ARCHITECTURE SPEC →</span>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* ================= 2. SECONDARY 2-COLUMN HIGHLIGHT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {secondaryProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="project-card luxury-card p-6 sm:p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#D4AF37]/40"
              onClick={() => openModal(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#D4AF37] font-bold">
                    {project.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#141414] border border-white/10 text-[10px] font-mono text-[#8A8A8A] uppercase">
                    {project.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#F0D56A] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono text-[#8A8A8A] mt-1 uppercase">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#D4D4D4] leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#141414] border border-white/5 text-[11px] font-mono text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-[#D4AF37] group-hover:underline flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-md hover:bg-white/5 text-[#8A8A8A] hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= 3. REMAINING 3-COLUMN PRODUCTION GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {remainingProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="project-card luxury-card p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#D4AF37]/40"
              onClick={() => openModal(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#D4AF37] font-bold">
                    {project.number}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#F0D56A] transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs text-[#8A8A8A] leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#141414] text-[10px] font-mono text-[#D4D4D4]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#8A8A8A] hover:text-white"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
            onNavigate={navigateProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}