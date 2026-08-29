'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Code, Database, Zap, Cpu, Monitor, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from '../../data';
import { cn } from '../../utils';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function ProjectModal({ project, onClose, onNavigate }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNavigate]);

  if (!project) return null;

  const categoryIcons: Record<string, React.ReactNode> = {
    ai: <Cpu className="w-4 h-4 text-[#1683FF]" />,
    automation: <Zap className="w-4 h-4 text-[#D6A63A]" />,
    fullstack: <Code className="w-4 h-4 text-emerald-400" />,
    desktop: <Monitor className="w-4 h-4 text-amber-400" />,
    'local-ai': <Database className="w-4 h-4 text-[#1683FF]" />,
  };

  const categoryLabels: Record<string, string> = {
    ai: 'AI Architecture',
    automation: 'Automation',
    fullstack: 'Full Stack',
    desktop: 'Desktop App',
    'local-ai': 'Local AI',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto z-10 my-auto',
          'bg-[#0B0D0F] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10'
        )}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#D6A63A]">
              {project.number}
            </span>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#101216] border border-white/10 rounded-full">
              {categoryIcons[project.category]}
              <span className="text-xs font-mono font-medium text-[#F5F5F5]">
                {categoryLabels[project.category]}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#101215] border border-white/10 text-[#A7A7A7] hover:text-[#F5F5F5] hover:border-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-6 space-y-6">
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#F5F5F5]">
              {project.name}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#D6A63A] uppercase tracking-wider mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A7A7A7] font-mono">Overview</h3>
            <p className="text-[#F5F5F5] text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#101215] border border-white/5 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#F2C45E] uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4" />
                Problem Statement
              </h4>
              <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#101215] border border-white/5 space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#1683FF] uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Engineering Solution
              </h4>
              <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A7A7A7] font-mono">System Architecture</h3>
            <div className="p-4 rounded-xl bg-[#07090C] border border-white/5 font-mono text-xs sm:text-sm text-[#90CAF9] leading-relaxed overflow-x-auto">
              {project.architecture}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A7A7A7] font-mono">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#101215] border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A63A] mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-[#A7A7A7] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A7A7A7] font-mono">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[#101215] border border-white/5 text-xs font-mono text-[#F5F5F5]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 sm:flex-initial"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 sm:flex-initial"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-[#6F7378]">
            <button
              onClick={() => onNavigate('prev')}
              className="flex items-center gap-1.5 hover:text-[#F2C45E] transition-colors p-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>
            <span className="hidden sm:inline">Use Arrow Keys ← → to Switch</span>
            <button
              onClick={() => onNavigate('next')}
              className="flex items-center gap-1.5 hover:text-[#F2C45E] transition-colors p-2"
            >
              <span>NEXT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
