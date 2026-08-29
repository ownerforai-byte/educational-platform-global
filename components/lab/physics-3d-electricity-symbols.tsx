"use client";

/**
 * SYMBOLS AT THEIR EXACT PLACE — Physics · Electricity & Magnetism.
 * Ohm's-law circuit (V, I, R, P) and the field-around-a-wire + force-on-wire
 * (I, B, r, F = BIL) render their symbols inside the 3D scene where they act,
 * with the same LabelDef[] reused below the canvas.
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { createThreeScene, bindResize, disposeThreeScene, standardMaterial, titleText } from "@/components/lab/three-scene";
import { createLabelSystem, LabelDef, SceneArea, GuidePanel } from "@/components/lab/label3d";

/* ================================================================
   EXPERIMENT 1 · OHM'S LAW CIRCUIT (V, I, R, ammeter, voltmeter, P)
   ================================================================ */

function OhmsCircuit3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [V, setV] = useState(12);   // volts
  const [R, setR] = useState(4);    // ohms

  const I = V / R;                  // amps
  const P = V * I;                  // watts
  const defs: LabelDef[] = [
    { x: -1.4, y: 0.7, z: 0, symbol: "V", name: "Voltage across", desc: "E.M.F. of the cell driving current; kept constant across the resistor.", color: "#ef4444" },
    { x: 1.2, y: 0.9, z: 0, symbol: "I", name: "Current", desc: "Same everywhere in series; I = V/R =" + I.toFixed(2) + "A.", color: "#38bdf8" },
    { x: 2.0, y: -1.0, z: 0, symbol: "R", name: "Resistance", desc: "Opposes current; voltage across it is exactly V.", color: "#fb923c" },
    { x: 0, y: 1.6, z: 0, symbol: "ε", name: "E.M.F. source", desc: "The battery; ideal ε = V when internal resistance is negligible.", color: "#a78bfa" },
    { x: 0, y: -1.8, z: 0, symbol: "P = V·I", name: "Power dissipated", desc: "Energy rate as heat, live value " + P.toFixed(1) + " W.", color: "#fbbf24" },
  ];

  const [ammeter, setAmmeter] = useState(4);
  const [voltmeter, setVoltmeter] = useState(-4);

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    let charge: THREE.Mesh | null = null;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(0, 3.2, 11), autoRotate: false, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Ohm's Law Circuit", new THREE.Vector3(0, 3.1, 0));

        const wireMat = standardMaterial(0x94a3b8, { metalness: 0.5 });
        const seg = (a: THREE.Vector3, b: THREE.Vector3, r = 0.06) => {
          const v = b.clone().sub(a);
          const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, v.length(), 8), wireMat);
          m.position.copy(a).add(v.clone().multiplyScalar(0.5));
          m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
          ts!.group.add(m);
        };
        seg(new THREE.Vector3(-3, 1.5, 0), new THREE.Vector3(3.4, 1.5, 0));
        seg(new THREE.Vector3(3.4, 1.5, 0), new THREE.Vector3(3.4, -1.5, 0));
        seg(new THREE.Vector3(3.4, -1.5, 0), new THREE.Vector3(0, -1.5, 0));
        seg(new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(-3, -1.5, 0));
        seg(new THREE.Vector3(-3, -1.5, 0), new THREE.Vector3(-3, 1.5, 0));

        const battery = new THREE.Group();
        const cell = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.8), standardMaterial(0xa78bfa, { emissive: 0xa78bfa, emissiveIntensity: 0.4 }));
        battery.add(cell);
        const pt1 = new THREE.Mesh(new THREE.BoxGeometry(0.13, 1.2, 0.5), standardMaterial(0xef4444, { metalness: 0.6 }));
        pt1.position.x = 0.52; battery.add(pt1);
        const pt2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.5), standardMaterial(0x334155, { metalness: 0.6 }));
        pt2.position.x = -0.53; battery.add(pt2);
        battery.position.set(-3, 0, 0);
        ts.group.add(battery);

        const resMat = standardMaterial(0xfb923c, { emissive: 0xfb923c, emissiveIntensity: 0.5 });
        for (let i = 0; i < 8; i++) {
          const z = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.07, 0.08), resMat);
          z.position.set(1.1 + i * 0.42, 1.5 - (i % 2 === 0 ? 0 : 0.05), 0);
          ts.group.add(z);
        }

        const meter = (col: number) => {
          const g = new THREE.Group();
          const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.16, 24), standardMaterial(0x334155));
          g.add(base);
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 10, 24), standardMaterial(col, { metalness: 0.4 }));
          g.add(ring);
          const needle = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.03), standardMaterial(0xf8fafc));
          needle.position.y = 0.1; g.add(needle);
          return g;
        };
        const am = meter(0x38bdf8); am.position.set(1.6, -2.0, 0); ts.group.add(am);   // ammeter (series)
        const vm = meter(0x22c55e); vm.position.set(1.7, 2.15, 0); ts.group.add(vm);  // voltmeter (parallel)

        charge = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), standardMaterial(0x38bdf8, { emissive: 0x38bdf8, emissiveIntensity: 0.9 }));
        ts.group.add(charge);

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        sys.add({ x: 1.5, y: -2.0, z: 0, symbol: "A", name: "Ammeter", desc: "Series meter; reads I = " + I.toFixed(2) + " A.", color: "#38bdf8" });
        sys.add({ x: 1.7, y: 2.15, z: 0, symbol: "V", name: "Voltmeter", desc: "Parallel (across R); reads V = " + V.toFixed(1) + " V.", color: "#22c55e" });

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          const u = (t * 0.5) % 1;
          // travel around the rectangle loop: 4 edges
          const s = u * 8; // 0..8 perimeter units
          let cx = 0, cy = 0;
          if (s < 2) { cx = -3 + 6.4 * (s / 2); cy = 1.5; }
          else if (s < 4) { cx = 3.4; cy = 1.5 - 3 * ((s - 2) / 2); }
          else if (s < 6) { cx = 3.4 - 6.4 * ((s - 4) / 2); cy = -1.5; }
          else { cx = -3; cy = -1.5 + 3 * ((s - 6) / 2); }
          if (charge) charge.position.set(cx, cy, 0);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("ohm", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, V, R]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>⚡ Ohm&apos;s Law Circuit — symbols at their exact places</CardTitle>
        <CardDescription>ε, V, I, R with the ammeter (series) and voltmeter (parallel); the blue dot shows charge moving around the loop.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="blue dot = I · ammeter in series, voltmeter in parallel" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>E.M.F. ε ({V} V)</Label><Slider min={3} max={24} step={1} value={[V]} onValueChange={(v) => setV(v[0])} /></div>
          <div><Label>Resistance R ({R} Ω)</Label><Slider min={1} max={20} step={1} value={[R]} onValueChange={(v) => setR(v[0])} /></div>
        </div>
        <span className="text-sm text-muted-foreground">Current I = {I.toFixed(2)} A · Power P = {P.toFixed(1)} W</span>
        <GuidePanel title="Circuit guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Ohm&apos;s law — theory"
          vocabulary="E.M.F. ε (J/C) — energy per unit charge; Current I (A); Resistance R (Ω)."
          look="Ammeter IN SERIES (I passes through it), voltmeter IN PARALLEL (reads V across the resistors) — the two meter positions shown."
          predict="Raise ε at fixed R and both I and P rise linearly; raise R at fixed ε and I, P fall on the inverse line."
          principle={<span className="block font-mono text-[11px] text-foreground">V = IR · P = VI = I²R = V²/R</span>}
          why="Wire gauging, fuse ratings and appliance power all reduce to these three letters in one loop."
        />
      </CardContent>
    </Card>
  );
}

/* ================================================================
   EXPERIMENT 2 · FORCE ON A CURRENT-CARRYING WIRE (B, I, L, F = BIL)
   ================================================================ */

function WireForce3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [webgl] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [B, setB] = useState(0.8);
  const [I, setI] = useState(4);
  const [Lcm, setLcm] = useState(15);

  const L = Lcm / 100;
  const F = B * I * L;

  const defs: LabelDef[] = [
    { x: -1.1, y: 2.5, z: 0, symbol: "B", name: "Magnetic field", desc: "Flux density " + B.toFixed(1) + " T pointing from the N pole to the S pole.", color: "#3b82f6" },
    { x: 0, y: 1.1, z: 2.7, symbol: "I", name: "Current in wire", desc: I + " A flowing along the wire (here: toward you, +z).", color: "#fbbf24" },
    { x: 0, y: 3.0, z: 0, symbol: "F = B·I·L", name: "Magnetic force", desc: "= " + F.toFixed(2) + " N straight UP — Fleming's left-hand rule.", color: "#ef4444" },
    { x: 0, y: 0.35, z: 0, symbol: "L", name: "Length inside field", desc: "Only the " + Lcm + " cm of wire between the poles feels the force.", color: "#22c55e" },
    { x: -3.6, y: 3.6, z: 0, symbol: "FLH", name: "Fleming's left hand", desc: "First finger = B, seCond = I, thuMb = F (all mutually ⊥).", color: "#a78bfa" },
  ];

  useEffect(() => {
    const el = mount.current;
    if (!el || !webgl) return;
    let ts: any = null;
    let unbind: (() => void) | null = null;
    let sys: any = null;
    let cancelled = false;
    let fArrow: THREE.ArrowHelper | null = null;

    async function init() {
      try {
        ts = createThreeScene(el!, { cameraPosition: new THREE.Vector3(1.5, 4, 10), autoRotate: false, background: 0x0b1220 });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Force on a Current-Carrying Wire", new THREE.Vector3(0, 4.6, 0));

        /* horseshoe magnet: N (red), S (blue), yoke on top */
        const poleN = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.9, 1.5), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.25 }));
        poleN.position.set(-1.7, 1.1, 0); ts.group.add(poleN);
        const poleS = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.9, 1.5), standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.25 }));
        poleS.position.set(1.7, 1.1, 0); ts.group.add(poleS);
        const yoke = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.5, 1.5), standardMaterial(0x64748b, { metalness: 0.5 }));
        yoke.position.set(0, 2.3, 0); ts.group.add(yoke);
        const nLbl = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.05), standardMaterial(0xf8fafc));
        nLbl.position.set(-1.7, 1.1, 0.78); ts.group.add(nLbl);

        /* the wire passes between the poles along z */
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 4.6, 10), standardMaterial(0xd97706, { metalness: 0.7 }));
        wire.rotation.x = Math.PI / 2;
        wire.position.set(0, 1.1, 0);
        ts.group.add(wire);

        /* B arrows: N → S (along +x) at three depths */
        const mkB = (z: number) => ts!.group.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1.15, 1.1, z), 2.3, 0x3b82f6, 0.3, 0.17));
        mkB(-1); mkB(0); mkB(1);
        /* I arrow along +z */
        ts.group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 1.1, 1.2), 1.1, 0xfbbf24, 0.3, 0.17));
        /* F arrow up, length scales with force */
        fArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1.1, 0), 0.9 + Math.min(F, 3) * 0.45, 0xef4444, 0.32, 0.18);
        ts.group.add(fArrow);

        sys = await createLabelSystem();
        ts.group.add(sys.group);
        defs.forEach((d) => sys.add(d));

        function animate() {
          if (cancelled || !ts) return;
          requestAnimationFrame(animate);
          const t = performance.now() / 1000;
          if (fArrow) fArrow.setLength(0.9 + Math.min(F, 3) * 0.45 + Math.sin(t * 4) * 0.05, 0.32, 0.18);
          sys.render(ts.scene, ts.camera);
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (e) { console.error("wireforce", e); }
    }
    init();
    return () => { cancelled = true; unbind?.(); if (sys) try { sys.dispose(); } catch {}; if (ts) try { disposeThreeScene(ts); } catch {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webgl, B, I, Lcm]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🧲 Force on a Wire — F = B·I·L at exact places</CardTitle>
        <CardDescription>The wire carries I through the field B between the poles; the red arrow is the force F on the L of wire inside the field — Fleming's left hand gives its direction.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <SceneArea mountRef={mount} hint="blue arrows = B (N→S) · yellow = I · red = F (pulse scales with force)" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div><Label>Field B ({B.toFixed(1)} T)</Label><Slider min={0.1} max={2} step={0.1} value={[B]} onValueChange={(v) => setB(v[0])} /></div>
          <div><Label>Current I ({I} A)</Label><Slider min={1} max={10} step={0.5} value={[I]} onValueChange={(v) => setI(v[0])} /></div>
          <div><Label>Length in field L ({Lcm} cm)</Label><Slider min={5} max={30} step={1} value={[Lcm]} onValueChange={(v) => setLcm(v[0])} /></div>
        </div>
        <span className="text-sm text-muted-foreground">F = B·I·L = {F.toFixed(2)} N — double any one input and F doubles (linear in all three).</span>
        <GuidePanel title="Wire-force guide — symbol · position · description" defs={defs} />
        <TheoryPanel
          title="Motor effect — theory"
          vocabulary="Flux density B (T); Motor effect force F = BIL for a ⊥ wire; Fleming's left-hand rule for directions."
          look="B leaves N (blue arrows), I runs along the wire (yellow), and F (red) jumps up — rotate your left hand: first finger B, second finger I, thumb F."
          predict="Zero any of B, I, L and the force vanishes; reverse I (or swap the poles) and F flips downward."
          principle={<span className="block font-mono text-[11px] text-foreground">F = B·I·L·sinθ (θ = angle between wire and B; here 90° so sinθ = 1)</span>}
          why="This single line is the heart of every electric motor, loudspeaker and railgun — the force that turns current into motion."
        />
      </CardContent>
    </Card>
  );
}

export default function ElectricitySymbols() {
  return (
    <Tabs defaultValue="ohm" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="ohm">Ohm&apos;s Law</TabsTrigger>
        <TabsTrigger value="wireforce">Force on Wire (F = BIL)</TabsTrigger>
      </TabsList>
      <TabsContent value="ohm" className="mt-4"><OhmsCircuit3D /></TabsContent>
      <TabsContent value="wireforce" className="mt-4"><WireForce3D /></TabsContent>
    </Tabs>
  );
}