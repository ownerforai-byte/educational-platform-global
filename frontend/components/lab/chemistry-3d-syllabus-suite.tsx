"use client";

/**
 * Chemistry 3D Syllabus Suite — labelled 3D visualizations mapped to NEB
 * Chemistry XI (Chem. 201) units in official curriculum order:
 *   • Atomic Structure                              → Bohr shells (Z = 1–20)
 *   • Classification of Elements and Periodic Table → Period-3 trends
 *   • Chemical Bonding and Shapes of Molecules      → VSEPR geometries
 *   • Basic/Fundamental Principles of Organic Chem  → Hydrocarbons & benzene
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  titleText,
  type ThreeScene,
  type ThreeSceneOptions,
} from "@/components/lab/three-scene";

type Kit = {
  ts: ThreeScene;
  labelRenderer: CSS2DRenderer;
  addLabel: (
    color: string,
    title: string,
    sub: string | undefined,
    pos: THREE.Vector3,
    parent?: THREE.Object3D
  ) => CSS2DObject;
};

function chipEl(color: string, title: string, sub?: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.82);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;`;
  el.innerHTML = `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-weight:500">${sub}</span>` : "");
  return el;
}

function setupKit(mount: HTMLElement, opts: ThreeSceneOptions = {}): Kit {
  const ts = createThreeScene(mount, { background: 0x0b1220, ...opts });
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0";
  labelRenderer.domElement.style.left = "0";
  labelRenderer.domElement.style.pointerEvents = "none";
  labelRenderer.domElement.style.zIndex = "10";
  mount.appendChild(labelRenderer.domElement);
  return {
    ts,
    labelRenderer,
    addLabel(color, title, sub, pos, parent = ts.group) {
      const o = new CSS2DObject(chipEl(color, title, sub));
      o.position.copy(pos);
      parent.add(o);
      return o;
    },
  };
}

function runLoop(kit: Kit, onUpdate?: (t: number) => void): () => void {
  const clock = new THREE.Clock();
  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    onUpdate?.(clock.getElapsedTime());
    kit.ts.controls.update();
    kit.ts.renderer.render(kit.ts.scene, kit.ts.camera);
    kit.labelRenderer.render(kit.ts.scene, kit.ts.camera);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

function useLabScene(
  build: (kit: Kit) => void | ((t: number) => void),
  deps: unknown[]
): { mountRef: React.RefObject<HTMLDivElement | null>; webGL: boolean } {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;
    const kit = setupKit(mount);
    const tick = build(kit);
    const stop = runLoop(kit, tick ?? undefined);
    const offResize = bindResize(kit.ts);
    const onResize = () => kit.labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      offResize();
      kit.labelRenderer.domElement.remove();
      disposeThreeScene(kit.ts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, ...deps]);
  return { mountRef, webGL };
}

function CanvasMount({ mountRef, webGL }: { mountRef: React.RefObject<HTMLDivElement | null>; webGL: boolean }) {
  return webGL ? (
    <div ref={mountRef} aria-label="3D scene" className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-md" />
  ) : (
    <div className="flex w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] items-center justify-center rounded-md border border-border bg-muted/30 text-sm text-muted-foreground">
      WebGL is not available in this browser.
    </div>
  );
}

/** Cylinder bond from point a to point b. */
function bond(a: THREE.Vector3, b: THREE.Vector3, radius: number, color: number): THREE.Mesh {
  const dir = b.clone().sub(a);
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, dir.length(), 10),
    standardMaterial(color, { metalness: 0.3 })
  );
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

/* ------------------------------------------------------------------ */
/* TAB 1 — Atomic structure: Bohr shells, Z = 1–20                     */
/* ------------------------------------------------------------------ */

const ELEMENTS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"];
const SHELL_NAMES = ["K", "L", "M", "N"];
const SHELL_CAP = [2, 8, 8, 2];

function shellConfig(z: number): number[] {
  const shells: number[] = [];
  let left = z;
  for (let i = 0; i < SHELL_CAP.length && left > 0; i++) {
    const n = Math.min(SHELL_CAP[i], left);
    shells.push(n);
    left -= n;
  }
  return shells;
}

const AtomicTab: React.FC = () => {
  const [z, setZ] = useState(11);
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const shells = shellConfig(z);
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 18), standardMaterial(0xf43f5e, { emissive: 0xf43f5e, emissiveIntensity: 0.5 }));
    g.add(nucleus);
    const spinners: { group: THREE.Group; speed: number }[] = [];
    shells.forEach((count, i) => {
      const r = 1.3 + i * 0.85;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 8, 96), standardMaterial(0x475569));
      ring.rotation.x = Math.PI / 2 + (i - (shells.length - 1) / 2) * 0.32;
      g.add(ring);
      const spin = new THREE.Group();
      spin.rotation.copy(ring.rotation);
      g.add(spin);
      for (let e = 0; e < count; e++) {
        const a = (e / count) * Math.PI * 2;
        const el = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.8 }));
        el.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
        spin.add(el);
      }
      spinners.push({ group: spin, speed: 0.5 / (i + 1) });
      kit.addLabel("#94a3b8", `${SHELL_NAMES[i]} shell (${count}e⁻)`, `${r.toFixed(1)} Å scale`, new THREE.Vector3(0, -2.2 - i * 0.5, 0), g);
    });
    kit.addLabel("#f43f5e", "Nucleus", `+${z} protons, ~${Math.round(z * 1.9)} neutrons`, new THREE.Vector3(0, 1.2, 0));
    titleText(kit.ts, `${ELEMENTS[z - 1]} (Z = ${z}) — electronic configuration`, new THREE.Vector3(0, 4.6, 0));
    return (t: number) => {
      spinners.forEach((s) => (s.group.rotation.z = t * s.speed));
      nucleus.scale.setScalar(1 + 0.04 * Math.sin(t * 3));
    };
  }, [z]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="grid max-w-lg grid-cols-10 gap-1">
          {ELEMENTS.map((sym, i) => (
            <Button key={sym} size="sm" variant={z === i + 1 ? "default" : "outline"} className="px-0" onClick={() => setZ(i + 1)}>
              {sym}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Configuration: {shellConfig(z).map((n, i) => `${SHELL_NAMES[i]}:${n}`).join("  ")}
        </p>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="Electrons (blue) orbit the nucleus in shells K, L, M, N — inner shells spin faster. Pick any element from H to Ca and watch its shells fill by the 2, 8, 8, 2 rule."
        principle="Bohr–Bury scheme: shells fill in order of increasing energy, capacity 2n², outermost shell never more than 8 electrons. Valence electrons decide chemical properties."
        why="Explains group chemistry: Na (2,8,1) and K (2,8,8,1) both lose one electron, so both are alkali metals."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 2 — VSEPR shapes of molecules                                   */
/* ------------------------------------------------------------------ */

type VseprShape = {
  key: string;
  name: string;
  example: string;
  angle: string;
  hybrid: string;
  dirs: THREE.Vector3[];
  lonePairs: THREE.Vector3[];
};

function v(n: number[]): THREE.Vector3 {
  return new THREE.Vector3(...n).normalize();
}

const VSEPR_SHAPES: VseprShape[] = [
  { key: "linear", name: "Linear", example: "BeCl₂ / CO₂", angle: "180°", hybrid: "sp", dirs: [v([1, 0, 0]), v([-1, 0, 0])], lonePairs: [] },
  { key: "bent", name: "Bent (V-shape)", example: "H₂O", angle: "104.5°", hybrid: "sp³", dirs: [v([0.79, 0.62, 0]), v([-0.79, 0.62, 0])], lonePairs: [v([0, -1, 0.2]), v([0, -1, -0.2])] },
  { key: "trigonal-planar", name: "Trigonal planar", example: "BF₃", angle: "120°", hybrid: "sp²", dirs: [v([0, 0, 1]), v([0.866, 0, -0.5]), v([-0.866, 0, -0.5])], lonePairs: [] },
  { key: "tetrahedral", name: "Tetrahedral", example: "CH₄", angle: "109.5°", hybrid: "sp³", dirs: [v([1, 1, 1]), v([1, -1, -1]), v([-1, 1, -1]), v([-1, -1, 1])], lonePairs: [] },
  { key: "trigonal-pyramidal", name: "Trigonal pyramidal", example: "NH₃", angle: "107°", hybrid: "sp³", dirs: [v([0.93, -0.37, 0]), v([-0.465, -0.37, 0.805]), v([-0.465, -0.37, -0.805])], lonePairs: [v([0, 1, 0])] },
  { key: "tbp", name: "Trigonal bipyramidal", example: "PCl₅", angle: "120° & 90°", hybrid: "sp³d", dirs: [v([0, 1, 0]), v([0, -1, 0]), v([1, 0, 0]), v([-0.5, 0, 0.866]), v([-0.5, 0, -0.866])], lonePairs: [] },
  { key: "octahedral", name: "Octahedral", example: "SF₆", angle: "90°", hybrid: "sp³d²", dirs: [v([1, 0, 0]), v([-1, 0, 0]), v([0, 1, 0]), v([0, -1, 0]), v([0, 0, 1]), v([0, 0, -1])], lonePairs: [] },
];

const VseprTab: React.FC = () => {
  const [idx, setIdx] = useState(3);
  const shape = VSEPR_SHAPES[idx];
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.55, 28, 20), standardMaterial(0xa78bfa));
    g.add(center);
    shape.dirs.forEach((d) => {
      g.add(bond(new THREE.Vector3(), d.clone().multiplyScalar(1.55), 0.08, 0x64748b));
      const atom = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 16), standardMaterial(0x22c55e));
      atom.position.copy(d).multiplyScalar(1.95);
      g.add(atom);
      // Angle arc between first two bonds of planar sets
    });
    shape.lonePairs.forEach((d) => {
      const lobe = new THREE.Mesh(new THREE.SphereGeometry(0.5, 18, 14), standardMaterial(0xfbbf24, { transparent: true, opacity: 0.3 }));
      lobe.position.copy(d).multiplyScalar(1.1);
      lobe.scale.set(1, 1.4, 1);
      lobe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
      g.add(lobe);
    });
    if (shape.lonePairs.length > 0) {
      kit.addLabel("#fbbf24", "Lone pair", "repels more strongly", new THREE.Vector3(0, 2.6, 0));
    }
    if (shape.dirs.length >= 2) {
      kit.addLabel("#38bdf8", `Bond angle ≈ ${shape.angle}`, undefined, new THREE.Vector3(0, -2.6, 0));
    }
    kit.addLabel("#a78bfa", "Central atom", undefined, new THREE.Vector3(0, -0.9, 1.2));
    kit.addLabel("#22c55e", "Bonded atoms", undefined, new THREE.Vector3(2.6, 1.9, 0));
    titleText(kit.ts, `${shape.name} — ${shape.example} (${shape.hybrid})`, new THREE.Vector3(0, 3.8, 0));
  }, [idx]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {VSEPR_SHAPES.map((s, i) => (
          <Button key={s.key} size="sm" variant={idx === i ? "default" : "outline"} onClick={() => setIdx(i)}>
            {s.name}
          </Button>
        ))}
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="Lone pair = non-bonding electron pair on the central atom (yellow translucent lobe)."
        look="Violet central atom, green bonded atoms, yellow lobes for lone pairs. Compare tetrahedral CH₄ (109.5°) with NH₃ (107°) and H₂O (104.5°) — each lone pair squeezes the angle smaller."
        principle="VSEPR: electron pairs around the central atom arrange to minimize repulsion; repulsion order lone pair–lone pair > lone pair–bond pair > bond pair–bond pair."
        why="Molecular shape controls polarity, boiling point and biological activity — e.g. water's bent shape makes it polar."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 3 — Periodic trends across Period 3                             */
/* ------------------------------------------------------------------ */

const PERIOD3 = ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"];
const TRENDS = {
  radius: { label: "Atomic radius (pm)", values: [186, 160, 143, 118, 110, 104, 99, 98], trend: "decreases →", color: 0x38bdf8 },
  ie: { label: "1st ionization energy (kJ/mol)", values: [496, 738, 578, 787, 1012, 1000, 1251, 1521], trend: "increases →", color: 0xf97316 },
  en: { label: "Electronegativity (Pauling)", values: [0.9, 1.2, 1.5, 1.8, 2.1, 2.5, 3.0, 0], trend: "increases →", color: 0x22c55e },
} as const;

const PeriodicTab: React.FC = () => {
  const [metric, setMetric] = useState<keyof typeof TRENDS>("radius");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const t = TRENDS[metric];
    // Baseline axis
    g.add(new THREE.Mesh(new THREE.BoxGeometry(10, 0.06, 0.06), standardMaterial(0x475569)));
    t.values.forEach((val, i) => {
      const h = metric === "radius" ? val / 45 : metric === "ie" ? val / 120 : val * 0.9;
      const x = -4.4 + i * 1.25;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.7, h, 0.7), standardMaterial(t.color, { emissive: t.color, emissiveIntensity: 0.15 }));
      bar.position.set(x, h / 2, 0);
      g.add(bar);
      kit.addLabel(`#${t.color.toString(16).padStart(6, "0")}`, `${PERIOD3[i]}`, `${val}`, new THREE.Vector3(x, h + 0.55, 0));
    });
    kit.addLabel("#94a3b8", "Period 3 →", "across the period", new THREE.Vector3(0, -1.2, 0));
    kit.addLabel("#facc15", `Trend: ${t.trend}`, "nuclear charge ↑, shielding ~constant", new THREE.Vector3(0, -2.2, 0));
    titleText(kit.ts, t.label, new THREE.Vector3(0, 5.0, 0));
  }, [metric]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={metric === "radius" ? "default" : "outline"} onClick={() => setMetric("radius")}>Atomic radius</Button>
        <Button size="sm" variant={metric === "ie" ? "default" : "outline"} onClick={() => setMetric("ie")}>Ionization energy</Button>
        <Button size="sm" variant={metric === "en" ? "default" : "outline"} onClick={() => setMetric("en")}>Electronegativity</Button>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="3D bar chart of Period 3 (Na → Ar). Radius bars shrink left to right; ionization-energy and electronegativity bars generally grow (small dips at Al and S due to sub-shell stability)."
        principle="Across a period, nuclear charge rises while shielding stays nearly constant, so attraction on the outer electron increases → radius ↓, IE ↑, EN ↑. Down a group, new shells increase shielding → radius ↑, IE ↓."
        why="Predicts reactivity: metals (Na, Mg) lose electrons readily, non-metals (Cl) gain them — so metallic character falls across a period."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 4 — Hydrocarbons: alkanes, alkenes, alkynes, benzene            */
/* ------------------------------------------------------------------ */

const C_COLOR = 0x64748b;
const H_COLOR = 0xe2e8f0;

function atom(pos: THREE.Vector3, color: number, r: number): THREE.Mesh {
  const a = new THREE.Mesh(new THREE.SphereGeometry(r, 22, 16), standardMaterial(color, { metalness: 0.25 }));
  a.position.copy(pos);
  return a;
}

/** Multi-bond: n parallel cylinders offset perpendicular to the bond axis. */
function multiBond(a: THREE.Vector3, b: THREE.Vector3, n: number): THREE.Group {
  const grp = new THREE.Group();
  const axis = b.clone().sub(a).normalize();
  const perp = Math.abs(axis.y) < 0.9 ? new THREE.Vector3(0, 1, 0).cross(axis) : new THREE.Vector3(1, 0, 0).cross(axis);
  perp.normalize();
  const offsets = n === 1 ? [0] : n === 2 ? [-0.13, 0.13] : [-0.18, 0, 0.18];
  offsets.forEach((o) => grp.add(bond(a.clone().addScaledVector(perp, o), b.clone().addScaledVector(perp, o), 0.07, 0xcbd5e1)));
  return grp;
}

const OrganicTab: React.FC = () => {
  const [mol, setMol] = useState<"methane" | "ethane" | "ethene" | "ethyne" | "benzene">("benzene");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    if (mol === "methane") {
      g.add(atom(new THREE.Vector3(), C_COLOR, 0.5));
      [v([1, 1, 1]), v([1, -1, -1]), v([-1, 1, -1]), v([-1, -1, 1])].forEach((d) => {
        const h = d.clone().multiplyScalar(1.7);
        g.add(multiBond(new THREE.Vector3(), h, 1), atom(h, H_COLOR, 0.3));
      });
      kit.addLabel("#facc15", "sp³, 109.5°, all σ bonds", "CH₄", new THREE.Vector3(0, -2.4, 0));
    } else if (mol === "ethane") {
      [-0.85, 0.85].forEach((x) => g.add(atom(new THREE.Vector3(x, 0, 0), C_COLOR, 0.5)));
      g.add(multiBond(new THREE.Vector3(-0.85, 0, 0), new THREE.Vector3(0.85, 0, 0), 1));
      [[0.9, 1.5, 0], [-0.45, -0.75, 0.78], [-0.45, -0.75, -0.78]].forEach((d) => {
        const dir = v(d).multiply(new THREE.Vector3(-1, 1, 1));
        const h1 = new THREE.Vector3(-0.85, 0, 0).add(v(d).multiplyScalar(1.5));
        const h2 = new THREE.Vector3(0.85, 0, 0).add(dir.multiplyScalar(1.5));
        g.add(multiBond(new THREE.Vector3(-0.85, 0, 0), h1, 1), atom(h1, H_COLOR, 0.3));
        g.add(multiBond(new THREE.Vector3(0.85, 0, 0), h2, 1), atom(h2, H_COLOR, 0.3));
      });
      kit.addLabel("#facc15", "C–C single bond (σ), sp³", "C₂H₆", new THREE.Vector3(0, -2.6, 0));
    } else if (mol === "ethene") {
      [-0.67, 0.67].forEach((x) => g.add(atom(new THREE.Vector3(x, 0, 0), C_COLOR, 0.5)));
      g.add(multiBond(new THREE.Vector3(-0.67, 0, 0), new THREE.Vector3(0.67, 0, 0), 2));
      [[1, 1.2, 0], [1, -1.2, 0]].forEach((d) => {
        const h1 = new THREE.Vector3(-0.67, 0, 0).add(v(d).multiplyScalar(1.35));
        const h2 = new THREE.Vector3(0.67, 0, 0).add(v(d).multiply(new THREE.Vector3(-1, 1, 1)).multiplyScalar(1.35));
        g.add(multiBond(new THREE.Vector3(-0.67, 0, 0), h1, 1), atom(h1, H_COLOR, 0.3));
        g.add(multiBond(new THREE.Vector3(0.67, 0, 0), h2, 1), atom(h2, H_COLOR, 0.3));
      });
      kit.addLabel("#facc15", "C=C double bond (σ + π), sp², 120°", "planar", new THREE.Vector3(0, -2.6, 0));
    } else if (mol === "ethyne") {
      [-0.6, 0.6].forEach((x) => g.add(atom(new THREE.Vector3(x, 0, 0), C_COLOR, 0.5)));
      g.add(multiBond(new THREE.Vector3(-0.6, 0, 0), new THREE.Vector3(0.6, 0, 0), 3));
      [[-2.0, 0, 0], [2.0, 0, 0]].forEach((p) => {
        const end = new THREE.Vector3(p[0], 0, 0);
        const start = new THREE.Vector3(Math.sign(p[0]) * 0.6, 0, 0);
        g.add(multiBond(start, end, 1), atom(end, H_COLOR, 0.3));
      });
      kit.addLabel("#facc15", "C≡C triple bond (σ + 2π), sp, 180°", "linear", new THREE.Vector3(0, -1.9, 0));
    } else {
      // Benzene ring
      const ring: THREE.Vector3[] = [];
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ring.push(new THREE.Vector3(Math.cos(a) * 1.5, 0, Math.sin(a) * 1.5));
      }
      ring.forEach((p, i) => {
        const nx = ring[(i + 1) % 6];
        g.add(multiBond(p, nx, i % 2 === 0 ? 2 : 1), atom(p, C_COLOR, 0.42));
        const h = p.clone().normalize().multiplyScalar(2.5);
        g.add(multiBond(p, h, 1), atom(h, H_COLOR, 0.28));
      });
      const loop = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.035, 8, 64), new THREE.MeshBasicMaterial({ color: 0xf472b6 }));
      loop.rotation.x = Math.PI / 2;
      g.add(loop);
      kit.addLabel("#f472b6", "Delocalized π cloud", "aromatic sextet", new THREE.Vector3(0, -0.9, 0));
      kit.addLabel("#facc15", "sp², 120°, planar ring", "C₆H₆ — aromatic", new THREE.Vector3(0, -2.9, 0));
    }
    kit.addLabel("#64748b", "Carbon", undefined, new THREE.Vector3(3.2, 1.6, 0));
    kit.addLabel("#e2e8f0", "Hydrogen", undefined, new THREE.Vector3(3.2, 0.7, 0));
    titleText(kit.ts, { methane: "Methane CH₄", ethane: "Ethane C₂H₆", ethene: "Ethene C₂H₄", ethyne: "Ethyne C₂H₂", benzene: "Benzene C₆H₆" }[mol], new THREE.Vector3(0, 3.6, 0));
  }, [mol]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {(["methane", "ethane", "ethene", "ethyne", "benzene"] as const).map((m) => (
          <Button key={m} size="sm" variant={mol === m ? "default" : "outline"} onClick={() => setMol(m)}>
            {m[0].toUpperCase() + m.slice(1)}
          </Button>
        ))}
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="Grey = carbon, white = hydrogen. Bond multiplicity is drawn literally: one stick (alkane), two sticks (alkene), three sticks (alkyne), and benzene's alternating bonds with the pink delocalized-π ring."
        principle="Carbon always forms 4 covalent bonds: sp³ (tetrahedral 109.5°), sp² (trigonal 120°), sp (linear 180°). Benzene is a resonance hybrid — all six C–C bonds equal (1.39 Å), between single and double."
        why="Benzene's stability explains why it undergoes substitution (keeping the aromatic sextet) rather than the addition reactions typical of alkenes."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Suite export                                                        */
/* ------------------------------------------------------------------ */

export const Chemistry3DSyllabusSuite: React.FC = () => {
  return (
    <Tabs defaultValue="atomic" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="atomic">Atomic Structure</TabsTrigger>
        <TabsTrigger value="vsepr">VSEPR Shapes</TabsTrigger>
        <TabsTrigger value="periodic">Periodic Trends</TabsTrigger>
        <TabsTrigger value="organic">Hydrocarbons</TabsTrigger>
      </TabsList>
      <TabsContent value="atomic" className="mt-4"><AtomicTab /></TabsContent>
      <TabsContent value="vsepr" className="mt-4"><VseprTab /></TabsContent>
      <TabsContent value="periodic" className="mt-4"><PeriodicTab /></TabsContent>
      <TabsContent value="organic" className="mt-4"><OrganicTab /></TabsContent>
    </Tabs>
  );
};

export default Chemistry3DSyllabusSuite;







