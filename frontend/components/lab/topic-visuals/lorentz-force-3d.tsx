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
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

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

/**
 * Lorentz force — a charged particle moving in a uniform magnetic field.
 * F = q(v x B): v perpendicular to B gives a circle, an angled v gives a helix.
 * NEB Class 12 Magnetism: "Lorentz force and motion of charged particles in
 * magnetic fields".
 */
export function LorentzForceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [velocity, setVelocity] = useState(3);
  const [field, setField] = useState(2);
  const [pitchAngle, setPitchAngle] = useState(0);
  const [chargeSign, setChargeSign] = useState<1 | -1>(1);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [showFieldLines, setShowFieldLines] = useState(true);
  const [runId, setRunId] = useState(0);

  // m = 1, q = 1 in scene units: r = mv_perp/(qB) = v_perp/B, T = 2*pi/B.
  const vPerp = velocity * Math.cos((pitchAngle * Math.PI) / 180);
  const vPar = velocity * Math.sin((pitchAngle * Math.PI) / 180);
  const radius = field > 0 ? vPerp / field : 0;
  const period = field > 0 ? (2 * Math.PI) / field : 0;

  const DEFAULTS = { velocity: 3, field: 2, pitchAngle: 0 };
  const presets: ScenePreset[] = [
    { name: "Circle (v perp B)", hint: "Pure circular motion - the classic cyclotron orbit.", apply: () => { setVelocity(3); setField(2); setPitchAngle(0); setChargeSign(1); setRunId((r) => r + 1); } },
    { name: "Helix (angled v)", hint: "v has a component along B - the path becomes a helix.", apply: () => { setVelocity(3.4); setField(2); setPitchAngle(35); setChargeSign(1); setRunId((r) => r + 1); } },
    { name: "Strong field", hint: "Bigger B -> tighter radius (r = mv/qB).", apply: () => { setVelocity(3); setField(4); setPitchAngle(0); setChargeSign(1); setRunId((r) => r + 1); } },
    { name: "Negative charge", hint: "q < 0 reverses the sense of rotation.", apply: () => { setVelocity(3); setField(2); setPitchAngle(0); setChargeSign(-1); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setVelocity(DEFAULTS.velocity);
    setField(DEFAULTS.field);
    setPitchAngle(DEFAULTS.pitchAngle);
    setChargeSign(1);
    setSpeed(1);
    setShowLabels(true);
    setShowFieldLines(true);
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
    const fieldObjs: THREE.Object3D[] = [];
    let phase = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
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
      const addField = <T extends THREE.Object3D>(o: T): T => { o.visible = showFieldLines; push(o); fieldObjs.push(o); return o; };

      // Uniform B field along +Y: vertical arrow lines.
      for (let x = -4; x <= 4; x += 2) {
        for (let z = -4; z <= 4; z += 2) {
          addField(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, -4, z), new THREE.Vector3(x, 4, z)]),
            new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.35 }),
          ));
        }
      }
      addLabel(mkSprite("B up", "#60a5fa", new THREE.Vector3(4.6, 3.4, 0), 0.7));

      const particle = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 24, 24),
        new THREE.MeshStandardMaterial({ color: chargeSign > 0 ? 0xef4444 : 0x3b82f6, emissive: chargeSign > 0 ? 0xef4444 : 0x3b82f6, emissiveIntensity: 0.6, roughness: 0.3 }),
      ) as THREE.Mesh);
      addLabel(mkSprite(chargeSign > 0 ? "+q" : "-q", chargeSign > 0 ? "#ef4444" : "#3b82f6", new THREE.Vector3(0, 0, 0), 0.5));

      const vArrow = new LiveLeaderLine(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1.6, 0xf97316, 0.4, 0.25);
      push(vArrow);
      const fArrow = new LiveLeaderLine(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1.6, 0x22d3ee, 0.4, 0.25);
      push(fArrow);

      const trailGeom = new THREE.BufferGeometry();
      trailGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(600 * 3), 3));
      const trail = push(new THREE.Line(trailGeom, new THREE.LineBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.7 })) as THREE.Line);
      const points: THREE.Vector3[] = [];

      const omega = field * (chargeSign > 0 ? 1 : -1);
      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (!animating) { controls.update(); renderer.render(scene, camera); return; }

        phase += omega * dt;
        const x = radius * Math.cos(phase);
        const z = radius * Math.sin(phase);
        const y = vPar * phase / Math.abs(omega || 1);
        particle.position.set(x, y, z);
        const label = labelSprites[1];
        if (label) label.position.copy(particle.position);

        const tangent = new THREE.Vector3(-Math.sin(phase), 0, Math.cos(phase)).multiplyScalar(vPerp);
        tangent.y = vPar;
        vArrow.position.copy(particle.position);
        vArrow.setDirection(tangent.normalize());
        const radial = new THREE.Vector3(-Math.cos(phase), 0, -Math.sin(phase));
        if (chargeSign < 0) radial.multiplyScalar(-1);
        fArrow.position.copy(particle.position);
        fArrow.setDirection(radial);

        points.push(particle.position.clone());
        if (points.length > 600) points.shift();
        const arr = trail.geometry.attributes.position as THREE.BufferAttribute;
        const n = points.length;
        for (let i = 0; i < n; i++) { const p = points[i]; arr.setXYZ(i, p.x, p.y, p.z); }
        arr.needsUpdate = true;
        trail.geometry.setDrawRange(0, n);

        controls.update();
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
  }, [runId, isWebGL, velocity, field, pitchAngle, chargeSign, animating, showLabels, showFieldLines]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="Lorentz Force"
        description="Motion of a charged particle in a uniform magnetic field — circular and helical paths."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Lorentz Force — Charged Particle in a Magnetic Field</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Motion Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Speed v:</Label>
              <Input type="range" min={0.5} max={6} step={0.1} value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{velocity.toFixed(1)}</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Field B:</Label>
              <Input type="range" min={0.5} max={5} step={0.1} value={field} onChange={(e) => setField(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{field.toFixed(1)}</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Pitch angle θ:</Label>
              <Input type="range" min={0} max={80} step={1} value={pitchAngle} onChange={(e) => setPitchAngle(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{pitchAngle}°</p>
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
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setChargeSign((s) => (s > 0 ? -1 : 1))}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${chargeSign > 0 ? "border-red-500/50 bg-red-500/10 text-red-400" : "border-blue-500/50 bg-blue-500/10 text-blue-400"}`}
            >
              Charge: {chargeSign > 0 ? "+q" : "−q"}
            </button>
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowFieldLines((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showFieldLines ? "border-sky-500/50 bg-sky-500/10 text-sky-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Field lines
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Radius r = mv⊥/qB", value: radius.toFixed(2), unit: "u", highlight: true },
            { label: "Period T = 2πm/qB", value: period.toFixed(2), unit: "s" },
            { label: "v⊥ (perpendicular)", value: vPerp.toFixed(2), unit: "u/s" },
            { label: "v∥ (along B)", value: vPar.toFixed(2), unit: "u/s" },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Lorentz force:</strong> F = q(v × B) — always perpendicular to both v and B.</p>
            <p><strong className="text-foreground">No work done:</strong> F ⊥ v means the speed stays constant; the field only bends the path.</p>
            <p><strong className="text-foreground">Circular motion:</strong> v ⊥ B gives r = mv/(qB) and T = 2πm/(qB).</p>
            <p><strong className="text-foreground">Helical motion:</strong> a component of v along B adds uniform drift — the path becomes a helix.</p>
            <p><strong className="text-foreground">Sign of charge:</strong> q &lt; 0 reverses the sense of rotation.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
