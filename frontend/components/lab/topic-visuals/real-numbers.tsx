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
   Real Numbers — NEB Algebra (Maths 11)
   Number line visualization showing intervals, absolute value,
   ordering, and rational vs irrational representation.
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
  ctx.font = "bold 32px monospace";
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

type IntervalMode = "numberline" | "absolute" | "intervals";

export function RealNumbersVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<IntervalMode>("numberline");
  const [val, setVal] = useState(3);
  const [a, setA] = useState(1);
  const [b, setB] = useState(5);
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

      // Horizontal number line
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, 0, 0), new THREE.Vector3(8, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 2 }),
      ));
      push(mkSprite("x", "#94a3b8", new THREE.Vector3(8.3, 0.4, 0), 0.5));

      // Tick marks and numbers
      for (let i = -8; i <= 8; i++) {
        const tick = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -0.2, 0), new THREE.Vector3(i, 0.2, 0)]),
          new THREE.LineBasicMaterial({ color: 0x64748b }),
        ));
        if (i !== 0) {
          push(mkSprite(`${i}`, "#64748b", new THREE.Vector3(i, -0.6, 0), 0.5));
        }
      }
      // Origin
      push(mkSprite("0", "#fbbf24", new THREE.Vector3(0, -0.6, 0), 0.6));

      const update = () => {
        while (meshes.length > 20) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        if (mode === "numberline") {
          // Highlight interval [a, b]
          const intervalStart = Math.max(a, -8);
          const intervalEnd = Math.min(b, 8);
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(intervalStart, 0.3, 0),
              new THREE.Vector3(intervalEnd, 0.3, 0),
            ]),
            new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 4 }),
          ));
          // Endpoints
          const mkDot = (x: number, color: number, label: string) => {
            const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color })));
            dot.position.set(x, 0, 0);
            push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(x, 1.0, 0), 0.7));
          };
          mkDot(intervalStart, 0x22d3ee, `[${intervalStart.toFixed(1)}]`);
          mkDot(intervalEnd, 0xa78bfa, `(${intervalEnd.toFixed(1)})`);
          push(mkSprite(`Interval: [${a.toFixed(1)}, ${b.toFixed(1)}]`, "#fbbf24", new THREE.Vector3(0, 2.5, 0), 0.85));
          push(mkSprite(`Length = ${Math.abs(b - a).toFixed(1)} units`, "#fb923c", new THREE.Vector3(0, 3.3, 0), 0.8));
        } else if (mode === "absolute") {
          // |x - val| visualization
          const absVal = Math.abs(val);
          // Draw point at val
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
          dot.position.set(val, 0, 0);
          push(mkSprite(`x = ${val.toFixed(1)}`, "#f87171", new THREE.Vector3(val, 1.0, 0), 0.8));
          // Draw distance to origin
          const dist = new THREE.Mesh(
            new THREE.BoxGeometry(Math.abs(val) * 2, 0.08, 0.08),
            new THREE.MeshBasicMaterial({ color: 0x22c55e }),
          );
          dist.position.set(val / 2, 0.5, 0);
          push(dist);
          push(mkSprite(`|${val.toFixed(1)}| = ${absVal.toFixed(1)}`, "#4ade80", new THREE.Vector3(val / 2, 1.5, 0), 0.9));
          // Show inequality region
          push(mkSprite(`|x| ≥ ${absVal.toFixed(1)}  →  x ≤ −${absVal.toFixed(1)} or x ≥ ${absVal.toFixed(1)}`, "#a78bfa", new THREE.Vector3(0, 2.8, 0), 0.8));
        } else if (mode === "intervals") {
          // Show rational and irrational point placement
          const rationalPts = [-4, -2, 0, 1, 2, 3, 5];
          const irrationalPts = [-Math.PI, -Math.sqrt(2), Math.sqrt(3), Math.E, Math.PI];
          rationalPts.forEach((r) => {
            const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
            dot.position.set(r, 0, 0);
          });
          irrationalPts.forEach((irr) => {
            if (irr >= -8 && irr <= 8) {
              const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x3b82f6 })));
              dot.position.set(irr, 0, 0);
            }
          });
          push(mkSprite("Red = Rational  Blue = Irrational", "#fbbf24", new THREE.Vector3(0, 2.5, 0), 0.8));
          push(mkSprite("Every real number has a unique point on the number line", "#7dd3fc", new THREE.Vector3(0, 3.5, 0), 0.75));
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
  }, [mode, val, a, b, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Real Numbers" description="Number line visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Real Numbers — Number Line &amp; Intervals</span>
          <span className="text-xs text-muted-foreground font-normal">Interactive number line</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="View Mode">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["numberline", "absolute", "intervals"] as IntervalMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "numberline" ? "Intervals" : m === "absolute" ? "|x| Absolute Value" : "Rational vs Irrational"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        {mode === "numberline" && (
          <CollapsibleControls label="Interval [a, b]">
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">a:</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">b:</Label><Input type="number" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CollapsibleControls>
        )}

        {mode === "absolute" && (
          <CollapsibleControls label="Value x">
            <div className="w-20 mt-1">
              <Label className="text-xs text-muted-foreground">x:</Label>
              <Input type="number" step="0.5" value={val} onChange={(e) => setVal(Number(e.target.value))} className="mt-1" />
            </div>
          </CollapsibleControls>
        )}

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Real numbers (R):</strong> All rational and irrational numbers on a continuous number line.</p>
            <p><strong className="text-foreground">Interval notation:</strong> [a,b] = closed, (a,b) = open, [a,b) = half-open.</p>
            <p><strong className="text-foreground">Absolute value:</strong> |x| = x if x ≥ 0, −x if x &lt; 0. Distance from origin.</p>
            <p><strong className="text-foreground">Rational:</strong> p/q where p, q ∈ Z, q ≠ 0. Includes terminating and repeating decimals.</p>
            <p><strong className="text-foreground">Irrational:</strong> Cannot be written as p/q. Non-terminating, non-repeating (e.g. √2, π).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
