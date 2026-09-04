"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

interface DynamicArrowProps {
  origin: [number, number, number];
  direction: [number, number, number];
  length?: number;
  color?: string | number;
  headLength?: number;
  headWidth?: number;
  shaftRadius?: number;
  animated?: boolean;
  pulseSpeed?: number;
  pulseScale?: number;
  scene: THREE.Scene;
}

export function createDynamicArrow({
  origin,
  direction,
  length = 1,
  color = 0xff4444,
  headLength = 0.2,
  headWidth = 0.08,
  shaftRadius = 0.02,
  animated = true,
  pulseSpeed = 2,
  pulseScale = 0.15,
  scene,
}: DynamicArrowProps): { update: (time: number) => void; dispose: () => void } {
  const group = new THREE.Group();
  
  // Normalize direction
  const dir = new THREE.Vector3(...direction).normalize();
  const actualLength = length;
  
  // Create shaft
  const shaftGeom = new THREE.CylinderGeometry(shaftRadius, shaftRadius, actualLength, 8);
  const shaftMat = new THREE.MeshStandardMaterial({ 
    color, 
    emissive: new THREE.Color(color).multiplyScalar(0.3),
    metalness: 0.3,
    roughness: 0.4,
  });
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.position.y = actualLength / 2;
  group.add(shaft);
  
  // Create head
  const headGeom = new THREE.ConeGeometry(headWidth, headLength, 12);
  const headMat = new THREE.MeshStandardMaterial({ 
    color, 
    emissive: new THREE.Color(color).multiplyScalar(0.4),
    metalness: 0.3,
    roughness: 0.3,
  });
  const head = new THREE.Mesh(headGeom, headMat);
  head.position.y = actualLength + headLength / 2;
  group.add(head);
  
  // Orient the group to point in the direction
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir);
  group.quaternion.copy(quaternion);
  group.position.set(...origin);
  
  scene.add(group);
  
  const originalScale = { x: group.scale.x, y: group.scale.y, z: group.scale.z };
  
  return {
    update(time: number) {
      if (animated) {
        const pulse = 1 + Math.sin(time * pulseSpeed) * pulseScale;
        group.scale.set(
          originalScale.x * pulse,
          originalScale.y * (1 + Math.sin(time * pulseSpeed * 0.7) * pulseScale * 0.5),
          originalScale.z * pulse
        );
      }
    },
    dispose() {
      scene.remove(group);
      shaftGeom.dispose();
      shaftMat.dispose();
      headGeom.dispose();
      headMat.dispose();
    },
  };
}

// React wrapper for R3F components
import { useFrame } from "@react-three/fiber";

interface DynamicArrowR3FProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  thickness?: number;
  animated?: boolean;
  pulseSpeed?: number;
  headScale?: number;
}

export function DynamicArrowR3F({
  start,
  end,
  color = "#ff4444",
  thickness = 0.04,
  animated = true,
  pulseSpeed = 2,
  headScale = 1,
}: DynamicArrowR3FProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shaftRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  const { direction, length, quaternion } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const dir = new THREE.Vector3().subVectors(endVec, startVec);
    const len = dir.length();
    dir.normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    return { direction: dir, length: len, quaternion: quat };
  }, [start, end]);
  
  useFrame(({ clock }) => {
    if (groupRef.current && animated) {
      const t = clock.getElapsedTime();
      const pulse = 1 + Math.sin(t * pulseSpeed) * 0.15;
      groupRef.current.scale.set(pulse, 1 + Math.sin(t * pulseSpeed * 0.7) * 0.1, pulse);
    }
  });
  
  const headLength = 0.25 * headScale;
  const headWidth = 0.12 * headScale;
  
  return (
    <group ref={groupRef} quaternion={quaternion} position={start}>
      <mesh ref={shaftRef} position={[0, length / 2, 0]}>
        <cylinderGeometry args={[thickness, thickness, length, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={headRef} position={[0, length + headLength / 2, 0]}>
        <coneGeometry args={[headWidth, headLength, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}
