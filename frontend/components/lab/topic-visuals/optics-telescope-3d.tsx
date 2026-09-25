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

function mkSprite(text: string, color: string, scale = 0.3) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = 256;
  canvas.height = 64;
  ctx.fillStyle = color;
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 32);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(scale * 4, scale, 1);
  return sprite;
}

export default function OpticsTelescope3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [fObjective, setFObjective] = useState(50);
  const [fEyepiece, setFEyepiece] = useState(5);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showRays, setShowRays] = useState(true);
  const [runId, setRunId] = useState(0);

  const mag = fObjective / fEyepiece;
  const tubeLength = fObjective + fEyepiece;

  const presets: ScenePreset[] = [
    {
      name: "Astronomical 20×",
      hint: "Long objective, medium eyepiece — classic refractor for planets.",
      apply: () => { setFObjective(100); setFEyepiece(5); setRunId((r) => r + 1); },
    },
    {
      name: "Compact 10×",
      hint: "Shorter tube — handier, dimmer view.",
      apply: () => { setFObjective(50); setFEyepiece(5); setRunId((r) => r + 1); },
    },
    {
      name: "High power 50×",
      hint: "Very short eyepiece focal length — maximum angular magnification.",
      apply: () => { setFObjective(100); setFEyepiece(2); setRunId((r) => r + 1); },
    },
    {
      name: "Low power 3×",
      hint: "Wide-field, bright view — like opera glasses.",
      apply: () => { setFObjective(30); setFEyepiece(10); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setFObjective(50);
    setFEyepiece(5);
    setShowLabels(true);
    setShowRays(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);
    const labelSprites: THREE.Sprite[] = [];
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    let controls: any;
    import("three/addons/controls/OrbitControls.js").then((mod) => {
      controls = new mod.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      vizTargetRef.current = {
        controls,
        el: container,
        canvasEl: renderer.domElement,
        setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)),
      };
      controls.dampingFactor = 0.08;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(3, 5, 3);
    scene.add(dir);

    const objLens = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0x64748b, transparent: true, opacity: 0.6 })
    );
    objLens.rotation.z = Math.PI / 2;
    objLens.position.set(-2.5, 0, 0);
    scene.add(objLens);

    const eyeLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.6 })
    );
    eyeLens.rotation.z = Math.PI / 2;
    eyeLens.position.set(2.5, 0, 0);
    scene.add(eyeLens);

    const tube = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.1, 0.1),
      new THREE.MeshPhongMaterial({ color: 0x475569 })
    );
    tube.position.set(0, 0, 0);
    scene.add(tube);

    // Objective housing
    const objHousing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.8, 0.5, 16),
      new THREE.MeshPhongMaterial({ color: 0x64748b })
    );
    objHousing.rotation.z = Math.PI / 2;
    objHousing.position.set(-2.5, -0.3, 0);
    scene.add(objHousing);

    // Eyepiece housing
    const eyeHousing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.5, 0.4, 16),
      new THREE.MeshPhongMaterial({ color: 0x475569 })
    );
    eyeHousing.rotation.z = Math.PI / 2;
    eyeHousing.position.set(2.5, -0.3, 0);
    scene.add(eyeHousing);

    let ray1: THREE.Line;
    let spMag: THREE.Sprite | null = null;
    let incArc: THREE.Line | null = null;
    let eyeF: THREE.Mesh | null = null;
    let eyeFLabel: THREE.Sprite | null = null;

    const updateRays = () => {
      const mag = fObjective / fEyepiece;

      if (ray1) { scene.remove(ray1); ray1.geometry.dispose(); if (!(ray1.material instanceof Array)) ray1.material.dispose(); }
      ray1 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-5, 0.3, 0), new THREE.Vector3(-2.5, 0.15, 0),
          new THREE.Vector3(0, 0, 0), new THREE.Vector3(2.5, -0.15 * mag, 0),
          new THREE.Vector3(5, -0.3 * mag, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xfbbf24 })
      );
      ray1.visible = showRays;
      scene.add(ray1);

      const sp1 = mkSprite("Objective", "#94a3b8");
      scene.add(sp1);
      sp1.position.set(-2.5, -1.2, 0);
      sp1.visible = showLabels;
      labelSprites.push(sp1);
      const sp2 = mkSprite("Eyepiece", "#cbd5e1");
      scene.add(sp2);
      sp2.position.set(2.5, -1.2, 0);
      sp2.visible = showLabels;
      labelSprites.push(sp2);

      if (spMag) { scene.remove(spMag); spMag.material.map?.dispose(); spMag.material.dispose(); }
      spMag = mkSprite("M=" + mag.toFixed(1) + "×", "#fbbf24");
      scene.add(spMag);
      spMag.position.set(0, -1.5, 0);
      spMag.visible = showLabels;
      labelSprites.push(spMag);

      const incArcPts: THREE.Vector3[] = [];
      for (let a = Math.PI; a >= Math.PI - 0.3; a -= 0.02) {
        incArcPts.push(new THREE.Vector3(0.5 * Math.cos(a), 0.5 * Math.sin(a) - 0.5, 0));
      }
      if (incArc) { scene.remove(incArc); incArc.geometry.dispose(); if (!(incArc.material instanceof Array)) incArc.material.dispose(); }
      incArc = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(incArcPts),
        new THREE.LineBasicMaterial({ color: 0xfbbf24 })
      );
      incArc.visible = showRays;
      scene.add(incArc);

      if (eyeF) { scene.remove(eyeF); eyeF.geometry.dispose(); if (!(eyeF.material instanceof Array)) eyeF.material.dispose(); }
      eyeF = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 12),
        new THREE.MeshPhongMaterial({ color: 0x94a3b8 })
      );
      eyeF.position.set(2.5 + fEyepiece / 10, 0, 0);
      scene.add(eyeF);

      if (eyeFLabel) { scene.remove(eyeFLabel); eyeFLabel.material.map?.dispose(); eyeFLabel.material.dispose(); }
      eyeFLabel = mkSprite("Fₑ", "#cbd5e1");
      scene.add(eyeFLabel);
      eyeFLabel.position.set(2.5 + fEyepiece / 10, -0.4, 0);
      eyeFLabel.visible = showLabels;
      labelSprites.push(eyeFLabel);
    };

    updateRays();

    const animate = () => {
      const id = requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
      return id;
    };
    const frameId = animate();

    return () => {
      cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      objLens.geometry.dispose();
      objLens.material.dispose();
      eyeLens.geometry.dispose();
      eyeLens.material.dispose();
      tube.geometry.dispose();
      tube.material.dispose();
      objHousing.geometry.dispose();
      objHousing.material.dispose();
      eyeHousing.geometry.dispose();
      eyeHousing.material.dispose();
      ray1.geometry.dispose();
      if (!(ray1.material instanceof Array)) ray1.material.dispose();
      if (incArc) { incArc.geometry.dispose(); if (!(incArc.material instanceof Array)) incArc.material.dispose(); }
      if (eyeF) { eyeF.geometry.dispose(); if (!(eyeF.material instanceof Array)) eyeF.material.dispose(); }
      labelSprites.forEach((s) => { s.material.map?.dispose(); s.material.dispose(); });
      renderer.dispose();
      controls?.dispose();
    };
  }, [fObjective, fEyepiece, isWebGL, runId, showLabels, showRays]);

  if (!isWebGL) return <WebGLFallback title="Telescope" />;

  return (
    <Card className="border-slate-500/30">
      <CardHeader>
        <CardTitle className="text-slate-300">
          Optics: Refracting Telescope
          <span className="block text-xs font-normal text-slate-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[clamp(320px,60vh,640px)] w-full rounded-md overflow-hidden mb-4">
          <VizToolbar targetRef={vizTargetRef} />
        </div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-slate-400/50 bg-slate-400/10 text-slate-200" : "border-slate-700 bg-slate-800/40 text-slate-500"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowRays((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showRays ? "border-amber-500/50 bg-amber-500/10 text-amber-300" : "border-slate-700 bg-slate-800/40 text-slate-500"}`}
            >
              Rays
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-600 bg-slate-700/40 text-slate-200 hover:bg-slate-600/50 transition-colors"
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
          <ScenePresets presets={presets} />
        </div>
        <CollapsibleControls label="Lens Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Objective Focal Length (cm)</Label>
              <Input type="number" step={1} min={10} max={100} value={fObjective}
                onChange={(e) => setFObjective(Number(e.target.value))}
                className="bg-slate-900/50 border-slate-700 text-slate-100" />
              <p className="text-xs text-slate-400">{fObjective} cm</p>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Eyepiece Focal Length (cm)</Label>
              <Input type="number" step={0.5} min={1} max={15} value={fEyepiece}
                onChange={(e) => setFEyepiece(Number(e.target.value))}
                className="bg-slate-900/50 border-slate-700 text-slate-100" />
              <p className="text-xs text-slate-400">{fEyepiece} cm</p>
            </div>
          </div>
        </CollapsibleControls>
        <ReadoutGrid
          className="mt-4"
          items={[
            { label: "Angular magnification M", value: mag.toFixed(1), unit: "×", highlight: mag >= 20 },
            { label: "Tube length (fₒ + fₑ)", value: tubeLength.toFixed(1), unit: "cm" },
            { label: "Objective power", value: (100 / fObjective).toFixed(2), unit: "D" },
            { label: "Eyepiece power", value: (100 / fEyepiece).toFixed(1), unit: "D" },
          ]}
        />
        <div className="mt-4 p-3 rounded-lg border-l-4 border-slate-500 bg-slate-950/50 text-slate-200 text-sm space-y-2">
          <p className="font-semibold text-slate-300">Angular Magnification</p>
          <p>M = fₒ / fₑ</p>
          <p className="font-semibold text-slate-300 mt-2">Tube Length</p>
          <p>L = fₒ + fₑ (for normal adjustment)</p>
          <p className="font-semibold text-slate-300 mt-2">Aperture</p>
          <p>Larger objective diameter collects more light → brighter image</p>
          <p className="font-semibold text-slate-300 mt-2">Resolution</p>
          <p>θ_min = 1.22λ/D (Rayleigh criterion)</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsTelescope3d };
