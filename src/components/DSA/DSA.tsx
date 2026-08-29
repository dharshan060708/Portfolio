import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Canvas } from '../3D/Common/Canvas';
import { useIntersectionObserver } from '../../hooks';
import { cn } from '../../utils';

const dsaStats = {
  totalSolved: 50,
  python3: 41,
  java: 5,
  mysql: 4,
  goal: 300,
};

const focusAreas = [
  { name: 'Arrays', icon: '[]', count: 12, color: '#D4AF37' },
  { name: 'Strings', icon: '""', count: 8, color: '#F5D76E' },
  { name: 'Hash Tables', icon: '{}', count: 10, color: '#B8962E' },
  { name: 'Math', icon: '∑', count: 6, color: '#00FFFF' },
  { name: 'Binary Search', icon: 'log₂', count: 5, color: '#7C3AED' },
  { name: 'Sorting', icon: '↑↓', count: 4, color: '#34A853' },
  { name: 'Dynamic Programming', icon: 'DP', count: 3, color: '#FF6B6B' },
  { name: 'Trie', icon: '🌳', count: 2, color: '#EC4899' },
  { name: 'Divide & Conquer', icon: '÷', count: 3, color: '#6366F1' },
];

const algorithmFlow = [
  'Array',
  'Hash Table',
  'Binary Search',
  'Dynamic Programming',
  'Trie',
];

export function DSA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="dsa"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 overflow-hidden"
      aria-labelledby="dsa-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-gradient" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 noise-texture" />

      {/* 3D DSA Visualization */}
      <div className="absolute top-0 left-0 right-0 h-[400px] md:h-[500px] pointer-events-none">
        <Canvas 
          cameraPosition={[0, 0, 8]} 
          fov={50}
          className="w-full h-full"
        >
          <DSAVisualization algorithmFlow={algorithmFlow} />
        </Canvas>
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-mono text-sm tracking-widest uppercase">THE DSA JOURNEY</span>
          <h2 id="dsa-heading" className="section-title mt-4">THE DSA JOURNEY</h2>
          <div className="gold-line mx-auto mt-6" />
          <p className="section-subtitle mt-6">
            Consistent practice building algorithmic thinking — one problem at a time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Main Stat */}
            <div className="glass-panel p-8 rounded-2xl border-gold/30 relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
              <div className="relative flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-gold font-mono text-xs tracking-widest uppercase">LEETCODE PROFILE</span>
                  <h3 className="text-2xl font-bold text-text-primary mt-1">Problem Solving Progress</h3>
                </div>
                <a
                  href="https://leetcode.com/u/efImqpWfmd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  View Profile →
                </a>
              </div>
              
              <div className="flex items-baseline gap-2 mb-6">
                <motion.span
                  className="text-6xl md:text-7xl font-bold font-mono text-gold"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.3 }}
                >
                  {dsaStats.totalSolved}
                </motion.span>
                <span className="text-text-secondary">/ {dsaStats.goal}+</span>
              </div>

              {/* Progress bar */}
              <div className="h-3 rounded-full bg-dark border border-border overflow-hidden mb-6">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright"
                  initial={{ width: 0 }}
                  animate={{ width: `${(dsaStats.totalSolved / dsaStats.goal) * 100}%` }}
                  transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                />
              </div>

              <p className="text-text-secondary text-sm">
                Currently at <span className="text-gold font-semibold">{(dsaStats.totalSolved / dsaStats.goal * 100).toFixed(1)}%</span> of goal
              </p>
            </div>

            {/* Language breakdown */}
            <div className="glass-panel p-6 rounded-2xl border-border mb-8">
              <h4 className="text-gold font-mono text-xs tracking-widest uppercase mb-6">LANGUAGE BREAKDOWN</h4>
              <div className="grid grid-cols-3 gap-4">
                <StatCard 
                  label="Python3" 
                  value={dsaStats.python3} 
                  color="#3776AB" 
                  icon="🐍"
                />
                <StatCard 
                  label="Java" 
                  value={dsaStats.java} 
                  color="#ED8B00" 
                  icon="☕"
                />
                <StatCard 
                  label="MySQL" 
                  value={dsaStats.mysql} 
                  color="#4479A1" 
                  icon="🗄️"
                />
              </div>
            </div>

            {/* Goal tracker */}
            <div className="glass-panel p-6 rounded-2xl border-gold/30 bg-gold/5">
              <h4 className="text-gold font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                TARGET: 300+ PROBLEMS
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary font-semibold">Remaining</p>
                  <p className="text-3xl font-bold font-mono text-gold">{dsaStats.goal - dsaStats.totalSolved}</p>
                </div>
                <motion.div
                  className="w-20 h-20 rounded-full border-4 border-gold/30 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="text-gold font-bold text-xl">{Math.round((dsaStats.totalSolved / dsaStats.goal) * 100)}%</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Focus Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-panel p-6 rounded-2xl border-border mb-8">
              <h4 className="text-gold font-mono text-xs tracking-widest uppercase mb-6">FOCUS AREAS</h4>
              <div className="space-y-3">
                {focusAreas.map((area, i) => (
                  <motion.div
                    key={area.name}
                    className="group relative overflow-hidden p-4 rounded-xl bg-dark/50 border border-border hover:border-gold/30 transition-all duration-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${area.color}20`, color: area.color }}>
                          {area.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-text-primary">{area.name}</p>
                          <p className="text-text-muted text-sm">{area.count} problems</p>
                        </div>
                      </div>
                      <motion.div
                        className="w-16 h-2 rounded-full bg-dark border border-border overflow-hidden"
                        whileHover={{ scaleX: 1.1 }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${area.color}, ${area.color}80)`, width: `${(area.count / 12) * 100}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(area.count / 12) * 100}%` }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Algorithm flow */}
            <div className="glass-panel p-6 rounded-2xl border-gold/30">
              <h4 className="text-gold font-mono text-xs tracking-widest uppercase mb-6">ALGORITHM PROGRESSION</h4>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {algorithmFlow.map((algo, i) => (
                  <motion.div
                    key={algo}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                  >
                    <span className="px-4 py-2 rounded-lg bg-dark/50 border border-border text-text-secondary group-hover:text-gold group-hover:border-gold/30 transition-all duration-200">
                      {algo}
                    </span>
                    {i < algorithmFlow.length - 1 && (
                      <motion.div
                        className="text-gold"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      >
                        →
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* HackerRank link */}
            <motion.a
              href="https://www.hackerrank.com/profile/dharshanvelumani"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.72 2.88-2.922 5.16-6.12 5.16-3.203 0-5.41-2.287-6.131-5.173 3.72-2.598 7.804-4.711 12.252-4.711 4.463 0 8.547 2.113 12.252 4.711z"/></svg>
                View HackerRank Profile
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-dark/50 border border-border">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-3xl font-bold font-mono" style={{ color }}>{value}</div>
      <div className="text-text-muted text-sm mt-1">{label}</div>
    </div>
  );
}

function DSAVisualization({ algorithmFlow }: { algorithmFlow: string[] }) {
  const nodesRef = useRef<Map<string, THREE.Group>>(new Map());
  const linesRef = useRef<THREE.Line[]>([]);

  const lineObjects = useMemo(() => {
    return algorithmFlow.map(() => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const mat = new THREE.LineBasicMaterial({
        color: '#D4AF37',
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Line(geo, mat);
    });
  }, [algorithmFlow]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    algorithmFlow.forEach((algo, i) => {
      const node = nodesRef.current.get(algo);
      if (!node) return;
      
      const angle = (i / algorithmFlow.length) * Math.PI * 2;
      const radius = 3;
      node.position.x = Math.cos(angle + time * 0.03) * radius;
      node.position.z = Math.sin(angle + time * 0.03) * radius;
      node.position.y = Math.sin(time * 0.5 + i) * 0.4;
      node.rotation.y = time * 0.2;
      
      // Update connection lines
      const nextAlgo = algorithmFlow[(i + 1) % algorithmFlow.length];
      const nextNode = nodesRef.current.get(nextAlgo);
      const line = linesRef.current[i];
      
      if (line && nextNode) {
        const positions = line.geometry.attributes.position.array as Float32Array;
        positions[0] = node.position.x; positions[1] = node.position.y; positions[2] = node.position.z;
        positions[3] = nextNode.position.x; positions[4] = nextNode.position.y; positions[5] = nextNode.position.z;
        line.geometry.attributes.position.needsUpdate = true;
      }
    });
  });

  return (
    <>
      {algorithmFlow.map((algo, i) => {
        const angle = (i / algorithmFlow.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <React.Fragment key={algo}>
            {/* Connection to next */}
            <primitive
              object={lineObjects[i]}
              ref={(el: THREE.Line | null) => { if (el) linesRef.current[i] = el; }}
            />
            
            {/* Node */}
            <group 
              ref={(el: THREE.Group | null) => { if (el) nodesRef.current.set(algo, el); }}
              position={[x, 0, z]}
            >
              <mesh>
                {(() => {
                  switch (algo) {
                    case 'Array': return <boxGeometry args={[0.4, 0.1, 0.4]} />;
                    case 'Hash Table': return <torusGeometry args={[0.25, 0.05, 8, 16]} />;
                    case 'Binary Search': return <coneGeometry args={[0.2, 0.4, 4]} />;
                    case 'Dynamic Programming': return <cylinderGeometry args={[0.2, 0.2, 0.3, 8]} />;
                    case 'Trie': return <tetrahedronGeometry args={[0.3]} />;
                    default: return <icosahedronGeometry args={[0.25]} />;
                  }
                })()}
                <meshStandardMaterial
                  color="#D4AF37"
                  roughness={0.2}
                  metalness={0.8}
                  emissive="#D4AF37"
                  emissiveIntensity={0.3}
                />
              </mesh>
              
              <Html position={[0, -0.7, 0]} transform center>
                <div style={{ 
                  color: '#D4AF37', 
                  fontFamily: '"Space Grotesk", sans-serif', 
                  fontWeight: 600, 
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap'
                }}>
                  {algo.toUpperCase()}
                </div>
              </Html>
            </group>
          </React.Fragment>
        );
      })}
    </>
  );
}