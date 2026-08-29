'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function NoiseTexture() {
  const { scene } = useThree();
  const textureRef = useRef<THREE.DataTexture | null>(null);

  useEffect(() => {
    const size = 256;
    const data = new Uint8Array(size * size * 4);
    
    for (let i = 0; i < size * size * 4; i++) {
      data[i] = Math.random() * 255;
    }

    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    
    textureRef.current = texture;

    scene.background = texture;
    scene.backgroundBlurriness = 0.5;
    scene.backgroundIntensity = 0.02;

    return () => {
      texture.dispose();
      scene.background = null;
    };
  }, [scene]);

  return null;
}