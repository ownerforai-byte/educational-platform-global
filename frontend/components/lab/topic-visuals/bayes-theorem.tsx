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
   Bayes' Theorem — NEB Probability (Maths 12)
   Tree diagram and area-based visualization of Bayes' theorem
   with multiple hypotheses.
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
  s.scale.set(3.0 * scale, 0.56 * scale, 1);
  return s;
}

export function BayesTheoremVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pA1, setPA1] = useState(0.3);
  const [pA2, setPA2] = useState(0.5);
  const [pB1, setPB1] = useState(0.2);
  const [pB2, setPB2] = useState(0.6);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  // P(A1|B) = P(B|A1)*P(A1) / [P(B|A1)*P(A1) + P(B|A2)*P(A2)]
  const pB = pB1 * pA1 + pB2 * pA2;
  const pA1gB = (pB1 * pA1) / pB;
  const pA2gB = (pB2 * pA2) / pB;

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

      // Horizontal layout: Priors on left, likelihoods in middle, posteriors on right
      const colors = [0xef4444, 0x3b82f6];
      const priors = [pA1, pA2];
      const likelihoods = [pB1, pB2];

      // Root node
      const root = push(new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
      root.position.set(-8, 0, 0);
      push(mkSprite("S (Sample Space)", "#fbbf24", new THREE.Vector3(-8, 1.5, 0), 0.6));

      // Branch 1: A1
      const branch1End = new THREE.Vector3(-2, 3, 0);
      push(new THREE.ArrowHelper(
        branch1End.clone().sub(new THREE.Vector3(-8, 0, 0)).normalize(),
        new THREE.Vector3(-8, 0, 0),
        branch1End.distanceTo(new THREE.Vector3(-8, 0, 0)),
        colors[0], 0.15, 0.1
      ));
      const nodeA1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: colors[0] })));
      nodeA1.position.copy(branch1End);
      push(mkSprite(`A₁  P=${pA1.toFixed(2)}`, "#f87171", branch1End.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.65));

      // Branch 2: A2
      const branch2End = new THREE.Vector3(-2, -3, 0);
      push(new THREE.ArrowHelper(
        branch2End.clone().sub(new THREE.Vector3(-8, 0, 0)).normalize(),
        new THREE.Vector3(-8, 0, 0),
        branch2End.distanceTo(new THREE.Vector3(-8, 0, 0)),
        colors[1], 0.15, 0.1
      ));
      const nodeA2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: colors[1] })));
      nodeA2.position.copy(branch2End);
      push(mkSprite(`A₂  P=${pA2.toFixed(2)}`, "#60a5fa", nodeA2.position.clone().add(new THREE.Vector3(0.5, -0.5, 0)), 0.65));

      // Second level: B|A1 and B|A2
      const level2X = 3;
      const b1End = new THREE.Vector3(level2X, 4.5, 0);
      const b2End = new THREE.Vector3(level2X, 1.5, 0);
      push(new THREE.ArrowHelper(
        b1End.clone().sub(branch1End).normalize(),
        branch1End,
        b1End.distanceTo(branch1End),
        0x22c55e, 0.12, 0.08
      ));
      push(new THREE.ArrowHelper(
        b2End.clone().sub(branch1End).normalize(),
        branch1End,
        b2End.distanceTo(branch1End),
        0x22c55e, 0.12, 0.08
      ));
      push(mkSprite(`P(B|A₁)=${pB1.toFixed(2)}`, "#4ade80", new THREE.Vector3(-4.5, 4, 0), 0.6));

      const c1End = new THREE.Vector3(level2X, -1.5, 0);
      const c2End = new THREE.Vector3(level2X, -4.5, 0);
      push(new THREE.ArrowHelper(
        c1End.clone().sub(branch2End).normalize(),
        branch2End,
        c1End.distanceTo(branch2End),
        0x22c55e, 0.12, 0.08
      ));
      push(new THREE.ArrowHelper(
        c2End.clone().sub(branch2End).normalize(),
        branch2End,
        c2End.distanceTo(branch2End),
        0x22c55e, 0.12, 0.08
      ));
      push(mkSprite(`P(B|A₂)=${pB2.toFixed(2)}`, "#4ade80", new THREE.Vector3(-4.5, -4, 0), 0.6));

      // Final nodes: P(A1∩B) and P(A2∩B)
      const finalX = 7;
      const ab1 = new THREE.Vector3(finalX, 4, 0);
      const ab2 = new THREE.Vector3(finalX, -4, 0);
      const joint1 = pA1 * pB1;
      const joint2 = pA2 * pB2;
      const totalB = joint1 + joint2;

      const n1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
      n1.position.copy(ab1);
      push(mkSprite(`A₁∩B  ${(joint1*100).toFixed(1)}%`, "#f87171", ab1.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.65));

      const n2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshBasicMaterial({ color: 0x3b82f6 })));
      n2.position.copy(ab2);
      push(mkSprite(`A₂∩B  ${(joint2*100).toFixed(1)}%`, "#60a5fa", n2.position.clone().add(new THREE.Vector3(0.5, -0.5, 0)), 0.65));

      // Bayes result
      push(mkSprite(`P(A₁|B) = ${(pA1gB*100).toFixed(1)}%`, "#fbbf24", new THREE.Vector3(7, 6, 0), 0.9));
      push(mkSprite(`P(A₂|B) = ${(pA2gB*100).toFixed(1)}%`, "#a78bfa", new THREE.Vector3(7, -6, 0), 0.9));
      push(mkSprite(`Bayes: P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ) / ΣP(B|Aⱼ)P(Aⱼ)`, "#22d3ee", new THREE.Vector3(0, -7, 0), 0.75));
    };

    const cleanup = init();
    return () => { cleanup.then((d: any) => d?.()); };
  }, [pA1, pA2, pB1, pB2, pA1gB, pA2gB, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Bayes' Theorem" description="Probability tree — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Bayes' Theorem</span>
          <span className="text-xs text-muted-foreground font-normal">P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ) / ΣP(B|Aⱼ)P(Aⱼ)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Prior Probabilities P(Aᵢ)">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(A₁):</Label><Input type="number" step="0.05" min={0} max={1} value={pA1} onChange={(e) => setPA1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(A₂):</Label><Input type="number" step="0.05" min={0} max={1} value={pA2} onChange={(e) => setPA2(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Conditional Probabilities P(B|Aᵢ)">
          <div className="flex gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(B|A₁):</Label><Input type="number" step="0.05" min={0} max={1} value={pB1} onChange={(e) => setPB1(Number(e.target.value))} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">P(B|A₂):</Label><Input type="number" step="0.05" min={0} max={1} value={pB2} onChange={(e) => setPB2(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Bayes' Theorem</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">P(Aᵢ|B) =</strong> <span className="font-mono">P(B|Aᵢ) · P(Aᵢ)</span> / <span className="font-mono">Σⱼ P(B|Aⱼ) · P(Aⱼ)</span></p>
            <p><strong className="text-foreground">P(A₁|B) =</strong> {(pB1*pA1).toFixed(3)} / {(pB*pB).toFixed(3)} = <strong className="text-foreground">{pA1gB.toFixed(3)}</strong></p>
            <p><strong className="text-foreground">P(A₂|B) =</strong> {(pB2*pA2).toFixed(3)} / {(pB*pB).toFixed(3)} = <strong className="text-foreground">{pA2gB.toFixed(3)}</strong></p>
            <p><strong className="text-foreground">Interpretation:</strong> After observing B, update your belief about which Aᵢ occurred.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
