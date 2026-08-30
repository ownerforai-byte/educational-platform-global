"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
// 1. Projectile motion — live trajectory, range & height markers
// ---------------------------------------------------------------------------
function ProjectileLab() {
  const [velocity, setVelocity] = useState("20");
  const [angle, setAngle] = useState("45");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(14, 8, 16), autoRotate: true, autoRotateSpeed: 0.4 });
        unbind = bindResize(ts);

        const u = Math.max(1, num(velocity, 20));
        const deg = (Math.min(89, Math.max(1, num(angle, 45))) * Math.PI) / 180;
        const g = 9.8;
        const T = (2 * u * Math.sin(deg)) / g;
        const H = (u * u * Math.sin(deg) * Math.sin(deg)) / (2 * g);
        const R = (u * u * Math.sin(2 * deg)) / g;

        // ground grid strip
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 12), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
        ground.rotation.x = -Math.PI / 2;
        ts.group.add(ground);

        // trajectory curve
        const pts: THREE.Vector3[] = [];
        const steps = 90;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * T;
          pts.push(new THREE.Vector3(u * Math.cos(deg) * t, u * Math.sin(deg) * t - 0.5 * g * t * t, 0));
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        ts.group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.08, 8, false), new THREE.MeshStandardMaterial({ color: 0x22d3ee })));

        // peak marker
        const peakPos = pts[Math.floor(steps / 2)];
        const peak = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.4 }));
        peak.position.copy(peakPos);
        ts.group.add(peak);

        // animated ball along the path
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.35 }));
        ts.group.add(ball);

        // launcher barrel
        const barrelLen = 1.6;
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, barrelLen, 16), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 }));
        barrel.position.set(Math.cos(deg) * barrelLen / 2, Math.sin(deg) * barrelLen / 2, 0);
        barrel.rotation.z = deg - Math.PI / 2;
        ts.group.add(barrel);

        titleText(ts, `R = ${R.toFixed(1)} m · H = ${H.toFixed(1)} m · T = ${T.toFixed(2)} s`, new THREE.Vector3(R / 2 + 2, 4.5, 0));

        let t = 0;
        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          t += 0.02;
          const tt = t % T;
          ball.position.set(
            u * Math.cos(deg) * tt,
            Math.max(0.35, u * Math.sin(deg) * tt - 0.5 * g * tt * tt),
            0
          );
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
  }, [velocity, angle]);

  return (
    <SimCard title="🎯 Kinematics — Projectile Motion">
      <CollapsibleControls label="Launch settings">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1"><Label>Initial speed u (m/s)</Label><Input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} /></div>
          <div className="space-y-1"><Label>Angle θ (degrees)</Label><Input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} /></div>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Range R = u²sin2θ/g is maximum at θ = 45°; complementary angles give the same range.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 2. Inclined plane & friction — force vectors on a slope
// ---------------------------------------------------------------------------
function InclinedPlaneLab() {
  const [angleDeg, setAngleDeg] = useState("30");
  const [mu, setMu] = useState("0.3");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(9, 7, 11), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);
        const theta = (Math.min(60, Math.max(5, num(angleDeg, 30))) * Math.PI) / 180;
        const muVal = Math.max(0, num(mu, 0.3));

        // incline wedge
        const L = 8;
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(L * Math.cos(theta), 0);
        shape.lineTo(0, L * Math.sin(theta));
        shape.lineTo(0, 0);
        const wedgeGeo = new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: false });
        const wedge = new THREE.Mesh(wedgeGeo, new THREE.MeshStandardMaterial({ color: 0x334155 }));
        wedge.position.set(-L * Math.cos(theta) / 2, -L * Math.sin(theta) / 2, -2);
        ts.group.add(wedge);

        // block resting on the slope surface
        const slideDir = new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0);
        const block = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.25 }));
        block.position.copy(slideDir).multiplyScalar(L * 0.35).add(new THREE.Vector3(0, 0.55 / Math.cos(theta), 0));
        block.rotation.z = theta;
        ts.group.add(block);

        // force vectors: weight (vertical), normal (⊥ surface), friction (up-slope)
        const weightLen = 3.2;
        ts.group.add(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), block.position.clone(), weightLen, 0xef4444, 0.45, 0.28));
        const normalDir = new THREE.Vector3(-Math.sin(theta), Math.cos(theta), 0);
        ts.group.add(new THREE.ArrowHelper(normalDir, block.position.clone(), weightLen * Math.cos(theta), 0x22c55e, 0.45, 0.28));
        const frictionMag = muVal * weightLen * Math.cos(theta);
        if (frictionMag > 0.15) {
          ts.group.add(new THREE.ArrowHelper(slideDir.clone().negate(), block.position.clone().add(new THREE.Vector3(0, 0.9, 0)), Math.min(3, frictionMag), 0x38bdf8, 0.4, 0.25));
        }
        titleText(ts, "mg sinθ drives motion · μmg cosθ opposes it", new THREE.Vector3(0, 4.6, 0));
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
  }, [angleDeg, mu]);

  return (
    <SimCard title="🧱 Dynamics — Block on an Inclined Plane">
      <CollapsibleControls label="Slope & friction">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1"><Label>Incline angle θ (degrees)</Label><Input type="number" value={angleDeg} onChange={(e) => setAngleDeg(e.target.value)} /></div>
          <div className="space-y-1"><Label>Coefficient of friction μ</Label><Input type="number" step="0.05" min="0" value={mu} onChange={(e) => setMu(e.target.value)} /></div>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Red = weight mg · Green = normal reaction N = mg cos θ · Blue = friction μN. The block slides when tan θ &gt; μ.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 3. Conservation of mechanical energy — roller-coaster track
// ---------------------------------------------------------------------------
function EnergyCoaster() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(12, 7, 14), autoRotate: true, autoRotateSpeed: 0.4 });
        unbind = bindResize(ts);

        // track profile: high start → dips and hills, flattening out
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 140; i++) {
          const t = i / 140;
          const x = -10 + t * 20;
          const y = Math.max(0.4, 3.4 * Math.cos(t * Math.PI) ** 2 + 1.2 * Math.sin(t * Math.PI * 3) ** 2 * (1 - t));
          pts.push(new THREE.Vector3(x, y, 0));
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        ts.group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 200, 0.12, 8, false), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.5 })));

        for (let i = 10; i < 140; i += 16) {
          const p = pts[i];
          const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, p.y, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          pillar.position.set(p.x, p.y / 2, 0);
          ts.group.add(pillar);
        }

        const cart = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xbe123c, emissiveIntensity: 0.3 }));
        ts.group.add(cart);

        // energy meters — sphere size shows the KE/PE split
        const keBall = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x16a34a, emissiveIntensity: 0.4 }));
        const peBall = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x2563eb, emissiveIntensity: 0.4 }));
        ts.group.add(keBall);
        ts.group.add(peBall);

        titleText(ts, "Green = Kinetic Energy · Blue = Potential Energy", new THREE.Vector3(0, 5.4, 0));

        let t = 0;
        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          t += 0.0035;
          const u = t % 1;
          const pos = curve.getPointAt(u);
          cart.position.copy(pos);

          const yMax = 4.6;
          const peFrac = Math.min(1, Math.max(0, pos.y / yMax));
          peBall.position.set(-13, 1 + peFrac * 3, 0);
          keBall.position.set(-13, 1, 0);
          peBall.scale.setScalar(0.5 + peFrac * 1.6);
          keBall.scale.setScalar(0.5 + (1 - peFrac) * 1.6);

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
    <SimCard title="🎢 Work, Energy & Power — Conservation Track">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Ignoring friction, KE + PE stays constant: at the top PE is maximum (big blue ball); in the dips KE takes over (big green ball).</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 4. Thermal expansion — rod grows with temperature
// ---------------------------------------------------------------------------
function ThermalExpansionLab() {
  const [tempC, setTempC] = useState("100");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(8, 4, 11), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);
        const T = Math.max(0, num(tempC, 100));
        const alpha = 1.7e-5; // steel-like coefficient
        const L0 = 6;

        const wall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.2, 2.4), new THREE.MeshStandardMaterial({ color: 0x334155 }));
        wall.position.set(-L0 / 2 - 0.3, 0, 0);
        ts.group.add(wall);

        // rod — visual growth exaggerated ×400 for visibility
        const visualGrowth = L0 * alpha * T * 400 * 0.001;
        const rod = new THREE.Mesh(new THREE.BoxGeometry(L0 + visualGrowth, 0.7, 0.7), new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xb45309, emissiveIntensity: Math.min(0.8, T / 300) }));
        ts.group.add(rod);

        // burner flame under the rod
        const flame = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.6, 20), new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: Math.min(0.75, T / 250) }));
        flame.rotation.x = Math.PI;
        flame.position.set(0, -1.6, 0);
        ts.group.add(flame);

        titleText(ts, `ΔL = L₀αΔT → ${(L0 * alpha * T).toFixed(5)} m (exaggerated)`, new THREE.Vector3(0, 2.6, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          flame.scale.y = 1 + Math.sin(performance.now() / 180) * 0.15;
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
  }, [tempC]);

  return (
    <SimCard title="🌡️ Heat — Thermal Expansion of a Rod">
      <CollapsibleControls label="Temperature">
        <div className="space-y-1"><Label>Temperature rise ΔT (°C)</Label><Input type="number" min="0" value={tempC} onChange={(e) => setTempC(e.target.value)} /></div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">ΔL = L₀αΔT. Real expansions are tiny (mm scale), so the animation exaggerates them — the glow shows the rod heating up.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 5. Spherical mirror optics — concave mirror ray diagram in 3D
// ---------------------------------------------------------------------------
function MirrorOpticsLab() {
  const [objDist, setObjDist] = useState("30");
  const [focalLen, setFocalLen] = useState("10");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(0, 4, 16), autoRotate: true, autoRotateSpeed: 0.4 });
        unbind = bindResize(ts);

        const f = Math.max(2, num(focalLen, 10));
        const u = Math.max(f + 0.5, num(objDist, 30)); // object outside focus
        const v = (u * f) / (u - f);                    // mirror formula 1/f = 1/v + 1/u
        const m = -v / u;
        const scale = 0.25;                             // world units per cm

        // principal axis
        const axis = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 24, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
        axis.rotation.z = Math.PI / 2;
        ts.group.add(axis);

        // concave mirror arc at x = 0 (opening toward +x)
        const arcPts: THREE.Vector3[] = [];
        for (let i = -60; i <= 60; i += 4) {
          const y = (i / 60) * 4;
          arcPts.push(new THREE.Vector3((y * y) / (4 * f), y, 0));
        }
        const arcCurve = new THREE.CatmullRomCurve3(arcPts);
        ts.group.add(new THREE.Mesh(new THREE.TubeGeometry(arcCurve, 60, 0.14, 8, false), new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.7 })));

        // object arrow (upright, left of the mirror)
        const objX = -u * scale;
        const objH = 1.2;
        ts.group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(objX, 0, 0), objH, 0x22c55e, 0.35, 0.22));

        // image arrow — real images are inverted and on the same side
        const imgX = -v * scale;
        const imgH = Math.min(6, Math.abs(m) * objH);
        if (Number.isFinite(imgX)) {
          const dir = m < 0 ? new THREE.Vector3(0, -1, 0) : new THREE.Vector3(0, 1, 0);
          ts.group.add(new THREE.ArrowHelper(dir, new THREE.Vector3(imgX, 0, 0), imgH, 0xef4444, 0.35, 0.22));
        }

        // focal point marker at F
        const fp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
        fp.position.set(-f * scale, 0, 0);
        ts.group.add(fp);
// construction rays from the object tip
        const tipY = objH;
        const rayMat = new THREE.LineBasicMaterial({ color: 0xf59e0b });
        // ray 1: parallel to axis → reflects through F → continues to image tip
        const r1 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(objX, tipY, 0),
          new THREE.Vector3(0, tipY, 0),
          new THREE.Vector3(-f * scale, 0, 0),
          Number.isFinite(imgX) ? new THREE.Vector3(imgX, -Math.sign(m) * imgH * 0.9, 0) : new THREE.Vector3(objX - 6, tipY, 0),
        ]);
        ts.group.add(new THREE.Line(r1, rayMat));
        // ray 2: through centre of curvature C (at 2f) → reflects back on itself
        const r2 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(objX, tipY, 0),
          new THREE.Vector3(-2 * f * scale, 0, 0).add(new THREE.Vector3(0, 0.001, 0)),
        ]);
        const r2line = new THREE.Line(r2, new THREE.LineDashedMaterial({ color: 0xa78bfa, dashSize: 0.25, gapSize: 0.15 }));
        r2line.computeLineDistances();
        ts.group.add(r2line);

        titleText(ts, `u = ${u.toFixed(0)} cm · f = ${f.toFixed(0)} cm ⇒ v = ${v.toFixed(1)} cm · m = ${m.toFixed(2)}`, new THREE.Vector3(0, 4.8, 0));

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
  }, [objDist, focalLen]);

  return (
    <SimCard title="🪞 Optics — Concave Mirror Ray Diagram">
      <CollapsibleControls label="Mirror setup (cm)">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1"><Label>Object distance u</Label><Input type="number" min="2" value={objDist} onChange={(e) => setObjDist(e.target.value)} /></div>
          <div className="space-y-1"><Label>Focal length f</Label><Input type="number" min="1" value={focalLen} onChange={(e) => setFocalLen(e.target.value)} /></div>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Green arrow = object, red arrow = image, gold dot = focus F. Move the object toward F to see the image grow; beyond C it shrinks and inverts.</p>
    </SimCard>
  );
}

export function Class11Physics3DPlus() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">🧲 Class 11 Physics — Extended 3D Suite</h2>
      <p className="text-sm text-muted-foreground">Interactive 3D sims for the remaining NEB units: projectile motion, friction on slopes, energy conservation, thermal expansion and mirror optics.</p>
      <Tabs defaultValue="projectile" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="projectile">Projectile</TabsTrigger>
          <TabsTrigger value="incline">Incline & Friction</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="expansion">Thermal Expansion</TabsTrigger>
          <TabsTrigger value="mirror">Mirror Optics</TabsTrigger>
        </TabsList>
        <TabsContent value="projectile" className="mt-4"><ProjectileLab /></TabsContent>
        <TabsContent value="incline" className="mt-4"><InclinedPlaneLab /></TabsContent>
        <TabsContent value="energy" className="mt-4"><EnergyCoaster /></TabsContent>
        <TabsContent value="expansion" className="mt-4"><ThermalExpansionLab /></TabsContent>
        <TabsContent value="mirror" className="mt-4"><MirrorOpticsLab /></TabsContent>
      </Tabs>
    </div>
  );
}