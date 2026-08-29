"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { useWebGLCanvas, WebGLFallback } from "@/components/lab/webgl-fallback";
import { isWebGLAvailable } from "@/lib/webgl";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type Charge = { x: number; y: number; z: number; q: number };

function ElectricFieldVisualizer() {
  const [charges, setCharges] = useState<Charge[]>([{ x: 0, y: 0, z: 0, q: 1 }]);
  const [selectedCharge, setSelectedCharge] = useState(0);
  const [fieldResolution, setFieldResolution] = useState(15);
  const [fieldScale, setFieldScale] = useState(50);
  const [showFieldLines, setShowFieldLines] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const addCharge = () => {
    setCharges((prev) => [...prev, { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2, z: Math.random() * 4 - 2, q: Math.random() > 0.5 ? 1 : -1 }]);
  };

  const removeCharge = () => {
    setCharges((prev) => prev.filter((_, i) => i !== selectedCharge));
    setSelectedCharge(0);
  };

  const updateCharge = (index: number, field: keyof Charge, value: number) => {
    setCharges((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  // Calculate total field energy
  const totalEnergy = charges.reduce((sum, c) => sum + c.q * c.q, 0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        if (!isWebGLAvailable()) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 6, 10);
        if (!isWebGLAvailable()) {
          return;
        }
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 0.5;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        const grid = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(grid);
        const axes = new THREE.AxesHelper(5);
        scene.add(axes);

        const fieldGroup = new THREE.Group();
        scene.add(fieldGroup);

        const chargeGroup = new THREE.Group();
        scene.add(chargeGroup);

        function rebuild() {
          while (fieldGroup.children.length > 0) {
            const child = fieldGroup.children[0];
            fieldGroup.remove(child);
            if (child instanceof THREE.ArrowHelper) {
              const helper = child as any;
              helper.line?.geometry?.dispose();
              if (helper.line?.material) (helper.line.material as THREE.Material).dispose();
              helper.cone?.geometry?.dispose();
              if (helper.cone?.material) (helper.cone.material as THREE.Material).dispose();
            }
          }
          while (chargeGroup.children.length > 0) {
            const child = chargeGroup.children[0];
            chargeGroup.remove(child);
            if (child instanceof THREE.Mesh) { child.geometry.dispose(); (child.material as THREE.Material).dispose(); }
          }

          charges.forEach((charge) => {
            const geo = new THREE.SphereGeometry(0.3, 16, 16);
            const mat = new THREE.MeshStandardMaterial({ color: charge.q > 0 ? 0xef4444 : 0x3b82f6, emissive: charge.q > 0 ? 0xef4444 : 0x3b82f6, emissiveIntensity: 0.3 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(charge.x, charge.y, charge.z);
            chargeGroup.add(mesh);
          });

          if (!showFieldLines) return;

          const resolution = fieldResolution;
          const size = 6;
          const step = (size * 2) / resolution;
          for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
              for (let k = 0; k < resolution; k++) {
                const x = -size + i * step;
                const y = -size + j * step;
                const z = -size + k * step;
                let Ex = 0, Ey = 0, Ez = 0;
                charges.forEach((charge) => {
                  const dx = x - charge.x;
                  const dy = y - charge.y;
                  const dz = z - charge.z;
                  const r2 = dx * dx + dy * dy + dz * dz + 0.01;
                  const r = Math.sqrt(r2);
                  const E = (charge.q * fieldScale) / r2;
                  Ex += E * dx / r;
                  Ey += E * dy / r;
                  Ez += E * dz / r;
                });
                const E = Math.sqrt(Ex * Ex + Ey * Ey + Ez * Ez);
                if (E < 0.01) return;
                const len = Math.min(0.4, E * 0.05);
                const dir = new THREE.Vector3(Ex / E, Ey / E, Ez / E).multiplyScalar(len);
                const origin = new THREE.Vector3(x, y, z);
                const arrow = new THREE.ArrowHelper(dir, origin, len, 0x22c55e, len * 0.3, len * 0.2);
                const arrowAny = arrow as any;
                if (arrowAny.line?.material) { arrowAny.line.material.transparent = true; arrowAny.line.material.opacity = Math.min(1, E * 0.1); }
                fieldGroup.add(arrow);
              }
            }
          }
        }

        rebuild();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => { cancelled = true; };
  }, [charges, fieldResolution, fieldScale, showFieldLines, autoRotate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Electric Field Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="h-[500px] w-full rounded-lg border border-border" aria-label="3D electric field" />}

        <div className="flex flex-wrap gap-2">
          <Button onClick={addCharge} size="sm">+ Add Charge</Button>
          <Button onClick={removeCharge} size="sm" variant="outline">Remove Selected</Button>
          <Button
            onClick={() => setAutoRotate(!autoRotate)}
            size="sm"
            variant={autoRotate ? "default" : "outline"}
          >
            {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
          </Button>
        </div>

        <CollapsibleControls label="Field Visualization">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resolution">Field Resolution: {fieldResolution}</Label>
              <input
                id="resolution"
                type="range"
                min="5"
                max="25"
                step="1"
                value={fieldResolution}
                onChange={(e) => setFieldResolution(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Higher = more detail, slower rendering</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scale">Field Scale: {fieldScale}</Label>
              <input
                id="scale"
                type="range"
                min="10"
                max="100"
                step="5"
                value={fieldScale}
                onChange={(e) => setFieldScale(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Higher = stronger field visualization</p>
            </div>
          </div>
          <Button
            variant={showFieldLines ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFieldLines(!showFieldLines)}
            className="w-full"
          >
            {showFieldLines ? "Hide" : "Show"} Field Lines
          </Button>
        </CollapsibleControls>

        {charges.length > 0 && (
          <CollapsibleControls label="Charge Editor">
            <div className="flex flex-wrap items-center gap-2">
              <Label>Edit:</Label>
              <Select value={String(selectedCharge)} onValueChange={(v) => setSelectedCharge(Number(v))}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>{charges.map((c, i) => (<SelectItem key={i} value={String(i)}>Charge {i + 1} ({c.q > 0 ? "+" : ""}{c.q})</SelectItem>))}</SelectContent>
              </Select>
            </div>
            {selectedCharge < charges.length && (
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="space-y-1"><Label htmlFor="cx">X</Label><Input id="cx" type="number" step="0.1" value={charges[selectedCharge].x} onChange={(e) => updateCharge(selectedCharge, "x", Number(e.target.value))} /></div>
                <div className="space-y-1"><Label htmlFor="cy">Y</Label><Input id="cy" type="number" step="0.1" value={charges[selectedCharge].y} onChange={(e) => updateCharge(selectedCharge, "y", Number(e.target.value))} /></div>
                <div className="space-y-1"><Label htmlFor="cz">Z</Label><Input id="cz" type="number" step="0.1" value={charges[selectedCharge].z} onChange={(e) => updateCharge(selectedCharge, "z", Number(e.target.value))} /></div>
                <div className="space-y-1"><Label htmlFor="cq">Charge (+/-)</Label><Input id="cq" type="number" step="1" value={charges[selectedCharge].q} onChange={(e) => updateCharge(selectedCharge, "q", Number(e.target.value))} /></div>
              </div>
            )}
          </CollapsibleControls>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Total Charges</p>
            <p className="text-sm font-semibold">{charges.length}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Total Energy</p>
            <p className="text-sm font-semibold">{totalEnergy.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Field Points</p>
            <p className="text-sm font-semibold">{(fieldResolution ** 3).toLocaleString()}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">Red = positive charge, Blue = negative charge. Green arrows = electric field direction/magnitude. Drag to rotate, scroll to zoom. Adjust resolution and scale for real-time updates.</p>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation & Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Red/blue spheres are positive/negative charges. Green arrows show field direction and strength. Arrows denser near charges.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Field lines start on positive charges and end on negative charges. Density of lines = field strength. Opposite charges attract; like charges repel.</p>
          <h4 className="mt-2 text-sm font-semibold">Try This</h4>
          <p className="mt-1 text-xs text-muted-foreground">Add multiple charges, adjust their positions and values. Watch how the field pattern changes. Increase resolution to see finer details.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DoublePendulum3D() {
  const [L1, setL1] = useState(2);
  const [L2, setL2] = useState(2);
  const [m1, setM1] = useState(1);
  const [m2, setM2] = useState(1);
  const [g, setG] = useState(9.8);
  const [running, setRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [theta1Init, setTheta1Init] = useState(Math.PI / 2);
  const [theta2Init, setTheta2Init] = useState(Math.PI / 2);
  const [showEnergy, setShowEnergy] = useState(true);
  const [kineticEnergy, setKineticEnergy] = useState(0);
  const [potentialEnergy, setPotentialEnergy] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);
  const animationRef = useRef<number | undefined>(undefined);
  const energyRef = useRef({ KE: 0, PE: 0 });

  useEffect(() => {
    if (!running) return;
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        if (!isWebGLAvailable()) {
          return;
        }
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 5, 12);
        if (!isWebGLAvailable()) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        const grid = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(grid);

        const pivot = new THREE.Group();
        scene.add(pivot);

        const rod1Geo = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
        const rod1Mat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const rod1 = new THREE.Mesh(rod1Geo, rod1Mat);
        pivot.add(rod1);

        const rod2Geo = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
        const rod2Mat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const rod2 = new THREE.Mesh(rod2Geo, rod2Mat);
        pivot.add(rod2);

        const bob1Geo = new THREE.SphereGeometry(0.3, 16, 16);
        const bob1Mat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.2 });
        const bob1 = new THREE.Mesh(bob1Geo, bob1Mat);
        pivot.add(bob1);

        const bob2Geo = new THREE.SphereGeometry(0.25, 16, 16);
        const bob2Mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x3b82f6, emissiveIntensity: 0.2 });
        const bob2 = new THREE.Mesh(bob2Geo, bob2Mat);
        pivot.add(bob2);

        let theta1 = theta1Init;
        let theta2 = theta2Init;
        let omega1 = 0;
        let omega2 = 0;
        const dt = 0.01;

        function animate() {
          if (cancelled) return;
          animationRef.current = requestAnimationFrame(animate);

          // Chaotic double pendulum equations
          const delta1 = -g * (2 * m1 + m2) * Math.sin(theta1) - m2 * g * Math.sin(theta1 - 2 * theta2) - 2 * Math.sin(theta1 - theta2) * m2 * (omega2 * omega2 * L2 + omega1 * omega1 * L1 * Math.cos(theta1 - theta2));
          const den1 = L1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));
          const alpha1 = delta1 / (den1 + 0.0001);

          const delta2 = 2 * Math.sin(theta1 - theta2) * (omega1 * omega1 * L1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1) + omega2 * omega2 * L2 * m2 * Math.cos(theta1 - theta2));
          const den2 = L2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));
          const alpha2 = delta2 / (den2 + 0.0001);

          omega1 += alpha1 * dt * animationSpeed;
          omega2 += alpha2 * dt * animationSpeed;
          theta1 += omega1 * dt * animationSpeed;
          theta2 += omega2 * dt * animationSpeed;

          const x1 = L1 * Math.sin(theta1);
          const y1 = -L1 * Math.cos(theta1);
          const x2 = x1 + L2 * Math.sin(theta2);
          const y2 = y1 - L2 * Math.cos(theta2);

          rod1.position.set(x1 / 2, y1 / 2, 0);
          rod1.rotation.z = Math.atan2(x1, -y1);
          rod1.scale.y = L1;

          rod2.position.set(x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2, 0);
          rod2.rotation.z = Math.atan2(x2 - x1, -(y2 - y1));
          rod2.scale.y = L2;

          bob1.position.set(x1, y1, 0);
          bob2.position.set(x2, y2, 0);

          // Calculate energies
          const KE = 0.5 * m1 * (omega1 * L1) ** 2 + 0.5 * m2 * ((omega1 * L1) ** 2 + (omega2 * L2) ** 2 + 2 * omega1 * L1 * omega2 * L2 * Math.cos(theta1 - theta2));
          const PE = -m1 * g * L1 * Math.cos(theta1) - m2 * g * (L1 * Math.cos(theta1) + L2 * Math.cos(theta2));
          energyRef.current = { KE, PE };
          setKineticEnergy(KE);
          setPotentialEnergy(PE);

          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => {
      cancelled = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [running, L1, L2, m1, m2, g, animationSpeed, theta1Init, theta2Init]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Double Pendulum — Chaotic Motion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="h-[500px] w-full rounded-lg border border-border" aria-label="3D double pendulum" />}

        <CollapsibleControls label="Pendulum Parameters">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1">
              <Label htmlFor="l1">Length 1: {L1.toFixed(1)} m</Label>
              <input id="l1" type="range" min="0.5" max="3" step="0.1" value={L1} onChange={(e) => setL1(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="l2">Length 2: {L2.toFixed(1)} m</Label>
              <input id="l2" type="range" min="0.5" max="3" step="0.1" value={L2} onChange={(e) => setL2(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="m1">Mass 1: {m1.toFixed(1)} kg</Label>
              <input id="m1" type="range" min="0.1" max="5" step="0.1" value={m1} onChange={(e) => setM1(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="m2">Mass 2: {m2.toFixed(1)} kg</Label>
              <input id="m2" type="range" min="0.1" max="5" step="0.1" value={m2} onChange={(e) => setM2(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="g">Gravity: {g.toFixed(1)} m/s²</Label>
              <input id="g" type="range" min="1" max="20" step="0.1" value={g} onChange={(e) => setG(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Initial Conditions">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <Label htmlFor="theta1">θ1 Initial: {(theta1Init * 180 / Math.PI).toFixed(0)}°</Label>
              <input id="theta1" type="range" min="0" max={String(Math.PI * 2)} step="0.1" value={theta1Init} onChange={(e) => setTheta1Init(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="theta2">θ2 Initial: {(theta2Init * 180 / Math.PI).toFixed(0)}°</Label>
              <input id="theta2" type="range" min="0" max={String(Math.PI * 2)} step="0.1" value={theta2Init} onChange={(e) => setTheta2Init(Number(e.target.value))} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="speed">Animation Speed: {animationSpeed.toFixed(1)}×</Label>
              <input id="speed" type="range" min="0.2" max="3" step="0.1" value={animationSpeed} onChange={(e) => setAnimationSpeed(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        </CollapsibleControls>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setRunning(!running)} className="flex-1 sm:flex-initial">
            {running ? "Stop Simulation" : "Start Simulation"}
          </Button>
          <Button
            onClick={() => {
              setL1(2); setL2(2); setM1(1); setM2(1); setG(9.8);
              setTheta1Init(Math.PI / 2); setTheta2Init(Math.PI / 2);
              setAnimationSpeed(1);
            }}
            variant="outline"
            size="sm"
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              setTheta1Init(Math.PI / 4 + Math.random() * 0.3);
              setTheta2Init(Math.PI / 3 + Math.random() * 0.3);
            }}
            variant="outline"
            size="sm"
          >
            Randomize
          </Button>
          <Button
            variant={showEnergy ? "default" : "outline"}
            size="sm"
            onClick={() => setShowEnergy(!showEnergy)}
          >
            {showEnergy ? "Hide" : "Show"} Energy
          </Button>
        </div>

        {showEnergy && (
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Kinetic Energy</p>
              <p className="text-sm font-semibold">{kineticEnergy.toFixed(3)} J</p>
            </div>
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Potential Energy</p>
              <p className="text-sm font-semibold">{potentialEnergy.toFixed(3)} J</p>
            </div>
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Total Energy</p>
              <p className="text-sm font-semibold">{(kineticEnergy + potentialEnergy).toFixed(3)} J</p>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">Chaotic double pendulum with configurable parameters. Red = mass 1, Blue = mass 2. Adjust lengths, masses, and gravity to explore chaotic behavior. Try small angle changes to see sensitivity to initial conditions.</p>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation & Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Two pendulums attached in series swing chaotically. Small changes in initial angle produce wildly different trajectories over time.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">The system is deterministic but unpredictable (chaos). Energy sloshes between the two arms. No simple period formula exists.</p>
          <h4 className="mt-2 text-sm font-semibold">Try This</h4>
          <p className="mt-1 text-xs text-muted-foreground">Adjust the "Randomize" button to see how tiny angle changes create completely different motion. Watch total energy stay constant while KE and PE exchange.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function GravitationalField3D() {
  const [planetMass, setPlanetMass] = useState(100);
  const [showField, setShowField] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(15, 10, 15);
        if (!isWebGLAvailable()) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        const grid = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
        scene.add(grid);

        const planetGeo = new THREE.SphereGeometry(1.5, 32, 32);
        const planetMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3, metalness: 0.2 });
        const planet = new THREE.Mesh(planetGeo, planetMat);
        planet.position.set(0, 1.5, 0);
        scene.add(planet);

        const fieldGroup = new THREE.Group();
        scene.add(fieldGroup);

        function rebuildField() {
          while (fieldGroup.children.length > 0) {
            const child = fieldGroup.children[0];
            fieldGroup.remove(child);
            if (child instanceof THREE.ArrowHelper) {
              const helper = child as any;
              helper.line?.geometry?.dispose();
              if (helper.line?.material) (helper.line.material as THREE.Material).dispose();
              helper.cone?.geometry?.dispose();
              if (helper.cone?.material) (helper.cone.material as THREE.Material).dispose();
            }
          }
          if (!showField) return;
          const resolution = 40;
          const size = 12;
          const step = (size * 2) / resolution;
          for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
              for (let k = 0; k < resolution; k++) {
                const x = -size + i * step;
                const y = -size + j * step;
                const z = -size + k * step;
                const dx = x;
                const dy = y - 1.5;
                const dz = z;
                const r2 = dx * dx + dy * dy + dz * dz + 0.01;
                const r = Math.sqrt(r2);
                const gMag = (planetMass * 50) / r2;
                if (gMag < 0.01) continue;
                const dir = new THREE.Vector3(-dx / r, -dy / r, -dz / r).multiplyScalar(Math.min(0.3, gMag * 0.02));
                const origin = new THREE.Vector3(x, y + 1.5, z);
                const arrow = new THREE.ArrowHelper(dir, origin, dir.length(), 0xfbbf24, dir.length() * 0.3, dir.length() * 0.2);
                const arrowAny = arrow as any;
                if (arrowAny.line?.material) { arrowAny.line.material.transparent = true; arrowAny.line.material.opacity = Math.min(1, gMag * 0.05); }
                fieldGroup.add(arrow);
              }
            }
          }
        }

        rebuildField();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => { cancelled = true; };
  }, [planetMass, showField]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Gravitational Field</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="h-[500px] w-full rounded-lg border border-border" aria-label="3D gravitational field" />}
        <CollapsibleControls label="Field Options">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1"><Label htmlFor="mass">Planet Mass (relative)</Label><Input id="mass" type="number" step="1" value={planetMass} onChange={(e) => setPlanetMass(Number(e.target.value))} /></div>
            <div className="flex items-end"><Button onClick={() => setShowField(!showField)} variant="outline" className="w-full">{showField ? "Hide" : "Show"} Field Lines</Button></div>
          </div>
        </CollapsibleControls>
        <p className="text-xs text-muted-foreground">Yellow arrows show gravitational field direction. Arrows point toward the planet (center). Larger mass = stronger field.</p>
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">A planet sits at center. Yellow arrows point inward toward it. Arrow strength fades with distance. Larger mass = denser arrows.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Gravity follows an inverse-square law: F ∝ 1/r². Field strength decreases rapidly with distance. All objects fall at the same rate regardless of mass (equivalence principle).</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Gravity governs orbits, tides, satellite motion, and galaxy formation. Understanding the field lets us predict planetary motion and design space missions.</p>
        </div>
</CardContent>
    </Card>
  );
}

/* ============================================================
   3D Vector Explorer — addition, dot, cross, resolution
   ============================================================ */

function Vector3DExplorer() {
  const [v1, setV1] = useState({ x: 3, y: 1.5, z: 0 });
  const [v2, setV2] = useState({ x: 1, y: 3, z: 0.5 });
  const [showSum, setShowSum] = useState(true);
  const [showCross, setShowCross] = useState(true);
  const [showComponents, setShowComponents] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let vectorGroup: THREE.Group;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(6, 5, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const grid = new THREE.GridHelper(10, 10, 0x334155, 0x1e293b);
      scene.add(grid);

      const axes = new THREE.AxesHelper(5);
      scene.add(axes);

      vectorGroup = new THREE.Group();
      scene.add(vectorGroup);

      const rebuild = () => {
        while (vectorGroup.children.length > 0) {
          const child = vectorGroup.children[0];
          vectorGroup.remove(child);
          if (child instanceof THREE.ArrowHelper) {
            const helper = child as any;
            helper.line?.geometry?.dispose();
            if (helper.line?.material) (helper.line.material as THREE.Material).dispose();
            helper.cone?.geometry?.dispose();
            if (helper.cone?.material) (helper.cone.material as THREE.Material).dispose();
          }
          if (child instanceof THREE.Line) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        }

        const A = new THREE.Vector3(v1.x, v1.y, v1.z);
        const B = new THREE.Vector3(v2.x, v2.y, v2.z);

        // Vector A (red)
        if (A.length() > 0.05) {
          const arrowA = new THREE.ArrowHelper(A.clone().normalize(), new THREE.Vector3(0, 0, 0), A.length(), 0xef4444, 0.3, 0.2);
          vectorGroup.add(arrowA);
        }

        // Vector B (green)
        if (B.length() > 0.05) {
          const arrowB = new THREE.ArrowHelper(B.clone().normalize(), new THREE.Vector3(0, 0, 0), B.length(), 0x22c55e, 0.3, 0.2);
          vectorGroup.add(arrowB);
        }

        // Sum A + B (orange)
        if (showSum) {
          const sum = A.clone().add(B);
          if (sum.length() > 0.05) {
            const arrowSum = new THREE.ArrowHelper(sum.clone().normalize(), new THREE.Vector3(0, 0, 0), sum.length(), 0xf59e0b, 0.35, 0.25);
            vectorGroup.add(arrowSum);
          }
        }

        // Cross product A × B (purple)
        if (showCross) {
          const cross = new THREE.Vector3(
            A.y * B.z - A.z * B.y,
            A.z * B.x - A.x * B.z,
            A.x * B.y - A.y * B.x
          );
          if (cross.length() > 0.05) {
            const arrowCross = new THREE.ArrowHelper(cross.clone().normalize(), new THREE.Vector3(0, 0, 0), cross.length(), 0xa855f7, 0.35, 0.25);
            vectorGroup.add(arrowCross);
          }
        }

        // Component projection lines (dashed)
        if (showComponents) {
          const mkDash = (from: THREE.Vector3, to: THREE.Vector3, color: number) => {
            const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
            const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.15, gapSize: 0.1 });
            const line = new THREE.Line(geo, mat);
            line.computeLineDistances();
            vectorGroup.add(line);
          };

          // Projection of A onto axes
          mkDash(A, new THREE.Vector3(A.x, 0, 0), 0xef4444);
          mkDash(A, new THREE.Vector3(0, A.y, 0), 0xef4444);
          mkDash(A, new THREE.Vector3(0, 0, A.z), 0xef4444);

          // Projection of B onto axes
          mkDash(B, new THREE.Vector3(B.x, 0, 0), 0x22c55e);
          mkDash(B, new THREE.Vector3(0, B.y, 0), 0x22c55e);
          mkDash(B, new THREE.Vector3(0, 0, B.z), 0x22c55e);
        }
      };

      rebuild();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [v1, v2, showSum, showCross, showComponents]);

  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2 + v1.z ** 2);
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2 + v2.z ** 2);
  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  const angle = Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2 || 1)))) * 180 / Math.PI;
  const cross = {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
  const crossMag = Math.sqrt(cross.x ** 2 + cross.y ** 2 + cross.z ** 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Vector Explorer</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Adjust components to see addition, dot & cross products</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}

        <CollapsibleControls label="Vector Components">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-red-500/30 bg-red-500/5 p-3">
              <p className="text-xs font-semibold text-red-400">Vector A</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["x", "y", "z"] as const).map((k) => (
                  <div key={k}>
                    <Label className="text-[10px] text-muted-foreground">{k}</Label>
                    <Input type="number" value={v1[k]} onChange={(e) => setV1({ ...v1, [k]: Number(e.target.value) })} className="mt-0.5" />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">|A| = {mag1.toFixed(2)}</p>
            </div>
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-3">
              <p className="text-xs font-semibold text-green-400">Vector B</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["x", "y", "z"] as const).map((k) => (
                  <div key={k}>
                    <Label className="text-[10px] text-muted-foreground">{k}</Label>
                    <Input type="number" value={v2[k]} onChange={(e) => setV2({ ...v2, [k]: Number(e.target.value) })} className="mt-0.5" />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">|B| = {mag2.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant={showSum ? "default" : "outline"} size="sm" onClick={() => setShowSum(!showSum)}>Show A + B</Button>
            <Button variant={showCross ? "default" : "outline"} size="sm" onClick={() => setShowCross(!showCross)}>Show A × B</Button>
            <Button variant={showComponents ? "default" : "outline"} size="sm" onClick={() => setShowComponents(!showComponents)}>Components</Button>
          </div>
        </CollapsibleControls>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Dot Product A·B</p>
            <p className="text-sm font-semibold">{dot.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angle Between</p>
            <p className="text-sm font-semibold">{angle.toFixed(1)}°</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Cross Product A×B</p>
            <p className="text-sm font-semibold">({cross.x.toFixed(1)}, {cross.y.toFixed(1)}, {cross.z.toFixed(1)})</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">|A×B| (area)</p>
            <p className="text-sm font-semibold">{crossMag.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-red-500" /> Vector A</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-green-500" /> Vector B</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-amber-500" /> A + B (resultant)</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-purple-500" /> A × B (perpendicular)</span>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation & Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Red and green arrows are vectors A and B. The orange arrow is their sum (parallelogram law). The purple arrow is the cross product — always perpendicular to both A and B. Dashed lines show the components along each axis.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            A·B = |A||B|cosθ measures alignment (zero when perpendicular). A×B = |A||B|sinθ·n̂ gives a perpendicular vector whose magnitude is the parallelogram area. The resultant R = √(A² + B² + 2ABcosθ).
          </p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Vectors describe forces, velocities, and fields. The dot product gives work W = F·d; the cross product gives torque τ = r×F and magnetic force F = q(v×B). Resolution into components is the key to projectile motion.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Physics3D() {
  return (
    <Tabs defaultValue="electric" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="electric">Electric Field</TabsTrigger>
        <TabsTrigger value="pendulum">Double Pendulum</TabsTrigger>
        <TabsTrigger value="gravity">Gravitational Field</TabsTrigger>
        <TabsTrigger value="vectors">3D Vectors</TabsTrigger>
      </TabsList>
      <TabsContent value="electric" className="mt-4">
        <ElectricFieldVisualizer />
      </TabsContent>
      <TabsContent value="pendulum" className="mt-4">
        <DoublePendulum3D />
      </TabsContent>
      <TabsContent value="gravity" className="mt-4">
        <GravitationalField3D />
      </TabsContent>
      <TabsContent value="vectors" className="mt-4">
        <Vector3DExplorer />
      </TabsContent>
    </Tabs>
  );
}

