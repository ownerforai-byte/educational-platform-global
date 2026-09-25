"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, PlaybackBar, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/* ============================================================
   Derivative Visual — NEB Calculus (Maths 11 & 12)
   Shows the tangent line moving along a curve, illustrating
   the derivative as the instantaneous rate of change.
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

type DVFunc = "quadratic" | "cubic" | "trig" | "exp";

const DV_INFO: Record<DVFunc, { formula: string; dfdx: string; meaning: string; tip: string }> = {
  quadratic: {
    formula: "f(x) = 0.3x^2 - 1.5",
    dfdx: "f'(x) = 0.6x",
    meaning: "Slope is proportional to x — horizontal only at the vertex x = 0",
    tip: "Power rule: bring the exponent down, reduce it by one; constants vanish",
  },
  cubic: {
    formula: "f(x) = 0.1x^3 - 0.5x",
    dfdx: "f'(x) = 0.3x^2 - 0.5",
    meaning: "Negative slope between the turning points x = ±√(5/3) ≈ ±1.29, positive outside",
    tip: "f' = 0 exactly where f has its local max and min — solving 0.3x^2 = 0.5",
  },
  trig: {
    formula: "f(x) = 2sin x",
    dfdx: "f'(x) = 2cos x",
    meaning: "Steepest at the midline crossings (|slope| = 2), flat at the crest x = π/2",
    tip: "The derivative of a sinusoid is the same sinusoid shifted by π/2",
  },
  exp: {
    formula: "f(x) = 0.6·e^(−x^2/4)",
    dfdx: "f'(x) = −0.3x·e^(−x^2/4)",
    meaning: "A bell curve — rising left of centre, flat at x = 0, falling right of it",
    tip: "Chain rule on e^u with u = −x^2/4: multiply by u' = −x/2",
  },
};

export function DerivativeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [func, setFunc] = useState<DVFunc>("quadratic");
  const [tx, setTx] = useState(1.5);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const playingRef = useRef(true);

  useEffect(() => { speedRef.current = speed; playingRef.current = playing; }, [speed, playing]);

  const info = DV_INFO[func];

  const presets: ScenePreset[] = [
    { name: "Flat at vertex", hint: "Quadratic at x = 0: f' = 0", apply: () => { setFunc("quadratic"); setTx(0); setRunId((r) => r + 1); } },
    { name: "Cubic turning point", hint: "f' = 0 at x = √(5/3) ≈ 1.29", apply: () => { setFunc("cubic"); setTx(1.3); setRunId((r) => r + 1); } },
    { name: "Sine crest", hint: "2sin x peaks at π/2 with slope 0", apply: () => { setFunc("trig"); setTx(Math.PI / 2); setRunId((r) => r + 1); } },
    { name: "Bell flank", hint: "Steepest descent right of centre", apply: () => { setFunc("exp"); setTx(2); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFunc("quadratic");
    setTx(1.5);
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
    setRunId((r) => r + 1);
  };


  const f = useCallback((x: number) => {
    switch (func) {
      case "quadratic": return 0.3 * x * x - 1.5;
      case "cubic": return 0.1 * x * x * x - 0.5 * x;
      case "trig": return Math.sin(x) * 2;
      case "exp": return 0.15 * Math.exp(-x * x / 4) * 4;
    }
  }, [func]);

  const df = useCallback((x: number) => {
    switch (func) {
      case "quadratic": return 0.6 * x;
      case "cubic": return 0.3 * x * x - 0.5;
      case "trig": return Math.cos(x) * 2;
      case "exp": return 0.15 * (-x / 2) * Math.exp(-x * x / 4) * 4;
    }
  }, [func]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let tangentPoint: THREE.Mesh;

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
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 25;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const disposeObj = (m: THREE.Object3D) => {
        scene.remove(m);
        if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
      };

      const mkAxis = (from: THREE.Vector2, to: THREE.Vector2, color: number, label: string) => {
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(from.x, from.y, 0), new THREE.Vector3(to.x, to.y, 0)]),
          new THREE.LineBasicMaterial({ color }),
        ));
        const s = push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(to.x, to.y, 0.05), 0.6));
        labelSprites.push(s);
      };
      mkAxis(new THREE.Vector2(-10, 0), new THREE.Vector2(10, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector2(0, -10), new THREE.Vector2(0, 10), 0x22c55e, "y");

      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      // Build curve
      const curvePts: THREE.Vector3[] = [];
      for (let i = 0; i <= 400; i++) {
        const x = -10 + (i / 400) * 20;
        const y = f(x);
        if (Math.abs(y) < 15) curvePts.push(new THREE.Vector3(x, y, 0.02));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

      const overlay: THREE.Object3D[] = [];
      const pushO = <T extends THREE.Object3D>(o: T): T => { push(o); overlay.push(o); return o; };

      const updateTangent = () => {
        // Remove previous tangent overlays (tangent line, point, labels, slope triangle)
        overlay.splice(0).forEach(disposeObj);
        for (let i = labelSprites.length - 1; i >= 0; i--) if (!labelSprites[i].parent) labelSprites.splice(i, 1);

        const y0 = f(tx);
        const slope = df(tx);

        // Tangent line: y = slope*(x - tx) + y0
        const tanLen = 6;
        const x1 = tx - tanLen, x2 = tx + tanLen;
        const y1 = slope * (x1 - tx) + y0;
        const y2 = slope * (x2 - tx) + y0;
        pushO(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x1, y1, 0.03), new THREE.Vector3(x2, y2, 0.03)]),
          new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
        ));

        // Point on curve
        const pt = pushO(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }))) as THREE.Mesh;
        pt.position.set(tx, y0, 0.05);
        tangentPoint = pt;
        const ptLabel = pushO(mkSprite(`P(${tx.toFixed(1)}, ${y0.toFixed(2)})`, "#f87171", pt.position.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.75));
        labelSprites.push(ptLabel);

        // Slope triangle
        const dx = 1.0;
        const dy = slope * dx;
        const risePt = new THREE.Vector3(tx + dx, y0 + dy, 0.03);
        const runPt = new THREE.Vector3(tx + dx, y0, 0.03);
        const runLine = pushO(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(tx, y0, 0.03), runPt]), new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.12, gapSize: 0.08 }))) as THREE.Line;
        runLine.computeLineDistances();
        const riseLine = pushO(new THREE.Line(new THREE.BufferGeometry().setFromPoints([runPt, risePt]), new THREE.LineDashedMaterial({ color: 0x22c55e, dashSize: 0.12, gapSize: 0.08 }))) as THREE.Line;
        riseLine.computeLineDistances();
        const slopeLabel = pushO(mkSprite(`m = f'(${tx.toFixed(1)}) = ${slope.toFixed(2)}`, "#4ade80", new THREE.Vector3(tx + dx + 0.3, y0 + dy / 2, 0.05), 0.75));
        labelSprites.push(slopeLabel);
      };

      updateTangent();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (playingRef.current) animTime += 0.012 * speedRef.current;
        const txAuto = 1.5 * Math.sin(animTime * 0.5);
        if (tangentPoint) {
          tangentPoint.position.x = txAuto;
          tangentPoint.position.y = f(txAuto);
        }
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
  }, [func, tx, isWebGL, f, df, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Derivative Visual" description="Tangent line animation — requires WebGL." />;
  }

  const y0Shown = f(tx);
  const slopeShown = df(tx);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Derivative — Tangent Line Visualization</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to pan · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Function">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["quadratic", "cubic", "trig", "exp"] as const).map((fn) => (
              <button
                key={fn}
                onClick={() => setFunc(fn)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  func === fn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {fn === "quadratic" ? "f(x) = 0.3x² − 1.5" : fn === "cubic" ? "f(x) = 0.1x³ − 0.5x" : fn === "trig" ? "f(x) = 2sin(x)" : "f(x) = 0.6·e^(−x²/4)"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Point P (tangent position)">
          <div className="w-24 mt-1">
            <Label className="text-xs text-muted-foreground">x = tx:</Label>
            <Input type="range" min={-8} max={8} step={0.1} value={tx} onChange={(e) => setTx(Number(e.target.value))} className="mt-1 w-full" />
            <p className="text-xs font-mono text-primary mt-1">{tx.toFixed(2)}</p>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <PlaybackBar
          playing={playing}
          onPlayToggle={() => setPlaying((p) => !p)}
          speed={speed}
          onSpeedChange={setSpeed}
          onReset={resetAll}
        />

        <ReadoutGrid
          items={[
            { label: "Curve", value: info.formula },
            { label: "Point P", value: `(${tx.toFixed(2)}, ${y0Shown.toFixed(2)})` },
            { label: "Tangent slope f'(x)", value: slopeShown.toFixed(3), highlight: true },
            { label: "Derivative formula", value: info.dfdx },
            { label: "Normal slope", value: Math.abs(slopeShown) < 1e-6 ? "undefined (normal is vertical)" : (-1 / slopeShown).toFixed(3) },
            { label: "Angle of inclination", value: `${((Math.atan(slopeShown) * 180) / Math.PI).toFixed(1)}°` },
          ]}
        />

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">What You're Seeing</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Orange line:</strong> The tangent line to the curve at P — its slope equals f&apos;(tx).</p>
            <p><strong className="text-foreground">Green dashed segment:</strong> The "rise" — change in y over a run of 1 unit.</p>
            <p><strong className="text-foreground">Derivative:</strong> f&apos;(x) = lim(h→0) [f(x+h) − f(x)] / h — the slope of the tangent at every point.</p>
            <p><strong className="text-foreground">This curve:</strong> {info.meaning}.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
