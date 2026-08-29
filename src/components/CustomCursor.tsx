'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceCapabilities } from '../hooks';

interface CustomCursorProps {
  enabled?: boolean;
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [size, setSize] = useState(12);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const { isPointerFine, isTouch, prefersReducedMotion } = useDeviceCapabilities();
  const cursorRef = useRef<HTMLDivElement>(null);

  const isActive = enabled && isPointerFine && !isTouch && !prefersReducedMotion;

  useEffect(() => {
    if (!isActive) return;

    let isMounted = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMounted) return;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseDown = () => setSize(8);
    const handleMouseUp = () => setSize(12);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isActive, visible]);

  if (!isActive || !visible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-[100] mix-blend-difference"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: size === 8 ? 0.6 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.1 }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute -top-3 -left-3 w-6 h-6 rounded-full border border-gold/60 pointer-events-none"
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Inner dot */}
      <div
        className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-gold pointer-events-none"
      />

      {/* Label */}
      <AnimatePresence>
        {label && (
          <motion.div
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold tracking-wider whitespace-nowrap bg-dark/90 text-gold border border-gold/40 shadow-lg pointer-events-none"
            initial={{ opacity: 0, x: -8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Wrapper component that detects hover targets
export function CursorProvider({ children }: { children: React.ReactNode }) {
  const { isPointerFine, isTouch, prefersReducedMotion } = useDeviceCapabilities();
  const isActive = isPointerFine && !isTouch && !prefersReducedMotion;

  return (
    <>
      {children}
      {isActive && <CustomCursor enabled={true} />}
    </>
  );
}