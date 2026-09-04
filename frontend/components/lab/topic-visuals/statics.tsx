"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Statics — NEB Mechanics (Maths 11)
   Parallelogram law of forces, resolution of forces,
   and resultant of coplanar forces acting on a point.
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

export function StaticsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [f1, setF1] = useState({ mag: 5, angle: 30 });
  const [f2, setF2] = useState({ mag: 4, angle: 120 });
  const [isWebGL] = useState(() => isWebGLAvailable());


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

      const drawArrow = (from: THREE.Vector3, to: THREE.Vector3, color: number, label: string) => {
        const dir = to.clone().sub(from).normalize();
        const len = to.distanceTo(from);
        push(new LiveArrow(dir, from, len, color, 0.2, 0.12));
        const mid = from.clone().add(to).multiplyScalar(0.5);
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, mid.clone().add(dir.clone().multiplyScalar(len * 0.5)).add(new THREE.Vector3(0, 0.5, 0)), 0.75));
      };

      const update = () => {
        while (meshes.length > 20) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        const rad1 = f1.angle * Math.PI / 180;
        const rad2 = f2.angle * Math.PI / 180;
        const origin = new THREE.Vector3(0, 0, 0);

        // Force vectors from origin
        const f1End = new THREE.Vector3(f1.mag * Math.cos(rad1), f1.mag * Math.sin(rad1), 0);
        const f2End = new THREE.Vector3(f2.mag * Math.cos(rad2), f2.mag * Math.sin(rad2), 0);

        drawArrow(origin, f1End, 0xef4444, `F₁=${f1.mag}`);
        drawArrow(origin, f2End, 0x3b82f6, `F₂=${f2.mag}`);

        // Parallelogram: complete with parallel sides
        const paraEnd = f1End.clone().add(f2End);
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([f1End, paraEnd]), new THREE.LineDashedMaterial({ color: 0x3b82f6, dashSize: 0.15, gapSize: 0.1 })));
        (meshes[meshes.length - 1] as any).computeLineDistances();
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([f2End, paraEnd]), new THREE.LineDashedMaterial({ color: 0xef4444, dashSize: 0.15, gapSize: 0.1 })));
        (meshes[meshes.length - 1] as any).computeLineDistances();

        // Resultant
        const rMag = paraEnd.length();
        const rAngle = Math.atan2(paraEnd.y, paraEnd.x) * 180 / Math.PI;
        drawArrow(origin, paraEnd, 0x22d3ee, `R=${rMag.toFixed(1)}`);

        // Angle labels
        push(mkSprite(`θ₁=${f1.angle}°  θ₂=${f2.angle}°`, "#a78bfa", new THREE.Vector3(-5.5, 5.5, 0), 0.8));
        push(mkSprite(`R = √(F₁²+F₂²+2F₁F₂cosθ)  θ = ${rAngle.toFixed(1)}°`, "#fbbf24", new THREE.Vector3(0, -5.5, 0), 0.8));
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [f1, f2, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Statics" description="Force parallelogram visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Statics — Parallelogram Law of Forces</span>
          <span className="text-xs text-muted-foreground font-normal">Resultant of coplanar forces</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Force F₁">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">Magnitude:</Label><Input type="number" step="0.5" value={f1.mag} onChange={(e) => setF1({ ...f1, mag: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">Angle°:</Label><Input type="number" step="5" value={f1.angle} onChange={(e) => setF1({ ...f1, angle: Number(e.target.value) })} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Force F₂">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">Magnitude:</Label><Input type="number" step="0.5" value={f2.mag} onChange={(e) => setF2({ ...f2, mag: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">Angle°:</Label><Input type="number" step="5" value={f2.angle} onChange={(e) => setF2({ ...f2, angle: Number(e.target.value) })} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Parallelogram Law:</strong> If two forces act at a point, their resultant is represented by the diagonal of the parallelogram.</p>
            <p><strong className="text-foreground">Resultant magnitude:</strong> R = √(F₁² + F₂² + 2F₁F₂cosθ), where θ is the angle between forces.</p>
            <p><strong className="text-foreground">Direction:</strong> α = tan⁻¹(F₂sinθ / (F₁ + F₂cosθ))</p>
            <p><strong className="text-foreground">Resolution:</strong> Any force F at angle θ can be resolved into Fcosθ (horizontal) and Fsinθ (vertical).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
