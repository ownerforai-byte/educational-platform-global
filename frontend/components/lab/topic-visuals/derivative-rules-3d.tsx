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

type RuleType = "power" | "product" | "quotient" | "chain";

const RULES_INFO: Record<RuleType, { rule: string; demo: string; work: string; pitfall: string }> = {
  power: {
    rule: "d/dx[x^n] = n·x^(n-1)",
    demo: "f(x) = x^2  →  f'(x) = 2x",
    work: "At x = 2 the parabola's slope is f'(2) = 4",
    pitfall: "Valid for any real n — including n = 1/2 (√x) and n = −1 (1/x)",
  },
  product: {
    rule: "(fg)' = f'g + fg'",
    demo: "f = sin x + 1, g = cos x + 1",
    work: "At x = 0: f'g + fg' = (1)(2) + (1)(0) = 2",
    pitfall: "Not f'g'! The product's slope is a SUM of two terms",
  },
  quotient: {
    rule: "(f/g)' = (f'g − fg')/g²",
    demo: "f = x, g = x^2 + 1",
    work: "At x = 1: (1·2 − 1·2)/4 = 0 — the peak of y = x/(x^2+1)",
    pitfall: "Order matters in the numerator — swapping f'g and fg' flips the sign",
  },
  chain: {
    rule: "d/dx[F(G(x))] = F'(G(x))·G'(x)",
    demo: "y = sin(x^2): outer F = sin u, inner G = x^2",
    work: "y' = cos(x^2)·2x — at x = 1 that is 2cos 1 ≈ 1.08",
    pitfall: "Multiply by the INNER derivative G'(x) — forgetting it is the classic slip",
  },
};

export function DerivativeRules3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [ruleType, setRuleType] = useState<RuleType>("power");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = RULES_INFO[ruleType];

  const presets: ScenePreset[] = [
    { name: "Power", hint: "d/dx[x^n] = n·x^(n-1)", apply: () => { setRuleType("power"); setRunId((r) => r + 1); } },
    { name: "Product", hint: "(fg)' = f'g + fg'", apply: () => { setRuleType("product"); setRunId((r) => r + 1); } },
    { name: "Quotient", hint: "(f/g)' = (f'g − fg')/g²", apply: () => { setRuleType("quotient"); setRunId((r) => r + 1); } },
    { name: "Chain", hint: "F'(G(x))·G'(x)", apply: () => { setRuleType("chain"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setRuleType("power");
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

      if (ruleType === "power") {
        pushLabel("Power Rule: d/dx[x^n] = n·x^(n-1)", "#60a5fa", new THREE.Vector3(0, 4.5, 0));
        const fPts: THREE.Vector3[] = [];
        const dfPts: THREE.Vector3[] = [];
        for (let x = -5; x <= 5; x += 0.1) {
          fPts.push(new THREE.Vector3(x, 0.15 * x * x, 0));
          dfPts.push(new THREE.Vector3(x, 0.3 * x, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(dfPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        pushLabel("f(x) = x^2", "#60a5fa", new THREE.Vector3(3, 1.5, 0));
        pushLabel("f'(x) = 2x", "#34d399", new THREE.Vector3(3, -2, 0));
      } else if (ruleType === "product") {
        pushLabel("Product Rule: (fg)' = f'g + fg'", "#a78bfa", new THREE.Vector3(0, 4.5, 0));
        const fPts: THREE.Vector3[] = [];
        const gPts: THREE.Vector3[] = [];
        const fgPts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.1) {
          const f = Math.sin(x) + 1;
          const g = Math.cos(x) + 1;
          fPts.push(new THREE.Vector3(x, f * 0.8, 0));
          gPts.push(new THREE.Vector3(x + 0.3, g * 0.8, 0));
          fgPts.push(new THREE.Vector3(x, f * g * 0.3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(gPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fgPts), new THREE.LineBasicMaterial({ color: 0xa78bfa })));
        pushLabel("f(x) = sin(x)+1", "#60a5fa", new THREE.Vector3(-3, 1.2, 0));
        pushLabel("g(x) = cos(x)+1", "#34d399", new THREE.Vector3(-2.5, -0.5, 0));
        pushLabel("y = f·g (the product)", "#a78bfa", new THREE.Vector3(0, -2.5, 0));
      } else if (ruleType === "quotient") {
        pushLabel("Quotient Rule: (f/g)' = (f'g − fg')/g^2", "#f59e0b", new THREE.Vector3(0, 4.5, 0));
        const fPts: THREE.Vector3[] = [];
        const gPts: THREE.Vector3[] = [];
        const qPts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.1) {
          fPts.push(new THREE.Vector3(x, x * 0.4, 0));
          gPts.push(new THREE.Vector3(x + 0.3, (x * x + 1) * 0.15, 0));
          qPts.push(new THREE.Vector3(x, (x / (x * x + 1)) * 3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(gPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(qPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        pushLabel("f(x) = x", "#60a5fa", new THREE.Vector3(-4, 1.5, 0));
        pushLabel("g(x) = x^2+1", "#34d399", new THREE.Vector3(-3.5, -1, 0));
        pushLabel("y = f/g = x/(x^2+1)", "#f59e0b", new THREE.Vector3(0, -3.5, 0));
      } else {
        pushLabel("Chain Rule: d/dx[F(G(x))] = F'(G(x))·G'(x)", "#ec4899", new THREE.Vector3(0, 4.5, 0));
        const uPts: THREE.Vector3[] = [];
        const outerPts: THREE.Vector3[] = [];
        const compositePts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.1) {
          const u = x * x;
          uPts.push(new THREE.Vector3(x, u * 0.2, 0));
          outerPts.push(new THREE.Vector3(x + 0.3, Math.sin(u) * 1.5, 0));
          compositePts.push(new THREE.Vector3(x, Math.sin(x * x) * 1.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(uPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outerPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(compositePts), new THREE.LineBasicMaterial({ color: 0xec4899 })));
        pushLabel("inner: u = x^2", "#60a5fa", new THREE.Vector3(-3, 1.5, 0));
        pushLabel("outer: sin(u)", "#34d399", new THREE.Vector3(-2.5, -0.8, 0));
        pushLabel("y = sin(x^2)", "#ec4899", new THREE.Vector3(0, -3, 0));
      }

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
  }, [ruleType, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Differentiation Rules" description="Power, product, quotient, chain rules — requires WebGL." />;
  }

  const ruleOptions: [string, string][] = [
    ["power", "Power Rule"],
    ["product", "Product Rule"],
    ["quotient", "Quotient Rule"],
    ["chain", "Chain Rule"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Differentiation Rules — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Four fundamental rules</span>
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

        <CollapsibleControls label="Differentiation Rule">
          <div className="flex flex-wrap gap-2 mt-2">
            {ruleOptions.map(([key, label]) => (
              <button key={key} onClick={() => setRuleType(key as RuleType)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${ruleType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Rule", value: info.rule, highlight: true },
            { label: "Demo on screen", value: info.demo },
            { label: "Live check", value: info.work },
            { label: "Common slip", value: info.pitfall },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Differentiation Rules</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Power Rule:</strong> d/dx[x^n] = n·x^(n−1)</p>
            <p><strong className="text-foreground">Product Rule:</strong> (fg)&apos; = f&apos;g + fg&apos;</p>
            <p><strong className="text-foreground">Quotient Rule:</strong> (f/g)&apos; = (f&apos;g − fg&apos;)/g^2</p>
            <p><strong className="text-foreground">Chain Rule:</strong> d/dx[F(G(x))] = F&apos;(G(x))·G&apos;(x)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}