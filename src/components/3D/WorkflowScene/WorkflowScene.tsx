import React, { useRef, useEffect, useMemo, forwardRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const workflowSteps = [
  { id: 'user', label: 'USER', icon: '👤', color: '#D4AF37', type: 'start' },
  { id: 'webhook', label: 'WEBHOOK', icon: '🔗', color: '#F5D76E', type: 'process' },
  { id: 'ai', label: 'AI MODEL', icon: '🧠', color: '#00FFFF', type: 'ai' },
  { id: 'classify', label: 'CLASSIFY', icon: '📊', color: '#B8962E', type: 'process' },
  { id: 'db', label: 'DATABASE', icon: '🗄️', color: '#34A853', type: 'storage' },
  { id: 'auto', label: 'AUTOMATE', icon: '⚙️', color: '#D2A8FF', type: 'process' },
  { id: 'notify', label: 'NOTIFY', icon: '📧', color: '#FF7B72', type: 'output' },
];

export function WorkflowScene({ 
  position = [0, 0, 0], 
  scale = 1, 
  animated = true 
}: { 
  position?: [number, number, number]; 
  scale?: number; 
  animated?: boolean; 
}) {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<(THREE.Group | null)[]>([]);

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
    if (!animated) return;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
  });

  const nodePositions = useMemo(() => {
    const positions: Record<string, THREE.Vector3> = {};
    const radius = 3;
    const centerY = 0;
    
    workflowSteps.forEach((step, i) => {
      const angle = (i / workflowSteps.length) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions[step.id] = new THREE.Vector3(x, centerY, z);
    });
    
    return positions;
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {workflowSteps.map((step, i) => (
        <WorkflowNode
          key={step.id}
          position={nodePositions[step.id].toArray() as [number, number, number]}
          step={step}
          index={i}
          ref={(el) => { nodesRef.current[i] = el; }}
        />
      ))}
    </group>
  );
}

interface WorkflowNodeProps {
  position: [number, number, number];
  step: typeof workflowSteps[0];
  index: number;
}

const WorkflowNode = forwardRef<THREE.Group, WorkflowNodeProps>(function WorkflowNode({ 
  position, 
  step, 
  index 
}, ref) {
  const groupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (coreRef.current) {
      coreRef.current.rotation.y = time * (0.3 + index * 0.1);
      coreRef.current.rotation.x = Math.sin(time + index) * 0.1;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.y = -time * (0.2 + index * 0.05);
      ringRef.current.rotation.x = Math.cos(time + index) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    switch (step.type) {
      case 'start':
        return new THREE.OctahedronGeometry(0.15);
      case 'ai':
        return new THREE.TorusGeometry(0.12, 0.04, 10, 20);
      case 'storage':
        return new THREE.CylinderGeometry(0.1, 0.1, 0.25, 8);
      case 'output':
        return new THREE.BoxGeometry(0.18, 0.18, 0.18);
      default:
        return new THREE.IcosahedronGeometry(0.12);
    }
  }, [step.type]);

  return (
    <group 
      ref={(el) => {
        groupRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<THREE.Group | null>).current = el;
      }} 
      position={position}
    >
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.015, 8, 32]} />
        <meshBasicMaterial 
          color={step.color} 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh 
        ref={coreRef}
        position={[0, 0, 0]}
        geometry={geometry}
        castShadow
      >
        <meshStandardMaterial 
          color={step.color} 
          roughness={0.2} 
          metalness={0.8} 
          emissive={step.color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.95}
        />
      </mesh>

      <Html
        position={[0, -0.5, 0]}
      >
        <div style={labelStyle}>
          <div style={iconStyle}>{step.icon}</div>
          <div style={textStyle}>{step.label}</div>
        </div>
      </Html>

      <PulseRing color={step.color} index={index} />
    </group>
  );
});

function PulseRing({ color, index }: { color: string; index: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.getElapsedTime() + index * 1.5;
      const scale = 1 + (Math.sin(time) * 0.5 + 0.5) * 1.5;
      const opacity = (Math.cos(time) * 0.5 + 0.5) * 0.3;
      
      ringRef.current.scale.setScalar(scale);
      const material = ringRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = opacity;
    }
  });

  return (
    <mesh
      ref={ringRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[0.25, 0.3, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  textAlign: 'center',
};

const iconStyle: React.CSSProperties = {
  fontSize: '16px',
  filter: 'drop-shadow(0 0 8px currentColor)',
};

const textStyle: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '10px',
  fontWeight: 600,
  fontFamily: '"Space Grotesk", sans-serif',
  letterSpacing: '0.5px',
  textShadow: '0 0 10px rgba(0,0,0,0.8)',
};