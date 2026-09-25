"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, PlaybackBar, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

function mkSprite(text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.fillRect(4, 4, 504, 88);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 88);
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.5 * scale, 0.65 * scale, 1);
  return s;
}

type DiffType = "smooth" | "corner" | "cusp" | "vertical_tangent";

const DIFF_INFO: Record<DiffType, { concept: string; formula: string; slopes: string; verdict: string; fact: string; tip: string }> = {
  smooth: {
    concept: "Unique tangent line at every point",
    formula: "f(x) = 0.2x² − 1, f′(x) = 0.4x",
    slopes: "Secant slopes settle onto one limit everywhere",
    verdict: "Differentiable on all of ℝ",
    fact: "Every polynomial is differentiable at every real number — this parabola is the model case.",
    tip: "Zoom into a smooth curve and it straightens out into its tangent line.",
  },
  corner: {
    concept: "Corner at x = 0",
    formula: "f(x) = |x| − 2",
    slopes: "Left derivative = −1, right derivative = +1",
    verdict: "f′(0) does not exist — one-sided slopes disagree",
    fact: "|x| is continuous at 0 yet has no derivative there — continuity alone is not enough.",
    tip: "Differentiable ⇒ continuous, but the converse fails exactly at corners.",
  },
  cusp: {
    concept: "Cusp at x = 0",
    formula: "f(x) = 1.2·|x|^(2/3) − 2",
    slopes: "Slope → −∞ (left branch), +∞ (right branch)",
    verdict: "f′(0) does not exist — difference quotient diverges",
    fact: "y = x^(2/3) draws a sharp beak at the origin: the tangent flips from side to side.",
    tip: "The difference quotient 1.2h^(−1/3) grows without bound as h → 0.",
  },
  vertical_tangent: {
    concept: "Vertical tangent at x = 0",
    formula: "f(x) = 2·∛x",
    slopes: "f′ → +∞ from BOTH sides",
    verdict: "Not differentiable at 0 — no finite derivative",
    fact: "f′(x) = (2/3)x^(−2/3): unbounded as x → 0, which is why the tangent turns vertical.",
    tip: "Writing f′(0) = ∞ describes the geometry; differentiability demands a finite limit.",
  },
};

const absF = (x: number) => Math.abs(x) - 2;
const cuspF = (x: number) => 1.2 * Math.pow(Math.abs(x), 2 / 3) - 2;
const cubeF = (x: number) => 2 * Math.cbrt(x);

export function Differentiability3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [diffType, setDiffType] = useState<DiffType>("smooth");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const playingRef = useRef(true);
  const speedRef = useRef(1);
  useEffect(() => { speedRef.current = speed; playingRef.current = playing; }, [speed, playing]);

  const info = DIFF_INFO[diffType];

  const presets: ScenePreset[] = [
    { name: "Smooth parabola", hint: "Tangent slides — differentiable everywhere", apply: () => { setDiffType("smooth"); setRunId((r) => r + 1); } },
    { name: "Corner |x|", hint: "LHD = −1 ≠ RHD = +1", apply: () => { setDiffType("corner"); setRunId((r) => r + 1); } },
    { name: "Cusp x^(2/3)", hint: "Slopes blow up to ±∞", apply: () => { setDiffType("cusp"); setRunId((r) => r + 1); } },
    { name: "Vertical tangent ∛x", hint: "f′ → +∞ from both sides", apply: () => { setDiffType("vertical_tangent"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setDiffType("smooth");
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
    setRunId((r) => r + 1);
  };

  const readoutItems = (() => {
    if (diffType === "smooth") {
      const f = (x: number) => 0.2 * x * x - 1;
      const dq = (f(2 + 1e-3) - f(2)) / 1e-3;
      return [
        { label: "f(x)", value: "0.2x² − 1" },
        { label: "f′(x)", value: "0.4x" },
        { label: "Secant slope, x = 2, h = 0.001", value: dq.toFixed(4) },
        { label: "f′(2) — exact", value: 0.8, highlight: true },
        { label: "Verdict", value: "Differentiable everywhere" },
        { label: "Watch", value: "Tangent slides along the curve and never breaks" },
      ];
    }
    if (diffType === "corner") {
      const h = 0.001;
      const lq = (absF(-h) - absF(0)) / -h; // −1
      const rq = (absF(h) - absF(0)) / h;   // +1
      return [
        { label: "f(x)", value: "|x| − 2" },
        { label: "Left derivative at 0", value: lq.toFixed(3) },
        { label: "Right derivative at 0", value: `+${rq.toFixed(3)}` },
        { label: "f′(0)", value: "Does not exist (−1 ≠ +1)", highlight: true },
        { label: "Continuity", value: "Continuous at 0 — yet not differentiable" },
        { label: "Theorem", value: "Differentiable ⇒ continuous; converse fails here" },
      ];
    }
    if (diffType === "cusp") {
      const dq = (h: number) => (cuspF(h) - cuspF(0)) / h; // = 1.2·h^(−1/3)
      return [
        { label: "f(x)", value: "1.2·|x|^(2/3) − 2" },
        { label: "f(0)", value: "−2 (defined)" },
        { label: "Diff. quotient, h = 0.001", value: dq(0.001).toFixed(1) },
        { label: "Diff. quotient, h = 10⁻⁶", value: dq(1e-6).toFixed(0) },
        { label: "f′(0)", value: "Does not exist — quotient → ∞", highlight: true },
        { label: "Shape", value: "Cusp: tangent flips vertical between branches" },
      ];
    }
    const dq = (h: number) => (cubeF(h) - cubeF(0)) / h; // = 2·h^(−2/3)
    return [
      { label: "f(x)", value: "2·∛x" },
      { label: "f(0)", value: "0 (defined)" },
      { label: "Diff. quotient, h = 0.001", value: dq(0.001).toFixed(0) },
      { label: "Diff. quotient, h = 10⁻⁶", value: dq(1e-6).toFixed(0) },
      { label: "f′(0)", value: "∞ — vertical tangent, not finite", highlight: true },
      { label: "Continuity", value: "Continuous at 0, derivative still fails" },
    ];
  })();


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 5;
      controls.maxDistance = 25;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      if (diffType === "smooth") {
        push(mkSprite("Smooth: Differentiable", "#34d399", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, 0.2 * x * x - 1, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const tangent = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.5 })
        );
        push(tangent);
        const tangentLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-6, -5, 0), new THREE.Vector3(6, -5, 0)]),
          new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
        );
        push(tangentLine);
        push(mkSprite("f′ exists everywhere", "#34d399", new THREE.Vector3(0, -3.5, 0)));

        const animate = () => {
          frameId = requestAnimationFrame(animate);
          if (playingRef.current) animTime += 0.02 * speedRef.current;
          const tx = Math.sin(animTime) * 4;
          const ty = 0.2 * tx * tx - 1;
          tangent.position.set(tx, ty, 0);
          const slope = 0.4 * tx;
          tangentLine.geometry.setFromPoints([
            new THREE.Vector3(tx - 3, ty - slope * 3, 0),
            new THREE.Vector3(tx + 3, ty + slope * 3, 0),
          ]);
          tangentLine.geometry.attributes.position.needsUpdate = true;
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      } else if (diffType === "corner") {
        push(mkSprite("Corner: |x|", "#f59e0b", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.abs(x) - 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const corner = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.25, 0),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.5 })
        );
        corner.position.set(0, -2, 0);
        push(corner);
        const leftTangent = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, 1, 0), new THREE.Vector3(-1, -1, 0)]),
          new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 })
        );
        push(leftTangent);
        const rightTangent = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(1, -1, 0), new THREE.Vector3(3, 1, 0)]),
          new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
        );
        push(rightTangent);
        push(mkSprite("LHD = −1, RHD = +1", "#f59e0b", new THREE.Vector3(0, -3.5, 0)));
        push(mkSprite("NOT differentiable", "#f43f5e", new THREE.Vector3(0, -4.2, 0)));
      } else if (diffType === "cusp") {
        push(mkSprite("Cusp: x^(2/3)", "#ec4899", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.pow(Math.abs(x), 2 / 3) * 1.2 - 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const cusp = new THREE.Mesh(
          new THREE.TetrahedronGeometry(0.3, 0),
          new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.5 })
        );
        cusp.position.set(0, -2, 0);
        push(cusp);
        push(mkSprite("Vertical tangent", "#ec4899", new THREE.Vector3(1, -1, 0)));
        push(mkSprite("NOT differentiable", "#f43f5e", new THREE.Vector3(0, -3.8, 0)));
      } else {
        push(mkSprite("Vertical Tangent: x^(1/3)", "#a78bfa", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.cbrt(x) * 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const vertLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0)]),
          new THREE.LineDashedMaterial({ color: 0xa78bfa, dashSize: 0.3, gapSize: 0.2 })
        );
        vertLine.computeLineDistances();
        push(vertLine);
        const tangentPt = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.5 })
        );
        tangentPt.position.set(0, 0, 0);
        push(tangentPt);
        push(mkSprite("f′(0) → ∞", "#a78bfa", new THREE.Vector3(1.5, 1.5, 0)));
        push(mkSprite("NOT differentiable", "#f43f5e", new THREE.Vector3(0, -3, 0)));
      }

      meshes.forEach((m) => { if (m instanceof THREE.Sprite) labelSprites.push(m); });
      labelSprites.forEach((s) => (s.visible = showLabels));

      if (diffType !== "smooth") {
        const animate = () => {
          frameId = requestAnimationFrame(animate);
          animTime += 0.01;
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      }
    };

    const cleanup = async () => {
      await init();
      return () => {
        cancelAnimationFrame(frameId);
        const parent = renderer.domElement.parentNode;
        if (parent) parent.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanupPromise = cleanup();
    return () => { cleanupPromise.then((d) => d?.()); };
  }, [diffType, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Differentiability" description="Cusp and corner visualizations — requires WebGL." />;
  }

  const curveOptions: [string, string][] = [
    ["smooth", "Smooth Curve"],
    ["corner", "Corner |x|"],
    ["cusp", "Cusp x^(2/3)"],
    ["vertical_tangent", "Vertical Tangent"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Differentiability — 3D Visualization</span>
          <span className="text-xs text-muted-foreground font-normal">Smooth vs. non-smooth points</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-amber-500/50 bg-amber-500/10 text-amber-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Function Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {curveOptions.map(([key, label]) => (
              <button key={key} onClick={() => setDiffType(key as DiffType)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${diffType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <PlaybackBar playing={playing} onPlayToggle={() => setPlaying((p) => !p)} speed={speed} onSpeedChange={setSpeed} onReset={resetAll} />

        <ReadoutGrid items={readoutItems} />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Differentiability Rules</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Smooth curve:</strong> Unique tangent line at every point</p>
            <p><strong className="text-foreground">Corner:</strong> Left and right derivatives differ (|x| at 0: −1 vs +1)</p>
            <p><strong className="text-foreground">Cusp:</strong> Derivative diverges to ±∞ from the two sides</p>
            <p><strong className="text-foreground">Vertical tangent:</strong> f′ → ∞ — no finite derivative, not differentiable</p>
            <p><strong className="text-foreground">This scene:</strong> {info.concept} — {info.verdict}.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}