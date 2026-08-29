'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField({
  count = 1000,
  radius = 10,
  color = '#D4AF37',
  speed = 0.5,
  size = 0.02,
  blending = THREE.AdditiveBlending,
}: { count?: number; radius?: number; color?: string; speed?: number; size?: number; blending?: THREE.Blending }) {
  const { scene } = useThree();
  const particlesRef = useRef<THREE.Points | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const baseColor = new THREE.Color(color);
    const altColor = new THREE.Color('#F5D76E');
    const thirdColor = new THREE.Color('#00FFFF');

    for (let i = 0; i < count; i++) {
      const r = radius * (0.2 + Math.random() * 0.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = size * (0.3 + Math.random() * 1.5);
      alphas[i] = 0.2 + Math.random() * 0.6;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      const colorChoice = Math.random();
      let c: THREE.Color;
      if (colorChoice < 0.5) c = baseColor;
      else if (colorChoice < 0.8) c = altColor;
      else c = thirdColor;
      
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: size,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: blending,
      depthWrite: false,
      sizeAttenuation: true,
      alphaTest: 0.01,
    });

    const points = new THREE.Points(geo, material);
    particlesRef.current = points;
    scene.add(points);

    return () => {
      scene.remove(points);
      geo.dispose();
      material.dispose();
    };
  }, [count, radius, size, color, blending, scene]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const delta = state.clock.getDelta();
    timeRef.current += delta * speed;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;
    const alphas = particlesRef.current.geometry.attributes.alpha.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const t = timeRef.current + i * 0.01;
      positions[i * 3] += Math.sin(t * 0.5) * velocities[i * 3] * delta * 60;
      positions[i * 3 + 1] += Math.cos(t * 0.3) * velocities[i * 3 + 1] * delta * 60;
      positions[i * 3 + 2] += Math.sin(t * 0.7) * velocities[i * 3 + 2] * delta * 60;

      const r = Math.sqrt(
        positions[i * 3] ** 2 + 
        positions[i * 3 + 1] ** 2 + 
        positions[i * 3 + 2] ** 2
      );
      if (r > radius) {
        const factor = radius / r;
        positions[i * 3] *= factor;
        positions[i * 3 + 1] *= factor;
        positions[i * 3 + 2] *= factor;
      }

      alphas[i] = 0.2 + Math.sin(t * 2 + i) * 0.2;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.alpha.needsUpdate = true;
    particlesRef.current.rotation.y += delta * 0.02 * speed;
    particlesRef.current.rotation.x += delta * 0.01 * speed;
  });

  return null;
}