"use client";

/**
 * Elasticity & Ideal Gas suite — labelled 3D simulations for the NEB
 * Physics XI (Phy. 101) units:
 *   • Elasticity — Hooke's law, spring constant, Young's modulus
 *   • Ideal Gas  — kinetic-molecular model, ideal gas equation PV = nRT
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
 * TAB 1 — Hooke's law (spring) and Young's modulus (wire)
 * ===================================================================== */

const SPRINGS = [
  { name: "Soft spring", k: 12, color: 0x4ade80 },
  { name: "Medium spring", k: 30, color: 0x38bdf8 },
  { name: "Stiff spring", k: 60, color: 0xf97316 },
] as const;

const WIRES = [
  { name: "Copper", Y: 110, color: 0xfbbf24 },
  { name: "Brass", Y: 91, color: 0xa3e635 },
  { name: "Steel", Y: 200, color: 0x94a3b8 },
] as const;

const ElasticityTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [mode, setMode] = useState<"hooke" | "young">("hooke");
  const [springIdx, setSpringIdx] = useState(1);
  const [massN, setMassN] = useState(20); // hanging weight in newtons
  const [wireIdx, setWireIdx] = useState(2);
  const [forceN, setForceN] = useState(300);
  const [lenM, setLenM] = useState(2.0);
  const [diaMm, setDiaMm] = useState(1.0);

  const spring = SPRINGS[springIdx];
  const wire = WIRES[wireIdx];
  const xSpring = massN / spring.k;
  const area = Math.PI * ((diaMm / 1000) / 2) ** 2;
  const stress = forceN / area; // Pa
  const strain = stress / (wire.Y * 1e9);
  const dL = strain * lenM;

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(8, 5, 12), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, mode === "hooke" ? `Hooke's Law — k = ${spring.k} N/m` : `Young's Modulus — ${wire.name} wire, Y = ${wire.Y} GPa`, new THREE.Vector3(0, 5.2, 0));

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

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(18, 0.3, 10), standardMaterial(0x1e293b, { roughness: 0.95 })));
        /* ceiling */
        const ceil = new THREE.Mesh(new THREE.BoxGeometry(6, 0.3, 2.4), standardMaterial(0x57534e, { metalness: 0.5 }));
        ceil.position.set(0, 4.6, 0);
        ts.group.add(ceil);
        addLbl("#f87171", "Rigid support", [0, 5.6, 0], "top fixed end", [0, 4.5, 0]);

        let hangGrp: THREE.Group | null = null;
        if (mode === "hooke") {
          /* coil spring drawn as a helix tube */
          const restLen = 2.0;
          const stretch = Math.min(1.9, Math.max(0.05, xSpring * 0.9));
          const helixPts: THREE.Vector3[] = [];
          const turns = 10;
          const steps = 120;
          for (let i = 0; i <= steps; i++) {
            const s = i / steps;
            helixPts.push(new THREE.Vector3(0.32 * Math.cos(s * turns * Math.PI * 2), 4.5 - s * (restLen + stretch), 0.32 * Math.sin(s * turns * Math.PI * 2)));
          }
          const springMesh = new THREE.Mesh(
            new THREE.TubeGeometry(new THREE.CatmullRomCurve3(helixPts), 200, 0.055, 8),
            standardMaterial(spring.color, { metalness: 0.6, roughness: 0.35 })
          );
          ts.group.add(springMesh);

          /* hanger + slotted weights */
          const hanger = new THREE.Group();
          hanger.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 24), standardMaterial(0x94a3b8, { metalness: 0.7 })));
          const weight = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.55, 24), standardMaterial(0x64748b, { metalness: 0.75 }));
          weight.position.y = -0.4;
          hanger.add(weight);
          hanger.position.set(0, 4.5 - (restLen + stretch) - 0.15, 0);
          const hangerRestY = hanger.position.y;
          ts.group.add(hanger);
          hangGrp = hanger;

          /* ruler beside spring */
          const ruler = new THREE.Mesh(new THREE.BoxGeometry(0.14, 4.2, 0.08), standardMaterial(0xfafafa, { roughness: 0.6 }));
          ruler.position.set(-1.5, 2.4, 0);
          ts.group.add(ruler);
          for (let i = 0; i <= 8; i++) {
            const tick = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.09), standardMaterial(0x111827));
            tick.position.set(-1.5, 0.35 + i * 0.5, 0);
            ts.group.add(tick);
          }
          addLbl("#38bdf8", `Spring — k = ${spring.k} N/m`, [2.6, 4.0, 0], "F = k·x (linear region)", [0.3, 3.6, 0]);
          addLbl("#facc15", `Load F = ${massN} N`, [1.9, hangerRestY + 0.4, 0], `x = F/k = ${xSpring.toFixed(2)} m stretch`, [0, hangerRestY, 0]);
          addLbl("#4ade80", "Millimetre scale", [-2.4, 2.4, 0], "measure x from the pointer", [-1.5, 2.4, 0]);
          addLbl("#a78bfa", "Elastic limit — don't cross it", [3.6, 1.2, 0], "beyond it the spring deforms permanently", [0.6, 2.0, 0]);
        } else {
          /* Young's modulus wire */
          const wireLen = 3.6;
          const wireMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(Math.max(0.02, diaMm * 0.09), Math.max(0.02, diaMm * 0.09), wireLen + Math.min(0.5, dL * 400), 12),
            standardMaterial(wire.color, { metalness: 0.7, roughness: 0.3 })
          );
          wireMesh.position.set(0, 4.5 - (wireLen + Math.min(0.5, dL * 400)) / 2, 0);
          ts.group.add(wireMesh);

          const clamp = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.35, 16), standardMaterial(0x57534e, { metalness: 0.6 }));
          clamp.position.set(0, 4.5 - (wireLen + Math.min(0.5, dL * 400)) - 0.2, 0);
          ts.group.add(clamp);

          const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.45, 0.12, 24), standardMaterial(0x94a3b8, { metalness: 0.7 }));
          pan.position.set(0, clamp.position.y - 0.45, 0);
          ts.group.add(pan);
          hangGrp = new THREE.Group();
          hangGrp.add(clamp, pan);
          ts.group.add(hangGrp);
          hangGrp.position.set(0, 0, 0);

          addLbl("#fbbf24", `${wire.name} wire`, [1.9, 3.9, 0], `L = ${lenM.toFixed(2)} m, d = ${diaMm.toFixed(1)} mm`, [0.05, 3.4, 0]);
          addLbl("#facc15", `Load F = ${forceN} N`, [1.7, clamp.position.y - 1.1, 0], `stress = ${stress.toExponential(2)} Pa`, [0, clamp.position.y - 0.45, 0]);
          addLbl("#38bdf8", `ΔL = ${(dL * 1000).toFixed(2)} mm`, [-2.5, 1.3, 0], `strain = ${(strain * 100).toFixed(4)} %`, [0, 1.5, 0]);
        }
function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          if (mode === "hooke" && hangGrp) {
            hangGrp.position.y = Math.sin(t * 2.4) * 0.07; // gentle bounce about equilibrium
          }
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
  }, [webGL, mode, springIdx, massN, wireIdx, forceN, lenM, diaMm]);
return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "hooke" | "young")}>
            <TabsList className="w-full">
              <TabsTrigger value="hooke" className="flex-1">Hooke's law</TabsTrigger>
              <TabsTrigger value="young" className="flex-1">Young's modulus</TabsTrigger>
            </TabsList>
          </Tabs>
          {mode === "hooke" ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Spring</Label><span className="text-sm font-semibold text-primary">{spring.name}</span></div>
                <Slider value={[springIdx]} min={0} max={2} step={1} onValueChange={(v) => setSpringIdx(v[0])} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Load F</Label><span className="text-sm font-semibold text-primary">{massN} N</span></div>
                <Slider value={[massN]} min={2} max={100} step={2} onValueChange={(v) => setMassN(v[0])} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Extension x = F/k</p><p className="text-sm font-bold text-sky-500">{(xSpring * 100).toFixed(1)} cm</p></div>
                <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Energy ½kx²</p><p className="text-sm font-bold text-emerald-500">{(0.5 * spring.k * xSpring ** 2).toFixed(2)} J</p></div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Wire material</Label><span className="text-sm font-semibold text-primary">{wire.name}</span></div>
                <Slider value={[wireIdx]} min={0} max={2} step={1} onValueChange={(v) => setWireIdx(v[0])} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Load F</Label><span className="text-sm font-semibold text-primary">{forceN} N</span></div>
                <Slider value={[forceN]} min={50} max={1000} step={10} onValueChange={(v) => setForceN(v[0])} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Length L</Label><span className="text-sm font-semibold text-primary">{lenM.toFixed(2)} m</span></div>
                <Slider value={[lenM]} min={0.5} max={3} step={0.1} onValueChange={(v) => setLenM(v[0])} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Diameter d</Label><span className="text-sm font-semibold text-primary">{diaMm.toFixed(1)} mm</span></div>
                <Slider value={[diaMm]} min={0.4} max={2} step={0.1} onValueChange={(v) => setDiaMm(v[0])} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Stress F/A</p><p className="text-sm font-bold text-amber-500">{(stress / 1e6).toFixed(1)} MPa</p></div>
                <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">ΔL</p><p className="text-sm font-bold text-sky-500">{(dL * 1000).toFixed(2)} mm</p></div>
              </div>
            </>
          )}
        </div>
      </div>
<TheoryPanel
        look="Hooke mode: hang weights and watch the helix stretch in exact proportion. Young mode: a thin wire under load lengthens by a tiny ΔL, computed from stress/strain."
        predict="Double the load → double the extension (Hooke). Halve the diameter and ΔL quadruples — strain scales with 1/d²."
        principle="Hooke: F = kx, stored energy = ½kx². Young's modulus: Y = (F/A)/(ΔL/L). Steel Y = 200 GPa — a 2 m, 1 mm steel wire under 300 N stretches ≈ 9.5 mm."
        why="Scales, car suspensions and wind chimes depend on k; bridge and lift cables are sized using Young's modulus with a safety factor."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 2 — Ideal Gas: kinetic-molecular model, PV = nRT
 * ===================================================================== */

const Rgas = 8.314;
const GAS_COLORS = [0x22d3ee, 0x4ade80, 0xfacc15, 0xf97316, 0xa78bfa, 0x38bdf8] as const;

const IdealGasTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [molecules, setMolecules] = useState(60);
  const [tempK, setTempK] = useState(300);
  const [volumeL, setVolumeL] = useState(30);

  const nMol = 1.2; // fixed quantity of gas
  const pressure = (nMol * Rgas * tempK) / (volumeL / 1000); // Pa
  const vrms = Math.sqrt((3 * Rgas * tempK) / 0.029); // r.m.s. speed, molar mass 29 g/mol air

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(7, 5.5, 11), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `PV = nRT → P = ${pressureKPa(pressure)} kPa at T = ${tempK} K, V = ${volumeL} L`, new THREE.Vector3(0, 4.8, 0));

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

        function pressureKPa(p: number) { return (p / 1000).toFixed(1); }

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 12), standardMaterial(0x1e293b, { roughness: 0.95 })));

        /* cylinder: glass walls, piston on top */
        const cylH = 5.6;
        const gasH = Math.max(1.2, (volumeL / 45) * cylH); // piston height from volume
        const glassMat = standardMaterial(0x67e8f9, { transparent: true, opacity: 0.12 });
        glassMat.side = THREE.DoubleSide;
        const tube = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, cylH, 32, 1, true), glassMat);
        tube.position.set(0, 0.15 + cylH / 2, 0);
        ts.group.add(tube);
        const base = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.25, 0.3, 32), standardMaterial(0x57534e, { metalness: 0.6 }));
        base.position.set(0, 0.3, 0);
        ts.group.add(base);

        /* piston (position animated below) */
        const piston = new THREE.Mesh(new THREE.CylinderGeometry(2.02, 2.02, 0.34, 32), standardMaterial(0xf59e0b, { metalness: 0.5, roughness: 0.4 }));
        ts.group.add(piston);
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.6, 10), standardMaterial(0x94a3b8, { metalness: 0.7 }));
        ts.group.add(rod);

        /* gas molecules */
        const mols: { mesh: THREE.Mesh; vel: THREE.Vector3 }[] = [];
        for (let i = 0; i < molecules; i++) {
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.085, 10, 8),
            standardMaterial(GAS_COLORS[i % GAS_COLORS.length], { emissive: GAS_COLORS[i % GAS_COLORS.length], emissiveIntensity: 0.7 })
          );
          ts.group.add(mesh);
          const sp = 1.2 + Math.sqrt(tempK / 100) * 1.4 * (0.75 + Math.random() * 0.5);
          mols.push({ mesh, vel: new THREE.Vector3((Math.random() - 0.5) * sp, (Math.random() - 0.5) * sp, (Math.random() - 0.5) * sp) });
          mesh.position.set((Math.random() - 0.5) * 3.4, 0.6 + Math.random() * (gasH - 0.7), (Math.random() - 0.5) * 3.4);
        }
        (mols as any).speedScale = 1;

        addLbl("#f59e0b", "Piston (movable)", [3.4, 0.3 + gasH + 1.2, 0], "weight sets external pressure", [1.6, 0.3 + gasH, 0]);
        addLbl("#67e8f9", "Cylinder — sealed, frictionless", [-3.9, 2.2, 0], "glass walls let you watch the molecules", [-2.0, 2.2, 0]);
        addLbl("#4ade80", `Gas — ${molecules} molecules shown`, [0.4, 0.2, 3.9], `of ~10²³ real molecules; ½mv² ∝ T`, [0, 1.0, 0]);
        addLbl("#a78bfa", "Wall collisions = pressure", [-3.8, 0.3 + gasH - 0.6, 0], "each impact pushes the piston out", [-0.6, 1.8, 0]);
function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const pistonY = 0.3 + gasH + Math.sin(t * 1.4) * 0.06;
          piston.position.set(0, pistonY, 0);
          rod.position.set(0, pistonY + 0.9, 0);
          const speedF = Math.sqrt(tempK / 300);
          for (const m of mols) {
            m.mesh.position.addScaledVector(m.vel, speedF * 0.016);
            const p = m.mesh.position;
            if (p.x > 2.0 || p.x < -2.0) { m.vel.x *= -1; p.x = THREE.MathUtils.clamp(p.x, -2.0, 2.0); }
            if (p.z > 2.0 || p.z < -2.0) { m.vel.z *= -1; p.z = THREE.MathUtils.clamp(p.z, -2.0, 2.0); }
            if (p.y < 0.45) { m.vel.y *= -1; p.y = 0.45; }
            if (p.y > pistonY - 0.12) { m.vel.y *= -1; p.y = pistonY - 0.12; }
          }
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
  }, [webGL, molecules, tempK, volumeL]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Molecules shown (of ~10²³)</Label><span className="text-sm font-semibold text-primary">{molecules}</span></div>
            <Slider value={[molecules]} min={20} max={150} step={5} onValueChange={(v) => setMolecules(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Temperature T</Label><span className="text-sm font-semibold text-primary">{tempK} K ({(tempK - 273).toFixed(0)} °C)</span></div>
            <Slider value={[tempK]} min={100} max={900} step={10} onValueChange={(v) => setTempK(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Volume V</Label><span className="text-sm font-semibold text-primary">{volumeL} L</span></div>
            <Slider value={[volumeL]} min={10} max={45} step={1} onValueChange={(v) => setVolumeL(v[0])} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Pressure P = nRT/V</p><p className="text-sm font-bold text-sky-500">{(pressure / 1000).toFixed(1)} kPa</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">r.m.s. speed v_rms</p><p className="text-sm font-bold text-emerald-500">{vrms.toFixed(0)} m/s</p></div>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Mean KE/molecule (3/2)kT</p><p className="text-sm font-bold text-amber-500">{((1.5 * 1.381e-23 * tempK)).toExponential(2)} J</p></div>
            <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">PV = const at fixed T</p><p className="text-sm font-bold text-violet-500">{((pressure * volumeL) / 1000).toFixed(0)} kPa·L</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="Colourful molecules fly around the sealed cylinder, bouncing off the walls and the orange piston. Cool the gas and they slow; shrink V and the piston pressure rises."
        predict="Double T at fixed V → P doubles (Gay-Lussac). Double V at fixed T → P halves (Boyle). The piston is the pressure gauge."
        principle="PV = nRT with T in kelvin. Kinetic theory: P·V = (1/3)N·m·v_rms² and (3/2)kT = ½m·v_rms² — temperature IS molecular kinetic energy."
        why="Tyre pressures change between morning and noon, pressure cookers work because P rises with T, and the same equation lifts hot-air balloons."
      />
    </div>
  );
};
/* =====================================================================
 * Main suite
 * ===================================================================== */

export const ElasticityGasSuite3D: React.FC = () => {
  const [tab, setTab] = useState("elasticity");

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">🪀 Elasticity & Ideal Gas Suite</CardTitle>
        <CardDescription>
          NEB Physics XI — Elasticity (Hooke's law, Young's modulus) and Ideal Gas (kinetic-molecular model, PV = nRT) in labelled 3D.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="elasticity">Elasticity</TabsTrigger>
            <TabsTrigger value="ideal-gas">Ideal Gas</TabsTrigger>
          </TabsList>
          <TabsContent value="elasticity"><ElasticityTab /></TabsContent>
          <TabsContent value="ideal-gas"><IdealGasTab /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ElasticityGasSuite3D;
