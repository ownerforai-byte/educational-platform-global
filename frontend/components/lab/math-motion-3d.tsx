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
   Fourier Series Visualizer — Build waves from harmonics
   ============================================================ */

function FourierSeries3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numHarmonics, setNumHarmonics] = useState(5);
  const [waveType, setWaveType] = useState<"square" | "sawtooth" | "triangle">("square");
  const [showCircle, setShowCircle] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let waveLine: THREE.Line | null = null;
    let fundamentalLine: THREE.Line | null = null;
    let circleRef: THREE.Object3D | null = null;
    let cancelled = false;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      scene.fog = new THREE.Fog(0x0f172a, 30, 60);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(10, 8, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.2;

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(8, 12, 8);
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0x6366f1, 0.3);
      fill.position.set(-6, -4, -6);
      scene.add(fill);

      const grid = new THREE.GridHelper(30, 30, 0x334155, 0x1e293b);
      scene.add(grid);

      // Base plane
      const baseGeo = new THREE.PlaneGeometry(30, 6);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8, metalness: 0.1 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.rotation.x = -Math.PI / 2;
      base.position.y = -3.1;
      base.receiveShadow = true;
      scene.add(base);

      // Reference circle (epicycle representation)
      const circleGroup = new THREE.Group();
      scene.add(circleGroup);

      function buildWave() {
        if (waveLine) { scene.remove(waveLine); waveLine.geometry.dispose(); (waveLine.material as THREE.Material).dispose(); waveLine = null; }
        if (fundamentalLine) { scene.remove(fundamentalLine); fundamentalLine.geometry.dispose(); (fundamentalLine.material as THREE.Material).dispose(); fundamentalLine = null; }

        const segs = 400;
        const w = 24;
        const pts: THREE.Vector3[] = [];
        const fundPts: THREE.Vector3[] = [];

        for (let i = 0; i <= segs; i++) {
          const x = -w / 2 + (i / segs) * w;
          let y = 0;
          for (let n = 1; n <= numHarmonics; n++) {
            let coeff = 0;
            if (waveType === "square") {
              if (n % 2 === 1) coeff = (4 / Math.PI) * Math.sin(n * x) / n;
            } else if (waveType === "sawtooth") {
              coeff = (4 / Math.PI) * ((-1) ** (n + 1)) * Math.sin(n * x) / n;
            } else {
              if (n % 2 === 1) coeff = (8 / Math.PI / Math.PI) * ((-1) ** ((n - 1) / 2)) * Math.sin(n * x) / (n * n);
            }
            y += coeff * Math.cos(n * (2 * Math.PI / w) * x);
          }
          pts.push(new THREE.Vector3(x, y, 0));
          // Fundamental only
          fundPts.push(new THREE.Vector3(x, Math.cos(2 * Math.PI / w * x), 0));
        }

        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        waveLine = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x22d3ee }));
        scene.add(waveLine);

        const fGeo = new THREE.BufferGeometry().setFromPoints(fundPts);
        fundamentalLine = new THREE.Line(fGeo, new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.4 }));
        scene.add(fundamentalLine);

        // Reference circle
        while (circleGroup.children.length > 0) {
          const c = circleGroup.children[0];
          circleGroup.remove(c);
          if (c instanceof THREE.Mesh) { c.geometry.dispose(); (c.material as THREE.Material).dispose(); }
          if (c instanceof THREE.Line) { c.geometry.dispose(); (c.material as THREE.Material).dispose(); }
        }
        if (showCircle) {
          const circleGeo = new THREE.RingGeometry(1.0, 1.02, 64);
          const circleMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
          const circleMesh = new THREE.Mesh(circleGeo, circleMat);
          circleMesh.rotation.x = -Math.PI / 2;
          circleGroup.add(circleMesh);
        }
      }

      buildWave();

      function animate() {
        if (cancelled) return;
        frameRef.current = requestAnimationFrame(animate);
        if (autoPlay) timeRef.current += 0.02;
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
  }, [numHarmonics, waveType, showCircle]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Fourier Series — Wave Decomposition</span>
          <span className="text-xs text-muted-foreground font-normal">Sum of sines builds square, sawtooth, triangle waves</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Fourier Options">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Harmonics: {numHarmonics}</Label>
              <input type="range" min="1" max="21" step="2" value={numHarmonics} onChange={(e) => setNumHarmonics(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Wave Type</Label>
              <select value={waveType} onChange={(e) => setWaveType(e.target.value as typeof waveType)} className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm">
                <option value="square">Square Wave</option>
                <option value="sawtooth">Sawtooth Wave</option>
                <option value="triangle">Triangle Wave</option>
              </select>
            </div>
            <Button variant={showCircle ? "default" : "outline"} size="sm" onClick={() => setShowCircle(!showCircle)}>
              Reference Circle
            </Button>
            <Button variant={autoPlay ? "default" : "outline"} size="sm" onClick={() => setAutoPlay(!autoPlay)}>
              {autoPlay ? "Playing" : "Paused"}
            </Button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border h-80 sm:h-96 md:h-[500px] lg:h-[600px]" />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Harmonics Used</p>
            <p className="text-sm font-semibold">{numHarmonics} terms</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Wave Type</p>
            <p className="text-sm font-semibold capitalize">{waveType}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Convergence</p>
            <p className="text-sm font-semibold">{numHarmonics >= 11 ? "Good" : numHarmonics >= 5 ? "Moderate" : "Rough"}</p>
          </div>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Fourier Series Theory</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">The theorem:</span> Any periodic function f(x) with period 2π can be written as a sum of sines and cosines: f(x) = a₀/2 + Σ(aₙcos(nx) + bₙsin(nx)).</p>
            <p><span className="font-semibold text-foreground">Square wave:</span> Only odd harmonics, amplitudes 1/n. Gibbs phenomenon: overshoot ~9% at discontinuities even with infinite terms.</p>
            <p><span className="font-semibold text-foreground">Sawtooth:</span> All harmonics, amplitudes 1/n with alternating sign. Contains both odd and even.</p>
            <p><span className="font-semibold text-foreground">Triangle:</span> Only odd harmonics, amplitudes 1/n². Faster convergence due to continuity.</p>
            <p><span className="font-semibold text-foreground">Why it matters:</span> Signal processing, audio compression (MP3), image compression (JPEG), solving PDEs, quantum mechanics all use Fourier analysis.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Nuclear Decay Simulator — 3D
   ============================================================ */

function NuclearDecay3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [halfLife, setHalfLife] = useState(2.0);
  const [initialNuclei, setInitialNuclei] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const decayedRef = useRef(0);
  const nucleiRef = useRef<THREE.Group | null>(null);
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
      camera.position.set(0, 12, 18);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 10, 8);
      dir.castShadow = true;
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0x6366f1, 0.4);
      fill.position.set(-5, 5, -5);
      scene.add(fill);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Nuclei group
      const nucleiGroup = new THREE.Group();
      scene.add(nucleiGroup);
      nucleiRef.current = nucleiGroup;

      const decayedMeshes: THREE.Mesh[] = [];
      const remainingMeshes: THREE.Mesh[] = [];

      function buildNuclei() {
        while (nucleiGroup.children.length > 0) {
          const c = nucleiGroup.children[0];
          nucleiGroup.remove(c);
          if (c instanceof THREE.Mesh) { c.geometry.dispose(); (c.material as THREE.Material).dispose(); }
        }
        decayedMeshes.length = 0;
        remainingMeshes.length = 0;
        decayedRef.current = 0;
        timeRef.current = 0;

        const N = initialNuclei;
        for (let i = 0; i < N; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 3 + Math.random() * 4;
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.cos(phi) * 0.5 + 1;
          const z = r * Math.sin(phi) * Math.sin(theta);
          const geo = new THREE.SphereGeometry(0.18, 12, 12);
          const mat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.3, roughness: 0.3, metalness: 0.4 });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(x, y, z);
          mesh.castShadow = true;
          mesh.userData = { decayed: false, decayTime: 0 };
          nucleiGroup.add(mesh);
          remainingMeshes.push(mesh);
        }
      }
      buildNuclei();

      function animate() {
        if (cancelled) return;
        frameRef.current = requestAnimationFrame(animate);
        if (isRunning) {
          const dt = 0.016;
          timeRef.current += dt;
          const lambda = Math.LN2 / halfLife;
          const N_remaining = initialNuclei * Math.exp(-lambda * timeRef.current);
          const N_decayed = initialNuclei - N_remaining;

          remainingMeshes.forEach((mesh, i) => {
            if (mesh.userData.decayed) return;
            const prob = lambda * dt;
            if (Math.random() < prob) {
              mesh.userData.decayed = true;
              mesh.material = (mesh.material as THREE.Material).clone();
              (mesh.material as THREE.MeshStandardMaterial).color.set(0x22c55e);
              (mesh.material as THREE.MeshStandardMaterial).emissive.set(0x22c55e);
              (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15;
              decayedMeshes.push(mesh);
              remainingMeshes.splice(i, 1);
            }
          });
          decayedRef.current = decayedMeshes.length;
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
  }, [initialNuclei, halfLife]);

  const lambda = Math.LN2 / halfLife;
  const N_current = isRunning ? Math.round(initialNuclei * Math.exp(-lambda * timeRef.current)) : initialNuclei;
  const N_decayed = initialNuclei - N_current;
  const activity = N_current * lambda;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Nuclear Decay Simulator</span>
          <span className="text-xs text-muted-foreground font-normal">Red = undecayed • Green = decayed products. Stochastic process.</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Decay Parameters">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Half-life (s)</Label>
              <Input type="number" step="0.1" min="0.1" max="20" value={halfLife} onChange={(e) => setHalfLife(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Initial Nuclei</Label>
              <Input type="number" min="10" max="500" step="10" value={initialNuclei} onChange={(e) => setInitialNuclei(Number(e.target.value))} />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={() => { setIsRunning(!isRunning); if (!isRunning) timeRef.current = 0; }} className="flex-1">
                {isRunning ? "⏸ Pause" : "▶ Start"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setIsRunning(false); timeRef.current = 0; buildNuclei(); }}>
                Reset
              </Button>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border h-80 sm:h-96 md:h-[500px] lg:h-[600px]" />

        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">⏱ Elapsed Time</p>
            <p className="text-sm font-semibold">{timeRef.current.toFixed(1)} s</p>
          </div>
          <div className="rounded-md border border-red-500/30 bg-red-500/5 p-3">
            <p className="text-xs text-muted-foreground">🔴 Undecayed</p>
            <p className="text-sm font-semibold text-red-400">{N_current}</p>
          </div>
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-3">
            <p className="text-xs text-muted-foreground">🟢 Decayed</p>
            <p className="text-sm font-semibold text-green-400">{N_decayed}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">☢ Activity</p>
            <p className="text-sm font-semibold">{activity.toFixed(1)} decays/s</p>
          </div>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Nuclear Decay Theory</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Exponential decay:</span> N(t) = N₀ · e^(−λt) where λ = ln2 / t½ (decay constant).</p>
            <p><span className="font-semibold text-foreground">Half-life:</span> Time for half the nuclei to decay. After n half-lives: N = N₀ / 2ⁿ.</p>
            <p><span className="font-semibold text-foreground">Stochastic nature:</span> Each nucleus has the same probability per unit time to decay — independent of age. You cannot predict when a single nucleus decays.</p>
            <p><span className="font-semibold text-foreground">Activity:</span> A = λN (Bq = decays per second). Decreases exponentially as nuclei are consumed.</p>
            <p><span className="font-semibold text-foreground">Why it matters:</span> Radiometric dating (C-14, U-Pb), nuclear medicine (PET scans), nuclear power, understanding stellar nucleosynthesis.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  function buildNuclei() {
    // Placeholder — actual rebuild is in the effect
  }
}

/* ============================================================
   Export
   ============================================================ */

export function MathAdvancedMotionLab() {
  return (
    <Tabs defaultValue="fourier" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="fourier">Fourier Series</TabsTrigger>
        <TabsTrigger value="decay">Nuclear Decay</TabsTrigger>
      </TabsList>
      <TabsContent value="fourier" className="mt-4">
        <FourierSeries3D />
      </TabsContent>
      <TabsContent value="decay" className="mt-4">
        <NuclearDecay3D />
      </TabsContent>
    </Tabs>
  );
}
