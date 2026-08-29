'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Server, Cpu, Zap, Terminal } from 'lucide-react';
import { skillCategories } from '../../data';

const categoryIcons: Record<string, React.ElementType> = {
  languages: Code2,
  frontend: Layers,
  backend: Server,
  ai: Cpu,
  automation: Zap,
  tools: Terminal,
};

export function Skills() {
  return (
    <section id="skills" className="relative z-10 py-16 sm:py-20" aria-labelledby="skills-heading">
      <div className="section-container">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <div className="section-heading mb-2">
            TECHNICAL ARSENAL
          </div>
        </div>

        {/* 6 Category Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((group, index) => {
            const IconComponent = categoryIcons[group.id] || Terminal;
            return (
              <motion.div
                key={group.id}
                className="reference-card p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl bg-[#101215] border border-white/10 flex items-center justify-center"
                      style={{ color: group.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#F5F5F5]">{group.category}</h3>
                      <p className="text-[11px] text-[#6F7378]">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Clean Technology Pills */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-[#101215] border border-white/5 text-xs font-medium text-[#A7A7A7] hover:text-[#F5F5F5] hover:border-white/15 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}