"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import {
  ScenePresets,
  PlaybackBar,
  ReadoutGrid,
  type ScenePreset,
} from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/**
 * Wheatstone bridge — balanced when R1/R2 = R3/R4 and the galvanometer reads
 * zero. NEB Class 12 Current Electricity: "Wheatstone bridge and meter bridge".
 */
export function WheatstoneBridgeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [r1, setR1] = useState(2);
  const [r2, setR2] = useState(4);
  const [r3, setR3] = useState(3);
  const [r4, setR4] = useState(6);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const balanceR4 = r1 > 0 ? (r2 * r3) / r1 : 0;
  const imbalance = r2 > 0 && r4 > 0 ? r1 / r2 - r3 / r4 : 0;
  const balanced = Math.abs(imbalance) < 0.01;
  const DEFAULTS = { r1: 2, r2: 4, r3: 3, r4: 6 };
  const presets: ScenePreset[] = [
    { name: "Balanced", hint: "R1/R2 = R3/R4 — the galvanometer reads zero.", apply: () => { setR1(2); setR2(4); setR3(3); setR4(6); setRunId((r) => r + 1); } },
    { name: "Unbalanced", hint: "Break the ratio — current flows through the galvanometer.", apply: () => { setR1(2); setR2(4); setR3(3); setR4(9); setRunId((r) => r + 1); } },
    { name: "Meter bridge hunt", hint: "Tune R4 toward balance and watch the needle settle.", apply: () => { setR1(2); setR2(4); setR3(3); setR4(5.4); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setR1(DEFAULTS.r1);
    setR2(DEFAULTS.r2);
    setR3(DEFAULTS.r3);
    setR4(DEFAULTS.r4);
    setSpeed(1);
    setShowLabels(true);
    setAnimating(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let t = 0;

    const mkSprite = (text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite => {
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
    };

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0.5, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 4;
      controls.maxDistance = 20;
      vizTargetRef.current = {
        controls,
        el: container,
        canvasEl: renderer.domElement,
        setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)),
      };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { s.visible = showLabels; push(s); labelSprites.push(s); return s; };

      // Diamond junctions.
      const A = new THREE.Vector3(-2.6, 0, 0);
      const B = new THREE.Vector3(2.6, 0, 0);
      const C = new THREE.Vector3(0, 1.9, 0);
      const D = new THREE.Vector3(0, -1.9, 0);

      // Resistor arm: zigzag between two points, with label at the midpoint.
      const arm = (from: THREE.Vector3, to: THREE.Vector3, label: string, color: number) => {
        const dirV = to.clone().sub(from);
        const len = dirV.length();
        const n = dirV.clone().normalize();
        const perp = new THREE.Vector3(-n.y, n.x, 0);
        const pts: THREE.Vector3[] = [];
        const steps = 8;
        for (let i = 0; i <= steps; i++) {
          const base = from.clone().add(n.clone().multiplyScalar((i / steps) * len));
          const off = i === 0 || i === steps ? 0 : (i % 2 === 0 ? 1 : -1) * 0.18;
          pts.push(base.clone().add(perp.clone().multiplyScalar(off)));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color })));
        const mid = from.clone().add(to).multiplyScalar(0.5);
        addLabel(mkSprite(label, "#" + color.toString(16).padStart(6, "0"), mid.clone().add(perp.clone().multiplyScalar(0.85)), 0.45));
      };
      arm(A, C, `R1 = ${r1} Ω`, 0xf97316);
      arm(C, B, `R2 = ${r2} Ω`, 0xf97316);
      arm(A, D, `R3 = ${r3} Ω`, 0xf97316);
      arm(D, B, `R4 = ${r4} Ω`, 0xf97316);

      // Battery across A–B.
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([A, B]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.3, -0.5, 0), new THREE.Vector3(-0.3, 0.5, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.3, -0.8, 0), new THREE.Vector3(0.3, 0.8, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      addLabel(mkSprite("E", "#fbbf24", new THREE.Vector3(0, -1.0, 0.6), 0.45));

      // Galvanometer between C and D: circle + needle.
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([C, D]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 32 }, (_, k) => {
            const a = (k / 32) * Math.PI * 2;
            return new THREE.Vector3(0.5 * Math.cos(a), 0.5 * Math.sin(a), 0);
          }),
        ),
        new THREE.LineBasicMaterial({ color: 0xe2e8f0 }),
      ));
      const needle = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.45, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 0xef4444 }),
      );
      push(needle);
      addLabel(mkSprite("G", "#e2e8f0", new THREE.Vector3(0.9, 0.9, 0), 0.4));

      // Current dots flowing around the loop (fast when far from balance).
      const loopPath = [A, C, B, D, A];
      const segs = loopPath.slice(1).map((p, i) => ({ from: loopPath[i], to: p }));
      const segLen = segs.map((s) => s.to.distanceTo(s.from));
      const total = segLen.reduce((a, b) => a + b, 0);
      const dots: THREE.Mesh[] = [];
      for (let i = 0; i < 8; i++) {
        const d = push(new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfde047 }))) as THREE.Mesh;
        d.userData.dist = (i / 8) * total;
        dots.push(d);
      }
      const posAt = (d: number): THREE.Vector3 => {
        let rem = ((d % total) + total) % total;
        for (let s = 0; s < segs.length; s++) {
          if (rem <= segLen[s]) return segs[s].from.clone().add(segs[s].to.clone().sub(segs[s].from).normalize().multiplyScalar(rem));
          rem -= segLen[s];
        }
        return loopPath[0].clone();
      };

      // Needle deflects with imbalance; dots slow to a stop at balance.
      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (animating) t += dt;
        controls.update();

        const angle = Math.max(-1.1, Math.min(1.1, imbalance * 2.2));
        needle.rotation.z = angle;
        const speedFactor = Math.max(0, Math.min(1, Math.abs(imbalance) * 2));
        dots.forEach((d) => {
          d.userData.dist += speedFactor * dt * 4;
          d.position.copy(posAt(d.userData.dist));
        });

        renderer.render(scene, camera);
      };
      loop();
    };
    init();
    return () => {
      cancelAnimationFrame(frameId);
      meshes.forEach((m) => {
        m.traverse((o: any) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((mm: any) => mm.dispose());
            else o.material.dispose();
          }
        });
      });
      renderer?.dispose();
      if (renderer?.domElement?.parentElement === container) container.removeChild(renderer.domElement);
      controls?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, isWebGL, r1, r2, r3, r4, animating, showLabels]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="Wheatstone Bridge"
        description="Balance condition R1/R2 = R3/R4 — the galvanometer reads zero."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Wheatstone Bridge — Balance Condition</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Resistor Values">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">R1 (Ω):</Label>
              <Input type="range" min={1} max={10} step={0.5} value={r1} onChange={(e) => setR1(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{r1} Ω</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">R2 (Ω):</Label>
              <Input type="range" min={1} max={10} step={0.5} value={r2} onChange={(e) => setR2(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{r2} Ω</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">R3 (Ω):</Label>
              <Input type="range" min={1} max={10} step={0.5} value={r3} onChange={(e) => setR3(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{r3} Ω</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">R4 (Ω):</Label>
              <Input type="range" min={1} max={10} step={0.1} value={r4} onChange={(e) => setR4(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{r4.toFixed(1)} Ω</p>
            </div>
          </div>
        </CollapsibleControls>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <PlaybackBar
            playing={animating}
            onPlayToggle={() => setAnimating(!animating)}
            speed={speed}
            onSpeedChange={setSpeed}
            onReset={resetAll}
          />
          <button
            onClick={() => setShowLabels((v) => !v)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
          >
            Labels
          </button>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Balance condition R1/R2 = R3/R4", value: `${(r1 / r2).toFixed(2)} vs ${(r3 / r4).toFixed(2)}`, highlight: true },
            { label: "R4 for balance", value: balanceR4.toFixed(1), unit: "Ω" },
            { label: "Galvanometer", value: balanced ? "Zero — balanced!" : "Deflected" },
            { label: "Imbalance", value: imbalance.toFixed(3) },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Balance condition:</strong> R1/R2 = R3/R4 — no current flows through the galvanometer.</p>
            <p><strong className="text-foreground">Unknown resistance:</strong> R4 = R2·R3/R1 — measure one unknown from three knowns.</p>
            <p><strong className="text-foreground">Meter bridge:</strong> the same principle using a 1 m uniform wire — R = (l/100−l)·S.</p>
            <p><strong className="text-foreground">Null method:</strong> balance is found by null deflection, so the galvanometer's own resistance does not matter.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
