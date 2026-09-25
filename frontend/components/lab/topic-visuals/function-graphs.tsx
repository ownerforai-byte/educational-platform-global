"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/* ============================================================
   Functions — NEB Algebra (Maths 11)
   Interactive function explorer: domain, range, inverse,
   composite, and various function types.
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
}

type FuncType = "linear" | "quadratic" | "cubic" | "reciprocal" | "exponential" | "logarithmic" | "trig" | "inverse";

const FUNC_INFO: Record<FuncType, { general: string; feature: string }> = {
  linear: { general: "y = ax + b — straight line", feature: "Constant gradient a; y-intercept b; no extrema." },
  quadratic: { general: "y = ax² + bx + c — parabola", feature: "Vertex at x = −b/2a; roots x = (−b ± √(b²−4ac))/2a." },
  cubic: { general: "y = ax³ + bx — cubic", feature: "Odd symmetry about the origin; inflection at (0, 0)." },
  reciprocal: { general: "y = a/(x − b) — hyperbola", feature: "Vertical asymptote x = b; horizontal asymptote y = 0." },
  exponential: { general: "y = a·e^(bx) — exponential", feature: "One-signed; passes through (0, a); y = 0 is a horizontal asymptote." },
  logarithmic: { general: "y = a·ln|x − b| — logarithmic", feature: "Inverse of the exponential; vertical asymptote x = b; zeros at x = b ± 1." },
  trig: { general: "y = a·sin(bx) — sine wave", feature: "Amplitude |a|, period 2π/|b|, odd function." },
  inverse: { general: "y = a√|x| — root type", feature: "Steep near the origin, then flattens; mirror of a parabola about y = x." },
};

export function FunctionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [funcType, setFuncType] = useState<FuncType>("quadratic");
  const [params, setParams] = useState({ a: 1, b: -2, c: -3, k: 1, h: 0 });
  const [showDomainRange, setShowDomainRange] = useState(true);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = FUNC_INFO[funcType];

  const funcExpr = (x: number): number => {
    switch (funcType) {
      case "linear": return params.a * x + params.b;
      case "quadratic": return params.a * x * x + params.b * x + params.c;
      case "cubic": return params.a * x * x * x + params.b * x;
      case "reciprocal": return params.a / (x - params.b);
      case "exponential": return params.a * Math.exp(params.b * x);
      case "logarithmic": return params.a * Math.log(Math.abs(x - params.b) + 0.1);
      case "trig": return params.a * Math.sin(params.b * x);
      case "inverse": return params.a * Math.sqrt(Math.abs(x));
    }
  };
  const fmtVal = (v: number) => (isFinite(v) ? v.toFixed(2) : "undefined");

  let domainLabel = "all reals (ℝ)";
  let rangeLabel = "all reals (ℝ)";
  if (funcType === "logarithmic") { domainLabel = `x ≠ ${params.b}`; rangeLabel = "all reals (ℝ)"; }
  else if (funcType === "reciprocal") { domainLabel = `x ≠ ${params.b}`; rangeLabel = "y ≠ 0"; }
  else if (funcType === "inverse") { domainLabel = "all reals (plot of a√|x|)"; rangeLabel = params.a >= 0 ? "y ≥ 0" : "y ≤ 0"; }
  else if (funcType === "exponential") { rangeLabel = params.a > 0 ? "y > 0" : params.a < 0 ? "y < 0" : "y = 0"; }
  else if (funcType === "trig") { rangeLabel = `−${Math.abs(params.a).toFixed(1)} ≤ y ≤ ${Math.abs(params.a).toFixed(1)}`; }
  else if (funcType === "quadratic" && params.a !== 0) {
    const vy = params.c - (params.b * params.b) / (4 * params.a);
    rangeLabel = params.a > 0 ? `y ≥ ${vy.toFixed(2)}` : `y ≤ ${vy.toFixed(2)}`;
  } else if (funcType === "linear" && params.a === 0) { rangeLabel = `y = ${params.b}`; }

  const presets: ScenePreset[] = [
    { name: "Parabola x² − 2x − 3", hint: "Roots at x = 3 and x = −1", apply: () => { setFuncType("quadratic"); setParams({ a: 1, b: -2, c: -3, k: 1, h: 0 }); setRunId((r) => r + 1); } },
    { name: "Sine wave 2 sin 2x", hint: "Amplitude 2, period π", apply: () => { setFuncType("trig"); setParams({ a: 2, b: 2, c: -3, k: 1, h: 0 }); setRunId((r) => r + 1); } },
    { name: "Exponential eˣ", hint: "Grows through (0, 1)", apply: () => { setFuncType("exponential"); setParams({ a: 1, b: 1, c: -3, k: 1, h: 0 }); setRunId((r) => r + 1); } },
    { name: "Hyperbola 1/x", hint: "Asymptotes x = 0 and y = 0", apply: () => { setFuncType("reciprocal"); setParams({ a: 1, b: 0, c: -3, k: 1, h: 0 }); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFuncType("quadratic");
    setParams({ a: 1, b: -2, c: -3, k: 1, h: 0 });
    setShowDomainRange(true);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    const getFunc = funcExpr;

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

      const mkAxis = (from: THREE.Vector2, to: THREE.Vector2, color: number, label: string) => {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(from.x, from.y, 0), new THREE.Vector3(to.x, to.y, 0)]), new THREE.LineBasicMaterial({ color })));
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(to.x, to.y, 0.05), 0.6));
      };
      mkAxis(new THREE.Vector2(-10, 0), new THREE.Vector2(10, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector2(0, -10), new THREE.Vector2(0, 10), 0x22c55e, "y");
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const curvePts: THREE.Vector3[] = [];
        let dyMin = Infinity, dyMax = -Infinity;
        for (let i = 0; i <= 400; i++) {
          const x = -10 + (i / 400) * 20;
          try {
            const y = getFunc(x);
            if (isFinite(y) && Math.abs(y) < 50) {
              curvePts.push(new THREE.Vector3(x, y, 0.02));
              dyMin = Math.min(dyMin, y);
              dyMax = Math.max(dyMax, y);
            } else {
              curvePts.push(curvePts[curvePts.length - 1]);
            }
          } catch {
            curvePts.push(curvePts[curvePts.length - 1]);
          }
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        if (showDomainRange) {
          const fName = funcType.charAt(0).toUpperCase() + funcType.slice(1);
          const labelY = Math.min(8, Math.max(-8, dyMax + 1.5));
          labelSprites.push(push(mkSprite(`f(x) = ${fName}  Domain: ${domainLabel}`, "#7dd3fc", new THREE.Vector3(-7, labelY, 0), 0.8)));
          labelSprites.push(push(mkSprite(`Range: ${rangeLabel}`, "#fb923c", new THREE.Vector3(-7, labelY - 1.0, 0), 0.8)));
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
  }, [funcType, params, showDomainRange, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Functions" description="Function graph explorer — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Functions — Domain, Range &amp; Types</span>
          <span className="text-xs text-muted-foreground font-normal">Explore different function families</span>
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

        <CollapsibleControls label="Function Type">
          <Tabs value={funcType} onValueChange={(v) => setFuncType(v as FuncType)} className="mt-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="linear" className="text-xs">Linear</TabsTrigger>
              <TabsTrigger value="quadratic" className="text-xs">Quadratic</TabsTrigger>
              <TabsTrigger value="cubic" className="text-xs">Cubic</TabsTrigger>
              <TabsTrigger value="reciprocal" className="text-xs">Reciprocal</TabsTrigger>
              <TabsTrigger value="exponential" className="text-xs">Exponential</TabsTrigger>
              <TabsTrigger value="logarithmic" className="text-xs">Logarithmic</TabsTrigger>
              <TabsTrigger value="trig" className="text-xs">Trigonometric</TabsTrigger>
              <TabsTrigger value="inverse" className="text-xs">Inverse/Root</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">a:</Label><Input type="number" step="0.5" value={params.a} onChange={(e) => setParams({ ...params, a: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">b:</Label><Input type="number" step="0.5" value={params.b} onChange={(e) => setParams({ ...params, b: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">c:</Label><Input type="number" step="0.5" value={params.c} onChange={(e) => setParams({ ...params, c: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">h:</Label><Input type="number" step="0.5" value={params.h} onChange={(e) => setParams({ ...params, h: Number(e.target.value) })} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Family", value: info.general },
            { label: "Domain", value: domainLabel },
            { label: "Range", value: rangeLabel, highlight: true },
            { label: "f(0)", value: fmtVal(funcExpr(0)) },
            { label: "f(1)", value: fmtVal(funcExpr(1)) },
            { label: "Feature", value: info.feature },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Function:</strong> A relation where each input x has exactly one output y = f(x).</p>
            <p><strong className="text-foreground">Domain:</strong> All possible input values (x-values) for which f is defined.</p>
            <p><strong className="text-foreground">Range:</strong> All possible output values (y-values) that f can produce.</p>
            <p><strong className="text-foreground">One-to-one:</strong> Each y-value corresponds to exactly one x-value (passes horizontal line test).</p>
            <p><strong className="text-foreground">Inverse function f⁻¹:</strong> Swaps domain and range; reflects across y = x.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
