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
import { cn } from "@/lib/utils";

function makeCanvasText(text: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "bold 46px sans-serif";
  ctx.fillStyle = "#7dd3fc";
  ctx.textAlign = "center";
  ctx.fillText(text, 256, 78);
  return new THREE.CanvasTexture(canvas);
}

function Pane({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</Label>
      {children}
    </div>
  );
}
// ---------------------------------------------------------------------------
// 1. Multivariable calculus - surface + contour projections
// ---------------------------------------------------------------------------
function MultivariableSurface() {
  const [func, setFunc] = useState<"saddle" | "wave">("wave");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(9, 8, 10), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);

        const res = 80;
        const half = 4;
        const positions: number[] = [];
        const colors: number[] = [];
        const heights: number[] = [];
        for (let i = 0; i <= res; i++) {
          for (let j = 0; j <= res; j++) {
            const x = -half + (i / res) * half * 2;
            const y = -half + (j / res) * half * 2;
            let z = 0;
            if (func === "saddle") z = (x * x - y * y) * 0.18;
            else z = Math.sin(x * 1.3) * Math.cos(y * 1.1) * 1.6;
            positions.push(x, z, y);
            heights.push(z);
            colors.push(0.2, 0.4 + (z + 2) / 5, 0.8);
          }
        }
        const geo = new THREE.BufferGeometry();
        const idxArr: number[] = [];
        for (let i = 0; i < res; i++) {
          for (let j = 0; j < res; j++) {
            const a = i * (res + 1) + j;
            const b = a + res + 1;
            idxArr.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        geo.setIndex(idxArr);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        // add tiny wireframe on top
        const wire = new THREE.Mesh(new THREE.BufferGeometry().copy(geo), new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12 }));
        ts.group.add(wire);
        ts.group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide })));

        // contour projection onto the base plane z = -3 (marching-squares style)
        const baseY = -3;
        const contourColors = [0x22d3ee, 0x67e8f9, 0xf0abfc, 0xfde68a, 0x86efac];
        const levels = 5;
        for (let lv = 0; lv < levels; lv++) {
          const target = -1.6 + (lv / levels) * 3.2;
          const segs: number[] = [];
          for (let j = 0; j < res; j++) {
            for (let i = 0; i < res; i++) {
              const x0 = -half + (i / res) * half * 2;
              const y0 = -half + (j / res) * half * 2;
              const x1 = -half + ((i + 1) / res) * half * 2;
              const y1 = -half + ((j + 1) / res) * half * 2;
              const hA = heights[j * (res + 1) + i];
              const hB = heights[j * (res + 1) + i + 1];
              const hC = heights[(j + 1) * (res + 1) + i + 1];
              const hD = heights[(j + 1) * (res + 1) + i];
              function edge(a: number, b: number, px: (t: number) => number, py: (t: number) => number) {
                if ((a < target && target <= b) || (b < target && target <= a)) {
                  const t = (target - a) / (b - a);
                  segs.push(px(t), baseY, py(t));
                }
              }
              edge(hA, hB, (t) => x0 + (x1 - x0) * t, (t) => y0);
              edge(hB, hC, (t) => x1, (t) => y0 + (y1 - y0) * t);
              edge(hC, hD, (t) => x1 + (x0 - x1) * t, (t) => y1);
              edge(hD, hA, (t) => x0, (t) => y1 + (y0 - y1) * t);
            }
          }
          const lg = new THREE.BufferGeometry();
          lg.setAttribute("position", new THREE.Float32BufferAttribute(segs, 3));
          ts.group.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: contourColors[lv % contourColors.length], transparent: true, opacity: 0.85 })));
        }

        const base = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.06, side: THREE.DoubleSide }));
        base.rotation.x = -Math.PI / 2;
        base.position.y = baseY;
        ts.group.add(base);
        titleText(ts, func === "wave" ? "z = sin x · cos y with contours" : "z = x² − y² (saddle) with contours", new THREE.Vector3(0, 3.4, 0));

        const surfMesh = ts.group.children[ts.group.children.length - 2] as THREE.Mesh;
        const wavePhase = { t: 0 };

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          wavePhase.t += 0.015;
          if (func === "wave" && surfMesh && surfMesh.material) {
            const mat = surfMesh.material as THREE.MeshStandardMaterial;
            // Subtle emissive pulse on wave surface
            mat.emissiveIntensity = 0.05 + Math.sin(wavePhase.t * 2) * 0.03;
          }
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
  }, [func]);

  return (
    <SimCard title="🧮 Multivariable Calculus — Surfaces & Contour Maps">
      <CollapsibleControls label="Surface">
        <div className="space-y-1">
          <Label>z = f(x, y)</Label>
          <Select value={func} onValueChange={(v) => setFunc(v as typeof func)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="wave">z = sin(x)·cos(y)</SelectItem>
              <SelectItem value="saddle">Saddle z = x² − y²</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D surface + contours" />
      <p className="text-xs text-muted-foreground">
        Contours are level curves of constant height projected below. The gradient points perpendicular to contours; extrema/saddles occur where both ∂f/∂x and ∂f/∂y = 0.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 2. Vector calculus - divergence / curl field visualizer
// ---------------------------------------------------------------------------
function VectorFieldDivCurl() {
  const [field, setField] = useState<"radial" | "vortex" | "shear" | "sink">("radial");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(8, 8, 10), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);

        // choose field vectors F(x,y,z)
        const vector = (x: number, y: number, z: number): [number, number, number] => {
          if (field === "radial") return [x, y, z * 0.4];
          if (field === "sink") return [-x, -y, 0];
          if (field === "vortex") return [-y, x, 0.2];
          // shear: rotational around z with magnitude ∝ distance
          return [ -y * 1.4, x * 1.4, 0.3 * (x * x + y * y) ];
        };
        const n = 4;
        for (let i = -n; i <= n; i++) {
          for (let j = -n; j <= n; j++) {
            for (let k = -1; k <= 1; k += 2) {
              const px = i * 1.6;
              const py = j * 1.6;
              const pz = k * 1.2;
              const [fx, fy, fz] = vector(px, py, pz);
              const mag = Math.hypot(fx, fy, fz);
              if (mag < 1e-4) continue;
              // divergence ≈ ∇·F and curl perceived via rotation (display color)
              const divSign = fx * Math.sign(px || 1) + fy * Math.sign(py || 1) + fz * Math.sign(pz || 1);
              let color = 0x22d3ee;
              if (divSign > 0.1) color = 0x22c55e;      // divergence (source)
              else if (divSign < -0.1) color = 0xef4444; // convergence (sink)
              const len = Math.min(1.6, mag * 0.28);
              const arrow = new THREE.ArrowHelper(new THREE.Vector3(fx, fy, fz).normalize(), new THREE.Vector3(px, py, pz), len, color, len * 0.3, len * 0.2);
              ts.group.add(arrow);
            }
          }
        }
        const summary = field === "radial" ? "∇·F > 0 — sources (divergent)" : field === "sink" ? "∇·F < 0 — sinks (convergent)" : field === "vortex" ? "∇×F ≠ 0 — the field swirls (curl)" : "shear — ∇×F = rotation";
        titleText(ts, summary, new THREE.Vector3(0, 4.2, 0));

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
  }, [field]);

  return (
    <SimCard title="🌀 Vector Calculus — Divergence & Curl">
      <CollapsibleControls label="Field">
        <div className="space-y-1">
          <Label>F(x,y) field</Label>
          <Select value={field} onValueChange={(v) => setField(v as typeof field)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="radial">Radial (source)</SelectItem>
              <SelectItem value="sink">Radial sink</SelectItem>
              <SelectItem value="vortex">Rotation (curl)</SelectItem>
              <SelectItem value="shear">Shear / rotational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D vector field" />
      <p className="text-xs text-muted-foreground">
        Divergence ∇·F measures outflow (positive = source, negative = sink); curl ∇×F measures rotation. Colored arrows show where the field spreads, converges, or swirls.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 3. Fractals - 3D Mandelbulb with interactive zoom
// ---------------------------------------------------------------------------
function MandelbulbFractal() {
  const [power, setPower] = useState("8");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(5, 4, 6), autoRotate: true, autoRotateSpeed: 0.8, grid: false });
        unbind = bindResize(ts);
        const powN = Math.max(2, Math.min(12, parseInt(power) || 8));

        // Ray-march-like sampling of the Mandelbulb boundary
        const sphere = 1.2;
        const step = 0.05;
        const pos: number[] = [];
        const color: number[] = [];
        let iterations = 0;
        for (let i = -34; i <= 34; i++) {
          for (let j = -34; j <= 34; j++) {
            for (let k = -34; k <= 34; k++) {
              const x = i * step;
              const y = j * step;
              const z = k * step;
              if (x * x + y * y + z * z > sphere * 1.8) continue;
              if (++iterations > 220000) break;
              let zr = x, zi = y, zj = z;
              let dr = 1.0;
              let r = 0.0;
              const bailout = 6;
              for (let it = 0; it < 9; it++) {
                r = Math.sqrt(zr * zr + zi * zi + zj * zj);
                if (r > bailout) break;
                const theta = Math.acos(zj / (r || 1e-9)) * powN;
                const phi = Math.atan2(zi, zr) * powN;
                dr = Math.pow(r, powN - 1) * powN * dr + 1;
                const rp = Math.pow(r, powN);
                const st = Math.sin(theta);
                const nzr = rp * st * Math.cos(phi) + x;
                const nzi = rp * st * Math.sin(phi) + y;
                const nzj = rp * Math.cos(theta) + z;
                zr = nzr; zi = nzi; zj = nzj;
              }
              const dist = 0.5 * Math.log(r) * r / (dr || 1);
              if (dist < 0.35 && r < bailout) {
                pos.push(x, y, z);
                const d = (r / bailout);
                color.push(0.2 + d * 0.6, 0.3 + d * 0.3, 0.9 - d * 0.5);
              }
            }
            if (iterations > 220000) break;
          }
          if (iterations > 220000) break;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        g.setAttribute("color", new THREE.Float32BufferAttribute(color, 3));
        const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.02, vertexColors: true }));
        ts.group.add(pts);
        titleText(ts, `Mandelbulb — power ${powN}`, new THREE.Vector3(0, 2.4, 0));

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
  }, [power]);

  return (
    <SimCard title="🧊 Fractals — 3D Mandelbulb">
      <CollapsibleControls label="Fractal">
        <div className="space-y-1">
          <Label htmlFor="power">Fractal power (n)</Label>
          <Input id="power" type="number" min="2" max="12" value={power} onChange={(e) => setPower(e.target.value)} />
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D Mandelbulb" />
      <p className="text-xs text-muted-foreground">
        The Mandelbulb is the 3D analogue of the Mandelbrot set. Drag to orbit and zoom into its infinitely self-similar surface. Higher powers thicken the fractal structure.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 4. Differential geometry - parametric surfaces
// ---------------------------------------------------------------------------
function ParametricSurface() {
  const [surface, setSurface] = useState<"torus" | "klein" | "mobius">("torus");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(6, 4, 7), autoRotate: true, autoRotateSpeed: 0.6, grid: false });
        unbind = bindResize(ts);

        const fn = (u: number, v: number): [number, number, number] => {
          if (surface === "torus") {
            const R = 2.2, r = 0.9;
            return [(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)];
          }
          if (surface === "klein") {
            const pu = Math.PI * u;
            const x0 = 3 * Math.cos(u) * (1 + Math.sin(u)) + 6 * Math.cos(u) * Math.cos(u) / Math.abs(Math.cos(u / 2) + 0.001) * Math.cos(u) * (Math.cos(u) * (1 + Math.sin(u))) ;
            return kleinParam(u, v);
          }
          // Möbius strip: u in [0,2π], v in [-0.7,0.7]
          const w = v * 0.7;
          return [(1 + w * Math.cos(u / 2)) * Math.cos(u), (1 + w * Math.cos(u / 2)) * Math.sin(u), w * Math.sin(u / 2)];
        };
        const uSteps = 90;
        const vSteps = 40;
        const verts: number[] = [];
        const colors: number[] = [];
        for (let i = 0; i <= uSteps; i++) {
          for (let j = 0; j <= vSteps; j++) {
            const u = (i / uSteps) * Math.PI * 2;
            const v0 = surface === "klein" ? (j / vSteps) * Math.PI * 2 : (j / vSteps) * Math.PI * 2;
            const [x, y, z] = fn(u, v0);
            const s = surface === "torus" ? 1 : 0.85;
            verts.push(x * s, y * s, z * s);
            colors.push(0.2 + Math.sin(u) * 0.15, 0.4 + Math.cos(v0) * 0.2, 0.8 - Math.sin(v0) * 0.2);
          }
        }
        const idx: number[] = [];
        for (let i = 0; i < uSteps; i++) {
          for (let j = 0; j < vSteps; j++) {
            const a = i * (vSteps + 1) + j;
            const b = a + vSteps + 1;
            idx.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setIndex(idx);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        ts.group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.4 })));
        titleText(ts, surfaceLabel(surface), new THREE.Vector3(0, 3.4, 0));

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
  }, [surface]);

  return (
    <SimCard title="🪢 Differential Geometry — Parametric Surfaces">
      <CollapsibleControls label="Surface">
        <div className="space-y-1">
          <Label>Immersed surface</Label>
          <Select value={surface} onValueChange={(v) => setSurface(v as typeof surface)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="torus">Torus</SelectItem>
              <SelectItem value="klein">Klein bottle</SelectItem>
              <SelectItem value="mobius">Möbius strip</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D parametric surface" />
      <p className="text-xs text-muted-foreground">
        A surface is a map r(u,v) from a 2D domain into 3D. A torus is orientable; the Möbius strip and Klein bottle are non-orientable (one-sided) — the basis of classifying surfaces topologically.
      </p>
    </SimCard>
  );
}
function kleinParam(u: number, v: number): [number, number, number] {
  // Standard Klein-bottle immersion (u, v in [0, 2π])
  const scale = 0.5;
  const cu = Math.cos(u), su = Math.sin(u);
  const x = (2.5 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * cu;
  const y = (2.5 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * su;
  const z = Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v);
  return [x * scale, y * scale, z * scale];
}

function surfaceLabel(s: string): string {
  return s === "torus" ? "Torus — T²" : s === "klein" ? "Klein bottle — non-orientable" : "Möbius strip — one-sided";
}
// ---------------------------------------------------------------------------
// 5. Linear algebra - 3D matrix transformations
// ---------------------------------------------------------------------------
function MatrixTransforms() {
  const [rx, setRx] = useState("30");
  const [ry, setRy] = useState("20");
  const [rz, setRz] = useState("10");
  const [sx, setSx] = useState("1.2");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(7, 6, 9), autoRotate: true, autoRotateSpeed: 0.5, axes: true });
        unbind = bindResize(ts);

        // original basis (reference)
        const origin = new THREE.Vector3(0, 0, 0);
        ts.group.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, 2, 0xef4444, 0.4, 0.25));
        ts.group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, 2, 0x22c55e, 0.4, 0.25));
        ts.group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, 2, 0x3b82f6, 0.4, 0.25));
        // unit cube
        const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true, transparent: true, opacity: 0.5 }));
        cube.position.set(0.5, 0.5, 0.5);
        ts.group.add(cube);

        const a = (parseFloat(rx) || 0) * Math.PI / 180;
        const b = (parseFloat(ry) || 0) * Math.PI / 180;
        const c = (parseFloat(rz) || 0) * Math.PI / 180;
        const sc = Math.max(0.1, parseFloat(sx) || 1);
        const Rx = (t: number) => [[1, 0, 0], [0, Math.cos(t), -Math.sin(t)], [0, Math.sin(t), Math.cos(t)]] as number[][];
        const Ry = (t: number) => [[Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)]] as number[][];
        const Rz = (t: number) => [[Math.cos(t), -Math.sin(t), 0], [Math.sin(t), Math.cos(t), 0], [0, 0, 1]] as number[][];
        const matmul = (M: number[][], v: number[]) => [0, 1, 2].map((i) => M[i][0] * v[0] + M[i][1] * v[1] + M[i][2] * v[2]) as number[];

        function mat3(m: number[][], n: number[][]): number[][] {
          const r: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
          for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) r[i][j] += m[i][k] * n[k][j];
          return r;
        }
        let M = Rx(a);
        M = mat3(Ry(b), M);
        M = mat3(Rz(c), M);
        M = mat3([[sc, 0, 0], [0, sc, 0], [0, 0, sc]], M);

        const basis: [THREE.Vector3, number][] = [
          [new THREE.Vector3(1, 0, 0), 0xf87171],
          [new THREE.Vector3(0, 1, 0), 0x4ade80],
          [new THREE.Vector3(0, 0, 1), 0x60a5fa],
        ];
        for (const [v, col] of basis) {
          const tv = matmul(M, [v.x, v.y, v.z]);
          const arrow = new THREE.ArrowHelper(new THREE.Vector3(tv[0], tv[1], tv[2]).normalize(), origin, Math.hypot(tv[0], tv[1], tv[2]), col, 0.4, 0.25);
          ts.group.add(arrow);
        }
        // transformed cube (Wireframe via transformed vertices)
        const corners: number[][] = [];
        for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) corners.push(matmul(M, [x, y, z]));
        const edges: [number, number][] = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
        const pts: number[] = [];
        for (const [e1, e2] of edges) pts.push(...corners[e1], ...corners[e2]);
        const lg = new THREE.BufferGeometry();
        lg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
        ts.group.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
        titleText(ts, "Linear transformation — columns = images of basis", new THREE.Vector3(0, 3.6, 0));

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
  }, [rx, ry, rz, sx]);

  return (
    <SimCard title="🧮 Linear Algebra — 3D Matrix Transformations">
      <CollapsibleControls label="Transformation matrix">
        <div className="grid gap-2 sm:grid-cols-4">
          <div className="space-y-1"><Label>Rotate X°</Label><Input type="number" value={rx} onChange={(e) => setRx(e.target.value)} /></div>
          <div className="space-y-1"><Label>Rotate Y°</Label><Input type="number" value={ry} onChange={(e) => setRy(e.target.value)} /></div>
          <div className="space-y-1"><Label>Rotate Z°</Label><Input type="number" value={rz} onChange={(e) => setRz(e.target.value)} /></div>
          <div className="space-y-1"><Label>Scale</Label><Input type="number" step="0.1" value={sx} onChange={(e) => setSx(e.target.value)} /></div>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D matrix transform" />
      <p className="text-xs text-muted-foreground">
        Red/green/blue bold arrows are what the unit basis vectors map to. The golden box is the transformed unit cube. Rotations keep length; scaling stretches it (det of matrix = volume scale).
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 6. Complex analysis - Riemann surfaces of multi-valued functions
// ---------------------------------------------------------------------------
function RiemannSurface() {
  const [func, setFunc] = useState<"sqrt" | "cuberoot">("sqrt");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(7, 5, 8), autoRotate: true, autoRotateSpeed: 0.6, grid: false });
        unbind = bindResize(ts);

        const sheets = func === "sqrt" ? 2 : 3;
        const rSteps = 40;
        const aSteps = 120;
        const verts: number[] = [];
        const colors: number[] = [];
        const idx: number[] = [];
        for (let s = 0; s < sheets; s++) {
          const offset = (s / sheets) * 2 * Math.PI;
          const base = verts.length / 3;
          for (let i = 0; i <= rSteps; i++) {
            for (let j = 0; j <= aSteps; j++) {
              const r = (i / rSteps) * 2.0;
              const ang = (j / aSteps) * 2 * Math.PI + offset;
              const theta = ang / sheets;
              const rootR = Math.pow(r, 1 / sheets);
              const x = r * Math.cos(ang);
              const y = r * Math.sin(ang);
              const z = rootR * Math.cos(theta);
              verts.push(x, y, z);
              colors.push(0.25 + (z - 1.4) / 2.8, 0.55, 0.8);
            }
          }
          for (let i = 0; i < rSteps; i++) {
            for (let j = 0; j < aSteps; j++) {
              const a = base + i * (aSteps + 1) + j;
              const b = a + aSteps + 1;
              idx.push(a, b, a + 1, b, b + 1, a + 1);
            }
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setIndex(idx);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        ts.group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.45 })));
        titleText(ts, func === "sqrt" ? "Riemann surface of √z (2 sheets)" : "Riemann surface of ∛z (3 sheets)", new THREE.Vector3(0, 3.2, 0));

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
  }, [func]);

  return (
    <SimCard title="♾️ Complex Analysis — Riemann Surfaces">
      <CollapsibleControls label="Function">
        <div className="space-y-1">
          <Label>Multi-valued w</Label>
          <Select value={func} onValueChange={(v) => setFunc(v as typeof func)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sqrt">w = √z</SelectItem>
              <SelectItem value="cuberoot">w = ∛z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D Riemann surface" />
      <p className="text-xs text-muted-foreground">
        Functions like √z are multi-valued; their domain is a many-layered surface. Each sheet is a branch, connected at branch points (origin) — the key to contour integrals and residues.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 7. Game theory - 3D payoff matrix & Nash equilibrium
// ---------------------------------------------------------------------------
function GameTheory3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const token = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    token.current = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(6, 7, 9), autoRotate: true, autoRotateSpeed: 0.5, grid: false });
        unbind = bindResize(ts);

        // Prisoner's dilemma payoff matrix (P1, P2)
        const payoffs = [[[3, 3], [0, 5]], [[5, 0], [1, 1]]];
        const nash = [1, 1]; // (D, D)
        const moves = ["C", "D"];
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            const x = (i - 0.5) * 3;
            const z = (j - 0.5) * 3;
            const [p1, p2] = payoffs[i][j];
            const total = p1 + p2;
            const isNash = i === nash[0] && j === nash[1];
            // stacked bars: P1 height then P2 on top
            const col1 = new THREE.Mesh(new THREE.BoxGeometry(1, p1, 1), new THREE.MeshStandardMaterial({ color: isNash ? 0xfbbf24 : 0x3b82f6 }));
            col1.position.set(x, p1 / 2, z);
            ts.group.add(col1);
            const col2 = new THREE.Mesh(new THREE.BoxGeometry(1, p2, 1), new THREE.MeshStandardMaterial({ color: isNash ? 0xfde68a : 0x22c55e }));
            col2.position.set(x, p1 + p2 / 2, z);
            ts.group.add(col2);
            // base square
            const base = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), new THREE.MeshBasicMaterial({ color: isNash ? 0xfbbf24 : 0x334155, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
            base.rotation.x = -Math.PI / 2;
            base.position.set(x, 0.02, z);
            ts.group.add(base);
            // label sprite
            const lab = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeCanvasText(`${moves[i]} vs ${moves[j]}`), transparent: true }));
            lab.scale.set(1.5, 0.4, 1);
            lab.position.set(x, -0.5, z);
            ts.group.add(lab);
          }
        }
        const tokenMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        ts.group.add(tokenMesh);
        token.current = tokenMesh;
        const nb = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeCanvasText("Nash ● (D,D)"), transparent: true }));
        nb.scale.set(2.4, 0.5, 1);
        nb.position.set(1.2, 3.8, 0);
        ts.group.add(nb);
        titleText(ts, "Prisoner's Dilemma — payoff matrix", new THREE.Vector3(0, 4.6, 0));

        const tokenPhase = { t: 0 };

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          tokenPhase.t += 0.02;
          const t = performance.now() / 1000;
          // token cycles the four strategy outcomes
          const k = Math.floor(t) % 4;
          const i = k % 2, j = Math.floor(k / 2);
          token.current!.position.set((i - 0.5) * 3, 3.4 + Math.sin(tokenPhase.t * 3) * 0.15, (j - 0.5) * 3);
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
    <SimCard title="🎲 Game Theory — Payoff Matrix & Nash Equilibrium">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D game theory" />
      <p className="text-xs text-muted-foreground">
        Stacked bars show payoffs (P1 blue + P2 green). The golden cell (D,D) is the <b>Nash equilibrium</b>: no player can improve alone by switching. Yet (C,C) is socially better — the dilemma.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 8. Topology - Möbius strip & twisted bands (interactive deformation)
// ---------------------------------------------------------------------------
function TopologyTwist() {
  const [twist, setTwist] = useState<"0" | "1" | "2">("1");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(6, 5, 7), autoRotate: true, autoRotateSpeed: 0.6, grid: false });
        unbind = bindResize(ts);

        const halfTurns = parseInt(twist) || 1;
        const R = 2.0;
        const uSteps = 120;
        const vSteps = 10;
        const verts: number[] = [];
        const colors: number[] = [];
        for (let i = 0; i <= uSteps; i++) {
          const u = (i / uSteps) * Math.PI * 2;
          // local frame
          const tx = -Math.sin(u), ty = Math.cos(u), tz = 0;
          const nx = Math.cos(u), ny = Math.sin(u), nz = 0;
          const bx = 0, by = 0, bz = 1;
          const ang = u * halfTurns * 0.5; // half-twist angle over full loop
          const cn = Math.cos(ang), sn = Math.sin(ang);
          for (let j = 0; j <= vSteps; j++) {
            const v = (j / vSteps) * 2 - 1; // -1..1
            // rotate cross-section direction (n,b) by ang around tangent
            const rx = nx * cn + bx * sn;
            const ry = ny * cn + by * sn;
            const rz = nz * cn + bz * sn;
            const sx = nx * (-sn) + bx * cn;
            const sy = ny * (-sn) + by * cn;
            const sz = nz * (-sn) + bz * cn;
            const px = R * nx + v * 0.7 * rx;
            const py = R * ny + v * 0.7 * ry;
            const pz = v * 0.7 * rz;
            verts.push(px, py, pz);
            colors.push(0.25 + v * 0.3 + 0.2, 0.4 + v * 0.2, 0.8 - v * 0.3);
          }
        }
        const idx: number[] = [];
        for (let i = 0; i < uSteps; i++) {
          for (let j = 0; j < vSteps; j++) {
            const a = i * (vSteps + 1) + j;
            const b = a + vSteps + 1;
            idx.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setIndex(idx);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        ts.group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.4 })));

        // show the single edge as a tube
        const edgePts: THREE.Vector3[] = [];
        for (let i = 0; i <= uSteps; i++) {
          const u = (i / uSteps) * Math.PI * 2;
          const ang = u * halfTurns * 0.5;
          const cn = Math.cos(ang), sn = Math.sin(ang);
          const rx = Math.cos(u) * cn + sn;
          const rz = cn;
          const edge = new THREE.Vector3(R * Math.cos(u) + 0.7 * (Math.cos(u) * cn + sn), R * Math.sin(u) + 0.7 * Math.sin(u) * cn, 0.7 * sn);
          edgePts.push(edge);
        }
        if (halfTurns !== 1) {
          const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edgePts), 120, 0.05, 6, false), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
          ts.group.add(tube);
        }
        titleText(ts, halfTurns === 0 ? "Twisted band (0 half-twist) → cylinder" : halfTurns === 1 ? "Möbius strip — one sided (1 half-twist)" : "Full-twist band (2 half-twists)", new THREE.Vector3(0, 2.8, 0));

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
  }, [twist]);

  return (
    <SimCard title="🔄 Topology — Möbius Strip & Interactive Twist">
      <CollapsibleControls label="Twist">
        <div className="space-y-1">
          <Label>Number of half-twists</Label>
          <Select value={twist} onValueChange={(v) => setTwist(v as typeof twist)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0 — cylinder band (2-sided)</SelectItem>
              <SelectItem value="1">1 — Möbius (1-sided)</SelectItem>
              <SelectItem value="2">2 — full twist (2-sided)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D topology" />
      <p className="text-xs text-muted-foreground">
        An odd number of half-twists gives a non-orientable (one-sided) surface; the Möbius strip has a single continuous edge (pink). Cutting it along the midline yields a doubled, twisted band.
      </p>
    </SimCard>
  );
}
export function MathModern3D() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">📈 Advanced 3D Mathematics Explorers</h2>
      <p className="text-sm text-muted-foreground">
        Deep-dive 3D visualizations covering multivariable calculus, vector calculus, fractals, differential geometry, linear algebra, complex analysis, game theory, and topology.
      </p>
      <Tabs defaultValue="multivariate" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="multivariate">Multivariable Calculus</TabsTrigger>
          <TabsTrigger value="vector">Vector Calculus</TabsTrigger>
          <TabsTrigger value="fractal">Fractals</TabsTrigger>
          <TabsTrigger value="geometry">Differential Geometry</TabsTrigger>
          <TabsTrigger value="linear">Linear Algebra</TabsTrigger>
          <TabsTrigger value="complex">Complex Analysis</TabsTrigger>
          <TabsTrigger value="game">Game Theory</TabsTrigger>
          <TabsTrigger value="topology">Topology</TabsTrigger>
        </TabsList>
        <TabsContent value="multivariate" className="mt-4"><MultivariableSurface /></TabsContent>
        <TabsContent value="vector" className="mt-4"><VectorFieldDivCurl /></TabsContent>
        <TabsContent value="fractal" className="mt-4"><MandelbulbFractal /></TabsContent>
        <TabsContent value="geometry" className="mt-4"><ParametricSurface /></TabsContent>
        <TabsContent value="linear" className="mt-4"><MatrixTransforms /></TabsContent>
        <TabsContent value="complex" className="mt-4"><RiemannSurface /></TabsContent>
        <TabsContent value="game" className="mt-4"><GameTheory3D /></TabsContent>
        <TabsContent value="topology" className="mt-4"><TopologyTwist /></TabsContent>
      </Tabs>
    </div>
  );
}