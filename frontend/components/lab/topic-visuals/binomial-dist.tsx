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
   Binomial Distribution — NEB Probability (Maths 12)
   3D bar chart of P(X=k) = C(n,k)·p^k·(1-p)^(n-k)
   with mean, variance indicators.
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

export function BinomialDistVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.4);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
    const pmf = (k: number) => factorial(n) / (factorial(k) * factorial(n - k)) * Math.pow(p, k) * Math.pow(1 - p, n - k);

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

        const maxProb = Math.max(...Array.from({ length: n + 1 }, (_, k) => pmf(k)), 0.001);
        const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e, 0x3b82f6, 0x8b5cf6];

        for (let k = 0; k <= n; k++) {
          const prob = pmf(k);
          const barH = (prob / maxProb) * 3.5;
          const bar = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.55, barH, 0.55),
            new THREE.MeshBasicMaterial({ color: colors[k % colors.length] }),
          ));
          bar.position.set((k - n / 2) * 0.9, barH / 2, 0);
          if (barH > 0.3) {
            push(mkSprite(`${k}\n${prob.toFixed(2)}`, "#fbbf24", new THREE.Vector3((k - n / 2) * 0.9, barH + 0.4, 0), 0.55));
          }
        }

        // Mean marker
        const mean = n * p;
        const meanX = (mean - n / 2) * 0.9;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(meanX, 0, 0.5), new THREE.Vector3(meanX, 4.5, 0.5)]),
          new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 }),
        ));
        push(mkSprite(`μ=np=${mean.toFixed(1)}`, "#f87171", new THREE.Vector3(meanX, 4.8, 0), 0.7));

        // Variance/SD info
        const varVal = n * p * (1 - p);
        push(mkSprite(`σ²=${varVal.toFixed(2)}   σ=${Math.sqrt(varVal).toFixed(2)}`, "#a78bfa", new THREE.Vector3(0, -3, 0), 0.8));
        push(mkSprite(`P(X=k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ`, "#7dd3fc", new THREE.Vector3(0, -4, 0), 0.75));
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
  }, [n, p, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Binomial Distribution" description="3D probability mass function — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Binomial Distribution</span>
          <span className="text-xs text-muted-foreground font-normal">B(n, p) — 3D PMF</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Parameters">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">n (trials):</Label><Input type="number" step="1" min={3} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">p (success):</Label><Input type="number" step="0.05" min={0} max={1} value={p} onChange={(e) => setP(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">Binomial Distribution</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">PMF:</strong> P(X = k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ,  k = 0,1,...,n</p>
            <p><strong className="text-foreground">Mean:</strong> μ = E[X] = np</p>
            <p><strong className="text-foreground">Variance:</strong> σ² = Var(X) = np(1−p)</p>
            <p><strong className="text-foreground">Shape:</strong> Symmetric if p = 0.5; skewed right if p &lt; 0.5; skewed left if p &gt; 0.5</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
