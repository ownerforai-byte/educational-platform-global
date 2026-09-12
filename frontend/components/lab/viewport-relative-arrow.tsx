"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LiveArrow } from "./animated-arrow-helper";

/** viewport-relative configuration */
export interface ViewportRelativeArrowConfig {
  /** Which screen-space position (0-1) the arrow target aligns to */
  screenTarget?: [number, number];
  /** How deeply into the scene (world units) the arrow sits */
  depth?: number;
  /** Base direction before viewport adjustment */
  baseDirection?: [number, number, number];
  length?: number;
  color?: string;
  headLength?: number;
  headWidth?: number;
  pulse?: boolean;
  pulseSpeed?: number;
  flowParticles?: boolean;
  particleCount?: number;
  /** If true, arrow re-orients each frame toward camera view direction */
  followCamera?: boolean;
  /** If true, arrow dynamically recalculates based on viewport changes (default: true) */
  dynamic?: boolean;
  /** World position the arrow should point toward (overrides screenTarget when set) */
  worldTarget?: [number, number, number];
  /** Callback when arrow direction changes significantly */
  onDirectionChange?: (direction: [number, number, number]) => void;
}

/**
 * Hook: computes a viewport-relative direction vector each frame.
 * Converts screen-space target + depth into world-space direction
 * that responds to camera movement/zoom.
 * 
 * This is the KEY enhancement - arrows now dynamically track viewport
 * changes rather than using fixed positions.
 */
export function useViewportRelativeDirection(config: ViewportRelativeArrowConfig) {
  const { camera, size, gl } = useThree();
  const lastCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const lastViewport = useRef<{width: number, height: number}>({width: 0, height: 0});
  const worldTargetRef = useRef<THREE.Vector3 | null>(null);
  
  // Sync worldTarget prop to ref for use in frame loop
  useEffect(() => {
    if (config.worldTarget) {
      worldTargetRef.current = new THREE.Vector3(...config.worldTarget);
    } else {
      worldTargetRef.current = null;
    }
  }, [config.worldTarget]);
  
  const [direction, setDirection] = useState<THREE.Vector3>(
    new THREE.Vector3(...(config.baseDirection ?? [0, 1, 0]))
  );

  const computeDirection = useCallback(() => {
    const target = config.screenTarget ?? [0.5, 0.5];
    const depth = config.depth ?? 2;
    const aspect = size.width / (size.height || 1);
    
    // NDC coordinates
    const ndcX = target[0] * 2 - 1;
    const ndcY = -(target[1] * 2 - 1);
    
    // Camera basis vectors
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
    
    // View frustum dimensions at depth (fov only exists on PerspectiveCamera)
    const cam = camera as unknown as THREE.PerspectiveCamera;
    const fov = cam.fov ?? 50;
    const viewHeight = 2 * Math.tan((fov * Math.PI) / 360) * depth;
    const viewWidth = viewHeight * aspect;
    
    // World position at screen target
    const worldX = ndcX * viewWidth / 2;
    const worldY = ndcY * viewHeight / 2;
    
    const worldPos = new THREE.Vector3()
      .copy(camera.position)
      .add(forward.clone().multiplyScalar(-depth))
      .add(right.clone().multiplyScalar(worldX))
      .add(up.clone().multiplyScalar(worldY));

    // If worldTarget is set, point toward it instead
    if (worldTargetRef.current) {
      const dirToTarget = worldTargetRef.current.clone().sub(camera.position).normalize();
      if (dirToTarget.length() > 0.001) {
        setDirection(dirToTarget);
        return;
      }
    }

    // Default: direction from camera to world position at screen target
    const dirToTarget = worldPos.sub(camera.position).normalize();
    if (dirToTarget.length() > 0.001) {
      setDirection(dirToTarget);
    }
  }, [camera, size, config.screenTarget, config.depth, config.baseDirection]);

  useFrame(() => {
    const currentPos = camera.position.clone();
    const cameraMoved = currentPos.distanceTo(lastCameraPos.current) > 0.001;
    lastCameraPos.current.copy(currentPos);
    
    // Check for viewport size changes
    const viewportChanged = size.width !== lastViewport.current.width || 
                           size.height !== lastViewport.current.height;
    lastViewport.current = { width: size.width, height: size.height };
    
    // Dynamic mode: recalculate on camera or viewport change
    const shouldRecalc = config.dynamic !== false && (cameraMoved || viewportChanged);
    
    if (shouldRecalc) {
      computeDirection();
    } else if (config.followCamera) {
      // Follow camera look direction
      const lookDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
      if (lookDir.length() > 0.001) {
        setDirection(lookDir);
      }
    }
  });

  return direction;
}

/**
 * React component: viewport-relative animated arrow.
 * Automatically re-orients when camera moves/zooms.
 */
interface ViewportRelativeArrowProps {
  screenTarget?: [number, number];
  depth?: number;
  length?: number;
  color?: string;
  headLength?: number;
  headWidth?: number;
  pulse?: boolean;
  pulseSpeed?: number;
  flowParticles?: boolean;
  particleCount?: number;
  followCamera?: boolean;
  /** Enable dynamic viewport tracking (default: true) */
  dynamic?: boolean;
  /** World position the arrow should point toward */
  worldTarget?: [number, number, number];
  /** Callback for direction changes */
  onDirectionChange?: (direction: [number, number, number]) => void;
}

export function ViewportRelativeArrow({
  screenTarget = [0.5, 0.5],
  depth = 2,
  length = 1.2,
  color = "#6366f1",
  headLength = 0.15,
  headWidth = 0.1,
  pulse = true,
  pulseSpeed = 2,
  flowParticles = true,
  particleCount = 5,
  followCamera = false,
}: ViewportRelativeArrowProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const direction = useViewportRelativeDirection({ screenTarget, depth, followCamera, baseDirection: [0, 1, 0] });

  const arrowData = useMemo(() => {
    const origin = new THREE.Vector3(0, 0, 0);
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
      opacity: 0.9,
    });
    arrow.cone.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).getHex(),
      transparent: true,
      opacity: 0.9,
    });

    const group = new THREE.Group();
    group.add(arrow);

    // Flow particles
    const particles: THREE.Mesh[] = [];
    if (flowParticles) {
      const pGeom = new THREE.SphereGeometry(0.03, 8, 8);
      for (let i = 0; i < particleCount; i++) {
        const p = new THREE.Mesh(pGeom, new THREE.MeshBasicMaterial({
          color: new THREE.Color(color).getHex(),
          transparent: true,
          opacity: 0.8,
        }));
        p.userData.offset = i / particleCount;
        group.add(p);
        particles.push(p);
      }
    }

    const update = (time: number) => {
      // Pulse
      if (pulse) {
        const scale = 1 + Math.sin(time * pulseSpeed) * 0.1;
        arrow.scale.set(scale, scale, scale);
      }
      // Flow particles
      if (flowParticles) {
        const dir = direction.clone();
        particles.forEach((p) => {
          const t = ((p.userData.offset + time * 0.5) % 1);
          p.position.copy(dir.clone().multiplyScalar(t * length));
          (p.material as THREE.MeshBasicMaterial).opacity = 0.3 + 0.5 * Math.sin(t * Math.PI);
        });
      }
    };

    const dispose = () => {
      arrow.dispose();
      particles.forEach((p) => {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      });
    };

    return { group, arrow, update, dispose };
  }, [direction, length, color, headLength, headWidth, pulse, pulseSpeed, flowParticles, particleCount]);

  useEffect(() => {
    return () => arrowData.dispose();
  }, [arrowData]);

  // Update direction each frame based on camera
  useFrame((_, delta) => {
    if (groupRef.current && camera) {
      arrowData.update(performance.now() / 1000);
    }
  });

  return <primitive ref={groupRef} object={arrowData.group} />;
}