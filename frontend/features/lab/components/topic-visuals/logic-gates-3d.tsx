"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type GateKind = "AND" | "OR" | "NOT" | "NAND" | "NOR";

const GATE_TRUTH: Record<GateKind, { inputs: number; fn: (...a: number[]) => number }> = {
  AND: { inputs: 2, fn: (a, b) => (a && b ? 1 : 0) },
  OR: { inputs: 2, fn: (a, b) => (a || b ? 1 : 0) },
  NOT: { inputs: 1, fn: (a) => (a ? 0 : 1) },
  NAND: { inputs: 2, fn: (a, b) => (a && b ? 0 : 1) },
  NOR: { inputs: 2, fn: (a, b) => (a || b ? 0 : 1) },
};

/**
 * Logic gates — interactive truth tables for AND, OR, NOT, NAND, NOR.
 * NEB Class 12 Modern Physics: "Logic gates — AND, OR, NOT, NAND, NOR".
 */
export function LogicGatesVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [gate, setGate] = useState<GateKind>("AND");
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const spec = GATE_TRUTH[gate];
  const output = spec.fn(inputA, inputB);
  const presets: ScenePreset[] = [
    { name: "AND — all ones", hint: "Output is 1 only when every input is 1.", apply: () => { setGate("AND"); setInputA(1); setInputB(1); setRunId((r) => r + 1); } },
    { name: "OR — any one", hint: "Output is 1 when any input is 1.", apply: () => { setGate("OR"); setInputA(1); setInputB(0); setRunId((r) => r + 1); } },
    { name: "NOT — inverter", hint: "Output is the opposite of the single input.", apply: () => { setGate("NOT"); setInputA(0); setRunId((r) => r + 1); } },
    { name: "NAND — universal", hint: "AND followed by NOT — any circuit can be built from NANDs.", apply: () => { setGate("NAND"); setInputA(1); setInputB(1); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setGate("AND");
    setInputA(0);
    setInputB(0);
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
      camera.position.set(0, 0, 9);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 4;
      controls.maxDistance = 18;
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
      const outlineColor = 0xe2e8f0;

      // Gate outline in the XY plane.
      const arcPts = (cx: number, cy: number, r: number, a0: number, a1: number, n = 14): THREE.Vector3[] =>
        Array.from({ length: n + 1 }, (_, i) => {
          const a = a0 + ((a1 - a0) * i) / n;
          return new THREE.Vector3(cx + r * Math.cos(a), cy + r * Math.sin(a), 0);
        });

      const drawGate = () => {
        const g = new THREE.Group();
        push(g);
        const mat = new THREE.LineBasicMaterial({ color: outlineColor });
        if (gate === "AND" || gate === "NAND") {
          const pts = [
            new THREE.Vector3(-0.8, -0.9, 0), new THREE.Vector3(-0.8, 0.9, 0),
            ...arcPts(-0.8, 0, 0.9, Math.PI / 2, -Math.PI / 2),
          ];
          g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
          if (gate === "NAND") g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts(0.25, 0, 0.18, 0, Math.PI * 2)), mat));
        } else if (gate === "OR" || gate === "NOR") {
          const back = arcPts(0.05, 0, 1.15, Math.PI * 0.62, Math.PI * 1.38);
          const front = arcPts(-0.9, 0, 0.9, Math.PI / 2, -Math.PI / 2);
          g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([...back, ...front]), mat));
          if (gate === "NOR") g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts(0.42, 0, 0.18, 0, Math.PI * 2)), mat));
        } else {
          const pts = [new THREE.Vector3(-0.9, -0.8, 0), new THREE.Vector3(-0.9, 0.8, 0), new THREE.Vector3(0.3, 0, 0), new THREE.Vector3(-0.9, -0.8, 0)];
          g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
          g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts(0.48, 0, 0.18, 0, Math.PI * 2)), mat));
        }
        // Input and output wires.
        if (spec.inputs === 2) {
          g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.2, 0.6, 0), new THREE.Vector3(-0.8, 0.6, 0)]), mat));
          g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.2, -0.6, 0), new THREE.Vector3(-0.8, -0.6, 0)]), mat));
        } else {
          g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.2, 0, 0), new THREE.Vector3(-0.9, 0, 0)]), mat));
        }
        const outX = gate === "NOT" ? 0.66 : gate === "NAND" ? 0.43 : gate === "NOR" ? 0.6 : 0.1;
        g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(outX, 0, 0), new THREE.Vector3(2, 0, 0)]), mat));
      };
      drawGate();

      // Glowing input/output dots.
      const inputDots: THREE.Mesh[] = [];
      const mkDot = (x: number, y: number): THREE.Mesh => {
        const d = push(new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), new THREE.MeshBasicMaterial({ color: 0x475569 }))) as THREE.Mesh;
        d.position.set(x, y, 0);
        return d;
      };
      if (spec.inputs === 2) {
        inputDots.push(mkDot(-2.2, 0.6), mkDot(-2.2, -0.6));
      } else {
        inputDots.push(mkDot(-2.2, 0));
      }
      const outputDot = mkDot(2, 0);

      addLabel(mkSprite(gate, "#e2e8f0", new THREE.Vector3(0, 1.6, 0), 0.7));
      addLabel(mkSprite("A", "#22c55e", new THREE.Vector3(-2.5, 0.9, 0), 0.45));
      if (spec.inputs === 2) addLabel(mkSprite("B", "#22c55e", new THREE.Vector3(-2.5, -0.3, 0), 0.45));
      addLabel(mkSprite("Y", "#22c55e", new THREE.Vector3(2.4, 0.35, 0), 0.45));

      // Pulse animation + dot colors.
      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (animating) t += dt;
        controls.update();

        const pulse = 0.7 + 0.3 * Math.sin(t * 3);
        const setDot = (d: THREE.Mesh, v: number) => {
          (d.material as THREE.MeshBasicMaterial).color.set(v ? 0x22c55e : 0x475569);
          d.scale.setScalar(v ? pulse : 1);
        };
        setDot(inputDots[0], inputA);
        if (inputDots[1]) setDot(inputDots[1], inputB);
        setDot(outputDot, output);

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
  }, [runId, isWebGL, gate, inputA, inputB, animating, showLabels]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="Logic Gates"
        description="AND, OR, NOT, NAND, NOR — interactive truth tables with live gate symbols."
      />
    );
  }

  const rows = spec.inputs === 2
    ? [[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b]) => ({ a, b, y: spec.fn(a, b) }))
    : [[0], [1]].map(([a]) => ({ a, b: null as number | null, y: spec.fn(a) }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Logic Gates — Interactive Truth Tables</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Gate & Inputs">
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {(["AND", "OR", "NOT", "NAND", "NOR"] as GateKind[]).map((g) => (
              <button
                key={g}
                onClick={() => setGate(g)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${gate === g ? "border-primary/60 bg-primary/15 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <button
              onClick={() => setInputA((v) => (v ? 0 : 1))}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${inputA ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              A = {inputA}
            </button>
            {spec.inputs === 2 && (
              <button
                onClick={() => setInputB((v) => (v ? 0 : 1))}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${inputB ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-400" : "border-border bg-muted/40 text-muted-foreground"}`}
              >
                B = {inputB}
              </button>
            )}
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
            { label: "Gate", value: gate, highlight: true },
            { label: "Output Y", value: output, unit: output ? "HIGH (1)" : "LOW (0)" },
            { label: "Inputs", value: spec.inputs === 2 ? `${inputA}${inputB}` : `${inputA}` },
            { label: "Universal?", value: gate === "NAND" || gate === "NOR" ? "Yes" : "No" },
          ]}
        />

        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Truth Table — {gate}</p>
          <table className="mt-2 w-full max-w-xs text-xs">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left font-medium py-1">A</th>
                {spec.inputs === 2 && <th className="text-left font-medium py-1">B</th>}
                <th className="text-left font-medium py-1">Y</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const active = spec.inputs === 2 ? r.a === inputA && r.b === inputB : r.a === inputA;
                return (
                  <tr key={i} className={`border-t border-border ${active ? "bg-primary/10 text-primary font-semibold" : "text-foreground"}`}>
                    <td className="py-1">{r.a}</td>
                    {spec.inputs === 2 && <td className="py-1">{r.b}</td>}
                    <td className="py-1">{r.y}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">AND:</strong> Y = A·B — 1 only when both inputs are 1.</p>
            <p><strong className="text-foreground">OR:</strong> Y = A + B — 1 when any input is 1.</p>
            <p><strong className="text-foreground">NOT:</strong> Y = Ā — inverts its single input.</p>
            <p><strong className="text-foreground">NAND / NOR:</strong> AND/OR followed by NOT — each is universal (can build any other gate).</p>
            <p><strong className="text-foreground">In electronics:</strong> built from transistors; 1 = high voltage, 0 = low voltage.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
