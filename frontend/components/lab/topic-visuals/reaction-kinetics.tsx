"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Reaction Kinetics — Concentration vs Time Graph
   NEB Chemistry 12 — Chemical Kinetics
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

type OrderMode = "zero" | "first" | "second";

export function ReactionKineticsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<OrderMode>("first");
  const [k, setK] = useState(0.5);
  const [A0, setA0] = useState(1.0);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

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
      camera.position.set(0, 0, 11);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const drawAxes = (ox: number, oy: number, sx: number, sy: number, xLabel: string, yLabel: string) => {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox + sx * 10, oy, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox, oy + sy * 8, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(mkSprite(xLabel, "#94a3b8", new THREE.Vector3(ox + sx * 10.5, oy - 0.3, 0), 0.6));
        push(mkSprite(yLabel, "#94a3b8", new THREE.Vector3(ox - 0.5, oy + sy * 8.5, 0), 0.6));
      };

      const updateScene = () => {
        while (meshes.length > 10) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const ox = -6, oy = -3.5;
        const sx = 1.0, sy = 0.7;
        drawAxes(ox, oy, sx, sy, "Time (t)", "[A] (conc.)");

        let curvePts: THREE.Vector3[] = [];
        let rateLabel = "";
        let integratedLabel = "";

        if (order === "zero") {
          // [A] = [A]₀ - kt
          curvePts = [];
          for (let t = 0; t <= 10; t += 0.1) {
            const A = Math.max(0, A0 - k * t);
            curvePts.push(new THREE.Vector3(ox + t * sx, oy + A * sy * 2, 0));
          }
          rateLabel = "Rate = k  (zero order)";
          integratedLabel = "[A] = [A]₀ - kt";
        } else if (order === "first") {
          // [A] = [A]₀ e^(-kt)
          curvePts = [];
          for (let t = 0; t <= 10; t += 0.1) {
            const A = A0 * Math.exp(-k * t);
            curvePts.push(new THREE.Vector3(ox + t * sx, oy + A * sy * 2, 0));
          }
          rateLabel = "Rate = k[A]  (first order)";
          integratedLabel = "ln[A] = ln[A]₀ - kt";
        } else {
          // 1/[A] = 1/[A]₀ + kt  →  [A] = 1/(1/[A]₀ + kt)
          curvePts = [];
          for (let t = 0; t <= 10; t += 0.1) {
            const A = 1 / (1/A0 + k * t);
            curvePts.push(new THREE.Vector3(ox + t * sx, oy + A * sy * 2, 0));
          }
          rateLabel = "Rate = k[A]²  (second order)";
          integratedLabel = "1/[A] = 1/[A]₀ + kt";
        }

        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        // Current point indicator
        const tNow = 3;
        const ANow = order === "zero" ? Math.max(0, A0 - k * tNow) : order === "first" ? A0 * Math.exp(-k * tNow) : 1 / (1/A0 + k * tNow);
        push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), new THREE.MeshBasicMaterial({ color: 0xef4444 }))).position.set(ox + tNow * sx, oy + ANow * sy * 2, 0);

        // Rate law label with long arrow
        const rateLabelPos = new THREE.Vector3(ox + 5 * sx, oy + 4.5, 0);
        const rateTarget = new THREE.Vector3(ox + 3 * sx, oy + 3.0, 0);
        const rDir = rateTarget.clone().sub(rateLabelPos).normalize();
        const rLen = rateLabelPos.distanceTo(rateTarget);
        push(new THREE.ArrowHelper(rDir, rateLabelPos, rLen * 0.75, 0xfbbf24, 0.25, 0.12));
        push(mkSprite(rateLabel, "#fbbf24", rateLabelPos.clone().sub(rDir.multiplyScalar(0.5)), 0.7));

        // Integrated rate law
        const intLabelPos = new THREE.Vector3(ox + 5 * sx, oy + 3.8, 0);
        const intTarget = new THREE.Vector3(ox + 2 * sx, oy + 2.5, 0);
        const iDir = intTarget.clone().sub(intLabelPos).normalize();
        const iLen = intLabelPos.distanceTo(intTarget);
        push(new THREE.ArrowHelper(iDir, intLabelPos, iLen * 0.7, 0xa855f7, 0.25, 0.12));
        push(mkSprite(integratedLabel, "#a855f7", intLabelPos.clone().sub(iDir.multiplyScalar(0.5)), 0.65));

        // Half-life
        const tHalf = order === "zero" ? A0 / (2 * k) : order === "first" ? Math.log(2) / k : 1 / (k * A0);
        push(mkSprite(`t½ = ${tHalf.toFixed(2)}  ${order === "first" ? "(independent of [A]₀)" : order === "zero" ? "(∝ [A]₀)" : "(∝ 1/[A]₀)"}`, "#22c55e", new THREE.Vector3(ox + 5 * sx, oy - 2.5, 0), 0.6));
      };

      updateScene();

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
  }, [order, k, A0, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Reaction Kinetics" description="Concentration vs time graph — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Reaction Kinetics — Concentration vs Time</span>
          <span className="text-xs text-muted-foreground font-normal">Observe how order affects rate profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Reaction Order">
          <div className="flex flex-wrap gap-2 mt-1">
            {(["zero", "first", "second"] as const).map((o) => (
              <button
                key={o}
                onClick={() => setOrder(o)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  order === o ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {o === "zero" ? "Zero Order" : o === "first" ? "First Order" : "Second Order"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <label className="text-xs text-muted-foreground">k (rate const.):</label>
              <input type="number" step="0.1" value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1 w-16" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">[A]₀ (initial):</label>
              <input type="number" step="0.1" value={A0} onChange={(e) => setA0(Number(e.target.value))} className="mt-1 w-16" />
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Rate Laws</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Zero order:</strong> Rate = k  |  [A] = [A]₀ − kt  |  t½ = [A]₀/(2k)</p>
            <p><strong className="text-foreground">First order:</strong> Rate = k[A]  |  ln[A] = ln[A]₀ − kt  |  t½ = ln2/k (constant!)</p>
            <p><strong className="text-foreground">Second order:</strong> Rate = k[A]²  |  1/[A] = 1/[A]₀ + kt  |  t½ = 1/(k[A]₀)</p>
            <p><strong className="text-foreground">Arrhenius equation:</strong> k = Ae^(−Ea/RT) — rate constant increases with temperature.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
