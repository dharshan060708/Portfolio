'use client';

import React, { Suspense, useMemo, useRef, Component, ErrorInfo } from 'react';
import { Canvas as R3FCanvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeviceCapabilities, useIntersectionObserver } from '../../../hooks';

extend(THREE);

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL fallback activated:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface CanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  dprLimit?: number;
  disablePostProcessing?: boolean;
}

export function Canvas({
  children,
  className = '',
  cameraPosition = [0, 0, 5],
  fov = 42,
  dprLimit,
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(containerRef, {
    rootMargin: '200px 0px 200px 0px',
    threshold: 0,
  });

  const { isMobile, hasWebGL, dpr: deviceDpr, prefersReducedMotion } = useDeviceCapabilities();

  const camera = useMemo(
    () => ({
      position: cameraPosition,
      fov: isMobile ? Math.min(fov + 6, 55) : fov,
      near: 0.1,
      far: 100,
    }),
    [cameraPosition, fov, isMobile]
  );

  const gl = useMemo(
    () => ({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: false,
      powerPreference: (isMobile ? 'default' : 'high-performance') as WebGLPowerPreference,
      stencil: false,
      depth: true,
    }),
    [isMobile]
  );

  const targetDpr = useMemo(() => {
    if (dprLimit) return Math.min(deviceDpr, dprLimit);
    if (isMobile) return 1;
    return Math.min(deviceDpr, 1.5);
  }, [deviceDpr, isMobile, dprLimit]);

  if (!hasWebGL) {
    return (
      <div ref={containerRef} className={`relative w-full h-full ${className}`}>
        <WorkstationFallback />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <WebGLErrorBoundary fallback={<WorkstationFallback />}>
        <R3FCanvas
          camera={camera}
          gl={gl}
          frameloop={isInView && !prefersReducedMotion ? 'always' : 'never'}
          shadows={!isMobile}
          dpr={targetDpr}
          style={{ outline: 'none', pointerEvents: 'auto' }}
          resize={{ debounce: 100 }}
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </R3FCanvas>
      </WebGLErrorBoundary>
    </div>
  );
}

// Elegant Studio Workstation Fallback Graphic
function WorkstationFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
      <div className="w-full max-w-sm aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#0C0E12] to-[#07080A] border border-white/10 p-6 flex flex-col justify-between shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-[#D6A63A] font-semibold">DEVELOPER WORKSTATION</span>
        </div>
        <div className="space-y-2 py-4">
          <div className="h-2 w-3/4 bg-white/10 rounded" />
          <div className="h-2 w-1/2 bg-[#D6A63A]/40 rounded" />
          <div className="h-2 w-5/6 bg-white/5 rounded" />
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-[#6F7378] pt-2 border-t border-white/5">
          <span>BUILD • AUTOMATE • INNOVATE</span>
          <span className="text-[#1683FF]">READY</span>
        </div>
      </div>
    </div>
  );
}