"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

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
  s.scale.set(3.5 * scale, 0.65 * scale, 1);
  return s;
}

export function DerivativeGeometric3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [funcName, setFuncName] = useState<"quadratic" | "cubic" | "trig">("quadratic");
  const [px, setPx] = useState(1.5);
  const [isWebGL] = useState(() => isWebGLAvailable());


  const f = (x: number) => {
    switch (funcName) {
      case "quadratic": return 0.2 * x * x - 1;
      case "cubic": return 0.08 * x * x * x - 0.4 * x;
      case "trig": return Math.sin(x) * 2;
    }
  };

  const df = (x: number) => {
    switch (funcName) {
      case "quadratic": return 0.4 * x;
      case "cubic": return 0.24 * x * x - 0.4;
      case "trig": return Math.cos(x) * 2;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
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
      controls.minDistance = 5;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      const curvePts: THREE.Vector3[] = [];
      for (let x = -7; x <= 7; x += 0.1) {
        curvePts.push(new THREE.Vector3(x, f(x), 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));

      const tangentLine = new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 })
      );
      push(tangentLine);

      const tangentDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.6 })
      );
      push(tangentDot);

      const slopeTriangle = new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
      );
      push(slopeTriangle);

      const slopeLabel = mkSprite("", "#34d399", new THREE.Vector3(0, 0, 0));
      push(slopeLabel);

      const funcLabel = mkSprite(
        funcName === "quadratic" ? "f(x)=0.2x^2-1" : funcName === "cubic" ? "f(x)=0.08x^3-0.4x" : "f(x)=2sin(x)",
        "#60a5fa", new THREE.Vector3(-5, 3.5, 0)
      );
      push(funcLabel);

      const updateVisualization = () => {
        const fx = f(px);
        const slope = df(px);
        tangentLine.geometry.setFromPoints([
          new THREE.Vector3(px - 4, fx - slope * 4, 0),
          new THREE.Vector3(px + 4, fx + slope * 4, 0),
        ]);
        tangentDot.position.set(px, fx, 0);
        slopeTriangle.geometry.setFromPoints([
          new THREE.Vector3(px, fx, 0),
          new THREE.Vector3(px + 1, fx, 0),
          new THREE.Vector3(px + 1, fx + slope, 0),
        ]);
        slopeLabel.position.set(px + 1.5, fx + slope * 0.5, 0);
      };

      updateVisualization();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animTime += 0.01;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    const cleanup = async () => {
      await init();
      return () => {
        cancelAnimationFrame(frameId);
        const parent = renderer.domElement.parentNode;
        if (parent) parent.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanupPromise = cleanup();
    return () => { cleanupPromise.then((d) => d?.()); };
  }, [funcName, px, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Geometric Interpretation" description="Tangent line slope visualization — requires WebGL." />;
  }

  const funcOptions: [string, string][] = [
    ["quadratic", "f(x) = 0.2x^2 - 1"],
    ["cubic", "f(x) = 0.08x^3 - 0.4x"],
    ["trig", "f(x) = 2sin(x)"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Geometric Interpretation — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Derivative as slope of tangent line</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Function">
          <div className="flex flex-wrap gap-2 mt-2">
            {funcOptions.map(([key, label]) => (
              <button key={key} onClick={() => setFuncName(key as typeof funcName)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${funcName === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Point P (x-coordinate)">
          <div className="w-32 mt-1">
            <Label className="text-xs text-muted-foreground">x = {px.toFixed(2)}</Label>
            <Input type="range" min={-5} max={5} step={0.1} value={px} onChange={(e) => setPx(Number(e.target.value))} className="mt-2 w-full" />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Geometric Meaning</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Orange line:</strong> Tangent line at P — slope = f(px).</p>
            <p><strong className="text-foreground">Green triangle:</strong> Rise/run — slope = dy/dx over unit interval.</p>
            <p><strong className="text-foreground">Derivative:</strong> The instantaneous rate of change at any point.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}