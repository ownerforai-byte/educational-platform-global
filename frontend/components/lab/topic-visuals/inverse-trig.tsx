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
   Inverse Circular Functions — NEB Trigonometry (Maths 11)
   Unit circle visualization showing inverse trig functions
   and their principal value ranges.
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

function addLabel(scene: THREE.Scene, meshes: THREE.Object3D[], labelSprites: THREE.Sprite[], text: string, color: number, pos: THREE.Vector3, scale = 0.8) {
  const s = mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, pos, scale);
  scene.add(s);
  meshes.push(s);
  labelSprites.push(s);
}

type InvFunc = "asin" | "acos" | "atan";

const IT_INFO: Record<InvFunc, { head: string; domain: string; range: string; prop: string; example: string }> = {
  asin: {
    head: "y = sin⁻¹x  (arcsine)",
    domain: "[−1, 1]",
    range: "[−π/2, π/2]  (principal values)",
    prop: "Odd function: sin⁻¹(−x) = −sin⁻¹x",
    example: "sin⁻¹(1/2) = π/6 = 30°, the unique y ∈ [−π/2, π/2] with sin y = 1/2",
  },
  acos: {
    head: "y = cos⁻¹x  (arccosine)",
    domain: "[−1, 1]",
    range: "[0, π]  (principal values)",
    prop: "cos⁻¹(−x) = π − cos⁻¹x",
    example: "cos⁻¹(1/2) = π/3 = 60°, the unique y ∈ [0, π] with cos y = 1/2",
  },
  atan: {
    head: "y = tan⁻¹x  (arctangent)",
    domain: "ℝ (all real numbers)",
    range: "(−π/2, π/2)  (open interval)",
    prop: "Odd; horizontal asymptotes y = ±π/2",
    example: "tan⁻¹(1) = π/4 = 45°, the unique y ∈ (−π/2, π/2) with tan y = 1",
  },
};

export function InverseTrigVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [func, setFunc] = useState<InvFunc>("asin");
  const [angleDeg, setAngleDeg] = useState(45);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = IT_INFO[func];

  const presets: ScenePreset[] = [
    { name: "sin⁻¹(√2/2)", hint: "45° → principal value π/4", apply: () => { setFunc("asin"); setAngleDeg(45); setRunId((r) => r + 1); } },
    { name: "cos⁻¹(−1/2)", hint: "120° lies in [0, π]", apply: () => { setFunc("acos"); setAngleDeg(120); setRunId((r) => r + 1); } },
    { name: "tan⁻¹(√3)", hint: "60° → π/3 in (−π/2, π/2)", apply: () => { setFunc("atan"); setAngleDeg(60); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFunc("asin");
    setAngleDeg(45);
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
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const rad = angleDeg * Math.PI / 180;
        let value: number, domainLabel: string, rangeLabel: string;

        if (func === "asin") {
          value = Math.asin(Math.sin(rad));
          domainLabel = "[-1, 1]";
          rangeLabel = "[-π/2, π/2]";
        } else if (func === "acos") {
          value = Math.acos(Math.cos(rad));
          domainLabel = "[-1, 1]";
          rangeLabel = "[0, π]";
        } else {
          value = Math.atan(Math.tan(rad));
          domainLabel = "all reals";
          rangeLabel = "(-π/2, π/2)";
        }

        // Unit circle
        const circlePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 100; i++) {
          const t = (i / 100) * Math.PI * 2;
          circlePts.push(new THREE.Vector3(Math.cos(t), Math.sin(t), 0.02));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePts), new THREE.LineBasicMaterial({ color: 0x60a5fa, linewidth: 2 })));

        // Angle arc
        const arcPts: THREE.Vector3[] = [];
        const arcSteps = 30;
        for (let i = 0; i <= arcSteps; i++) {
          const t = (i / arcSteps) * value;
          arcPts.push(new THREE.Vector3(1.5 * Math.cos(t), 1.5 * Math.sin(t), 0.03));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 3 })));

        // Point on circle
        const px = Math.cos(rad), py = Math.sin(rad);
        const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
        dot.position.set(px, py, 0.05);
        addLabel(scene, meshes, labelSprites, `P(${px.toFixed(2)}, ${py.toFixed(2)})`, 0xf87171, dot.position.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.7);

        // Principal value point
        const pvx = Math.cos(value), pvy = Math.sin(value);
        const pvDot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0x22d3ee })));
        pvDot.position.set(pvx, pvy, 0.06);

        // Arrow from angle to principal value
        push(new LiveLeaderLine(
          new THREE.Vector3(pvx - px, pvy - py, 0).normalize(),
          new THREE.Vector3(px, py, 0.05),
          Math.sqrt((pvx - px) ** 2 + (pvy - py) ** 2),
          0x22d3ee, 0.15, 0.1
        ));

        // Result label
        const tanInput = Math.abs(px) < 1e-9 ? "undefined" : (py / px).toFixed(2);
        const resultText = func === "asin" ? `sin⁻¹(${py.toFixed(2)}) = ${value.toFixed(3)} rad` :
                           func === "acos" ? `cos⁻¹(${px.toFixed(2)}) = ${value.toFixed(3)} rad` :
                           `tan⁻¹(${tanInput}) = ${value.toFixed(3)} rad`;
        addLabel(scene, meshes, labelSprites, resultText, 0xfbbf24, new THREE.Vector3(0, 7, 0), 0.85);
        addLabel(scene, meshes, labelSprites, `Domain: ${domainLabel}  Range: ${rangeLabel}`, 0xa78bfa, new THREE.Vector3(0, 6, 0), 0.8);

        // sin, cos, tan curves
        const drawCurve = (fn: (x: number) => number, color: number, label: string) => {
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 200; i++) {
            const x = -10 + (i / 200) * 20;
            const y = fn(x);
            if (isFinite(y) && Math.abs(y) < 8) {
              pts.push(new THREE.Vector3(x, y, 0.02));
            }
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color })));
          push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(-9, Math.max(-6, Math.min(6, fn(0) + 1))), 0.6));
        };

        if (func === "asin") {
          drawCurve(x => Math.asin(Math.min(1, Math.max(-1, x))), 0x22c55e, "y = sin⁻¹x");
        } else if (func === "acos") {
          drawCurve(x => Math.acos(Math.min(1, Math.max(-1, x))), 0x22c55e, "y = cos⁻¹x");
        } else {
          drawCurve(x => Math.atan(x), 0x22c55e, "y = tan⁻¹x");
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [func, angleDeg, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Inverse Circular Functions" description="Unit circle visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Inverse Circular Functions</span>
          <span className="text-xs text-muted-foreground font-normal">sin⁻¹, cos⁻¹, tan⁻¹ on unit circle</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Inverse Function">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["asin", "acos", "atan"] as InvFunc[]).map((f) => (
              <button
                key={f}
                onClick={() => setFunc(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  func === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f === "asin" ? "sin⁻¹" : f === "acos" ? "cos⁻¹" : "tan⁻¹"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Angle (degrees)">
          <input type="range" min={-180} max={180} value={angleDeg} onChange={(e) => setAngleDeg(Number(e.target.value))} className="w-full mt-1" />
          <p className="text-xs font-mono text-primary mt-1">{angleDeg}° = {(angleDeg * Math.PI / 180).toFixed(3)} rad</p>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={(() => {
            const rad = (angleDeg * Math.PI) / 180;
            const trigVal = func === "asin" ? Math.sin(rad) : func === "acos" ? Math.cos(rad) : Math.tan(rad);
            const principal = func === "asin" ? Math.asin(Math.sin(rad)) : func === "acos" ? Math.acos(Math.cos(rad)) : Math.atan(Math.tan(rad));
            const fnName = func === "asin" ? "sin⁻¹" : func === "acos" ? "cos⁻¹" : "tan⁻¹";
            const input = func === "atan" ? (Math.abs(Math.cos(rad)) < 1e-9 ? "undefined" : trigVal.toFixed(3)) : trigVal.toFixed(3);
            return [
              { label: "Function", value: info.head, highlight: true },
              { label: "Angle", value: `${angleDeg}°`, unit: `= ${rad.toFixed(3)} rad` },
              { label: `${fnName} input`, value: input },
              { label: "Principal value", value: principal.toFixed(4), unit: `= ${(principal * 180 / Math.PI).toFixed(1)}°` },
              { label: "Domain", value: info.domain },
              { label: "Range", value: info.range },
            ];
          })()}
        />

        <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">Principal Values</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">{info.head}:</strong> {info.prop}. {info.example}.</p>
            <p><strong className="text-foreground">sin⁻¹x:</strong> Domain [−1, 1], Range [−π/2, π/2]</p>
            <p><strong className="text-foreground">cos⁻¹x:</strong> Domain [−1, 1], Range [0, π]</p>
            <p><strong className="text-foreground">tan⁻¹x:</strong> Domain ℝ, Range (−π/2, π/2)</p>
            <p><strong className="text-foreground">Key identity:</strong> sin⁻¹x + cos⁻¹x = π/2 for all x ∈ [−1, 1]</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
