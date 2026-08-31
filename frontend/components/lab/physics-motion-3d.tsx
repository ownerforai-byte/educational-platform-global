"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ============================================================
   Electromagnetic Wave Propagation — 3D
   ============================================================ */

function EMWave3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frequency, setFrequency] = useState(1.0);
  const [amplitude, setAmplitude] = useState(1.5);
  const [wavelength, setWavelength] = useState(4.0);
  const [showE, setShowE] = useState(true);
  const [showB, setShowB] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let eLine: THREE.Line | null = null;
    let bLine: THREE.Line | null = null;
    let ePoints: THREE.Vector3[] = [];
    let bPoints: THREE.Vector3[] = [];
    let cancelled = false;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.Fog(0x0f172a, 30, 60);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(8, 6, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(10, 15, 10);
      scene.add(dir);

      // Grid
      const grid = new THREE.GridHelper(30, 30, 0x334155, 0x1e293b);
      scene.add(grid);

      // Axes labels
      if (showAxes) {
        const makeLabel = (text: string, pos: THREE.Vector3, color: number) => {
          const canvas = document.createElement("canvas");
          canvas.width = 128; canvas.height = 64;
          const ctx = canvas.getContext("2d")!;
          ctx.font = "bold 40px sans-serif";
          ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, 64, 32);
          const tex = new THREE.CanvasTexture(canvas);
          const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
          sprite.position.copy(pos);
          sprite.scale.set(1.5, 0.75, 1);
          scene.add(sprite);
        };
        makeLabel("x (propagation)", new THREE.Vector3(14, 0, 0), 0x94a3b8);
        makeLabel("E (electric)", new THREE.Vector3(0, 5, 0), 0xef4444);
        makeLabel("B (magnetic)", new THREE.Vector3(0, 0, 5), 0x3b82f6);
      }

      // Propagation axis
      const axisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-15, 0, 0),
        new THREE.Vector3(15, 0, 0),
      ]);
      scene.add(new THREE.Line(axisGeo, new THREE.LineBasicMaterial({ color: 0x475569 })));

      // E-field plane (vertical, x-z)
      const ePlaneGeo = new THREE.PlaneGeometry(30, 0.02);
      const ePlaneMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.05, side: THREE.DoubleSide });
      const ePlane = new THREE.Mesh(ePlaneGeo, ePlaneMat);
      ePlane.position.set(0, 0, 0);
      ePlane.rotation.y = 0;
      scene.add(ePlane);

      // B-field plane (horizontal, x-y)
      const bPlaneGeo = new THREE.PlaneGeometry(30, 0.02);
      const bPlaneMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.05, side: THREE.DoubleSide });
      const bPlane = new THREE.Mesh(bPlaneGeo, bPlaneMat);
      bPlane.position.set(0, 0, 0);
      bPlane.rotation.x = -Math.PI / 2;
      scene.add(bPlane);

      function rebuildLines() {
        if (eLine) { scene.remove(eLine); eLine.geometry.dispose(); (eLine.material as THREE.Material).dispose(); eLine = null; }
        if (bLine) { scene.remove(bLine); bLine.geometry.dispose(); (bLine.material as THREE.Material).dispose(); bLine = null; }
        ePoints = [];
        bPoints = [];
        const segs = 300;
        for (let i = 0; i <= segs; i++) {
          const x = -15 + (i / segs) * 30;
          const k = (2 * Math.PI) / wavelength;
          const t = timeRef.current;
          const eVal = amplitude * Math.sin(k * x - 2 * Math.PI * frequency * t);
          const bVal = amplitude * Math.sin(k * x - 2 * Math.PI * frequency * t);
          ePoints.push(new THREE.Vector3(x, eVal, 0));
          bPoints.push(new THREE.Vector3(x, 0, bVal));
        }
        const eGeo = new THREE.BufferGeometry().setFromPoints(ePoints);
        eLine = new THREE.Line(eGeo, new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }));
        scene.add(eLine);
        const bGeo = new THREE.BufferGeometry().setFromPoints(bPoints);
        bLine = new THREE.Line(bGeo, new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 }));
        scene.add(bLine);
      }
      rebuildLines();

      function animate() {
        if (cancelled) return;
        frameRef.current = requestAnimationFrame(animate);
        timeRef.current += 0.016 * speed;
        if (eLine) {
          const pos = eLine.geometry.attributes.position;
          for (let i = 0; i <= 300; i++) {
            const x = -15 + (i / 300) * 30;
            const k = (2 * Math.PI) / wavelength;
            const val = amplitude * Math.sin(k * x - 2 * Math.PI * frequency * timeRef.current);
            pos.setY(i, val);
          }
          pos.needsUpdate = true;
        }
        if (bLine) {
          const pos = bLine.geometry.attributes.position;
          for (let i = 0; i <= 300; i++) {
            const x = -15 + (i / 300) * 30;
            const k = (2 * Math.PI) / wavelength;
            const val = amplitude * Math.sin(k * x - 2 * Math.PI * frequency * timeRef.current);
            pos.setZ(i, val);
          }
          pos.needsUpdate = true;
        }
        ePlane.position.y = 0;
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      const handleResize = () => {
        if (!container || cancelled) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelled = true;
        cancelAnimationFrame(frameRef.current);
        if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        renderer.dispose();
        controls.dispose?.();
      };
    };
    const cleanup = init();
    return () => { cleanup.then((fn) => fn?.()); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude, wavelength, showE, showB, showAxes]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Electromagnetic Wave Propagation</span>
          <span className="text-xs text-muted-foreground font-normal">Red = E field (vertical) • Blue = B field (horizontal) • Perpendicular to each other and propagation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Wave Parameters">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Amplitude (E₀)</Label>
              <Input type="number" step="0.1" min="0.1" max="5" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Wavelength λ (m)</Label>
              <Input type="number" step="0.1" min="0.5" max="10" value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Frequency f (Hz)</Label>
              <Input type="number" step="0.1" min="0.1" max="5" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Speed</Label>
              <Input type="number" step="0.1" min="0.1" max="3" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Button variant={showE ? "default" : "outline"} size="sm" onClick={() => setShowE(!showE)}>E Field (Red)</Button>
            <Button variant={showB ? "default" : "outline"} size="sm" onClick={() => setShowB(!showB)}>B Field (Blue)</Button>
            <Button variant={showAxes ? "default" : "outline"} size="sm" onClick={() => setShowAxes(!showAxes)}>Labels</Button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border h-80 sm:h-96 md:h-[500px] lg:h-[600px]" />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Wave Speed</p>
            <p className="text-sm font-semibold">v = fλ = {(frequency * wavelength).toFixed(2)} m/s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angular Frequency</p>
            <p className="text-sm font-semibold">ω = 2πf = {(2 * Math.PI * frequency).toFixed(2)} rad/s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Wave Number</p>
            <p className="text-sm font-semibold">k = 2π/λ = {(2 * Math.PI / wavelength).toFixed(2)} rad/m</p>
          </div>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 EM Wave Theory & Key Properties</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">The wave equation:</span> E(x,t) = E₀·sin(kx − ωt) · ĵ &nbsp;|&nbsp; B(x,t) = B₀·sin(kx − ωt) · k̂</p>
            <p><span className="font-semibold text-foreground">Key property:</span> E and B are perpendicular to each other AND to the direction of propagation (transverse wave).</p>
            <p><span className="font-semibold text-foreground">Speed of light:</span> E₀/B₀ = c = 3×10⁸ m/s in vacuum. Energy density: u = ½ε₀E² + ½B²/μ₀.</p>
            <p><span className="font-semibold text-foreground">Why it matters:</span> All light, radio, X-rays are EM waves. Maxwell's equations unified electricity, magnetism, and optics.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Magnetic Field Lines — Bar Magnet 3D
   ============================================================ */

function MagneticFieldLines3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(true);
  const [fieldDensity, setFieldDensity] = useState(16);
  const [dipoleMoment, setDipoleMoment] = useState(1);
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let cancelled = false;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.Fog(0x0f172a, 25, 50);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(6, 4, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(8, 12, 8);
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0x6366f1, 0.4);
      fill.position.set(-5, -3, -5);
      scene.add(fill);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Bar magnet
      const magnetGroup = new THREE.Group();
      const northGeo = new THREE.BoxGeometry(1.5, 0.6, 0.6);
      const northMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, metalness: 0.5 });
      const southGeo = new THREE.BoxGeometry(1.5, 0.6, 0.6);
      const southMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.5 });
      const north = new THREE.Mesh(northGeo, northMat);
      north.position.set(0.75, 0, 0);
      const south = new THREE.Mesh(southGeo, southMat);
      south.position.set(-0.75, 0, 0);
      magnetGroup.add(north, south);
      scene.add(magnetGroup);

      // Labels
      const makeLabel = (text: string, pos: THREE.Vector3, color: number) => {
        const canvas = document.createElement("canvas");
        canvas.width = 128; canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.font = "bold 44px sans-serif";
        ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(text, 64, 32);
        const tex = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
        sprite.position.copy(pos);
        sprite.scale.set(1.2, 0.6, 1);
        scene.add(sprite);
      };
      makeLabel("N", new THREE.Vector3(2.2, 0.5, 0), 0xef4444);
      makeLabel("S", new THREE.Vector3(-2.2, 0.5, 0), 0x3b82f6);

      // Field lines
      const lineGroup = new THREE.Group();
      scene.add(lineGroup);

      // Better dipole field line tracing in x-y plane
      function traceFieldLine(startAngle: number, mVal: number): THREE.Vector3[] {
        const pts: THREE.Vector3[] = [];
        let x = 0.5 * Math.cos(startAngle);
        let z = 0.5 * Math.sin(startAngle);
        const y = 0;
        const dt = 0.03;
        for (let i = 0; i < 500; i++) {
          const r2 = x * x + z * z;
          const r = Math.sqrt(r2);
          if (r < 0.3 || r > 15) break;
          // Dipole field in x-z plane: B_r = 2m cosθ / r³, B_θ = m sinθ / r³
          const cosT = x / r, sinT = z / r;
          const Br = 2 * mVal * cosT / (r2 * r);
          const Bt = mVal * sinT / (r2 * r);
          const dx = Br * cosT - Bt * sinT;
          const dz = Br * sinT + Bt * cosT;
          x += dx * dt; z += dz * dt;
          pts.push(new THREE.Vector3(x, y, z));
        }
        return pts;
      }

      function rebuildFieldLines() {
        while (lineGroup.children.length > 0) {
          const c = lineGroup.children[0];
          lineGroup.remove(c);
          if (c instanceof THREE.Line) { c.geometry.dispose(); (c.material as THREE.Material).dispose(); }
        }
        const n = fieldDensity;
        for (let i = 0; i < n; i++) {
          const angle = (i / n) * Math.PI * 2;
          const pts = traceFieldLine(angle, dipoleMoment);
          if (pts.length > 3) {
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.45 });
            lineGroup.add(new THREE.Line(geo, mat));
          }
        }
      }
      rebuildFieldLines();

      // Iron filings particles
      let particles: THREE.Points | null = null;
      if (showParticles) {
        const pCount = 3000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 0.5 + Math.random() * 8;
          pPos[i * 3] = dist * Math.cos(angle);
          pPos[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
          pPos[i * 3 + 2] = dist * Math.sin(angle);
        }
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.04, transparent: true, opacity: 0.6 });
        particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);
        particlesRef.current = particles;
      }

      function animate() {
        if (cancelled) return;
        frameRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      const handleResize = () => {
        if (!container || cancelled) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelled = true;
        cancelAnimationFrame(frameRef.current);
        if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        renderer.dispose();
        controls.dispose?.();
      };
    };
    const cleanup = init();
    return () => { cleanup.then((fn) => fn?.()); };
  }, [fieldDensity, dipoleMoment, showParticles]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Magnetic Field Lines — Bar Magnet</span>
          <span className="text-xs text-muted-foreground font-normal">Field lines emerge from N, enter S. Never cross.</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Field Options">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Field Lines: {fieldDensity}</Label>
              <input type="range" min="8" max="40" value={fieldDensity} onChange={(e) => setFieldDensity(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Dipole Strength: {dipoleMoment.toFixed(1)}</Label>
              <input type="range" min="0.1" max="3" step="0.1" value={dipoleMoment} onChange={(e) => setDipoleMoment(Number(e.target.value))} className="w-full" />
            </div>
            <Button variant={showParticles ? "default" : "outline"} size="sm" onClick={() => setShowParticles(!showParticles)}>
              Iron Filings: {showParticles ? "ON" : "OFF"}
            </Button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border h-80 sm:h-96 md:h-[500px] lg:h-[600px]" />

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-red-500" /> North pole</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-sm bg-blue-500" /> South pole</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-cyan-400" /> Field lines (N→S)</span>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Magnetic Field Theory</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Dipole field:</span> B = (μ₀/4π) · (3(m·r̂)r̂ − m)/r³ — field falls off as 1/r³ (faster than gravity/E-field which are 1/r²).</p>
            <p><span className="font-semibold text-foreground">Key rules:</span> Field lines form closed loops (emerge N, enter S). They never cross. Density = field strength. Inside the magnet they go S→N.</p>
            <p><span className="font-semibold text-foreground">Iron filings:</span> Each filament becomes a tiny dipole aligning with the local field, revealing the pattern.</p>
            <p><span className="font-semibold text-foreground">Why it matters:</span> Electromagnets, MRI, electric motors, compass, data storage (hard drives) all rely on magnetic fields.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Export
   ============================================================ */

export function PhysicsMotionLab() {
  return (
    <Tabs defaultValue="em-wave" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="em-wave">EM Wave 3D</TabsTrigger>
        <TabsTrigger value="magnet">Magnetic Field</TabsTrigger>
      </TabsList>
      <TabsContent value="em-wave" className="mt-4">
        <EMWave3D />
      </TabsContent>
      <TabsContent value="magnet" className="mt-4">
        <MagneticFieldLines3D />
      </TabsContent>
    </Tabs>
  );
}
