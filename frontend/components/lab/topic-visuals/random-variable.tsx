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
   Random Variable & Distribution — NEB Probability (Maths 12)
   Shows PMF/PDF bars, expected value, and cumulative distribution.
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

type DistType = "discrete" | "continuous";

export function RandomVariableVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [distType, setDistType] = useState<DistType>("discrete");
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.4);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    const factorial = (x: number): number => x <= 1 ? 1 : x * factorial(x - 1);
    const binomialPMF = (k: number) => {
      const comb = factorial(n) / (factorial(k) * factorial(n - k));
      return comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
    };

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

        if (distType === "discrete") {
          // Binomial distribution bars
          const maxP = Math.max(...Array.from({ length: n + 1 }, (_, k) => binomialPMF(k)));
          const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e, 0x3b82f6, 0x8b5cf6];

          for (let k = 0; k <= n; k++) {
            const prob = binomialPMF(k);
            const barH = (prob / maxP) * 3;
            const bar = push(new THREE.Mesh(
              new THREE.BoxGeometry(0.6, barH, 0.6),
              new THREE.MeshBasicMaterial({ color: colors[k % colors.length] }),
            ));
            bar.position.set((k - n / 2) * 1.0, barH / 2, 0);
            if (barH > 0.2) {
              push(mkSprite(`${k}: ${prob.toFixed(2)}`, "#fbbf24", new THREE.Vector3((k - n / 2) * 1.0, barH + 0.3, 0), 0.6));
            }
          }

          // Mean and SD indicators
          const mean = n * p;
          const variance = n * p * (1 - p);
          const sd = Math.sqrt(variance);
          push(mkSprite(`E[X] = μ = np = ${mean.toFixed(1)}`, "#22d3ee", new THREE.Vector3(0, -1.5, 0), 0.8));
          push(mkSprite(`Var(X) = σ² = np(1-p) = ${variance.toFixed(2)}`, "#a78bfa", new THREE.Vector3(0, -2.5, 0), 0.8));
          push(mkSprite(`σ = ${sd.toFixed(2)}`, "#fb923c", new THREE.Vector3(0, -3.3, 0), 0.75));
        } else {
          // Normal distribution PDF
          const mu = 5, sigma = 2;
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 200; i++) {
            const x = -5 + (i / 200) * 20;
            const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
            pts.push(new THREE.Vector3(x - 5, y * 5, 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 3 })));
          push(mkSprite(`Normal: N(μ=${mu}, σ=${sigma})`, "#60a5fa", new THREE.Vector3(0, 5.5, 0), 0.85));
          push(mkSprite(`f(x) = (1/σ√2π) e^(-(x-μ)²/2σ²)`, "#a78bfa", new THREE.Vector3(0, -4.5, 0), 0.75));
          // Mean line
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -4.8, 0), new THREE.Vector3(0, 5, 0)]),
            new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }),
          ));
          push(mkSprite("μ", "#f87171", new THREE.Vector3(0.5, 5, 0), 0.6));
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
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [distType, n, p, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Random Variable" description="Distribution visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Random Variable &amp; Probability Distribution</span>
          <span className="text-xs text-muted-foreground font-normal">PMF, PDF, expectation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Distribution Type">
          <div className="flex gap-2 mt-2">
            <button onClick={() => setDistType("discrete")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${distType === "discrete" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Discrete (Binomial)</button>
            <button onClick={() => setDistType("continuous")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${distType === "continuous" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Continuous (Normal)</button>
          </div>
        </CollapsibleControls>

        {distType === "discrete" && (
          <CollapsibleControls label="Binomial Parameters (n, p)">
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">n:</Label><Input type="number" step="1" min={3} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">p:</Label><Input type="number" step="0.05" min={0} max={1} value={p} onChange={(e) => setP(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CollapsibleControls>
        )}

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Random variable X:</strong> A function assigning a real number to each outcome in the sample space.</p>
            <p><strong className="text-foreground">Expectation:</strong> E[X] = Σ xᵢ · P(X=xᵢ) (discrete) or ∫ x·f(x)dx (continuous).</p>
            <p><strong className="text-foreground">Variance:</strong> Var(X) = E[(X−μ)²] = E[X²] − (E[X])²</p>
            <p><strong className="text-foreground">Properties:</strong> E[aX+b] = aE[X]+b,  Var(aX+b) = a²Var(X)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
