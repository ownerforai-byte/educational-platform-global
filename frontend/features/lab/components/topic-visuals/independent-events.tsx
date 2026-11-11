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
   Independent Events — NEB Probability (Maths 12)
   Visualizes P(A∩B) = P(A)P(B) with Venn diagrams and
   shows dependence vs independence.
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

export function IndependentEventsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [pA, setPA] = useState(0.4);
  const [pB, setPB] = useState(0.3);
  const [isIndependent, setIsIndependent] = useState(true);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const presets: ScenePreset[] = [
    { name: "Independent pair", hint: "P(A∩B) = P(A)·P(B) = 0.12", apply: () => { setPA(0.4); setPB(0.3); setIsIndependent(true); setRunId((r) => r + 1); } },
    { name: "Dependent pair", hint: "Overlap inflated → P(A∩B) ≠ P(A)·P(B)", apply: () => { setPA(0.4); setPB(0.3); setIsIndependent(false); setRunId((r) => r + 1); } },
    { name: "Two fair coins", hint: "P(A) = P(B) = 0.5 → P(A∩B) = 0.25", apply: () => { setPA(0.5); setPB(0.5); setIsIndependent(true); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setPA(0.4);
    setPB(0.3);
    setIsIndependent(true);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  const pAB_indep = pA * pB;
  // Dependent case inflates the overlap, clamped so P(A∩B) ≤ min(P(A), P(B)) stays valid
  const pAB_actual = isIndependent ? pAB_indep : Math.min(pAB_indep * 1.8, Math.min(pA, pB));

  const fmt3 = (v: number) => (Number.isFinite(v) ? v.toFixed(3) : "—");
  const pAgivenB = pB > 0 ? pAB_actual / pB : NaN;
  const pBgivenA = pA > 0 ? pAB_actual / pA : NaN;
  const pUnion = pA + pB - pAB_actual;
  const verdict = isIndependent
    ? "Independent — P(A|B) = P(A), P(B|A) = P(B)"
    : "Dependent — P(A∩B) ≠ P(A)·P(B)";

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

      // Two separate diagrams side by side
      // Left: Independent case
      const leftCX = -4;
      // Right: Actual (could be dependent)

      // Left diagram: Independent
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(leftCX - 3, -2.5, 0), new THREE.Vector3(leftCX + 3, -2.5, 0), new THREE.Vector3(leftCX + 3, 2.5, 0), new THREE.Vector3(leftCX - 3, 2.5, 0), new THREE.Vector3(leftCX - 3, -2.5, 0)]),
        new THREE.LineBasicMaterial({ color: 0x475569 }),
      ));
      push(mkSprite("Independent", "#fbbf24", new THREE.Vector3(leftCX, 3, 0), 0.7));
      // Two separate circles not overlapping much
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(leftCX - 1.2, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pA) * 1.5, Math.sqrt(pA) * 1.5, 1);
      push(mkSprite(`A(${pA.toFixed(2)})`, "#f87171", new THREE.Vector3(leftCX - 1.2, 1.8, 0), 0.6));
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(leftCX + 1.2, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pB) * 1.5, Math.sqrt(pB) * 1.5, 1);
      push(mkSprite(`B(${pB.toFixed(2)})`, "#60a5fa", new THREE.Vector3(leftCX + 1.2, 1.8, 0), 0.6));
      // Small overlap region
      const overlapArea = pAB_indep;
      push(mkSprite(`P(A∩B) = ${overlapArea.toFixed(3)}`, "#22d3ee", new THREE.Vector3(leftCX, -3, 0), 0.65));

      // Right diagram: showing comparison
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(1, -2.5, 0), new THREE.Vector3(7, -2.5, 0), new THREE.Vector3(7, 2.5, 0), new THREE.Vector3(1, 2.5, 0), new THREE.Vector3(1, -2.5, 0)]),
        new THREE.LineBasicMaterial({ color: 0x475569 }),
      ));
      push(mkSprite(isIndependent ? "Independent ✓" : "Dependent", isIndependent ? "#22c55e" : "#ef4444", new THREE.Vector3(4, 3, 0), 0.7));

      // Overlapping circles
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(3, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pA) * 1.3, Math.sqrt(pA) * 1.3, 1);
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(5, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pB) * 1.3, Math.sqrt(pB) * 1.3, 1);

      // Intersection highlight — actual overlap (inflated in the dependent case)
      const interFill = push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
      ));
      interFill.position.set(4, 0, 0.02);
      interFill.scale.set(Math.sqrt(pAB_actual) * 1.5, Math.sqrt(pAB_actual) * 1.2, 1);

      push(mkSprite(`P(A∩B) = ${pAB_actual.toFixed(3)}`, "#fbbf24", new THREE.Vector3(4, -3, 0), 0.7));

      // Key formula
      push(mkSprite(isIndependent ? "P(A∩B) = P(A)·P(B)  ✓" : "P(A∩B) ≠ P(A)·P(B)  ✗", isIndependent ? "#22c55e" : "#ef4444", new THREE.Vector3(0, -4.2, 0), 0.8));

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
  }, [pA, pB, isIndependent, pAB_indep, pAB_actual, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Independent Events" description="Independence visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Independent Events</span>
          <span className="text-xs text-muted-foreground font-normal">P(A∩B) = P(A)·P(B)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-green-500/50 bg-green-500/10 text-green-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Probabilities">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(A):</Label><Input type="number" step="0.05" min={0} max={1} value={pA} onChange={(e) => setPA(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(B):</Label><Input type="number" step="0.05" min={0} max={1} value={pB} onChange={(e) => setPB(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={isIndependent} onChange={(e) => setIsIndependent(e.target.checked)} />
            Events are independent (P(A∩B) = P(A)·P(B))
          </label>
        </div>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "P(A) · P(B) (independence product)", value: fmt3(pAB_indep) },
            { label: "Shown P(A∩B)", value: fmt3(pAB_actual), highlight: true },
            { label: "P(A|B) = P(A∩B)/P(B)", value: fmt3(pAgivenB) },
            { label: "P(B|A) = P(A∩B)/P(A)", value: fmt3(pBgivenA) },
            { label: "P(A ∪ B)", value: fmt3(pUnion) },
            { label: "Verdict", value: verdict },
          ]}
        />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Independence</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Definition:</strong> A and B are independent if P(A ∩ B) = P(A) · P(B).</p>
            <p><strong className="text-foreground">Equivalent:</strong> P(A|B) = P(A)  or  P(B|A) = P(B) — knowing one doesn't change the other's probability.</p>
            <p><strong className="text-foreground">Three events:</strong> P(A∩B∩C) = P(A)·P(B)·P(C) for mutual independence.</p>
            <p><strong className="text-foreground">Note:</strong> Independent events can still overlap; disjoint events with P&gt;0 cannot be independent.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
