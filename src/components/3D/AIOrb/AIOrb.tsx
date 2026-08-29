'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function AIOrb({ 
  position = [0, 0, 0], 
  scale = 1,
  intensity = 1 
}: { 
  position?: [number, number, number]; 
  scale?: number;
  intensity?: number;
}) {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const shellsRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  const shellConfigs = useMemo(() => [
    { radius: 0.6, segments: 32, rings: 16, opacity: 0.08, speed: 0.15 },
    { radius: 0.8, segments: 24, rings: 12, opacity: 0.05, speed: -0.1 },
    { radius: 1.0, segments: 16, rings: 8, opacity: 0.03, speed: 0.08 },
    { radius: 1.3, segments: 12, rings: 6, opacity: 0.02, speed: -0.05 },
  ], []);

  useEffect(() => {
    if (groupRef.current) {
      scene.add(groupRef.current);
    }
    return () => {
      if (groupRef.current) {
        scene.remove(groupRef.current);
      }
    };
  }, [scene]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.1 * intensity;
      coreRef.current.scale.setScalar(pulse * scale);
      
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.2 * intensity;
    }

    shellsRef.current.forEach((shell, i) => {
      if (shell && shellConfigs[i]) {
        shell.rotation.y = time * shellConfigs[i].speed;
        shell.rotation.x = Math.sin(time * 0.5 + i) * 0.1;
      }
    });

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const alphas = particlesRef.current.geometry.attributes.alpha.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const t = time + i * 0.01;
        const r = 0.6 + Math.sin(t * 0.7) * 0.3;
        const theta = t * 0.3 + i * 0.1;
        const phi = Math.sin(t * 0.5 + i * 0.05) * Math.PI * 0.5;
        
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
        
        alphas[i / 3] = 0.3 + Math.sin(t * 3 + i) * 0.2;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.alpha.needsUpdate = true;
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  // Initialize shells
  useEffect(() => {
    if (!groupRef.current) return;
    
    shellConfigs.forEach((config, i) => {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(config.radius * scale, config.segments, config.rings),
        new THREE.MeshBasicMaterial({
          color: "#D4AF37",
          transparent: true,
          opacity: config.opacity * intensity,
          side: THREE.BackSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      shellsRef.current[i] = shell;
      groupRef.current!.add(shell);
    });

    // Core
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.4 * scale, 1),
      new THREE.MeshStandardMaterial({
        color: "#D4AF37",
        roughness: 0.1,
        metalness: 0.9,
        emissive: "#D4AF37",
        emissiveIntensity: 0.5 * intensity,
        transparent: true,
        opacity: 0.9,
      })
    );
    coreRef.current = core;
    core.castShadow = true;
    groupRef.current.add(core);

    // Inner core
    const innerCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.3 * scale, 0),
      new THREE.MeshBasicMaterial({
        color: "#F5D76E",
        transparent: true,
        opacity: 0.6 * intensity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    innerCore.scale.setScalar(0.5);
    groupRef.current.add(innerCore);

    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(120 * 3);
    const sizes = new Float32Array(120);
    const alphas = new Float32Array(120);
    const colors = new Float32Array(120 * 3);
    const orbits = new Float32Array(120 * 3);

    for (let i = 0; i < 120; i++) {
      const radius = 0.5 + Math.random() * 0.8;
      const speed = 0.2 + Math.random() * 0.5;
      const phase = Math.random() * Math.PI * 2;
      
      positions[i * 3] = radius * Math.cos(phase);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = radius * Math.sin(phase);
      
      sizes[i] = 0.01 + Math.random() * 0.02;
      alphas[i] = 0.3 + Math.random() * 0.5;
      
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 0.2;
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 0.5;
      } else {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
      }
      
      orbits[i * 3] = radius;
      orbits[i * 3 + 1] = speed;
      orbits[i * 3 + 2] = phase;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('orbit', new THREE.BufferAttribute(orbits, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      alphaTest: 0.01,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    groupRef.current.add(particles);

    // Energy beams
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(2 * 3);
      const radius = 0.5;
      const length = 2;
      
      positions[0] = Math.cos(angle) * radius;
      positions[1] = 0;
      positions[2] = Math.sin(angle) * radius;
      positions[3] = Math.cos(angle) * (radius + length);
      positions[4] = 0;
      positions[5] = Math.sin(angle) * (radius + length);
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const beam = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? '#D4AF37' : '#00FFFF',
          transparent: true,
          opacity: 0.1 * intensity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      groupRef.current.add(beam);
    }

    // Data rings
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry((0.7 + i * 0.3) * scale, (0.85 + i * 0.3) * scale, 64),
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? '#D4AF37' : '#00FFFF',
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      ring.rotation.x = -Math.PI / 2;
      groupRef.current.add(ring);
    }

    return () => {
      groupRef.current!.clear();
    };
  }, [scale, intensity, scene]);

  return <group ref={groupRef} position={position} scale={scale} />;
}