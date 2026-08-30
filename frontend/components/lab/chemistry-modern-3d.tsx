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

function Pane({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</Label>
      {children}
    </div>
  );
}
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

// ---------------------------------------------------------------------------
// 1. Molecular dynamics - bond vibration, rotation, reaction
// ---------------------------------------------------------------------------
function MolecularDynamics() {
  const [mode, setMode] = useState<"vibration" | "rotation" | "torsion">("vibration");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(7, 5, 9), autoRotate: true, autoRotateSpeed: 0.6 });
        unbind = bindResize(ts);

        const grp = new THREE.Group();
        ts.group.add(grp);
        const bondLen = 2.4;
        const springMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const spring = new THREE.Mesh(new THREE.BoxGeometry(bondLen, 0.14, 0.14), springMat);
        grp.add(spring);

        const atomA = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.3 }));
        atomA.position.set(-bondLen / 2, 0, 0);
        grp.add(atomA);
        const atomB = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x2563eb, emissiveIntensity: 0.3 }));
        atomB.position.set(bondLen / 2, 0, 0);
        grp.add(atomB);

        // methyl rotor attached to atom A (for torsion demo)
        const rotor = new THREE.Group();
        grp.add(rotor);
        const hColor = 0xf8fafc;
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2;
          const h = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), new THREE.MeshStandardMaterial({ color: hColor }));
          h.position.set(0, Math.cos(a) * 0.7, Math.sin(a) * 0.7);
          const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
          stick.position.set(-0.35, Math.cos(a) * 0.35, Math.sin(a) * 0.35);
          stick.lookAt(0, 0, 0);
          rotor.add(h);
          rotor.add(stick);
        }
        rotor.position.set(-bondLen / 2, 0, 0);
        rotor.rotation.y = Math.PI / 2;
        // axis arrow for torsion reference
        const axis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 3.6, 0x64748b, 0.3, 0.2);
        grp.add(axis);

        const vib = { t: 0 };
        const glowPhase = { t: 0 };
        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          vib.t += 0.02;
          glowPhase.t += 0.04;
          const s = Math.sin(vib.t * 3) * 0.3; // bond stretch
          spring.scale.set(1 + s, 1, 1);
          atomB.position.x = (bondLen / 2) * (1 + s);
          rotor.rotation.z = vib.t; // torsional rotation about C-C bond
          if (mode === "vibration") grp.rotation.y = 0.15;
          else if (mode === "rotation") grp.rotation.y = vib.t * 0.7;
          else grp.rotation.z = 0;
          // Pulse atom glow
          const pulseA = 0.3 + Math.sin(glowPhase.t) * 0.15;
          const pulseB = 0.3 + Math.sin(glowPhase.t + Math.PI) * 0.15;
          (atomA.material as THREE.MeshStandardMaterial).emissiveIntensity = pulseA;
          (atomB.material as THREE.MeshStandardMaterial).emissiveIntensity = pulseB;
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
        }
        animate();
        titleText(ts, "Molecular dynamics — vibration, rotation, torsion", new THREE.Vector3(0, 3.4, 0));
      } catch { /* 3D unavailable */ }
    }
    load();
    return () => {
      cancelled = true;
      unbind?.();
      if (ts) disposeThreeScene(ts);
    };
  }, [mode]);

  return (
    <SimCard title="🔬 Chemistry — Molecular Dynamics">
      <CollapsibleControls label="Motion type">
        <div className="space-y-1">
          <Label>Mode</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="vibration">Bond vibration</SelectItem>
              <SelectItem value="rotation">Whole-molecule rotation</SelectItem>
              <SelectItem value="torsion">Torsional rotation (C–C)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D molecular dynamics" />
      <p className="text-xs text-muted-foreground">
        Molecules stretch, vibrate, and twist at quantized frequencies. IR spectroscopy detects these bond vibrations; torsional rotation about single bonds is nearly free.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 2. Crystallography - FCC / BCC / HCP lattices with Miller indices
// ---------------------------------------------------------------------------
function CrystalLattice() {
  const [lattice, setLattice] = useState<"sc" | "bcc" | "fcc" | "hcp">("fcc");
  const [miller, setMiller] = useState<"100" | "110" | "111">("100");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(9, 7, 9), autoRotate: true, autoRotateSpeed: 0.4 });
        unbind = bindResize(ts);

        const a = 2; // cell parameter
        const atomPos: [number, number, number][] = [];
        const faceColor = 0xef4444, bodyColor = 0x3b82f6, cornerColor = 0xfbbf24;

        if (lattice === "hcp") {
          // two hexagonal layers + interstitials  = simple hexagonal lattice
          for (let layer = 0; layer < 2; layer++) {
            const y = layer * 0.9 - 0.45;
            for (let row = -1; row <= 1; row++) {
              for (let col = -1; col <= 1; col++) {
                const x = (col + (row % 2 ? 0.5 : 0)) * 1.0;
                const z = row * 0.86;
                atomPos.push([x, y, z]);
              }
            }
          }
        } else {
          const dims = lattice === "sc" ? 2 : 2;
          const off = lattice === "sc" ? 0 : 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              for (let z = -1; z <= 1; z++) {
                atomPos.push([x * a, y * a, z * a]);
              }
            }
          }
          if (lattice === "bcc") {
            for (let x = -1; x < 1; x++) for (let y = -1; y < 1; y++) for (let z = -1; z < 1; z++) atomPos.push([(x + 0.5) * a, (y + 0.5) * a, (z + 0.5) * a]);
          } else if (lattice === "fcc") {
            for (const [dx, dy, dz] of [[1, 1, 0], [1, 0, 1], [0, 1, 1]] as [number, number, number][]) {
              for (let x = -1; x < 1; x++) for (let y = -1; y < 1; y++) for (let z = -1; z < 1; z++) {
                atomPos.push([(x + dx / 2) * a, (y + dy / 2) * a, (z + dz / 2) * a]);
              }
            }
          }
        }

        const mat = new THREE.MeshStandardMaterial({ color: cornerColor, metalness: 0.4, roughness: 0.35 });
        for (const [x, y, z] of atomPos) {
          const sph = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), mat);
          sph.position.set(x, y, z);
          ts.group.add(sph);
        }

        // wireframe unit cell box
        const box = new THREE.Mesh(new THREE.BoxGeometry(a, a, a), new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true, transparent: true, opacity: 0.4 }));
        ts.group.add(box);

        // Miller index plane
        const planeGeo = new THREE.PlaneGeometry(6, 6);
        const planeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.28, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.position.set(0, 0, 0);
        if (miller === "100") { plane.rotation.y = Math.PI / 2; plane.position.x = 0; }
        else if (miller === "110") { plane.rotation.y = Math.PI / 4; }
        else { plane.rotation.x = Math.atan(1 / Math.sqrt(2)); plane.rotation.z = Math.PI / 4; }
        ts.group.add(plane);
        titleText(ts, `${lattice.toUpperCase()} lattice — plane (${miller})`, new THREE.Vector3(0, 3.4, 0));

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
  }, [lattice, miller]);

  return (
    <SimCard title="💎 Crystallography — Crystal Lattices & Miller Indices">
      <CollapsibleControls label="Structure">
        <div className="grid gap-3 sm:grid-cols-2">
          <Pane title="Lattice">
            <Select value={lattice} onValueChange={(v) => setLattice(v as typeof lattice)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sc">Simple Cubic</SelectItem>
                <SelectItem value="bcc">Body-Centred (BCC)</SelectItem>
                <SelectItem value="fcc">Face-Centred (FCC)</SelectItem>
                <SelectItem value="hcp">Hexagonal (HCP)</SelectItem>
              </SelectContent>
            </Select>
          </Pane>
          <Pane title="Miller plane">
            <Select value={miller} onValueChange={(v) => setMiller(v as typeof miller)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="100">(100)</SelectItem>
                <SelectItem value="110">(110)</SelectItem>
                <SelectItem value="111">(111)</SelectItem>
              </SelectContent>
            </Select>
          </Pane>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D crystal lattice" />
      <p className="text-xs text-muted-foreground">
        FCC/BCC/HCP are common packing arrangements (close-packed planes slide for ductility). Miller indices (hkl) describe crystal planes that scatter X-rays in diffraction.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 3. Spectroscopy - 3D IR / NMR spectrum + bond vibration
// ---------------------------------------------------------------------------
function Spectroscopy3D() {
  const [spec, setSpec] = useState<"ir" | "nmr">("ir");
  const containerRef = useRef<HTMLDivElement>(null);
  const molGrp = useRef<THREE.Group | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    molGrp.current = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(10, 8, 11), autoRotate: true, autoRotateSpeed: 0.4, grid: false, axes: true });
        unbind = bindResize(ts);

        // axis line
        const axis = new THREE.Mesh(new THREE.BoxGeometry(11, 0.05, 0.05), new THREE.MeshStandardMaterial({ color: 0x64748b }));
        axis.position.set(0, 0, 0);
        ts.group.add(axis);
        // peaks: {x, height, width}
        const irPeaks: [number, number][] = [[-3.5, 0.8], [-1.2, 3.4], [0.2, 2.2], [1.5, 4.0], [3.2, 2.5], [4.2, 1.1]];
        const nmrPeaks: [number, number][] = [[-4.4, 2.0], [-2.0, 1.0], [0.6, 1.5], [2.8, 3.0], [4.0, 1.2]];
        const pk = spec === "ir" ? irPeaks : nmrPeaks;
        const peakColor = spec === "ir" ? 0x22c55e : 0xa78bfa;
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.2, 0.35), new THREE.MeshStandardMaterial({ color: peakColor }));
        for (const [x, h] of pk) {
          const bar = new THREE.Mesh(new THREE.BoxGeometry(0.35, h, 0.35), new THREE.MeshStandardMaterial({ color: peakColor, emissive: peakColor, emissiveIntensity: 0.2 }));
          bar.position.set(x, h / 2, 0);
          ts.group.add(bar);
          // Lorentzian spread lines
          const pos: number[] = [];
          for (let i = -80; i <= 80; i++) {
            const dx = i * 0.02;
            const lw = 1 + dx * dx;
            pos.push(x + dx, h / lw, 0);
          }
          const lineGeo = new THREE.BufferGeometry();
          lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
          ts.group.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: peakColor, transparent: true, opacity: 0.4 })));
        }
        // axis label sprites
        const xLabel = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeCanvasText(spec === "ir" ? "Wavenumber (cm⁻¹) →" : "Chemical shift δ (ppm) →"), transparent: true }));
        xLabel.scale.set(4, 0.7, 1);
        xLabel.position.set(0, -0.9, 0);
        ts.group.add(xLabel);

        // animated diatomic molecule representing vibration
        const mg = new THREE.Group();
        molGrp.current = mg;
        ts.group.add(mg);
        const mA = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 24), new THREE.MeshStandardMaterial({ color: 0xf43f5e }));
        mA.position.set(-1.1, 0, 0);
        mg.add(mA);
        const mB = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 24), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }));
        mB.position.set(1.1, 1.2, 0);
        mg.add(mB);
        const bond = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.12), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
        bond.position.set(0, 0.6, 0);
        mg.add(bond);

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const stretch = Math.sin(t * 2.4) * 0.12;
          mB.position.x = (1.1 + stretch) * 1;
          mB.position.y = 1.2 + Math.sin(t * 2.4) * 0.06;
          bond.scale.set(1 + stretch * 0.9, 1, 1);
          mg.position.x = -8.4;
          mg.position.y = 0.6;
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
  }, [spec]);

  return (
    <SimCard title="📡 Spectroscopy — 3D IR / NMR Spectra">
      <CollapsibleControls label="Type">
        <div className="space-y-1">
          <Label>Spectroscopy</Label>
          <Select value={spec} onValueChange={(v) => setSpec(v as typeof spec)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ir">IR (vibration of bonds)</SelectItem>
              <SelectItem value="nmr">NMR (chemical shift)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D spectrum" />
      <p className="text-xs text-muted-foreground">
        IR peaks reveal functional groups via bond vibrations. NMR peaks reveal the chemical environment of nuclei — their position (chemical shift) maps to δ/ppm.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 4. Reaction mechanisms - SN1 / SN2 step-by-step animation
// ---------------------------------------------------------------------------
function ReactionMechanism() {
  const [reaction, setReaction] = useState<"sn2" | "sn1">("sn2");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(6, 5, 10), autoRotate: true, autoRotateSpeed: 0.3 });
        unbind = bindResize(ts);

        const group = new THREE.Group();
        ts.group.add(group);

        function atom(radius: number, color: number) {
          return new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 24), new THREE.MeshStandardMaterial({ color, roughness: 0.4 }));
        }
        // Substrate: central carbon with R, CH3, H and leaving group X
        const C = atom(0.5, 0x1e293b); group.add(C);
        const LG = atom(0.6, 0x22c55e); LG.position.set(-1.9, 0, 0); group.add(LG);
        const CH3 = atom(0.55, 0x94a3b8); CH3.position.set(0, 1.6, 0); group.add(CH3);
        const HB = atom(0.4, 0xf8fafc); HB.position.set(0, -1.6, 0); group.add(HB);
        const Rg = atom(0.5, 0xa78bfa); Rg.position.set(0, 0, -1.6); group.add(Rg);
        // nucleophile
        const Nu = atom(0.6, 0x38bdf8); Nu.position.set(2.6, 0, 0); group.add(Nu);

        // bonds as cylinders
        function bond(from: THREE.Vector3, to: THREE.Vector3, color = 0x64748b) {
          const dir = to.clone().sub(from);
          const len = dir.length();
          const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, len, 8), new THREE.MeshStandardMaterial({ color }));
          cyl.position.copy(from).add(to).multiplyScalar(0.5);
          cyl.lookAt(to);
          cyl.rotateX(Math.PI / 2);
          group.add(cyl);
        }
        bond(new THREE.Vector3(-0.9, 0, 0), new THREE.Vector3(-1.9, 0, 0));
        bond(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.6, 0));
        bond(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -1.6, 0));
        bond(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1.6));
        // nucleophile arrow
        bond(new THREE.Vector3(2.6, 0, 0), new THREE.Vector3(1.6, 0, 0), 0x38bdf8);

        const progress = { t: 0 };
        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          progress.t += 0.004;
          const p = progress.t % 1;
          if (reaction === "sn2") {
            // backside attack: Nu moves in, LG leaves, inversion
            LG.position.x = -1.9 - p * 1.6;
            const nuX = 2.6 - p * 1.6;
            Nu.position.set(nuX, 0, 0);
            // substituent inversion (Walden): flips to opposite side as Nu arrives
            const flip = p * 0.6;
            group.rotation.z = flip;
            // fine-tune: keep carbon centered by re-adding? skip
          } else {
            // SN1: step 1) LG leaves -> cation; step 2) Nu attacks
            if (p < 0.5) {
              const q = p / 0.5;
              LG.position.x = -1.9 - q * 2.4;
              Nu.position.set(2.6 - q * 0.4, 0, 0);
            } else {
              const q = (p - 0.5) / 0.5;
              LG.position.set(-4.6, 0, 0);
              Nu.position.set(2.6 - q * 2.6, 0, 0);
              // planar cation flatten on water
              CH3.position.y = 1.6 * Math.cos(q * 0);
              HB.position.y = -1.6;
              Rg.position.z = -1.6;
              group.rotation.z = q * 0.5;
            }
          }
          ts!.controls.update();
          ts!.renderer.render(ts!.scene, ts!.camera);
        }
        animate();
        titleText(ts, reaction === "sn2" ? "SN2 — single concerted step" : "SN1 — stepwise via carbon cation", new THREE.Vector3(0, 3.4, 0));
      } catch { /* 3D unavailable */ }
    }
    load();
    return () => {
      cancelled = true;
      unbind?.();
      if (ts) disposeThreeScene(ts);
    };
  }, [reaction]);

  return (
    <SimCard title="⚗️ Reaction Mechanisms — SN1 vs SN2">
      <CollapsibleControls label="Mechanism">
        <div className="space-y-1">
          <Label>Nucleophilic substitution</Label>
          <Select value={reaction} onValueChange={(v) => setReaction(v as typeof reaction)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sn2">SN2 (backside attack)</SelectItem>
              <SelectItem value="sn1">SN1 (via carbocation)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D reaction mechanism" />
      <p className="text-xs text-muted-foreground">
        SN2 proceeds in one concerted step with Walden inversion; SN1 proceeds stepwise through a planar carbocation intermediate (racemization, promotes 3° substrates).
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 5. Biomolecule viewer - DNA double helix with base pairs
// ---------------------------------------------------------------------------
function BiomoleculeViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(10, 6, 8), autoRotate: true, autoRotateSpeed: 0.6 });
        unbind = bindResize(ts);

        const turns = 3.5;
        const height = 6;
        const radius = 1.2;
        const baseColors = [0xf43f5e, 0x38bdf8, 0xf59e0b, 0x22c55e];
        const backboneA: THREE.Mesh[] = [];
        const backboneB: THREE.Mesh[] = [];
        const segments = 180;

        function addBackbone(pts: THREE.Vector3[], color: number) {
          const geo = new THREE.BufferGeometry();
          geo.setFromPoints(pts);
          const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.12, 8, false), new THREE.MeshStandardMaterial({ color }));
          ts!.group.add(tube);
        }

        // build strand points
        const aPts: THREE.Vector3[] = [];
        const bPts: THREE.Vector3[] = [];
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const y = -height / 2 + t * height;
          const angle = t * Math.PI * 2 * turns;
          aPts.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
          bPts.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
        }
        addBackbone(aPts, 0xf97316);
        addBackbone(bPts, 0x0ea5e9);

        // base pair rungs
        const rungCount = 24;
        for (let i = 0; i <= rungCount; i++) {
          const t = i / rungCount;
          const y = -height / 2 + t * height;
          const angle = t * Math.PI * 2 * turns;
          const a = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
          const b = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
          const mid = a.clone().add(b).multiplyScalar(0.5);
          const len = a.distanceTo(b);
          const cy = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, len, 6), new THREE.MeshStandardMaterial({ color: baseColors[i % baseColors.length] }));
          cy.position.copy(mid);
          cy.lookAt(a);
          cy.rotateX(Math.PI / 2);
          ts.group.add(cy);
        }
        titleText(ts, "DNA double helix — antiparallel strands", new THREE.Vector3(0, 4.2, 0));

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
    <SimCard title="🧬 Biomolecule Viewer — DNA Double Helix">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D DNA" />
      <p className="text-xs text-muted-foreground">
        Two antiparallel sugar–phosphate backbones (orange/blue) twist around each other. Base pairs (A–T, G–C) rung the interior via hydrogen bonding, driving the genetic code.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 6. VSEPR theory - geometry predictor with lone pairs
// ---------------------------------------------------------------------------
function VSEPRGeometry() {
  const [shape, setShape] = useState<"linear" | "trigonal" | "tetrahedral" | "tbp" | "octahedral" | "bent" | "pyramidal">("tetrahedral");
  const containerRef = useRef<HTMLDivElement>(null);
  const loneSpheres = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    loneSpheres.current = [];

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(6, 5, 8), autoRotate: true, autoRotateSpeed: 0.6 });
        unbind = bindResize(ts);

        // ligand directions per electron-domain arrangement
        const dirs: Record<string, THREE.Vector3[]> = {
          linear: [new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0)],
          trigonal: [new THREE.Vector3(1, 0, 0), new THREE.Vector3(-0.5, 0, 0.866), new THREE.Vector3(-0.5, 0, -0.866)],
          tetrahedral: [
            new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0.5, 0.5).normalize(),
            new THREE.Vector3(0.4, -1, 0).normalize(), new THREE.Vector3(-0.4, 0.5, -1).normalize(),
          ],
          tbp: [
            new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -0.7, 0.7).normalize(), new THREE.Vector3(0, -0.7, -0.7).normalize(),
          ],
          octahedral: [
            new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0),
            new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1),
          ],
          bent: [new THREE.Vector3(0.9, 0.4, 0).normalize(), new THREE.Vector3(-0.9, 0.4, 0).normalize()],
          pyramidal: [new THREE.Vector3(0.9, -0.4, 0).normalize(), new THREE.Vector3(-0.45, -0.4, 0.78).normalize(), new THREE.Vector3(-0.45, -0.4, -0.78).normalize()],
        };
        const checked = dirs[shape];
        const central = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.3 }));
        ts.group.add(central);
        checked.forEach((d) => {
          const lig = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
          const pos = d.clone().multiplyScalar(2.0);
          lig.position.copy(pos);
          ts!.group.add(lig);
          const len = pos.length();
          const cy = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, len, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
          cy.position.copy(pos).multiplyScalar(0.5);
          cy.lookAt(pos);
          cy.rotateX(Math.PI / 2);
          ts!.group.add(cy);
        });

        // lone pairs as translucent electron-density blobs
        const loneNum = shape === "bent" || shape === "pyramidal" ? 1 : shape === "linear" ? 2 : 0;
        for (let i = 0; i < loneNum; i++) {
          const lp = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.35 }));
          lp.position.set(shape === "linear" ? 2.0 - i * 4.0 : 0, 1.7, 0);
          if (shape !== "linear") lp.position.x = i === 0 ? 0 : 0;
          ts.group.add(lp);
          loneSpheres.current.push(lp);
        }
        titleText(ts, shapeLabel(shape), new THREE.Vector3(0, 3.4, 0));
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
  }, [shape]);

  return (
    <SimCard title="📐 VSEPR — Geometry Predictor with Lone Pairs">
      <CollapsibleControls label="Geometry">
        <div className="space-y-1">
          <Label>Electron geometry</Label>
          <Select value={shape} onValueChange={(v) => setShape(v as typeof shape)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="trigonal">Trigonal planar</SelectItem>
              <SelectItem value="tetrahedral">Tetrahedral</SelectItem>
              <SelectItem value="tbp">Trigonal bipyramidal</SelectItem>
              <SelectItem value="octahedral">Octahedral</SelectItem>
              <SelectItem value="bent">Bent (with lone pair)</SelectItem>
              <SelectItem value="pyramidal">Trigonal pyramidal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D VSEPR" />
      <p className="text-xs text-muted-foreground">
        VSEPR predicts shape from electron-domain count. Lone pairs occupy space and repel more, compressing bond angles (e.g. bent water ~104.5°, pyramidal NH3 ~107°).
      </p>
    </SimCard>
  );
}

function shapeLabel(s: string): string {
  const map: Record<string, string> = {
    linear: "Linear — AX₂", trigonal: "Trigonal planar — AX₃", tetrahedral: "Tetrahedral — AX₄",
    tbp: "Trigonal bipyramidal — AX₅", octahedral: "Octahedral — AX₆", bent: "Bent — AX₂E",
    pyramidal: "Trigonal pyramidal — AX₃E",
  };
  return map[s] ?? s;
}
// ---------------------------------------------------------------------------
// 7. Electrochemistry - 3D galvanic cell with electron flow
// ---------------------------------------------------------------------------
function GalvanicCell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eFlow = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    eFlow.current = [];

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(0, 7, 12), autoRotate: true, autoRotateSpeed: 0.4, grid: false });
        unbind = bindResize(ts);
        const half = 4.5;

        // Two beakers
        function beaker(x: number, solutionColor: number) {
          const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.18, roughness: 0.15 });
          const body = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 3.4, 32, 1, true), glassMat);
          body.position.y = 1.7;
          body.position.x = x;
          ts!.group.add(body);
          const rim = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.15, 8, 40), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
          rim.rotation.x = Math.PI / 2;
          rim.position.set(x, 3.4, 0);
          ts!.group.add(rim);
          const soln = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 2.2, 40), new THREE.MeshStandardMaterial({ color: solutionColor, transparent: true, opacity: 0.5 }));
          soln.position.set(x, 1.3, 0);
          ts!.group.add(soln);
        }
        beaker(-half, 0x22c55e); // ZnSO4
        beaker(half, 0x38bdf8);  // CuSO4

        // Electrode plates
        const zn = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.6, 1.6), new THREE.MeshStandardMaterial({ color: 0xb8b8b8, metalness: 0.8 }));
        zn.position.set(-half, 1.8, 0);
        ts.group.add(zn);
        const cu = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.6, 1.6), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 }));
        cu.position.set(half, 1.8, 0);
        ts.group.add(cu);

        // Labels
        const lZn = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeCanvasText("Zn electrode"), transparent: true }));
        lZn.scale.set(2.6, 0.55, 1); lZn.position.set(-half, 4.5, 1); ts.group.add(lZn);
        const lCu = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeCanvasText("Cu electrode"), transparent: true }));
        lCu.scale.set(2.6, 0.55, 1); lCu.position.set(half, 4.5, 1); ts.group.add(lCu);

        // Salt bridge connecting the two beakers
        const bridge = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(half * 2) - 1, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.6 }));
        bridge.position.set(0, 2.6, 0);
        ts.group.add(bridge);

        // Load bulb between electrodes
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 1 }));
        bulb.position.set(0, 3.4, 0);
        ts.group.add(bulb);
        // wires
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, half * 2, 8), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.8 }));
        wire.rotation.x = Math.PI / 2;
        wire.position.set(0, 3.5, 0);
        ts.group.add(wire);

        // electron flow dots along the wire
        for (let i = 0; i < 8; i++) {
          const e = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
          eFlow.current.push(e);
          ts.group.add(e);
        }
        // ion arrows in salt bridge (cation/anion)
        const anion = new THREE.ArrowHelper(new THREE.Vector3(-0.8, 0, 0), new THREE.Vector3(-2.4, 2.2, 0), 1.4, 0x34d399, 0.3, 0.16);
        ts.group.add(anion);
        const cation = new THREE.ArrowHelper(new THREE.Vector3(0.8, 0, 0), new THREE.Vector3(1.4, 2.2, 0), 1.4, 0xf472b6, 0.3, 0.16);
        ts.group.add(cation);
        titleText(ts, "Galvanic cell — electron flow", new THREE.Vector3(0, 5.8, 0));

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          eFlow.current.forEach((e, i) => {
            const p = (t * 1.2 + i * 0.12) % 1;
            e.position.set(-half + p * (half * 2), 3.5 + Math.sin(i) * 0.06, 0.18);
          });
          bulb.scale.setScalar(1 + Math.sin(t * 8) * 0.08);
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
    <SimCard title="🔋 Electrochemistry — 3D Galvanic Cell">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D galvanic cell" />
      <p className="text-xs text-muted-foreground">
        Zinc oxidizes (anode, -) releasing electrons that flow through the wire to the copper cathode (reduction, +). The salt bridge completes the circuit with ion migration.
      </p>
    </SimCard>
  );
}
// ---------------------------------------------------------------------------
// 8. Thermodynamics - interactive 3D phase diagram
// ---------------------------------------------------------------------------
function PhaseDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marker = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    marker.current = null;

    async function load() {
      try {
        if (!containerRef.current || !isWebGLAvailable()) return;
        ts = createThreeScene(containerRef.current, { cameraPosition: new THREE.Vector3(10, 12, 10), autoRotate: true, autoRotateSpeed: 0.5, grid: false, axes: true });
        unbind = bindResize(ts);

        function curve(points: THREE.Vector3[], color: number) {
          const g = new THREE.BufferGeometry();
          g.setFromPoints(points);
          ts!.group.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color })));
          const pts2D = points.map((p) => new THREE.Vector3(p.x, p.y, 0.4));
          const geo2 = new THREE.BufferGeometry();
          geo2.setFromPoints(pts2D);
          ts!.group.add(new THREE.Line(geo2, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 })));
        }
        const vaporPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 40; i++) {
          const T = 0.3 + (i / 40) * 3.6;
          const P = Math.min(6.4, 0.3 + Math.pow(T, 1.7) * 0.55);
          vaporPts.push(new THREE.Vector3(T, P, 0));
        }
        curve(vaporPts, 0x22c55e);
        const meltPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 20; i++) {
          const P = 4.0 + (i / 20) * 5.5;
          meltPts.push(new THREE.Vector3(2.0, P, 0));
        }
        curve(meltPts, 0xf59e0b);
        const subPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 20; i++) {
          const T = 0.1 + (i / 20) * 1.7;
          const P = 0.15 + (i / 20) * 3.2;
          subPts.push(new THREE.Vector3(T, P, 0));
        }
        curve(subPts, 0x22d3ee);

        function tint(cx: number, cy: number, wx: number, wy: number, color: number) {
          const mesh = new THREE.Mesh(new THREE.PlaneGeometry(wx, wy), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.14, side: THREE.DoubleSide }));
          mesh.rotation.x = -Math.PI / 2;
          mesh.position.set(cx, cy, -0.15);
          ts!.group.add(mesh);
        }
        tint(4.8, 2.4, 6.4, 4.2, 0xef4444);
        tint(1.0, 5.6, 1.8, 5.4, 0xf97316);
        tint(3.2, 5.4, 2.2, 4.2, 0x38bdf8);

        const mk = (tx: string): THREE.Texture => makeCanvasText(tx);
        const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: mk("Solid"), transparent: true })); ls.scale.set(1.8, 0.5, 1); ls.position.set(0.8, 7.2, 0.5); ts.group.add(ls);
        const ll = new THREE.Sprite(new THREE.SpriteMaterial({ map: mk("Liquid"), transparent: true })); ll.scale.set(1.8, 0.5, 1); ll.position.set(3.1, 6.6, 0.5); ts.group.add(ll);
        const lg = new THREE.Sprite(new THREE.SpriteMaterial({ map: mk("Gas / Vapour"), transparent: true })); lg.scale.set(2.4, 0.5, 1); lg.position.set(6.2, 1.4, 0.5); ts.group.add(lg);

        const triple = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        triple.position.set(2.0, 4.0, 0.2); ts.group.add(triple);
        const critical = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        critical.position.set(3.9, 6.4, 0.2); ts.group.add(critical);
        const lt = new THREE.Sprite(new THREE.SpriteMaterial({ map: mk("Triple point"), transparent: true })); lt.scale.set(2.2, 0.5, 1); lt.position.set(2.0, 3.2, 0.6); ts.group.add(lt);
        const lc = new THREE.Sprite(new THREE.SpriteMaterial({ map: mk("Critical point"), transparent: true })); lc.scale.set(2.6, 0.5, 1); lc.position.set(3.9, 7.2, 0.6); ts.group.add(lc);

        const mark = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        mark.position.set(2.0, 4.0, 0.4); ts.group.add(mark); marker.current = mark;

        const axT = new THREE.Sprite(new THREE.SpriteMaterial({ map: mk("Temperature →"), transparent: true })); axT.scale.set(2.6, 0.55, 1); axT.position.set(5, 0.3, 0.6); ts.group.add(axT);
        const axP = new THREE.Sprite(new THREE.SpriteMaterial({ map: mk("Pressure"), transparent: true })); axP.scale.set(2.2, 0.55, 1); axP.position.set(0.2, 5.2, 0.6); ts.group.add(axP);
        titleText(ts, "3D Phase Diagram — P vs T", new THREE.Vector3(5, 10.5, 4));

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
    <SimCard title="🧊⚛️💨 Thermodynamics — 3D Phase Diagram">
      <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D phase diagram" />
      <p className="text-xs text-muted-foreground">
        Phase boundaries (green = vaporization, orange = melting, cyan = sublimation) meet at the <b>triple point</b>. Above the <b>critical point</b> gas and liquid become indistinguishable (supercritical fluid).
      </p>
    </SimCard>
  );
}

export function ChemistryModern3D() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">🧪 Advanced 3D Chemistry Explorers</h2>
      <p className="text-sm text-muted-foreground">
        Deep-dive 3D visualizations covering molecular dynamics, crystallography, spectroscopy, reaction mechanisms, biomolecules, VSEPR, electrochemistry, and phase diagrams.
      </p>
      <Tabs defaultValue="dynamics" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="dynamics">Molecular Dynamics</TabsTrigger>
          <TabsTrigger value="crystal">Crystallography</TabsTrigger>
          <TabsTrigger value="spectro">Spectroscopy</TabsTrigger>
          <TabsTrigger value="mechanism">Reactions</TabsTrigger>
          <TabsTrigger value="bio">Biomolecules</TabsTrigger>
          <TabsTrigger value="vsepr">VSEPR</TabsTrigger>
          <TabsTrigger value="electro">Electrochemistry</TabsTrigger>
          <TabsTrigger value="phase">Phase Diagram</TabsTrigger>
        </TabsList>
        <TabsContent value="dynamics" className="mt-4"><MolecularDynamics /></TabsContent>
        <TabsContent value="crystal" className="mt-4"><CrystalLattice /></TabsContent>
        <TabsContent value="spectro" className="mt-4"><Spectroscopy3D /></TabsContent>
        <TabsContent value="mechanism" className="mt-4"><ReactionMechanism /></TabsContent>
        <TabsContent value="bio" className="mt-4"><BiomoleculeViewer /></TabsContent>
        <TabsContent value="vsepr" className="mt-4"><VSEPRGeometry /></TabsContent>
        <TabsContent value="electro" className="mt-4"><GalvanicCell /></TabsContent>
        <TabsContent value="phase" className="mt-4"><PhaseDiagram /></TabsContent>
      </Tabs>
    </div>
  );
}