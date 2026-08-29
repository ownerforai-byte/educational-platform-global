"use client";

/**
 * SYMBOLS AT THEIR EXACT PLACE — Mathematics.
 * The unit circle draws θ, r = 1, sinθ, cosθ and tanθ at their exact trig
 * segments, with the angle and values updating live.
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createThreeScene, bindResize, disposeThreeScene, standardMaterial, titleText } from "@/components/lab/three-scene";
import { createLabelSystem, LabelDef, SceneArea, GuidePanel } from "@/components/lab/label3d";

function UnitCircle3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [deg, setDeg] = useState(45);

  const rad = (deg * Math.PI) / 180;
  const c = Math.cos(rad), s = Math.sin(rad), t = Math.tan(rad);

  const defs: LabelDef[] = [
    { x: 0, y: 0.3, z: 0, symbol: "θ", name: "Central angle", desc: "Angle swept from the positive x-axis; shown here at " + deg + "°.", color: "#fb923c" },
    { x: 1.25, y: -0.25, z: 0, symbol: "r = 1", name: "Radius", desc: "Unit circle radius; the hypotenuse sin²+cos² = 1.", color: "#a78bfa" },
    { x: c + 0.02, y: s + 0.4, z: 0, symbol: "P (cosθ, sinθ)", name: "Point on circle", desc: "Coordinates are exactly (cosθ, sinθ).", color: "#38bdf8" },
    { x: c / 2, y: -0.5, z: 0, symbol: "cosθ", name: "Adjacent / horizontal", desc: "Projection onto the x-axis = " + c.toFixed(2) + ".", color: "#22c55e" },
    { x: c + 0.45, y: s / 2, z: 0, symbol: "sinθ", name: "Opposite / vertical", desc: "Projection onto the y-axis = " + s.toFixed(2) + ".", color: "#ef4444" },
    { x: 1.6, y: t / 2, z: 0, symbol: "tanθ", name: "Tangent value", desc: "Opposite over adjacent = sinθ/cosθ = " + (isFinite(t) ? t.toFixed(2) : "∞") + ".", color: "#fbbf24" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    let radiusLine: THREE.Line | null = null;
    let sinSeg: THREE.Line | null = null;
    let cosSeg: THREE.Line | null = null;
    let tanSeg: THREE.Line | null = null;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 0.4, 7), autoRotate: false, background: 0x0b1220, grid: false });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Unit Circle — Trigonometry", new THREE.Vector3(0, 2.6, 0));

        const circle = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(Array.from({ length: 129 }, (_, i) => {
            const a = (i / 128) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a), Math.sin(a), 0);
          })),
          new THREE.LineBasicMaterial({ color: 0x7dd3fc })
        );
        ts.group.add(circle);

        const xa = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.2, 0, 0), new THREE.Vector3(2.2, 0, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 }));
        ts.group.add(xa);
        const ya = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -2.2, 0), new THREE.Vector3(0, 2.2, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 }));
        ts.group.add(ya);

        radiusLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(c, s, 0)]), new THREE.LineBasicMaterial({ color: 0xa78bfa }));
        ts.group.add(radiusLine);
        sinSeg = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(c, 0, 0), new THREE.Vector3(c, s, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 }));
        ts.group.add(sinSeg);
        cosSeg = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(c, 0, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e }));
        ts.group.add(cosSeg);
        if (isFinite(t)) {
          tanSeg = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, t, 0)]), new THREE.LineBasicMaterial({ color: 0xfbbf24 }));
          ts.group.add(tanSeg);
        }

        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.8 }));
        ball.position.set(c, s, 0);
        ts.group.add(ball);

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
      } catch (e) { console.error("unitcircle", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, deg]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>⭕ Unit Circle — symbols at their exact places</CardTitle>
        <CardDescription>θ, r = 1, sinθ, cosθ and tanθ sit exactly on the segment they represent; slide the angle to watch them live.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="red = sinθ · green = cosθ · amber tangent = tanθ" />
        <div className="flex flex-wrap items-center gap-4">
          <div className="max-w-xs flex-1"><Label>Angle ({deg}°)</Label><Slider min={0} max={360} step={1} value={[deg]} onValueChange={(v) => setDeg(v[0])} /></div>
          <Button size="sm" variant="outline" onClick={() => setDeg(90)}>90°</Button>
          <Button size="sm" variant="outline" onClick={() => setDeg(180)}>180°</Button>
        </div>
        <span className="text-sm text-muted-foreground">sin = {s.toFixed(2)} · cos = {c.toFixed(2)} · tan = {(isFinite(t) ? t.toFixed(2) : "∞")}</span>
        <GuidePanel title="Unit circle guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Unit circle — theory"
          vocabulary="Unit circle (radius 1); Opposite/Adjacent on the triangle; tan = sin/cos."
          look="cosθ is the horizontal green leg from the origin to x = cosθ; sinθ the vertical red leg up to the point; the tangent length (blue?) sits where a vertical at x = 1 meets the tangent from the point."
          predict="At 45° sin = cos finishes equal ~0.707 and tan = 1; near 90° sin → 1, cos → 0 and tan explodes off-scale."
          principle={<span className="block font-mono text-[11px] text-foreground">x = r·cosθ, y = r·sinθ · tanθ = sinθ/cosθ · sin²θ + cos²θ = 1</span>}
          why="Every triangle, phasor, rotation and wave amplitude eventually quotes these two projections and their ratio."
        />
      </CardContent>
    </Card>
  );
}

/* ================================================================
   EXPERIMENT 2 · DERIVATIVE AS TANGENT (P, Q, Δx, Δy, dy/dx)
   ================================================================ */

function Tangent3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [a, setA] = useState(1);
  const [h, setH] = useState(1);
  const [fn, setFn] = useState(0); // 0: x², 1: sin

  const f = (x: number) => (fn === 0 ? 0.35 * x * x : 1.4 * Math.sin(x) + 1.8);
  const fp = (x: number) => (fn === 0 ? 0.7 * x : 1.4 * Math.cos(x));
  const fa = f(a), fq = f(a + h);
  const sec = (fq - fa) / h;
  const d = fp(a);

  const defs: LabelDef[] = [
    { x: a - 0.45, y: fa + 0.4, z: 0, symbol: "P", name: "Point on curve", desc: "P = (a, f(a)) = (" + a.toFixed(1) + ", " + fa.toFixed(2) + ").", color: "#38bdf8" },
    { x: a + h + 0.35, y: fq + 0.35, z: 0, symbol: "Q", name: "Second point", desc: "Q = (a+h, f(a+h)) — h = " + h.toFixed(1) + " steps away.", color: "#818cf8" },
    { x: a + h / 2, y: -0.35, z: 0, symbol: "Δx = h", name: "Run", desc: "Horizontal step = " + h.toFixed(1) + ".", color: "#22d3ee" },
    { x: a + h + 0.55, y: (fa + fq) / 2, z: 0, symbol: "Δy", name: "Rise", desc: "f(a+h) − f(a) = " + (fq - fa).toFixed(2) + ".", color: "#ef4444" },
    { x: a + h + 0.55, y: fq + 0.75, z: 0, symbol: "Δy/Δx", name: "Secant slope", desc: "= " + sec.toFixed(2) + " — the average rate over [a, a+h].", color: "#f97316" },
    { x: a - 1.9, y: fa + d * -1.6 + 0.6, z: 0, symbol: "dy/dx", name: "Derivative (tangent)", desc: "f'(a) = " + d.toFixed(2) + " — as h→0 the secant becomes this tangent.", color: "#22c55e" },
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
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 2.6, 10.5), autoRotate: false, background: 0x0b1220, grid: false });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Derivative = Slope of the Tangent", new THREE.Vector3(0, 6.4, 0));

        /* axes */
        const axMat = new THREE.LineBasicMaterial({ color: 0x475569 });
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4.4, 0, 0), new THREE.Vector3(4.4, 0, 0)]), axMat));
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 6, 0)]), axMat));

        /* the curve */
        const curvePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 160; i++) { const x = -4 + (8 * i) / 160; curvePts.push(new THREE.Vector3(x, f(x), 0)); }
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x7dd3fc })));

        /* secant P→Q */
        ts.group.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a, fa, 0), new THREE.Vector3(a + h, fq, 0)]),
          new THREE.LineDashedMaterial({ color: 0xf97316, dashSize: 0.18, gapSize: 0.12 })
        ));
        /* tangent at P */
        ts.group.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(a - 2.2, fa - 2.2 * d, 0),
            new THREE.Vector3(a + 2.2, fa + 2.2 * d, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0x22c55e })
        ));
        /* drop lines + Δx / Δy brackets */
        const drop = (x: number, y: number) => {
          const l = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, y, 0), new THREE.Vector3(x, 0, 0)]),
            new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.12, gapSize: 0.1 })
          );
          l.computeLineDistances(); ts!.group.add(l);
        };
        drop(a, fa); drop(a + h, fq);
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a, -0.15, 0), new THREE.Vector3(a + h, -0.15, 0)]), new THREE.LineBasicMaterial({ color: 0x22d3ee })));
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a + h + 0.12, fa, 0), new THREE.Vector3(a + h + 0.12, fq, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));

        const dotP = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.8 }));
        dotP.position.set(a, fa, 0); ts.group.add(dotP);
        const dotQ = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), standardMaterial(0x818cf8, { emissive: 0x818cf8, emissiveIntensity: 0.8 }));
        dotQ.position.set(a + h, fq, 0); ts.group.add(dotQ);

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((dd) => sys.add(dd));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("tangent", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, a, h, fn]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>📐 Derivative — secant becomes tangent at exact places</CardTitle>
        <CardDescription>P, Q, Δx, Δy and the secant slope sit right on their brackets; shrink h and watch the orange secant swing into the green tangent — that limit IS dy/dx.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="blue curve = f(x) · dashed orange = secant PQ · green = tangent at P" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Point a ({a.toFixed(1)})</Label><Slider min={-3} max={3} step={0.1} value={[a]} onValueChange={(v) => setA(v[0])} /></div>
          <div><Label>Step h ({h.toFixed(1)})</Label><Slider min={0.2} max={2} step={0.1} value={[h]} onValueChange={(v) => setH(v[0])} /></div>
          <div>
            <Label>Function</Label>
            <div className="flex gap-1.5 mt-1">
              <Button size="sm" variant={fn === 0 ? "default" : "outline"} onClick={() => setFn(0)}>f(x) = x²</Button>
              <Button size="sm" variant={fn === 1 ? "default" : "outline"} onClick={() => setFn(1)}>f(x) = sin x</Button>
            </div>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">Secant Δy/Δx = {sec.toFixed(2)} → tangent f&apos;(a) = {d.toFixed(2)} as h → 0</span>
        <GuidePanel title="Derivative guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Derivative — theory"
          vocabulary="Secant — line through two curve points; Tangent — the limiting line as Q slides into P; dy/dx = lim(h→0) Δy/Δx."
          look="The dashed orange secant through P and Q pivots as h changes; shrink h and it locks onto the green tangent whose slope is f'(a)."
          predict="For x², f'(a) = 2a·0.35·... i.e. doubling a doubles the tangent slope; for sin x the slope cycles between ±1.4 as a moves."
          principle={<span className="block font-mono text-[11px] text-foreground">f'(a) = lim(h→0) [f(a+h) − f(a)]/h</span>}
          why="Velocity from position, current from charge, marginal cost from total cost — every 'rate of change' in science is this exact limit."
        />
      </CardContent>
    </Card>
  );
}

export default function MathSymbols() {
  return (
    <Tabs defaultValue="circle" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="circle">Unit Circle</TabsTrigger>
        <TabsTrigger value="tangent">Derivative</TabsTrigger>
      </TabsList>
      <TabsContent value="circle" className="mt-4"><UnitCircle3D /></TabsContent>
      <TabsContent value="tangent" className="mt-4"><Tangent3D /></TabsContent>
    </Tabs>
  );
}