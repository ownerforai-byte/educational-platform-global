"use client";

/**
 * Wave Optics suite — labelled 3D simulations for NEB Physics XII:
 *   • Interference — Young's double slit (fringe pattern, path difference)
 *   • Diffraction  — single slit (central maximum, minima)
 *   • Polarisation — Brewster's law and polaroid transmission
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { createLeaderLayer } from "./leader-lines";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  titleText,
  type ThreeScene,
} from "@/components/lab/three-scene";

function mkLabel(color: string, title: string, sub?: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.82);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;`;
  el.innerHTML = `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-weight:500">${sub}</span>` : "");
  return el;
}

/* shared helper: an arrow, added to the given scene group */
function arrow(dir: THREE.Vector3, origin: THREE.Vector3, len: number, color: number): THREE.ArrowHelper {
  return new THREE.ArrowHelper(dir.clone().normalize(), origin.clone(), len, color, len * 0.2, len * 0.11);
}

/* shared: vertical intensity bars standing on a base line */
function makeBars(ts: ThreeScene, values: number[], baseX: number, baseY: number, color: number): THREE.Group {
  const g = new THREE.Group();
  const N = values.length;
  for (let i = 0; i < N; i++) {
    const h = Math.max(0.02, values[i]) * 3.6;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.14, h, 0.4), standardMaterial(color, { emissive: color, emissiveIntensity: 0.85 }));
    bar.position.set(baseX, baseY + h / 2 + i * 0.06, 0);
    g.add(bar);
  }
  ts.group.add(g);
  return g;
}
/* =====================================================================
 * TAB 1 — Young's double slit (interference)
 * ===================================================================== */

const InterferenceTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [slitSepMm, setSlitSepMm] = useState(0.5);
  const [lambdaNm, setLambdaNm] = useState(600);
  const [screenM, setScreenM] = useState(1.5);

  const d = slitSepMm / 1000;
  const lam = lambdaNm * 1e-9;
  const beta = (lam * screenM) / d;

  useEffect(() => {
    if (!mountRef.current || !webGL) return;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;

    (async () => {
      try {
        const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
        if (!mountRef.current || cancelled) return;
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(9, 5, 13), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `Young's Double Slit — β = ${(beta * 1000).toFixed(2)} mm`, new THREE.Vector3(0, 4.8, 0));

        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
        labelRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
        mountRef.current!.appendChild(labelRenderer.domElement);
        try { leaderLayer = createLeaderLayer(mountRef.current!); } catch { leaderLayer = null; }

        const connections: any[] = [];
        const addLbl = (color: string, t: string, pos: [number, number, number], sub?: string, target?: [number, number, number]) => {
          const o = new CSS2DObject(mkLabel(color, t, sub));
          o.position.set(pos[0], pos[1], pos[2]);
          ts!.group.add(o);
          if (target) connections.push({ label: o, target: new THREE.Vector3(target[0], target[1], target[2]), color });
        };

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 12), standardMaterial(0x1e293b, { roughness: 0.95 })));

        for (let i = 0; i < 6; i++) {
          const w = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.4, 2.6), standardMaterial(0x67e8f9, { transparent: true, opacity: 0.1 }));
          w.position.set(-6.2 + i * 0.5, 2.2, 0);
          ts.group.add(w);
        }

        const barrier = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.6, 3.4), standardMaterial(0x475569, { metalness: 0.4 }));
        barrier.position.set(-1.5, 2.2, 0);
        ts.group.add(barrier);

        const slitGapScene = Math.max(0.04, d * 600);
        for (const s of [-1, 1]) {
          const gap = new THREE.Mesh(new THREE.BoxGeometry(0.22, Math.max(0.06, d * 600), 0.4), standardMaterial(0x111827));
          gap.position.set(-1.5, 2.2 + s * slitGapScene * 0.6, 0);
          ts.group.add(gap);
        }

        const screen = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.6, 3), standardMaterial(0xfef3c7, { emissive: 0xfef3c7, emissiveIntensity: 0.12 }));
        screen.position.set(4.6, 2.2, 0);
        ts.group.add(screen);

        /* fringe bars along the screen: intensity ∝ cos² */
        const NREDS = 61;
        const barVals: number[] = [];
        for (let i = 0; i < NREDS; i++) {
          const y = (i - (NREDS - 1) / 2) * 0.03;
          const phase = (Math.PI * d * y) / (lam * screenM);
          barVals.push(Math.abs(Math.cos(phase)) ** 2 + 0.04);
        }
        const bars = makeBars(ts!, barVals, 4.6, 0.3, 0xfacc15);

        addLbl("#67e8f9", "Coherent source", [-5.4, 4.4, 0], "single lamp, same λ, in phase", [-5.4, 3.0, 0]);
        addLbl("#475569", "Barrier — two slits", [-1.5, 4.6, 0], `d = ${slitSepMm.toFixed(2)} mm`, [-1.5, 2.6, 0]);
        addLbl("#fef3c7", "Screen — interference bars", [4.6, 4.6, 0], `β = λD/d = ${(beta * 1000).toFixed(2)} mm`, [4.6, 3.4, 0]);
const barMats = (bars.children as THREE.Mesh[]).map((c) => c.material as THREE.MeshStandardMaterial);

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          barMats.forEach((m, i) => { m.emissiveIntensity = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + i * 0.35)); });
          if (leaderLayer) leaderLayer.draw(ts!.camera, connections);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch { /* CSS2D/WebGL unavailable */ }
    })();

    return () => {
      cancelled = true;
      if (ts) disposeThreeScene(ts);
      if (unbind) unbind();
      if (labelRenderer?.domElement?.parentNode) labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement);
      leaderLayer?.dispose?.();
    };
  }, [webGL, slitSepMm, lambdaNm, screenM]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Slit separation d</Label><span className="text-sm font-semibold text-primary">{slitSepMm.toFixed(2)} mm</span></div>
            <Slider value={[slitSepMm]} min={0.1} max={2} step={0.05} onValueChange={(v) => setSlitSepMm(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Wavelength λ</Label><span className="text-sm font-semibold text-primary">{lambdaNm} nm</span></div>
            <Slider value={[lambdaNm]} min={400} max={700} step={5} onValueChange={(v) => setLambdaNm(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Distance to screen D</Label><span className="text-sm font-semibold text-primary">{screenM.toFixed(1)} m</span></div>
            <Slider value={[screenM]} min={0.5} max={3} step={0.1} onValueChange={(v) => setScreenM(v[0])} />
          </div>
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-center">
            <p className="text-[10px] uppercase text-muted-foreground">Fringe width β = λD/d</p>
            <p className="text-sm font-bold text-amber-500">{(beta * 1000).toFixed(3)} mm</p>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="One lamp lights two slits; their overlapping secondary waves build a vertical bar pattern on the screen — brightest centrally and symmetric."
        predict="Narrow d or longer λ spreads the fringes (β ∝ λ/d). Doubling D doubles β. Moving from violet to red widens the pattern."
        principle="Constructive points differ in path by a whole number of wavelengths. Young's formula β = λD/d gives the spacing — impossible to explain with particles."
        why="From anti-reflective lens coatings to diffraction-grating spectrometer calibration, everything rests on these same fringes."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 2 — Single-slit diffraction
 * ===================================================================== */

const DiffractionTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [slitWmm, setSlitWmm] = useState(0.1);
  const [lambdaNm, setLambdaNm] = useState(600);

  const a = slitWmm / 1000;
  const lam = lambdaNm * 1e-9;
  const thetaFirst = Math.asin(Math.min(1, lam / a));

  useEffect(() => {
    if (!mountRef.current || !webGL) return;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;

    (async () => {
      try {
        const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
        if (!mountRef.current || cancelled) return;
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(9, 5, 13), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `Single-slit Diffraction — sinθ₁ = λ/a = ${(lam / a).toFixed(3)}`, new THREE.Vector3(0, 4.8, 0));

        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
        labelRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
        mountRef.current!.appendChild(labelRenderer.domElement);
        try { leaderLayer = createLeaderLayer(mountRef.current!); } catch { leaderLayer = null; }

        const connections: any[] = [];
        const addLbl = (color: string, t: string, pos: [number, number, number], sub?: string, target?: [number, number, number]) => {
          const o = new CSS2DObject(mkLabel(color, t, sub));
          o.position.set(pos[0], pos[1], pos[2]);
          ts!.group.add(o);
          if (target) connections.push({ label: o, target: new THREE.Vector3(target[0], target[1], target[2]), color });
        };

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 12), standardMaterial(0x1e293b, { roughness: 0.95 })));

        const barrier = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.6, 3.4), standardMaterial(0x475569, { metalness: 0.4 }));
        barrier.position.set(-1.5, 2.2, 0);
        ts.group.add(barrier);
        /* slit gap: dark gap whose width scales with a */
        const slitGap = new THREE.Mesh(new THREE.BoxGeometry(0.22, Math.max(0.05, a * 1200), 0.4), standardMaterial(0x111827));
        slitGap.position.set(-1.5, 2.2, 0);
        ts.group.add(slitGap);

        const screen = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.6, 3), standardMaterial(0xf2f7ff, { emissive: 0xf2f7ff, emissiveIntensity: 0.12 }));
        screen.position.set(4.6, 2.2, 0);
        ts.group.add(screen);

        /* sinc² intensity profile */
        const N = 81;
        const vals: number[] = [];
        for (let i = 0; i < N; i++) {
          const y = (i - (N - 1) / 2) * 0.02;
          const b = (Math.PI * a * y) / (lam * 1.5);
          const sv = b === 0 ? 1 : Math.sin(b) / b;
          vals.push(sv * sv);
        }
        const bars = makeBars(ts!, vals, 4.6, 0.3, 0xf97316);

        addLbl("#475569", "Single narrow slit", [-1.5, 4.6, 0], `width a = ${slitWmm.toFixed(2)} mm`, [-1.5, 2.6, 0]);
        addLbl("#f97316", "Screen — sinc² distribution", [4.6, 4.6, 0], "broad central maximum, weaker lobes", [4.6, 3.4, 0]);
        addLbl("#fef3c7", "Central maximum — widest", [4.6, 2.4, 0], "≈ 2λD/a full width", [4.6, 1.6, 0]);
const barMats2 = (bars.children as THREE.Mesh[]).map((c) => c.material as THREE.MeshStandardMaterial);

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          barMats2.forEach((m, i) => { m.emissiveIntensity = 0.35 + 0.5 * Math.abs(Math.sin(t * 2.4 + i * 0.3)); });
          if (leaderLayer) leaderLayer.draw(ts!.camera, connections);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch { /* CSS2D/WebGL unavailable */ }
    })();

    return () => {
      cancelled = true;
      if (ts) disposeThreeScene(ts);
      if (unbind) unbind();
      if (labelRenderer?.domElement?.parentNode) labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement);
      leaderLayer?.dispose?.();
    };
  }, [webGL, slitWmm, lambdaNm]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Slit width a</Label><span className="text-sm font-semibold text-primary">{slitWmm.toFixed(2)} mm</span></div>
            <Slider value={[slitWmm]} min={0.05} max={0.5} step={0.01} onValueChange={(v) => setSlitWmm(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Wavelength λ</Label><span className="text-sm font-semibold text-primary">{lambdaNm} nm</span></div>
            <Slider value={[lambdaNm]} min={400} max={700} step={5} onValueChange={(v) => setLambdaNm(v[0])} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">First minimum θ₁</p><p className="text-sm font-bold text-amber-500">{(thetaFirst * 180 / Math.PI).toFixed(1)}°</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">λ/a ratio</p><p className="text-sm font-bold text-emerald-500">{(lam / a).toFixed(3)}</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="A single narrow gap spreads light sideways; the tall central bar sits directly ahead with symmetric, lower side lobes on the screen."
        predict="Shrink a and the whole pattern widens — the first minimum falls at bigger angle because sinθ = λ/a."
        principle="Fraunhofer diffraction I = I₀(sinβ/β)², β = (πa sinθ)/λ. Minima at a·sinθ = mλ; the central lobe is twice as broad as each side lobe."
        why="Diffraction sets the resolution limit of telescopes and phone cameras — the aperture is what blurs fine detail."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 3 — Polarisation & Brewster's law
 * ===================================================================== */

const PolarizationTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [thetaDeg, setThetaDeg] = useState(56.3); // near Brewster for glass n=1.5
  const [nGlass, setNG] = useState(1.5);

  const th = (thetaDeg * Math.PI) / 180;
  const thetaB = Math.atan(nGlass);
  const brewDeg = (thetaB * 180) / Math.PI;
  const polarized = Math.abs(thetaDeg - brewDeg) < 1.5;

  useEffect(() => {
    if (!mountRef.current || !webGL) return;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;

    (async () => {
      try {
        const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
        if (!mountRef.current || cancelled) return;
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(8, 5.5, 12), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `Brewster's angle for glass n = ${nGlass.toFixed(2)} is ${brewDeg.toFixed(1)}°`, new THREE.Vector3(0, 4.8, 0));

        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
        labelRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
        mountRef.current!.appendChild(labelRenderer.domElement);
        try { leaderLayer = createLeaderLayer(mountRef.current!); } catch { leaderLayer = null; }

        const connections: any[] = [];
        const addLbl = (color: string, t: string, pos: [number, number, number], sub?: string, target?: [number, number, number]) => {
          const o = new CSS2DObject(mkLabel(color, t, sub));
          o.position.set(pos[0], pos[1], pos[2]);
          ts!.group.add(o);
          if (target) connections.push({ label: o, target: new THREE.Vector3(target[0], target[1], target[2]), color });
        };

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(18, 0.3, 12), standardMaterial(0x1e293b, { roughness: 0.95 })));

        /* glass slab */
        const slab = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.7, 4.4), standardMaterial(0x67e8f9, { transparent: true, opacity: 0.4, metalness: 0.1 }));
        slab.rotation.z = (thetaB * 180) / Math.PI > 40 ? -0.2 : 0.2;
        slab.position.set(-1.5, 1.6, 0);
        ts.group.add(slab);

        /* incident, reflected, refracted beams */
        const origin = new THREE.Vector3(-1.5, 1.6, 0);
        const dirIn = new THREE.Vector3(-Math.cos(thetaB), -Math.sin(thetaB), 0).normalize();
        arrow(dirIn, origin, 4.0, 0xfef08a);
        const dirRef = new THREE.Vector3(Math.cos(thetaB), Math.sin(thetaB), 0);
        arrow(dirRef, origin, 4.2, 0x38bdf8);
        const dirTrans = new THREE.Vector3(Math.sin(thetaB), -Math.cos(thetaB), 0);
        arrow(dirTrans, origin, 3.0, 0x4ade80);

        addLbl("#fef08a", `Incident unpolarised, i = ${thetaDeg}°`, [-5.4, 4.0, 0], "vibrations in every plane", [-5.4 + Math.cos(thetaB) * 2, 1.6 + Math.sin(thetaB) * 2, 0]);
        addLbl("#38bdf8", "Reflected ray", [1.6, 4.4, 0], "polarised ⊥ to the plane at Brewster", [1.2, 2.6, 0]);
        addLbl("#4ade80", "Refracted ray", [0.9, 4.2, 0], "slightly polarised parallel", [0.4, 1.8, 0]);
        addLbl("#f97316", polarized ? "✔ Brewster angle — reflected ray is fully polarised" : "Not at Brewster — mixed", [-0.5, 4.4, 0], `θ_B = tan⁻¹(n) = ${brewDeg.toFixed(1)}°`, [origin.x, origin.y + 0.4, 0]);

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          if (leaderLayer) leaderLayer.draw(ts!.camera, connections);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch { /* CSS2D/WebGL unavailable */ }
    })();

    return () => {
      cancelled = true;
      if (ts) disposeThreeScene(ts);
      if (unbind) unbind();
      if (labelRenderer?.domElement?.parentNode) labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement);
      leaderLayer?.dispose?.();
    };
  }, [webGL, thetaDeg, nGlass]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Angle of incidence i</Label><span className="text-sm font-semibold text-primary">{thetaDeg.toFixed(1)}°</span></div>
            <Slider value={[thetaDeg]} min={0} max={80} step={0.5} onValueChange={(v) => setThetaDeg(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Refractive index n</Label><span className="text-sm font-semibold text-primary">{nGlass.toFixed(2)}</span></div>
            <Slider value={[nGlass]} min={1} max={2} step={0.05} onValueChange={(v) => setNG(v[0])} />
          </div>
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-center">
            <p className="text-[10px] uppercase text-muted-foreground">Brewster angle θ_B = tan⁻¹(n)</p>
            <p className="text-sm font-bold text-amber-500">{brewDeg.toFixed(1)}°</p>
          </div>
          <div className="rounded-md border p-2 text-center text-xs" style={{ borderColor: polarized ? "#22c55e55" : "#64748b55", background: polarized ? "#22c55e11" : "transparent", color: polarized ? "#4ade80" : "#94a3b8" }}>
            {polarized ? "✔ At Brewster — reflected ray is fully polarised perpendicular to the plane of incidence" : "Not at Brewster — reflected light is only partially polarised"}
          </div>
        </div>
      </div>
      <TheoryPanel
        look="Unpolarised light strikes glass; the reflected blue ray and refracted green ray split directions. The green badge turns on at exactly the Brewster angle."
        predict="Set the angle to tan⁻¹(n). At that angle the reflected and refracted rays are perpendicular and the reflection is 100% polarised."
        principle="Brewster's law: tanθ_B = n. At θ_B the reflected beam is polarised in the plane perpendicular to incidence, since the parallel component cannot reflect."
        why="Polaroid sunglasses are set at Brewster's angle for the water or road surface — they kill exactly the glare you want to remove."
      />
    </div>
  );
};
/* =====================================================================
 * Main suite
 * ===================================================================== */

export const WaveOpticsSuite3D: React.FC = () => {
  const [tab, setTab] = useState("interference");

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">🌊 Wave Optics Suite</CardTitle>
        <CardDescription>
          NEB Physics XII — Young's double-slit interference, single-slit diffraction, and Brewster polarisation — all in labelled 3D.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="interference">Interference</TabsTrigger>
            <TabsTrigger value="diffraction">Diffraction</TabsTrigger>
            <TabsTrigger value="polarization">Polarisation</TabsTrigger>
          </TabsList>
          <TabsContent value="interference"><InterferenceTab /></TabsContent>
          <TabsContent value="diffraction"><DiffractionTab /></TabsContent>
          <TabsContent value="polarization"><PolarizationTab /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WaveOpticsSuite3D;