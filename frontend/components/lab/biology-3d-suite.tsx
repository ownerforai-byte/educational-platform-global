"use client";

/**
 * Biology 3D Suite — labelled 3D visualizations mapped to NEB Biology XI
 * (Bio. 201) units in official curriculum order:
 *   • Biomolecules and Cell Biology → Eukaryotic cell, cell division, DNA
 *   • Introductory Microbiology     → Bacteriophage structure
 *   • Ecology                       → Food chain & energy pyramid
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

/* ------------------------------------------------------------------ */
/* Shared scene kit                                                    */
/* ------------------------------------------------------------------ */

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
    <div ref={mountRef} aria-label="3D scene" className="relative h-[320px] w-full overflow-hidden rounded-md sm:h-[440px]" />
  ) : (
    <div className="flex h-[320px] items-center justify-center rounded-md border border-border bg-muted/30 text-sm text-muted-foreground sm:h-[440px]">
      WebGL is not available in this browser.
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TAB 1 — Eukaryotic cell (Biomolecules & Cell Biology)               */
/* ------------------------------------------------------------------ */

const CellTab: React.FC = () => {
  const [plant, setPlant] = useState(true);
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    g.add(new THREE.Mesh(new THREE.SphereGeometry(4, 48, 32),
      standardMaterial(0x38bdf8, { transparent: true, opacity: 0.14 })));
    if (plant) {
      g.add(new THREE.Mesh(new THREE.SphereGeometry(4.55, 48, 32),
        standardMaterial(0x22c55e, { transparent: true, opacity: 0.22 })));
    }
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(1.4, 32, 24), standardMaterial(0xa78bfa));
    nucleus.position.set(-1.3, 0.9, 0);
    const nucleolus = new THREE.Mesh(new THREE.SphereGeometry(0.45, 20, 16), standardMaterial(0x7c3aed));
    nucleolus.position.copy(nucleus.position);
    g.add(nucleus, nucleolus);
    // Chromatin threads (DNA + histone proteins) inside the nucleus
    const chromPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const a = i * 1.1;
      chromPts.push(new THREE.Vector3(
        nucleus.position.x + Math.cos(a) * 0.75 * (0.4 + 0.6 * Math.sin(i * 0.9)),
        nucleus.position.y + Math.sin(i * 1.7) * 0.5,
        nucleus.position.z + Math.sin(a) * 0.75 * (0.4 + 0.6 * Math.cos(i * 0.8))
      ));
    }
    g.add(new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(chromPts), 80, 0.035, 6),
      standardMaterial(0xc4b5fd)
    ));
    [[2.2, 1.6, -0.6, 0.5], [-2.4, -1.2, 1.1, -0.4], [0.6, -2.4, -1.4, 1.1]].forEach(([x, y, z, rot], mi) => {
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.9, 6, 12),
        standardMaterial(0xf97316, { emissive: 0xf97316, emissiveIntensity: 0.15 }));
      m.position.set(x, y, z);
      m.rotation.z = rot;
      g.add(m);
      if (mi === 0) {
        // Cristae — folds of the inner mitochondrial membrane (cut-away zig-zag)
        const crPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 6; i++) {
          crPts.push(new THREE.Vector3(-0.42 + i * 0.14, i % 2 === 0 ? -0.16 : 0.16, 0.3));
        }
        m.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(crPts),
          new THREE.LineBasicMaterial({ color: 0xfed7aa })
        ));
      }
    });
    if (plant) {
      [[1.8, -1.4, 1.2], [-0.6, 2.4, 1.5], [-2.6, 0.4, -1.3]].forEach(([x, y, z], ci) => {
        const c = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), standardMaterial(0x16a34a));
        c.position.set(x, y, z);
        c.scale.set(1, 0.55, 0.65);
        c.rotation.z = 0.4;
        g.add(c);
        if (ci === 0) {
          // Grana — stacks of thylakoid discs where the light reaction happens
          for (let i = 0; i < 4; i++) {
            const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.045, 18), standardMaterial(0x4ade80));
            disc.position.set(0, -0.12 + i * 0.08, 0);
            c.add(disc);
          }
        }
      });
      const vac = new THREE.Mesh(new THREE.SphereGeometry(1.15, 28, 20), standardMaterial(0x60a5fa, { transparent: true, opacity: 0.5 }));
      vac.position.set(1.5, -0.7, 0.4);
      g.add(vac);
      // Cell inclusion — starch grain (stored food)
      const starch = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), standardMaterial(0xfde68a));
      starch.position.set(-1.0, -2.6, 1.4);
      g.add(starch);
    } else {
      [[2.6, -0.9, 0.9], [-1.9, -2.2, -0.8]].forEach(([x, y, z]) => {
        const v = new THREE.Mesh(new THREE.SphereGeometry(0.35, 18, 14), standardMaterial(0x60a5fa, { transparent: true, opacity: 0.55 }));
        v.position.set(x, y, z);
        g.add(v);
      });
      const c1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.7, 12), standardMaterial(0xe2e8f0));
      c1.position.set(2.4, 0.6, 0.6);
      const c2 = c1.clone();
      c2.rotation.z = Math.PI / 2;
      c2.position.x += 0.45;
      g.add(c1, c2);
      // Flagellum (9+2 microtubule arrangement) — locomotion in motile cells
      const flag = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.02, 2.2, 8), standardMaterial(0xcbd5e1));
      flag.position.set(-3.6, -2.2, 0);
      flag.rotation.z = Math.PI / 2.4;
      g.add(flag);
    }
    const er = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.11, 10, 48), standardMaterial(0x0ea5e9));
    er.position.copy(nucleus.position);
    er.rotation.x = Math.PI / 2.6;
    g.add(er);
    for (let i = 0; i < 4; i++) {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.55 - i * 0.06, 0.55 - i * 0.06, 0.09, 20), standardMaterial(0xfbbf24));
      disc.position.set(2.5 + i * 0.08, -2.3 + i * 0.16, 0.2);
      disc.rotation.z = 0.35;
      g.add(disc);
    }
    [[-2.8, 1.9, 0.7], [1.1, 2.6, -1.0]].forEach(([x, y, z]) => {
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12),
        standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.2 }));
      l.position.set(x, y, z);
      g.add(l);
    });
    const rp: number[] = [];
    for (let i = 0; i < 90; i++) {
      const r = 3.4 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      rp.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
    }
    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute("position", new THREE.Float32BufferAttribute(rp, 3));
    g.add(new THREE.Points(rGeo, new THREE.PointsMaterial({ color: 0xf472b6, size: 0.07 })));
    titleText(kit.ts, plant ? "Plant Cell (eukaryotic)" : "Animal Cell (eukaryotic)", new THREE.Vector3(0, 5.4, 0));
    kit.addLabel("#a78bfa", "Nucleus", "control centre — stores DNA", new THREE.Vector3(-1.3, 2.6, 0));
    kit.addLabel("#c4b5fd", "Chromatin", "DNA + histone proteins → chromosomes", new THREE.Vector3(-2.7, 1.3, 1.5));
    kit.addLabel("#7c3aed", "Nucleolus", "site of ribosome synthesis", new THREE.Vector3(-0.3, 0.3, 1.4));
    kit.addLabel("#f97316", "Mitochondria", "ATP powerhouse — cristae hold enzymes", new THREE.Vector3(2.2, 2.9, -0.6));
    kit.addLabel("#0ea5e9", "Rough ER", "transport channel, studded with ribosomes", new THREE.Vector3(-3.8, -0.2, 0));
    kit.addLabel("#fbbf24", "Golgi body", "modifies, packs & secretes proteins", new THREE.Vector3(2.9, -3.4, 0.2));
    kit.addLabel("#ef4444", "Lysosome", "suicide bag — digests waste & worn organelles", new THREE.Vector3(-2.8, 2.9, 0.7));
    kit.addLabel("#f472b6", "Ribosomes (70S/80S)", "protein synthesis", new THREE.Vector3(3.4, 0.8, 1.6));
    kit.addLabel("#38bdf8", "Cell membrane", "fluid-mosaic, selectively permeable", new THREE.Vector3(0.2, -4.4, 0));
    kit.addLabel("#94a3b8", "Cytoplasm", "cytosol — medium for organelle reactions", new THREE.Vector3(-4.3, -1.7, 1.2));
    if (plant) {
      kit.addLabel("#22c55e", "Cell wall", "dead, rigid cellulose — fully permeable", new THREE.Vector3(-3.4, 3.9, 0));
      kit.addLabel("#16a34a", "Chloroplast", "plastid — grana do the light reaction", new THREE.Vector3(2.9, -0.9, 1.2));
      kit.addLabel("#60a5fa", "Central vacuole", "cell sap — turgor pressure", new THREE.Vector3(1.5, -2.3, 0.4));
      kit.addLabel("#fde68a", "Starch grain", "cell inclusion — stored food", new THREE.Vector3(-1.0, -3.4, 1.4));
    } else {
      kit.addLabel("#e2e8f0", "Centrosome", "2 centrioles (9+0) — division poles", new THREE.Vector3(2.9, 1.5, 0.6));
      kit.addLabel("#cbd5e1", "Flagellum", "9+2 microtubules — locomotion", new THREE.Vector3(-4.5, -3.3, 0));
    }
  }, [plant]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" variant={plant ? "default" : "outline"} onClick={() => setPlant(true)}>Plant cell</Button>
        <Button size="sm" variant={!plant ? "default" : "outline"} onClick={() => setPlant(false)}>Animal cell</Button>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look={plant ? "A rigid green cell wall outside the membrane, green chloroplasts with grana stacks, one large blue central vacuole and a yellow starch grain — the signatures of a plant cell." : "No cell wall or chloroplasts; note the two pale centrioles (division poles) and the thin flagellum for locomotion."}
        vocabulary="Chromatin = uncoiled DNA + histones; cristae = inner-membrane folds of mitochondria; grana = thylakoid stacks inside chloroplasts."
        principle="Eukaryotic cells have membrane-bound organelles. The nucleus stores DNA (chromatin inside, nucleolus makes ribosomes); mitochondria release ATP on their cristae; chloroplasts capture light on their grana; the ER and Golgi make, transport and package proteins; lysosomes digest waste."
        why="Organelle structure explains function — muscle cells are packed with mitochondria (many cristae), leaf cells with chloroplasts (many grana)."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 2 — Cell division: mitosis vs meiosis                           */
/* ------------------------------------------------------------------ */

type Stage = 0 | 1 | 2 | 3;
const STAGE_NAMES = ["Prophase", "Metaphase", "Anaphase", "Telophase"] as const;

function makeChromosome(color: number): THREE.Group {
  const chr = new THREE.Group();
  const mat = standardMaterial(color, { emissive: color, emissiveIntensity: 0.12 });
  const a1 = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.62, 4, 8), mat);
  a1.rotation.z = 0.55;
  const a2 = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.62, 4, 8), mat);
  a2.rotation.z = -0.55;
  const centro = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), standardMaterial(0xfef08a));
  chr.add(a1, a2, centro);
  return chr;
}

const DivisionTab: React.FC = () => {
  const [stage, setStage] = useState<Stage>(1);
  const [meiosis, setMeiosis] = useState(false);
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    g.add(new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.07, 10, 64),
      standardMaterial(0x38bdf8, { transparent: true, opacity: 0.5 })));
    const poleL = new THREE.Vector3(-3.1, 0, 0);
    const poleR = new THREE.Vector3(3.1, 0, 0);
    [poleL, poleR].forEach((p) => {
      for (let i = -2; i <= 2; i++) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([p, new THREE.Vector3(i * 0.8, 0, 0)]),
          new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 })
        );
        g.add(line);
      }
    });
    const colors = [0xf97316, 0x22c55e, 0x38bdf8, 0xa78bfa];
    const pairs: [THREE.Vector3, THREE.Vector3][] =
      stage === 0
        ? [[new THREE.Vector3(-1.4, 1.1, 0), new THREE.Vector3(1.5, -0.9, 0)], [new THREE.Vector3(1.2, 1.4, 0), new THREE.Vector3(-1.2, -1.4, 0)]]
        : stage === 1
          ? [[new THREE.Vector3(-1.1, 0, 0), new THREE.Vector3(1.1, 0, 0)], [new THREE.Vector3(-2.2, 0, 0), new THREE.Vector3(2.2, 0, 0)]]
          : stage === 2
            ? [[poleL.clone().add(new THREE.Vector3(0.5, 0.5, 0)), poleR.clone().add(new THREE.Vector3(-0.5, -0.5, 0))], [poleL.clone().add(new THREE.Vector3(0.5, -0.5, 0)), poleR.clone().add(new THREE.Vector3(-0.5, 0.5, 0))]]
            : [[new THREE.Vector3(-3.2, 0, 0), new THREE.Vector3(3.2, 0, 0)], [new THREE.Vector3(-2.2, 0, 0), new THREE.Vector3(2.2, 0, 0)]];
    pairs.forEach(([p1, p2], i) => {
      const c1 = makeChromosome(colors[i]);
      c1.position.copy(p1);
      c1.rotation.z = stage === 1 ? Math.PI / 2 : 0;
      const c2 = makeChromosome(colors[i]);
      c2.position.copy(p2);
      c2.rotation.z = stage === 1 ? Math.PI / 2 : 0;
      g.add(c1, c2);
    });
    if (stage === 3) {
      [-1.7, 1.7].forEach((x) => {
        const cell = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.06, 8, 48), standardMaterial(0x38bdf8, { transparent: true, opacity: 0.6 }));
        cell.position.x = x;
        g.add(cell);
      });
      if (meiosis) {
        [-1.9, -0.65, 0.65, 1.9].forEach((x) => {
          const cell = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.05, 8, 32), standardMaterial(0xf97316, { transparent: true, opacity: 0.8 }));
          cell.position.set(x, -2.6, 0);
          g.add(cell);
        });
        kit.addLabel("#f97316", "4 haploid cells (n)", "after meiosis II", new THREE.Vector3(0, -4.2, 0));
      }
    }
    kit.addLabel("#38bdf8", "Cell (plasma membrane)", undefined, new THREE.Vector3(0, 5.0, 0));
    kit.addLabel("#f97316", stage === 1 ? "Chromosomes at equator" : "Chromosomes (2 pairs, 2n = 4)", undefined, new THREE.Vector3(0, -1.9, 1.4));
    kit.addLabel("#94a3b8", "Spindle fibres", "from centrosome poles", new THREE.Vector3(-3.9, 1.8, 0));
    kit.addLabel("#fef08a", "Centromere", "yellow dot — holds sister chromatids", new THREE.Vector3(2.6, 1.6, 1.2));
    kit.addLabel("#fdba74", "Chromatid arms", "2 identical sister chromatids per chromosome", new THREE.Vector3(-3.2, -1.1, 1.2));
    if (stage === 0) {
      kit.addLabel("#fca5a5", meiosis ? "Prophase I: homologues pair (bivalent/tetrad)" : "Prophase: chromatin coils into chromosomes", meiosis ? "crossing over here → genetic variation" : "nuclear envelope & nucleolus disappear", new THREE.Vector3(0, 3.4, 1.7));
    } else if (stage === 1) {
      kit.addLabel("#fca5a5", "Metaphase plate", "chromosomes single-file on the equator", new THREE.Vector3(0, 1.9, 2.0));
    } else if (stage === 2) {
      kit.addLabel("#fca5a5", "Anaphase: centromeres split", "spindle fibres pull chromatids to opposite poles", new THREE.Vector3(0, 3.0, 1.7));
    } else {
      kit.addLabel("#fca5a5", meiosis ? "Telophase I → meiosis II" : "Telophase: cytokinesis", meiosis ? "2 haploid cells, then 4" : "nuclear envelope & nucleolus reform", new THREE.Vector3(0, 3.4, 1.7));
    }
    titleText(kit.ts, `${meiosis ? "Meiosis" : "Mitosis"} — ${STAGE_NAMES[stage]}`, new THREE.Vector3(0, 6.2, 0));
  }, [stage, meiosis]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" variant={!meiosis ? "default" : "outline"} onClick={() => setMeiosis(false)}>Mitosis</Button>
        <Button size="sm" variant={meiosis ? "default" : "outline"} onClick={() => setMeiosis(true)}>Meiosis</Button>
        <span className="mx-1 h-5 w-px bg-border" />
        {STAGE_NAMES.map((s, i) => (
          <Button key={s} size="sm" variant={stage === i ? "default" : "outline"} onClick={() => setStage(i as Stage)}>
            {i + 1}. {s}
          </Button>
        ))}
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="X-shaped chromosomes move: scattered (prophase) → single file at the equator (metaphase) → pulled to poles (anaphase) → two cells (telophase)."
        predict="Switch to Meiosis: the chromosome number halves. In telophase, four haploid cells (n) appear below the dividing cell."
        principle="Mitosis: 2n → 2n (growth & repair, two identical cells). Meiosis: 2n → n (gametes; four genetically different cells — variation comes from crossing over in prophase I)."
        why="Chromosome-number mistakes in meiosis cause disorders such as Down syndrome (trisomy 21)."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 3 — DNA double helix                                            */
/* ------------------------------------------------------------------ */

const BASE_COLORS: Record<string, number> = { A: 0xef4444, T: 0x3b82f6, G: 0x22c55e, C: 0xfbbf24 };
const PAIR: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
const SEQUENCE = "ATGCCGTAAGCTTACGGATC";

const DnaTab: React.FC = () => {
  const [speed, setSpeed] = useState(0.6);
  const { mountRef, webGL } = useLabScene((kit) => {
    const helix = new THREE.Group();
    kit.ts.group.add(helix);
    const N = 60;
    const steps: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < N; i++) {
      const a = i * 0.4;
      const y = -6.2 + i * 0.21;
      const p1 = new THREE.Vector3(Math.cos(a) * 1.8, y, Math.sin(a) * 1.8);
      const p2 = new THREE.Vector3(Math.cos(a + Math.PI) * 1.8, y, Math.sin(a + Math.PI) * 1.8);
      steps.push([p1, p2] as [THREE.Vector3, THREE.Vector3]);
    }
    // Backbones (sugar-phosphate) as tube curves
    [0, Math.PI].forEach((off) => {
      const pts = steps.map(([p1, p2]) => (off === 0 ? p1 : p2).clone());
      const curve = new THREE.CatmullRomCurve3(pts);
      helix.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.07, 8), standardMaterial(0x94a3b8, { metalness: 0.4 })));
    });
    // Base pairs (rungs)
    for (let i = 0; i < N; i += 2) {
      const b = SEQUENCE[(i / 2) % SEQUENCE.length];
      const [p1, p2] = steps[i];
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dir = p2.clone().sub(p1);
      const len = dir.length();
      const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, len, 8), standardMaterial(BASE_COLORS[b], { emissive: BASE_COLORS[b], emissiveIntensity: 0.18 }));
      rung.position.copy(mid);
      rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      helix.add(rung);
      // Hydrogen-bond dots: 2 for A=T, 3 for G≡C (dir is normalized above)
      const hb = b === "A" || b === "T" ? 2 : 3;
      for (let h = 0; h < hb; h++) {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        dot.position.copy(mid).addScaledVector(dir, -0.12 + h * 0.12);
        helix.add(dot);
      }
      // Base letters on some rungs
      if (i % 6 === 0) {
        kit.addLabel(`#${BASE_COLORS[b].toString(16).padStart(6, "0")}`, `${b} — ${PAIR[b]}`, "H-bonded pair", mid.clone().add(new THREE.Vector3(0.35, 0.2, 0.35)), helix);
      }
    }
    kit.addLabel("#94a3b8", "Sugar-phosphate backbone", "phosphate + deoxyribose, antiparallel 5′→3′ / 3′→5′", new THREE.Vector3(0, 6.4, 0));
    kit.addLabel("#e2e8f0", "H-bonds (white dots)", "A=T ×2, G≡C ×3 — rungs held together", new THREE.Vector3(-2.9, 0.2, 1.2));
    kit.addLabel("#f97316", "Purines: A, G", "double-ring bases", new THREE.Vector3(2.9, -1.2, 1.0));
    kit.addLabel("#3b82f6", "Pyrimidines: C, T", "single-ring bases", new THREE.Vector3(-2.9, -1.2, 1.0));
    kit.addLabel("#facc15", "Dimensions", "Ø 2 nm, one turn = 3.4 nm = 10 bp", new THREE.Vector3(2.9, 1.2, -1.0));
    kit.addLabel("#a78bfa", "Major groove", "where proteins bind", new THREE.Vector3(2.4, 2.4, 0.8));
    kit.addLabel("#60a5fa", "Minor groove", undefined, new THREE.Vector3(-2.4, -2.4, -0.8));
    titleText(kit.ts, "DNA Double Helix", new THREE.Vector3(0, 7.4, 0));
    return (t: number) => {
      helix.rotation.y = t * speed;
    };
  }, [speed]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Label className="w-28 shrink-0 text-xs">Rotation speed</Label>
        <Slider value={[speed]} min={0} max={2} step={0.1} onValueChange={(v) => setSpeed(v[0])} className="max-w-xs" />
        <span className="text-xs text-muted-foreground">{speed.toFixed(1)}×</span>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="Two grey sugar-phosphate backbones twist into a right-handed double helix; coloured rungs are A–T (red/blue) and G–C (green/yellow) base pairs, joined by the white hydrogen-bond dots — 2 dots for A=T, 3 for G≡C."
        principle="Complementary base pairing by hydrogen bonds: A = T (2 bonds) and G ≡ C (3 bonds), a purine always pairs with a pyrimidine. One full turn ≈ 3.4 nm containing ~10 base pairs — the basis of semi-conservative replication."
        why="Base-pairing rules let DNA copy itself exactly, which is why DNA (not protein) carries hereditary information."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 4 — Bacteriophage (Introductory Microbiology)                   */
/* ------------------------------------------------------------------ */

const PhageTab: React.FC = () => {
  const [contracted, setContracted] = useState(false);
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    // Capsid (head) — icosahedral
    const head = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 0), standardMaterial(0x38bdf8, { transparent: true, opacity: 0.85 }));
    head.position.y = 2.6;
    g.add(head);
    head.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.72, 0), new THREE.MeshBasicMaterial({ color: 0x7dd3fc, wireframe: true })));
    // DNA coil inside head
    const dnaPts: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      const a = i * 0.55;
      dnaPts.push(new THREE.Vector3(Math.cos(a) * 0.7, 2.6 + Math.sin(i * 0.8) * 0.75, Math.sin(a) * 0.7));
    }
    const dnaCurve = new THREE.CatmullRomCurve3(dnaPts);
    const dnaMat = standardMaterial(0xf43f5e, { emissive: 0xf43f5e, emissiveIntensity: 0.3 });
    g.add(new THREE.Mesh(new THREE.TubeGeometry(dnaCurve, 100, 0.05, 6), dnaMat));
    if (contracted) {
      // DNA tube pushed through the sheath into the host
      const inject = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.4, 8), dnaMat);
      inject.position.set(0, 0.7, 0);
      g.add(inject);
    }
    // Collar + whiskers
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.18, 20), standardMaterial(0xfbbf24));
    collar.position.y = 0.72;
    g.add(collar);
    for (const side of [-1, 1]) {
      const wh = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.02, 6, 24, Math.PI), standardMaterial(0xfbbf24));
      wh.position.set(side * 0.55, 0.78, 0);
      wh.rotation.y = Math.PI / 2;
      wh.rotation.x = side * 0.6;
      g.add(wh);
    }
    // Inner tail tube (core) — dsDNA travels through it into the host
    const tubeLen = contracted ? 1.1 : 2.2;
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, tubeLen, 10), standardMaterial(0xfda4af));
    tube.position.y = 0.72 - 0.09 - tubeLen / 2;
    g.add(tube);
    // Sheath (contracts on injection)
    const sheathLen = contracted ? 0.9 : 2.2;
    const sheath = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, sheathLen, 16), standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: contracted ? 0.35 : 0.05 }));
    sheath.position.y = 0.72 - 0.09 - sheathLen / 2;
    g.add(sheath);
    // Base plate
    const baseY = 0.72 - 0.18 - sheathLen;
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.16, 24), standardMaterial(0x22c55e));
    plate.position.y = baseY;
    g.add(plate);
    // Six tail fibres
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const start = new THREE.Vector3(Math.cos(a) * 0.7, baseY, Math.sin(a) * 0.7);
      const bend = new THREE.Vector3(Math.cos(a) * 1.8, baseY - 0.5, Math.sin(a) * 1.8);
      const tip = new THREE.Vector3(Math.cos(a) * 2.1, baseY - 1.2, Math.sin(a) * 2.1);
      const curve = new THREE.QuadraticBezierCurve3(start, bend, tip);
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.045, 6), standardMaterial(0x94a3b8)));
    }
    // Bacterial surface
    const bact = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 48), standardMaterial(0x1e3a8a, { transparent: true, opacity: 0.55 }));
    bact.position.y = baseY - 1.3;
    g.add(bact);
    kit.addLabel("#7dd3fc", "Capsid (head)", "icosahedral protein coat — protects dsDNA", new THREE.Vector3(2.6, 3.9, 0));
    kit.addLabel("#f43f5e", "dsDNA", "genetic material, injected into host", new THREE.Vector3(-2.8, 3.6, 0));
    kit.addLabel("#fbbf24", contracted ? "Sheath (contracted)" : "Sheath", "contractile tail — acts like a syringe", new THREE.Vector3(1.9, 0, 0));
    kit.addLabel("#fda4af", "Tail tube (core)", "DNA passes through into the cytoplasm", new THREE.Vector3(3.2, 0.9, 0));
    kit.addLabel("#fbbf24", "Collar & whiskers", "sense the host surface", new THREE.Vector3(-1.9, 0.9, 0));
    kit.addLabel("#22c55e", "Base plate", "anchors after fibre attachment", new THREE.Vector3(2.0, baseY, 0));
    kit.addLabel("#94a3b8", "Tail fibres", "recognize host cell-wall receptors", new THREE.Vector3(-2.9, baseY - 1.0, 0));
    kit.addLabel("#3b82f6", "Bacterial cell surface", "E. coli host", new THREE.Vector3(0, baseY - 2.4, 0));
    if (contracted) {
      kit.addLabel("#fca5a5", "Next: biosynthesis → maturation → lysis", "lytic cycle after penetration", new THREE.Vector3(0, baseY + 4.4, 0));
    }
    titleText(kit.ts, contracted ? "Bacteriophage — injecting DNA" : "Bacteriophage (T-even) — attached", new THREE.Vector3(0, 6.0, 0));
  }, [contracted]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" variant={contracted ? "default" : "outline"} onClick={() => setContracted((c) => !c)}>
          {contracted ? "Reset (attached)" : "Contract sheath & inject DNA"}
        </Button>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="Capsid = protein coat; sheath = contractile tail; virulent phage reproduces by the lytic cycle only."
        look="The pink DNA coil sits inside the blue icosahedral capsid. Press the button: the yellow sheath shortens and a pink DNA tube is pushed through the base plate into the host bacterium."
        principle="Bacteriophages have no metabolism of their own — they inject DNA and hijack the host: attachment → penetration → biosynthesis → maturation → lysis (lytic cycle), or integration as prophage (lysogenic cycle)."
        why="Phage structure proved that DNA (not protein) is the genetic material — the Hershey–Chase blender experiment (1952)."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 5 — Ecosystem: food chain & energy pyramid (Ecology)            */
/* ------------------------------------------------------------------ */

const EcosystemTab: React.FC = () => {
  const [mode, setMode] = useState<"chain" | "pyramid">("chain");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    if (mode === "chain") {
      const sun = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 18), standardMaterial(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.9 }));
      sun.position.set(-6, 4.6, 0);
      g.add(sun);
      const ground = new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 6), standardMaterial(0x14532d));
      ground.position.y = -0.15;
      g.add(ground);
      const levels = [
        { name: "Grass", sub: "Producer (T1)", color: 0x22c55e, x: -5, shape: "flat" as const },
        { name: "Grasshopper", sub: "Primary consumer (T2)", color: 0xa3e635, x: -2.5, shape: "small" as const },
        { name: "Frog", sub: "Secondary consumer (T3)", color: 0x14b8a6, x: 0, shape: "small" as const },
        { name: "Snake", sub: "Tertiary consumer (T4)", color: 0xf97316, x: 2.5, shape: "long" as const },
        { name: "Eagle", sub: "Quaternary consumer (T5)", color: 0xa16207, x: 5, shape: "bird" as const },
      ];
      levels.forEach((l, i) => {
        let mesh: THREE.Mesh;
        if (l.shape === "flat") {
          mesh = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.4, 8), standardMaterial(l.color));
          mesh.position.set(l.x, 0.7, 0);
        } else if (l.shape === "long") {
          mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 1.2, 6, 12), standardMaterial(l.color));
          mesh.position.set(l.x, 1.6, 0);
          mesh.rotation.z = -Math.PI / 2.6;
        } else if (l.shape === "bird") {
          mesh = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), standardMaterial(l.color));
          mesh.position.set(l.x, 3.2, 0);
        } else {
          mesh = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), standardMaterial(l.color));
          mesh.position.set(l.x, 1.0, 0);
        }
        g.add(mesh);
        kit.addLabel(`#${l.color.toString(16).padStart(6, "0")}`, l.name, l.sub, new THREE.Vector3(l.x, mesh.position.y + 1.0, 0));
        if (i < levels.length - 1) {
          const from = new THREE.Vector3(l.x + 0.6, mesh.position.y, 0);
          const to = new THREE.Vector3(levels[i + 1].x - 0.7, levels[i + 1].shape === "bird" ? 3.2 : 1.0, 0);
          g.add(new THREE.ArrowHelper(to.clone().sub(from).normalize(), from, to.distanceTo(from) - 0.4, 0xfacc15, 0.28, 0.14));
        }
      });
      // Decomposers recycle nutrients back to the soil
      const decomp = new THREE.Mesh(new THREE.BoxGeometry(16, 0.35, 2.4), standardMaterial(0x78350f, { transparent: true, opacity: 0.8 }));
      decomp.position.set(0, -0.62, 2.0);
      g.add(decomp);
      kit.addLabel("#fbbf24", "Sunlight", "ultimate energy source — fixed by photosynthesis", new THREE.Vector3(-6, 6.0, 0));
      kit.addLabel("#22c55e", "Autotroph (producer)", "makes its own food", new THREE.Vector3(-5, -1.35, 0));
      kit.addLabel("#a16207", "Heterotrophs (consumers)", "depend on other organisms for food", new THREE.Vector3(3.8, -1.35, 0));
      kit.addLabel("#f87171", "At each arrow: ~90% energy lost as heat", "used in respiration at every level", new THREE.Vector3(-1.5, 4.9, 0));
      kit.addLabel("#fbbf24", "Decomposers (fungi & bacteria)", "break down dead matter → nutrient cycling", new THREE.Vector3(3.4, -1.9, 2.0));
      titleText(kit.ts, "Grazing Food Chain (energy flow →)", new THREE.Vector3(0, 6.8, 0));
    } else {
      // Energy pyramid — 10% law
      const tiers = [
        { label: "T1 Producers", energy: "100%", w: 7.2, color: 0x22c55e },
        { label: "T2 Herbivores", energy: "10%", w: 5.2, color: 0x84cc16 },
        { label: "T3 Carnivores", energy: "1%", w: 3.4, color: 0xfacc15 },
        { label: "T4 Top carnivores", energy: "0.1%", w: 1.8, color: 0xf97316 },
      ];
      tiers.forEach((t, i) => {
        const y = 0.55 + i * 1.15;
        const box = new THREE.Mesh(new THREE.BoxGeometry(t.w, 1.0, 2.6), standardMaterial(t.color, { transparent: true, opacity: 0.85 }));
        box.position.y = y;
        g.add(box);
        kit.addLabel(`#${t.color.toString(16).padStart(6, "0")}`, t.label, `${t.energy} energy`, new THREE.Vector3(0, y + 0.85, 1.4));
      });
      kit.addLabel("#facc15", "Lindeman 10% law", "energy lost as heat at each transfer", new THREE.Vector3(4.6, 2.4, 0));
      kit.addLabel("#84cc16", "Producers", "fix solar energy (gross primary productivity)", new THREE.Vector3(-4.8, 0.55, 0));
      kit.addLabel("#f87171", "Respiration", "most assimilated energy escapes as heat", new THREE.Vector3(-4.8, 2.85, 0));
      kit.addLabel("#38bdf8", "Numbers & biomass pyramids", "can invert (one tree → many insects), but the ENERGY pyramid never does", new THREE.Vector3(-4.8, 4.15, 0));
      titleText(kit.ts, "Pyramid of Energy (always upright)", new THREE.Vector3(0, 5.6, 0));
    }
  }, [mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" variant={mode === "chain" ? "default" : "outline"} onClick={() => setMode("chain")}>Food chain</Button>
        <Button size="sm" variant={mode === "pyramid" ? "default" : "outline"} onClick={() => setMode("pyramid")}>Energy pyramid</Button>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="Chain: yellow arrows trace energy from sunlight → grass → grasshopper → frog → snake → eagle. Pyramid: tiers shrink upward because energy is lost at every transfer."
        principle="Only ~10% of the energy at one trophic level reaches the next (Lindeman's 10% law); the rest is lost as heat via respiration. That is why food chains rarely exceed 4–5 levels and the pyramid of energy is always upright."
        why="Explains why top predators are rare and why short food chains support larger harvests — the basis of fisheries and agriculture management."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Suite export                                                        */
/* ------------------------------------------------------------------ */

export const Biology3DSuite: React.FC = () => {
  return (
    <Tabs defaultValue="cell" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="cell">Eukaryotic Cell</TabsTrigger>
        <TabsTrigger value="division">Cell Division</TabsTrigger>
        <TabsTrigger value="dna">DNA Double Helix</TabsTrigger>
        <TabsTrigger value="phage">Bacteriophage</TabsTrigger>
        <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
      </TabsList>
      <TabsContent value="cell" className="mt-4"><CellTab /></TabsContent>
      <TabsContent value="division" className="mt-4"><DivisionTab /></TabsContent>
      <TabsContent value="dna" className="mt-4"><DnaTab /></TabsContent>
      <TabsContent value="phage" className="mt-4"><PhageTab /></TabsContent>
      <TabsContent value="ecosystem" className="mt-4"><EcosystemTab /></TabsContent>
    </Tabs>
  );
};

export default Biology3DSuite;








