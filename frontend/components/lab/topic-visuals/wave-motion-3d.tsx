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

export function WaveMotionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [waveType, setWaveType] = useState<"transverse" | "longitudinal">("transverse");
  const [wavelength, setWavelength] = useState(3);
  const [amplitude, setAmplitude] = useState(1);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showEquilibrium, setShowEquilibrium] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [runId, setRunId] = useState(0);

  // Live readouts — the animation advances phase at ~1.8 time-units/s at 60 fps,
  // so the drawn wave has f ≈ 1.8 Hz and v = fλ.
  const waveFreq = 1.8;
  const waveSpeed = waveFreq * wavelength;
  const waveK = (2 * Math.PI) / wavelength;

  const DEFAULTS = { waveType: "transverse" as const, wavelength: 3, amplitude: 1 };
  const presets: ScenePreset[] = [
    {
      name: "Default transverse",
      hint: "Mid-range wavelength and amplitude — the classic sine shape.",
      apply: () => { setWaveType("transverse"); setWavelength(3); setAmplitude(1); setRunId((r) => r + 1); },
    },
    {
      name: "Long wavelength",
      hint: "Stretched-out wave — low wave number k = 2π/λ, fast wave speed.",
      apply: () => { setWaveType("transverse"); setWavelength(6); setAmplitude(0.8); setRunId((r) => r + 1); },
    },
    {
      name: "Short & tall",
      hint: "Tight wavelength with a big amplitude — steep, energetic wave.",
      apply: () => { setWaveType("transverse"); setWavelength(1.5); setAmplitude(2); setRunId((r) => r + 1); },
    },
    {
      name: "Longitudinal (sound)",
      hint: "Particles oscillate along propagation — compressions and rarefactions.",
      apply: () => { setWaveType("longitudinal"); setWavelength(4); setAmplitude(1.2); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setWaveType(DEFAULTS.waveType);
    setWavelength(DEFAULTS.wavelength);
    setAmplitude(DEFAULTS.amplitude);
    setSpeed(1);
    setShowEquilibrium(true);
    setShowVectors(true);
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
    const vectorObjs: THREE.Object3D[] = [];
    let time = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 12);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 25;
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
      const addVector = <T extends THREE.Object3D>(o: T): T => { push(o); vectorObjs.push(o); o.visible = showVectors; return o; };

      // Equilibrium line
      const eqLine = push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]),
        new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.3, gapSize: 0.2 }),
      ) as any);
      (eqLine as any).computeLineDistances();
      eqLine.visible = showEquilibrium;
      addLabel(mkSprite("Equilibrium", "#475569", new THREE.Vector3(8, 0.4, 0), 0.6));

      // Wave particles
      const particles: THREE.Mesh[] = [];
      const numParticles = 40;
      for (let i = 0; i < numParticles; i++) {
        const p = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
        )) as THREE.Mesh;
        p.userData.idx = i;
        particles.push(p);
      }

      // Long arrow labels
      const λLabelPos = new THREE.Vector3(0, -2.5, 0);
      const λTarget = new THREE.Vector3(wavelength, 0, 0);
      const λDir = λTarget.clone().sub(λLabelPos).normalize();
      addVector(new LiveLeaderLine(λDir, λLabelPos, λLabelPos.distanceTo(λTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      addLabel(mkSprite(`λ = ${wavelength} m (wavelength)`, "#fbbf24", λLabelPos.clone().sub(λDir.multiplyScalar(0.5)), 0.8));

      const ALabelPos = new THREE.Vector3(wavelength / 2, amplitude + 1, 0);
      const ATarget = new THREE.Vector3(wavelength / 2, 0, 0);
      const ADir = ATarget.clone().sub(ALabelPos).normalize();
      addVector(new LiveLeaderLine(ADir, ALabelPos, ALabelPos.distanceTo(ATarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      addLabel(mkSprite(`A = ${amplitude} m (amplitude)`, "#a78bfa", ALabelPos.clone().sub(ADir.multiplyScalar(0.5)), 0.75));

      // Wave type label
      const typeLabelPos = new THREE.Vector3(-5, 3.5, 0);
      const typeTarget = new THREE.Vector3(0, 0, 0);
      const typeDir = typeTarget.clone().sub(typeLabelPos).normalize();
      addVector(new LiveLeaderLine(typeDir, typeLabelPos, typeLabelPos.distanceTo(typeTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      addLabel(mkSprite(
        waveType === "transverse" ? "Transverse: displacement ⟂ propagation" : "Longitudinal: displacement ∥ propagation",
        "#22d3ee", typeLabelPos.clone().sub(typeDir.multiplyScalar(0.5)), 0.7
      ));

      // Wave equation
      const eqLabelPos = new THREE.Vector3(5, 3.5, 0);
      const eqTarget = new THREE.Vector3(0, 0, 0);
      const eqDir = eqTarget.clone().sub(eqLabelPos).normalize();
      addVector(new LiveLeaderLine(eqDir, eqLabelPos, eqLabelPos.distanceTo(eqTarget) * 0.9, 0x34d399, 0.15, 0.1));
      addLabel(mkSprite("y = A sin(kx − ωt)", "#34d399", eqLabelPos.clone().sub(eqDir.multiplyScalar(0.5)), 0.75));

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

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (animating) {
          time += 0.03 * speedRef.current;
        }
        particles.forEach((p) => {
          const i = p.userData.idx;
          const x = -10 + (i / numParticles) * 20;
          if (waveType === "transverse") {
            p.position.set(x, amplitude * Math.sin(2 * Math.PI * (x - time * wavelength) / wavelength), 0);
          } else {
            const compression = Math.cos(2 * Math.PI * (x - time * wavelength) / wavelength);
            p.position.set(x + compression * 0.3, 0, 0);
            p.scale.setScalar(1 + Math.abs(compression) * 0.5);
          }
        });
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
  }, [waveType, wavelength, amplitude, isWebGL, animating, runId, showEquilibrium, showVectors]);

  if (!isWebGL) {
    return <WebGLFallback title="Wave Motion" description="Transverse and longitudinal wave animations." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Wave Motion — Transverse & Longitudinal</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Wave Type">
          <div className="flex flex-wrap gap-2 mt-1">
            <button onClick={() => setWaveType("transverse")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${waveType === "transverse" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Transverse</button>
            <button onClick={() => setWaveType("longitudinal")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${waveType === "longitudinal" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Longitudinal</button>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Wave Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Wavelength λ:</Label>
              <Input type="range" min={1} max={6} step={0.5} value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{wavelength} m</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Amplitude A:</Label>
              <Input type="range" min={0.3} max={2} step={0.1} value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{amplitude} m</p>
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
              onClick={() => setShowEquilibrium((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showEquilibrium ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Equilibrium
            </button>
            <button
              onClick={() => setShowVectors((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showVectors ? "border-amber-500/50 bg-amber-500/10 text-amber-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Arrows
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Wavelength λ", value: wavelength.toFixed(1), unit: "m" },
            { label: "Amplitude A", value: amplitude.toFixed(1), unit: "m" },
            { label: "Wave number k", value: waveK.toFixed(2), unit: "rad/m" },
            { label: "Wave speed v = fλ", value: waveSpeed.toFixed(1), unit: "m/s", highlight: waveType === "longitudinal" },
          ]}
        />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Transverse wave:</strong> Particle displacement ⟂ to wave propagation (light, strings).</p>
            <p><strong className="text-foreground">Longitudinal wave:</strong> Particle displacement ∥ to propagation (sound, springs).</p>
            <p><strong className="text-foreground">Wavelength (λ):</strong> Distance between consecutive crests/compressions.</p>
            <p><strong className="text-foreground">Wave equation:</strong> y = A sin(kx − ωt) where k = 2π/λ, ω = 2πf.</p>
            <p><strong className="text-foreground">Wave speed:</strong> v = fλ = ω/k.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
