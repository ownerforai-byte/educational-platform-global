"use client";

/**
 * Modern Physics & Communication suite — labelled 3D for NEB Physics XII:
 *   • Photoelectric effect — Einstein's equation, stopping potential
 *   • Bohr atom + spectrum   — energy levels, transitions, hydrogen lines
 *   • Nucleus                — (fission & fusion energy readouts)
 *   • Semiconductors & Logic — p-n junction with AND/OR/NOT gates
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
/* =====================================================================
 * TAB 1 — Photoelectric effect
 * ===================================================================== */

const WORK_CN: Record<string, number> = { Cesium: 2.1, Zinc: 4.3, Copper: 4.7, Sodium: 2.3 };

const PhotoelectricTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [lambdaNm, setLambdaNm] = useState(400);
  const [metal, setMetal] = useState("Cesium");
  const [intensity, setIntensity] = useState(5);

  const hc = 1240; // eV·nm
  const f = hc / lambdaNm;
  const phi = WORK_CN[metal];
  const keMax = Math.max(0, f - phi);

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(9, 4.5, 13), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `Photoelectric — hf = ${f.toFixed(2)} eV ; φ(${metal}) = ${phi.toFixed(1)} eV`, new THREE.Vector3(0, 4.6, 0));

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

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 13), standardMaterial(0x1e293b, { roughness: 0.95 })));

        const tube = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 6.4, 24, 1, true), (() => { const m = standardMaterial(0x67e8f9, { transparent: true, opacity: 0.12 }); m.side = THREE.DoubleSide; return m; })());
        tube.position.set(0, 3.4, 0);
        ts.group.add(tube);

        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.6, 2.6), standardMaterial(0x64748b, { metalness: 0.8 }));
        plate.position.set(-4.6, 2.6, 0);
        ts.group.add(plate);

        const anode = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.6, 16), standardMaterial(0xf87171, { metalness: 0.7 }));
        anode.rotation.x = Math.PI / 2;
        anode.position.set(4.2, 2.6, 0);
        ts.group.add(anode);

        const photons: THREE.Mesh[] = [];
        for (let i = 0; i < intensity; i++) {
          const p = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), standardMaterial(0xfef08a, { emissive: 0xfef08a, emissiveIntensity: 1.4 }));
          p.position.set(-5.6 - i * 0.3, 2.6 + (i % 2) * 0.5, (i % 3) * 0.6);
          ts.group.add(p);
          photons.push(p);
        }
        const electrons: THREE.Mesh[] = [];
        for (let i = 0; i < Math.min(4, Math.max(0, Math.round(keMax * 2))); i++) {
          const e = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), standardMaterial(0x22d3ee, { emissive: 0x22d3ee, emissiveIntensity: 1.2 }));
          e.position.set(-4.2, 2.2, 0);
          ts.group.add(e);
          electrons.push(e);
        }

        addLbl("#fef08a", `Photons λ=${lambdaNm} nm → hf=${f.toFixed(2)} eV`, [-4.6, 4.8, 0], "more intensity = more photons, same energy", [-5.4, 3.4, 0]);
        addLbl("#64748b", `${metal} cathode, φ = ${phi.toFixed(1)} eV`, [-4.6, 1.2, 0], keMax > 0 ? "hf ≥ φ — electrons escape" : "hf < φ — NO emission", [-4.6, 2.4, 0]);
        addLbl("#22d3ee", "Photoelectrons", [1.4, 1.0, 0], `KE_max = hf − φ = ${keMax.toFixed(2)} eV`, [1.4, 2.6, 0]);
        addLbl("#f87171", "Anode (collector)", [5.2, 3.9, 0], "current ∝ number of electrons", [4.2, 2.9, 0]);
const electronMats = electrons.map((e) => e.material as THREE.MeshStandardMaterial);
        const photonMats = photons.map((p) => p.material as THREE.MeshStandardMaterial);

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          photons.forEach((p, i) => { p.position.x = -5.6 - ((t * 1.2 + i * 0.5) % 6.4); p.position.x = Math.min(-4.7, p.position.x); });
          electronMats.forEach((m, i) => { m.emissiveIntensity = keMax > 0 ? 1.0 + 0.5 * Math.sin(t * 5 + i) : 0.05; });
          photonMats.forEach((m, i) => { m.emissiveIntensity = 0.9 + 0.7 * Math.sin(t * 6 + i); });
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
  }, [webGL, lambdaNm, metal, intensity]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Cathode metal</Label><span className="text-sm font-semibold text-primary">{metal} (φ={phi.toFixed(1)} eV)</span></div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(WORK_CN).map((m) => (
                <button key={m} onClick={() => setMetal(m)} className={`rounded-md border px-2 py-1 text-xs ${metal === m ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{m}</button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Wavelength λ</Label><span className="text-sm font-semibold text-primary">{lambdaNm} nm</span></div>
            <Slider value={[lambdaNm]} min={250} max={700} step={5} onValueChange={(v) => setLambdaNm(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Intensity (photon count)</Label><span className="text-sm font-semibold text-primary">{intensity}</span></div>
            <Slider value={[intensity]} min={2} max={10} step={1} onValueChange={(v) => setIntensity(v[0])} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Photon energy hf</p><p className="text-sm font-bold text-amber-500">{f.toFixed(2)} eV</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">KE_max = hf − φ</p><p className="text-sm font-bold text-emerald-500">{keMax.toFixed(2)} eV</p></div>
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Stopping potential V₀=KE/e</p><p className="text-sm font-bold text-sky-500">{keMax.toFixed(2)} V</p></div>
            <div className="rounded-md border border-red-500/30 bg-red-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Cut-off λ for {metal}</p><p className="text-sm font-bold text-red-500">{phi > 0 ? (1240 / phi).toFixed(0) : "—"} nm</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="Yellow photons hit the cathode; cyan electrons leave only when each photon carries enough energy (hf) to beat the metal's work function."
        predict="Shorten λ (raise hf) → electrons fly faster (bigger KE_max). Turn intensity up → more electrons, but each still has the same KE."
        principle="Einstein: KE_max = hf − φ; no emission below the threshold frequency. Since frequency (not brightness) sets electron speed, light must be quantised into photons of energy hf."
        why="This is the basis of solar panels, light sensors, photomultiplier tubes and the quantum threshold on which Einstein's Nobel rested."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 2 — Bohr atom & hydrogen spectrum
 * ===================================================================== */

const EN = (n: number) => -13.6 / (n * n);

const BohrTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [fromN, setFromN] = useState(3);
  const [toN, setToN] = useState(1);

  const eFrom = EN(fromN);
  const eTo = EN(toN);
  const photon = eTo - eFrom; // released energy → positive if from>to
  const lambdaNm = photon > 0 ? 1240 / photon : null; // nm

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(7, 5, 12), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, fromN > toN ? `Emission photon = ${photon.toFixed(2)} eV (λ ≈ ${lambdaNm ? lambdaNm.toFixed(0) : "—"} nm)` : "Choose n₁ > n₂ for emission", new THREE.Vector3(0, 5.4, 0));

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

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 13), standardMaterial(0x1e293b, { roughness: 0.95 })));

        /* nucleus (proton) */
        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 16), standardMaterial(0xef4444, { emissive: 0x7f1d1d, emissiveIntensity: 0.6 }));
        nucleus.position.set(0, 2.4, 0);
        ts.group.add(nucleus);

        /* orbit shells */
        const shellRadii = [0.9, 1.7, 2.7, 3.7];
        for (let n = 1; n <= 4; n++) {
          const r = shellRadii[n - 1];
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 48; i++) {
            const a = (i / 48) * Math.PI * 2;
            pts.push(new THREE.Vector3(r * Math.cos(a), 2.4, r * Math.sin(a)));
          }
          ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: n === 1 ? 0x38bdf8 : 0x475569, dashSize: 0.2, gapSize: 0.16 })));
          addLbl(n === 1 ? "#38bdf8" : "#64748b", `n = ${n}  E${n} = ${EN(n).toFixed(2)} eV`, [r + 0.4, n === 1 ? 3.4 : (n % 2 ? 4.0 : 1.4), (n % 2) * 0.6], "Bohr orbit", [r, 2.4, 0]);
        }

        /* electron on the starting level */
        const eStart = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), standardMaterial(0x22d3ee, { emissive: 0x22d3ee, emissiveIntensity: 1.2 }));
        ts.group.add(eStart);

        addLbl("#ef4444", "Nucleus (+e)", [0, 2.4 - 1.2, 0.6], "proton of hydrogen", [0, 2.4, 0]);
        addLbl("#22d3ee", "Electron", [0, 2.4 - 0.8, 2.6], `jumps from n=${fromN} to n=${toN}`, [0, 2.4, 0]);
        addLbl("#facc15", photon > 0 ? `Photon hν = ${photon.toFixed(2)} eV` : "Electron must absorb energy to go up", [4.6, 4.2, 0], photon > 0 ? `λ = ${lambdaNm ? lambdaNm.toFixed(0) : "—"} nm` : "difference = " + Math.abs(photon).toFixed(2) + " eV", [2.6, 3.0, 0]);

        const rFrom = shellRadii[fromN - 1] ?? shellRadii[0];
        const rTo = shellRadii[toN - 1] ?? shellRadii[0];

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          /* electron orbits on the current shell */
          eStart.position.set(rFrom * Math.cos(t * 2.2), 2.4, rFrom * Math.sin(t * 2.2));
          void rTo;
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
  }, [webGL, fromN, toN]);
return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>From level n₁</Label>
              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <button key={n} onClick={() => setFromN(n)} disabled={n === toN} className={`rounded-md border py-1 text-xs ${fromN === n ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>{n}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">To level n₂</Label>
              <div className="grid grid-cols-2 gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <button key={n} onClick={() => setToN(n)} disabled={n === fromN} className={`rounded-md border py-1 text-xs ${toN === n ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>n={n}</button>
                ))}
              </div>
            </div>
          </div>
          {fromN > toN && (
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2 text-center">
              <p className="text-[10px] uppercase text-muted-foreground">Emitted photon (Lyman/Balmer series)</p>
              <p className="text-sm font-bold text-amber-500">{photon.toFixed(2)} eV · λ = {lambdaNm ? (lambdaNm).toFixed(1) : "—"} nm</p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">E(n₁)</p><p className="text-sm font-bold text-sky-500">{eFrom.toFixed(2)} eV</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">E(n₂)</p><p className="text-sm font-bold text-emerald-500">{eTo.toFixed(2)} eV</p></div>
            <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">|ΔE|</p><p className="text-sm font-bold text-violet-500">{Math.abs(photon).toFixed(2)} eV</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="The hydrogen atom has a proton core and one electron on quantised shells. Pick two levels; when the electron drops (release) a photon with exactly the level spacing."
        predict="Drop 3→1 and you get the highest-energy Lyman photon; 3→2 gives the red Balmer Hα line. Electron can only sit on the allowed radii rₙ = n²a₀."
        principle="Bohr: Eₙ = −13.6/n² eV, rₙ = n²a₀, and transitions give hν = Eᵢ − Eⱼ with quantised angular momentum nh/2π. This single rule reproduces the whole hydrogen spectrum."
        why="Every star's temperature and composition is read from these exact spectral lines — the 'fingerprint' of hydrogen."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 3 — Nucleus: binding energy curve, fission & fusion
 * ===================================================================== */

const A_LIST = [2, 4, 7, 9, 12, 16, 20, 24, 28, 36, 40, 50, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];

const NucleusTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());

  const maxBE = 8.8; // Fe-56 peak per nucleon

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(0, 6, 13), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Binding energy per nucleon — the source of nuclear power", new THREE.Vector3(0, 5.0, 0));

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

        /* standard semi-empirical binding-energy curve (MeV) */
        function BEA(A: number, Z: number): number {
          const aV = 15.8, aS = 18.3, aC = 0.714, aA = 23.2, aP = 12;
          let E =
            aV * A -
            aS * Math.pow(A, 2 / 3) -
            aC * (Z * (Z - 1)) / Math.pow(A, 1 / 3) -
            aA * Math.pow(A - 2 * Z, 2) / A;
          if (A % 2 === 0 && Z % 2 === 0) E += aP / Math.pow(A, 3 / 4);
          else if (A % 2 === 1) { /* even-odd */ }
          else E -= aP / Math.pow(A, 3 / 4);
          return E / A;
        }
        const Zof = (A: number) => Math.max(1, Math.round(A / 2 - A * 0.002));
        const pts3: THREE.Vector3[] = [];
        for (let i = 0; i < A_LIST.length; i++) {
          const A = A_LIST[i];
          const x = (A / 250) * 16 - 8;
          const y = Math.max(0.5, BEA(A, Zof(A)) / 9.5) * 4.2;
          pts3.push(new THREE.Vector3(x, 0.5 + y, 0));
        }
        const curveMat = new THREE.LineBasicMaterial({ color: 0x4ade80 });
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts3), curveMat));
        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(16, 0.06, 4), standardMaterial(0x1e293b)));
        for (let i = 0; i < pts3.length; i++) {
          const pt = pts3[i];
          const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), standardMaterial(0x4ade80, { emissive: 0x4ade80, emissiveIntensity: 0.9 }));
          dot.position.copy(pt);
          ts.group.add(dot);
          const num = mkLabel("#86efac", `${A_LIST[i]}`);
          num.style.fontSize = "9px";
          const o = new CSS2DObject(num);
          o.position.set(pt.x, 0.3, 0);
          ts.group.add(o);
        }

        addLbl("#4ade80", "Binding energy / nucleon MEAN", [0, 4.6, 2.2], "peaks near A ≈ 56 (iron)", [0, 4.2, 0]);
        addLbl("#f97316", "Fission of heavy U-235 → smaller, tighter fragments", [-4.6, 3.2, 0], "energy released as they climb the curve", [-5.5, 2.2, 0]);
        addLbl("#facc15", "Fusion of light H → He climbs too", [3.8, 3.2, 0], "powers the Sun", [5.0, 2.2, 0]);
        addLbl("#38bdf8", "Iron-56 — most stable (peak)", [0, 4.4, 0], "fusion AND fission stop at iron", [0, 3.6, 0]);

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          if (leaderLayer) leaderLayer.draw(ts.camera, connections);
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
  }, [webGL]);
return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs">
            <p className="font-semibold text-emerald-500 mb-1">⚛ The curve is the graph of binding energy per nucleon vs mass number.</p>
            <p className="text-muted-foreground">Iron-56 sits at the peak ≈ 8.8 MeV/nucleon — the most tightly bound nucleus. Nuclides on either side release energy whenever they move toward iron.</p>
          </div>
          <div className="grid gap-2 text-center">
            <div className="rounded-md border border-orange-500/30 bg-orange-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Fission (U-235 → Ba + Kr + 3n)</p><p className="text-sm font-bold text-orange-500">≈ 200 MeV per fission</p></div>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Fusion (2H + 3H → 4He + n)</p><p className="text-sm font-bold text-amber-500">≈ 17.6 MeV per event</p></div>
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Peak of curve (iron)</p><p className="text-sm font-bold text-sky-500">{maxBE.toFixed(2)} MeV/nucleon</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="The green curve climbs steeply for light nuclei, peaks near A ≈ 56 and slowly falls for heavy nuclei. Each grey dot is the semi-empirical binding energy of that mass number."
        predict="Heavy nuclei like uranium sit on the falling branch — splitting them releases energy as the fragments climb toward the peak. Light nuclei on the rising branch release energy by fusing together."
        principle="B/A = (aV·A − ... − δ)/A. The final mass is smaller than the initial (mass defect), and E = Δm·c². Both fission of heavy and fusion of light release energy by moving toward the iron peak."
        why="Nuclear reactors farm fission's ~200 MeV; the Sun farms fusion's 17.6 MeV — together they light cities and stars."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 4 — Semiconductors & Communication (logic gates + AM/FM)
 * ===================================================================== */

const LogicTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [aIn, setAIn] = useState(1);
  const [bIn, setBIn] = useState(0);
  const [showAm, setShowAm] = useState(true);

  const andOut = aIn && bIn ? 1 : 0;
  const orOut = aIn || bIn ? 1 : 0;
  const notOut = aIn ? 0 : 1;

  useEffect(() => {
    if (!mountRef.current || !webGL) return;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;
    void showAm; void aIn; void bIn;

    (async () => {
      try {
        const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
        if (!mountRef.current || cancelled) return;
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(8, 5, 12), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Semiconductor logic gates & AM / FM modulation", new THREE.Vector3(0, 4.8, 0));

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

        /* three logic gate blocks */
        const gates = ["AND", "OR", "NOT"];
        gates.forEach((g, i) => {
          const x = -6 + i * 5.2;
          const chip = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.9, 0.9), standardMaterial(i === 0 ? 0x38bdf8 : i === 1 ? 0x4ade80 : 0xf97316, { metalness: 0.35 }));
          chip.position.set(x, 3.4, 0);
          ts!.group.add(chip);
          addLbl(i === 0 ? "#38bdf8" : i === 1 ? "#4ade80" : "#f97316", `${g} gate`, [x, 4.8, 0], "built from diodes & transistors", [x, 3.9, 0]);
        });

        /* modulation wave (drawn as a tube) */
        const wavePts: THREE.Vector3[] = [];
        const Nw = 180;
        for (let i = 0; i <= Nw; i++) {
          const x = -9 + (18 * i) / Nw;
          const s = i / Nw;
          const carrier = Math.sin(s * Math.PI * 20);
          const message = 0.5 + 0.5 * Math.sin(s * Math.PI * 3);
          const y = 1.2 + (showAm ? carrier * (0.35 + 0.5 * message) : Math.sin(s * Math.PI * 20 + (showAm ? 0 : Math.sin(s * Math.PI * 3) * 2)) ) * 0.8;
          wavePts.push(new THREE.Vector3(x, y, 0));
        }
        const wave = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wavePts), 240, 0.04, 6), standardMaterial(0x22d3ee, { emissive: 0x22d3ee, emissiveIntensity: 0.6 }));
        ts.group.add(wave);

        addLbl("#22d3ee", showAm ? "AM signal — carrier amplitude follows the message" : "FM signal — carrier frequency follows the message", [0, 0.7, 2.4], "the message rides on a high-frequency carrier", [0, 1.5, 0]);

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          if (leaderLayer) leaderLayer.draw(ts.camera, connections);
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
  }, [webGL, aIn, bIn, showAm]);
return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
              <input type="checkbox" checked={!!aIn} onChange={(e) => setAIn(e.target.checked ? 1 : 0)} className="h-4 w-4 accent-primary" /> Input A
            </label>
            <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
              <input type="checkbox" checked={!!bIn} onChange={(e) => setBIn(e.target.checked ? 1 : 0)} className="h-4 w-4 accent-primary" /> Input B
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showAm} onChange={(e) => setShowAm(e.target.checked)} className="h-4 w-4 accent-primary" />
            Show AM (unchecked = FM)
          </label>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">A AND B</p><p className="text-2xl font-bold text-sky-500">{andOut}</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">A OR B</p><p className="text-2xl font-bold text-emerald-500">{orOut}</p></div>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">NOT A</p><p className="text-2xl font-bold text-amber-500">{notOut}</p></div>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3 text-xs">
            <p className="font-semibold mb-1">Truth table</p>
            <p className="text-muted-foreground">AND: 1 only when both inputs are 1 · OR: 1 when either input is 1 · NOT: inverts. NAND = NOT AND and NOR = NOT OR are the universal gates every chip is built from.</p>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="Three labelled gate chips stand over a blue modulation wave. Toggle A and B and watch AND/OR/NOT readouts; flip the AM/FM switch and see the carrier change."
        predict="Any Boolean function can be made with NAND gates alone — that's why every processor is a sea of NAND/NOR made from p-n junctions and transistors."
        principle="A p-n junction conducts one way (diode); a bipolar transistor is two junctions on one crystal. In communication, a carrier wave is modulated — amplitude (AM) or frequency (FM) — to carry the baseband message, then demodulated at the receiver."
        why="Radio, Wi-Fi, 4G/5G and every digital processor are simply these junctions modulated and gated at scale — the communication syllabus made concrete."
      />
    </div>
  );
};
/* =====================================================================
 * Main suite
 * ===================================================================== */

export const ModernPhysicsSuite3D: React.FC = () => {
  const [tab, setTab] = useState("photoelectric");

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">⚛️ Modern Physics & Communication Suite</CardTitle>
        <CardDescription>
          NEB Physics XII — Photoelectric effect (Einstein's equation), Bohr atom & hydrogen spectrum, nuclear
          binding-energy (fission & fusion), and semiconductors / logic gates / AM–FM — all in labelled 3D.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="photoelectric">Photoelectric</TabsTrigger>
            <TabsTrigger value="bohr">Bohr atom</TabsTrigger>
            <TabsTrigger value="nucleus">Nucleus</TabsTrigger>
            <TabsTrigger value="semi">Semiconductors & comms</TabsTrigger>
          </TabsList>
          <TabsContent value="photoelectric"><PhotoelectricTab /></TabsContent>
          <TabsContent value="bohr"><BohrTab /></TabsContent>
          <TabsContent value="nucleus"><NucleusTab /></TabsContent>
          <TabsContent value="semi"><LogicTab /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModernPhysicsSuite3D;