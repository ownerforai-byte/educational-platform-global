"use client";

/**
 * Magnetism, EMI & AC suite — labelled 3D simulations for NEB Physics XII:
 *   • Magnetism        — Biot–Savart fields (straight wire, circular loop, solenoid)
 *                        and Lorentz force on a moving charge
 *   • EMI & AC         — Faraday & Lenz induction (magnet through a coil) with
 *                        LR-circuit and transformer / LCR-resonance readouts
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

/* =====================================================================
 * TAB 1 — Magnetic fields from currents + Lorentz force
 * ===================================================================== */

type MMode = "wire" | "loop" | "solenoid" | "lorentz";

const MagnetismTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [mode, setMode] = useState<MMode>("wire");
  const [current, setCurrent] = useState(10); // A
  const [chargeQ, setChargeQ] = useState(2);
  const [fieldB, setFieldB] = useState(0.5); // T for Lorentz mode

  const bWire = (2e-7 * current) / 0.05; // B at 5 cm from a long straight wire
  const bLoop = (4 * Math.PI * 1e-7 * current) / (2 * 0.1); // B at centre, r = 10 cm
  const bSolenoid = 4 * Math.PI * 1e-7 * current * 800; // n = 800 turns/m
  const fLorentz = chargeQ * 1e-6 * 10 * fieldB; // q v B with v = 10 m/s

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(8, 7, 11), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        const titles: Record<MMode, string> = {
          wire: "Field of a Straight Wire — right-hand grip",
          loop: "Field of a Circular Loop",
          solenoid: "Solenoid — uniform inside field",
          lorentz: "Lorentz Force — F = qv×B",
        };
        titleText(ts, titles[mode], new THREE.Vector3(0, 5.4, 0));

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

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 14), standardMaterial(0x1e293b, { roughness: 0.95 })));

        const fieldMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });

        if (mode === "wire") {
          /* vertical wire with circular field rings */
          const conductor = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 7, 12), standardMaterial(0xf87171, { metalness: 0.6 }));
          conductor.position.set(0, 3.6, 0);
          ts.group.add(conductor);
          for (const [r, y] of [[1.0, 1.4], [1.9, 3.0], [2.9, 4.6]] as const) {
            const pts: THREE.Vector3[] = [];
            for (let i = 0; i <= 40; i++) {
              const a = (i / 40) * Math.PI * 2;
              pts.push(new THREE.Vector3(r * Math.cos(a), y, r * Math.sin(a)));
            }
            ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), fieldMat));
            /* tangent arrow (anticlockwise from above) */
            const tang = new LiveArrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(r, y, 0), 0.5, 0x38bdf8, 0.18, 0.1);
            ts.group.add(tang);
          }
          addLbl("#f87171", `Conductor — I = ${current} A upward`, [2.2, 6.4, 0], "point thumb along the current", [0, 5.2, 0]);
          addLbl("#38bdf8", "Field rings — B ∝ I/r", [3.4, 1.6, 0], `B(5 cm) = ${(bWire * 1e6).toFixed(1)} µT`, [1.0, 1.4, 1.0]);
          addLbl("#facc15", "Grip rule: fingers curl as B", [-3.8, 3.2, 0], "anticlockwise seen from above", [-1.5, 2.2, 1.2]);
        } else if (mode === "loop") {
          const rL = 2.0;
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2;
            pts.push(new THREE.Vector3(rL * Math.cos(a), 1.6, rL * Math.sin(a)));
          }
          ts.group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.07, 8), standardMaterial(0xf87171, { metalness: 0.6 })));
          for (const s of [-1, 1]) {
            for (let k = 0; k < 3; k++) {
              ts.group.add(new LiveArrow(new THREE.Vector3(0, s, 0), new THREE.Vector3((k - 1) * 0.7, 1.6, 0), 1.6, 0x38bdf8, 0.2, 0.12));
            }
          }
          addLbl("#f87171", `Loop — I = ${current} A`, [3.0, 2.4, 0], "curl right hand with the current", [2.0, 1.7, 0]);
          addLbl("#38bdf8", "Axial field — like a short magnet", [-3.8, 3.6, 0], `B(centre) = ${(bLoop * 1e6).toFixed(1)} µT`, [0, 2.6, 0]);
          addLbl("#facc15", "Anticlockwise face = N pole", [3.2, 0.6, 0], "clockwise face = S pole", [1.4, 1.2, -1.6]);
        } else if (mode === "solenoid") {
const turns = 14;
          const lenS = 5.2;
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 240; i++) {
            const s = i / 240;
            const a = s * turns * Math.PI * 2;
            pts.push(new THREE.Vector3(0.75 * Math.cos(a), 1.6 + (s - 0.5) * lenS, 0.75 * Math.sin(a)));
          }
          ts.group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.05, 8), standardMaterial(0xf87171, { metalness: 0.6 })));
          for (const dx of [-0.4, 0, 0.4]) {
            ts.group.add(new LiveArrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, 0.4, 0), 2.6, 0x38bdf8, 0.2, 0.12));
          }
          addLbl("#f87171", `Solenoid — I = ${current} A, n = 800 /m`, [3.6, 5.0, 0], "acts like a bar magnet outside", [0.7, 4.2, 0]);
          addLbl("#38bdf8", "Uniform field inside", [-3.6, 2.6, 0], `B = µ₀nI = ${(bSolenoid * 1000).toFixed(2)} mT`, [0, 2.0, 0]);
          addLbl("#facc15", "Soft-iron core boosts flux", [3.2, 0.7, 0], "electromagnets & relays", [0, 1.0, 0]);
        } else {
          /* Lorentz force — charge circles in uniform B */
          ts.group.add(new LiveArrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1.6, 0), 4.2, 0x38bdf8, 0.3, 0.16));
          addLbl("#38bdf8", `Uniform B = ${fieldB} T`, [0.2, 5.4, 0], "field through the whole region", [0, 4.4, 0]);
          const q = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 14), standardMaterial(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.7 }));
          ts.group.add(q);
          const rCirc = Math.max(0.8, Math.min(3.4, (1.6 * (chargeQ / 2)) / fieldB + 0.8));
          const cPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 48; i++) {
            const a = (i / 48) * Math.PI * 2;
            cPts.push(new THREE.Vector3(rCirc * Math.cos(a), 1.6, rCirc * Math.sin(a)));
          }
          const circ = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cPts), new THREE.LineDashedMaterial({ color: 0xfacc15, dashSize: 0.25, gapSize: 0.18 }));
          circ.computeLineDistances();
          ts.group.add(circ);
          (q as any).__circ = { r: rCirc };
          addLbl("#facc15", `Charge q = ${chargeQ} µC — r = mv/qB`, [3.8, 2.6, 0], "force ⊥ velocity → circle", [rCirc, 1.6, 0]);
          addLbl("#4ade80", "F = qvB (v ⊥ B)", [-3.9, 2.8, 0], `|F| = ${(fLorentz * 1000).toFixed(2)} mN at v = 10 m/s`, [-rCirc, 1.6, 0]);
          addLbl("#a78bfa", "Reverse q or B → reverses", [-3.5, 0.6, 0], "cyclotrons & mass spectrometers", [-1.8, 1.0, 0]);
        }
/* animation for Lorentz mode: charge circles the guide circle */
        const lorentzMesh: THREE.Mesh | null = mode === "lorentz" ? (ts.group.children.find((c) => (c as any).__circ) as THREE.Mesh) || null : null;

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          if (mode === "lorentz" && lorentzMesh) {
            const r = (lorentzMesh as any).__circ?.r ?? 1.6;
            const w = 1.4; // angular speed (scaled)
            lorentzMesh.position.set(r * Math.cos(t * w), 1.6, -r * Math.sin(t * w));
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
  }, [webGL, mode, current, chargeQ, fieldB]);

  const bReadout = mode === "wire" ? bWire * 1e6 : mode === "loop" ? bLoop * 1e6 : mode === "solenoid" ? bSolenoid * 1000 : NaN;
  const fReadout = mode === "lorentz" ? fLorentz * 1000 : NaN;

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as MMode)}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start">
              <TabsTrigger value="wire">Straight wire</TabsTrigger>
              <TabsTrigger value="loop">Loop</TabsTrigger>
              <TabsTrigger value="solenoid">Solenoid</TabsTrigger>
              <TabsTrigger value="lorentz">Lorentz force</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Current I</Label><span className="text-sm font-semibold text-primary">{current} A</span></div>
            <Slider value={[current]} min={1} max={20} step={0.5} onValueChange={(v) => setCurrent(v[0])} />
          </div>
          {mode === "lorentz" && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Charge q</Label><span className="text-sm font-semibold text-primary">{chargeQ} µC</span></div>
                <Slider value={[chargeQ]} min={0.5} max={5} step={0.5} onValueChange={(v) => setChargeQ(v[0])} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><Label>Field B</Label><span className="text-sm font-semibold text-primary">{fieldB.toFixed(2)} T</span></div>
                <Slider value={[fieldB]} min={0.1} max={2} step={0.05} onValueChange={(v) => setFieldB(v[0])} />
              </div>
            </>
          )}
          {!Number.isNaN(bReadout) && (
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2 text-center">
              <p className="text-[10px] uppercase text-muted-foreground">Magnetic field</p>
              <p className="text-sm font-bold text-sky-500">{bReadout.toFixed(mode === "solenoid" ? 2 : 1)} {mode === "solenoid" ? "mT" : "µT"}</p>
            </div>
          )}
          {!Number.isNaN(fReadout) && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-center">
              <p className="text-[10px] uppercase text-muted-foreground">Lorentz force qvB</p>
              <p className="text-sm font-bold text-emerald-500">{fReadout.toFixed(1)} mN</p>
            </div>
          )}
        </div>
      </div>
      <TheoryPanel
        look="Pick a current configuration: concentric rings around a straight wire, an axial field through a loop, a uniform interior field for a solenoid. Lorentz mode shows a charge tracing a circle perpendicular to B."
        predict="Higher I → stronger B everywhere. In Lorentz mode, larger q or smaller B shrinks the orbit radius r = mv·/qB."
        principle="Biot–Savart: B = µ₀I/2πr (wire), B = µ₀I/2R (loop centre), B = µ₀nI (solenoid). Lorentz: F = qvB·sinθ — ⊥ force means circular motion."
        why="These fields drive electric motors, MRI magnets, particle accelerators and the Earth's compass deflection."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 2 — Faraday & Lenz: magnet through a coil, LR circuit, AC
 * ===================================================================== */

const EMITab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [speed, setSpeed] = useState(1);
  const [turnsN, setTurnsN] = useState(100);
  const [inducL, setInducL] = useState(0.5); // H
  const [resistR, setResistR] = useState(10); // Ω

  const tau = inducL / resistR; // L/R time constant
  const emfPeak = 0.5 * turnsN * 0.02 * speed; // ε = N·A·(dB/dt·v)

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
        titleText(ts, "Faraday & Lenz — a moving magnet induces an EMF", new THREE.Vector3(0, 5.0, 0));

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

        /* coil: a few turns wrapped into a cylinder */
        const coilR = 1.4;
        const coilLen = 0.9;
        const coilPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 160; i++) {
          const s = i / 160;
          const a = s * 7 * Math.PI * 2;
          coilPts.push(new THREE.Vector3(coilR * Math.cos(a), 1.7 - coilLen / 2 + (s - 0.5) * coilLen, coilR * Math.sin(a)));
        }
        const coilGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coilPts), 260, 0.06, 8);
        ts.group.add(new THREE.Mesh(coilGeo, standardMaterial(0xf87171, { metalness: 0.7 })));

        const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, coilLen + 0.6, 12), standardMaterial(0x94a3b8, { metalness: 0.6 }));
        axis.rotation.x = Math.PI / 2;
        axis.position.y = 1.6;
        ts.group.add(axis);

        /* magnet: red/blue bar travelling along the core */
        const magnet = new THREE.Group();
        magnet.add(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.55, 0.55), standardMaterial(0xef4444, { emissive: 0x7f1d1d, emissiveIntensity: 0.4 })));
        const capN = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.18, 12), standardMaterial(0x3b82f6));
        capN.rotation.x = Math.PI / 2;
        capN.position.z = 0.55 / 2;
        magnet.add(capN);
        const capS = capN.clone();
        capS.position.z = -0.55 / 2;
        capS.material = standardMaterial(0xf87171, { metalness: 0.5 });
        magnet.add(capS);
        magnet.position.set(0, 1.6, 3.2);
        ts.group.add(magnet);

        /* galvanometer */
        const galv = new THREE.Group();
        galv.add(new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.3, 24), standardMaterial(0x1f2937, { metalness: 0.4 })));
        const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.05, 24), standardMaterial(0xfafafa));
        dial.position.y = 0.17;
        galv.add(dial);
        const needle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.8), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.6 }));
        needle.position.y = 0.23;
        galv.add(needle);
        galv.position.set(0, 3.6, 0);
        ts.group.add(galv);

        addLbl("#f87171", `Coil — ${turnsN} turns`, [2.9, 3.2, 0], "axis of the magnet", [coilR, 1.6, 0]);
        addLbl("#3b82f6", "Bar magnet (N-blue / S-red)", [1.4, 0.6, 3.6], "pushes through the coil", [0, 1.6, 3.2]);
        addLbl("#ef4444", "Galvanometer", [0.1, 4.3, 0], "kicks only while flux changes", [0.4, 3.6, 0]);
function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          /* magnet oscillates through the coil */
          const z = 3.2 - ((t * speed * 0.8) % 6.4);
          magnet.position.z = z;
          const inside = Math.abs(z) < 1.7 ? 1 : 0;
          const rateon = Math.cos(t * speed * 0.8) * inside;
          needle.rotation.y = Math.min(0.9, emfPeak * rateon * 20);
          needle.scale.y = 0.9 + 0.4 * Math.abs(rateon);
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
  }, [webGL, speed, turnsN]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Magnet speed</Label><span className="text-sm font-semibold text-primary">{speed.toFixed(1)}×</span></div>
            <Slider value={[speed]} min={0.3} max={3} step={0.1} onValueChange={(v) => setSpeed(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Coil turns N</Label><span className="text-sm font-semibold text-primary">{turnsN}</span></div>
            <Slider value={[turnsN]} min={20} max={400} step={10} onValueChange={(v) => setTurnsN(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Self-inductance L</Label><span className="text-sm font-semibold text-primary">{inducL.toFixed(2)} H</span></div>
            <Slider value={[inducL]} min={0.1} max={2} step={0.1} onValueChange={(v) => setInducL(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Resistance R</Label><span className="text-sm font-semibold text-primary">{resistR} Ω</span></div>
            <Slider value={[resistR]} min={2} max={30} step={1} onValueChange={(v) => setResistR(v[0])} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Induced EMF (peak)</p><p className="text-sm font-bold text-amber-500">{emfPeak.toFixed(2)} V</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">LR time constant τ = L/R</p><p className="text-sm font-bold text-emerald-500">{(tau * 1000).toFixed(0)} ms</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="The bar magnet oscillates along the coil. The galvanometer needle kicks only while the magnet is near — i.e. while magnetic flux through the coil is changing."
        predict="Double the speed or double N → doubling induced EMF. When the magnet is far away or at rest the galvanometer reads exactly zero."
        principle="Faraday: ε = −N·dΦ/dt. Lenz: the induced current opposes the flux change — that's the '−' sign and the source of eddy-current braking. RL growth: I = (ε/R)(1 − e^(−t/τ)), τ = L/R."
        why="Every generator, transformer, induction cooker and wireless phone charger is Faraday's law done in hardware."
      />
    </div>
  );
};
/* =====================================================================
 * Main suite
 * ===================================================================== */

export const MagnetismEMISuite3D: React.FC = () => {
  const [tab, setTab] = useState("magnetism");

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">🧲 Magnetism & EMI Suite</CardTitle>
        <CardDescription>
          NEB Physics XII — Magnetic fields (Biot–Savart: wire, loop, solenoid), Lorentz force, and electromagnetic
          induction (Faraday & Lenz with LR-circuit readouts) in labelled 3D.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="magnetism">Magnetic fields</TabsTrigger>
            <TabsTrigger value="emi">Faraday & Lenz</TabsTrigger>
          </TabsList>
          <TabsContent value="magnetism"><MagnetismTab /></TabsContent>
          <TabsContent value="emi"><EMITab /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MagnetismEMISuite3D;