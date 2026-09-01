"use client";
import * as THREE from "three";
import {
  createMouseOrbitScene,
  makeTitleSprite,
  type MouseOrbitHandle,
} from "@/components/lab/mouse-orbit-scene";
import React, { useEffect, useMemo, useRef } from "react";
export type SceneRender = (h: MouseOrbitHandle) => () => void;
export const SCENE_REGISTRY: Record<string, { scene: SceneRender; title: string; description: string }> = {};
const SPHERE = new THREE.SphereGeometry(1, 32, 32);
const BOX = new THREE.BoxGeometry(1, 1, 1);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 32);
const mat = (color: number, emissive?: number) =>
  new THREE.MeshStandardMaterial({ color, emissive: emissive ?? color, emissiveIntensity: 0.25, roughness: 0.35, metalness: 0.2 });

const ProjectileScene: SceneRender = (h) => {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 }));
  ground.rotation.x = -Math.PI / 2; h.group.add(ground);
  const ball = new THREE.Mesh(SPHERE, mat(0xf97316, 0xf97316)); h.group.add(ball);
  const trailGeom = new THREE.BufferGeometry();
  trailGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(300 * 3), 3));
  const trail = new THREE.Line(trailGeom, new THREE.LineBasicMaterial({ color: 0xfb923c })); h.group.add(trail);
  const arrow = new THREE.ArrowHelper(new THREE.Vector3(1, 1, 0).normalize(), new THREE.Vector3(0, 0.5, 0), 3, 0xef4444, 0.6, 0.4); h.group.add(arrow);
  let t = 0; const v0 = 14, angle = Math.PI / 4, g = 9.8;
  const points: THREE.Vector3[] = [];
  const id = setInterval(() => {
    t += 0.02; const x = v0 * Math.cos(angle) * t; const y = v0 * Math.sin(angle) * t - 0.5 * g * t * t;
    if (y < 0 && t > 0.2) { t = 0; points.length = 0; }
    ball.position.set(x, Math.max(y, 0.5), 0); arrow.position.copy(ball.position);
    points.push(ball.position.clone());
    const arr = trail.geometry.attributes.position as THREE.BufferAttribute;
    const n = Math.min(points.length, 300);
    for (let i = 0; i < n; i++) { const p = points[points.length - n + i]; arr.setXYZ(i, p.x, p.y, p.z); }
    arr.needsUpdate = true; trail.geometry.setDrawRange(0, n);
  }, 16);
  return () => clearInterval(id);
};

const SHMScene: SceneRender = (h) => {
  const ceiling = new THREE.Mesh(BOX, mat(0x475569));
  ceiling.scale.set(3, 0.2, 1); ceiling.position.y = 4; h.group.add(ceiling);
  const spring = new THREE.Mesh(CYL, mat(0x22c55e, 0x22c55e)); h.group.add(spring);
  const mass = new THREE.Mesh(SPHERE, mat(0xef4444, 0xef4444)); h.group.add(mass);
  const id = setInterval(() => {
    const t = performance.now() / 500; const y = 4 - 2 - 1.2 * Math.cos(t); const len = 4 - y;
    spring.scale.set(0.06, len, 0.06); spring.position.set(0, 4 - len / 2, 0);
    mass.position.set(0, y, 0);
  }, 16);
  return () => clearInterval(id);
};

const CircularMotionScene: SceneRender = (h) => {
  const orbit = new THREE.Mesh(new THREE.RingGeometry(2.6, 2.7, 64), new THREE.MeshBasicMaterial({ color: 0x6366f1, side: THREE.DoubleSide }));
  orbit.rotation.x = -Math.PI / 2; h.group.add(orbit);
  const center = new THREE.Mesh(SPHERE, mat(0xfbbf24, 0xfbbf24));
  center.scale.setScalar(0.6); h.group.add(center);
  const ball = new THREE.Mesh(SPHERE, mat(0xef4444, 0xef4444)); h.group.add(ball);
  const arrow = new THREE.ArrowHelper(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 2.5, 0x60a5fa, 0.5, 0.3);
  h.group.add(arrow);
  const id = setInterval(() => {
    const t = performance.now() / 700;
    ball.position.set(3 * Math.cos(t), 0, 3 * Math.sin(t));
    arrow.position.copy(ball.position);
    arrow.setDirection(new THREE.Vector3(-ball.position.x, 0, -ball.position.z).normalize());
  }, 16);
  return () => clearInterval(id);
};

const WaveScene: SceneRender = (h) => {
  const N = 80; const points: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) points.push(new THREE.Vector3((i - N / 2) * 0.2, 0, 0));
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x22d3ee }));
  h.group.add(line);
  const id = setInterval(() => {
    const arr = line.geometry.attributes.position as THREE.BufferAttribute;
    const t = performance.now() / 500;
    for (let i = 0; i < N; i++) { const x = (i - N / 2) * 0.2; arr.setY(i, Math.sin(x * 2 - t) + Math.sin(x * 4 - t * 1.3) * 0.3); }
    arr.needsUpdate = true;
  }, 16);
  return () => clearInterval(id);
};

const PendulumScene: SceneRender = (h) => {
  const pivot = new THREE.Mesh(SPHERE, mat(0xfbbf24));
  pivot.scale.setScalar(0.2); pivot.position.y = 3; h.group.add(pivot);
  const rod = new THREE.Mesh(CYL, mat(0x64748b)); h.group.add(rod);
  const bob = new THREE.Mesh(SPHERE, mat(0xef4444, 0xef4444)); h.group.add(bob);
  const traceGeom = new THREE.BufferGeometry();
  const traceLine = new THREE.Line(traceGeom, new THREE.LineBasicMaterial({ color: 0xf97316 }));
  h.group.add(traceLine);
  const trace: THREE.Vector3[] = [];
  const id = setInterval(() => {
    const t = performance.now() / 1000; const a = (Math.PI / 4) * Math.cos(t * 1.5);
    const bx = 3 * Math.sin(a), by = 3 - 3 * Math.cos(a);
    bob.position.set(bx, by, 0);
    rod.position.set(bx / 2, (3 + by) / 2, 0);
    const len = Math.hypot(bx, by - 3) || 0.04;
    rod.scale.set(0.04, len, 0.04); rod.lookAt(bob.position); rod.rotateX(Math.PI / 2);
    trace.push(bob.position.clone()); if (trace.length > 120) trace.shift();
    traceGeom.setFromPoints(trace);
  }, 16);
  return () => clearInterval(id);
};

const VectorScene: SceneRender = (h) => {
  const origin = new THREE.Mesh(SPHERE, mat(0xfbbf24));
  origin.scale.setScalar(0.3); h.group.add(origin);
  h.group.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0.5, 0).normalize(), new THREE.Vector3(), 4, 0xef4444, 0.4, 0.3));
  h.group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0.5).normalize(), new THREE.Vector3(), 4, 0x22c55e, 0.4, 0.3));
  h.group.add(new THREE.ArrowHelper(new THREE.Vector3(1, 1.5, 0.5).normalize(), new THREE.Vector3(), 6, 0x60a5fa, 0.5, 0.4));
  h.group.add(makeTitleSprite("A + B = R", "#7dd3fc"));
  return () => {};
};

const EMFieldScene: SceneRender = (h) => {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.4, 16, 64), mat(0x60a5fa, 0x60a5fa));
  ring.rotation.x = Math.PI / 2; h.group.add(ring);
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2;
    const e = new THREE.Mesh(SPHERE, mat(0xf97316, 0xf97316));
    e.scale.setScalar(0.18); e.position.set(Math.cos(t) * 1.5, 0, Math.sin(t) * 1.5); h.group.add(e);
    h.group.add(new THREE.ArrowHelper(new THREE.Vector3(Math.cos(t), 0, Math.sin(t)), e.position, 1.5, 0xf97316, 0.2, 0.15));
  }
  return () => {};
};

const OpticsScene: SceneRender = (h) => {
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 0.4, 64, 1, false, 0, Math.PI),
    new THREE.MeshPhysicalMaterial({ color: 0x88ddff, transmission: 0.85, roughness: 0.05, thickness: 0.5, transparent: true, opacity: 0.4 }),
  );
  lens.rotation.z = Math.PI / 2; h.group.add(lens);
  for (let i = -2; i <= 2; i++) {
    h.group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-6, i * 0.4, 0), new THREE.Vector3(6, i * 0.2, 0)]),
      new THREE.LineBasicMaterial({ color: 0xfbbf24 }),
    ));
  }
  return () => {};
};

const PrismScene: SceneRender = (h) => {
  const prism = new THREE.Mesh(new THREE.ConeGeometry(1.4, 2.4, 3), new THREE.MeshPhysicalMaterial({ color: 0xeeeeff, transmission: 0.9, roughness: 0, transparent: true, opacity: 0.45 }));
  prism.rotation.z = Math.PI / 2; h.group.add(prism);
  ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6"].forEach((c, i) => {
    const ray = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 5, 8), new THREE.MeshBasicMaterial({ color: c }));
    ray.position.set(-3, -i * 0.05, 0); ray.rotation.z = Math.PI / 6 + (i * Math.PI) / 30;
    h.group.add(ray);
  });
  return () => {};
};

const SatelliteScene: SceneRender = (h) => {
  h.group.add(new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.6 })));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3, 0.02, 8, 64), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
  ring.rotation.x = Math.PI / 2; h.group.add(ring);
  const sat = new THREE.Mesh(BOX, mat(0xef4444, 0xef4444));
  sat.scale.setScalar(0.3); h.group.add(sat);
  const id = setInterval(() => {
    const t = performance.now() / 1500;
    sat.position.set(3 * Math.cos(t), 0, 3 * Math.sin(t)); sat.rotation.y = t;
  }, 16);
  return () => clearInterval(id);
};

const CapacitorScene: SceneRender = (h) => {
  for (let s = 0; s < 2; s++) {
    const plate = new THREE.Mesh(BOX, mat(0xfbbf24, 0xfbbf24));
    plate.scale.set(4, 4, 0.2); plate.position.set(0, s ? 1.4 : -1.4, 0); h.group.add(plate);
  }
  for (let i = 0; i < 24; i++) {
    const isTop = i % 2 === 0;
    const e = new THREE.Mesh(SPHERE, mat(isTop ? 0xef4444 : 0x3b82f6, isTop ? 0xef4444 : 0x3b82f6));
    e.scale.setScalar(0.15);
    e.position.set((Math.random() - 0.5) * 3.6, isTop ? 0.7 : -0.7, (Math.random() - 0.5) * 0.1);
    h.group.add(e);
  }
  h.group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -0.7, 0), 2, 0x22d3ee, 0.4, 0.3));
  return () => {};
};

const CircuitScene: SceneRender = (h) => {
  const battery = new THREE.Mesh(BOX, mat(0xef4444));
  battery.scale.set(0.6, 1, 0.6); h.group.add(battery);
  const resistor = new THREE.Mesh(CYL, mat(0xfacc15, 0xfacc15));
  resistor.rotation.z = Math.PI / 2; resistor.position.set(2, 0, 0); h.group.add(resistor);
  h.group.add(new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1, 0, 0), new THREE.Vector3(2, 0, 0),
      new THREE.Vector3(2, 1.5, 0), new THREE.Vector3(-1, 1.5, 0), new THREE.Vector3(-1, 0, 0),
    ]),
    new THREE.LineBasicMaterial({ color: 0x60a5fa }),
  ));
  const e = new THREE.Mesh(SPHERE, mat(0x22d3ee, 0x22d3ee));
  e.scale.setScalar(0.15); h.group.add(e);
  let t = 0;
  const id = setInterval(() => {
    t += 0.05; const p = (t % 7) / 7;
    if (p < 1 / 3) e.position.set(-1 + p * 9, 0, 0);
    else if (p < 2 / 3) e.position.set(2, (p - 1 / 3) * 4.5, 0);
    else e.position.set(2 - (p - 2 / 3) * 9, 1.5, 0);
  }, 16);
  return () => clearInterval(id);
};

const NuclearScene: SceneRender = (h) => {
  const colors = [0xef4444, 0xef4444, 0xef4444, 0x3b82f6, 0x3b82f6];
  for (let i = 0; i < 5; i++) {
    const n = new THREE.Mesh(SPHERE, mat(colors[i], colors[i]));
    n.scale.setScalar(0.55);
    n.position.set(Math.cos((i / 5) * Math.PI * 2) * 0.6, 0, Math.sin((i / 5) * Math.PI * 2) * 0.6);
    h.group.add(n);
  }
  const electron = new THREE.Mesh(SPHERE, mat(0x22d3ee, 0x22d3ee));
  electron.scale.setScalar(0.25); h.group.add(electron);
  const id = setInterval(() => {
    const t = performance.now() / 600;
    electron.position.set(4 * Math.cos(t), 0.6 * Math.sin(t), 4 * Math.sin(t));
    h.group.rotation.y += 0.005;
  }, 16);
  return () => clearInterval(id);
};

const SolarScene: SceneRender = (h) => {
  const sun = new THREE.Mesh(SPHERE, mat(0xfbbf24, 0xfbbf24));
  sun.scale.setScalar(1.2); h.group.add(sun);
  const orbits: { mesh: THREE.Mesh; radius: number; speed: number; phase: number }[] = [];
  for (let i = 0; i < 4; i++) {
    const planet = new THREE.Mesh(SPHERE, mat([0x9ca3af, 0xf97316, 0x3b82f6, 0xef4444][i]));
    planet.scale.setScalar(0.35 - i * 0.05); h.group.add(planet);
    orbits.push({ mesh: planet, radius: 2.5 + i * 1.4, speed: 0.6 - i * 0.1, phase: i * 0.5 });
  }
  const id = setInterval(() => {
    const t = performance.now() / 1000;
    orbits.forEach(({ mesh, radius, speed, phase }) => {
      mesh.position.set(radius * Math.cos(t * speed + phase), 0, radius * Math.sin(t * speed + phase));
    });
  }, 16);
  return () => clearInterval(id);
};

const LHCScene: SceneRender = (h) => {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4, 0.3, 16, 64), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.2 }));
  ring.rotation.x = Math.PI / 2; h.group.add(ring);
  const protons: { mesh: THREE.Mesh; offset: number }[] = [];
  for (let i = 0; i < 2; i++) {
    const p = new THREE.Mesh(SPHERE, mat(i ? 0xef4444 : 0x3b82f6, i ? 0xef4444 : 0x3b82f6));
    p.scale.setScalar(0.3); h.group.add(p);
    protons.push({ mesh: p, offset: i * Math.PI });
  }
  const id = setInterval(() => {
    const t = performance.now() / 1000;
    protons.forEach(({ mesh, offset }) => { mesh.position.set(4 * Math.cos(t + offset), 0, 4 * Math.sin(t + offset)); });
  }, 16);
  return () => clearInterval(id);
};

const BigBangScene: SceneRender = (h) => {
  const particles: { mesh: THREE.Mesh; angle: number; r: number }[] = [];
  for (let i = 0; i < 80; i++) {
    const c = new THREE.Mesh(SPHERE, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    c.scale.setScalar(0.05 + Math.random() * 0.1);
    const angle = Math.random() * Math.PI * 2;
    const r = 1 + Math.random() * 5;
    c.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 5, Math.sin(angle) * r);
    h.group.add(c);
    particles.push({ mesh: c, angle, r });
  }
  const t0 = performance.now() / 1000;
  const id = setInterval(() => {
    const t = performance.now() / 1000 - t0;
    particles.forEach(({ mesh, angle, r }) => {
      const scale = 1 + t * 0.05;
      mesh.position.x = r * scale * Math.cos(angle);
      mesh.position.z = r * scale * Math.sin(angle);
    });
  }, 16);
  return () => clearInterval(id);
};

const AtomScene: SceneRender = (h) => {
  const nucleus = new THREE.Mesh(SPHERE, mat(0xef4444, 0xef4444));
  nucleus.scale.setScalar(0.8); h.group.add(nucleus);
  for (let s = 0; s < 3; s++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2 + s, 0.02, 8, 64), new THREE.MeshBasicMaterial({ color: 0x7dd3fc }));
    ring.rotation.x = Math.PI / 2; ring.rotation.y = (s * Math.PI) / 6; h.group.add(ring);
  }
  const electrons: THREE.Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const e = new THREE.Mesh(SPHERE, mat(0x3b82f6, 0x3b82f6));
    e.scale.setScalar(0.2); h.group.add(e); electrons.push(e);
  }
  const id = setInterval(() => {
    const t = performance.now() / 700;
    electrons.forEach((e, i) => {
      const r = 2 + (i % 3); const phase = (i / 6) * Math.PI * 2;
      e.position.set(r * Math.cos(t + phase), r * Math.sin(t * 1.2 + phase) * 0.3, r * Math.sin(t + phase));
    });
  }, 16);
  return () => clearInterval(id);
};

const MoleculeScene: SceneRender = (h) => {
  const positions: [number, number, number, number][] = [
    [0, 0, 0, 0x10b981], [1.6, 0.6, 0, 0xffffff], [-1.6, 0.6, 0, 0xffffff], [0, 1.8, 0, 0xffffff],
  ];
  positions.forEach(([x, y, z, c]) => {
    const atom = new THREE.Mesh(SPHERE, mat(c, c));
    atom.scale.setScalar(0.45); atom.position.set(x, y, z); h.group.add(atom);
  });
  for (let i = 1; i < 4; i++) {
    const [x, y, z] = positions[i];
    const bond = new THREE.Mesh(CYL, new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
    bond.position.set(x / 2, y / 2, z / 2);
    bond.scale.set(0.08, Math.hypot(x, y, z) / 2, 0.08);
    bond.lookAt(new THREE.Vector3(x, y, z)); bond.rotateX(Math.PI / 2); h.group.add(bond);
  }
  return () => {};
};

const PeriodicTableScene: SceneRender = (h) => {
  const palette = [0xef4444, 0xfb923c, 0xfbbf24, 0xfacc15, 0xa3e635, 0xfbbf24, 0x60a5fa, 0xef4444, 0x10b981, 0x8b5cf6];
  for (let i = 0; i < palette.length; i++) {
    const cell = new THREE.Mesh(BOX, mat(palette[i], palette[i]));
    cell.scale.set(0.8, 0.8, 0.4);
    cell.position.set((i % 5) * 1 - 2, -Math.floor(i / 5) * 1, 0);
    h.group.add(cell);
  }
  return () => {};
};

const CrystalScene: SceneRender = (h) => {
  for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = -2; z <= 2; z++) {
    const node = new THREE.Mesh(SPHERE, mat(0x60a5fa, 0x60a5fa));
    node.scale.setScalar(0.2);
    node.position.set(x * 1.4, y * 1.4, z * 1.4);
    h.group.add(node);
  }
  const id = setInterval(() => {
    h.group.rotation.y += 0.003;
    h.group.rotation.x = Math.sin(performance.now() / 2000) * 0.2;
  }, 16);
  return () => clearInterval(id);
};

const ReactionScene: SceneRender = (h) => {
  for (let i = 0; i < 6; i++) {
    const a = new THREE.Mesh(SPHERE, mat(0x3b82f6, 0x3b82f6));
    a.scale.setScalar(0.3); a.position.set(-3, i * 0.5 - 1.5, 0); h.group.add(a);
    const b = new THREE.Mesh(SPHERE, mat(0xef4444, 0xef4444));
    b.scale.setScalar(0.4); b.position.set(0, i * 0.5 - 1.5, 0); h.group.add(b);
    const c = new THREE.Mesh(SPHERE, mat(0x10b981, 0x10b981));
    c.scale.setScalar(0.5); c.position.set(3, i * 0.5 - 1.5, 0); h.group.add(c);
  }
  const id = setInterval(() => {
    h.group.children.forEach((m: any, i: number) => { m.position.y += Math.sin(performance.now() / 500 + i) * 0.005; });
  }, 16);
  return () => clearInterval(id);
};

const ElectrolysisScene: SceneRender = (h) => {
  const beaker = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 3, 32, 1, true),
    new THREE.MeshPhysicalMaterial({ color: 0x88ccff, transmission: 0.7, roughness: 0.1, side: THREE.DoubleSide }),
  );
  h.group.add(beaker);
  for (let i = 0; i < 60; i++) {
    const e = new THREE.Mesh(SPHERE, mat(Math.random() > 0.5 ? 0x3b82f6 : 0x22d3ee));
    e.scale.setScalar(0.07);
    e.position.set((Math.random() - 0.5) * 3.5, (Math.random() - 0.5) * 2.6, (Math.random() - 0.5) * 3.5);
    h.group.add(e);
  }
  return () => {};
};

const WaveFunctionScene: SceneRender = (h) => {
  const N = 40;
  const colors = [0xef4444, 0x3b82f6, 0x10b981, 0xfbbf24];
  for (let layer = 0; layer < 4; layer++) {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const x = (i - N / 2) * 0.3; const y = layer * 1.2 - 1.8;
      points.push(new THREE.Vector3(x, y, Math.exp(-(x * x) / 8)));
    }
    h.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: colors[layer] })));
  }
  return () => {};
};

const CellScene: SceneRender = (h) => {
  const membrane = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshPhysicalMaterial({ color: 0x88ddff, transmission: 0.7, roughness: 0.1, thickness: 0.2, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
  );
  h.group.add(membrane);
  const nucleus = new THREE.Mesh(SPHERE, mat(0x8b5cf6, 0x8b5cf6));
  nucleus.scale.setScalar(1); h.group.add(nucleus);
  const mito = new THREE.Mesh(CYL, mat(0xef4444, 0xef4444));
  mito.position.set(1.5, 1, 0); mito.rotation.z = Math.PI / 3; mito.scale.set(0.3, 1, 0.3);
  h.group.add(mito);
  const chloro = new THREE.Mesh(SPHERE, mat(0x10b981, 0x10b981));
  chloro.scale.setScalar(0.6); chloro.position.set(-1.5, -1, 0); h.group.add(chloro);
  const id = setInterval(() => { h.group.rotation.y += 0.004; }, 16);
  return () => clearInterval(id);
};

const DNAScene: SceneRender = (h) => {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 80; i++) {
    const t = (i / 80) * Math.PI * 6; const y = i * 0.1 - 4;
    points.push(new THREE.Vector3(Math.cos(t) * 1.2, y, Math.sin(t) * 1.2));
    points.push(new THREE.Vector3(Math.cos(t + Math.PI) * 1.2, y, Math.sin(t + Math.PI) * 1.2));
  }
  h.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x8b5cf6 })));
  for (let i = 0; i < 40; i++) {
    const t = (i / 40) * Math.PI * 6; const y = i * 0.2 - 4;
    const a = new THREE.Vector3(Math.cos(t) * 1.2, y, Math.sin(t) * 1.2);
    const b = new THREE.Vector3(Math.cos(t + Math.PI) * 1.2, y, Math.sin(t + Math.PI) * 1.2);
    const bar = new THREE.Mesh(CYL, mat(0x60a5fa, 0x60a5fa));
    bar.position.copy(a.clone().add(b).multiplyScalar(0.5));
    bar.scale.set(0.05, a.distanceTo(b) / 2, 0.05);
    bar.lookAt(b); bar.rotateX(Math.PI / 2);
    h.group.add(bar);
  }
  const id = setInterval(() => { h.group.rotation.y += 0.01; }, 16);
  return () => clearInterval(id);
};

const MitosisScene: SceneRender = (h) => {
  for (let i = 0; i < 4; i++) {
    const cell = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), new THREE.MeshPhysicalMaterial({ color: 0x88ddff, transmission: 0.6, transparent: true, opacity: 0.3 }));
    cell.position.set((i - 1.5) * 2.5, 0, 0); h.group.add(cell);
    for (let c = 0; c < 4; c++) {
      const angle = (c / 4) * Math.PI * 2;
      const chromo = new THREE.Mesh(BOX, mat(c % 2 === 0 ? 0x8b5cf6 : 0x3b82f6, c % 2 === 0 ? 0x8b5cf6 : 0x3b82f6));
      chromo.scale.set(0.12, 0.6, 0.12);
      chromo.position.set(cell.position.x + 0.5 * Math.cos(angle + i * 0.4), 0, 0.5 * Math.sin(angle + i * 0.4));
      h.group.add(chromo);
    }
  }
  return () => {};
};

const EcosystemScene: SceneRender = (h) => {
  const tiers: [number, number][] = [[0x10b981, 6], [0x84cc16, 4], [0xfacc15, 3], [0xef4444, 2], [0x9ca3af, 1]];
  tiers.forEach(([c, n], level) => {
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2; const r = 1 + level * 1.4;
      const node = new THREE.Mesh(SPHERE, mat(c, c));
      node.scale.setScalar(0.35);
      node.position.set(Math.cos(angle) * r, -level * 0.8 + 2, Math.sin(angle) * r);
      h.group.add(node);
    }
  });
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    h.group.add(new THREE.ArrowHelper(
      new THREE.Vector3(Math.cos(angle), 0.3, Math.sin(angle)),
      new THREE.Vector3(Math.cos(angle) * 2, 1, Math.sin(angle) * 2), 2, 0xfbbf24, 0.3, 0.2,
    ));
  }
  return () => {};
};

const HeartScene: SceneRender = (h) => {
  const heart = new THREE.Mesh(SPHERE, new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.5 }));
  heart.scale.setScalar(1.4); h.group.add(heart);
  for (let i = 0; i < 4; i++) {
    const t = (i / 4) * Math.PI * 2;
    const v = new THREE.Mesh(CYL, mat(0x60a5fa, 0x60a5fa));
    v.position.set(Math.cos(t) * 1.6, 0, Math.sin(t) * 1.6);
    v.scale.set(0.1, 1.5, 0.1); v.rotation.z = Math.PI / 2; h.group.add(v);
  }
  const id = setInterval(() => {
    const t = performance.now() / 600;
    heart.scale.setScalar(1.4 + Math.abs(Math.sin(t)) * 0.2);
  }, 16);
  return () => clearInterval(id);
};

const EvolutionScene: SceneRender = (h) => {
  const root = new THREE.Mesh(SPHERE, mat(0xef4444, 0xef4444));
  root.scale.setScalar(0.4); root.position.set(-5, 0, 0); h.group.add(root);
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI - Math.PI / 2;
    const node = new THREE.Mesh(SPHERE, mat([0xf97316, 0xfacc15, 0x10b981, 0x3b82f6][i % 4]));
    node.scale.setScalar(0.3);
    node.position.set(-3 + i * 0.8, Math.sin(angle) * 1.5, Math.cos(i) * 0.5);
    h.group.add(node);
  }
  return () => {};
};

const SurfaceScene: SceneRender = (h) => {
  const SIZE = 30;
  const geom = new THREE.PlaneGeometry(10, 10, SIZE, SIZE);
  const positions = geom.attributes.position as THREE.BufferAttribute;
  const mesh = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0x7dd3fc, wireframe: true, emissive: 0x7dd3fc, emissiveIntensity: 0.4 }));
  mesh.rotation.x = -Math.PI / 2; h.group.add(mesh);
  const id = setInterval(() => {
    const t = performance.now() / 1000;
    for (let i = 0; i <= SIZE; i++) for (let j = 0; j <= SIZE; j++) {
      const x = positions.getX(i * (SIZE + 1) + j); const y = positions.getY(i * (SIZE + 1) + j);
      positions.setZ(i * (SIZE + 1) + j, Math.sin(x * 1.2 + t) * Math.cos(y * 1.2 + t) * 0.6);
    }
    positions.needsUpdate = true; geom.computeVertexNormals();
  }, 32);
  return () => clearInterval(id);
};

const Vector3DScene: SceneRender = (h) => {
  const colors = [0xef4444, 0x10b981, 0x3b82f6];
  for (let i = 0; i < 3; i++) {
    h.group.add(new THREE.ArrowHelper(
      new THREE.Vector3(i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0),
      new THREE.Vector3(), 5, colors[i], 0.3, 0.2,
    ));
  }
  for (let i = 0; i < 6; i++) {
    h.group.add(new THREE.ArrowHelper(
      new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
      new THREE.Vector3(), 4, 0xfbbf24, 0.3, 0.2,
    ));
  }
  return () => {};
};

const TrigScene: SceneRender = (h) => {
  const circle = new THREE.Mesh(new THREE.RingGeometry(2, 2.02, 64), new THREE.MeshBasicMaterial({ color: 0x60a5fa, side: THREE.DoubleSide }));
  circle.rotation.x = -Math.PI / 2; h.group.add(circle);
  const wavePoints: THREE.Vector3[] = [];
  for (let i = 0; i < 80; i++) wavePoints.push(new THREE.Vector3((i / 80) * 8 - 4, 0, 0));
  const wave = new THREE.Line(new THREE.BufferGeometry().setFromPoints(wavePoints), new THREE.LineBasicMaterial({ color: 0xef4444 }));
  h.group.add(wave);
  const id = setInterval(() => {
    const t = performance.now() / 800;
    const arr = wave.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < 80; i++) {
      const x = (i / 80) * 8 - 4;
      arr.setY(i, Math.sin(x * 1.5 + t) * 1.5);
    }
    arr.needsUpdate = true;
  }, 16);
  return () => clearInterval(id);
};

const BarChartScene: SceneRender = (h) => {
  for (let i = 0; i < 10; i++) {
    const bar = new THREE.Mesh(BOX, mat([0x60a5fa, 0xef4444, 0x10b981, 0xfbbf24][i % 4]));
    bar.scale.set(0.5, 1 + Math.random() * 2, 0.5);
    bar.position.set((i - 5) * 0.7, bar.scale.y / 2, 0); h.group.add(bar);
  }
  return () => {};
};

const MatrixScene: SceneRender = (h) => {
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const cell = new THREE.Mesh(BOX, mat(0x7dd3fc, 0x7dd3fc));
    cell.scale.set(0.7, 0.7, 0.3);
    cell.position.set((j - 1.5) * 0.8, (i - 1.5) * 0.8, 0); h.group.add(cell);
  }
  const id = setInterval(() => { h.group.rotation.y += 0.005; }, 16);
  return () => clearInterval(id);
};

const FunctionScene: SceneRender = (h) => {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 100; i++) {
    const x = (i / 100) * 8 - 4;
    points.push(new THREE.Vector3(x, Math.sin(x) * 1.5, 0));
  }
  h.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x22d3ee })));
  const tangent = new THREE.Mesh(SPHERE, mat(0xef4444, 0xef4444));
  tangent.scale.setScalar(0.15); h.group.add(tangent);
  const id = setInterval(() => {
    const t = performance.now() / 1000;
    const x = Math.sin(t) * 4;
    tangent.position.set(x, Math.sin(x) * 1.5, 0);
  }, 16);
  return () => clearInterval(id);
};

const SpiralScene: SceneRender = (h) => {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 200; i++) {
    const t = (i / 200) * Math.PI * 6;
    points.push(new THREE.Vector3(Math.cos(t) * t * 0.15, t * 0.5 - 3, Math.sin(t) * t * 0.15));
  }
  h.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x8b5cf6 })));
  const id = setInterval(() => { h.group.rotation.y += 0.005; }, 16);
  return () => clearInterval(id);
};

const KEYWORD_ROUTES: Array<{ keys: string[]; scene: SceneRender; title: string; description: string }> = [
  // Physics
  { keys: ["projectile", "freely falling", "kinematics", "relative velocity", "instantaneous velocity", "acceleration", "equation of motion", "graphical"], scene: ProjectileScene, title: "Kinematics / Projectile", description: "Mouse-rotates trajectory, velocity arrow, and trail." },
  { keys: ["shm", "simple harmonic", "oscillation", "spring", "elastic potential", "hooke", "elastic", "young", "shear", "bulk", "stress", "strain"], scene: SHMScene, title: "Elasticity & SHM", description: "Spring + mass oscillating under Hooke's law." },
  { keys: ["circular", "centripetal", "vertical circle", "banking", "angular", "rotational"], scene: CircularMotionScene, title: "Circular Motion", description: "Body orbiting with centripetal arrow following the mouse view." },
  { keys: ["pendulum"], scene: PendulumScene, title: "Pendulum", description: "Bob swinging with trace path." },
  { keys: ["wave", "interference", "diffraction", "polarization", "huygens", "wavefront", "youngs"], scene: WaveScene, title: "Wave Optics", description: "Live 1D wave with interference harmonics." },
  { keys: ["vector", "triangle", "parallelogram", "polygon", "resolution", "scalar product", "dot product", "cross product", "physical quantity", "dimension", "significant", "precision"], scene: VectorScene, title: "Vectors", description: "A + B = R arrow diagram." },
  { keys: ["magnetic", "biot", "ampere", "lorentz", "galvanometer", "solenoid", "moving coil", "force"], scene: EMFieldScene, title: "Magnetic Field", description: "Current loop with B-field arrows." },
  { keys: ["refraction", "total internal", "lateral shift", "snell"], scene: OpticsScene, title: "Refraction", description: "Light rays converging through a lens (rotate to inspect)." },
  { keys: ["prism", "deviation", "dispersive", "minimum deviation"], scene: PrismScene, title: "Prism Dispersion", description: "White light splitting into the visible spectrum." },
  { keys: ["lens", "lenses", "angular magnification", "lens maker"], scene: OpticsScene, title: "Lenses", description: "Convex lens ray trace — mouse rotates view." },
  { keys: ["mirror", "curved", "concave", "convex", "real", "virtual image"], scene: OpticsScene, title: "Curved Mirrors", description: "Lens-style demonstration (rotate with mouse)." },
  { keys: ["satellite", "orbital velocity", "escape velocity", "geostationary", "gravitation", "newton", "gravity", "altitude", "depth", "kepler", "potential"], scene: SatelliteScene, title: "Gravitation & Satellites", description: "Earth + orbiting satellite, fully rotatable." },
  { keys: ["capacit", "capacitor", "dielectric", "parallel plate"], scene: CapacitorScene, title: "Capacitors", description: "Parallel-plate capacitor with field arrow and charges." },
  { keys: ["current", "ohm", "resist", "drift velocity", "kirchhoff", "wheatstone", "potentiometer", "circuit", "emf"], scene: CircuitScene, title: "Current Electricity", description: "Live circuit with flowing electron." },
  { keys: ["nuclear", "nucleus", "binding energy", "fission", "fusion", "mass defect", "radioactive", "decay", "alpha", "gamma"], scene: NuclearScene, title: "Nuclear Physics", description: "Nucleus with protons/neutrons and orbital electron." },
  { keys: ["semiconductor", "solid", "energy band", "intrinsic", "extrinsic", "diode", "transistor", "logic gate", "p-n"], scene: CrystalScene, title: "Solids / Semiconductors", description: "Crystal lattice rotation." },
  { keys: ["big bang", "hubble", "expansion", "universe", "dark matter", "black hole", "gravitational wave"], scene: BigBangScene, title: "Cosmology", description: "Expanding particle cloud — Big Bang." },
  { keys: ["particle", "quark", "baryon", "meson", "lepton", "neutrino", "antiparticle"], scene: LHCScene, title: "Particle Physics", description: "LHC-style collision ring with protons." },
  { keys: ["heat", "temperature", "thermal", "specific heat", "calorimetry", "newtons law of cooling", "specific latent", "change of phase", "triple point", "heat capacity"], scene: MoleculeScene, title: "Heat & Temperature", description: "Molecular vibration model." },
  { keys: ["ideal gas", "boyle", "charles", "avogadro", "graham", "dalton", "kinetic theory", "root mean square", "boltzmann"], scene: MoleculeScene, title: "Gases", description: "Molecular motion model — rotate with mouse." },
  { keys: ["rate of heat", "conduction", "convection", "radiation", "stefan", "black body", "thermal conductivity"], scene: MoleculeScene, title: "Heat Transfer", description: "Energy propagation between molecules." },
  { keys: ["thermal expansion", "linear expansion", "cubical expansion", "superficial expansion", "expansivity"], scene: BarChartScene, title: "Thermal Expansion", description: "Bar-chart length comparison." },
  { keys: ["gauss", "electric field", "field lines", "coulomb", "electric charge", "induction", "point charge"], scene: EMFieldScene, title: "Electric Field", description: "Field around a positive charge." },
  { keys: ["potential", "equipotential", "potential gradient", "electron volt", "potential energy"], scene: SurfaceScene, title: "Electric Potential", description: "3D potential surface." },
  { keys: ["electromagnetic induction", "faraday", "lenz", "self-inductance", "mutual", "lr circuit", "growing", "decaying"], scene: EMFieldScene, title: "Electromagnetic Induction", description: "Field loop with induced arrows." },
  { keys: ["alternating", "ac voltage", "lc oscillation", "lcr", "resonance", "transformer", "power factor"], scene: WaveScene, title: "AC Circuits", description: "Sinusoidal voltage representation." },
  { keys: ["modern physics", "photoelectric", "de broglie", "bohr", "hydrogen spectrum"], scene: AtomScene, title: "Modern Physics", description: "Bohr-style atom model." },
  { keys: ["communication", "modulation", "amplitude modulation", "frequency modulation", "bandwidth"], scene: WaveScene, title: "Communication", description: "AM/FM wave demonstration." },

  // Chemistry
  { keys: ["atom", "rutherford", "bohr", "quantum", "orbit", "orbital", "aufbau", "pauli", "hund", "quantum number", "de broglie", "uncertainty", "schrodinger", "wave function", "electron", "anode", "cathode", "dalton"], scene: AtomScene, title: "Atomic Structure", description: "Atom with shells and orbiting electrons." },
  { keys: ["periodic", "modern periodic", "periodic table", "periodicity", "effective nuclear", "ionization", "electron affinity", "electronegativity", "metallic character"], scene: PeriodicTableScene, title: "Periodic Table", description: "3D periodic-table cube layout." },
  { keys: ["bond", "ionic", "covalent", "coordinate", "lewis", "resonance", "vsepr", "hybrid", "valence bond", "bond length", "dipole", "vander", "hydrogen bond", "metallic bond", "shapes of molecules", "molecules"], scene: MoleculeScene, title: "Chemical Bonding", description: "Methane-style molecule with bond rods." },
  { keys: ["oxidation", "reduction", "redox", "balancing", "ion-electron", "electrolysis", "faraday"], scene: ElectrolysisScene, title: "Redox & Electrolysis", description: "Beaker with ion particles — rotate to inspect." },
  { keys: ["state", "gas", "liquid", "solid", "boyle", "charles", "kinetic theory", "ideal gas", "vapour pressure", "boiling", "surface tension", "viscosity", "liquid crystal", "amorphous", "crystalline", "crystal lattice", "unit cell", "water of crystallization", "deliquescent", "efflorescent"], scene: CrystalScene, title: "States of Matter", description: "Crystal lattice with mouse rotation." },
  { keys: ["equilibrium", "mass action", "le chatelier", "kp", "kc"], scene: ReactionScene, title: "Chemical Equilibrium", description: "Reactant ? product flow." },
  { keys: ["hydrogen", "oxygen", "ozone", "nitrogen", "ammonia", "nitric acid", "halogen", "chlorine", "bromine", "iodine", "haloacid", "carbon", "carbon monoxide", "phosphorus", "phosphine", "sulphur", "hydrogen sulphide", "sulphur dioxide", "sulphuric acid", "sodium thiosulphate", "non-metal"], scene: MoleculeScene, title: "Chemistry of Non-metals", description: "Generic molecular diagram — rotate with mouse." },
  { keys: ["metal", "metallurgy", "ore", "gangue", "flux", "slag", "alloy", "amalgam", "calcination", "roasting", "smelting", "carbon reduction", "thermite", "electrochemical", "poling", "refining", "alkali", "sodium", "down", "sodium hydroxide", "sodium carbonate", "alkaline earth", "quick lime", "bleaching powder", "magnesia", "plaster", "epsom"], scene: CrystalScene, title: "Metals", description: "Crystal lattice model." },
  { keys: ["bio-inorganic", "micro nutrient", "macro nutrient", "metal ion", "ion pump", "metal toxicity"], scene: MoleculeScene, title: "Bio-inorganic Chemistry", description: "Molecular model." },
  { keys: ["stoichi", "mole", "avogadro", "dalton", "law of conservation", "law of definite", "law of multiple", "law of reciprocal", "empirical formula", "molecular formula", "limiting reactant", "yield", "percentage composition"], scene: ReactionScene, title: "Stoichiometry", description: "Reactant/product flow diagram." },
  { keys: ["organic", "tetra-covalency", "catenation", "alkyl", "functional group", "homologous", "structural formula", "contracted", "bond line", "cracking", "reforming", "octane", "cetane", "gasoline"], scene: MoleculeScene, title: "Organic Fundamentals", description: "Organic molecular model." },
  { keys: ["iupac", "nomenclature", "lassaigne", "isomerism", "chain", "position", "functional isomer", "metamerism", "geometrical", "optical isomerism", "reaction mechanism", "homolytic", "heterolytic", "electrophile", "nucleophile", "free radical", "inductive effect", "resonance effect"], scene: MoleculeScene, title: "Organic Principles", description: "Molecular model with rotating geometry." },
  { keys: ["alkane", "alkene", "alkyne", "saturated", "unsaturated", "haloalkane", "wurtz", "dec", "halogenation", "nitration", "sulphonation", "dehydration", "dehydrohal", "peroxide", "markovnikov", "kolbe", "test of unsaturation"], scene: MoleculeScene, title: "Hydrocarbons", description: "Hydrocarbon molecule model." },
  { keys: ["aromatic", "benzene", "huckel", "kekule", "friedel", "electrophilic substitution"], scene: MoleculeScene, title: "Aromatic Hydrocarbons", description: "Benzene ring model." },
  { keys: ["applied chemistry", "chemical industry", "cash flow", "continuous processing", "batch processing"], scene: BarChartScene, title: "Applied Chemistry", description: "Bar-chart production cycles." },
  { keys: ["modern chemical", "haber", "ostwald", "contact process", "diaphragm", "solvay", "urea", "fertilizer"], scene: ReactionScene, title: "Modern Chemical Manufacture", description: "Continuous flow diagram." },
  { keys: ["solution", "solubility", "raoult", "colligative", "vapour pressure", "boiling point", "freezing point", "osmosis", "osmotic pressure", "vant hoff"], scene: MoleculeScene, title: "Solutions", description: "Solvent+solute particle model." },
  { keys: ["electro-chem", "galvanic", "electrode", "nernst", "conductance", "battery", "fuel cell"], scene: ElectrolysisScene, title: "Electrochemistry", description: "Beaker with ions — rotate with mouse." },
  { keys: ["kinetics", "rate of reaction", "rate law", "integrated rate", "arrhenius", "activation energy"], scene: ReactionScene, title: "Chemical Kinetics", description: "Reactant/product flow with collision model." },
  { keys: ["alcohol", "phenol", "ether", "kolbe", "reimer", "tiemann", "cleavage"], scene: MoleculeScene, title: "Alcohols/Phenols/Ethers", description: "Molecule model." },
  { keys: ["aldehyde", "ketone", "carboxylic acid", "aldol", "cannizzaro", "hvz"], scene: MoleculeScene, title: "Aldehydes/Ketones/Acids", description: "Molecule model." },
  { keys: ["amine", "diazot", "couins", "hinsberg", "basic character"], scene: MoleculeScene, title: "Amines", description: "Molecule model." },
  { keys: ["biomolecule", "carbohydrate", "protein", "amino acid", "peptide", "enzyme", "vitamin", "hormone"], scene: MoleculeScene, title: "Biomolecules", description: "Molecule model." },
  { keys: ["everyday", "analgesic", "tranquilizer", "antipyretic", "antibiotic", "antacid", "soap", "detergent", "preservative", "sweetening"], scene: MoleculeScene, title: "Chemistry in Everyday Life", description: "Molecule model." },
  { keys: ["p-block", "d-block", "f-block", "lanthanoid", "actinoid", "coordination", "werner", "cft", "vbt", "kmno4", "k2cr2o7"], scene: CrystalScene, title: "Chemistry of Elements", description: "Crystal lattice model." },

  // Mathematics
  { keys: ["function", "domain", "range", "inverse function", "composite", "curve sketching", "odd and even", "periodicity", "symmetry", "monotonicity", "quadratic", "cubic", "rational function", "exponential", "logarithmic", "trigonometric function", "real number", "absolute value", "interval"], scene: FunctionScene, title: "Functions & Graphs", description: "Function curve with moving tangent point." },
  { keys: ["sequence", "series", "arithmetic", "geometric", "harmonic", "am", "gm", "hm"], scene: BarChartScene, title: "Sequences & Series", description: "Bar representation of terms." },
  { keys: ["matrix", "determinant", "transpose", "minor", "cofactor", "adjoint", "inverse matrix"], scene: MatrixScene, title: "Matrices & Determinants", description: "3D rotating matrix grid." },
  { keys: ["quadratic equation", "roots", "symmetric roots", "complex number", "imaginary", "modulus", "conjugate"], scene: FunctionScene, title: "Quadratics & Complex", description: "Curve crossing the axis (rotate with mouse)." },
  { keys: ["inverse circular", "trigonometric equation", "general value"], scene: TrigScene, title: "Inverse Trig", description: "Unit circle with wave trace." },
  { keys: ["straight line", "perpendicular", "bisector", "pair of straight lines", "second degree", "homogenous", "coordinates in space", "distance between", "direction cosine", "direction ratio"], scene: Vector3DScene, title: "Analytic Geometry", description: "3D coordinate frame with vector arrows." },
  { keys: ["collinear", "non-collinear", "coplanar", "linear combination", "linearly dependent", "linearly independent"], scene: Vector3DScene, title: "Vectors", description: "3D vector arrows." },
  { keys: ["measure of dispersion", "standard deviation", "variance", "coefficient of variation", "skewness", "karl pearson"], scene: BarChartScene, title: "Statistics", description: "Bar chart of dispersion." },
  { keys: ["probability", "independent", "mathematical", "empirical", "two basic laws", "conditional", "multiplication", "bayes", "random variable", "binomial", "poisson"], scene: BarChartScene, title: "Probability", description: "Distribution bars." },
  { keys: ["limit", "continuity", "indeterminate", "algebraic properties", "differentiability"], scene: FunctionScene, title: "Limits & Continuity", description: "Curve with tangent marker." },
  { keys: ["derivative", "differentiation", "rules of differentiation", "parametric", "implicit function", "higher order", "logarithmic differentiation", "leibniz", "tangent", "normal", "maxima", "minima", "rate of change", "approximation", "error"], scene: FunctionScene, title: "Differentiation", description: "Curve with moving tangent." },
  { keys: ["integral", "integration", "antiderivative", "substitution", "by parts", "definite integral", "area under", "area between"], scene: SurfaceScene, title: "Integration", description: "3D surface under integration." },
  { keys: ["differential equation", "first order", "first degree", "variable separable", "homogeneous", "linear differential", "growth", "decay", "population dynamics"], scene: FunctionScene, title: "Differential Equations", description: "Curve growth model." },
  { keys: ["scalar", "vector quantity", "addition", "subtraction", "scalar multiplication", "dot product", "scalar product", "cross product", "vector product", "triple product", "work", "torque", "angular momentum"], scene: Vector3DScene, title: "Vector Algebra", description: "Vector arrows." },
  { keys: ["direction cosine", "direction ratio", "equation of a line", "equation of a plane", "angle between", "distance of a point"], scene: Vector3DScene, title: "3D Geometry", description: "3D coordinate axes with vectors." },
  { keys: ["linear programming", "lpp", "formulation", "graphical method", "maximization", "minimization"], scene: BarChartScene, title: "Linear Programming", description: "Bar chart of objective values." },
  { keys: ["numerical computation", "roots", "bisection", "newton-raphson", "trapezoidal", "simpson", "statics", "forces", "resultant", "parallelogram law", "dynamics", "particle", "uniform acceleration", "smooth inclined"], scene: SurfaceScene, title: "Computational Methods", description: "3D surface model." },

  // Biology
  { keys: ["biomolecule", "carbohydrate", "protein", "lipid", "nucleic acid", "enzyme", "mineral"], scene: MoleculeScene, title: "Biomolecules", description: "Molecule model — rotate with mouse." },
  { keys: ["cell", "prokaryotic", "eukaryotic", "cell wall", "cell membrane", "mitochondri", "plastid", "endoplasmic reticulum", "golgi", "lysosome", "ribosome", "nucleus", "chromosome", "cilia", "flagella", "cell inclusions"], scene: CellScene, title: "Cell Biology", description: "Rotating eukaryotic cell." },
  { keys: ["cell division", "amitosis", "mitosis", "meiosis", "cell cycle", "significances"], scene: MitosisScene, title: "Cell Division", description: "Stages of mitosis with chromosomes." },
  { keys: ["floral diversity", "five kingdom", "binomial", "three domains", "fungi", "algae", "bryophyt", "pteridophyt", "gymnosperm", "angiosperm", "mucor", "yeast", "mushroom", "lichen", "spirogyra", "marchantia", "dryopteris", "pinus", "taxonomic", "angiosperm families", "brassicaceae", "fabaceae", "solanaceae", "liliaceae"], scene: EcosystemScene, title: "Floral Diversity", description: "Ecosystem network." },
  { keys: ["microbiology", "monera", "bacteria", "bacterial cell", "cyanobacteria", "virus", "bacteriophage", "biotechnology"], scene: CellScene, title: "Microbiology", description: "Rotating cell model." },
  { keys: ["ecosystem", "ecology", "abiotic", "biotic", "species interaction", "pond", "forest ecosystem", "food chain", "food web", "trophic", "ecological pyramid", "productivity", "biogeochemical", "carbon cycle", "nitrogen cycle", "succession", "hydrophyte", "xerophyte", "greenhouse", "climate change", "ozone", "acid rain"], scene: EcosystemScene, title: "Ecology", description: "Trophic pyramid with flow arrows." },
  { keys: ["vegetation", "protected area", "botanical garden", "seed bank", "in-situ", "ex-situ", "natural environment"], scene: EcosystemScene, title: "Vegetation", description: "Ecosystem pyramid." },
  { keys: ["introduction to biology", "scope", "fields of biology", "relation of biology"], scene: CellScene, title: "Introduction to Biology", description: "Cell model." },
  { keys: ["evolution", "oparin", "haldane", "miller", "urey", "morphological", "anatomical", "paleontological", "embryological", "biochemical", "lamarckism", "darwinism", "neo-darwinism", "human evolution", "anthropoid", "apes"], scene: EvolutionScene, title: "Evolutionary Biology", description: "Phylogenetic tree." },
  { keys: ["protista", "protozoa", "paramecium", "plasmodium", "porifera", "coelenterata", "platyhelminthes", "aschelminthes", "annelida", "arthropoda", "mollusca", "echinodermata", "chordata", "earthworm", "pheretima", "nephridia", "septal", "cocoon", "frog", "rana tigrina"], scene: HeartScene, title: "Faunal Diversity", description: "Internal organ model (heart demo)." },
  { keys: ["biota", "environment", "aquatic", "terrestrial", "cursorial", "fossorial", "arboreal", "volant", "reflex", "taxes", "dominance", "leadership", "fish migration", "bird migration", "pollution", "pesticide"], scene: EcosystemScene, title: "Biota & Environment", description: "Ecosystem network." },
  { keys: ["conservation", "biodiversity", "national park", "wildlife reserve", "conservation area", "biodiversity hotspot", "ramsar", "extinction", "iucn", "endangered", "vulnerable"], scene: EcosystemScene, title: "Conservation Biology", description: "Ecosystem pyramid — rotate with mouse." },
  { keys: ["heredity", "mendel", "monochrom", "dihybrid", "incomplete dominance", "codominance", "linkage", "crossing over", "sex determination", "sex-linked", "chromosome theory", "molecular basis", "dna structure", "replication", "transcription", "translation", "gene regulation", "human genome", "hardy-weinberg", "adaptive radiation"], scene: DNAScene, title: "Heredity & Evolution", description: "DNA double helix rotating." },
  { keys: ["health", "disease", "pathogen", "malaria", "dengue", "filariasis", "ascariasis", "pneumonia", "typhoid", "tuberculosis", "common cold", "aids", "ringworm", "immune system", "innate", "adaptive immunity", "antigen", "antibody", "immune response", "vaccination", "immunization", "allergy", "autoimmune"], scene: HeartScene, title: "Health & Diseases", description: "Heart pulse animation." },
  { keys: ["food production", "plant breeding", "single cell protein", "scp", "animal husbandry", "biofertilizer", "sustainable agriculture"], scene: CellScene, title: "Food Production", description: "Cell rotation." },
  { keys: ["microbes", "household products", "antibiotics", "alcoholic beverages", "citric acid", "biocontrol", "bioremediation", "biogas"], scene: CellScene, title: "Microbes in Welfare", description: "Cell rotation." },
  { keys: ["biotechnology principles", "recombinant", "restriction enzyme", "vector", "competent host", "pcr", "gel electrophoresis", "gene transfer"], scene: DNAScene, title: "Biotechnology Principles", description: "DNA helix rotation." },
  { keys: ["biotechnology applications", "bt cotton", "nematode", "insulin", "gene therapy", "transgenic", "biopiracy", "patent"], scene: DNAScene, title: "Biotechnology Applications", description: "DNA helix." },
  { keys: ["organisms and environment", "adaptation", "population ecology", "ecosystem structure", "ecological succession", "nutrient cycling", "phosphorus", "ecological pyramid", "energy flow"], scene: EcosystemScene, title: "Organisms & Environment", description: "Ecosystem pyramid." },
  { keys: ["biodiversity and conservation", "genetic", "species", "ecosystem level", "red data book"], scene: EcosystemScene, title: "Biodiversity & Conservation", description: "Ecosystem pyramid." },
  { keys: ["environmental issues", "air pollution", "water pollution", "solid waste", "nuclear radiation", "global warming", "rainwater harvesting"], scene: EcosystemScene, title: "Environmental Issues", description: "Ecosystem network." },
  { keys: ["reproductive", "reproduction", "reproductive system", "blood vascular", "respiratory", "excretory", "digestive", "nervous system", "circulatory", "physiology"], scene: HeartScene, title: "Human Physiology", description: "Beating heart." },
  { keys: ["plant physiology", "photosynthesis", "transpiration", "plant hormones", "transport in plants"], scene: CellScene, title: "Plant Physiology", description: "Cell with chloroplasts." },
];

function pickScene(slug: string, title: string, fallback?: SceneRender, fallbackTitle?: string) {
  const haystack = `${slug} ${title}`.toLowerCase();
  for (const entry of KEYWORD_ROUTES) {
    if (entry.keys.some((k) => haystack.includes(k))) {
      return { scene: entry.scene, title: entry.title, description: entry.description };
    }
  }
  if (fallback) return { scene: fallback, title: fallbackTitle ?? "3D Animation", description: "" };
  return { scene: SpiralScene, title: "Universal 3D Animation", description: "Drag with mouse to rotate." };
}

export function resolveChapterAnimation(slug: string, title: string, fallback?: SceneRender, fallbackTitle?: string) {
  return pickScene(slug, title, fallback, fallbackTitle);
}

export interface ChapterAnimationProps {
  topicSlug: string;
  topicTitle: string;
  /** When provided, used as the primary keyword source in addition to topicSlug/title. */
  unitSlug?: string;
  subjectSlug?: string;
  height?: number;
  /** When true, falls back to a generic spiral if no keyword matches. */
  showGenericFallback?: boolean;
}

export function ChapterAnimation(props: ChapterAnimationProps) {
  const { topicSlug, topicTitle, unitSlug, subjectSlug, height = 420 } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<MouseOrbitHandle | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const resolved = useMemo(
    () => pickScene(`${unitSlug ?? ""} ${subjectSlug ?? ""} ${topicSlug}`, topicTitle),
    [topicSlug, topicTitle, unitSlug, subjectSlug],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const h = createMouseOrbitScene(containerRef.current, {
      cameraPosition: new THREE.Vector3(8, 6, 12),
      autoRotate: true,
      autoRotateSpeed: 0.5,
      showGrid: true,
      showAxes: false,
      background: 0x0f172a,
    });
    handleRef.current = h;
    cleanupRef.current = resolved.scene(h);

    let raf = 0;
    const loop = () => {
      h.controls.update();
      h.renderer.render(h.scene, h.camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      cleanupRef.current?.();
      h.dispose();
      handleRef.current = null;
    };
  }, [resolved]);

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-slate-950">
      <div ref={containerRef} style={{ height }} className="w-full" />
      <div className="px-3 py-2 bg-slate-900 text-slate-200 text-xs flex items-center justify-between">
        <span className="font-medium">{resolved.title}</span>
        <span className="opacity-70">??? Drag to rotate · scroll to zoom</span>
      </div>
    </div>
  );
}
