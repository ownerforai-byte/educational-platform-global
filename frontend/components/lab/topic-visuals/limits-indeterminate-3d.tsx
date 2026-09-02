"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type IndeterminateType = "zero_zero" | "inf_inf" | "lhopital";

export function LimitsIndeterminate3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formType, setFormType] = useState<IndeterminateType>("zero_zero");
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

      if (formType === "zero_zero") {
        push(mkSprite("0/0 Form: lim(x->0) sin(x)/x", "#f59e0b", new THREE.Vector3(0, 4.5, 0)));
        const sinPts: THREE.Vector3[] = [];
        const linePts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.1) {
          sinPts.push(new THREE.Vector3(x, Math.sin(x), 0));
          linePts.push(new THREE.Vector3(x, x * 0.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sinPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        const ratioPts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.05) {
          if (Math.abs(x) < 0.1) continue;
          ratioPts.push(new THREE.Vector3(x, Math.sin(x) / x, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ratioPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        push(mkSprite("sin(x)/x -> 1", "#f59e0b", new THREE.Vector3(0, 1.2, 0)));
        push(mkSprite("Both -> 0, ratio -> 1", "#34d399", new THREE.Vector3(0, -2.5, 0)));
      } else if (formType === "inf_inf") {
        push(mkSprite("inf/inf Form", "#ec4899", new THREE.Vector3(0, 4.5, 0)));
        const xPts: THREE.Vector3[] = [];
        const sinPts: THREE.Vector3[] = [];
        for (let x = 0.5; x <= 8; x += 0.1) {
          xPts.push(new THREE.Vector3(x, x * 0.4, 0));
          sinPts.push(new THREE.Vector3(x, Math.sin(x) * 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(xPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sinPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(mkSprite("x -> inf", "#60a5fa", new THREE.Vector3(6, 2.5, 0)));
        push(mkSprite("sin(x) oscillates", "#34d399", new THREE.Vector3(6, -1, 0)));
        push(mkSprite("needs L Hopital!", "#ec4899", new THREE.Vector3(0, -3.5, 0)));
      } else {
        push(mkSprite("L Hopital Rule", "#a78bfa", new THREE.Vector3(0, 4.5, 0)));
        const fPts: THREE.Vector3[] = [];
        const gPts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.05) {
          fPts.push(new THREE.Vector3(x, Math.sin(x) * Math.exp(-x * x / 8), 0));
          gPts.push(new THREE.Vector3(x, x * 0.3 * Math.exp(-x * x / 8), 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(gPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        const ratioPts: THREE.Vector3[] = [];
        for (let x = -3; x <= 3; x += 0.02) {
          if (Math.abs(x) < 0.05) continue;
          const f = Math.sin(x) * Math.exp(-x * x / 8);
          const g = x * 0.3 * Math.exp(-x * x / 8);
          ratioPts.push(new THREE.Vector3(x, f / g, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ratioPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        push(mkSprite("ratio -> 3.33", "#f59e0b", new THREE.Vector3(2, 3.2, 0)));
        push(mkSprite("= f/g -> 3.33", "#a78bfa", new THREE.Vector3(2, -2, 0)));
      }

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
  }, [formType, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Indeterminate Forms" description="Visualize 0/0 and inf/inf forms — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Indeterminate Forms — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Explore 0/0 and inf/inf scenarios</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Form Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["zero_zero", "inf_inf", "lhopital"] as IndeterminateType[]).map((t) => (
              <button key={t} onClick={() => setFormType(t)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${formType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {t === "zero_zero" ? "0/0 Form" : t === "inf_inf" ? "inf/inf Form" : "L Hopital"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">Indeterminate Forms</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">0/0 form:</strong> Both numerator and denominator approach zero.</p>
            <p><strong className="text-foreground">inf/inf form:</strong> Both grow without bound.</p>
            <p><strong className="text-foreground">L Hopital:</strong> If lim f/g is indeterminate, lim f/g = lim f/g.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}