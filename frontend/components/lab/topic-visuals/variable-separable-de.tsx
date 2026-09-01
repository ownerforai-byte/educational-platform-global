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
   Variable Separable DE — NEB Calculus (Maths 12)
   Visualizes solving dy/dx = g(x)h(y) by separation of variables
   and phase line / direction field representation.
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

export function VariableSeparableDEVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  const [y0, setY0] = useState(1);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  // dy/dx = ky  →  y = y0 * e^(kx)
  const getSolution = (x: number) => y0 * Math.exp(k * x);

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

      // Axes
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
      push(mkSprite("x", "#ef4444", new THREE.Vector3(10.2, 0, 0.05), 0.5));
      push(mkSprite("y", "#22c55e", new THREE.Vector3(0, 10.2, 0.05), 0.5));

      // Grid
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 50) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        // Direction field (slope ticks)
        for (let i = -8; i <= 8; i += 2) {
          for (let j = -8; j <= 8; j += 2) {
            const slope = k * getSolution(i) * 0.1; // scaled
            const tickLen = 0.25;
            const angle = Math.atan(slope * 0.5);
            const pts = [
              new THREE.Vector3(i - tickLen * Math.cos(angle), j - tickLen * Math.sin(angle), 0),
              new THREE.Vector3(i + tickLen * Math.cos(angle), j + tickLen * Math.sin(angle), 0),
            ];
            push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x334155 })));
          }
        }

        // Solution curves for different y0 values
        const y0Values = [y0 * 0.25, y0 * 0.5, y0, y0 * 2, y0 * 3];
        const colors = [0x94a3b8, 0x64748b, 0x22d3ee, 0xef4444, 0xa78bfa];
        y0Values.forEach((yStart, idx) => {
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 200; i++) {
            const x = -8 + (i / 200) * 16;
            const y = yStart * Math.exp(k * x);
            if (isFinite(y) && Math.abs(y) < 15) {
              pts.push(new THREE.Vector3(x, y, 0.02));
            }
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: colors[idx], linewidth: idx === 2 ? 3 : 1.5 })));
        });

        // Initial condition marker
        const initPt = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
        initPt.position.set(0, y0, 0.05);
        push(mkSprite(`(${0}, ${y0})`, "#fbbf24", new THREE.Vector3(0.5, y0 + 0.5, 0), 0.7));

        // Separation steps annotation
        push(mkSprite("dy/dx = ky  →  dy/y = k dx  →  ln|y| = kx + C  →  y = y₀eᵏˣ", "#f97316", new THREE.Vector3(0, 8, 0), 0.8));
        push(mkSprite(`Solution: y = ${y0.toFixed(1)}·e^(${k.toFixed(1)}x)`, "#22d3ee", new THREE.Vector3(0, 7, 0), 0.8));
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
  }, [k, y0, isWebGL, getSolution]);

  if (!isWebGL) {
    return <WebGLFallback title="Variable Separable DE" description="Separation of variables visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Variable Separable DE</span>
          <span className="text-xs text-muted-foreground font-normal">dy/dx = g(x)·h(y) method</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Parameters (dy/dx = ky)">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">k:</Label><Input type="number" step="0.5" value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">y₀:</Label><Input type="number" step="0.5" value={y0} onChange={(e) => setY0(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-teal-500/30 bg-teal-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-400">Solution Method</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Step 1:</strong> Separate: dy/y = k dx</p>
            <p><strong className="text-foreground">Step 2:</strong> Integrate: ∫dy/y = ∫k dx → ln|y| = kx + C</p>
            <p><strong className="text-foreground">Step 3:</strong> Exponentiate: y = eᴷˣ⁺ᶜ = Aeᵏˣ where A = eᶜ</p>
            <p><strong className="text-foreground">Step 4:</strong> Apply initial condition: y(0) = y₀ → A = y₀ → <strong className="text-foreground">y = y₀eᵏˣ</strong></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
