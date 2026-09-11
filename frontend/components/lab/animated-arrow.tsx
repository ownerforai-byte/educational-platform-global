"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/**
 * Creates an animated arrow using raw Three.js
 * Supports pulsing, flowing particles along the arrow, and dynamic direction changes
 */
export interface AnimatedArrowConfig {
  direction: THREE.Vector3;
  origin: THREE.Vector3;
  length: number;
  color: number | string;
  headLength?: number;
  headWidth?: number;
  pulse?: boolean;
  pulseSpeed?: number;
  pulseAmount?: number;
  flowParticles?: boolean;
  particleCount?: number;
  particleSpeed?: number;
  opacity?: number;
}

/**
 * Creates a dynamic arrow that animates over time
 * Returns an object with the arrow mesh and an update function
 */
export function createAnimatedArrow(config: AnimatedArrowConfig): {
  group: THREE.Group;
  arrow: THREE.ArrowHelper;
  update: (time: number) => void;
  dispose: () => void;
} {
  const {
    direction,
    origin,
    length,
    color,
    headLength = 0.15,
    headWidth = 0.1,
    pulse = true,
    pulseSpeed = 2,
    pulseAmount = 0.1,
    flowParticles = true,
    particleCount = 5,
    particleSpeed = 1,
    opacity = 1,
  } = config;

  const group = new THREE.Group();
  group.position.copy(origin);

  // Create the main arrow
  const arrow = new LiveArrow(
    direction.clone().normalize(),
    new THREE.Vector3(0, 0, 0),
    length,
    new THREE.Color(color).getHex(),
    headLength,
    headWidth
  );
  arrow.line.material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color).getHex(),
    transparent: true,
    opacity: opacity,
  });
  arrow.cone.material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).getHex(),
    transparent: true,
    opacity: opacity,
  });
  group.add(arrow);

  // Create flowing particles along the arrow
  const particles: THREE.Mesh[] = [];
  const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
  const particleMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).getHex(),
    transparent: true,
    opacity: 0.8,
  });

  if (flowParticles) {
    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      particle.userData.offset = i / particleCount;
      particle.userData.speed = particleSpeed;
      particles.push(particle);
      group.add(particle);
    }
  }

  // Update function called each frame
  const update = (time: number) => {
    // Pulse animation
    if (pulse) {
      const scale = 1 + Math.sin(time * pulseSpeed) * pulseAmount;
      arrow.scale.set(scale, scale, scale);
    }

    // Flow particles along the arrow
    if (flowParticles) {
      const dir = direction.clone().normalize();
      particles.forEach((particle) => {
        const offset = particle.userData.offset;
        const speed = particle.userData.speed;
        const t = ((offset + time * speed) % 1);
        particle.position.copy(dir.clone().multiplyScalar(t * length));
        (particle.material as THREE.MeshBasicMaterial).opacity = 0.3 + 0.5 * Math.sin(t * Math.PI);
      });
    }
  };

  const dispose = () => {
    arrow.dispose();
    particles.forEach((p) => {
      p.geometry.dispose();
      (p.material as THREE.Material).dispose();
    });
    particleGeometry.dispose();
    particleMaterial.dispose();
  };

  return { group, arrow, update, dispose };
}

/**
 * React component wrapper for animated arrows
 */
interface AnimatedArrowProps {
  direction: [number, number, number];
  origin?: [number, number, number];
  length?: number;
  color?: string;
  headLength?: number;
  headWidth?: number;
  pulse?: boolean;
  pulseSpeed?: number;
  flowParticles?: boolean;
  particleCount?: number;
}

export function AnimatedArrow({
  direction,
  origin = [0, 0, 0],
  length = 1,
  color = "#ffffff",
  headLength = 0.15,
  headWidth = 0.1,
  pulse = true,
  pulseSpeed = 2,
  flowParticles = true,
  particleCount = 5,
}: AnimatedArrowProps) {
  const groupRef = useRef<THREE.Group>(null);

  const arrowData = useMemo(() => {
    return createAnimatedArrow({
      direction: new THREE.Vector3(...direction),
      origin: new THREE.Vector3(...origin),
      length,
      color,
      headLength,
      headWidth,
      pulse,
      pulseSpeed,
      flowParticles,
      particleCount,
    });
  }, [direction, origin, length, color, headLength, headWidth, pulse, pulseSpeed, flowParticles, particleCount]);

  useEffect(() => {
    return () => {
      arrowData.dispose();
    };
  }, [arrowData]);

  return <primitive ref={groupRef} object={arrowData.group} />;
}
