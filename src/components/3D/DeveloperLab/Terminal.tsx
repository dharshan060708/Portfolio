'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface TerminalProps {
  position?: [number, number, number];
  scale?: number;
}

export function Terminal({ position = [0, 0, 0], scale = 1 }: TerminalProps) {
  const terminalRef = useRef<THREE.Group>(null);

  const terminalContent = useMemo(() => (
    <>
      <div style={terminalStyle}>
        <div style={headerStyle}>
          <div style={dotsStyle}>
            <span style={{...dotStyle, background: '#ff5f57'}} />
            <span style={{...dotStyle, background: '#febc2e'}} />
            <span style={{...dotStyle, background: '#28ca42'}} />
          </div>
          <span style={titleStyle}>terminal.zsh</span>
        </div>
        <div style={contentStyle}>
          <div style={lineStyle}><span style={promptStyle}>dharshan@devlab</span><span style={separatorStyle}>:~$</span> <span style={commandStyle}>python train_model.py</span></div>
          <div style={lineStyle}><span style={outputStyle}>[Epoch 1/100] Loss: 0.8472 | Acc: 0.7231</span></div>
          <div style={lineStyle}><span style={outputStyle}>[Epoch 2/100] Loss: 0.6234 | Acc: 0.7891</span></div>
          <div style={lineStyle}><span style={outputStyle}>[Epoch 3/100] Loss: 0.5123 | Acc: 0.8234</span></div>
          <div style={lineStyle}><span style={outputStyle}>...</span></div>
          <div style={lineStyle}><span style={successStyle}>Model saved to ./checkpoints/best.pt</span></div>
          <div style={lineStyle}><span style={promptStyle}>dharshan@devlab</span><span style={separatorStyle}>:~$</span> <span style={commandStyle}>n8n start --tunnel</span></div>
          <div style={lineStyle}><span style={outputStyle}>Starting n8n on http://localhost:5678</span></div>
          <div style={lineStyle}><span style={outputStyle}>Tunnel URL: https://abc123.ngrok.io</span></div>
          <div style={lineStyle}><span style={promptStyle}>dharshan@devlab</span><span style={separatorStyle}>:~$</span> <span style={cursorStyle}>&nbsp;</span></div>
        </div>
      </div>
    </>
  ), []);

  useFrame((state) => {
    if (terminalRef.current) {
      terminalRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.03;
    }
  });

  return (
    <group ref={terminalRef} position={position} scale={scale}>
      <RoundedBox
        args={[1.6, 1.2, 0.05]}
        radius={0.02}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#0D0D0D" 
          roughness={0.1} 
          metalness={0.8} 
          envMapIntensity={1} />
      </RoundedBox>

      <Html
        position={[0, 0, 0.08]}
      >
        {terminalContent}
      </Html>

      <mesh position={[0, 0, 0.085]} scale={[1.55, 1.15, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          color="#00FF88"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

const terminalStyle: React.CSSProperties = {
  background: '#0D1117',
  borderRadius: '8px',
  overflow: 'hidden',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '11px',
  lineHeight: '1.5',
  color: '#E6EDF3',
  width: '100%',
  height: '100%',
};

const headerStyle: React.CSSProperties = {
  background: '#161B22',
  borderBottom: '1px solid #30363D',
  padding: '8px 10px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const dotsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
};

const dotStyle: React.CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  display: 'block',
};

const titleStyle: React.CSSProperties = {
  color: '#8B949E',
  fontSize: '10px',
  marginLeft: '8px',
};

const contentStyle: React.CSSProperties = {
  padding: '10px',
  height: 'calc(100% - 36px)',
  overflow: 'auto',
};

const lineStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '6px',
  marginBottom: '4px',
  whiteSpace: 'pre-wrap',
};

const promptStyle: React.CSSProperties = {
  color: '#3FB950',
  fontWeight: 500,
  whiteSpace: 'nowrap',
};

const separatorStyle: React.CSSProperties = {
  color: '#8B949E',
  whiteSpace: 'nowrap',
};

const commandStyle: React.CSSProperties = {
  color: '#D2A8FF',
  whiteSpace: 'nowrap',
};

const outputStyle: React.CSSProperties = {
  color: '#A5D6FF',
  whiteSpace: 'nowrap',
};

const successStyle: React.CSSProperties = {
  color: '#3FB950',
  fontWeight: 500,
  whiteSpace: 'nowrap',
};

const cursorStyle: React.CSSProperties = {
  color: '#D4AF37',
  animation: 'blink 1s infinite',
  whiteSpace: 'nowrap',
};