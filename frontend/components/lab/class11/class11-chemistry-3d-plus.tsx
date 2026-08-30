"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
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

// ---------------------------------------------------------------------------
// 1. Bohr atom — quantised orbits with photon emission on jumps
// ---------------------------------------------------------------------------
function BohrAtomLab() {
  const [element, setElement] = useState<"H" | "He+" | "Li2+">("H");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(0, 6, 12), autoRotate: true, autoRotateSpeed: 0.4, grid: false });
        unbind = bindResize(ts);
        const Z = element === "H" ? 1 : element === "He+" ? 2 : 3;

        // nucleus
        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.7 }));
        ts.group.add(nucleus);

        // orbits r ∝ n²/Z (scaled)
        const orbitRadii = [1.6, 3.4, 5.8];
        const orbitColors = [0x22d3ee, 0x22c55e, 0xf59e0b];
        orbitRadii.forEach((r, i) => {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 8, 90), new THREE.MeshBasicMaterial({ color: orbitColors[i], transparent: true, opacity: 0.55 }));
          ring.rotation.x = Math.PI / 2;
          ts!.group.add(ring);

          // energy level label
          const E = (-13.6 * Z * Z) / ((i + 1) * (i + 1));
          const lbl = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeLabel(`n=${i + 1}  ${E.toFixed(1)} eV`), transparent: true }));
          lbl.scale.set(2.6, 0.55, 1);
          lbl.position.set(r + 1.15, 0, 0);
          ts!.group.add(lbl);
        });

        // electrons on n=1 and n=2
        const e1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0x60a5fa }));
        const e2 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0xa78bfa }));
        ts.group.add(e1);
        ts.group.add(e2);

        titleText(ts, `${element}: rₙ ∝ n²/Z · Eₙ = −13.6 Z²/n² eV`, new THREE.Vector3(0, 4.4, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          e1.position.set(Math.cos(t * 2.4) * orbitRadii[0], 0, Math.sin(t * 2.4) * orbitRadii[0]);
          e2.position.set(Math.cos(-t * 1.1 + 2) * orbitRadii[1], 0, Math.sin(-t * 1.1 + 2) * orbitRadii[1]);
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
  }, [element]);

  return (
    <SimCard title="⚛️ Atomic Structure — Bohr Model">
      <CollapsibleControls label="Hydrogen-like ion">
        <div className="space-y-1">
          <Label>Species</Label>
          <Select value={element} onValueChange={(v) => setElement(v as typeof element)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="H">H (Z = 1)</SelectItem>
              <SelectItem value="He+">He⁺ (Z = 2)</SelectItem>
              <SelectItem value="Li2+">Li²⁺ (Z = 3)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Higher Z pulls orbits inward and deepens energy levels — exactly what the rₙ and Eₙ formulas predict.</p>
    </SimCard>
  );
}

function makeLabel(text: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "bold 44px sans-serif";
  ctx.fillStyle = "#7dd3fc";
  ctx.textAlign = "center";
  ctx.fillText(text, 256, 78);
  return new THREE.CanvasTexture(canvas);
}
// ---------------------------------------------------------------------------
// 2. Periodic trends — 3D bar chart across a period
// ---------------------------------------------------------------------------
function PeriodicTrendsLab() {
  const [trend, setTrend] = useState<"radius" | "ionisation">("radius");
  const containerRef = useRef<HTMLDivElement>(null);

  // period 3: Na Mg Al Si P S Cl Ar
  const elements = ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"];
  const radii = [186, 160, 143, 118, 110, 104, 99, 71];       // pm
  const ionisation = [496, 738, 578, 787, 1012, 1000, 1251, 1521]; // kJ/mol

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(10, 9, 12), autoRotate: true, autoRotateSpeed: 0.45 });
        unbind = bindResize(ts);
        const data = trend === "radius" ? radii : ionisation;
        const maxV = Math.max(...data);
        const colorA = new THREE.Color(0x3b82f6);
        const colorB = new THREE.Color(0xf43f5e);

        for (let i = 0; i < elements.length; i++) {
          const h = (data[i] / maxV) * 4 + 0.3;
          const col = colorA.clone().lerp(colorB, i / (elements.length - 1));
          const bar = new THREE.Mesh(new THREE.BoxGeometry(1, h, 1), new THREE.MeshStandardMaterial({ color: col.getHex(), emissive: col.getHex(), emissiveIntensity: 0.15 }));
          bar.position.set((i - (elements.length - 1) / 2) * 1.6, h / 2, 0);
          ts.group.add(bar);

          const lbl = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeLabel(elements[i]), transparent: true }));
          lbl.scale.set(1.2, 0.35, 1);
          lbl.position.set((i - (elements.length - 1) / 2) * 1.6, h + 0.45, 0);
          ts.group.add(lbl);
        }
        titleText(ts, trend === "radius" ? "Atomic radius ↓ across period 3 (pm)" : "Ionisation energy ↑ across period 3 (kJ/mol)", new THREE.Vector3(0, 5.2, 0));

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
  }, [trend]);

  return (
    <SimCard title="📊 Periodic Table — Trends Across Period 3">
      <CollapsibleControls label="Trend">
        <div className="space-y-1">
          <Label>Property</Label>
          <Select value={trend} onValueChange={(v) => setTrend(v as typeof trend)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="radius">Atomic radius</SelectItem>
              <SelectItem value="ionisation">Ionisation energy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Across a period nuclear charge rises while shells stay the same — atoms shrink and hold electrons more tightly.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 3. NaCl ionic lattice — alternating Na⁺ / Cl⁻ in a cubic arrangement
// ---------------------------------------------------------------------------
function IonicLatticeLab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(7, 6, 9), autoRotate: true, autoRotateSpeed: 0.5 });
        unbind = bindResize(ts);
        const a = 1.4; // ion spacing

        for (let x = -2; x <= 2; x++) {
          for (let y = -2; y <= 2; y++) {
            for (let z = -2; z <= 2; z++) {
              const isNa = (x + y + z) % 2 === 0;
              const s = new THREE.Mesh(
                new THREE.SphereGeometry(isNa ? 0.32 : 0.42, 20, 20),
                new THREE.MeshStandardMaterial({ color: isNa ? 0xf59e0b : 0x22d3ee })
              );
              s.position.set(x * a, y * a, z * a);
              ts.group.add(s);
            }
          }
        }
        titleText(ts, "NaCl — each Na⁺ touches 6 Cl⁻ (octahedral)", new THREE.Vector3(0, 3.8, 0));

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
    <SimCard title="🧂 Chemical Bonding — NaCl Ionic Crystal">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Gold = Na⁺, cyan = Cl⁻. Electrostatic attraction in all directions gives ionic solids their high melting points and brittle cleavage.</p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 4. Hybridisation — sp / sp² / sp³ orbital geometries
// ---------------------------------------------------------------------------
function HybridisationLab() {
  const [type, setType] = useState<"sp" | "sp2" | "sp3">("sp3");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(5, 5, 8), autoRotate: true, autoRotateSpeed: 0.55 });
        unbind = bindResize(ts);

        const central = new THREE.Mesh(new THREE.SphereGeometry(0.55, 28, 28), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
        ts.group.add(central);

        const dirs: Record<string, THREE.Vector3[]> = {
          sp: [new THREE.Vector3(1, 0.35, 0).normalize(), new THREE.Vector3(-1, 0.35, 0).normalize()],
          sp2: [new THREE.Vector3(1, 0, 0), new THREE.Vector3(-0.5, 0, 0.87), new THREE.Vector3(-0.5, 0, -0.87)],
          sp3: [
            new THREE.Vector3(1, 1, 1).normalize(),
            new THREE.Vector3(-1, -1, 1).normalize(),
            new THREE.Vector3(-1, 1, -1).normalize(),
            new THREE.Vector3(1, -1, -1).normalize(),
          ],
        };
        const angleLabel: Record<string, string> = { sp: "180°", sp2: "120°", sp3: "109.5°" };

        for (const d of dirs[type]) {
          const pos = d.clone().multiplyScalar(2.2);
          const h = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 20), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
          h.position.copy(pos);
          ts.group.add(h);

          const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, pos.length(), 10), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          bond.position.copy(pos).multiplyScalar(0.5);
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
          ts.group.add(bond);
        }

        titleText(ts, `${type}-hybridised — ${angleLabel[type]} (${type === "sp2" ? "C₂H₄" : type === "sp3" ? "CH₄" : "C₂H₂"})`, new THREE.Vector3(0, 3.2, 0));

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
  }, [type]);

  return (
    <SimCard title="🔷 Chemical Bonding — Hybridisation Shapes">
      <CollapsibleControls label="Hybridisation">
        <div className="space-y-1">
          <Label>Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sp">sp — linear (180°)</SelectItem>
              <SelectItem value="sp2">sp² — trigonal planar (120°)</SelectItem>
              <SelectItem value="sp3">sp³ — tetrahedral (109.5°)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Mixing one s with p orbitals gives equivalent hybrids whose geometry minimises electron-pair repulsion.</p>
    </SimCard>
  );
}

export function Class11Chemistry3DPlus() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">⚗️ Class 11 Chemistry — Extended 3D Suite</h2>
      <p className="text-sm text-muted-foreground">Bohr atom models, periodic trends, ionic crystals and hybridisation geometries from the NEB syllabus.</p>
      <Tabs defaultValue="bohr" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="bohr">Bohr Atom</TabsTrigger>
          <TabsTrigger value="trends">Periodic Trends</TabsTrigger>
          <TabsTrigger value="nacl">NaCl Lattice</TabsTrigger>
          <TabsTrigger value="hybrid">Hybridisation</TabsTrigger>
        </TabsList>
        <TabsContent value="bohr" className="mt-4"><BohrAtomLab /></TabsContent>
        <TabsContent value="trends" className="mt-4"><PeriodicTrendsLab /></TabsContent>
        <TabsContent value="nacl" className="mt-4"><IonicLatticeLab /></TabsContent>
        <TabsContent value="hybrid" className="mt-4"><HybridisationLab /></TabsContent>
      </Tabs>
    </div>
  );
}