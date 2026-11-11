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

export function BiotSavartVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [current, setCurrent] = useState(5);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showField, setShowField] = useState(true);
  const [runId, setRunId] = useState(0);

  // Live readouts from current params: B = μ₀I/(2πr), μ₀/(2π) = 2×10⁻⁷ T·m/A
  const bAt = (r: number) => ((2e-7 * current) / r) * 1e6; // µT
  const DEFAULTS = { current: 5 };
  const presets: ScenePreset[] = [
    {
      name: "Gentle (1 A)",
      hint: "Small current — weak, faint field circles.",
      apply: () => { setCurrent(1); setRunId((r) => r + 1); },
    },
    {
      name: "Standard (5 A)",
      hint: "Typical lab-scale current.",
      apply: () => { setCurrent(5); setRunId((r) => r + 1); },
    },
    {
      name: "Strong (10 A)",
      hint: "Large current — field strength doubles vs 5 A at the same r.",
      apply: () => { setCurrent(10); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setCurrent(DEFAULTS.current);
    setShowLabels(true);
    setShowField(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    const fieldLines: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 5, 8);
      camera.lookAt(0, 0, 0);

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

      // Straight wire (along z-axis)
      const wire = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 8, 12),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8 }),
      )) as THREE.Mesh;
      wire.position.set(0, 0, 0);
      addLabel(mkSprite("Wire (current I)", "#94a3b8", new THREE.Vector3(0, 4.5, 0), 0.7));

      // Current direction arrow
      push(new LiveLeaderLine(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -3, 0), 2, 0xf97316, 0.15, 0.08));
      addLabel(mkSprite(`I = ${current} A`, "#f97316", new THREE.Vector3(1, -3, 0), 0.75));

      // Magnetic field circles around wire
      const fieldRadius = 2;
      for (let r = 1; r <= 3; r++) {
        const circlePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * 2 * Math.PI;
          circlePts.push(new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a)));
        }
        const opacity = 0.3 + (4 - r) * 0.15;
        const circle = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(circlePts),
          new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity })
        ));
        circle.visible = showField;
        fieldLines.push(circle);
      }

      // Field direction arrows (circular around wire)
      const arrowPos = new THREE.Vector3(fieldRadius, 0, 0);
      const arrowDir = new THREE.Vector3(0, 0, 1).normalize();
      const fieldArrow = push(new LiveLeaderLine(arrowDir, arrowPos, 0.8, 0x22d3ee, 0.15, 0.08));
      fieldArrow.visible = showField;
      fieldLines.push(fieldArrow);
      addLabel(mkSprite("B field (circular)", "#22d3ee", new THREE.Vector3(fieldRadius + 1, 0.5, 0), 0.7));

      // Long arrow labels
      const rLabelPos = new THREE.Vector3(fieldRadius + 2, 0, 0);
      const rTarget = new THREE.Vector3(fieldRadius, 0, 0);
      const rDir = rTarget.clone().sub(rLabelPos).normalize();
      push(new LiveLeaderLine(rDir, rLabelPos, rLabelPos.distanceTo(rTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      addLabel(mkSprite("r (distance from wire)", "#fbbf24", rLabelPos.clone().sub(rDir.multiplyScalar(0.5)), 0.75));

      // Biot-Savart formula label
      const formulaLabelPos = new THREE.Vector3(-4, 2.5, 0);
      const formulaTarget = new THREE.Vector3(0, 0, 0);
      const formulaDir = formulaTarget.clone().sub(formulaLabelPos).normalize();
      push(new LiveLeaderLine(formulaDir, formulaLabelPos, formulaLabelPos.distanceTo(formulaTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      addLabel(mkSprite("dB = μ₀Idl×r̂/(4πr²)", "#a78bfa", formulaLabelPos.clone().sub(formulaDir.multiplyScalar(0.5)), 0.75));

      // Ampere's law label
      const ampLabelPos = new THREE.Vector3(-3, -3, 0);
      const ampTarget = new THREE.Vector3(0, 0, 0);
      const ampDir = ampTarget.clone().sub(ampLabelPos).normalize();
      push(new LiveLeaderLine(ampDir, ampLabelPos, ampLabelPos.distanceTo(ampTarget) * 0.9, 0x34d399, 0.15, 0.1));
      addLabel(mkSprite("∮B·dl = μ₀I (Ampere's Law)", "#34d399", ampLabelPos.clone().sub(ampDir.multiplyScalar(0.5)), 0.7));

      // Right-hand grip rule indicator
      const gripLabelPos = new THREE.Vector3(3, 2, 0);
      const gripTarget = new THREE.Vector3(0, 0, 0);
      const gripDir = gripTarget.clone().sub(gripLabelPos).normalize();
      push(new LiveLeaderLine(gripDir, gripLabelPos, gripLabelPos.distanceTo(gripTarget) * 0.9, 0xef4444, 0.15, 0.1));
      addLabel(mkSprite("RHR: thumb→I, fingers→B", "#ef4444", gripLabelPos.clone().sub(gripDir.multiplyScalar(0.5)), 0.7));

      labelSprites.forEach((s) => (s.visible = showLabels));

      const update = () => {
        while (meshes.length > 50) {
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
  }, [current, isWebGL, runId, showLabels, showField]);

  if (!isWebGL) {
    return <WebGLFallback title="Biot-Savart" description="Magnetic field around current-carrying wire." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Biot-Savart Law — Magnetic Field Around Wire</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Current Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Current I (A):</Label>
              <Input type="range" min={1} max={10} step={1} value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{current} A</p>
            </div>
          </div>
        </CollapsibleControls>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowField((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showField ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Field lines
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:text-foreground transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "B at r = 1 m", value: bAt(1).toFixed(2), unit: "µT" },
            { label: "B at r = 2 m", value: bAt(2).toFixed(2), unit: "µT" },
            { label: "Current I", value: current, unit: "A", highlight: current >= 8 },
            { label: "Field geometry", value: "Circular (RHR)" },
          ]}
        />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Biot-Savart Law:</strong> dB = (μ₀/4π)·(I·dl×r̂)/r² — field from a current element.</p>
            <p><strong className="text-foreground">Straight wire:</strong> B = μ₀I/(2πr) — field circles the wire.</p>
            <p><strong className="text-foreground">Right-hand grip rule:</strong> Thumb in current direction, fingers curl in B direction.</p>
            <p><strong className="text-foreground">Ampere's Law:</strong> ∮B·dl = μ₀I — relates field to enclosed current.</p>
            <p><strong className="text-foreground">Circular loop:</strong> B at center = μ₀I/(2R).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
