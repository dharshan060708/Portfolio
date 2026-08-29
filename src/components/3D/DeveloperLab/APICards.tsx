'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function APICards({ position = [0, 0, 0], count = 4, scale = 1 }: { position?: [number, number, number]; count?: number; scale?: number }) {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const endpoints = [
    { method: 'GET', path: '/api/v1/health', status: 200 },
    { method: 'POST', path: '/api/v1/chat', status: 201 },
    { method: 'GET', path: '/api/v1/leads', status: 200 },
    { method: 'POST', path: '/api/v1/vector/search', status: 200 },
    { method: 'GET', path: '/api/v1/reports', status: 200 },
    { method: 'DELETE', path: '/api/v1/cache', status: 204 },
  ];

  const methodColors: Record<string, string> = {
    GET: '#3FB950',
    POST: '#D2A8FF',
    PUT: '#F5D76E',
    DELETE: '#FF7B72',
    PATCH: '#A5D6FF',
  };

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
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {Array.from({ length: count }).map((_, i) => {
        const endpoint = endpoints[i % endpoints.length];
        const yOffset = (i - (count - 1) / 2) * 0.5;
        const zOffset = Math.sin(i * 1.5) * 0.3;
        
        return (
          <group key={i} position={[0, yOffset, zOffset]}>
            <RoundedBox
              args={[2.2, 0.4, 0.04]}
              radius={0.02}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial 
                color="#0D1117" 
                roughness={0.3} 
                metalness={0.5} 
                envMapIntensity={0.5} />
            </RoundedBox>

            <Html
              position={[0, 0, 0.07]}
            >
              <div style={cardStyle}>
                <span style={{
                  ...badgeStyle,
                  background: methodColors[endpoint.method] + '20',
                  color: methodColors[endpoint.method],
                }}>
                  {endpoint.method}
                </span>
                <span style={pathStyle}>{endpoint.path}</span>
                <span style={{
                  ...statusStyle,
                  color: endpoint.status >= 400 ? '#FF7B72' : '#3FB950',
                }}>
                  {endpoint.status}
                </span>
              </div>
            </Html>

            <mesh
              position={[-1.05, 0, 0.08]}
              scale={[0.08, 0.08, 1]}
            >
              <sphereGeometry args={[0.5, 8, 8]} />
              <meshBasicMaterial 
                color={methodColors[endpoint.method]} 
                transparent 
                opacity={0.6} 
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '0 12px',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '11px',
};

const badgeStyle: React.CSSProperties = {
  padding: '2px 6px',
  borderRadius: '3px',
  fontSize: '9px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const pathStyle: React.CSSProperties = {
  color: '#E6EDF3',
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const statusStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '10px',
};