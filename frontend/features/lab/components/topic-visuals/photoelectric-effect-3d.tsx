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

export function PhotoelectricEffectVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [wavelength, setWavelength] = useState(400);
  const [workFunc, setWorkFunc] = useState(2.3);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [showElectrons, setShowElectrons] = useState(true);
  const [runId, setRunId] = useState(0);
  // Speed lives in a ref so changing it never tears down the WebGL scene.
  const speedRef = useRef(1);
  speedRef.current = speed;

  const h = 6.626e-34;
  const c = 3e8;
  const eV = 1.602e-19;
  const thresholdWL = (h * c) / (workFunc * eV);
  const thresholdFreq = (workFunc * eV) / h;
  const photonEnergyEV = (h * c) / (wavelength * 1e-9) / eV;
  const canEmitNow = photonEnergyEV > workFunc;
  const keMaxEV = canEmitNow ? photonEnergyEV - workFunc : 0;
  const stoppingPotential = keMaxEV; // numerically equal in volts

  const DEFAULTS = { wavelength: 400, workFunc: 2.3 };
  const presets: ScenePreset[] = [
    {
      name: "Sodium · violet",
      hint: "λ = 400 nm on sodium (Φ = 2.3 eV) — emission with moderate KE_max.",
      apply: () => { setWavelength(400); setWorkFunc(2.3); setRunId((r) => r + 1); },
    },
    {
      name: "UV on zinc",
      hint: "λ = 250 nm vs Φ = 4.3 eV — energetic UV photon beats a large work function.",
      apply: () => { setWavelength(250); setWorkFunc(4.3); setRunId((r) => r + 1); },
    },
    {
      name: "At threshold",
      hint: "hν ≈ Φ — electrons barely escape with KE_max ≈ 0.",
      apply: () => { setWavelength(496); setWorkFunc(2.5); setRunId((r) => r + 1); },
    },
    {
      name: "No emission (red)",
      hint: "λ = 650 nm with Φ = 3.5 eV — hν < Φ, nothing ejects at any intensity.",
      apply: () => { setWavelength(650); setWorkFunc(3.5); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setWavelength(DEFAULTS.wavelength);
    setWorkFunc(DEFAULTS.workFunc);
    setSpeed(1);
    setShowLabels(true);
    setShowElectrons(true);
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
    let photonTime = 0;
    const emittedElectrons: { mesh: THREE.Mesh; vel: number }[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 10);

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

      const photonEnergy = (h * c) / (wavelength * 1e-9);
      const photonEnergyEV = photonEnergy / 1.602e-19;
      const canEmit = photonEnergyEV > workFunc;
      const keMax = canEmit ? photonEnergyEV - workFunc : 0;

      // Metal plate (cathode)
      const plate = push(new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.3, 1.5),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8 }),
      )) as THREE.Mesh;
      plate.position.set(0, -1, 0);
      addLabel(mkSprite("Metal Surface (Cathode)", "#94a3b8", new THREE.Vector3(0, -2, 0), 0.7));

      // Work function label with long arrow
      const wfLabelPos = new THREE.Vector3(3, 1.5, 0);
      const wfTarget = new THREE.Vector3(0, -1, 0);
      const wfDir = wfTarget.clone().sub(wfLabelPos).normalize();
      push(new LiveLeaderLine(wfDir, wfLabelPos, wfLabelPos.distanceTo(wfTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      addLabel(mkSprite(`Φ = ${workFunc} eV (work function)`, "#fbbf24", wfLabelPos.clone().sub(wfDir.multiplyScalar(0.5)), 0.75));

      // Photon incoming
      const photonColor = wavelength < 450 ? 0x3b82f6 : wavelength < 550 ? 0x22c55e : wavelength < 650 ? 0xf97316 : 0xef4444;
      const photon = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color: photonColor }),
      )) as THREE.Mesh;

      // Photon label with long arrow
      const phLabelPos = new THREE.Vector3(-3, 2.5, 0);
      const phTarget = new THREE.Vector3(-2, 0, 0);
      const phDir = phTarget.clone().sub(phLabelPos).normalize();
      push(new LiveLeaderLine(phDir, phLabelPos, phLabelPos.distanceTo(phTarget) * 0.9, photonColor, 0.2, 0.1));
      addLabel(mkSprite(`hν = ${photonEnergyEV.toFixed(2)} eV`, photonColor === 0x3b82f6 ? "#60a5fa" : photonColor === 0x22c55e ? "#4ade80" : photonColor === 0xf97316 ? "#fb923c" : "#f87171", phLabelPos.clone().sub(phDir.multiplyScalar(0.5)), 0.8));

      // Wavelength label
      const wlLabelPos = new THREE.Vector3(-3, 3.5, 0);
      const wlTarget = new THREE.Vector3(-2, 0, 0);
      const wlDir = wlTarget.clone().sub(wlLabelPos).normalize();
      push(new LiveLeaderLine(wlDir, wlLabelPos, wlLabelPos.distanceTo(wlTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      addLabel(mkSprite(`λ = ${wavelength} nm`, "#a78bfa", wlLabelPos.clone().sub(wlDir.multiplyScalar(0.5)), 0.75));

      // Collected electrons
      for (let i = 0; i < 5; i++) {
        const e = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
        )) as THREE.Mesh;
        e.userData.phase = i * 0.8;
        e.visible = canEmit;
        emittedElectrons.push({ mesh: e, vel: canEmit ? 1 + keMax * 0.3 : 0 });
        meshes.push(e);
      }

      // KE label
      if (canEmit) {
        const keLabelPos = new THREE.Vector3(3, 2, 0);
        const keTarget = new THREE.Vector3(0, 0, 0);
        const keDir = keTarget.clone().sub(keLabelPos).normalize();
        push(new LiveLeaderLine(keDir, keLabelPos, keLabelPos.distanceTo(keTarget) * 0.9, 0x34d399, 0.15, 0.1));
        addLabel(mkSprite(`KE_max = ${keMax.toFixed(2)} eV`, "#34d399", keLabelPos.clone().sub(keDir.multiplyScalar(0.5)), 0.8));
      } else {
        const noEmitLabelPos = new THREE.Vector3(0, 2.5, 0);
        addLabel(mkSprite("No emission! (hν < Φ)", "#ef4444", noEmitLabelPos, 0.8));
      }

      // Einstein's equation
      const eqLabelPos = new THREE.Vector3(-4, -0.5, 0);
      const eqTarget = new THREE.Vector3(0, 0, 0);
      const eqDir = eqTarget.clone().sub(eqLabelPos).normalize();
      push(new LiveLeaderLine(eqDir, eqLabelPos, eqLabelPos.distanceTo(eqTarget) * 0.9, 0xef4444, 0.15, 0.1));
      addLabel(mkSprite("hν = Φ + KE_max (Einstein)", "#ef4444", eqLabelPos.clone().sub(eqDir.multiplyScalar(0.5)), 0.7));

      const update = () => {
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }
      };
      update();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (animating) {
          photonTime += 0.02 * speedRef.current;
        }

        // Animate photon
        photon.position.set(-4 + photonTime * 2 % 8, 1.5 - Math.sin(photonTime * 3) * 0.3, 0);
        if (photon.position.x > 0) {
          photon.position.x = -4;
        }

        // Animate electrons if emission occurs
        emittedElectrons.forEach((el) => {
          if (canEmit && showElectrons) {
            el.mesh.visible = true;
            const t = (photonTime * el.vel + el.mesh.userData.phase) % 3;
            el.mesh.position.set(-2 + t * 2, -1 + t * 1.5, Math.sin(t * 4) * 0.3);
          } else {
            el.mesh.visible = false;
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
  }, [wavelength, workFunc, isWebGL, runId, animating, showLabels, showElectrons]);

  if (!isWebGL) {
    return <WebGLFallback title="Photoelectric Effect" description="Photon striking metal surface ejecting electrons." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Photoelectric Effect — Einstein's Equation</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Experiment Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Wavelength λ (nm):</Label>
              <Input type="range" min={200} max={700} step={10} value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{wavelength} nm</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Work function Φ (eV):</Label>
              <Input type="range" min={1} max={5} step={0.1} value={workFunc} onChange={(e) => setWorkFunc(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{workFunc} eV</p>
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
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowElectrons((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showElectrons ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Electrons
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Photon energy hν", value: photonEnergyEV.toFixed(2), unit: "eV", highlight: canEmitNow },
            { label: "Work function Φ", value: workFunc.toFixed(1), unit: "eV" },
            { label: "Max KE", value: keMaxEV.toFixed(2), unit: "eV" },
            { label: "Stopping potential", value: stoppingPotential.toFixed(2), unit: "V" },
            { label: "Threshold freq ν₀", value: `${(thresholdFreq / 1e14).toFixed(2)}`, unit: "×10¹⁴ Hz" },
            { label: "Threshold λ", value: (thresholdWL * 1e9).toFixed(0), unit: "nm", highlight: !canEmitNow },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Einstein's equation:</strong> hν = Φ + KE_max — photon energy = work function + max kinetic energy.</p>
            <p><strong className="text-foreground">Work function (Φ):</strong> Minimum energy needed to remove an electron from metal surface.</p>
            <p><strong className="text-foreground">Threshold frequency:</strong> ν₀ = Φ/h — below this, no emission regardless of intensity.</p>
            <p><strong className="text-foreground">Intensity effect:</strong> More photons → more electrons, but same KE_max.</p>
            <p><strong className="text-foreground">Frequency effect:</strong> Higher ν → higher KE_max (linear relationship).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
