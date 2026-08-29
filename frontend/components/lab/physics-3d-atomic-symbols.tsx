"use client";

/**
 * SYMBOLS AT THEIR EXACT PLACE — Physics · Atomic & Quantum.
 * The Bohr model labels n, rₙ, Eₙ and the photon hν at their exact places,
 * showing how an electron jumps between allowed orbits.
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createThreeScene, bindResize, disposeThreeScene, standardMaterial, titleText } from "@/components/lab/three-scene";
import { createLabelSystem, LabelDef, SceneArea, GuidePanel } from "@/components/lab/label3d";

function BohrAtom3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [n, setN] = useState(2);
  const [Z, setZ] = useState(1);

  const r1 = 1.4 * Z; // first Bohr radius (scene units)
  const rN = r1 * n * n;
  const EN = -(13.6 * Z * Z) / (n * n);
  const r1m = 0.529e-10; // m
  const rNm = r1m * n * n / Z; // metres

  const defs: LabelDef[] = [
    { x: 0, y: 0, z: 0, symbol: "+Ze", name: "Nucleus", desc: "Contains Z protons; much heavier than orbiting electrons.", color: "#ef4444" },
    { x: rN + 1.1, y: 0.4, z: 0, symbol: "rₙ = r₁·n²", name: "Orbit radius", desc: "Allowed radii scale as n²; only these discrete orbits are stable.", color: "#22d3ee" },
    { x: r1 + 0.5, y: 1.4, z: 0, symbol: "n = " + n, name: "Principal quantum number", desc: "Integer shell index; bigger n ⇒ bigger rₙ, higher (less negative) Eₙ.", color: "#38bdf8" },
    { x: -1.5, y: 3.2, z: 0, symbol: "Eₙ = −13.6Z²/n²", name: "Energy level", desc: "Energy " + EN.toFixed(2) + " eV · quantized, not continuous.", color: "#fbbf24" },
    { x: 0, y: 4.4, z: 0, symbol: "hν = E₂ − E₁", name: "Photon", desc: "A photon of exactly the level gap is absorbed or emitted in a jump.", color: "#a78bfa" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    let electron: THREE.Mesh | null = null;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 6, 13), autoRotate: true, autoRotateSpeed: 0.5, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Bohr Model of the Atom", new THREE.Vector3(0, 5.4, 0));

        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.7 }));
        ts.group.add(nucleus);

        const orbits = new THREE.Group();
        for (let m = 1; m <= 4; m++) {
          const rad = r1 * m * m;
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(rad, 0.03, 8, 96),
            m === n ? standardMaterial(0x22d3ee, { emissive: 0x22d3ee, emissiveIntensity: 0.5 }) : standardMaterial(0x334155)
          );
          ring.rotation.x = Math.PI / 2;
          ring.position.y = 0;
          orbits.add(ring);
        }
        orbits.rotation.x = 0.55;
        ts.group.add(orbits);

        electron = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.9 }));
        electron.position.set(rN, 0, 0);
        ts.group.add(electron);

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const a = t * 1.4;
          if (electron) electron.position.set(Math.cos(a) * rN, Math.sin(a) * rN, 0);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("bohr", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, n, Z]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>⚛️ Bohr Atom — symbols at their exact places</CardTitle>
        <CardDescription>+Ze, rₙ = r₁n², n, Eₙ and the photon hν are labelled where they act; the allowed discrete orbits light up for your chosen n.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="electron orbits the chosen shell · only blue ring is the active n" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Shell n ({n})</Label><Slider min={1} max={6} step={1} value={[n]} onValueChange={(v) => setN(v[0])} /></div>
          <div><Label>Atomic number Z ({Z})</Label><Slider min={1} max={8} step={1} value={[Z]} onValueChange={(v) => setZ(v[0])} /></div>
        </div>
        <span className="text-sm text-muted-foreground">rₙ = {(rNm * 1e10).toFixed(2)} × 10⁻¹⁰ m · Eₙ = {EN.toFixed(2)} eV</span>
        <GuidePanel title="Bohr guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Bohr model — theory"
          vocabulary="Principal quantum number n; Bohr radius r₁ = 0.529 Å; Energy Eₙ = −13.6Z²/n² (eV); Photon hν = ΔE."
          look="Only the shell matching n glows blue — the electron can live on ANY allowed ring, but never half-way between two of them."
          predict="Raise n: the orbit ring jumps outward (r ~ n²) and the energy level climbs toward zero (less negative). Raise Z: everything tightens and E drops sharply."
          principle={<span className="block font-mono text-[11px] text-foreground">rₙ = n²r₁/Z · Eₙ = −13.6Z²/n² eV · ΔE = hν on a jump</span>}
          why="Leads the way to a Total series descriptions — spectrum lines (Balmer) are just the hν = E₂−E₁ differences you read on this energy ladder."
        />
      </CardContent>
    </Card>
  );
}

/* ================================================================
   EXPERIMENT 2 · PHOTOELECTRIC EFFECT (hν, φ, e⁻, KEmax, λ₀)
   ================================================================ */

const METAL_PHI = [
  { name: "Caesium", phi: 2.1 },
  { name: "Sodium", phi: 2.28 },
  { name: "Zinc", phi: 4.3 },
  { name: "Copper", phi: 4.65 },
] as const;

function Photoelectric3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [lambdaNm, setLambdaNm] = useState(400);
  const [metalIdx, setMetalIdx] = useState(0);

  const metal = METAL_PHI[metalIdx];
  const E = 1240 / lambdaNm;
  const emit = E > metal.phi;
  const KE = emit ? E - metal.phi : 0;
  const lambda0 = 1240 / metal.phi;

  const photonColor = lambdaNm < 450 ? 0x8b5cf6 : lambdaNm < 550 ? 0x22c55e : lambdaNm < 600 ? 0xfbbf24 : 0xf87171;

  const defs: LabelDef[] = [
    { x: -4.7, y: 1.9, z: 0, symbol: "hν", name: "Photon energy", desc: "E = 1240/λ = " + E.toFixed(2) + " eV for λ = " + lambdaNm + " nm.", color: "#fbbf24" },
    { x: -2.2, y: 2.15, z: 0, symbol: "φ", name: "Work function", desc: "Minimum energy to free an electron: " + metal.phi + " eV (" + metal.name + ").", color: "#ef4444" },
    { x: 0.6, y: 1.5, z: 0, symbol: "e⁻", name: "Photoelectron", desc: emit ? "Ejected! KEmax = " + KE.toFixed(2) + " eV carries it to the collector." : "NOT emitted — E ≤ φ, however bright the light.", color: emit ? "#22d3ee" : "#94a3b8" },
    { x: 2.7, y: -2.0, z: 0, symbol: "KEmax = hν − φ", name: "Max kinetic energy", desc: emit ? "= " + KE.toFixed(2) + " eV — extra energy beyond φ becomes motion." : "= 0 — no emission below threshold.", color: "#22c55e" },
    { x: -4.9, y: -2.0, z: 0, symbol: "λ₀ = 1240/φ", name: "Threshold wavelength", desc: "= " + lambda0.toFixed(0) + " nm — only λ shorter than this can eject electrons.", color: "#a78bfa" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    const photons: { mesh: THREE.Mesh; u: number }[] = [];
    const electrons: { mesh: THREE.Mesh; y: number; z: number; x: number }[] = [];

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(1, 3.6, 11), autoRotate: false, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Photoelectric Effect", new THREE.Vector3(1.2, 3.9, 0));

        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.4, 1.7), standardMaterial(0x94a3b8, { metalness: 0.8, roughness: 0.3 }));
        plate.position.set(-2.2, 0, 0);
        ts.group.add(plate);
        const collector = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.4, 1.7), standardMaterial(0x334155, { metalness: 0.6 }));
        collector.position.set(5.2, 0, 0);
        ts.group.add(collector);
        /* battery / meter hint between plates */
        ts.group.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.95, -1.9, 0), new THREE.Vector3(5.05, -1.9, 0)]),
          new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.2, gapSize: 0.15 })
        ));

        for (let i = 0; i < 5; i++) {
          const p = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), standardMaterial(photonColor, { emissive: photonColor, emissiveIntensity: 1 }));
          p.position.set(-7 + i * 1.1, 0.6 + (i % 3) * 0.5 - 0.5, (i % 2 === 0 ? 0.3 : -0.3));
          photons.push({ mesh: p, u: i / 5 });
          ts.group.add(p);
        }
        for (let i = 0; i < 6; i++) {
          const e = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), standardMaterial(0x22d3ee, { emissive: 0x22d3ee, emissiveIntensity: 0.9 }));
          e.visible = false;
          electrons.push({ mesh: e, y: 0, z: 0, x: -1.9 });
          ts.group.add(e);
        }

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          photons.forEach((p, i) => {
            p.u = (p.u + 0.006) % 1;
            p.mesh.position.set(-7 + p.u * 4.7, 0.6 + (i % 3) * 0.5 - 0.5, i % 2 === 0 ? 0.3 : -0.3);
            (p.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(photonColor);
            (p.mesh.material as THREE.MeshStandardMaterial).color.setHex(photonColor);
          });
          electrons.forEach((e, i) => {
            if (!emit) { e.mesh.visible = false; return; }
            e.mesh.visible = true;
            const sp = 0.03 + Math.min(KE, 3) * 0.03;
            e.x += sp;
            if (e.x > 5.1) { e.x = -1.9; e.y = 1.3 * Math.sin(i * 2.1 + t); e.z = (i % 3 - 1) * 0.4; }
            if (e.x <= -1.89) { e.y = 1.3 * Math.sin(i * 2.1 + t); e.z = (i % 3 - 1) * 0.4; }
            e.mesh.position.set(e.x, e.y, e.z);
          });
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("photo", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, lambdaNm, metalIdx]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>💡 Photoelectric Effect — hν, φ, KEmax at exact places</CardTitle>
        <CardDescription>Photons of colour-matched wavelength hit the metal plate; if hν &gt; φ electrons eject with KEmax = hν − φ — intensity never matters below threshold.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="coloured dots = photons (colour = wavelength) · cyan = photoelectrons" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Wavelength λ ({lambdaNm} nm)</Label><Slider min={200} max={700} step={5} value={[lambdaNm]} onValueChange={(v) => setLambdaNm(v[0])} /></div>
          <div>
            <Label>Metal (φ)</Label>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {METAL_PHI.map((mm, i) => (
                <Button key={mm.name} size="sm" variant={i === metalIdx ? "default" : "outline"} onClick={() => setMetalIdx(i)}>{mm.name}</Button>
              ))}
            </div>
          </div>
        </div>
        <span className={`text-sm font-medium ${emit ? "text-emerald-600" : "text-red-500"}`}>
          {emit
            ? `Emission ✓ — E = ${E.toFixed(2)} eV > φ = ${metal.phi} eV → KEmax = ${KE.toFixed(2)} eV`
            : `No emission ✗ — E = ${E.toFixed(2)} eV ≤ φ = ${metal.phi} eV (raise λ down / pick a lower-φ metal)`}
        </span>
        <GuidePanel title="Photoelectric guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Photoelectric effect — theory"
          vocabulary="Photon E = hν = 1240/λ (eV·nm); Work function φ — energy to free an electron; Stopping potential eVs = KEmax."
          look="Each photon is absorbed by ONE electron — brighter light means more photons (more current), but only SHORTER wavelength makes them leave faster."
          predict="Slide λ below λ₀ and electrons suddenly appear; push λ shorter still and the cyan electrons fly faster (KEmax grows linearly with 1/λ)."
          principle={<span className="block font-mono text-[11px] text-foreground">hν = φ + KEmax · KEmax = 1240/λ − φ · emission requires λ ≤ λ₀ = 1240/φ</span>}
          why="This effect forced physics to accept light quanta — the paper that earned Einstein the Nobel prize and the operating principle of solar cells and night-vision sensors."
        />
      </CardContent>
    </Card>
  );
}

export default function AtomicSymbols() {
  return (
    <Tabs defaultValue="bohr" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="bohr">Bohr Atom</TabsTrigger>
        <TabsTrigger value="photo">Photoelectric</TabsTrigger>
      </TabsList>
      <TabsContent value="bohr" className="mt-4"><BohrAtom3D /></TabsContent>
      <TabsContent value="photo" className="mt-4"><Photoelectric3D /></TabsContent>
    </Tabs>
  );
}