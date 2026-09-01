"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
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
  const [a1, setA1] = useState(2);
  const [b1, setB1] = useState(3);
  const [c1, setC1] = useState(12);
  const [a2, setA2] = useState(3);
  const [b2, setB2] = useState(1);
  const [c2, setC2] = useState(12);
  const [pa, setPa] = useState(5);
  const [pb, setPb] = useState(4);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  // Constraint lines: a1*x + b1*y = c1 and a2*x + b2*y = c2
  // Intersection point
  const det = a1 * b2 - a2 * b1;
  const intersectX = det !== 0 ? (c1 * b2 - c2 * b1) / det : NaN;
  const intersectY = det !== 0 ? (a1 * c2 - a2 * c1) / det : NaN;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];

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

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Coordinate axes (first quadrant)
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
      push(mkSprite("x", "#ef4444", new THREE.Vector3(10.3, 0, 0), 0.5));
      push(mkSprite("y", "#22c55e", new THREE.Vector3(0, 10.3, 0), 0.5));

      // Draw constraint lines
      const drawLine = (a: number, b: number, c: number, color: number, label: string) => {
        // x-intercept: (c/a, 0), y-intercept: (0, c/b)
        const xInt = c / a, yInt = c / b;
        // Extend beyond intercepts
        const p1 = new THREE.Vector3(Math.max(-1, xInt * 1.3), 0, 0);
        const p2 = new THREE.Vector3(0, Math.max(-1, yInt * 1.3), 0);
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([p1, p2]), new THREE.LineBasicMaterial({ color, linewidth: 2 })));
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(xInt + 0.3, yInt * 0.3, 0), 0.65));
      };

      drawLine(a1, b1, c1, 0xef4444, `${a1}x+${b1}y≤${c1}`);
      drawLine(a2, b2, c2, 0x3b82f6, `${a2}x+${b2}y≤${c2}`);

      // Feasible region (shaded triangle near origin)
      if (intersectX > 0 && intersectY > 0 && intersectX < 10 && intersectY < 10) {
        const feasPts = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.min(intersectX, c1 / a1), 0, 0),
          new THREE.Vector3(intersectX, intersectY, 0),
          new THREE.Vector3(0, Math.min(intersectY, c2 / b2), 0),
          new THREE.Vector3(0, 0, 0),
        ];
        // Fill feasible region
        const fillGeo = new THREE.BufferGeometry().setFromPoints(feasPts.slice(0, 4));
        const fillMesh = push(new THREE.Mesh(fillGeo, new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.2, side: THREE.DoubleSide })));
        // Rebuild as proper polygon
        const polyPts: THREE.Vector3[] = [];
        const verts = [new THREE.Vector3(0, 0), new THREE.Vector3(Math.min(intersectX, c1 / a1), 0), new THREE.Vector3(intersectX, intersectY), new THREE.Vector3(0, Math.min(intersectY, c2 / b2))];
        for (let i = 0; i <= 64; i++) {
          const idx = Math.floor(i / 16) % 4;
          const nextIdx = (idx + 1) % 4;
          const t = (i % 16) / 16;
          polyPts.push(new THREE.Vector3(
            verts[idx].x + t * (verts[nextIdx].x - verts[idx].x),
            verts[idx].y + t * (verts[nextIdx].y - verts[idx].y),
            0.02
          ));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(polyPts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 3 })));
        push(mkSprite("Feasible Region", "#22d3ee", new THREE.Vector3(1.5, 1.5, 0), 0.7));
      }

      // Corner points
      if (intersectX > 0 && intersectY > 0) {
        const corners = [
          { pt: new THREE.Vector3(0, 0), label: "O(0,0)" },
          { pt: new THREE.Vector3(Math.min(intersectX, c1 / a1), 0), label: `(${Math.min(intersectX, c1/a1).toFixed(1)},0)` },
          { pt: new THREE.Vector3(intersectX, intersectY), label: `(${intersectX.toFixed(1)},${intersectY.toFixed(1)})` },
          { pt: new THREE.Vector3(0, Math.min(intersectY, c2 / b2)), label: `(0,${Math.min(intersectY, c2/b2).toFixed(1)})` },
        ];
        corners.forEach(({ pt, label }) => {
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
          dot.position.set(pt.x, pt.y, 0.05);
          push(mkSprite(label, "#fbbf24", pt.clone().add(new THREE.Vector3(0.3, 0.3, 0)), 0.6));
        });
      }

      // Objective function indicator
      push(mkSprite(`Max Z = ${pa}x + ${pb}y`, "#a78bfa", new THREE.Vector3(-8, 8.5, 0), 0.85));
    };

    const cleanup = init();
    return () => { cleanup.then((d: any) => d?.()); };
  }, [a1, b1, c1, a2, b2, c2, pa, pb, isWebGL]);

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

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

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
