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
   Trigonometric Equations — NEB Trigonometry (Maths 11)
   Visualizes solving trig equations: sin θ = k, cos θ = k,
   general solutions, and checking solutions on the unit circle.
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
  ctx.font = "bold 30px monospace";
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

function addLabel(scene: THREE.Scene, meshes: THREE.Object3D[], labelSprites: THREE.Sprite[], text: string, color: number, pos: THREE.Vector3, scale = 0.75) {
  const s = mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, pos, scale);
  scene.add(s);
  meshes.push(s);
  labelSprites.push(s);
}

type EqType = "sin" | "cos" | "tan";

const TE_INFO: Record<EqType, { head: string; principal: string; general: string; period: string; note: string }> = {
  sin: {
    head: "sin θ = k",
    principal: "α = sin⁻¹k, with α ∈ [−π/2, π/2]",
    general: "θ = nπ + (−1)ⁿ α,  n ∈ ℤ",
    period: "Curve repeats every 2π (360°).",
    note: "For 0 ≤ θ < 360°: if k > 0 solutions lie in quadrants I & II; if k < 0 in III & IV.",
  },
  cos: {
    head: "cos θ = k",
    principal: "α = cos⁻¹k, with α ∈ [0, π]",
    general: "θ = 2nπ ± α,  n ∈ ℤ",
    period: "Curve repeats every 2π (360°).",
    note: "Symmetric about the x-axis: cos θ = cos(−θ), so solutions come as ±α per turn.",
  },
  tan: {
    head: "tan θ = k",
    principal: "α = tan⁻¹k, with α ∈ (−π/2, π/2)",
    general: "θ = nπ + α,  n ∈ ℤ",
    period: "Curve repeats every π (180°) — the shortest period of the three.",
    note: "Defined for all real k; vertical asymptotes where cos θ = 0.",
  },
};

export function TrigEquationsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [eqType, setEqType] = useState<EqType>("sin");
  const [k, setK] = useState(0.5);
  const [range, setRange] = useState(360);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = TE_INFO[eqType];

  const presets: ScenePreset[] = [
    { name: "sin θ = 1/2", hint: "30° and 150° in one turn", apply: () => { setEqType("sin"); setK(0.5); setRange(360); setRunId((r) => r + 1); } },
    { name: "cos θ = −1/2", hint: "120° and 240° — quadrant II & III", apply: () => { setEqType("cos"); setK(-0.5); setRange(360); setRunId((r) => r + 1); } },
    { name: "tan θ = 1", hint: "π-periodic: 45° and 225°", apply: () => { setEqType("tan"); setK(1); setRange(360); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setEqType("sin");
    setK(0.5); setRange(360);
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
      push(mkSprite("θ", "#ef4444", new THREE.Vector3(10.2, 0, 0.05), 0.5));
      push(mkSprite("y", "#22c55e", new THREE.Vector3(0, 10.2, 0.05), 0.5));

      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 35) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        // Principal value α using the SIGNED k — correct for k < 0 too
        const alphaDeg = eqType === "sin" ? Math.asin(Math.max(-1, Math.min(1, k))) * 180 / Math.PI
          : eqType === "cos" ? Math.acos(Math.max(-1, Math.min(1, k))) * 180 / Math.PI
          : Math.atan(k) * 180 / Math.PI;
        const norm = (d: number, period: number) => ((d % period) + period) % period;

        // Plot y = sin/cos/tan(θ) over [0, range]
        const curvePts: THREE.Vector3[] = [];
        const steps = 400;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * range * Math.PI / 180;
          let y: number;
          if (eqType === "sin") y = Math.sin(theta);
          else if (eqType === "cos") y = Math.cos(theta);
          else y = Math.tan(theta);

          if (isFinite(y) && Math.abs(y) < 10) {
            const x = theta * 3;
            curvePts.push(new THREE.Vector3(x, y * 2.5, 0.02));
          }
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        // Horizontal line y = k
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, k * 2.5, 0), new THREE.Vector3(10, k * 2.5, 0)]),
          new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
        ));
        push(mkSprite(`y = ${k.toFixed(2)}`, "#fb923c", new THREE.Vector3(9.5, k * 2.5, 0), 0.6));

        // Find and mark intersection points (θ ∈ [0, range])
        const solutions: { deg: number }[] = [];
        const period = eqType === "tan" ? 180 : 360;
        let bases: number[];
        if (eqType === "sin") bases = [norm(alphaDeg, 360), norm(180 - alphaDeg, 360)];
        else if (eqType === "cos") bases = [norm(alphaDeg, 360), norm(-alphaDeg, 360)];
        else bases = [norm(alphaDeg, 180)];
        const uniq = Array.from(new Set(bases.map((d) => d.toFixed(4))));
        uniq.forEach((bs) => {
          const b0 = parseFloat(bs);
          for (let t = b0; t <= range + 1e-6; t += period) solutions.push({ deg: t });
        });

        solutions.forEach((sol) => {
          const x = sol.deg * Math.PI / 180 * 3;
          const y = eqType === "sin" ? Math.sin(sol.deg * Math.PI / 180) :
                    eqType === "cos" ? Math.cos(sol.deg * Math.PI / 180) :
                    Math.tan(sol.deg * Math.PI / 180);
          if (Math.abs(y - k) < 0.02 && Math.abs(y) < 8 && x <= 10) {
            const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
            dot.position.set(x, y * 2.5, 0.05);
            addLabel(scene, meshes, labelSprites, `θ=${sol.deg.toFixed(0)}°`, 0xf87171, dot.position.clone().add(new THREE.Vector3(0, 0.7, 0)), 0.65);
          }
        });

        // General solution (n ∈ ℤ)
        const a1 = alphaDeg.toFixed(1);
        const genSol = eqType === "sin" ? `θ = nπ + (−1)ⁿ·(${a1}°)` :
                       eqType === "cos" ? `θ = 2nπ ± (${a1}°)` :
                       `θ = nπ + (${a1}°)`;
        addLabel(scene, meshes, labelSprites, "General: " + genSol, 0xa78bfa, new THREE.Vector3(0, -8, 0), 0.7);
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
  }, [eqType, k, range, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Trigonometric Equations" description="Equation solver visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Trigonometric Equations</span>
          <span className="text-xs text-muted-foreground font-normal">Find solutions graphically</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-orange-500/50 bg-orange-500/10 text-orange-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Equation Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["sin", "cos", "tan"] as EqType[]).map((t) => (
              <button
                key={t}
                onClick={() => setEqType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  eqType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t === "sin" ? "sin θ = k" : t === "cos" ? "cos θ = k" : "tan θ = k"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-20"><Label className="text-xs text-muted-foreground">k:</Label><Input type="number" step="0.1" min={-1} max={1} value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-20"><Label className="text-xs text-muted-foreground">Range°:</Label><Input type="number" step="90" min={180} max={720} value={range} onChange={(e) => setRange(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={(() => {
            const kc = eqType === "tan" ? k : Math.max(-1, Math.min(1, k));
            const alphaRad = eqType === "sin" ? Math.asin(kc) : eqType === "cos" ? Math.acos(kc) : Math.atan(k);
            const alphaDeg = (alphaRad * 180) / Math.PI;
            const norm = (d: number, p: number) => ((d % p) + p) % p;
            const within = eqType === "sin"
              ? [norm(alphaDeg, 360), norm(180 - alphaDeg, 360)].sort((s, t) => s - t)
              : eqType === "cos"
              ? [norm(alphaDeg, 360), norm(-alphaDeg, 360)].sort((s, t) => s - t)
              : [norm(alphaDeg, 180)];
            const fn = eqType === "sin" ? "sin" : eqType === "cos" ? "cos" : "tan";
            return [
              { label: "Equation", value: `${fn} θ = ${k.toFixed(2)}`, highlight: true },
              { label: "Principal α", value: `${alphaDeg.toFixed(1)}°`, unit: `= ${alphaRad.toFixed(3)} rad` },
              { label: "General solution", value: info.general },
              { label: `Solutions in [0, ${range}°)`, value: within.map((d) => `${d.toFixed(0)}°`).join(", ") },
              { label: "Period", value: info.period },
            ];
          })()}
        />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">General Solutions</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">{info.head}:</strong> {info.general}, where {info.principal.toLowerCase()}.</p>
            <p><strong className="text-foreground">sin θ = k:</strong> θ = nπ + α or θ = nπ − α, where α = sin⁻¹k</p>
            <p><strong className="text-foreground">cos θ = k:</strong> θ = 2nπ ± α, where α = cos⁻¹k</p>
            <p><strong className="text-foreground">tan θ = k:</strong> θ = nπ + α, where α = tan⁻¹k</p>
            <p><strong className="text-foreground">n ∈ Z</strong> — integer, giving infinitely many solutions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
