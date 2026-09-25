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

export function EMIInductionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [speed, setSpeed] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  // PlaybackBar animation-rate multiplier (separate from the magnet-speed slider).
  const [animSpeed, setAnimSpeed] = useState(1);
  const animSpeedRef = useRef(1);
  animSpeedRef.current = animSpeed;
  const [showLabels, setShowLabels] = useState(true);
  const [showField, setShowField] = useState(true);
  const [runId, setRunId] = useState(0);
  // Live physics readouts published (throttled) from the animation loop.
  const [live, setLive] = useState({ x: 6, flux: 0, emf: 0, approaching: true });

  // Faraday model: N = 20 turns, coil radius 1.5 m, dipole magnet (μ₀·2m/4π ≈ 2×10⁻⁴ T·m³).
  const TURNS = 20;
  const COIL_AREA = Math.PI * 1.5 * 1.5;
  const fluxAt = (x: number) => {
    const d = Math.max(Math.abs(x), 0.6);
    return (TURNS * COIL_AREA * 2e-4) / (d * d * d); // Wb
  };

  const DEFAULTS = { speed: 2 };
  const presets: ScenePreset[] = [
    {
      name: "Slow push (0.5)",
      hint: "Gentle magnet motion — small, easily-traced emf.",
      apply: () => { setSpeed(0.5); setAnimating(true); setRunId((r) => r + 1); },
    },
    {
      name: "Standard (2)",
      hint: "Typical lab shuttle speed.",
      apply: () => { setSpeed(2); setAnimating(true); setRunId((r) => r + 1); },
    },
    {
      name: "Fast shuttle (5)",
      hint: "Rapid motion — dΦ/dt is large, so the induced emf spikes.",
      apply: () => { setSpeed(5); setAnimating(true); setRunId((r) => r + 1); },
    },
    {
      name: "Frozen (paused)",
      hint: "No motion → no flux change → zero induced emf.",
      apply: () => { setAnimating(false); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setSpeed(DEFAULTS.speed);
    setAnimating(true);
    setAnimSpeed(1);
    setShowLabels(true);
    setShowField(true);
    setLive({ x: 6, flux: 0, emf: 0, approaching: true });
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let magnetX = 6;
    let direction = -1;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 3, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
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
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      // Coil (solenoid)
      const coilRadius = 1.5;
      const coilLength = 4;
      const turns = 20;
      for (let i = 0; i < turns; i++) {
        const t = i / (turns - 1);
        const x = -2 + t * coilLength;
        const coilRing = push(new THREE.Mesh(
          new THREE.TorusGeometry(coilRadius, 0.05, 8, 32),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        )) as THREE.Mesh;
        coilRing.position.set(x, 0, 0);
        coilRing.rotation.y = Math.PI / 2;
      }
      addLabel(mkSprite("Coil (solenoid)", "#fbbf24", new THREE.Vector3(0, 2.5, 0), 0.7));

      // Magnetic field lines through coil
      const fieldLinePts: THREE.Vector3[] = [];
      for (let x = -4; x <= 4; x += 0.2) {
        fieldLinePts.push(new THREE.Vector3(x, 0, 0));
      }
      const bField = push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(fieldLinePts),
        new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.2, gapSize: 0.15 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();
      bField.visible = showField;

      // N and S labels on coil
      addLabel(mkSprite("N", "#ef4444", new THREE.Vector3(2.3, 0, 0), 0.8));
      addLabel(mkSprite("S", "#3b82f6", new THREE.Vector3(-2.3, 0, 0), 0.8));

      // Bar magnet
      const magnetGroup = new THREE.Group();
      const northPole = push(new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.6, 0.6),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      ));
      northPole.position.set(0.5, 0, 0);
      magnetGroup.add(northPole);
      const southPole = push(new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.6, 0.6),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      ));
      southPole.position.set(-0.5, 0, 0);
      magnetGroup.add(southPole);
      magnetGroup.position.set(magnetX, 0, 0);
      meshes.push(magnetGroup);

      // Magnet labels with long arrows
      const nLabelPos = new THREE.Vector3(magnetX, 1.5, 0);
      const nTarget = new THREE.Vector3(magnetX + 0.5, 0, 0);
      const nDir = nTarget.clone().sub(nLabelPos).normalize();
      push(new LiveLeaderLine(nDir, nLabelPos, nLabelPos.distanceTo(nTarget) * 0.9, 0xef4444, 0.2, 0.12));
      addLabel(mkSprite("N pole (North)", "#ef4444", nLabelPos.clone().sub(nDir.multiplyScalar(0.5)), 0.75));

      const sLabelPos = new THREE.Vector3(magnetX, -1.5, 0);
      const sTarget = new THREE.Vector3(magnetX - 0.5, 0, 0);
      const sDir = sTarget.clone().sub(sLabelPos).normalize();
      push(new LiveLeaderLine(sDir, sLabelPos, sLabelPos.distanceTo(sTarget) * 0.9, 0x3b82f6, 0.2, 0.12));
      addLabel(mkSprite("S pole (South)", "#3b82f6", sLabelPos.clone().sub(sDir.multiplyScalar(0.5)), 0.75));

      // Induced current arrow
      const indLabelPos = new THREE.Vector3(0, -3, 0);
      const indTarget = new THREE.Vector3(0, 0, 0);
      const indDir = indTarget.clone().sub(indLabelPos).normalize();
      push(new LiveLeaderLine(indDir, indLabelPos, indLabelPos.distanceTo(indTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      addLabel(mkSprite("Induced EMF & current", "#22d3ee", indLabelPos.clone().sub(indDir.multiplyScalar(0.5)), 0.75));

      // Galvanometer
      const galv = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.2, 24),
        new THREE.MeshBasicMaterial({ color: 0x475569 }),
      )) as THREE.Mesh;
      galv.position.set(0, -2.5, 1);
      galv.rotation.x = Math.PI / 2;
      addLabel(mkSprite("G", "#475569", new THREE.Vector3(0, -2.5, 1.5), 0.7));

      labelSprites.forEach((s) => (s.visible = showLabels));

      const update = () => {
        while (meshes.length > 60) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }
      };
      update();

      let prevFlux = fluxAt(magnetX);
      let frameCount = 0;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (animating) {
          const step = speed * animSpeedRef.current;
          magnetX += step * 0.03 * direction;
          if (magnetX < -5 || magnetX > 5) direction *= -1;
          magnetGroup.position.set(magnetX, 0, 0);

          // Faraday's law: ε = |dΦ/dt| with Φ from the dipole model.
          const dt = 0.016 * step;
          const flux = fluxAt(magnetX);
          const emf = Math.abs((flux - prevFlux) / dt);
          prevFlux = flux;
          if (++frameCount % 10 === 0) {
            setLive({ x: magnetX, flux, emf, approaching: magnetX * direction < 0 });
          }
        }
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
      // Re-fit the canvas whenever the container itself resizes (screen fit)
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        resizeObserver?.disconnect();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [speed, animating, isWebGL, runId, showLabels, showField]);

  if (!isWebGL) {
    return <WebGLFallback title="EM Induction" description="Coil + magnet animation showing electromagnetic induction." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Electromagnetic Induction — Coil & Magnet</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Induction Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Speed:</Label>
              <Input type="range" min={0.5} max={5} step={0.5} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{speed.toFixed(1)}</p>
            </div>
          </div>
        </CollapsibleControls>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <PlaybackBar
            playing={animating}
            onPlayToggle={() => setAnimating(!animating)}
            speed={animSpeed}
            onSpeedChange={setAnimSpeed}
            onReset={resetAll}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowField((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showField ? "border-purple-500/50 bg-purple-500/10 text-purple-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Field line
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Magnet position x", value: live.x.toFixed(2), unit: "m" },
            { label: "Flux Φ (N·B·A)", value: (live.flux * 1000).toFixed(3), unit: "mWb" },
            { label: "Induced emf ε", value: (live.emf * 1000).toFixed(2), unit: "mV", highlight: live.emf > 0.001 },
            { label: "Flux change", value: live.approaching ? "Increasing → oppose" : "Decreasing → support" },
          ]}
        />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Faraday's Law:</strong> ε = −N(dΦ/dt) — induced EMF proportional to rate of change of flux.</p>
            <p><strong className="text-foreground">Lenz's Law:</strong> Induced current opposes the change in flux that produced it (conservation of energy).</p>
            <p><strong className="text-foreground">Magnetic flux:</strong> Φ = B·A·cosθ — flux through a surface.</p>
            <p><strong className="text-foreground">Moving magnet toward coil:</strong> Flux increases → induced current creates opposing field.</p>
            <p><strong className="text-foreground">Moving magnet away:</strong> Flux decreases → induced current tries to maintain flux.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
