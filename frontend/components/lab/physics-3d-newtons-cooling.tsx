"use client";

/**
 * 3D Newton's Law of Cooling Experiment — Determination of the cooling
 * constant k with fully labelled components, live exponential decay curve,
 * and theory panels.
 *
 * Physics:  dT/dt = −k(T − T_s)   →   T(t) = T_s + (T₀ − T_s)·e^(−kt)
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { createLeaderLayer } from "./leader-lines";
import {
  disposeThreeScene,
  type ThreeScene,
} from "@/components/lab/three-scene";

/* ---------------- Data ---------------- */

const LIQUIDS = [
  { name: "Water", c: 4186, color: "#0ea5e9", scene: 0x0ea5e9, note: "High specific heat — cools slowly and evenly; the classic test liquid." },
  { name: "Olive oil", c: 1970, color: "#84cc16", scene: 0x65a30d, note: "Half of water's c — reaches measurable temperatures faster." },
  { name: "Glycerin", c: 2430, color: "#fbbf24", scene: 0xd97706, note: "Viscous, good wetting — smooth convection currents, easy readings." },
] as const;

export const NewtonCoolingExperiment: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<any>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [liqIdx, setLiqIdx] = useState(0);
  const [T0, setT0] = useState(82); // initial temperature °C
  const [Ts, setTs] = useState(27); // surrounding temperature °C
  const [kPerMin, setKPerMin] = useState(0.32); // cooling constant /min
  const [duration, setDuration] = useState(12); // minutes plotted
  const [running, setRunning] = useState(true);

  const liq = LIQUIDS[liqIdx];
  const tHalf = kPerMin > 0 ? Math.LN2 / kPerMin : NaN;
  const Tat = (t: number) => Ts + (T0 - Ts) * Math.exp(-kPerMin * t);
  const table = [2, 4, 6, 8].map((t) => ({ t, T: Tat(Math.min(t, duration)) }));

  useEffect(() => {
    const container = mountRef.current!;
    if (!container || !webGL) return;

    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;

    async function init() {
      try {
        const mod = await import("@/components/lab/three-scene");
        const { createThreeScene, bindResize, standardMaterial, titleText } = mod;
        if (!container || cancelled) return;

        ts = createThreeScene(container, {
          cameraPosition: new THREE.Vector3(1.5, 4.6, 13.5),
          autoRotate: false,
          background: 0x0b1220,
        });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Newton's Law of Cooling", new THREE.Vector3(-2.5, 3.5, 0));

        /* ================= Calorimeter assembly (left) ================= */
        const calX = -5.2;
        // Outer insulating jacket (double wall)
        const shellMat = standardMaterial(0x38bdf8, { transparent: true, opacity: 0.16 });
        shellMat.side = THREE.DoubleSide;
        const shell = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.62, 2.6, 36, 1, true), shellMat);
        shell.position.set(calX, 1.3, 0);
        ts.group.add(shell);
        const shellBase = new THREE.Mesh(new THREE.CylinderGeometry(1.72, 1.72, 0.16, 36), standardMaterial(0x475569));
        shellBase.position.set(calX, 0.08, 0);
        ts.group.add(shellBase);
        // Inner polished calorimeter with liquid
        const calorimeter = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 2.25, 36), standardMaterial(0xdfe7ef, { metalness: 0.85, roughness: 0.25 }));
        calorimeter.position.set(calX, 1.22, 0);
        ts.group.add(calorimeter);
        const liqColor = liq.scene as number;
        const liquidMat = standardMaterial(liqColor, { transparent: true, opacity: 0.55, emissive: liqColor, emissiveIntensity: 0.3 });
        const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.98, 1.5, 36), liquidMat);
        liquid.position.set(calX, 1.0, 0);
        ts.group.add(liquid);
        const lidRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.09, 10, 36), standardMaterial(0x94a3b8));
        lidRing.rotation.x = Math.PI / 2;
        lidRing.position.set(calX, 2.4, 0);
        ts.group.add(lidRing);

        /* Stirrer */
        const stirrer = new THREE.Group();
        const stRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.7, 8), standardMaterial(0xa8a29e, { metalness: 0.8 }));
        stRod.position.y = 0.35;
        stirrer.add(stRod);
        const stLoop = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.035, 8, 24), standardMaterial(0xa8a29e, { metalness: 0.8 }));
        stLoop.position.y = -0.85;
        stirrer.add(stLoop);
        stirrer.position.set(calX - 0.55, 1.15, 0.35);
        ts.group.add(stirrer);

        /* Thermometer through lid */
        const thermStem = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 3.4, 10), standardMaterial(0xf8fafc, { metalness: 0.2 }));
        thermStem.position.set(calX + 0.35, 2.85, 0);
        ts.group.add(thermStem);
        const mercuryMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.9 });
        const mercury = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 8), mercuryMat);
        mercury.position.set(calX + 0.35, 1.7, 0);
        ts.group.add(mercury);
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 14), mercuryMat.clone());
        bulb.position.set(calX + 0.35, 0.45, 0);
        ts.group.add(bulb);

        /* Cooling radiance rings (expanding, fading) */
        const waves: Array<{ mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number }> = [];
        for (let i = 0; i < 3; i++) {
          const m = standardMaterial(0x93c5fd, { emissive: 0x93c5fd, emissiveIntensity: 0.7, transparent: true, opacity: 0.5 });
          const ring = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.03, 8, 48), m);
          ring.position.copy(shell.position);
          ring.visible = false;
          ts.group.add(ring);
          waves.push({ mesh: ring, mat: m, phase: i / 3 });
        }

        /* ================= Decay-curve graph (right) ================= */
        const gO = new THREE.Vector3(-2.3, 0.35, -0.4);
        const gW = 8.8, gH = 3.1;
        const axisMat = new THREE.LineBasicMaterial({ color: 0x64748b });
        const mkSeg = (a: THREE.Vector3, b: THREE.Vector3) => new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), axisMat);
        ts.group.add(mkSeg(gO.clone(), gO.clone().add(new THREE.Vector3(gW, 0, 0))));
        ts.group.add(mkSeg(gO.clone(), gO.clone().add(new THREE.Vector3(0, gH, 0))));

        const axisMin = Math.max(0, Ts - 6);
        const spanT = Math.max(T0 - axisMin + 6, 55);
        const tx = (t: number) => gO.x + (t / duration) * gW;
        const ty = (T: number) => gO.y + ((T - axisMin) / spanT) * gH;
        const NPTS = 140;
        const fullPts: THREE.Vector3[] = [];
        for (let i = 0; i <= NPTS; i++) {
          const t = (i / NPTS) * duration;
          fullPts.push(new THREE.Vector3(tx(t), ty(Tat(t)), gO.z));
        }
        const dashed = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(fullPts),
          new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.16, gapSize: 0.12 })
        );
        dashed.computeLineDistances();
        ts.group.add(dashed);
        const solidGeo = new THREE.BufferGeometry().setFromPoints(fullPts);
        solidGeo.setDrawRange(0, 0);
        ts.group.add(new THREE.Line(solidGeo, new THREE.LineBasicMaterial({ color: 0x22d3ee })));
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), standardMaterial(0x22d3ee, { emissive: 0x22d3ee, emissiveIntensity: 1.2 }));
        dot.position.copy(fullPts[0]);
        ts.group.add(dot);
        const dotLight = new THREE.PointLight(0x22d3ee, 0.7, 7);
        dotLight.position.copy(fullPts[0]);
        ts.group.add(dotLight);

        /* minute ticks every 2 min */
        for (let tm = 0; tm <= duration; tm += 2) {
          const sp = titleText(ts, `${tm}′`, new THREE.Vector3(tx(tm), gO.y - 0.3, gO.z));
          if (sp) sp.scale.set(1.1, 0.3, 1);
        }
        const lblTs = titleText(ts, `Ts=${Ts}°C`, new THREE.Vector3(gO.x - 1.15, ty(Ts), gO.z));
        if (lblTs) lblTs.scale.set(2.6, 0.64, 1);
        const lblT0 = titleText(ts, `T₀=${T0}°C`, new THREE.Vector3(gO.x - 1.15, ty(T0), gO.z));
        if (lblT0) lblT0.scale.set(2.6, 0.64, 1);
        const lblAx = titleText(ts, "t (min)", new THREE.Vector3(gO.x + gW + 0.85, gO.y - 0.05, gO.z));
        if (lblAx) lblAx.scale.set(2.3, 0.52, 1);

        storeRef.current = { stirrer, mercury, bulb, waves, dot, dotLight, solidGeo, fullPts, tx, ty };

        /* ---------- LABELS ---------- */
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(container.clientWidth, container.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          container.appendChild(labelRenderer.domElement);

          const mkLabel = (color: string, title: string, sub?: string) => {
            const el = document.createElement("div");
            el.className = "label";
            el.innerHTML =
              `<div style="background:rgba(0,0,0,0.82);padding:4px 8px;border-radius:4px;border:1px solid ${color};white-space:nowrap">` +
              `<span style="color:${color};font-weight:600;font-size:11px">${title}</span>` +
              (sub ? `<br><span style="color:#cbd5e1;font-size:10px">${sub}</span>` : "") +
              `</div>`;
            return el;
          };
          const connections: Array<{ label: THREE.Object3D; target: THREE.Vector3; color: string }> = [];
          try { leaderLayer = createLeaderLayer(container); } catch { leaderLayer = null; }
          const addLbl = (color: string, title: string, pos: [number, number, number], sub?: string, target?: [number, number, number]) => {
            const o = new CSS2DObject(mkLabel(color, title, sub));
            o.position.set(pos[0], pos[1], pos[2]);
            ts!.group.add(o);
            if (target) {
              connections.push({
                label: o,
                target: new THREE.Vector3(target[0], target[1], target[2]),
                color,
              });
            }
          };

          addLbl("#e2e8f0", "Calorimeter", [calX - 3.4, 2.35, 0], "polished copper inner vessel", [calX, 1.5, 0]);
          addLbl(liq.color, `Liquid — ${liq.name}`, [calX - 3.4, 0.85, 0], "live temperature shown on thermometer", [calX, 0.85, 0]);
          addLbl("#38bdf8", "Double-wall Jacket", [calX + 3.1, 1.9, 0], "trapped-air insulating gap", [calX, 1.62, 0]);
          addLbl("#ef4444", "Thermometer", [calX + 0.55, 4.9, 0], "T(t) falls exponentially", [calX + 0.62, 3.1, 0]);
          addLbl("#94a3b8", "Stirrer", [calX - 3.0, -0.6, 0.8], "keeps liquid temperature uniform", [calX - 1.75, 0.5, 0.4]);
          const lblSurroundings = titleText(ts!, "Surroundings T_s", new THREE.Vector3(calX, -0.35, 0));
          if (lblSurroundings) lblSurroundings.scale.set(3.4, 0.72, 1);

          /* ---------- ANIMATION LOOP ---------- */
          const s = storeRef.current;
          let elapsed = 0;
          let last = performance.now();
          function animate() {
            if (cancelled || !ts) return;
            requestAnimationFrame(animate);
            const now = performance.now();
            if (running) elapsed += (now - last) / 1000 * 3;
            last = now;
            if (elapsed > duration) elapsed %= duration;

            const t = elapsed;
            const idx = Math.min(fullPts.length - 1, Math.max(1, Math.round((t / duration) * (fullPts.length - 1))));
            solidGeo.setDrawRange(0, idx + 1);
            s.dot.position.copy(fullPts[idx]);
            s.dotLight.position.copy(s.dot.position);

            const span = Math.max(T0 - Ts, 1);
            const frac = Math.min(1, Math.max(0, (Tat(t) - Ts) / span));
            s.mercury.scale.y = 0.22 + frac * 0.78;
            s.mercury.position.y = 0.52 + (s.mercury.scale.y * 2.6) / 2 * 0.99;

            s.stirrer.rotation.y += 0.03;
            s.waves.forEach((w: any) => {
              const u = ((t * 0.32) + w.phase) % 1;
              w.mesh.visible = true;
              w.mesh.scale.setScalar(1 + u * 0.95);
              w.mat.opacity = Math.max(0, 0.5 * (1 - u));
            });

            ts.controls.update();
            ts.renderer.render(ts.scene, ts.camera);
            if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
            if (leaderLayer) leaderLayer.draw(ts.camera, connections);
          }
          animate();
        } catch { console.log("CSS2DRenderer not available"); }
      } catch (err) {
        console.error("NewtonCooling init:", err);
      }
    }
    init();

    return () => {
      cancelled = true;
      unbind?.();
      if (ts) try { disposeThreeScene(ts); } catch {}
      const m = container;
      if (labelRenderer?.domElement && m && labelRenderer.domElement.parentNode === m) {
        m.removeChild(labelRenderer.domElement);
      }
      try { leaderLayer?.dispose?.(); } catch {}
      if (m) m.querySelectorAll(".label").forEach((e) => e.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, liqIdx, T0, Ts, kPerMin, duration, running]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>⏳ Newton's Law of Cooling — Determination of the Cooling Constant k</CardTitle>
        <CardDescription>
          Hot liquid in a double-walled calorimeter loses heat to surroundings at a rate proportional to the EXCESS temperature (T − Ts). The thermometer traces an exponential decay whose time-constant yields k, verified against the growing curve plotted beside it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* ---------- labeled 3D scene area ---------- */}
        <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-primary/30 overflow-hidden bg-slate-950" aria-label="3D Newton's law of cooling apparatus with labelled components and decay curve">
          <div ref={mountRef} className="absolute inset-0" />
          {!webGL && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
              WebGL is unavailable in this browser — the labelled 3D apparatus cannot be rendered.
            </div>
          )}
          <span className="absolute bottom-2 left-2 text-[10px] text-slate-400 bg-black/40 rounded px-2 py-1 pointer-events-none">left: calorimeter · right: T–t graph builds live</span>
        </div>

        {/* ---------- controls ---------- */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Label>Test liquid</Label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {LIQUIDS.map((lq, i) => (
                <Button key={lq.name} size="sm" variant={i === liqIdx ? "default" : "outline"} onClick={() => setLiqIdx(i)}>{lq.name}</Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{liq.note}</p>
          </div>
          <div><Label>Initial temperature T₀ ({T0} °C)</Label><Slider min={50} max={98} step={1} value={[T0]} onValueChange={(v) => setT0(Math.max(v[0], Ts + 8))} /></div>
          <div><Label>Surroundings Ts ({Ts} °C)</Label><Slider min={5} max={40} step={1} value={[Ts]} onValueChange={(v) => setTs(Math.min(v[0], T0 - 8))} /></div>
          <div><Label>Cooling constant k ({kPerMin.toFixed(2)} min⁻¹)</Label><Slider min={0.06} max={1} step={0.02} value={[kPerMin]} onValueChange={(v) => setKPerMin(v[0])} /><p className="text-xs text-muted-foreground">set by draught, surface & emissivity</p></div>
          <div><Label>Simulation window ({duration} min)</Label><Slider min={6} max={20} step={1} value={[duration]} onValueChange={(v) => setDuration(v[0])} /></div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant={running ? "default" : "outline"} onClick={() => setRunning(!running)}>{running ? "Pause simulation" : "Resume simulation"}</Button>
          <Button variant="outline" size="sm" onClick={() => { setLiqIdx(0); setT0(82); setTs(27); setKPerMin(0.32); setDuration(12); setRunning(true); }}>Reset to default</Button>
        </div>

        {/* ---------- live results ---------- */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-2 text-primary">Verification numbers</h4>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
            <div className="flex justify-between"><span>Model law used:</span><span className="font-mono">T(t)=Ts+(T₀−Ts)e^(−kt)</span></div>
            <div className="flex justify-between"><span>Half-excess time ln2/k:</span><span className="font-mono text-base font-bold">{tHalf.toFixed(2)} min</span></div>
            <div className="flex justify-between"><span>Initial excess (T₀−Ts):</span><span className="font-mono">{T0 - Ts} K</span></div>
            <div className="flex justify-between"><span>Initial cooling rate:</span><span className="font-mono">{(-kPerMin * (T0 - Ts)).toFixed(2)} °C/min</span></div>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="text-sm w-full max-w-md">
              <thead><tr className="text-left text-muted-foreground"><th className="pr-4 py-1 font-medium">t (min)</th>{table.map((r) => (<th key={r.t} className="pr-4 py-1 font-mono font-medium">{r.t}</th>))}</tr></thead>
              <tbody><tr><td className="pr-4 py-1 text-muted-foreground">T (°C)</td>{table.map((r) => (<td key={r.t} className="pr-4 py-1 font-mono">{r.T.toFixed(1)}</td>))}</tr></tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Equal half-life property: every successive drop of the excess by a factor ½ takes the SAME time ln2/k — the signature check that cooling follows Newton's law.</p>
        </div>

        {/* ---------- labelled parts guide ---------- */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Parts guide — border colour · position · physical role</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { c: liq.color, n: `Liquid (${liq.name})`, p: "inner calorimeter fill", s: "released hot at T₀, cools naturally toward Ts" },
              { c: "#e2e8f0", n: "Calorimeter", p: "polished core vessel", s: "shiny walls cut radiation so convection rules" },
              { c: "#38bdf8", n: "Double-wall jacket", p: "translucent outer shell", s: "trapped air blocks draught-driven heat paths" },
              { c: "#ef4444", n: "Thermometer", p: "through lid centre", s: "each reading is one point on the decay curve" },
              { c: "#94a3b8", n: "Stirrer", p: "looped rod inside liquid", s: "uniform bulk temperature for honest bulb readings" },
              { c: "#22c55e", n: "Surroundings Ts", p: "floor tag", s: "the asymptote the curve approaches, never crosses" },
              { c: "#475569", n: "Dashed model curve", p: "graph backdrop", s: "full analytic e^(−kt) prediction as reference" },
              { c: "#22d3ee", n: "Solid recorded curve", p: "grows left→right", s: "the 'experiment'; overlap with dashed = law verified" },
            ].map((g) => (
              <div key={g.n} className="flex items-start gap-2 rounded-md border-l-4 bg-background/60 p-2" style={{ borderColor: g.c }}>
                <div>
                  <p className="text-xs font-semibold">{g.n}</p>
                  <p className="text-[11px] text-muted-foreground"><span className="font-medium">Position:</span> {g.p}</p>
                  <p className="text-[11px] text-muted-foreground">{g.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TheoryPanel
          title="Newton's Law of Cooling — complete theory"
          vocabulary="Excess temperature (T − Ts): the true driving quantity; Rate of cooling dT/dt: curve slope; Constant k (min⁻¹): bundles area, emissivity, draught & convection into one number."
          look="Cyan curve starts steep and gently hugs the Ts line — an exponential never crosses its asymptote; equal FRACTIONS of excess take equal times, not equal amounts."
          predict={`Slide k: 0.06 stretches the curve nearly flat, 1.0 plunges it in ~2 min. Initial slope always equals −k(T₀−Ts) — bigger excess, faster fall.`}
          principle={
            <>
              <span className="block font-mono text-[11px] text-foreground">dT/dt = −k(T − Ts)</span>
              Integrating,
              <span className="block font-mono text-[11px] text-foreground">T(t) = Ts + (T₀ − Ts)·e^(−kt)</span>
              Lab test: ln(T − Ts) vs t must be a straight line whose slope is −k — how k is actually extracted.
            </>
          }
          why="Forced-convection or modest-excess cooling: coffee, motor housings, CPU heatsinks, bread — even lake-water moderation of night climate uses this same exponential."
        />

        {/* ---------- complete meaning of every symbol ---------- */}
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-4">
          <h4 className="font-semibold mb-1 text-primary">📖 Complete meaning of every symbol in T(t) = Ts + (T₀ − Ts)·e^(−kt)</h4>
          <p className="text-xs text-muted-foreground mb-3">This IS the whole experiment. Each symbol maps to a labelled part of the calorimeter above — follow the arrows.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { s: "T(t)", n: "Temperature of the liquid at time t (°C)", m: "The instant thermometer reading as the hot liquid cools. It falls fast at first, then crawls toward room temperature." },
              { s: "T₀", n: "Initial temperature of the liquid (°C)", m: "The temperature at t = 0, just after the hot liquid is poured in — the highest point of the decay curve." },
              { s: "Ts", n: "Surroundings (room) temperature (°C)", m: "The final asymptote the curve approaches but never crosses. Cooling stops only when the excess T − Ts reaches zero." },
              { s: "(T₀ − Ts)", n: "Initial excess temperature (°C)", m: "How far above the surroundings the liquid started. Everything that happens later is a shrinking FRACTION of this number." },
              { s: "e^(−kt)", n: "Exponential decay factor (dimensionless)", m: "Runs from 1 (at t = 0) toward 0, scaling the excess temperature down through time — why equal FRACTIONS of excess take equal times." },
              { s: "k", n: "Cooling constant (min⁻¹)", m: "THE quantity this lab determines. It bundles surface area, emissivity, draught and stirring into one number; the excess falls to 1/e ≈ 36.8% in 1/k minutes, and the half-excess time is ln2/k." },
              { s: "t", n: "Elapsed cooling time (min)", m: "The horizontal axis of the T–t graph being built live beside the apparatus." },
              { s: "dT/dt", n: "Instantaneous cooling rate (°C·min⁻¹)", m: "The slope of the curve's tangent. Newton's law states it is proportional to the current excess: dT/dt = −k(T − Ts)." },
            ].map((r) => (
              <div key={r.s} className="flex items-start gap-2 rounded-md border-l-4 bg-background/60 p-2" style={{ borderColor: "#f59e0b" }}>
                <span className="min-w-[72px] shrink-0 pt-0.5 font-serif italic text-[15px] font-bold text-amber-600">{r.s}</span>
                <div>
                  <p className="text-xs font-semibold">{r.n}</p>
                  <p className="text-[11px] text-muted-foreground">{r.m}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- significance & applications ---------- */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3"><span className="text-lg leading-none">⚙️</span><div><p className="text-sm font-medium">Engines</p><p className="text-xs text-muted-foreground">A radiator's effective k decides whether coolant returns cool after one loop — same exponential at work.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3"><span className="text-lg leading-none">💻</span><div><p className="text-sm font-medium">Electronics</p><p className="text-xs text-muted-foreground">Heatsink datasheets quote thermal time constants — k of this experiment applied to silicon.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-teal-500/30 bg-teal-500/5 p-3"><span className="text-lg leading-none">🍲</span><div><p className="text-sm font-medium">Food & body</p><p className="text-xs text-muted-foreground">Tea reaching drinkable temperature and hypothermia time-clocks both obey ceilings at their own Ts.</p></div></div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Graph method recap</h4>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Heat liquid ~20 K above room; start stopwatch; record T every minute while stirring.</li>
              <li>Compute excess X = T − Ts for every row.</li>
              <li>Plot ln X vs t; fit the best straight line.</li>
              <li>Slope = −k; quote k in min⁻¹ and half-life ln2/k.</li>
              <li>Cross-check with the equal-fraction ratio rule above.</li>
            </ol>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Watch-outs</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Stir consistently, or the bulb lags the bulk and curvature lies.</li>
              <li>Fixed draught only — an open window rescales k mid-run.</li>
              <li>Stay ≥ 15–20 K above surroundings or radiation bends the line.</li>
              <li>Record Ts before starting; rooms drift during a session.</li>
            </ul>
          </div>
        </div>

      </CardContent>
    </Card>
  );

};

export default NewtonCoolingExperiment;
