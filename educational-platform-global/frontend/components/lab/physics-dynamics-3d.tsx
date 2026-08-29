"use client";

import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { useWebGLCanvas, WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ============================================================
   Shared setup helpers
   ============================================================ */
function makeScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(6, 5, 8);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(8, 12, 10);
  scene.add(dir);
  const grid = new THREE.GridHelper(16, 32, 0x334155, 0x1e293b);
  scene.add(grid);
  scene.add(new THREE.AxesHelper(4));
  return { scene, camera };
}

function makeArrow(
  parent: THREE.Object3D,
  origin: THREE.Vector3,
  dir: THREE.Vector3,
  length: number,
  color: number,
) {
  const norm = dir.clone().normalize();
  const arrow = new THREE.ArrowHelper(norm, origin, length, color, 0.35, 0.2);
  parent.add(arrow);
  return arrow;
}
function InclinedPlane3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);
  const [angle, setAngle] = useState(25);
  const [mu, setMu] = useState(0.6);
  const [mass, setMass] = useState(1);
  const [showVectors, setShowVectors] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    async function init() {
      if (cancelled || !containerRef.current || !isWebGLAvailable()) return;
      const container = containerRef.current;
      const { scene, camera } = makeScene();
      camera.position.set(6, 3.2, 6.5);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const rad = (angle * Math.PI) / 180;
      // Plane group rotated about z by -angle: local +X points down the slope
      const planeGroup = new THREE.Group();
      planeGroup.rotation.set(0, 0, -rad);
      const plank = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.25, 3),
        new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 }),
      );
      plank.position.set(2.2, -0.3, 0);
      planeGroup.add(plank);
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.7, 0.9),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.5 }),
      );
      block.position.set(2.2, 0.4, 0);
      planeGroup.add(block);
      scene.add(planeGroup);

      const gLen = mass * 1.7;
      const nLen = mass * 1.7 * Math.cos(rad);
      const tLen = mass * 1.7 * Math.sin(rad);
      const fLen = Math.min(mu * nLen, tLen);
      if (showVectors) {
        // Weight (world down, shown in plane frame)
        makeArrow(planeGroup, new THREE.Vector3(2.2, 0.95, 0), new THREE.Vector3(Math.sin(rad), -Math.cos(rad), 0), gLen, 0xf59e0b);
        // Tangential component down the slope
        makeArrow(planeGroup, new THREE.Vector3(2.2, 0.95, 0), new THREE.Vector3(1, 0, 0), tLen, 0x60a5fa);
        // Normal reaction (out of the plane)
        makeArrow(planeGroup, new THREE.Vector3(2.2, 0.95, 0), new THREE.Vector3(0, 1, 0), nLen, 0x34d399);
        // Friction up the slope
        makeArrow(planeGroup, new THREE.Vector3(2.2, 0.95, 0), new THREE.Vector3(-1, 0, 0), fLen, 0xfb7185);
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        controls.dispose?.();
        renderer.dispose();
      };
    }
    const cleanup = init();
    return () => { cancelled = true; cleanup.then((fn) => fn?.()); };
  }, [angle, mu, mass, showVectors]);

  const rad = (angle * Math.PI) / 180;
  const g = 9.8;
  const wSin = (mass * g * Math.sin(rad)).toFixed(2);
  const wCos = (mass * g * Math.cos(rad)).toFixed(2);
  const fMax = (mu * mass * g * Math.cos(rad)).toFixed(2);
  const slides = mass * g * Math.sin(rad) >= mu * mass * g * Math.cos(rad);
return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Inclined Plane &amp; Friction (3D)</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Watch when the block slides (tan θ = μ)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}
        <CollapsibleControls label="Incline Controls">
          <div className="w-24">
            <Label className="text-xs text-muted-foreground">Angle θ</Label>
            <Input type="number" value={angle} min={0} max={60} onChange={(e) => setAngle(Number(e.target.value))} className="mt-0.5" />
          </div>
          <div className="w-24">
            <Label className="text-xs text-muted-foreground">μ</Label>
            <Input type="number" value={mu} min={0} max={1} step={0.05} onChange={(e) => setMu(Number(e.target.value))} className="mt-0.5" />
          </div>
          <div className="w-24">
            <Label className="text-xs text-muted-foreground">Mass (kg)</Label>
            <Input type="number" value={mass} min={0.1} step={0.1} onChange={(e) => setMass(Number(e.target.value))} className="mt-0.5" />
          </div>
          <Button size="sm" variant={showVectors ? "default" : "outline"} onClick={() => setShowVectors(!showVectors)}>Vectors</Button>
        </CollapsibleControls>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">W sin θ (pull down)</p>
            <p className="text-sm font-semibold">{wSin}N</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">W cos θ (into plane)</p>
            <p className="text-sm font-semibold">{wCos}N</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Max friction μW cos θ</p>
            <p className="text-sm font-semibold">{fMax}N</p>
          </div>
        </div>
        <div className={`rounded-md border p-3 text-sm ${slides ? "border-red-500/30 bg-red-500/5 text-red-300" : "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"}`}>
          <p className="font-semibold">{slides ? "⚡ Sliding — W sinθ exceeds max friction." : "✓ At rest — friction balances W sinθ."}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The block loses grip when tan θ &gt; μ. Current tan θ = {Math.tan(rad).toFixed(3)}, μ = {mu.toFixed(2)}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
function CollisionMomentum3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(1);
  const [v1, setV1] = useState(4);
  const [v2, setV2] = useState(-2);
  const [running, setRunning] = useState(false);
  const [resetTick, setResetTick] = useState(0);

  const pBefore = m1 * v1 + m2 * v2;
  const keBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  // Elastic 1-D collision velocities after impact
  const v1After = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const v2After = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
  const pAfter = m1 * v1After + m2 * v2After;
  const keAfter = 0.5 * m1 * v1After * v1After + 0.5 * m2 * v2After * v2After;

  useEffect(() => {
    let frameId = 0;
    async function init() {
      if (!containerRef.current || !isWebGLAvailable()) return;
      const container = containerRef.current;
      const { scene, camera } = makeScene();
      camera.position.set(0, 3.5, 9);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const sphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(m1, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 }),
      );
      const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(m2, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 }),
      );
      sphere1.position.set(-4, 0, 0);
      sphere2.position.set(4, 0, 0);
      scene.add(sphere1);
      scene.add(sphere2);

      const radii = m1 + m2;
      let s1 = -4;
      let s2 = 4;
      let u1 = v1;
      let u2 = v2;
      let collided = false;

      let last = performance.now();
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (running) {
          if (!collided && s2 - s1 <= radii * 0.5) {
            // Elastic collision
            const w1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
            const w2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
            u1 = w1;
            u2 = w2;
            collided = true;
          }
          s1 += u1 * dt;
          s2 += u2 * dt;
        }
        sphere1.position.x = s1;
        sphere2.position.x = s2;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        controls.dispose?.();
        renderer.dispose();
      };
    }
    const cleanup = init();
    return () => { cleanup.then((fn) => fn?.()); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m1, m2, v1, v2, running, resetTick]);
return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Elastic Collision &amp; Momentum (3D)</span>
          <span className="text-xs text-muted-foreground font-normal">Press Run — momentum &amp; KE are conserved</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}
        <CollapsibleControls label="Collision Controls">
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">m₁</Label>
            <Input type="number" value={m1} min={0.5} step={0.5} onChange={(e) => setM1(Number(e.target.value))} className="mt-0.5" />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">m₂</Label>
            <Input type="number" value={m2} min={0.5} step={0.5} onChange={(e) => setM2(Number(e.target.value))} className="mt-0.5" />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">v₁</Label>
            <Input type="number" value={v1} step={0.5} onChange={(e) => setV1(Number(e.target.value))} className="mt-0.5" />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">v₂</Label>
            <Input type="number" value={v2} step={0.5} onChange={(e) => setV2(Number(e.target.value))} className="mt-0.5" />
          </div>
          <Button size="sm" variant={running ? "default" : "outline"} onClick={() => setRunning(!running)}>{running ? "⏸ Pause" : "▶ Run"}</Button>
          <Button size="sm" variant="outline" onClick={() => { setRunning(false); setResetTick((t) => t + 1); }}>↺ Reset</Button>
        </CollapsibleControls>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Total momentum (p = m₁v₁+m₂v₂)</p>
            <p className="text-sm font-semibold">{pBefore.toFixed(2)} <span className="text-muted-foreground font-normal">before</span> → {pAfter.toFixed(2)} <span className="text-muted-foreground font-normal">after</span></p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Total kinetic energy (elastic)</p>
            <p className="text-sm font-semibold">{keBefore.toFixed(2)} J <span className="text-muted-foreground font-normal">→</span> {keAfter.toFixed(2)} J</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Velocities after impact</p>
            <p className="text-sm font-semibold">v₁={v1After.toFixed(2)} m/s, v₂={v2After.toFixed(2)} m/s</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          In an elastic collision on a frictionless track, linear momentum and kinetic energy are both conserved —
          ball 1 moves at {v1After.toFixed(2)} m/s and ball 2 at {v2After.toFixed(2)} m/s after impact if the masses don&rsquo;t stick.
        </p>
      </CardContent>
    </Card>
  );
}
function ConicalPendulum3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);
  const [length, setLength] = useState(3);
  const [angleDeg, setAngleDeg] = useState(35);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let frameId = 0;
    async function init() {
      if (!containerRef.current || !isWebGLAvailable()) return;
      const container = containerRef.current;
      const { scene, camera } = makeScene();
      camera.position.set(0, 6, 9);
      camera.lookAt(0, -1, 0);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // vertical rod / pivot
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 6, 16),
        new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 }),
      );
      rod.position.set(0, 2.8, 0);
      scene.add(rod);
      // pivot sphere
      const pivot = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 }),
      );
      pivot.position.set(0, 5.5, 0);
      scene.add(pivot);

      const stringMat = new THREE.LineBasicMaterial({ color: 0xfbbf24 });
      const pathMat = new THREE.LineBasicMaterial({ color: 0x60a5fa });

      const bob = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 }),
      );
      scene.add(bob);
      let last = performance.now();
      let phase = 0;
      let strLine: THREE.Line | null = null;
      let pathLine: THREE.Line | null = null;
      const animateFn = () => {
        frameId = requestAnimationFrame(animateFn);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (running) phase += dt * 1.4;

        const rad = (angleDeg * Math.PI) / 180;
        const r = length * Math.sin(rad);
        const bobY = 5.5 - length * Math.cos(rad);
        bob.position.set(r * Math.cos(phase), bobY, r * Math.sin(phase));

        // fresh string + circle each frame (remove previous)
        if (strLine) scene.remove(strLine);
        if (pathLine) scene.remove(pathLine);
        const strPts = [new THREE.Vector3(0, 5.5, 0), bob.position.clone()];
        const strGeo = new THREE.BufferGeometry().setFromPoints(strPts);
        strLine = new THREE.Line(strGeo, stringMat);
        scene.add(strLine);
        const pathPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 60; i++) {
          const a = (i / 60) * Math.PI * 2;
          pathPts.push(new THREE.Vector3(r * Math.cos(a), bobY, r * Math.sin(a)));
        }
        const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPts);
        pathLine = new THREE.Line(pathGeo, pathMat);
        scene.add(pathLine);

        controls.update();
        renderer.render(scene, camera);
        strGeo.dispose();
        pathGeo.dispose();
      };
      animateFn();

      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        controls.dispose?.();
        renderer.dispose();
      };
    }
    const cleanup = init();
    return () => { cleanup.then((fn) => fn?.()); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, angleDeg, running]);
return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Conical Pendulum (3D)</span>
          <span className="text-xs text-muted-foreground font-normal">Bob traces a horizontal circle — equilibrium of tension &amp; weight</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}
        <CollapsibleControls label="Pendulum Controls">
          <div className="w-24">
            <Label className="text-xs text-muted-foreground">Length (m)</Label>
            <Input type="number" value={length} min={1} max={5} step={0.25} onChange={(e) => setLength(Number(e.target.value))} className="mt-0.5" />
          </div>
          <div className="w-24">
            <Label className="text-xs text-muted-foreground">Angle θ°</Label>
            <Input type="number" value={angleDeg} min={5} max={60} onChange={(e) => setAngleDeg(Number(e.target.value))} className="mt-0.5" />
          </div>
          <Button size="sm" variant={running ? "default" : "outline"} onClick={() => setRunning(!running)}>{running ? "⏸ Pause" : "▶ Run"}</Button>
        </CollapsibleControls>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Radius of circle</p>
            <p className="text-sm font-semibold">r = L sin θ = {length * Math.sin((angleDeg * Math.PI) / 180)} m</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Vertical depth</p>
            <p className="text-sm font-semibold">h = L cos θ = {length * Math.cos((angleDeg * Math.PI) / 180)} m</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Equilibrium condition</p>
            <p className="text-sm font-semibold">tan θ = v²/(rg)</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          The horizontal component of the tension supplies the centripetal force, while the vertical component balances the weight:
          T cos θ = mg and T sin θ = mv²/r, giving tan θ = v²/(rg).
        </p>
      </CardContent>
    </Card>
  );
}

export function PhysicsDynamics3D() {
  return (
    <Tabs defaultValue="incline" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="incline">Inclined Plane &amp; Friction</TabsTrigger>
        <TabsTrigger value="collision">Elastic Collision</TabsTrigger>
        <TabsTrigger value="conical">Conical Pendulum</TabsTrigger>
      </TabsList>
      <TabsContent value="incline" className="mt-4">
        <InclinedPlane3D />
      </TabsContent>
      <TabsContent value="collision" className="mt-4">
        <CollisionMomentum3D />
      </TabsContent>
      <TabsContent value="conical" className="mt-4">
        <ConicalPendulum3D />
      </TabsContent>
    </Tabs>
  );
}