'use client';

import React, { useRef, useEffect, useMemo, forwardRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const colors = ['#D4AF37', '#F5D76E', '#B8962E', '#FFFFFF', '#00FFFF'];
const nodeTypes = ['input', 'hidden', 'output', 'attention', 'memory'] as const;

export function AINetwork({ 
  position = [0, 0, 0], 
  scale = 1, 
  nodeCount = 12 
}: { 
  position?: [number, number, number]; 
  scale?: number; 
  nodeCount?: number; 
}) {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);

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
      groupRef.current.rotation.y = time * 0.03;
    }

    nodesRef.current.forEach((node, i) => {
      if (node) {
        const pulse = Math.sin(time * 3 + i * 0.5) * 0.15 + 0.85;
        node.scale.setScalar(pulse * scale);
        
        const material = node.material as THREE.MeshStandardMaterial;
        if (material && material.emissive) {
          material.emissiveIntensity = 0.3 + Math.sin(time * 4 + i) * 0.2;
        }
      }
    });
  });

  const { nodes } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    
    const layers = [
      { count: 3, x: -1.5, type: 'input' },
      { count: 4, x: -0.5, type: 'hidden' },
      { count: 3, x: 0.5, type: 'attention' },
      { count: 2, x: 1.5, type: 'output' },
    ];

    let nodeIndex = 0;
    layers.forEach((layer) => {
      layer.count = Math.min(layer.count, Math.ceil(nodeCount / layers.length));
      for (let i = 0; i < layer.count; i++) {
        const y = (i - (layer.count - 1) / 2) * 0.6;
        const z = (Math.random() - 0.5) * 0.4;
        nodes.push(new THREE.Vector3(layer.x, y, z));
        nodeIndex++;
      }
    });

    return { nodes };
  }, [nodeCount]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {nodes.map((pos, i) => (
        <AINode
          key={i}
          position={pos.toArray() as [number, number, number]}
          index={i}
          ref={(el) => { nodesRef.current[i] = el; }}
          color={colors[i % colors.length]}
          type={nodeTypes[i % nodeTypes.length]}
        />
      ))}
    </group>
  );
}

interface AINodeProps {
  position: [number, number, number];
  index: number;
  color: string;
  type: 'input' | 'hidden' | 'output' | 'attention' | 'memory';
}

const AINode = forwardRef<THREE.Mesh, AINodeProps>(function AINode({ 
  position, 
  index, 
  color, 
  type 
}, ref) {
  const innerRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.getElapsedTime() * (0.2 + index * 0.05);
      innerRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() + index) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'input':
        return new THREE.OctahedronGeometry(0.08);
      case 'hidden':
        return new THREE.IcosahedronGeometry(0.07);
      case 'attention':
        return new THREE.TorusGeometry(0.07, 0.02, 8, 16);
      case 'output':
        return new THREE.BoxGeometry(0.1, 0.1, 0.1);
      case 'memory':
        return new THREE.CylinderGeometry(0.05, 0.05, 0.12, 8);
      default:
        return new THREE.SphereGeometry(0.07, 16, 16);
    }
  }, [type]);

  return (
    <mesh 
      ref={(el) => {
        innerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<THREE.Mesh | null>).current = el;
      }} 
      position={position} 
      geometry={geometry}
      castShadow
    >
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.8} 
        emissive={color} 
        emissiveIntensity={0.3} 
        transparent 
        opacity={0.9} 
      />
    </mesh>
  );
});