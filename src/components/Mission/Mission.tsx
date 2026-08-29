'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Canvas } from '../3D/Common/Canvas';
import { useIntersectionObserver } from '../../hooks';
import { Target, CheckCircle, Circle, Clock, Rocket, Brain, Code, Globe } from 'lucide-react';
import { cn } from '../../utils';

const missions = [
  {
    id: 'final-year-project',
    title: 'Complete Final Year Project',
    description: 'Deliver a production-ready capstone project demonstrating AI, full-stack, and automation skills.',
    icon: Rocket,
    completed: true,
    category: 'Academic',
  },
  {
    id: 'leetcode-300',
    title: 'Solve 300+ LeetCode Problems',
    description: 'Master data structures and algorithms through consistent daily practice across Python, Java, and SQL.',
    icon: Code,
    completed: false,
    progress: 50,
    target: 300,
    category: 'Technical',
  },
  {
    id: 'open-source',
    title: 'Contribute to Open Source',
    description: 'Make meaningful contributions to AI/ML, automation, or developer tool projects on GitHub.',
    icon: Globe,
    completed: false,
    category: 'Community',
  },
  {
    id: 'ai-agent',
    title: 'Ship a Production-Grade AI Agent',
    description: 'Build and deploy an autonomous AI agent with memory, tool use, and multi-step reasoning capabilities.',
    icon: Brain,
    completed: false,
    category: 'AI/ML',
  },
  {
    id: 'system-design',
    title: 'Master Backend System Design',
    description: 'Deep dive into distributed systems, databases, caching, message queues, and scalability patterns.',
    icon: Target,
    completed: false,
    category: 'Engineering',
  },
];

export function Mission() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 overflow-hidden"
      aria-labelledby="mission-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-gradient opacity-50" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 noise-texture" />

      {/* 3D Mission Control */}
      <div className="absolute top-0 left-0 right-0 h-[300px] md:h-[400px] pointer-events-none">
        <Canvas 
          cameraPosition={[0, 0, 6]} 
          fov={45}
          className="w-full h-full"
        >
          <MissionControl3D />
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
          <span className="text-gold font-mono text-sm tracking-widest uppercase">2026 MISSION</span>
          <h2 id="mission-heading" className="section-title mt-4">2026 MISSION</h2>
          <div className="gold-line mx-auto mt-6" />
          <p className="section-subtitle mt-6">
            Active objectives tracking — transparent progress, no hidden goals.
          </p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          className="glass-panel p-6 rounded-2xl border-gold/30 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gold font-mono text-xs tracking-widest uppercase">OVERALL PROGRESS</h3>
              <p className="text-text-primary font-semibold mt-1">Mission Readiness</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold font-mono text-gold">40%</div>
              <div className="text-text-secondary text-sm">2 of 5 objectives complete</div>
            </div>
          </div>
          <div className="h-3 rounded-full bg-dark border border-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright"
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ delay: 0.3, duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Mission Cards */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3 }}
        >
          {missions.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              index={index}
              isExpanded={expandedId === mission.id}
              onToggle={() => setExpandedId(expandedId === mission.id ? null : mission.id)}
            />
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-12 glass-panel p-6 rounded-2xl border-border"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-text-secondary">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-gold" strokeWidth={2} />
              <span className="text-text-secondary">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-text-muted" strokeWidth={2} />
              <span className="text-text-secondary">Not Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gold to-gold-bright" />
              <span className="text-text-secondary">Target</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface MissionCardProps {
  mission: typeof missions[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function MissionCard({ mission, index, isExpanded, onToggle }: MissionCardProps) {
  const Icon = mission.icon;
  const progress = mission.progress || 0;

  return (
    <motion.article
      className={cn(
        'glass-panel rounded-2xl border-border group overflow-hidden transition-all duration-300',
        mission.completed ? 'border-green-500/30 bg-green-500/5' : 'border-border',
        isExpanded ? 'border-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.15)]' : ''
      )}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.05 }}
      layout
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-start gap-4 text-left"
        aria-expanded={isExpanded}
      >
        {/* Status indicator */}
        <motion.div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
            mission.completed 
              ? 'bg-green-500/20 text-green-500' 
              : progress > 0 
                ? 'bg-gold/20 text-gold border border-gold/30'
                : 'bg-dark/50 text-text-muted border border-border'
          )}
          whileTap={{ scale: 0.95 }}
        >
          {mission.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ 
              background: mission.completed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(212, 175, 55, 0.2)',
              color: mission.completed ? '#22C55E' : '#D4AF37',
              border: mission.completed ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              {mission.completed ? 'COMPLETED' : progress > 0 ? 'IN PROGRESS' : 'PENDING'}
            </span>
            <span className="text-text-muted text-xs font-mono">{mission.category}</span>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">{mission.title}</h3>
          <p className="text-text-secondary text-sm">{mission.description}</p>
        </div>

        {/* Progress/Expand */}
        <div className="flex items-center gap-4">
          {!mission.completed && progress > 0 && (
            <div className="w-32 h-2 rounded-full bg-dark border border-border overflow-hidden hidden sm:block">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright"
                initial={{ width: 0 }}
                animate={{ width: `${(progress / (mission.target || 100)) * 100}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </div>
          )}
          <motion.div
            className="p-2 rounded-lg bg-dark/50 border border-border text-text-secondary"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </motion.div>
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="border-t border-border px-6 pb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {mission.target && (
                <div className="glass-panel p-4 rounded-xl border-border">
                  <div className="text-text-muted text-xs font-mono uppercase mb-1">TARGET</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-gold">{mission.progress}</span>
                    <span className="text-text-secondary">/ {mission.target}</span>
                  </div>
                  <div className="h-2 rounded-full bg-dark border border-border overflow-hidden mt-2">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright"
                      initial={{ width: 0 }}
                      animate={{ width: `${(mission.progress / mission.target) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
              <div className="glass-panel p-4 rounded-xl border-border">
                <div className="text-text-muted text-xs font-mono uppercase mb-1">STATUS</div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: mission.completed ? '#22C55E' : progress > 0 ? '#D4AF37' : '#71717A' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-text-secondary">
                    {mission.completed ? 'Objective achieved' : progress > 0 ? 'Actively working' : 'Planning phase'}
                  </span>
                </div>
              </div>
            </div>
            
            {mission.completed && (
              <motion.div
                className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Mission accomplished</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function MissionControl3D() {
  const centerRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Mesh[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);

  const lineObjects = useMemo(() => {
    return missions.map(() => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const mat = new THREE.LineBasicMaterial({
        color: '#D4AF37',
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (centerRef.current) {
      centerRef.current.rotation.y = time * 0.05;
    }

    satellitesRef.current.forEach((sat, i) => {
      if (!sat) return;
      const angle = time * (0.3 + i * 0.1) + i * (Math.PI * 2 / 5);
      const radius = 2;
      sat.position.x = Math.cos(angle) * radius;
      sat.position.z = Math.sin(angle) * radius;
      sat.position.y = Math.sin(time * 0.5 + i) * 0.3;
      sat.lookAt(0, 0, 0);

      const line = linesRef.current[i];
      if (line) {
        const positions = line.geometry.attributes.position.array as Float32Array;
        positions[0] = 0; positions[1] = 0; positions[2] = 0;
        positions[3] = sat.position.x; positions[4] = sat.position.y; positions[5] = sat.position.z;
        line.geometry.attributes.position.needsUpdate = true;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#fff" castShadow />

      {/* Central mission control */}
      <group ref={centerRef}>
        <mesh castShadow>
          <octahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.1}
            metalness={0.9}
            emissive="#D4AF37"
            emissiveIntensity={0.4}
          />
        </mesh>

        <Html position={[0, -1, 0]} transform center>
          <div style={{ 
            color: '#D4AF37', 
            fontFamily: '"Space Grotesk", sans-serif', 
            fontWeight: 700, 
            fontSize: '12px',
            letterSpacing: '2px',
          }}>
            MISSION CONTROL
          </div>
        </Html>
      </group>

      {/* Orbiting objectives */}
      {missions.map((mission, i) => (
        <mesh
          key={mission.id}
          ref={(el) => { if (el) satellitesRef.current[i] = el; }}
          castShadow
        >
          {mission.completed ? (
            <>
              <icosahedronGeometry args={[0.25, 1]} />
              <meshStandardMaterial
                color="#22C55E"
                roughness={0.2}
                metalness={0.8}
                emissive="#22C55E"
                emissiveIntensity={0.3}
              />
            </>
          ) : (mission.progress !== undefined && mission.progress > 0) ? (
            <>
              <torusGeometry args={[0.25, 0.06, 12, 24]} />
              <meshStandardMaterial
                color="#D4AF37"
                roughness={0.2}
                metalness={0.8}
                emissive="#D4AF37"
                emissiveIntensity={0.3}
              />
            </>
          ) : (
            <>
              <boxGeometry args={[0.35, 0.35, 0.35]} />
              <meshStandardMaterial
                color="#71717A"
                roughness={0.5}
                metalness={0.3}
                transparent
                opacity={0.6}
              />
            </>
          )}
        </mesh>
      ))}

      {/* Connection lines to satellites */}
      {missions.map((mission, i) => (
        <primitive
          key={`line-${mission.id}`}
          object={lineObjects[i]}
          ref={(el: THREE.Line | null) => { if (el) linesRef.current[i] = el; }}
        />
      ))}
    </>
  );
}