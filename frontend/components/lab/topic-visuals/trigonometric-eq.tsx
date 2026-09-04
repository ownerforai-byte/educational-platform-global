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
   Trigonometric Equations — NEB Trigonometry (Maths 11)
   Visualizes solving trig equations: sin θ = k, cos θ = k,
   general solutions, and checking solutions on the unit circle.
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

type EqType = "sin" | "cos" | "tan";

export function TrigEquationsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eqType, setEqType] = useState<EqType>("sin");
  const [k, setK] = useState(0.5);
  const [range, setRange] = useState(360);
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

      // Axes
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xef4444 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e })));
      push(mkSprite("θ", "#ef4444", new THREE.Vector3(10.2, 0, 0.05), 0.5));
      push(mkSprite("y", "#22c55e", new THREE.Vector3(0, 10.2, 0.05), 0.5));

      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 35) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const absK = Math.min(Math.abs(k), 1);
        const baseAngle = eqType === "sin" ? Math.asin(absK) : eqType === "cos" ? Math.acos(absK) : Math.atan(absK);
        const baseDeg = baseAngle * 180 / Math.PI;

        // Plot y = sin/cos/tan(θ) over [0, range]
        const curvePts: THREE.Vector3[] = [];
        const steps = 400;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * range * Math.PI / 180;
          let y: number;
          if (eqType === "sin") y = Math.sin(theta);
          else if (eqType === "cos") y = Math.cos(theta);
          else y = Math.tan(theta);

          if (isFinite(y) && Math.abs(y) < 10) {
            const x = theta * 3;
            curvePts.push(new THREE.Vector3(x, y * 2.5, 0.02));
          }
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        // Horizontal line y = k
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, k * 2.5, 0), new THREE.Vector3(10, k * 2.5, 0)]),
          new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
        ));
        push(mkSprite(`y = ${k.toFixed(2)}`, "#fb923c", new THREE.Vector3(9.5, k * 2.5, 0), 0.6));

        // Find and mark intersection points
        const solutions: { deg: number; rad: string }[] = [];
        const nPeriods = Math.floor(range / 360);
        const fullRange = nPeriods > 0 ? 360 : range;

        for (let p = 0; p <= nPeriods; p++) {
          const offset = p * 360;
          if (eqType === "sin") {
            if (absK <= 1) {
              solutions.push({ deg: offset + baseDeg, rad: `${baseDeg.toFixed(1)}°` });
              if (baseDeg > 0 && 180 - baseDeg > 0) solutions.push({ deg: offset + 180 - baseDeg, rad: `${(180 - baseDeg).toFixed(1)}°` });
            }
          } else if (eqType === "cos") {
            if (absK <= 1) {
              solutions.push({ deg: offset + baseDeg, rad: `${baseDeg.toFixed(1)}°` });
              solutions.push({ deg: offset + 360 - baseDeg, rad: `${(360 - baseDeg).toFixed(1)}°` });
            }
          } else {
            solutions.push({ deg: offset + baseDeg, rad: `${baseDeg.toFixed(1)}°` });
            solutions.push({ deg: offset + 180 + baseDeg, rad: `${(180 + baseDeg).toFixed(1)}°` });
          }
        }

        solutions.forEach((sol, idx) => {
          const x = sol.deg * Math.PI / 180 * 3;
          const y = eqType === "sin" ? Math.sin(sol.deg * Math.PI / 180) :
                    eqType === "cos" ? Math.cos(sol.deg * Math.PI / 180) :
                    Math.tan(sol.deg * Math.PI / 180);
          if (Math.abs(y - k) < 0.01 && Math.abs(y) < 8) {
            const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
            dot.position.set(x, y * 2.5, 0.05);
            push(mkSprite(`θ=${sol.deg.toFixed(0)}°`, "#f87171", dot.position.clone().add(new THREE.Vector3(0, 0.7, 0)), 0.65));
          }
        });

        // General solution
        const genSol = eqType === "sin" ? `θ = nπ + ${(baseDeg.toFixed(1))}° or θ = nπ + ${(180 - baseDeg).toFixed(1)}°` :
                       eqType === "cos" ? `θ = 2nπ ± ${(baseDeg.toFixed(1))}°` :
                       `θ = nπ + ${(baseDeg.toFixed(1))}°`;
        push(mkSprite("General: " + genSol, "#a78bfa", new THREE.Vector3(0, -8, 0), 0.7));
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
  }, [eqType, k, range, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Trigonometric Equations" description="Equation solver visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Trigonometric Equations</span>
          <span className="text-xs text-muted-foreground font-normal">Find solutions graphically</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Equation Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["sin", "cos", "tan"] as EqType[]).map((t) => (
              <button
                key={t}
                onClick={() => setEqType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  eqType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t === "sin" ? "sin θ = k" : t === "cos" ? "cos θ = k" : "tan θ = k"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-20"><Label className="text-xs text-muted-foreground">k:</Label><Input type="number" step="0.1" min={-1} max={1} value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-20"><Label className="text-xs text-muted-foreground">Range°:</Label><Input type="number" step="90" min={180} max={720} value={range} onChange={(e) => setRange(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">General Solutions</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">sin θ = k:</strong> θ = nπ + α or θ = nπ − α, where α = sin⁻¹k</p>
            <p><strong className="text-foreground">cos θ = k:</strong> θ = 2nπ ± α, where α = cos⁻¹k</p>
            <p><strong className="text-foreground">tan θ = k:</strong> θ = nπ + α, where α = tan⁻¹k</p>
            <p><strong className="text-foreground">n ∈ Z</strong> — integer, giving infinitely many solutions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
