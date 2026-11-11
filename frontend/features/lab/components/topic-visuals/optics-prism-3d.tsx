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

export default function OpticsPrism3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [prismAngle, setPrismAngle] = useState(60);
  const [wavelength, setWavelength] = useState(550);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showNormals, setShowNormals] = useState(true);
  const [runId, setRunId] = useState(0);

  // Live readouts from current params (same n model as the scene labels)
  const nGlass = wavelength < 450 ? 1.53 : wavelength < 550 ? 1.52 : 1.51;
  const apexRad = (prismAngle * Math.PI) / 180;
  const sinHalf = nGlass * Math.sin(apexRad / 2);
  const minDevDeg = sinHalf <= 1
    ? (2 * Math.asin(sinHalf) - apexRad) * (180 / Math.PI)
    : NaN;
  const colorName = wavelength < 450 ? "Violet/Blue" : wavelength < 500 ? "Blue-Green" : wavelength < 580 ? "Green-Yellow" : wavelength < 650 ? "Orange" : "Red";

  const DEFAULTS = { prismAngle: 60, wavelength: 550 };
  const presets: ScenePreset[] = [
    {
      name: "Equilateral (60°)",
      hint: "The standard 60° glass prism with green light.",
      apply: () => { setPrismAngle(60); setWavelength(550); setRunId((r) => r + 1); },
    },
    {
      name: "Right-angle (90°)",
      hint: "Large apex angle — strong deviation, used in periscopes.",
      apply: () => { setPrismAngle(90); setWavelength(550); setRunId((r) => r + 1); },
    },
    {
      name: "Shallow (30°)",
      hint: "Thin prism — small deviation, δ ≈ (n − 1)A.",
      apply: () => { setPrismAngle(30); setWavelength(550); setRunId((r) => r + 1); },
    },
    {
      name: "Violet (400 nm)",
      hint: "Short wavelength — highest n, bends the most.",
      apply: () => { setPrismAngle(60); setWavelength(400); setRunId((r) => r + 1); },
    },
    {
      name: "Red (700 nm)",
      hint: "Long wavelength — lowest n, bends the least.",
      apply: () => { setPrismAngle(60); setWavelength(700); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setPrismAngle(DEFAULTS.prismAngle);
    setWavelength(DEFAULTS.wavelength);
    setShowLabels(true);
    setShowNormals(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x064e3b);
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const labelSprites: THREE.Sprite[] = [];
    const addLabel = (s: THREE.Sprite): THREE.Sprite => {
      scene.add(s);
      s.visible = showLabels;
      labelSprites.push(s);
      return s;
    };

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

    const apexAngle = (prismAngle * Math.PI) / 180;
    const prismGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1.5, -1, 0,  1.5, -1, 0,  0, 1.5 * Math.tan(apexAngle / 2), 0,
    ]);
    prismGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    prismGeo.computeVertexNormals();
    const prismMesh = new THREE.Mesh(prismGeo, new THREE.MeshPhongMaterial({
      color: 0x10b981, transparent: true, opacity: 0.6, side: THREE.DoubleSide,
    }));
    scene.add(prismMesh);

    const prismEdge = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.5, -1, 0), new THREE.Vector3(0, 1.5 * Math.tan(apexAngle / 2), 0),
        new THREE.Vector3(1.5, -1, 0), new THREE.Vector3(-1.5, -1, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x34d399 })
    );
    scene.add(prismEdge);

    // Add refractive index label
    const nLabel = addLabel(mkSprite("n=" + (wavelength < 450 ? 1.53 : wavelength < 550 ? 1.52 : 1.51), "#10b981"));
    nLabel.position.set(0, -2.2, 0);

    // Deviation angle arc
    const devArcPoints = [];
    for (let a = 0; a <= Math.PI / 3; a += 0.05) {
      devArcPoints.push(new THREE.Vector3(0.5 * Math.cos(a), -0.5 + 0.5 * Math.sin(a), 0));
    }
    const devArc = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(devArcPoints),
      new THREE.LineBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(devArc);
    const devLabel = addLabel(mkSprite("δ", "#22d3ee"));
    devLabel.position.set(0.7, -0.3, 0);

    // Entry and exit angle markers
    const entryNormal = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.75, -0.5, 0), new THREE.Vector3(-0.75, 0.5, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.6 })
    );
    entryNormal.visible = showNormals;
    scene.add(entryNormal);
    const exitNormal = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.75, -0.5, 0), new THREE.Vector3(0.75, 0.5, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.6 })
    );
    exitNormal.visible = showNormals;
    scene.add(exitNormal);

    const updateRays = () => {
      const ray = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-4, 0.5, 0), new THREE.Vector3(-0.5, -0.2, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xf59e0b })
      );
      scene.add(ray);
      const dev = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.5, -0.2, 0), new THREE.Vector3(3, -1.5, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x22d3ee })
      );
      scene.add(dev);
      const sp = addLabel(mkSprite(prismAngle + "°", "#34d399"));
      sp.position.set(0, 2, 0);
      const wl = addLabel(mkSprite(wavelength + "nm", "#fbbf24"));
      wl.position.set(1.5, -1.2, 0);
      return { ray, dev, devArc, entryNormal, exitNormal };
    };

    const rayHelpers = updateRays();
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
      prismGeo.dispose();
      prismMesh.material.dispose();
      prismEdge.geometry.dispose();
      prismEdge.material.dispose();
      rayHelpers.ray.geometry.dispose();
      rayHelpers.ray.material.dispose();
      rayHelpers.dev.geometry.dispose();
      rayHelpers.dev.material.dispose();
      if (rayHelpers.devArc) {
        rayHelpers.devArc.geometry.dispose();
        rayHelpers.devArc.material.dispose();
      }
      if (rayHelpers.entryNormal) { rayHelpers.entryNormal.geometry.dispose(); rayHelpers.entryNormal.material.dispose(); }
      if (rayHelpers.exitNormal) { rayHelpers.exitNormal.geometry.dispose(); rayHelpers.exitNormal.material.dispose(); }
      nLabel.material.map?.dispose();
      nLabel.material.dispose();
      devLabel.material.map?.dispose();
      devLabel.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [prismAngle, wavelength, isWebGL, runId, showLabels, showNormals]);

  if (!isWebGL) return <WebGLFallback title="Prism" />;

  return (
    <Card className="border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-emerald-300">
          Optics: Prism & Deviation
          <span className="block text-xs font-normal text-emerald-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[clamp(320px,60vh,640px)] w-full rounded-md overflow-hidden mb-4">
          <VizToolbar targetRef={vizTargetRef} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-emerald-900 bg-emerald-900/40 text-emerald-400/60"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowNormals((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showNormals ? "border-teal-400/50 bg-teal-400/10 text-teal-300" : "border-emerald-900 bg-emerald-900/40 text-emerald-400/60"}`}
            >
              Normals
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-emerald-900 bg-emerald-900/40 text-emerald-300 hover:bg-emerald-800/50 transition-colors"
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
        </div>
        <ReadoutGrid
          className="mb-4"
          items={[
            { label: "Apex angle A", value: prismAngle, unit: "°" },
            { label: "Refractive index n", value: nGlass.toFixed(2) },
            { label: "Min deviation δₘ", value: Number.isFinite(minDevDeg) ? minDevDeg.toFixed(1) : "— (TIR inside)", unit: Number.isFinite(minDevDeg) ? "°" : undefined, highlight: Number.isFinite(minDevDeg) },
            { label: "Wavelength λ", value: wavelength, unit: `nm (${colorName})` },
          ]}
        />
        <CollapsibleControls label="Prism Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-emerald-300">Prism Apex Angle (°)</Label>
              <Input type="number" min={10} max={90} value={prismAngle}
                onChange={(e) => setPrismAngle(Number(e.target.value))}
                className="bg-emerald-900/50 border-emerald-700 text-emerald-100" />
              <p className="text-xs text-emerald-400">{prismAngle}°</p>
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-300">Wavelength (nm)</Label>
              <Input type="number" min={380} max={750} value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="bg-emerald-900/50 border-emerald-700 text-emerald-100" />
              <p className="text-xs text-emerald-400">{wavelength} nm</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-emerald-500 bg-emerald-950/50 text-emerald-200 text-sm space-y-2">
          <p className="font-semibold text-emerald-300">Prism Deviation</p>
          <p>δ = i + e - A  (A = prism angle)</p>
          <p className="font-semibold text-emerald-300 mt-2">Minimum Deviation</p>
          <p>n = sin((A+δₘ)/2) / sin(A/2)</p>
          <p className="font-semibold text-emerald-300 mt-2">Dispersion Power</p>
          <p>ω = (nᵥ - nᵣ) / (n_y - 1)  (violet to red)</p>
          <p className="font-semibold text-emerald-300 mt-2">Direct Vision Prism</p>
          <p>Multiple prisms arranged to disperse without net deviation</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsPrism3d };
