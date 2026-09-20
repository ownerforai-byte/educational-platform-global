"use client";
/* Physics unit scenes D: Class 12 (electrostatics -> communication). */
import * as THREE from "three";
import { sph, cyl, boxm, flowLine, trail, titleText, standardMaterial, type SuiteKit } from "./physics-syllabus-suite-3d-kit";
export function buildElectrostatics(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const plus = sph(0.5, 0xef4444); plus.position.set(-1.6, 0.2, 0); g.add(plus);
  const minus = sph(0.5, 0x38bdf8); minus.position.set(1.6, 0.2, 0); g.add(minus);
  for (let i = 0; i <= 10; i++) {
    const f = i / 10;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 20; j++) {
      const s = j / 20;
      pts.push(new THREE.Vector3(-1.6 + s * 3.2, 0.2 + Math.sin(s * Math.PI) * (1.6 - f * 1.2), (f - 0.5) * 1.6 * Math.sin(s * Math.PI)));
    }
    g.add(trail(pts, 0x94a3b8));
  }
  kit.addLbl("#ef4444", "+q pole", "lines leave +q", new THREE.Vector3(-3.4, 1.6, 0), new THREE.Vector3(-1.6, 0.6, 0));
  kit.addLbl("#38bdf8", "-q pole", "lines enter -q", new THREE.Vector3(3.4, 1.6, 0), new THREE.Vector3(1.6, 0.6, 0));
  kit.addLbl("#f59e0b", "Dipole p = qd", "E_axial = 2kp/r^3", new THREE.Vector3(0, -1.8, 0), new THREE.Vector3(0, 0.2, 0));
  titleText(kit.ts, "Dipole field — +q to -q", new THREE.Vector3(0, 2.8, 0));
  return () => {};
}
export function buildCurrentElectricity(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const pts = [new THREE.Vector3(-3.2, -1, 0), new THREE.Vector3(3.2, -1, 0), new THREE.Vector3(3.2, 1.2, 0), new THREE.Vector3(-3.2, 1.2, 0), new THREE.Vector3(-3.2, -1, 0)];
  g.add(trail(pts, 0x94a3b8));
  const bridge = boxm(0.3, 2.2, 0.3, 0xf59e0b); bridge.position.set(0, 0.1, 0); g.add(bridge);
  const galv = sph(0.3, 0x22c55e); galv.position.set(0, 0.1, 0); g.add(galv);
  const e = sph(0.09, 0x38bdf8); g.add(e);
  kit.addLbl("#f59e0b", "Wheatstone bridge", "P/Q = R/S at null", new THREE.Vector3(1.2, 2.2, 0), new THREE.Vector3(0, 0.8, 0));
  kit.addLbl("#22c55e", "Galvanometer null", "Ig = 0 at balance", new THREE.Vector3(-2.4, -2.0, 0), new THREE.Vector3(0, 0.1, 0));
  kit.addLbl("#38bdf8", "Kirchhoff laws", "ΣI = 0, ΣV = 0", new THREE.Vector3(3.4, -1.8, 0), new THREE.Vector3(2.4, -1, 0));
  titleText(kit.ts, "Current electricity — bridge + laws", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => {
    const ph = (t * 0.8) % 1; const per = 12.8; const d = ph * per;
    let acc = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const L = pts[i].distanceTo(pts[i + 1]);
      if (d <= acc + L) { e.position.copy(pts[i]).lerp(pts[i + 1], (d - acc) / L); break; }
      acc += L;
    }
  };
}
export function buildMagnetism(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const wire = cyl(0.09, 0.09, 5.2, 0xf59e0b); wire.rotation.z = Math.PI / 2; g.add(wire);
  [0.7, 1.2, 1.7].forEach((r) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 8, 48), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    ring.rotation.y = Math.PI / 2; g.add(ring);
  });
  const needle = boxm(1.2, 0.12, 0.12, 0xef4444); needle.position.set(0, -1.8, 1.6); g.add(needle);
  kit.addLbl("#f59e0b", "Current I", "source of B", new THREE.Vector3(-3.4, 1.4, 0), new THREE.Vector3(-1.8, 0, 0));
  kit.addLbl("#38bdf8", "B circles wire", "B = μ0I/2πr", new THREE.Vector3(2.6, 1.8, 0), new THREE.Vector3(0.6, 0.9, 0.4));
  kit.addLbl("#ef4444", "F = qv×B", "Lorentz deflects beam", new THREE.Vector3(2.6, -2.2, 0), new THREE.Vector3(0, -1.8, 1.6));
  titleText(kit.ts, "Magnetism — field of a wire", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}

export function buildEMI(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const coil = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.22, 12, 40), standardMaterial(0xf59e0b, { metalness: 0.5 }));
  coil.position.set(0, 0.2, 0); g.add(coil);
  const magnet = cyl(0.3, 0.3, 1.2, 0xef4444); g.add(magnet);
  const meter = boxm(0.9, 0.7, 0.4, 0x1e293b); meter.position.set(2.8, -1.4, 0); g.add(meter);
  kit.addLbl("#ef4444", "Moving magnet", "ΔΦ induces emf", new THREE.Vector3(-3.4, 1.8, 0), new THREE.Vector3(-0.6, 0.8, 0));
  kit.addLbl("#f59e0b", "Coil N turns", "ε = -N dΦ/dt", new THREE.Vector3(2.4, 1.8, 0), new THREE.Vector3(0.8, 0.8, 0));
  kit.addLbl("#22c55e", "Lenz law", "opposes the change", new THREE.Vector3(-2.6, -2.0, 0), new THREE.Vector3(0, -0.4, 0));
  titleText(kit.ts, "EMI — Faraday + Lenz", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => { magnet.position.set(-2.2 + Math.sin(t * 1.6) * 1.4, 0.2, 0); magnet.rotation.z = Math.PI / 2; };
}
export function buildAC(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const wave: THREE.Vector3[] = [];
  for (let i = 0; i <= 80; i++) wave.push(new THREE.Vector3(-4 + (i / 80) * 8, Math.sin((i / 80) * Math.PI * 4) * 1.1, 0));
  g.add(trail(wave, 0xfacc15));
  const core1 = boxm(0.9, 1.6, 0.9, 0x475569); core1.position.set(-1.6, -1.4, 0); g.add(core1);
  const core2 = boxm(0.9, 1.6, 0.9, 0x475569); core2.position.set(1.6, -1.4, 0); g.add(core2);
  kit.addLbl("#facc15", "AC sine V = V0 sin ωt", "rms = V0/√2", new THREE.Vector3(-3.4, 2.2, 0), wave[10]);
  kit.addLbl("#38bdf8", "Resonance XL = XC", "max current at f0", new THREE.Vector3(3.4, 1.8, 0), wave[55]);
  kit.addLbl("#22c55e", "Transformer", "Vs/Vp = Ns/Np", new THREE.Vector3(0.4, -2.4, 0), new THREE.Vector3(0, -1.2, 0));
  titleText(kit.ts, "AC — sine + transformer", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}
export function buildRayOptics(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const mirror = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 1.4, 24, 1, true, Math.PI * 0.72, Math.PI * 0.56), standardMaterial(0x94a3b8, { side: THREE.DoubleSide }));
  mirror.rotation.x = Math.PI / 2; mirror.position.set(1.4, 0.4, 0); g.add(mirror);
  g.add(flowLine(new THREE.Vector3(-4, 0.8, 0), new THREE.Vector3(0.4, 0.8, 0), 0xfacc15));
  g.add(flowLine(new THREE.Vector3(0.4, 0.8, 0), new THREE.Vector3(-2.6, -0.8, 0), 0xfacc15));
  const lens = sph(1.0, 0x38bdf8, 0.3); lens.scale.x = 0.3; lens.position.set(-1.6, -1.2, 0); g.add(lens);
  kit.addLbl("#94a3b8", "Spherical mirror", "mirror + lens formulae", new THREE.Vector3(2.8, 2.2, 0), new THREE.Vector3(1.6, 1.2, 0));
  kit.addLbl("#facc15", "Ray pair", "angle i = angle r", new THREE.Vector3(-3.6, -1.8, 0), new THREE.Vector3(-1.8, 0.2, 0));
  kit.addLbl("#38bdf8", "Thin lens", "power P = 100/f", new THREE.Vector3(-3.4, 1.6, 0), new THREE.Vector3(-1.6, -0.8, 0));
  titleText(kit.ts, "Ray optics — mirror + lens", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}
export function buildWaveOptics(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const barrier = boxm(0.3, 3.0, 1.6, 0x475569); barrier.position.set(-1, 0.4, 0); g.add(barrier);
  const s1 = sph(0.12, 0xfacc15); s1.position.set(-1, 0.8, 0.2); g.add(s1);
  const s2 = sph(0.12, 0xfacc15); s2.position.set(-1, 0.8, -0.2); g.add(s2);
  const screen = boxm(0.2, 3.2, 2.6, 0xe2e8f0, 0.6); screen.position.set(3, 0.4, 0); g.add(screen);
  for (let i = 0; i < 5; i++) {
    const fringe = boxm(0.05, 0.3, 0.3, i % 2 ? 0x1e293b : 0xfacc15);
    fringe.position.set(2.85, 0.9 - i * 0.45, 0); g.add(fringe);
  }
  kit.addLbl("#facc15", "Double slit S1 S2", "coherent pair", new THREE.Vector3(-3.2, 2.2, 0), new THREE.Vector3(-1, 0.8, 0));
  kit.addLbl("#38bdf8", "Path diff", "bright: nλ, dark: (n+1/2)λ", new THREE.Vector3(0.8, 2.4, 0), new THREE.Vector3(1.2, 0.8, 0));
  kit.addLbl("#e2e8f0", "Fringe width λD/d", "measure λ", new THREE.Vector3(3.8, -1.4, 0), new THREE.Vector3(3, -0.4, 0));
  titleText(kit.ts, "Wave optics — interference", new THREE.Vector3(0, 3.2, 0));
  return () => {};
}
export function buildModernPhysics(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const plate = boxm(1.8, 0.25, 1.4, 0x475569); plate.position.set(-1.6, -0.8, 0); g.add(plate);
  for (let i = 0; i < 5; i++) g.add(flowLine(new THREE.Vector3(-2.6 + i * 0.5, 2.2, 0), new THREE.Vector3(-2.2 + i * 0.4, -0.7, 0), 0xfacc15));
  for (let i = 0; i < 4; i++) {
    const e = sph(0.11, 0x38bdf8);
    e.position.set(-1.2 + i * 0.3, -0.2 + i * 0.15, 0.3); (e.userData as { i: number }).i = i; g.add(e);
  }
  const nucleus = sph(0.4, 0xef4444); nucleus.position.set(2.4, 0.2, 0); g.add(nucleus);
  const shell = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.03, 8, 48), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  shell.position.set(2.4, 0.2, 0); g.add(shell);
  kit.addLbl("#facc15", "Photons hf", "Kmax = hf - φ", new THREE.Vector3(-3.6, 2.6, 0), new THREE.Vector3(-2, 1.2, 0));
  kit.addLbl("#38bdf8", "Photoelectrons", "stopping V0 = Kmax/e", new THREE.Vector3(-0.2, -2.0, 0), new THREE.Vector3(-1, -0.3, 0));
  kit.addLbl("#ef4444", "Bohr atom En ∝ 1/n²", "X-rays: λmin = hc/eV", new THREE.Vector3(3.6, 1.8, 0), new THREE.Vector3(2.4, 0.6, 0));
  titleText(kit.ts, "Modern physics — photoelectric + Bohr", new THREE.Vector3(0, 3.2, 0));
  return (t: number) => { shell.rotation.y = t * 0.9; };
}
export function buildSemiconductor(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const p = boxm(1.2, 1.4, 0.8, 0xef4444, 0.85); p.position.set(-0.7, 0.2, 0); g.add(p);
  const n = boxm(1.2, 1.4, 0.8, 0x38bdf8, 0.85); n.position.set(0.7, 0.2, 0); g.add(n);
  const bulb = sph(0.3, 0x1e293b); bulb.position.set(0, 2.0, 0); g.add(bulb);
  kit.addLbl("#ef4444", "p-side holes", "forward: current flows", new THREE.Vector3(-3.2, 1.6, 0), new THREE.Vector3(-0.7, 0.8, 0));
  kit.addLbl("#38bdf8", "n-side electrons", "reverse: blocked", new THREE.Vector3(3.2, 1.6, 0), new THREE.Vector3(0.7, 0.8, 0));
  kit.addLbl("#facc15", "Depletion layer", "barrier ~0.7 V Si", new THREE.Vector3(0.2, -1.8, 0), new THREE.Vector3(0, 0.2, 0));
  titleText(kit.ts, "Semiconductor — p-n junction", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => { (bulb.material as THREE.MeshStandardMaterial).emissive.setHex(0xf59e0b); (bulb.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + 0.5 * Math.sin(t * 2); };
}

export function buildCommunication(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const tower = cyl(0.12, 0.3, 3.4, 0x94a3b8); tower.position.set(-2.4, -0.2, 0); g.add(tower);
  const dish = sph(0.6, 0x38bdf8, 0.8); dish.scale.z = 0.35; dish.position.set(-2.4, 1.8, 0); g.add(dish);
  for (let i = 1; i <= 3; i++) {
    const wave = new THREE.Mesh(new THREE.TorusGeometry(i * 0.7, 0.03, 8, 40, Math.PI * 0.9), new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.9 - i * 0.2 }));
    wave.position.set(-2.4, 1.8, 0); wave.rotation.z = -Math.PI * 0.45; (wave.userData as { i: number }).i = i; g.add(wave);
  }
  const rx = boxm(0.8, 0.6, 0.5, 0xf59e0b); rx.position.set(2.8, -0.8, 0); g.add(rx);
  kit.addLbl("#38bdf8", "Transmitter", "carrier + message", new THREE.Vector3(-3.6, 2.8, 0), new THREE.Vector3(-2.4, 1.8, 0));
  kit.addLbl("#22c55e", "AM / FM wave", "modulation carries audio", new THREE.Vector3(0.4, 2.2, 0), new THREE.Vector3(-0.6, 1.4, 0));
  kit.addLbl("#f59e0b", "Receiver", "demodulate + amplify", new THREE.Vector3(3.6, 0.6, 0), new THREE.Vector3(2.8, -0.6, 0));
  titleText(kit.ts, "Communication — AM/FM link", new THREE.Vector3(0, 3.2, 0));
  return () => {};
}
export const UNIT_D_IDS = ["electrostatics", "current-electricity", "magnetism-and-magnetic-effect", "electromagnetic-induction", "alternating-current", "ray-optics", "wave-optics", "modern-physics", "semiconductor", "communication-systems"];

