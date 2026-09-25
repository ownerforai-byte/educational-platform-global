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

export function SemiconductorsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [material, setMaterial] = useState<"insulator" | "semiconductor" | "conductor">("semiconductor");
  const [temp, setTemp] = useState(300);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  // Refs so playback changes never tear down the WebGL scene.
  const speedRef = useRef(1);
  speedRef.current = speed;
  const animatingRef = useRef(true);
  animatingRef.current = animating;
  const [showLabels, setShowLabels] = useState(true);
  const [showCarriers, setShowCarriers] = useState(true);
  const [runId, setRunId] = useState(0);

  // Live readouts: n_i ≈ 5.2×10¹⁵ · T^1.5 · exp(−E_g/2kT) cm⁻³ (intrinsic model).
  const bandGap = material === "insulator" ? 6 : material === "semiconductor" ? 1.1 : 0;
  const kT = 8.617e-5 * temp; // eV
  const ni = bandGap > 0 ? 5.2e15 * Math.pow(temp, 1.5) * Math.exp(-bandGap / (2 * kT)) : Infinity;
  const niText = bandGap === 0 ? "~10²² free e⁻" : ni < 1e-3 ? ni.toExponential(1) : ni.toExponential(2);

  const DEFAULTS = { material: "semiconductor" as const, temp: 300 };
  const presets: ScenePreset[] = [
    {
      name: "Silicon (300 K)",
      hint: "Room-temperature semiconductor — E_g = 1.1 eV, n_i ≈ 10¹⁰ cm⁻³.",
      apply: () => { setMaterial("semiconductor"); setTemp(300); setRunId((r) => r + 1); },
    },
    {
      name: "Heated Si (500 K)",
      hint: "More thermal energy → exponentially more carriers across the gap.",
      apply: () => { setMaterial("semiconductor"); setTemp(500); setRunId((r) => r + 1); },
    },
    {
      name: "Insulator (6 eV)",
      hint: "Huge band gap — virtually no electrons jump at ordinary temperatures.",
      apply: () => { setMaterial("insulator"); setTemp(300); setRunId((r) => r + 1); },
    },
    {
      name: "Conductor (overlap)",
      hint: "Bands overlap — carriers are always free, no gap to cross.",
      apply: () => { setMaterial("conductor"); setTemp(300); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setMaterial(DEFAULTS.material);
    setTemp(DEFAULTS.temp);
    setAnimating(true);
    setSpeed(1);
    setShowLabels(true);
    setShowCarriers(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let electronDot: THREE.Mesh;
    let holeDot: THREE.Mesh;

    const bandGap = material === "insulator" ? 6 : material === "semiconductor" ? 1.1 : 0;
    const gapColor = material === "insulator" ? 0xef4444 : material === "semiconductor" ? 0xfbbf24 : 0x22c55e;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 10);

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

      // Energy axis
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, -4, 0), new THREE.Vector3(-4, 4, 0)]),
        new THREE.LineBasicMaterial({ color: 0x475569 }),
      ));
      addLabel(mkSprite("E (Energy)", "#475569", new THREE.Vector3(-4, 4.5, 0), 0.7));

      // Valence band
      const vbY = -1.5;
      const vb = push(new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.3, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.7 }),
      )) as THREE.Mesh;
      vb.position.set(0, vbY, 0);
      addLabel(mkSprite("Valence Band (VB)", "#3b82f6", new THREE.Vector3(3.2, vbY, 0), 0.75));

      // Conduction band
      const cbY = bandGap > 0 ? -1.5 + bandGap + 0.5 : vbY + 0.3;
      if (bandGap > 0) {
        const cb = push(new THREE.Mesh(
          new THREE.BoxGeometry(5, 0.3, 0.5),
          new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.7 }),
        )) as THREE.Mesh;
        cb.position.set(0, cbY, 0);
        addLabel(mkSprite("Conduction Band (CB)", "#ef4444", new THREE.Vector3(3.2, cbY, 0), 0.75));

        // Band gap
        const gapLine = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.5, vbY + 0.15, 0), new THREE.Vector3(-1.5, cbY - 0.15, 0)]),
          new THREE.LineDashedMaterial({ color: gapColor, dashSize: 0.2, gapSize: 0.1 }),
        ) as any);
        (meshes[meshes.length - 1] as any).computeLineDistances();

        // Long arrow for band gap
        const gapLabelPos = new THREE.Vector3(-2.5, (vbY + cbY) / 2, 0);
        const gapTarget = new THREE.Vector3(-1.5, (vbY + cbY) / 2, 0);
        const gapDir = gapTarget.clone().sub(gapLabelPos).normalize();
        push(new LiveLeaderLine(gapDir, gapLabelPos, gapLabelPos.distanceTo(gapTarget) * 0.9, gapColor, 0.2, 0.12));
        addLabel(mkSprite(`E_g = ${bandGap} eV (band gap)`, "#fbbf24", gapLabelPos.clone().sub(gapDir.multiplyScalar(0.5)), 0.8));
      } else {
        addLabel(mkSprite("Bands overlap (no gap)", "#22c55e", new THREE.Vector3(0, vbY + 1, 0), 0.7));
      }

      // Fermi level
      const efY = bandGap > 0 ? vbY + 0.15 + bandGap / 2 : vbY + 0.15;
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, efY, 0), new THREE.Vector3(2, efY, 0)]),
        new THREE.LineDashedMaterial({ color: 0x22d3ee, dashSize: 0.3, gapSize: 0.15 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();
      addLabel(mkSprite("E_F (Fermi level)", "#22d3ee", new THREE.Vector3(2.5, efY, 0), 0.7));

      // Electron in conduction band (animated)
      if (bandGap > 0) {
        const electron = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
        )) as THREE.Mesh;
        electron.position.set(0, cbY, 0);
        electron.visible = showCarriers;
        electronDot = electron;

        const hole = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        )) as THREE.Mesh;
        hole.position.set(0, vbY, 0);
        hole.visible = showCarriers;
        holeDot = hole;

        // Electron label
        const eLabelPos = new THREE.Vector3(0, cbY + 0.8, 0);
        const eTarget = new THREE.Vector3(0, cbY, 0);
        const eDir = eTarget.clone().sub(eLabelPos).normalize();
        push(new LiveLeaderLine(eDir, eLabelPos, eLabelPos.distanceTo(eTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
        addLabel(mkSprite("e⁻ (electron)", "#22d3ee", eLabelPos.clone().sub(eDir.multiplyScalar(0.5)), 0.75));

        // Hole label
        const hLabelPos = new THREE.Vector3(0, vbY - 0.8, 0);
        const hTarget = new THREE.Vector3(0, vbY, 0);
        const hDir = hTarget.clone().sub(hLabelPos).normalize();
        push(new LiveLeaderLine(hDir, hLabelPos, hLabelPos.distanceTo(hTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
        addLabel(mkSprite("h⁺ (hole)", "#fbbf24", hLabelPos.clone().sub(hDir.multiplyScalar(0.5)), 0.75));
      }

      // Temperature label
      const tempLabelPos = new THREE.Vector3(-3, -4.5, 0);
      const tempTarget = new THREE.Vector3(0, 0, 0);
      const tempDir = tempTarget.clone().sub(tempLabelPos).normalize();
      push(new LiveLeaderLine(tempDir, tempLabelPos, tempLabelPos.distanceTo(tempTarget) * 0.9, 0x34d399, 0.15, 0.1));
      addLabel(mkSprite(`T = ${temp} K`, "#34d399", tempLabelPos.clone().sub(tempDir.multiplyScalar(0.5)), 0.75));

      labelSprites.forEach((s) => (s.visible = showLabels));

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

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (animatingRef.current) {
          animTime += 0.018 * speedRef.current;
        }
        if (electronDot && holeDot) {
          electronDot.position.x = Math.sin(animTime * 2) * 1.8;
          holeDot.position.x = -Math.sin(animTime * 2) * 1.8;
          ((electronDot.material as THREE.Material).opacity = 0.6 + 0.4 * Math.sin(animTime * 3));
          ((holeDot.material as THREE.Material).opacity = 0.6 + 0.4 * Math.sin(animTime * 3 + Math.PI));
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
  }, [material, temp, isWebGL, runId, showLabels, showCarriers]);

  if (!isWebGL) {
    return <WebGLFallback title="Semiconductors" description="Energy band diagram showing conductors, semiconductors, and insulators." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Semiconductors — Energy Band Diagram</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Material Type">
          <div className="flex flex-wrap gap-2 mt-1">
            {([
              ["insulator", "Insulator"],
              ["semiconductor", "Semiconductor"],
              ["conductor", "Conductor"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMaterial(key as typeof material)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  material === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="w-32">
              <Label className="text-xs text-muted-foreground">Temperature T (K):</Label>
              <Input type="range" min={100} max={600} step={10} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{temp} K</p>
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
              onClick={() => setShowCarriers((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showCarriers ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Carriers (e⁻/h⁺)
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Band gap E_g", value: bandGap, unit: "eV", highlight: material === "semiconductor" },
            { label: "Thermal energy kT", value: kT.toFixed(3), unit: "eV" },
            { label: "Intrinsic n_i", value: niText, unit: bandGap === 0 ? "" : "cm⁻³" },
            { label: "Fermi level E_F", value: bandGap > 0 ? "Mid-gap" : "In band (overlap)" },
          ]}
        />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Band theory:</strong> Electrons occupy energy bands separated by band gaps.</p>
            <p><strong className="text-foreground">Valence band:</strong> Filled with electrons at absolute zero — bonding electrons.</p>
            <p><strong className="text-foreground">Conduction band:</strong> Empty at 0K — electrons here conduct current.</p>
            <p><strong className="text-foreground">Band gap (E_g):</strong> Insulators: {'>'}5 eV; Semiconductors: ~1 eV; Conductors: overlap (0 eV).</p>
            <p><strong className="text-foreground">Doping:</strong> Adding impurities creates n-type (extra electrons) or p-type (holes).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
