"use client";

/**
 * Biology 3D Diversity & Ecology Suite — labelled 3D visualizations for the
 * remaining NEB Biology XI (Bio. 201) units that need visuals:
 *   • Biomolecules and Cell Biology → carbohydrates, proteins, lipids, enzymes
 *   • Introductory Microbiology     → prokaryotic bacterial cell (Monera)
 *   • Floral Diversity              → flower morphology, Spirogyra, Mucor,
 *                                     Yeast, Mushroom, Marchantia, Pinus
 *   • Ecology                       → carbon & nitrogen biogeochemical cycles
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";
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

/* ------------------------------------------------------------------ */
/* TAB 1 — Biomolecules & enzyme action                                */
/* ------------------------------------------------------------------ */

type BioMode = "carb" | "prot" | "lipid" | "enzyme";

function glucoseRing(center: THREE.Vector3, color: number): THREE.Group {
  const grp = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const isO = i === 0;
    const atom = new THREE.Mesh(new THREE.SphereGeometry(0.28, 18, 14), standardMaterial(isO ? 0xef4444 : color));
    atom.position.set(Math.cos(a) * 0.8, Math.sin(a) * 0.8, 0);
    grp.add(atom);
    const a2 = ((i + 1) / 6) * Math.PI * 2;
    const next = new THREE.Vector3(Math.cos(a2) * 0.8, Math.sin(a2) * 0.8, 0);
    const dir = next.clone().sub(atom.position);
    const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, dir.length(), 8), standardMaterial(0xcbd5e1));
    bond.position.copy(atom.position).addScaledVector(dir, 0.5);
    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    grp.add(bond);
  }
  grp.position.copy(center);
  return grp;
}

const BioMoleculesTab: React.FC = () => {
  const [mode, setMode] = useState<BioMode>("carb");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    if (mode === "carb") {
      g.add(glucoseRing(new THREE.Vector3(-2.6, 1.4, 0), 0x64748b));
      kit.addLabel("#ef4444", "Oxygen in ring", undefined, new THREE.Vector3(-3.6, 2.4, 0));
      kit.addLabel("#64748b", "Glucose C₆H₁₂O₆", "monosaccharide — instant energy fuel", new THREE.Vector3(-2.6, 3.2, 0));
      for (let i = 0; i < 4; i++) {
        g.add(glucoseRing(new THREE.Vector3(-3.2 + i * 2.1, -1.6, 0), 0x0ea5e9));
        if (i < 3) {
          const link = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.5, 8), standardMaterial(0xfacc15));
          link.rotation.z = Math.PI / 2;
          link.position.set(-2.15 + i * 2.1, -1.6, 0);
          g.add(link);
        }
      }
      kit.addLabel("#facc15", "α-glycosidic bond", "condensation releases H₂O", new THREE.Vector3(-1.1, -0.7, 0));
      kit.addLabel("#0ea5e9", "Starch / glycogen", "storage polysaccharide (plants / animals)", new THREE.Vector3(0.2, -2.9, 0));
    } else if (mode === "prot") {
      // Two amino acids forming a dipeptide
      const mkAmino = (x: number) => {
        const grp = new THREE.Group();
        grp.add(new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 16), standardMaterial(0x64748b))); // α-carbon
        const n = new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 14), standardMaterial(0x3b82f6));
        n.position.set(-0.75, 0.45, 0);
        grp.add(n);
        [-0.35, 0.35].forEach((dy) => {
          const h = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), standardMaterial(0xe2e8f0));
          h.position.set(-0.75, 0.45 + dy, 0.2);
          grp.add(h);
        });
        const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 14), standardMaterial(0x64748b));
        c2.position.set(0.75, -0.45, 0);
        grp.add(c2);
        [[0.55, 0.25], [0.55, -0.25]].forEach(([dx, dz]) => {
          const o = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), standardMaterial(0xef4444));
          o.position.set(c2.position.x + dx, c2.position.y, dz);
          grp.add(o);
        });
        const r = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), standardMaterial(0xf97316));
        r.position.set(0, -0.7, -0.3);
        grp.add(r);
        grp.position.x = x;
        return grp;
      };
      g.add(mkAmino(-1.7), mkAmino(1.7));
      const pb = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.1, 10), standardMaterial(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.4 }));
      pb.rotation.z = Math.PI / 2;
      pb.position.set(0, -0.1, 0);
      g.add(pb);
      kit.addLabel("#64748b", "α-carbon (C)", "central carbon of each amino acid", new THREE.Vector3(-1.7, 1.4, 0));
      kit.addLabel("#3b82f6", "Amino group (—NH₂)", undefined, new THREE.Vector3(-3.2, 1.0, 0));
      kit.addLabel("#ef4444", "Carboxyl group (—COOH)", undefined, new THREE.Vector3(-0.6, -1.9, 0));
      kit.addLabel("#f97316", "R group", "side chain — decides which amino acid", new THREE.Vector3(-1.7, -1.6, -0.9));
      kit.addLabel("#facc15", "Peptide bond (—CO—NH—)", "condensation: H₂O released", new THREE.Vector3(0, 1.1, 0));
      kit.addLabel("#94a3b8", "Dipeptide → polypeptide → protein", "20 amino acids, 4 structural levels", new THREE.Vector3(2.4, -1.9, 0));
    } else if (mode === "lipid") {
      // Phospholipid bilayer
      const rows: [number, number][] = [[0.5, -1], [-0.3, 1]];
      rows.forEach(([y, tailDir]) => {
        for (let ix = 0; ix < 9; ix++) {
          for (let iz = 0; iz < 2; iz++) {
            const x = -2.6 + ix * 0.65;
            const z = iz * 1.1 - 0.55;
            const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.15 }));
            head.position.set(x, y, z);
            g.add(head);
            for (const off of [-0.08, 0.08]) {
              const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 6), standardMaterial(0xb45309));
              tail.position.set(x + off, y + tailDir * 0.35, z);
              g.add(tail);
            }
          }
        }
      });
      const channel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.9, 16), standardMaterial(0xa78bfa, { transparent: true, opacity: 0.8 }));
      channel.position.set(0.65, 0.1, -0.55);
      g.add(channel);
      kit.addLabel("#38bdf8", "Hydrophilic phosphate head", "faces water (outside & inside)", new THREE.Vector3(-2.9, 1.3, -0.5));
      kit.addLabel("#b45309", "Hydrophobic fatty-acid tails", "hide from water (middle)", new THREE.Vector3(2.6, -1.6, -0.5));
      kit.addLabel("#a78bfa", "Integral protein", "channel for transport", new THREE.Vector3(0.65, 1.6, -0.5));
      kit.addLabel("#94a3b8", "Phospholipid bilayer", "basis of every cell membrane", new THREE.Vector3(0, -2.9, 0));
    } else {
      // Enzyme lock-and-key
      const enzyme = new THREE.Mesh(new THREE.SphereGeometry(1.7, 32, 24), standardMaterial(0xa78bfa, { transparent: true, opacity: 0.85 }));
      enzyme.scale.set(1.5, 0.9, 1.3);
      g.add(enzyme);
      const site = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.3, 24), standardMaterial(0x1e1b4b));
      site.position.set(0, 0.72, 0);
      g.add(site);
      const substrate = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 18), standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.3 }));
      g.add(substrate);
      const products: THREE.Mesh[] = [0, 1].map(() => {
        const p = new THREE.Mesh(new THREE.SphereGeometry(0.28, 18, 14), standardMaterial(0xf97316, { emissive: 0xf97316, emissiveIntensity: 0.3 }));
        p.visible = false;
        g.add(p);
        return p;
      });
      kit.addLabel("#a78bfa", "Enzyme", "globular protein — biological catalyst", new THREE.Vector3(-3.2, 1.6, 0));
      kit.addLabel("#1e1b4b", "Active site", "specific shape — lock & key", new THREE.Vector3(1.4, 2.2, 0));
      kit.addLabel("#22c55e", "Substrate", "fits the active site exactly", new THREE.Vector3(3.6, 0.4, 0));
      kit.addLabel("#f97316", "Products", "released; enzyme is reused unchanged", new THREE.Vector3(-3.2, -1.6, 0));
      return (t: number) => {
        // phase 0–1.6s approach, 1.6–3.2s bound, 3.2–4.8s products leave
        const ph = t % 4.8;
        products.forEach((p) => (p.visible = false));
        substrate.visible = true;
        if (ph < 1.6) {
          const k = ph / 1.6;
          substrate.position.set(3.4 * (1 - k), 0.72 + 1.6 * (1 - k) ** 2, 0);
        } else if (ph < 3.2) {
          substrate.position.set(0, 0.72, 0);
          substrate.scale.setScalar(1 + 0.05 * Math.sin(t * 6));
        } else {
          substrate.visible = false;
          const k = (ph - 3.2) / 1.6;
          products.forEach((p, i) => {
            p.visible = true;
            p.position.set((i === 0 ? -1 : 1) * k * 2.2, 0.72 - k * 1.1, 0);
          });
        }
      };
    }
    titleText(kit.ts, { carb: "Carbohydrates", prot: "Proteins — amino acids & peptide bond", lipid: "Lipids — phospholipid bilayer", enzyme: "Enzyme action (lock & key)" }[mode], new THREE.Vector3(0, 4.6, 0));
  }, [mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={mode === "carb" ? "default" : "outline"} onClick={() => setMode("carb")}>Carbohydrates</Button>
        <Button size="sm" variant={mode === "prot" ? "default" : "outline"} onClick={() => setMode("prot")}>Proteins</Button>
        <Button size="sm" variant={mode === "lipid" ? "default" : "outline"} onClick={() => setMode("lipid")}>Lipids</Button>
        <Button size="sm" variant={mode === "enzyme" ? "default" : "outline"} onClick={() => setMode("enzyme")}>Enzyme action</Button>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="Monomer = single unit (glucose, amino acid); polymer = chain of monomers (starch, protein)."
        look="Carbohydrates: glucose rings join by yellow glycosidic bonds into starch. Proteins: two amino acids join by a yellow peptide bond, releasing water. Lipids: the phospholipid bilayer — blue heads out, brown tails in. Enzyme: the green substrate approaches, binds the active site, and leaves as two orange products."
        principle="Enzymes are biological catalysts: they lower activation energy, are substrate-specific (lock & key), remain unchanged, and work best at optimum temperature/pH — denatured beyond it."
        why="Carbohydrates fuel cells, proteins build and regulate the body, phospholipids form every cell membrane, and enzymes make metabolism possible at body temperature."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 2 — Prokaryotic bacterial cell (Monera)                         */
/* ------------------------------------------------------------------ */

const BacteriaTab: React.FC = () => {
  const [gram, setGram] = useState<"positive" | "negative">("positive");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    // Capsule (glycocalyx)
    g.add(new THREE.Mesh(new THREE.CapsuleGeometry(1.35, 2.7, 8, 32), standardMaterial(0x86efac, { transparent: true, opacity: 0.2 })));
    // Cell wall — thick peptidoglycan (Gram+) or thin (Gram−)
    const wall = new THREE.Mesh(
      new THREE.CapsuleGeometry(gram === "positive" ? 1.22 : 1.06, 2.6, 8, 32),
      standardMaterial(gram === "positive" ? 0x9333ea : 0xd946ef, { transparent: true, opacity: 0.55 })
    );
    g.add(wall);
    // Plasma membrane
    g.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.95, 2.5, 8, 32), standardMaterial(0xfbbf24, { transparent: true, opacity: 0.4 })));
    // Cytoplasm
    g.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.88, 2.4, 8, 32), standardMaterial(0x0f172a)));
    // Nucleoid — circular DNA without nuclear membrane
    const nucleoid = new THREE.Mesh(new THREE.TorusKnotGeometry(0.55, 0.07, 80, 8), standardMaterial(0xf43f5e, { emissive: 0xf43f5e, emissiveIntensity: 0.3 }));
    nucleoid.rotation.x = Math.PI / 2;
    g.add(nucleoid);
    // Plasmid — small extra ring
    const plasmid = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.045, 8, 32), standardMaterial(0xfb7185, { emissive: 0xfb7185, emissiveIntensity: 0.4 }));
    plasmid.position.set(0.9, 0.3, 0.2);
    plasmid.rotation.x = Math.PI / 2.5;
    g.add(plasmid);
    // 70S ribosomes
    const rp: number[] = [];
    for (let i = 0; i < 110; i++) {
      const x = (Math.random() - 0.5) * 2.6;
      const r = 0.75 * Math.sqrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      rp.push(x, r * Math.sin(th), r * Math.cos(th));
    }
    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute("position", new THREE.Float32BufferAttribute(rp, 3));
    g.add(new THREE.Points(rGeo, new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.07 })));
    // Mesosome — folded membrane inward
    const mesoPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) mesoPts.push(new THREE.Vector3(-0.6 + i * 0.12, 0.62, i % 2 === 0 ? 0.35 : 0.55));
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(mesoPts), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
    // Flagellum — helical tail at the left end, rotates like a motor
    const flagPts: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      flagPts.push(new THREE.Vector3(-1.6 - i * 0.055, Math.cos(i * 0.9) * 0.16, Math.sin(i * 0.9) * 0.16));
    }
    const flag = new THREE.Group();
    flag.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(flagPts), 100, 0.035, 6), standardMaterial(0x94a3b8)));
    flag.position.set(-1.5, 0, 0);
    g.add(flag);
    // Pili — short straight hairs
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const pili = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 6), standardMaterial(0x94a3b8));
      pili.position.set(0.4 + (i % 3) * 0.6, Math.cos(a) * 1.15, Math.sin(a) * 1.15);
      pili.rotation.x = a;
      g.add(pili);
    }
    kit.addLabel("#86efac", "Capsule (glycocalyx)", "sticky protection — dodges white blood cells", new THREE.Vector3(0, 2.6, 0));
    kit.addLabel(gram === "positive" ? "#9333ea" : "#d946ef", "Cell wall", gram === "positive" ? "THICK peptidoglycan — keeps crystal violet (Gram+)" : "thin peptidoglycan + outer lipopolysaccharide (Gram−)", new THREE.Vector3(2.9, 1.7, 0));
    kit.addLabel("#fbbf24", "Plasma membrane", "selectively permeable; mesosome fold = respiration", new THREE.Vector3(-2.4, -1.9, 0));
    kit.addLabel("#f43f5e", "Nucleoid (circular DNA)", "NO nuclear membrane — prokaryote", new THREE.Vector3(0, -2.4, 0));
    kit.addLabel("#fb7185", "Plasmid", "extra-chromosomal DNA (resistance genes)", new THREE.Vector3(2.2, 0.7, 0.4));
    kit.addLabel("#38bdf8", "70S ribosomes", "protein synthesis", new THREE.Vector3(-2.6, 1.4, 0.6));
    kit.addLabel("#94a3b8", "Flagellum", "rotates like a motor — locomotion", new THREE.Vector3(-3.6, 1.6, 0));
    kit.addLabel("#cbd5e1", "Pili (fimbriae)", "attachment & conjugation", new THREE.Vector3(1.6, -2.3, 0.8));
    titleText(kit.ts, `Bacterial cell — Gram-${gram === "positive" ? "positive" : "negative"} (Monera)`, new THREE.Vector3(0, 3.8, 0));
    return (t: number) => {
      flag.rotation.x = t * 4;
    };
  }, [gram]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={gram === "positive" ? "default" : "outline"} onClick={() => setGram("positive")}>Gram-positive (thick wall)</Button>
        <Button size="sm" variant={gram === "negative" ? "default" : "outline"} onClick={() => setGram("negative")}>Gram-negative (thin wall)</Button>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="Cut-away rod bacterium: sticky capsule → cell wall → yellow plasma membrane → dark cytoplasm containing a pink knotted circular DNA (nucleoid), a small plasmid ring, and blue 70S ribosome dots. The grey flagellum spins at one end."
        principle="Prokaryotes ('before nucleus') have no nuclear membrane and no membrane-bound organelles. Gram-positive walls are thick peptidoglycan (violet stain); Gram-negative are thin with an outer LPS layer (pink stain). Nutrition: autotrophic (photo/chemo) or heterotrophic (saprophytic/parasitic)."
        why="Bacterial structure explains antibiotics (penicillin attacks peptidoglycan walls), Gram staining in labs, and plasmid use in genetic engineering."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 3 — Flower morphology (Angiosperm)                              */
/* ------------------------------------------------------------------ */

const FlowerTab: React.FC = () => {
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    // Thalamus (receptacle)
    const thalamus = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 16), standardMaterial(0x4d7c0f));
    thalamus.scale.y = 0.5;
    g.add(thalamus);
    // Stem
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.6, 12), standardMaterial(0x166534));
    stem.position.y = -1.6;
    g.add(stem);
    // Sepals (calyx) — 4 green leaf-like cones under the petals
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const sep = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.0, 8), standardMaterial(0x16a34a));
      sep.position.set(Math.cos(a) * 0.75, 0.35, Math.sin(a) * 0.75);
      sep.rotation.set(Math.sin(a) * 1.1, 0, -Math.cos(a) * 1.1);
      g.add(sep);
    }
    // Petals (corolla) — 6 pink rounded flaps
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 14), standardMaterial(0xf472b6, { transparent: true, opacity: 0.92 }));
      petal.position.set(Math.cos(a) * 1.25, 0.85, Math.sin(a) * 1.25);
      petal.scale.set(1, 0.35, 0.65);
      petal.rotation.y = -a;
      petal.rotation.z = 0.35;
      g.add(petal);
    }
    // Stamens (male) — 6 filaments with anthers
    const pollen: number[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const fx = Math.cos(a) * 0.55;
      const fz = Math.sin(a) * 0.55;
      const fil = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.7, 8), standardMaterial(0xfef3c7));
      fil.position.set(fx * 0.7, 1.35, fz * 0.7);
      fil.rotation.set(fz * 0.4, 0, -fx * 0.4);
      g.add(fil);
      const anther = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.36, 6, 12), standardMaterial(0xf59e0b));
      anther.position.set(fx * 1.35, 2.15, fz * 1.35);
      anther.rotation.z = fx * 0.5;
      g.add(anther);
      for (let p = 0; p < 8; p++) {
        pollen.push(anther.position.x + (Math.random() - 0.5) * 0.8, anther.position.y + (Math.random() - 0.5) * 0.5, anther.position.z + (Math.random() - 0.5) * 0.8);
      }
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pollen, 3));
    g.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xfbbf24, size: 0.06 })));
    // Carpel (female) — ovary, style, stigma
    const ovary = new THREE.Mesh(new THREE.SphereGeometry(0.42, 22, 16), standardMaterial(0x4ade80, { transparent: true, opacity: 0.55 }));
    ovary.position.set(0, 0.65, 0);
    ovary.scale.y = 1.25;
    g.add(ovary);
    for (let i = 0; i < 4; i++) {
      const ov = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), standardMaterial(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.4 }));
      const a = (i / 4) * Math.PI * 2;
      ov.position.set(Math.cos(a) * 0.16, 0.65 + (i % 2) * 0.2 - 0.1, Math.sin(a) * 0.16);
      g.add(ov);
    }
    const style = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.7, 10), standardMaterial(0x86efac));
    style.position.set(0, 1.75, 0);
    g.add(style);
    const stigma = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), standardMaterial(0xf9a8d4, { roughness: 0.9 }));
    stigma.position.set(0, 2.6, 0);
    g.add(stigma);
    kit.addLabel("#4d7c0f", "Thalamus (receptacle)", "flattened stem tip — all whorls sit on it", new THREE.Vector3(-1.9, -0.5, 0.4));
    kit.addLabel("#16a34a", "Sepals (calyx)", "outermost whorl — protects the bud", new THREE.Vector3(2.3, -0.4, 0.6));
    kit.addLabel("#f472b6", "Petals (corolla)", "bright — attract insects for pollination", new THREE.Vector3(-2.7, 1.3, 0.4));
    kit.addLabel("#f59e0b", "Stamen (male): filament + anther", "anther makes pollen (male gametes)", new THREE.Vector3(2.9, 2.5, 0.4));
    kit.addLabel("#fbbf24", "Pollen grains", "yellow dust — carried to the stigma", new THREE.Vector3(-2.3, 2.6, 0.4));
    kit.addLabel("#f9a8d4", "Carpel (female): stigma → style → ovary", "sticky stigma receives pollen", new THREE.Vector3(2.9, 3.4, -0.4));
    kit.addLabel("#4ade80", "Ovary with ovules", "ovules → seeds after fertilization; ovary → fruit", new THREE.Vector3(-2.5, 0.0, -0.8));
    kit.addLabel("#166534", "Pedicle (stalk)", undefined, new THREE.Vector3(0.9, -2.6, 0));
    titleText(kit.ts, "Typical flower — 4 whorls: calyx, corolla, androecium, gynoecium", new THREE.Vector3(0, 4.4, 0));
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="Whorl = a ring of floral parts. Androecium = male whorl (stamens); gynoecium = female whorl (carpels)."
        look="From outside in: green sepals → pink petals → six yellow-tipped stamens → one central carpel. The translucent ovary contains yellow ovules; pollen dusts the anthers."
        principle="A complete flower has 4 whorls: calyx (protection), corolla (attraction), androecium (pollen = male gametophyte) and gynoecium (stigma catches pollen; style is the passage; ovary holds ovules). Pollination → fertilization: ovules become seeds, ovary becomes fruit."
        why="Flower structure underlies agriculture — every grain and fruit begins with successful pollination of these exact parts."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 4 — Floral diversity: studied genera                            */
/* ------------------------------------------------------------------ */

type Species = "spirogyra" | "mucor" | "yeast" | "mushroom" | "marchantia" | "pinus";

const DiversityTab: React.FC = () => {
  const [sp, setSp] = useState<Species>("mushroom");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    if (sp === "spirogyra") {
      // Filament cylinder + spiral chloroplast ribbon
      const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 5.4, 24, 1, true), standardMaterial(0x86efac, { transparent: true, opacity: 0.25 }));
      g.add(cell);
      const spiralPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 120; i++) {
        const a = i * 0.55;
        spiralPts.push(new THREE.Vector3(Math.cos(a) * 0.42, -2.7 + i * 0.045, Math.sin(a) * 0.42));
      }
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(spiralPts), 160, 0.11, 10), standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.25 })));
      const nuc = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), standardMaterial(0xf43f5e, { emissive: 0xf43f5e, emissiveIntensity: 0.4 }));
      nuc.position.set(0, 0.4, 0);
      g.add(nuc);
      kit.addLabel("#22c55e", "Spiral chloroplast", "ribbon-like — characteristic of Spirogyra", new THREE.Vector3(2.4, 1.6, 0));
      kit.addLabel("#f43f5e", "Nucleus", "centrally suspended by cytoplasmic strands", new THREE.Vector3(-2.4, 0.9, 0));
      kit.addLabel("#86efac", "Cylindrical cell + mucilage sheath", "filamentous green alga (Chlorophyceae)", new THREE.Vector3(-2.4, -1.9, 0));
      kit.addLabel("#facc15", "Reproduction: conjugation", "two filaments join and exchange contents", new THREE.Vector3(2.4, -0.9, 0));
      titleText(kit.ts, "Spirogyra — green alga", new THREE.Vector3(0, 3.6, 0));
    } else if (sp === "mucor") {
      // Branching coenocytic hyphae with sporangia
      const hypha = (from: THREE.Vector3, to: THREE.Vector3, w: number) => {
        const curve = new THREE.QuadraticBezierCurve3(from, from.clone().add(to).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.4, 0)), to);
        g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 24, w, 8), standardMaterial(0xe2e8f0)));
      };
      hypha(new THREE.Vector3(0, -2.2, 0), new THREE.Vector3(-1.2, 1.0, 0), 0.09);
      hypha(new THREE.Vector3(0, -2.2, 0), new THREE.Vector3(1.1, 0.8, 0), 0.09);
      hypha(new THREE.Vector3(-1.2, 1.0, 0), new THREE.Vector3(-1.9, 2.4, 0), 0.06);
      hypha(new THREE.Vector3(-1.2, 1.0, 0), new THREE.Vector3(-0.4, 2.5, 0), 0.06);
      hypha(new THREE.Vector3(1.1, 0.8, 0), new THREE.Vector3(1.9, 2.3, 0), 0.06);
      [[-1.9, 2.6, 0], [-0.4, 2.7, 0], [1.9, 2.5, 0]].forEach(([x, y, z]) => {
        const spg = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 14), standardMaterial(0x64748b, { transparent: true, opacity: 0.85 }));
        spg.position.set(x, y, z);
        g.add(spg);
        for (let i = 0; i < 14; i++) {
          const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), standardMaterial(0x0f172a));
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          s.position.set(x + Math.sin(ph) * Math.cos(th) * 0.3, y + Math.cos(ph) * 0.3, z + Math.sin(ph) * Math.sin(th) * 0.3);
          g.add(s);
        }
        kit.addLabel("#94a3b8", "Sporangium", "black sphere of sporangiospores (asexual)", new THREE.Vector3(x + 1.6, y + 0.5, 0));
      });
      kit.addLabel("#e2e8f0", "Coenocytic hyphae", "tubular, multinucleate, no cross-walls (Phycomycetes)", new THREE.Vector3(-2.6, -0.4, 0));
      kit.addLabel("#a16207", "Rhizoids", "anchoring, absorbing branches below", new THREE.Vector3(2.4, -2.2, 0));
      titleText(kit.ts, "Mucor — bread mould (Phycomycete)", new THREE.Vector3(0, 4.2, 0));
    } else if (sp === "yeast") {
      // Budding chain of ovoid cells
      const cell = (x: number, y: number, s: number) => {
        const c = new THREE.Mesh(new THREE.SphereGeometry(0.55 * s, 24, 16), standardMaterial(0xfde68a, { emissive: 0xfde68a, emissiveIntensity: 0.12 }));
        c.position.set(x, y, 0);
        c.scale.set(1, 1.25, 1);
        g.add(c);
        const n = new THREE.Mesh(new THREE.SphereGeometry(0.16 * s, 14, 10), standardMaterial(0x7c3aed));
        n.position.set(x, y, 0.3 * s);
        g.add(n);
        return c;
      };
      cell(-1.4, 0, 1);
      cell(0.1, 0.35, 0.85);
      cell(1.3, 0.75, 0.65);
      cell(2.2, 1.35, 0.45);
      kit.addLabel("#7c3aed", "Nucleus", "eukaryotic — true nucleus (Ascomycete)", new THREE.Vector3(-2.8, 1.1, 0));
      kit.addLabel("#f97316", "Bud → bud chain", "asexual reproduction by budding (pseudomycelium)", new THREE.Vector3(1.6, 2.5, 0));
      kit.addLabel("#fde68a", "Single oval cell", "unicellular fungus — ferments sugar to ethanol", new THREE.Vector3(-2.8, -1.3, 0));
      titleText(kit.ts, "Yeast (Saccharomyces) — Ascomycete", new THREE.Vector3(0, 3.6, 0));
    } else if (sp === "mushroom") {
      // Soil line
      g.add(new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 4), standardMaterial(0x78350f)));
      // Stipe (stalk)
      const stipe = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 2.6, 20), standardMaterial(0xfef3c7));
      stipe.position.y = 1.1;
      g.add(stipe);
      // Ring (annulus)
      const annulus = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.07, 8, 24), standardMaterial(0xe7e5e4));
      annulus.rotation.x = Math.PI / 2;
      annulus.position.y = 1.85;
      g.add(annulus);
      // Cap (pileus) — hemisphere
      const cap = new THREE.Mesh(new THREE.SphereGeometry(1.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), standardMaterial(0xb45309));
      cap.position.y = 2.35;
      g.add(cap);
      // Gills — radial dark planes under the cap
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const gill = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 0.7), standardMaterial(0x78350f, { side: THREE.DoubleSide }));
        gill.position.set(Math.cos(a) * 0.75, 2.3, Math.sin(a) * 0.75);
        gill.rotation.y = -a;
        gill.rotation.x = 0.25;
        g.add(gill);
      }
      // Mycelium threads below soil
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const m = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 6), standardMaterial(0xd6d3d1));
        m.position.set(Math.cos(a) * 0.5, -1.0, Math.sin(a) * 0.5);
        m.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9);
        g.add(m);
      }
      kit.addLabel("#b45309", "Cap (pileus)", "basidiocarp of a Basidiomycete", new THREE.Vector3(2.7, 3.3, 0));
      kit.addLabel("#78350f", "Gills (hymenium)", "bear basidiospores", new THREE.Vector3(-2.9, 1.7, 0));
      kit.addLabel("#e7e5e4", "Ring (annulus)", "remnant of the partial veil", new THREE.Vector3(2.4, 1.6, 0.6));
      kit.addLabel("#fef3c7", "Stipe (stalk)", "lifts the cap for spore dispersal", new THREE.Vector3(-2.7, 0.4, 0));
      kit.addLabel("#d6d3d1", "Mycelium (underground)", "absorbs nutrients — main body of the fungus", new THREE.Vector3(2.7, -1.5, 0));
      titleText(kit.ts, "Mushroom — Basidiomycete (edible / poisonous)", new THREE.Vector3(0, 4.6, 0));
    } else if (sp === "marchantia") {
      // Ribbon-like thallus with gemma cups
      const thallus = new THREE.Mesh(new THREE.SphereGeometry(2.2, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), standardMaterial(0x16a34a));
      thallus.rotation.x = Math.PI;
      thallus.scale.y = 0.25;
      g.add(thallus);
      const cups: [number, number][] = [[-0.9, 0.3], [0.4, -0.7], [1.1, 0.5]];
      cups.forEach(([x, z]) => {
        const cup = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), standardMaterial(0x14532d));
        cup.position.set(x, 0.55, z);
        g.add(cup);
        kit.addLabel("#4ade80", "Gemma cup", "asexual reproduction — gemmae splash out", new THREE.Vector3(x + (x > 0 ? 1.9 : -1.9), 1.1, z));
      });
      kit.addLabel("#16a34a", "Dorsal thallus", "flat, dichotomously branched — liverwort (Bryophyta)", new THREE.Vector3(2.6, -0.8, -0.6));
      kit.addLabel("#a16207", "Rhizoids (ventral)", "anchor & absorb — no true roots", new THREE.Vector3(-2.6, -1.2, 0.4));
      kit.addLabel("#38bdf8", "Bryophyte traits", "no vascular tissue; water needed for fertilization", new THREE.Vector3(0, 2.6, 0));
      titleText(kit.ts, "Marchantia — liverwort (Bryophyta)", new THREE.Vector3(0, 3.7, 0));
    } else {
      // Pinus — male cone + needles
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 4.5, 12), standardMaterial(0x78350f));
      g.add(stem);
      for (let i = 0; i < 5; i++) {
        const whorl = new THREE.Mesh(new THREE.ConeGeometry(0.75 - i * 0.06, 1.1, 10, 1, true), standardMaterial(0x9a3412));
        whorl.position.y = 1.4 + i * 0.55;
        g.add(whorl);
      }
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 6), standardMaterial(0x15803d));
        needle.position.set(Math.cos(a) * 0.7, 2.9, Math.sin(a) * 0.7);
        needle.rotation.set(Math.sin(a) * 1.0, 0, -Math.cos(a) * 1.0);
        g.add(needle);
      }
      kit.addLabel("#9a3412", "Male cone", "microsporophylls bear pollen sacs", new THREE.Vector3(-2.4, 2.2, 0));
      kit.addLabel("#15803d", "Needle leaves", "reduced — reduce water loss", new THREE.Vector3(2.6, 3.2, 0));
      kit.addLabel("#facc15", "Gymnosperm", "naked seeds — ovules not inside an ovary", new THREE.Vector3(2.8, 1.0, 0));
      kit.addLabel("#f97316", "Wind pollination", "huge amounts of light pollen", new THREE.Vector3(-2.8, 0.6, 0));
      titleText(kit.ts, "Pinus — gymnosperm", new THREE.Vector3(0, 4.4, 0));
    }
  }, [sp]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {([["spirogyra", "Spirogyra"], ["mucor", "Mucor"], ["yeast", "Yeast"], ["mushroom", "Mushroom"], ["marchantia", "Marchantia"], ["pinus", "Pinus"]] as [Species, string][]).map(([k, name]) => (
          <Button key={k} size="sm" variant={sp === k ? "default" : "outline"} onClick={() => setSp(k)}>{name}</Button>
        ))}
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="Coenocytic = many nuclei, no cross-walls; gemma = multicellular asexual propagule; basidiocarp = mushroom fruiting body."
        look="Six syllabus genera with diagnostic structures: Spirogyra's ribbon chloroplast, Mucor's black sporangia on coenocytic hyphae, budding yeast cells, the mushroom's gills/annulus/underground mycelium, Marchantia's gemma cups, and Pinus's male cone with needle leaves."
        principle="They show the five-kingdom climb: Protista (Spirogyra), Fungi (Mucor, Yeast, Mushroom — heterotrophic, chitin walls), then Plantae: Bryophyta (Marchantia, no vascular tissue) → Gymnosperm (Pinus, naked seeds) → Angiosperm (flowers)."
        why="Economic importance: yeast in brewing/baking, mushrooms as food (deadly Amanita look-alikes!), Spirogyra indicates clean water, Pinus for timber and resin."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 5 — Biogeochemical cycles: carbon & nitrogen                    */
/* ------------------------------------------------------------------ */

type CycleNode = { label: string; sub?: string; color: number; pos: [number, number, number] };
type CycleEdge = { from: number; to: number; label: string };

const CYCLES: Record<"carbon" | "nitrogen", { nodes: CycleNode[]; edges: CycleEdge[] }> = {
  carbon: {
    nodes: [
      { label: "Atmosphere CO₂", sub: "0.04% of air", color: 0x94a3b8, pos: [0, 3.6, 0] },
      { label: "Plants (producers)", sub: "photosynthesis fixes CO₂", color: 0x22c55e, pos: [-3.8, 1.2, 0] },
      { label: "Animals (consumers)", sub: "respiration returns CO₂", color: 0xf97316, pos: [3.8, 1.2, 0] },
      { label: "Decomposers & soil", sub: "dead matter → CO₂", color: 0x78350f, pos: [-2.4, -1.9, 0] },
      { label: "Fossil fuels", sub: "coal, oil, gas", color: 0x64748b, pos: [2.4, -1.9, 0] },
    ],
    edges: [
      { from: 1, to: 0, label: "photosynthesis" },
      { from: 0, to: 2, label: "feeding / respiration" },
      { from: 2, to: 3, label: "death & waste" },
      { from: 3, to: 0, label: "decomposers respire" },
      { from: 3, to: 4, label: "millions of years" },
      { from: 4, to: 0, label: "combustion — extra CO₂ (greenhouse!)" },
    ],
  },
  nitrogen: {
    nodes: [
      { label: "Atmospheric N₂ (78%)", sub: "unreactive gas", color: 0x94a3b8, pos: [0, 3.6, 0] },
      { label: "Ammonia NH₃ / NH₄⁺", color: 0xfbbf24, pos: [-3.2, 0.8, 0] },
      { label: "Nitrites NO₂⁻ → Nitrates NO₃⁻", sub: "usable form for plants", color: 0x22c55e, pos: [0, -2.1, 0] },
      { label: "Plant protein", sub: "assimilation", color: 0x14b8a6, pos: [3.2, -0.9, 0] },
      { label: "Dead matter & excreta", color: 0x78350f, pos: [-2.2, -2.2, 1.6] },
    ],
    edges: [
      { from: 0, to: 1, label: "N-fixation: Rhizobium (root nodules), Azotobacter, lightning" },
      { from: 1, to: 2, label: "nitrification: Nitrosomonas → Nitrobacter" },
      { from: 4, to: 1, label: "ammonification: decomposers" },
      { from: 2, to: 3, label: "absorbed by roots" },
      { from: 3, to: 4, label: "feeding, death, excreta" },
      { from: 2, to: 0, label: "denitrification: Pseudomonas returns N₂" },
    ],
  },
};

const CyclesTab: React.FC = () => {
  const [cycle, setCycle] = useState<"carbon" | "nitrogen">("nitrogen");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const spec = CYCLES[cycle];
    spec.nodes.forEach((n) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 18), standardMaterial(n.color, { emissive: n.color, emissiveIntensity: 0.2 }));
      node.position.set(...n.pos);
      g.add(node);
      const hex = `#${n.color.toString(16).padStart(6, "0")}`;
      kit.addLabel(hex, n.label, n.sub, new THREE.Vector3(n.pos[0], n.pos[1] + 0.95, n.pos[2]));
    });
    spec.edges.forEach((e, i) => {
      const from = new THREE.Vector3(...spec.nodes[e.from].pos);
      const to = new THREE.Vector3(...spec.nodes[e.to].pos);
      const mid = from.clone().add(to).multiplyScalar(0.5);
      const dir = to.clone().sub(from);
      g.add(new LiveArrow(dir.clone().normalize(), from, dir.length() - 0.7, 0xfacc15, 0.28, 0.14));
      kit.addLabel("#facc15", e.label, undefined, mid.add(new THREE.Vector3((i % 2 === 0 ? 1 : -1) * 0.4, 0.3, 0)));
    });
    titleText(kit.ts, cycle === "carbon" ? "Carbon cycle" : "Nitrogen cycle", new THREE.Vector3(0, 5.6, 0));
  }, [cycle]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={cycle === "carbon" ? "default" : "outline"} onClick={() => setCycle("carbon")}>Carbon cycle</Button>
        <Button size="sm" variant={cycle === "nitrogen" ? "default" : "outline"} onClick={() => setCycle("nitrogen")}>Nitrogen cycle</Button>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="Biogeochemical cycle = circulation of an element between organisms (bio) and the environment (geo)."
        look="Yellow arrows trace each process between labelled reservoirs. In the carbon cycle, photosynthesis pulls CO₂ down while respiration and combustion push it back. In the nitrogen cycle, bacteria perform every key step: fixation, nitrification, ammonification and denitrification."
        principle="Carbon: CO₂ ↔ organic matter, balanced by photosynthesis vs respiration/combustion — the extra combustion CO₂ drives the greenhouse effect. Nitrogen: N₂ is unusable until bacteria (Rhizobium, Nitrosomonas, Nitrobacter, Pseudomonas) convert it through NH₃ → NO₂⁻ → NO₃⁻, which plants assimilate."
        why="Explains fertilizer use (nitrates), crop rotation with legumes (Rhizobium nodules), and why burning fossil fuels disturbs the carbon balance."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Suite export                                                        */
/* ------------------------------------------------------------------ */

export const Biology3DDiversitySuite: React.FC = () => {
  return (
    <Tabs defaultValue="biomolecules" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="biomolecules">Biomolecules &amp; Enzymes</TabsTrigger>
        <TabsTrigger value="bacteria">Prokaryotic Cell</TabsTrigger>
        <TabsTrigger value="flower">Flower Morphology</TabsTrigger>
        <TabsTrigger value="diversity">Floral Diversity</TabsTrigger>
        <TabsTrigger value="cycles">C &amp; N Cycles</TabsTrigger>
      </TabsList>
      <TabsContent value="biomolecules" className="mt-4"><BioMoleculesTab /></TabsContent>
      <TabsContent value="bacteria" className="mt-4"><BacteriaTab /></TabsContent>
      <TabsContent value="flower" className="mt-4"><FlowerTab /></TabsContent>
      <TabsContent value="diversity" className="mt-4"><DiversityTab /></TabsContent>
      <TabsContent value="cycles" className="mt-4"><CyclesTab /></TabsContent>
    </Tabs>
  );
};

export default Biology3DDiversitySuite;












