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
  const [a1, setA1] = useState(2);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(10);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(2);
  const [c2, setC2] = useState(10);
  const [p, setP] = useState(3);
  const [q, setQ] = useState(2);
  const [isoLevel, setIsoLevel] = useState(0);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const det = a1 * b2 - a2 * b1;
  const ix = det !== 0 ? (c1 * b2 - c2 * b1) / det : NaN;
  const iy = det !== 0 ? (a1 * c2 - a2 * c1) / det : NaN;

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

      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));

      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const drawLine = (a: number, b: number, c: number, color: number) => {
          const xInt = c / a, yInt = c / b;
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.max(-1, xInt * 1.2), 0, 0), new THREE.Vector3(0, Math.max(-1, yInt * 1.2), 0)]), new THREE.LineBasicMaterial({ color })));
        };
        drawLine(a1, b1, c1, 0xef4444);
        drawLine(a2, b2, c2, 0x3b82f6);

        // Feasible region
        if (ix > 0 && iy > 0) {
          const v0 = new THREE.Vector3(0, 0);
          const v1 = new THREE.Vector3(Math.min(ix, c1 / a1), 0);
          const v2 = new THREE.Vector3(ix, iy);
          const v3 = new THREE.Vector3(0, Math.min(iy, c2 / b2));
          const polyPts: THREE.Vector3[] = [];
          const verts = [v0, v1, v2, v3];
          for (let i = 0; i <= 80; i++) {
            const idx = Math.floor(i / 20) % 4;
            const nextIdx = (idx + 1) % 4;
            const t = (i % 20) / 20;
            polyPts.push(new THREE.Vector3(verts[idx].x + t * (verts[nextIdx].x - verts[idx].x), verts[idx].y + t * (verts[nextIdx].y - verts[idx].y), 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(polyPts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 3 })));
          const fill = push(new THREE.Mesh(new THREE.CircleGeometry(1, 64), new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.12, side: THREE.DoubleSide })));
          // Use polygon geometry instead
        }

        // Corner points
        const corners = [
          [0, 0],
          [Math.min(ix, c1 / a1), 0],
          [ix, iy],
          [0, Math.min(iy, c2 / b2)],
        ].filter(([x, y]) => isFinite(x) && isFinite(y) && x >= 0 && y >= 0);

        corners.forEach(([cx, cy]) => {
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
          dot.position.set(cx, cy, 0.05);
          const zVal = p * cx + q * cy;
          push(mkSprite(`(${cx.toFixed(1)},${cy.toFixed(1)}) Z=${zVal.toFixed(1)}`, "#fbbf24", new THREE.Vector3(cx + 0.3, cy + 0.4, 0), 0.6));
        });

        // Sliding objective line: px + qy = isoLevel
        if (isoLevel > 0) {
          const ox1 = 0, oy1 = isoLevel / q;
          const ox2 = isoLevel / p, oy2 = 0;
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox1, oy1, 0), new THREE.Vector3(ox2, oy2, 0)]),
            new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
          ));
        }

        push(mkSprite(`Max Z = ${p}x + ${q}y  |  Slide orange line to farthest corner`, "#a78bfa", new THREE.Vector3(0, 8, 0), 0.8));
      };

      update();

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

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
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
  }, [a1, b1, c1, a2, b2, c2, p, q, isoLevel, ix, iy, isWebGL]);

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

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

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
