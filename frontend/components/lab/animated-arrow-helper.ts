import * as THREE from "three";

export interface AnimatedArrow {
  group: THREE.Group;
  update: (time: number) => void;
  dispose: () => void;
}

export function createAnimatedArrow(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  length: number,
  color: number | string,
  options: {
    headLength?: number;
    headWidth?: number;
    shaftRadius?: number;
    pulseSpeed?: number;
    pulseScale?: number;
    glow?: boolean;
    particleFlow?: boolean;
    particleCount?: number;
  } = {}
): AnimatedArrow {
  const {
    headLength = 0.2,
    headWidth = 0.12,
    shaftRadius = 0.04,
    pulseSpeed = 2,
    pulseScale = 0.15,
    glow = true,
    particleFlow = true,
    particleCount = 6,
  } = options;

  const group = new THREE.Group();
  const disposables: { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] }[] = [];

  const dir = direction.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  const shaftLength = length - headLength;
  const shaftGeom = new THREE.CylinderGeometry(shaftRadius, shaftRadius, shaftLength, 12);
  const shaftMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.position.set(0, shaftLength / 2, 0);
  disposables.push({ geometry: shaftGeom, material: shaftMat });

  const headGeom = new THREE.ConeGeometry(headWidth, headLength, 12);
  const headMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
  const head = new THREE.Mesh(headGeom, headMat);
  head.position.set(0, shaftLength + headLength / 2, 0);
  disposables.push({ geometry: headGeom, material: headMat });

  const arrowGroup = new THREE.Group();
  arrowGroup.add(shaft);
  arrowGroup.add(head);

  let glowMesh: THREE.Mesh | null = null;
  if (glow) {
    const glowGeom = new THREE.CylinderGeometry(shaftRadius * 3, shaftRadius * 3, shaftLength, 8);
    const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, depthWrite: false });
    glowMesh = new THREE.Mesh(glowGeom, glowMat);
    glowMesh.position.set(0, shaftLength / 2, 0);
    arrowGroup.add(glowMesh);
    disposables.push({ geometry: glowGeom, material: glowMat });
  }

  const particles: THREE.Mesh[] = [];
  const particlePositions: number[] = [];
  if (particleFlow) {
    for (let i = 0; i < particleCount; i++) {
      const pGeom = new THREE.SphereGeometry(shaftRadius * 2, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 });
      const particle = new THREE.Mesh(pGeom, pMat);
      particles.push(particle);
      particlePositions.push(i / particleCount);
      arrowGroup.add(particle);
      disposables.push({ geometry: pGeom, material: pMat });
    }
  }

  group.add(arrowGroup);
  group.position.copy(origin);
  group.quaternion.copy(quat);

  const update = (time: number) => {
    const pulse = 1 + Math.sin(time * pulseSpeed) * pulseScale;
    shaft.scale.set(pulse, 1, pulse);
    head.scale.set(pulse, pulse, pulse);

    if (glowMesh) {
      const glowOpacity = 0.2 + Math.sin(time * pulseSpeed * 0.8) * 0.15;
      (glowMesh.material as THREE.MeshBasicMaterial).opacity = glowOpacity;
      glowMesh.scale.set(pulse * 1.2, 1, pulse * 1.2);
    }

    const opacity = 0.8 + Math.sin(time * pulseSpeed * 1.2) * 0.2;
    shaftMat.opacity = opacity;
    headMat.opacity = opacity;

    particles.forEach((particle, i) => {
      particlePositions[i] = (particlePositions[i] + 0.0015) % 1;
      const pos = particlePositions[i] * shaftLength;
      particle.position.set(0, pos, 0);
      const pScale = 0.5 + Math.sin(time * 3 + i * 0.5) * 0.3;
      particle.scale.set(pScale, pScale, pScale);
      const pMat = particle.material as THREE.MeshBasicMaterial;
      pMat.opacity = 0.5 + Math.sin(time * 2 + i) * 0.3;
    });
  };

  const dispose = () => {
    disposables.forEach((d) => {
      d.geometry?.dispose();
      if (Array.isArray(d.material)) d.material.forEach((m) => m.dispose());
      else d.material?.dispose();
    });
  };

  return { group, update, dispose };
}

export function createCurvedAnimatedArrow(
  points: THREE.Vector3[],
  color: number | string,
  options: {
    radius?: number;
    flowSpeed?: number;
    particleCount?: number;
    pulseSpeed?: number;
  } = {}
): AnimatedArrow {
  const { radius = 0.03, flowSpeed = 1, particleCount = 8, pulseSpeed = 2 } = options;
  const group = new THREE.Group();
  const disposables: { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] }[] = [];

  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeom = new THREE.TubeGeometry(curve, 64, radius, 8, false);
  const tubeMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 });
  const tube = new THREE.Mesh(tubeGeom, tubeMat);
  group.add(tube);
  disposables.push({ geometry: tubeGeom, material: tubeMat });

  const glowGeom = new THREE.TubeGeometry(curve, 64, radius * 3, 8, false);
  const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, depthWrite: false });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  group.add(glow);
  disposables.push({ geometry: glowGeom, material: glowMat });

  const particles: THREE.Mesh[] = [];
  const particleOffsets: number[] = [];
  for (let i = 0; i < particleCount; i++) {
    const pGeom = new THREE.SphereGeometry(radius * 2, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const particle = new THREE.Mesh(pGeom, pMat);
    particles.push(particle);
    particleOffsets.push(i / particleCount);
    group.add(particle);
    disposables.push({ geometry: pGeom, material: pMat });
  }

  const update = (time: number) => {
    const pulse = 1 + Math.sin(time * pulseSpeed) * 0.1;
    tubeMat.opacity = 0.6 + Math.sin(time * pulseSpeed) * 0.2;
    glowMat.opacity = 0.15 + Math.sin(time * pulseSpeed * 0.8) * 0.1;
    particles.forEach((particle, i) => {
      particleOffsets[i] = (particleOffsets[i] + flowSpeed * 0.005) % 1;
      const point = curve.getPoint(particleOffsets[i]);
      particle.position.copy(point);
      const pScale = pulse * (0.6 + Math.sin(time * 3 + i) * 0.3);
      particle.scale.set(pScale, pScale, pScale);
      const pMat = particle.material as THREE.MeshBasicMaterial;
      pMat.opacity = 0.6 + Math.sin(time * 2 + i * 0.5) * 0.3;
    });
  };

  const dispose = () => {
    disposables.forEach((d) => {
      d.geometry?.dispose();
      if (Array.isArray(d.material)) d.material.forEach((m) => m.dispose());
      else d.material?.dispose();
    });
  };

  return { group, update, dispose };
}

export function createAnimatedVectorField(
  arrows: Array<{
    origin: THREE.Vector3;
    direction: THREE.Vector3;
    length: number;
    color: number | string;
    pulseSpeed?: number;
  }>
): AnimatedArrow {
  const group = new THREE.Group();
  const subArrows: AnimatedArrow[] = [];

  arrows.forEach((config) => {
    const arrow = createAnimatedArrow(
      config.origin,
      config.direction,
      config.length,
      config.color,
      { pulseSpeed: config.pulseSpeed ?? 2 }
    );
    group.add(arrow.group);
    subArrows.push(arrow);
  });

  return {
    group,
    update: (time: number) => subArrows.forEach((a) => a.update(time)),
    dispose: () => subArrows.forEach((a) => a.dispose()),
  };
}

/**
 * LiveArrow — a drop-in animated replacement for THREE.ArrowHelper.
 *
 * Extends ArrowHelper so it stays fully compatible with existing code:
 *  - works with `push<T extends THREE.Object3D>` helpers
 *  - `instanceof THREE.ArrowHelper` cleanup/dispose checks keep working
 *  - `setLength()` / `setDirection()` keep working
 *
 * Adds dynamic animation automatically via onBeforeRender (no changes
 * needed to the render loop):
 *  - pulsing shaft & head glow
 *  - traveling energy particles flowing along the shaft
 */
export class LiveArrow extends THREE.ArrowHelper {
  private glowMesh: THREE.Mesh | null = null;
  private particles: THREE.Mesh[] = [];
  private particleOffsets: number[] = [];
  private particlesGroup: THREE.Group;
  private glowMaterial: THREE.MeshBasicMaterial | null = null;
  private particleMaterials: THREE.MeshBasicMaterial[] = [];
  private particleGeometries: THREE.BufferGeometry[] = [];
  private glowGeometry: THREE.BufferGeometry | null = null;
  private glowBaseHeight = 1;
  private baseDir = new THREE.Vector3(0, 1, 0);
  private baseLength = 1;
  private baseHeadLength = 0.2;
  private baseHeadWidth = 0.12;
  private disposables: Array<() => void> = [];

  constructor(
    dir: THREE.Vector3,
    origin: THREE.Vector3,
    length: number,
    color: number | string,
    headLength?: number,
    headWidth?: number
  ) {
    super(dir, origin, length, typeof color === "string" ? new THREE.Color(color).getHex() : color, headLength, headWidth);

    this.baseDir.copy(dir).normalize();
    this.baseLength = length;
    this.baseHeadLength = headLength ?? 0.2 * length;
    this.baseHeadWidth = headWidth ?? 0.7 * this.baseHeadLength;

    const colHex = typeof color === "string" ? new THREE.Color(color).getHex() : color;

    // Glow cylinder around the shaft
    const shaftLen = Math.max(0.001, this.baseLength - this.baseHeadLength);
    const r = this.baseHeadWidth * 0.35;
    this.glowGeometry = new THREE.CylinderGeometry(r * 2.4, r * 2.4, shaftLen, 8, 1, true);
    this.glowBaseHeight = shaftLen;
    this.glowMaterial = new THREE.MeshBasicMaterial({
      color: colHex,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.glowMesh = new THREE.Mesh(this.glowGeometry, this.glowMaterial);
    this.glowMesh.position.set(0, this.line ? 0 : 0, 0);
    this.add(this.glowMesh);
    this.disposables.push(() => this.glowGeometry?.dispose(), () => this.glowMaterial?.dispose());

    // Traveling energy particles along the shaft
    this.particlesGroup = new THREE.Group();
    const count = Math.max(2, Math.min(6, Math.round(this.baseLength * 2)));
    const pGeom = new THREE.SphereGeometry(Math.max(0.015, r * 1.1), 6, 6);
    this.particleGeometries.push(pGeom);
    this.disposables.push(() => pGeom.dispose());
    for (let i = 0; i < count; i++) {
      const pMat = new THREE.MeshBasicMaterial({ color: colHex, transparent: true, opacity: 0.85 });
      this.particleMaterials.push(pMat);
      const p = new THREE.Mesh(pGeom, pMat);
      this.particles.push(p);
      this.particleOffsets.push(i / count);
      this.particlesGroup.add(p);
      this.disposables.push(() => pMat.dispose());
    }
    this.add(this.particlesGroup);

    // Shaft/cone materials are LineBasicMaterial/MeshBasicMaterial created by ArrowHelper;
    // make them transparent so the pulse reads well.
    (this.line.material as THREE.LineBasicMaterial).transparent = true;
    (this.cone.material as THREE.MeshBasicMaterial).transparent = true;

    // Animate every frame via onBeforeRender — no changes needed in the host render loop.
    this.onBeforeRender = () => {
      const t = performance.now() / 1000;

      const pulse = 1 + Math.sin(t * 2.2) * 0.12;
      (this.line.material as THREE.LineBasicMaterial).opacity = 0.75 + Math.sin(t * 2.2) * 0.2;
      (this.cone.material as THREE.MeshBasicMaterial).opacity = 0.85 + Math.sin(t * 2.2 + 0.6) * 0.15;
      this.cone.scale.setScalar(pulse);

      if (this.glowMaterial) {
        this.glowMaterial.opacity = 0.12 + (Math.sin(t * 1.8) * 0.5 + 0.5) * 0.12;
      }
      if (this.glowMesh) {
        this.glowMesh.scale.set(1 + Math.sin(t * 2.2) * 0.15, 1, 1 + Math.sin(t * 2.2) * 0.15);
      }

      // Particles flow origin → tip
      const flow = Math.max(0.001, this.baseLength - this.baseHeadLength);
      this.particles.forEach((p, i) => {
        this.particleOffsets[i] = (this.particleOffsets[i] + 0.008) % 1;
        const d = this.particleOffsets[i] * flow;
        p.position.set(0, d, 0);
        p.position.applyQuaternion(this.quaternion);
        const s = 0.7 + (Math.sin(t * 3 + i * 1.7) * 0.5 + 0.5) * 0.6;
        p.scale.setScalar(s);
        const pm = this.particleMaterials[i];
        if (pm) pm.opacity = 0.5 + (Math.sin(t * 2 + i * 1.3) * 0.5 + 0.5) * 0.4;
      });
    };
  }

  /** Keep base geometry tracking in sync when ArrowHelper mutates length/direction. */
  override setLength(length: number, headLength?: number, headWidth?: number): this {
    super.setLength(length, headLength, headWidth);
    this.baseLength = length;
    this.baseHeadLength = headLength ?? 0.2 * length;
    this.baseHeadWidth = headWidth ?? 0.7 * this.baseHeadLength;
    if (this.glowMesh) {
      const shaftLen = Math.max(0.001, this.baseLength - this.baseHeadLength);
      this.glowMesh.scale.y = shaftLen / Math.max(0.001, this.glowBaseHeight);
    }
    return this;
  }

  override setDirection(dir: THREE.Vector3): this {
    super.setDirection(dir);
    this.baseDir.copy(dir).normalize();
    return this;
  }

  override dispose(): void {
    this.disposables.forEach((d) => d());
    this.disposables = [];
    this.glowMesh = null;
    this.glowMaterial = null;
    this.particles = [];
    this.particleMaterials = [];
    this.particlesGroup.clear();
    super.dispose();
  }
}
