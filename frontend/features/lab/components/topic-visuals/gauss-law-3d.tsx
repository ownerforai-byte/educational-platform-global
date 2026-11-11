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

export function GaussLawVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [chargeType, setChargeType] = useState<"point" | "sphere" | "line">("point");
  const [chargeMag, setChargeMag] = useState(5);
  const [gaussRadius, setGaussRadius] = useState(3);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [showField, setShowField] = useState(true);
  const [runId, setRunId] = useState(0);
  // Speed lives in a ref so changing it never tears down the WebGL scene.
  const speedRef = useRef(1);
  speedRef.current = speed;

  const EPS0 = 8.854e-12;
  const flux = (chargeMag * 1e-6) / EPS0; // N·m²/C
  const eSurface = (9e3 * chargeMag) / (gaussRadius * gaussRadius); // N/C
  const surfArea = 4 * Math.PI * gaussRadius * gaussRadius; // m²

  const DEFAULTS = { chargeType: "point" as const, chargeMag: 5, gaussRadius: 3 };
  const presets: ScenePreset[] = [
    {
      name: "Point charge",
      hint: "Default — a +5 μC point charge inside a 3 m Gaussian sphere.",
      apply: () => { setChargeType("point"); setChargeMag(5); setGaussRadius(3); setRunId((r) => r + 1); },
    },
    {
      name: "Charged sphere",
      hint: "Uniformly charged sphere — flux still depends only on q_enc.",
      apply: () => { setChargeType("sphere"); setChargeMag(8); setGaussRadius(4); setRunId((r) => r + 1); },
    },
    {
      name: "Line charge",
      hint: "Thin charged line — cylindrical symmetry case.",
      apply: () => { setChargeType("line"); setChargeMag(3); setGaussRadius(2); setRunId((r) => r + 1); },
    },
    {
      name: "Large surface",
      hint: "Bigger Gaussian sphere — same flux, weaker E at the surface.",
      apply: () => { setChargeType("point"); setChargeMag(10); setGaussRadius(5); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setChargeType(DEFAULTS.chargeType);
    setChargeMag(DEFAULTS.chargeMag);
    setGaussRadius(DEFAULTS.gaussRadius);
    setSpeed(1);
    setShowLabels(true);
    setShowField(true);
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
      controls.autoRotate = animating;
      controls.autoRotateSpeed = 0.5 * speedRef.current;
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
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { s.visible = showLabels; push(s); labelSprites.push(s); return s; };
      const addField = <T extends THREE.Object3D>(o: T): T => { o.visible = showField; push(o); fieldObjs.push(o); return o; };

      // Central charge
      const charge = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      )) as THREE.Mesh;
      addLabel(mkSprite(`+${chargeMag} μC`, "#ef4444", new THREE.Vector3(0, 1, 0), 0.8));

      // Gaussian surface (sphere)
      const gaussianSphere = push(new THREE.Mesh(
        new THREE.SphereGeometry(gaussRadius, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.1,
          wireframe: true,
        }),
      ));

      // Field lines through Gaussian surface
      const numLines = 16;
      for (let i = 0; i < numLines; i++) {
        const theta = (i / numLines) * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const pts: THREE.Vector3[] = [];
        for (let r = 0.5; r <= gaussRadius + 1; r += 0.15) {
          pts.push(new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          ));
        }
        addField(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 }),
        ));
      }

      // Flux arrow labels
      const fluxLabelPos = new THREE.Vector3(gaussRadius + 1.5, 0, 0);
      const fluxTarget = new THREE.Vector3(gaussRadius, 0, 0);
      const fluxDir = fluxTarget.clone().sub(fluxLabelPos).normalize();
      push(new LiveLeaderLine(fluxDir, fluxLabelPos, fluxLabelPos.distanceTo(fluxTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      addLabel(mkSprite("Φ_E = ∮E·dA = q/ε₀", "#a78bfa", fluxLabelPos.clone().sub(fluxDir.multiplyScalar(0.5)), 0.8));

      const ELabelPos = new THREE.Vector3(0, gaussRadius + 1.5, 0);
      const ETarget = new THREE.Vector3(0, gaussRadius, 0);
      const EDir = ETarget.clone().sub(ELabelPos).normalize();
      push(new LiveLeaderLine(EDir, ELabelPos, ELabelPos.distanceTo(ETarget) * 0.9, 0x34d399, 0.15, 0.1));
      addLabel(mkSprite("E = q/(4πε₀r²)", "#34d399", ELabelPos.clone().sub(EDir.multiplyScalar(0.5)), 0.8));

      const ALabelPos = new THREE.Vector3(-(gaussRadius + 1.5), 0, 0);
      const ATarget = new THREE.Vector3(-gaussRadius, 0, 0);
      const ADir = ATarget.clone().sub(ALabelPos).normalize();
      push(new LiveLeaderLine(ADir, ALabelPos, ALabelPos.distanceTo(ATarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      addLabel(mkSprite("dA (area element)", "#22d3ee", ALabelPos.clone().sub(ADir.multiplyScalar(0.5)), 0.75));

      const update = () => {
        while (meshes.length > 40) {
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
        controls.autoRotateSpeed = 0.5 * speedRef.current;
        controls.update();
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
  }, [chargeType, chargeMag, gaussRadius, isWebGL, animating, runId, showLabels, showField]);

  if (!isWebGL) {
    return <WebGLFallback title="Gauss's Law" description="Electric flux through Gaussian surface." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Gauss's Law — Electric Flux</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Charge Distribution">
          <div className="flex flex-wrap gap-2 mt-1">
            <button onClick={() => setChargeType("point")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${chargeType === "point" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Point Charge</button>
            <button onClick={() => setChargeType("sphere")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${chargeType === "sphere" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Charged Sphere</button>
            <button onClick={() => setChargeType("line")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${chargeType === "line" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Line Charge</button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Enclosed q (μC):</Label>
              <Input type="range" min={1} max={10} step={0.5} value={chargeMag} onChange={(e) => setChargeMag(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{chargeMag} μC</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Surface radius r (m):</Label>
              <Input type="range" min={1} max={5} step={0.5} value={gaussRadius} onChange={(e) => setGaussRadius(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{gaussRadius} m</p>
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
            resetLabel="Reset"
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
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showField ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400" : "border-border bg-muted/40 text-muted-foreground"}`}
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
            { label: "Enclosed charge q", value: chargeMag, unit: "μC" },
            { label: "Flux Φ_E = q/ε₀", value: flux.toExponential(2), unit: "N·m²/C", highlight: true },
            { label: "E at surface", value: eSurface.toFixed(0), unit: "N/C" },
            { label: "Surface area 4πr²", value: surfArea.toFixed(1), unit: "m²" },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Gauss's Law:</strong> Φ_E = ∮E·dA = q_enc/ε₀ — flux through closed surface equals enclosed charge over ε₀.</p>
            <p><strong className="text-foreground">Gaussian surface:</strong> Imaginary closed surface chosen for symmetry.</p>
            <p><strong className="text-foreground">Point charge:</strong> E = q/(4πε₀r²), flux = q/ε₀ through any enclosing sphere.</p>
            <p><strong className="text-foreground">Application:</strong> Finding E for spheres, cylinders, planes using symmetry.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
