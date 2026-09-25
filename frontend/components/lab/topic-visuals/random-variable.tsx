"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/* ============================================================
   Random Variable & Distribution — NEB Probability (Maths 12)
   Shows PMF/PDF bars, expected value, and cumulative distribution.
   ============================================================ */

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
  s.scale.set(3.0 * scale, 0.56 * scale, 1);
  return s;
}

type DistType = "discrete" | "continuous";

const RV_INFO: Record<DistType, { head: string; rule: string; meaning: string; example: string; pitfall: string }> = {
  discrete: {
    head: "Discrete RV · Binomial PMF bars",
    rule: "Σ P(X=k) = 1,  E[X] = Σ k·P(X=k) = np",
    meaning: "X takes countable values (0, 1, …, n); each bar height is P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ",
    example: "For n = 10, p = 0.4: E[X] = 4, Var(X) = np(1−p) = 2.4, σ ≈ 1.55",
    pitfall: "E[X] need not be a possible value of X — it is the long-run average",
  },
  continuous: {
    head: "Continuous RV · Normal PDF curve",
    rule: "∫ f(x)dx = 1,  P(a < X < b) = area under f between a and b",
    meaning: "X takes any value in an interval; f(x) itself is not a probability — only areas are",
    example: "For N(5, 2): μ ± σ = [3, 7] holds ≈68%, μ ± 2σ = [1, 9] holds ≈95% of the area",
    pitfall: "P(X = c) = 0 for any single point c — probabilities come from intervals",
  },
};

export function RandomVariableVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [distType, setDistType] = useState<DistType>("discrete");
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.4);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = RV_INFO[distType];

  const presets: ScenePreset[] = [
    { name: "Binomial B(10, 0.4)", hint: "Discrete PMF bars, μ = 4", apply: () => { setDistType("discrete"); setN(10); setP(0.4); setRunId((r) => r + 1); } },
    { name: "Binomial B(20, 0.5)", hint: "Symmetric PMF, μ = 10", apply: () => { setDistType("discrete"); setN(20); setP(0.5); setRunId((r) => r + 1); } },
    { name: "Normal N(5, 2)", hint: "Continuous bell curve", apply: () => { setDistType("continuous"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setDistType("discrete");
    setN(10);
    setP(0.4);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  const rvMean = n * p;
  const rvVar = n * p * (1 - p);
  const rvSd = Math.sqrt(rvVar);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
    const binomialPMF = (k: number) => {
      const comb = factorial(n) / (factorial(k) * factorial(n - k));
      return comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
    };

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 6, 12);
      camera.lookAt(0, 1, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };
      controls.autoRotate = false;
      controls.maxPolarAngle = Math.PI / 2.2;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); if (o instanceof THREE.Sprite) labelSprites.push(o); return o; };

      push(new THREE.GridHelper(20, 20, 0x334155, 0x1e293b));

      const update = () => {
        while (meshes.length > 50) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        if (distType === "discrete") {
          // Binomial distribution bars
          const maxP = Math.max(...Array.from({ length: n + 1 }, (_, k) => binomialPMF(k)));
          const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e, 0x3b82f6, 0x8b5cf6];

          for (let k = 0; k <= n; k++) {
            const prob = binomialPMF(k);
            const barH = (prob / maxP) * 3;
            const bar = push(new THREE.Mesh(
              new THREE.BoxGeometry(0.6, barH, 0.6),
              new THREE.MeshBasicMaterial({ color: colors[k % colors.length] }),
            ));
            bar.position.set((k - n / 2) * 1.0, barH / 2, 0);
            if (barH > 0.2) {
              push(mkSprite(`${k}: ${prob.toFixed(2)}`, "#fbbf24", new THREE.Vector3((k - n / 2) * 1.0, barH + 0.3, 0), 0.6));
            }
          }

          // Mean and SD indicators
          const mean = n * p;
          const variance = n * p * (1 - p);
          const sd = Math.sqrt(variance);
          push(mkSprite(`E[X] = μ = np = ${mean.toFixed(1)}`, "#22d3ee", new THREE.Vector3(0, -1.5, 0), 0.8));
          push(mkSprite(`Var(X) = σ² = np(1-p) = ${variance.toFixed(2)}`, "#a78bfa", new THREE.Vector3(0, -2.5, 0), 0.8));
          push(mkSprite(`σ = ${sd.toFixed(2)}`, "#fb923c", new THREE.Vector3(0, -3.3, 0), 0.75));
        } else {
          // Normal distribution PDF
          const mu = 5, sigma = 2;
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 200; i++) {
            const x = -5 + (i / 200) * 20;
            const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
            pts.push(new THREE.Vector3(x - 5, y * 5, 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 3 })));
          push(mkSprite(`Normal: N(μ=${mu}, σ=${sigma})`, "#60a5fa", new THREE.Vector3(0, 5.5, 0), 0.85));
          push(mkSprite(`f(x) = (1/σ√2π) e^(-(x-μ)²/2σ²)`, "#a78bfa", new THREE.Vector3(0, -4.5, 0), 0.75));
          // Mean line
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -4.8, 0), new THREE.Vector3(0, 5, 0)]),
            new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }),
          ));
          push(mkSprite("μ", "#f87171", new THREE.Vector3(0.5, 5, 0), 0.6));
        }
      };

      update();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);
      // Re-fit the canvas whenever the container itself resizes (screen fit)
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        resizeObserver?.disconnect();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [distType, n, p, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Random Variable" description="Distribution visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Random Variable &amp; Probability Distribution</span>
          <span className="text-xs text-muted-foreground font-normal">PMF, PDF, expectation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-blue-500/50 bg-blue-500/10 text-blue-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Distribution Type">
          <div className="flex gap-2 mt-2">
            <button onClick={() => setDistType("discrete")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${distType === "discrete" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Discrete (Binomial)</button>
            <button onClick={() => setDistType("continuous")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${distType === "continuous" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Continuous (Normal)</button>
          </div>
        </CollapsibleControls>

        {distType === "discrete" && (
          <CollapsibleControls label="Binomial Parameters (n, p)">
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">n:</Label><Input type="number" step="1" min={3} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">p:</Label><Input type="number" step="0.05" min={0} max={1} value={p} onChange={(e) => setP(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CollapsibleControls>
        )}

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={distType === "discrete" ? [
            { label: "Distribution", value: info.head, highlight: true },
            { label: "E[X] = np", value: rvMean.toFixed(2) },
            { label: "Var(X) = np(1−p)", value: rvVar.toFixed(2) },
            { label: "σ = √Var(X)", value: rvSd.toFixed(2) },
            { label: "Mode ≈ ⌊(n+1)p⌋", value: Math.floor((n + 1) * p) },
            { label: "PMF check", value: "Σ P(X=k) = 1" },
          ] : [
            { label: "Distribution", value: info.head, highlight: true },
            { label: "Mean μ", value: 5 },
            { label: "SD σ", value: 2 },
            { label: "Peak f(μ) = 1/(σ√2π)", value: (1 / (2 * Math.sqrt(2 * Math.PI))).toFixed(3) },
            { label: "μ ± σ interval", value: "[3, 7] holds ≈68%" },
            { label: "PDF check", value: "Total area = 1" },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Random variable X:</strong> A function assigning a real number to each outcome in the sample space.</p>
            <p><strong className="text-foreground">Expectation:</strong> E[X] = Σ xᵢ · P(X=xᵢ) (discrete) or ∫ x·f(x)dx (continuous).</p>
            <p><strong className="text-foreground">Variance:</strong> Var(X) = E[(X−μ)²] = E[X²] − (E[X])²</p>
            <p><strong className="text-foreground">Properties:</strong> E[aX+b] = aE[X]+b,  Var(aX+b) = a²Var(X)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
