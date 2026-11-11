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

export default function OpticsLensMaker3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [R1, setR1] = useState(5);
  const [R2, setR2] = useState(-5);
  const [n, setN] = useState(1.5);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [runId, setRunId] = useState(0);

  const curvatureTerm = 1 / R1 - 1 / R2;
  const fCalc = 1 / ((n - 1) * curvatureTerm);
  const powerD = Number.isFinite(fCalc) ? 100 / fCalc : 0;

  const presets: ScenePreset[] = [
    {
      name: "Biconvex",
      hint: "Symmetric converging lens — R₁ > 0, R₂ < 0.",
      apply: () => { setR1(10); setR2(-10); setN(1.5); setRunId((r) => r + 1); },
    },
    {
      name: "Plano-convex",
      hint: "One flat surface — R₂ → ∞ (large value).",
      apply: () => { setR1(10); setR2(1000); setN(1.5); setRunId((r) => r + 1); },
    },
    {
      name: "Meniscus",
      hint: "Both centres on the same side — weak converging lens.",
      apply: () => { setR1(10); setR2(20); setN(1.5); setRunId((r) => r + 1); },
    },
    {
      name: "Dense flint glass",
      hint: "Higher refractive index → shorter focal length for the same geometry.",
      apply: () => { setR1(8); setR2(-8); setN(1.8); setRunId((r) => r + 1); },
    },
    {
      name: "Biconcave (diverging)",
      hint: "Negative focal length — rays spread out.",
      apply: () => { setR1(-10); setR2(10); setN(1.5); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setR1(5);
    setR2(-5);
    setN(1.5);
    setShowLabels(true);
    setShowGuides(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2e1065);
    const labelSprites: THREE.Sprite[] = [];
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 6);
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

    const f = 1 / ((n - 1) * (1 / R1 - 1 / R2));
    const lensProfile = new THREE.Shape();
    const h2 = 1.5;
    const thickness = Math.min(Math.abs(f) * 0.3, 0.8);
    lensProfile.moveTo(-thickness / 2, -h2);
    lensProfile.lineTo(thickness / 2, -h2);
    lensProfile.lineTo(thickness / 2, h2);
    lensProfile.lineTo(-thickness / 2, h2);
    lensProfile.closePath();

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 };
    const lensGeo = new THREE.ExtrudeGeometry(lensProfile, extrudeSettings);
    const lensMat = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6, transparent: true, opacity: 0.7, side: THREE.DoubleSide,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    scene.add(lens);

    const r1Line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0, 0.3), new THREE.Vector3(-1, 0, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0xf472b6 })
    );
    scene.add(r1Line);
    const r2Line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(1, 0, 0.3), new THREE.Vector3(4, 0, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(r2Line);

    const sp1 = mkSprite("R₁=" + R1, "#f472b6");
    scene.add(sp1);
    sp1.position.set(-3, 0.5, 0.3);
    sp1.visible = showLabels;
    labelSprites.push(sp1);
    const sp2 = mkSprite("R₂=" + R2, "#22d3ee");
    scene.add(sp2);
    sp2.position.set(3, 0.5, 0.3);
    sp2.visible = showLabels;
    labelSprites.push(sp2);
    const spF = mkSprite("f=" + f.toFixed(2), "#a78bfa");
    scene.add(spF);
    spF.position.set(0, -2, 0.3);
    spF.visible = showLabels;
    labelSprites.push(spF);

    const axisLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, 0, 0.3), new THREE.Vector3(5, 0, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x94a3b8 })
    );
    scene.add(axisLine);

    // Secondary axis (vertical)
    const vertLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -2.5, 0.3), new THREE.Vector3(0, 2.5, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6b7280, transparent: true, opacity: 0.5 })
    );
    vertLine.visible = showGuides;
    scene.add(vertLine);

    // Scale markers along axis
    const scaleLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, -2.5, 0.3), new THREE.Vector3(4, -2.5, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6b7280 })
    );
    scaleLine.visible = showGuides;
    scene.add(scaleLine);
    for (let i = -4; i <= 4; i++) {
      const sTick = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i, -2.6, 0.3), new THREE.Vector3(i, -2.4, 0.3),
        ]),
        new THREE.LineBasicMaterial({ color: 0x6b7280 })
      );
      sTick.visible = showGuides;
      scene.add(sTick);
    }

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      lensGeo.dispose();
      lensMat.dispose();
      r1Line.geometry.dispose();
      r1Line.material.dispose();
      r2Line.geometry.dispose();
      r2Line.material.dispose();
      axisLine.geometry.dispose();
      axisLine.material.dispose();
      vertLine.geometry.dispose();
      vertLine.material.dispose();
      scaleLine.geometry.dispose();
      scaleLine.material.dispose();
      labelSprites.forEach((s) => { s.material.map?.dispose(); s.material.dispose(); });
      renderer.dispose();
      controls?.dispose();
    };
  }, [R1, R2, n, isWebGL, runId, showLabels, showGuides]);

  if (!isWebGL) return <WebGLFallback title="Lens Maker" />;

  return (
    <Card className="border-violet-500/30">
      <CardHeader>
        <CardTitle className="text-violet-300">
          Optics: Lens Maker&apos;s Equation
          <span className="block text-xs font-normal text-violet-400/70 mt-1">
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
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-violet-500/50 bg-violet-500/10 text-violet-300" : "border-violet-900 bg-violet-900/30 text-violet-400/60"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowGuides((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showGuides ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-violet-900 bg-violet-900/30 text-violet-400/60"}`}
            >
              Guides
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-violet-900 bg-violet-900/40 text-violet-300 hover:bg-violet-800/50 transition-colors"
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
          <ScenePresets presets={presets} />
        </div>
        <CollapsibleControls label="Lens Geometry">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-violet-300">R₁ (Front Radius, cm)</Label>
              <Input type="number" step={0.5} min={0.5} max={20} value={R1}
                onChange={(e) => setR1(Number(e.target.value))}
                className="bg-violet-900/50 border-violet-700 text-violet-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-violet-300">R₂ (Back Radius, cm)</Label>
              <Input type="number" step={0.5} min={-20} max={20} value={R2}
                onChange={(e) => setR2(Number(e.target.value))}
                className="bg-violet-900/50 border-violet-700 text-violet-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-violet-300">Refractive Index (n)</Label>
              <Input type="number" step={0.01} min={1.01} max={2.5} value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="bg-violet-900/50 border-violet-700 text-violet-100" />
              <p className="text-xs text-violet-400">{n}</p>
            </div>
          </div>
        </CollapsibleControls>
        <ReadoutGrid
          className="mt-4"
          items={[
            { label: "Focal length f", value: Number.isFinite(fCalc) ? fCalc.toFixed(2) : "∞", unit: "cm", highlight: fCalc > 0 },
            { label: "Power P", value: powerD.toFixed(2), unit: "D" },
            { label: "Curvature (1/R₁ − 1/R₂)", value: curvatureTerm.toFixed(4), unit: "cm⁻¹" },
            { label: "Refractive index n", value: n.toFixed(2) },
          ]}
        />
        <div className="mt-4 p-3 rounded-lg border-l-4 border-violet-500 bg-violet-950/50 text-violet-200 text-sm space-y-2">
          <p className="font-semibold text-violet-300">Lens Maker&apos;s Equation</p>
          <p>1/f = (n-1)(1/R₁ - 1/R₂)</p>
          <p className="font-semibold text-violet-300 mt-2">Sign Convention</p>
          <p>Positive R: convex surface  |  Negative R: concave surface</p>
          <p className="font-semibold text-violet-300 mt-2">Lens Types</p>
          <p>Biconvex: R₁{'>'}0, R₂{'<'}0  |  Plano-convex: R₂=∞</p>
          <p className="font-semibold text-violet-300 mt-2">Thin Lens Approximation</p>
          <p>Thickness {'<<'} radii of curvature assumed</p>
          <p className="font-semibold text-violet-300 mt-2">Material Dependence</p>
          <p>Higher n → shorter focal length for same geometry</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsLensMaker3d };
