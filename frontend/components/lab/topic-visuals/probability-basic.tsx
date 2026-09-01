"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Probability — NEB Statistics (Maths 11)
   Interactive probability space: sample space, events,
   independent events, and basic laws of probability.
   ============================================================ */

type ProbMode = "sample-space" | "independent" | "two-events";

export function ProbabilityBasicVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<ProbMode>("sample-space");
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

      const drawEllipse = (cx: number, cy: number, rx: number, ry: number, color: number, opacity = 0.3) => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(cx + rx * Math.cos(t), cy + ry * Math.sin(t), 0.01));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, linewidth: 2 })));
        const fill = push(new THREE.Mesh(
          new THREE.CircleGeometry(1, 64),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide }),
        ));
        fill.scale.set(rx, ry, 1);
        fill.position.set(cx, cy, 0);
      };

      const update = () => {
        while (meshes.length > 15) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        if (mode === "sample-space") {
          // Universal set rectangle
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(-6, -4, 0), new THREE.Vector3(6, -4, 0), new THREE.Vector3(6, 4, 0),
              new THREE.Vector3(-6, 4, 0), new THREE.Vector3(-6, -4, 0),
            ]),
            new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 }),
          ));
          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 64; c.height = 32; const x = c.getContext("2d")!; x.fillStyle = "#94a3b8"; x.font = "bold 24px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("S", 32, 16); return new THREE.CanvasTexture(c); })(), transparent: true })));
          // Sprites
          const mkSp = (text: string, color: string, pos: THREE.Vector3) => {
            const canvas = document.createElement("canvas");
            canvas.width = 128; canvas.height = 64;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = color;
            ctx.font = "bold 28px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, 64, 32);
            const tex = new THREE.CanvasTexture(canvas);
            const sp = push(new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true })));
            sp.position.copy(pos);
            sp.scale.set(1.5, 0.75, 1);
          };

          mkSp("A", "#f87171", new THREE.Vector3(-2.5, 0, 0.02));
          mkSp("B", "#60a5fa", new THREE.Vector3(2.5, 0, 0.02));
          drawEllipse(-2.5, 0, 2, 2.5, 0xef4444, 0.25);
          drawEllipse(2.5, 0, 2, 2.5, 0x3b82f6, 0.25);

          // Overlap region
          drawEllipse(0, 0, 1, 1.5, 0xfbbf24, 0.3);
          mkSp("A∩B", "#fbbf24", new THREE.Vector3(0, 0, 0.03));

          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 512; c.height = 96; const x = c.getContext("2d")!; x.fillStyle = "rgba(15,23,42,0.9)"; x.fillRect(4,4,504,88); x.strokeStyle = "#fbbf24"; x.lineWidth = 2; x.strokeRect(4,4,504,88); x.fillStyle = "#fbbf24"; x.font = "bold 30px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("P(A∪B) = P(A) + P(B) − P(A∩B)", 256, 48); const t = new THREE.CanvasTexture(c); return t; })(), transparent: true })));
          (meshes[meshes.length - 1] as any).position.set(0, -3.2, 0);
          (meshes[meshes.length - 1] as any).scale.set(6, 1.1, 1);
        } else if (mode === "independent") {
          // Two independent events as separate circles
          drawEllipse(-2.5, 0, 2.5, 3, 0xef4444, 0.25);
          drawEllipse(2.5, 0, 2.5, 3, 0x3b82f6, 0.25);
          const mkSp = (text: string, color: string, pos: THREE.Vector3) => {
            const canvas = document.createElement("canvas");
            canvas.width = 512; canvas.height = 96;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = "rgba(15,23,42,0.9)"; ctx.fillRect(4,4,504,88);
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(4,4,504,88);
            ctx.fillStyle = color; ctx.font = "bold 30px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(text, 256, 48);
            const tex = new THREE.CanvasTexture(canvas);
            const sp = push(new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true })));
            sp.position.copy(pos); sp.scale.set(3.0, 0.56, 1);
          };
          mkSp("Event A: P(A)", "#f87171", new THREE.Vector3(-2.5, 2.5, 0));
          mkSp("Event B: P(B)", "#60a5fa", new THREE.Vector3(2.5, 2.5, 0));
          // P(A∩B) = P(A)P(B)
          const ab = push(new THREE.Mesh(
            new THREE.CircleGeometry(1, 64),
            new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
          ));
          ab.scale.set(0.8, 1.2, 1);
          ab.position.set(2.5, 0, 0.02);
          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 512; c.height = 96; const x = c.getContext("2d")!; x.fillStyle = "rgba(15,23,42,0.9)"; x.fillRect(4,4,504,88); x.strokeStyle = "#22d3ee"; x.lineWidth = 2; x.strokeRect(4,4,504,88); x.fillStyle = "#22d3ee"; x.font = "bold 30px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Independent: P(A∩B) = P(A) × P(B)", 256, 48); const t = new THREE.CanvasTexture(c); return t; })(), transparent: true })));
          (meshes[meshes.length - 1] as any).position.set(0, -3.2, 0);
          (meshes[meshes.length - 1] as any).scale.set(6, 1.1, 1);
        } else if (mode === "two-events") {
          // Conditional probability: P(A|B) = P(A∩B)/P(B)
          drawEllipse(0, 0, 4, 3.5, 0x3b82f6, 0.2);
          drawEllipse(-1.5, 0, 2.5, 2, 0xef4444, 0.3);
          const mkSp = (text: string, color: string, pos: THREE.Vector3) => {
            const canvas = document.createElement("canvas");
            canvas.width = 512; canvas.height = 96;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = "rgba(15,23,42,0.9)"; ctx.fillRect(4,4,504,88);
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(4,4,504,88);
            ctx.fillStyle = color; ctx.font = "bold 30px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(text, 256, 48);
            const tex = new THREE.CanvasTexture(canvas);
            const sp = push(new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true })));
            sp.position.copy(pos); sp.scale.set(3.0, 0.56, 1);
          };
          mkSp("B", "#60a5fa", new THREE.Vector3(2, 2.8, 0));
          mkSp("A", "#f87171", new THREE.Vector3(-2, 1.5, 0));
          const abRegion = push(new THREE.Mesh(
            new THREE.CircleGeometry(1, 64),
            new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
          ));
          abRegion.scale.set(1.2, 1, 1);
          abRegion.position.set(-1.5, 0, 0.03);
          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 512; c.height = 96; const x = c.getContext("2d")!; x.fillStyle = "rgba(15,23,42,0.9)"; x.fillRect(4,4,504,88); x.strokeStyle = "#fbbf24"; x.lineWidth = 2; x.strokeRect(4,4,504,88); x.fillStyle = "#fbbf24"; x.font = "bold 30px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("P(A|B) = P(A∩B) / P(B)", 256, 48); const t = new THREE.CanvasTexture(c); return t; })(), transparent: true })));
          (meshes[meshes.length - 1] as any).position.set(0, -3.2, 0);
          (meshes[meshes.length - 1] as any).scale.set(6, 1.1, 1);
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
  }, [mode, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Probability" description="Probability space visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Probability — Basic Laws</span>
          <span className="text-xs text-muted-foreground font-normal">Sample space · Independent events · Conditional probability</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Probability Mode">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["sample-space", "independent", "two-events"] as ProbMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "sample-space" ? "Sample Space" : m === "independent" ? "Independent Events" : "Conditional P"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Two Basic Laws of Probability</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Addition Law:</strong> P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</p>
            <p><strong className="text-foreground">Multiplication Law:</strong> P(A ∩ B) = P(A) · P(B|A) = P(B) · P(A|B)</p>
            <p><strong className="text-foreground">Independent events:</strong> P(A ∩ B) = P(A) · P(B)</p>
            <p><strong className="text-foreground">Conditional probability:</strong> P(A|B) = P(A ∩ B) / P(B), where P(B) &gt; 0</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
