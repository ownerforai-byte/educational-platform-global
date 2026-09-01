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
   Measure of Dispersion — NEB Statistics (Maths 11)
   Visualizes spread of data with interactive histogram,
   showing mean, standard deviation, and variance.
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
  ctx.font = "bold 32px monospace";
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

export function MeasureDispersionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(2);
  const [center, setCenter] = useState(5);
  const [n, setN] = useState(30);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const getData = () => {
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(center + (Math.random() - 0.5) * 2 * spread);
    }
    return arr;
  };

  const stats = () => {
    const d = getData();
    const mean = d.reduce((s, v) => s + v, 0) / d.length;
    const variance = d.reduce((s, v) => s + (v - mean) ** 2, 0) / d.length;
    const sd = Math.sqrt(variance);
    const cv = (sd / Math.abs(mean)) * 100;
    const min = Math.min(...d);
    const max = Math.max(...d);
    const range = max - min;
    return { mean, variance, sd, cv, min, max, range, data: d };
  };

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
        while (meshes.length > 60) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const { mean, sd, variance, cv, data } = stats();
        const maxVal = Math.max(...data.map(Math.abs), 1) * 1.2;

        data.forEach((v, i) => {
          const barH = (v / maxVal) * 2 + 0.3;
          const color = Math.abs(v - mean) <= sd ? 0x22c55e : 0xef4444;
          const bar = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.5, Math.abs(barH), 0.5),
            new THREE.MeshBasicMaterial({ color }),
          ));
          bar.position.set((i - data.length / 2) * 0.5, barH / 2 - 1, 0);
        });

        // Mean line
        const meanNorm = mean / maxVal;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, meanNorm * 2 - 1, 0), new THREE.Vector3(8, meanNorm * 2 - 1, 0)]),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 3 }),
        ));
        push(mkSprite(`μ = ${mean.toFixed(2)}`, "#fbbf24", new THREE.Vector3(6, meanNorm * 2 + 0.5, 0), 0.7));

        // SD band
        const sdLow = (mean - sd) / maxVal;
        const sdHigh = (mean + sd) / maxVal;
        const band = push(new THREE.Mesh(
          new THREE.BoxGeometry(16, sdHigh - sdLow, 0.05),
          new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15 }),
        ));
        band.position.set(0, (sdLow + sdHigh) / 2 * 2 - 1, 0);
        push(mkSprite(`σ = ${sd.toFixed(2)}  (68% rule)`, "#60a5fa", new THREE.Vector3(-7, sdHigh * 2 + 0.5, 0), 0.65));

        // Stats panel
        push(mkSprite(`σ² = ${variance.toFixed(2)}   CV = ${cv.toFixed(1)}%`, "#a78bfa", new THREE.Vector3(0, -3.5, 0), 0.8));
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
  }, [spread, center, n, isWebGL, stats]);

  if (!isWebGL) {
    return <WebGLFallback title="Measure of Dispersion" description="Statistical visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Measure of Dispersion</span>
          <span className="text-xs text-muted-foreground font-normal">Standard deviation, variance, coefficient of variation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Data Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">Center:</Label><Input type="number" step="0.5" value={center} onChange={(e) => setCenter(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">Spread:</Label><Input type="number" step="0.5" min={0.5} value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">n:</Label><Input type="number" step="5" min={5} max={100} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Key Formulas</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Mean:</strong> x̄ = (Σxᵢ) / n</p>
            <p><strong className="text-foreground">Variance:</strong> σ² = Σ(xᵢ − x̄)² / n</p>
            <p><strong className="text-foreground">Standard Deviation:</strong> σ = √(σ²)</p>
            <p><strong className="text-foreground">Coefficient of Variation:</strong> CV = (σ / x̄) × 100%</p>
            <p><strong className="text-foreground">Karl Pearson's Skewness:</strong> Sk = (x̄ − Median) / σ</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
