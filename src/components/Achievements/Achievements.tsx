'use client';

import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '../3D/Common/Canvas';
import { useIntersectionObserver } from '../../hooks';
import { achievements, education } from '../../data';
import { Award, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import { cn } from '../../utils';

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 overflow-hidden"
      aria-labelledby="achievements-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-gradient opacity-50" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* 3D Trophy */}
      <div className="absolute top-0 left-0 right-0 h-[300px] md:h-[400px] pointer-events-none">
        <Canvas 
          cameraPosition={[0, 0.5, 4]} 
          fov={45}
          className="w-full h-full"
          disablePostProcessing
        >
          <Trophy3D />
        </Canvas>
      </div>

      <div className="section-container relative z-10 pt-6 md:pt-0">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-mono text-sm tracking-widest uppercase">MILESTONES</span>
          <h2 id="achievements-heading" className="section-title mt-4">MILESTONES</h2>
          <div className="gold-line mx-auto mt-6" />
          <p className="section-subtitle mt-6">
            Verified achievements and educational background.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-gold font-mono text-xs tracking-widest uppercase mb-8">ACHIEVEMENTS</h3>
            <div className="space-y-6">
              {achievements.map((achievement, i) => (
                <motion.article
                  key={achievement.id}
                  className="glass-panel p-6 rounded-2xl border-gold/30 group relative overflow-hidden"
                  whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.8)', boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}40)`, color: achievement.color }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Award className="w-7 h-7" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gold font-mono text-xs tracking-widest uppercase">{achievement.date}</span>
                        {achievement.verified && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded font-mono">
                            <CheckCircle className="w-3 h-3" />
                            VERIFIED
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-text-primary mb-2">{achievement.title}</h4>
                      <p className="text-text-secondary">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-gold font-mono text-xs tracking-widest uppercase mb-8">EDUCATION</h3>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.article
                  key={edu.id}
                  className="glass-panel p-6 rounded-2xl border-border group relative overflow-hidden"
                  whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.5)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-gold/20 to-gold-bright/20 text-gold">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gold font-mono text-xs tracking-widest uppercase">
                          {edu.current ? 'Present' : `${edu.startYear} – ${edu.endYear}`}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-text-primary mb-1">{edu.degree}</h4>
                      <p className="text-gold font-medium mb-2">{edu.institution}</p>
                      <p className="text-text-secondary mb-2">{edu.department}</p>
                      <p className="text-text-muted text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </p>
                      {edu.description && (
                        <p className="text-text-secondary text-sm mt-3">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Trophy3D() {
  const trophyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (trophyRef.current) {
      trophyRef.current.rotation.y = time * 0.1;
      
      // Float animation
      trophyRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={trophyRef}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#F5D76E" castShadow />
      <pointLight position={[0, 3, 0]} intensity={1} color="#D4AF37" distance={5} decay={2} />

      {/* Base */}
      <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial 
          color="#1A1A1A" 
          roughness={0.3} 
          metalness={0.8} 
          envMapIntensity={1} />
      </mesh>

      <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          roughness={0.2} 
          metalness={0.9} 
          emissive="#D4AF37"
          emissiveIntensity={0.2} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          roughness={0.2} 
          metalness={0.9} />
      </mesh>

      {/* Cup */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <coneGeometry args={[0.35, 0.5, 32]} />
        <meshStandardMaterial 
          color="#F5D76E" 
          roughness={0.1} 
          metalness={0.9} 
          emissive="#F5D76E"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide} />
      </mesh>

      {/* Inner cup */}
      <mesh position={[0, 0.15, 0]}>
        <coneGeometry args={[0.3, 0.4, 32]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          roughness={0.1} 
          metalness={0.9} 
          side={THREE.BackSide} />
      </mesh>

      {/* Handles */}
      {[-1, 1].map(side => (
        <mesh key={side} position={[side * 0.35, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial 
            color="#F5D76E" 
            roughness={0.1} 
            metalness={0.9} />
        </mesh>
      ))}

      {/* Particles */}
      <TrophyParticles />
    </group>
  );
}

function TrophyParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.02;
        if (positions[i + 1] > 1) {
          positions[i + 1] = -0.5;
          positions[i] = (Math.random() - 0.5) * 0.8;
          positions[i + 2] = (Math.random() - 0.5) * 0.8;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(50 * 3);
    const sizes = new Float32Array(50);
    const colors = new Float32Array(50 * 3);
    
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 1] = Math.random() * 1.5 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      sizes[i] = Math.random() * 0.03 + 0.01;
      colors[i * 3] = 1; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 0.2;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geo;
  }, []);

  const material = useMemo(() => 
    new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  []);

  return <points ref={particlesRef} geometry={geometry} material={material} />;
}