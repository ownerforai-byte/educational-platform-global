"use client";

/**
 * SYMBOLS AT THEIR EXACT PLACE — Physics · Mechanics.
 * Pendulum & Projectile Motion render each classic symbol inside the 3D scene
 * exactly where the quantity acts, with the same LabelDef[] reused below the
 * canvas so descriptions never drift from the in-scene chips.
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { createLabelSystem, LabelDef, SceneArea, GuidePanel } from "@/components/lab/label3d";
import { createThreeScene, bindResize, disposeThreeScene, standardMaterial, titleText } from "@/components/lab/three-scene";

/* ================================================================
   EXPERIMENT 1 · SIMPLE PENDULUM (θ, L, mg, T, ω)
   ================================================================ */

function Pendulum3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [L, setL] = useState(2.4);
  const [theta0, setTheta0] = useState(22);
  const [g, setG] = useState(9.8);
  const [running, setRunning] = useState(true);

  const om = Math.sqrt(g / L);
  const Tperiod = (2 * Math.PI) / om;
  const thR = (theta0 * Math.PI) / 180;

  const defs: LabelDef[] = [
    { x: 0.8, y: 2.7, z: 0, symbol: "θ₀", name: "Amplitude", desc: "Max angular displacement; small angles ⇒ simple-harmonic motion.", color: "#fb923c" },
    { x: -1.6, y: 1.4, z: 0, symbol: "L", name: "Length", desc: "Pivot-to-bob distance; T = 2π√(L/g).", color: "#38bdf8" },
    { x: 0, y: -1.1, z: 0, symbol: "mg", name: "Weight", desc: "Gravity at the bob; the tangential part mg·sinθ restores motion.", color: "#ef4444" },
    { x: 0.7, y: 1.0, z: 0, symbol: "T", name: "Tension", desc: "String force toward pivot; T = m(g·cosθ + v²/L).", color: "#22c55e" },
    { x: 0, y: 3.0, z: 0, symbol: "ω = √(g/L)", name: "Angular frequency", desc: "Rad/s oscillation rate; period T = 2π/ω.", color: "#a78bfa" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    const pivotY = 2.6;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 3.4, 9.5), autoRotate: false, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Simple Pendulum", new THREE.Vector3(0, 4.0, 0));

        const pivot = new THREE.Vector3(0, pivotY, 0);
        const mountBox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 0.7), standardMaterial(0x475569, { metalness: 0.4 }));
        mountBox.position.copy(pivot);
        ts.group.add(mountBox);
        const pin = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), standardMaterial(0xf8fafc));
        pin.position.set(0, pivot.y - 0.16, 0);
        ts.group.add(pin);

        const swing = new THREE.Group();
        swing.position.copy(pivot);
        ts.group.add(swing);
        const rodMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, L, 8), standardMaterial(0x94a3b8, { metalness: 0.3 }));
        rodMesh.position.y = -L / 2;
        swing.add(rodMesh);
        const bob = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 20), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.35 }));
        bob.position.y = -L;
        swing.add(bob);

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const ang = running ? thR * Math.cos(om * t) : thR;
          if (swing) swing.rotation.z = ang;
          const bxc = Math.sin(ang) * L;
          const byc = pivot.y - Math.cos(ang) * L;
          sys.setPos(0, Math.sin(ang) * 0.4 + 0.5, pivot.y + 0.2, 0);
          sys.setPos(1, bxc - 1.15, pivot.y - Math.cos(ang) * (L / 2) * 0.7, 0);
          sys.setPos(2, bxc, byc - 0.65, 0);
          sys.setPos(3, (bxc - 0.8) / 1 - 0.3, pivot.y - Math.cos(ang) * (L / 2) * 0.5, 0);
          sys.setPos(4, 0.6, pivot.y + 0.9, 0);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("pendulum", e); }
    }
    init();

    return () => {
      cancelled = true;
      unbind?.();
      if (sys) try { sys.dispose(); } catch {}
      if (ts) try { disposeThreeScene(ts); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, L, g, theta0, running]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🕰️ Simple Pendulum — symbols at their exact places</CardTitle>
        <CardDescription>θ₀, L, mg, T and ω are drawn inside the scene exactly where each quantity acts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="drag=rotate · scroll=zoom · coloured chips are live symbols" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Length L ({L.toFixed(1)} m)</Label><Slider min={1} max={4} step={0.1} value={[L]} onValueChange={(v) => setL(v[0])} /></div>
          <div><Label>Amplitude θ₀ ({theta0}°)</Label><Slider min={5} max={45} step={1} value={[theta0]} onValueChange={(v) => setTheta0(v[0])} /></div>
          <div><Label>Gravity g ({g.toFixed(1)} m/s²)</Label><Slider min={1.6} max={24} step={0.1} value={[g]} onValueChange={(v) => setG(v[0])} /></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={running ? "default" : "outline"} onClick={() => setRunning(!running)}>{running ? "Pause" : "Run"}</Button>
          <Button size="sm" variant="outline" onClick={() => { setL(2.4); setTheta0(22); setG(9.8); setRunning(true); }}>Reset</Button>
          <span className="text-sm text-muted-foreground self-center">T = {Tperiod.toFixed(2)} s</span>
        </div>
        <GuidePanel title="Pendulum guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Simple pendulum — theory"
          vocabulary="Restoring force — F = −mg·sinθ (≈ −mgθ for small θ); Simple harmonic motion — a = −ω²x; Period — T = 2π√(L/g)."
          look="The weight mg splits into a tangential part mg·sinθ that restores motion and a radial part balanced by tension T."
          predict="Lengthen L or drop g and the period grows as √(L/g) — but keep θ₀ small or the motion stops being simple-harmonic."
          principle={<span className="block font-mono text-[11px] text-foreground">ω = √(g/L),&nbsp; T = 2π/ω, θ(t) = θ₀cos(ωt)</span>}
          why="Grandfather clocks, seismometers and the experiment used to measure g itself ride on this swing cycle."
        />
      </CardContent>
    </Card>
  );
}

/* ================================================================
   EXPERIMENT 2 · PROJECTILE MOTION (v₀, θ, vx, vy, g, H, R, T)
   ================================================================ */

function Projectile3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [v0, setV0] = useState(16);
  const [angle, setAngle] = useState(45);
  const [g, setG] = useState(9.8);
  const [running, setRunning] = useState(true);

  const a = (angle * Math.PI) / 180;
  const vx = v0 * Math.cos(a);
  const vy0 = v0 * Math.sin(a);
  const Tf = (2 * vy0) / g;
  const R = (v0 * v0 * Math.sin(2 * a)) / g;
  const H = (vy0 * vy0) / (2 * g);
  const SC = 0.32; // scene scale: 1 mWorld => SC units

  const pt = (u: number): [number, number] => {
    const t = u * Tf;
    return [vx * t * SC, (vy0 * t - 0.5 * g * t * t) * SC];
  };

  const defs: LabelDef[] = [
    { x: 0.2, y: 0.6, z: 0, symbol: "v₀", name: "Launch speed", desc: "Initial velocity magnitude along θ; its square powers both range and height.", color: "#fbbf24" },
    { x: 0.9, y: 0.35, z: 0, symbol: "θ", name: "Launch angle", desc: "Angle with the horizontal — 45° gives maximum range for fixed v₀.", color: "#fb923c" },
    { x: 0, y: 0, z: 0, symbol: "vₓ = v₀cosθ", name: "Horizontal component", desc: "Constant for the whole flight (no horizontal force).", color: "#38bdf8" },
    { x: 4.5, y: 0, z: 0, symbol: "v_y = v₀sinθ − gt", name: "Vertical component", desc: "Falls linearly with time under gravity; zero at the apex.", color: "#22d3ee" },
    { x: 3.4, y: 4.6, z: 0, symbol: "g", name: "Acceleration downward", desc: "g ≈ 9.8 m/s² acts throughout; it also sets H and Tflight.", color: "#ef4444" },
    { x: 2.4, y: 4.9, z: 0, symbol: "H = v₀²sin²θ/2g", name: "Max height", desc: "Apex reached when vertical speed hits zero.", color: "#a78bfa" },
    { x: 5.6, y: -0.7, z: 0, symbol: "R = v₀²sin2θ/g", name: "Range", desc: "Horizontal distance back to launch level.", color: "#22c55e" },
    { x: 8.4, y: -0.7, z: 0, symbol: "T = 2v₀sinθ/g", name: "Time of flight", desc: "Seconds from launch to landing.", color: "#94a3b8" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    let ball: THREE.Mesh | null = null;
    const NPOINTS = 90;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 5.5, 14), autoRotate: false, background: 0x0b1220, grid: true });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Projectile Motion", new THREE.Vector3(5, 6.6, 0));

        const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 9), standardMaterial(0x1e293b, { roughness: 0.9 }));
        ground.rotation.x = -Math.PI / 2;
        ground.position.set(6, 0, 0);
        ts.group.add(ground);

        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= NPOINTS; i++) { const p = pt(i / NPOINTS); pts.push(new THREE.Vector3(p[0], Math.max(p[1], 0), 0)); }
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x7dd3fc })));

        ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 20), standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.5 }));
        ts.group.add(ball);

        const mkArrow = (o: THREE.Vector3, d: THREE.Vector3, len: number, col: number) =>
          ts!.group.add(new THREE.ArrowHelper(d.clone().normalize(), o, len, col, 0.32, 0.18));
        mkArrow(new THREE.Vector3(0, 0.4, 0), new THREE.Vector3(v0 * Math.cos(a), vy0, 0), 1.1, 0xfbbf24); // v₀
        mkArrow(new THREE.Vector3(2.2, 2.6, 0), new THREE.Vector3(1, 0, 0), 1.0, 0x38bdf8);              // vₓ
        mkArrow(new THREE.Vector3(2.4, 2.4, 0), new THREE.Vector3(0, 1, 0), 1.0, 0x22d3ee);              // v_y
        mkArrow(new THREE.Vector3(3.2, 4.6, 0), new THREE.Vector3(0, -1, 0), 1.0, 0xef4444);             // g

        const apex = pts[Math.floor(NPOINTS / 2)];
        const dH = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(apex.x, 0, 0), apex.clone()]),
          new THREE.LineDashedMaterial({ color: 0xa78bfa, dashSize: 0.2, gapSize: 0.14 })
        );
        dH.computeLineDistances(); ts.group.add(dH);
        const landX = pts[pts.length - 1].x;
        const dR = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.02, 0.3), new THREE.Vector3(landX, -0.02, 0.3)]),
          new THREE.LineDashedMaterial({ color: 0x22c55e, dashSize: 0.2, gapSize: 0.14 })
        );
        dR.computeLineDistances(); ts.group.add(dR);

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const p = running ? (t * 0.4) % 1 : 0;
          const pp = pt(Math.min(p, 1));
          if (ball) ball.position.set(pp[0], Math.max(pp[1], 0), 0);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("projectile", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, v0, angle, g, running]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🎯 Projectile Motion — symbols at their exact places</CardTitle>
        <CardDescription>v₀, θ, vₓ, v_y, g, H, R and T are labelled exactly where they belong; the ball sweeps the full parabola.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="arrows = velocity components · dashed lines mark H and R" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Speed v₀ ({v0} m/s)</Label><Slider min={6} max={30} step={1} value={[v0]} onValueChange={(v) => setV0(v[0])} /></div>
          <div><Label>Angle θ ({angle}°)</Label><Slider min={15} max={75} step={1} value={[angle]} onValueChange={(v) => setAngle(v[0])} /></div>
          <div><Label>Gravity g ({g.toFixed(1)} m/s²)</Label><Slider min={1.6} max={24} step={0.1} value={[g]} onValueChange={(v) => setG(v[0])} /></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={running ? "default" : "outline"} onClick={() => setRunning(!running)}>{running ? "Pause" : "Run"}</Button>
          <Button size="sm" variant="outline" onClick={() => setAngle(45)}>θ = 45° (max R)</Button>
          <span className="text-sm text-muted-foreground self-center">R = {R.toFixed(1)} m · H = {H.toFixed(1)} m · T = {Tf.toFixed(1)} s</span>
        </div>
        <GuidePanel title="Projectile guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Projectile motion — theory"
          vocabulary="Independent axes — horizontal (uniform) and vertical (uniformly accelerated); Range R; Max height H; Time of flight T."
          look="vₓ is invariant (no horizontal force); v_y starts +v₀sinθ, passes 0 at the apex, then aims down — while g stays constant."
          predict="Range peaks at θ = 45° for fixed v₀; doubling v₀ quadruples both R and H because each scales as v₀²."
          principle={<span className="block font-mono text-[11px] text-foreground">R = v₀²sin2θ/g · H = v₀²sin²θ/2g · T = 2v₀sinθ/g</span>}
          why="Ballistics, athletics, safety-drop analysis and the outfielder's throw all optimise these same three outputs from the two inputs v₀ and θ."
        />
      </CardContent>
    </Card>
  );
}

/* ================================================================
   EXPERIMENT 3 · INCLINED PLANE (mg, mg·sinθ, mg·cosθ, N, f, θ)
   ================================================================ */

function Incline3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [deg, setDeg] = useState(25);
  const [mu, setMu] = useState(0.3);
  const [m, setM] = useState(4);

  const th = (deg * Math.PI) / 180;
  const W = m * 9.8;
  const Wpar = W * Math.sin(th);
  const Wperp = W * Math.cos(th);
  const N = Wperp;
  const slides = Math.tan(th) > mu;
  const f = slides ? mu * N : Wpar;
  const acc = slides ? 9.8 * (Math.sin(th) - mu * Math.cos(th)) : 0;
  const rise = 6.4 * Math.tan(th);

  const uSlope = new THREE.Vector3(Math.cos(th), Math.sin(th), 0);   // up-slope
  const nOut = new THREE.Vector3(-Math.sin(th), Math.cos(th), 0);    // out of surface
  const C = new THREE.Vector3(-0.3 * Math.sin(th), rise / 2 + 0.3 * Math.cos(th), 0);

  const defs: LabelDef[] = [
    { x: C.x, y: C.y - 1.95, z: 0, symbol: "mg", name: "Weight", desc: "m·g = " + W.toFixed(1) + " N, always straight down from the block's centre.", color: "#ef4444" },
    { x: C.x - Math.cos(th) * 1.95, y: C.y - Math.sin(th) * 1.95, z: 0, symbol: "mg·sinθ", name: "Along-slope component", desc: " = " + Wpar.toFixed(1) + " N pulls the block DOWN the slope.", color: "#f97316" },
    { x: C.x + Math.sin(th) * 1.55, y: C.y - Math.cos(th) * 1.55, z: 0, symbol: "mg·cosθ", name: "Into-slope component", desc: " = " + Wperp.toFixed(1) + " N presses the block INTO the surface.", color: "#a78bfa" },
    { x: C.x - Math.sin(th) * 1.9, y: C.y + Math.cos(th) * 1.9, z: 0, symbol: "N", name: "Normal force", desc: "Surface pushes back ⊥ to contact: N = mg·cosθ = " + N.toFixed(1) + " N.", color: "#38bdf8" },
    { x: C.x + Math.cos(th) * 1.45, y: C.y + Math.sin(th) * 1.45, z: 0, symbol: "f", name: "Friction", desc: (slides ? "Kinetic μ·N = " : "Static ≤ μ·N = ") + f.toFixed(1) + " N, opposing motion up-slope.", color: "#facc15" },
    { x: -3.9, y: 0.35, z: 0, symbol: "θ", name: "Incline angle", desc: "Set at the base corner = " + deg + "°; controls how mg splits.", color: "#fb923c" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 3.4, 11), autoRotate: false, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Block on an Incline — Force Decomposition", new THREE.Vector3(0, 6.3, 0));

        /* wedge: right triangle extruded */
        const shape = new THREE.Shape();
        shape.moveTo(-3.2, 0); shape.lineTo(3.2, 0); shape.lineTo(3.2, rise); shape.closePath();
        const wedge = new THREE.Mesh(
          new THREE.ExtrudeGeometry(shape, { depth: 2.2, bevelEnabled: false }),
          standardMaterial(0x7c4a21, { roughness: 0.85 })
        );
        wedge.position.z = -1.1;
        ts.group.add(wedge);

        /* block sitting on the slope */
        const block = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.9), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.3 }));
        block.position.copy(C);
        block.rotation.z = th;
        ts.group.add(block);

        /* force arrows */
        const mk = (dir: THREE.Vector3, len: number, col: number) =>
          ts!.group.add(new THREE.ArrowHelper(dir.clone().normalize(), C, len, col, 0.3, 0.17));
        mk(new THREE.Vector3(0, -1, 0), 1.55, 0xef4444);            // mg
        mk(downhill(), 1.5, 0xf97316);                              // mg·sinθ
        mk(new THREE.Vector3(Math.sin(th), -Math.cos(th), 0), 1.35, 0xa78bfa); // mg·cosθ
        mk(nOut, 1.5, 0x38bdf8);                                    // N
        mk(uSlope, 1.1, 0xfacc15);                                  // f

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("incline", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, deg, mu, m]);

  function downhill() {
    return new THREE.Vector3(-Math.cos(th), -Math.sin(th), 0);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>⛰️ Inclined Plane — force decomposition at exact places</CardTitle>
        <CardDescription>mg splits into mg·sinθ (along slope) and mg·cosθ (into slope); N answers perpendicular and friction f opposes motion — every arrow labelled where it acts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="arrows = the five forces · change θ and watch the split shift" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Incline angle θ ({deg}°)</Label><Slider min={10} max={45} step={1} value={[deg]} onValueChange={(v) => setDeg(v[0])} /></div>
          <div><Label>Friction coefficient μ ({mu.toFixed(2)})</Label><Slider min={0} max={0.9} step={0.05} value={[mu]} onValueChange={(v) => setMu(v[0])} /></div>
          <div><Label>Mass m ({m} kg)</Label><Slider min={1} max={10} step={0.5} value={[m]} onValueChange={(v) => setM(v[0])} /></div>
        </div>
        <span className={`text-sm font-medium ${slides ? "text-red-500" : "text-emerald-600"}`}>
          {slides ? `Block SLIDES — a = g(sinθ − μcosθ) = ${acc.toFixed(2)} m/s²` : `Block stays PUT — static friction holds (tanθ ≤ μ)`}
        </span>
        <GuidePanel title="Incline guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Inclined plane — theory"
          vocabulary="Component decomposition — resolving mg along ⊥ directions to the surface; Normal reaction N; Angle of repose — tanθ = μ."
          look="Rotate θ and the orange along-slope arrow stretches while the violet into-slope arrow shrinks — their vector sum always rebuilds mg."
          predict="Slides exactly when tanθ > μ (θ > angle of repose); below it, static friction cancels mg·sinθ and a = 0."
          principle={<span className="block font-mono text-[11px] text-foreground">mg·sinθ (along) + mg·cosθ (⊥) · N = mg·cosθ · a = g(sinθ − μcosθ) when sliding</span>}
          why="Ramps, road grades, conveyor belts and Wedge physics all start from this split; the angle of repose explains sand piles and landslides."
        />
      </CardContent>
    </Card>
  );
}

export default function MechanicsSymbols() {
  return (
    <Tabs defaultValue="pendulum" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="pendulum">Pendulum</TabsTrigger>
        <TabsTrigger value="projectile">Projectile</TabsTrigger>
        <TabsTrigger value="incline">Inclined Plane</TabsTrigger>
      </TabsList>
      <TabsContent value="pendulum" className="mt-4"><Pendulum3D /></TabsContent>
      <TabsContent value="projectile" className="mt-4"><Projectile3D /></TabsContent>
      <TabsContent value="incline" className="mt-4"><Incline3D /></TabsContent>
    </Tabs>
  );
}