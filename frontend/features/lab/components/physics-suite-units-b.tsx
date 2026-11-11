"use client";
/* Physics unit scenes B: heat + optics (C11 units 9-16). */
import * as THREE from "three";
import { sph, cyl, boxm, flowLine, trail, titleText, standardMaterial, type SuiteKit } from "./physics-syllabus-suite-3d-kit";
export function buildHeatTemp(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  for (let i = 0; i < 26; i++) {
    const p = sph(0.12, i % 2 ? 0xef4444 : 0x38bdf8);
    p.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2.4 + 0.4, (Math.random() - 0.5) * 2);
    p.userData.v = new THREE.Vector3().randomDirection().multiplyScalar(0.9);
    g.add(p);
  }
  const tube = cyl(0.18, 0.18, 2.6, 0x38bdf8, 0.35); tube.position.set(3.2, 0.4, 0); g.add(tube);
  const bulb = sph(0.4, 0xef4444); bulb.position.set(3.2, -1.2, 0); g.add(bulb);
  kit.addLbl("#ef4444", "Heat Q", "flows hot -> cold", new THREE.Vector3(-3.4, 2.4, 0), new THREE.Vector3(-1, 0.8, 0));
  kit.addLbl("#38bdf8", "Temperature T", "mean KE per molecule", new THREE.Vector3(0.4, 2.6, 0), new THREE.Vector3(0.6, 0.2, 0));
  kit.addLbl("#f59e0b", "Zeroth law", "A~B, B~C => A~C", new THREE.Vector3(-3.6, -1.8, 0), new THREE.Vector3(-1.6, -0.6, 0));
  kit.addLbl("#22c55e", "Mercury thermometer", "expands with T", new THREE.Vector3(4.4, -1.6, 0), new THREE.Vector3(3.2, -1.0, 0));
  titleText(kit.ts, "Heat vs temperature — zeroth law", new THREE.Vector3(0, 3.6, 0));
  return () => {
    g.children.forEach((o) => {
      if (o instanceof THREE.Mesh && o.geometry.type === "SphereGeometry" && (o.geometry as THREE.SphereGeometry).parameters.radius === 0.12) {
        o.position.addScaledVector((o.userData as { v: THREE.Vector3 }).v, 0.016);
        (["x", "y", "z"] as const).forEach((ax, i) => {
          const lim = i === 1 ? 1.6 : 2.1;
          const c = i === 1 ? 0.4 : 0;
          const vv = (o.userData as { v: THREE.Vector3 }).v;
          if (Math.abs(o.position[ax] - c) > lim) vv[ax] *= -1;
        });
      }
    });
  };
}
export function buildThermalExpansion(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const rod = cyl(0.22, 0.22, 4.6, 0xf59e0b); rod.rotation.z = Math.PI / 2; g.add(rod);
  const burner = cyl(0.5, 0.7, 0.5, 0x475569); burner.position.set(0, -1.2, 0); g.add(burner);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.9, 12), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 }));
  flame.position.set(0, -0.6, 0); g.add(flame);
  kit.addLbl("#f59e0b", "Rod length L", "ΔL = α L ΔT", new THREE.Vector3(-3.2, 1.4, 0), new THREE.Vector3(-1.6, 0, 0));
  kit.addLbl("#38bdf8", "Heating ΔT", "molecules vibrate wider", new THREE.Vector3(2.8, -1.8, 0), new THREE.Vector3(0, -0.6, 0));
  kit.addLbl("#22c55e", "α linear", "steel ~ 12e-6 /K", new THREE.Vector3(3.2, 1.4, 0), new THREE.Vector3(1.8, 0, 0));
  kit.addLbl("#f472b6", "γ ≈ 3α", "volume expansion", new THREE.Vector3(-3.0, -1.8, 0), new THREE.Vector3(-0.6, 0, 0.4));
  titleText(kit.ts, "Linear expansion — ΔL = αLΔT", new THREE.Vector3(0, 2.8, 0));
  return (t: number) => { rod.scale.x = 1 + (Math.sin(t * 1.2) * 0.5 + 0.5) * 0.12; flame.scale.y = 1 + Math.sin(t * 7) * 0.12; };
}
export function buildQuantityHeat(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const cup = cyl(0.9, 0.7, 1.2, 0x94a3b8, 0.5); cup.position.set(-1.6, 0, 0); g.add(cup);
  const water = cyl(0.78, 0.62, 0.7, 0x38bdf8, 0.7); water.position.set(-1.6, 0.1, 0); g.add(water);
  const ice = boxm(0.5, 0.5, 0.5, 0xe0f2fe); ice.position.set(-1.6, 0.8, 0); ice.rotation.set(0.4, 0.5, 0.2); g.add(ice);
  const thermo = cyl(0.08, 0.08, 2.2, 0xef4444); thermo.position.set(1.8, 0.4, 0); g.add(thermo);
  kit.addLbl("#38bdf8", "Q = mcΔT", "sensible heat", new THREE.Vector3(-3.6, 2.0, 0), new THREE.Vector3(-1.6, 0.3, 0));
  kit.addLbl("#e0f2fe", "Q = mL", "latent heat at phase change", new THREE.Vector3(-3.4, -1.6, 0), new THREE.Vector3(-1.6, 0.8, 0));
  kit.addLbl("#ef4444", "Newton cooling", "dT/dt ∝ ΔT", new THREE.Vector3(3.4, 1.8, 0), new THREE.Vector3(1.8, 1.2, 0));
  kit.addLbl("#22c55e", "Triple point", "solid+liquid+vapour meet", new THREE.Vector3(3.4, -1.6, 0), new THREE.Vector3(0.4, -0.4, 0));
  titleText(kit.ts, "Quantity of heat — mcΔT + mL", new THREE.Vector3(0, 3.0, 0));
  return (t: number) => { ice.rotation.y = t * 0.8; ice.position.y = 0.8 + Math.sin(t * 1.5) * 0.08; };
}
export function buildHeatFlow(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const bar = boxm(4.6, 0.5, 0.7, 0xb45309); bar.position.set(-1, 0.4, 0); g.add(bar);
  for (let i = 0; i < 8; i++) {
    const dot = sph(0.09, i < 3 ? 0xef4444 : 0xf59e0b);
    dot.position.set(-3 + i * 0.55, 0.4, 0.45); (dot.userData as { i: number }).i = i; g.add(dot);
  }
  const conv = cyl(0.7, 0.9, 1.6, 0x38bdf8, 0.35); conv.position.set(2.6, -0.2, 0); g.add(conv);
  const ray = sph(0.5, 0xfacc15); ray.position.set(2.6, 2.0, 0); g.add(ray);
  for (let i = 0; i < 3; i++) g.add(flowLine(new THREE.Vector3(2.6, 1.4, 0), new THREE.Vector3(1.2 + i * 0.7, -0.4, 0), 0xfacc15));
  kit.addLbl("#b45309", "Conduction", "Q/t = kAΔT/d", new THREE.Vector3(-3.4, 1.8, 0), new THREE.Vector3(-2.4, 0.5, 0));
  kit.addLbl("#38bdf8", "Convection", "bulk fluid carries heat", new THREE.Vector3(4.2, -1.2, 0), new THREE.Vector3(2.6, -0.4, 0));
  kit.addLbl("#facc15", "Radiation", "P = σAT⁴, no medium", new THREE.Vector3(4.2, 2.6, 0), new THREE.Vector3(2.6, 2.0, 0));
  titleText(kit.ts, "Heat flow — conduction + convection + radiation", new THREE.Vector3(0, 3.6, 0));
  return (t: number) => {
    g.children.forEach((o) => {
      if (o instanceof THREE.Mesh && o.geometry.type === "SphereGeometry" && (o.geometry as THREE.SphereGeometry).parameters.radius === 0.09) {
        const m = o.material as THREE.MeshStandardMaterial;
        m.emissive.setHex(0x7c2d12);
        m.emissiveIntensity = 0.4 + 0.4 * Math.sin(t * 2 - ((o.userData as { i: number }).i as number));
      }
    });
  };
}
export function buildIdealGas(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const chamber = boxm(4.4, 2.8, 2.4, 0x38bdf8, 0.14); chamber.position.set(0, 0.4, 0); g.add(chamber);
  for (let i = 0; i < 30; i++) {
    const p = sph(0.11, 0x22c55e);
    p.position.set((Math.random() - 0.5) * 3.8, (Math.random() - 0.5) * 2.2 + 0.4, (Math.random() - 0.5) * 1.8);
    (p.userData as { v: THREE.Vector3 }).v = new THREE.Vector3().randomDirection().multiplyScalar(1.6);
    g.add(p);
  }
  kit.addLbl("#22c55e", "Molecules", "PV = nRT", new THREE.Vector3(-3.6, 2.4, 0), new THREE.Vector3(-1.4, 1.0, 0));
  kit.addLbl("#38bdf8", "Pressure P", "collisions on walls", new THREE.Vector3(3.6, 2.2, 0), new THREE.Vector3(2.2, 1.2, 0));
  kit.addLbl("#f59e0b", "KE = 3kT/2", "rms speed ∝ √T", new THREE.Vector3(-3.6, -1.6, 0), new THREE.Vector3(-0.8, -0.4, 0));
  titleText(kit.ts, "Ideal gas — kinetic model", new THREE.Vector3(0, 3.2, 0));
  return () => {
    g.children.forEach((o) => {
      if (o instanceof THREE.Mesh && o.geometry.type === "SphereGeometry" && (o.geometry as THREE.SphereGeometry).parameters.radius === 0.11) {
        const vv = (o.userData as { v: THREE.Vector3 }).v;
        o.position.addScaledVector(vv, 0.02);
        if (Math.abs(o.position.x) > 2.1) vv.x *= -1;
        if (Math.abs(o.position.y - 0.4) > 1.3) vv.y *= -1;
        if (Math.abs(o.position.z) > 1.1) vv.z *= -1;
      }
    });
  };
}


export function buildCurvedMirror(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const arc = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 1.6, 24, 1, true, Math.PI * 0.7, Math.PI * 0.6), standardMaterial(0x94a3b8, { side: THREE.DoubleSide }));
  arc.rotation.x = Math.PI / 2; g.add(arc);
  g.add(flowLine(new THREE.Vector3(-4, 0.8, 0), new THREE.Vector3(-0.6, 0.8, 0), 0xf59e0b));
  g.add(flowLine(new THREE.Vector3(-0.6, 0.8, 0), new THREE.Vector3(-3.4, -0.8, 0), 0xf59e0b));
  const obj = cyl(0.09, 0.09, 1.2, 0xef4444); obj.position.set(-3.2, 0.2, 0); g.add(obj);
  const img = cyl(0.09, 0.09, 0.8, 0x22c55e); img.position.set(-1.6, -0.2, 0); g.add(img);
  kit.addLbl("#94a3b8", "Concave mirror", "1/f = 1/v + 1/u", new THREE.Vector3(1.8, 2.2, 0), new THREE.Vector3(0.6, 1.2, 0));
  kit.addLbl("#ef4444", "Object", "beyond C: real image", new THREE.Vector3(-4.2, -1.4, 0), new THREE.Vector3(-3.2, 0.2, 0));
  kit.addLbl("#22c55e", "Image", "inverted, diminished", new THREE.Vector3(-0.4, -2.0, 0), new THREE.Vector3(-1.6, -0.2, 0));
  titleText(kit.ts, "Curved mirror — mirror formula", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}
export function buildRefractionPlane(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const air = boxm(7, 1.4, 2.4, 0x38bdf8, 0.1); air.position.set(0, 0.9, 0); g.add(air);
  const water = boxm(7, 1.4, 2.4, 0x0ea5e9, 0.3); water.position.set(0, -0.7, 0); g.add(water);
  g.add(flowLine(new THREE.Vector3(-2.4, 2.2, 0), new THREE.Vector3(-0.4, 0.2, 0), 0xf59e0b));
  g.add(flowLine(new THREE.Vector3(-0.4, 0.2, 0), new THREE.Vector3(0.9, -1.4, 0), 0xf59e0b));
  kit.addLbl("#f59e0b", "Incident ray", "n1 sin i = n2 sin r", new THREE.Vector3(-3.8, 2.4, 0), new THREE.Vector3(-1.6, 1.4, 0));
  kit.addLbl("#0ea5e9", "Refracted ray", "bends toward normal", new THREE.Vector3(2.6, -1.8, 0), new THREE.Vector3(0.6, -1.0, 0));
  kit.addLbl("#22c55e", "TIR (i > ic)", "fibre optics", new THREE.Vector3(-3.8, -1.8, 0), new THREE.Vector3(-1.2, -0.4, 0));
  titleText(kit.ts, "Refraction — Snell law + TIR", new THREE.Vector3(0, 3.2, 0));
  return () => {};
}

export function buildPrism(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const shape = new THREE.Shape();
  shape.moveTo(-1.6, -1.1); shape.lineTo(1.6, -1.1); shape.lineTo(0, 1.4); shape.closePath();
  const prism = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 1.2, bevelEnabled: false }), standardMaterial(0x38bdf8, { transparent: true, opacity: 0.35 }));
  prism.position.z = -0.6; g.add(prism);
  const rayPts = [new THREE.Vector3(-3.6, 0.5, 0), new THREE.Vector3(-1.0, 0.2, 0), new THREE.Vector3(0.6, -0.6, 0), new THREE.Vector3(3.6, -0.1, 0)];
  g.add(trail(rayPts, 0xfacc15));
  kit.addLbl("#38bdf8", "Prism angle A", "min deviation at symmetry", new THREE.Vector3(-2.6, 2.2, 0), new THREE.Vector3(-0.4, 1.0, 0));
  kit.addLbl("#facc15", "Deviation", "mu = sin((A+dm)/2)/sin(A/2)", new THREE.Vector3(3.2, 1.6, 0), new THREE.Vector3(1.6, -0.4, 0));
  kit.addLbl("#f472b6", "Dispersion", "violet bends most", new THREE.Vector3(3.4, -1.8, 0), new THREE.Vector3(2.6, -0.3, 0));
  titleText(kit.ts, "Prism — minimum deviation", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}
export function buildLenses(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const lens = sph(1.2, 0x38bdf8, 0.35); lens.scale.x = 0.32; g.add(lens);
  g.add(trail([new THREE.Vector3(-4.4, 0, 0), new THREE.Vector3(4.4, 0, 0)], 0x475569));
  g.add(flowLine(new THREE.Vector3(-4, 0.9, 0), new THREE.Vector3(0, 0.9, 0), 0xfacc15));
  g.add(flowLine(new THREE.Vector3(0, 0.9, 0), new THREE.Vector3(3.4, -0.7, 0), 0xfacc15));
  const obj = cyl(0.09, 0.09, 1.1, 0xef4444); obj.position.set(-2.8, 0.3, 0); g.add(obj);
  const img = cyl(0.09, 0.09, 0.7, 0x22c55e); img.position.set(2.2, -0.5, 0); g.add(img);
  kit.addLbl("#38bdf8", "Convex lens", "1/f = (mu-1)(1/R1-1/R2)", new THREE.Vector3(0.4, 2.2, 0), new THREE.Vector3(0, 0.8, 0));
  kit.addLbl("#ef4444", "Object", "beyond 2F: real image", new THREE.Vector3(-3.8, -1.4, 0), new THREE.Vector3(-2.8, 0.3, 0));
  kit.addLbl("#22c55e", "Image", "inverted between F-2F", new THREE.Vector3(3.4, -1.6, 0), new THREE.Vector3(2.2, -0.5, 0));
  titleText(kit.ts, "Lens — image formation", new THREE.Vector3(0, 3.0, 0));
  return () => {};
}

export function buildDispersion(kit: SuiteKit): (t: number) => void {
  const g = kit.ts.group;
  const cols = [0x8b5cf6, 0x38bdf8, 0x22c55e, 0xfacc15, 0xf97316, 0xef4444];
  g.add(flowLine(new THREE.Vector3(-4, 0.6, 0), new THREE.Vector3(-1.2, 0.3, 0), 0xe2e8f0));
  cols.forEach((c, i) => {
    g.add(flowLine(new THREE.Vector3(1.2, 0.0, 0), new THREE.Vector3(3.8, 0.9 - i * 0.36, 0), c));
  });
  kit.addLbl("#e2e8f0", "White light", "seven colours merged", new THREE.Vector3(-3.6, 1.8, 0), new THREE.Vector3(-2.4, 0.5, 0));
  kit.addLbl("#8b5cf6", "Violet deviates most", "mu highest", new THREE.Vector3(4.2, 1.8, 0), new THREE.Vector3(3.8, 0.9, 0));
  kit.addLbl("#ef4444", "Red deviates least", "mu lowest", new THREE.Vector3(4.2, -1.8, 0), new THREE.Vector3(3.8, -1.2, 0));
  titleText(kit.ts, "Dispersion — pure spectrum", new THREE.Vector3(0, 2.8, 0));
  return () => {};
}
export const UNIT_B_IDS = ["heat-and-temperature", "thermal-expansion", "quantity-of-heat", "rate-of-heat-flow", "ideal-gas", "reflection-at-curved-mirror", "refraction-at-plane-surfaces", "refraction-through-prisms", "lenses", "dispersion"];
