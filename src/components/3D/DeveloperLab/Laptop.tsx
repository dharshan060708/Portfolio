'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopProps {
  position?: [number, number, number];
  scale?: number;
}

export function Laptop({ position = [0, 0.5, 0], scale = 1 }: LaptopProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const keyboardRef = useRef<THREE.Mesh>(null);

  const screenContent = useMemo(() => (
    <>
      <div style={codeEditorStyle}>
        <div style={editorHeaderStyle}>
          <div style={windowControlsStyle}>
            <span style={{...dotStyle, background: '#ff5f57'}} />
            <span style={{...dotStyle, background: '#febc2e'}} />
            <span style={{...dotStyle, background: '#28ca42'}} />
          </div>
          <div style={tabStyle}>
            <span style={activeTabStyle}>main.py</span>
            <span style={inactiveTabStyle}>config.yaml</span>
            <span style={inactiveTabStyle}>requirements.txt</span>
          </div>
        </div>
        <pre style={codeStyle}>
          <code>
            {codeLines.map((line, i) => (
              <div key={i} style={lineStyle}>
                <span style={indentStyle}>{'    '}</span>
                <span style={keywordStyle}>{line.keyword}</span>
                <span style={textStyle}>{line.text}</span>
                <span style={stringStyle}>{line.string}</span>
                <span style={commentStyle}>{line.comment}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </>
  ), []);

  useFrame((state) => {
    if (screenRef.current && screenRef.current.material) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <RoundedBox
        ref={keyboardRef}
        args={[2.2, 0.08, 1.4]}
        radius={0.05}
        position={[0, -0.04, -0.1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#0A0A0A" 
          roughness={0.3} 
          metalness={0.8} 
          envMapIntensity={1} />
      </RoundedBox>

      <mesh
        position={[0, 0.02, -0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial 
          color="#0D0D0D" 
          roughness={0.8} 
          metalness={0.2}
          opacity={0.5}
          transparent
        />
      </mesh>

      <RoundedBox
        ref={screenRef}
        args={[2, 1.3, 0.06]}
        radius={0.03}
        position={[0, 0.75, -0.1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.1} 
          metalness={0.9} 
          envMapIntensity={1.5}
          emissive="#D4AF37"
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      <Html
        position={[0, 0.75, 0.08]}
        rotation={[-0.05, 0, 0]}
      >
        {screenContent}
      </Html>

      <mesh position={[0, 0.75, 0.085]} scale={[1.95, 1.25, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>

      <RoundedBox
        args={[2.2, 0.04, 0.1]}
        radius={0.02}
        position={[0, 0.1, -0.8]}
        castShadow
      >
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} metalness={0.7} />
      </RoundedBox>

      <RoundedBox
        args={[0.6, 0.02, 0.4]}
        radius={0.02}
        position={[0, 0.03, -0.4]}
      >
        <meshStandardMaterial color="#0D0D0D" roughness={0.2} metalness={0.9} />
      </RoundedBox>

      <Html
        position={[0, 0.03, -0.65]}
      >
        <div style={brandStyle}>DV</div>
      </Html>
    </group>
  );
}

const codeLines = [
  { keyword: 'class ', text: 'Dharshan', string: ':', comment: '' },
  { keyword: '', text: '    ', keyword2: 'role', text2: ' = ', string: '"AI Developer"', comment: '' },
  { keyword: '', text: '    ', keyword2: 'focus', text2: ' = [', string: '', comment: '' },
  { keyword: '', text: '        ', keyword2: '', text2: '', string: '"AI Systems"', comment: ',' },
  { keyword: '', text: '        ', keyword2: '', text2: '', string: '"Automation"', comment: ',' },
  { keyword: '', text: '        ', keyword2: '', text2: '', string: '"Full Stack"', comment: ',' },
  { keyword: '', text: '        ', keyword2: '', text2: '', string: '"Local AI"', comment: '' },
  { keyword: '', text: '    ', keyword2: '', text2: ']', string: '', comment: '' },
  { keyword: '', text: '', keyword2: '', text2: '', string: '', comment: '' },
  { keyword: '', text: '    ', keyword2: 'def ', text2: 'build()', string: ':', comment: '' },
  { keyword: '', text: '        ', keyword2: 'return ', string: '"Intelligent Systems"', comment: '' },
];

const codeEditorStyle: React.CSSProperties = {
  background: '#0D1117',
  borderRadius: '8px',
  overflow: 'hidden',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '13px',
  lineHeight: '1.6',
  color: '#E6EDF3',
  width: '100%',
  height: '100%',
  boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)',
};

const editorHeaderStyle: React.CSSProperties = {
  background: '#161B22',
  borderBottom: '1px solid #30363D',
  padding: '10px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const windowControlsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
};

const dotStyle: React.CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  display: 'block',
};

const tabStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  marginLeft: 'auto',
};

const activeTabStyle: React.CSSProperties = {
  padding: '4px 10px',
  background: '#0D1117',
  borderRadius: '4px 4px 0 0',
  border: '1px solid #30363D',
  borderBottom: 'none',
  color: '#D4AF37',
  fontSize: '11px',
  fontWeight: 500,
};

const inactiveTabStyle: React.CSSProperties = {
  padding: '4px 10px',
  background: '#161B22',
  borderRadius: '4px 4px 0 0',
  border: '1px solid #30363D',
  borderBottom: 'none',
  color: '#8B949E',
  fontSize: '11px',
};

const codeStyle: React.CSSProperties = {
  padding: '16px',
  margin: 0,
  overflow: 'auto',
  maxHeight: '100%',
};

const lineStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
};

const indentStyle: React.CSSProperties = {
  color: '#484F58',
  whiteSpace: 'pre',
};

const keywordStyle: React.CSSProperties = {
  color: '#FF7B72',
  fontWeight: 500,
};

const textStyle: React.CSSProperties = {
  color: '#E6EDF3',
};

const stringStyle: React.CSSProperties = {
  color: '#A5D6FF',
};

const commentStyle: React.CSSProperties = {
  color: '#8B949E',
  fontStyle: 'italic',
};

const brandStyle: React.CSSProperties = {
  color: '#D4AF37',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '2px',
  fontFamily: '"Space Grotesk", sans-serif',
  textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
};