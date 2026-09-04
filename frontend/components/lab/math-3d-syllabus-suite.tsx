"use client";

/**
 * Mathematics 3D Syllabus Suite — labelled 3D visualizations mapped to NEB
 * Mathematics XI (Mat. 201) units in official curriculum order:
 *   • Analytic Geometry        → Conic sections of a double cone
 *   • Statistics & Probability → Normal distribution (μ, σ, 68–95–99.7)
 *   • Calculus                 → Surface, partial derivatives & tangent plane
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";
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
/* TAB 1 — Conic sections of a double cone                             */
/* ------------------------------------------------------------------ */

const ConicTab: React.FC = () => {
  const [m, setM] = useState(0.4); // plane slope: z = m·y + c
  const c = 1.4;
  const type = m < 0.98 ? "Ellipse" : m <= 1.02 ? "Parabola" : "Hyperbola";
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    // Double cone (slope 1: r = |z|), axis along z, apex at origin
    const coneMat = standardMaterial(0x38bdf8, { transparent: true, opacity: 0.14 });
    const upper = new THREE.Mesh(new THREE.ConeGeometry(7, 7, 64, 1, true), coneMat);
    upper.rotation.x = -Math.PI / 2;
    upper.position.z = 3.5;
    const lower = new THREE.Mesh(new THREE.ConeGeometry(7, 7, 64, 1, true), coneMat);
    lower.rotation.x = Math.PI / 2;
    lower.position.z = -3.5;
    g.add(upper, lower);
    // Slicing plane: z = m·y + c  → rotate about x by atan(m), lift by c
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), standardMaterial(0xfacc15, { transparent: true, opacity: 0.22, side: THREE.DoubleSide }));
    plane.rotation.x = Math.atan(m);
    plane.position.z = c;
    g.add(plane);
    // Intersection curve(s)
    const ptsUpper: THREE.Vector3[] = [];
    const ptsLower: THREE.Vector3[] = [];
    const R_MAX = 9;
    for (let i = 0; i <= 720; i++) {
      const th = (i / 720) * Math.PI * 2;
      const s = Math.sin(th);
      let r = c / (1 - m * s);
      if (r > 0 && r < R_MAX) ptsUpper.push(new THREE.Vector3(r * Math.cos(th), r * s, r));
      r = -c / (1 + m * s);
      if (r > 0 && r < R_MAX) ptsLower.push(new THREE.Vector3(r * Math.cos(th), r * s, -r));
    }
    const curveMat = new THREE.LineBasicMaterial({ color: 0xf97316 });
    if (ptsUpper.length > 2) g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsUpper), curveMat));
    if (ptsLower.length > 2) g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsLower), curveMat));
    kit.addLabel("#f97316", `${type}`, m < 0.98 ? "plane cuts one nappe at an angle < side" : m <= 1.02 ? "plane parallel to the cone side" : "plane steeper than the side — two branches", new THREE.Vector3(0, -5.4, 0));
    kit.addLabel("#38bdf8", "Double cone", "r = |z|", new THREE.Vector3(-5.5, 3.4, 0));
    kit.addLabel("#facc15", "Slicing plane", `z = ${m.toFixed(2)}·y + ${c}`, new THREE.Vector3(4.5, -3.4, 3.2));
    titleText(kit.ts, `Conic section: ${type} (plane slope ${m.toFixed(2)})`, new THREE.Vector3(0, 6.0, 0));
  }, [m]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Label className="w-24 shrink-0 text-xs">Plane slope</Label>
        <Slider value={[m]} min={0} max={2} step={0.02} onValueChange={(val) => setM(val[0])} className="max-w-sm" />
        <span className="text-xs text-muted-foreground">m = {m.toFixed(2)}</span>
        <span className="text-xs font-semibold text-orange-500">→ {type}</span>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="A translucent double cone is sliced by a yellow plane. Drag the slope slider: m < 1 gives a closed ellipse, m = 1 (parallel to the cone side) gives a parabola, m > 1 opens both branches of a hyperbola."
        principle="Every conic is the intersection of a plane with a right circular double cone: circle (m = 0, horizontal) → ellipse → parabola → hyperbola, as the tilt grows."
        why="Conics model real paths: ellipses for planetary orbits, parabolas for projectiles and satellite dishes, hyperbolas for navigation (LORAN) and cooling-tower shapes."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 2 — Normal distribution (Statistics & Probability)              */
/* ------------------------------------------------------------------ */

const StatsTab: React.FC = () => {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const pdf = (x: number) => Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));
    // Bars from z = −3.5 … 3.5 (σ units on x)
    for (let i = 0; i < 28; i++) {
      const x = -3.5 + i * 0.25;
      const h = 0.08 + pdf(x) * 3.2;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.2, h, 0.9), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.12 }));
      bar.position.set(x, h / 2, 0);
      g.add(bar);
    }
    // Smooth curve overlay
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 140; i++) {
      const x = -3.5 + (i / 140) * 7;
      pts.push(new THREE.Vector3(x, 0.1 + pdf(x) * 3.2, 0));
    }
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xf97316 })));
    // Sample scatter on the floor (deterministic pseudo-random normal)
    let seed = 42;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const samplePts: THREE.Vector3[] = [];
    for (let i = 0; i < 220; i++) {
      const u = (rnd() + rnd() + rnd() + rnd() + rnd() + rnd()) / 6; // ~N(0,1)
      const zscore = (u - 0.5) * 6;
      samplePts.push(new THREE.Vector3(mu + zscore * sigma, 0.03, (rnd() - 0.5) * 2.2));
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.Float32BufferAttribute(samplePts.flatMap((p) => [p.x, p.y, p.z]), 3));
    g.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xfacc15, size: 0.07 })));
    // Floor
    g.add(new THREE.Mesh(new THREE.BoxGeometry(8, 0.04, 3), standardMaterial(0x1e293b)));
    kit.addLabel("#f97316", `μ = ${mu.toFixed(1)} (mean)`, "centre of the bell", new THREE.Vector3(mu, 4.3, 0));
    kit.addLabel("#facc15", "Sample data (floor)", "deterministic pseudo-random", new THREE.Vector3(-2.9, 0.5, 1.6));
    kit.addLabel("#38bdf8", `σ = ${sigma.toFixed(2)}`, "spread; 68% within ±1σ, 95% ±2σ, 99.7% ±3σ", new THREE.Vector3(2.9, 0.6, 1.4));
    titleText(kit.ts, "Normal Distribution — bell curve", new THREE.Vector3(0, 5.2, 0));
  }, [mu, sigma]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="w-16 shrink-0 text-xs">Mean μ</Label>
          <Slider value={[mu]} min={-1.5} max={1.5} step={0.1} onValueChange={(v) => setMu(v[0])} className="w-36" />
        </div>
        <div className="flex items-center gap-2">
          <Label className="w-16 shrink-0 text-xs">Std σ</Label>
          <Slider value={[sigma]} min={0.4} max={2} step={0.05} onValueChange={(v) => setSigma(v[0])} className="w-36" />
        </div>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="Blue bars trace the bell curve f(x) = (1/σ√2π)·e^−(x−μ)²/2σ². μ slides the whole curve along the x-axis; σ widens (more spread) or narrows (taller peak) it."
        principle="68–95–99.7 rule: about 68% of values lie within μ ± 1σ, 95% within μ ± 2σ, 99.7% within μ ± 3σ. Total area under the curve = 1."
        why="Exam marks, measurement errors and biological traits all cluster normally — z-scores ((x−μ)/σ) let us compare values from different distributions."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 3 — Calculus: surface, partial derivatives & tangent plane      */
/* ------------------------------------------------------------------ */

const SURFACES = {
  wave: { name: "sin x · cos y", f: (x: number, y: number) => Math.sin(x) * Math.cos(y), fx: (x: number, y: number) => Math.cos(x) * Math.cos(y), fy: (x: number, y: number) => -Math.sin(x) * Math.sin(y) },
  saddle: { name: "x² − y²", f: (x: number, y: number) => (x * x - y * y) / 3, fx: (x: number) => (2 * x) / 3, fy: (y: number) => (-2 * y) / 3 },
  mono: { name: "x·y (saddle)", f: (x: number, y: number) => x * y / 2.5, fx: (x: number, y: number) => y / 2.5, fy: (x: number, _y: number) => x / 2.5 },
} as const;

const CalculusTab: React.FC = () => {
  const [key, setKey] = useState<keyof typeof SURFACES>("wave");
  const [x0, setX0] = useState(0.8);
  const [y0, setY0] = useState(0.6);
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const S = SURFACES[key];
    // Surface: PlaneGeometry displaced; local (x, y) → world (x, z_local→y, −y_local→z)
    const seg = 60, span = 5.2;
    const geo = new THREE.PlaneGeometry(span, span, seg, seg);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i);
      const ly = pos.getY(i);
      pos.setZ(i, S.f(lx, -ly));
    }
    geo.computeVertexNormals();
    const surf = new THREE.Mesh(geo, standardMaterial(0x38bdf8, { transparent: true, opacity: 0.55 }));
    surf.rotation.x = -Math.PI / 2;
    g.add(surf);
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x7dd3fc, wireframe: true, transparent: true, opacity: 0.12 }));
    wire.rotation.x = -Math.PI / 2;
    wire.position.y = 0.002;
    g.add(wire);
    // Point + tangent plane
    const f0 = S.f(x0, y0);
    const fx = S.fx(x0, y0);
    const fy = S.fy(x0, y0);
    const point = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), standardMaterial(0xf97316, { emissive: 0xf97316, emissiveIntensity: 0.7 }));
    point.position.set(x0, f0, y0);
    g.add(point);
    const nrm = new THREE.Vector3(-fx, 1, -fy).normalize();
    const tplane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), standardMaterial(0xf97316, { transparent: true, opacity: 0.32, side: THREE.DoubleSide }));
    tplane.position.set(x0, f0, y0);
    tplane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), nrm);
    g.add(tplane);
    // Normal arrow
    g.add(new LiveArrow(nrm, new THREE.Vector3(x0, f0, y0), 1.4, 0xfacc15, 0.18, 0.1));
    kit.addLabel("#f97316", `P(${x0.toFixed(1)}, ${y0.toFixed(1)})`, `z = ${f0.toFixed(2)}`, new THREE.Vector3(x0, f0 + 0.5, y0));
    kit.addLabel("#facc15", `∂f/∂x = ${fx.toFixed(2)},  ∂f/∂y = ${fy.toFixed(2)}`, "slopes along x and y", new THREE.Vector3(0, -3.2, 0));
    kit.addLabel("#7dd3fc", "z = f(x, y)", undefined, new THREE.Vector3(-3.2, 2.8, -2.4));
    titleText(kit.ts, `${S.name} — tangent plane at P`, new THREE.Vector3(0, 4.2, 0));
  }, [key, x0, y0]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(SURFACES) as (keyof typeof SURFACES)[]).map((k) => (
          <Button key={k} size="sm" variant={key === k ? "default" : "outline"} onClick={() => setKey(k)}>
            {SURFACES[k].name}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="w-10 shrink-0 text-xs">x₀</Label>
          <Slider value={[x0]} min={-2.4} max={2.4} step={0.1} onValueChange={(v) => setX0(v[0])} className="w-36" />
        </div>
        <div className="flex items-center gap-2">
          <Label className="w-10 shrink-0 text-xs">y₀</Label>
          <Slider value={[y0]} min={-2.4} max={2.4} step={0.1} onValueChange={(v) => setY0(v[0])} className="w-36" />
        </div>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        look="Orange point P slides over the surface; the translucent orange plane touches the surface only at P — it is the tangent plane. The yellow arrow is the surface normal at P."
        principle="Tangent plane: z = f(x₀,y₀) + fₓ(x₀,y₀)(x−x₀) + f_y(x₀,y₀)(y−y₀), where fₓ = ∂f/∂x and f_y = ∂f/∂y are partial derivatives — slopes holding the other variable constant."
        why="Gradients drive optimization: maxima/minima of profit functions and error surfaces in machine learning are found where both partial derivatives vanish."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Suite export                                                        */
/* ------------------------------------------------------------------ */

export const Math3DSyllabusSuite: React.FC = () => {
  return (
    <Tabs defaultValue="conics" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="conics">Conic Sections</TabsTrigger>
        <TabsTrigger value="stats">Normal Distribution</TabsTrigger>
        <TabsTrigger value="calculus">Calculus & Tangents</TabsTrigger>
      </TabsList>
      <TabsContent value="conics" className="mt-4"><ConicTab /></TabsContent>
      <TabsContent value="stats" className="mt-4"><StatsTab /></TabsContent>
      <TabsContent value="calculus" className="mt-4"><CalculusTab /></TabsContent>
    </Tabs>
  );
};

export default Math3DSyllabusSuite;



