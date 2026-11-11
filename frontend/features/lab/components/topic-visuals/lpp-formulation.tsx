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
   Linear Programming — Formulation & Graphical Method (Maths 12)
   Shows feasible region, constraint lines, and objective function
   for a two-variable LPP.
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

export function LPPFormulationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [a1, setA1] = useState(2);
  const [b1, setB1] = useState(3);
  const [c1, setC1] = useState(12);
  const [a2, setA2] = useState(3);
  const [b2, setB2] = useState(1);
  const [c2, setC2] = useState(12);
  const [pa, setPa] = useState(5);
  const [pb, setPb] = useState(4);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  // Constraint lines: a1*x + b1*y = c1 and a2*x + b2*y = c2
  // Intersection point (Cramer's rule on the two boundary lines)
  const det = a1 * b2 - a2 * b1;
  const intersectX = det !== 0 ? (c1 * b2 - c2 * b1) / det : NaN;
  const intersectY = det !== 0 ? (a1 * c2 - a2 * c1) / det : NaN;
  // Axis corners of the feasible region: x ≤ c1/a1 AND x ≤ c2/a2 on y = 0
  const xAxisCorner = Math.min(a1 > 0 ? c1 / a1 : Infinity, a2 > 0 ? c2 / a2 : Infinity);
  const yAxisCorner = Math.min(b1 > 0 ? c1 / b1 : Infinity, b2 > 0 ? c2 / b2 : Infinity);
  const hasRegion =
    Number.isFinite(intersectX) && Number.isFinite(intersectY) &&
    intersectX > 0 && intersectY > 0 &&
    Number.isFinite(xAxisCorner) && Number.isFinite(yAxisCorner) &&
    intersectX <= xAxisCorner + 1e-9 && intersectY <= yAxisCorner + 1e-9;
  const zAt = (x: number, y: number) => pa * x + pb * y;
  const bestCorner = hasRegion
    ? [{ x: 0, y: 0 }, { x: xAxisCorner, y: 0 }, { x: intersectX, y: intersectY }, { x: 0, y: yAxisCorner }]
        .reduce((m, c) => (zAt(c.x, c.y) > zAt(m.x, m.y) ? c : m))
    : null;

  const presets: ScenePreset[] = [
    {
      name: "Classic factory mix (max Z = 24)",
      hint: "2x + 3y ≤ 12, 3x + y ≤ 12, Z = 5x + 4y — optimum at the line intersection.",
      apply: () => { setA1(2); setB1(3); setC1(12); setA2(3); setB2(1); setC2(12); setPa(5); setPb(4); setRunId((r) => r + 1); },
    },
    {
      name: "Equal profits p = q",
      hint: "Z = 4x + 4y — the objective line slope decides which corner wins.",
      apply: () => { setA1(2); setB1(3); setC1(12); setA2(3); setB2(1); setC2(12); setPa(4); setPb(4); setRunId((r) => r + 1); },
    },
    {
      name: "Steep profit gradient",
      hint: "Z = 10x + y — heavy weight on x pulls the optimum onto the x-axis corner.",
      apply: () => { setA1(2); setB1(3); setC1(12); setA2(3); setB2(1); setC2(12); setPa(10); setPb(1); setRunId((r) => r + 1); },
    },
    {
      name: "Parallel boundaries (det = 0)",
      hint: "2x + y ≤ 8 with 4x + 2y ≤ 20 — boundary lines never meet; one constraint is redundant.",
      apply: () => { setA1(2); setB1(1); setC1(8); setA2(4); setB2(2); setC2(20); setPa(3); setPb(2); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setA1(2); setB1(3); setC1(12);
    setA2(3); setB2(1); setC2(12);
    setPa(5); setPb(4);
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
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      // Coordinate axes (first quadrant)
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
      addLabel(mkSprite("x", "#ef4444", new THREE.Vector3(10.3, 0, 0), 0.5));
      addLabel(mkSprite("y", "#22c55e", new THREE.Vector3(0, 10.3, 0), 0.5));

      // Draw constraint lines
      const drawLine = (a: number, b: number, c: number, color: number, label: string) => {
        if (a === 0 && b === 0) return;
        // x-intercept: (c/a, 0), y-intercept: (0, c/b)
        const xInt = a !== 0 ? c / a : Infinity;
        const yInt = b !== 0 ? c / b : Infinity;
        // Extend beyond intercepts
        const p1 = new THREE.Vector3(Math.max(-1, xInt * 1.3), 0, 0);
        const p2 = new THREE.Vector3(0, Math.max(-1, yInt * 1.3), 0);
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([p1, p2]), new THREE.LineBasicMaterial({ color, linewidth: 2 })));
        addLabel(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(xInt + 0.3, yInt * 0.3, 0), 0.65));
      };

      drawLine(a1, b1, c1, 0xef4444, `${a1}x+${b1}y≤${c1}`);
      drawLine(a2, b2, c2, 0x3b82f6, `${a2}x+${b2}y≤${c2}`);

      // Feasible region (shaded convex quad O, (xA,0), (ix,iy), (0,yA))
      if (hasRegion && intersectX < 10 && intersectY < 10) {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(xAxisCorner, 0);
        shape.lineTo(intersectX, intersectY);
        shape.lineTo(0, yAxisCorner);
        shape.closePath();
        push(new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.18, side: THREE.DoubleSide })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0.02),
          new THREE.Vector3(xAxisCorner, 0, 0.02),
          new THREE.Vector3(intersectX, intersectY, 0.02),
          new THREE.Vector3(0, yAxisCorner, 0.02),
          new THREE.Vector3(0, 0, 0.02),
        ]), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 3 })));
        addLabel(mkSprite("Feasible Region", "#22d3ee", new THREE.Vector3(Math.min(1.5, xAxisCorner / 3), Math.min(1.5, yAxisCorner / 3), 0), 0.7));

        // Corner points
        const corners = [
          { x: 0, y: 0, label: "O(0,0)" },
          { x: xAxisCorner, y: 0, label: `(${xAxisCorner.toFixed(1)},0)` },
          { x: intersectX, y: intersectY, label: `(${intersectX.toFixed(1)},${intersectY.toFixed(1)})` },
          { x: 0, y: yAxisCorner, label: `(0,${yAxisCorner.toFixed(1)})` },
        ];
        corners.forEach(({ x, y, label }) => {
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
          dot.position.set(x, y, 0.05);
          addLabel(mkSprite(label, "#fbbf24", new THREE.Vector3(x + 0.3, y + 0.3, 0), 0.6));
        });
      }

      // Objective function indicator
      addLabel(mkSprite(`Max Z = ${pa}x + ${pb}y`, "#a78bfa", new THREE.Vector3(-6.5, 8.5, 0), 0.85));

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
  }, [a1, b1, c1, a2, b2, c2, pa, pb, det, intersectX, intersectY, xAxisCorner, yAxisCorner, hasRegion, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="LPP Formulation" description="Feasible region visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Linear Programming — Formulation &amp; Graphical Method</span>
          <span className="text-xs text-muted-foreground font-normal">Feasible region in 2D</span>
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

        <CollapsibleControls label="Constraint 1: a₁x + b₁y ≤ c₁">
          <div className="flex gap-2 mt-2">
            <div className="w-12"><Label className="text-xs text-muted-foreground">a₁:</Label><Input type="number" step="0.5" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-12"><Label className="text-xs text-muted-foreground">b₁:</Label><Input type="number" step="0.5" value={b1} onChange={(e) => setB1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-12"><Label className="text-xs text-muted-foreground">c₁:</Label><Input type="number" step="0.5" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Constraint 2: a₂x + b₂y ≤ c₂">
          <div className="flex gap-2 mt-2">
            <div className="w-12"><Label className="text-xs text-muted-foreground">a₂:</Label><Input type="number" step="0.5" value={a2} onChange={(e) => setA2(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-12"><Label className="text-xs text-muted-foreground">b₂:</Label><Input type="number" step="0.5" value={b2} onChange={(e) => setB2(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-12"><Label className="text-xs text-muted-foreground">c₂:</Label><Input type="number" step="0.5" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Objective: Z = px + qy">
          <div className="flex gap-2 mt-2">
            <div className="w-12"><Label className="text-xs text-muted-foreground">p:</Label><Input type="number" step="0.5" value={pa} onChange={(e) => setPa(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-12"><Label className="text-xs text-muted-foreground">q:</Label><Input type="number" step="0.5" value={pb} onChange={(e) => setPb(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Objective function", value: `Z = ${pa}x + ${pb}y` },
            { label: "Boundary lines meet at", value: det !== 0 && Number.isFinite(intersectX) ? `(${intersectX.toFixed(2)}, ${intersectY.toFixed(2)})` : "Parallel — det = 0" },
            { label: "Z at x-axis corner", value: Number.isFinite(xAxisCorner) ? zAt(xAxisCorner, 0).toFixed(1) : "unbounded" },
            { label: "Z at intersection", value: hasRegion ? zAt(intersectX, intersectY).toFixed(1) : "—" },
            { label: "Z at y-axis corner", value: Number.isFinite(yAxisCorner) ? zAt(0, yAxisCorner).toFixed(1) : "unbounded" },
            { label: "Max Z (corner-point theorem)", value: bestCorner ? `${zAt(bestCorner.x, bestCorner.y).toFixed(1)} at (${bestCorner.x.toFixed(1)}, ${bestCorner.y.toFixed(1)})` : "—", highlight: true },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Principles</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Feasible region:</strong> Intersection of all constraint half-planes (and x≥0, y≥0). Cyan shaded area.</p>
            <p><strong className="text-foreground">Corner point theorem:</strong> The optimal value of Z occurs at a corner point of the feasible region.</p>
            <p><strong className="text-foreground">Steps:</strong> (1) Draw constraint lines, (2) Shade feasible region, (3) Find corner points, (4) Evaluate Z at each corner.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
