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
 * p-n junction diode — forward bias shrinks the depletion layer and lets
 * current flow; reverse bias widens it and blocks. I = I₀(e^(V/V_T) − 1).
 * NEB Class 12 Modern Physics: "Semiconductors — p-n junction, diode".
 */
export function PNJunctionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [bias, setBias] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const VT = 0.026;
  const V0 = 0.7;
  const currentNorm = Math.exp(bias / VT) - 1;
  const depletionW = 0.35 + 0.9 * Math.sqrt(Math.max(0, V0 - bias) / V0);
  const mode = bias > 0.05 ? "Forward bias" : bias < -0.05 ? "Reverse bias" : "No bias";
  const DEFAULTS = { bias: 0 };
  const presets: ScenePreset[] = [
    { name: "Forward bias", hint: "V > 0 — depletion layer shrinks, current flows.", apply: () => { setBias(0.6); setRunId((r) => r + 1); } },
    { name: "Reverse bias", hint: "V < 0 — depletion layer widens, current is blocked.", apply: () => { setBias(-1.5); setRunId((r) => r + 1); } },
    { name: "No bias", hint: "V = 0 — equilibrium, built-in barrier only.", apply: () => { setBias(0); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setBias(DEFAULTS.bias);
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
      camera.position.set(0, 1, 10);

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

      // p-side and n-side slabs.
      const pSlab = push(new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 3, 1.2),
        new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4, transparent: true, opacity: 0.85 }),
      ));
      pSlab.position.set(-1.2, 0, 0);
      const nSlab = push(new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 3, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4, transparent: true, opacity: 0.85 }),
      ));
      nSlab.position.set(1.2, 0, 0);

      // Depletion region (width responds to bias).
      const depletion = push(new THREE.Mesh(
        new THREE.BoxGeometry(1, 3.3, 1.3),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6, transparent: true, opacity: 0.55 }),
      ));
      depletion.position.set(0, 0, 0);

      // Majority carriers: holes in p (red), electrons in n (blue).
      const holes: THREE.Mesh[] = [];
      for (let i = 0; i < 10; i++) {
        const h = push(new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfca5a5 }))) as THREE.Mesh;
        h.userData.home = new THREE.Vector3(-2.2 + Math.random() * 1.6, -1.3 + Math.random() * 2.6, -0.4 + Math.random() * 0.8);
        h.position.copy(h.userData.home);
        holes.push(h);
      }
      const electrons: THREE.Mesh[] = [];
      for (let i = 0; i < 10; i++) {
        const e = push(new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), new THREE.MeshBasicMaterial({ color: 0x93c5fd }))) as THREE.Mesh;
        e.userData.home = new THREE.Vector3(0.6 + Math.random() * 1.6, -1.3 + Math.random() * 2.6, -0.4 + Math.random() * 0.8);
        e.position.copy(e.userData.home);
        electrons.push(e);
      }

      // Battery symbol below the junction.
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.2, -2.2, 0), new THREE.Vector3(-0.6, -2.2, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.6, -2.5, 0), new THREE.Vector3(-0.6, -1.9, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.6, -2.7, 0), new THREE.Vector3(0.6, -1.7, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0.6, -2.2, 0), new THREE.Vector3(1.2, -2.2, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.2, -2.2, 0), new THREE.Vector3(-1.2, -1.5, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(1.2, -2.2, 0), new THREE.Vector3(1.2, -1.5, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      addLabel(mkSprite(`V = ${bias.toFixed(1)} V`, "#fbbf24", new THREE.Vector3(0, -3.2, 0), 0.55));
      addLabel(mkSprite("p", "#ef4444", new THREE.Vector3(-2.3, 1.9, 0), 0.7));
      addLabel(mkSprite("n", "#3b82f6", new THREE.Vector3(2.3, 1.9, 0), 0.7));
      addLabel(mkSprite("depletion", "#94a3b8", new THREE.Vector3(0, -0.4, 1.1), 0.5));

      // Animate: depletion width tracks bias; carriers drift across when forward.
      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (animating) t += dt;
        controls.update();

        depletion.scale.x = depletionW;
        const drift = Math.max(0, Math.min(1.5, currentNorm * 0.08));
        holes.forEach((h) => {
          h.userData.phase = (h.userData.phase ?? 0) + dt * drift * 0.6;
          const ph = h.userData.phase;
          const home = h.userData.home as THREE.Vector3;
          if (ph < 1) {
            h.position.set(home.x + (0.6 - home.x) * ph, home.y, home.z);
          } else if (ph < 2) {
            h.position.set(0.6 + (ph - 1) * 1.2, home.y, home.z);
          } else {
            h.userData.phase = 0;
            h.position.copy(home);
          }
        });
        electrons.forEach((e) => {
          e.userData.phase = (e.userData.phase ?? 0) + dt * drift * 0.6;
          const ph = e.userData.phase;
          const home = e.userData.home as THREE.Vector3;
          if (ph < 1) {
            e.position.set(home.x + (-0.6 - home.x) * ph, home.y, home.z);
          } else if (ph < 2) {
            e.position.set(-0.6 - (ph - 1) * 1.2, home.y, home.z);
          } else {
            e.userData.phase = 0;
            e.position.copy(home);
          }
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
  }, [runId, isWebGL, bias, animating, showLabels]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="p-n Junction Diode"
        description="Forward bias shrinks the depletion layer and conducts; reverse bias widens it and blocks."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>p-n Junction — Diode Bias</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Bias Voltage">
          <div className="w-64 mt-2">
            <Label className="text-xs text-muted-foreground">Bias V (volts):</Label>
            <Input type="range" min={-2} max={1} step={0.05} value={bias} onChange={(e) => setBias(Number(e.target.value))} className="mt-1 w-full" />
            <p className="text-xs font-mono text-primary mt-1">{bias > 0 ? "+" : ""}{bias.toFixed(2)} V — {mode}</p>
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
            { label: "Depletion width", value: depletionW.toFixed(2), unit: "u", highlight: true },
            { label: "Current I ∝ e^(V/V_T) − 1", value: currentNorm >= 0 ? Math.min(currentNorm, 9999).toFixed(2) : "≈ −1 (blocked)", unit: "I₀" },
            { label: "Bias", value: mode },
            { label: "Thermal voltage V_T", value: VT, unit: "V" },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Diode equation:</strong> I = I₀(e^(V/V_T) − 1) with V_T ≈ 26 mV at room temperature.</p>
            <p><strong className="text-foreground">Forward bias:</strong> V &gt; 0 shrinks the depletion layer — majority carriers cross and current flows.</p>
            <p><strong className="text-foreground">Reverse bias:</strong> V &lt; 0 widens the depletion layer — only a tiny leakage current flows.</p>
            <p><strong className="text-foreground">Rectification:</strong> the diode conducts one way only — the basis of AC-to-DC conversion.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
