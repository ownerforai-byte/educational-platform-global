"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Gas Laws — PV Diagrams (Boyle's, Charles', Ideal Gas)
   NEB Chemistry 11 — States of Matter
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
  s.scale.set(3.4 * scale, 0.64 * scale, 1);
  return s;
}

type GasLawMode = "boyle" | "charles" | "combined";

export function GasLawsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<GasLawMode>("boyle");
  const [nMoles, setNMoles] = useState(1);
  const [temperature, setTemperature] = useState(300);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [time, setTime] = useState(0);


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
      camera.position.set(0, 0, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const R = 8.314; // J/(mol·K)

      const drawAxes = (origin: THREE.Vector2, scaleX: number, scaleY: number, xLabel: string, yLabel: string) => {
        // X axis
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(origin.x, origin.y, 0),
            new THREE.Vector3(origin.x + scaleX * 10, origin.y, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0x475569 }),
        ));
        // Y axis
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(origin.x, origin.y, 0),
            new THREE.Vector3(origin.x, origin.y + scaleY * 10, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0x475569 }),
        ));
        // Arrows
        const arrX = push(new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 8), new THREE.MeshBasicMaterial({ color: 0x475569 })));
        arrX.position.set(origin.x + scaleX * 10, origin.y, 0);
        const arrY = push(new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 8), new THREE.MeshBasicMaterial({ color: 0x475569 })));
        arrY.position.set(origin.x, origin.y + scaleY * 10, 0);

        push(mkSprite(xLabel, "#94a3b8", new THREE.Vector3(origin.x + scaleX * 10.5, origin.y - 0.3, 0), 0.6));
        push(mkSprite(yLabel, "#94a3b8", new THREE.Vector3(origin.x - 0.5, origin.y + scaleY * 10.5, 0), 0.6));
      };

      const updateScene = (t: number) => {
        while (meshes.length > 10) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const ox = -6, oy = -3.5;
        const sx = 1.1, sy = 0.7;
        drawAxes(new THREE.Vector2(ox, oy), sx, sy, "V (L)", "P (atm)");

        if (mode === "boyle") {
          // P × V = constant (T constant)
          const constant = nMoles * R * temperature / 101.325; // convert to atm·L
          const points: THREE.Vector3[] = [];
          for (let v = 0.5; v <= 10; v += 0.1) {
            const p = constant / v;
            if (p <= 10) points.push(new THREE.Vector3(ox + v * sx, oy + p * sy, 0));
          }
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
          ));

          // Isotherm labels
          const labelPos = new THREE.Vector3(ox + 5 * sx, oy + (constant / 5) * sy + 0.5, 0);
          const targetPos = new THREE.Vector3(ox + 5 * sx, oy + (constant / 5) * sy, 0);
          const dir = targetPos.clone().sub(labelPos).normalize();
          const arrowLen = labelPos.distanceTo(targetPos);
          push(new THREE.ArrowHelper(dir, labelPos, arrowLen * 0.8, 0xf97316, 0.25, 0.12));
          push(mkSprite(` Boyle's Law: P ∝ 1/V  (T constant)`, "#f97316", labelPos.clone().sub(dir.multiplyScalar(0.5)), 0.7));

          // Multiple isotherms
          [temperature * 0.7, temperature, temperature * 1.3].forEach((T, i) => {
            const c = nMoles * R * T / 101.325;
            if (i !== 1) {
              const pts: THREE.Vector3[] = [];
              for (let v = 0.5; v <= 10; v += 0.2) {
                const p = c / v;
                if (p <= 8) pts.push(new THREE.Vector3(ox + v * sx, oy + p * sy - i * 0.4, 0));
              }
              push(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.15, gapSize: 0.1 }),
              ) as any);
              ((meshes[meshes.length - 1] as any) as THREE.Line).computeLineDistances();
            }
          });
        }
        else if (mode === "charles") {
          // V ∝ T (P constant)
          const pts: THREE.Vector3[] = [];
          for (let T = 100; T <= 600; T += 5) {
            const V = nMoles * R * T / 101.325;
            pts.push(new THREE.Vector3(ox + V * sx * 0.3, oy + T * sy * 0.4, 0));
          }
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 }),
          ));

          const labelPos = new THREE.Vector3(ox + 4, oy + 3, 0);
          const targetPos = new THREE.Vector3(ox + 3, oy + 2.5, 0);
          const dir = targetPos.clone().sub(labelPos).normalize();
          const arrowLen = labelPos.distanceTo(targetPos);
          push(new THREE.ArrowHelper(dir, labelPos, arrowLen * 0.8, 0x22c55e, 0.25, 0.12));
          push(mkSprite(` Charles's Law: V ∝ T  (P constant)`, "#22c55e", labelPos.clone().sub(dir.multiplyScalar(0.5)), 0.7));
        }
        else if (mode === "combined") {
          // PV = nRT surface — show 3D
          const gridSize = 10;
          const steps = 20;
          for (let i = 0; i < steps; i++) {
            const T = 200 + (i / steps) * 400;
            const pts: THREE.Vector3[] = [];
            for (let v = 1; v <= gridSize; v += 0.5) {
              const P = nMoles * R * T / (101.325 * v);
              pts.push(new THREE.Vector3(ox + v * sx, oy + P * sy * 0.5, 0));
            }
            const alpha = 0.3 + (i / steps) * 0.5;
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(pts),
              new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: alpha }),
            ));
          }

          // Annotated point
          const T0 = temperature;
          const V0 = nMoles * R * T0 / 101.325;
          const P0 = 101.325 * V0 / (nMoles * R * T0);
          const ptPos = new THREE.Vector3(ox + V0 * sx * 0.3, oy + T0 * sy * 0.4, 0);
          push(new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0xef4444 }),
          )).position.copy(ptPos);

          const labelPos = new THREE.Vector3(ox + 5, oy + 4, 0);
          const targetPos = ptPos.clone();
          const dir = targetPos.clone().sub(labelPos).normalize();
          const arrowLen = labelPos.distanceTo(targetPos);
          push(new THREE.ArrowHelper(dir, labelPos, arrowLen * 0.8, 0xef4444, 0.25, 0.12));
          push(mkSprite(` Combined: PV = nRT`, "#ef4444", labelPos.clone().sub(dir.multiplyScalar(0.5)), 0.75));
        }

        // State variables display
        push(mkSprite(
          `n=${nMoles} mol  T=${temperature}K  R=8.314 J/mol·K`,
          "#7dd3fc",
          new THREE.Vector3(0, 4.2, 0),
          0.65,
        ));
      };

      updateScene(time);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        setTime((prev) => prev + 0.016);
        updateScene(Date.now() * 0.001);
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
  }, [mode, nMoles, temperature, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Gas Laws" description="PV diagram animations — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Gas Laws — PV Diagrams</span>
          <span className="text-xs text-muted-foreground font-normal">Interactive P-V relationships</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Gas Law">
          <Tabs value={mode} onValueChange={(v) => setMode(v as GasLawMode)} className="mt-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="boyle" className="text-xs">Boyle's Law</TabsTrigger>
              <TabsTrigger value="charles" className="text-xs">Charles's Law</TabsTrigger>
              <TabsTrigger value="combined" className="text-xs">Combined (PV=nRT)</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="State Variables">
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <label className="text-xs text-muted-foreground">n (mol):</label>
              <input type="number" step="0.1" value={nMoles} onChange={(e) => setNMoles(Number(e.target.value))} className="mt-1 w-16" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">T (K):</label>
              <input type="number" step="10" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="mt-1 w-16" />
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Equations</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Boyle's Law:</strong> P₁V₁ = P₂V₂  (constant T, n)</p>
            <p><strong className="text-foreground">Charles's Law:</strong> V₁/T₁ = V₂/T₂  (constant P, n)</p>
            <p><strong className="text-foreground">Ideal Gas Law:</strong> PV = nRT, where R = 8.314 J/(mol·K)</p>
            <p><strong className="text-foreground">Combined:</strong> P₁V₁/T₁ = P₂V₂/T₂  (constant n)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
