"use client";

/**
 * Biology Syllabus Suite 3D — fills the last empty NEB biology units with
 * REAL WebGL scenes (three.js), one tab per unit that previously had no 3D:
 *
 *   Introductory Microbiology · Vegetation · Strategies for Food Production ·
 *   Microbes in Human Welfare · Biotechnology: Principles · Biotechnology:
 *   Applications · Organisms & Environment · Biodiversity & Conservation ·
 *   Environmental Issues
 *
 * Every scene follows the platform-wide rules:
 *  - Arrow-free SVG leader lines (createLeaderLayer) connect each CSS2D chip
 *    to the exact part it names (perpendicular tip terminators, no arrowheads).
 *  - The reveal bar (createRevealBar) lets a teacher reveal labels ONE BY ONE
 *    (◉ Reveal → Next +1 …), show them all at once, or hide them again.
 *  - TheoryPanel (Look → Principle → Why) grounds each scene in the NEB text.
 */

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import {
  createLeaderLayer,
  createRevealBar,
  type LeaderLayer,
} from "@/components/lab/leader-lines";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  titleText,
  type ThreeScene,
  type ThreeSceneOptions,
} from "@/components/lab/three-scene";
import { isWebGLAvailable } from "@/lib/webgl";
import { VizToolbar, type VizTarget, type VizTargetRef } from "@/components/viz/viz-toolbar";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dna, Microscope, Trees, FlaskConical, Recycle, Syringe, Globe2, ShieldCheck, Factory, Bug,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Kit — scene + CSS2D chips + SVG leader lines + reveal bar           */
/* ------------------------------------------------------------------ */

type LeaderConn = { label: THREE.Object3D; target: THREE.Vector3; color: string };

type Kit = {
  ts: ThreeScene;
  mount: HTMLElement;
  labelRenderer: CSS2DRenderer;
  leader: LeaderLayer | null;
  connections: LeaderConn[];
  /** chip at `pos` + optional arrow-free leader line to `target` */
  addLbl: (
    color: string, title: string, sub: string | undefined,
    pos: THREE.Vector3, target?: THREE.Vector3,
  ) => void;
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
  labelRenderer.domElement.style.cssText =
    "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
  mount.appendChild(labelRenderer.domElement);

  let leader: LeaderLayer | null = null;
  try { leader = createLeaderLayer(mount); } catch { leader = null; }
  if (leader) {
    try { createRevealBar(mount, leader); } catch { /* non-fatal */ }
  }

  const connections: LeaderConn[] = [];
  return {
    ts,
    mount,
    labelRenderer,
    leader,
    connections,
    addLbl(color, title, sub, pos, target) {
      const o = new CSS2DObject(chipEl(color, title, sub));
      o.position.copy(pos);
      ts.group.add(o);
      if (target) connections.push({ label: o, target: target.clone(), color });
    },
  };
}

function disposeKit(kit: Kit) {
  kit.leader?.dispose();
  kit.labelRenderer.domElement.remove();
  disposeThreeScene(kit.ts);
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
    kit.leader?.draw(kit.ts.camera, kit.connections);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

function useLabScene(
  build: (kit: Kit) => void | ((t: number) => void),
  deps: unknown[],
): { mountRef: React.RefObject<HTMLDivElement | null>; webGL: boolean; vizTargetRef: VizTargetRef } {
  const vizTargetRef = useRef<VizTarget>({});
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;
    const kit = setupKit(mount);
    vizTargetRef.current = {
      controls: kit.ts.controls,
      el: mount,
      canvasEl: kit.ts.renderer.domElement,
      render: () => {
        kit.ts.renderer.render(kit.ts.scene, kit.ts.camera);
        kit.labelRenderer.render(kit.ts.scene, kit.ts.camera);
        kit.leader?.draw(kit.ts.camera, kit.connections);
      },
    };
    const tick = build(kit);
    const stop = runLoop(kit, tick ?? undefined);
    const offResize = bindResize(kit.ts);
    const onResize = () => kit.labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      offResize();
      disposeKit(kit);
      vizTargetRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, ...deps]);
  return { mountRef, webGL, vizTargetRef };
}

function CanvasMount({ mountRef, webGL, targetRef }: {
  mountRef: React.RefObject<HTMLDivElement | null>;
  webGL: boolean;
  targetRef: VizTargetRef;
}) {
  return webGL ? (
    <div ref={mountRef} aria-label="3D scene" className="relative w-full h-80 sm:h-96 md:h-[clamp(320px,60vh,620px)] overflow-hidden rounded-md">
      <VizToolbar targetRef={targetRef} />
    </div>
  ) : (
    <div className="flex w-full h-80 sm:h-96 items-center justify-center rounded-md border border-border bg-muted/30 text-sm text-muted-foreground">
      WebGL is not available in this browser.
    </div>
  );
}

/* shared small builders */
const cyl = (r1: number, r2: number, h: number, c: number, op = 1) =>
  new THREE.Mesh(
    new THREE.CylinderGeometry(r1, r2, h, 20),
    op < 1 ? standardMaterial(c, { transparent: true, opacity: op }) : standardMaterial(c),
  );
const sph = (r: number, c: number, op = 1) =>
  new THREE.Mesh(
    new THREE.SphereGeometry(r, 22, 16),
    op < 1 ? standardMaterial(c, { transparent: true, opacity: op }) : standardMaterial(c),
  );

/* ------------------------------------------------------------------ */
/* TAB 1 — Introductory Microbiology                                   */
/* ------------------------------------------------------------------ */

const MicrobiologyTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* bacterium (Gram-negative rod) */
    const body = cyl(0.85, 0.85, 2.6, 0xef4444, 0.35);
    g.add(body);
    const cap = sph(0.85, 0xf87171, 0.25);
    cap.scale.set(1, 0.62, 1); cap.position.y = 1.3; g.add(cap);
    const cap2 = cap.clone(); cap2.position.y = -1.3; g.add(cap2);
    const wall = cyl(0.95, 0.95, 2.7, 0xf97316, 0.28);
    g.add(wall);
    const memb = cyl(0.78, 0.78, 2.55, 0xfacc15, 0.4);
    g.add(memb);
    /* nucleoid (knotted circular DNA) */
    const nucleoid = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.34, 0.1, 64, 10),
      standardMaterial(0xfbbf24),
    );
    g.add(nucleoid);
    /* plasmid ring */
    const plasmid = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.045, 10, 28), standardMaterial(0xf472b6));
    plasmid.position.set(0.42, -0.5, 0.2); plasmid.rotation.x = Math.PI / 2.4;
    g.add(plasmid);
    /* 70S ribosomes */
    const ribo = new THREE.Group();
    for (let i = 0; i < 26; i++) {
      const r = sph(0.055, 0x38bdf8);
      r.position.set(
        (Math.random() - 0.5) * 1.15,
        (Math.random() - 0.5) * 2.1,
        (Math.random() - 0.5) * 1.15,
      );
      ribo.add(r);
    }
    g.add(ribo);
    /* flagellum — helical, spins */
    const flagPts: THREE.Vector3[] = [];
    for (let t = 0; t < Math.PI * 6; t += 0.2) {
      flagPts.push(new THREE.Vector3(
        0.16 * Math.cos(t * 2.2),
        1.45 + (t / (Math.PI * 6)) * -2.4,
        0.16 * Math.sin(t * 2.2),
      ));
    }
    const flag = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(flagPts),
      new THREE.LineBasicMaterial({ color: 0x67e8f9 }),
    );
    flag.position.y = -1.4;
    g.add(flag);
    /* pili */
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const pilus = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.8, 6),
        standardMaterial(0x94a3b8),
      );
      pilus.position.set(Math.cos(a) * 1.05, 0.4 - (i % 3) * 0.5, Math.sin(a) * 1.05);
      pilus.rotation.z = Math.cos(a) * 0.9;
      pilus.rotation.x = Math.sin(a) * 0.9;
      g.add(pilus);
    }
    /* virus (icosahedral) for contrast */
    const virus = new THREE.Group();
    const virusMat = standardMaterial(0xa78bfa);
    virusMat.flatShading = true;
    virus.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), virusMat));
    for (let i = 0; i < 10; i++) {
      const dir = new THREE.Vector3().randomDirection();
      const spike = cyl(0.03, 0.05, 0.22, 0xc4b5fd);
      spike.position.copy(dir.clone().multiplyScalar(0.62));
      spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      virus.add(spike);
    }
    virus.position.set(3.6, 0.6, 0.4);
    g.add(virus);

    kit.addLbl("#f87171", "Capsule / slime layer", "sticky shield against WBCs", new THREE.Vector3(-3.3, 2.6, 0), new THREE.Vector3(-0.6, 1.55, 0));
    kit.addLbl("#f97316", "Cell wall (LPS + thin peptidoglycan)", "Gram-negative envelope", new THREE.Vector3(-3.6, -1.9, 0), new THREE.Vector3(-0.95, -0.9, 0));
    kit.addLbl("#facc15", "Plasma membrane", "selectively permeable", new THREE.Vector3(3.4, 2.4, 0), new THREE.Vector3(0.7, 1.0, 0.3));
    kit.addLbl("#fbbf24", "Nucleoid — circular DNA", "no nuclear membrane, no histones", new THREE.Vector3(-2.2, 3.3, 0), new THREE.Vector3(0, 0.1, 0));
    kit.addLbl("#f472b6", "Plasmid", "extra DNA — used as vector in genetic engineering", new THREE.Vector3(2.9, -2.7, 0), plasmid.position);
    kit.addLbl("#38bdf8", "70S ribosomes", "protein synthesis", new THREE.Vector3(3.9, -0.9, 0), new THREE.Vector3(0.5, -0.2, 0.4));
    kit.addLbl("#67e8f9", "Flagellum", "rotates like a motor — locomotion", new THREE.Vector3(-2.9, -3.4, 0), new THREE.Vector3(0, -2.6, 0));
    kit.addLbl("#a78bfa", "Virus — icosahedral capsid", "acellular · obligate parasite", new THREE.Vector3(4.6, 2.8, 0), new THREE.Vector3(3.6, 1.0, 0.4));
    titleText(kit.ts, "Introductory Microbiology — bacterial cell & virus", new THREE.Vector3(0, 4.6, 0));

    return (t: number) => {
      nucleoid.rotation.y = t * 0.7;
      plasmid.rotation.z = t * 1.1;
      flag.rotation.y = t * 5;
      virus.rotation.y = t * 0.5;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — bacterial cell & virus"
        look="Translucent red rod: outer slime capsule → orange wall → yellow membrane → dark cytoplasm holding a golden knotted DNA nucleoid, a pink plasmid ring, blue 70S ribosome dots, spinning cyan flagellum below and grey pili around. A faceted purple icosahedral virus with spikes floats beside it."
        principle="Prokaryotes lack a nuclear membrane and membrane-bound organelles; the nucleoid holds circular DNA, plasmids carry accessory genes, 70S ribosomes build protein, and the bacterial flagellum rotates rather than whipping. Viruses are acellular — capsid + nucleic acid only, inert outside a host."
        why="Explains Gram staining, antibiotic targets (wall, ribosome), plasmid vectors in biotechnology, and why viruses need living cells to multiply."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 2 — Vegetation (altitudinal belts)                              */
/* ------------------------------------------------------------------ */

const VegetationTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* ground steps rising left→right (Terai → Hills → Mountain) */
    const grounds: [number, number, number][] = [
      [-4.6, 0.35, 0x166534], [0, 1.15, 0x15803d], [4.6, 1.95, 0x475569],
    ];
    grounds.forEach(([x, y, c]) => {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.5, 4.2), standardMaterial(c));
      slab.position.set(x, y - 0.25, 0);
      g.add(slab);
    });
    /* wet evergreen: tall trunks, layered canopy */
    for (let i = 0; i < 4; i++) {
      const x = -6 + i * 1.0, z = (i % 2 ? 0.7 : -0.7);
      const trunk = cyl(0.09, 0.13, 2.4, 0x78350f);
      trunk.position.set(x, 1.55, z); g.add(trunk);
      for (let L = 0; L < 3; L++) {
        const canopy = sph(0.62 - L * 0.12, 0x22c55e, 0.92);
        canopy.position.set(x, 2.4 + L * 0.5, z);
        canopy.scale.y = 0.7;
        g.add(canopy);
      }
    }
    /* deciduous: broad crowns, autumn tint */
    for (let i = 0; i < 3; i++) {
      const x = -2.2 + i * 1.9, z = i % 2 ? 0.5 : -0.5;
      const trunk = cyl(0.08, 0.12, 1.5, 0x92400e);
      trunk.position.set(x, 1.9, z); g.add(trunk);
      const crown = sph(0.75, 0xf59e0b, 0.95);
      crown.position.set(x, 3.0, z); crown.scale.y = 0.85;
      g.add(crown);
    }
    /* mountain snow peak */
    const peakMat = standardMaterial(0xe2e8f0);
    peakMat.flatShading = true;
    const peak = new THREE.Mesh(new THREE.ConeGeometry(1.7, 3.2, 6), peakMat);
    peak.position.set(4.6, 3.9, 0);
    g.add(peak);
    /* alpine conifers: slim stacked cones */
    for (let i = 0; i < 3; i++) {
      const x = 3.0 + i * 1.1, z = i % 2 ? 0.9 : -0.9;
      const con = new THREE.Mesh(new THREE.ConeGeometry(0.34, 1.5, 7), standardMaterial(0x047857));
      con.position.set(x, 2.95, z);
      g.add(con);
    }

    kit.addLbl("#4ade80", "Wet evergreen — Terai (<1000 m)", "Sal, Khair · multi-layer canopy", new THREE.Vector3(-5.4, 4.6, 0), new THREE.Vector3(-5.0, 3.2, 0));
    kit.addLbl("#fbbf24", "Deciduous — Hills (1000–2000 m)", "Castanopsis, Schima — sheds in dry season", new THREE.Vector3(-1.1, 5.0, 0), new THREE.Vector3(-0.3, 3.7, 0));
    kit.addLbl("#e2e8f0", "Alpine & snow — >3000 m", "treeline gives way to snow", new THREE.Vector3(4.4, 6.3, 0), new THREE.Vector3(4.6, 5.1, 0));
    kit.addLbl("#34d399", "Conifers (pine, fir)", "needle leaves resist cold", new THREE.Vector3(6.2, 3.4, 0), new THREE.Vector3(4.1, 3.0, 0.9));
    kit.addLbl("#a3a3a3", "Altitudinal zonation", "climate changes with height", new THREE.Vector3(0.6, -1.6, 2.2), new THREE.Vector3(0, 0.2, 1.8));
    titleText(kit.ts, "Vegetation — mountain vegetation belts of Nepal", new THREE.Vector3(0, 6.9, 0));
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — vegetation belts"
        look="Three rising green terraces: dark multi-layered evergreen with tall trunks, an amber-crowned deciduous belt, then slim dark conifers beside a pale snow cone on the highest step."
        principle="Vegetation changes with altitude and moisture: tropical wet evergreen in the Terai, subtropical/temperate deciduous in the hills, coniferous and alpine scrub above, then snow. Each belt's leaf form (broad, deciduous, needle) is an adaptation to its climate."
        why="Links climate, soil and flora for biogeography questions; explains Nepal's forest types and why species like Sal or Rhododendron are belt-specific."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 3 — Strategies for Food Production                              */
/* ------------------------------------------------------------------ */

const FoodProductionTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* pot with soil + rooted cutting */
    const pot = cyl(0.62, 0.44, 0.9, 0xb45309);
    pot.position.set(-4.2, 0.45, 0); g.add(pot);
    const soil = cyl(0.58, 0.58, 0.12, 0x4d2f17);
    soil.position.set(-4.2, 0.93, 0); g.add(soil);
    const stem = cyl(0.06, 0.07, 1.5, 0x22c55e);
    stem.position.set(-4.2, 1.75, 0); g.add(stem);
    const leaf = sph(0.3, 0x4ade80);
    leaf.scale.set(1, 0.45, 0.6); leaf.position.set(-3.9, 2.3, 0); g.add(leaf);
    const roots = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const r = cyl(0.02, 0.035, 0.7, 0xd6d3d1);
      r.position.set(-4.2 + Math.cos(a) * 0.18, 0.05, Math.sin(a) * 0.18);
      r.rotation.z = Math.cos(a) * 0.7; r.rotation.x = Math.sin(a) * 0.7;
      roots.add(r);
    }
    g.add(roots);
    /* graft: two joined stems with waxed junction */
    const stock = cyl(0.09, 0.11, 1.7, 0x92400e);
    stock.position.set(-1.2, 0.85, 0); g.add(stock);
    const scion = cyl(0.07, 0.08, 1.3, 0x65a30d);
    scion.position.set(-1.2, 2.3, 0); g.add(scion);
    const wax = sph(0.16, 0xfbbf24);
    wax.scale.y = 0.7; wax.position.set(-1.2, 1.7, 0); g.add(wax);
    /* flower: anther + stigma for pollination / hybridisation */
    const flower = new THREE.Group();
    const rec = cyl(0.07, 0.09, 1.6, 0x15803d);
    flower.add(rec);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const petal = sph(0.34, 0xf472b6, 0.95);
      petal.scale.set(1, 0.3, 0.62);
      petal.position.set(Math.cos(a) * 0.42, 1.15, Math.sin(a) * 0.42);
      petal.rotation.y = -a;
      flower.add(petal);
    }
    const ovary = sph(0.2, 0x4ade80);
    ovary.position.y = 1.05; flower.add(ovary);
    const stigma = sph(0.12, 0xfde047);
    stigma.position.y = 1.5; flower.add(stigma);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const anther = sph(0.08, 0xf97316);
      anther.position.set(Math.cos(a) * 0.18, 1.42, Math.sin(a) * 0.18);
      flower.add(anther);
    }
    flower.position.set(2.6, 0.0, 0);
    g.add(flower);
    /* bee pollinator */
    const bee = new THREE.Group();
    bee.add(sph(0.16, 0xfacc15));
    const stripe1 = cyl(0.165, 0.165, 0.05, 0x1c1917);
    stripe1.rotation.z = Math.PI / 2; bee.add(stripe1);
    bee.position.set(2.6, 1.9, 0.6);
    g.add(bee);

    kit.addLbl("#4ade80", "Stem cutting", "auxin-treated node → roots grow", new THREE.Vector3(-5.8, 3.2, 0), new THREE.Vector3(-4.2, 1.8, 0));
    kit.addLbl("#d6d3d1", "New adventitious roots", "dip in IBA powder", new THREE.Vector3(-6.3, -1.4, 0), new THREE.Vector3(-4.2, 0.1, 0));
    kit.addLbl("#fbbf24", "Graft junction (waxed)", "stock rootstock + scion unite", new THREE.Vector3(-2.6, 3.4, 0), new THREE.Vector3(-1.2, 1.7, 0));
    kit.addLbl("#fde047", "Stigma", "receives chosen pollen", new THREE.Vector3(1.6, 3.6, 0), new THREE.Vector3(2.6, 1.5, 0));
    kit.addLbl("#f97316", "Anthers", "pollen source for cross", new THREE.Vector3(4.3, 2.9, 0), new THREE.Vector3(2.9, 1.42, 0.1));
    kit.addLbl("#f472b6", "Pollinator / hybridisation", "improves yield & vigour", new THREE.Vector3(5.2, 0.9, 0), new THREE.Vector3(2.6, 1.9, 0.6));
    titleText(kit.ts, "Food Production — plant breeding & propagation", new THREE.Vector3(0, 5.4, 0));

    return (t: number) => {
      bee.position.x = 2.6 + Math.sin(t * 1.4) * 0.5;
      bee.position.z = 0.6 + Math.cos(t * 1.4) * 0.4;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — propagation & breeding"
        look="A potted stem cutting with pale new roots, a waxed graft joining two stems, and a pink flower with orange anthers and yellow stigma as a striped bee circles it."
        principle="Food production is boosted by asexual propagation (cutting, layering, grafting — clones of elite stock), sexual breeding (selection, hybridisation, polyploidy) and animal husbandry; success depends on matching genotype to environment."
        why="Explains how farmers multiply seedless/mosaic-resistant varieties, why grafted mangoes fruit early, and how hybrids raise yields — core NEB applied-biology marks."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 4 — Microbes in Human Welfare                                   */
/* ------------------------------------------------------------------ */

const MicrobesWelfareTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* fermenter */
    const vessel = cyl(1.25, 1.25, 2.8, 0x38bdf8, 0.3);
    vessel.position.y = 1.4; g.add(vessel);
    const broth = cyl(1.15, 1.15, 2.1, 0x7c3aed, 0.55);
    broth.position.y = 1.15; g.add(broth);
    const lid = cyl(1.35, 1.35, 0.22, 0x94a3b8);
    lid.position.y = 2.9; g.add(lid);
    const stirrer = cyl(0.05, 0.05, 2.6, 0xcbd5e1);
    stirrer.position.y = 1.5; g.add(stirrer);
    const blades = new THREE.Group();
    for (let i = 0; i < 2; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.16), standardMaterial(0xe2e8f0));
      b.rotation.y = i * Math.PI / 2;
      blades.add(b);
    }
    blades.position.y = 0.7; g.add(blades);
    /* CO2 bubbles */
    const bubbles = new THREE.Group();
    const bubbleSeeds: THREE.Vector3[] = [];
    for (let i = 0; i < 14; i++) {
      const b = sph(0.05 + Math.random() * 0.05, 0xe0f2fe, 0.75);
      const seed = new THREE.Vector3((Math.random() - 0.5) * 1.7, Math.random() * 2.2 - 1.0, (Math.random() - 0.5) * 1.7);
      bubbleSeeds.push(seed.clone());
      b.position.copy(seed);
      bubbles.add(b);
    }
    g.add(bubbles);
    /* tap */
    const tap = cyl(0.07, 0.07, 0.5, 0x64748b);
    tap.rotation.z = Math.PI / 2;
    tap.position.set(1.45, 0.45, 0); g.add(tap);
    /* curd cup beside */
    const cup = cyl(0.4, 0.3, 0.55, 0xf8fafc, 0.85);
    cup.position.set(-3.3, 0.28, 0.4); g.add(cup);
    const curd = cyl(0.36, 0.34, 0.34, 0xfef9c3);
    curd.position.set(-3.3, 0.3, 0.4); g.add(curd);
    /* biogas dome */
    const dome = sph(1.0, 0x22c55e, 0.4);
    dome.scale.y = 0.62; dome.position.set(3.7, 0.25, 0); g.add(dome);
    const slurry = cyl(1.5, 1.7, 0.5, 0x3f6212, 0.8);
    slurry.position.set(3.7, -0.1, 0); g.add(slurry);
    const gasPipe = cyl(0.05, 0.05, 1.4, 0x94a3b8);
    gasPipe.position.set(3.7, 1.4, 0); g.add(gasPipe);

    kit.addLbl("#7c3aed", "Fermentation broth", "yeast → wine · Lactobacillus → curd", new THREE.Vector3(-2.6, 3.9, 0), new THREE.Vector3(0, 1.4, 0));
    kit.addLbl("#e2e8f0", "Stirrer paddles", "keep O₂ and microbes even", new THREE.Vector3(2.6, 3.3, 0), new THREE.Vector3(0, 0.75, 0));
    kit.addLbl("#e0f2fe", "CO₂ bubbles", "fermentation gas rising", new THREE.Vector3(-2.9, 1.9, 0), new THREE.Vector3(-0.6, 1.6, 0.5));
    kit.addLbl("#94a3b8", "Harvest tap", "draw off product", new THREE.Vector3(2.9, 0.1, 0), new THREE.Vector3(1.45, 0.45, 0));
    kit.addLbl("#fef9c3", "Curd — Lactobacillus", "lactic acid sours milk", new THREE.Vector3(-4.6, 1.8, 0), new THREE.Vector3(-3.3, 0.45, 0.4));
    kit.addLbl("#22c55e", "Biogas dome (methanogens)", "Cow dung → CH₄ fuel", new THREE.Vector3(5.6, 2.6, 0), new THREE.Vector3(3.7, 0.7, 0));
    kit.addLbl("#4d7c0f", "Slurry inlet", "dung + water anaerobic", new THREE.Vector3(4.8, -1.6, 0), new THREE.Vector3(3.7, -0.15, 0));
    titleText(kit.ts, "Microbes in Human Welfare — fermenter, curd & biogas", new THREE.Vector3(0, 5.3, 0));

    return (t: number) => {
      blades.rotation.y = t * 3.2;
      bubbles.children.forEach((b, i) => {
        const seed = bubbleSeeds[i];
        const u = (t * 0.5 + i / 14) % 1;
        b.position.set(seed.x, seed.y + u * 1.6, seed.z);
        (b as THREE.Mesh).scale.setScalar(1 - u * 0.35);
      });
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — microbial products"
        look="A glass-blue fermenter with purple broth, spinning paddles and rising CO₂ bubbles; a yellow curd cup on the left; a green biogas dome on a dung slurry base with a gas pipe."
        principle="Microbes convert substrates industrially: yeasts ferment sugars to ethanol and CO₂, Lactobacillus sours milk into curd, and methanogens digest dung anaerobically into methane biogas. Stirring, temperature and aeration control the product."
        why="These are the classic NEB examples of microbial products — antibiotics, beverages, dairy, biogas and sewage treatment — and show why aseptic, controlled fermentation matters."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 5 — Biotechnology: Principles & Processes                       */
/* ------------------------------------------------------------------ */

const BiotechPrinciplesTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* plasmid vector */
    const plasmid = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.13, 14, 48), standardMaterial(0xf472b6));
    g.add(plasmid);
    /* restriction cut gap marker (glowing notch) */
    const notch = sph(0.16, 0xf97316);
    notch.position.set(1.0, 0, 0); g.add(notch);
    /* DNA insert (double helix) above */
    const helix = new THREE.Group();
    const strandA: THREE.Vector3[] = [], strandB: THREE.Vector3[] = [];
    for (let t = 0; t < Math.PI * 4; t += 0.18) {
      strandA.push(new THREE.Vector3(0.28 * Math.cos(t), -1.2 + t * 0.32, 0.28 * Math.sin(t)));
      strandB.push(new THREE.Vector3(-0.28 * Math.cos(t), -1.2 + t * 0.32, -0.28 * Math.sin(t)));
    }
    helix.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(strandA), new THREE.LineBasicMaterial({ color: 0x38bdf8 })));
    helix.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(strandB), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
    for (let i = 0; i < strandA.length; i += 4) {
      const rung = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, strandA[i].distanceTo(strandB[i]), 6),
        standardMaterial(0xa5f3fc),
      );
      rung.position.copy(strandA[i]).add(strandB[i]).multiplyScalar(0.5);
      rung.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), strandB[i].clone().sub(strandA[i]).normalize(),
      );
      helix.add(rung);
    }
    helix.position.set(0, 1.1, 0);
    g.add(helix);
    /* ligase blob sealing the insert into the plasmid */
    const ligase = sph(0.22, 0x4ade80, 0.9);
    ligase.position.set(-1.0, 0.1, 0); g.add(ligase);
    /* host bacterium ghost */
    const host = cyl(0.9, 0.9, 2.0, 0xef4444, 0.16);
    host.position.set(3.6, 0.2, 0); g.add(host);
    const hostCap = sph(0.9, 0xf87171, 0.14);
    hostCap.scale.y = 0.6; hostCap.position.set(3.6, 1.2, 0); g.add(hostCap);
    const hostCap2 = hostCap.clone(); hostCap2.position.y = -0.8; g.add(hostCap2);
    /* recombinant plasmid inside host */
    const recom = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.07, 10, 32), standardMaterial(0xfbbf24));
    recom.position.set(3.6, 0.2, 0);
    recom.rotation.x = Math.PI / 3;
    g.add(recom);

    kit.addLbl("#f472b6", "Plasmid vector", "small circular DNA carrier", new THREE.Vector3(-3.4, 1.9, 0), new THREE.Vector3(-0.8, 0.35, 0.2));
    kit.addLbl("#f97316", "EcoRI restriction site", "'molecular scissors' cut sticky ends", new THREE.Vector3(3.3, 2.6, 0), notch.position);
    kit.addLbl("#38bdf8", "DNA insert (gene of interest)", "human insulin gene, Bt gene…", new THREE.Vector3(-3.2, -1.6, 0), new THREE.Vector3(0, 0.9, 0));
    kit.addLbl("#4ade80", "DNA ligase", "'molecular glue' seals backbone", new THREE.Vector3(2.9, -1.9, 0), ligase.position);
    kit.addLbl("#ef4444", "Competent host E. coli", "CaCl₂ + heat shock uptake", new THREE.Vector3(5.6, 2.3, 0), new THREE.Vector3(3.6, 1.2, 0));
    kit.addLbl("#fbbf24", "Recombinant plasmid", "vector + insert = rDNA", new THREE.Vector3(5.8, -1.7, 0), new THREE.Vector3(3.6, 0.35, 0.1));
    titleText(kit.ts, "Biotechnology Principles — recombinant DNA construction", new THREE.Vector3(0, 4.4, 0));

    return (t: number) => {
      plasmid.rotation.z = t * 0.5;
      recom.rotation.z = -t * 0.8;
      helix.rotation.y = t * 0.8;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — recombinant DNA"
        look="A pink plasmid ring with an orange cut notch, a blue DNA helix descending toward it, a green ligase blob sealing the join, and a translucent host cell holding the finished golden recombinant ring."
        principle="rDNA technology: restriction endonucleases cut vector and insert at specific palindromic sites leaving sticky ends; DNA ligase joins them; the recombinant vector transforms a competent host, selected by marker genes, and multiplies the gene (cloning)."
        why="This is the founding process behind insulin, vaccines, Golden Rice and Bt crops — the standard long-question in NEB Class 12 biotechnology."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 6 — Biotechnology & Its Applications                            */
/* ------------------------------------------------------------------ */

const BiotechApplicationsTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* PCR thermocycler: three temperature wells */
    const temps = [
      { c: 0xef4444, y: 1.4, label: 94 },
      { c: 0x3b82f6, y: 0.0, label: 55 },
      { c: 0x22c55e, y: -1.4, label: 72 },
    ];
    const wells: THREE.Mesh[] = [];
    temps.forEach((tp) => {
      const well = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.42, 24), standardMaterial(tp.c));
      well.position.set(-2.6, tp.y, 0);
      g.add(well); wells.push(well);
    });
    /* DNA tube hopping between wells */
    const tube = cyl(0.2, 0.2, 0.5, 0xe2e8f0, 0.85);
    g.add(tube);
    /* multiplying copies */
    const copies = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const c = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 8, 20), standardMaterial(0xa78bfa));
      const a = (i / 12) * Math.PI * 2;
      c.position.set(0.4 + Math.cos(a) * (0.6 + (i % 3) * 0.55), Math.sin(a) * (0.6 + (i % 3) * 0.4), (i % 2) * 0.3);
      c.rotation.x = a;
      copies.add(c);
    }
    copies.position.set(2.2, 0, 0);
    g.add(copies);
    /* insulin vial */
    const vial = cyl(0.3, 0.3, 0.8, 0x67e8f9, 0.55);
    vial.position.set(4.9, 0.4, 0); g.add(vial);
    const vialCap = cyl(0.32, 0.32, 0.14, 0xfacc15);
    vialCap.position.set(4.9, 0.88, 0); g.add(vialCap);
    /* Bt cotton plant */
    const bt = new THREE.Group();
    const btStem = cyl(0.06, 0.08, 1.6, 0x166534);
    btStem.position.y = 0.8; bt.add(btStem);
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2;
      const lf = sph(0.24, 0x4ade80);
      lf.scale.set(1, 0.4, 0.6);
      lf.position.set(Math.cos(a) * 0.32, 0.8 + (i % 2) * 0.45, Math.sin(a) * 0.32);
      lf.rotation.y = -a;
      bt.add(lf);
    }
    for (let i = 0; i < 3; i++) {
      const bol = sph(0.12, 0xf8fafc);
      bol.position.set(0.3 * (i - 1), 1.7, 0.05);
      bt.add(bol);
    }
    bt.position.set(4.9, -1.7, -0.6);
    bt.scale.setScalar(0.9);
    g.add(bt);

    kit.addLbl("#ef4444", "Denaturation 94 °C", "strands separate", new THREE.Vector3(-4.6, 2.6, 0), new THREE.Vector3(-2.6, 1.5, 0));
    kit.addLbl("#3b82f6", "Annealing 55 °C", "primers bind", new THREE.Vector3(-4.8, 0.0, 0), new THREE.Vector3(-2.6, 0, 0));
    kit.addLbl("#22c55e", "Extension 72 °C", "Taq polymerase copies", new THREE.Vector3(-4.6, -2.6, 0), new THREE.Vector3(-2.6, -1.5, 0));
    kit.addLbl("#a78bfa", "DNA copies ×2ⁿ", "30 cycles → billion-fold", new THREE.Vector3(2.2, 2.9, 0), new THREE.Vector3(2.2, 0.8, 0));
    kit.addLbl("#67e8f9", "Human insulin", "transgenic bacteria produce it", new THREE.Vector3(6.2, 1.9, 0), new THREE.Vector3(4.9, 0.55, 0));
    kit.addLbl("#f8fafc", "Bt cotton", "cry gene kills bollworm", new THREE.Vector3(6.4, -2.2, 0), new THREE.Vector3(5.1, -1.1, -0.6));
    titleText(kit.ts, "Biotechnology Applications — PCR, insulin & Bt crops", new THREE.Vector3(0, 4.4, 0));

    return (t: number) => {
      const phase = Math.floor(t / 2) % 3;
      tube.position.set(-2.6 + Math.sin(t * 2.2) * 1.4, temps[phase].y + 0.5, 0.35);
      copies.rotation.y = t * 0.6;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — PCR & applications"
        look="A PCR block with red/blue/green temperature wells, a sample tube hopping between them, a halo of multiplying purple DNA rings, a cyan insulin vial and a white-bolled Bt cotton plant."
        principle="PCR amplifies DNA through denaturation (94 °C), primer annealing (55 °C) and Taq-driven extension (72 °C), doubling copies each cycle. Applications include therapeutics (insulin, gene therapy), transgenic crops (Bt toxin) and diagnostics (ELISA, DNA probes)."
        why="Links biotech principles to real products: PCR in forensics and COVID testing, Humulin from engineered bacteria, and pest-resistant Bt cotton — high-yield NEB answers."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 7 — Organisms & Environment (population interactions)           */
/* ------------------------------------------------------------------ */

const OrganismsEnvironmentTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* ground */
    const ground = new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 6), standardMaterial(0x14532d));
    ground.position.y = -0.2; g.add(ground);
    /* grass (herbivory) */
    const grass = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const blade = cyl(0.02, 0.035, 0.5, 0x4ade80);
      blade.position.set(-4.6 + (i % 5) * 0.22, 0.25, -1.6 + Math.floor(i / 5) * 0.4);
      blade.rotation.z = (i % 2 ? 0.25 : -0.25);
      grass.add(blade);
    }
    g.add(grass);
    /* cattle */
    const cow = new THREE.Group();
    cow.add(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.55), standardMaterial(0xf8fafc)));
    const cowHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), standardMaterial(0xf1f5f9));
    cowHead.position.set(0.72, 0.28, 0); cow.add(cowHead);
    for (let i = 0; i < 4; i++) {
      const leg = cyl(0.06, 0.06, 0.4, 0xe2e8f0);
      leg.position.set((i % 2 ? 0.35 : -0.35), -0.45, (i < 2 ? 0.2 : -0.2));
      cow.add(leg);
    }
    cow.position.set(-3.4, 0.75, -1.3);
    g.add(cow);
    /* tick on cow (parasitism) */
    const tick = sph(0.07, 0x7f1d1d);
    tick.position.set(-3.5, 1.08, -1.1);
    g.add(tick);
    /* predator fish chain (pond side) */
    const pond = cyl(2.3, 2.3, 0.25, 0x0ea5e9, 0.45);
    pond.position.set(2.9, 0.12, 0.6);
    g.add(pond);
    const smallFish = sph(0.14, 0xfbbf24);
    smallFish.scale.set(1.5, 0.6, 0.5); smallFish.position.set(2.3, 0.3, 0.6);
    g.add(smallFish);
    const bigFish = new THREE.Group();
    const bf = sph(0.3, 0x64748b);
    bf.scale.set(1.7, 0.7, 0.5); bigFish.add(bf);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.35, 4), standardMaterial(0x475569));
    tail.rotation.z = Math.PI / 2; tail.position.x = -0.62; bigFish.add(tail);
    bigFish.position.set(3.4, 0.3, 0.6);
    g.add(bigFish);
    /* bee + flower (mutualism) */
    const flower2 = new THREE.Group();
    const stemF = cyl(0.04, 0.05, 1.0, 0x15803d);
    stemF.position.y = 0.5; flower2.add(stemF);
    const head = sph(0.24, 0xf472b6);
    head.position.y = 1.05; flower2.add(head);
    flower2.position.set(-0.7, 0.2, 1.6);
    g.add(flower2);
    const bee2 = sph(0.1, 0xfacc15);
    bee2.position.set(-0.4, 1.35, 1.7);
    g.add(bee2);
    /* competition: two overlapping shrubs */
    const shrubA = sph(0.4, 0x22c55e, 0.8);
    shrubA.position.set(-0.4, 0.4, -0.6);
    const shrubB = sph(0.4, 0x84cc16, 0.7);
    shrubB.position.set(0.25, 0.4, -0.6);
    g.add(shrubA, shrubB);

    kit.addLbl("#4ade80", "Herbivory — cow grazes grass", "producer → consumer energy flow", new THREE.Vector3(-5.6, 2.9, 0), new THREE.Vector3(-3.8, 0.5, -1.5));
    kit.addLbl("#7f1d1d", "Parasitism — tick on cow", "+ / − : tick feeds, host harmed", new THREE.Vector3(-5.3, -1.9, 0), tick.position);
    kit.addLbl("#64748b", "Predation — big fish eats small", "+ / − regulates populations", new THREE.Vector3(5.9, 2.6, 0), new THREE.Vector3(3.1, 0.35, 0.6));
    kit.addLbl("#facc15", "Mutualism — bee & flower", "+ / + pollination for nectar", new THREE.Vector3(-1.9, 3.1, 0), new THREE.Vector3(-0.6, 1.25, 1.7));
    kit.addLbl("#84cc16", "Competition — shrubs overlap", "− / − for light, water, space", new THREE.Vector3(1.9, -1.9, 0), new THREE.Vector3(-0.1, 0.45, -0.6));
    kit.addLbl("#0ea5e9", "Pond ecosystem", "habitat patch", new THREE.Vector3(5.4, -0.8, 0), new THREE.Vector3(4.2, 0.15, 0.6));
    titleText(kit.ts, "Organisms & Environment — population interactions", new THREE.Vector3(0, 4.3, 0));

    return (t: number) => {
      smallFish.position.x = 2.3 + Math.sin(t * 2.1) * 0.5;
      bigFish.position.x = 3.4 + Math.sin(t * 1.6) * 0.8;
      bee2.position.y = 1.35 + Math.sin(t * 4) * 0.08;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — population interactions"
        look="A green field: white cow grazing grass with a red tick on its back, a pond where a grey fish chases a golden one, a bee hovering at a pink flower, and two overlapping shrubs competing."
        principle="Interspecific interactions: predation (+/−) controls prey numbers and drives defences; parasitism (+/−); competition (−/−) follows Gause's competitive exclusion; mutualism (+/+) benefits both, as in pollination and mycorrhizae."
        why="These interactions structure communities and energy flow — the core of NEB ecology and common in ecosystem-management questions."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 8 — Biodiversity & Conservation                                 */
/* ------------------------------------------------------------------ */

const BiodiversityTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* species-richness bars */
    const barData = [
      { h: 1.0, c: 0x38bdf8, label: "Plants" },
      { h: 2.2, c: 0x22c55e, label: "Insects" },
      { h: 1.4, c: 0xfbbf24, label: "Fishes" },
      { h: 0.9, c: 0xf97316, label: "Birds" },
      { h: 0.6, c: 0xf87171, label: "Mammals" },
    ];
    barData.forEach((b, i) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.55, b.h, 0.55), standardMaterial(b.c));
      bar.position.set(-3.4 + i * 1.05, b.h / 2 + 0.25, -1.2);
      g.add(bar);
    });
    /* in-situ reserve: fenced forest patch */
    const reserve = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.3, 2.2), standardMaterial(0x166534));
    reserve.position.set(0.6, 0.15, 1.9);
    g.add(reserve);
    for (let i = 0; i < 3; i++) {
      const tree = sph(0.34, 0x4ade80);
      tree.position.set(-0.4 + i * 0.8, 0.85, 1.9);
      tree.scale.y = 1.3;
      g.add(tree);
    }
    const postMat = standardMaterial(0xd6d3d1);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const post = cyl(0.03, 0.03, 0.55, 0xd6d3d1);
      post.position.set(0.6 + Math.cos(a) * 1.3, 0.55, 1.9 + Math.sin(a) * 1.1);
      g.add(post);
    }
    /* ex-situ: seed vault dome */
    const vault = sph(0.8, 0xe2e8f0, 0.55);
    vault.scale.y = 0.6;
    vault.position.set(3.6, 0.3, 1.9);
    g.add(vault);
    const vaultDoor = cyl(0.3, 0.3, 0.1, 0xfacc15);
    vaultDoor.rotation.x = Math.PI / 2;
    vaultDoor.position.set(3.6, 0.3, 2.62);
    g.add(vaultDoor);
    /* threatened red panda (simplified) */
    const panda = new THREE.Group();
    panda.add(new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.35, 6, 12), standardMaterial(0xdc2626)));
    const pHead = sph(0.17, 0xf87171);
    pHead.position.set(0.3, 0.14, 0); panda.add(pHead);
    panda.position.set(0.4, 0.75, 1.6);
    g.add(panda);

    kit.addLbl("#22c55e", "Species richness", "biodiversity at 3 levels: genes, species, ecosystems", new THREE.Vector3(-4.8, 3.4, 0), new THREE.Vector3(-2.35, 1.6, -1.2));
    kit.addLbl("#ef4444", "Threatened species", "IUCN Red List — habitat loss chief cause", new THREE.Vector3(-2.6, -1.6, 0), panda.position);
    kit.addLbl("#4ade80", "In-situ conservation", "reserve protects habitat in place", new THREE.Vector3(-0.4, 2.9, 0), new THREE.Vector3(0.6, 0.9, 1.9));
    kit.addLbl("#e2e8f0", "Ex-situ conservation", "seed bank, zoo, tissue culture off-site", new THREE.Vector3(5.6, 2.4, 0), new THREE.Vector3(3.6, 0.5, 1.9));
    kit.addLbl("#facc15", "Hotspots", "Eastern Himalaya — high endemism + loss", new THREE.Vector3(3.4, -1.7, 0), new THREE.Vector3(0.6, 0.3, 1.9));
    titleText(kit.ts, "Biodiversity & Conservation — levels, threats, strategies", new THREE.Vector3(0, 4.4, 0));

    return (t: number) => { panda.rotation.y = Math.sin(t * 0.8) * 0.6; };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — biodiversity & conservation"
        look="Five species-richness bars, a fenced green reserve with trees and a red panda, and a pale ex-situ vault dome with a golden door."
        principle="Biodiversity spans genetic, species and ecosystem levels; it peaks in the tropics and at ecotones. Threats (HIPPO) are met in-situ (national parks, reserves) or ex-situ (seed banks, zoos, cryopreservation)."
        why="Conservation strategy questions — why reserves beat zoos for most species, and why hotspots like the Eastern Himalaya get priority — come straight from this unit."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 9 — Environmental Issues                                        */
/* ------------------------------------------------------------------ */

const EnvironmentalIssuesTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* earth */
    const earth = sph(1.5, 0x166534);
    earth.position.set(0, 0.4, 0);
    g.add(earth);
    /* greenhouse gas dome */
    const dome = sph(2.0, 0x94a3b8, 0.18);
    dome.scale.y = 0.5;
    dome.position.set(0, 1.0, 0);
    g.add(dome);
    /* factory with stacks + smoke */
    const factory = new THREE.Group();
    const hall = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 1.0), standardMaterial(0x475569));
    hall.position.y = 0.4; factory.add(hall);
    const stacks: THREE.Mesh[] = [];
    for (let i = 0; i < 2; i++) {
      const st = cyl(0.12, 0.16, 1.6, 0x94a3b8);
      st.position.set(-0.4 + i * 0.8, 1.6, 0);
      factory.add(st); stacks.push(st);
    }
    const smoke = new THREE.Group();
    const smokeSeeds: THREE.Vector3[] = [];
    for (let i = 0; i < 10; i++) {
      const p = sph(0.09 + Math.random() * 0.08, 0xcbd5e1, 0.5);
      const seed = new THREE.Vector3(-0.4 + (i % 2) * 0.8, 2.4, 0);
      smokeSeeds.push(seed.clone());
      p.position.copy(seed);
      smoke.add(p);
    }
    factory.add(smoke);
    factory.position.set(-4.6, 0.2, 0.6);
    g.add(factory);
    /* deforested stumps */
    for (let i = 0; i < 4; i++) {
      const stump = cyl(0.12, 0.16, 0.28, 0x78350f);
      stump.position.set(-1.9 + i * 0.4, 1.75, -1.4);
      g.add(stump);
    }
    /* eutrophic lake */
    const lake = cyl(0.9, 0.9, 0.12, 0x84cc16, 0.9);
    lake.position.set(3.6, 1.35, -0.8);
    g.add(lake);
    /* acid rain cloud over lake */
    const cloud = sph(0.5, 0x64748b, 0.55);
    cloud.scale.set(1.4, 0.6, 1);
    cloud.position.set(3.6, 3.0, -0.8);
    g.add(cloud);

    kit.addLbl("#94a3b8", "Greenhouse dome (CO₂, CH₄)", "traps IR → global warming", new THREE.Vector3(-2.2, 3.9, 0), new THREE.Vector3(0, 1.7, 0));
    kit.addLbl("#cbd5e1", "Industrial smoke", "SO₂ + NOₓ → acid rain", new THREE.Vector3(-5.9, 3.4, 0), new THREE.Vector3(-4.6, 2.4, 0.6));
    kit.addLbl("#78350f", "Deforestation", "jhum overuse, fuelwood, logging", new THREE.Vector3(-3.4, -1.7, 0), new THREE.Vector3(-1.2, 1.8, -1.4));
    kit.addLbl("#84cc16", "Eutrophication", "fertiliser runoff → algal bloom → O₂ crash", new THREE.Vector3(5.7, 1.0, 0), lake.position);
    kit.addLbl("#64748b", "Acid-rain cloud", "pH < 5.6 damages lakes & forests", new THREE.Vector3(5.3, 3.6, 0), cloud.position);
    titleText(kit.ts, "Environmental Issues — greenhouse, deforestation, eutrophication", new THREE.Vector3(0, 4.9, 0));

    return (t: number) => {
      smoke.children.forEach((p, i) => {
        const u = (t * 0.4 + i / 10) % 1;
        const seed = smokeSeeds[i];
        p.position.set(seed.x + u * 0.6, seed.y + u * 1.6, seed.z);
        (p as THREE.Mesh).scale.setScalar(1 + u * 1.6);
      });
      dome.scale.setScalar(1 + Math.sin(t * 1.2) * 0.02);
      dome.scale.y = 0.5;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — environmental issues"
        look="A green earth under a translucent gas dome, a smoking factory, burnt stumps on a cleared patch, an algae-green lake beneath a dark acid-rain cloud."
        principle="Human drivers of global change: greenhouse gases warm the planet (CO₂, CH₄, CFCs); deforestation removes carbon sinks; fertiliser runoff eutrophies lakes (algal bloom → BOD rise → fish death); SO₂/NOₓ form acid rain; CFCs thin stratospheric ozone."
        why="The NEB environmental-issues essay draws entirely from these mechanisms — causes, effects and control measures for each named problem."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 10 — Human Physiology (circulatory + respiratory)               */
/* ------------------------------------------------------------------ */

const HumanPhysiologyTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* ribcage */
    for (let i = 0; i < 6; i++) {
      for (const side of [-1, 1] as const) {
        const rib = new THREE.Mesh(
          new THREE.TorusGeometry(0.85 - i * 0.06, 0.035, 8, 24, Math.PI * 0.9),
          standardMaterial(0xf1f5f9, { transparent: true, opacity: 0.35 }),
        );
        rib.position.set(0, 0.4 - i * 0.42, 0);
        rib.rotation.y = Math.PI / 2;
        rib.rotation.z = side * 0.12;
        rib.rotation.x = -0.15;
        g.add(rib);
      }
    }
    /* heart — two chambers + vessels, beats */
    const heart = new THREE.Group();
    const ventricle = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 16), standardMaterial(0xdc2626));
    ventricle.scale.set(1, 1.15, 0.9);
    heart.add(ventricle);
    const aorta = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.07, 10, 24, Math.PI * 1.2), standardMaterial(0xf87171));
    aorta.position.set(-0.05, 0.45, 0);
    heart.add(aorta);
    const venaCava = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.5, 10), standardMaterial(0x60a5fa));
    venaCava.position.set(0.22, 0.4, -0.1);
    venaCava.rotation.z = 0.4;
    heart.add(venaCava);
    heart.position.set(-0.5, 0.3, 0.25);
    g.add(heart);
    /* lungs — right 2-lobe, left 3-lobe simplified */
    const lungs = new THREE.Group();
    for (const side of [-1, 1] as const) {
      const lobe = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 16), standardMaterial(0xf9a8d4, { transparent: true, opacity: 0.4 }));
      lobe.scale.set(0.75, 1.5, 0.62);
      lobe.position.set(side * 0.85, 0.35, 0);
      lungs.add(lobe);
    }
    const trachea = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.1, 10), standardMaterial(0xe2e8f0));
    trachea.position.set(0, 1.45, 0);
    lungs.add(trachea);
    const bronchi = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.62, 8), standardMaterial(0xe2e8f0));
    bronchi.position.set(0, 1.02, 0);
    lungs.add(bronchi);
    g.add(lungs);
    /* diaphragm */
    const diaphragm = new THREE.Mesh(new THREE.SphereGeometry(1.35, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.4), standardMaterial(0xfbbf24, { transparent: true, opacity: 0.55 }));
    diaphragm.rotation.x = Math.PI;
    diaphragm.position.y = -0.75;
    g.add(diaphragm);
    /* oxygenated / deoxygenated blood path markers */
    const dropA = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), standardMaterial(0xf87171));
    const dropB = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), standardMaterial(0x60a5fa));
    g.add(dropA, dropB);

    kit.addLbl("#dc2626", "Heart — double pump", "left: oxygenated · right: deoxygenated", new THREE.Vector3(-3.8, 2.9, 0), new THREE.Vector3(-0.5, 0.5, 0.25));
    kit.addLbl("#f9a8d4", "Lungs — gas exchange", "alveoli: O₂ in, CO₂ out", new THREE.Vector3(3.8, 2.9, 0), new THREE.Vector3(0.85, 0.9, 0));
    kit.addLbl("#e2e8f0", "Trachea → bronchi", "cartilage-ringed airway", new THREE.Vector3(4.3, 0.7, 0), new THREE.Vector3(0, 1.2, 0));
    kit.addLbl("#fbbf24", "Diaphragm", "contracts → inhalation", new THREE.Vector3(-4.3, -2.4, 0), new THREE.Vector3(0, -0.9, 0));
    kit.addLbl("#f87171", "Oxygenated blood", "pulmonary vein → left atrium → aorta", new THREE.Vector3(4.0, -1.6, 0), new THREE.Vector3(-0.3, 0.75, 0.25));
    kit.addLbl("#60a5fa", "Deoxygenated blood", "vena cava → right atrium → pulmonary artery", new THREE.Vector3(-3.9, -1.0, 0), new THREE.Vector3(0.3, 0.5, -0.1));
    titleText(kit.ts, "Human Physiology — cardio-respiratory system", new THREE.Vector3(0, 3.8, 0));

    return (t: number) => {
      const beat = 1 + Math.max(0, Math.sin(t * 6.4)) * 0.14;
      heart.scale.setScalar(beat);
      lungs.children[0] && lungs.children.forEach((c, i) => { if (i < 2) (c as THREE.Mesh).scale.y = (1.5) * (0.94 + 0.06 * Math.sin(t * 2.2 + i)); });
      const u = (t * 0.45) % 1;
      dropA.position.set(-0.5 - 1.6 * u, 0.3 + 1.3 * u, 0.25);
      dropB.position.set(0.22 + 1.6 * (1 - u), 0.4 - 0.9 * (1 - u), -0.1);
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — cardio-respiratory system"
        look="A translucent ribcage shielding a beating red heart, two breathing pink lungs joined by a cartilage-ringed trachea, a yellow diaphragm dome below, and coloured blood drops tracing their circulation paths."
        principle="The heart is a double pump: the right side sends deoxygenated blood to the lungs (pulmonary circulation) and the left side pumps oxygenated blood to the body (systemic circulation). Breathing is driven by the diaphragm — it contracts and flattens to inhale, relaxes to exhale. Gas exchange happens by diffusion across alveolar walls."
        why="Double circulation, cardiac cycle (0.8 s: 0.1 atrial + 0.3 ventricular systole + 0.4 diastole), and breathing mechanism are guaranteed NEB Class 11/12 questions."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 11 — Evolution (natural selection & speciation)                 */
/* ------------------------------------------------------------------ */

const EvolutionTab: React.FC = () => {
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts.group;
    /* phylogenetic tree: trunk + branching limbs + species spheres */
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 2.6, 10), standardMaterial(0x78350f));
    trunk.position.y = 1.3;
    g.add(trunk);
    type Node = { pos: [number, number, number]; color: number; label: string; sub: string };
    const species: Node[] = [
      { pos: [-3.2, 2.6, 0], color: 0x22c55e, label: "Fish", sub: "aquatic ancestor" },
      { pos: [-1.2, 3.4, 0], color: 0x84cc16, label: "Amphibian", sub: "first onto land" },
      { pos: [1.2, 3.4, 0], color: 0xfacc15, label: "Reptile", sub: "amniote egg" },
      { pos: [3.2, 2.6, 0], color: 0xf97316, label: "Mammal", sub: "warm-blooded, milk" },
      { pos: [0, 4.6, 0], color: 0xef4444, label: "Bird", sub: "feathers from scales" },
    ];
    /* limbs as angled cylinders */
    const limb = (a: THREE.Vector3, b: THREE.Vector3) => {
      const dir = b.clone().sub(a);
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, dir.length(), 8), standardMaterial(0x92400e));
      seg.position.copy(a).add(b).multiplyScalar(0.5);
      seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      g.add(seg);
    };
    const base = new THREE.Vector3(0, 2.6, 0);
    species.forEach((s) => limb(base, new THREE.Vector3(...s.pos)));
    limb(new THREE.Vector3(0, 3.4, 0), new THREE.Vector3(0, 4.6, 0));
    /* species spheres at tips */
    const tips = species.map((s) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 14), standardMaterial(s.color));
      m.position.set(...s.pos);
      g.add(m);
      return m;
    });
    /* fossils in sediment layers */
    const sediments = [0x64748b, 0x475569, 0x334155, 0x1e293b];
    sediments.forEach((c, i) => {
      const layer = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.5, 2.4), standardMaterial(c));
      layer.position.set(0, -0.3 - i * 0.52, 1.8);
      g.add(layer);
      const fossil = sph(0.14, 0xfcd34d);
      fossil.position.set(-2.8 + i * 1.8, -0.3 - i * 0.52, 1.8);
      fossil.scale.z = 0.35;
      g.add(fossil);
    });
    /* Galapagos finch beaks — adaptive radiation */
    const finch = new THREE.Group();
    finch.add(sph(0.28, 0x475569));
    const beaks = [
      { r: 0.16, c: 0xfbbf24 },
      { r: 0.1, c: 0xf59e0b },
      { r: 0.05, c: 0xf97316 },
    ];
    beaks.forEach((b, i) => {
      const bk = new THREE.Mesh(new THREE.ConeGeometry(b.r, b.r * 4.2, 10), standardMaterial(b.c));
      bk.position.set(0.26 + i * 0.55, 0.05 + i * 0.12, 0);
      bk.rotation.z = -Math.PI / 2;
      finch.add(bk);
    });
    finch.position.set(-3.4, -1.6, 0);
    g.add(finch);

    kit.addLbl("#22c55e", "Common ancestor", "descent with modification", new THREE.Vector3(-4.6, 1.0, 0), new THREE.Vector3(0, 2.6, 0));
    kit.addLbl("#ef4444", "Divergent evolution", "homologous organs — same structure, different function", new THREE.Vector3(3.9, 4.9, 0), new THREE.Vector3(0, 4.6, 0));
    kit.addLbl("#fcd34d", "Fossil record", "deeper = older; transitional forms", new THREE.Vector3(-4.7, -2.4, 0), new THREE.Vector3(-1.0, -1.35, 1.8));
    kit.addLbl("#fbbf24", "Adaptive radiation — Darwin's finches", "beak shape follows food source", new THREE.Vector3(2.6, -2.0, 0), finch.position.clone().add(new THREE.Vector3(0.6, 0, 0)));
    kit.addLbl("#a855f7", "Natural selection", "fitter variants survive & reproduce", new THREE.Vector3(4.8, 1.2, 0), new THREE.Vector3(3.2, 2.6, 0));
    titleText(kit.ts, "Evolution — descent with modification", new THREE.Vector3(0, 5.8, 0));

    return (t: number) => {
      tips.forEach((m, i) => { m.position.y = species[i].pos[1] + Math.sin(t * 1.4 + i) * 0.05; });
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — evolution & evidence"
        look="A brown phylogenetic tree branching to coloured species spheres above layered sediment with golden fossils below, and Darwin's finches with three beak sizes to the side."
        principle="Evolution is descent with modification: variation + natural selection (differential survival of the fittest) drives adaptation; over time speciation occurs. Evidence: fossil record (age layers), homologous vs analogous organs, embryology, and adaptive radiation in Darwin's finches."
        why="Darwinism vs Lamarckism, natural-selection examples (industrial melanism, DDT resistance), and Hardy-Weinberg equilibrium are staple NEB Class 12 questions."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Exported suite                                                      */
/* ------------------------------------------------------------------ */

type TabId =
  | "micro" | "vegetation" | "food" | "welfare" | "principles"
  | "applications" | "interactions" | "human" | "biodiversity" | "issues" | "evolution";

const TABS: { id: TabId; label: string; icon: typeof Bug; color: string }[] = [
  { id: "micro", label: "Microbiology", icon: Microscope, color: "#ef4444" },
  { id: "vegetation", label: "Vegetation", icon: Trees, color: "#22c55e" },
  { id: "food", label: "Food Production", icon: FlaskConical, color: "#f59e0b" },
  { id: "welfare", label: "Microbes in Welfare", icon: FlaskConical, color: "#8b5cf6" },
  { id: "principles", label: "Biotech Principles", icon: Recycle, color: "#ec4899" },
  { id: "applications", label: "Biotech Applications", icon: Syringe, color: "#06b6d4" },
  { id: "interactions", label: "Organisms & Environment", icon: Globe2, color: "#0ea5e9" },
  { id: "human", label: "Human Physiology", icon: Syringe, color: "#f43f5e" },
  { id: "biodiversity", label: "Biodiversity", icon: ShieldCheck, color: "#10b981" },
  { id: "issues", label: "Environmental Issues", icon: Factory, color: "#f97316" },
  { id: "evolution", label: "Evolution", icon: Globe2, color: "#a855f7" },
];

export function BiologySyllabusSuite3D() {
  const [tab, setTab] = useState<TabId>("micro");
  const active = TABS.find((t) => t.id === tab)!;
  const I = active.icon;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <I className="h-5 w-5" style={{ color: active.color }} />
        </div>
        <div>
          <h2 className="font-semibold text-base">Biology Syllabus Suite 3D — the missing units</h2>
          <p className="text-xs text-muted-foreground">
            Real WebGL scenes for the nine units that had no 3D. Use the ◉ Reveal bar to bring labels
            in one by one (Next +1), show all at once, or hide them again.
          </p>
        </div>
      </div>
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)}>
        <TabsList className="flex flex-wrap h-auto gap-1.5">
          {TABS.map((t) => {
            const Ti = t.icon;
            return (
              <TabsTrigger key={t.id} value={t.id} className="gap-1.5 text-xs">
                <Ti className="h-3.5 w-3.5" />{t.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="micro"><MicrobiologyTab /></TabsContent>
        <TabsContent value="vegetation"><VegetationTab /></TabsContent>
        <TabsContent value="food"><FoodProductionTab /></TabsContent>
        <TabsContent value="welfare"><MicrobesWelfareTab /></TabsContent>
        <TabsContent value="principles"><BiotechPrinciplesTab /></TabsContent>
        <TabsContent value="applications"><BiotechApplicationsTab /></TabsContent>
        <TabsContent value="interactions"><OrganismsEnvironmentTab /></TabsContent>
        <TabsContent value="human"><HumanPhysiologyTab /></TabsContent>
        <TabsContent value="biodiversity"><BiodiversityTab /></TabsContent>
        <TabsContent value="issues"><EnvironmentalIssuesTab /></TabsContent>
        <TabsContent value="evolution"><EvolutionTab /></TabsContent>
      </Tabs>
    </div>
  );
}

export default BiologySyllabusSuite3D;
