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
   Definite Integral / Area Under Curve — NEB Calculus (Maths 11 & 12)
   Riemann sum visualization: rectangles converge to the area
   under a curve, illustrating the definite integral.
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

export function IntegralAreaVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nRects, setNRects] = useState(8);
  const [method, setMethod] = useState<"left" | "right" | "midpoint">("midpoint");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const f = (x: number) => Math.sin(x) * 2 + 1.5;

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
      camera.position.set(0, 0, 16);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 30;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const mkAxis = (from: THREE.Vector2, to: THREE.Vector2, color: number, label: string) => {
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(from.x, from.y, 0), new THREE.Vector3(to.x, to.y, 0)]),
          new THREE.LineBasicMaterial({ color }),
        ));
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(to.x, to.y, 0.05), 0.6));
      };
      mkAxis(new THREE.Vector2(-2, 0), new THREE.Vector2(10, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector2(0, -2), new THREE.Vector2(0, 10), 0x22c55e, "y");

      // Grid
      for (let i = 0; i <= 10; i++) {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -2, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      // Curve
      const curvePts: THREE.Vector3[] = [];
      for (let i = 0; i <= 200; i++) {
        const x = (i / 200) * 10;
        const y = f(x);
        curvePts.push(new THREE.Vector3(x, y, 0.02));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

      const updateRectangles = () => {
        // Remove old rectangles (keep axes and curve — indices 0..23)
        while (meshes.length > 24) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const a = 1, b = 7;
        const width = (b - a) / nRects;
        let totalArea = 0;

        const colors = [0x60a5fa, 0x22c55e, 0xfbbf24, 0xf97316, 0xef4444, 0x8b5cf6, 0x22d3ee, 0xa3e635];

        for (let i = 0; i < nRects; i++) {
          let xSample: number;
          if (method === "left") xSample = a + i * width;
          else if (method === "right") xSample = a + (i + 1) * width;
          else xSample = a + (i + 0.5) * width;

          const height = f(xSample);
          totalArea += height * width;

          const x0 = a + i * width;
          const x1 = x0 + width;

          const rectGeom = new THREE.PlaneGeometry(width - 0.03, height);
          const rectMat = new THREE.MeshBasicMaterial({
            color: colors[i % colors.length],
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide,
          });
          const rect = push(new THREE.Mesh(rectGeom, rectMat)) as THREE.Mesh;
          rect.position.set(x0 + width / 2, height / 2, 0.03);
          rect.rotation.x = -Math.PI / 2;

          // Top edge highlight
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(x0, height, 0.04),
              new THREE.Vector3(x1, height, 0.04),
            ]),
            new THREE.LineBasicMaterial({ color: colors[i % colors.length] }),
          ));
        }

        // Area label
        push(mkSprite(
          `Area ≈ ${totalArea.toFixed(3)}  (${nRects} rects, ${method})`,
          "#fbbf24",
          new THREE.Vector3(4, 8.5, 0.05),
          0.9,
        ));

        // Exact value comparison
        const exact = ((-2 * Math.cos(7) + 1.5 * 7) - (-2 * Math.cos(1) + 1.5 * 1));
        push(mkSprite(
          `Exact = ${exact.toFixed(3)}`,
          "#22d3ee",
          new THREE.Vector3(4, 7.8, 0.05),
          0.85,
        ));
      };

      updateRectangles();

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
  }, [nRects, method, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Definite Integral" description="Riemann sum visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Definite Integral — Area Under Curve (Riemann Sums)</span>
          <span className="text-xs text-muted-foreground font-normal">Increase rectangles to see convergence</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Method">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["left", "right", "midpoint"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  method === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "left" ? "Left Endpoint" : m === "right" ? "Right Endpoint" : "Midpoint"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Number of Rectangles">
          <div className="w-40 mt-1">
            <Label className="text-xs text-muted-foreground">n = {nRects}</Label>
            <Input
              type="range"
              min={2}
              max={100}
              step={1}
              value={nRects}
              onChange={(e) => setNRects(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Fundamental Theorem of Calculus</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">∫ₐᵇ f(x) dx = F(b) − F(a)</strong>, where F&apos;(x) = f(x).</p>
            <p><strong className="text-foreground">Riemann sum:</strong> lim(n→∞) Σ f(xᵢ*) Δx = ∫ₐᵇ f(x) dx</p>
            <p>The colored rectangles approximate the area. As n increases, the approximation converges to the exact integral value.</p>
            <p><strong className="text-foreground">Today:</strong> f(x) = 2sin(x) + 1.5 on [1, 7]</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
