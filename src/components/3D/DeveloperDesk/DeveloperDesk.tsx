'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// High-resolution dynamic VS Code dark IDE texture for physical monitor screen
function createVSCodeScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // VS Code Dark Background
    ctx.fillStyle = '#0F1115';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sidebar Activity Bar
    ctx.fillStyle = '#0A0C0E';
    ctx.fillRect(0, 0, 48, canvas.height);
    ctx.fillStyle = '#1A1E24';
    ctx.fillRect(47, 0, 1, canvas.height);

    // Activity bar icons (dots/squares)
    ctx.fillStyle = '#D6A63A';
    ctx.fillRect(16, 20, 16, 16);
    ctx.fillStyle = '#4A5260';
    ctx.fillRect(16, 52, 16, 16);
    ctx.fillRect(16, 84, 16, 16);

    // Tab Header
    ctx.fillStyle = '#14171C';
    ctx.fillRect(48, 0, canvas.width - 48, 44);
    ctx.fillStyle = '#1E232B';
    ctx.fillRect(48, 43, canvas.width - 48, 1);

    // Active File Tab
    ctx.fillStyle = '#0F1115';
    ctx.fillRect(48, 0, 220, 43);
    ctx.fillStyle = '#1683FF';
    ctx.fillRect(48, 0, 220, 2);

    ctx.fillStyle = '#E6EDF3';
    ctx.font = 'bold 14px "JetBrains Mono", Consolas, monospace';
    ctx.fillText('meridian_agent.py', 76, 27);

    // Secondary Tab
    ctx.fillStyle = '#7D8590';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillText('ollama_service.py', 290, 27);

    // Status Pill on top right
    ctx.fillStyle = 'rgba(22, 131, 255, 0.15)';
    ctx.fillRect(canvas.width - 150, 10, 130, 24);
    ctx.strokeStyle = '#1683FF';
    ctx.lineWidth = 1;
    ctx.strokeRect(canvas.width - 150, 10, 130, 24);
    ctx.fillStyle = '#1683FF';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('RAG ENGINE • ACTIVE', canvas.width - 140, 26);

    // Code lines
    const startY = 82;
    const lineHeight = 28;
    const lines = [
      { num: '1', tokens: [{ text: 'import ', color: '#FF7B72' }, { text: 'fastapi, chromadb', color: '#E6EDF3' }] },
      { num: '2', tokens: [{ text: 'from ', color: '#FF7B72' }, { text: 'core.rag ', color: '#E6EDF3' }, { text: 'import ', color: '#FF7B72' }, { text: 'ClinicalEngine', color: '#FFA657' }] },
      { num: '3', tokens: [{ text: '# Sovereign local healthcare RAG engine', color: '#6E7681' }] },
      { num: '4', tokens: [{ text: 'engine = ', color: '#E6EDF3' }, { text: 'ClinicalEngine', color: '#FFA657' }, { text: '({', color: '#E6EDF3' }] },
      { num: '5', tokens: [{ text: '    model: ', color: '#79C0FF' }, { text: '"llama-3.2-3b-instruct",', color: '#A5D6FF' }] },
      { num: '6', tokens: [{ text: '    vector_db: ', color: '#79C0FF' }, { text: '"clinical_chroma",', color: '#A5D6FF' }] },
      { num: '7', tokens: [{ text: '    citations: ', color: '#79C0FF' }, { text: '["PubMed", "WHO_ICD11"],', color: '#A5D6FF' }] },
      { num: '8', tokens: [{ text: '    offline: ', color: '#79C0FF' }, { text: 'True', color: '#7EE787' }] },
      { num: '9', tokens: [{ text: '})', color: '#E6EDF3' }] },
      { num: '10', tokens: [{ text: 'await ', color: '#FF7B72' }, { text: 'engine.', color: '#E6EDF3' }, { text: 'run_triage_pipeline', color: '#D2A8FF' }, { text: '()', color: '#E6EDF3' }] },
      { num: '11', tokens: [{ text: 'return ', color: '#FF7B72' }, { text: 'engine.', color: '#E6EDF3' }, { text: 'get_triage_score', color: '#D2A8FF' }, { text: '()', color: '#E6EDF3' }] },
    ];

    lines.forEach((line, idx) => {
      const y = startY + idx * lineHeight;
      // Line numbers
      ctx.fillStyle = '#484F58';
      ctx.font = '13px "JetBrains Mono", Consolas, monospace';
      ctx.fillText(line.num.padStart(2, ' '), 62, y);

      // Code tokens
      let currentX = 100;
      line.tokens.forEach((t) => {
        ctx.fillStyle = t.color;
        ctx.font = '14px "JetBrains Mono", Consolas, monospace';
        ctx.fillText(t.text, currentX, y);
        currentX += ctx.measureText(t.text).width;
      });
    });

    // VS Code Bottom Status Bar
    ctx.fillStyle = '#1683FF';
    ctx.fillRect(0, canvas.height - 24, canvas.width, 24);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('⚡ 127.0.0.1:8000 • UTF-8 • Python 3.11 • Git (main*) • ChromaDB Indexed', 16, canvas.height - 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

// High-resolution dynamic AI Terminal texture for physical laptop screen
function createLaptopScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#06080D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Window Bar
    ctx.fillStyle = '#0E131C';
    ctx.fillRect(0, 0, canvas.width, 32);
    ctx.fillStyle = '#1683FF';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText('DEVIL-IN LOCAL AI NODE', 16, 21);

    ctx.fillStyle = '#27C93F';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('127.0.0.1:8080', canvas.width - 110, 21);

    // Center AI status
    ctx.fillStyle = '#1683FF';
    ctx.font = 'bold 56px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AI', canvas.width / 2, 140);

    ctx.fillStyle = '#D6A63A';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText('GGUF SERVER RUNNING', canvas.width / 2, 185);

    ctx.fillStyle = '#6F7378';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('LLAMA-3.2-3B • AVX2 ACCELERATED • 100% AIR-GAPPED', canvas.width / 2, 220);

    // Memory bar
    ctx.fillStyle = '#121824';
    ctx.fillRect(60, 250, canvas.width - 120, 10);
    ctx.fillStyle = '#1683FF';
    ctx.fillRect(60, 250, (canvas.width - 120) * 0.42, 10);

    ctx.fillStyle = '#8A92A0';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('RAM: 2.1 GB / 16 GB • CPU: 8.4%', canvas.width / 2, 280);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export function DeveloperWorkstation({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const workstationRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const codeTexture = useMemo(() => createVSCodeScreenTexture(), []);
  const laptopTexture = useMemo(() => createLaptopScreenTexture(), []);

  useEffect(() => {
    return () => {
      codeTexture.dispose();
      laptopTexture.dispose();
    };
  }, [codeTexture, laptopTexture]);

  // Subtle camera parallax: workstation remains grounded, responds gently to mouse
  useFrame((state) => {
    if (!workstationRef.current) return;
    const time = state.clock.getElapsedTime();
    
    const targetRotY = -0.28 + Math.sin(time * 0.2) * 0.008 + (mouse.x * 0.04) + scrollProgress * 0.06;
    const targetRotX = 0.14 + (mouse.y * 0.02);
    const targetPosY = -0.2 + Math.sin(time * 0.3) * 0.006;

    workstationRef.current.rotation.y = THREE.MathUtils.lerp(workstationRef.current.rotation.y, targetRotY, 0.04);
    workstationRef.current.rotation.x = THREE.MathUtils.lerp(workstationRef.current.rotation.x, targetRotX, 0.04);
    workstationRef.current.position.y = THREE.MathUtils.lerp(workstationRef.current.position.y, targetPosY, 0.04);
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* ================= STUDIO HDRI ENVIRONMENT & LIGHTING ================= */}
      <Environment preset="city" environmentIntensity={0.32} />

      {/* Soft Low Neutral Studio Ambient */}
      <ambientLight intensity={0.45} color="#D8E0EB" />
      
      {/* Soft Directional Studio Key Light (Simulating a softbox from top-right) */}
      <directionalLight
        position={[4, 6.5, 3.5]}
        intensity={1.55}
        color="#FFF4E6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Subtle Cool Screen Bounce Fill */}
      <pointLight position={[-0.2, 0.35, 0.2]} intensity={0.65} color="#70B4FF" distance={2.5} decay={2} />

      {/* Warm Lamp Accent Light */}
      <pointLight position={[1.5, 0.45, -0.5]} intensity={1.8} color="#FFE29A" distance={3.2} decay={2} />

      {/* Subtle Studio Rim Light to keep dark edges visible */}
      <directionalLight position={[-4, 3, -3.5]} intensity={0.55} color="#D6A63A" />

      {/* Grounded Studio Floor Contact Shadow */}
      <ContactShadows
        position={[0, -0.98, 0]}
        opacity={0.85}
        scale={8.5}
        blur={1.6}
        far={3.2}
        color="#000000"
      />

      {/* ================= WORKSTATION DESK & ASSETS ================= */}
      <group ref={workstationRef} rotation={[0.14, -0.28, 0]}>
        
        {/* ---- REALISTIC SLIM DESK TOP (Walnut Grain Composite) ---- */}
        {/* Tabletop */}
        <RoundedBox args={[3.8, 0.08, 2.2]} radius={0.02} smoothness={3} position={[0, -0.62, 0]}>
          <meshStandardMaterial
            color="#14171A"
            roughness={0.6}
            metalness={0.04}
            envMapIntensity={0.7}
          />
        </RoundedBox>

        {/* Dual Steel T-Frame Desk Legs / Supports */}
        <group position={[0, -0.85, 0]}>
          {/* Left Leg Base */}
          <RoundedBox args={[0.08, 0.45, 1.8]} radius={0.015} smoothness={2} position={[-1.65, 0, 0]}>
            <meshStandardMaterial color="#0C0E10" roughness={0.4} metalness={0.85} />
          </RoundedBox>
          {/* Right Leg Base */}
          <RoundedBox args={[0.08, 0.45, 1.8]} radius={0.015} smoothness={2} position={[1.65, 0, 0]}>
            <meshStandardMaterial color="#0C0E10" roughness={0.4} metalness={0.85} />
          </RoundedBox>
          {/* Center Cable Channel */}
          <mesh position={[0, 0.15, -0.7]}>
            <boxGeometry args={[3.2, 0.05, 0.1]} />
            <meshStandardMaterial color="#0A0C0E" roughness={0.5} metalness={0.8} />
          </mesh>
        </group>

        {/* Stitched Fabric/Leather Desk Mat */}
        <RoundedBox args={[2.7, 0.012, 1.3]} radius={0.02} smoothness={2} position={[-0.15, -0.575, 0.15]}>
          <meshStandardMaterial
            color="#090B0D"
            roughness={0.88}
            metalness={0.02}
          />
        </RoundedBox>

        {/* Front Signature Laser-Engraved Metal Badge */}
        <group position={[0, -0.66, 1.11]}>
          <RoundedBox args={[2.0, 0.05, 0.008]} radius={0.008} smoothness={2}>
            <meshStandardMaterial color="#0E1216" roughness={0.3} metalness={0.85} />
          </RoundedBox>
          {/* Laser-etched glowing signature */}
          <mesh position={[0, -0.015, 0.006]}>
            <planeGeometry args={[1.8, 0.006]} />
            <meshBasicMaterial color="#1683FF" />
          </mesh>
        </group>

        {/* ---- 27-INCH PROPORTIONED DEVELOPER MONITOR ---- */}
        <group position={[-0.2, 0.35, -0.45]}>
          {/* Minimal Heavy Aluminum Circular/Pill Stand Base */}
          <mesh position={[0, -0.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.28, 0.02, 32]} />
            <meshStandardMaterial color="#14171A" roughness={0.3} metalness={0.9} />
          </mesh>
          {/* Slim Articulated Stand Neck */}
          <mesh position={[0, -0.45, -0.06]}>
            <boxGeometry args={[0.06, 0.9, 0.04]} />
            <meshStandardMaterial color="#14171A" roughness={0.25} metalness={0.92} />
          </mesh>

          {/* Monitor Rear Curved Enclosure */}
          <RoundedBox args={[2.2, 1.28, 0.05]} radius={0.025} smoothness={3} position={[0, 0.06, 0]}>
            <meshStandardMaterial color="#0A0C0E" roughness={0.3} metalness={0.8} />
          </RoundedBox>

          {/* Physical Display Screen with VS Code Texture */}
          <mesh position={[0, 0.06, 0.027]}>
            <planeGeometry args={[2.12, 1.2]} />
            <meshStandardMaterial
              map={codeTexture}
              roughness={0.25}
              metalness={0.1}
              emissive="#FFFFFF"
              emissiveMap={codeTexture}
              emissiveIntensity={0.65}
            />
          </mesh>

          {/* Minimal Monitor Cable to Grommet */}
          <mesh position={[0, -0.75, -0.04]} rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4, 8]} />
            <meshStandardMaterial color="#0A0C0E" roughness={0.85} />
          </mesh>
        </group>

        {/* ---- REALISTIC MECHANICAL KEYBOARD (Staggered Keycap Rows) ---- */}
        <group position={[-0.32, -0.54, 0.32]} rotation={[0.08, -0.02, 0]}>
          {/* Angled Aluminum Chassis */}
          <RoundedBox args={[1.35, 0.035, 0.48]} radius={0.014} smoothness={3}>
            <meshStandardMaterial color="#111417" roughness={0.35} metalness={0.7} />
          </RoundedBox>

          {/* 5 Distinct Staggered Keycap Profile Rows */}
          {[-0.17, -0.085, 0, 0.085, 0.17].map((zPos, rowIdx) => (
            <group key={rowIdx} position={[0, 0.022, zPos]}>
              {rowIdx === 4 ? (
                // Spacebar row with split modifier keys
                <group>
                  <RoundedBox args={[0.55, 0.016, 0.065]} radius={0.008} smoothness={2} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#1C2128" roughness={0.68} metalness={0.15} />
                  </RoundedBox>
                  <RoundedBox args={[0.16, 0.016, 0.065]} radius={0.008} smoothness={2} position={[-0.42, 0, 0]}>
                    <meshStandardMaterial color="#D6A63A" roughness={0.5} metalness={0.2} />
                  </RoundedBox>
                  <RoundedBox args={[0.16, 0.016, 0.065]} radius={0.008} smoothness={2} position={[0.42, 0, 0]}>
                    <meshStandardMaterial color="#1683FF" roughness={0.5} metalness={0.2} />
                  </RoundedBox>
                </group>
              ) : (
                // Standard Keycap Rows
                <RoundedBox args={[1.26, 0.016, 0.065]} radius={0.008} smoothness={2}>
                  <meshStandardMaterial
                    color={rowIdx === 0 ? "#1B2026" : "#14181D"}
                    roughness={0.68}
                    metalness={0.15}
                  />
                </RoundedBox>
              )}
            </group>
          ))}

          {/* Keyboard Braided Cable */}
          <mesh position={[0, -0.005, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
            <meshStandardMaterial color="#16181B" roughness={0.9} />
          </mesh>
        </group>

        {/* ---- SCULPTED ERGONOMIC MOUSE ---- */}
        <group position={[0.72, -0.54, 0.32]} rotation={[0, 0.05, 0]}>
          {/* Ergonomic Curved Palm Shell */}
          <RoundedBox args={[0.18, 0.048, 0.32]} radius={0.03} smoothness={4}>
            <meshStandardMaterial color="#121519" roughness={0.32} metalness={0.55} />
          </RoundedBox>
          {/* Rubberized Tactile Scroll Wheel with Chrome Rim */}
          <mesh position={[0, 0.026, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.014, 0.014, 0.025, 16]} />
            <meshStandardMaterial color="#2B3038" roughness={0.2} metalness={0.85} />
          </mesh>
        </group>

        {/* ---- REALISTIC CLEARLY VISIBLE LAPTOP (Angled ~22°) ---- */}
        <group position={[1.28, -0.46, -0.05]} rotation={[0, -0.38, 0]}>
          {/* Space Gray Aluminum Unibody Base */}
          <RoundedBox args={[1.05, 0.024, 0.74]} radius={0.012} smoothness={3} position={[0, -0.09, 0]}>
            <meshStandardMaterial color="#171A1F" roughness={0.3} metalness={0.85} />
          </RoundedBox>

          {/* Keyboard Well & Trackpad */}
          <mesh position={[0, -0.076, 0.04]}>
            <planeGeometry args={[0.95, 0.58]} />
            <meshStandardMaterial color="#0F1215" roughness={0.6} metalness={0.3} />
          </mesh>

          {/* Laptop Display Lid with Hinge */}
          <group position={[0, -0.078, -0.35]} rotation={[-0.22, 0, 0]}>
            <RoundedBox args={[1.05, 0.68, 0.016]} radius={0.012} smoothness={3} position={[0, 0.32, 0]}>
              <meshStandardMaterial color="#14171C" roughness={0.25} metalness={0.88} />
            </RoundedBox>

            {/* Physical Display Screen with AI Texture */}
            <mesh position={[0, 0.32, 0.01]}>
              <planeGeometry args={[0.98, 0.62]} />
              <meshStandardMaterial
                map={laptopTexture}
                roughness={0.3}
                metalness={0.1}
                emissive="#FFFFFF"
                emissiveMap={laptopTexture}
                emissiveIntensity={0.65}
              />
            </mesh>
          </group>
        </group>

        {/* ---- REALISTIC ARCHITECTURAL DESK LAMP (Warm Light) ---- */}
        <group position={[1.52, 0.02, -0.6]}>
          {/* Circular Weighted Base */}
          <mesh position={[0, -0.58, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.025, 24]} />
            <meshStandardMaterial color="#14171A" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* Lower Stem */}
          <mesh position={[-0.03, -0.16, 0]} rotation={[0, 0, -0.16]}>
            <cylinderGeometry args={[0.016, 0.016, 0.8, 16]} />
            <meshStandardMaterial color="#14171A" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* Shade & Warm Bulb */}
          <group position={[-0.18, 0.22, 0]} rotation={[0, 0, 0.5]}>
            <mesh>
              <coneGeometry args={[0.13, 0.18, 24]} />
              <meshStandardMaterial color="#0F1215" roughness={0.25} metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* ---- BOTANICAL DESK PLANTS (Organic Succulent Geometry) ---- */}
        <group position={[-1.52, -0.44, -0.6]}>
          {/* Glazed Ceramic Pot */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.12, 0.08, 0.15, 20]} />
            <meshStandardMaterial color="#181C20" roughness={0.7} metalness={0.05} />
          </mesh>
          {/* Soil Layer */}
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 16]} />
            <meshStandardMaterial color="#0A0806" roughness={0.95} />
          </mesh>
          {/* Botanical Petals with Natural Distribution */}
          {[0, 1.25, 2.5, 3.75, 5.0].map((rotAngle, leafIndex) => (
            <mesh
              key={leafIndex}
              position={[Math.cos(rotAngle) * 0.05, 0.06 + leafIndex * 0.012, Math.sin(rotAngle) * 0.05]}
              rotation={[0.35 * Math.sin(rotAngle), rotAngle, 0.35 * Math.cos(rotAngle)]}
            >
              <coneGeometry args={[0.045, 0.13, 8]} />
              <meshStandardMaterial
                color={leafIndex % 2 === 0 ? "#2B683B" : "#347844"}
                roughness={0.75}
              />
            </mesh>
          ))}
        </group>

        {/* ---- CERAMIC COFFEE MUG (Hollow with Curved Handle) ---- */}
        <group position={[-1.05, -0.48, 0.38]}>
          {/* Mug Body */}
          <mesh>
            <cylinderGeometry args={[0.075, 0.068, 0.13, 24]} />
            <meshStandardMaterial color="#0A0C0E" roughness={0.35} metalness={0.25} />
          </mesh>
          {/* Mug Hollow Interior */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.066, 0.06, 0.12, 24]} />
            <meshStandardMaterial color="#060708" roughness={0.8} />
          </mesh>
          {/* Curved Handle */}
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.038, 0.01, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#0A0C0E" roughness={0.35} metalness={0.25} />
          </mesh>
        </group>

      </group>
    </group>
  );
}
