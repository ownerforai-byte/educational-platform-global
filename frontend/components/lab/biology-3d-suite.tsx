"use client";

/**
 * Biology 3D Suite — labelled 3D visualizations mapped to NEB Biology XI
 * (Bio. 201) units in official curriculum order:
 *   • Biomolecules and Cell Biology → Eukaryotic cell, cell division, DNA
 *   • Introductory Microbiology     → Bacteriophage structure
 *   • Ecology                       → Food chain & energy pyramid
 */

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { VizToolbar, type VizTarget, type VizTargetRef } from "@/components/viz/viz-toolbar";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { CellOrganellesEncyclopedia } from "@/components/lab/cell-organelles-encyclopedia";
import { CellOrganellesExplorer3D } from "@/components/lab/cell-organelles-explorer-3d";
import { CELL_ORGANELLES } from "@/lib/cell-organelles-data";
import {
  Leaf,
  PawPrint,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Info,
  Scissors,
  Compass,
  ArrowRight,
  Layers,
  ZoomIn,
} from "lucide-react";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  titleText,
  type ThreeScene,
  type ThreeSceneOptions,
  clearGroup,
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
    parent?: THREE.Object3D,
    onClick?: () => void
  ) => CSS2DObject;
};

function chipEl(color: string, title: string, sub?: string, onClick?: () => void): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;cursor:pointer;padding:4px 9px;border-radius:10px;background:rgba(2,6,23,0.88);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;backdrop-filter:blur(4px);box-shadow:0 4px 12px rgba(0,0,0,0.5);transition:all 0.15s ease;`;
  el.innerHTML = `<span style="color:${color};font-weight:800;display:inline-block">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-size:9.5px;font-weight:500">${sub}</span>` : "");
  if (onClick) {
    el.addEventListener("click", onClick);
  }
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
    addLabel(color, title, sub, pos, parent = ts!.group, onClick?: () => void) {
      const o = new CSS2DObject(chipEl(color, title, sub, onClick));
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
    kit.ts!.controls.update();
    kit.ts!.renderer.render(kit.ts!.scene, kit.ts!.camera);
    kit.labelRenderer.render(kit.ts!.scene, kit.ts!.camera);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

function useLabScene(
  build: (kit: Kit) => void | ((t: number) => void),
  deps: unknown[]
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
      kit.labelRenderer.domElement.remove();
    vizTargetRef.current = {};
      disposeThreeScene(kit.ts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, ...deps]);
  return { mountRef, webGL, vizTargetRef };
}

function CanvasMount({ mountRef, webGL, targetRef }: { mountRef: React.RefObject<HTMLDivElement | null>; webGL: boolean; targetRef: VizTargetRef }) {
  return webGL ? (
    <div ref={mountRef} aria-label="3D scene" className="relative w-full h-80 sm:h-96 md:h-[clamp(320px,60vh,640px)] lg:h-[clamp(320px,60vh,640px)] overflow-hidden rounded-md">
      <VizToolbar targetRef={targetRef} />
    </div>
  ) : (
    <div className="flex w-full h-80 sm:h-96 md:h-[clamp(320px,60vh,640px)] lg:h-[clamp(320px,60vh,640px)] items-center justify-center rounded-md border border-border bg-muted/30 text-sm text-muted-foreground">
      WebGL is not available in this browser.
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TAB 1 — Eukaryotic cell (Biomolecules & Cell Biology)               */
/* ------------------------------------------------------------------ */

interface OrganellePin {
  id: string;
  name: string;
  sub: string;
  color: string;
  colorHex: number;
  target: THREE.Vector3;
  labelPos: THREE.Vector3;
  plantOnly?: boolean;
  animalOnly?: boolean;
}

const CellTab: React.FC<{ onExploreOrganelle?: (id?: string) => void }> = ({ onExploreOrganelle }) => {
  const [plant, setPlant] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [cutaway, setCutaway] = useState(true);
  const [activeOrganelle, setActiveOrganelle] = useState<string | null>(null);

  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts!.group;

    // Outer plasma membrane (spherical in animal, enclosed in faceted wall in plant)
    if (!plant) {
      // Animal Cell Membrane
      if (cutaway) {
        // Cutaway shell (3/4 hemisphere so interior is exposed)
        const membraneMat = standardMaterial(0x38bdf8, {
          transparent: true,
          opacity: 0.28,
          side: THREE.DoubleSide,
          roughness: 0.25,
        });
        const membrane = new THREE.Mesh(
          new THREE.SphereGeometry(3.95, 48, 32, 0, Math.PI * 1.45, 0, Math.PI),
          membraneMat
        );
        // Cut edge border line
        const cutBorderGeo = new THREE.RingGeometry(3.92, 3.96, 32);
        const cutBorder = new THREE.Mesh(
          cutBorderGeo,
          standardMaterial(0x7dd3fc, { side: THREE.DoubleSide, emissive: 0x38bdf8, emissiveIntensity: 0.4 })
        );
        cutBorder.rotation.y = Math.PI / 2;
        g.add(membrane, cutBorder);
      } else {
        const membraneMat = standardMaterial(0x38bdf8, { transparent: true, opacity: 0.2, roughness: 0.25 });
        g.add(new THREE.Mesh(new THREE.SphereGeometry(3.95, 48, 32), membraneMat));
      }

      // Microvilli undulating surface folds on animal cell
      for (let i = 0; i < 16; i++) {
        const theta = (i / 16) * Math.PI * 2;
        const mv = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8),
          standardMaterial(0x38bdf8, { transparent: true, opacity: 0.45 })
        );
        mv.position.set(Math.cos(theta) * 3.95, Math.sin(theta) * 3.95, 0);
        mv.rotation.z = theta + Math.PI / 2;
        g.add(mv);
      }
    } else {
      // Plant Cell Outer Boundaries (Cell Wall + Plasma Membrane)
      if (cutaway) {
        // Cutaway Faceted Plant Cell Wall
        const wallMat = standardMaterial(0x22c55e, {
          transparent: true,
          opacity: 0.32,
          side: THREE.DoubleSide,
          roughness: 0.5,
        });
        const wall = new THREE.Mesh(
          new THREE.SphereGeometry(4.55, 32, 24, 0, Math.PI * 1.42, 0, Math.PI),
          wallMat
        );
        // Middle Lamella outer line frame
        const wireMat = new THREE.MeshBasicMaterial({
          color: 0xa3e635,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        });
        const wallWire = new THREE.Mesh(
          new THREE.SphereGeometry(4.58, 16, 12, 0, Math.PI * 1.42, 0, Math.PI),
          wireMat
        );
        // Inner Plasma Membrane
        const membraneMat = standardMaterial(0x38bdf8, {
          transparent: true,
          opacity: 0.18,
          side: THREE.DoubleSide,
        });
        const membrane = new THREE.Mesh(
          new THREE.SphereGeometry(4.2, 32, 24, 0, Math.PI * 1.42, 0, Math.PI),
          membraneMat
        );
        g.add(wall, wallWire, membrane);
      } else {
        const wallMat = standardMaterial(0x22c55e, { transparent: true, opacity: 0.26, roughness: 0.5 });
        const wall = new THREE.Mesh(new THREE.IcosahedronGeometry(4.6, 2), wallMat);
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, wireframe: true, transparent: true, opacity: 0.25 });
        const wallWire = new THREE.Mesh(new THREE.IcosahedronGeometry(4.62, 2), wireMat);
        const membraneMat = standardMaterial(0x38bdf8, { transparent: true, opacity: 0.15 });
        const membrane = new THREE.Mesh(new THREE.SphereGeometry(4.2, 36, 28), membraneMat);
        g.add(wall, wallWire, membrane);
      }

      // Plasmodesmata (trans-wall intercellular channels)
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const pd = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.85, 8),
          standardMaterial(0xfde047, { emissive: 0xeab308, emissiveIntensity: 0.3 })
        );
        pd.position.set(Math.cos(a) * 4.4, Math.sin(a) * 4.4, -0.2);
        pd.rotation.z = a + Math.PI / 2;
        g.add(pd);
      }
    }

    // ── Nucleus ──
    // In plant cells, pushed to eccentric/peripheral position by central vacuole;
    // in animal cells, centrally located.
    const nucPos = plant ? new THREE.Vector3(-1.45, 1.25, 0) : new THREE.Vector3(0, 0, 0);
    const nucleus = new THREE.Mesh(
      new THREE.SphereGeometry(plant ? 1.25 : 1.45, 32, 24),
      standardMaterial(0x8b5cf6, {
        roughness: 0.35,
        emissive: activeOrganelle === "nucleus" ? 0x8b5cf6 : 0x000000,
        emissiveIntensity: activeOrganelle === "nucleus" ? 0.35 : 0,
      })
    );
    nucleus.position.copy(nucPos);

    // Nucleolus
    const nucleolus = new THREE.Mesh(
      new THREE.SphereGeometry(plant ? 0.38 : 0.44, 24, 18),
      standardMaterial(0x6d28d9, {
        emissive: activeOrganelle === "nucleolus" ? 0xa855f7 : 0x7c3aed,
        emissiveIntensity: activeOrganelle === "nucleolus" ? 0.6 : 0.25,
      })
    );
    nucleolus.position.set(nucPos.x + 0.15, nucPos.y + 0.1, nucPos.z + 0.1);

    // Nuclear Pores (toruses on nuclear surface)
    const poreMat = standardMaterial(0xc4b5fd, { roughness: 0.3 });
    for (let i = 0; i < 8; i++) {
      const pAngle = (i / 8) * Math.PI * 2;
      const pore = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 6, 12), poreMat);
      pore.position.set(
        nucPos.x + Math.cos(pAngle) * (plant ? 1.25 : 1.45),
        nucPos.y + Math.sin(pAngle) * (plant ? 1.25 : 1.45),
        nucPos.z
      );
      pore.lookAt(pore.position.x * 2, pore.position.y * 2, pore.position.z);
      g.add(pore);
    }

    // Chromatin threads
    const chromPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 28; i++) {
      const a = i * 1.15;
      chromPts.push(
        new THREE.Vector3(
          nucPos.x + Math.cos(a) * 0.72 * (0.4 + 0.6 * Math.sin(i * 0.9)),
          nucPos.y + Math.sin(i * 1.6) * 0.5,
          nucPos.z + Math.sin(a) * 0.72 * (0.4 + 0.6 * Math.cos(i * 0.8))
        )
      );
    }
    const chromatin = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(chromPts), 90, 0.035, 6),
      standardMaterial(0xc4b5fd)
    );
    g.add(nucleus, nucleolus, chromatin);

    // ── Mitochondria (Powerhouses with Cristae) ──
    const mitoPositions: [number, number, number, number][] = plant
      ? [[2.2, 1.6, -0.6, 0.5], [-2.3, -1.3, 1.0, -0.4], [0.5, -2.4, -1.3, 1.1]]
      : [[2.0, 1.8, -0.6, 0.5], [-2.4, -1.2, 1.1, -0.4], [1.2, -2.2, -1.4, 0.9], [-1.8, 2.0, 0.8, -0.6]];

    mitoPositions.forEach(([x, y, z, rot]) => {
      const m = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.28, 0.88, 8, 16),
        standardMaterial(0xf97316, {
          emissive: 0xf97316,
          emissiveIntensity: activeOrganelle === "mitochondria" ? 0.45 : 0.18,
        })
      );
      m.position.set(x, y, z);
      m.rotation.z = rot;
      g.add(m);

      // Internal zig-zag cristae folds
      const crPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 7; i++) {
        crPts.push(new THREE.Vector3(-0.4 + i * 0.11, i % 2 === 0 ? -0.15 : 0.15, 0.28));
      }
      m.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(crPts),
          new THREE.LineBasicMaterial({ color: 0xfed7aa, linewidth: 2 })
        )
      );
    });

    // ── Endoplasmic Reticulum (RER & SER) ──
    const rerMat = standardMaterial(0x0ea5e9, {
      roughness: 0.3,
      emissive: activeOrganelle === "rer" ? 0x0284c7 : 0x000000,
      emissiveIntensity: activeOrganelle === "rer" ? 0.35 : 0,
    });
    const rer = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.14, 10, 48), rerMat);
    rer.position.copy(nucPos);
    rer.rotation.x = Math.PI / 2.5;

    const serMat = standardMaterial(0x38bdf8, {
      roughness: 0.4,
      emissive: activeOrganelle === "ser" ? 0x0ea5e9 : 0x000000,
      emissiveIntensity: activeOrganelle === "ser" ? 0.35 : 0,
    });
    const ser = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.09, 8, 36), serMat);
    ser.position.copy(nucPos);
    ser.rotation.y = Math.PI / 3;
    g.add(rer, ser);

    // ── Golgi Apparatus (Cisternae stacks with secretory vesicles) ──
    const golgiPos = new THREE.Vector3(2.4, -2.1, 0.2);
    const golgiMat = standardMaterial(0xfbbf24, {
      roughness: 0.4,
      emissive: activeOrganelle === "golgi" ? 0xf59e0b : 0x000000,
      emissiveIntensity: activeOrganelle === "golgi" ? 0.4 : 0,
    });
    for (let i = 0; i < 4; i++) {
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.58 - i * 0.06, 0.58 - i * 0.06, 0.085, 24),
        golgiMat
      );
      disc.position.set(golgiPos.x + i * 0.08, golgiPos.y + i * 0.16, golgiPos.z);
      disc.rotation.z = 0.35;
      g.add(disc);
    }
    // Budding secretory vesicles
    [[-0.2, 0.3, 0.2], [0.3, -0.2, -0.15], [-0.4, 0.45, 0.1]].forEach(([vx, vy, vz]) => {
      const v = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), standardMaterial(0xfde047));
      v.position.set(golgiPos.x + vx, golgiPos.y + vy, golgiPos.z + vz);
      g.add(v);
    });

    // ── Ribosomes (70S & 80S) ──
    const rp: number[] = [];
    for (let i = 0; i < 110; i++) {
      const r = 3.3 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      rp.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
    }
    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute("position", new THREE.Float32BufferAttribute(rp, 3));
    g.add(new THREE.Points(rGeo, new THREE.PointsMaterial({ color: 0xf472b6, size: 0.08 })));

    // ── Peroxisomes (Microbodies with catalase core) ──
    const peroxPos = plant ? new THREE.Vector3(-0.8, -2.1, -0.5) : new THREE.Vector3(1.8, -1.2, -0.8);
    const perox = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 16, 14),
      standardMaterial(0xa855f7, {
        emissive: activeOrganelle === "peroxisome" ? 0x9333ea : 0x7e22ce,
        emissiveIntensity: activeOrganelle === "peroxisome" ? 0.5 : 0.2,
      })
    );
    perox.position.copy(peroxPos);
    g.add(perox);

    // ── Mode-Specific Structures ──
    if (plant) {
      // 1. Chloroplasts with Grana Thylakoid Stacks
      [[1.8, -1.4, 1.2], [-0.6, 2.4, 1.5], [-2.5, 0.4, -1.3]].forEach(([x, y, z], ci) => {
        const c = new THREE.Mesh(
          new THREE.SphereGeometry(0.58, 24, 18),
          standardMaterial(0x15803d, {
            emissive: activeOrganelle === "chloroplast" ? 0x16a34a : 0x000000,
            emissiveIntensity: activeOrganelle === "chloroplast" ? 0.35 : 0,
          })
        );
        c.position.set(x, y, z);
        c.scale.set(1, 0.55, 0.7);
        c.rotation.z = 0.4;
        g.add(c);

        // Grana stacks inside first chloroplast
        if (ci === 0) {
          for (let j = 0; j < 4; j++) {
            const disc = new THREE.Mesh(
              new THREE.CylinderGeometry(0.25, 0.25, 0.042, 18),
              standardMaterial(0x4ade80, { emissive: 0x22c55e, emissiveIntensity: 0.25 })
            );
            disc.position.set(0, -0.12 + j * 0.08, 0);
            c.add(disc);
          }
        }
      });

      // 2. Large Central Vacuole with Tonoplast
      const vac = new THREE.Mesh(
        new THREE.SphereGeometry(1.4, 32, 24),
        standardMaterial(0x60a5fa, {
          transparent: true,
          opacity: 0.55,
          roughness: 0.1,
          emissive: activeOrganelle === "vacuole" ? 0x38bdf8 : 0x000000,
          emissiveIntensity: activeOrganelle === "vacuole" ? 0.3 : 0,
        })
      );
      vac.position.set(1.5, -0.6, 0.3);
      g.add(vac);

      // 3. Starch grains (stored photosynthetic carbohydrate)
      const starch = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), standardMaterial(0xfde68a));
      starch.position.set(-1.0, -2.5, 1.3);
      g.add(starch);
    } else {
      // 1. Lysosomes (Suicide bags with hydrolytic enzymes)
      [[-2.7, 1.8, 0.7], [1.1, 2.5, -1.0], [2.2, -0.8, 1.1]].forEach(([x, y, z]) => {
        const l = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 18, 14),
          standardMaterial(0xef4444, {
            emissive: 0xef4444,
            emissiveIntensity: activeOrganelle === "lysosome" ? 0.5 : 0.25,
          })
        );
        l.position.set(x, y, z);
        g.add(l);
      });

      // 2. Centrosome (Pair of Perpendicular Centrioles 9+0 with radiating aster fibers)
      const c1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.72, 14), standardMaterial(0xe2e8f0));
      c1.position.set(2.3, 0.6, 0.6);
      const c2 = c1.clone();
      c2.rotation.z = Math.PI / 2;
      c2.position.x += 0.42;
      g.add(c1, c2);

      // Aster rays
      const asterMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.45 });
      for (let k = 0; k < 12; k++) {
        const rayAngle = (k / 12) * Math.PI * 2;
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(2.5, 0.6, 0.6),
          new THREE.Vector3(2.5 + Math.cos(rayAngle) * 0.8, 0.6 + Math.sin(rayAngle) * 0.8, 0.6),
        ]);
        g.add(new THREE.Line(lineGeo, asterMat));
      }

      // 3. Flagellum / Cilia (9+2 Microtubule Core)
      const flagPts = [
        new THREE.Vector3(-3.5, -2.0, 0),
        new THREE.Vector3(-4.2, -2.8, 0.2),
        new THREE.Vector3(-5.1, -3.5, -0.2),
        new THREE.Vector3(-6.2, -4.4, 0),
      ];
      const flagCurve = new THREE.CatmullRomCurve3(flagPts);
      const flag = new THREE.Mesh(new THREE.TubeGeometry(flagCurve, 40, 0.065, 8), standardMaterial(0x94a3b8));
      g.add(flag);

      // 4. Cytoskeletal Microtubule Lattice
      const cytoMat = new THREE.LineBasicMaterial({ color: 0xeab308, transparent: true, opacity: 0.35 });
      [
        [new THREE.Vector3(-2, 0, 0), new THREE.Vector3(2, 0, 0)],
        [new THREE.Vector3(0, -2.2, 0), new THREE.Vector3(0, 2.2, 0)],
        [new THREE.Vector3(-1.5, -1.5, 0.5), new THREE.Vector3(1.5, 1.5, -0.5)],
      ].forEach(([p1, p2]) => {
        g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([p1, p2]), cytoMat));
      });

      // 5. Small temporary vacuoles
      [[-1.8, -2.2, -0.8], [0.8, -2.5, 0.9]].forEach(([x, y, z]) => {
        const v = new THREE.Mesh(
          new THREE.SphereGeometry(0.35, 18, 14),
          standardMaterial(0x60a5fa, { transparent: true, opacity: 0.5 })
        );
        v.position.set(x, y, z);
        g.add(v);
      });
    }

    // ── 3D Leader Lines & Labels Data ──
    const pins: OrganellePin[] = [
      {
        id: "nucleus",
        name: "Nucleus",
        sub: "control center — stores genomic DNA",
        color: "#a78bfa",
        colorHex: 0xa78bfa,
        target: nucPos,
        labelPos: new THREE.Vector3(nucPos.x, nucPos.y + 1.8, nucPos.z),
      },
      {
        id: "nucleolus",
        name: "Nucleolus",
        sub: "ribosome subunit biogenesis",
        color: "#7c3aed",
        colorHex: 0x7c3aed,
        target: new THREE.Vector3(nucPos.x + 0.15, nucPos.y + 0.1, nucPos.z + 0.1),
        labelPos: new THREE.Vector3(nucPos.x + 1.6, nucPos.y + 0.4, nucPos.z + 1.3),
      },
      {
        id: "mitochondria",
        name: "Mitochondria",
        sub: "ATP powerhouse — cristae & ETC",
        color: "#f97316",
        colorHex: 0xf97316,
        target: plant ? new THREE.Vector3(2.2, 1.6, -0.6) : new THREE.Vector3(2.0, 1.8, -0.6),
        labelPos: new THREE.Vector3(2.4, 2.9, -0.6),
      },
      {
        id: "rer",
        name: "Rough ER",
        sub: "protein folding & transport",
        color: "#0ea5e9",
        colorHex: 0x0ea5e9,
        target: new THREE.Vector3(nucPos.x - 0.8, nucPos.y - 0.6, 0),
        labelPos: new THREE.Vector3(-3.8, -0.3, 0),
      },
      {
        id: "golgi",
        name: "Golgi Body",
        sub: "post-office — packaging & secretion",
        color: "#fbbf24",
        colorHex: 0xfbbf24,
        target: golgiPos,
        labelPos: new THREE.Vector3(3.2, -3.2, 0.2),
      },
      {
        id: "ribosome",
        name: "Ribosomes",
        sub: "protein synthesis factories",
        color: "#f472b6",
        colorHex: 0xf472b6,
        target: new THREE.Vector3(1.4, 0.5, 1.4),
        labelPos: new THREE.Vector3(3.3, 0.7, 1.6),
      },
      {
        id: "membrane",
        name: "Cell Membrane",
        sub: "fluid mosaic, selectively permeable",
        color: "#38bdf8",
        colorHex: 0x38bdf8,
        target: new THREE.Vector3(0, -3.9, 0),
        labelPos: new THREE.Vector3(0.3, -4.7, 0),
      },
      {
        id: "peroxisome",
        name: "Peroxisome",
        sub: "catalase & H₂O₂ detoxification",
        color: "#a855f7",
        colorHex: 0xa855f7,
        target: peroxPos,
        labelPos: plant ? new THREE.Vector3(-1.8, -3.0, -0.5) : new THREE.Vector3(2.8, -1.8, -0.8),
      },
    ];

    if (plant) {
      pins.push(
        {
          id: "cell-wall",
          name: "Cell Wall",
          sub: "rigid cellulose & middle lamella",
          color: "#22c55e",
          colorHex: 0x22c55e,
          target: new THREE.Vector3(-3.6, 2.9, 0),
          labelPos: new THREE.Vector3(-4.3, 3.9, 0),
          plantOnly: true,
        },
        {
          id: "chloroplast",
          name: "Chloroplast",
          sub: "thylakoids & stroma for photosynthesis",
          color: "#16a34a",
          colorHex: 0x16a34a,
          target: new THREE.Vector3(1.8, -1.4, 1.2),
          labelPos: new THREE.Vector3(3.1, -1.0, 1.2),
          plantOnly: true,
        },
        {
          id: "vacuole",
          name: "Central Vacuole",
          sub: "cell sap & tonoplast turgor pressure",
          color: "#60a5fa",
          colorHex: 0x60a5fa,
          target: new THREE.Vector3(1.5, -0.6, 0.3),
          labelPos: new THREE.Vector3(1.7, -2.4, 0.4),
          plantOnly: true,
        },
        {
          id: "starch",
          name: "Starch Grain",
          sub: "stored photosynthetic food",
          color: "#fde68a",
          colorHex: 0xfde68a,
          target: new THREE.Vector3(-1.0, -2.5, 1.3),
          labelPos: new THREE.Vector3(-1.2, -3.6, 1.3),
          plantOnly: true,
        },
        {
          id: "plasmodesmata",
          name: "Plasmodesmata",
          sub: "trans-wall cytoplasmic bridge",
          color: "#facc15",
          colorHex: 0xfacc15,
          target: new THREE.Vector3(3.1, 3.1, -0.2),
          labelPos: new THREE.Vector3(4.0, 3.8, -0.2),
          plantOnly: true,
        }
      );
    } else {
      pins.push(
        {
          id: "lysosome",
          name: "Lysosome",
          sub: "suicide bag — acidic hydrolases",
          color: "#ef4444",
          colorHex: 0xef4444,
          target: new THREE.Vector3(-2.7, 1.8, 0.7),
          labelPos: new THREE.Vector3(-3.4, 2.9, 0.7),
          animalOnly: true,
        },
        {
          id: "centrosome",
          name: "Centrosome",
          sub: "2 centrioles (9+0) division poles",
          color: "#e2e8f0",
          colorHex: 0xe2e8f0,
          target: new THREE.Vector3(2.5, 0.6, 0.6),
          labelPos: new THREE.Vector3(3.3, 1.6, 0.6),
          animalOnly: true,
        },
        {
          id: "flagellum",
          name: "Flagellum",
          sub: "9+2 microtubule motility apparatus",
          color: "#cbd5e1",
          colorHex: 0xcbd5e1,
          target: new THREE.Vector3(-4.0, -2.5, 0),
          labelPos: new THREE.Vector3(-5.2, -3.6, 0),
          animalOnly: true,
        },
        {
          id: "cytoskeleton",
          name: "Cytoskeleton",
          sub: "microtubule & microfilament lattice",
          color: "#eab308",
          colorHex: 0xeab308,
          target: new THREE.Vector3(0, 1.8, 0),
          labelPos: new THREE.Vector3(0, 2.7, 0),
          animalOnly: true,
        }
      );
    }

    // Add 3D leader lines and CSS2D labels
    pins.forEach((pin) => {
      const isActive = activeOrganelle === pin.id;

      if (showLines) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([pin.target, pin.labelPos]);
        const lineMat = new THREE.LineBasicMaterial({
          color: pin.colorHex,
          transparent: true,
          opacity: isActive ? 1.0 : 0.65,
          linewidth: isActive ? 3 : 1,
        });
        const leaderLine = new THREE.Line(lineGeo, lineMat);

        // Glowing anchor dot on organelle surface
        const dotGeo = new THREE.SphereGeometry(isActive ? 0.14 : 0.09, 14, 14);
        const dotMat = new THREE.MeshBasicMaterial({ color: pin.colorHex });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.copy(pin.target);

        // Anchor beacon ring
        const ringGeo = new THREE.RingGeometry(0.12, 0.16, 16);
        const ringMat = new THREE.MeshBasicMaterial({ color: pin.colorHex, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pin.target);
        ring.lookAt(pin.labelPos);

        g.add(leaderLine, dot, ring);
      }

      // Add clickable label chip
      kit.addLabel(pin.color, pin.name, pin.sub, pin.labelPos, g, () => {
        setActiveOrganelle((curr) => (curr === pin.id ? null : pin.id));
      });
    });

    titleText(
      kit.ts,
      plant
        ? `Plant Cell Ultrastructure ${cutaway ? "· Sagittal Cutaway" : "· Full Shell"}`
        : `Animal Cell Ultrastructure ${cutaway ? "· Sagittal Cutaway" : "· Full Shell"}`,
      new THREE.Vector3(0, 5.5, 0)
    );
  }, [plant, showLines, cutaway, activeOrganelle]);

  // Active organelle data lookup
  const activePinData = useMemo(() => {
    if (!activeOrganelle) return null;
    return CELL_ORGANELLES.find((o) => o.id === activeOrganelle || o.id.includes(activeOrganelle)) || null;
  }, [activeOrganelle]);

  return (
    <div className="space-y-6">
      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-border/70 bg-card shadow-sm">
        {/* Cell Type Toggle */}
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant={plant ? "default" : "outline"}
            onClick={() => {
              setPlant(true);
              setActiveOrganelle(null);
            }}
            className="gap-1.5 rounded-xl font-bold text-xs"
          >
            <Leaf className="h-3.5 w-3.5" />
            <span>Plant Cell</span>
          </Button>
          <Button
            size="sm"
            variant={!plant ? "default" : "outline"}
            onClick={() => {
              setPlant(false);
              setActiveOrganelle(null);
            }}
            className="gap-1.5 rounded-xl font-bold text-xs"
          >
            <PawPrint className="h-3.5 w-3.5" />
            <span>Animal Cell</span>
          </Button>
        </div>

        {/* View Mode Controls: Cutaway vs Full Shell & 3D Lines */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCutaway(!cutaway)}
            className={`gap-1.5 rounded-xl font-semibold text-xs border ${
              cutaway ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
            }`}
            title="Toggle 3D sliced section cutaway to reveal internal organelles"
          >
            <Scissors className="h-3.5 w-3.5" />
            <span>{cutaway ? "Cutaway View (Interior ON)" : "Closed Outer Shell"}</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowLines(!showLines)}
            className={`gap-1.5 rounded-xl font-semibold text-xs border ${
              showLines ? "border-primary/40 bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
            title="Toggle 3D pointer leader lines connecting labels to organelles"
          >
            {showLines ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>3D Leader Lines ({showLines ? "ON" : "OFF"})</span>
          </Button>
        </div>
      </div>

      {/* Quick Organelle Selector Pill Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider shrink-0 mr-1">
          Inspect:
        </span>
        {(plant
          ? [
              { id: "nucleus", label: "Nucleus" },
              { id: "mitochondria", label: "Mitochondria" },
              { id: "chloroplast", label: "Chloroplast" },
              { id: "vacuole", label: "Central Vacuole" },
              { id: "cell-wall", label: "Cell Wall" },
              { id: "golgi", label: "Dictyosome" },
              { id: "rer", label: "Rough ER" },
              { id: "plasmodesmata", label: "Plasmodesmata" },
            ]
          : [
              { id: "nucleus", label: "Nucleus" },
              { id: "mitochondria", label: "Mitochondria" },
              { id: "centrosome", label: "Centrosome" },
              { id: "lysosome", label: "Lysosomes" },
              { id: "golgi", label: "Golgi Complex" },
              { id: "rer", label: "Rough ER" },
              { id: "flagellum", label: "Flagellum" },
              { id: "cytoskeleton", label: "Cytoskeleton" },
            ]
        ).map((item) => {
          const isSelected = activeOrganelle === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveOrganelle(isSelected ? null : item.id)}
              className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-all border text-[11px] ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-muted/50 text-muted-foreground border-border/70 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          );
        })}
        {activeOrganelle && (
          <button
            onClick={() => setActiveOrganelle(null)}
            className="text-[10px] text-muted-foreground hover:text-foreground px-2 py-0.5 rounded bg-muted shrink-0"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* 3D WebGL Canvas with Floating Organelle Inspector HUD */}
      <div className="relative rounded-2xl overflow-hidden border border-border/70">
        <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />

        {/* Floating Organelle Inspector HUD Mini-Card */}
        {activePinData && (
          <div className="absolute bottom-4 right-4 max-w-xs sm:max-w-sm rounded-2xl border border-primary/40 bg-slate-950/90 p-4 text-foreground shadow-2xl backdrop-blur-md space-y-2 z-20 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Selected Organelle
                </span>
                <h4 className="text-base font-black text-white">{activePinData.name}</h4>
                {activePinData.nicknames[0] && (
                  <p className="text-[10.5px] font-semibold text-amber-400">
                    ★ {activePinData.nicknames[0]}
                  </p>
                )}
              </div>
              <button
                onClick={() => setActiveOrganelle(null)}
                className="text-muted-foreground hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {activePinData.functions.primary[0]}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">{activePinData.membraneType}</span>
              {onExploreOrganelle && (
                <button
                  onClick={() => onExploreOrganelle(activePinData.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                >
                  <span>3D Deep Dive Dossier</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dedicated Section Callout Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-primary/30 bg-primary/[0.04]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              Dedicated 3D Cell Organelles Section Available
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Inspect isolated 3D models of Mitochondria, Golgi Bodies, Nucleus, Chloroplasts, and more — with full historical chronicles and biochemical pathways.
            </p>
          </div>
        </div>
        {onExploreOrganelle && (
          <Button
            size="sm"
            onClick={() => onExploreOrganelle()}
            className="gap-1.5 rounded-xl font-bold text-xs shrink-0 self-start sm:self-auto"
          >
            <span>Open Organelle 3D Section</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Theory & Scientific Foundations */}
      <TheoryPanel
        look={
          plant
            ? "Rigid green cellulose cell wall outside the membrane, green chloroplasts with visible thylakoid grana discs, single expansive central vacuole pushing the nucleus to the side (eccentric), and yellow starch food grains."
            : "No cell wall or chloroplasts; flexible rounded membrane, centrally located nucleus, paired perpendicular centrioles (9+0 cartwheel structure), prominent red hydrolytic lysosomes ('suicide bags'), and motile flagellum."
        }
        vocabulary="Chromatin = genomic DNA + histone octamers; cristae = folded inner membrane of mitochondria maximizing ATP synthesis; thylakoids & grana = light reaction photosynthetic discs; tonoplast = selectively permeable membrane of the central vacuole; dictyosome = plant Golgi apparatus."
        principle="Eukaryotic cells are compartmentalized into membrane-bound organelles. Double-membrane organelles (Nucleus, Mitochondria, Chloroplasts) possess autonomous genetic features; single-membrane organelles (ER, Golgi, Lysosomes, Vacuole) form the coordinated Endomembrane System; non-membranous complexes (Ribosomes, Centrioles, Cytoskeleton) drive catalytic and structural dynamics."
        why="Organelle distribution defines physiological capability: photosynthetic autotrophy in green plant cells vs. mobile phagocytic heterotrophy in animal cells."
      />

      {/* Dedicated Cell Organelle Encyclopedia & Comparison Matrix */}
      <CellOrganellesEncyclopedia />
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
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts!.group;
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
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
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
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const helix = new THREE.Group();
    kit.ts!.group.add(helix);
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
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
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
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts!.group;
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
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
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
  const { mountRef, webGL, vizTargetRef } = useLabScene((kit) => {
    const g = kit.ts!.group;
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
          g.add(new LiveLeaderLine(to.clone().sub(from).normalize(), from, to.distanceTo(from) - 0.4, 0xfacc15, 0.28, 0.14));
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
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
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
  const [activeTab, setActiveTab] = useState<string>("cell");
  const [selectedOrganelleId, setSelectedOrganelleId] = useState<string>("mitochondria");

  const handleExploreOrganelle = (organelleId?: string) => {
    if (organelleId) {
      // Normalize aliases to canonical IDs
      const mappedId =
        organelleId === "rer" || organelleId === "ser"
          ? "er"
          : organelleId === "membrane"
          ? "cell-membrane"
          : organelleId === "nucleolus"
          ? "nucleus"
          : organelleId;
      setSelectedOrganelleId(mappedId);
    }
    setActiveTab("organelles");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="cell" className="font-semibold">
          Eukaryotic Cell (Plant &amp; Animal)
        </TabsTrigger>
        <TabsTrigger value="organelles" className="gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
          🧬 Cell Organelles 3D
        </TabsTrigger>
        <TabsTrigger value="division">Cell Division</TabsTrigger>
        <TabsTrigger value="dna">DNA Double Helix</TabsTrigger>
        <TabsTrigger value="phage">Bacteriophage</TabsTrigger>
        <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
      </TabsList>
      <TabsContent value="cell" className="mt-4">
        <CellTab onExploreOrganelle={handleExploreOrganelle} />
      </TabsContent>
      <TabsContent value="organelles" className="mt-4">
        <CellOrganellesExplorer3D initialOrganelleId={selectedOrganelleId} />
      </TabsContent>
      <TabsContent value="division" className="mt-4"><DivisionTab /></TabsContent>
      <TabsContent value="dna" className="mt-4"><DnaTab /></TabsContent>
      <TabsContent value="phage" className="mt-4"><PhageTab /></TabsContent>
      <TabsContent value="ecosystem" className="mt-4"><EcosystemTab /></TabsContent>
    </Tabs>
  );
};

export default Biology3DSuite;








