'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Rocket, Layers, Infinity as InfinityIcon } from 'lucide-react';

const statsData = [
  {
    icon: Code2,
    value: '50',
    label: 'DSA Problems Solved',
    subtext: '41 Python • 5 Java • 4 SQL',
  },
  {
    icon: Rocket,
    value: '5+',
    label: 'Featured Projects',
    subtext: 'AI, Automation & Web',
  },
  {
    icon: Layers,
    value: '15+',
    label: 'Technologies',
    subtext: 'Applied Engineering Stack',
  },
  {
    icon: InfinityIcon,
    value: '∞',
    label: 'Always Learning',
    subtext: 'Curiosity & Consistency',
  },
];

export function Stats() {
  return (
    <section className="relative z-10 py-6 sm:py-8" aria-label="Verified Statistics">
      <div className="section-container">
        <motion.div
          className="bg-[#0B0D0F] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-card"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-white/5">
            {statsData.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center gap-3.5 sm:gap-4 ${
                  index !== 0 ? 'lg:pl-8' : ''
                } ${index !== statsData.length - 1 ? 'lg:pr-8' : ''} ${
                  index > 1 ? 'pt-4 sm:pt-0' : ''
                }`}
              >
                {/* Icon box */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#101215] border border-white/10 flex items-center justify-center text-[#D6A63A] flex-shrink-0">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                {/* Number & Label */}
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#D6A63A] leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#F5F5F5] font-semibold leading-snug">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[#6F7378] font-mono mt-0.5">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
