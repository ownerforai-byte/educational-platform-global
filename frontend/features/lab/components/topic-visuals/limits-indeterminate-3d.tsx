"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.5 * scale, 0.65 * scale, 1);
  return s;
}

type IndeterminateType = "zero_zero" | "inf_inf" | "lhopital";

const IND_INFO: Record<IndeterminateType, { concept: string; example: string; strategy: string; fact: string; tip: string }> = {
  zero_zero: {
    concept: "0/0 form — both parts shrink to zero",
    example: "lim(x→0) sin x / x",
    strategy: "Compare rates: sin x and x vanish at the same rate, so the ratio → 1.",
    fact: "sin x / x has no value at x = 0 yet its limit there is exactly 1.",
    tip: "0/0 is 'indeterminate' — arithmetic gives no answer; the rates decide.",
  },
  inf_inf: {
    concept: "∞/∞ form — both parts grow without bound",
    example: "lim(x→∞) x / ln x = ∞",
    strategy: "Compare growth orders: x outruns ln x, so the ratio diverges.",
    fact: "Growth hierarchy as x → ∞: ln x ≪ xⁿ ≪ eˣ — lower-order partners lose.",
    tip: "∞ is not a number; ∞/∞ asks which function grows faster.",
  },
  lhopital: {
    concept: "L'Hôpital's rule — differentiate top and bottom",
    example: "lim(x→0) f/g = lim(x→0) f′/g′ for 0/0 or ∞/∞",
    strategy: "f = sin x·e^(−x²/8), g = 0.3x·e^(−x²/8): f′(0) = 1, g′(0) = 0.3.",
    fact: "Here the ratio locks onto 1/0.3 = 10/3 ≈ 3.333, even though f(0) = g(0) = 0.",
    tip: "Check the form first — plugging f′/g′ into a determinate ratio gives wrong answers.",
  },
};

export function LimitsIndeterminate3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [formType, setFormType] = useState<IndeterminateType>("zero_zero");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = IND_INFO[formType];

  const presets: ScenePreset[] = [
    { name: "0/0: sin x / x", hint: "Ratio → 1 even though both → 0", apply: () => { setFormType("zero_zero"); setRunId((r) => r + 1); } },
    { name: "∞/∞: x / ln x", hint: "x grows faster — ratio diverges", apply: () => { setFormType("inf_inf"); setRunId((r) => r + 1); } },
    { name: "L'Hôpital in action", hint: "f′(0)/g′(0) = 10/3", apply: () => { setFormType("lhopital"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFormType("zero_zero");
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  const readoutItems = (() => {
    if (formType === "zero_zero") {
      const x = 0.001;
      return [
        { label: "Form", value: "0/0 — sin x → 0 and x → 0" },
        { label: "Numerator sin(0.001)", value: Math.sin(x).toFixed(6) },
        { label: "Denominator x = 0.001", value: x.toFixed(6) },
        { label: "Ratio sin x / x at 0.001", value: (Math.sin(x) / x).toFixed(6), highlight: true },
        { label: "lim(x→0) sin x / x", value: "1" },
        { label: "Strategy", value: info.strategy },
      ];
    }
    if (formType === "inf_inf") {
      const x = 1000;
      return [
        { label: "Form", value: "∞/∞ — x → ∞ and ln x → ∞" },
        { label: "Numerator x = 1000", value: "1000" },
        { label: "Denominator ln(1000)", value: Math.log(x).toFixed(3) },
        { label: "Ratio x / ln x at 1000", value: (x / Math.log(x)).toFixed(1), highlight: true },
        { label: "lim(x→∞) x / ln x", value: "∞ — x wins the growth race" },
        { label: "Strategy", value: info.strategy },
      ];
    }
    const x = 0.001;
    const f = Math.sin(x) * Math.exp(-(x * x) / 8);
    const g = 0.3 * x * Math.exp(-(x * x) / 8);
    return [
      { label: "Form", value: "0/0 — f(0) = g(0) = 0" },
      { label: "f / g at x = 0.001", value: (f / g).toFixed(4) },
      { label: "f′(0)", value: "1" },
      { label: "g′(0)", value: "0.3" },
      { label: "f′(0) / g′(0)", value: (1 / 0.3).toFixed(4), highlight: true },
      { label: "lim(x→0) f / g", value: "10/3 ≈ 3.333" },
    ];
  })();


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

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      if (formType === "zero_zero") {
        push(mkSprite("0/0 Form: lim(x→0) sin x / x", "#f59e0b", new THREE.Vector3(0, 4.5, 0)));
        const sinPts: THREE.Vector3[] = [];
        const linePts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.1) {
          sinPts.push(new THREE.Vector3(x, Math.sin(x), 0));
          linePts.push(new THREE.Vector3(x, x * 0.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sinPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        const ratioPts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.05) {
          if (Math.abs(x) < 0.1) continue;
          ratioPts.push(new THREE.Vector3(x, Math.sin(x) / x, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ratioPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        push(mkSprite("sin x / x → 1", "#f59e0b", new THREE.Vector3(0, 1.2, 0)));
        push(mkSprite("Both → 0, ratio → 1", "#34d399", new THREE.Vector3(0, -2.5, 0)));
      } else if (formType === "inf_inf") {
        // A genuine ∞/∞ pair: both x and ln x diverge as x → ∞.
        push(mkSprite("∞/∞ Form: lim(x→∞) x / ln x", "#ec4899", new THREE.Vector3(0, 4.5, 0)));
        const xPts: THREE.Vector3[] = [];
        const lnPts: THREE.Vector3[] = [];
        const ratioPts: THREE.Vector3[] = [];
        for (let x = 0.5; x <= 8; x += 0.1) {
          xPts.push(new THREE.Vector3(x, x * 0.4, 0));
          lnPts.push(new THREE.Vector3(x, Math.log(x) * 1.2, 0));
        }
        for (let x = 1.2; x <= 8; x += 0.1) {
          ratioPts.push(new THREE.Vector3(x, (x / Math.log(x)) * 0.25, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(xPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(lnPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ratioPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        push(mkSprite("x → ∞", "#60a5fa", new THREE.Vector3(6, 2.5, 0)));
        push(mkSprite("ln x → ∞, but slower", "#34d399", new THREE.Vector3(6, -1, 0)));
        push(mkSprite("ratio x/ln x → ∞ (no fixed answer)", "#ec4899", new THREE.Vector3(0, -3.5, 0)));
      } else {
        push(mkSprite("L'Hôpital's Rule", "#a78bfa", new THREE.Vector3(0, 4.5, 0)));
        const fPts: THREE.Vector3[] = [];
        const gPts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.05) {
          fPts.push(new THREE.Vector3(x, Math.sin(x) * Math.exp(-x * x / 8), 0));
          gPts.push(new THREE.Vector3(x, x * 0.3 * Math.exp(-x * x / 8), 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(gPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        const ratioPts: THREE.Vector3[] = [];
        for (let x = -3; x <= 3; x += 0.02) {
          if (Math.abs(x) < 0.05) continue;
          const f = Math.sin(x) * Math.exp(-x * x / 8);
          const g = x * 0.3 * Math.exp(-x * x / 8);
          ratioPts.push(new THREE.Vector3(x, f / g, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ratioPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        push(mkSprite("f / g → 10/3 ≈ 3.33", "#f59e0b", new THREE.Vector3(2, 3.2, 0)));
        push(mkSprite("= f′/g′ at x = 0 → 10/3", "#a78bfa", new THREE.Vector3(2, -2, 0)));
      }

      meshes.forEach((m) => { if (m instanceof THREE.Sprite) labelSprites.push(m); });
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
  }, [formType, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Indeterminate Forms" description="Visualize 0/0 and inf/inf forms — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Indeterminate Forms — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Explore 0/0 and ∞/∞ scenarios</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-rose-500/50 bg-rose-500/10 text-rose-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Form Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["zero_zero", "inf_inf", "lhopital"] as IndeterminateType[]).map((t) => (
              <button key={t} onClick={() => setFormType(t)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${formType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {t === "zero_zero" ? "0/0 Form" : t === "inf_inf" ? "∞/∞ Form" : "L'Hôpital"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={readoutItems} />

        <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">Indeterminate Forms</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">0/0 form:</strong> Both numerator and denominator approach zero.</p>
            <p><strong className="text-foreground">∞/∞ form:</strong> Both grow without bound — the faster grower wins.</p>
            <p><strong className="text-foreground">L'Hôpital:</strong> If lim f/g is 0/0 or ∞/∞, then lim f/g = lim f′/g′.</p>
            <p><strong className="text-foreground">This scene:</strong> {info.concept} — {info.example}.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}