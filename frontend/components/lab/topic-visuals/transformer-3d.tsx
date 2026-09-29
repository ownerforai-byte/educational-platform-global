"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import {
  ScenePresets,
  PlaybackBar,
  ReadoutGrid,
  type ScenePreset,
} from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/**
 * Transformer — mutual induction between two coils on a common iron core.
 * Vs/Vp = Ns/Np. NEB Class 12 AC: "Transformer — principle, types, and losses".
 */
export function TransformerVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [nPrimary, setNPrimary] = useState(20);
  const [nSecondary, setNSecondary] = useState(40);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const vPrimary = 230;
  const ratio = nPrimary > 0 ? nSecondary / nPrimary : 0;
  const vSecondary = vPrimary * ratio;
  const kind = ratio > 1.02 ? "Step-up" : ratio < 0.98 ? "Step-down" : "Isolation (1:1)";
  const DEFAULTS = { nPrimary: 20, nSecondary: 40 };
  const presets: ScenePreset[] = [
    { name: "Step-up (Ns > Np)", hint: "More secondary turns — voltage is raised.", apply: () => { setNPrimary(20); setNSecondary(40); setRunId((r) => r + 1); } },
    { name: "Step-down (Ns < Np)", hint: "Fewer secondary turns — voltage is lowered.", apply: () => { setNPrimary(40); setNSecondary(20); setRunId((r) => r + 1); } },
    { name: "Isolation (1:1)", hint: "Equal turns — same voltage, galvanic isolation.", apply: () => { setNPrimary(30); setNSecondary(30); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setNPrimary(DEFAULTS.nPrimary);
    setNSecondary(DEFAULTS.nSecondary);
    setSpeed(1);
    setShowLabels(true);
    setAnimating(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let t = 0;

    const mkSprite = (text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 96;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(4, 4, 504, 88);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, 504, 88);
      ctx.font = "bold 32px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      ctx.fillText(text, 256, 48);
      const tex = new THREE.CanvasTexture(canvas);
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
      s.position.copy(pos);
      s.scale.set(3.0 * scale, 0.56 * scale, 1);
      return s;
    };

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 1.5, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 4;
      controls.maxDistance = 24;
      vizTargetRef.current = {
        controls,
        el: container,
        canvasEl: renderer.domElement,
        setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)),
      };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { s.visible = showLabels; push(s); labelSprites.push(s); return s; };

      // Iron core: two legs + two yokes.
      const coreMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, metalness: 0.4 });
      const legGeo = new THREE.BoxGeometry(0.5, 4.4, 0.9);
      push(new THREE.Mesh(legGeo, coreMat)).position.set(-2, 0, 0);
      push(new THREE.Mesh(legGeo, coreMat)).position.set(2, 0, 0);
      const yokeGeo = new THREE.BoxGeometry(4.5, 0.5, 0.9);
      push(new THREE.Mesh(yokeGeo, coreMat)).position.set(0, 2.2, 0);
      push(new THREE.Mesh(yokeGeo, coreMat)).position.set(0, -2.2, 0);

      // Coils around each leg (helix of line segments).
      const coil = (x: number, turns: number, color: number, label: string) => {
        const pts: THREE.Vector3[] = [];
        const loops = Math.min(turns, 30);
        for (let i = 0; i <= loops * 16; i++) {
          const a = (i / 16) * Math.PI * 2;
          const y = -1.9 + (i / (loops * 16)) * 3.8;
          pts.push(new THREE.Vector3(x + 0.55 * Math.cos(a), y, 0.55 * Math.sin(a)));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color })));
        addLabel(mkSprite(label, "#" + color.toString(16).padStart(6, "0"), new THREE.Vector3(x, 2.9, 0), 0.55));
      };
      coil(-2, nPrimary, 0xf97316, `Np = ${nPrimary}`);
      coil(2, nSecondary, 0x22d3ee, `Ns = ${nSecondary}`);

      // Oscillating electrons along each coil.
      const makeElectrons = (x: number, turns: number, color: number): THREE.Mesh[] => {
        const out: THREE.Mesh[] = [];
        const loops = Math.min(turns, 30);
        for (let i = 0; i < 8; i++) {
          const e = push(new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color }))) as THREE.Mesh;
          e.userData.phase = (i / 8) * Math.PI * 2;
          e.userData.x = x;
          e.userData.loops = loops;
          out.push(e);
        }
        return out;
      };
      const pElectrons = makeElectrons(-2, nPrimary, 0xfde047);
      const sElectrons = makeElectrons(2, nSecondary, 0x7dd3fc);
      const placeElectron = (e: THREE.Mesh, phase: number) => {
        const a = phase * Math.PI * 2;
        const y = -1.9 + (((phase % 1) + 1) % 1) * 3.8;
        e.position.set(e.userData.x + 0.55 * Math.cos(a), y, 0.55 * Math.sin(a));
      };

      // Magnetic flux dots circulating through the core.
      const fluxPath = [
        new THREE.Vector3(0, 2.2, 0), new THREE.Vector3(2, 2.2, 0), new THREE.Vector3(2, -2.2, 0),
        new THREE.Vector3(-2, -2.2, 0), new THREE.Vector3(-2, 2.2, 0), new THREE.Vector3(0, 2.2, 0),
      ];
      const fluxSegs = fluxPath.slice(1).map((p, i) => ({ from: fluxPath[i], to: p }));
      const fluxLen = fluxSegs.map((s) => s.to.distanceTo(s.from));
      const fluxTotal = fluxLen.reduce((a, b) => a + b, 0);
      const fluxDots: THREE.Mesh[] = [];
      for (let i = 0; i < 12; i++) {
        const d = push(new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0x4ade80 }))) as THREE.Mesh;
        d.userData.dist = (i / 12) * fluxTotal;
        fluxDots.push(d);
      }
      const fluxPosAt = (d: number): THREE.Vector3 => {
        let rem = ((d % fluxTotal) + fluxTotal) % fluxTotal;
        for (let s = 0; s < fluxSegs.length; s++) {
          if (rem <= fluxLen[s]) return fluxSegs[s].from.clone().add(fluxSegs[s].to.clone().sub(fluxSegs[s].from).normalize().multiplyScalar(rem));
          rem -= fluxLen[s];
        }
        return fluxPath[0].clone();
      };

      addLabel(mkSprite("Vp = 230 V", "#f97316", new THREE.Vector3(-2, -3.1, 0), 0.6));
      addLabel(mkSprite(`Vs = ${vSecondary.toFixed(0)} V`, "#22d3ee", new THREE.Vector3(2, -3.1, 0), 0.6));

      // AC animation: electrons oscillate; flux dots circulate (reversing).
      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (animating) t += dt;
        controls.update();

        const ac = Math.sin(t * 2.5);
        pElectrons.forEach((e) => placeElectron(e, e.userData.phase + ac * 0.35));
        sElectrons.forEach((e) => placeElectron(e, e.userData.phase + ac * 0.35));
        fluxDots.forEach((d) => {
          d.userData.dist += ac * dt * 6;
          d.position.copy(fluxPosAt(d.userData.dist));
        });

        renderer.render(scene, camera);
      };
      loop();
    };
    init();
    return () => {
      cancelAnimationFrame(frameId);
      meshes.forEach((m) => {
        m.traverse((o: any) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((mm: any) => mm.dispose());
            else o.material.dispose();
          }
        });
      });
      renderer?.dispose();
      if (renderer?.domElement?.parentElement === container) container.removeChild(renderer.domElement);
      controls?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, isWebGL, nPrimary, nSecondary, animating, showLabels]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="Transformer"
        description="Two coils on a common iron core — mutual induction steps voltage up or down."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Transformer — Turns Ratio & Voltage</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Winding Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Primary turns Np:</Label>
              <Input type="range" min={5} max={50} step={1} value={nPrimary} onChange={(e) => setNPrimary(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{nPrimary}</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Secondary turns Ns:</Label>
              <Input type="range" min={5} max={50} step={1} value={nSecondary} onChange={(e) => setNSecondary(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{nSecondary}</p>
            </div>
          </div>
        </CollapsibleControls>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <PlaybackBar
            playing={animating}
            onPlayToggle={() => setAnimating(!animating)}
            speed={speed}
            onSpeedChange={setSpeed}
            onReset={resetAll}
          />
          <button
            onClick={() => setShowLabels((v) => !v)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
          >
            Labels
          </button>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Turns ratio Ns/Np", value: ratio.toFixed(2), highlight: true },
            { label: "Secondary voltage Vs", value: vSecondary.toFixed(1), unit: "V" },
            { label: "Primary voltage Vp", value: vPrimary, unit: "V" },
            { label: "Type", value: kind },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Voltage ratio:</strong> Vs/Vp = Ns/Np — set purely by the turns ratio.</p>
            <p><strong className="text-foreground">Step-up:</strong> Ns &gt; Np raises voltage (and lowers current: VsIs = VpIp).</p>
            <p><strong className="text-foreground">Step-down:</strong> Ns &lt; Np lowers voltage (used in power distribution).</p>
            <p><strong className="text-foreground">Principle:</strong> mutual induction — the changing flux in the core links both coils.</p>
            <p><strong className="text-foreground">Losses:</strong> copper (I²R), eddy currents, hysteresis, flux leakage.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
