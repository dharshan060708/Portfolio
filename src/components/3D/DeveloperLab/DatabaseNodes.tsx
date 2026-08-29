'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, RoundedBox, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export function DatabaseNodes({ position = [0, 0, 0], count = 3, scale = 1 }: { position?: [number, number, number]; count?: number; scale?: number }) {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const cylindersRef = useRef<(THREE.Mesh | null)[]>([]);

  const labels = ['Users', 'Vectors', 'Logs', 'Cache', 'Analytics'];

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
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
    
    cylindersRef.current.forEach((cylinder, i) => {
      if (cylinder) {
        cylinder.position.y = Math.sin(state.clock.getElapsedTime() * 1.5 + i) * 0.05;
      }
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 0.3 + (i % 3) * 0.15;
        
        return (
          <group key={i} position={[x, height / 2, z]}>
            <Cylinder
              ref={(el) => { cylindersRef.current[i] = el; }}
              args={[0.25, 0.25, height, 16]}
              position={[0, 0, 0]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#0A0A0A' : '#121212'} 
                roughness={0.3} 
                metalness={0.7} 
                envMapIntensity={1}
                transparent
                opacity={0.9}
              />
            </Cylinder>

            <Cylinder
              args={[0.26, 0.26, 0.02, 16]}
              position={[0, height / 2 + 0.01, 0]}
              castShadow
            >
              <meshStandardMaterial 
                color="#D4AF37" 
                roughness={0.2} 
                metalness={0.9} 
                emissive="#D4AF37"
                emissiveIntensity={0.2}
              />
            </Cylinder>

            <Cylinder
              args={[0.26, 0.26, 0.02, 16]}
              position={[0, -height / 2 - 0.01, 0]}
              castShadow
            >
              <meshStandardMaterial 
                color="#D4AF37" 
                roughness={0.2} 
                metalness={0.9} 
              />
            </Cylinder>

            <DataRings 
              height={height} 
              index={i} 
              color={i % 2 === 0 ? '#D4AF37' : '#00FFFF'} 
            />

            <Html
              position={[0, height + 0.2, 0]}
            >
              <div style={labelStyle}>
                {labels[i % labels.length]}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function DataRings({ height, index, color }: { height: number; index: number; color: string }) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.getElapsedTime() * (0.5 + index * 0.2);
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() + index) * 0.1;
    }
  });

  return (
    <group ref={ringRef}>
      {Array.from({ length: 3 }).map((_, j) => (
        <mesh
          key={j}
          position={[0, -height / 2 + 0.05 + (j / 2) * height, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.18 + j * 0.04, 0.01, 8, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.4 - j * 0.1} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}
    </group>
  );
}

const labels = ['Users', 'Vectors', 'Logs', 'Cache', 'Analytics'];

const labelStyle: React.CSSProperties = {
  color: '#A1A1AA',
  fontSize: '10px',
  fontWeight: 500,
  fontFamily: '"Space Grotesk", sans-serif',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  textShadow: '0 0 10px rgba(0,0,0,0.5)',
};