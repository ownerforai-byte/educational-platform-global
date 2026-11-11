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
   Conditional Probability — NEB Probability (Maths 12)
   Visualizes P(A|B), multiplication theorem, and Venn diagram
   with relative areas.
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

export function ConditionalProbabilityVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [pA, setPA] = useState(0.4);
  const [pB, setPB] = useState(0.3);
  const [pAB, setPAB] = useState(0.1);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const presets: ScenePreset[] = [
    { name: "Independent pair", hint: "P(A∩B) = P(A)·P(B) → P(A|B) = P(A)", apply: () => { setPA(0.4); setPB(0.3); setPAB(0.12); setRunId((r) => r + 1); } },
    { name: "Dependent pair", hint: "P(A∩B) = 0.3 > P(A)·P(B) → B raises A's chance", apply: () => { setPA(0.5); setPB(0.4); setPAB(0.3); setRunId((r) => r + 1); } },
    { name: "Mutually exclusive", hint: "P(A∩B) = 0 → P(A|B) = 0", apply: () => { setPA(0.4); setPB(0.3); setPAB(0); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setPA(0.4);
    setPB(0.3);
    setPAB(0.1);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  const fmt3 = (v: number) => (Number.isFinite(v) ? v.toFixed(3) : "—");
  const pAgivenB = pB > 0 ? pAB / pB : NaN;
  const pBgivenA = pA > 0 ? pAB / pA : NaN;
  const pUnion = pA + pB - pAB;
  const product = pA * pB;
  const verdict =
    Math.abs(pAB - product) < 1e-9
      ? "Independent — P(A∩B) = P(A)·P(B)"
      : pAB > product
        ? "Dependent — P(A∩B) > P(A)·P(B)"
        : "Dependent — P(A∩B) < P(A)·P(B)";

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

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); if (o instanceof THREE.Sprite) labelSprites.push(o); return o; };

      // Universal set box
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-6, -4, 0), new THREE.Vector3(6, -4, 0), new THREE.Vector3(6, 4, 0),
          new THREE.Vector3(-6, 4, 0), new THREE.Vector3(-6, -4, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 }),
      ));
      push(mkSprite("S (Sample Space, P=1)", "#94a3b8", new THREE.Vector3(-5.5, 3.5, 0), 0.5));

      const drawEllipse = (cx: number, cy: number, rx: number, ry: number, color: number, opacity = 0.3) => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(cx + rx * Math.cos(t), cy + ry * Math.sin(t), 0.01));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, linewidth: 2 })));
        const circle = push(new THREE.Mesh(
          new THREE.CircleGeometry(1, 64),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide }),
        ) as THREE.Mesh);
        circle.scale.set(rx * 2, ry * 2, 1);
        circle.position.set(cx, cy, 0);
      };

      // Draw based on probabilities (area proportional)
      const totalW = 10, totalH = 6;
      const scaleX = totalW, scaleY = totalH;

      // Event B (blue circle, larger)
      const bRadius = Math.sqrt(pB) * 3;
      drawEllipse(2.5, 0, bRadius, bRadius * 0.8, 0x3b82f6, 0.2);
      push(mkSprite(`B  P(B)=${pB.toFixed(2)}`, "#60a5fa", new THREE.Vector3(4, 2.5, 0), 0.7));

      // Event A (red circle, overlapping)
      const aRadius = Math.sqrt(pA) * 3;
      drawEllipse(-1.5, 0, aRadius, aRadius * 0.8, 0xef4444, 0.2);
      push(mkSprite(`A  P(A)=${pA.toFixed(2)}`, "#f87171", new THREE.Vector3(-3.5, 2.5, 0), 0.7));

      // Intersection A∩B (highlighted)
      const abRadius = Math.sqrt(pAB) * 2.5;
      const interFill = push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
      ));
      interFill.position.set(0.5, 0, 0.02);
      interFill.scale.set(abRadius * 0.8, abRadius * 0.6, 1);
      push(mkSprite(`A∩B  P=${pAB.toFixed(2)}`, "#fbbf24", new THREE.Vector3(0.5, -2.5, 0), 0.75));

      // Conditional probability formula
      const pAxB = pB > 0 ? pAB / pB : NaN;
      push(mkSprite(`P(A|B) = P(A∩B)/P(B) = ${pAB.toFixed(2)}/${pB.toFixed(2)} = ${fmt3(pAxB)}`, "#22d3ee", new THREE.Vector3(0, -4.5, 0), 0.85));
      push(mkSprite(`Multiplication: P(A∩B) = P(A|B)·P(B) = P(B|A)·P(A)`, "#a78bfa", new THREE.Vector3(0, 4.5, 0), 0.75));

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
  }, [pA, pB, pAB, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Conditional Probability" description="Bayes/conditional visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Conditional Probability &amp; Multiplication Theorem</span>
          <span className="text-xs text-muted-foreground font-normal">P(A|B) = P(A∩B)/P(B)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Probabilities">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-20"><Label className="text-xs text-muted-foreground">P(A):</Label><Input type="number" step="0.05" min={0} max={1} value={pA} onChange={(e) => setPA(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-20"><Label className="text-xs text-muted-foreground">P(B):</Label><Input type="number" step="0.05" min={0} max={1} value={pB} onChange={(e) => setPB(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-20"><Label className="text-xs text-muted-foreground">P(A∩B):</Label><Input type="number" step="0.05" min={0} max={1} value={pAB} onChange={(e) => setPAB(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "P(A|B) = P(A∩B)/P(B)", value: fmt3(pAgivenB), highlight: true },
            { label: "P(B|A) = P(A∩B)/P(A)", value: fmt3(pBgivenA) },
            { label: "P(A ∪ B) = P(A)+P(B)−P(A∩B)", value: fmt3(pUnion) },
            { label: "P(A) · P(B)", value: fmt3(product) },
            { label: "Independence test", value: verdict },
          ]}
        />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Theorems</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Conditional probability:</strong> P(A|B) = P(A ∩ B) / P(B),  P(B) &gt; 0</p>
            <p><strong className="text-foreground">Multiplication theorem:</strong> P(A ∩ B) = P(A|B) · P(B) = P(B|A) · P(A)</p>
            <p><strong className="text-foreground">Extension:</strong> P(A ∩ B ∩ C) = P(A) · P(B|A) · P(C|A ∩ B)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
