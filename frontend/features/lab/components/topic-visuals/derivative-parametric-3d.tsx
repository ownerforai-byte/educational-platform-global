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
  ctx.font = "bold 26px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.8 * scale, 0.7 * scale, 1);
  return s;
}

type ParametricType = "circle" | "lissajous" | "spiral";

const paramPoint = (tp: ParametricType, tt: number): [number, number] =>
  tp === "circle" ? [2 * Math.cos(tt), 2 * Math.sin(tt)]
    : tp === "lissajous" ? [3 * Math.sin(3 * tt), 2 * Math.sin(2 * tt)]
      : [0.3 * tt * Math.cos(tt), 0.3 * tt * Math.sin(tt)];

// True velocity vector (dx/dt, dy/dt) — product rule for the spiral
const paramVelocity = (tp: ParametricType, tt: number): [number, number] =>
  tp === "circle" ? [-2 * Math.sin(tt), 2 * Math.cos(tt)]
    : tp === "lissajous" ? [9 * Math.cos(3 * tt), 4 * Math.cos(2 * tt)]
      : [0.3 * (Math.cos(tt) - tt * Math.sin(tt)), 0.3 * (Math.sin(tt) + tt * Math.cos(tt))];

const PARAM_INFO: Record<ParametricType, { curve: string; dxdt: string; dydt: string; slope: string; tip: string }> = {
  circle: {
    curve: "x = 2cos t, y = 2sin t",
    dxdt: "dx/dt = −2sin t",
    dydt: "dy/dt = 2cos t",
    slope: "dy/dx = −cot t",
    tip: "The tangent is always perpendicular to the radius — a nice geometric check on the formula",
  },
  lissajous: {
    curve: "x = 3sin 3t, y = 2sin 2t",
    dxdt: "dx/dt = 9cos 3t",
    dydt: "dy/dt = 4cos 2t",
    slope: "dy/dx = 4cos 2t / 9cos 3t",
    tip: "The 3:2 frequency ratio makes the figure-eight; the slope blows up when cos 3t = 0 (vertical tangent)",
  },
  spiral: {
    curve: "x = 0.3t·cos t, y = 0.3t·sin t",
    dxdt: "dx/dt = 0.3(cos t − t·sin t)",
    dydt: "dy/dt = 0.3(sin t + t·cos t)",
    slope: "dy/dx = (sin t + t·cos t)/(cos t − t·sin t)",
    tip: "Product rule on 0.3t·cos t — the growing radius makes the tangent lean forward",
  },
};

export function DerivativeParametric3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [paramType, setParamType] = useState<ParametricType>("circle");
  const [t, setT] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = PARAM_INFO[paramType];

  const presets: ScenePreset[] = [
    { name: "Circle t = π/2", hint: "Top of circle: dy/dx = 0", apply: () => { setParamType("circle"); setT(Math.PI / 2); setRunId((r) => r + 1); } },
    { name: "Circle t = 0", hint: "Rightmost point: vertical tangent", apply: () => { setParamType("circle"); setT(0); setRunId((r) => r + 1); } },
    { name: "Lissajous t = π/4", hint: "Steep crossing of the figure-eight", apply: () => { setParamType("lissajous"); setT(Math.PI / 4); setRunId((r) => r + 1); } },
    { name: "Spiral t = 2π", hint: "One full turn — tangent leans forward", apply: () => { setParamType("spiral"); setT(Math.PI * 2); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setParamType("circle");
    setT(0);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

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
      const pushLabel = (text: string, color: string, pos: THREE.Vector3, scale = 1.0) => {
        const s = push(mkSprite(text, color, pos, scale));
        labelSprites.push(s);
        return s;
      };

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      const getPoint = (tt: number): [number, number] => paramPoint(paramType, tt);

      const curvePts: THREE.Vector3[] = [];
      for (let tt = 0; tt <= Math.PI * 4; tt += 0.05) {
        const [x, y] = getPoint(tt);
        curvePts.push(new THREE.Vector3(x, y, 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));

      const point = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.6 })
      );
      push(point);

      const tangentLine = new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 2 })
      );
      push(tangentLine);

      const labels: Record<ParametricType, string> = {
        circle: "x=2cos(t), y=2sin(t)",
        lissajous: "x=3sin(3t), y=2sin(2t)",
        spiral: "x=0.3t·cos(t), y=0.3t·sin(t)",
      };
      pushLabel(labels[paramType], "#60a5fa", new THREE.Vector3(0, 4.2, 0));
      pushLabel("dy/dx = (dy/dt)/(dx/dt)", "#a78bfa", new THREE.Vector3(0, -3.8, 0));

      const updatePosition = (tt: number) => {
        const [x, y] = getPoint(tt);
        point.position.set(x, y, 0);
        const [vx, vy] = paramVelocity(paramType, tt);
        const scale = 0.8;
        tangentLine.geometry.setFromPoints([
          new THREE.Vector3(x - vx * scale, y - vy * scale, 0),
          new THREE.Vector3(x + vx * scale, y + vy * scale, 0),
        ]);
      };

      updatePosition(t);
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animTime += 0.01;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
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
  }, [paramType, t, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Parametric & Implicit" description="Parametric curve derivatives — requires WebGL." />;
  }

  const [rdx, rdy] = paramPoint(paramType, t);
  const [rvx, rvy] = paramVelocity(paramType, t);
  const rslope = Math.abs(rvx) < 1e-9 ? "undefined (vertical tangent)" : (rvy / rvx).toFixed(3);
  const curveOptions: [string, string][] = [
    ["circle", "Circle"],
    ["lissajous", "Lissajous"],
    ["spiral", "Spiral"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Parametric & Implicit — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Parametric curve derivatives</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-violet-500/50 bg-violet-500/10 text-violet-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Parametric Curve">
          <div className="flex flex-wrap gap-2 mt-2">
            {curveOptions.map(([key, label]) => (
              <button key={key} onClick={() => setParamType(key as ParametricType)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${paramType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameter t">
          <div className="w-32 mt-1">
            <Label className="text-xs text-muted-foreground">t = {t.toFixed(2)}</Label>
            <Input type="range" min={0} max={Math.PI * 4} step={0.1} value={t} onChange={(e) => setT(Number(e.target.value))} className="mt-2 w-full" />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Curve", value: info.curve },
            { label: `Position at t = ${t.toFixed(2)}`, value: `(${rdx.toFixed(2)}, ${rdy.toFixed(2)})` },
            { label: "dx/dt", value: rvx.toFixed(3) },
            { label: "dy/dt", value: rvy.toFixed(3) },
            { label: "dy/dx = (dy/dt)/(dx/dt)", value: rslope, highlight: true },
            { label: "Speed |v|", value: Math.hypot(rvx, rvy).toFixed(3) },
          ]}
        />

        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Parametric Derivatives</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">dy/dx = (dy/dt) / (dx/dt)</strong></p>
            <p><strong className="text-foreground">Tangent vector:</strong> (dx/dt, dy/dt) gives direction of motion</p>
            <p><strong className="text-foreground">Green line:</strong> Tangent direction at current parameter t</p>
            <p><strong className="text-foreground">{paramType === "circle" ? "Circle" : paramType === "lissajous" ? "Lissajous" : "Spiral"}:</strong> {info.tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}