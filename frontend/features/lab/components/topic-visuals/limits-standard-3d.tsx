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

type StandardLimit = "sinx_over_x" | "e_def" | "power_rule" | "log_limit";

const STD_INFO: Record<StandardLimit, { concept: string; formula: string; derivation: string; fact: string; tip: string }> = {
  sinx_over_x: {
    concept: "Geometric squeeze — arc and chord trap the ratio",
    formula: "lim(x→0) sin x / x = 1",
    derivation: "Squeeze theorem: cos x ≤ sin x / x ≤ 1 near 0, and cos x → 1.",
    fact: "This limit IS the slope of sin x at 0 — it births (sin x)′ = cos x.",
    tip: "Only true for radians; in degrees the limit becomes π/180.",
  },
  e_def: {
    concept: "A monotone bounded sequence settling on e",
    formula: "lim(n→∞) (1 + 1/n)ⁿ = e ≈ 2.71828",
    derivation: "(1 + 1/n)ⁿ increases with n yet stays below 3 — so it converges.",
    fact: "e was born from compound interest: 100% growth compounded n times.",
    tip: "Each extra decimal of e needs roughly 10× larger n — convergence is slow.",
  },
  power_rule: {
    concept: "Difference quotient of x³ at x = 2",
    formula: "lim(h→0) [(2+h)³ − 2³] / h = 3·2² = 12",
    derivation: "Expand (2+h)³: the h cancels, leaving 12 + 6h + h² → 12.",
    fact: "The plotted curve IS f′(2) computed with a shrinking h — calculus in one picture.",
    tip: "This generalises to the power rule: lim(h→0) [(x+h)ⁿ − xⁿ]/h = n·xⁿ⁻¹.",
  },
  log_limit: {
    concept: "Slope of ln x at x = 1 in disguise",
    formula: "lim(x→0) ln(1+x) / x = 1",
    derivation: "Substitute 1 + x = eᵗ: the ratio becomes t / (eᵗ − 1) → 1.",
    fact: "ln(1+x) ≈ x for tiny x — the linearisation behind calculators' log keys.",
    tip: "Mirror image of sin x / x → 1; both say 'the curve is its tangent near the point'.",
  },
};

export function LimitsStandard3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [limitType, setLimitType] = useState<StandardLimit>("sinx_over_x");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = STD_INFO[limitType];

  const presets: ScenePreset[] = [
    { name: "sin x / x → 1", hint: "Squeeze theorem, radians required", apply: () => { setLimitType("sinx_over_x"); setRunId((r) => r + 1); } },
    { name: "(1 + 1/n)ⁿ → e", hint: "Monotone bounded convergence", apply: () => { setLimitType("e_def"); setRunId((r) => r + 1); } },
    { name: "Power rule at x = 2", hint: "lim of the difference quotient = 12", apply: () => { setLimitType("power_rule"); setRunId((r) => r + 1); } },
    { name: "ln(1+x)/x → 1", hint: "Log limit, twin of sin x / x", apply: () => { setLimitType("log_limit"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setLimitType("sinx_over_x");
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  const stdReadouts = (() => {
    if (limitType === "sinx_over_x") {
      const x = 0.001;
      return [
        { label: "Formula", value: info.formula },
        { label: "sin(0.001) / 0.001", value: (Math.sin(x) / x).toFixed(7) },
        { label: "Lower squeeze cos(0.001)", value: Math.cos(x).toFixed(7) },
        { label: "Limit", value: 1, highlight: true },
        { label: "Proof idea", value: info.derivation },
        { label: "Caution", value: "Radians only — in degrees the limit is π/180" },
      ];
    }
    if (limitType === "e_def") {
      const v10 = Math.pow(1 + 1 / 10, 10);
      const v1000 = Math.pow(1 + 1 / 1000, 1000);
      return [
        { label: "Formula", value: info.formula },
        { label: "n = 10", value: v10.toFixed(6) },
        { label: "n = 1000", value: v1000.toFixed(6) },
        { label: "e = lim(n→∞)", value: Math.E.toFixed(6), highlight: true },
        { label: "|error at n = 1000|", value: Math.abs(v1000 - Math.E).toFixed(6) },
        { label: "Why it converges", value: "Increasing and bounded above by 3" },
      ];
    }
    if (limitType === "power_rule") {
      const dq = (h: number) => (Math.pow(2 + h, 3) - 8) / h;
      return [
        { label: "Formula", value: "lim(h→0) [(2+h)³ − 2³] / h" },
        { label: "h = 0.01", value: dq(0.01).toFixed(4) },
        { label: "h = −0.01", value: dq(-0.01).toFixed(4) },
        { label: "Limit = 3·2²", value: 12, highlight: true },
        { label: "General rule", value: "lim(h→0) [(x+h)ⁿ − xⁿ]/h = n·xⁿ⁻¹" },
        { label: "Meaning", value: "This limit is exactly f′(2) for f(x) = x³" },
      ];
    }
    const lp = (x: number) => Math.log(1 + x) / x;
    return [
      { label: "Formula", value: info.formula },
      { label: "x = 0.001", value: lp(0.001).toFixed(6) },
      { label: "x = −0.001", value: lp(-0.001).toFixed(6) },
      { label: "Limit", value: 1, highlight: true },
      { label: "Proof idea", value: info.derivation },
      { label: "Payoff", value: "ln(1+x) ≈ x for tiny x — the tangent line at x = 1" },
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
      scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      const titles: Record<StandardLimit, string> = {
        sinx_over_x: "lim(x→0) sin x / x = 1",
        e_def: "lim(n→∞) (1 + 1/n)ⁿ = e",
        power_rule: "lim(h→0) [(x+h)ⁿ − xⁿ] / h = n·xⁿ⁻¹",
        log_limit: "lim(x→0) ln(1+x) / x = 1",
      };
      push(mkSprite(titles[limitType], "#a78bfa", new THREE.Vector3(0, 4.2, 0)));

      if (limitType === "sinx_over_x") {
        const pts: THREE.Vector3[] = [];
        for (let x = -8; x <= 8; x += 0.05) {
          if (Math.abs(x) < 0.05) continue;
          pts.push(new THREE.Vector3(x, Math.sin(x) / x * 3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const hole = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.25, 32), new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide }));
        hole.position.set(0, 3, 0);
        push(hole);
        push(mkSprite("hole at (0,1)", "#f59e0b", new THREE.Vector3(0.5, 3.8, 0)));
        push(mkSprite("limit = 1", "#34d399", new THREE.Vector3(0, -1, 0)));
      } else if (limitType === "e_def") {
        const eValue = Math.E;
        const nValues = [1, 2, 5, 10, 50, 100, 500, 1000];
        nValues.forEach((n, i) => {
          const val = Math.pow(1 + 1 / n, n);
          const x = -4 + i * 1.2;
          const y = (val - 2) * 1.5;
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.3 })
          );
          dot.position.set(x, y, 0);
          push(dot);
          push(mkSprite(`n=${n}`, "#94a3b8", new THREE.Vector3(x, y - 0.6, 0), 0.7));
        });
        const eLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, (eValue - 2) * 1.5, 0), new THREE.Vector3(5, (eValue - 2) * 1.5, 0)]),
          new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.7 })
        );
        push(eLine);
        push(mkSprite(`e = ${eValue.toFixed(4)}`, "#f59e0b", new THREE.Vector3(3.5, (eValue - 2) * 1.5 + 0.5, 0)));
      } else if (limitType === "power_rule") {
        const x0 = 2, n = 3;
        const pts: THREE.Vector3[] = [];
        for (let h = -3; h <= 3; h += 0.1) {
          if (Math.abs(h) < 0.01) continue;
          const dq = (Math.pow(x0 + h, n) - Math.pow(x0, n)) / h;
          pts.push(new THREE.Vector3(h * 0.5, dq * 0.3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const limitVal = n * Math.pow(x0, n - 1);
        const limitLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, limitVal * 0.3, 0), new THREE.Vector3(2, limitVal * 0.3, 0)]),
          new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
        );
        push(limitLine);
        push(mkSprite(`limit = ${limitVal.toFixed(2)}`, "#34d399", new THREE.Vector3(0, limitVal * 0.3 + 0.8, 0)));
      } else {
        const pts: THREE.Vector3[] = [];
        for (let x = -0.9; x <= 3; x += 0.02) {
          if (Math.abs(x) < 0.02) continue;
          pts.push(new THREE.Vector3(x, Math.log(1 + x) / x * 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(mkSprite("hole at (0,1)", "#f59e0b", new THREE.Vector3(0.3, 1.3, 0)));
        push(mkSprite("limit = 1", "#34d399", new THREE.Vector3(0, -1.5, 0)));
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
  }, [limitType, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Standard Limits" description="Visual proofs of fundamental limit formulas — requires WebGL." />;
  }

  const limitOptions: [string, string][] = [
    ["sinx_over_x", "sin x / x → 1"],
    ["e_def", "(1 + 1/n)ⁿ → e"],
    ["power_rule", "Power Rule Def."],
    ["log_limit", "ln(1+x) / x → 1"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Standard Limits — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Select a limit to visualize its proof</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Standard Limit">
          <div className="flex flex-wrap gap-2 mt-2">
            {limitOptions.map(([key, label]) => (
              <button key={key} onClick={() => setLimitType(key as StandardLimit)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${limitType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={stdReadouts} />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Standard Limits</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">sin x / x {'→'} 1</strong> as x {'→'} 0 (radians)</p>
            <p><strong className="text-foreground">(1 + 1/n)ⁿ {'→'} e</strong> as n {'→'} ∞</p>
            <p><strong className="text-foreground">ln(1+x) / x {'→'} 1</strong> as x {'→'} 0</p>
            <p><strong className="text-foreground">Power rule:</strong> n·xⁿ⁻¹ from the limit definition of f′(x)</p>
            <p><strong className="text-foreground">This scene:</strong> {info.concept}.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}