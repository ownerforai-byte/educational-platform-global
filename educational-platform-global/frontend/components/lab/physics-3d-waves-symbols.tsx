"use client";

/**
 * SYMBOLS AT THEIR EXACT PLACE — Physics · Waves.
 * A travelling transverse wave renders λ, A, v, T, crest and trough inside
 * the 3D scene at their exact positions, with live numbers below the canvas.
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
import { createThreeScene, bindResize, disposeThreeScene, standardMaterial, titleText } from "@/components/lab/three-scene";
import { createLabelSystem, LabelDef, SceneArea, GuidePanel } from "@/components/lab/label3d";

function TransverseWave3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [A, setA] = useState(1.0);      // amplitude (units)
  const [lambda, setLambda] = useState(4); // wavelength (units)
  const [speed, setSpeed] = useState(1.4); // wave speed (units/frame)
  const [running, setRunning] = useState(true);

  const k = (2 * Math.PI) / lambda;
  const f = speed / lambda;
  const period = 1 / f;
  const S = 8; // scene half-length

  const defs: LabelDef[] = [
    { x: 0, y: A + 0.6, z: 0, symbol: "A", name: "Amplitude", desc: "Max displacement from equilibrium; energy reaches with A².", color: "#22d3ee" },
    { x: 3, y: A + 0.6, z: 0, symbol: "Crest", name: "Crest", desc: "Highest point of the wave at x = λ(k·x = 2π).", color: "#fbbf24" },
    { x: 1, y: -A - 0.7, z: 0, symbol: "Trough", name: "Trough", desc: "Lowest point — 180° out of phase with the crest.", color: "#a78bfa" },
    { x: -S + 1.5, y: -0.3, z: 0, symbol: "y(x,t)", name: "Displacement", desc: "Wave value at position x and time t.", color: "#38bdf8" },
    { x: 0, y: -A - 0.1, z: 0, symbol: "λ", name: "Wavelength", desc: "Spatial period between equivalent points (two crests).", color: "#ef4444" },
    { x: S - 1.6, y: 1.1, z: 0, symbol: "v = f·λ", name: "Wave speed", desc: "How fast the pattern glides; distance/time.", color: "#fb923c" },
    { x: -S + 1.4, y: 1.1, z: 0, symbol: "f = v/λ", name: "Frequency", desc: "Cycles per second; T = 1/f.", color: "#22c55e" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    let dot: THREE.Mesh | null = null;
    const NPTS = 220;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 4.6, 12), autoRotate: false, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Travelling Transverse Wave", new THREE.Vector3(0, 4.0, 0));

        const eq = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-S, 0, 0), new THREE.Vector3(S, 0, 0)]),
          new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.3, gapSize: 0.2 })
        );
        eq.computeLineDistances();
        ts.group.add(eq);

        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= NPTS; i++) { const x = -S + (2 * S * i) / NPTS; pts.push(new THREE.Vector3(x, 0, 0)); }
        const lineMat = new THREE.LineBasicMaterial({ color: 0x22d3ee });
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat);
        ts.group.add(line);

        dot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.8 }));
        ts.group.add(dot);

        /* λ marker: a bracket spanning one full wave starting at x=0 */
        const lam = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -A - 0.6, 0), new THREE.Vector3(lambda > 0 ? lambda : 1, -A - 0.6, 0)]),
          new THREE.LineBasicMaterial({ color: 0xef4444 })
        );
        ts.group.add(lam);

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const phase = running ? t * speed : 0;
          const pos = line.geometry.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i <= NPTS; i++) {
            const x = pos.getX(i);
            pos.setY(i, A * Math.sin(k * x - phase));
          }
          pos.needsUpdate = true;
          const dx = (t * speed) % (2 * S);
          const dotX = (dx);
          if (dot) dot.position.set(Math.min(dotX, S), A * Math.sin(k * dotX - phase), 0);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("wave", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, A, lambda, speed, running]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🌊 Travelling Transverse Wave — symbols at their exact places</CardTitle>
        <CardDescription>A, crest, trough, λ, v and f are labelled in the scene; the wave glides and you can tune amplitude, wavelength and speed live.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="dashed line = equilibrium · yellow dot = a particle riding the wave" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Amplitude A ({A.toFixed(1)})</Label><Slider min={0.3} max={2.2} step={0.1} value={[A]} onValueChange={(v) => setA(v[0])} /></div>
          <div><Label>Wavelength λ ({lambda.toFixed(1)})</Label><Slider min={2} max={8} step={0.2} value={[lambda]} onValueChange={(v) => setLambda(v[0])} /></div>
          <div><Label>Wave speed v ({speed.toFixed(2)})</Label><Slider min={0.4} max={3} step={0.05} value={[speed]} onValueChange={(v) => setSpeed(v[0])} /></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={running ? "default" : "outline"} onClick={() => setRunning(!running)}>{running ? "Pause" : "Run"}</Button>
          <span className="text-sm text-muted-foreground self-center">f = {(f).toFixed(2)} Hz · T = {period.toFixed(2)} s</span>
        </div>
        <GuidePanel title="Wave guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Travelling wave — theory"
          vocabulary="Amplitude A; Wavelength λ; Wave speed v = f·λ; Phase kx − ωt."
          look="The crest labelled at x = λ is one whole wavelength ahead of the origin point — the red λ bar measures exactly that spacing."
          predict="Lengthen λ and the wave stretches; raise v (same λ) and frequency f rises proportionally — the product f·λ stays the speed you set."
          principle={<span className="block font-mono text-[11px] text-foreground">y(x,t) = A·sin(kx − ωt),&nbsp; ω = 2πf, k = 2π/λ, v = f·λ = ω/k</span>}
          why="Sound, light, ripples and seismic signals all obey this one travelling form; tuning any two of f, λ, v fixes the third."
        />
      </CardContent>
    </Card>
  );
}

/* ================================================================
   EXPERIMENT 2 · YOUNG'S DOUBLE SLIT (S₁, S₂, d, D, λ, Δy = λD/d)
   ================================================================ */

function DoubleSlit3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [lambdaNm, setLambdaNm] = useState(550);
  const [dMm, setDMm] = useState(0.5);
  const [Dm, setDm] = useState(2);

  const lamU = (lambdaNm / 500) * 1.1;
  const dU = dMm * 3.2;
  const DU = Dm * 2.0;
  const dyU = (lamU * DU) / dU;
  const dyMm = (lambdaNm * Dm) / dMm / 1000;
  const maxR = DU * 0.9;

  const defs: LabelDef[] = [
    { x: -5.4, y: 0.7, z: 0, symbol: "λ", name: "Wavelength", desc: lambdaNm + " nm coherent light from a single source.", color: "#fbbf24" },
    { x: 0, y: dU / 2 + 0.5, z: 0, symbol: "S₁", name: "Slit 1 (top)", desc: "Both slits act as coherent in-phase sources.", color: "#38bdf8" },
    { x: 0, y: -dU / 2 - 0.5, z: 0, symbol: "S₂", name: "Slit 2 (bottom)", desc: "Same frequency & phase as S₁ — stable fringes.", color: "#38bdf8" },
    { x: 0.9, y: 0, z: 0, symbol: "d", name: "Slit separation", desc: "Centre-to-centre = " + dMm.toFixed(2) + " mm.", color: "#ef4444" },
    { x: DU / 2, y: -3.8, z: 0, symbol: "D", name: "Slit-to-screen", desc: "= " + Dm.toFixed(1) + " m along the axis (D ≫ d).", color: "#22c55e" },
    { x: DU + 0.15, y: dyU / 2, z: 0, symbol: "Δy = λD/d", name: "Fringe spacing", desc: "= " + dyMm.toFixed(2) + " mm between bright lines.", color: "#a78bfa" },
    { x: -4.2, y: 3.3, z: 0, symbol: "Δ = mλ", name: "Path condition", desc: "d·sinθ = mλ ⇒ bright; (m + ½)λ ⇒ dark.", color: "#fb923c" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    const families: { rings: { mesh: THREE.Line; mat: THREE.LineBasicMaterial }[]; cy: number }[] = [];

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(-2, 0.5, 12.5), autoRotate: false, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Young's Double Slit Interference", new THREE.Vector3(-1.5, 4.4, 0));

        const src = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 14), standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.9 }));
        src.position.set(-5.4, 0, 0);
        ts.group.add(src);

        const barMat = standardMaterial(0x64748b, { metalness: 0.4 });
        const bar = (y0: number, y1: number) => {
          const h = y1 - y0;
          if (h <= 0.02) return;
          const m = new THREE.Mesh(new THREE.BoxGeometry(0.09, h, 0.12), barMat);
          m.position.set(0, (y0 + y1) / 2, 0);
          ts!.group.add(m);
        };
        bar(3.4, dU / 2 + 0.1);
        bar(dU / 2 - 0.1, -dU / 2 + 0.1);
        bar(-dU / 2 - 0.1, -3.4);

        ts.group.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(DU, -3.4, 0), new THREE.Vector3(DU, 3.4, 0)]),
          new THREE.LineBasicMaterial({ color: 0xe2e8f0 })
        ));
        for (let mI = -4; mI <= 4; mI++) {
          const y = mI * dyU;
          if (Math.abs(y) > 3.2) continue;
          const dot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.9 }));
          dot.position.set(DU + 0.05, y, 0);
          ts.group.add(dot);
        }
        const axis = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5.4, 0, 0), new THREE.Vector3(DU, 0, 0)]),
          new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.25, gapSize: 0.18 })
        );
        axis.computeLineDistances();
        ts.group.add(axis);

        const unit = Array.from({ length: 65 }, (_, i) => {
          const aa = (i / 64) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(aa), Math.sin(aa), 0);
        });
        [dU / 2, -dU / 2].forEach((cy) => {
          const g = new THREE.Group();
          const rings: { mesh: THREE.Line; mat: THREE.LineBasicMaterial }[] = [];
          for (let i = 0; i < 6; i++) {
            const mat = new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.5 });
            const mesh = new THREE.Line(new THREE.BufferGeometry().setFromPoints(unit), mat);
            g.add(mesh);
            rings.push({ mesh, mat });
          }
          g.position.set(0, cy, 0);
          ts!.group.add(g);
          families.push({ rings, cy });
        });

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          families.forEach((fam) => {
            fam.rings.forEach((r, i) => {
              const rad = (t * 1.5 + i * lamU) % maxR;
              r.mesh.scale.set(Math.max(rad, 0.02), Math.max(rad, 0.02), 1);
              r.mat.opacity = 0.55 * (1 - rad / maxR);
            });
          });
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("dslit", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, lambdaNm, dMm, Dm]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🔦 Young&apos;s Double Slit — Δy = λD/d at exact places</CardTitle>
        <CardDescription>S₁, S₂, d, D, λ and the fringe spacing Δy labelled where they belong; wavefront rings expand from both slits, green dots mark bright fringes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="expanding rings = wavefronts · green dots = bright fringes on the screen" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Wavelength λ ({lambdaNm} nm)</Label><Slider min={400} max={700} step={10} value={[lambdaNm]} onValueChange={(v) => setLambdaNm(v[0])} /></div>
          <div><Label>Slit separation d ({dMm.toFixed(2)} mm)</Label><Slider min={0.2} max={1} step={0.05} value={[dMm]} onValueChange={(v) => setDMm(v[0])} /></div>
          <div><Label>Distance D ({Dm.toFixed(1)} m)</Label><Slider min={1} max={3} step={0.1} value={[Dm]} onValueChange={(v) => setDm(v[0])} /></div>
        </div>
        <span className="text-sm text-muted-foreground">Fringe spacing Δy = λD/d = {dyMm.toFixed(2)} mm · halve d ⇒ double Δy.</span>
        <GuidePanel title="Double-slit guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Double-slit interference — theory"
          vocabulary="Coherent sources — same λ and phase; Path difference Δ = d·sinθ; Fringe spacing Δy = λD/d."
          look="Where a crest from S₁ meets a crest from S₂ the screen glows bright (green dots); crest-meets-trough is dark — the rings show exactly which paths interfere."
          predict="Increase λ (redder light) and fringes spread; widen d and they squeeze; move the screen back and everything magnifies linearly."
          principle={<span className="block font-mono text-[11px] text-foreground">bright: Δ = mλ · dark: Δ = (m + ½)λ · Δy = λD/d</span>}
          why="This experiment proved light is a wave; the same maths governs diffraction gratings, radio arrays and electron interference."
        />
      </CardContent>
    </Card>
  );
}

export default function WavesSymbols() {
  return (
    <Tabs defaultValue="transverse" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="transverse">Transverse Wave</TabsTrigger>
        <TabsTrigger value="dslit">Double Slit</TabsTrigger>
      </TabsList>
      <TabsContent value="transverse" className="mt-4"><TransverseWave3D /></TabsContent>
      <TabsContent value="dslit" className="mt-4"><DoubleSlit3D /></TabsContent>
    </Tabs>
  );
}