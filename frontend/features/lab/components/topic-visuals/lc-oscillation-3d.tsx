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
 * LC oscillations — energy sloshes between the capacitor's electric field and
 * the inductor's magnetic field. q = Q cos(ωt), i = −ωQ sin(ωt), ω = 1/√(LC).
 * NEB Class 12 AC: "LC oscillations and resonance".
 */
export function LCOscillationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [inductance, setInductance] = useState(2);
  const [capacitance, setCapacitance] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const omega = 1 / Math.sqrt(inductance * capacitance);
  const freq = omega / (2 * Math.PI);
  const periodT = 2 * Math.PI / omega;
  const DEFAULTS = { inductance: 2, capacitance: 2 };
  const presets: ScenePreset[] = [
    { name: "Slow oscillation", hint: "Large L and C — low frequency.", apply: () => { setInductance(5); setCapacitance(5); setRunId((r) => r + 1); } },
    { name: "Fast oscillation", hint: "Small L and C — high frequency.", apply: () => { setInductance(0.5); setCapacitance(0.5); setRunId((r) => r + 1); } },
    { name: "L-heavy", hint: "Big inductor — more magnetic energy.", apply: () => { setInductance(5); setCapacitance(1); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setInductance(DEFAULTS.inductance);
    setCapacitance(DEFAULTS.capacitance);
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
      camera.position.set(0, 3.5, 13);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 4;
      controls.maxDistance = 24;
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

      // Capacitor plates with field lines between them.
      const plateMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });
      push(new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.4, 1.6), plateMat)).position.set(-1.4, 0, 0);
      push(new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.4, 1.6), plateMat)).position.set(1.4, 0, 0);
      addLabel(mkSprite("C", "#fbbf24", new THREE.Vector3(0, 1.9, 0), 0.5));
      const eField: THREE.Line[] = [];
      for (let z = -0.5; z <= 0.5; z += 0.5) {
        const f = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.3, 0, z), new THREE.Vector3(1.3, 0, z)]),
          new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true }),
        );
        push(f);
        eField.push(f);
      }

      // Inductor coil with magnetic field rings.
      const coilPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 40; i++) {
        const a = (i / 40) * Math.PI * 6;
        coilPts.push(new THREE.Vector3(3.2 + 0.4 * Math.cos(a), 0.6 * Math.sin(a), 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(coilPts), new THREE.LineBasicMaterial({ color: 0x22d3ee })));
      addLabel(mkSprite("L", "#22d3ee", new THREE.Vector3(3.9, 1.4, 0), 0.5));
      const bField: THREE.Line[] = [];
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(
            Array.from({ length: 24 }, (_, k) => {
              const a = (k / 24) * Math.PI * 2;
              return new THREE.Vector3(3.2, 1.1 * Math.cos(a), 1.1 * Math.sin(a) + (i - 1) * 0.7);
            }),
          ),
          new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true }),
        );
        push(ring);
        bField.push(ring);
      }

      // Energy bars: electric (red) vs magnetic (blue).
      const barE = push(new THREE.Mesh(new THREE.BoxGeometry(0.8, 1, 0.4), new THREE.MeshBasicMaterial({ color: 0xef4444 }))) as THREE.Mesh;
      barE.position.set(-3.6, 0.5, 2.4);
      const barB = push(new THREE.Mesh(new THREE.BoxGeometry(0.8, 1, 0.4), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }))) as THREE.Mesh;
      barB.position.set(-2.6, 0.5, 2.4);
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4.2, 0, 2.4), new THREE.Vector3(-2, 0, 2.4)]), new THREE.LineBasicMaterial({ color: 0x64748b })));
      addLabel(mkSprite("U_E", "#ef4444", new THREE.Vector3(-3.6, 2.6, 2.4), 0.4));
      addLabel(mkSprite("U_B", "#3b82f6", new THREE.Vector3(-2.6, 2.6, 2.4), 0.4));

      // q(t) and i(t) graph above.
      const graph = new THREE.Group();
      graph.position.set(0, 2.9, 0);
      push(graph);
      graph.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.6, 0)]),
        new THREE.LineBasicMaterial({ color: 0x64748b }),
      ));
      const qGeom = new THREE.BufferGeometry();
      qGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(160 * 3), 3));
      const qLine = new THREE.Line(qGeom, new THREE.LineBasicMaterial({ color: 0xef4444 }));
      graph.add(qLine);
      const iGeom = new THREE.BufferGeometry();
      iGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(160 * 3), 3));
      const iLine = new THREE.Line(iGeom, new THREE.LineBasicMaterial({ color: 0x22d3ee }));
      graph.add(iLine);
      addLabel(mkSprite("q (red) · i (cyan)", "#94a3b8", new THREE.Vector3(0, 4.7, 0), 0.55));

      // Animation: q = cos(ωt), i = −sin(ωt) (normalized), energies swap.
      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (animating) t += dt;
        controls.update();

        const q = Math.cos(omega * t);
        const i = -Math.sin(omega * t);
        const uE = q * q;
        const uB = i * i;

        eField.forEach((f) => {
          (f.material as THREE.LineBasicMaterial).opacity = 0.15 + 0.75 * uE;
        });
        bField.forEach((f) => {
          (f.material as THREE.LineBasicMaterial).opacity = 0.15 + 0.75 * uB;
        });
        barE.scale.y = Math.max(0.05, uE);
        barE.position.y = (barE.scale.y * 1) / 2;
        barB.scale.y = Math.max(0.05, uB);
        barB.position.y = (barB.scale.y * 1) / 2;

        // Scrolling graph of q and i over the last 2 periods.
        const n = 159;
        const span = 2 * periodT;
        const qArr = qLine.geometry.attributes.position as THREE.BufferAttribute;
        const iArr = iLine.geometry.attributes.position as THREE.BufferAttribute;
        for (let k = 0; k <= n; k++) {
          const tt = t - span + (k / n) * span;
          const x = -4 + (k / n) * 8;
          qArr.setXYZ(k, x, Math.cos(omega * tt) * 1.2, 0);
          iArr.setXYZ(k, x, -Math.sin(omega * tt) * 1.2, 0);
        }
        qArr.needsUpdate = true;
        iArr.needsUpdate = true;

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
  }, [runId, isWebGL, inductance, capacitance, animating, showLabels]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="LC Oscillations"
        description="Energy sloshing between a capacitor's electric field and an inductor's magnetic field."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>LC Oscillations — Energy Sloshing</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Circuit Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Inductance L (H):</Label>
              <Input type="range" min={0.5} max={5} step={0.1} value={inductance} onChange={(e) => setInductance(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{inductance.toFixed(1)} H</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Capacitance C (F):</Label>
              <Input type="range" min={0.5} max={5} step={0.1} value={capacitance} onChange={(e) => setCapacitance(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{capacitance.toFixed(1)} F</p>
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
            { label: "Angular frequency ω = 1/√(LC)", value: omega.toFixed(2), unit: "rad/s", highlight: true },
            { label: "Frequency f", value: freq.toFixed(2), unit: "Hz" },
            { label: "Period T", value: periodT.toFixed(2), unit: "s" },
            { label: "Energy", value: "U_E + U_B = const", unit: "½Q²/C" },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Charge:</strong> q = Q cos(ωt); <strong className="text-foreground">Current:</strong> i = −ωQ sin(ωt) — i lags q by 90°.</p>
            <p><strong className="text-foreground">Frequency:</strong> ω = 1/√(LC) — set only by L and C.</p>
            <p><strong className="text-foreground">Energy swap:</strong> U_E = q²/2C ↔ U_B = ½Li² — total energy stays constant.</p>
            <p><strong className="text-foreground">Resonance:</strong> an LCR circuit driven at ω = 1/√(LC) oscillates with maximum amplitude.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
