'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceCapabilities } from '../hooks';

interface CustomCursorProps {
  enabled?: boolean;
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectHovered, setIsProjectHovered] = useState(false);
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

      const target = e.target as HTMLElement | null;
      if (target) {
        const isProject = !!target.closest('.project-card');
        const isInteractive =
          isProject ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.luxury-card') ||
          target.closest('input') ||
          target.closest('textarea');

        setIsHovered(!!isInteractive);
        setIsProjectHovered(isProject);
      }
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive, visible]);

  if (!isActive || !visible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[100] transition-opacity duration-200"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer subtle ring */}
      <motion.div
        className="rounded-full border border-[#D4AF37]/50 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#050505]/40 backdrop-blur-[1px]"
        style={{
          width: isProjectHovered ? 48 : 32,
          height: isProjectHovered ? 48 : 32,
        }}
        animate={{
          scale: isHovered ? (isProjectHovered ? 1.2 : 1.4) : 1,
          borderColor: isHovered ? '#F0D56A' : 'rgba(212, 175, 55, 0.4)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 380 }}
      >
        {isProjectHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[9px] font-mono font-bold tracking-widest text-[#F0D56A]"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* Inner precise dot */}
      {!isProjectHovered && (
        <motion.div
          className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#D4AF37] pointer-events-none -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovered ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  );
}

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