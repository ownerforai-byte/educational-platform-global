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
   Formation of Differential Equations — NEB Calculus (Maths 12)
   Shows how arbitrary constants are eliminated to form DEs,
   with family of curves visualization.
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

type DeFamily = "exp-pm" | "trig" | "exp-23" | "lines";

const FORM_INFO: Record<DeFamily, { general: string; d1: string; d2: string; de: string; note: string; eval: (x: number, k1: number, k2: number) => number; d1eval: (x: number, k1: number, k2: number) => number }> = {
  "exp-pm": {
    general: "y = c₁eˣ + c₂e⁻ˣ",
    d1: "y′ = c₁eˣ − c₂e⁻ˣ",
    d2: "y″ = c₁eˣ + c₂e⁻ˣ = y",
    de: "y″ − y = 0",
    note: "Differentiate twice; y″ reproduces y, so both constants vanish at once.",
    eval: (x, k1, k2) => k1 * Math.exp(x) + k2 * Math.exp(-x),
    d1eval: (x, k1, k2) => k1 * Math.exp(x) - k2 * Math.exp(-x),
  },
  trig: {
    general: "y = c₁cos x + c₂sin x",
    d1: "y′ = −c₁sin x + c₂cos x",
    d2: "y″ = −c₁cos x − c₂sin x = −y",
    de: "y″ + y = 0",
    note: "Simple harmonic motion DE — characteristic roots r = ±i.",
    eval: (x, k1, k2) => k1 * Math.cos(x) + k2 * Math.sin(x),
    d1eval: (x, k1, k2) => -k1 * Math.sin(x) + k2 * Math.cos(x),
  },
  "exp-23": {
    general: "y = c₁e²ˣ + c₂e³ˣ",
    d1: "y′ = 2c₁e²ˣ + 3c₂e³ˣ",
    d2: "y″ = 4c₁e²ˣ + 9c₂e³ˣ",
    de: "y″ − 5y′ + 6y = 0",
    note: "Characteristic equation r² − 5r + 6 = 0 factors as (r − 2)(r − 3) = 0.",
    eval: (x, k1, k2) => k1 * Math.exp(2 * x) + k2 * Math.exp(3 * x),
    d1eval: (x, k1, k2) => 2 * k1 * Math.exp(2 * x) + 3 * k2 * Math.exp(3 * x),
  },
  lines: {
    general: "y = c₁x + c₂ (family of straight lines)",
    d1: "y′ = c₁",
    d2: "y″ = 0",
    de: "y″ = 0",
    note: "Two arbitrary constants → a second-order DE whose solutions are all lines.",
    eval: (x, k1, k2) => k1 * x + k2,
    d1eval: (_x, k1) => k1,
  },
};

export function FormationDEVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [family, setFamily] = useState<DeFamily>("exp-pm");
  const [c1, setC1] = useState(1);
  const [c2, setC2] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = FORM_INFO[family];
  const fmtD = (v: number) => (isFinite(v) ? v.toFixed(2) : "∞");

  const presets: ScenePreset[] = [
    { name: "y″ − y = 0", hint: "From y = c₁eˣ + c₂e⁻ˣ", apply: () => { setFamily("exp-pm"); setC1(1); setC2(0); setRunId((r) => r + 1); } },
    { name: "y″ + y = 0", hint: "From y = c₁cos x + c₂sin x", apply: () => { setFamily("trig"); setC1(1); setC2(0); setRunId((r) => r + 1); } },
    { name: "y″ − 5y′ + 6y = 0", hint: "From y = c₁e²ˣ + c₂e³ˣ", apply: () => { setFamily("exp-23"); setC1(1); setC2(0.5); setRunId((r) => r + 1); } },
    { name: "y″ = 0", hint: "From the family of lines y = c₁x + c₂", apply: () => { setFamily("lines"); setC1(1); setC2(1); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFamily("exp-pm");
    setC1(1);
    setC2(0);
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

      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
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

        // Family of curves for the selected general solution (2 arbitrary constants)
        const curveFn = info.eval;
        const colors = [0xef4444, 0x3b82f6, 0x22c55e, 0xfbbf24, 0xa78bfa, 0xf97316];
        for (let i = 0; i < 6; i++) {
          const cc1 = c1 + (i - 2) * 0.5;
          const cc2 = c2 + (i % 3 - 1) * 0.5;
          const pts: THREE.Vector3[] = [];
          for (let j = 0; j <= 200; j++) {
            const x = -8 + (j / 200) * 16;
            const y = curveFn(x, cc1, cc2);
            if (isFinite(y) && Math.abs(y) < 12) {
              pts.push(new THREE.Vector3(x, y, 0.02));
            }
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: colors[i], linewidth: 1 })));
        }

        // Highlight the specific curve for current c1, c2
        const mainPts: THREE.Vector3[] = [];
        for (let j = 0; j <= 200; j++) {
          const x = -8 + (j / 200) * 16;
          const y = curveFn(x, c1, c2);
          if (isFinite(y) && Math.abs(y) < 12) {
            mainPts.push(new THREE.Vector3(x, y, 0.05));
          }
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(mainPts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 3 })));

        labelSprites.push(push(mkSprite(`${info.general}   →   ${info.de}`, "#fbbf24", new THREE.Vector3(0, 8.5, 0), 0.85)));
        labelSprites.push(push(mkSprite(`2 arbitrary constants → 2nd order DE`, "#a78bfa", new THREE.Vector3(0, 7.5, 0), 0.75)));
        labelSprites.push(push(mkSprite(`c₁=${c1.toFixed(1)}, c₂=${c2.toFixed(1)}`, "#7dd3fc", new THREE.Vector3(-7, -8.5, 0), 0.7)));
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
  }, [family, c1, c2, isWebGL, runId, showLabels]);
// eslint-disable-next-line react-hooks/exhaustive-deps

  if (!isWebGL) {
    return <WebGLFallback title="Formation of DE" description="Family of curves — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Formation of Differential Equations</span>
          <span className="text-xs text-muted-foreground font-normal">Eliminating arbitrary constants</span>
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

        <CollapsibleControls label="General Solution (curve family)">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["exp-pm", "trig", "exp-23", "lines"] as DeFamily[]).map((fam) => (
              <button
                key={fam}
                onClick={() => setFamily(fam)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  family === fam ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {FORM_INFO[fam].de}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Constants (family of curves)">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">c₁:</Label><Input type="number" step="0.5" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">c₂:</Label><Input type="number" step="0.5" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Family of curves", value: info.general },
            { label: "First derivative", value: info.d1 },
            { label: "Second derivative", value: info.d2 },
            { label: "Formed DE", value: info.de, highlight: true },
            { label: `Particular curve (c₁=${c1.toFixed(1)}, c₂=${c2.toFixed(1)})`, value: `y(0) = ${fmtD(info.eval(0, c1, c2))}, y′(0) = ${fmtD(info.d1eval(0, c1, c2))}` },
            { label: "Elimination", value: info.note },
          ]}
        />

        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Key Idea · {info.general}</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Rule:</strong> To eliminate n arbitrary constants, differentiate n times to get n+1 equations, then eliminate constants.</p>
            <p><strong className="text-foreground">Example:</strong> {info.general} → {info.d1} → {info.d2} → <strong className="text-foreground">{info.de}</strong></p>
            <p><strong className="text-foreground">Order of DE</strong> = number of arbitrary constants eliminated</p>
            <p><strong className="text-foreground">Each curve</strong> in the family corresponds to specific values of c₁, c₂.</p>
            <p><strong className="text-foreground">Note:</strong> {info.note}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
