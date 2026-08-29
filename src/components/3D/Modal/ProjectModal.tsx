'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Code, Database, Zap, Cpu, Monitor, ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, Project } from '../../../data';
import { cn } from '../../../utils';

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
    ai: <Cpu className="w-4 h-4" />,
    automation: <Zap className="w-4 h-4" />,
    fullstack: <Code className="w-4 h-4" />,
    desktop: <Monitor className="w-4 h-4" />,
    'local-ai': <Database className="w-4 h-4" />,
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
          'glass-panel rounded-3xl border-gold/40 shadow-2xl bg-dark/95'
        )}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto z-20 p-2.5 rounded-full bg-dark/80 border border-border text-text-secondary hover:text-gold hover:border-gold/50 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 lg:p-10 -mt-10 sm:-mt-12">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-gold">
              {project.number}
            </span>
            <div className="flex items-center gap-2 px-3.5 py-1 bg-gold/10 border border-gold/30 rounded-full">
              {categoryIcons[project.category]}
              <span className="text-xs font-mono font-medium text-gold">
                {categoryLabels[project.category]}
              </span>
            </div>
          </div>

          <h2 id="modal-title" className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 text-text-primary">
            {project.name}
          </h2>
          <p className="text-gold font-mono text-sm sm:text-base font-semibold mb-6 uppercase tracking-wider">
            {project.tagline}
          </p>

          <div className="gold-line mb-8" />

          {/* Overview */}
          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-text-primary">Overview</h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </section>

          {/* Problem / Solution Grid */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border-border">
              <h4 className="flex items-center gap-2 text-gold font-mono text-sm uppercase tracking-wider mb-3">
                <Code className="w-4 h-4" />
                Problem Statement
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">{project.problem}</p>
            </div>
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border-border">
              <h4 className="flex items-center gap-2 text-gold font-mono text-sm uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4" />
                Engineering Solution
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Architecture */}
          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-text-primary">Architecture</h3>
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border-border font-mono text-xs sm:text-sm text-text-secondary leading-relaxed overflow-x-auto">
              {project.architecture}
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-text-primary">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 glass-panel rounded-xl border-border">
                  <span className="w-2 h-2 mt-1.5 bg-gold rounded-full flex-shrink-0" />
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-text-primary">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 text-xs font-mono font-medium text-text-secondary bg-dark/60 border border-border rounded-xl hover:border-gold/40 hover:text-gold transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 sm:flex-initial"
              >
                <span className="flex items-center justify-center gap-2 font-semibold">
                  <Github className="w-4 h-4" />
                  View Source on GitHub
                </span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 sm:flex-initial"
              >
                <span className="flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Deployment
                </span>
              </a>
            )}
          </div>

          {/* Modal Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border text-xs font-mono text-text-muted">
            <button
              onClick={() => onNavigate('prev')}
              className="flex items-center gap-1.5 hover:text-gold transition-colors p-2 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>
            <span className="hidden sm:inline">Use Arrow Keys ← → to Switch Projects</span>
            <button
              onClick={() => onNavigate('next')}
              className="flex items-center gap-1.5 hover:text-gold transition-colors p-2 min-h-[44px]"
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