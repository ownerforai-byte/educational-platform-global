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
   Growth & Decay — NEB DE Applications (Maths 12)
   Population dynamics: exponential growth/decay, half-life,
   and logistic growth visualization.
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

type GrowthType = "growth" | "decay" | "logistic";

const GD_INFO: Record<GrowthType, { de: string; solution: string; feature: string; example: string }> = {
  growth: {
    de: "dN/dt = kN  (k > 0) — rate proportional to size",
    solution: "N(t) = N₀eᵏᵗ",
    feature: "Doubling time T₂ = ln 2 / k, independent of N₀",
    example: "Bacteria in rich medium, compound interest, unbounded population models",
  },
  decay: {
    de: "dN/dt = −kN  (k > 0) — rate of loss proportional to amount",
    solution: "N(t) = N₀e⁻ᵏᵗ",
    feature: "Half-life t½ = ln 2 / k; after n half-lives, N = N₀/2ⁿ",
    example: "Radioactive decay, drug elimination, Newton cooling (approximation)",
  },
  logistic: {
    de: "dN/dt = kN(1 − N/K) — growth limited by carrying capacity K",
    solution: "N(t) = K / [1 + ((K − N₀)/N₀)e⁻ᵏᵗ]",
    feature: "S-shaped curve; fastest growth at N = K/2; N → K as t → ∞",
    example: "Yeast in a vat, infected populations, adoption of new technology",
  },
};

export function GrowthDecayDEVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [type, setType] = useState<GrowthType>("growth");
  const [k, setK] = useState(0.5);
  const [n0, setN0] = useState(100);
  const [carrying, setCarrying] = useState(500);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = GD_INFO[type];

  const nAt = (t: number) => {
    if (type === "growth") return n0 * Math.exp(k * t);
    if (type === "decay") return n0 * Math.exp(-k * t);
    return carrying / (1 + ((carrying - n0) / n0) * Math.exp(-k * t));
  };
  const fmtN = (v: number) => (isFinite(v) ? v.toFixed(1) : "∞");
  const tHalf = k > 0 ? Math.log(2) / k : Infinity;
  const tK2 = type === "logistic" && k > 0 && n0 > 0 && carrying > n0 ? Math.log((carrying - n0) / n0) / k : null;

  const presets: ScenePreset[] = [
    { name: "Bacteria · doubling 1.4", hint: "Growth k = 0.5 → doubles every ln 2/0.5 ≈ 1.39", apply: () => { setType("growth"); setK(0.5); setN0(100); setRunId((r) => r + 1); } },
    { name: "Radioisotope · t½ = 1.4", hint: "Decay k = 0.5 → half gone by t ≈ 1.39", apply: () => { setType("decay"); setK(0.5); setN0(100); setRunId((r) => r + 1); } },
    { name: "Fast decay · t½ = 0.35", hint: "Doubling k just halves the half-life: t½ = ln 2/2k", apply: () => { setType("decay"); setK(2); setN0(100); setRunId((r) => r + 1); } },
    { name: "Logistic saturation", hint: "S-curve approaching K = 500", apply: () => { setType("logistic"); setK(0.5); setN0(50); setCarrying(500); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setType("growth");
    setK(0.5);
    setN0(100);
    setCarrying(500);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    const getN = (t: number) => {
      if (type === "growth") return n0 * Math.exp(k * t);
      if (type === "decay") return n0 * Math.exp(-k * t);
      return carrying / (1 + ((carrying - n0) / n0) * Math.exp(-k * t));
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

      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const maxT = 10;
      const maxN = type === "logistic" ? carrying * 1.2 : type === "decay" ? n0 * 1.2 : n0 * Math.exp(k * maxT) * 1.2;

      const update = () => {
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const scaleN = 8 / Math.max(maxN, 1);
        const scaleT = 8 / maxT;

        // Curve
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 200; i++) {
          const t = (i / 200) * maxT;
          const n = getN(t);
          pts.push(new THREE.Vector3(t * scaleT - 8, n * scaleN - 8, 0.02));
        }
        const curveColor = type === "growth" ? 0x22c55e : type === "decay" ? 0xef4444 : 0x3b82f6;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: curveColor, linewidth: 3 })));

        // Carrying capacity line for logistic
        if (type === "logistic") {
          const capY = carrying * scaleN - 8;
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, capY, 0), new THREE.Vector3(8, capY, 0)]),
            new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.2, gapSize: 0.1 }),
          ));
          (meshes[meshes.length - 1] as any).computeLineDistances();
          labelSprites.push(push(mkSprite("K (carrying capacity)", "#fbbf24", new THREE.Vector3(6, capY + 0.5, 0), 0.7)));
        }

        // Half-life / doubling time
        if (type === "decay") {
          const halfLife = Math.log(2) / k;
          const midPt = new THREE.Vector3(halfLife * scaleT - 8, (n0 / 2) * scaleN - 8, 0.05);
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 })));
          dot.position.copy(midPt);
          labelSprites.push(push(mkSprite(`t½ = ln2/k = ${halfLife.toFixed(2)}`, "#fb923c", midPt.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.75)));
        } else if (type === "growth") {
          const dblTime = Math.log(2) / k;
          const midPt = new THREE.Vector3(dblTime * scaleT - 8, (n0 * 2) * scaleN - 8, 0.05);
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0x22d3ee })));
          dot.position.copy(midPt);
          labelSprites.push(push(mkSprite(`Tdbl = ln2/k = ${dblTime.toFixed(2)}`, "#60a5fa", midPt.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.75)));
        }

        // Equation label
        const eqLabel = type === "growth" ? "dN/dt = kN  →  N = N₀eᵏᵗ" : type === "decay" ? "dN/dt = −kN  →  N = N₀e⁻ᵏᵗ" : "dN/dt = kN(1−N/K)  →  logistic";
        labelSprites.push(push(mkSprite(eqLabel, "#a78bfa", new THREE.Vector3(0, 9, 0), 0.85)));
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
  }, [type, k, n0, carrying, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Growth & Decay" description="Population dynamics — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Growth &amp; Decay — DE Applications</span>
          <span className="text-xs text-muted-foreground font-normal">Exponential &amp; logistic models</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-green-500/50 bg-green-500/10 text-green-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Model Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["growth", "decay", "logistic"] as GrowthType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  type === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t === "growth" ? "Exponential Growth" : t === "decay" ? "Exponential Decay" : "Logistic"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">k:</Label><Input type="number" step="0.1" value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">N₀:</Label><Input type="number" step="10" value={n0} onChange={(e) => setN0(Number(e.target.value))} className="mt-1" /></div>
            {type === "logistic" && (
              <div className="w-16"><Label className="text-xs text-muted-foreground">K:</Label><Input type="number" step="50" value={carrying} onChange={(e) => setCarrying(Number(e.target.value))} className="mt-1" /></div>
            )}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Differential equation", value: info.de, highlight: true },
            { label: "Solution", value: info.solution },
            { label: "N(5)", value: fmtN(nAt(5)), unit: "individuals" },
            { label: "N(10)", value: fmtN(nAt(10)), unit: "individuals" },
            { label: type === "growth" ? "Doubling time ln2/k" : type === "decay" ? "Half-life t½ = ln2/k" : "Time to reach K/2", value: type === "logistic" ? (tK2 !== null ? tK2.toFixed(2) : "—") : isFinite(tHalf) ? tHalf.toFixed(2) : "—" },
            { label: "Real-world case", value: info.example },
          ]}
        />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Models · {info.feature}</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Growth:</strong> dN/dt = kN  →  N(t) = N₀eᵏᵗ  (population, bacteria)</p>
            <p><strong className="text-foreground">Decay:</strong> dN/dt = −kN  →  N(t) = N₀e⁻ᵏᵗ  (radioactive, drug elimination)</p>
            <p><strong className="text-foreground">Logistic:</strong> dN/dt = kN(1 − N/K)  →  S-curve with carrying capacity K</p>
            <p><strong className="text-foreground">Half-life:</strong> t½ = ln(2)/k  for decay processes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
