import { useState, useEffect } from 'react';

export type DeviceTier = 'mobile' | 'tablet' | 'desktop' | 'ultra';

export interface DeviceCapabilities {
  tier: DeviceTier;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltra: boolean;
  isTouch: boolean;
  isPointerFine: boolean;
  prefersReducedMotion: boolean;
  hasWebGL: boolean;
  dpr: number;
  width: number;
  height: number;
}

function checkWebGL(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    if (typeof window === 'undefined') {
      return {
        tier: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isUltra: false,
        isTouch: false,
        isPointerFine: true,
        prefersReducedMotion: false,
        hasWebGL: true,
        dpr: 1,
        width: 1440,
        height: 900,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isUltra = width >= 1920;

    let tier: DeviceTier = 'desktop';
    if (isMobile) tier = 'mobile';
    else if (isTablet) tier = 'tablet';
    else if (isUltra) tier = 'ultra';

    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasWebGL = checkWebGL();
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = isMobile ? 1 : Math.min(rawDpr, 1.5);

    return {
      tier,
      isMobile,
      isTablet,
      isDesktop,
      isUltra,
      isTouch,
      isPointerFine,
      prefersReducedMotion,
      hasWebGL,
      dpr,
      width,
      height,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isDesktop = width >= 1024 && width < 1920;
      const isUltra = width >= 1920;

      let tier: DeviceTier = 'desktop';
      if (isMobile) tier = 'mobile';
      else if (isTablet) tier = 'tablet';
      else if (isUltra) tier = 'ultra';

      const isPointerFine = window.matchMedia('(pointer: fine)').matches;
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hasWebGL = checkWebGL();
      const rawDpr = window.devicePixelRatio || 1;
      const dpr = isMobile ? 1 : Math.min(rawDpr, 1.5);

      setCapabilities({
        tier,
        isMobile,
        isTablet,
        isDesktop,
        isUltra,
        isTouch,
        isPointerFine,
        prefersReducedMotion,
        hasWebGL,
        dpr,
        width,
        height,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}
