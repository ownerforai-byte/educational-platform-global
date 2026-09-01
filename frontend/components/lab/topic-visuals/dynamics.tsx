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
   Dynamics — NEB Mechanics (Maths 11)
   Motion of a particle in a straight line: uniform acceleration,
   gravity, and inclined plane visualization.
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

type DynMode = "straight" | "gravity" | "inclined";

export function DynamicsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<DynMode>("straight");
  const [u, setU] = useState(0);
  const [a, setA] = useState(2);
  const [t, setT] = useState(5);
  const [angle, setAngle] = useState(30);
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

      const update = () => {
        while (meshes.length > 25) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        if (mode === "straight") {
          // x-t, v-t, a-t graphs
          const graphW = 6, graphH = 4;
          const ox = -7, oy = -5;
          const sx = graphW / 10, sy = graphH / 10;

          // Axes
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox + graphW, oy, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox, oy + graphH, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
          push(mkSprite("t", "#94a3b8", new THREE.Vector3(ox + graphW + 0.3, oy, 0), 0.5));
          push(mkSprite("x", "#94a3b8", new THREE.Vector3(ox, oy + graphH + 0.3, 0), 0.5));

          // x = ut + 0.5at²
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 100; i++) {
            const ti = (i / 100) * 10;
            const xi = u * ti + 0.5 * a * ti * ti;
            pts.push(new THREE.Vector3(ox + ti * sx, oy + xi * sy * 0.5, 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

          // Moving particle
          const tt = ((performance.now() / 1000) % t) ;
          const xx = u * tt + 0.5 * a * tt * tt;
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
          dot.position.set(ox + tt * sx, oy + xx * sy * 0.5, 0.05);

          // Readout
          const v = u + a * tt;
          push(mkSprite(`x = ${xx.toFixed(1)}m  v = ${v.toFixed(1)}m/s  at t=${tt.toFixed(1)}s`, "#fbbf24", new THREE.Vector3(0, 6, 0), 0.8));

          // Equations
          push(mkSprite("x = ut + ½at²    v = u + at    v² = u² + 2as", "#a78bfa", new THREE.Vector3(0, -6.5, 0), 0.7));
        } else if (mode === "gravity") {
          // Projectile / free fall
          const g = 9.8;
          const h0 = 10;
          const pts: THREE.Vector3[] = [];
          const groundY = -4;
          for (let i = 0; i <= 100; i++) {
            const ti = (i / 100) * Math.sqrt(2 * h0 / g) * 3;
            const yi = h0 - 0.5 * g * ti * ti;
            if (yi < groundY) break;
            pts.push(new THREE.Vector3(0, yi * 0.6 + groundY, 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 })));
          // Ground
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, groundY, 0), new THREE.Vector3(3, groundY, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 })));
          // Ball
          const tt = ((performance.now() / 800) % 3);
          const ballY = Math.max(h0 * 0.6 + groundY, groundY) - 0.5 * g * tt * tt * 0.6;
          const ball = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 })));
          ball.position.set(0, Math.max(ballY, groundY + 0.2), 0.05);
          // Height label
          push(mkSprite(`h = ${Math.max(0, h0 - 0.5 * g * tt * tt).toFixed(1)}m`, "#fbbf24", new THREE.Vector3(1.5, Math.max(ballY, groundY) + 0.8, 0), 0.7));
          push(mkSprite("Free fall: v = gt,  h = ½gt²", "#a78bfa", new THREE.Vector3(0, 6, 0), 0.8));
        } else if (mode === "inclined") {
          // Inclined plane
          const rad = angle * Math.PI / 180;
          const planeLen = 7;
          const planeTop = new THREE.Vector3(-planeLen * Math.cos(rad), planeLen * Math.sin(rad) - 3, 0);
          const planeBot = new THREE.Vector3(0, -3, 0);
          // Plane surface
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([planeBot, planeTop]), new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 3 })));
          // Horizontal base
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-planeLen, -3, 0), planeBot]), new THREE.LineBasicMaterial({ color: 0x475569 })));
          // Vertical height
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([planeTop, new THREE.Vector3(planeTop.x, -3, 0)]), new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.15, gapSize: 0.1 })));
          (meshes[meshes.length - 1] as any).computeLineDistances();
          // Angle arc
          const arcPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 20; i++) {
            const t = (i / 20) * rad;
            arcPts.push(new THREE.Vector3(planeBot.x - 1 * Math.cos(t), planeBot.y + 1 * Math.sin(t), 0.03));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
          // Block on plane
          const blockPos = new THREE.Vector3(planeBot.x - 3 * Math.cos(rad), planeBot.y + 3 * Math.sin(rad), 0);
          const block = push(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
          block.position.copy(blockPos);
          block.rotation.z = rad;
          // Force arrows
          const weight = new THREE.Vector3(0, -1.5, 0);
          push(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0).normalize(), blockPos, 1.2, 0xef4444, 0.15, 0.1));
          push(mkSprite("mg↓", "#f87171", blockPos.clone().add(new THREE.Vector3(0, -1.8, 0)), 0.65));
          const normalDir = new THREE.Vector3(-Math.sin(rad), Math.cos(rad), 0);
          push(new THREE.ArrowHelper(normalDir, blockPos, 1.0, 0x3b82f6, 0.15, 0.1));
          push(mkSprite("N⊥", "#60a5fa", blockPos.clone().add(normalDir.clone().multiplyScalar(1.3)), 0.65));
          // Readout
          push(mkSprite(`θ = ${angle}°   g sin θ = ${(9.8 * Math.sin(rad)).toFixed(1)} m/s²   g cos θ = ${(9.8 * Math.cos(rad)).toFixed(1)}`, "#fbbf24", new THREE.Vector3(-3, 6, 0), 0.75));
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [mode, u, a, t, angle, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Dynamics" description="Motion visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Dynamics — Motion of a Particle</span>
          <span className="text-xs text-muted-foreground font-normal">Straight line · Gravity · Inclined plane</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Motion Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["straight", "gravity", "inclined"] as DynMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "straight" ? "Straight Line" : m === "gravity" ? "Free Fall" : "Inclined Plane"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        {mode === "straight" && (
          <CollapsibleControls label="Initial Conditions">
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">u (m/s):</Label><Input type="number" step="0.5" value={u} onChange={(e) => setU(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">a (m/s²):</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CollapsibleControls>
        )}

        {mode === "inclined" && (
          <CollapsibleControls label="Incline Angle">
            <input type="range" min={5} max={60} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full mt-1" />
            <p className="text-xs font-mono text-primary mt-1">{angle}°</p>
          </CollapsibleControls>
        )}

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Equations of Motion</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">v = u + at</strong></p>
            <p><strong className="text-foreground">s = ut + ½at²</strong></p>
            <p><strong className="text-foreground">v² = u² + 2as</strong></p>
            <p><strong className="text-foreground">Inclined plane:</strong> a = g sin θ (smooth), a = g(sin θ − μ cos θ) (rough)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
