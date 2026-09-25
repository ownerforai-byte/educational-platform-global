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
   LPP Graphical Method — NEB Math 12
   Interactive graphical method showing sliding objective line
   to find optimal corner point.
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

export function LPPGraphicalVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [a1, setA1] = useState(2);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(10);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(2);
  const [c2, setC2] = useState(10);
  const [p, setP] = useState(3);
  const [q, setQ] = useState(2);
  const [isoLevel, setIsoLevel] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const det = a1 * b2 - a2 * b1;
  const ix = det !== 0 ? (c1 * b2 - c2 * b1) / det : NaN;
  const iy = det !== 0 ? (a1 * c2 - a2 * c1) / det : NaN;
  // Axis corners of the feasible region (x ≤ c1/a1 AND x ≤ c2/a2 on y = 0, etc.)
  const xAxisCorner = Math.min(a1 > 0 ? c1 / a1 : Infinity, a2 > 0 ? c2 / a2 : Infinity);
  const yAxisCorner = Math.min(b1 > 0 ? c1 / b1 : Infinity, b2 > 0 ? c2 / b2 : Infinity);
  const hasRegion =
    Number.isFinite(ix) && Number.isFinite(iy) &&
    ix > 0 && iy > 0 &&
    Number.isFinite(xAxisCorner) && Number.isFinite(yAxisCorner) &&
    ix <= xAxisCorner + 1e-9 && iy <= yAxisCorner + 1e-9;
  const cornerList = hasRegion
    ? [{ x: 0, y: 0 }, { x: xAxisCorner, y: 0 }, { x: ix, y: iy }, { x: 0, y: yAxisCorner }]
    : [];
  const zAt = (x: number, y: number) => p * x + q * y;
  const bestCorner = cornerList.length ? cornerList.reduce((m, c) => (zAt(c.x, c.y) > zAt(m.x, m.y) ? c : m)) : null;

  const presets: ScenePreset[] = [
    {
      name: "Classic pair (Z = 3x + 2y)",
      hint: "2x + y ≤ 10, x + 2y ≤ 10 — optimum at the intersection (10/3, 10/3).",
      apply: () => { setA1(2); setB1(1); setC1(10); setA2(1); setB2(2); setC2(10); setP(3); setQ(2); setIsoLevel(0); setRunId((r) => r + 1); },
    },
    {
      name: "Equal weights (p = q = 2)",
      hint: "Z = 2x + 2y — a 45° objective line; ties can occur along an edge.",
      apply: () => { setA1(2); setB1(1); setC1(10); setA2(1); setB2(2); setC2(10); setP(2); setQ(2); setIsoLevel(0); setRunId((r) => r + 1); },
    },
    {
      name: "y-heavy profit (Z = x + 5y)",
      hint: "Steep weight on y — the optimum moves onto the y-axis corner.",
      apply: () => { setA1(2); setB1(1); setC1(10); setA2(1); setB2(2); setC2(10); setP(1); setQ(5); setIsoLevel(0); setRunId((r) => r + 1); },
    },
    {
      name: "Optimal iso-line in place",
      hint: "Slides the orange line px + qy = k to the maximum attainable level k = 17.",
      apply: () => { setA1(2); setB1(1); setC1(10); setA2(1); setB2(2); setC2(10); setP(3); setQ(2); setIsoLevel(17); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setA1(2); setB1(1); setC1(10);
    setA2(1); setB2(2); setC2(10);
    setP(3); setQ(2);
    setIsoLevel(0);
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

      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));

      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      // Grid/axes are static — only meshes added after this line get rebuilt.
      const staticCount = meshes.length;

      const update = () => {
        while (meshes.length > staticCount) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }
        labelSprites.length = 0;

        const drawLine = (a: number, b: number, c: number, color: number) => {
          if (a === 0 && b === 0) return;
          const xInt = a !== 0 ? c / a : Infinity;
          const yInt = b !== 0 ? c / b : Infinity;
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.max(-1, xInt * 1.2), 0, 0), new THREE.Vector3(0, Math.max(-1, yInt * 1.2), 0)]), new THREE.LineBasicMaterial({ color })));
        };
        drawLine(a1, b1, c1, 0xef4444);
        drawLine(a2, b2, c2, 0x3b82f6);

        // Feasible region: convex quad O → (xA, 0) → (ix, iy) → (0, yA)
        if (hasRegion) {
          const shape = new THREE.Shape();
          shape.moveTo(0, 0);
          shape.lineTo(xAxisCorner, 0);
          shape.lineTo(ix, iy);
          shape.lineTo(0, yAxisCorner);
          shape.closePath();
          push(new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.12, side: THREE.DoubleSide })));

          const polyPts: THREE.Vector3[] = [];
          const verts = [new THREE.Vector3(0, 0), new THREE.Vector3(xAxisCorner, 0), new THREE.Vector3(ix, iy), new THREE.Vector3(0, yAxisCorner)];
          for (let i = 0; i <= 80; i++) {
            const idx = Math.floor(i / 20) % 4;
            const nextIdx = (idx + 1) % 4;
            const t = (i % 20) / 20;
            polyPts.push(new THREE.Vector3(verts[idx].x + t * (verts[nextIdx].x - verts[idx].x), verts[idx].y + t * (verts[nextIdx].y - verts[idx].y), 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(polyPts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 3 })));
        }

        // Corner points
        cornerList.forEach(({ x, y }) => {
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
          dot.position.set(x, y, 0.05);
          const zVal = p * x + q * y;
          addLabel(mkSprite(`(${x.toFixed(1)},${y.toFixed(1)}) Z=${zVal.toFixed(1)}`, "#fbbf24", new THREE.Vector3(x + 0.3, y + 0.4, 0), 0.6));
        });

        // Sliding objective line: px + qy = isoLevel
        if (isoLevel > 0 && p !== 0 && q !== 0) {
          const ox1 = 0, oy1 = isoLevel / q;
          const ox2 = isoLevel / p, oy2 = 0;
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox1, oy1, 0), new THREE.Vector3(ox2, oy2, 0)]),
            new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
          ));
        }

        addLabel(mkSprite(`Max Z = ${p}x + ${q}y  |  Slide orange line to farthest corner`, "#a78bfa", new THREE.Vector3(0, 8, 0), 0.8));
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
  }, [a1, b1, c1, a2, b2, c2, p, q, isoLevel, ix, iy, xAxisCorner, yAxisCorner, hasRegion, cornerList, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="LPP Graphical Method" description="Feasible region optimizer — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>LPP — Graphical Method</span>
          <span className="text-xs text-muted-foreground font-normal">Slide objective line to find optimum</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-amber-500/50 bg-amber-500/10 text-amber-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Constraints">
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="w-10"><Label className="text-xs text-muted-foreground">a₁:</Label><Input type="number" step="0.5" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-10"><Label className="text-xs text-muted-foreground">b₁:</Label><Input type="number" step="0.5" value={b1} onChange={(e) => setB1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-10"><Label className="text-xs text-muted-foreground">c₁:</Label><Input type="number" step="0.5" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-10"><Label className="text-xs text-muted-foreground">a₂:</Label><Input type="number" step="0.5" value={a2} onChange={(e) => setA2(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-10"><Label className="text-xs text-muted-foreground">b₂:</Label><Input type="number" step="0.5" value={b2} onChange={(e) => setB2(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-10"><Label className="text-xs text-muted-foreground">c₂:</Label><Input type="number" step="0.5" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Objective Z = px + qy">
          <div className="flex gap-2 mt-2">
            <div className="w-10"><Label className="text-xs text-muted-foreground">p:</Label><Input type="number" step="0.5" value={p} onChange={(e) => setP(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-10"><Label className="text-xs text-muted-foreground">q:</Label><Input type="number" step="0.5" value={q} onChange={(e) => setQ(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Objective Line Level">
          <input type="range" min={0} max={50} step={1} value={isoLevel} onChange={(e) => setIsoLevel(Number(e.target.value))} className="w-full mt-1" />
          <p className="text-xs font-mono text-primary mt-1">px + qy = {isoLevel}</p>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Objective function", value: `Z = ${p}x + ${q}y` },
            { label: "Objective line at", value: isoLevel > 0 ? `Z = ${isoLevel}` : "hidden (0)" },
            { label: "Z at x-axis corner", value: Number.isFinite(xAxisCorner) ? zAt(xAxisCorner, 0).toFixed(1) : "unbounded" },
            { label: "Z at intersection", value: hasRegion ? zAt(ix, iy).toFixed(1) : "—" },
            { label: "Z at y-axis corner", value: Number.isFinite(yAxisCorner) ? zAt(0, yAxisCorner).toFixed(1) : "unbounded" },
            { label: "Max Z", value: bestCorner ? `${zAt(bestCorner.x, bestCorner.y).toFixed(1)} at (${bestCorner.x.toFixed(1)}, ${bestCorner.y.toFixed(1)})` : "—", highlight: true },
          ]}
        />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Corner Point Method</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Plot constraints and identify the feasible region.</p>
            <p><strong className="text-foreground">Step 2:</strong> Find all corner (vertex) points of the feasible region.</p>
            <p><strong className="text-foreground">Step 3:</strong> Evaluate Z = px + qy at each corner point.</p>
            <p><strong className="text-foreground">Step 4:</strong> The maximum/minimum value is the optimal solution.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
