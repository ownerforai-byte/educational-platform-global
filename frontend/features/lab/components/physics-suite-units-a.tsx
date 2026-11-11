"use client";
/* Physics unit scenes A: measurement + mechanics (C11 units 1-7). */
import * as THREE from "three";
import { sph, cyl, boxm, flowLine, trail, titleText, type SuiteKit } from "./physics-syllabus-suite-3d-kit";

export function buildPhysicalQuantities(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const bar = boxm(5.2, 0.3, 0.8, 0x334155); bar.position.set(0, -0.4, 0); g.add(bar);
  for (let i = 0; i <= 10; i++) {
    const tick = boxm(0.05, i % 5 === 0 ? 0.5 : 0.3, 0.05, 0x94a3b8);
    tick.position.set(-2.5 + i * 0.5, 0.0, 0.35); g.add(tick);
  }
  const jawF = boxm(0.25, 1.0, 0.7, 0x38bdf8); jawF.position.set(-2.5, 0.3, 0); g.add(jawF);
  const slider = new THREE.Group();
  const jawM = boxm(0.25, 1.0, 0.7, 0xf59e0b); jawM.position.set(0, 0.3, 0); slider.add(jawM);
  const frame = boxm(1.6, 0.18, 0.5, 0xf59e0b, 0.9); frame.position.set(0.9, -0.15, 0); slider.add(frame);
  for (let i = 0; i < 10; i++) {
    const v = boxm(0.04, 0.28, 0.04, 0xfde68a); v.position.set(0.35 + i * 0.11, -0.12, 0.18); slider.add(v);
  }
  g.add(slider);
  const wire = cyl(0.32, 0.32, 1.1, 0x22c55e, 0.85); wire.rotation.z = Math.PI / 2; wire.position.set(-1.2, 0.35, 0); g.add(wire);
  kit.addLbl("#38bdf8", "Main scale (MSD)", "1 MSD = 1 mm", new THREE.Vector3(-1.6, 1.6, 0), new THREE.Vector3(-1.6, -0.1, 0.35));
  kit.addLbl("#f59e0b", "Vernier scale", "L.C. = 0.1 mm", new THREE.Vector3(2.6, 1.5, 0), new THREE.Vector3(1.6, -0.1, 0.2));
  kit.addLbl("#22c55e", "Object diameter", "MSR + VSR x L.C.", new THREE.Vector3(-1.2, -1.6, 0), new THREE.Vector3(-1.2, 0.35, 0));
  titleText(kit.ts, "Vernier calliper — L.C. = 0.01 cm", new THREE.Vector3(0, 2.8, 0));
  return (t: number) => { slider.position.x = Math.sin(t * 0.5) * 0.35; };
}
export function buildVectors(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const ax = (p1: [number, number, number], p2: [number, number, number], c: number) => {
    const a = new THREE.Vector3(...p1), b = new THREE.Vector3(...p2);
    g.add(flowLine(a, b, c));
  };
  ax([-4, -2, 0], [4, -2, 0], 0x475569); ax([-4, -2, 0], [-4, 3, 0], 0x475569);
  const A = new THREE.Vector3(-4, -2, 0), B = new THREE.Vector3(-1, 1.5, 0), C = new THREE.Vector3(1.5, -2, 0);
  g.add(flowLine(A, B, 0x38bdf8)); g.add(flowLine(A, C, 0x22c55e));
  g.add(flowLine(B, B.clone().add(C.clone().sub(A)), 0x22c55e));
  g.add(flowLine(C, B.clone().add(C.clone().sub(A)), 0x38bdf8));
  const R = B.clone().add(C.clone().sub(A));
  g.add(flowLine(A, R, 0xf59e0b));
  kit.addLbl("#38bdf8", "Vector A", "|A|, direction theta", new THREE.Vector3(-3.4, 1.2, 0), new THREE.Vector3(-2.5, -0.2, 0));
  kit.addLbl("#22c55e", "Vector B", "tail-to-tail with A", new THREE.Vector3(0.6, -3.0, 0), new THREE.Vector3(-1.2, -2, 0));
  kit.addLbl("#f59e0b", "R = A + B", "parallelogram diagonal", new THREE.Vector3(-0.6, 1.4, 0), R);
  kit.addLbl("#f472b6", "A . B = |A||B|cos", "scalar product", new THREE.Vector3(3.2, 0.6, 0), new THREE.Vector3(1.2, -0.6, 0));
  titleText(kit.ts, "Parallelogram law — R = A + B", new THREE.Vector3(0, 3.4, 0));
  return () => {};
}
export function buildKinematics(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const v0 = 12, th = Math.PI / 4, gg = 9.8;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 60; i++) {
    const tt = (i / 60) * ((2 * v0 * Math.sin(th)) / gg);
    pts.push(new THREE.Vector3(v0 * Math.cos(th) * tt - 4, v0 * Math.sin(th) * tt - 0.5 * gg * tt * tt, 0));
  }
  g.add(trail(pts, 0xf59e0b));
  const ball = sph(0.28, 0x38bdf8); g.add(ball);
  const vh = cyl(0.03, 0.03, 1.6, 0x22c55e); vh.rotation.z = Math.PI / 2; g.add(vh);
  const vv = cyl(0.03, 0.03, 1.6, 0xef4444); g.add(vv);
  kit.addLbl("#f59e0b", "Trajectory", "y = x tan - gx^2/2v0^2cos^2", new THREE.Vector3(3.4, 3.2, 0), pts[40]);
  kit.addLbl("#38bdf8", "Projectile", "R max at 45 deg", new THREE.Vector3(-4.4, 2.2, 0), pts[2]);
  kit.addLbl("#22c55e", "vx = v0 cos", "constant (no air drag)", new THREE.Vector3(1.4, -1.4, 0), new THREE.Vector3(1.4, 0.4, 0));
  kit.addLbl("#ef4444", "vy, ay = -g", "uniform acceleration down", new THREE.Vector3(-3.4, -1.8, 0), new THREE.Vector3(-2.2, 0.6, 0));
  titleText(kit.ts, "Projectile motion — H, R, T", new THREE.Vector3(0, 4.6, 0));
  const T = (2 * v0 * Math.sin(th)) / gg;
  return (t: number) => {
    const tt = (t % 3) / 3 * T;
    ball.position.set(v0 * Math.cos(th) * tt - 4, v0 * Math.sin(th) * tt - 0.5 * gg * tt * tt, 0);
    vh.position.copy(ball.position); vv.position.copy(ball.position);
  };
}
export function buildDynamics(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const ramp = boxm(7, 0.2, 1.6, 0x334155); ramp.position.set(0, -1.2, 0); g.add(ramp);
  const m1 = boxm(0.9, 0.9, 0.9, 0x38bdf8); const m2 = boxm(0.9, 0.9, 0.9, 0x22c55e);
  g.add(m1); g.add(m2);
  const f1 = flowLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.8, 0, 0), 0xf59e0b);
  const f2 = flowLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1.8, 0, 0), 0xf59e0b);
  g.add(f1); g.add(f2);
  kit.addLbl("#38bdf8", "m1, u1", "p = mv, J = Ft", new THREE.Vector3(-3.6, 1.6, 0), new THREE.Vector3(-1.5, 0.6, 0));
  kit.addLbl("#22c55e", "m2, u2", "conserved if F_ext = 0", new THREE.Vector3(3.6, 1.6, 0), new THREE.Vector3(1.5, 0.6, 0));
  kit.addLbl("#f59e0b", "F and -F", "Newton 3rd pair", new THREE.Vector3(0, -2.4, 0), new THREE.Vector3(0, -0.6, 0));
  kit.addLbl("#f472b6", "p_total = const", "elastic: KE kept; inelastic: lost", new THREE.Vector3(0, 2.4, 0), new THREE.Vector3(0, 1.2, 0));
  titleText(kit.ts, "Collision — momentum conserved", new THREE.Vector3(0, 3.4, 0));
  return (t: number) => {
    const ph = (t % 4) / 4;
    const x = ph < 0.5 ? -3 + ph * 6 : 3 - (ph - 0.5) * 6;
    m1.position.set(-Math.abs(x) - 0.5, -0.5, 0); m2.position.set(Math.abs(x) + 0.5, -0.5, 0);
    f1.position.set(m1.position.x, 0.6, 0); f2.position.set(m2.position.x, 0.6, 0);
  };
}
export function buildWorkEnergy(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const curve: THREE.Vector3[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = -4 + (i / 40) * 8;
    curve.push(new THREE.Vector3(x, 2.4 * Math.cos((x / 8) * Math.PI) * 0.5 + 0.4, 0));
  }
  g.add(trail(curve, 0x8b5cf6));
  const ball = sph(0.26, 0xf59e0b); g.add(ball);
  kit.addLbl("#8b5cf6", "Track", "PE -> KE -> PE", new THREE.Vector3(-4.4, 2.6, 0), curve[2]);
  kit.addLbl("#f59e0b", "Ball", "E = mgh + mv^2/2", new THREE.Vector3(3.8, -1.2, 0), curve[30]);
  kit.addLbl("#22c55e", "W = Fd cos", "work-energy theorem", new THREE.Vector3(-1.4, -2.2, 0), curve[20]);
  kit.addLbl("#38bdf8", "P = W/t", "power = rate of work", new THREE.Vector3(2.4, 2.4, 0), curve[34]);
  titleText(kit.ts, "Work-energy — E conserved", new THREE.Vector3(0, 3.4, 0));
  return (t: number) => {
    const i = Math.floor((t * 8) % 41);
    ball.position.copy(curve[i]).add(new THREE.Vector3(0, 0.3, 0));
  };
}
export function buildCircular(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const ring: THREE.Vector3[] = [];
  for (let i = 0; i <= 64; i++) { const a = (i / 64) * Math.PI * 2; ring.push(new THREE.Vector3(Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6)); }
  g.add(trail(ring, 0x38bdf8));
  const pivot = cyl(0.08, 0.08, 3.2, 0x94a3b8); pivot.position.set(0, 1.6, 0); g.add(pivot);
  const bob = sph(0.3, 0xf59e0b); g.add(bob);
  const string = cyl(0.02, 0.02, 1, 0xe2e8f0); g.add(string);
  kit.addLbl("#f59e0b", "Bob (m)", "conical pendulum", new THREE.Vector3(3.4, 1.8, 0), new THREE.Vector3(2.6, 0, 0));
  kit.addLbl("#38bdf8", "T sin = mv^2/r", "centripetal inward", new THREE.Vector3(-3.4, -1.2, 0), new THREE.Vector3(-1.4, 0, 0));
  kit.addLbl("#22c55e", "T cos = mg", "vertical balance", new THREE.Vector3(-3.6, 2.2, 0), new THREE.Vector3(0, 1.8, 0));
  kit.addLbl("#f472b6", "Banking tan = v^2/rg", "no-skid turn", new THREE.Vector3(3.2, -1.4, 0), new THREE.Vector3(1.6, -0.4, 1.2));
  titleText(kit.ts, "Circular motion — a = v^2/r", new THREE.Vector3(0, 3.6, 0));
  return (t: number) => {
    const a = t * 1.2;
    bob.position.set(Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6);
    const top = new THREE.Vector3(0, 3.0, 0);
    const mid = top.clone().add(bob.position).multiplyScalar(0.5);
    string.position.copy(mid);
    string.scale.y = top.distanceTo(bob.position);
    string.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), top.clone().sub(bob.position).normalize());
  };
}
export function buildGravitation(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const sun = sph(1.1, 0xf59e0b); sun.position.set(0, 0, 0); g.add(sun);
  const orbit: THREE.Vector3[] = [];
  for (let i = 0; i <= 72; i++) { const a = (i / 72) * Math.PI * 2; orbit.push(new THREE.Vector3(Math.cos(a) * 3.2, 0, Math.sin(a) * 3.2)); }
  g.add(trail(orbit, 0x38bdf8));
  const sat = sph(0.24, 0x22c55e); g.add(sat);
  kit.addLbl("#f59e0b", "Central mass M", "F = GMm/r^2", new THREE.Vector3(-2.8, 2.4, 0), new THREE.Vector3(0, 0.8, 0));
  kit.addLbl("#22c55e", "Satellite m", "v_orb = sqrt(GM/r)", new THREE.Vector3(4.2, 1.4, 0), new THREE.Vector3(3.2, 0, 0));
  kit.addLbl("#38bdf8", "Orbit r", "T^2 prop r^3 (Kepler)", new THREE.Vector3(-4.0, -1.4, 0), new THREE.Vector3(-2.2, 0, 1.6));
  kit.addLbl("#f472b6", "v_esc = sqrt(2GM/r)", "escape threshold", new THREE.Vector3(2.2, -2.2, 0), new THREE.Vector3(1.4, -0.2, -1.8));
  titleText(kit.ts, "Gravitation — satellite orbit", new THREE.Vector3(0, 3.4, 0));
  return (t: number) => {
    const a = t * 0.6;
    sat.position.set(Math.cos(a) * 3.2, 0, Math.sin(a) * 3.2);
  };
}
export function buildElasticity(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const clamp = boxm(2.2, 0.3, 0.8, 0x475569); clamp.position.set(0, 2.2, 0); g.add(clamp);
  const wire = cyl(0.12, 0.12, 3.4, 0x38bdf8); wire.position.set(0, 0.4, 0); g.add(wire);
  const weight = boxm(0.8, 0.5, 0.8, 0xf59e0b); weight.position.set(0, -1.7, 0); g.add(weight);
  kit.addLbl("#38bdf8", "Wire (L, A)", "stress = F/A", new THREE.Vector3(-2.8, 1.2, 0), new THREE.Vector3(0, 1.0, 0));
  kit.addLbl("#f59e0b", "Load F = mg", "strain = e/L", new THREE.Vector3(2.8, -1.2, 0), new THREE.Vector3(0, -1.5, 0));
  kit.addLbl("#22c55e", "Y = stress/strain", "Young modulus", new THREE.Vector3(-2.8, -1.4, 0), new THREE.Vector3(0, -0.4, 0));
  kit.addLbl("#f472b6", "U = 1/2 F e", "elastic PE", new THREE.Vector3(2.8, 1.4, 0), new THREE.Vector3(0, 2.2, 0));
  titleText(kit.ts, "Searle bar — Hooke law", new THREE.Vector3(0, 3.2, 0));
  return (t: number) => {
    const e = 0.25 + Math.sin(t * 1.4) * 0.08;
    wire.scale.y = 1 + e * 0.08; weight.position.y = -1.7 - e * 0.12;
  };
}
export const UNIT_A_IDS = ["physical-quantities", "vectors", "kinematics", "dynamics", "work-energy-and-power", "circular-motion", "gravitation", "elasticity"];
