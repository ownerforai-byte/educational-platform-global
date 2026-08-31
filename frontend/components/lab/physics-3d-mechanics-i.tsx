"use client";

/**
 * Class 11 Mechanics Suite — labelled 3D simulations mapped to the
 * NEB Physics XI (Phy. 101) syllabus:
 *   • Kinematics           — projectile motion
 *   • Circular Motion      — conical pendulum, vertical circle, banked road
 *   • Dynamics             — momentum conservation & collisions
 *   • Work, Energy, Power  — energy conservation on a frictionless track
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

/* ---------- shared small helpers ---------- */

function mkLabel(color: string, title: string, sub?: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.82);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;`;
  el.innerHTML = `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-weight:500">${sub}</span>` : "");
  return el;
}

function arrow(dir: THREE.Vector3, origin: THREE.Vector3, len: number, color: number): THREE.ArrowHelper {
  return new THREE.ArrowHelper(dir.clone().normalize(), origin.clone(), len, color, len * 0.22, len * 0.12);
}
/* =====================================================================
 * TAB 1 — Projectile motion (Kinematics)
 * ===================================================================== */

const ProjectilesTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [v0, setV0] = useState(40);
  const [theta, setTheta] = useState(45);
  const [g, setG] = useState(9.8);

  const rad = (theta * Math.PI) / 180;
  const H = (v0 * v0 * Math.sin(rad) ** 2) / (2 * g);
  const R = (v0 * v0 * Math.sin(2 * rad)) / g;
  const T = (2 * v0 * Math.sin(rad)) / g;

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(14, 9, 18), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `Projectile — v₀ ${v0} m/s, θ ${theta}°`, new THREE.Vector3(0, 5.6, 0));

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

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(34, 0.3, 16), standardMaterial(0x14532d, { roughness: 0.9 })));
        const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.8, 1.1, 20), standardMaterial(0x57534e, { metalness: 0.5 }));
        pedestal.position.set(-13.5, 0.85, 0);
        ts.group.add(pedestal);
        const cannon = new THREE.Group();
        cannon.add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 2.3, 16), standardMaterial(0x334155, { metalness: 0.7 })));
        cannon.position.set(-13.5, 1.65, 0);
        cannon.rotation.z = rad;
        ts.group.add(cannon);
        addLbl("#f87171", "Cannon (launch point)", [-13.5, 3.9, 0], `muzzle speed v₀ = ${v0} m/s`, [-12.5, 2.2, 0]);
        addLbl("#38bdf8", "Launch angle θ", [-13.5, 3.0, 2.6], `θ = ${theta}°`, [-12.9, 2.6, 0]);
/* predicted parabola in scene units */
        const spanU = Math.min(30.5, Math.max(8, R * 0.35));
        const yScale = spanU * (H / Math.max(1, R)) * 1.1;
        const y0 = 1.65;
        const pts: THREE.Vector3[] = [];
        const n = 64;
        for (let i = 0; i <= n; i++) {
          const s = i / n;
          pts.push(new THREE.Vector3(-13.5 + s * spanU, Math.max(0.2, y0 + yScale * (4 * s * (1 - s))), 0));
        }
        const path = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineDashedMaterial({ color: 0xfacc15, dashSize: 0.42, gapSize: 0.28 })
        );
        path.computeLineDistances();
        ts.group.add(path);

        const apex = pts[Math.round(n / 2)];
        addLbl("#facc15", `Apex H = ${H.toFixed(1)} m`, [apex.x + 0.4, apex.y + 2.1, 0], `at t = T/2 = ${(T / 2).toFixed(2)} s, v_y = 0`, [apex.x, apex.y + 0.3, 0]);
        addLbl("#4ade80", `Range R = ${R.toFixed(1)} m`, [0.5, 1.7, -4.4], `flight time T = ${T.toFixed(2)} s`, [Math.min(17, pts[n].x), 0.4, 0]);
        addLbl("#c084fc", "Only g acts after launch", [-6.5, 5.0, 0], "hence the parabolic path", [-6.5, 3.6, 0]);

        ts.group.add(arrow(new THREE.Vector3(Math.cos(rad), Math.sin(rad), 0), new THREE.Vector3(-13.5, 1.65, 0), 3.2, 0xfb923c));
        ts.group.add(arrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-13.5, 1.65, 0), 3.2 * Math.cos(rad), 0x22d3ee));
        ts.group.add(arrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-13.5, 1.65, 0), 3.2 * Math.sin(rad), 0xa78bfa));
        addLbl("#fb923c", "v₀ = √(vₓ² + v_y²)", [-9.0, 5.6, 0], "vₓ constant; v_y falls by g each second", [-12.6, 3.6, 0]);

        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.42, 22, 16), standardMaterial(0xf97316, { emissive: 0xf59e0b, emissiveIntensity: 0.5 }));
        ts.group.add(ball);

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const p = (t * 0.28) % 1;
          ball.position.copy(pts[Math.min(n - 1, Math.floor(p * n))]);
          if (leaderLayer) leaderLayer.draw(ts!.camera, connections);
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
          if (labelRenderer) labelRenderer.render(ts!.scene, ts!.camera);
        }
        animate();
      } catch { /* CSS2D/WebGL unavailable — readouts beside the scene stay valid */ }
    })();

    return () => {
      cancelled = true;
      if (ts) disposeThreeScene(ts);
      if (unbind) unbind();
      if (labelRenderer?.domElement?.parentNode) labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement);
      leaderLayer?.dispose?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, v0, theta, g]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable — equations beside the scene still apply.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Launch speed v₀</Label><span className="text-sm font-semibold text-primary">{v0} m/s</span></div>
            <Slider value={[v0]} min={10} max={80} step={1} onValueChange={(v) => setV0(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Launch angle θ</Label><span className="text-sm font-semibold text-primary">{theta}°</span></div>
            <Slider value={[theta]} min={5} max={85} step={1} onValueChange={(v) => setTheta(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Gravity g</Label><span className="text-sm font-semibold text-primary">{g} m/s²</span></div>
            <Slider value={[g]} min={1.6} max={24.8} step={0.1} onValueChange={(v) => setG(Number(v[0].toFixed(1)))} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Max height H</p><p className="text-sm font-bold text-amber-500">{H.toFixed(1)} m</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Range R</p><p className="text-sm font-bold text-emerald-500">{R.toFixed(1)} m</p></div>
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Flight time T</p><p className="text-sm font-bold text-sky-500">{T.toFixed(2)} s</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="The yellow dashed parabola is the predicted path; the orange ball rides it. Cyan/purple arrows are the constant vₓ and the shrinking v_y."
        predict="At θ = 45° the range R peaks (sin 2θ = 1). At θ = 30° and θ = 60° the range is identical — only the apex differs."
        principle="Independent components: x = v₀cosθ·t (uniform), y = v₀sinθ·t − ½gt² (accelerated). Hence H = v₀²sin²θ/2g, R = v₀²sin2θ/g, T = 2v₀sinθ/g."
        why="Cannon tables, javelin throws, fountains and ballistic rockets are this one equation with different v₀, θ and g."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 2 — Circular Motion: conical pendulum | vertical circle | banked road
 * ===================================================================== */

type CMMode = "conical" | "vertical" | "banked";

const CircularMotionTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [mode, setMode] = useState<CMMode>("conical");
  const [lenM, setLenM] = useState(1.8);
  const [angleDeg, setAngleDeg] = useState(30);

  const th = (angleDeg * Math.PI) / 180;
  const g = 9.8;
  const r = lenM * Math.sin(th);
  const h = lenM * Math.cos(th);
  const omega = Math.sqrt(g / h);
  const period = (2 * Math.PI) / omega;
  const tensionMul = 1 / Math.cos(th); // T = mg/cosθ → shown as multiples of mg
  const vTop = Math.sqrt(g * lenM);
  const vBank = Math.sqrt(g * r * Math.tan(th));

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(10, 6.5, 12), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, mode === "conical" ? "Conical Pendulum" : mode === "vertical" ? "Vertical Circle" : "Banked Road (frictionless)", new THREE.Vector3(0, 5.2, 0));

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

        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(24, 0.3, 24), standardMaterial(0x1e293b, { roughness: 0.95 })));
        const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 4.6, 12), standardMaterial(0x94a3b8, { metalness: 0.6 }));
        stand.position.set(0, 2.3, -2.6);
        ts.group.add(stand);

        const pivot = new THREE.Vector3(0, 4.6, -2.6);
        const L = Math.min(4.8, Math.max(1.8, lenM * 2.2));
        const str = new THREE.Line(new THREE.BufferGeometry().setFromPoints([pivot, pivot.clone()]), new THREE.LineBasicMaterial({ color: 0xe2e8f0 }));
        ts.group.add(str);
        const bob = new THREE.Mesh(new THREE.SphereGeometry(0.38, 22, 16), standardMaterial(0xf97316, { emissive: 0xf59e0b, emissiveIntensity: 0.55 }));
        ts.group.add(bob);

        addLbl("#f87171", "Pivot (ceiling mount)", [0, 5.9, -2.6], "string swings about this point", [0, 4.6, -2.6]);
        addLbl("#fb923c", `Bob — string L = ${lenM} m`, [3.4, 1.0, 0], "tension acts along the string", [1.2, 1.4, -2.6]);

        if (mode === "conical") {
          const rU = L * Math.sin(th);
          const cPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 48; i++) {
            const a = (i / 48) * Math.PI * 2;
            cPts.push(new THREE.Vector3(rU * Math.cos(a), 4.6 - L * Math.cos(th), -2.6 + rU * Math.sin(a)));
          }
          const circ = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cPts), new THREE.LineDashedMaterial({ color: 0x38bdf8, dashSize: 0.3, gapSize: 0.2 }));
          circ.computeLineDistances();
          ts.group.add(circ);
          addLbl("#38bdf8", `Radius r = L·sinθ = ${r.toFixed(2)} m`, [rU + 1.4, 2.0, -2.6], `semi-vertical angle θ = ${angleDeg}°`, [rU, 4.6 - L * Math.cos(th), -2.6]);
          addLbl("#a78bfa", "Centripetal force = T·sinθ", [-4.2, 3.8, -2.6], "points to the circle centre", [0, 4.6 - L * Math.cos(th), -2.6 + rU]);
          addLbl("#4ade80", "Vertical: T·cosθ = mg", [3.6, 3.2, -2.6], "bob stays at constant height", [1.4, 3.0, -2.6]);
        } else if (mode === "vertical") {
          const cPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 48; i++) {
            const a = (i / 48) * Math.PI * 2;
            cPts.push(new THREE.Vector3(L * Math.cos(a), 2.4 + L * Math.sin(a), -2.6));
          }
          const circ = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cPts), new THREE.LineDashedMaterial({ color: 0x38bdf8 }));
          circ.computeLineDistances();
          ts.group.add(circ);
          addLbl("#38bdf8", "Top of circle", [0, 2.4 + L + 1.3, -2.6], `least speed v_top = √(gL) = ${vTop.toFixed(2)} m/s`, [0, 2.4 + L, -2.6]);
          addLbl("#4ade80", "Bottom of circle", [0, 2.4 - L - 1.1, -2.6], "string tension largest here", [0, 2.4 - L, -2.6]);
          addLbl("#a78bfa", "Below √(gL) the string goes slack", [4.6, 2.4, -2.6], "bob leaves the circle", [L * 0.7, 3.4, -2.6]);
        } else {
          const road = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.4, 0.24, 40), standardMaterial(0x475569, { roughness: 0.8 }));
          road.position.set(0, 1.6, 0);
          road.rotation.z = -th;
          ts.group.add(road);
          const car = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.5), standardMaterial(0xf97316, { emissive: 0xf59e0b, emissiveIntensity: 0.4 }));
          car.position.set(3.2, 2.0, 0);
          ts.group.add(car);
          addLbl("#38bdf8", `Banking angle θ = ${angleDeg}°`, [-4.8, 3.8, 0], "road tilted inward", [-2.2, 2.6, 0]);
          addLbl("#facc15", "N·cosθ = mg", [4.8, 4.4, 0], "vertical balance", [1.4, 2.6, 0]);
          addLbl("#4ade80", `Safe speed v = √(rg·tanθ) = ${vBank.toFixed(1)} m/s`, [-1.5, 0.7, 3.6], "no friction needed at this speed", [2.4, 2.2, 0]);
        }

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          if (mode === "conical") {
            const a = t * omega * 0.9;
            const rU = L * Math.sin(th);
            bob.position.set(rU * Math.cos(a), 4.6 - L * Math.cos(th), -2.6 + rU * Math.sin(a));
            str.geometry.setFromPoints([pivot, bob.position]);
          } else if (mode === "vertical") {
            const a = t * 2.2;
            bob.position.set(L * Math.cos(a), 2.4 + L * Math.sin(a), -2.6);
            str.geometry.setFromPoints([pivot, bob.position]);
          } else {
            const a = t * Math.sqrt(g / (lenM * Math.sin(th))) * 0.35;
            const rr = 3.2;
            bob.position.set(rr * Math.cos(a), 2.0 - Math.sin(th) * rr * Math.sin(a) * 0.18, rr * Math.sin(a));
            bob.rotation.y = -a;
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
  }, [webGL, mode, lenM, angleDeg]);

  const readouts: [string, string, string][] = mode === "conical"
    ? [["Radius r", `${r.toFixed(2)} m`, "border-sky-500/30 text-sky-500"], ["Period T", `${period.toFixed(2)} s`, "border-emerald-500/30 text-emerald-500"], ["Tension T", `${tensionMul.toFixed(2)}·mg`, "border-amber-500/30 text-amber-500"]]
    : mode === "vertical"
      ? [["v_top (min)", `${vTop.toFixed(2)} m/s`, "border-sky-500/30 text-sky-500"], ["v_bottom", `${Math.sqrt(5 * g * lenM).toFixed(2)} m/s`, "border-emerald-500/30 text-emerald-500"], ["T_bottom (min. case)", "6·mg", "border-amber-500/30 text-amber-500"]]
      : [["Safe speed v", `${vBank.toFixed(1)} m/s`, "border-sky-500/30 text-sky-500"], ["Radius r", `${r.toFixed(2)} m`, "border-emerald-500/30 text-emerald-500"], ["tan θ", `${Math.tan(th).toFixed(2)}`, "border-amber-500/30 text-amber-500"]];

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as CMMode)}>
            <TabsList className="w-full">
              <TabsTrigger value="conical" className="flex-1">Conical pendulum</TabsTrigger>
              <TabsTrigger value="vertical" className="flex-1">Vertical circle</TabsTrigger>
              <TabsTrigger value="banked" className="flex-1">Banked road</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>String / curve length L</Label><span className="text-sm font-semibold text-primary">{lenM.toFixed(1)} m</span></div>
            <Slider value={[lenM]} min={0.6} max={4} step={0.1} onValueChange={(v) => setLenM(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>{mode === "vertical" ? "Circle radius r (fixed = L)" : "Angle θ"}</Label><span className="text-sm font-semibold text-primary">{mode === "vertical" ? `${lenM.toFixed(1)} m` : `${angleDeg}°`}</span></div>
            <Slider value={[angleDeg]} min={5} max={60} step={1} onValueChange={(v) => setAngleDeg(v[0])} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {readouts.map(([k, v, cls]) => (
              <div key={k} className={`rounded-md border ${cls.split(" ")[0]} bg-muted/30 p-2`}>
                <p className="text-[10px] uppercase text-muted-foreground">{k}</p>
                <p className={`text-xs font-bold ${cls.split(" ")[1]}`}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TheoryPanel
        look="Conical pendulum: the bob sweeps the dashed circle at constant height. Vertical circle: watch the bob slow at the top. Banked road: the tilted disc carries the car around without friction."
        predict="Steeper θ → smaller period (faster). Longer L → slower. At the top of a vertical circle the bob must not go below √(gL) or the string slackens."
        principle="Conical pendulum: tanθ = v²/rg and cosθ = g/(ω²L) → T = 2π√(Lcosθ/g). Vertical circle: at top, mg + T = mv²/L; at bottom, T − mg = mv²/L. Banked road: v = √(rg·tanθ)."
        why="Banking keeps cars safe on highways and velodromes; the same physics sets how fast a bucket can swing overhead without spilling."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 3 — Dynamics: momentum conservation & collisions
 * ===================================================================== */

const CollisionsTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(3);
  const [u1, setU1] = useState(5);
  const [u2, setU2] = useState(-2);
  const [e, setE] = useState(1); // coefficient of restitution: 1 elastic, 0 perfectly inelastic

  const M = m1 + m2;
  const pBefore = m1 * u1 + m2 * u2;
  const keBefore = 0.5 * m1 * u1 ** 2 + 0.5 * m2 * u2 ** 2;
  const v1 = ((m1 - e * m2) * u1 + (1 + e) * m2 * u2) / M;
  const v2 = ((m2 - e * m1) * u2 + (1 + e) * m1 * u1) / M;
  const keAfter = 0.5 * m1 * v1 ** 2 + 0.5 * m2 * v2 ** 2;

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(9, 7.5, 15), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, e === 1 ? "Perfectly Elastic Collision" : e === 0 ? "Perfectly Inelastic Collision" : `Collision (e = ${e.toFixed(2)})`, new THREE.Vector3(0, 4.6, 0));

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

        /* frictionless air-track */
        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(26, 0.5, 3.4), standardMaterial(0x334155, { metalness: 0.5 })));
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.6, 10), standardMaterial(0x1e293b));
        leg.position.y = -1.0;
        ts.group.add(leg);

        const sizeOf = (m: number) => 0.75 + m * 0.28;
        const cartA = new THREE.Mesh(new THREE.BoxGeometry(sizeOf(m1), 1.0, 1.3), standardMaterial(0x38bdf8, { emissive: 0x0ea5e9, emissiveIntensity: 0.25 }));
        cartA.position.set(-10, 1.0, 0);
        ts.group.add(cartA);
        const cartB = new THREE.Mesh(new THREE.BoxGeometry(sizeOf(m2), 1.0, 1.3), standardMaterial(0xf97316, { emissive: 0xf59e0b, emissiveIntensity: 0.25 }));
        cartB.position.set(10, 1.0, 0);
        ts.group.add(cartB);

        addLbl("#38bdf8", `Glider A — m₁ = ${m1} kg`, [-10, 3.6, 0], `u₁ = ${u1} m/s`, [-10, 1.9, 0]);
        addLbl("#fb923c", `Glider B — m₂ = ${m2} kg`, [10, 3.6, 0], `u₂ = ${u2} m/s`, [10, 1.9, 0]);
        addLbl("#4ade80", "Air track — frictionless", [-8.5, -0.9, 2.6], "momentum is conserved exactly", [-8.5, 0.3, 1.0]);
        addLbl("#a78bfa", "Collision point", [0, 4.0, 0], e === 0 ? "carts stick together (e = 0)" : "carts separate after impact", [0, 1.4, 0]);

        const uScale = 0.55; // scene units per m/s
        ts.group.add(arrow(new THREE.Vector3(Math.sign(u1), 0, 0), new THREE.Vector3(-10, 2.6, 0), Math.abs(u1) * uScale + 0.8, 0x22d3ee));
        ts.group.add(arrow(new THREE.Vector3(Math.sign(u2), 0, 0), new THREE.Vector3(10, 2.6, 0), Math.abs(u2) * uScale + 0.8, 0xfacc15));
function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const p = (t % 7) / 7;
          const approachT = 0.5;
          if (p < approachT) {
            const q = p / approachT;
            cartA.position.x = -10 + q * 10;
            cartB.position.x = 10 - q * 10;
          } else {
            const q = (p - approachT) / (1 - approachT);
            cartA.position.x = q * v1 * 5.2 * uScale;
            cartB.position.x = q * (e === 0 ? v1 : v2) * 5.2 * uScale;
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
  }, [webGL, m1, m2, u1, u2, e]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Mass m₁</Label><span className="text-sm font-semibold text-primary">{m1} kg</span></div>
            <Slider value={[m1]} min={0.5} max={8} step={0.5} onValueChange={(v) => setM1(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Mass m₂</Label><span className="text-sm font-semibold text-primary">{m2} kg</span></div>
            <Slider value={[m2]} min={0.5} max={8} step={0.5} onValueChange={(v) => setM2(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Velocity u₁ (+ right)</Label><span className="text-sm font-semibold text-primary">{u1} m/s</span></div>
            <Slider value={[u1]} min={-8} max={8} step={0.5} onValueChange={(v) => setU1(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Velocity u₂ (+ right)</Label><span className="text-sm font-semibold text-primary">{u2} m/s</span></div>
            <Slider value={[u2]} min={-8} max={8} step={0.5} onValueChange={(v) => setU2(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Restitution e (0 sticky → 1 elastic)</Label><span className="text-sm font-semibold text-primary">{e.toFixed(2)}</span></div>
            <Slider value={[e]} min={0} max={1} step={0.05} onValueChange={(v) => setE(v[0])} />
          </div>
          <div className="space-y-1.5 rounded-md border border-border bg-muted/30 p-3 text-xs">
            <p className="font-semibold text-primary">After collision (1-D, restitution e)</p>
            <p className="flex justify-between"><span>v₁′</span><span className="font-mono font-bold text-sky-500">{v1.toFixed(2)} m/s</span></p>
            <p className="flex justify-between"><span>v₂′</span><span className="font-mono font-bold text-orange-500">{v2.toFixed(2)} m/s</span></p>
            <p className="flex justify-between"><span>Σp before</span><span className="font-mono">{pBefore.toFixed(2)} kg·m/s</span></p>
            <p className="flex justify-between"><span>Σp after</span><span className="font-mono">{(m1 * v1 + m2 * v2).toFixed(2)} kg·m/s</span></p>
            <p className="flex justify-between"><span>KE before → after</span><span className="font-mono">{keBefore.toFixed(1)} → {keAfter.toFixed(1)} J</span></p>
            <p className="flex justify-between"><span>KE lost</span><span className="font-mono text-red-500">{(keBefore - keAfter).toFixed(1)} J</span></p>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="Two gliders approach each other on a frictionless air track. Cyan and yellow arrows show the initial velocities; watch what each glider does after the impact."
        predict="Slide e to 0: both gliders move off together with the centre-of-mass velocity p/(m₁+m₂). Slide e to 1: KE is fully recovered."
        principle="Momentum is always conserved: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. Restitution adds v₂′ − v₁′ = e(u₁ − u₂). KE is conserved only when e = 1."
        why="Car-crash safety, billiards, ball bounce height (e² of drop height) and rocket staging all come from these two lines of algebra."
      />
    </div>
  );
};
/* =====================================================================
 * TAB 4 — Work, Energy & Power: conservation of energy on a track
 * ===================================================================== */

const WorkEnergyTab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [heightM, setHeightM] = useState(6);
  const [massKg, setMassKg] = useState(2);
  const [frictionless, setFrictionless] = useState(true);

  const g = 9.8;
  const E = massKg * g * heightM;
  const vBottom = Math.sqrt(2 * g * heightM);
  const keHalf = E - massKg * g * heightM / 2; // KE at half height (frictionless)

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
        ts = createThreeScene(mountRef.current!, { cameraPosition: new THREE.Vector3(10, 6, 13), background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, `Energy conservation — m·g·h = ½mv²  (E = ${E.toFixed(0)} J)`, new THREE.Vector3(0, 5.4, 0));

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

        /* track: cosine-shaped valley from (-9, 6) down to (0, 0) up to (9, 3) */
        const topY = heightM * 0.62;
        const trackPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 72; i++) {
          const x = -9 + (18 * i) / 72;
          const y = topY * 0.5 * (1 + Math.cos((x / 9) * Math.PI)) + 0.3;
          trackPts.push(new THREE.Vector3(x, Math.max(0.3, y), 0));
        }
        const track = new THREE.Line(new THREE.BufferGeometry().setFromPoints(trackPts), new THREE.LineBasicMaterial({ color: 0x94a3b8 }));
        ts.group.add(track);
        ts.group.add(new THREE.Mesh(new THREE.BoxGeometry(24, 0.3, 14), standardMaterial(0x14532d, { roughness: 0.95 })));

        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.42, 22, 16), standardMaterial(0xf97316, { emissive: 0xf59e0b, emissiveIntensity: 0.5 }));
        ts.group.add(ball);
        const keArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 0.01, 0x22d3ee, 0.3, 0.18);
        ts.group.add(keArrow);

        addLbl("#f87171", `Start — h = ${heightM} m`, [-9.2, topY + 1.6, 0], `PE = mgh = ${E.toFixed(0)} J, KE = 0`, [-9.2, topY + 0.4, 0]);
        addLbl("#4ade80", "Bottom — lowest point", [0.5, 0.2, 2.8], `v = √(2gh) = ${vBottom.toFixed(1)} m/s → all energy is KE`, [0, 0.5, 0]);
        addLbl("#38bdf8", "Half-way down", [-4.6, topY * 0.62 + 1.4, 0], "PE = KE = E/2 (frictionless)", [-4.6, trackPts[Math.round(72 * 0.25)].y, 0]);
        addLbl("#a78bfa", frictionless ? "Frictionless — E is constant" : "With friction — E leaks as heat", [6.5, 4.6, 0], "watch the ball stop short", [7.5, 1.6, 0]);
function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const cyc = 9;
          const p = (t % cyc) / cyc;
          let s: number;
          if (p < 0.42) s = (p / 0.42) * 0.75;                    // descend to bottom
          else if (p < 0.84) s = 0.75 + ((p - 0.42) / 0.42) * 0.25; // climb far side
          else s = 1 - ((p - 0.84) / 0.16) * 0.25;                 // roll back (bounce)
          const idx = Math.min(72, Math.round(s * 72));
          const pos = trackPts[idx];
          ball.position.copy(pos);

          const hNow = Math.max(0, pos.y - 0.3);
          const pe = massKg * g * hNow;
          const ke = Math.max(0, E - pe * (frictionless ? 1 : 1.06));
          keArrow.position.copy(ball.position.clone().add(new THREE.Vector3(0, 0.8, 0)));
          keArrow.setLength(Math.max(0.01, (ke / Math.max(1, E)) * 3.6), 0.3, 0.18);
          keArrow.setColor(new THREE.Color(frictionless ? 0x22d3ee : 0xf87171));

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
  }, [webGL, heightM, massKg, frictionless]);

  return (
    <div className="space-y-3">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-border bg-slate-950" ref={mountRef}>
          {!webGL && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">WebGL unavailable.</div>}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Release height h</Label><span className="text-sm font-semibold text-primary">{heightM.toFixed(1)} m</span></div>
            <Slider value={[heightM]} min={1} max={8} step={0.5} onValueChange={(v) => setHeightM(v[0])} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Mass m</Label><span className="text-sm font-semibold text-primary">{massKg.toFixed(1)} kg</span></div>
            <Slider value={[massKg]} min={0.5} max={8} step={0.5} onValueChange={(v) => setMassKg(v[0])} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={frictionless} onChange={(ev) => setFrictionless(ev.target.checked)} className="h-4 w-4 accent-primary" />
            Frictionless track
          </label>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md border border-violet-500/30 bg-violet-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Total energy E</p><p className="text-sm font-bold text-violet-500">{E.toFixed(0)} J</p></div>
            <div className="rounded-md border border-sky-500/30 bg-sky-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">v at bottom</p><p className="text-sm font-bold text-sky-500">{vBottom.toFixed(1)} m/s</p></div>
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">PE + KE at half-height</p><p className="text-sm font-bold text-emerald-500">{(E / 2).toFixed(0)} + {keHalf.toFixed(0)} J</p></div>
            <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2"><p className="text-[10px] uppercase text-muted-foreground">Power if descent takes 2 s</p><p className="text-sm font-bold text-amber-500">{(E / 2).toFixed(0)} W</p></div>
          </div>
        </div>
      </div>
      <TheoryPanel
        look="The ball rolls down a curved track. The cyan arrow length tracks its kinetic energy; it is longest at the bottom where PE is zero."
        predict="Double the mass and E doubles, yet the speed at the bottom is unchanged — mass cancels in mgh = ½mv²."
        principle="Work-energy theorem: W_net = ΔKE. With only gravity (a conservative force), E = PE + KE stays constant: v = √(2gh) independent of path shape and mass."
        why="Roller coasters rely on exactly this. Friction converts the 'missing' energy to heat — that is why real coasters need chain lifts on every hill."
      />
    </div>
  );
};
/* =====================================================================
 * Main suite — outer tabs map each sim to its syllabus unit
 * ===================================================================== */

export const MechanicsSuite3D: React.FC = () => {
  const [tab, setTab] = useState("projectile");

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">🏃 Class 11 Mechanics Suite</CardTitle>
        <CardDescription>
          NEB Physics XI — Kinematics (projectile motion), Circular Motion (conical pendulum, vertical circle, banking),
          Dynamics (momentum & collisions), and Work-Energy-Power — all in labelled 3D.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="projectile">Projectile Motion</TabsTrigger>
            <TabsTrigger value="circular">Circular Motion</TabsTrigger>
            <TabsTrigger value="collisions">Momentum & Collisions</TabsTrigger>
            <TabsTrigger value="work-energy">Work, Energy & Power</TabsTrigger>
          </TabsList>
          <TabsContent value="projectile"><ProjectilesTab /></TabsContent>
          <TabsContent value="circular"><CircularMotionTab /></TabsContent>
          <TabsContent value="collisions"><CollisionsTab /></TabsContent>
          <TabsContent value="work-energy"><WorkEnergyTab /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MechanicsSuite3D;


