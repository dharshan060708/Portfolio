'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '../../data';
import { ProjectModal } from '../3D/Modal/ProjectModal';
import { LayoutGrid, Cpu, Zap, Code2, Database, Shield, Server, Bot, Activity } from 'lucide-react';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const navigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  return (
    <section id="projects" className="relative z-10 py-16 sm:py-20" aria-labelledby="projects-heading">
      <div className="section-container">
        
        {/* Section Heading matching reference */}
        <div className="mb-10 sm:mb-12">
          <div className="section-heading mb-2">
            FEATURED PROJECTS
          </div>
        </div>

        {/* 3-Column Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => openModal(project)}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        {projects.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-outline inline-flex items-center gap-2.5"
            >
              <span>{showAll ? 'Show Featured Only' : 'View All Projects'}</span>
              <LayoutGrid className="w-4 h-4 text-[#D6A63A]" />
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
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

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      className="reference-card flex flex-col justify-between cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div>
        {/* Project Visual Preview Mockup matching reference */}
        <div className="p-3 pb-0">
          <div className="relative w-full aspect-[16/10] bg-[#07080A] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center shadow-inner">
            <ProjectMockupPreview project={project} />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 space-y-2.5">
          <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] group-hover:text-[#F2C45E] transition-colors">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#A7A7A7] line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech tags footer matching reference */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-medium text-[#A7A7A7] bg-[#101215] border border-white/5 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-1 text-[10px] font-mono text-[#6F7378] bg-[#101215] rounded-md">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectMockupPreview({ project }: { project: Project }) {
  // 1. MERIDIAN AI Healthcare Platform
  if (project.id === 'meridian' || project.name.toLowerCase().includes('meridian')) {
    return (
      <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#060A10] to-[#0A1018] flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[9px] font-mono text-[#1683FF] tracking-wider font-semibold">
            MERIDIAN CLINICAL RAG
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-auto">
          <div className="col-span-2 bg-[#080D14] p-2 rounded-lg border border-white/5 space-y-1">
            <div className="flex items-center gap-1 text-[#1683FF] text-[9px] font-semibold">
              <Activity className="w-3 h-3" />
              <span>Symptom Triage Engine</span>
            </div>
            <p className="text-[8px] text-[#A7A7A7] font-mono">Query: Acute chest pain & fatigue</p>
            <p className="text-[8px] text-[#6F7378]">Citations: PubMed #48912 • WHO-ICD11</p>
          </div>

          <div className="bg-[#0E1522] p-2 rounded-lg border border-[#1683FF]/30 flex flex-col items-center justify-center text-center">
            <span className="text-[7px] font-mono uppercase text-[#A7A7A7]">Triage Risk</span>
            <span className="text-xs font-bold text-[#D6A63A] mt-0.5">MODERATE</span>
            <span className="text-[7px] text-green-400 mt-0.5">Cardio Ref</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-[#6F7378] pt-1 border-t border-white/5">
          <span>FastAPI • ChromaDB • Llama 3</span>
          <span className="text-[#1683FF]">98.4% Confidence</span>
        </div>
      </div>
    );
  }

  // 2. DEVIL-IN AI
  if (project.id === 'devil-in' || project.name.toLowerCase().includes('devil')) {
    return (
      <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#0C0806] to-[#140D0A] flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">😈</span>
            <span className="text-[9px] font-mono text-[#D6A63A] font-semibold">DEVIL-IN AIR-GAPPED AI</span>
          </div>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
            OFFLINE
          </span>
        </div>

        <div className="my-auto font-mono text-[9px] bg-[#070504] p-2.5 rounded-lg border border-white/5 space-y-1">
          <p className="text-[#F2C45E]">$ ./start.bat --model llama-3.2-3b.gguf</p>
          <p className="text-[#27C93F]">[OK] llama-server listening on port 8080</p>
          <p className="text-[#A7A7A7]">[INFO] Zero Python runtime • USB portable</p>
          <p className="text-[#1683FF]">[READY] Web UI launched at 127.0.0.1:8080</p>
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-[#6F7378] pt-1 border-t border-white/5">
          <span>llama.cpp • GGUF Q4_K_M</span>
          <span className="text-[#D6A63A]">AVX2 Optimized</span>
        </div>
      </div>
    );
  }

  // 3. AI Automation Workflow / Lead Management
  if (project.id === 'ai-automation' || project.name.toLowerCase().includes('automation') || project.name.toLowerCase().includes('lead')) {
    return (
      <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#070A0E] to-[#0A1016] flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#D6A63A]" />
            <span className="text-[9px] font-mono text-[#F5F5F5] font-semibold">n8n AUTOMATION PIPELINE</span>
          </div>
          <span className="text-[8px] font-mono text-[#1683FF]">AUTOPILOT</span>
        </div>

        <div className="my-auto flex items-center justify-between gap-1.5 py-1">
          <div className="p-1.5 rounded-md bg-[#0D131C] border border-white/10 text-center flex-1">
            <span className="text-[7px] font-mono text-[#A7A7A7] block">WEBHOOK</span>
            <span className="text-[9px] font-bold text-green-400">Incoming</span>
          </div>
          <span className="text-white/30 text-xs">→</span>
          <div className="p-1.5 rounded-md bg-[#131B26] border border-[#1683FF]/30 text-center flex-1">
            <span className="text-[7px] font-mono text-[#1683FF] block">LOCAL LLM</span>
            <span className="text-[9px] font-bold text-[#F2C45E]">Triage & Class</span>
          </div>
          <span className="text-white/30 text-xs">→</span>
          <div className="p-1.5 rounded-md bg-[#0D131C] border border-white/10 text-center flex-1">
            <span className="text-[7px] font-mono text-[#A7A7A7] block">CRM & ALERTS</span>
            <span className="text-[9px] font-bold text-[#1683FF]">Trello/Email</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-[#6F7378] pt-1 border-t border-white/5">
          <span>n8n • Ollama • Webhooks</span>
          <span className="text-green-400">200 OK Response</span>
        </div>
      </div>
    );
  }

  // 4. DevConnect / Developer Platform
  if (project.id === 'devconnect' || project.name.toLowerCase().includes('devconnect')) {
    return (
      <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#08090C] to-[#0E1015] flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3 h-3 text-[#1683FF]" />
            <span className="text-[9px] font-mono text-[#F5F5F5] font-semibold">DEVCONNECT NETWORK</span>
          </div>
          <span className="text-[8px] font-mono text-[#D6A63A]">v2.0</span>
        </div>

        <div className="my-auto space-y-1.5">
          <div className="bg-[#0A0C0F] p-2 rounded-lg border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#D6A63A] to-[#F2C45E] flex items-center justify-center text-[9px] text-[#050607] font-bold">
                DV
              </div>
              <span className="text-[9px] font-medium text-[#F5F5F5]">Dharshan Velumani</span>
            </div>
            <span className="text-[8px] font-mono text-green-400">Published Snippet</span>
          </div>
          <div className="bg-[#050608] p-1.5 rounded font-mono text-[8px] text-[#A7A7A7] border border-white/5">
            <code>const rag = new Meridian({'{'} citations: true {'}'});</code>
          </div>
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-[#6F7378] pt-1 border-t border-white/5">
          <span>React • Node.js • MongoDB</span>
          <span className="text-[#D6A63A]">Community Feed</span>
        </div>
      </div>
    );
  }

  // 5. StockSync / Inventory System
  if (project.id === 'stocksync' || project.name.toLowerCase().includes('stock') || project.name.toLowerCase().includes('inventory')) {
    return (
      <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#07090C] to-[#0B0F14] flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Server className="w-3 h-3 text-[#D6A63A]" />
            <span className="text-[9px] font-mono text-[#F5F5F5] font-semibold">STOCKSYNC REAL-TIME</span>
          </div>
          <span className="text-[8px] font-mono text-green-400">SYNCED</span>
        </div>

        <div className="my-auto grid grid-cols-2 gap-2">
          <div className="bg-[#090C10] p-2 rounded border border-white/5 text-center">
            <span className="text-[7px] text-[#6F7378] uppercase block">Total SKUs</span>
            <span className="text-sm font-bold font-mono text-[#D6A63A]">1,480</span>
          </div>
          <div className="bg-[#090C10] p-2 rounded border border-white/5 text-center">
            <span className="text-[7px] text-[#6F7378] uppercase block">Low Stock Alert</span>
            <span className="text-sm font-bold font-mono text-amber-400">12 Items</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-[#6F7378] pt-1 border-t border-white/5">
          <span>PostgreSQL • Node.js • Redis</span>
          <span className="text-[#1683FF]">Auto-Reorder</span>
        </div>
      </div>
    );
  }

  // 6. Portfolio 3D
  return (
    <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#06080B] to-[#0A0D12] flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <Bot className="w-3 h-3 text-[#D6A63A]" />
          <span className="text-[9px] font-mono text-[#F5F5F5] font-semibold">3D DEVELOPER LAB</span>
        </div>
        <span className="text-[8px] font-mono text-[#1683FF]">60 FPS</span>
      </div>

      <div className="my-auto flex items-center justify-center gap-3 py-1">
        <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-[#D6A63A]/30 flex flex-col items-center justify-center text-center">
          <span className="text-[7px] text-[#A7A7A7] font-mono">WEBGL</span>
          <span className="text-[10px] font-bold text-[#F2C45E]">Three.js</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#0F141C] border border-[#1683FF]/30 flex flex-col items-center justify-center text-center">
          <span className="text-[7px] text-[#A7A7A7] font-mono">FRAME</span>
          <span className="text-[10px] font-bold text-[#1683FF]">R3F</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] font-mono text-[#6F7378] pt-1 border-t border-white/5">
        <span>Three.js • React • Tailwind</span>
        <span className="text-green-400">PBR Studio</span>
      </div>
    </div>
  );
}