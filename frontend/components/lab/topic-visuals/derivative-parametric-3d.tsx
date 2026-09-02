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
  ctx.font = "bold 26px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.8 * scale, 0.7 * scale, 1);
  return s;
}

type ParametricType = "circle" | "lissajous" | "spiral";

export function DerivativeParametric3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paramType, setParamType] = useState<ParametricType>("circle");
  const [t, setT] = useState(0);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

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

      const getPoint = (tt: number): [number, number] => {
        if (paramType === "circle") return [2 * Math.cos(tt), 2 * Math.sin(tt)];
        if (paramType === "lissajous") return [3 * Math.sin(3 * tt), 2 * Math.sin(2 * tt)];
        return [0.3 * tt * Math.cos(tt), 0.3 * tt * Math.sin(tt)];
      };

      const curvePts: THREE.Vector3[] = [];
      for (let tt = 0; tt <= Math.PI * 4; tt += 0.05) {
        const [x, y] = getPoint(tt);
        curvePts.push(new THREE.Vector3(x, y, 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));

      const point = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.6 })
      );
      push(point);

      const tangentLine = new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 2 })
      );
      push(tangentLine);

      const labels: Record<ParametricType, string> = {
        circle: "x=2cos(t), y=2sin(t)",
        lissajous: "x=3sin(3t), y=2sin(2t)",
        spiral: "x=rt*cos(t), y=rt*sin(t)",
      };
      push(mkSprite(labels[paramType], "#60a5fa", new THREE.Vector3(0, 4.2, 0)));
      push(mkSprite("dy/dx = (dy/dt)/(dx/dt)", "#a78bfa", new THREE.Vector3(0, -3.8, 0)));

      const updatePosition = (tt: number) => {
        const [x, y] = getPoint(tt);
        point.position.set(x, y, 0);
        let vx: number, vy: number;
        if (paramType === "circle") { vx = -2 * Math.sin(tt); vy = 2 * Math.cos(tt); }
        else if (paramType === "lissajous") { vx = 9 * Math.cos(3 * tt); vy = 4 * Math.cos(2 * tt); }
        else { vx = 0.3 * Math.cos(tt) * (1 + tt); vy = 0.3 * Math.sin(tt) * (1 + tt); }
        const scale = 0.8;
        tangentLine.geometry.setFromPoints([
          new THREE.Vector3(x - vx * scale, y - vy * scale, 0),
          new THREE.Vector3(x + vx * scale, y + vy * scale, 0),
        ]);
      };

      updatePosition(t);

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
  }, [paramType, t, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Parametric & Implicit" description="Parametric curve derivatives — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Parametric & Implicit — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Parametric curve derivatives</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Parametric Curve">
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              ["circle", "Circle"],
              ["lissajous", "Lissajous"],
              ["spiral", "Spiral"],
            ].map(([key, label]: [string, string]) => (
              <button key={key} onClick={() => setParamType(key as ParametricType)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${paramType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameter t">
          <div className="w-32 mt-1">
            <Label className="text-xs text-muted-foreground">t = {t.toFixed(2)}</Label>
            <Input type="range" min={0} max={Math.PI * 4} step={0.1} value={t} onChange={(e) => setT(Number(e.target.value))} className="mt-2 w-full" />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Parametric Derivatives</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">dy/dx = (dy/dt) / (dx/dt)</strong></p>
            <p><strong className="text-foreground">Tangent vector:</strong> (dx/dt, dy/dt) gives direction of motion</p>
            <p><strong className="text-foreground">Green line:</strong> Tangent direction at current parameter t</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}