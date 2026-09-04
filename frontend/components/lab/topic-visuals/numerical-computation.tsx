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
   Numerical Computation — NEB Computational Methods (Maths 11)
   Bisection and Newton-Raphson methods for finding roots
   of algebraic and transcendental equations.
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

type Method = "bisection" | "newton";

export function NumericalComputationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [method, setMethod] = useState<Method>("bisection");
  const [a, setA] = useState(-2);
  const [b, setB] = useState(3);
  const [x0, setX0] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [iterations, setIterations] = useState<{ label: string; val: number; err: number }[]>([]);


  const f = (x: number) => x * x * x - x - 2;
  const df = (x: number) => 3 * x * x - 1;

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

      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 40) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        // Plot f(x) = x³ - x - 2
        const curvePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 400; i++) {
          const x = -10 + (i / 400) * 20;
          const y = f(x);
          if (isFinite(y) && Math.abs(y) < 15) curvePts.push(new THREE.Vector3(x, y, 0.02));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        if (method === "bisection") {
          let lo = Math.min(a, b), hi = Math.max(a, b);
          const steps = 8;
          for (let i = 0; i < steps; i++) {
            const mid = (lo + hi) / 2;
            const midY = f(mid);
            const color = i % 2 === 0 ? 0xef4444 : 0x3b82f6;
            // Vertical line at midpoint
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(mid, -8, 0), new THREE.Vector3(mid, midY, 0.03)]),
              new THREE.LineBasicMaterial({ color }),
            ));
            // Point on curve
            const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color })));
            dot.position.set(mid, midY, 0.05);
            push(mkSprite(`x${i+1}=${mid.toFixed(3)}`, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(mid, midY + 0.8, 0), 0.6));
            if (f(lo) * midY < 0) hi = mid; else lo = mid;
          }
          push(mkSprite("Bisection: halve interval each step", "#fbbf24", new THREE.Vector3(0, -8.5, 0), 0.8));
        } else {
          // Newton-Raphson
          let x = x0;
          for (let i = 0; i < 6; i++) {
            const fx = f(x);
            const dfx = df(x);
            const xNext = x - fx / dfx;
            // Tangent line at x
            const tanLen = 3;
            const y1 = fx - dfx * tanLen;
            const y2 = fx + dfx * tanLen;
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x - tanLen, y1, 0), new THREE.Vector3(x + tanLen, y2, 0)]),
              new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
            ));
            const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
            dot.position.set(x, fx, 0.05);
            push(mkSprite(`x${i}=${x.toFixed(3)}`, "#f87171", new THREE.Vector3(x + 0.5, fx + 0.8, 0), 0.65));
            // Arrow to next guess
            const arrow = new THREE.ArrowHelper(
              new THREE.Vector3(xNext - x, -fx, 0).normalize(),
              new THREE.Vector3(x, fx, 0.05),
              Math.sqrt((xNext - x) ** 2 + fx * fx),
              0x22c55e, 0.2, 0.12
            );
            push(arrow);
            push(mkSprite(`→ x${i+1}=${xNext.toFixed(3)}`, "#4ade80", new THREE.Vector3((x + xNext) / 2, -0.5, 0), 0.65));
            x = xNext;
          }
          push(mkSprite("Newton-Raphson: xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ)", "#fbbf24", new THREE.Vector3(0, -8.5, 0), 0.8));
        }
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [method, a, b, x0, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Numerical Computation" description="Root-finding algorithms — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Numerical Computation — Root Finding</span>
          <span className="text-xs text-muted-foreground font-normal">Bisection &amp; Newton-Raphson methods</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Method">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["bisection", "newton"] as Method[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  method === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "bisection" ? "Bisection" : "Newton-Raphson"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters (f(x) = x³ − x − 2)">
          {method === "bisection" ? (
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">a:</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">b:</Label><Input type="number" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} className="mt-1" /></div>
            </div>
          ) : (
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">x₀:</Label><Input type="number" step="0.5" value={x0} onChange={(e) => setX0(Number(e.target.value))} className="mt-1" /></div>
            </div>
          )}
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Methods</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Bisection:</strong> If f(a)·f(b) &lt; 0, root exists in [a,b]. Repeatedly halve the interval. Guaranteed convergence but slow (linear).</p>
            <p><strong className="text-foreground">Newton-Raphson:</strong> xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ). Fast quadratic convergence near root, but requires derivative and good initial guess.</p>
            <p><strong className="text-foreground">f(x) = x³ − x − 2</strong> has a real root near x ≈ 1.5214</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
