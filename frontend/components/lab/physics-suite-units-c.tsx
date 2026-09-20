"use client";
/* Physics unit scenes C: C11 electricity + modern (units 17-22). */
import * as THREE from "three";
import { sph, cyl, boxm, flowLine, trail, titleText, standardMaterial, type SuiteKit } from "./physics-syllabus-suite-3d-kit";
export function buildElectricCharges(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const q1 = sph(0.5, 0xef4444); q1.position.set(-1.8, 0.2, 0); g.add(q1);
  const q2 = sph(0.5, 0x38bdf8); q2.position.set(1.8, 0.2, 0); g.add(q2);
  g.add(flowLine(new THREE.Vector3(-1.8, 0.2, 0), new THREE.Vector3(-3.4, 0.2, 0), 0xef4444));
  g.add(flowLine(new THREE.Vector3(1.8, 0.2, 0), new THREE.Vector3(3.4, 0.2, 0), 0x38bdf8));
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    g.add(flowLine(new THREE.Vector3(-1.8, 0.2, 0), new THREE.Vector3(-1.8 + Math.cos(a) * 1.1, 0.2 + Math.sin(a) * 1.1, 0), 0xf59e0b));
  }
  kit.addLbl("#ef4444", "+q charge", "F = k q1 q2 / r^2", new THREE.Vector3(-3.4, 1.8, 0), new THREE.Vector3(-1.8, 0.6, 0));
  kit.addLbl("#38bdf8", "-q charge", "unlike attracts", new THREE.Vector3(3.4, 1.8, 0), new THREE.Vector3(1.8, 0.6, 0));
  kit.addLbl("#f59e0b", "Force pair", "equal, opposite, 1/r^2", new THREE.Vector3(0, -1.8, 0), new THREE.Vector3(0, 0.2, 0));
  titleText(kit.ts, "Coulomb law — charges", new THREE.Vector3(0, 2.8, 0));
  return () => {};
}

export function buildElectricField(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const q = sph(0.55, 0xf59e0b); g.add(q);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const dir = new THREE.Vector3(Math.cos(a), Math.sin(a) * 0.6, Math.sin(a) * 0.4).normalize();
    g.add(flowLine(dir.clone().multiplyScalar(0.7), dir.clone().multiplyScalar(2.6), 0x38bdf8));
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.05, 8, 40), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
  ring.rotation.x = Math.PI / 2; ring.position.y = -1.2; g.add(ring);
  kit.addLbl("#f59e0b", "Source +Q", "E = kQ/r^2 radially out", new THREE.Vector3(-2.6, 2.2, 0), new THREE.Vector3(0, 0.4, 0));
  kit.addLbl("#38bdf8", "Field lines", "tangent = E direction", new THREE.Vector3(3.4, 1.4, 0), new THREE.Vector3(1.8, 0.8, 0));
  kit.addLbl("#22c55e", "Flux Φ = ∮E·dA", "Gauss: Φ = Q/ε0", new THREE.Vector3(3.2, -2.0, 0), new THREE.Vector3(1.4, -1.2, 0));
  titleText(kit.ts, "Electric field — lines + flux", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => { ring.rotation.z = t * 0.5; };
}
export function buildPotential(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const q = sph(0.5, 0xf59e0b); g.add(q);
  [0.9, 1.5, 2.1, 2.7].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 8, 48), new THREE.MeshBasicMaterial({ color: [0xef4444, 0xf59e0b, 0x22c55e, 0x38bdf8][i] }));
    ring.rotation.x = Math.PI / 2; g.add(ring);
  });
  kit.addLbl("#f59e0b", "V = kQ/r", "1 volt = 1 J/C", new THREE.Vector3(-2.8, 2.0, 0), new THREE.Vector3(0, 0.4, 0));
  kit.addLbl("#22c55e", "Equipotentials", "no work along surface", new THREE.Vector3(3.4, 1.2, 0), new THREE.Vector3(1.6, 0, 0.6));
  kit.addLbl("#38bdf8", "E = -dV/dr", "field down the slope", new THREE.Vector3(-3.2, -1.8, 0), new THREE.Vector3(-1.2, -0.4, 0));
  titleText(kit.ts, "Potential — equipotential shells", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}
export function buildCapacitor(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const p1 = boxm(0.18, 2.0, 1.6, 0x38bdf8); p1.position.set(-0.7, 0.3, 0); g.add(p1);
  const p2 = boxm(0.18, 2.0, 1.6, 0xef4444); p2.position.set(0.7, 0.3, 0); g.add(p2);
  const diel = boxm(0.9, 1.8, 1.4, 0x22c55e, 0.35); diel.position.set(0, 0.3, 0); g.add(diel);
  for (let i = 0; i < 5; i++) g.add(flowLine(new THREE.Vector3(-0.6, -0.3 + i * 0.35, 0), new THREE.Vector3(0.6, -0.3 + i * 0.35, 0), 0xfacc15));
  kit.addLbl("#38bdf8", "+ plate", "Q = CV", new THREE.Vector3(-2.8, 2.2, 0), new THREE.Vector3(-0.7, 1.2, 0));
  kit.addLbl("#ef4444", "- plate", "C = εA/d", new THREE.Vector3(2.8, 2.2, 0), new THREE.Vector3(0.7, 1.2, 0));
  kit.addLbl("#22c55e", "Dielectric K", "C -> K·C0", new THREE.Vector3(2.8, -1.6, 0), new THREE.Vector3(0, -0.4, 0));
  kit.addLbl("#facc15", "U = Q²/2C", "energy in field", new THREE.Vector3(-2.8, -1.6, 0), new THREE.Vector3(0, 0.3, 0));
  titleText(kit.ts, "Capacitor — plates + dielectric", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}
export function buildDcCircuits(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const pts = [new THREE.Vector3(-3, -1, 0), new THREE.Vector3(3, -1, 0), new THREE.Vector3(3, 1.2, 0), new THREE.Vector3(-3, 1.2, 0), new THREE.Vector3(-3, -1, 0)];
  g.add(trail(pts, 0x94a3b8));
  const batt = boxm(0.5, 1.0, 0.5, 0x22c55e); batt.position.set(-3, 0.1, 0); g.add(batt);
  const r1 = boxm(1.2, 0.3, 0.3, 0xef4444); r1.position.set(0, 1.2, 0); g.add(r1);
  const bulb = sph(0.35, 0xfacc15); bulb.position.set(0, -1, 0); g.add(bulb);
  const e = sph(0.09, 0x38bdf8); g.add(e);
  kit.addLbl("#22c55e", "EMF source", "E, internal r", new THREE.Vector3(-4.2, 1.6, 0), new THREE.Vector3(-3, 0.5, 0));
  kit.addLbl("#ef4444", "Resistor R", "V = IR, series/parallel", new THREE.Vector3(0.6, 2.2, 0), new THREE.Vector3(0, 1.2, 0));
  kit.addLbl("#facc15", "Load / bulb", "P = VI = I²R", new THREE.Vector3(1.8, -2.0, 0), new THREE.Vector3(0, -1, 0));
  kit.addLbl("#38bdf8", "Drift current I", "I = nAev_d", new THREE.Vector3(-1.8, -2.0, 0), new THREE.Vector3(-1.6, -1, 0));
  titleText(kit.ts, "DC circuit — Ohm + Kirchhoff", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => {
    const ph = (t * 1.4) % 1;
    const per = 12;
    const d = ph * per;
    const seg = pts;
    let acc = 0;
    for (let i = 0; i < seg.length - 1; i++) {
      const L = seg[i].distanceTo(seg[i + 1]);
      if (d <= acc + L) { e.position.copy(seg[i]).lerp(seg[i + 1], (d - acc) / L); break; }
      acc += L;
    }
  };
}

export function buildNuclear(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  for (let i = 0; i < 14; i++) {
    const n = sph(0.22, i % 2 ? 0x38bdf8 : 0xef4444);
    n.position.copy(new THREE.Vector3().randomDirection().multiplyScalar(0.5 + Math.random() * 0.3));
    g.add(n);
  }
  const frag1 = new THREE.Group(); const frag2 = new THREE.Group();
  for (let i = 0; i < 5; i++) { const a = sph(0.2, 0xf59e0b); a.position.set((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)); frag1.add(a); }
  for (let i = 0; i < 5; i++) { const a = sph(0.2, 0x22c55e); a.position.set((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)); frag2.add(a); }
  frag1.position.set(-2.8, -1.2, 0); frag2.position.set(2.8, -1.2, 0); g.add(frag1); g.add(frag2);
  kit.addLbl("#ef4444", "Protons + neutrons", "A = Z + N", new THREE.Vector3(-2.6, 2.2, 0), new THREE.Vector3(0, 0.5, 0));
  kit.addLbl("#f59e0b", "E = mc²", "mass defect -> BE", new THREE.Vector3(0.4, -2.2, 0), new THREE.Vector3(-1.6, -1.0, 0));
  kit.addLbl("#22c55e", "Fission / fusion", "heavy splits, light fuses", new THREE.Vector3(3.4, 0.6, 0), new THREE.Vector3(2.8, -1.0, 0));
  titleText(kit.ts, "Nucleus — BE per nucleon", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => { frag1.rotation.y = t * 0.6; frag2.rotation.y = -t * 0.6; };
}
export function buildSolids(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const bands: [number, string][] = [[1.6, "#38bdf8"], [0.4, "#f59e0b"], [-0.8, "#22c55e"]];
  bands.forEach(([y, c]) => {
    const b = boxm(4.2, 0.55, 1.2, new THREE.Color(c).getHex()); b.position.set(-1.4, y, 0); g.add(b);
  });
  for (let i = 0; i < 6; i++) { const e = sph(0.1, 0x38bdf8); e.position.set(-2.8 + i * 0.55, 1.6, 0.7); g.add(e); }
  kit.addLbl("#38bdf8", "Conduction band", "free electrons carry I", new THREE.Vector3(-3.6, 2.6, 0), new THREE.Vector3(-1.4, 1.7, 0));
  kit.addLbl("#f59e0b", "Band gap Eg", "metal 0, Si ~1.1 eV", new THREE.Vector3(2.6, 0.8, 0), new THREE.Vector3(-1.4, 0.4, 0));
  kit.addLbl("#22c55e", "Valence band", "holes carry +I", new THREE.Vector3(-3.6, -1.8, 0), new THREE.Vector3(-1.4, -0.9, 0));
  kit.addLbl("#f472b6", "n-type / p-type", "doping adds e- / holes", new THREE.Vector3(2.8, -1.6, 0), new THREE.Vector3(0.2, -0.8, 0));
  titleText(kit.ts, "Solids — band theory", new THREE.Vector3(0, 3.2, 0));
  return () => {};
}


export function buildRecentTrends(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  for (let i = 0; i < 120; i++) {
    const s = sph(0.03, 0x94a3b8);
    s.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 8);
    g.add(s);
  }
  const bh = sph(0.8, 0x0f172a); g.add(bh);
  const disk = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.28, 10, 48), new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.8 }));
  disk.rotation.x = Math.PI / 2.4; g.add(disk);
  kit.addLbl("#f97316", "Black hole disk", "gravity traps light", new THREE.Vector3(-3.2, 2.0, 0), new THREE.Vector3(-0.8, 0.6, 0));
  kit.addLbl("#38bdf8", "Quarks + leptons", "baryons, mesons, neutrinos", new THREE.Vector3(3.4, 1.6, 0), new THREE.Vector3(1.8, 0.6, 0.8));
  kit.addLbl("#f472b6", "Big Bang + Hubble", "universe expands", new THREE.Vector3(-3.4, -1.8, 0), new THREE.Vector3(-1.8, -0.6, 0));
  titleText(kit.ts, "Recent trends — particles + cosmos", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => { disk.rotation.z = t * 0.8; };
}
export const UNIT_C_IDS = ["electric-charges", "electric-field", "potential-potential-difference-and-potential-energy", "capacitor", "dc-circuits", "nuclear-physics", "solids", "recent-trends-in-physics"];
