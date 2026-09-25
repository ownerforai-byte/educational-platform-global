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

type ContinuityType = "continuous" | "removable" | "jump" | "infinite";

/** The scene always examines continuity at x = A. */
const A = 2;
const CONT_LIM = 1.5 * Math.sin(A);      // limit & value of 1.5·sin x at x = 2
const REMOVAL_FA = CONT_LIM + 1.5;       // removable mode parks f(2) above the hole
const JUMP_L = 0.5 * Math.sin(A) + 1;    // left branch of the jump curve at x = 2
const JUMP_R = 0.5 * Math.sin(A) - 1;    // right branch of the jump curve at x = 2

const CONT_INFO: Record<ContinuityType, { concept: string; formula: string; condition: string; verdict: string; fact: string; tip: string }> = {
  continuous: {
    concept: "Continuous at x = 2",
    formula: "f(x) = 1.5·sin x",
    condition: "LHL = RHL = f(2)",
    verdict: `lim(x→2) f = f(2) = ${CONT_LIM.toFixed(4)}`,
    fact: "sin, cos, eˣ and every polynomial pass this test at every real number.",
    tip: "No holes, no jumps, no asymptotes — the pen never leaves the paper.",
  },
  removable: {
    concept: "Removable discontinuity (hole)",
    formula: "f(x) = 1.5·sin x (x ≠ 2); f(2) parked elsewhere",
    condition: "Limit exists but ≠ f(2)",
    verdict: `lim(x→2) f = ${CONT_LIM.toFixed(4)} but f(2) = ${REMOVAL_FA.toFixed(4)}`,
    fact: "Redefined at one point, the curve is whole again — hence 'removable'.",
    tip: "The limit ignores the isolated point: it watches nearby x, never x = 2 itself.",
  },
  jump: {
    concept: "Jump discontinuity",
    formula: "f(x) = 0.5·sin x + 1 (x < 2); 0.5·sin x − 1 (x > 2)",
    condition: "LHL ≠ RHL",
    verdict: `LHL = ${JUMP_L.toFixed(4)}, RHL = ${JUMP_R.toFixed(4)} → limit DNE`,
    fact: "Postage tariffs and ⌊x⌋ are textbook jump functions — step height 2 here.",
    tip: "Both one-sided limits exist; continuity fails because they disagree.",
  },
  infinite: {
    concept: "Infinite discontinuity (vertical asymptote)",
    formula: "f(x) = 2/(x − 2) + 0.5",
    condition: "f → −∞ (left), +∞ (right)",
    verdict: "lim(x→2) f does not exist — branches diverge in opposite directions",
    fact: "The denominator's zero at x = 2 predicts the asymptote before you plot anything.",
    tip: "'= ∞' describes the manner of failure; a (finite) limit still does not exist.",
  },
};

export function Continuity3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [ctype, setCtype] = useState<ContinuityType>("continuous");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = CONT_INFO[ctype];

  const presets: ScenePreset[] = [
    { name: "Continuous", hint: "lim = f(2) — no break", apply: () => { setCtype("continuous"); setRunId((r) => r + 1); } },
    { name: "Removable hole", hint: "Limit exists, value misplaced", apply: () => { setCtype("removable"); setRunId((r) => r + 1); } },
    { name: "Jump", hint: "LHL ≠ RHL → DNE", apply: () => { setCtype("jump"); setRunId((r) => r + 1); } },
    { name: "Infinite", hint: "Vertical asymptote at x = 2", apply: () => { setCtype("infinite"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setCtype("continuous");
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  const readoutItems = (() => {
    if (ctype === "continuous") {
      return [
        { label: "f(x)", value: "1.5·sin x" },
        { label: "LHL (x→2⁻)", value: CONT_LIM.toFixed(4) },
        { label: "RHL (x→2⁺)", value: CONT_LIM.toFixed(4) },
        { label: "f(2)", value: CONT_LIM.toFixed(4) },
        { label: "lim(x→2) f(x)", value: CONT_LIM.toFixed(4), highlight: true },
        { label: "Test", value: "LHL = RHL = f(2) → continuous" },
      ];
    }
    if (ctype === "removable") {
      return [
        { label: "f(x), x ≠ 2", value: "1.5·sin x" },
        { label: "LHL (x→2⁻)", value: CONT_LIM.toFixed(4) },
        { label: "RHL (x→2⁺)", value: CONT_LIM.toFixed(4) },
        { label: "f(2) as plotted", value: REMOVAL_FA.toFixed(4) },
        { label: "lim(x→2) f(x)", value: CONT_LIM.toFixed(4), highlight: true },
        { label: "Fix", value: `Redefine f(2) = ${CONT_LIM.toFixed(4)} to remove the hole` },
      ];
    }
    if (ctype === "jump") {
      return [
        { label: "Left branch", value: "0.5·sin x + 1 (x < 2)" },
        { label: "Right branch", value: "0.5·sin x − 1 (x > 2)" },
        { label: "LHL (x→2⁻)", value: JUMP_L.toFixed(4) },
        { label: "RHL (x→2⁺)", value: JUMP_R.toFixed(4) },
        { label: "lim(x→2) f(x)", value: "Does not exist", highlight: true },
        { label: "Jump size", value: `RHL − LHL = ${(JUMP_R - JUMP_L).toFixed(2)}` },
      ];
    }
    return [
      { label: "f(x)", value: "2/(x − 2) + 0.5" },
      { label: "LHL (x→2⁻)", value: "−∞" },
      { label: "RHL (x→2⁺)", value: "+∞" },
      { label: "f(2)", value: "undefined (division by zero)" },
      { label: "lim(x→2) f(x)", value: "Does not exist", highlight: true },
      { label: "Feature", value: "Vertical asymptote x = 2" },
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

      const a = A;

      if (ctype === "continuous") {
        push(mkSprite("Continuous: lim = f(a)", "#34d399", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.sin(x) * 1.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.5 })
        );
        dot.position.set(a, Math.sin(a) * 1.5, 0);
        push(dot);
        push(mkSprite("lim = f(a)", "#34d399", new THREE.Vector3(a + 1, Math.sin(a) * 1.5 + 1, 0)));
      } else if (ctype === "removable") {
        push(mkSprite("Removable: lim ≠ f(a)", "#f59e0b", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          if (Math.abs(x - a) < 0.15) continue;
          pts.push(new THREE.Vector3(x, Math.sin(x) * 1.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const hole = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.25, 32), new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide }));
        hole.position.set(a, Math.sin(a) * 1.5, 0);
        push(hole);
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.5 })
        );
        dot.position.set(a, Math.sin(a) * 1.5 + 1.5, 0);
        push(dot);
        push(mkSprite("hole ≠ defined point", "#f59e0b", new THREE.Vector3(a + 1, Math.sin(a) * 1.5 + 0.5, 0)));
      } else if (ctype === "jump") {
        push(mkSprite("Jump: LHL ≠ RHL", "#ec4899", new THREE.Vector3(0, 4.5, 0)));
        const leftPts: THREE.Vector3[] = [];
        const rightPts: THREE.Vector3[] = [];
        for (let x = -6; x < a - 0.05; x += 0.05) leftPts.push(new THREE.Vector3(x, Math.sin(x) * 0.5 + 1, 0));
        for (let x = a + 0.05; x <= 6; x += 0.05) rightPts.push(new THREE.Vector3(x, Math.sin(x) * 0.5 - 1, 0));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const leftHole = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.2, 32), new THREE.MeshBasicMaterial({ color: 0xec4899, side: THREE.DoubleSide }));
        leftHole.position.set(a - 0.05, Math.sin(a - 0.05) * 0.5 + 1, 0);
        push(leftHole);
        const rightHole = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.2, 32), new THREE.MeshBasicMaterial({ color: 0xec4899, side: THREE.DoubleSide }));
        rightHole.position.set(a + 0.05, Math.sin(a + 0.05) * 0.5 - 1, 0);
        push(rightHole);
        push(mkSprite("LHL ≠ RHL", "#ec4899", new THREE.Vector3(a, -2, 0)));
      } else {
        push(mkSprite("Infinite: Vertical Asymptote", "#f43f5e", new THREE.Vector3(0, 4.5, 0)));
        const leftPts: THREE.Vector3[] = [];
        const rightPts: THREE.Vector3[] = [];
        for (let x = -6; x < a - 0.1; x += 0.05) leftPts.push(new THREE.Vector3(x, 2 / (x - a) + 0.5, 0));
        for (let x = a + 0.1; x <= 6; x += 0.05) rightPts.push(new THREE.Vector3(x, 2 / (x - a) + 0.5, 0));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const asymp = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a, -8, 0), new THREE.Vector3(a, 8, 0)]),
          new THREE.LineDashedMaterial({ color: 0xf43f5e, dashSize: 0.3, gapSize: 0.2 })
        );
        asymp.computeLineDistances();
        push(asymp);
        push(mkSprite("lim(x→2⁺) = +∞", "#f43f5e", new THREE.Vector3(a + 1, 3, 0)));
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
  }, [ctype, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Continuity" description="Continuous vs discontinuous functions — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Continuity — 3D Visualization</span>
          <span className="text-xs text-muted-foreground font-normal">Four types of continuity behavior</span>
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

        <CollapsibleControls label="Continuity Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["continuous", "removable", "jump", "infinite"] as ContinuityType[]).map((t) => (
              <button key={t} onClick={() => setCtype(t)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${ctype === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {t === "continuous" ? "Continuous" : t === "removable" ? "Removable" : t === "jump" ? "Jump" : "Infinite"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={readoutItems} />

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Continuity Criteria</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Continuous:</strong> lim(x→a) f(x) = f(a)</p>
            <p><strong className="text-foreground">Removable:</strong> limit exists but f(a) is undefined or different</p>
            <p><strong className="text-foreground">Jump:</strong> left-hand limit ≠ right-hand limit</p>
            <p><strong className="text-foreground">Infinite:</strong> f(x) grows without bound near a — vertical asymptote</p>
            <p><strong className="text-foreground">This scene:</strong> {info.concept} — {info.verdict}.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}