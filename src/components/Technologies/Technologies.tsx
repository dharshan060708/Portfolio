'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { technologies } from '../../data';

export function Technologies() {
  return (
    <section className="relative z-10 py-8 sm:py-10" aria-label="Technologies">
      <div className="section-container">
        {/* Centered section title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 sm:w-12 h-px bg-white/10" />
          <span className="text-xs font-mono tracking-widest text-[#A7A7A7] uppercase font-semibold">
            TECHNOLOGIES I WORK WITH
          </span>
          <div className="w-8 sm:w-12 h-px bg-white/10" />
        </div>

        {/* Horizontal pill badge container matching reference */}
        <motion.div
          className="bg-[#0B0D0F] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-card"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#101215] border border-white/5 hover:border-white/20 transition-colors"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tech.color }}
                />
                <span className="text-xs sm:text-sm font-medium text-[#F5F5F5]">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
