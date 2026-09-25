"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

/* ============================================================
   Reaction Kinetics — Concentration vs Time Graph
   NEB Chemistry 12 — Chemical Kinetics
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
  s.scale.set(3.4 * scale, 0.64 * scale, 1);
  return s;
}

type OrderMode = "zero" | "first" | "second";

const ORDER_INFO: Record<OrderMode, { rateLaw: string; integrated: string; halfLife: string; units: string; realWorld: string }> = {
  zero: { rateLaw: "Rate = k", integrated: "[A] = [A]₀ − kt", halfLife: "t½ = [A]₀/(2k) — shrinks as [A]₀ shrinks", units: "k: mol L⁻¹ s⁻¹", realWorld: "Surface-catalysed reactions (e.g. NH₃ on hot tungsten)" },
  first: { rateLaw: "Rate = k[A]", integrated: "ln[A] = ln[A]₀ − kt", halfLife: "t½ = 0.693/k — constant, ignores [A]₀", units: "k: s⁻¹", realWorld: "Radioactive decay, aspirin hydrolysis in blood" },
  second: { rateLaw: "Rate = k[A]²", integrated: "1/[A] = 1/[A]₀ + kt", halfLife: "t½ = 1/(k[A]₀) — grows as [A]₀ shrinks", units: "k: L mol⁻¹ s⁻¹", realWorld: "NO₂ dimerisation, saponification of esters" },
};

export function ReactionKineticsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [order, setOrder] = useState<OrderMode>("first");
  const [k, setK] = useState(0.5);
  const [A0, setA0] = useState(1.0);
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());

  const info = ORDER_INFO[order];
  const kSafe = k > 0 ? k : 0.001;
  const A0Safe = A0 > 0 ? A0 : 0.001;
  const concAt3 = order === "zero" ? Math.max(0, A0Safe - kSafe * 3) : order === "first" ? A0Safe * Math.exp(-kSafe * 3) : 1 / (1 / A0Safe + kSafe * 3);
  const tHalf = order === "zero" ? A0Safe / (2 * kSafe) : order === "first" ? Math.LN2 / kSafe : 1 / (kSafe * A0Safe);

  const presets: ScenePreset[] = [
    {
      name: "Slow first order",
      hint: "Small k → long half-life; the exponential tail is visible.",
      apply: () => { setOrder("first"); setK(0.15); setA0(1.0); setRunId((r) => r + 1); },
    },
    {
      name: "Zero-order plateau",
      hint: "Rate stays constant until the reactant suddenly runs out.",
      apply: () => { setOrder("zero"); setK(0.2); setA0(1.0); setRunId((r) => r + 1); },
    },
    {
      name: "Fast second order",
      hint: "Steep early drop — rate depends on [A]², so collisions dominate.",
      apply: () => { setOrder("second"); setK(1.5); setA0(1.0); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setOrder("first");
    setK(0.5);
    setA0(1.0);
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
      camera.position.set(0, 0, 11);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 25;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      const drawAxes = (ox: number, oy: number, sx: number, sy: number, xLabel: string, yLabel: string) => {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox + sx * 10, oy, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox, oy + sy * 8, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        addLabel(mkSprite(xLabel, "#94a3b8", new THREE.Vector3(ox + sx * 10.5, oy - 0.3, 0), 0.6));
        addLabel(mkSprite(yLabel, "#94a3b8", new THREE.Vector3(ox - 0.5, oy + sy * 8.5, 0), 0.6));
      };

      const updateScene = () => {
        while (meshes.length > 10) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const ox = -6, oy = -3.5;
        const sx = 1.0, sy = 0.7;
        drawAxes(ox, oy, sx, sy, "Time (t)", "[A] (conc.)");

        let curvePts: THREE.Vector3[] = [];
        let rateLabel = "";
        let integratedLabel = "";

        if (order === "zero") {
          // [A] = [A]₀ - kt
          curvePts = [];
          for (let t = 0; t <= 10; t += 0.1) {
            const A = Math.max(0, A0 - k * t);
            curvePts.push(new THREE.Vector3(ox + t * sx, oy + A * sy * 2, 0));
          }
          rateLabel = "Rate = k  (zero order)";
          integratedLabel = "[A] = [A]₀ - kt";
        } else if (order === "first") {
          // [A] = [A]₀ e^(-kt)
          curvePts = [];
          for (let t = 0; t <= 10; t += 0.1) {
            const A = A0 * Math.exp(-k * t);
            curvePts.push(new THREE.Vector3(ox + t * sx, oy + A * sy * 2, 0));
          }
          rateLabel = "Rate = k[A]  (first order)";
          integratedLabel = "ln[A] = ln[A]₀ - kt";
        } else {
          // 1/[A] = 1/[A]₀ + kt  →  [A] = 1/(1/[A]₀ + kt)
          curvePts = [];
          for (let t = 0; t <= 10; t += 0.1) {
            const A = 1 / (1/A0 + k * t);
            curvePts.push(new THREE.Vector3(ox + t * sx, oy + A * sy * 2, 0));
          }
          rateLabel = "Rate = k[A]²  (second order)";
          integratedLabel = "1/[A] = 1/[A]₀ + kt";
        }

        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        // Current point indicator
        const tNow = 3;
        const ANow = order === "zero" ? Math.max(0, A0 - k * tNow) : order === "first" ? A0 * Math.exp(-k * tNow) : 1 / (1/A0 + k * tNow);
        push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), new THREE.MeshBasicMaterial({ color: 0xef4444 }))).position.set(ox + tNow * sx, oy + ANow * sy * 2, 0);

        // Rate law label with long arrow
        const rateLabelPos = new THREE.Vector3(ox + 5 * sx, oy + 4.5, 0);
        const rateTarget = new THREE.Vector3(ox + 3 * sx, oy + 3.0, 0);
        const rDir = rateTarget.clone().sub(rateLabelPos).normalize();
        const rLen = rateLabelPos.distanceTo(rateTarget);
        push(new LiveLeaderLine(rDir, rateLabelPos, rLen * 0.75, 0xfbbf24, 0.25, 0.12));
        addLabel(mkSprite(rateLabel, "#fbbf24", rateLabelPos.clone().sub(rDir.multiplyScalar(0.5)), 0.7));

        // Integrated rate law
        const intLabelPos = new THREE.Vector3(ox + 5 * sx, oy + 3.8, 0);
        const intTarget = new THREE.Vector3(ox + 2 * sx, oy + 2.5, 0);
        const iDir = intTarget.clone().sub(intLabelPos).normalize();
        const iLen = intLabelPos.distanceTo(intTarget);
        push(new LiveLeaderLine(iDir, intLabelPos, iLen * 0.7, 0xa855f7, 0.25, 0.12));
        addLabel(mkSprite(integratedLabel, "#a855f7", intLabelPos.clone().sub(iDir.multiplyScalar(0.5)), 0.65));

        // Half-life
        const tHalf = order === "zero" ? A0 / (2 * k) : order === "first" ? Math.log(2) / k : 1 / (k * A0);
        addLabel(mkSprite(`t½ = ${tHalf.toFixed(2)}  ${order === "first" ? "(independent of [A]₀)" : order === "zero" ? "(∝ [A]₀)" : "(∝ 1/[A]₀)"}`, "#22c55e", new THREE.Vector3(ox + 5 * sx, oy - 2.5, 0), 0.6));
      };

      labelSprites.length = 0;
      updateScene();
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
  }, [order, k, A0, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Reaction Kinetics" description="Concentration vs time graph — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Reaction Kinetics — Concentration vs Time</span>
          <span className="text-xs text-muted-foreground font-normal">Observe how order affects rate profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>
        <CollapsibleControls label="Reaction Order">
          <div className="flex flex-wrap gap-2 mt-1">
            {(["zero", "first", "second"] as const).map((o) => (
              <button
                key={o}
                onClick={() => setOrder(o)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  order === o ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {o === "zero" ? "Zero Order" : o === "first" ? "First Order" : "Second Order"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <label className="text-xs text-muted-foreground">k (rate const.):</label>
              <input type="number" step="0.1" value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1 w-16" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">[A]₀ (initial):</label>
              <input type="number" step="0.1" value={A0} onChange={(e) => setA0(Number(e.target.value))} className="mt-1 w-16" />
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={[
          { label: "Rate law", value: info.rateLaw, highlight: true },
          { label: "Integrated form", value: info.integrated },
          { label: "Half-life", value: `t½ ≈ ${tHalf.toFixed(2)} — ${info.halfLife.split("—")[1]?.trim() ?? info.halfLife}` },
          { label: "[A] at t = 3 s", value: concAt3.toFixed(3), unit: "mol/L" },
          { label: "k units", value: info.units },
        ]} />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Rate Laws</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Zero order:</strong> Rate = k  |  [A] = [A]₀ − kt  |  t½ = [A]₀/(2k)</p>
            <p><strong className="text-foreground">First order:</strong> Rate = k[A]  |  ln[A] = ln[A]₀ − kt  |  t½ = ln2/k (constant!)</p>
            <p><strong className="text-foreground">Second order:</strong> Rate = k[A]²  |  1/[A] = 1/[A]₀ + kt  |  t½ = 1/(k[A]₀)</p>
            <p><strong className="text-foreground">Arrhenius equation:</strong> k = Ae^(−Ea/RT) — rate constant increases with temperature.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
