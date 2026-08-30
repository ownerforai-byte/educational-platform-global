"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  type ThreeScene,
} from "@/components/lab/three-scene";
import { cn } from "@/lib/utils";

function SimCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

// helper: floating text label
function titleText(ts: ThreeScene, text: string, pos: THREE.Vector3) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.font = "bold 42px sans-serif";
  ctx.fillStyle = "#7dd3fc";
  ctx.textAlign = "center";
  ctx.fillText(text, 256, 58);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  sprite.scale.set(6, 1.2, 1);
  sprite.position.copy(pos);
  ts.group.add(sprite);
}

function disposeThreeObject(o: THREE.Object3D) {
  o.traverse((obj) => {
    const anyObj = obj as any;
    if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
    if (anyObj.line?.geometry) anyObj.line.geometry.dispose();
    if (anyObj.cone?.geometry) anyObj.cone.geometry.dispose();
    const m = (obj as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
    if (m) {
      if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
      else m.dispose();
    }
  });
}
function disposeGroup(group: THREE.Group) {
  while (group.children.length > 0) {
    const child = group.children[0];
    group.remove(child);
    disposeThreeObject(child);
  }
}

// ---------------------------------------------------------------------------
// 1. Electromagnetism - magnetic field around a straight current wire
// ---------------------------------------------------------------------------
function MagneticField3D() {
  const [current, setCurrent] = useState("2");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    const flowParticles: THREE.Mesh[] = [];

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(1, 5, 11), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);
        const I = parseFloat(current) || 0;

        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 14, 24), new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8, roughness: 0.2 }));
        ts.group.add(wire);
        const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 14, 24), new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.25 }));
        ts.group.add(glow);

        const radii = [1.4, 2.2, 3.0];
        for (let hi = 0; hi < 5; hi++) {
          const y = hi * 1.6 - 3.2;
          for (let ri = 0; ri < radii.length; ri++) {
            const r = radii[ri];
            const seg = 120;
            const pos: number[] = [];
            for (let i = 0; i <= seg; i++) {
              const a = (i / seg) * Math.PI * 2;
              pos.push(Math.cos(a) * r, y, Math.sin(a) * r);
            }
            const g = new THREE.BufferGeometry();
            g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
            const t = Math.max(0.15, 0.6 - r * 0.12 + I * 0.06);
            ts.group.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: Math.min(1, t) })));
            const a0 = Math.PI / 2;
            const cone = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.32, 10), new THREE.MeshBasicMaterial({ color: 0x22d3ee }));
            cone.position.set(Math.cos(a0) * r, y, Math.sin(a0) * r);
            ts.group.add(cone);
          }
        }
        for (let i = 0; i < 8; i++) {
          const p = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.9 }));
          flowParticles.push(p);
          ts.group.add(p);
        }
        titleText(ts, "B ∝ I / r — right-hand rule", new THREE.Vector3(0, 5.6, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const time = performance.now() / 1000;
          flowParticles.forEach((p, i) => {
            const phase = (time * (0.8 + I * 0.4) + i * 0.27) % 14;
            p.position.set(0.4 * Math.sin(i * 2.1 + time), phase - 7, 0.4 * Math.cos(time));
          });
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
  }, [current]);

  return (
    <SimCard title="⚡ Electromagnetism — Magnetic Field Around a Wire">
      <CollapsibleControls label="Current">
        <div className="space-y-1">
          <Label htmlFor="current">Current I (A)</Label>
          <Input id="current" type="number" step="0.5" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D magnetic field" />
      <p className="text-xs text-muted-foreground">
        Direction via the <b>right-hand rule</b> — thumb along current, fingers curl in field direction. Field strength B falls off as 1/r.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 2. Wave optics - diffraction grating & 3D interference pattern
// ---------------------------------------------------------------------------
function WaveOptics3D() {
  const [slits, setSlits] = useState("2");
  const [wavelength, setWavelength] = useState("550");
  const containerRef = useRef<HTMLDivElement>(null);
  const wavePoints = useRef<Array<{ mesh: THREE.Mesh; base: number }>>([]);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    wavePoints.current = [];

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(10, 8, 14), autoRotate: true, autoRotateSpeed: 0.4, axes: true });
        unbind = bindResize(ts);
        const n = Math.max(1, parseInt(slits) || 2);
        const lam = Math.max(120, parseFloat(wavelength) || 550) / 550;

        // Screen with interference pattern (vertex colored plane)
        const screenW = 12, screenH = 7;
        const res = 60;
        const rows = 36;
        const positions: number[] = [];
        const colors: number[] = [];
        const planePos = 5;
        for (let i = 0; i <= res; i++) {
          for (let j = 0; j <= rows; j++) {
            const x = -screenW / 2 + (i / res) * screenW;
            const y = -screenH / 2 + (j / rows) * screenH;
            positions.push(x, y, planePos);
          }
        }
        for (let i = 0; i <= rows; i++) {
          for (let j = 0; j <= res; j++) {
            const y = -screenH / 2 + (i / rows) * screenH;
            const x = -screenW / 2 + (j / res) * screenW;
            const d = 2.2;
            const beta = (Math.PI * d * x) / (lam * 6);
            const s = Math.sin(x * 0.5) / (x * 0.5 + 0.0001);
            const phase = Math.sin(beta) / (beta + 0.0001);
            const inten = Math.pow(Math.abs(phase * phase * Math.abs(s)), 0.8) * (n > 1 ? 0.9 : 1);
            const c = Math.min(1, inten);
            colors.push(c * 0.35, c, c);
          }
        }
        const idxArr: number[] = [];
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < res; j++) {
            const a = i * (res + 1) + j;
            const b = a + res + 1;
            idxArr.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        const geo2 = new THREE.BufferGeometry();
        geo2.setIndex(idxArr);
        geo2.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geo2.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geo2.computeVertexNormals();
        ts.group.add(new THREE.Mesh(geo2, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })));
        // Grating barrier plane with slit apertures at z = 0
        const barrier = new THREE.Mesh(new THREE.PlaneGeometry(12, 7), new THREE.MeshStandardMaterial({ color: 0x475569, transparent: true, opacity: 0.35, side: THREE.DoubleSide }));
        barrier.position.set(0, 0, 0);
        ts.group.add(barrier);
        const slitCount = Math.max(1, parseInt(slits) || 2);
        for (let s = 0; s < slitCount; s++) {
          const sx = -1.5 + s * (3 / Math.max(1, slitCount - 1));
          const slitBox = new THREE.Mesh(new THREE.BoxGeometry(0.28, 7, 0.05), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.9 }));
          slitBox.position.set(sx, 0, 0.03);
          ts.group.add(slitBox);
        }
        for (let i = -3; i <= 3; i++) {
          const arrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-6.5, i * 0.9, 0), 1.4, 0x38bdf8, 0.4, 0.25);
          ts.group.add(arrow);
        }
        titleText(ts, "Diffraction interference pattern", new THREE.Vector3(0, 4.2, 2));

        // expanding secondary wavefronts from each slit
        for (let s = 0; s < slitCount; s++) {
          const sx = -1.5 + s * (3 / Math.max(1, slitCount - 1));
          for (let k = 0; k < 5; k++) {
            const sph = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.55 }));
            sph.position.set(sx, k * 1.2 - 2.4, 0.4);
            wavePoints.current.push({ mesh: sph, base: k });
            ts.group.add(sph);
          }
        }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const time = performance.now() / 1000;
          wavePoints.current.forEach((w) => {
            const scale = 0.4 + ((time * 0.6 + w.base * 0.25) % 1) * 1.6;
            w.mesh.scale.setScalar(scale);
            (w.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 - scale * 0.22);
          });
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
  }, [slits, wavelength]);

  return (
    <SimCard title="🌊 Wave Optics — Diffraction & Interference in 3D">
      <CollapsibleControls label="Grating settings">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="slits">Number of slits</Label>
            <Select value={slits} onValueChange={setSlits}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Single slit</SelectItem>
                <SelectItem value="2">Double slit</SelectItem>
                <SelectItem value="3">Triple slit</SelectItem>
                <SelectItem value="5">Grating (5)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="wavelength">Wavelength λ (nm)</Label>
            <Input id="wavelength" type="number" step="10" value={wavelength} onChange={(e) => setWavelength(e.target.value)} />
          </div>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D diffraction" />
      <p className="text-xs text-muted-foreground">
        Constructive interference gives bright fringes where d·sin θ = mλ. More slits sharpen the principal maxima making a diffraction grating.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 3. Relativity - spacetime curvature around a large mass
// ---------------------------------------------------------------------------
function SpacetimeCurvature() {
  const [mass, setMass] = useState("5");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(9, 9, 13), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);
        const M = Math.max(0.1, parseFloat(mass) || 5);

        // spacetime fabric grid (height = -M / r² near center)
        const res = 72;
        const half = 6;
        const step = (half * 2) / res;
        const positions: number[] = [];
        const colors: number[] = [];
        for (let i = 0; i <= res; i++) {
          for (let j = 0; j <= res; j++) {
            const x = -half + i * step;
            const z = -half + j * step;
            const r2 = x * x + z * z;
            const sink = -M / (r2 + 0.25);
            positions.push(x, sink, z);
            const depth = M / (r2 + 0.25) / (M + 2);
            colors.push(0.22 + depth * 0.6, 0.55 + depth * 0.3, 0.9 - depth * 0.3);
          }
        }
        const idxArr: number[] = [];
        for (let i = 0; i < res; i++) {
          for (let j = 0; j < res; j++) {
            const a = i * (res + 1) + j;
            const b = a + res + 1;
            idxArr.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setIndex(idxArr);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        ts.group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, wireframe: false, side: THREE.DoubleSide, roughness: 0.6 })));

        // central mass
        const star = new THREE.Mesh(new THREE.SphereGeometry(Math.min(0.7, M * 0.18), 32, 32), new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.6 }));
        star.position.set(0, -M * 1.1, 0);
        ts.group.add(star);
        const halo = new THREE.Mesh(new THREE.SphereGeometry(Math.min(1, M * 0.25), 32, 32), new THREE.MeshBasicMaterial({ color: 0xfdba74, transparent: true, opacity: 0.2 }));
        halo.position.copy(star.position);
        ts.group.add(halo);

        // orbiting light (geodesic)
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        ts.group.add(orb);
        titleText(ts, "General relativity — mass bends spacetime", new THREE.Vector3(0, 2.5, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const a = t * 0.8;
          const r = 2.6;
          // geodesic offset slightly deeper as it passes
          const depth = M / (r * r + 0.25);
          orb.position.set(Math.cos(a) * r, -depth * 0.7, Math.sin(a) * r);
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
  }, [mass]);

  return (
    <SimCard title="🕳️ Relativity — Spacetime Curvature">
      <CollapsibleControls label="Mass">
        <div className="space-y-1">
          <Label htmlFor="mass">Mass of object (arbitrary units)</Label>
          <Input id="mass" type="number" step="0.5" value={mass} onChange={(e) => setMass(e.target.value)} />
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D spacetime" />
      <p className="text-xs text-muted-foreground">
        Massive objects warp the spacetime fabric. A heavier mass creates a deeper well; orbiting bodies follow geodesics (the shortest curved paths).
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 4. Quantum mechanics - hydrogen orbital probability clouds
// ---------------------------------------------------------------------------
function QuantumOrbitals() {
  const [orbital, setOrbital] = useState<"1s" | "2s" | "2pz" | "3dz2">("1s");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(6, 5, 9), autoRotate: true, autoRotateSpeed: 0.7 });
        unbind = bindResize(ts);

        const N = 1800;
        const positions: number[] = [];
        const colors: number[] = [];
        for (let i = 0; i < N; i++) {
          // sample a point in a bounding box
          const x = (Math.random() * 2 - 1) * 5;
          const y = (Math.random() * 2 - 1) * 5;
          const z = (Math.random() * 2 - 1) * 5;
          const r = Math.sqrt(x * x + y * y + z * z);
          let dens = 0;
          if (orbital === "1s") dens = Math.exp(-2 * r);
          else if (orbital === "2s") dens = Math.pow(2 - r, 2) * Math.exp(-r);
          else if (orbital === "2pz") dens = r * r * Math.exp(-r) * Math.abs(z) / (r + 0.0001) * Math.abs(z / (r + 0.0001));
          else dens = (r * r) * Math.exp(-r * 0.7) * Math.pow((3 * z * z - r * r) / (r * r + 0.0001), 2);
          dens = Math.max(0, dens);
          if (Math.random() < dens) {
            positions.push(x, y, z);
            const hue = z / 5;
            if (orbital === "2pz" && z < 0) colors.push(0.2, 0.5, 1); else if (orbital === "2pz") colors.push(1, 0.4, 0.2);
            else if (orbital === "3dz2") colors.push(0.5, 0.9 + hue * 0.3, 0.6);
            else colors.push(0.27 + (r / 5) * 0.5, 0.6, 0.95);
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const n = positions.length / 3;
        const colArr: number[] = [];
        for (let i = 0; i < n; i++) colArr.push(0.3, 0.7, 1);
        g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.75 }));
        ts.group.add(pts);

        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        ts.group.add(nucleus);
        titleText(ts, `Hydrogen ${orbital} orbital — |ψ|² cloud`, new THREE.Vector3(0, 3.2, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          pts.rotation.y += 0.004;
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
  }, [orbital]);

  return (
    <SimCard title="⚛️ Quantum Mechanics — Hydrogen Orbital Clouds">
      <CollapsibleControls label="Orbital">
        <div className="space-y-1">
          <Label>Select probe</Label>
          <Select value={orbital} onValueChange={(v) => setOrbital(v as typeof orbital)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1s">1s</SelectItem>
              <SelectItem value="2s">2s (with node)</SelectItem>
              <SelectItem value="2pz">2pz (lobes)</SelectItem>
              <SelectItem value="3dz2">3dz² (dumbbell + ring)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D orbital" />
      <p className="text-xs text-muted-foreground">
        Each cloud is a Monte-Carlo sampling of the probability density |ψ|². Denser regions are where the electron is more likely to be found (s-orbitals spherical, p-orbitals lobed).
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 5. Nuclear physics - radioactive decay with particle trajectories
// ---------------------------------------------------------------------------
function NuclearDecay() {
  const [decayType, setDecayType] = useState<"alpha" | "beta" | "gamma">("alpha");
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Array<{ mesh: THREE.Mesh; dir: THREE.Vector3; speed: number; life: number; age: number }>>([]);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    particles.current = [];

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(6, 6, 9), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);

        // parent nucleus
        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xb45309, emissiveIntensity: 0.7 }));
        ts.group.add(nucleus);
        for (let i = 0; i < 30; i++) {
          const d = (i / 30) * Math.PI * 2;
          const dn = i * 0.71;
          const pNe = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xef4444 : 0x60a5fa }));
          pNe.position.set(Math.sin(d) * Math.cos(dn) * 0.5, Math.sin(dn) * 0.5, Math.cos(d) * Math.cos(dn) * 0.5);
          ts.group.add(pNe);
        }
        titleText(ts, "Radioactive decay simulation", new THREE.Vector3(0, 2.6, 0));

        // spawn and track emitted particles
        const colors = { alpha: 0xfacc15, beta: 0x22d3ee, gamma: 0xa78bfa };
        for (let i = 0; i < 24; i++) {
          const meshP = new THREE.Mesh(new THREE.SphereGeometry(decayType === "gamma" ? 0.1 : 0.16, 10, 10), new THREE.MeshBasicMaterial({ color: colors[decayType], transparent: true, opacity: 0.9 }));
          const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
          particles.current.push({ mesh: meshP, dir, speed: 0.35 + Math.random() * 0.4, life: 0, age: Math.random() * 6 });
          ts.group.add(meshP);
        }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const dt = 0.016;
          particles.current.forEach((pt) => {
            pt.age += dt;
            pt.life += dt;
            if (pt.life > 5) { pt.life = 0; pt.age = 0; pt.dir.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize(); }
            const fade = Math.max(0, 1 - pt.life / 5);
            pt.mesh.position.copy(pt.dir).multiplyScalar(pt.age * pt.speed * 3);
            (pt.mesh.material as THREE.MeshBasicMaterial).opacity = fade;
            pt.mesh.scale.setScalar(0.6 + fade * 0.5);
          });
          nucleus.rotation.y += 0.01;
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
  }, [decayType]);

  return (
    <SimCard title="☢️ Nuclear Physics — Radioactive Decay">
      <CollapsibleControls label="Decay mode">
        <div className="space-y-1">
          <Label>Radiation type</Label>
          <Select value={decayType} onValueChange={(v) => setDecayType(v as typeof decayType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="alpha">α (helium nucleus)</SelectItem>
              <SelectItem value="beta">β (electron / positron)</SelectItem>
              <SelectItem value="gamma">γ (photon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D nuclear decay" />
      <p className="text-xs text-muted-foreground">
        Nuclei spontaneously emit α, β, or γ particles. Half-life describes how quickly a sample decays — decay is a random, quantum process best described statistically.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 6. Fluid dynamics - 3D flow streamlines around an obstacle
// ---------------------------------------------------------------------------
function FluidFlow() {
  const [obstacle, setObstacle] = useState<"cylinder" | "sphere">("cylinder");
  const containerRef = useRef<HTMLDivElement>(null);
  const seedParticles = useRef<Array<{ mesh: THREE.Mesh; line: THREE.Line; y0: number; x0: number }>>([]);
  const lineGeos = useRef<THREE.BufferGeometry[]>([]);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    seedParticles.current = [];
    lineGeos.current = [];

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(12, 8, 12), autoRotate: true, autoRotateSpeed: 0.35 });
        unbind = bindResize(ts);

        // obstacle
        if (obstacle === "cylinder") {
          const cyl = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 8, 40), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.4 }));
          cyl.rotation.x = Math.PI / 2;
          cyl.position.z = 0;
          ts.group.add(cyl);
        } else {
          const sph = new THREE.Mesh(new THREE.SphereGeometry(1.2, 40, 40), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.4 }));
          sph.position.z = 0;
          ts.group.add(sph);
        }

        // ambient particles upstream
        function streamline(x0: number, y0: number) {
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i < 60; i++) {
            const x = -8 + i * 0.28;
            let y = y0;
            const z = 0;
            const r = Math.hypot(x, y - y0 * 0);
            // deflection around central obstacle (origin)
            const R = Math.hypot(x, y);
            if (R > 0.4) {
              const scale = 1 + 0.16 / R;
              y = y0 * scale;
              // lift near obstacle
              y += Math.exp(-((x * x + y * y) / 1.2)) * Math.sign(y0) * 1.2;
            }
            pts.push(new THREE.Vector3(x, y, z));
          }
          return pts;
        }
        const rows = [-3, -2.4, -1.8, -1.2, -0.6, 0.6, 1.2, 1.8, 2.4, 3];
        for (const y0 of rows) {
          const pts = streamline(-8, y0);
          const g = new THREE.BufferGeometry().setFromPoints(pts);
          lineGeos.current.push(g);
          const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 }));
          seedParticles.current.push({ mesh: new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x22d3ee })), line, y0, x0: -8 });
          ts.group.add(line);
          ts.group.add(seedParticles.current[seedParticles.current.length - 1].mesh);
        }
        titleText(ts, "Laminar flow streamlines", new THREE.Vector3(0, 4.5, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          seedParticles.current.forEach((sp) => {
            const s = (t * 1.4 + sp.x0) % 16 - 8;
            let y = sp.y0;
            const R = Math.hypot(s, y);
            if (R > 0.4) y = sp.y0 * (1 + 0.16 / R) + (Math.exp(-((s * s + y * y) / 1.2))) * Math.sign(sp.y0) * 1.2;
            sp.mesh.position.set(s, y, 0);
          });
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
  }, [obstacle]);

  return (
    <SimCard title="🌬️ Fluid Dynamics — Streamlines & Flow">
      <CollapsibleControls label="Obstacle">
        <div className="space-y-1">
          <Label>Obstacle shape</Label>
          <Select value={obstacle} onValueChange={(v) => setObstacle(v as typeof obstacle)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="cylinder">Cylinder</SelectItem>
              <SelectItem value="sphere">Sphere</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D fluid flow" />
      <p className="text-xs text-muted-foreground">
        Fluid speeds up and streamlines crowd together around an obstacle (continuity / Bernoulli effect), then relax back downstream.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 7. Astrophysics - N-body orbital mechanics with gravitational wells
// ---------------------------------------------------------------------------
function NBodySystem() {
  const [bodies, setBodies] = useState("5");
  const containerRef = useRef<HTMLDivElement>(null);
  const planets = useRef<Array<{ mesh: THREE.Mesh; trail: THREE.Mesh; radius: number; speed: number; phase: number; tilt: number }>>([]);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    planets.current = [];

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(12, 10, 12), autoRotate: true, autoRotateSpeed: 0.4 });
        unbind = bindResize(ts);
        const N = Math.min(8, Math.max(2, parseInt(bodies) || 5));

        // gravitational well surface (bowl) z = -k/|r|
        const res = 60;
        const half = 7;
        const positions: number[] = [];
        const colors: number[] = [];
        for (let i = 0; i <= res; i++) {
          for (let j = 0; j <= res; j++) {
            const x = -half + i * (14 / res);
            const y = -half + j * (14 / res);
            const r = Math.hypot(x, y);
            const z = -4 / (r + 0.6);
            positions.push(x, z, y);
            const d = 4 / (r + 0.6) / 3;
            colors.push(d, 0.3 + d * 0.4, 0.5 + d * 0.3);
          }
        }
        const idxArr: number[] = [];
        for (let i = 0; i < res; i++) {
          for (let j = 0; j < res; j++) {
            const a = i * (res + 1) + j;
            const b = a + res + 1;
            idxArr.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setIndex(idxArr);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        ts.group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, wireframe: true, transparent: true, opacity: 0.55, side: THREE.DoubleSide })));

        // central star
        const star = new THREE.Mesh(new THREE.SphereGeometry(1.1, 40, 40), new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.9 }));
        ts.group.add(star);

        const colorsArr = [0x38bdf8, 0x22c55e, 0xf472b6, 0xa78bfa, 0xf97316, 0x22d3ee, 0xfacc15, 0xfb7185];
        for (let i = 0; i < N; i++) {
          const r = 2.2 + i * 0.8;
          const pl = new THREE.Mesh(new THREE.SphereGeometry(0.26 + Math.random() * 0.15, 20, 20), new THREE.MeshStandardMaterial({ color: colors[i % colors.length], emissive: colors[i % colors.length], emissiveIntensity: 0.25 }));
          // ring
          const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.02, 8, 80), new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.5 }));
          ring.rotation.x = Math.PI / 2;
          ts.group.add(ring);
          planets.current.push({
            mesh: pl,
            trail: ring,
            radius: r,
            speed: 0.35 / Math.sqrt(r) + 0.05,
            phase: Math.random() * Math.PI * 2,
            tilt: (Math.random() - 0.5) * 0.6,
          });
          ts.group.add(pl);
        }
        titleText(ts, "N-body gravity — Kepler orbits", new THREE.Vector3(0, 4.6, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          planets.current.forEach((p) => {
            const a = t * p.speed + p.phase;
            p.mesh.position.set(Math.cos(a) * p.radius, p.tilt, Math.sin(a) * p.radius);
          });
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
  }, [bodies]);

  return (
    <SimCard title="🌌 Astrophysics — N-Body Orbital Mechanics">
      <CollapsibleControls label="System">
        <div className="space-y-1">
          <Label htmlFor="bodies">Number of orbiting bodies</Label>
          <Input id="bodies" type="number" min="2" max="8" value={bodies} onChange={(e) => setBodies(e.target.value)} />
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D orbital system" />
      <p className="text-xs text-muted-foreground">
        Keplers third law: T² ∝ r³. Inner planets orbit faster; the gravitational well deepens toward the star. Trails trace elliptical orbits.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 8. Thermodynamics - 3D PVT surface for an ideal gas
// ---------------------------------------------------------------------------
function PVTSurface() {
  const [nMol, setN] = useState("1");
  const containerRef = useRef<HTMLDivElement>(null);
  const cloud = useRef<THREE.Points | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    cloud.current = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(12, 9, 12), autoRotate: true, autoRotateSpeed: 0.4, axes: true });
        unbind = bindResize(ts);
        const n = Math.max(0.1, parseFloat(nMol) || 1);
        const R = 1; // scaled gas constant

        // axes: X = Temperature (0..10), Z = Volume (1..10), Y = Pressure
        // P = n R T / V
        const res = 60;
        const pos: number[] = [];
        const col: number[] = [];
        for (let i = 0; i <= res; i++) {
          for (let j = 0; j <= res; j++) {
            const T = (i / res) * 10 + 0.1;
            const V = 1 + (j / res) * 9;
            const P = (n * R * T) / V;
            const p = Math.min(10, P);
            pos.push(T, p, V);
            const r = Math.min(1, p / 8);
            col.push(0.3 + r * 0.5, 0.5 + r * 0.4, 1 - r * 0.4);
          }
        }
        const idxArr: number[] = [];
        for (let i = 0; i < res; i++) {
          for (let j = 0; j < res; j++) {
            const a = i * (res + 1) + j;
            const b = a + res + 1;
            idxArr.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setIndex(idxArr);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
        geo.computeVertexNormals();
        ts.group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide })));

        // isotherm rise surface
        titleText(ts, "Ideal gas PVT surface — P = nRT/V", new THREE.Vector3(5, 6.5, 6));

        // floating gas particles to show molecules
        const nP = 400;
        const pPos: number[] = [];
        for (let i = 0; i < nP; i++) {
          pPos.push(1 + Math.random() * 8, Math.random() * 1.6, 1 + Math.random() * 8);
        }
        const pg = new THREE.BufferGeometry();
        pg.setAttribute("position", new THREE.Float32BufferAttribute(pPos, 3));
        const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.06, transparent: true, opacity: 0.4 }));
        cloud.current = pts;
        ts.group.add(pts);

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
  }, [nMol]);

  return (
    <SimCard title="🌡️ Thermodynamics — 3D PVT Surface (Ideal Gas)">
      <CollapsibleControls label="Gas amount">
        <div className="space-y-1">
          <Label htmlFor="n">Amount of gas n (mol)</Label>
          <Input id="n" type="number" step="0.25" min="0.1" value={nMol} onChange={(e) => setN(e.target.value)} />
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D PVT surface" />
      <p className="text-xs text-muted-foreground">
        Pressure rises with T and falls with V. The surface P = nRT/V shows all thermodynamic states of an ideal gas. Increase n to raise the whole surface.
      </p>
    </SimCard>
  );
}
export function Physics3DAdvanced() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">⚙️ Advanced 3D Physics Explorers</h2>
      <p className="text-sm text-muted-foreground">
        Deep-dive 3D visualizations covering electromagnetism, wave optics, relativity, quantum mechanics, nuclear physics, fluid dynamics, astrophysics, and thermodynamics.
      </p>
      <Tabs defaultValue="electromagnetism" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="electromagnetism">Electromagnetism</TabsTrigger>
          <TabsTrigger value="waveoptics">Wave Optics</TabsTrigger>
          <TabsTrigger value="relativity">Relativity</TabsTrigger>
          <TabsTrigger value="quantum">Quantum</TabsTrigger>
          <TabsTrigger value="nuclear">Nuclear</TabsTrigger>
          <TabsTrigger value="fluid">Fluid Dynamics</TabsTrigger>
          <TabsTrigger value="astro">Astrophysics</TabsTrigger>
          <TabsTrigger value="thermo">PVT Surface</TabsTrigger>
        </TabsList>
        <TabsContent value="electromagnetism" className="mt-4"><MagneticField3D /></TabsContent>
        <TabsContent value="waveoptics" className="mt-4"><WaveOptics3D /></TabsContent>
        <TabsContent value="relativity" className="mt-4"><SpacetimeCurvature /></TabsContent>
        <TabsContent value="quantum" className="mt-4"><QuantumOrbitals /></TabsContent>
        <TabsContent value="nuclear" className="mt-4"><NuclearDecay /></TabsContent>
        <TabsContent value="fluid" className="mt-4"><FluidFlow /></TabsContent>
        <TabsContent value="astro" className="mt-4"><NBodySystem /></TabsContent>
        <TabsContent value="thermo" className="mt-4"><PVTSurface /></TabsContent>
      </Tabs>
    </div>
  );
}