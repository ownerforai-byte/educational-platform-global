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
   Variable Separable DE — NEB Calculus (Maths 12)
   Visualizes solving dy/dx = g(x)h(y) by separation of variables
   and phase line / direction field representation.
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

type SepMode = "exp" | "bell" | "logistic";

const SEP_INFO: Record<SepMode, { de: string; separated: string; general: string; particular: (kk: number, yS: number) => string; eval: (x: number, kk: number, yS: number) => number; slope: (x: number, y: number, kk: number) => number }> = {
  exp: {
    de: "dy/dx = ky",
    separated: "dy/y = k dx",
    general: "∫dy/y = ∫k dx  →  ln|y| = kx + C  →  y = Aeᵏˣ",
    particular: (kk, yS) => `y = ${yS.toFixed(1)}·e^(${kk.toFixed(1)}x)`,
    eval: (x, kk, yS) => yS * Math.exp(kk * x),
    slope: (_x, y, kk) => kk * y,
  },
  bell: {
    de: "dy/dx = kxy",
    separated: "dy/y = kx dx",
    general: "ln|y| = kx²/2 + C  →  y = Ae^(kx²/2)",
    particular: (kk, yS) => `y = ${yS.toFixed(1)}·e^(${kk.toFixed(2)}x²/2)`,
    eval: (x, kk, yS) => yS * Math.exp((kk * x * x) / 2),
    slope: (x, y, kk) => kk * x * y,
  },
  logistic: {
    de: "dy/dx = ky(1 − y)",
    separated: "dy/[y(1 − y)] = k dx",
    general: "ln|y/(1−y)| = kx + C  →  y = 1/(1 + Ae⁻ᵏˣ)",
    particular: (kk, yS) =>
      yS === 1 ? "y = 1 (equilibrium)"
      : yS > 0 ? `y = 1/(1 + ${((1 - yS) / yS).toFixed(2)}·e^(−${kk.toFixed(1)}x))`
      : "y₀ must lie in (0, 1] for the logistic plot",
    eval: (x, kk, yS) => (yS > 0 ? 1 / (1 + ((1 - yS) / yS) * Math.exp(-kk * x)) : NaN),
    slope: (_x, y, kk) => kk * y * (1 - y),
  },
};

export function VariableSeparableDEVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [mode, setMode] = useState<SepMode>("exp");
  const [k, setK] = useState(1);
  const [y0, setY0] = useState(1);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = SEP_INFO[mode];
  const fmtV = (v: number) => (isFinite(v) ? v.toFixed(2) : "undefined");

  const presets: ScenePreset[] = [
    { name: "dy/dx = 0.5y", hint: "Classic exponential-growth separable DE", apply: () => { setMode("exp"); setK(0.5); setY0(1); setRunId((r) => r + 1); } },
    { name: "dy/dx = 0.5xy", hint: "Bell-shaped family y = y₀e^(x²/4)", apply: () => { setMode("bell"); setK(0.5); setY0(1); setRunId((r) => r + 1); } },
    { name: "dy/dx = y(1 − y)", hint: "Logistic — partial fractions on 1/[y(1−y)]", apply: () => { setMode("logistic"); setK(1); setY0(0.2); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setMode("exp");
    setK(1);
    setY0(1);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
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
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };
      controls.autoRotate = false;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Axes
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
      push(mkSprite("x", "#ef4444", new THREE.Vector3(10.2, 0, 0.05), 0.5));
      push(mkSprite("y", "#22c55e", new THREE.Vector3(0, 10.2, 0.05), 0.5));

      // Grid
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 50) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        // Direction field (slope ticks): dy/dx evaluated at each lattice point (x, y)
        for (let i = -8; i <= 8; i += 2) {
          for (let j = -8; j <= 8; j += 2) {
            const slope = info.slope(i, j, k);
            const tickLen = 0.25;
            const angle = isFinite(slope) ? Math.atan(slope * 0.5) : Math.PI / 2;
            const pts = [
              new THREE.Vector3(i - tickLen * Math.cos(angle), j - tickLen * Math.sin(angle), 0),
              new THREE.Vector3(i + tickLen * Math.cos(angle), j + tickLen * Math.sin(angle), 0),
            ];
            push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x334155 })));
          }
        }

        // Solution curves for different y0 values
        const y0Values = [y0 * 0.25, y0 * 0.5, y0, y0 * 2, y0 * 3];
        const colors = [0x94a3b8, 0x64748b, 0x22d3ee, 0xef4444, 0xa78bfa];
        y0Values.forEach((yStart, idx) => {
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 200; i++) {
            const x = -8 + (i / 200) * 16;
            const y = info.eval(x, k, yStart);
            if (isFinite(y) && Math.abs(y) < 15) {
              pts.push(new THREE.Vector3(x, y, 0.02));
            }
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: colors[idx], linewidth: idx === 2 ? 3 : 1.5 })));
        });

        // Initial condition marker
        const initPt = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
        initPt.position.set(0, y0, 0.05);
        labelSprites.push(push(mkSprite(`(0, ${y0.toFixed(1)})`, "#fbbf24", new THREE.Vector3(0.5, y0 + 0.5, 0), 0.7)));

        // Separation steps annotation
        labelSprites.push(push(mkSprite(`${info.de}  →  ${info.separated}  →  ${info.general}`, "#f97316", new THREE.Vector3(0, 8, 0), 0.8)));
        labelSprites.push(push(mkSprite(`Solution: ${info.particular(k, y0)}`, "#22d3ee", new THREE.Vector3(0, 7, 0), 0.8)));
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
  }, [mode, k, y0, isWebGL, runId, showLabels]);
// eslint-disable-next-line react-hooks/exhaustive-deps

  if (!isWebGL) {
    return <WebGLFallback title="Variable Separable DE" description="Separation of variables visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Variable Separable DE</span>
          <span className="text-xs text-muted-foreground font-normal">dy/dx = g(x)·h(y) method</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-teal-500/50 bg-teal-500/10 text-teal-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Separable Equation">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["exp", "bell", "logistic"] as SepMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {SEP_INFO[m].de}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label={`Parameters (${info.de})`}>
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">k:</Label><Input type="number" step="0.5" value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">y₀:</Label><Input type="number" step="0.5" value={y0} onChange={(e) => setY0(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Equation", value: info.de, highlight: true },
            { label: "Step 1 — separate", value: info.separated },
            { label: "Step 2 — integrate", value: info.general },
            { label: `Particular solution, y(0) = ${y0}`, value: info.particular(k, y0) },
            { label: "y(1)", value: fmtV(info.eval(1, k, y0)) },
            { label: "Slope at (0, y₀)", value: fmtV(info.slope(0, y0, k)) },
          ]}
        />

        <div className="rounded-lg border border-teal-500/30 bg-teal-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-400">Solution Method · {info.de}</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Separate variables: {info.separated}</p>
            <p><strong className="text-foreground">Step 2:</strong> Integrate both sides: {info.general}</p>
            <p><strong className="text-foreground">Step 3:</strong> Apply the initial condition y(0) = y₀ to fix the constant: {info.particular(k, y0)}</p>
            <p><strong className="text-foreground">Check:</strong> the ticks are the slope field of {info.de} — every solution curve must follow them.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
