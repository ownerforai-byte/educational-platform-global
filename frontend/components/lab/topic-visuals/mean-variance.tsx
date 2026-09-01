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
   Mean, Variance & SD of Random Variable — NEB Probability (Maths 12)
   Interactive distribution showing how mean and spread behave.
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

export function MeanVarianceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.4);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
  const pmf = (k: number) => factorial(n) / (factorial(k) * factorial(n - k)) * Math.pow(p, k) * Math.pow(1 - p, n - k);

  const mean = n * p;
  const variance = n * p * (1 - p);
  const sd = Math.sqrt(variance);

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
      camera.position.set(0, 6, 12);
      camera.lookAt(0, 1, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.maxPolarAngle = Math.PI / 2.2;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      push(new THREE.GridHelper(20, 20, 0x334155, 0x1e293b));

      const update = () => {
        while (meshes.length > 50) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const maxProb = Math.max(...Array.from({ length: n + 1 }, (_, k) => pmf(k)));
        const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e, 0x3b82f6, 0x8b5cf6];

        for (let k = 0; k <= n; k++) {
          const prob = pmf(k);
          const barH = (prob / maxProb) * 3;
          const bar = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.6, barH, 0.6),
            new THREE.MeshBasicMaterial({ color: colors[k % colors.length] }),
          ));
          bar.position.set((k - n / 2) * 1.0, barH / 2, 0);
        }

        // Mean line
        const meanX = (mean - n / 2) * 1.0;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(meanX, 0, 0), new THREE.Vector3(meanX, 4, 0)]),
          new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 }),
        ));
        push(mkSprite(`μ = ${mean.toFixed(1)}`, "#f87171", new THREE.Vector3(meanX, 4.3, 0), 0.7));

        // SD band
        const sdLeft = (mean - sd - n / 2) * 1.0;
        const sdRight = (mean + sd - n / 2) * 1.0;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sdLeft, 0, 0), new THREE.Vector3(sdRight, 0, 0)]),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2 }),
        ));
        push(mkSprite(`μ ± σ = [${(mean - sd).toFixed(1)}, ${(mean + sd).toFixed(1)}]`, "#fbbf24", new THREE.Vector3(meanX, -1.5, 0), 0.75));

        // Stats panel
        push(mkSprite(`E[X] = np = ${mean.toFixed(2)}   Var(X) = np(1-p) = ${variance.toFixed(2)}   σ = ${sd.toFixed(2)}`, "#a78bfa", new THREE.Vector3(0, -3, 0), 0.8));
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
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [n, p, pmf, mean, variance, sd, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Mean & Variance" description="Distribution statistics — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Mean, Variance &amp; Standard Deviation</span>
          <span className="text-xs text-muted-foreground font-normal">Binomial distribution properties</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Parameters (Binomial B(n,p))">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">n:</Label><Input type="number" step="1" min={3} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">p:</Label><Input type="number" step="0.05" min={0} max={1} value={p} onChange={(e) => setP(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Formulas</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Mean:</strong> E[X] = μ = np</p>
            <p><strong className="text-foreground">Variance:</strong> Var(X) = σ² = np(1 − p)</p>
            <p><strong className="text-foreground">Standard Deviation:</strong> σ = √(np(1−p))</p>
            <p><strong className="text-foreground">Property:</strong> σ² = E[X²] − (E[X])²</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
