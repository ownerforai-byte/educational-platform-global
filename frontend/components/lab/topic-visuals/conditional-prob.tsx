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
   Conditional Probability — NEB Probability (Maths 12)
   Visualizes P(A|B), multiplication theorem, and Venn diagram
   with relative areas.
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

export function ConditionalProbabilityVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pA, setPA] = useState(0.4);
  const [pB, setPB] = useState(0.3);
  const [pAB, setPAB] = useState(0.1);
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

      // Universal set box
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-6, -4, 0), new THREE.Vector3(6, -4, 0), new THREE.Vector3(6, 4, 0),
          new THREE.Vector3(-6, 4, 0), new THREE.Vector3(-6, -4, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 }),
      ));
      push(mkSprite("S (Sample Space, P=1)", "#94a3b8", new THREE.Vector3(-5.5, 3.5, 0), 0.5));

      const drawEllipse = (cx: number, cy: number, rx: number, ry: number, color: number, opacity = 0.3) => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(cx + rx * Math.cos(t), cy + ry * Math.sin(t), 0.01));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, linewidth: 2 })));
        const circle = push(new THREE.Mesh(
          new THREE.CircleGeometry(1, 64),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide }),
        ) as THREE.Mesh);
        circle.scale.set(rx * 2, ry * 2, 1);
        circle.position.set(cx, cy, 0);
      };

      // Draw based on probabilities (area proportional)
      const totalW = 10, totalH = 6;
      const scaleX = totalW, scaleY = totalH;

      // Event B (blue circle, larger)
      const bRadius = Math.sqrt(pB) * 3;
      drawEllipse(2.5, 0, bRadius, bRadius * 0.8, 0x3b82f6, 0.2);
      push(mkSprite(`B  P(B)=${pB.toFixed(2)}`, "#60a5fa", new THREE.Vector3(4, 2.5, 0), 0.7));

      // Event A (red circle, overlapping)
      const aRadius = Math.sqrt(pA) * 3;
      drawEllipse(-1.5, 0, aRadius, aRadius * 0.8, 0xef4444, 0.2);
      push(mkSprite(`A  P(A)=${pA.toFixed(2)}`, "#f87171", new THREE.Vector3(-3.5, 2.5, 0), 0.7));

      // Intersection A∩B (highlighted)
      const abRadius = Math.sqrt(pAB) * 2.5;
      const interFill = push(new THREE.Mesh(
        new THREE.CircleGeometry(1, 64),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
      ));
      interFill.position.set(0.5, 0, 0.02);
      interFill.scale.set(abRadius * 0.8, abRadius * 0.6, 1);
      push(mkSprite(`A∩B  P=${pAB.toFixed(2)}`, "#fbbf24", new THREE.Vector3(0.5, -2.5, 0), 0.75));

      // Conditional probability formula
      const pAxB = pAB / pB;
      push(mkSprite(`P(A|B) = P(A∩B)/P(B) = ${pAB.toFixed(2)}/${pB.toFixed(2)} = ${pAxB.toFixed(3)}`, "#22d3ee", new THREE.Vector3(0, -4.5, 0), 0.85));
      push(mkSprite(`Multiplication: P(A∩B) = P(A|B)·P(B) = P(B|A)·P(A)`, "#a78bfa", new THREE.Vector3(0, 4.5, 0), 0.75));
    };

    const cleanup = init();
    return () => { cleanup.then((d: any) => d?.()); };
  }, [pA, pB, pAB, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Conditional Probability" description="Bayes/conditional visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Conditional Probability &amp; Multiplication Theorem</span>
          <span className="text-xs text-muted-foreground font-normal">P(A|B) = P(A∩B)/P(B)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Probabilities">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-20"><Label className="text-xs text-muted-foreground">P(A):</Label><Input type="number" step="0.05" min={0} max={1} value={pA} onChange={(e) => setPA(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-20"><Label className="text-xs text-muted-foreground">P(B):</Label><Input type="number" step="0.05" min={0} max={1} value={pB} onChange={(e) => setPB(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-20"><Label className="text-xs text-muted-foreground">P(A∩B):</Label><Input type="number" step="0.05" min={0} max={1} value={pAB} onChange={(e) => setPAB(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Theorems</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Conditional probability:</strong> P(A|B) = P(A ∩ B) / P(B),  P(B) &gt; 0</p>
            <p><strong className="text-foreground">Multiplication theorem:</strong> P(A ∩ B) = P(A|B) · P(B) = P(B|A) · P(A)</p>
            <p><strong className="text-foreground">Extension:</strong> P(A ∩ B ∩ C) = P(A) · P(B|A) · P(C|A ∩ B)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
