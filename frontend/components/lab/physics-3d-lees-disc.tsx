"use client";

/**
 * 3D Lee's Disc Experiment — Determination of thermal conductivity (K)
 * of a BAD conductor, with fully labelled components and theory panels.
 *
 * Physics: At steady state the heat flowing per second through the sample
 * equals the rate at which the Lee's disc loses heat while cooling freely:
 *        K = m·c·(dθ/dt)·d / (A·(θ₁ − θ₂))
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
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  titleText,
  type ThreeScene,
} from "@/components/lab/three-scene";

/* ---------------- Data ---------------- */

const SAMPLES = [
  { name: "Cardboard", k: 0.13, color: "#b45309", scene: 0xa16207, note: "Fibrous sheets trap air pockets — excellent insulator (k ≈ 0.13 W·m⁻¹·K⁻¹)." },
  { name: "Wood", k: 0.15, color: "#a16207", scene: 0x92400e, note: "Grain channels of trapped air make wood a natural insulator (k ≈ 0.15 W·m⁻¹·K⁻¹)." },
  { name: "Rubber", k: 0.16, color: "#78716c", scene: 0x57534e, note: "Long tangled polymer chains hinder vibration transfer (k ≈ 0.16 W·m⁻¹·K⁻¹)." },
  { name: "Ebonite", k: 0.21, color: "#52525b", scene: 0x3f3f46, note: "Hard vulcanised rubber used as electrical insulation (k ≈ 0.21 W·m⁻¹·K⁻¹)." },
  { name: "Glass", k: 0.80, color: "#38bdf8", scene: 0x60a5fa, note: "Amorphous silica conducts ~4× rubber — poor conductor but not the worst (k ≈ 0.80)." },
] as const;

const C_COPPER = 385; // J/(kg·K) — Lee's disc is pure copper

export const LeesDiscExperiment: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<any>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [matIdx, setMatIdx] = useState(0);
  const [discMass, setDiscMass] = useState(0.45); // kg of copper Lee's disc
  const [coolRate, setCoolRate] = useState(12); // °C per minute at θ₂ (measured)
  const [sampleThick, setSampleThick] = useState(4); // mm
  const [radiusCm, setRadiusCm] = useState(5); // cm
  const [theta1, setTheta1] = useState(92); // °C steam side (bottom of sample)
  const [theta2, setTheta2] = useState(74); // °C between sample & Lee's disc
  const [showSteam, setShowSteam] = useState(true);

  const mat = SAMPLES[matIdx];

  /* ---- Steady-state calculation ---- */
  const dTheta = theta1 - theta2;
  const heatLossRate = discMass * C_COPPER * (coolRate / 60); // W leaving Lee's disc while cooling
  const area = Math.PI * Math.pow(radiusCm / 100, 2); // m²
  const thicknessM = sampleThick / 1000;
  const K = dTheta > 0 ? (heatLossRate * thicknessM) / (area * dTheta) : NaN;
  const deviation = Number.isFinite(K) ? ((K - mat.k) / mat.k) * 100 : NaN;

  useEffect(() => {
    if (!mountRef.current || !webGL) return;

    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;

    async function init() {
      try {
        const mod = await import("@/components/lab/three-scene");
        const { createThreeScene, bindResize, standardMaterial, titleText, disposeThreeScene } = mod;
        if (!mountRef.current || cancelled) return;

        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(8.6, 4.4, 12.6),
          autoRotate: false,
          background: 0x0b1220,
        });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Lee's Disc Apparatus", new THREE.Vector3(0, 3.65, 0));

        const discR = radiusCm * 0.42;
        const chamR = discR + 0.2;
        const thickU = Math.min(0.52, 0.14 + sampleThick * 0.05);

        /* ---- wooden tripod stand (labelled) ---- */
        const woodMat = standardMaterial(0x7c4a21, { roughness: 0.85 });
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 2.05, 10), woodMat);
          leg.position.set(Math.cos(a) * (discR + 0.8), 1.02, Math.sin(a) * (discR + 0.8));
          leg.rotation.z = -Math.cos(a) * 0.16;
          leg.rotation.x = Math.sin(a) * 0.16;
          ts.group.add(leg);
        }
        const platform = new THREE.Mesh(new THREE.CylinderGeometry(discR + 0.62, discR + 0.62, 0.14, 36), woodMat);
        platform.position.y = 0.07;
        ts.group.add(platform);

        /* ---- Lee's disc: two stacked copper halves (radial T₂ pocket) ---- */
        const cuMat = standardMaterial(0xd97706, { emissive: 0x7c2d12, emissiveIntensity: 0.32, metalness: 0.75 });
        const lowerHalf = new THREE.Mesh(new THREE.CylinderGeometry(discR, discR, 0.3, 48), cuMat);
        lowerHalf.position.y = 0.26;
        ts.group.add(lowerHalf);
        const upperHalf = new THREE.Mesh(new THREE.CylinderGeometry(discR, discR, 0.3, 48), cuMat);
        upperHalf.position.y = 0.58;
        ts.group.add(upperHalf);

        /* ---- bad-conductor sample disc (gold) ---- */
        const sampleMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(discR - 0.08, discR - 0.08, thickU, 48),
          standardMaterial(parseInt(mat.color.replace("#", ""), 16), { emissive: parseInt(mat.color.replace("#", ""), 16), emissiveIntensity: 0.25 })
        );
        const sampleY = 0.73 + thickU / 2;
        sampleMesh.position.y = sampleY;
        ts.group.add(sampleMesh);

        /* ---- steam chamber (translucent) + lid ---- */
        const steamMat = standardMaterial(0xfb923c, { transparent: true, opacity: 0.22 });
        steamMat.side = THREE.DoubleSide;
        const chamberH = 1.5;
        const chamber = new THREE.Mesh(new THREE.CylinderGeometry(chamR, chamR, chamberH, 48), steamMat);
        const chamCenter = sampleY + thickU / 2 + chamberH / 2;
        chamber.position.y = chamCenter;
        ts.group.add(chamber);
        const lid = new THREE.Mesh(new THREE.CylinderGeometry(chamR + 0.08, chamR + 0.08, 0.1, 48), standardMaterial(0x94a3b8, { metalness: 0.6 }));
        lid.position.y = chamCenter + chamberH / 2 + 0.05;
        ts.group.add(lid);

        /* ---- steam inlet & vapour outlet stubs ---- */
        const inletStub = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 1.15, 12), standardMaterial(0x38bdf8, { metalness: 0.5 }));
        inletStub.position.set(-(chamR + 0.42), chamCenter + 0.42, 0);
        inletStub.rotation.z = Math.PI / 3.4;
        ts.group.add(inletStub);
        const outletTip = new THREE.Vector3(chamR + 0.05, chamCenter + 0.72, 0);
        const outlet = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.8, 12), standardMaterial(0xcbd5e1));
        outlet.position.set(outletTip.x + 0.28, outletTip.y + 0.22, 0);
        outlet.rotation.z = -Math.PI / 3;
        ts.group.add(outlet);

        /* ---- clamping weight stack on lid (keeps faces in contact) ---- */
        const pinY = lid.position.y + 0.34;
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.75, 10), standardMaterial(0xa8a29e));
        pin.position.set(0.55, pinY - 0.18, 0);
        ts.group.add(pin);
        [0.16, 0.38].forEach((dy) => {
          const w = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 24), standardMaterial(0x78716c, { metalness: 0.5 }));
          w.position.set(0.55, pinY - 0.32 + dy, 0);
          ts!.group.add(w);
        });

        /* ---- thermometer T₂ pocket (right, at the junction) ---- */
        const t2Group = new THREE.Group();
        const t2Body = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.7, 10), standardMaterial(0xf8fafc));
        t2Body.rotation.z = Math.PI / 2.6;
        t2Group.add(t2Body);
        const t2Bulb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.85 }));
        t2Bulb.position.set(discR - 0.28, 0.44, 0);
        t2Group.add(t2Bulb);
        t2Body.position.set(t2Bulb.position.x + 0.78, 0.68, 0);
        ts.group.add(t2Group);

        /* ---- heat-flow rings at both steady-state interfaces ---- */
        const glowMats: THREE.MeshStandardMaterial[] = [];
        [[sampleY + thickU / 2, 0xf97316], [0.44, 0xef4444]].forEach(([y, c]) => {
          const m = standardMaterial(c, { emissive: c, emissiveIntensity: 0.8 });
          const ring = new THREE.Mesh(new THREE.TorusGeometry(discR * 0.985, 0.045, 10, 60), m);
          ring.rotation.x = Math.PI / 2;
          ring.position.y = y + 0.01;
          ts!.group.add(ring);
          glowMats.push(m);
        });

        /* ---- rising steam puffs at the vapour outlet ---- */
        const puffGroup = new THREE.Group();
        puffGroup.visible = showSteam;
        ts.group.add(puffGroup);
        const puffs: Array<{ mesh: THREE.Mesh; seed: number }> = [];
        for (let i = 0; i < 7; i++) {
          const p = new THREE.Mesh(
            new THREE.SphereGeometry(0.14, 10, 10),
            standardMaterial(0xe2e8f0, { transparent: true, opacity: 0.55 })
          );
          puffs.push({ mesh: p, seed: Math.random() });
          puffGroup.add(p);
        }

        storeRef.current = { ts, glowMats, puffGroup, puffs, outletTip } as any;

        /* ---------- LABELS ---------- */
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);

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
          try { leaderLayer = createLeaderLayer(mountRef.current!); } catch { leaderLayer = null; }
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

          addLbl("#fb923c", "Steam Chamber (θ₁)", [0, chamCenter + chamberH + 1.1, 0], `≈ ${theta1} °C · source face`, [0, chamCenter, 0]);
          addLbl("#38bdf8", "Steam Inlet", [-(chamR + 2.2), chamCenter + 0.9, 0], "from steam boiler", [-(chamR + 0.42), chamCenter + 0.42, 0]);
          addLbl("#94a3b8", "Vapour Outlet", [chamR + 1.9, chamCenter + 1.3, 0], "escaping steam", [outletTip.x, outletTip.y, 0]);
          addLbl(mat.color, `Sample Disc — ${mat.name}`, [-discR - 2.5, sampleY + thickU + 0.6, 0], `thickness d = ${sampleThick} mm`, [0, sampleY, 0]);
          addLbl("#fb923c", "Lee's Disc (Copper)", [discR + 2.6, 0.4, 0], `m = ${(discMass * 1000).toFixed(0)} g, c = 385 J/kg·K`, [0, 0.44, 0]);
          addLbl("#22c55e", "Thermometer T₂", [discR + 2.3, 1.3, 0.6], `θ₂ ≈ ${theta2} °C at junction`, [discR - 0.28, 0.44, 0]);
          addLbl("#a3a3a3", "Clamping Weights", [0.55, pinY + 0.9, 0], "press faces together", [0.55, pinY, 0]);
          addLbl("#94a3b8", "Tripod Stand", [-(discR + 2.4), 0.4, 0], "insulated wooden top", [0, 0.07, 0.6]);

          /* ---------- ANIMATION LOOP ---------- */
          function animate() {
            if (cancelled || !ts) return;
            requestAnimationFrame(animate);
            const t = performance.now() / 1000;
            glowMats.forEach((m) => { m.emissiveIntensity = 0.65 + Math.sin(t * 3.2) * 0.3; });
            puffs.forEach((pf, i) => {
              const u = (t * 0.45 + pf.seed) % 1;
              pf.mesh.position.set(
                outletTip.x + Math.sin((u + pf.seed) * 6) * 0.2,
                outletTip.y + u * 1.7,
                outletTip.z + Math.cos((u + pf.seed) * 6) * 0.2
              );
              pf.mesh.scale.setScalar(Math.max(0.05, 1 - u * 0.85));
              (pf.mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.55 * (1 - u));
            });
            ts.controls.update();
            ts.renderer.render(ts.scene, ts.camera);
            if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
            if (leaderLayer) leaderLayer.draw(ts.camera, connections);
          }
          animate();
        } catch (e) { console.log("CSS2DRenderer not available"); }
      } catch (err) {
        console.error("LeesDisc init:", err);
      }
    }
    init();

    return () => {
      cancelled = true;
      unbind?.();
      if (ts) try { disposeThreeScene(ts); } catch {}
      const m = mountRef.current;
      if (labelRenderer?.domElement && m && labelRenderer.domElement.parentNode === m) {
        m.removeChild(labelRenderer.domElement);
      }
      try { leaderLayer?.dispose?.(); } catch {}
      if (m) m.querySelectorAll(".label").forEach((e) => e.remove());
    };
  }, [webGL, matIdx, discMass, coolRate, sampleThick, radiusCm, theta1, theta2, showSteam]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🧱 Lee's Disc Method — Determination of Thermal Conductivity (K) of a Bad Conductor</CardTitle>
        <CardDescription>
          Steam heats a thin bad-conductor disc sitting on a copper Lee's disc. At steady state, heat conducted through the sample per second equals the rate at which the copper disc later cools freely — giving K = m·c·(dθ/dt)·d / [A·(θ₁ − θ₂)].
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* ---------- labeled 3D scene area ---------- */}
        <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-primary/30 overflow-hidden bg-slate-950" aria-label="3D Lee's disc apparatus with labelled components">
          <div ref={mountRef} className="absolute inset-0" />
          {!webGL && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
              WebGL is unavailable in this browser — the labelled 3D apparatus cannot be rendered.
            </div>
          )}
          <span className="absolute bottom-2 left-2 text-[10px] text-slate-400 bg-black/40 rounded px-2 py-1 pointer-events-none">drag = rotate · scroll = zoom · coloured boxes = CSS2D part labels</span>
        </div>

        {/* ---------- controls ---------- */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Label>Sample (bad conductor)</Label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {SAMPLES.map((sm, i) => (
                <Button key={sm.name} size="sm" variant={i === matIdx ? "default" : "outline"} onClick={() => setMatIdx(i)}>{sm.name}</Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{mat.note}</p>
          </div>

          <div><Label>Mass of Lee's disc m ({discMass.toFixed(2)} kg)</Label><Slider min={0.05} max={1} step={0.05} value={[discMass]} onValueChange={(v) => setDiscMass(v[0])} /><p className="text-xs text-muted-foreground">weighed on a balance</p></div>
          <div><Label>Cooling rate dθ/dt at θ₂ ({coolRate.toFixed(1)} °C/min)</Label><Slider min={0.5} max={60} step={0.5} value={[coolRate]} onValueChange={(v) => setCoolRate(v[0])} /><p className="text-xs text-muted-foreground">from the free-cooling curve of the bare disc</p></div>
          <div><Label>Sample thickness d ({sampleThick} mm)</Label><Slider min={1} max={12} step={1} value={[sampleThick]} onValueChange={(v) => setSampleThick(v[0])} /><p className="text-xs text-muted-foreground">screw-gauge, several places averaged</p></div>
          <div><Label>Disc radius r ({radiusCm} cm)</Label><Slider min={3} max={8} step={0.5} value={[radiusCm]} onValueChange={(v) => setRadiusCm(v[0])} /></div>
          <div><Label>Steam-side temperature θ₁ ({theta1} °C)</Label><Slider min={80} max={99} step={1} value={[theta1]} onValueChange={(v) => setTheta1(v[0])} /></div>
          <div><Label>Junction temperature θ₂ ({theta2} °C)</Label><Slider min={45} max={Math.max(46, theta1 - 4)} step={1} value={[theta2]} onValueChange={(v) => setTheta2(Math.min(v[0], theta1 - 4))} /></div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant={showSteam ? "default" : "outline"} size="sm" onClick={() => setShowSteam(!showSteam)}>{showSteam ? "Hide" : "Show"} Steam Puffs</Button>
          <Button variant="outline" size="sm" onClick={() => { setMatIdx(0); setDiscMass(0.45); setCoolRate(12); setSampleThick(4); setRadiusCm(5); setTheta1(92); setTheta2(74); }}>Reset to default</Button>
        </div>

        {/* ---------- live steady-state calculation ---------- */}
        <div className={`rounded-md border p-4 ${dTheta <= 0 ? "border-red-500/50 bg-red-500/10" : "border-border bg-muted/30"}`}>
          <h4 className="font-semibold mb-2 text-primary">Steady-state computation</h4>
          {dTheta <= 0 && <p className="mb-2 text-xs font-semibold text-red-500">⚠ θ₂ must be below θ₁ — set a real gradient across the sample.</p>}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
            <div className="flex justify-between"><span>Temperature difference (θ₁ − θ₂):</span><span className="font-mono">{dTheta} K</span></div>
            <div className="flex justify-between"><span>Heat-loss rate m·c·(dθ/dt):</span><span className="font-mono">{Number.isFinite(heatLossRate) ? heatLossRate.toFixed(2) : "—"} W</span></div>
            <div className="flex justify-between"><span>Face area A = πr²:</span><span className="font-mono">{(area * 1e4).toFixed(1)} cm²</span></div>
            <div className="flex justify-between"><span>Sample thickness d:</span><span className="font-mono">{thicknessM * 1000} mm</span></div>
            <div className="flex justify-between col-span-full pt-1 border-t border-border/60">
              <span className="font-semibold">Measured conductivity K:</span>
              <span className="font-mono text-base font-bold">{Number.isFinite(K) ? K.toFixed(3) : "—"} W·m⁻¹·K⁻¹</span>
            </div>
            <div className="flex justify-between"><span>Literature k ({mat.name}):</span><span className="font-mono">{mat.k.toFixed(2)} W·m⁻¹·K⁻¹</span></div>
            <div className="flex justify-between">
              <span>Deviation from literature:</span>
              <span className={`font-mono font-semibold ${Number.isFinite(deviation) && Math.abs(deviation) < 15 ? "text-green-600" : "text-amber-600"}`}>
                {Number.isFinite(deviation) ? `${deviation > 0 ? "+" : ""}${deviation.toFixed(1)}%` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* ---------- labelled parts guide ---------- */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Parts guide — border colour · position · physical role</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { c: "#fb923c", n: "Steam chamber", p: "top of stack", s: "condensing steam holds upper face near 100 °C" },
              { c: "#38bdf8", n: "Steam inlet", p: "upper-left stub", s: "fresh steam keeps supply & pressure steady" },
              { c: "#94a3b8", n: "Vapour outlet", p: "upper-right stub", s: "prevents any pressure build-up" },
              { c: mat.color, n: `${mat.name} sample`, p: "thin mid-stack disc", s: "the conductor under test — gradient lives across its d" },
              { c: "#fb923c", n: "Lee's copper disc", p: "split base cylinder", s: "absorbs steady flux, later cooled to quantify it" },
              { c: "#22c55e", n: "Thermometer T₂", p: "radial pocket at junction", s: "records θ₂ for the Lee-disc top face" },
              { c: "#a3a3a3", n: "Clamping weights", p: "stack on lid pin", s: "press faces together, removing air films" },
              { c: "#94a3b8", n: "Tripod stand", p: "three legs + wooden top", s: "insulated support cuts downward heat leak" },
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
          title="Lee's Disc — all theory in one place"
          vocabulary="Steady state — temps constant while heat flows; Cooling correction — bare-disc slope dθ/dt read exactly AT θ₂; Heat capacity m·c — copper disc inertia (c = 385 J·kg⁻¹·K⁻¹)."
          look="The two glowing rings pulse in phase only at true steady state; steam puffs show constant supply while T₂ stays frozen."
          predict={`Predict first: halving sample thickness d roughly halves the needed θ₁−θ₂ for the same flux — test 2 mm vs 12 mm and confirm measured K barely moves.`}
          principle={
            <>
              Steady-state balance: flux through sample = free-cooling loss of disc
              <span className="block font-mono text-[11px] mt-1 text-foreground">K·A·(θ₁ − θ₂)/d = m·c·(dθ/dt)</span>
              <span className="block mt-1">So <span className="font-mono">K = m·c·(dθ/dt)·d / [A·(θ₁ − θ₂)]</span>, with A = πr² — every symbol maps to ONE labelled part above.</span>
            </>
          }
          why="Bad conductors defeat Searle's bar (gradient too steep over centimetres); Lee's disc converts the tiny conducted flux into an easy mass-cooling measurement — the origin of every insulation spec sheet."
        />

        {/* ---------- complete meaning of every symbol ---------- */}
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-4">
          <h4 className="font-semibold mb-1 text-primary">📖 Complete meaning of every symbol in K = m·c·(dθ/dt)·d / [A·(θ₁ − θ₂)]</h4>
          <p className="text-xs text-muted-foreground mb-3">Read the formula left → right; each term maps to a labelled part in the 3D apparatus above — follow the arrows.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { s: "K", n: "Thermal conductivity (W·m⁻¹·K⁻¹)", m: "How easily heat conducts through the sample. HIGH K = good conductor; low-K = thermal insulator. This whole experiment exists to determine K." },
              { s: "m", n: "Mass of the copper Lee's disc (kg)", m: "Weighed on a balance. A heavier disc stores more heat, so its free-cooling slope is gentler and the dθ/dt reading is steadier." },
              { s: "c", n: "Specific heat capacity of copper (J·kg⁻¹·K⁻¹)", m: "Joules absorbed per °C per kg. For copper c = 385 — a fixed, known constant we never need to measure." },
              { s: "dθ/dt", n: "Cooling rate of the bare disc at θ₂ (°C·min⁻¹)", m: "Read from the free-cooling slope — the cooling-correction quantity. At steady state it equals the conductive flux through the sample." },
              { s: "d", n: "Sample thickness (m)", m: "The bad-conductor path for heat. Thicker sample = smaller flux. Measured with a screw gauge, averaged over many spots." },
              { s: "A = πr²", n: "Cross-sectional area of the disc (m²)", m: "The face perpendicular to heat flow. A bigger face passes more heat for the same temperature gradient." },
              { s: "θ₁", n: "Steam-side temperature (°C)", m: "The HOT face of the sample, held near 100 °C by condensing steam in the chamber on top of the stack." },
              { s: "θ₂", n: "Lee's-disc junction temperature (°C)", m: "The COOL face between sample and copper disc, read by thermometer T₂ sitting in the radial pocket." },
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
          <div className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3"><span className="text-lg leading-none">🏗️</span><div><p className="text-sm font-medium">Buildings</p><p className="text-xs text-muted-foreground">Fibreglass & foam boards (k ≈ 0.03–0.15) chosen straight from values measured by this very method.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-sky-500/30 bg-sky-500/5 p-3"><span className="text-lg leading-none">🍳</span><div><p className="text-sm font-medium">Kitchenware</p><p className="text-xs text-muted-foreground">Rubber-family handles (k ≈ 0.16) stay cool while a copper pan bottom conducts ~2000× better.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-violet-500/30 bg-violet-500/5 p-3"><span className="text-lg leading-none">🧊</span><div><p className="text-sm font-medium">Cold chain</p><p className="text-xs text-muted-foreground">Vaccine boxes and fridge jackets rely on low-K panels validated exactly like today's sample disc.</p></div></div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Procedure quick-list (exam order)</h4>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Weigh Lee's disc; measure r (vernier) and sample thickness d (screw gauge, averaged).</li>
              <li>Stack chamber–sample–disc, clamp gently, open steam.</li>
              <li>Wait 15–20 min until both thermometers freeze → record θ₁, θ₂.</li>
              <li>Lift chamber; take the bare disc's cooling curve; read dθ/dt at θ₂.</li>
              <li>Substitute into the K formula and compare with the table value.</li>
            </ol>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Main error sources</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Air films between faces — the clamping weights exist to kill these.</li>
              <li>Reading dθ/dt at the wrong temperature → cooling-correction error.</li>
              <li>Non-Newtonian radiative part of the disc's cooling ignored.</li>
              <li>Sideways heat leak from the exposed sample rim.</li>
            </ul>
          </div>
        </div>

      </CardContent>
    </Card>
  );

};

export default LeesDiscExperiment;
