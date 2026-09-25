"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, PlaybackBar, type ScenePreset } from "@/components/lab/scene-interactivity";
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

type HigherFunc = "cubic" | "quartic";

const HIGHER_INFO: Record<HigherFunc, { f: string; f1: string; f2: string; f3: string; meaning: string; fact: string; tip: string }> = {
  cubic: {
    f: "f(x) = 0.05x^3 - 0.2x",
    f1: "f'(x) = 0.15x^2 - 0.2",
    f2: "f''(x) = 0.3x",
    f3: "f'''(x) = 0.3 (constant)",
    meaning: "f'' = 0.3x: concave down for x < 0, concave up for x > 0, inflection at x = 0",
    fact: "Differentiating a cubic three times lands on a constant — the fourth derivative is 0",
    tip: "f' = 0 marks turning points of f; f'' says whether each is a max (f'' < 0) or a min (f'' > 0)",
  },
  quartic: {
    f: "f(x) = 0.02x^4 - 0.1x^2",
    f1: "f'(x) = 0.08x^3 - 0.2x",
    f2: "f''(x) = 0.24x^2 - 0.2",
    f3: "f'''(x) = 0.48x",
    meaning: "f'' = 0.24x^2 - 0.2 changes sign at x = ±0.91 — the two inflection points of the W-shaped quartic",
    fact: "Each differentiation drops the degree by one: 4 → 3 → 2 → 1 → constant",
    tip: "The quartic's W shape has three turning points — always one fewer than the degree",
  },
};

export function DerivativeHigher3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [funcChoice, setFuncChoice] = useState<HigherFunc>("cubic");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const playingRef = useRef(true);

  useEffect(() => { speedRef.current = speed; playingRef.current = playing; }, [speed, playing]);

  const info = HIGHER_INFO[funcChoice];

  const presets: ScenePreset[] = [
    { name: "Cubic stack", hint: "f = 0.05x^3 − 0.2x", apply: () => { setFuncChoice("cubic"); setRunId((r) => r + 1); } },
    { name: "Quartic stack", hint: "f = 0.02x^4 − 0.1x^2", apply: () => { setFuncChoice("quartic"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFuncChoice("cubic");
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
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

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      const f = (x: number) => funcChoice === "cubic" ? 0.05 * x * x * x - 0.2 * x : 0.02 * x * x * x * x - 0.1 * x * x;
      const f1 = (x: number) => funcChoice === "cubic" ? 0.15 * x * x - 0.2 : 0.08 * x * x * x - 0.2 * x;
      const f2 = (x: number) => funcChoice === "cubic" ? 0.3 * x : 0.24 * x * x - 0.2;
      const f3 = (x: number) => funcChoice === "cubic" ? 0.3 : 0.48 * x;

      const colors = [0x60a5fa, 0x34d399, 0xf59e0b, 0xec4899];
      const labels = ["f(x)", "f'(x)", "f''(x)", "f'''(x)"];
      const yOffsets = [0, -2.5, -5, -7.5];

      for (let i = 0; i < 4; i++) {
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.1) {
          const deriv = i === 0 ? f(x) : i === 1 ? f1(x) : i === 2 ? f2(x) : f3(x);
          pts.push(new THREE.Vector3(x, deriv + yOffsets[i], 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: colors[i] })));
        const ls = push(mkSprite(labels[i], '#' + colors[i].toString(16).padStart(6, '0'), new THREE.Vector3(5, yOffsets[i] + 1.2, 0), 0.7));
        labelSprites.push(ls);
      }

      const connLines: THREE.Line[] = [];
      for (let i = 0; i < 3; i++) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, yOffsets[i] + 0.5, 0), new THREE.Vector3(0, yOffsets[i + 1] - 0.5, 0)]),
          new THREE.LineDashedMaterial({ color: 0x94a3b8, dashSize: 0.2, gapSize: 0.1 })
        );
        line.computeLineDistances();
        push(line);
        connLines.push(line);
      }

      const dots = [
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[0], emissive: colors[0], emissiveIntensity: 0.5 })),
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[1], emissive: colors[1], emissiveIntensity: 0.5 })),
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[2], emissive: colors[2], emissiveIntensity: 0.5 })),
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[3], emissive: colors[3], emissiveIntensity: 0.5 })),
      ];
      dots.forEach(d => push(d));

      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (playingRef.current) animTime += 0.015 * speedRef.current;
        const tx = Math.sin(animTime) * 4;
        dots[0].position.set(tx, f(tx) + yOffsets[0], 0);
        dots[1].position.set(tx, f1(tx) + yOffsets[1], 0);
        dots[2].position.set(tx, f2(tx) + yOffsets[2], 0);
        dots[3].position.set(tx, f3(tx) + yOffsets[3], 0);
        for (let i = 0; i < 3; i++) {
          connLines[i].geometry.setFromPoints([
            new THREE.Vector3(tx, yOffsets[i] + 0.5, 0),
            new THREE.Vector3(tx, yOffsets[i + 1] - 0.5, 0),
          ]);
        }
        connLines.forEach(l => l.geometry.attributes.position.needsUpdate = true);
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
  }, [funcChoice, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Higher Order Derivatives" description="f, f', f'', f''' visualization — requires WebGL." />;
  }

  const funcOptions: [string, string][] = [
    ["cubic", "f(x) = 0.05x^3 - 0.2x"],
    ["quartic", "f(x) = 0.02x^4 - 0.1x^2"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Higher Order Derivatives — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">f, f&apos;, f&apos;&apos;, f&apos;&apos;&apos; stacked</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-pink-500/50 bg-pink-500/10 text-pink-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Base Function">
          <div className="flex flex-wrap gap-2 mt-2">
            {funcOptions.map(([key, label]) => (
              <button key={key} onClick={() => setFuncChoice(key as typeof funcChoice)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${funcChoice === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
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
            { label: "Position f", value: info.f },
            { label: "Slope f'", value: info.f1 },
            { label: "Concavity f''", value: info.f2, highlight: true },
            { label: "f''' (jerk)", value: info.f3 },
            { label: "Reading the stack", value: info.meaning },
            { label: "Physics analogue", value: "f = position → f' = velocity → f'' = acceleration" },
          ]}
        />

        <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">Higher Order Derivatives</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">f&apos;(x):</strong> First derivative — slope of the curve</p>
            <p><strong className="text-foreground">f&apos;&apos;(x):</strong> Second derivative — concavity</p>
            <p><strong className="text-foreground">f&apos;&apos;&apos;(x):</strong> Third derivative — rate of change of concavity</p>
            <p>Each derivative is stacked vertically for easy comparison — the dots sweep the same x across all four levels</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}