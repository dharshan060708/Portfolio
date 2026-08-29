'use client';

import { useMemo } from 'react';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

extend({ Points: THREE.Points, PointsMaterial: THREE.PointsMaterial, BufferGeometry: THREE.BufferGeometry, BufferAttribute: THREE.BufferAttribute });

interface StarsProps {
  count?: number;
  radius?: number;
  size?: number;
  opacity?: number;
}

export function Stars({
  count = 2000,
  radius = 50,
  size = 0.05,
  opacity = 0.6,
}: StarsProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = size * (0.5 + Math.random() * 1.5);
      alphas[i] = opacity * (0.3 + Math.random() * 0.7);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    return geo;
  }, [count, radius, size, opacity]);

  const material = useMemo(() => 
    new THREE.PointsMaterial({
      color: 0xF5D76E,
      size: size,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
      sizeAttenuation: true,
    }),
  [size, opacity]);

  return <points geometry={geometry} material={material} />;
}