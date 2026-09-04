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
   Growth & Decay — NEB DE Applications (Maths 12)
   Population dynamics: exponential growth/decay, half-life,
   and logistic growth visualization.
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

type GrowthType = "growth" | "decay" | "logistic";

export function GrowthDecayDEVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<GrowthType>("growth");
  const [k, setK] = useState(0.5);
  const [n0, setN0] = useState(100);
  const [carrying, setCarrying] = useState(500);
  const [isWebGL] = useState(() => isWebGLAvailable());


  const getN = (t: number) => {
    if (type === "growth") return n0 * Math.exp(k * t);
    if (type === "decay") return n0 * Math.exp(-k * t);
    // Logistic: N(t) = K / (1 + ((K - N0)/N0) * e^(-kt))
    return carrying / (1 + ((carrying - n0) / n0) * Math.exp(-k * t));
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

      const maxT = 10;
      const maxN = type === "logistic" ? carrying * 1.2 : n0 * Math.exp(k * maxT) * 1.2;

      const update = () => {
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const scaleN = 8 / Math.max(maxN, 1);
        const scaleT = 8 / maxT;

        // Curve
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 200; i++) {
          const t = (i / 200) * maxT;
          const n = getN(t);
          pts.push(new THREE.Vector3(t * scaleT - 8, n * scaleN - 8, 0.02));
        }
        const curveColor = type === "growth" ? 0x22c55e : type === "decay" ? 0xef4444 : 0x3b82f6;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: curveColor, linewidth: 3 })));

        // Carrying capacity line for logistic
        if (type === "logistic") {
          const capY = carrying * scaleN - 8;
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, capY, 0), new THREE.Vector3(8, capY, 0)]),
            new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.2, gapSize: 0.1 }),
          ));
          (meshes[meshes.length - 1] as any).computeLineDistances();
          push(mkSprite("K (carrying capacity)", "#fbbf24", new THREE.Vector3(6, capY + 0.5, 0), 0.7));
        }

        // Half-life / doubling time
        if (type === "decay") {
          const halfLife = Math.log(2) / k;
          const midPt = new THREE.Vector3(halfLife * scaleT - 8, (n0 / 2) * scaleN - 8, 0.05);
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 })));
          dot.position.copy(midPt);
          push(mkSprite(`t½ = ln2/k = ${halfLife.toFixed(2)}`, "#fb923c", midPt.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.75));
        } else if (type === "growth") {
          const dblTime = Math.log(2) / k;
          const midPt = new THREE.Vector3(dblTime * scaleT - 8, (n0 * 2) * scaleN - 8, 0.05);
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0x22d3ee })));
          dot.position.copy(midPt);
          push(mkSprite(`Tdbl = ln2/k = ${dblTime.toFixed(2)}`, "#60a5fa", midPt.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.75));
        }

        // Equation label
        const eqLabel = type === "growth" ? "dN/dt = kN  →  N = N₀eᵏᵗ" : type === "decay" ? "dN/dt = −kN  →  N = N₀e⁻ᵏᵗ" : "dN/dt = kN(1−N/K)  →  logistic";
        push(mkSprite(eqLabel, "#a78bfa", new THREE.Vector3(0, 9, 0), 0.85));
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
  }, [type, k, n0, carrying, isWebGL, getN]);

  if (!isWebGL) {
    return <WebGLFallback title="Growth & Decay" description="Population dynamics — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Growth &amp; Decay — DE Applications</span>
          <span className="text-xs text-muted-foreground font-normal">Exponential &amp; logistic models</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Model Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["growth", "decay", "logistic"] as GrowthType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  type === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t === "growth" ? "Exponential Growth" : t === "decay" ? "Exponential Decay" : "Logistic"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">k:</Label><Input type="number" step="0.1" value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">N₀:</Label><Input type="number" step="10" value={n0} onChange={(e) => setN0(Number(e.target.value))} className="mt-1" /></div>
            {type === "logistic" && (
              <div className="w-16"><Label className="text-xs text-muted-foreground">K:</Label><Input type="number" step="50" value={carrying} onChange={(e) => setCarrying(Number(e.target.value))} className="mt-1" /></div>
            )}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Models</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Growth:</strong> dN/dt = kN  →  N(t) = N₀eᵏᵗ  (population, bacteria)</p>
            <p><strong className="text-foreground">Decay:</strong> dN/dt = −kN  →  N(t) = N₀e⁻ᵏᵗ  (radioactive, drug elimination)</p>
            <p><strong className="text-foreground">Logistic:</strong> dN/dt = kN(1 − N/K)  →  S-curve with carrying capacity K</p>
            <p><strong className="text-foreground">Half-life:</strong> t½ = ln(2)/k  for decay processes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
