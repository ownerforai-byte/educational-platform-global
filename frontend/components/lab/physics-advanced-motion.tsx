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
   3D Pendulum — Animate in full 3D with trail
   ============================================================ */

function Pendulum3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [length, setLength] = useState(3);
  const [gravity, setGravity] = useState(9.8);
  const [initialAngle, setInitialAngle] = useState(45);
  const [isRunning, setIsRunning] = useState(false);
  const [showTrail, setShowTrail] = useState(true);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const trailRef = useRef<THREE.Line | null>(null);
  const trailPointsRef = useRef<THREE.Vector3[]>([]);
  const bobRef = useRef<THREE.Mesh | null>(null);
  const rodRef = useRef<THREE.Group | null>(null);
  const cancelledRef = useRef(false);

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
      scene.fog = new THREE.Fog(0x0f172a, 15, 30);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(5, 5, 8);

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
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 10, 5);
      dir.castShadow = true;
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0x6366f1, 0.4);
      fill.position.set(-5, 3, -5);
      scene.add(fill);

      // Ground
      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);
      const groundGeo = new THREE.PlaneGeometry(20, 20);
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.01;
      ground.receiveShadow = true;
      scene.add(ground);

      // Pivot
      const pivotGeo = new THREE.SphereGeometry(0.15, 16, 16);
      const pivotMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.2, metalness: 0.8 });
      const pivot = new THREE.Mesh(pivotGeo, pivotMat);
      pivot.position.set(0, length, 0);
      pivot.castShadow = true;
      scene.add(pivot);

      // Rod group
      const rodGroup = new THREE.Group();
      rodGroup.position.set(0, length, 0);
      scene.add(rodGroup);
      rodRef.current = rodGroup;

      const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, length, 8);
      const rodMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3, metalness: 0.6 });
      const rod = new THREE.Mesh(rodGeo, rodMat);
      rod.position.y = -length / 2;
      rod.castShadow = true;
      rodGroup.add(rod);

      // Bob
      const bobGeo = new THREE.SphereGeometry(0.3, 24, 24);
      const bobMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.4, emissive: 0xef4444, emissiveIntensity: 0.2 });
      const bob = new THREE.Mesh(bobGeo, bobMat);
      bob.castShadow = true;
      rodGroup.add(bob);
      bobRef.current = bob;

      // Trail
      let trailLine: THREE.Line | null = null;
      const trailPts: THREE.Vector3[] = [];

      function rebuildTrail() {
        if (trailLine) {
          scene.remove(trailLine);
          trailLine.geometry.dispose();
          (trailLine.material as THREE.Material).dispose();
          trailLine = null;
        }
        trailPts.length = 0;
      }
      rebuildTrail();

      function animate() {
        if (cancelled) return;
        frameRef.current = requestAnimationFrame(animate);

        if (isRunning) {
          const dt = 0.016;
          timeRef.current += dt;
          const omega = Math.sqrt(gravity / length);
          const theta = (initialAngle * Math.PI / 180) * Math.cos(omega * timeRef.current);

          const x = length * Math.sin(theta);
          const y = length - length * Math.cos(theta);
          const z = 0;

          rodGroup.rotation.z = -theta;
          bob.position.set(x, y, z);

          if (showTrail) {
            trailPts.push(new THREE.Vector3(x, y, z));
            if (trailPts.length > 600) trailPts.shift();
            if (trailLine) {
              scene.remove(trailLine);
              trailLine.geometry.dispose();
              (trailLine.material as THREE.Material).dispose();
            }
            const geo = new THREE.BufferGeometry().setFromPoints(trailPts);
            const mat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.7 });
            trailLine = new THREE.Line(geo, mat);
            scene.add(trailLine);
            trailRef.current = trailLine;
          }
        }

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
  }, [length, gravity, initialAngle, isRunning, showTrail]);

  const period = 2 * Math.PI * Math.sqrt(length / gravity);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Pendulum Simulator</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Trail shows path</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Pendulum Parameters">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Length L (m)</Label>
              <Input type="number" step="0.1" min="0.5" max="10" value={length} onChange={(e) => setLength(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Gravity g (m/s²)</Label>
              <Input type="number" step="0.1" min="0.5" max="30" value={gravity} onChange={(e) => setGravity(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Initial Angle (°)</Label>
              <Input type="number" step="1" min="-90" max="90" value={initialAngle} onChange={(e) => setInitialAngle(Number(e.target.value))} />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={() => setIsRunning(!isRunning)} className="flex-1">
                {isRunning ? "⏸ Pause" : "▶ Release"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setIsRunning(false); timeRef.current = 0; }}>
                Reset
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button variant={showTrail ? "default" : "outline"} size="sm" onClick={() => setShowTrail(!showTrail)}>
              Trail: {showTrail ? "ON" : "OFF"}
            </Button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border h-[450px]" />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Period T</p>
            <p className="text-sm font-semibold">T = 2π√(L/g) = {period.toFixed(2)} s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Frequency f</p>
            <p className="text-sm font-semibold">f = 1/T = {(1 / period).toFixed(3)} Hz</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angular Freq ω</p>
            <p className="text-sm font-semibold">ω = √(g/L) = {(Math.sqrt(gravity / length)).toFixed(2)} rad/s</p>
          </div>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Pendulum Theory (Class 11)</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Equation of motion:</span> θ'' + (g/L)θ = 0 for small angles. Solution: θ(t) = θ₀·cos(ωt) where ω = √(g/L).</p>
            <p><span className="font-semibold text-foreground">Period (small angles):</span> T = 2π√(L/g). Independent of mass and amplitude (isochronism).</p>
            <p><span className="font-semibold text-foreground">Energy:</span> At highest point: PE = mgL(1−cosθ₀), KE = 0. At lowest: KE = ½mv² = mgL(1−cosθ₀).</p>
            <p><span className="font-semibold text-foreground">Why it matters:</span> Pendulum clocks, seismometers, Foucault pendulum proves Earth rotates, gravitational sensors.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Animated Wave Simulator — 3D with time animation
   ============================================================ */

function WaveSimulator3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frequency, setFrequency] = useState(1.0);
  const [amplitude, setAmplitude] = useState(1.0);
  const [wavelength, setWavelength] = useState(4.0);
  const [waveType, setWaveType] = useState<"sin" | "cos" | "damped">("sin");
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lineRef = useRef<THREE.Line | null>(null);
  const cancelledRef = useRef(false);

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

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(8, 6, 10);

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

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 8, 5);
      scene.add(dir);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Axis labels
      const makeLabel = (text: string, pos: THREE.Vector3, color: number) => {
        const canvas = document.createElement("canvas");
        canvas.width = 128; canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.font = "bold 40px sans-serif";
        ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(text, 64, 32);
        const tex = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
        sprite.position.copy(pos);
        sprite.scale.set(1.5, 0.75, 1);
        scene.add(sprite);
      };
      makeLabel("x (distance)", new THREE.Vector3(12, 0, 0), 0x94a3b8);
      makeLabel("y (displacement)", new THREE.Vector3(0, 3, 0), 0x22d3ee);

      // Equilibrium line
      const eqGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-12, 0, 0),
        new THREE.Vector3(12, 0, 0),
      ]);
      scene.add(new THREE.Line(eqGeo, new THREE.LineBasicMaterial({ color: 0x475569 })));

      function updateWave() {
        if (lineRef.current) {
          scene.remove(lineRef.current);
          lineRef.current.geometry.dispose();
          (lineRef.current.material as THREE.Material).dispose();
          lineRef.current = null;
        }
        const segs = 400;
        const w = 24;
        const k = (2 * Math.PI) / wavelength;
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= segs; i++) {
          const x = -w / 2 + (i / segs) * w;
          let y = 0;
          if (waveType === "sin") {
            y = amplitude * Math.sin(k * x - 2 * Math.PI * frequency * timeRef.current);
          } else if (waveType === "cos") {
            y = amplitude * Math.cos(k * x - 2 * Math.PI * frequency * timeRef.current);
          } else {
            y = amplitude * Math.exp(-0.05 * Math.abs(x)) * Math.sin(k * x - 2 * Math.PI * frequency * timeRef.current);
          }
          pts.push(new THREE.Vector3(x, y, 0));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 });
        lineRef.current = new THREE.Line(geo, mat);
        scene.add(lineRef.current);
      }
      updateWave();

      function animate() {
        if (cancelled) return;
        frameRef.current = requestAnimationFrame(animate);
        timeRef.current += 0.03 * (waveType === "damped" ? 0.5 : 1);
        updateWave();
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
  }, [amplitude, wavelength, waveType]);

  const speed = frequency * wavelength;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Animated Wave Simulator (3D)</span>
          <span className="text-xs text-muted-foreground font-normal">Real-time wave propagation • Drag to rotate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Wave Parameters">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Amplitude A</Label>
              <Input type="number" step="0.1" min="0.1" max="5" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Wavelength λ (m)</Label>
              <Input type="number" step="0.1" min="0.5" max="12" value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Frequency f (Hz)</Label>
              <Input type="number" step="0.1" min="0.1" max="5" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Wave Type</Label>
              <select value={waveType} onChange={(e) => setWaveType(e.target.value as typeof waveType)} className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm">
                <option value="sin">Sine</option>
                <option value="cos">Cosine</option>
                <option value="damped">Damped</option>
              </select>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border h-80 sm:h-96 md:h-[500px] lg:h-[600px]" />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Wave Speed v</p>
            <p className="text-sm font-semibold">v = fλ = {speed.toFixed(2)} m/s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angular Freq ω</p>
            <p className="text-sm font-semibold">ω = 2πf = {(2 * Math.PI * frequency).toFixed(2)} rad/s</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Wave Number k</p>
            <p className="text-sm font-semibold">k = 2π/λ = {(2 * Math.PI / wavelength).toFixed(2)} rad/m</p>
          </div>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Wave Theory</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Wave equation:</span> y(x,t) = A·sin(kx − ωt) for a wave traveling in +x direction. Phase = kx − ωt.</p>
            <p><span className="font-semibold text-foreground">Key relation:</span> v = fλ = ω/k. In a given medium, wave speed is fixed — changing f changes λ inversely.</p>
            <p><span className="font-semibold text-foreground">Damped wave:</span> Amplitude decays exponentially: A(x) = A₀·e^(−αx). Energy is dissipated (friction, resistance).</p>
            <p><span className="font-semibold text-foreground">Why it matters:</span> Sound, light, radio, seismic waves, quantum wavefunctions — all described by wave equations.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Export
   ============================================================ */

export function PhysicsAdvancedMotionLab() {
  return (
    <Tabs defaultValue="wave" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="wave">Wave Simulator</TabsTrigger>
        <TabsTrigger value="pendulum">Pendulum</TabsTrigger>
      </TabsList>
      <TabsContent value="wave" className="mt-4">
        <WaveSimulator3D />
      </TabsContent>
      <TabsContent value="pendulum" className="mt-4">
        <Pendulum3D />
      </TabsContent>
    </Tabs>
  );
}
