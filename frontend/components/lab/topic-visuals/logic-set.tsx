"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Logic & Sets — NEB Algebra (Maths 11)
   Animated Venn diagram with set operations: union, intersection,
   complement, subset, difference.
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

type SetOp = "union" | "intersection" | "complement" | "subset" | "difference";

export function LogicSetVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [op, setOp] = useState<SetOp>("union");
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

      const drawEllipse = (cx: number, cy: number, rx: number, ry: number, color: number, opacity = 0.35) => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(cx + rx * Math.cos(t), cy + ry * Math.sin(t), 0.01));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, linewidth: 2 })));
        const fill = new THREE.Mesh(
          new THREE.CircleGeometry(1, 64),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide }),
        );
        fill.scale.set(rx, ry, 1);
        fill.position.set(cx, cy, 0);
        push(fill);
        return fill;
      };

      const update = () => {
        while (meshes.length > 12) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        // Universal set box
        const U = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-6, -5, 0), new THREE.Vector3(6, -5, 0), new THREE.Vector3(6, 5, 0),
            new THREE.Vector3(-6, 5, 0), new THREE.Vector3(-6, -5, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 }),
        );
        push(U);
        push(mkSprite("U", "#94a3b8", new THREE.Vector3(-5.3, 4.3, 0), 0.6));

        // Two overlapping ellipses for A and B
        const ellipseA = drawEllipse(-1.5, 0, 2.5, 3.2, 0xef4444, 0.3);
        const ellipseB = drawEllipse(1.5, 0, 2.5, 3.2, 0x3b82f6, 0.3);

        // Labels
        push(mkSprite("A", "#f87171", new THREE.Vector3(-3.5, 2.5, 0.02), 0.8));
        push(mkSprite("B", "#60a5fa", new THREE.Vector3(3.5, 2.5, 0.02), 0.8));

        // Highlight region based on operation
        let highlightColor: number, labelText: string;
        switch (op) {
          case "union":
            highlightColor = 0xf97316;
            labelText = "A ∪ B — Union";
            break;
          case "intersection":
            highlightColor = 0x22d3ee;
            labelText = "A ∩ B — Intersection";
            break;
          case "complement":
            highlightColor = 0x22c55e;
            labelText = "A' — Complement of A";
            break;
          case "subset":
            highlightColor = 0xfbbf24;
            labelText = "A ⊂ B — Subset";
            break;
          case "difference":
            highlightColor = 0xa78bfa;
            labelText = "A − B — Difference";
            break;
        }

        if (op === "intersection" || op === "union") {
          // Draw overlap region fill
          const overlapPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 64; i++) {
            const t = (i / 64) * Math.PI * 2;
            overlapPts.push(new THREE.Vector3(1.5 + 0.8 * Math.cos(t), 1.2 * Math.sin(t), 0.03));
          }
          const overlap = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(overlapPts), new THREE.LineBasicMaterial({ color: highlightColor, linewidth: 3 })));
          const overlapFill = push(new THREE.Mesh(
            new THREE.CircleGeometry(1, 64),
            new THREE.MeshBasicMaterial({ color: highlightColor, transparent: true, opacity: 0.45, side: THREE.DoubleSide }),
          ));
          overlapFill.scale.set(0.8, 1.2, 1);
          overlapFill.position.set(1.5, 0, 0);
          if (op === "union") {
            // For union, we want both ellipses highlighted
            (ellipseA.material as THREE.MeshBasicMaterial).opacity = 0.55;
            (ellipseB.material as THREE.MeshBasicMaterial).opacity = 0.55;
          }
        } else if (op === "complement") {
          (ellipseA.material as THREE.MeshBasicMaterial).opacity = 0.15;
          // Add cross-hatch outside A
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const r = 3.5 + Math.random() * 1.5;
            const px = Math.cos(angle) * r * 0.6;
            const py = Math.sin(angle) * r * 0.4;
            const dashLine = push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(px - 0.8, py - 0.5, 0), new THREE.Vector3(px + 0.8, py + 0.5, 0)]),
              new THREE.LineDashedMaterial({ color: highlightColor, dashSize: 0.1, gapSize: 0.08 }),
            ));
            (dashLine as any).computeLineDistances();
          }
        } else if (op === "subset") {
          // Show B containing A
          (ellipseA.material as THREE.MeshBasicMaterial).opacity = 0.1;
          const subArrow = new LiveArrow(new THREE.Vector3(0, 1, 0).normalize(), new THREE.Vector3(0, -4, 0), 1.5, highlightColor, 0.2, 0.12);
          push(subArrow);
        } else if (op === "difference") {
          // Shade only A excluding B
          (ellipseB.material as THREE.MeshBasicMaterial).opacity = 0.1;
          (ellipseA.material as THREE.MeshBasicMaterial).opacity = 0.55;
        }

        push(mkSprite(labelText, `#${highlightColor.toString(16).padStart(6, "0")}`, new THREE.Vector3(0, -4.2, 0.02), 0.9));
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
  }, [op, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Logic & Sets" description="Venn diagram visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Logic &amp; Sets — Venn Diagram</span>
          <span className="text-xs text-muted-foreground font-normal">Interactive set operations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Set Operation">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["union", "intersection", "complement", "subset", "difference"] as SetOp[]).map((o) => (
              <button
                key={o}
                onClick={() => setOp(o)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  op === o ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {o === "union" ? "A ∪ B" : o === "intersection" ? "A ∩ B" : o === "complement" ? "A'" : o === "subset" ? "A ⊂ B" : "A − B"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Union (A ∪ B):</strong> All elements in A or B or both.</p>
            <p><strong className="text-foreground">Intersection (A ∩ B):</strong> Elements common to both A and B.</p>
            <p><strong className="text-foreground">Complement (A'):</strong> Elements in U but not in A.</p>
            <p><strong className="text-foreground">Subset (A ⊂ B):</strong> Every element of A is also in B.</p>
            <p><strong className="text-foreground">Difference (A − B):</strong> Elements in A but not in B.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
