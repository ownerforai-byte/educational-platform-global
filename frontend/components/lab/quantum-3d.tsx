"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ============================================================
   Shared 3D helpers
   ============================================================ */

function MeaningPanel({ title, meaning, points }: { title: string; meaning: string; points: string[] }) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">ðŸ“˜ Meaning & Why It Matters</p>
      <h4 className="mt-1 text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{meaning}</p>
      {points.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          {points.map((p, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-primary">â€¢</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ============================================================
   1. Rutherford Model â€” 3D Planetary Atom
   ============================================================ */

function RutherfordModel() {
  const [shells, setShells] = useState(2);
  const [speed, setSpeed] = useState(1);
  const [showAlpha, setShowAlpha] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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
        camera.position.set(0, 6, 12);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);

        // Nucleus (gold â€” Rutherford used gold foil)
        const nucleusGeo = new THREE.SphereGeometry(0.7, 32, 32);
        const nucleusMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.4 });
        const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
        scene.add(nucleus);

        // Glow around nucleus
        const glowGeo = new THREE.SphereGeometry(1.0, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.12 });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glow);

        const shellGroup = new THREE.Group();
        scene.add(shellGroup);
        const electronGroup = new THREE.Group();
        scene.add(electronGroup);
        const alphaGroup = new THREE.Group();
        scene.add(alphaGroup);

        const shellMeshes: THREE.Mesh[] = [];
        const electronMeshes: { mesh: THREE.Mesh; radius: number; angle: number; tilt: number; speed: number }[] = [];

        function rebuild() {
          // Clear shells
          shellMeshes.forEach((m) => { shellGroup.remove(m); m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
          shellMeshes.length = 0;
          // Clear electrons
          electronMeshes.forEach((e) => { electronGroup.remove(e.mesh); e.mesh.geometry.dispose(); (e.mesh.material as THREE.Material).dispose(); });
          electronMeshes.length = 0;

          const shellColors = [0x3b82f6, 0x22c55e, 0xef4444, 0xa855f7, 0xf97316, 0x06b6d4, 0xec4899];
          for (let s = 0; s < shells; s++) {
            const radius = 2 + s * 1.6;
            const ringGeo = new THREE.TorusGeometry(radius, 0.03, 8, 64);
            const ringMat = new THREE.MeshBasicMaterial({ color: shellColors[s % shellColors.length], transparent: true, opacity: 0.5 });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2;
            shellGroup.add(ring);
            shellMeshes.push(ring);

            // Electrons per shell: 2, 8, 18, 32...
            const maxElectrons = [2, 8, 18, 32, 32, 18, 8];
            const count = Math.min(maxElectrons[s] ?? 8, 8);
            for (let e = 0; e < count; e++) {
              const electronGeo = new THREE.SphereGeometry(0.22, 16, 16);
              const electronMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 0.5 });
              const electron = new THREE.Mesh(electronGeo, electronMat);
              const tilt = (e / count) * Math.PI;
              const angle = (e / count) * Math.PI * 2;
              electronGroup.add(electron);
              electronMeshes.push({ mesh: electron, radius, angle, tilt, speed: 0.8 + (s * 0.15) });
            }
          }
        }

        function rebuildAlpha() {
          while (alphaGroup.children.length > 0) {
            const child = alphaGroup.children[0];
            alphaGroup.remove(child);
            if (child instanceof THREE.Mesh) { child.geometry.dispose(); (child.material as THREE.Material).dispose(); }
          }
          if (!showAlpha) return;
          // Alpha particles streaming past the nucleus
          for (let i = 0; i < 12; i++) {
            const alphaGeo = new THREE.SphereGeometry(0.15, 12, 12);
            const alphaMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.6 });
            const alpha = new THREE.Mesh(alphaGeo, alphaMat);
            const y = (i / 12) * 8 - 4;
            alpha.position.set(-14, y, 0);
            alpha.userData = { y, speed: 0.15 + Math.random() * 0.05 };
            alphaGroup.add(alpha);
          }
        }

        rebuild();
        rebuildAlpha();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);

          // Rotate electrons
          electronMeshes.forEach((e) => {
            e.angle += 0.02 * speed * e.speed;
            const x = e.radius * Math.cos(e.angle);
            const z = e.radius * Math.sin(e.angle);
            const y = Math.sin(e.tilt) * e.radius * 0.3;
            e.mesh.position.set(x, y, z);
          });

          // Move alpha particles
          alphaGroup.children.forEach((child) => {
            const alpha = child as THREE.Mesh;
            alpha.position.x += alpha.userData.speed * speed;
            if (alpha.position.x > 14) alpha.position.x = -14;
          });

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
  }, [shells, speed, showAlpha]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Rutherford Model â€” Planetary Atom</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D Rutherford model" />
        <CollapsibleControls label="Model Options">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <Label htmlFor="shells">Electron Shells</Label>
              <Input id="shells" type="number" min={1} max={7} value={shells} onChange={(e) => setShells(Math.max(1, Math.min(7, Number(e.target.value))))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="speed">Orbit Speed</Label>
              <Input id="speed" type="number" min={0.1} max={3} step={0.1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            </div>
            <div className="flex items-end">
              <Button onClick={() => setShowAlpha(!showAlpha)} variant="outline" className="w-full">{showAlpha ? "Hide" : "Show"} Alpha Particles</Button>
            </div>
          </div>
        </CollapsibleControls>
        <p className="text-xs text-muted-foreground">Gold nucleus at center. Electrons orbit in fixed circular shells (planetary model). Red particles = alpha particles scattering off the nucleus.</p>
        <MeaningPanel
          title="Rutherford's Gold Foil Experiment (1911)"
          meaning="Rutherford fired alpha particles at thin gold foil. Most passed straight through, but a few bounced back â€” proving the atom is mostly empty space with a tiny, dense, positively-charged nucleus."
          points={[
            "Most alpha particles passed straight through â†’ atom is mostly empty space",
            "Some deflected at large angles â†’ a concentrated positive charge (nucleus) exists",
            "Very few bounced back â†’ nucleus is extremely dense and tiny",
            "This disproved Thomson's 'plum pudding' model",
            "Limitation: Rutherford's planetary model couldn't explain why electrons don't spiral into the nucleus",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   2. Heisenberg Uncertainty Principle â€” 3D Position/Momentum
   ============================================================ */

function HeisenbergUncertainty() {
  const [positionUncertainty, setPositionUncertainty] = useState(1.0);
  const [showWave, setShowWave] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 4, 10);
                if (!isWebGLAvailable()) {
          return;
        }
const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);

        const group = new THREE.Group();
        scene.add(group);

        // Position uncertainty cloud (blurred electron)
        const cloudGeo = new THREE.SphereGeometry(1, 32, 32);
        const cloudMat = new THREE.MeshStandardMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.35,
          emissive: 0x22d3ee,
          emissiveIntensity: 0.3,
        });
        const cloud = new THREE.Mesh(cloudGeo, cloudMat);
        group.add(cloud);

        // Momentum wave (sine wave showing momentum uncertainty)
        const wavePoints: THREE.Vector3[] = [];
        const waveCount = 200;
        for (let i = 0; i < waveCount; i++) {
          const x = (i / waveCount) * 12 - 6;
          wavePoints.push(new THREE.Vector3(x, 0, 0));
        }
        const waveGeo = new THREE.BufferGeometry().setFromPoints(wavePoints);
        const waveMat = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.8 });
        const waveLine = new THREE.Line(waveGeo, waveMat);
        group.add(waveLine);

        // Wave points (animated)
        const dotGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const dots: THREE.Mesh[] = [];
        for (let i = 0; i < waveCount; i += 4) {
          const dot = new THREE.Mesh(dotGeo, dotMat);
          group.add(dot);
          dots.push(dot);
        }

        // Axis
        const axisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]);
        const axisMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 });
        const axis = new THREE.Line(axisGeo, axisMat);
        group.add(axis);

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);

          // Scale cloud based on position uncertainty
          cloud.scale.set(positionUncertainty, positionUncertainty, positionUncertainty);

          // Animate wave â€” higher momentum uncertainty = tighter wave
          const time = Date.now() * 0.002;
          const freq = 1 / positionUncertainty;
          const positions = waveLine.geometry.attributes.position;
          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            positions.setY(i, Math.sin(x * freq * 2 + time) * (0.5 + positionUncertainty * 0.5));
            positions.setZ(i, Math.cos(x * freq * 1.5 + time) * 0.2);
          }
          positions.needsUpdate = true;

          dots.forEach((dot, i) => {
            const x = (i / (dots.length - 1)) * 12 - 6;
            dot.position.set(x, Math.sin(x * freq * 2 + time) * (0.5 + positionUncertainty * 0.5), Math.cos(x * freq * 1.5 + time) * 0.2);
          });

          waveLine.visible = showWave;
          dots.forEach((d) => (d.visible = showWave));

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
  }, [positionUncertainty, showWave]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Heisenberg Uncertainty Principle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D Heisenberg uncertainty" />
        <CollapsibleControls label="Uncertainty Options">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="posUnc">Position Uncertainty (Î”x)</Label>
              <Input id="posUnc" type="number" min={0.2} max={3} step={0.1} value={positionUncertainty} onChange={(e) => setPositionUncertainty(Number(e.target.value))} />
            </div>
            <div className="flex items-end">
              <Button onClick={() => setShowWave(!showWave)} variant="outline" className="w-full">{showWave ? "Hide" : "Show"} Momentum Wave</Button>
            </div>
          </div>
        </CollapsibleControls>
        <p className="text-xs text-muted-foreground">Cyan cloud = position uncertainty (Î”x). Red wave = momentum uncertainty (Î”p). Larger cloud â†’ tighter wave and vice versa.</p>
        <MeaningPanel
          title="Heisenberg Uncertainty Principle (1927)"
          meaning="You cannot simultaneously know both the exact position and exact momentum of a particle. The product of their uncertainties is always â‰¥ h/4Ï€ (Planck's constant)."
          points={[
            "Î”x Â· Î”p â‰¥ h/4Ï€ â€” the fundamental limit of measurement",
            "Narrow position (small Î”x) â†’ broad momentum spread (large Î”p)",
            "Wide position (large Î”x) â†’ narrow momentum spread (small Î”p)",
            "This is not a limitation of instruments â€” it's a fundamental property of nature",
            "Explains why electrons form probability clouds, not fixed orbits",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3. Hydrogen Spectral Series â€” 3D Energy Levels & Photons
   ============================================================ */

type SeriesDef = {
  id: string;
  name: string;
  nFinal: number;
  region: string;
  color: number;
  description: string;
};

const SPECTRAL_SERIES: SeriesDef[] = [
  { id: "lyman", name: "Lyman Series", nFinal: 1, region: "Ultraviolet (UV)", color: 0x8b5cf6, description: "Transitions to n=1. Highest energy photons. Ultraviolet region." },
  { id: "balmer", name: "Balmer Series", nFinal: 2, region: "Visible Light", color: 0x22d3ee, description: "Transitions to n=2. Visible spectrum â€” the famous hydrogen lines (HÎ±, HÎ², HÎ³, HÎ´)." },
  { id: "paschen", name: "Paschen Series", nFinal: 3, region: "Infrared (IR)", color: 0xef4444, description: "Transitions to n=3. Infrared region." },
  { id: "brackett", name: "Brackett Series", nFinal: 4, region: "Far Infrared", color: 0xf97316, description: "Transitions to n=4. Far infrared region." },
  { id: "pfund", name: "Pfund Series", nFinal: 5, region: "Far Infrared", color: 0x22c55e, description: "Transitions to n=5. Far infrared region." },
  { id: "humphreys", name: "Humphreys Series", nFinal: 6, region: "Far Infrared", color: 0xec4899, description: "Transitions to n=6. Far infrared region. Discovered by Curtis Humphreys." },
];

function HydrogenSpectralSeries() {
  const [seriesId, setSeriesId] = useState("balmer");
  const [showPhoton, setShowPhoton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const series = SPECTRAL_SERIES.find((s) => s.id === seriesId) ?? SPECTRAL_SERIES[1];

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 4, 12);
                if (!isWebGLAvailable()) {
          return;
        }
const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);

        // Nucleus
        const nucleusGeo = new THREE.SphereGeometry(0.4, 24, 24);
        const nucleusMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.5 });
        const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
        scene.add(nucleus);

        // Energy levels (n=1 to n=7)
        const levelGroup = new THREE.Group();
        scene.add(levelGroup);
        const levelMeshes: THREE.Mesh[] = [];
        const levelRadii = [1.2, 2.0, 2.8, 3.6, 4.4, 5.2, 6.0];
        const levelColors = [0x8b5cf6, 0x22d3ee, 0x22c55e, 0xf97316, 0xef4444, 0xec4899, 0x3b82f6];

        levelRadii.forEach((radius, i) => {
          const ringGeo = new THREE.TorusGeometry(radius, 0.04, 8, 64);
          const ringMat = new THREE.MeshBasicMaterial({ color: levelColors[i], transparent: true, opacity: 0.6 });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.rotation.x = Math.PI / 2;
          levelGroup.add(ring);
          levelMeshes.push(ring);
        });

        // Photon emission animation
        const photonGroup = new THREE.Group();
        scene.add(photonGroup);
        const photonGeo = new THREE.SphereGeometry(0.18, 12, 12);
        const photonMat = new THREE.MeshStandardMaterial({ color: series.color, emissive: series.color, emissiveIntensity: 0.8 });
        const photon = new THREE.Mesh(photonGeo, photonMat);
        photonGroup.add(photon);

        // Transition arrow
        const arrowGroup = new THREE.Group();
        scene.add(arrowGroup);
        let arrow: THREE.ArrowHelper | null = null;

        function rebuildArrow() {
          if (arrow) {
            arrowGroup.remove(arrow);
            arrow = null;
          }
          const startRadius = levelRadii[series.nFinal]; // n_final
          const endRadius = levelRadii[6]; // from n=7 (highest shown)
          const dir = new THREE.Vector3(0, 0, -1).normalize();
          const origin = new THREE.Vector3(0, 0, endRadius);
          const length = endRadius - startRadius;
          arrow = new THREE.ArrowHelper(dir, origin, length, series.color, 0.4, 0.3);
          arrowGroup.add(arrow);
        }
        rebuildArrow();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);

          // Animate photon falling from high level to final level
          const time = (Date.now() * 0.001) % 2;
          const startRadius = levelRadii[6];
          const endRadius = levelRadii[series.nFinal];
          const t = time < 1 ? time : 2 - time;
          const radius = startRadius + (endRadius - startRadius) * t;
          const angle = Date.now() * 0.001;
          photon.position.set(radius * Math.cos(angle), 0, radius * Math.sin(angle));
          photon.visible = showPhoton;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesId, showPhoton]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Hydrogen Spectral Series</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D hydrogen spectral series" />
        <CollapsibleControls label="Series Options">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Series:</Label>
            <Select value={seriesId} onValueChange={setSeriesId}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SPECTRAL_SERIES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setShowPhoton(!showPhoton)} variant="outline" size="sm">{showPhoton ? "Hide" : "Show"} Photon</Button>
          </div>
        </CollapsibleControls>
        <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
          <h3 className="font-semibold">{series.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{series.description}</p>
          <p className="mt-2 text-xs">
            <span className="font-medium text-foreground">Region:</span>{" "}
            <span className="text-muted-foreground">{series.region}</span>
          </p>
        </div>
        <MeaningPanel
          title="Hydrogen spectral lines & the Rydberg formula"
          meaning="When an electron drops from a higher energy level (nâ‚‚) to a lower one (nâ‚), it emits a photon of specific wavelength. Each series corresponds to a fixed final level nâ‚."
          points={[
            "1/Î» = R(1/nâ‚Â² âˆ’ 1/nâ‚‚Â²) â€” Rydberg formula (R = 1.097 Ã— 10â· mâ»Â¹)",
            "Lyman (nâ‚=1): UV â€¢ Balmer (nâ‚=2): visible â€¢ Paschen (nâ‚=3): IR",
            "Brackett (nâ‚=4), Pfund (nâ‚=5), Humphreys (nâ‚=6): far infrared",
            "Balmer series produces the 4 visible lines: HÎ± (red), HÎ² (cyan), HÎ³ (blue), HÎ´ (violet)",
            "These discrete lines proved energy levels are quantized â€” the birth of quantum theory",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   4. Modern Periodic Table â€” 3D Element Blocks
   ============================================================ */

type ElementDef = {
  symbol: string;
  name: string;
  number: number;
  category: string;
  color: number;
};

const ELEMENTS: ElementDef[] = [
  { symbol: "H", name: "Hydrogen", number: 1, category: "Nonmetal", color: 0x22d3ee },
  { symbol: "He", name: "Helium", number: 2, category: "Noble Gas", color: 0x8b5cf6 },
  { symbol: "Li", name: "Lithium", number: 3, category: "Alkali Metal", color: 0xef4444 },
  { symbol: "Be", name: "Beryllium", number: 4, category: "Alkaline Earth", color: 0xf97316 },
  { symbol: "B", name: "Boron", number: 5, category: "Metalloid", color: 0x84cc16 },
  { symbol: "C", name: "Carbon", number: 6, category: "Nonmetal", color: 0x22d3ee },
  { symbol: "N", name: "Nitrogen", number: 7, category: "Nonmetal", color: 0x22d3ee },
  { symbol: "O", name: "Oxygen", number: 8, category: "Nonmetal", color: 0x22d3ee },
  { symbol: "F", name: "Fluorine", number: 9, category: "Halogen", color: 0x22c55e },
  { symbol: "Ne", name: "Neon", number: 10, category: "Noble Gas", color: 0x8b5cf6 },
  { symbol: "Na", name: "Sodium", number: 11, category: "Alkali Metal", color: 0xef4444 },
  { symbol: "Mg", name: "Magnesium", number: 12, category: "Alkaline Earth", color: 0xf97316 },
  { symbol: "Al", name: "Aluminium", number: 13, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "Si", name: "Silicon", number: 14, category: "Metalloid", color: 0x84cc16 },
  { symbol: "P", name: "Phosphorus", number: 15, category: "Nonmetal", color: 0x22d3ee },
  { symbol: "S", name: "Sulfur", number: 16, category: "Nonmetal", color: 0x22d3ee },
  { symbol: "Cl", name: "Chlorine", number: 17, category: "Halogen", color: 0x22c55e },
  { symbol: "Ar", name: "Argon", number: 18, category: "Noble Gas", color: 0x8b5cf6 },
  { symbol: "K", name: "Potassium", number: 19, category: "Alkali Metal", color: 0xef4444 },
  { symbol: "Ca", name: "Calcium", number: 20, category: "Alkaline Earth", color: 0xf97316 },
  { symbol: "Sc", name: "Scandium", number: 21, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Ti", name: "Titanium", number: 22, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "V", name: "Vanadium", number: 23, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Cr", name: "Chromium", number: 24, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Mn", name: "Manganese", number: 25, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Fe", name: "Iron", number: 26, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Co", name: "Cobalt", number: 27, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Ni", name: "Nickel", number: 28, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Cu", name: "Copper", number: 29, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Zn", name: "Zinc", number: 30, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Ga", name: "Gallium", number: 31, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "Ge", name: "Germanium", number: 32, category: "Metalloid", color: 0x84cc16 },
  { symbol: "As", name: "Arsenic", number: 33, category: "Metalloid", color: 0x84cc16 },
  { symbol: "Se", name: "Selenium", number: 34, category: "Nonmetal", color: 0x22d3ee },
  { symbol: "Br", name: "Bromine", number: 35, category: "Halogen", color: 0x22c55e },
  { symbol: "Kr", name: "Krypton", number: 36, category: "Noble Gas", color: 0x8b5cf6 },
  { symbol: "Rb", name: "Rubidium", number: 37, category: "Alkali Metal", color: 0xef4444 },
  { symbol: "Sr", name: "Strontium", number: 38, category: "Alkaline Earth", color: 0xf97316 },
  { symbol: "Y", name: "Yttrium", number: 39, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Zr", name: "Zirconium", number: 40, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Nb", name: "Niobium", number: 41, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Mo", name: "Molybdenum", number: 42, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Tc", name: "Technetium", number: 43, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Ru", name: "Ruthenium", number: 44, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Rh", name: "Rhodium", number: 45, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Pd", name: "Palladium", number: 46, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Ag", name: "Silver", number: 47, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Cd", name: "Cadmium", number: 48, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "In", name: "Indium", number: 49, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "Sn", name: "Tin", number: 50, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "Sb", name: "Antimony", number: 51, category: "Metalloid", color: 0x84cc16 },
  { symbol: "Te", name: "Tellurium", number: 52, category: "Metalloid", color: 0x84cc16 },
  { symbol: "I", name: "Iodine", number: 53, category: "Halogen", color: 0x22c55e },
  { symbol: "Xe", name: "Xenon", number: 54, category: "Noble Gas", color: 0x8b5cf6 },
  { symbol: "Cs", name: "Caesium", number: 55, category: "Alkali Metal", color: 0xef4444 },
  { symbol: "Ba", name: "Barium", number: 56, category: "Alkaline Earth", color: 0xf97316 },
  { symbol: "La", name: "Lanthanum", number: 57, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Ce", name: "Cerium", number: 58, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Pr", name: "Praseodymium", number: 59, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Nd", name: "Neodymium", number: 60, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Pm", name: "Promethium", number: 61, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Sm", name: "Samarium", number: 62, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Eu", name: "Europium", number: 63, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Gd", name: "Gadolinium", number: 64, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Tb", name: "Terbium", number: 65, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Dy", name: "Dysprosium", number: 66, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Ho", name: "Holmium", number: 67, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Er", name: "Erbium", number: 68, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Tm", name: "Thulium", number: 69, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Yb", name: "Ytterbium", number: 70, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Lu", name: "Lutetium", number: 71, category: "Lanthanide", color: 0xa855f7 },
  { symbol: "Hf", name: "Hafnium", number: 72, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Ta", name: "Tantalum", number: 73, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "W", name: "Tungsten", number: 74, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Re", name: "Rhenium", number: 75, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Os", name: "Osmium", number: 76, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Ir", name: "Iridium", number: 77, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Pt", name: "Platinum", number: 78, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Au", name: "Gold", number: 79, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Hg", name: "Mercury", number: 80, category: "Transition Metal", color: 0x3b82f6 },
  { symbol: "Tl", name: "Thallium", number: 81, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "Pb", name: "Lead", number: 82, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "Bi", name: "Bismuth", number: 83, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "Po", name: "Polonium", number: 84, category: "Post-transition", color: 0x06b6d4 },
  { symbol: "At", name: "Astatine", number: 85, category: "Halogen", color: 0x22c55e },
  { symbol: "Rn", name: "Radon", number: 86, category: "Noble Gas", color: 0x8b5cf6 },
  { symbol: "Fr", name: "Francium", number: 87, category: "Alkali Metal", color: 0xef4444 },
  { symbol: "Ra", name: "Radium", number: 88, category: "Alkaline Earth", color: 0xf97316 },
  { symbol: "Ac", name: "Actinium", number: 89, category: "Actinide", color: 0xec4899 },
  { symbol: "Th", name: "Thorium", number: 90, category: "Actinide", color: 0xec4899 },
  { symbol: "Pa", name: "Protactinium", number: 91, category: "Actinide", color: 0xec4899 },
  { symbol: "U", name: "Uranium", number: 92, category: "Actinide", color: 0xec4899 },
  { symbol: "Np", name: "Neptunium", number: 93, category: "Actinide", color: 0xec4899 },
  { symbol: "Pu", name: "Plutonium", number: 94, category: "Actinide", color: 0xec4899 },
  { symbol: "Am", name: "Americium", number: 95, category: "Actinide", color: 0xec4899 },
  { symbol: "Cm", name: "Curium", number: 96, category: "Actinide", color: 0xec4899 },
  { symbol: "Bk", name: "Berkelium", number: 97, category: "Actinide", color: 0xec4899 },
  { symbol: "Cf", name: "Californium", number: 98, category: "Actinide", color: 0xec4899 },
  { symbol: "Es", name: "Einsteinium", number: 99, category: "Actinide", color: 0xec4899 },
  { symbol: "Fm", name: "Fermium", number: 100, category: "Actinide", color: 0xec4899 },
  { symbol: "Md", name: "Mendelevium", number: 101, category: "Actinide", color: 0xec4899 },
  { symbol: "No", name: "Nobelium", number: 102, category: "Actinide", color: 0xec4899 },
  { symbol: "Lr", name: "Lawrencium", number: 103, category: "Actinide", color: 0xec4899 },
];

// Periodic table layout: [period][group] -> element number (0 = empty)
const PERIODIC_LAYOUT: number[][] = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
  [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  [87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
];

// Lanthanides (period 6, below main table)
const LANTHANIDE_NUMBERS = [58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
// Actinides (period 7, below main table)
const ACTINIDE_NUMBERS = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103];

function PeriodicTable3D() {
  const [selectedElement, setSelectedElement] = useState<ElementDef | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 14, 22);
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
        controls.autoRotateSpeed = 0.6;
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dir = new THREE.DirectionalLight(0xffffff, 1.2);
        dir.position.set(10, 20, 15);
        scene.add(dir);

        const group = new THREE.Group();
        scene.add(group);

        const elementMeshes: { mesh: THREE.Mesh; element: ElementDef }[] = [];
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function createElementBlock(element: ElementDef, x: number, y: number, z: number) {
          const geo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
          const mat = new THREE.MeshStandardMaterial({
            color: element.color,
            roughness: 0.3,
            metalness: 0.3,
            emissive: element.color,
            emissiveIntensity: 0.15,
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(x, y, z);
          mesh.userData = { element };
          group.add(mesh);
          elementMeshes.push({ mesh, element });
        }

        // Main table
        PERIODIC_LAYOUT.forEach((row, period) => {
          row.forEach((num, groupIdx) => {
            if (num === 0) return;
            const element = ELEMENTS.find((e) => e.number === num);
            if (!element) return;
            const x = groupIdx - 8.5;
            const y = 3.5 - period;
            createElementBlock(element, x, y, 0);
          });
        });

        // Lanthanides row
        LANTHANIDE_NUMBERS.forEach((num, i) => {
          const element = ELEMENTS.find((e) => e.number === num);
          if (!element) return;
          const x = i - 6.5;
          createElementBlock(element, x, -4.5, 0);
        });

        // Actinides row
        ACTINIDE_NUMBERS.forEach((num, i) => {
          const element = ELEMENTS.find((e) => e.number === num);
          if (!element) return;
          const x = i - 6.5;
          createElementBlock(element, x, -5.5, 0);
        });

        // Labels for periods
        const labelMat = new THREE.MeshBasicMaterial({ color: 0x64748b });
        for (let p = 0; p < 7; p++) {
          const labelGeo = new THREE.SphereGeometry(0.15, 8, 8);
          const label = new THREE.Mesh(labelGeo, labelMat);
          label.position.set(-10, 3.5 - p, 0);
          group.add(label);
        }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function getIntersections(event: MouseEvent) {
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          return raycaster.intersectObjects(elementMeshes.map((e) => e.mesh), false);
        }

        renderer.domElement.addEventListener("pointermove", (event: MouseEvent) => {
          const hits = getIntersections(event);
          if (hits.length > 0) {
            renderer.domElement.style.cursor = "pointer";
            const element = hits[0].object.userData.element as ElementDef;
            setSelectedElement(element);
          } else {
            renderer.domElement.style.cursor = "grab";
          }
        });

        renderer.domElement.addEventListener("click", (event: MouseEvent) => {
          const hits = getIntersections(event);
          if (hits.length > 0) {
            const element = hits[0].object.userData.element as ElementDef;
            setSelectedElement(element);
          }
        });

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
  }, [autoRotate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Modern Periodic Table</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate â€¢ Scroll to zoom â€¢ Hover/click elements</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="View Options">
          <Button
            variant={autoRotate ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Auto-rotate: ON" : "Auto-rotate: OFF"}
          </Button>
        </CollapsibleControls>

        <div ref={containerRef} className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg border border-border bg-slate-950" />

        <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
          {selectedElement ? (
            <>
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded text-xs font-bold text-white"
                  style={{ backgroundColor: `#${selectedElement.color.toString(16).padStart(6, "0")}` }}
                >
                  {selectedElement.symbol}
                </span>
                <h3 className="font-semibold">{selectedElement.name}</h3>
                <span className="text-xs text-muted-foreground">Atomic #{selectedElement.number}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Category: {selectedElement.category}</p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              Hover or click any element block in the 3D periodic table to see its name, atomic number, and category.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { label: "Alkali Metal", color: 0xef4444 },
            { label: "Alkaline Earth", color: 0xf97316 },
            { label: "Transition Metal", color: 0x3b82f6 },
            { label: "Post-transition", color: 0x06b6d4 },
            { label: "Metalloid", color: 0x84cc16 },
            { label: "Nonmetal", color: 0x22d3ee },
            { label: "Halogen", color: 0x22c55e },
            { label: "Noble Gas", color: 0x8b5cf6 },
            { label: "Lanthanide", color: 0xa855f7 },
            { label: "Actinide", color: 0xec4899 },
          ].map((cat) => (
            <span key={cat.label} className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: `#${cat.color.toString(16).padStart(6, "0")}` }} />
              {cat.label}
            </span>
          ))}
        </div>

        <MeaningPanel
          title="The Modern Periodic Table"
          meaning="Elements are arranged by increasing atomic number (protons). Elements in the same column (group) have similar chemical properties because they share the same number of valence electrons."
          points={[
            "Groups (columns): same valence electrons â†’ similar reactivity",
            "Periods (rows): same number of electron shells",
            "Metals (left) â†’ metalloids (staircase) â†’ nonmetals (right)",
            "Noble gases (group 18) are stable and unreactive",
            "Lanthanides & actinides (f-block) are placed below the main table",
            "Mendeleev (1869) first organized elements; Moseley (1913) ordered them by atomic number",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Export â€” Quantum 3D Lab
   ============================================================ */

export function Quantum3D() {
  return (
    <Tabs defaultValue="rutherford" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="rutherford">Rutherford Model</TabsTrigger>
        <TabsTrigger value="heisenberg">Heisenberg</TabsTrigger>
        <TabsTrigger value="spectral">Spectral Series</TabsTrigger>
        <TabsTrigger value="periodic">Periodic Table</TabsTrigger>
      </TabsList>
      <TabsContent value="rutherford" className="mt-4">
        <RutherfordModel />
      </TabsContent>
      <TabsContent value="heisenberg" className="mt-4">
        <HeisenbergUncertainty />
      </TabsContent>
      <TabsContent value="spectral" className="mt-4">
        <HydrogenSpectralSeries />
      </TabsContent>
      <TabsContent value="periodic" className="mt-4">
        <PeriodicTable3D />
      </TabsContent>
    </Tabs>
  );
}