"use client";

/**
 * Electricity I suite — labelled 3D simulations for NEB Physics XII:
 *   • Electrostatics (capacitance) — parallel-plate capacitor, dielectric, energy
 *   • Current electricity          — meter bridge (Wheatstone) determination
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";
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

const EPS0 = 8.854e-12;

/* =====================================================================
 * TAB 1 — Parallel-plate capacitor with dielectric
 * ===================================================================== */

const DIELECTRICS = [
  { name: "Air (vacuum)", k: 1.0, color: 0x94a3b8 },
  { name: "Paper", k: 3.5, color: 0xfcd34d },
  { name: "Glass", k: 7.0, color: 0x67e8f9 },
  { name: "Mica", k: 5.4, color: 0xc084fc },
  { name: "Water", k: 80.0, color: 0x38bdf8 },
] as const;

const CapacitorTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [matIdx, setMatIdx] = useState(1);
  const [separationMm, setSeparationMm] = useState(4);
  const [volts, setVolts] = useState(12);
  const [inserted, setInserted] = useState(60); // % of gap filled by dielectric

  const d = separationMm / 1000;
  const area = 0.04; // 20 cm × 20 cm plates
  const mat = DIELECTRICS[matIdx];
  const cAir = (EPS0 * area) / d;
  const frac = inserted / 100;
  const cEff = frac * mat.k * cAir + (1 - frac) * cAir;
  const charge = cEff * volts;
  const energy = 0.5 * cEff * volts ** 2;
  const field = volts / d;

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(7, 4.5, 10), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `C = ${(cEff * 1e12).toFixed(1)} pF — κ = ${mat.k}, d = ${separationMm} mm`, new THREE.Vector3(0, 4.2, 0));
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

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 11), standardMaterial(0x1e293b, { roughness: 0.95 })));

        /* plates */
        const gap = 0.22 + separationMm * 0.22;
        const plateMatP = standardMaterial(0xf87171, { metalness: 0.8, emissive: 0x7f1d1d, emissiveIntensity: 0.35 });
        const plateMatN = standardMaterial(0x60a5fa, { metalness: 0.8, emissive: 0x1e3a8a, emissiveIntensity: 0.35 });
        const plateP = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 0.1), plateMatP);
        plateP.position.set(0, 2.4, gap / 2);
        ts.group.add(plateP);
        const plateN = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 0.1), plateMatN);
        plateN.position.set(0, 2.4, -gap / 2);
        ts.group.add(plateN);

        /* + charges on positive plate, − on negative */
        for (let i = 0; i < 8; i++) {
          const plus = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.36), standardMaterial(0xfca5a5, { emissive: 0xfca5a5, emissiveIntensity: 0.8 }));
          plus.position.set(-1.2 + (i % 4) * 0.8, i < 4 ? 1.6 : 3.1, gap / 2 + 0.07);
          ts.group.add(plus);
          const minus = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.36), standardMaterial(0x93c5fd, { emissive: 0x93c5fd, emissiveIntensity: 0.8 }));
          minus.position.set(-1.2 + (i % 4) * 0.8, i < 4 ? 1.6 : 3.1, -gap / 2 - 0.07);
          ts.group.add(minus);
        }

        /* uniform field arrows between plates */
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            const a = new LiveArrow(
              new THREE.Vector3(0, 0, -1),
              new THREE.Vector3(-1.1 + col * 1.1, 1.5 + row * 0.9, 0),
              Math.max(0.12, gap * 0.8),
              0xfacc15, 0.1, 0.07
            );
            ts.group.add(a);
          }
        }

        /* dielectric slab sliding into the gap */
        const slab = new THREE.Mesh(new THREE.BoxGeometry(3.0, 3.0, Math.max(0.03, gap * 0.7)), standardMaterial(mat.color, { transparent: true, opacity: 0.55 }));
        const slabZ = gap / 2 - (gap * 0.7) / 2 - (1 - frac) * 3.4;
        slab.position.set(0, 2.4, Math.max(-gap / 2 + (gap * 0.7) / 2 - 0.001, slabZ));
        ts.group.add(slab);

        /* battery + wires */
        const batt = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.6), standardMaterial(0x22c55e, { metalness: 0.3 }));
        batt.position.set(-4.6, 0.75, 0);
        ts.group.add(batt);

        addLbl("#f87171", "Positive plate (+Q)", [2.6, 4.4, gap / 2], "connected to battery +", [1.4, 3.2, gap / 2]);
        addLbl("#60a5fa", "Negative plate (−Q)", [2.6, 0.9, -gap / 2], "connected to battery −", [1.4, 1.6, -gap / 2]);
        addLbl("#facc15", "Uniform field E = V/d", [-3.0, 4.4, 0], `E = ${field.toExponential(1)} V/m`, [-0.6, 3.4, 0]);
        addLbl(mat.k === 1 ? "#94a3b8" : "#67e8f9", mat.k === 1 ? "Air gap (κ = 1)" : `${mat.name} dielectric (κ = ${mat.k})`, [-2.9, 0.9, 0], "polarised molecules weaken the field", [slab.position.x - 1.4, 2.4, slab.position.z]);
        addLbl("#22c55e", `Battery ${volts} V`, [-4.6, 2.0, 0], "keeps V fixed while C changes", [-4.6, 1.1, 0]);
function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          /* slab gently slides in/out around the set position */
          slab.position.z = THREE.MathUtils.clamp(
            slab.position.z + Math.sin(t * 0.9) * 0.0012,
            -gap / 2 + (gap * 0.7) / 2 - 0.001,
            gap / 2 + 1.2
          );
          if (leaderLayer) leaderLayer.draw(ts!.camera, connections);
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
          if (labelRenderer) labelRenderer.render(ts!.scene, ts!.camera);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, matIdx, separationMm, volts, inserted]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Dielectric</Label><span className="text-sm font-semibold text-primary">{mat.name}</span></div>
            <Slider value={[matIdx]} min={0} max={4} step={1} onValueChange={(v) => setMatIdx(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Plate separation d</Label><span className="text-sm font-semibold text-primary">{separationMm} mm</span></div>
            <Slider value={[separationMm]} min={1} max={12} step={1} onValueChange={(v) => setSeparationMm(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Battery voltage V</Label><span className="text-sm font-semibold text-primary">{volts} V</span></div>
            <Slider value={[volts]} min={1.5} max={24} step={0.5} onValueChange={(v) => setVolts(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Dielectric inserted</Label><span className="text-sm font-semibold text-primary">{inserted}%</span></div>
            <Slider value={[inserted]} min={0} max={100} step={5} onValueChange={(v) => setInserted(v[0])} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Capacitance C</p><p className="text-sm font-bold text-sky-500">{(cEff * 1e12).toFixed(1)} pF</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Charge Q = CV</p><p className="text-sm font-bold text-emerald-500">{(charge * 1e9).toFixed(2)} nC</p></div>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Energy ½CV²</p><p className="text-sm font-bold text-amber-500">{(energy * 1e9).toFixed(2)} nJ</p></div>
            <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">C with air only</p><p className="text-sm font-bold text-violet-500">{(cAir * 1e12).toFixed(1)} pF</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="Red (+) and blue (−) plates face each other; yellow arrows are the uniform field E = V/d. Slide the dielectric in — C climbs as the polarised slab partially cancels the field."
        predict="Insert glass (κ = 7) fully and C becomes 7× the air value. Halve d and C doubles — C ∝ A/d."
        principle="C = κε₀A/d. With V fixed by the battery, Q = CV grows; energy stored U = ½CV² = ½QV. Series: 1/C = Σ1/Cᵢ; parallel: C = ΣCᵢ."
        why="Every touchscreen, DRAM cell and defibrillator stores charge this way — and κ = 80 water explains why wet fingers trigger capacitive sensors."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 2 — Meter bridge (Wheatstone) — unknown resistance determination
 * ===================================================================== */

const MeterBridgeTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [knownR, setKnownR] = useState(6);
  const [unknownS, setUnknownS] = useState(4);
  const [batteryV, setBatteryV] = useState(2);

  const balanceCm = (100 * knownR) / (knownR + unknownS); // null point from left (R side)
  const sCalc = knownR * ((100 - balanceCm) / balanceCm);
  const errMax = Math.abs(100 - 2 * balanceCm) < 20 ? "balanced — l near 50 cm, most accurate" : "move l toward 50 cm by swapping R for best accuracy";

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(0, 9, 13), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `Meter bridge — null at l = ${balanceCm.toFixed(1)} cm → S = ${sCalc.toFixed(2)} Ω`, new THREE.Vector3(0, 4.4, 0));

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

        /* wooden board */
        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(15, 0.3, 7), standardMaterial(0x7c4a21, { roughness: 0.9 })));

        /* 1 m wire stretched along a scale */
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 10, 8), standardMaterial(0xd6d3d1, { metalness: 0.9 }));
        wire.rotation.z = Math.PI / 2;
        wire.position.set(0, 1.1, 0);
        ts.group.add(wire);
        for (let i = 0; i <= 10; i++) {
          const tick = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.28, 0.02), standardMaterial(0xfafafa));
          tick.position.set(-5 + i, 1.35, 0);
          ts.group.add(tick);
          const numLbl = mkLabel("#e2e8f0", i === 10 ? "100" : `${i * 10}`);
          numLbl.style.fontSize = "9px";
          const o = new CSS2DObject(numLbl);
          o.position.set(-5 + i, 1.75, 0);
          ts.group.add(o);
        }
        const scaleStrip = new THREE.Mesh(new THREE.BoxGeometry(10.4, 0.06, 0.4), standardMaterial(0x334155, { roughness: 0.5 }));
        scaleStrip.position.set(0, 0.92, 0);
        ts.group.add(scaleStrip);

        /* resistance boxes: left = known R, right = unknown S */
        const boxL = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.9), standardMaterial(0x38bdf8, { metalness: 0.3 }));
        boxL.position.set(-4.2, 1.3, 2.6);
        ts.group.add(boxL);
        const boxR = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.9), standardMaterial(0xf97316, { metalness: 0.3 }));
        boxR.position.set(4.2, 1.3, 2.6);
        ts.group.add(boxR);

        /* galvanometer with jockey */
        const galv = new THREE.Group();
        galv.add(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.3, 24), standardMaterial(0x1f2937, { metalness: 0.4 })));
        const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 24), standardMaterial(0xfafafa));
        dial.position.y = 0.18;
        galv.add(dial);
        const needle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.72), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.6 }));
        needle.position.y = 0.24;
        galv.add(needle);
        galv.position.set(0, 2.6, 2.2);
        ts.group.add(galv);

        /* jockey that slides along the wire */
        const jockey = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.5, 10), standardMaterial(0xfacc15, { metalness: 0.6 }));
        jockey.rotation.x = Math.PI;
        jockey.position.set(-5 + balanceCm / 10, 1.5, 0);
        ts.group.add(jockey);

        addLbl("#38bdf8", `Known R = ${knownR} Ω`, [-4.4, 2.6, 3.4], "resistance box in left gap", [-4.2, 1.9, 2.6]);
        addLbl("#fb923c", `Unknown S = ${unknownS} Ω`, [4.4, 2.6, 3.4], "the resistance being determined", [4.2, 1.9, 2.6]);
        addLbl("#facc15", "Jockey — slides for null point", [-5 + balanceCm / 10 - 1.2, 3.0, 0.4], `null at l = ${balanceCm.toFixed(1)} cm`, [-5 + balanceCm / 10, 1.4, 0]);
        addLbl("#ef4444", "Galvanometer", [0.1, 3.8, 3.2], "reads zero at balance", [0, 2.9, 2.2]);
        addLbl("#4ade80", "1 m constantan wire", [0, 0.6, 1.9], "uniform cross-section → R ∝ length", [-1.8, 1.1, 0]);
function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          /* jockey hunts around the balance point; needle swings toward null */
          const jx = -5 + balanceCm / 10 + Math.sin(t * 1.7) * 0.5;
          jockey.position.x = jx;
          const off = Math.abs(jx - (-5 + balanceCm / 10)); // distance from null (scene units)
          const defl = Math.min(0.9, off * 1.2) * Math.sign(jx - (-5 + balanceCm / 10) || 1);
          needle.rotation.y = defl * (batteryV > 0 ? 1 : 0);
          if (leaderLayer) leaderLayer.draw(ts!.camera, connections);
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
          if (labelRenderer) labelRenderer.render(ts!.scene, ts!.camera);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, knownR, unknownS, batteryV]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Known resistance R</Label><span className="text-sm font-semibold text-primary">{knownR} Ω</span></div>
            <Slider value={[knownR]} min={1} max={15} step={0.5} onValueChange={(v) => setKnownR(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Unknown resistance S (hidden!) </Label><span className="text-sm font-semibold text-amber-500">{unknownS} Ω</span></div>
            <Slider value={[unknownS]} min={1} max={15} step={0.5} onValueChange={(v) => setUnknownS(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Battery EMF</Label><span className="text-sm font-semibold text-primary">{batteryV.toFixed(1)} V</span></div>
            <Slider value={[batteryV]} min={0.5} max={4} step={0.1} onValueChange={(v) => setBatteryV(v[0])} />
          </div>
          <div className="space-y-1.5 rounded-md border border-border bg-muted/30 p-3 text-xs">
            <p className="font-semibold text-primary">Balance condition R/l = S/(100−l)</p>
            <p className="flex justify-between"><span>Null point l</span><span className="font-mono">{balanceCm.toFixed(1)} cm</span></p>
            <p className="flex justify-between"><span>Measured S = R(100−l)/l</span><span className="font-mono font-bold text-emerald-500">{sCalc.toFixed(2)} Ω</span></p>
            <p className="flex justify-between"><span>True S (for check)</span><span className="font-mono text-amber-500">{unknownS.toFixed(2)} Ω</span></p>
            <p className="text-[11px] text-muted-foreground">Accuracy tip: {errMax}.</p>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="The jockey (yellow cone) slides along the 1 m wire. Off balance the galvanometer needle kicks; at the null point it rests exactly at zero."
        predict="Increase R and watch the null point move right. If l lands far from 50 cm the result is imprecise — swap R and S gaps to centre it."
        principle="Wheatstone condition: R/l = S/(100−l), so S = R(100−l)/l. No calibration of the wire needed — only uniformity of cross-section."
        why="The same null method (bridge + galvanometer) underlies precision sensors — strain gauges, thermistors and platinum resistance thermometers."
      />
    </div>
  );
};
/* =====================================================================
 * Main suite
 * ===================================================================== */

export const ElectricitySuite3D: React.FC = () => {
  const [tab, setTab] = useState("capacitor");

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">⚡ Electricity I Suite</CardTitle>
        <CardDescription>
          NEB Physics XII — Capacitance (parallel-plate capacitor, dielectrics, stored energy) and Current Electricity
          (meter bridge / Wheatstone determination of unknown resistance) in labelled 3D.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="capacitor">Capacitor & Dielectric</TabsTrigger>
            <TabsTrigger value="meter-bridge">Meter Bridge</TabsTrigger>
          </TabsList>
          <TabsContent value="capacitor"><CapacitorTab /></TabsContent>
          <TabsContent value="meter-bridge"><MeterBridgeTab /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ElectricitySuite3D;
