'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 650; // Snappy 650ms initial load

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(onComplete, 200);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="text-center px-4 w-full max-w-md">
        {/* Logo */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center shadow-gold-glow-sm"
          initial={{ scale: 0.8, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <span className="text-dark font-black text-2xl font-mono">DV</span>
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 font-mono text-text-primary">
          INITIALIZING <span className="text-gradient-gold">DEVELOPER LAB</span>
        </h1>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-dark-secondary border border-border rounded-full overflow-hidden my-5">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold-bright rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted">
          <span>WebGL • 3D ASSETS</span>
          <span className="text-gold font-bold">{progress}%</span>
        </div>

        <button
          onClick={onComplete}
          className="mt-6 text-[11px] font-mono text-text-muted hover:text-gold transition-colors underline underline-offset-4"
        >
          Skip Intro →
        </button>
      </div>
    </motion.div>
  );
}