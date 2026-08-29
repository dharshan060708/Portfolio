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
    const duration = 500; // Ultra-snappy 500ms initial load

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(onComplete, 150);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="text-center px-4 w-full max-w-sm">
        {/* Monogram */}
        <motion.div
          className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <span className="text-[#050505] font-black text-2xl font-mono">DV</span>
        </motion.div>

        {/* Title */}
        <h1 className="text-xl font-bold tracking-tight mb-2 font-mono text-white">
          DHARSHAN <span className="text-[#D4AF37]">VELUMANI</span>
        </h1>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#141414] border border-white/10 rounded-full overflow-hidden my-4">
          <motion.div
            className="h-full bg-[#D4AF37] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A8A]">
          <span>FULL STACK & AI PORTFOLIO</span>
          <span className="text-[#D4AF37] font-bold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}