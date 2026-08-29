'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../../../data';
import { Github, ExternalLink, ArrowRight, Code, Database, Zap, Cpu, Monitor, Sparkles } from 'lucide-react';
import { useDeviceCapabilities } from '../../../hooks';

interface ProjectCard3DProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard3D({ project, index, onClick }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isPointerFine, isTouch, prefersReducedMotion } = useDeviceCapabilities();
  const enableTilt = isPointerFine && !isTouch && !prefersReducedMotion;

  // 3D Tilt Coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    x.set(0);
    y.set(0);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    ai: <Cpu className="w-3.5 h-3.5" />,
    automation: <Zap className="w-3.5 h-3.5" />,
    fullstack: <Code className="w-3.5 h-3.5" />,
    desktop: <Monitor className="w-3.5 h-3.5" />,
    'local-ai': <Database className="w-3.5 h-3.5" />,
  };

  const categoryLabels: Record<string, string> = {
    ai: 'AI Architecture',
    automation: 'Automation',
    fullstack: 'Full Stack',
    desktop: 'Desktop App',
    'local-ai': 'Local AI',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="project-card group relative flex flex-col justify-between h-full min-h-[380px] p-6 sm:p-7 rounded-2xl glass-panel border-border hover:border-gold/50 transition-colors duration-300 cursor-pointer shadow-xl overflow-hidden"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${project.name}`}
    >
      {/* Ambient background hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Top Header info */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl sm:text-3xl font-black text-gold/80 group-hover:text-gold transition-colors">
            {project.number}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-medium">
            {categoryIcons[project.category]}
            <span>{categoryLabels[project.category]}</span>
          </div>
        </div>

        {/* Project Name & Tagline */}
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-gold transition-colors duration-200 tracking-tight">
            {project.name}
          </h4>
          <p className="text-xs font-mono text-gold tracking-wider uppercase mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Short Summary Description */}
        <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech Stack Chips & Footer Actions */}
      <div className="relative z-10 space-y-4 pt-6 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-dark/60 border border-border text-text-muted group-hover:border-gold/20 group-hover:text-text-secondary transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-[10px] font-mono rounded-lg bg-dark/40 text-text-muted">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/80">
          <span className="text-xs font-mono text-text-muted group-hover:text-gold transition-colors flex items-center gap-1">
            View Architecture & Specs
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark/60 border border-border text-text-muted hover:text-gold hover:border-gold/40 transition-colors"
                aria-label={`GitHub source code for ${project.name}`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark/60 border border-border text-text-muted hover:text-gold hover:border-gold/40 transition-colors"
                aria-label={`Live demo for ${project.name}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}