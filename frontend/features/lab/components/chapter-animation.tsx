"use client";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";
import {
  createMouseOrbitScene,
  makeTitleSprite,
  type MouseOrbitHandle,
} from "@/components/lab/mouse-orbit-scene";
import { LAB_ANNOTATIONS } from "@/lib/lab-annotations";
import {
  LANGUAGE_SUBJECT_SLUGS,
  pickLanguageScene,
} from "@/components/lab/language-scenes";
import { ArrowLabel as LeaderLabel } from "@/components/lab/annotation/arrow-label";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
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
  const arrow = new LiveLeaderLine(new THREE.Vector3(1, 1, 0).normalize(), new THREE.Vector3(0, 0.5, 0), 3, 0xef4444, 0.6, 0.4); h.group.add(arrow);
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
  const arrow = new LiveLeaderLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 2.5, 0x60a5fa, 0.5, 0.3);
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
  h.group.add(new LiveLeaderLine(new THREE.Vector3(1, 0.5, 0).normalize(), new THREE.Vector3(), 4, 0xef4444, 0.4, 0.3));
  h.group.add(new LiveLeaderLine(new THREE.Vector3(0, 1, 0.5).normalize(), new THREE.Vector3(), 4, 0x22c55e, 0.4, 0.3));
  h.group.add(new LiveLeaderLine(new THREE.Vector3(1, 1.5, 0.5).normalize(), new THREE.Vector3(), 6, 0x60a5fa, 0.5, 0.4));
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
    h.group.add(new LiveLeaderLine(new THREE.Vector3(Math.cos(t), 0, Math.sin(t)), e.position, 1.5, 0xf97316, 0.2, 0.15));
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
  h.group.add(new LiveLeaderLine(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -0.7, 0), 2, 0x22d3ee, 0.4, 0.3));
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

export const SolarScene: SceneRender = (h) => {
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
  // A REAL periodic-table layout: 18 group columns, 7 periods, with the
  // s/p/d/f blocks in their true positions (not a 5×2 row of cubes). Colours
  // are the standard block categories, so a student can read group numbers.
  const GROUP_W = 0.62;
  const PERIOD_H = 0.62;
  const originX = -(18 * GROUP_W) / 2;
  const originY = (7 * PERIOD_H) / 2;

  const blockColor: Record<string, number> = {
    s: 0xef4444, // alkali / alkaline-earth
    p: 0x22c55e, // p-block
    d: 0x3b82f6, // transition
    f: 0xa855f7, // lanthanide / actinide
  };

  // (group, period, block) for the main-group + transition cells.
  const cells: Array<[number, number, keyof typeof blockColor]> = [];
  // Periods 1–3: s-block groups 1–2, p-block 13–18.
  for (let p = 1; p <= 3; p += 1) {
    cells.push([1, p, "s"], [2, p, "s"]);
    if (p > 1) for (let g = 13; g <= 18; g += 1) cells.push([g, p, "p"]);
  }
  // Periods 4–5: s, then d (3–12), then p.
  for (let p = 4; p <= 5; p += 1) {
    cells.push([1, p, "s"], [2, p, "s"]);
    for (let g = 3; g <= 12; g += 1) cells.push([g, p, "d"]);
    for (let g = 13; g <= 18; g += 1) cells.push([g, p, "p"]);
  }
  // Periods 6–7: s, f (lanthanides/actinides, drawn as a separate strip), d, p.
  for (let p = 6; p <= 7; p += 1) {
    cells.push([1, p, "s"], [2, p, "s"]);
    for (let g = 3; g <= 12; g += 1) cells.push([g, p, "d"]);
    for (let g = 13; g <= 18; g += 1) cells.push([g, p, "p"]);
  }

  for (const [group, period, block] of cells) {
    const cell = new THREE.Mesh(BOX, mat(blockColor[block], blockColor[block]));
    cell.scale.set(GROUP_W * 0.82, PERIOD_H * 0.82, 0.22);
    cell.position.set(
      originX + (group - 0.5) * GROUP_W,
      originY - (period - 0.5) * PERIOD_H,
      0,
    );
    h.group.add(cell);
  }

  // The f-block strip, separated below the main table (its true placement).
  for (let i = 0; i < 14; i += 1) {
    const cell = new THREE.Mesh(BOX, mat(blockColor.f, blockColor.f));
    cell.scale.set(GROUP_W * 0.82, PERIOD_H * 0.82, 0.22);
    cell.position.set(originX + (i + 3) * GROUP_W, originY - 8.4 * PERIOD_H, 0);
    h.group.add(cell);
  }

  h.group.add(makeTitleSprite("Groups 1–18 across · periods 1–7 down", "#7dd3fc"));
  return () => {};
};

const CrystalScene: SceneRender = (h) => {
  // A REAL unit cell: a cubic lattice with a visible cell edge, corner atoms
  // shared between cells, and the cell's dimensions marked. Used for solids,
  // semiconductors and metals — so the learner sees the repeating unit, not a
  // cloud of spheres.
  const N = 2; // 2×2×2 cells
  const a = 1.5; // lattice parameter
  const half = (N * a) / 2;

  // Lattice nodes: one atom per lattice point.
  for (let x = 0; x <= N; x += 1) {
    for (let y = 0; y <= N; y += 1) {
      for (let z = 0; z <= N; z += 1) {
        const corner = x === 0 || x === N || y === 0 || y === N || z === 0 || z === N;
        const atom = new THREE.Mesh(SPHERE, mat(corner ? 0x60a5fa : 0x38bdf8, 0x60a5fa));
        atom.scale.setScalar(corner ? 0.2 : 0.14);
        atom.position.set(x * a - half, y * a - half, z * a - half);
        h.group.add(atom);
      }
    }
  }

  // The cell edges of ONE unit cell, drawn as rods (the repeating box).
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    emissive: 0xfbbf24,
    emissiveIntensity: 0.35,
  });
  const edges: Array<[THREE.Vector3, THREE.Vector3]> = [
    [new THREE.Vector3(-half, -half, -half), new THREE.Vector3(half, -half, -half)],
    [new THREE.Vector3(-half, -half, half), new THREE.Vector3(half, -half, half)],
    [new THREE.Vector3(-half, half, -half), new THREE.Vector3(half, half, -half)],
    [new THREE.Vector3(-half, half, half), new THREE.Vector3(half, half, half)],
    [new THREE.Vector3(-half, -half, -half), new THREE.Vector3(-half, half, -half)],
    [new THREE.Vector3(half, -half, -half), new THREE.Vector3(half, half, -half)],
    [new THREE.Vector3(-half, -half, half), new THREE.Vector3(-half, half, half)],
    [new THREE.Vector3(half, -half, half), new THREE.Vector3(half, half, half)],
    [new THREE.Vector3(-half, -half, -half), new THREE.Vector3(-half, -half, half)],
    [new THREE.Vector3(half, -half, -half), new THREE.Vector3(half, -half, half)],
    [new THREE.Vector3(-half, half, -half), new THREE.Vector3(-half, half, half)],
    [new THREE.Vector3(half, half, -half), new THREE.Vector3(half, half, half)],
  ];
  for (const [from, to] of edges) {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const len = from.distanceTo(to);
    const rod = new THREE.Mesh(new THREE.BoxGeometry(0.035, len, 0.035), edgeMat);
    rod.position.copy(mid);
    rod.lookAt(to);
    rod.rotateX(Math.PI / 2);
    h.group.add(rod);
  }

  h.group.add(makeTitleSprite("Unit cell  a = edge length", "#fbbf24"));

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

export const WaveFunctionScene: SceneRender = (h) => {
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
    h.group.add(new LiveLeaderLine(
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
    h.group.add(new LiveLeaderLine(
      new THREE.Vector3(i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0),
      new THREE.Vector3(), 5, colors[i], 0.3, 0.2,
    ));
  }
  for (let i = 0; i < 6; i++) {
    h.group.add(new LiveLeaderLine(
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
  // A REAL data chart, not random boxes: an axis frame, tick gridlines and
  // labelled columns whose heights are the actual values. Used for
  // statistics, probability distributions, sequences and thermal expansion —
  // so the learner sees a graph they can read, not decoration.
  const baseline = new THREE.Mesh(
    new THREE.BoxGeometry(9.4, 0.08, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8 }),
  );
  baseline.position.set(0, 0, 0);
  h.group.add(baseline);

  const yAxis = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 6.4, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8 }),
  );
  yAxis.position.set(-4.7, 3.2, 0);
  h.group.add(yAxis);

  // Horizontal gridlines every 1 unit, so the eye can read a height.
  for (let g = 1; g <= 6; g += 1) {
    const grid = new THREE.Mesh(
      new THREE.BoxGeometry(9.2, 0.012, 0.012),
      new THREE.MeshBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.7 }),
    );
    grid.position.set(0, g, 0);
    h.group.add(grid);
  }

  // Nine columns of a fixed data set (a distribution), each capped by a
  // value marker so the top of a column reads as a number.
  const values = [0.6, 1.2, 2.4, 3.6, 4.8, 3.6, 2.4, 1.2, 0.6];
  const palette = [0x60a5fa, 0x38bdf8, 0x22d3ee, 0x34d399, 0xfbbf24, 0x34d399, 0x22d3ee, 0x38bdf8, 0x60a5fa];
  values.forEach((value, i) => {
    const column = new THREE.Mesh(BOX, mat(palette[i], palette[i]));
    column.scale.set(0.62, value, 0.62);
    column.position.set((i - (values.length - 1) / 2) * 1.0, value / 2, 0);
    h.group.add(column);

    const cap = new THREE.Mesh(SPHERE, mat(0xffffff, 0xffffff));
    cap.scale.setScalar(0.09);
    cap.position.set(column.position.x, value + 0.06, 0);
    h.group.add(cap);
  });

  h.group.add(makeTitleSprite("Value — axis to gridline", "#7dd3fc"));
  return () => {};
};

const MatrixScene: SceneRender = (h) => {
  // A REAL matrix: an n×n array of cells with row/column brackets, where each
  // cell is a labelled tile. The brackets are what make it read as a matrix
  // (a determinant / linear system) rather than a plain grid.
  const N = 4;
  const span = 0.9;
  const originX = -((N - 1) * span) / 2;
  const originY = ((N - 1) * span) / 2;

  const entries = [
    [2, -1, 0, 3],
    [0, 4, -2, 1],
    [5, 0, 3, -1],
    [1, 2, 2, 6],
  ];

  for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
      const value = entries[i][j];
      const cell = new THREE.Mesh(BOX, mat(value < 0 ? 0xf87171 : 0x7dd3fc, value < 0 ? 0xf87171 : 0x7dd3fc));
      cell.scale.set(0.62, 0.62, 0.22);
      cell.position.set(originX + j * span, originY - i * span, 0);
      h.group.add(cell);

      // A small marker on negative entries, so the sign is visible at a glance.
      if (value < 0) {
        const tick = new THREE.Mesh(BOX, mat(0xffffff, 0xffffff));
        tick.scale.set(0.28, 0.06, 0.05);
        tick.position.set(cell.position.x, cell.position.y - 0.16, 0.14);
        h.group.add(tick);
      }
    }
  }

  // Row/column brackets: four corner brackets framing the array.
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.3 });
  const halfW = (N * span) / 2 + 0.16;
  const halfH = (N * span) / 2 + 0.16;
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.06), bracketMat);
      vBar.position.set(sx * halfW, sy * (halfH - 0.35), 0);
      h.group.add(vBar);
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.06), bracketMat);
      hBar.position.set(sx * (halfW - 0.35), sy * halfH, 0);
      h.group.add(hBar);
    }
  }

  h.group.add(makeTitleSprite("aᵢⱼ  —  row i, column j", "#7dd3fc"));

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
  // A REAL Archimedean spiral on a polar grid — the actual curve r = a + bθ,
  // with the radius marked at each turn and the polar axis drawn. Used for
  // polar coordinates, complex-plane arguments and helical growth.
  const TURNS = 3;
  const POINTS = 240;
  const a = 0.25;
  const b = 0.42;
  const rMax = a + b * TURNS * Math.PI * 2;

  // Polar grid: concentric circles at each integer radius.
  for (let ring = 1; ring <= 3; ring += 1) {
    const radius = (rMax / 3) * ring;
    const ringMesh = new THREE.Mesh(
      new THREE.RingGeometry(radius, radius + 0.012, 96),
      new THREE.MeshBasicMaterial({ color: 0x334155, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }),
    );
    ringMesh.rotation.x = -Math.PI / 2;
    h.group.add(ringMesh);
  }

  // Radial spokes every 30°, so θ can be read off the plane.
  for (let s = 0; s < 12; s += 1) {
    const angle = (s / 12) * Math.PI * 2;
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(rMax, 0.01, 0.01),
      new THREE.MeshBasicMaterial({ color: 0x475569 }),
    );
    spoke.position.set((Math.cos(angle) * rMax) / 2, 0, (Math.sin(angle) * rMax) / 2);
    spoke.rotation.y = -angle;
    h.group.add(spoke);
  }

  // The curve itself: r = a + bθ, lifted so it sits above the grid.
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= POINTS; i += 1) {
    const t = (i / POINTS) * TURNS * Math.PI * 2;
    const r = a + b * t;
    points.push(new THREE.Vector3(Math.cos(t) * r, 0.06, Math.sin(t) * r));
  }
  const curve = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0x8b5cf6 }),
  );
  h.group.add(curve);

  // A marker at the curve's outer end, plus the polar axis.
  const head = new THREE.Mesh(SPHERE, mat(0xf472b6, 0xf472b6));
  head.scale.setScalar(0.16);
  const end = points[points.length - 1];
  head.position.copy(end);
  h.group.add(head);

  const polarAxis = new THREE.Mesh(
    new THREE.BoxGeometry(rMax + 0.4, 0.02, 0.02),
    new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
  );
  polarAxis.position.set((rMax + 0.4) / 2 - 0.2, 0.02, 0);
  h.group.add(polarAxis);

  h.group.add(makeTitleSprite("r = a + bθ  (θ measured from the polar axis)", "#a78bfa"));

  const id = setInterval(() => { h.group.rotation.y += 0.004; }, 16);
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
  { keys: ["prism", "deviation", "dispersive", "minimum deviation", "chromatic aberration", "spherical aberration", "achromatism", "achromatic", "aberration"], scene: PrismScene, title: "Chromatic Aberration & Dispersion", description: "White light splitting into the visible spectrum with the aberration it causes." },
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
  { keys: ["floral diversity", "five kingdom", "binomial", "three domains", "fungi", "algae", "bryophyt", "pteridophyt", "gymnosperm", "angiosperm", "mucor", "yeast", "mushroom", "lichen", "spirogyra", "marchantia", "dryopteris", "pinus", "taxonomic", "angiosperm families", "brassicaceae", "fabaceae", "solanaceae", "liliaceae", "status of flora", "flora in nepal", "conservation status", "economic importance of flora"], scene: EcosystemScene, title: "Floral Diversity", description: "Ecosystem network." },
  { keys: ["microbiology", "monera", "bacteria", "bacterial cell", "cyanobacteria", "virus", "bacteriophage", "biotechnology"], scene: CellScene, title: "Microbiology", description: "Rotating cell model." },
  { keys: ["ecosystem", "ecology", "abiotic", "biotic", "species interaction", "pond", "forest ecosystem", "food chain", "food web", "trophic", "ecological pyramid", "productivity", "biogeochemical", "carbon cycle", "nitrogen cycle", "succession", "hydrophyte", "xerophyte", "greenhouse", "climate change", "ozone", "acid rain"], scene: EcosystemScene, title: "Ecology", description: "Trophic pyramid with flow arrows." },
  { keys: ["vegetation", "protected area", "botanical garden", "seed bank", "in-situ", "ex-situ", "natural environment"], scene: EcosystemScene, title: "Vegetation", description: "Ecosystem pyramid." },
  { keys: ["introduction to biology", "scope", "fields of biology", "relation of biology"], scene: CellScene, title: "Introduction to Biology", description: "Cell model." },
  { keys: ["evolution", "oparin", "haldane", "miller", "urey", "morphological", "anatomical", "paleontological", "embryological", "biochemical", "lamarckism", "darwinism", "neo-darwinism", "human evolution", "anthropoid", "apes"], scene: EvolutionScene, title: "Evolutionary Biology", description: "Phylogenetic tree." },
  { keys: ["protista", "protozoa", "paramecium", "plasmodium", "porifera", "coelenterata", "platyhelminthes", "aschelminthes", "annelida", "arthropoda", "mollusca", "echinodermata", "chordata", "earthworm", "pheretima", "nephridia", "septal", "cocoon", "frog", "rana tigrina"], scene: HeartScene, title: "Faunal Diversity", description: "Internal organ model (heart demo)." },
  { keys: ["biota", "environment", "aquatic", "terrestrial", "cursorial", "fossorial", "arboreal", "volant", "reflex", "taxes", "dominance", "leadership", "fish migration", "bird migration", "pollution", "pesticide"], scene: EcosystemScene, title: "Biota & Environment", description: "Ecosystem network." },
  { keys: ["conservation", "biodiversity", "national park", "wildlife reserve", "conservation area", "biodiversity hotspot", "ramsar", "extinction", "iucn", "endangered", "vulnerable"], scene: EcosystemScene, title: "Conservation Biology", description: "Ecosystem pyramid — rotate with mouse." },
  { keys: ["heredity", "mendel", "monochrom", "dihybrid", "incomplete dominance", "codominance", "linkage", "crossing over", "sex determination", "sex-linked", "chromosome theory", "molecular basis", "dna structure", "replication", "transcription", "translation", "gene regulation", "human genome", "hardy-weinberg", "adaptive radiation"], scene: DNAScene, title: "Heredity & Evolution", description: "DNA double helix rotating." },
  { keys: ["health", "disease", "pathogen", "malaria", "dengue", "filariasis", "ascariasis", "pneumonia", "typhoid", "tuberculosis", "common cold", "aids", "ringworm", "immune system", "innate", "adaptive immunity", "antigen", "antibody", "immune response", "vaccination", "immunization", "allergy", "autoimmune", "falciparum", "life cycle of parasite", "parasite"], scene: HeartScene, title: "Health & Diseases", description: "Heart pulse animation." },
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

/**
 * Pick the 3D scene for a topic.
 *
 * SUBJECT SCOPING (2026-11-11): English and Nepali topics are routed through
 * their OWN table (`components/lab/language-scenes.ts`) and NEVER through the
 * science table below. The science table matches on English keywords, so
 * "Sequences & Series" or "Organic Principles" could otherwise claim an
 * English writing topic or a Nepali literature lesson. A language topic with
 * no language route shows the honest "under progress" state instead of a
 * borrowed science scene.
 */
function pickScene(
  slug: string,
  title: string,
  subjectSlug?: string,
  fallback?: SceneRender,
  fallbackTitle?: string,
) {
  const haystack = `${slug} ${title}`.toLowerCase();

  if (subjectSlug && LANGUAGE_SUBJECT_SLUGS.includes(subjectSlug as never)) {
    const language = pickLanguageScene(haystack, title);
    if (language) return language;
    if (fallback) return { scene: fallback, title: fallbackTitle ?? "3D Animation", description: "" };
    return null;
  }

  for (const entry of KEYWORD_ROUTES) {
    if (entry.keys.some((k) => haystack.includes(k))) {
      return { scene: entry.scene, title: entry.title, description: entry.description };
    }
  }
  if (fallback) return { scene: fallback, title: fallbackTitle ?? "3D Animation", description: "" };
  // No topical match → no 3D visual. Callers render the topic's own
  // SVG schematic / Coming Soon state instead of a generic scene.
  return null;
}

export function resolveChapterAnimation(
  slug: string,
  title: string,
  subjectSlug?: string,
  fallback?: SceneRender,
  fallbackTitle?: string,
) {
  return pickScene(slug, title, subjectSlug, fallback, fallbackTitle);
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
  const vizTargetRef = useRef<VizTarget>({});

  const resolved = useMemo(
    () =>
      pickScene(
        `${unitSlug ?? ""} ${subjectSlug ?? ""} ${topicSlug}`,
        topicTitle,
        subjectSlug,
      ),
    [topicSlug, topicTitle, unitSlug, subjectSlug],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    if (!resolved) return; // no topical 3D scene — render nothing
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
    vizTargetRef.current = {
      controls: h.controls,
      el: containerRef.current,
      canvasEl: h.renderer.domElement,
      render: () => h.renderer.render(h.scene, h.camera),
    };

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
      vizTargetRef.current = {};
    };
  }, [resolved]);

  const annotations =
    LAB_ANNOTATIONS[topicSlug] ||
    (unitSlug ? LAB_ANNOTATIONS[unitSlug] : undefined) ||
    LAB_ANNOTATIONS[`ph-3d-${topicSlug}`];

  if (!resolved) {
    return (
      <div className="rounded-lg overflow-hidden border border-border bg-slate-950" style={{ minHeight: 120 }}>
        <div className="h-full min-h-[120px] flex flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            3D — Under Progress
          </span>
          <p className="text-xs text-slate-400 max-w-sm">
            A dedicated 3D visual for this topic is under progress and will be added in a future update. The SVG schematic below represents it meanwhile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-slate-950">
      <div ref={containerRef} style={{ height }} className="w-full relative">
        <VizToolbar targetRef={vizTargetRef} />
        {annotations &&
          annotations.map((ann, idx) => (
            <LeaderLabel key={`${topicSlug}-${idx}`} {...ann} />
          ))}
      </div>
      <div className="px-3 py-2 bg-slate-900 text-slate-200 text-xs flex items-center justify-between">
        <span className="font-medium">{resolved.title}</span>
        <span className="opacity-70">🖱️ Drag to rotate · scroll to zoom · toolbar for zoom/reset/fullscreen</span>
      </div>
    </div>
  );
}
