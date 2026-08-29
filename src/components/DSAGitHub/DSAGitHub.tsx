'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '../3D/Common/Canvas';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, ExternalLink, Github, Code2, Award, Terminal } from 'lucide-react';
import { profiles } from '../../data';
import { useGitHubStats } from '../../hooks';

export function DSAGitHub() {
  const leetcodeProfile = profiles.find((p) => p.name === 'LeetCode');
  const githubProfile = profiles.find((p) => p.name === 'GitHub');
  const hackerrankProfile = profiles.find((p) => p.name === 'HackerRank');
  const { publicRepos } = useGitHubStats();

  return (
    <section id="dsa" className="relative z-10 py-16 sm:py-20" aria-label="DSA & GitHub">
      <div className="section-container">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <div className="section-heading mb-2">
            CODING PROFILES & ACTIVITY
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* LEFT CARD: DSA JOURNEY matching reference */}
          <motion.div
            className="reference-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[400px]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            {/* 3D Golden Rising Bar Chart Visual */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 sm:w-5/12 pointer-events-none opacity-85">
              <Canvas cameraPosition={[3, 2.5, 4.5]} fov={40} className="w-full h-full">
                <GoldenBars3D />
              </Canvas>
            </div>

            {/* Left Content */}
            <div className="relative z-10 space-y-4 max-w-[280px] sm:max-w-xs">
              <div>
                <span className="text-xs font-mono text-[#D6A63A] uppercase tracking-wider block mb-1">
                  LEETCODE VERIFIED
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F5]">
                  DSA JOURNEY
                </h3>
              </div>

              {/* Verified LeetCode Breakdown */}
              <div className="space-y-1.5 py-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-[#D6A63A]">50</span>
                  <span className="text-xs text-[#A7A7A7] font-medium">Problems Solved</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#A7A7A7]">
                  <span className="px-2 py-0.5 rounded bg-[#101215] border border-white/5 text-[#F2C45E]">41 Python3</span>
                  <span className="px-2 py-0.5 rounded bg-[#101215] border border-white/5 text-blue-400">5 Java</span>
                  <span className="px-2 py-0.5 rounded bg-[#101215] border border-white/5 text-emerald-400">4 MySQL</span>
                </div>
                <p className="text-[11px] text-[#6F7378] font-mono pt-1">Target Roadmap: 300+ Problems</p>
              </div>

              <p className="text-xs text-[#A7A7A7] leading-relaxed">
                Solving problems. Building logic. Becoming a better developer every day.
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 pt-6">
              <a
                href={leetcodeProfile?.url || 'https://leetcode.com/u/efImqpWfmd/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 text-xs sm:text-sm"
              >
                <span>View LeetCode Profile</span>
                <ArrowRight className="w-4 h-4 text-[#D6A63A]" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT CARD: GITHUB ACTIVITY matching reference */}
          <motion.div
            id="github"
            className="reference-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[400px]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* 3D Holographic Globe Visual */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 sm:w-5/12 pointer-events-none opacity-90">
              <Canvas cameraPosition={[0, 0, 3.8]} fov={42} className="w-full h-full">
                <HolographicGlobe3D />
              </Canvas>
            </div>

            {/* Left Content */}
            <div className="relative z-10 space-y-4 max-w-[280px] sm:max-w-xs">
              <div>
                <span className="text-xs font-mono text-[#1683FF] uppercase tracking-wider block mb-1">
                  OPEN SOURCE & SYSTEMS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F5]">
                  GITHUB ACTIVITY
                </h3>
              </div>

              {/* Verified Repositories Info */}
              <div className="space-y-1.5 py-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-[#1683FF]">{publicRepos}</span>
                  <span className="text-xs text-[#A7A7A7] font-medium">Public Repositories</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#A7A7A7]">
                  <span className="px-2 py-0.5 rounded bg-[#101215] border border-white/5 text-[#1683FF]">Full-Stack</span>
                  <span className="px-2 py-0.5 rounded bg-[#101215] border border-white/5 text-purple-400">Local AI</span>
                  <span className="px-2 py-0.5 rounded bg-[#101215] border border-white/5 text-green-400">Automation</span>
                </div>
              </div>

              <p className="text-xs text-[#A7A7A7] leading-relaxed">
                Building in public. Contributing. Learning. Sharing architectures and toolkits.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-2.5">
              <a
                href={githubProfile?.url || 'https://github.com/dharshan060708'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 text-xs sm:text-sm"
              >
                <span>View GitHub Profile</span>
                <ArrowRight className="w-4 h-4 text-[#1683FF]" />
              </a>

              <a
                href={hackerrankProfile?.url || 'https://www.hackerrank.com/profile/dharshanvelumani'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-1.5 text-xs py-2 px-3"
              >
                <Terminal className="w-3.5 h-3.5 text-[#2EC866]" />
                <span>HackerRank</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// 3D Isometric Golden Rising Bars for DSA
function GoldenBars3D() {
  const groupRef = useRef<THREE.Group>(null);
  const heights = [0.6, 0.9, 1.3, 1.7, 2.2, 2.6, 3.1];

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = -0.4 + Math.sin(time * 0.4) * 0.04;
  });

  return (
    <group ref={groupRef} position={[-0.4, -1.2, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} color="#FFF5DB" />
      <pointLight position={[1, 1, 2]} intensity={1.2} color="#D6A63A" distance={5} />

      {heights.map((h, i) => {
        const x = (i - 3) * 0.45;
        const z = -(i - 3) * 0.35;
        return (
          <group key={i} position={[x, h / 2, z]}>
            <RoundedBox args={[0.26, h, 0.26]} radius={0.03} smoothness={2}>
              <meshStandardMaterial
                color="#D6A63A"
                roughness={0.2}
                metalness={0.9}
                emissive="#9E7420"
                emissiveIntensity={0.2}
              />
            </RoundedBox>
            {/* Peak node */}
            <mesh position={[0, h / 2 + 0.03, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#F2C45E" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// 3D Holographic Dark Blue Globe for GitHub
function HolographicGlobe3D() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!globeRef.current) return;
    const time = state.clock.getElapsedTime();
    globeRef.current.rotation.y = time * 0.2;
    globeRef.current.rotation.x = Math.sin(time * 0.15) * 0.08;
  });

  return (
    <group ref={globeRef} position={[0.2, -0.1, 0]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 4]} intensity={1.2} color="#1683FF" />

      {/* Core Dark Sphere */}
      <mesh>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshStandardMaterial color="#060C18" roughness={0.7} metalness={0.4} />
      </mesh>

      {/* Wireframe Network Rings */}
      <mesh>
        <sphereGeometry args={[1.27, 16, 16]} />
        <meshBasicMaterial color="#1683FF" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.65, 0.015, 8, 32]} />
        <meshBasicMaterial color="#1683FF" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
