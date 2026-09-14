"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DynamicArrowProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  thickness?: number;
  pulseSpeed?: number;
  pulseScale?: number;
  animated?: boolean;
  glow?: boolean;
}

/**
 * A dynamic animated arrow component for 3D visualizations.
 * Features pulsing animation, smooth transitions, and optional glow.
 */
export function DynamicArrow({
  start,
  end,
  color = "#3b82f6",
  thickness = 0.08,
  pulseSpeed = 2,
  pulseScale = 0.15,
  animated = true,
  glow = true,
}: DynamicArrowProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shaftRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const { length, midPoint, quaternion } = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const dir = new THREE.Vector3().subVectors(endVec, startVec);
    const len = dir.length();
    dir.normalize();
    const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir
    );
    return { length: len, midPoint: mid, quaternion: quat };
  }, [start, end]);

  useFrame((state) => {
    if (!animated) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * pulseSpeed) * pulseScale;

    if (shaftRef.current) {
      shaftRef.current.scale.set(pulse, 1, pulse);
    }
    if (headRef.current) {
      headRef.current.scale.set(pulse, pulse, pulse);
    }
    if (glowRef.current && glowMaterialRef.current) {
      const glowPulse = 0.3 + Math.sin(t * pulseSpeed * 0.8) * 0.15;
      glowMaterialRef.current.opacity = glowPulse;
      glowRef.current.scale.set(pulse * 1.5, 1, pulse * 1.5);
    }
    if (materialRef.current) {
      const brightness = 0.85 + Math.sin(t * pulseSpeed * 1.2) * 0.15;
      materialRef.current.opacity = brightness;
    }
  });

  const shaftLength = length - 0.3;
  const headY = shaftLength / 2 + 0.15;

  return (
    <group ref={groupRef} position={midPoint.toArray()} quaternion={quaternion.toArray() as [number, number, number, number]}>
      {glow && (
        <mesh ref={glowRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[thickness * 2.5, thickness * 2.5, shaftLength, 8]} />
          <meshBasicMaterial
            ref={glowMaterialRef}
            color={color}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
      )}
      <mesh ref={shaftRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[thickness, thickness, shaftLength, 12]} />
        <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.9} />
      </mesh>
      <mesh ref={headRef} position={[0, headY, 0]}>
        <coneGeometry args={[thickness * 2.5, 0.3, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Creates a curved path arrow for field lines and trajectories
 */
interface CurvedArrowProps {
  points: THREE.Vector3[];
  color?: string;
  thickness?: number;
  animated?: boolean;
  flowSpeed?: number;
  particleCount?: number;
}

export function CurvedArrow({
  points,
  color = "#3b82f6",
  thickness = 0.05,
  animated = true,
  flowSpeed = 1,
  particleCount = 5,
}: CurvedArrowProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Mesh[]>([]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, thickness, 8, false);
  }, [curve, thickness]);

  useFrame((state) => {
    if (!animated) return;
    const t = state.clock.getElapsedTime();

    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        const offset = (t * flowSpeed * 0.1 + i / particleCount) % 1;
        const point = curve.getPoint(offset);
        particle.position.copy(point);
        const scale = 0.6 + Math.sin(t * 3 + i) * 0.3;
        particle.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={tubeGeometry as never}>
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      {Array.from({ length: particleCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el as unknown as THREE.Mesh;
          }}
        >
          <sphereGeometry args={[thickness * 2, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Animated vector field with multiple dynamic arrows
 */
interface VectorFieldProps {
  arrows: Array<{
    start: [number, number, number];
    end: [number, number, number];
    color?: string;
  }>;
  animated?: boolean;
  pulseSpeed?: number;
  glow?: boolean;
}

export function VectorField({
  arrows,
  animated = true,
  pulseSpeed = 2,
  glow = true,
}: VectorFieldProps) {
  return (
    <group>
      {arrows.map((arrow, i) => (
        <DynamicArrow
          key={i}
          start={arrow.start}
          end={arrow.end}
          color={arrow.color}
          animated={animated}
          pulseSpeed={pulseSpeed}
          glow={glow}
        />
      ))}
    </group>
  );
}
