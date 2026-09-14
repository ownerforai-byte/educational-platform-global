import * as THREE from "three";

/**
 * Configuration for dynamic arrow animation
 */
export interface DynamicArrowConfig {
  origin: THREE.Vector3;
  direction: THREE.Vector3;
  length: number;
  color?: number;
  headLength?: number;
  headWidth?: number;
  thickness?: number;
  pulseSpeed?: number;
  pulseScale?: number;
  animated?: boolean;
}

/**
 * DynamicArrowHelper - An animated arrow that extends THREE.ArrowHelper
 * with pulsing, scaling, and smooth transition animations.
 */
export class DynamicArrowHelper extends THREE.ArrowHelper {
  private pulseSpeed: number;
  private pulseScale: number;
  private animated: boolean;
  private baseLength: number;
  private baseThickness: number;
  private time: number = 0;
  private shaftMesh: THREE.Mesh;
  private headMesh: THREE.Mesh;
  private glowMesh: THREE.Mesh;

  constructor(config: DynamicArrowConfig) {
    const {
      origin,
      direction,
      length,
      color = 0x3b82f6,
      headLength = 0.3,
      headWidth = 0.15,
      thickness = 0.05,
      pulseSpeed = 2,
      pulseScale = 0.15,
      animated = true,
    } = config;

    super(direction.clone().normalize(), origin, length, color, headLength, headWidth);

    this.pulseSpeed = pulseSpeed;
    this.pulseScale = pulseScale;
    this.animated = animated;
    this.baseLength = length;
    this.baseThickness = thickness;

    // Replace default line with thicker tube
    this.remove(this.line);
    this.remove(this.cone);

    // Create shaft (cylinder)
    const shaftGeom = new THREE.CylinderGeometry(thickness, thickness, length - headLength, 12);
    const shaftMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    this.shaftMesh = new THREE.Mesh(shaftGeom, shaftMat);
    this.add(this.shaftMesh);

    // Create head (cone)
    const headGeom = new THREE.ConeGeometry(headWidth, headLength, 12);
    const headMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    this.headMesh = new THREE.Mesh(headGeom, headMat);
    this.headMesh.position.y = (length - headLength) / 2 + headLength / 2;
    this.add(this.headMesh);

    // Create glow effect
    const glowGeom = new THREE.CylinderGeometry(thickness * 2.5, thickness * 2.5, length - headLength, 8);
    const glowMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });
    this.glowMesh = new THREE.Mesh(glowGeom, glowMat);
    this.add(this.glowMesh);

    // Position the helper
    this.position.copy(origin);
    this.setDirection(direction.clone().normalize());
  }

  /**
   * Update animation frame
   */
  update(deltaTime: number): void {
    if (!this.animated) return;

    this.time += deltaTime;
    const pulse = 1 + Math.sin(this.time * this.pulseSpeed) * this.pulseScale;

    // Animate shaft
    if (this.shaftMesh) {
      this.shaftMesh.scale.set(pulse, 1, pulse);
    }

    // Animate head
    if (this.headMesh) {
      this.headMesh.scale.set(pulse, pulse, pulse);
    }

    // Animate glow
    if (this.glowMesh) {
      this.glowMesh.scale.set(pulse * 1.3, 1, pulse * 1.3);
      const mat = this.glowMesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(this.time * this.pulseSpeed * 0.8) * 0.1;
    }

    // Animate opacity
    if (this.shaftMesh.material instanceof THREE.MeshBasicMaterial) {
      this.shaftMesh.material.opacity = 0.7 + Math.sin(this.time * this.pulseSpeed * 1.2) * 0.2;
    }
  }

  /**
   * Set direction with smooth transition
   */
  setDirection(dir: THREE.Vector3): void {
    super.setDirection(dir);
    // Rotate shaft and head to point along Y axis (ArrowHelper convention)
    if (this.shaftMesh) {
      this.shaftMesh.rotation.x = Math.PI / 2;
    }
    if (this.headMesh) {
      this.headMesh.rotation.x = Math.PI / 2;
    }
    if (this.glowMesh) {
      this.glowMesh.rotation.x = Math.PI / 2;
    }
  }

  /**
   * Set color
   */
  setColor(color: number | string): void {
    super.setColor(color);
    const c = new THREE.Color(color);
    if (this.shaftMesh?.material instanceof THREE.MeshBasicMaterial) {
      this.shaftMesh.material.color = c;
    }
    if (this.headMesh?.material instanceof THREE.MeshBasicMaterial) {
      this.headMesh.material.color = c;
    }
    if (this.glowMesh?.material instanceof THREE.MeshBasicMaterial) {
      this.glowMesh.material.color = c;
    }
  }

  /**
   * Set length
   */
  setLength(length: number, headLength?: number, headWidth?: number): void {
    super.setLength(length, headLength, headWidth);
    this.baseLength = length;
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    this.shaftMesh?.geometry?.dispose();
    (this.shaftMesh?.material as THREE.Material)?.dispose();
    this.headMesh?.geometry?.dispose();
    (this.headMesh?.material as THREE.Material)?.dispose();
    this.glowMesh?.geometry?.dispose();
    (this.glowMesh?.material as THREE.Material)?.dispose();
    super.dispose();
  }
}

/**
 * Create a dynamic arrow helper with animation
 */
export function createDynamicArrow(
  origin: [number, number, number],
  direction: [number, number, number],
  length: number,
  color: number | string = 0x3b82f6,
  options: Partial<Omit<DynamicArrowConfig, "origin" | "direction" | "length" | "color">> = {}
): DynamicArrowHelper {
  return new DynamicArrowHelper({
    origin: new THREE.Vector3(...origin),
    direction: new THREE.Vector3(...direction),
    length,
    color: typeof color === "string" ? new THREE.Color(color).getHex() : color,
    ...options,
  });
}
