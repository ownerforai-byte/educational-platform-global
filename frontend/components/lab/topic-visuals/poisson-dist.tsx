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
   Poisson Distribution — NEB Probability (Maths 12)
   PMF visualization of P(X=k) = e^(-λ) · λᵏ / k!
   with parameter λ (average rate).
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

export function PoissonDistVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lambda, setLambda] = useState(3);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
  const pmf = (k: number) => Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k);

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

        const maxK = Math.max(Math.ceil(lambda * 3), 15);
        const probs = Array.from({ length: maxK + 1 }, (_, k) => pmf(k));
        const maxProb = Math.max(...probs, 0.001);

        for (let k = 0; k <= maxK; k++) {
          const prob = pmf(k);
          const barH = (prob / maxProb) * 3;
          if (barH < 0.05) continue;
          const bar = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.5, barH, 0.5),
            new THREE.MeshBasicMaterial({ color: 0x60a5fa }),
          ));
          bar.position.set((k - lambda) * 0.8, barH / 2, 0);
          if (barH > 0.3) {
            push(mkSprite(`${k}: ${prob.toFixed(2)}`, "#fbbf24", new THREE.Vector3((k - lambda) * 0.8, barH + 0.3, 0), 0.55));
          }
        }

        // Mean = variance = lambda line
        const meanX = (lambda - lambda) * 0.8;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(meanX, 0, 0.5), new THREE.Vector3(meanX, 4, 0.5)]),
          new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 }),
        ));
        push(mkSprite(`μ = σ² = λ = ${lambda.toFixed(1)}`, "#f87171", new THREE.Vector3(meanX, 4.3, 0), 0.7));
        push(mkSprite("Poisson: P(X=k) = e^(-λ)·λᵏ/k!", "#a78bfa", new THREE.Vector3(0, -3.5, 0), 0.8));
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
  }, [lambda, pmf, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Poisson Distribution" description="Rate-based PMF visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Poisson Distribution</span>
          <span className="text-xs text-muted-foreground font-normal">P(X=k) = e^(-λ)·λᵏ/k!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Parameter λ (average rate)">
          <input type="range" min={0.5} max={10} step={0.5} value={lambda} onChange={(e) => setLambda(Number(e.target.value))} className="w-full mt-1" />
          <p className="text-xs font-mono text-primary mt-1">λ = {lambda.toFixed(1)}</p>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-400">Poisson Distribution</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">PMF:</strong> P(X = k) = e<sup>-λ</sup> · λᵏ / k!,  k = 0, 1, 2, ...</p>
            <p><strong className="text-foreground">Mean:</strong> E[X] = λ</p>
            <p><strong className="text-foreground">Variance:</strong> Var(X) = λ  (mean = variance)</p>
            <p><strong className="text-foreground">Use case:</strong> Counts of rare events in fixed interval (calls/hr, defects/meter, accidents/day)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
