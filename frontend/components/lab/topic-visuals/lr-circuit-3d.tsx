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
 * LR circuit — growth and decay of current through an inductor.
 * Growth: I = (E/R)(1 - e^(-t/τ)); Decay: I = (E/R)e^(-t/τ); τ = L/R.
 * NEB Class 12 EMI: "Growing and decaying current in LR circuits".
 */
export function LRCircuitVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [inductance, setInductance] = useState(2);
  const [resistance, setResistance] = useState(1);
  const [mode, setMode] = useState<"growth" | "decay">("growth");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const tau = resistance > 0 ? inductance / resistance : 0;
  const DEFAULTS = { inductance: 2, resistance: 1, mode: "growth" as const };
  const presets: ScenePreset[] = [
    { name: "Slow rise (big τ)", hint: "Large L/R — the current creeps up to E/R.", apply: () => { setInductance(5); setResistance(0.5); setMode("growth"); setRunId((r) => r + 1); } },
    { name: "Fast rise (small τ)", hint: "Small L/R — the current jumps up quickly.", apply: () => { setInductance(0.5); setResistance(5); setMode("growth"); setRunId((r) => r + 1); } },
    { name: "Decay", hint: "Switch the battery off — the inductor keeps pushing current.", apply: () => { setInductance(2); setResistance(1); setMode("decay"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setInductance(DEFAULTS.inductance);
    setResistance(DEFAULTS.resistance);
    setMode(DEFAULTS.mode);
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
      camera.position.set(0, 4.5, 13);

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

      // Circuit loop in the XZ plane: battery (left), resistor (top), inductor (right).
      const loopPts = [
        new THREE.Vector3(-4, 0, -1.6), new THREE.Vector3(4, 0, -1.6),
        new THREE.Vector3(4, 0, 1.6), new THREE.Vector3(-4, 0, 1.6), new THREE.Vector3(-4, 0, -1.6),
      ];
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(loopPts),
        new THREE.LineBasicMaterial({ color: 0x94a3b8 }),
      ));
      // Battery symbol (two ticks on the left edge).
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, 0, -0.45), new THREE.Vector3(-4, 0, 0.45)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.55, 0, -0.8), new THREE.Vector3(-3.55, 0, 0.8)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      addLabel(mkSprite("E", "#fbbf24", new THREE.Vector3(-3.7, 0.6, -1.6), 0.5));
      // Resistor zigzag on the top edge.
      const zig: THREE.Vector3[] = [];
      for (let i = 0; i <= 8; i++) zig.push(new THREE.Vector3(-3 + i * 0.75, 0, -1.6 + (i % 2 === 0 ? 0.25 : -0.25)));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(zig), new THREE.LineBasicMaterial({ color: 0xf97316 })));
      addLabel(mkSprite("R", "#f97316", new THREE.Vector3(0, 0.7, -1.6), 0.5));
      // Inductor coil on the right edge.
      const coil: THREE.Vector3[] = [];
      for (let i = 0; i <= 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        coil.push(new THREE.Vector3(4, 0.35 * Math.sin(a), -0.35 * Math.cos(a)));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(coil), new THREE.LineBasicMaterial({ color: 0x22d3ee })));
      addLabel(mkSprite("L", "#22d3ee", new THREE.Vector3(4.7, 0.7, 0), 0.5));

      // Electrons flowing around the loop, speed proportional to current.
      const electrons: THREE.Mesh[] = [];
      const segs = [loopPts[1].clone().sub(loopPts[0]), loopPts[2].clone().sub(loopPts[1]), loopPts[3].clone().sub(loopPts[2]), loopPts[4].clone().sub(loopPts[3])];
      const segLen = segs.map((s) => s.length());
      const perimeter = segLen.reduce((a, b) => a + b, 0);
      for (let i = 0; i < 10; i++) {
        const e = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xfde047 }),
        )) as THREE.Mesh;
        e.userData.dist = (i / 10) * perimeter;
        electrons.push(e);
      }
      const posAt = (d: number): THREE.Vector3 => {
        let rem = ((d % perimeter) + perimeter) % perimeter;
        for (let s = 0; s < 4; s++) {
          if (rem <= segLen[s]) return loopPts[s].clone().add(segs[s].clone().normalize().multiplyScalar(rem));
          rem -= segLen[s];
        }
        return loopPts[0].clone();
      };

      // Live I-t graph floating above the circuit.
      const graph = new THREE.Group();
      graph.position.set(0, 2.6, 0);
      push(graph);
      graph.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 2.2, 0)]),
        new THREE.LineBasicMaterial({ color: 0x64748b }),
      ));
      addLabel(mkSprite("I(t)", "#fde047", new THREE.Vector3(0, 5.1, 0), 0.5));
      addLabel(mkSprite("t", "#94a3b8", new THREE.Vector3(4.3, 2.3, 0), 0.4));
      const curveGeom = new THREE.BufferGeometry();
      curveGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(120 * 3), 3));
      const curve = new THREE.Line(curveGeom, new THREE.LineBasicMaterial({ color: 0xfde047 }));
      graph.add(curve);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      graph.add(dot);
      graph.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, 2, 0), new THREE.Vector3(4, 2, 0)]),
        new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 }),
      ));

      // I(t) in units of E/R; graph x spans 0..6τ.
      const iNorm = (tt: number) =>
        mode === "growth" ? 1 - Math.exp(-tt / tau) : Math.exp(-tt / tau);
      const tauEff = tau > 0 ? tau : 1;

      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (animating) t += dt;
        controls.update();

        const iNow = Math.max(0, iNorm(t));
        electrons.forEach((e) => {
          e.userData.dist += iNow * dt * 8 + 0.02 * dt;
          e.position.copy(posAt(e.userData.dist));
        });

        // Redraw the curve up to the current time.
        const n = 119;
        const arr = curve.geometry.attributes.position as THREE.BufferAttribute;
        const tMax = 6 * tauEff;
        for (let k = 0; k <= n; k++) {
          const tt = (k / n) * Math.min(t, tMax);
          const x = -4 + (k / n) * 8;
          const y = Math.max(0, iNorm(tt)) * 2;
          arr.setXYZ(k, x, y, 0);
        }
        arr.needsUpdate = true;
        curve.geometry.setDrawRange(0, n + 1);
        const gx = -4 + (Math.min(t, tMax) / tMax) * 8;
        dot.position.set(gx, iNow * 2, 0);

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
  }, [runId, isWebGL, inductance, resistance, mode, animating, showLabels]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="LR Circuit"
        description="Growth and decay of current in an LR circuit — exponential curves with time constant τ = L/R."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>LR Circuit — Growth & Decay of Current</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Circuit Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Inductance L (H):</Label>
              <Input type="range" min={0.5} max={5} step={0.1} value={inductance} onChange={(e) => setInductance(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{inductance.toFixed(1)} H</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Resistance R (Ω):</Label>
              <Input type="range" min={0.5} max={5} step={0.1} value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{resistance.toFixed(1)} Ω</p>
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
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setMode((m) => (m === "growth" ? "decay" : "growth"))}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${mode === "growth" ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-orange-500/50 bg-orange-500/10 text-orange-400"}`}
            >
              {mode === "growth" ? "Growth (switch on)" : "Decay (switch off)"}
            </button>
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Time constant τ = L/R", value: tau.toFixed(2), unit: "s", highlight: true },
            { label: "Steady current I₀ = E/R", value: "1.00", unit: "E/R" },
            { label: "I at t = τ", value: mode === "growth" ? "0.632" : "0.368", unit: "I₀" },
            { label: "Mode", value: mode === "growth" ? "Growth" : "Decay" },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Growth:</strong> I = (E/R)(1 − e^(−t/τ)) — the inductor opposes the rise of current.</p>
            <p><strong className="text-foreground">Decay:</strong> I = (E/R)e^(−t/τ) — the inductor keeps the current flowing after the battery is removed.</p>
            <p><strong className="text-foreground">Time constant:</strong> τ = L/R — at t = τ the current reaches 63.2% (growth) or falls to 36.8% (decay).</p>
            <p><strong className="text-foreground">Self-induced emf:</strong> ε = −L dI/dt opposes every change in current.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
