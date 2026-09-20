"use client";

/**
 * Molecular Builder 3D — REAL WebGL VSEPR lab.
 *
 * Replaces the old placeholder (a dashed box saying "[3D Rendering Area]").
 * Builds H₂O, CH₄, CO₂ and NH₃ atom-by-atom with correct bond angles,
 * labelled with arrow-free SVG leader lines + the one-by-one reveal bar.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import {
  createLeaderLayer,
  createRevealBar,
  type LeaderLayer,
  type LeaderLine,
} from "@/components/lab/leader-lines";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  titleText,
  type ThreeScene,
} from "@/components/lab/three-scene";
import { isWebGLAvailable } from "@/lib/webgl";
import { VizToolbar, type VizTarget, type VizTargetRef } from "@/components/viz/viz-toolbar";
import { TheoryPanel } from "@/components/lab/theory-panel";

type AtomSpec = { el: string; pos: [number, number, number]; color: number; r: number; sub: string };
type MoleculeSpec = {
  id: string;
  label: string;
  atoms: AtomSpec[];
  bonds: [number, number][];
  bondOrder?: Record<string, 2>;
  angle: string;
  shape: string;
  hybrid: string;
  polarity: string;
  look: string;
  principle: string;
  why: string;
};

const H = 0xf1f5f9;
const O = 0xef4444;
const C = 0x64748b;
const N = 0x3b82f6;

const MOLECULES: MoleculeSpec[] = [
  {
    id: "water",
    label: "H₂O — Water",
    atoms: [
      { el: "O", pos: [0, 0, 0], color: O, r: 0.5, sub: "6 valence e⁻ — 2 lone pairs" },
      { el: "H", pos: [0.76, 0.59, 0], color: H, r: 0.28, sub: "1 bond" },
      { el: "H", pos: [-0.76, 0.59, 0], color: H, r: 0.28, sub: "1 bond" },
    ],
    bonds: [[0, 1], [0, 2]],
    angle: "H–O–H = 104.5°",
    shape: "Bent (V-shape) — AX₂E₂",
    hybrid: "sp³ hybridised O",
    polarity: "Polar — net dipole toward O",
    look: "A red oxygen sphere with two small white hydrogens joined by grey bond cylinders, bent like a boomerang; two invisible lone-pair lobes push the hydrogens down.",
    principle: "VSEPR: two bonding pairs + two lone pairs around O → tetrahedral electron geometry, bent molecular shape. Lone pairs repel more than bond pairs, squeezing 109.5° down to 104.5°. Bent + polar O–H bonds → the molecule is polar, giving water its hydrogen bonding, high boiling point and solvency.",
    why: "Explains water's anomalous properties (high b.p., ice floating, universal solvent) — a guaranteed NEB bonding question.",
  },
  {
    id: "methane",
    label: "CH₄ — Methane",
    atoms: [
      { el: "C", pos: [0, 0, 0], color: C, r: 0.48, sub: "4 bonding pairs, no lone pairs" },
      { el: "H", pos: [0.63, 0.63, 0.63], color: H, r: 0.28, sub: "σ bond" },
      { el: "H", pos: [0.63, -0.63, -0.63], color: H, r: 0.28, sub: "σ bond" },
      { el: "H", pos: [-0.63, 0.63, -0.63], color: H, r: 0.28, sub: "σ bond" },
      { el: "H", pos: [-0.63, -0.63, 0.63], color: H, r: 0.28, sub: "σ bond" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
    angle: "H–C–H = 109.5°",
    shape: "Tetrahedral — AX₄",
    hybrid: "sp³ hybridised C",
    polarity: "Non-polar — symmetrical dipoles cancel",
    look: "A grey carbon sphere at the centre of four white hydrogens at the corners of a perfect tetrahedron — like a 3-sided pyramid with a tripod base.",
    principle: "Four bonding pairs, no lone pairs → sp³ hybrids point to tetrahedron corners, 109.5° apart. Perfect symmetry makes the molecule non-polar despite polar C–H bonds.",
    why: "The reference geometry for sp³ hybridisation; every tetrahedral-carbon chapter (alkanes, alcohols) builds on it.",
  },
  {
    id: "carbon-dioxide",
    label: "CO₂ — Carbon Dioxide",
    atoms: [
      { el: "C", pos: [0, 0, 0], color: C, r: 0.44, sub: "sp hybridised" },
      { el: "O", pos: [1.16, 0, 0], color: O, r: 0.46, sub: "double bond (σ + π)" },
      { el: "O", pos: [-1.16, 0, 0], color: O, r: 0.46, sub: "double bond (σ + π)" },
    ],
    bonds: [[0, 1], [0, 2]],
    bondOrder: { "0-1": 2, "0-2": 2 },
    angle: "O=C=O = 180°",
    shape: "Linear — AX₂",
    hybrid: "sp hybridised C",
    polarity: "Non-polar — equal opposite dipoles cancel",
    look: "A grey carbon sphere flanked by two red oxygens in a perfectly straight line, joined by double bond cylinders.",
    principle: "Two electron domains around C → sp hybrids, 180° linear geometry with two double bonds (one σ + one π each). The two bond dipoles are equal and opposite, so the molecule is non-polar overall — yet the polar C=O bonds make CO₂ a potent IR absorber (greenhouse gas).",
    why: "Contrast case with H₂O: both have polar bonds but only water is bent + polar. Classic VSEPR/hybridisation exam trap.",
  },
  {
    id: "ammonia",
    label: "NH₃ — Ammonia",
    atoms: [
      { el: "N", pos: [0, 0.12, 0], color: N, r: 0.48, sub: "1 lone pair on top" },
      { el: "H", pos: [0.94, -0.33, 0], color: H, r: 0.28, sub: "σ bond" },
      { el: "H", pos: [-0.47, -0.33, 0.81], color: H, r: 0.28, sub: "σ bond" },
      { el: "H", pos: [-0.47, -0.33, -0.81], color: H, r: 0.28, sub: "σ bond" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3]],
    angle: "H–N–H = 107°",
    shape: "Trigonal pyramidal — AX₃E",
    hybrid: "sp³ hybridised N",
    polarity: "Polar — pyramidal, lone pair on top",
    look: "A blue nitrogen sphere with three white hydrogens forming a triangular base — a pyramid — with its lone pair occupying the empty apex above.",
    principle: "Three bonding pairs + one lone pair → tetrahedral electron geometry but trigonal pyramidal shape. The lone pair's extra repulsion compresses 109.5° → 107°. The lone pair also makes NH₃ a Lewis base (proton acceptor) and gives a net dipole.",
    why: "Lone-pair repulsion order (lp–lp > lp–bp > bp–bp) and basicity of ammonia are standard NEB bonding/qualitative questions.",
  },
];

function chipEl(color: string, title: string, sub?: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.82);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;`;
  el.innerHTML = `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-weight:500">${sub}</span>` : "");
  return el;
}

function bondMesh(a: THREE.Vector3, b: THREE.Vector3, order: number): THREE.Group {
  const g = new THREE.Group();
  const dir = b.clone().sub(a);
  const len = dir.length();
  for (let i = 0; i < order; i++) {
    const off = order === 2 ? (i - 0.5) * 0.11 : 0;
    const bond = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, len, 10),
      standardMaterial(0xcbd5e1, { roughness: 0.5 }),
    );
    bond.position.copy(a).add(b).multiplyScalar(0.5);
    bond.translateX(off);
    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    g.add(bond);
  }
  return g;
}

export const MolecularBuilder3D: React.FC = () => {
  const [molId, setMolId] = useState("water");
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const mountRef = useRef<HTMLDivElement | null>(null);
  const vizTargetRef = useRef<VizTarget>({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;

    const ts: ThreeScene = createThreeScene(mount, { background: 0x0b1220 });
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    labelRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
    mount.appendChild(labelRenderer.domElement);

    let leader: LeaderLayer | null = null;
    let barDispose: (() => void) | null = null;
    try {
      leader = createLeaderLayer(mount);
      barDispose = createRevealBar(mount, leader);
    } catch { /* leader lines optional */ }

    const mol = MOLECULES.find((m) => m.id === molId) ?? MOLECULES[0];
    const g = ts.group;
    const connections: LeaderLine[] = [];

    const atoms = mol.atoms.map((a) => new THREE.Vector3(...a.pos));
    mol.atoms.forEach((a, i) => {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(a.r, 26, 20), standardMaterial(a.color));
      sphere.position.copy(atoms[i]);
      g.add(sphere);
      const o = new CSS2DObject(chipEl("#" + a.color.toString(16).padStart(6, "0"), a.el, a.sub));
      o.position.copy(atoms[i]).add(new THREE.Vector3(0, a.r + 0.55, 0));
      g.add(o);
      connections.push({ label: o, target: atoms[i].clone(), color: "#" + a.color.toString(16).padStart(6, "0"), id: `atom-${i}` });
    });
    mol.bonds.forEach(([a, b]) => {
      const order = mol.bondOrder?.[`${a}-${b}`] ?? 1;
      g.add(bondMesh(atoms[a], atoms[b], order));
    });

    /* geometry + polarity info chips */
    const angleChip = new CSS2DObject(chipEl("#fbbf24", mol.angle, `${mol.shape} · ${mol.hybrid}`));
    angleChip.position.set(0, 2.5, 0);
    g.add(angleChip);
    connections.push({ label: angleChip, target: new THREE.Vector3(0, 0.4, 0), color: "#fbbf24", id: "angle" });

    const polChip = new CSS2DObject(chipEl(mol.polarity.startsWith("Polar") ? "#f87171" : "#4ade80", mol.polarity));
    polChip.position.set(0, -2.3, 0);
    g.add(polChip);
    connections.push({ label: polChip, target: new THREE.Vector3(0, -0.3, 0), color: mol.polarity.startsWith("Polar") ? "#f87171" : "#4ade80", id: "polarity" });

    titleText(ts, mol.label, new THREE.Vector3(0, 3.6, 0));

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      ts.group.rotation.y = t * 0.35;
      ts.controls.update();
      ts.renderer.render(ts.scene, ts.camera);
      labelRenderer.render(ts.scene, ts.camera);
      leader?.draw(ts.camera, connections);
    };
    animate();

    vizTargetRef.current = {
      controls: ts.controls,
      el: mount,
      canvasEl: ts.renderer.domElement,
      render: () => {
        ts.renderer.render(ts.scene, ts.camera);
        labelRenderer.render(ts.scene, ts.camera);
        leader?.draw(ts.camera, connections);
      },
    };

    const offResize = bindResize(ts);
    const onDomResize = () => labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    window.addEventListener("resize", onDomResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onDomResize);
      offResize();
      barDispose?.();
      leader?.dispose();
      labelRenderer.domElement.remove();
      disposeThreeScene(ts);
      vizTargetRef.current = {};
    };
  }, [molId, webGL]);

  const mol = MOLECULES.find((m) => m.id === molId) ?? MOLECULES[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {MOLECULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMolId(m.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              molId === m.id
                ? "bg-amber-500 text-white border-amber-500 shadow"
                : "bg-card text-muted-foreground border-border hover:border-amber-500/50"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {webGL ? (
        <div
          ref={mountRef}
          aria-label="3D scene"
          className="relative w-full h-80 sm:h-96 md:h-[clamp(320px,60vh,620px)] overflow-hidden rounded-md"
        >
          <VizToolbar targetRef={vizTargetRef} />
        </div>
      ) : (
        <div className="flex w-full h-80 items-center justify-center rounded-md border border-border bg-muted/30 text-sm text-muted-foreground">
          WebGL is not available in this browser.
        </div>
      )}

      <TheoryPanel
        title={`Theory — ${mol.label}`}
        look={mol.look}
        principle={mol.principle}
        why={mol.why}
      />
    </div>
  );
};

export default MolecularBuilder3D;
