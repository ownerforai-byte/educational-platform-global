"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

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
  const vizTargetRef = useRef<VizTarget>({});
  const [pA1, setPA1] = useState(0.3);
  const [pA2, setPA2] = useState(0.5);
  const [pB1, setPB1] = useState(0.2);
  const [pB2, setPB2] = useState(0.6);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const bump = () => setRunId((r) => r + 1);

  const presets: ScenePreset[] = [
    {
      name: "Rare disease · positive test",
      hint: "Positive still means only ~17%",
      apply: () => { setPA1(0.01); setPA2(0.99); setPB1(0.99); setPB2(0.05); bump(); },
    },
    {
      name: "Factory machines",
      hint: "Defective item — which machine?",
      apply: () => { setPA1(0.3); setPA2(0.7); setPB1(0.02); setPB2(0.04); bump(); },
    },
    {
      name: "Even priors",
      hint: "Likelihood dominates",
      apply: () => { setPA1(0.5); setPA2(0.5); setPB1(0.9); setPB2(0.1); bump(); },
    },
  ];

  const resetAll = () => {
    setPA1(0.3); setPA2(0.5); setPB1(0.2); setPB2(0.6);
    setShowLabels(true);
    bump();
  };


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
    const labelSprites: THREE.Sprite[] = [];

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
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };
      controls.autoRotate = false;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addSprite = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      // Horizontal layout: Priors on left, likelihoods in middle, posteriors on right
      const colors = [0xef4444, 0x3b82f6];
      const priors = [pA1, pA2];
      const likelihoods = [pB1, pB2];

      // Root node
      const root = push(new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
      root.position.set(-8, 0, 0);
      addSprite(mkSprite("S (Sample Space)", "#fbbf24", new THREE.Vector3(-8, 1.5, 0), 0.6));

      // Branch 1: A1
      const branch1End = new THREE.Vector3(-2, 3, 0);
      push(new LiveLeaderLine(
        branch1End.clone().sub(new THREE.Vector3(-8, 0, 0)).normalize(),
        new THREE.Vector3(-8, 0, 0),
        branch1End.distanceTo(new THREE.Vector3(-8, 0, 0)),
        colors[0], 0.15, 0.1
      ));
      const nodeA1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: colors[0] })));
      nodeA1.position.copy(branch1End);
      addSprite(mkSprite(`A₁  P=${pA1.toFixed(2)}`, "#f87171", branch1End.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.65));

      // Branch 2: A2
      const branch2End = new THREE.Vector3(-2, -3, 0);
      push(new LiveLeaderLine(
        branch2End.clone().sub(new THREE.Vector3(-8, 0, 0)).normalize(),
        new THREE.Vector3(-8, 0, 0),
        branch2End.distanceTo(new THREE.Vector3(-8, 0, 0)),
        colors[1], 0.15, 0.1
      ));
      const nodeA2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: colors[1] })));
      nodeA2.position.copy(branch2End);
      addSprite(mkSprite(`A₂  P=${pA2.toFixed(2)}`, "#60a5fa", nodeA2.position.clone().add(new THREE.Vector3(0.5, -0.5, 0)), 0.65));

      // Second level: B|A1 and B|A2
      const level2X = 3;
      const b1End = new THREE.Vector3(level2X, 4.5, 0);
      const b2End = new THREE.Vector3(level2X, 1.5, 0);
      push(new LiveLeaderLine(
        b1End.clone().sub(branch1End).normalize(),
        branch1End,
        b1End.distanceTo(branch1End),
        0x22c55e, 0.12, 0.08
      ));
      push(new LiveLeaderLine(
        b2End.clone().sub(branch1End).normalize(),
        branch1End,
        b2End.distanceTo(branch1End),
        0x22c55e, 0.12, 0.08
      ));
      addSprite(mkSprite(`P(B|A₁)=${pB1.toFixed(2)}`, "#4ade80", new THREE.Vector3(-4.5, 4, 0), 0.6));

      const c1End = new THREE.Vector3(level2X, -1.5, 0);
      const c2End = new THREE.Vector3(level2X, -4.5, 0);
      push(new LiveLeaderLine(
        c1End.clone().sub(branch2End).normalize(),
        branch2End,
        c1End.distanceTo(branch2End),
        0x22c55e, 0.12, 0.08
      ));
      push(new LiveLeaderLine(
        c2End.clone().sub(branch2End).normalize(),
        branch2End,
        c2End.distanceTo(branch2End),
        0x22c55e, 0.12, 0.08
      ));
      addSprite(mkSprite(`P(B|A₂)=${pB2.toFixed(2)}`, "#4ade80", new THREE.Vector3(-4.5, -4, 0), 0.6));

      // Final nodes: P(A1∩B) and P(A2∩B)
      const finalX = 7;
      const ab1 = new THREE.Vector3(finalX, 4, 0);
      const ab2 = new THREE.Vector3(finalX, -4, 0);
      const joint1 = pA1 * pB1;
      const joint2 = pA2 * pB2;
      const totalB = joint1 + joint2;

      const n1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
      n1.position.copy(ab1);
      addSprite(mkSprite(`A₁∩B  ${(joint1*100).toFixed(1)}%`, "#f87171", ab1.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.65));

      const n2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshBasicMaterial({ color: 0x3b82f6 })));
      n2.position.copy(ab2);
      addSprite(mkSprite(`A₂∩B  ${(joint2*100).toFixed(1)}%`, "#60a5fa", n2.position.clone().add(new THREE.Vector3(0.5, -0.5, 0)), 0.65));

      // Bayes result
      addSprite(mkSprite(`P(A₁|B) = ${(pA1gB*100).toFixed(1)}%`, "#fbbf24", new THREE.Vector3(7, 6, 0), 0.9));
      addSprite(mkSprite(`P(A₂|B) = ${(pA2gB*100).toFixed(1)}%`, "#a78bfa", new THREE.Vector3(7, -6, 0), 0.9));
      push(mkSprite(`Bayes: P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ) / ΣP(B|Aⱼ)P(Aⱼ)`, "#22d3ee", new THREE.Vector3(0, -7, 0), 0.75));

      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        resizeObserver.disconnect();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d: any) => d?.()); };
  }, [pA1, pA2, pB1, pB2, pA1gB, pA2gB, isWebGL, runId, showLabels]);

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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

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

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "P(A₁|B) posterior", value: `${(pA1gB * 100).toFixed(1)}%`, highlight: true },
            { label: "P(A₂|B) posterior", value: `${(pA2gB * 100).toFixed(1)}%` },
            { label: "P(B) by total probability", value: pB.toFixed(4) },
            { label: "Joint P(A₁∩B)", value: (pA1 * pB1).toFixed(4) },
            { label: "Joint P(A₂∩B)", value: (pA2 * pB2).toFixed(4) },
            { label: "Belief update", value: `P(A₁): ${pA1.toFixed(2)} → ${pA1gB.toFixed(2)} after seeing B` },
          ]}
        />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Bayes' Theorem</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">P(Aᵢ|B) =</strong> <span className="font-mono">P(B|Aᵢ) · P(Aᵢ)</span> / <span className="font-mono">Σⱼ P(B|Aⱼ) · P(Aⱼ)</span></p>
            <p><strong className="text-foreground">P(A₁|B) =</strong> {(pB1*pA1).toFixed(3)} / {pB.toFixed(3)} = <strong className="text-foreground">{pA1gB.toFixed(3)}</strong></p>
            <p><strong className="text-foreground">P(A₂|B) =</strong> {(pB2*pA2).toFixed(3)} / {pB.toFixed(3)} = <strong className="text-foreground">{pA2gB.toFixed(3)}</strong></p>
            <p><strong className="text-foreground">Interpretation:</strong> After observing B, update your belief about which Aᵢ occurred.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
