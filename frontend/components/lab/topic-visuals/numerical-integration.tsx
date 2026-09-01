"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Numerical Integration — NEB Computational Methods (Maths 11)
   Trapezoidal rule and Simpson's rule visualized on a curve,
   showing how area is approximated by polygons.
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

type IntMode = "trapezoidal" | "simpson";

export function NumericalIntegrationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<IntMode>("trapezoidal");
  const [n, setN] = useState(6);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const f = (x: number) => Math.sin(x) + 1.5;

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
        while (meshes.length > 80) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const a = 0, b = Math.PI;
        const h = (b - a) / n;

        // Curve
        const curvePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 200; i++) {
          const x = a + (i / 200) * (b - a);
          curvePts.push(new THREE.Vector3(x * 2 - 5, f(x) * 2 - 2, 0.02));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        if (mode === "trapezoidal") {
          // Trapezoidal rule
          let totalArea = 0;
          for (let i = 0; i < n; i++) {
            const x1 = a + i * h, x2 = a + (i + 1) * h;
            const y1 = f(x1) * 2 - 2, y2 = f(x2) * 2 - 2;
            const sx1 = x1 * 2 - 5, sx2 = x2 * 2 - 5;
            const color = i % 2 === 0 ? 0xef4444 : 0x3b82f6;
            const tri1 = push(new THREE.Mesh(
              new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sx1, -2, 0), new THREE.Vector3(sx2, -2, 0), new THREE.Vector3(sx2, y2, 0), new THREE.Vector3(sx1, y1, 0)]),
              new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
            ));
            tri1.geometry!.computeVertexNormals();
            totalArea += (y1 + y2) / 2 * h;
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sx1, y1, 0), new THREE.Vector3(sx2, y2, 0)]),
              new THREE.LineBasicMaterial({ color }),
            ));
          }
          push(mkSprite(`Trapezoidal: Σ (yᵢ+yᵢ₊₁)/2 · h  ≈  ${totalArea.toFixed(4)}`, "#f97316", new THREE.Vector3(0, 4.5, 0), 0.85));
        } else {
          // Simpson's rule (n must be even)
          const sn = n % 2 === 0 ? n : n + 1;
          let totalArea = 0;
          for (let i = 0; i < sn; i += 2) {
            const x1 = a + i * h, x2 = a + (i + 1) * h, x3 = a + (i + 2) * h;
            const y1 = f(x1) * 2 - 2, y2 = f(x2) * 2 - 2, y3 = f(x3) * 2 - 2;
            const sx1 = x1 * 2 - 5, sx2 = x2 * 2 - 5, sx3 = x3 * 2 - 5;
            const color = 0x22c55e;
            // Parabolic arc approximation
            const arcPts: THREE.Vector3[] = [];
            for (let j = 0; j <= 20; j++) {
              const t = j / 20;
              const xt = x1 + t * (x3 - x1);
              const yt = (f(xt) * 2 - 2);
              arcPts.push(new THREE.Vector3(xt * 2 - 5, yt, 0.03));
            }
            push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), new THREE.LineBasicMaterial({ color, linewidth: 3 })));
            // Fill under parabola
            const fillPts: THREE.Vector3[] = [
              new THREE.Vector3(sx1, -2, 0), new THREE.Vector3(sx3, -2, 0),
              new THREE.Vector3(sx3, y3, 0), ...arcPts.map(p => new THREE.Vector3(p.x, p.y, 0)),
              new THREE.Vector3(sx1, y1, 0),
            ];
            const fill = push(new THREE.Mesh(new THREE.BufferGeometry().setFromPoints(fillPts), new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.2, side: THREE.DoubleSide })));
            fill.geometry!.computeVertexNormals();
            totalArea += (h / 3) * (f(x1) + 4 * f(x2) + f(x3));
          }
          push(mkSprite(`Simpson's: (h/3)[f₀+4f₁+2f₂+...+fₙ]  ≈  ${totalArea.toFixed(4)}`, "#4ade80", new THREE.Vector3(0, 4.5, 0), 0.85));
        }

        // True value: ∫₀^π (sin x + 1.5) dx = 2 + 1.5π ≈ 6.7124
        const trueVal = 2 + 1.5 * Math.PI;
        push(mkSprite(`True value = ${trueVal.toFixed(4)}`, "#a78bfa", new THREE.Vector3(0, 3.7, 0), 0.75));
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
  }, [mode, n, isWebGL, f]);

  if (!isWebGL) {
    return <WebGLFallback title="Numerical Integration" description="Area approximation methods — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Numerical Integration</span>
          <span className="text-xs text-muted-foreground font-normal">Trapezoidal &amp; Simpson's rule</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Integration Method">
          <Tabs value={mode} onValueChange={(v) => setMode(v as IntMode)} className="mt-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="trapezoidal" className="text-xs">Trapezoidal</TabsTrigger>
              <TabsTrigger value="simpson" className="text-xs">Simpson's 1/3</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="Sub-intervals (n)">
          <input type="range" min={2} max={20} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full mt-1" />
          <p className="text-xs font-mono text-primary mt-1">{n} sub-intervals</p>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Formulas</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Trapezoidal Rule:</strong> ∫ₐᵇ f(x)dx ≈ (h/2)[f(x₀) + 2f(x₁) + ... + 2f(xₙ₋₁) + f(xₙ)]</p>
            <p><strong className="text-foreground">Simpson's 1/3 Rule:</strong> ∫ₐᵇ f(x)dx ≈ (h/3)[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(xₙ)] (n even)</p>
            <p><strong className="text-foreground">Accuracy:</strong> Simpson's rule is O(h⁴) vs Trapezoidal O(h³) — much more accurate for smooth functions.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
