"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { SimCard } from "@/components/lab/sim-card";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  titleText,
  type ThreeScene,
} from "@/components/lab/three-scene";

function num(v: string, fallback = 0) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

// ---------------------------------------------------------------------------
// 1. Unit circle → sine & cosine waves in 3D
// ---------------------------------------------------------------------------
function TrigWavesLab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(9, 7, 12), autoRotate: false, grid: false, axes: true });
        unbind = bindResize(ts);

        const R = 2.2;
        // unit circle in the x–z plane at x = -6
        const circlePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 90; i++) {
          const a = (i / 90) * Math.PI * 2;
          circlePts.push(new THREE.Vector3(-6 + Math.cos(a) * R, 0, Math.sin(a) * R));
        }
        const circleCurve = new THREE.CatmullRomCurve3(circlePts);
        ts.group.add(new THREE.Mesh(new THREE.TubeGeometry(circleCurve, 120, 0.05, 8, true), new THREE.MeshStandardMaterial({ color: 0x64748b })));

        // rotating radius arm + point
        const arm = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-6, 0, 0), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: 0xfbbf24 }));
        ts.group.add(arm);
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
        ts.group.add(dot);

        // sine (cyan) and cosine (violet) ribbons sweeping along +x
        const N = 220;
        const sineGeo = new THREE.BufferGeometry();
        const cosGeo = new THREE.BufferGeometry();
        sineGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array((N + 1) * 3), 3));
        cosGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array((N + 1) * 3), 3));
        const sineLine = new THREE.Line(sineGeo, new THREE.LineBasicMaterial({ color: 0x22d3ee }));
        const cosLine = new THREE.Line(cosGeo, new THREE.LineBasicMaterial({ color: 0xa78bfa }));
        ts.group.add(sineLine);
        ts.group.add(cosLine);
        // guide rails
        for (const y of [R, -R]) {
          const rail = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, y, 0), new THREE.Vector3(14, y, 0)]), new THREE.LineBasicMaterial({ color: 0x334155 }));
          ts.group.add(rail);
        }

        titleText(ts, "Unit circle drives sin θ & cos θ waves", new THREE.Vector3(4, 3.4, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const theta = t * 1.2;

          const px = -6 + Math.cos(theta) * R;
          const pz = Math.sin(theta) * R;
          (arm.geometry.attributes.position as THREE.BufferAttribute).setXYZ(1, px, 0, pz);
          (arm.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
          dot.position.set(px, 0, pz);

          // draw trailing waves: wave axis along world x starting after the circle
          const sArr = sineLine.geometry.attributes.position.array as Float32Array;
          const cArr = cosLine.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i <= N; i++) {
            const phase = theta - (N - i) * 0.05;
            const wx = -4 + (i / N) * 18;
            sArr[i * 3] = wx;     sArr[i * 3 + 1] = Math.sin(phase) * R; sArr[i * 3 + 2] = 0;
            cArr[i * 3] = wx;     cArr[i * 3 + 1] = Math.cos(phase) * R; cArr[i * 3 + 2] = 0;
          }
          sineLine.geometry.attributes.position.needsUpdate = true;
          cosLine.geometry.attributes.position.needsUpdate = true;

          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
        }
        animate();
      } catch { /* 3D unavailable */ }
    }
    load();
    return () => {
      cancelled = true;
      unbind?.();
      if (ts) disposeThreeScene(ts);
    };
  }, []);

  return (
    <SimCard title="📐 Trigonometry — Unit Circle to Sine/Cosine Waves">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">As the point sweeps the unit circle, its height traces sin θ and its depth traces cos θ — the waves are just the circle unrolled in time.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 2. Conic sections — slice a cone and watch the curve change
// ---------------------------------------------------------------------------
function ConicSectionsLab() {
  const [tilt, setTilt] = useState("20");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(10, 6, 12), autoRotate: true, autoRotateSpeed: 0.45 });
        unbind = bindResize(ts);

        const H = 8;
        const R = 3;
        // double cone (two cones tip to tip)
        const coneGeo = new THREE.ConeGeometry(R, H, 48, 1, true);
        const coneMat = new THREE.MeshStandardMaterial({ color: 0x334155, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const upper = new THREE.Mesh(coneGeo, coneMat);
        upper.position.y = -H / 2 + H / 2; // apex at y=0? ConeGeometry is centered
        // place two cones: one up, one down, tips touching at origin
        upper.position.set(0, H / 2, 0);
        ts.group.add(upper);
        const lower = new THREE.Mesh(coneGeo, coneMat);
        lower.rotation.x = Math.PI;
        lower.position.set(0, -H / 2, 0);
        ts.group.add(lower);

        // slicing plane — tilt controls the conic type
        const tiltRad = (Math.min(88, Math.max(0, num(tilt, 20))) * Math.PI) / 180;
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.3, side: THREE.DoubleSide }));
        plane.position.y = 0.5;
        plane.rotation.x = -Math.PI / 2 + tiltRad * 0.55;
        ts.group.add(plane);

        // intersection ellipse preview on the plane (approximate)
        const kind =
          tiltRad < Math.PI / 12 ? "Circle" : tiltRad < Math.PI / 5 ? "Ellipse" : tiltRad < Math.PI / 2.4 ? "Parabola" : "Hyperbola";
        titleText(ts, `Tilt ${num(tilt).toFixed(0)}° → ${kind}`, new THREE.Vector3(0, 6.4, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
        }
        animate();
      } catch { /* 3D unavailable */ }
    }
    load();
    return () => {
      cancelled = true;
      unbind?.();
      if (ts) disposeThreeScene(ts);
    };
  }, [tilt]);

  return (
    <SimCard title="🔻 Analytic Geometry — Conic Sections">
      <CollapsibleControls label="Slice">
        <div className="space-y-1"><Label>Plane tilt (degrees) — horizontal = circle, steeper = parabola/hyperbola</Label><Input type="number" min="0" max="88" value={tilt} onChange={(e) => setTilt(e.target.value)} /></div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">All four conics come from one double cone: slice flat for a circle, slightly tilted for an ellipse, parallel to the side for a parabola, steeper still for a hyperbola.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 3. Statistics — 3D histogram with normal curve overlay
// ---------------------------------------------------------------------------
function StatisticsLab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(0, 9, 13), autoRotate: true, autoRotateSpeed: 0.45 });
        unbind = bindResize(ts);

        const bins = [2, 4, 7, 10, 12, 9, 6, 4, 3];
        const maxV = Math.max(...bins);

        for (let i = 0; i < bins.length; i++) {
          const h = (bins[i] / maxV) * 3.6;
          const hue = new THREE.Color().setHSL(0.55 - (i / bins.length) * 0.35, 0.8, 0.55);
          const bar = new THREE.Mesh(new THREE.BoxGeometry(1, h, 1), new THREE.MeshStandardMaterial({ color: hue.getHex(), emissive: hue.getHex(), emissiveIntensity: 0.15 }));
          bar.position.set((i - (bins.length - 1) / 2) * 1.35, h / 2, 0);
          ts.group.add(bar);
        }

        // normal curve overlay
        const curvePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 80; i++) {
          const x = -((bins.length - 1) / 2) + (i / 80) * (bins.length - 1) * 1.35;
          const z = Math.exp(-Math.pow((x / ((bins.length - 1) * 1.35)) * 3.2, 2)) * 3.9;
          curvePts.push(new THREE.Vector3(x, z, 0));
        }
        const nCurve = new THREE.CatmullRomCurve3(curvePts);
        ts.group.add(new THREE.Mesh(new THREE.TubeGeometry(nCurve, 100, 0.07, 8, false), new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.4 })));

        titleText(ts, "Marks distribution — gold line = normal fit", new THREE.Vector3(0, 5, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
        }
        animate();
      } catch { /* 3D unavailable */ }
    }
    load();
    return () => {
      cancelled = true;
      unbind?.();
      if (ts) disposeThreeScene(ts);
    };
  }, []);

  return (
    <SimCard title="📊 Statistics — Histogram & Normal Curve">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Real exam-mark data clusters near the middle: mean, median and mode all sit in the tallest bin of a symmetric distribution.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 4. Sequences & series — AP vs GP tower growth
// ---------------------------------------------------------------------------
function SequenceTowersLab() {
  const [seriesType, setSeriesType] = useState<"ap" | "gp">("gp");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(11, 8, 12), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);
        const N = 12;
        const a = 1;
        const d = 1.1;
        const r = 1.42;

        for (let i = 0; i < N; i++) {
          const term = seriesType === "ap" ? a + i * d : a * Math.pow(r, i);
          const h = Math.min(6, term);
          const col = new THREE.Color().setHSL(0.62 - Math.min(0.55, h / 11), 0.85, 0.55);
          const bar = new THREE.Mesh(new THREE.BoxGeometry(0.9, h, 0.9), new THREE.MeshStandardMaterial({ color: col.getHex(), emissive: col.getHex(), emissiveIntensity: 0.2 }));
          bar.position.set((i - (N - 1) / 2) * 1.25, h / 2, 0);
          ts.group.add(bar);
        }

        titleText(
          ts,
          seriesType === "ap"
            ? "AP: terms grow by +d → linear"
            : "GP: terms multiply ×r → explosive growth",
          new THREE.Vector3(0, 6.6, 0)
        );

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
        }
        animate();
      } catch { /* 3D unavailable */ }
    }
    load();
    return () => {
      cancelled = true;
      unbind?.();
      if (ts) disposeThreeScene(ts);
    };
  }, [seriesType]);

  return (
    <SimCard title="📈 Sequences & Series — AP vs GP Growth">
      <CollapsibleControls label="Series">
        <div className="space-y-1">
          <Label>Series type</Label>
          <Select value={seriesType} onValueChange={(v) => setSeriesType(v as typeof seriesType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ap">Arithmetic (AP)</SelectItem>
              <SelectItem value="gp">Geometric (GP)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">An AP climbs like a ramp; a GP explodes like a rocket — which is why exponential models dominate population and compound-interest problems.</p>
    </SimCard>
  );
}

export function Class11Math3DPlus() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">📐 Class 11 Mathematics — Extended 3D Suite</h2>
      <p className="text-sm text-muted-foreground">See trigonometry, conics, statistics and series come alive in three dimensions.</p>
      <Tabs defaultValue="trig" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="trig">Trig Waves</TabsTrigger>
          <TabsTrigger value="conic">Conic Sections</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="series">Sequences</TabsTrigger>
        </TabsList>
        <TabsContent value="trig" className="mt-4"><TrigWavesLab /></TabsContent>
        <TabsContent value="conic" className="mt-4"><ConicSectionsLab /></TabsContent>
        <TabsContent value="stats" className="mt-4"><StatisticsLab /></TabsContent>
        <TabsContent value="series" className="mt-4"><SequenceTowersLab /></TabsContent>
      </Tabs>
    </div>
  );
}