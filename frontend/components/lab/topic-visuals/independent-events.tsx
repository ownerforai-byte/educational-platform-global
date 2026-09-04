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
   Independent Events — NEB Probability (Maths 12)
   Visualizes P(A∩B) = P(A)P(B) with Venn diagrams and
   shows dependence vs independence.
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

export function IndependentEventsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pA, setPA] = useState(0.4);
  const [pB, setPB] = useState(0.3);
  const [isIndependent, setIsIndependent] = useState(true);
  const [isWebGL] = useState(() => isWebGLAvailable());


  const pAB_indep = pA * pB;
  const pAB_actual = isIndependent ? pAB_indep : pAB_indep * 1.8; // Artificially increase to show dependence

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

      // Two separate diagrams side by side
      // Left: Independent case
      const leftCX = -4;
      // Right: Actual (could be dependent)

      // Left diagram: Independent
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(leftCX - 3, -2.5, 0), new THREE.Vector3(leftCX + 3, -2.5, 0), new THREE.Vector3(leftCX + 3, 2.5, 0), new THREE.Vector3(leftCX - 3, 2.5, 0), new THREE.Vector3(leftCX - 3, -2.5, 0)]),
        new THREE.LineBasicMaterial({ color: 0x475569 }),
      ));
      push(mkSprite("Independent", "#fbbf24", new THREE.Vector3(leftCX, 3, 0), 0.7));
      // Two separate circles not overlapping much
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(leftCX - 1.2, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pA) * 1.5, Math.sqrt(pA) * 1.5, 1);
      push(mkSprite(`A(${pA.toFixed(2)})`, "#f87171", new THREE.Vector3(leftCX - 1.2, 1.8, 0), 0.6));
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(leftCX + 1.2, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pB) * 1.5, Math.sqrt(pB) * 1.5, 1);
      push(mkSprite(`B(${pB.toFixed(2)})`, "#60a5fa", new THREE.Vector3(leftCX + 1.2, 1.8, 0), 0.6));
      // Small overlap region
      const overlapArea = pAB_indep;
      push(mkSprite(`P(A∩B) = ${overlapArea.toFixed(3)}`, "#22d3ee", new THREE.Vector3(leftCX, -3, 0), 0.65));

      // Right diagram: showing comparison
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(1, -2.5, 0), new THREE.Vector3(7, -2.5, 0), new THREE.Vector3(7, 2.5, 0), new THREE.Vector3(1, 2.5, 0), new THREE.Vector3(1, -2.5, 0)]),
        new THREE.LineBasicMaterial({ color: 0x475569 }),
      ));
      push(mkSprite(isIndependent ? "Independent ✓" : "Dependent", isIndependent ? "#22c55e" : "#ef4444", new THREE.Vector3(4, 3, 0), 0.7));

      // Overlapping circles
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(3, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pA) * 1.3, Math.sqrt(pA) * 1.3, 1);
      push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      )).position.set(5, 0, 0.01);
      (meshes[meshes.length - 1] as THREE.Mesh).scale.set(Math.sqrt(pB) * 1.3, Math.sqrt(pB) * 1.3, 1);

      // Intersection highlight
      const interFill = push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
      ));
      interFill.position.set(4, 0, 0.02);
      interFill.scale.set(Math.sqrt(overlapArea) * 1.5, Math.sqrt(overlapArea) * 1.2, 1);

      push(mkSprite(`P(A∩B) = ${overlapArea.toFixed(3)}`, "#fbbf24", new THREE.Vector3(4, -3, 0), 0.7));

      // Key formula
      push(mkSprite(isIndependent ? "P(A∩B) = P(A)·P(B)  ✓" : "P(A∩B) ≠ P(A)·P(B)  ✗", isIndependent ? "#22c55e" : "#ef4444", new THREE.Vector3(0, -4.2, 0), 0.8));
    };

    const cleanup = init();
    return () => { cleanup.then((d: any) => d?.()); };
  }, [pA, pB, isIndependent, pAB_indep, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Independent Events" description="Independence visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Independent Events</span>
          <span className="text-xs text-muted-foreground font-normal">P(A∩B) = P(A)·P(B)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Probabilities">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(A):</Label><Input type="number" step="0.05" min={0} max={1} value={pA} onChange={(e) => setPA(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(B):</Label><Input type="number" step="0.05" min={0} max={1} value={pB} onChange={(e) => setPB(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={isIndependent} onChange={(e) => setIsIndependent(e.target.checked)} />
            Events are independent (P(A∩B) = P(A)·P(B))
          </label>
        </div>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Independence</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Definition:</strong> A and B are independent if P(A ∩ B) = P(A) · P(B).</p>
            <p><strong className="text-foreground">Equivalent:</strong> P(A|B) = P(A)  or  P(B|A) = P(B) — knowing one doesn't change the other's probability.</p>
            <p><strong className="text-foreground">Three events:</strong> P(A∩B∩C) = P(A)·P(B)·P(C) for mutual independence.</p>
            <p><strong className="text-foreground">Note:</strong> Independent events can still overlap; disjoint events with P&gt;0 cannot be independent.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
