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

const rainbowColors = ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0088ff", "#0000ff", "#8800ff"];
const rainbowLabels = ["R", "O", "Y", "G", "B", "I", "V"];

export default function OpticsDispersion3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [prismAngle, setPrismAngle] = useState(60);
  const [incAngle, setIncAngle] = useState(50);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showRays, setShowRays] = useState(true);
  const [runId, setRunId] = useState(0);

  // Live readouts — minimum-deviation estimate for red (n≈1.51) and violet (n≈1.53)
  const apexRad = (prismAngle * Math.PI) / 180;
  const minDev = (n: number) => {
    const s = n * Math.sin(apexRad / 2);
    return s <= 1 ? (2 * Math.asin(s) - apexRad) * (180 / Math.PI) : NaN;
  };
  const devRed = minDev(1.51);
  const devViolet = minDev(1.53);
  const angularSpread = devRed - devViolet;

  const DEFAULTS = { prismAngle: 60, incAngle: 50 };
  const presets: ScenePreset[] = [
    {
      name: "Equilateral (60°)",
      hint: "Standard 60° crown-glass prism — balanced spread.",
      apply: () => { setPrismAngle(60); setIncAngle(50); setRunId((r) => r + 1); },
    },
    {
      name: "Wide prism (90°)",
      hint: "Large apex angle — maximum separation of colors.",
      apply: () => { setPrismAngle(90); setIncAngle(40); setRunId((r) => r + 1); },
    },
    {
      name: "Shallow prism (30°)",
      hint: "Thin prism — small spread, δ ≈ (n − 1)A per color.",
      apply: () => { setPrismAngle(30); setIncAngle(60); setRunId((r) => r + 1); },
    },
    {
      name: "Steep incidence (75°)",
      hint: "Near-grazing entry — strong bending at the first face.",
      apply: () => { setPrismAngle(60); setIncAngle(75); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setPrismAngle(DEFAULTS.prismAngle);
    setIncAngle(DEFAULTS.incAngle);
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
    scene.background = new THREE.Color(0x1e1b4b);
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
      color: 0x6366f1, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
    }));
    scene.add(prismMesh);

    const prismEdge = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.5, -1, 0), new THREE.Vector3(0, 1.5 * Math.tan(apexAngle / 2), 0),
        new THREE.Vector3(1.5, -1, 0), new THREE.Vector3(-1.5, -1, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xa5b4fc })
    );
    scene.add(prismEdge);

    const whiteRay = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0.3, 0), new THREE.Vector3(-0.3, -0.3, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    whiteRay.visible = showRays;
    scene.add(whiteRay);

    const spread = 0.6;
    const dispersingRays = rainbowColors.map((color, i) => {
      const offset = (i - 3) * spread / 3;
      const endX = 3 + offset * 0.3;
      const endY = -1.2 + offset;
      const ray = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.3, -0.3, 0),
          new THREE.Vector3(endX, endY, 0),
        ]),
        new THREE.LineBasicMaterial({ color })
      );
      ray.visible = showRays;
      scene.add(ray);
      const sp = addLabel(mkSprite(rainbowLabels[i], color));
      sp.position.set(endX + 0.3, endY, 0);
      return ray;
    });

    const spLabel = addLabel(mkSprite("White Light", "#ffffff"));
    spLabel.position.set(-2.5, 0.6, 0);
    const spSpec = addLabel(mkSprite("Spectrum", "#f0abfc"));
    spSpec.position.set(2.5, 1.2, 0);

    // Wavelength legend
    const wlLegend = addLabel(mkSprite("380-750nm", "#a78bfa"));
    wlLegend.position.set(0, -2, 0);

    // Prism material label
    const matLabel = addLabel(mkSprite("Glass (n~1.52)", "#34d399"));
    matLabel.position.set(0, -1.8, 0);

    const incArc: THREE.Line | null = null;
    const incLabel: THREE.Sprite | null = null;

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
      prismGeo.dispose();
      prismMesh.material.dispose();
      prismEdge.geometry.dispose();
      prismEdge.material.dispose();
      whiteRay.geometry.dispose();
      whiteRay.material.dispose();
      dispersingRays.forEach((r) => { r.geometry.dispose(); r.material.dispose(); });
      wlLegend.material.map?.dispose();
      wlLegend.material.dispose();
      matLabel.material.map?.dispose();
      matLabel.material.dispose();
      spLabel.material.map?.dispose();
      spLabel.material.dispose();
      spSpec.material.map?.dispose();
      spSpec.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [prismAngle, incAngle, isWebGL, runId, showLabels, showRays]);

  if (!isWebGL) return <WebGLFallback title="Dispersion" />;

  return (
    <Card className="border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300">
          Optics: Dispersion of Light
          <span className="block text-xs font-normal text-purple-400/70 mt-1">
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
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-purple-900 bg-purple-900/40 text-purple-400/60"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowRays((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showRays ? "border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-300" : "border-purple-900 bg-purple-900/40 text-purple-400/60"}`}
            >
              Rays
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-purple-900 bg-purple-900/40 text-purple-300 hover:bg-purple-800/50 transition-colors"
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
            { label: "Angle of incidence θᵢ", value: incAngle, unit: "°" },
            { label: "δₘ red (n=1.51)", value: Number.isFinite(devRed) ? devRed.toFixed(1) : "—", unit: Number.isFinite(devRed) ? "°" : undefined },
            { label: "δₘ violet (n=1.53)", value: Number.isFinite(devViolet) ? devViolet.toFixed(1) : "—", unit: Number.isFinite(devViolet) ? "°" : undefined, highlight: Number.isFinite(devViolet) },
            { label: "Angular spread (δV − δR)", value: Number.isFinite(angularSpread) ? angularSpread.toFixed(2) : "—", unit: Number.isFinite(angularSpread) ? "°" : undefined },
          ]}
        />
        <CollapsibleControls label="Prism Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-purple-300">Prism Apex Angle (°)</Label>
              <Input type="number" min={10} max={90} value={prismAngle}
                onChange={(e) => setPrismAngle(Number(e.target.value))}
                className="bg-purple-900/50 border-purple-700 text-purple-100" />
              <p className="text-xs text-purple-400">{prismAngle}°</p>
            </div>
            <div className="space-y-2">
              <Label className="text-purple-300">Angle of Incidence (°)</Label>
              <Input type="number" min={10} max={80} value={incAngle}
                onChange={(e) => setIncAngle(Number(e.target.value))}
                className="bg-purple-900/50 border-purple-700 text-purple-100" />
              <p className="text-xs text-purple-400">{incAngle}°</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-purple-500 bg-purple-950/50 text-purple-200 text-sm space-y-2">
          <p className="font-semibold text-purple-300">Dispersion</p>
          <p>Different wavelengths refract by different amounts</p>
          <p className="font-semibold text-purple-300 mt-2">Caused by</p>
          <p>n varies with wavelength: n(violet) {'>'} n(red)</p>
          <p className="font-semibold text-purple-300 mt-2">Newton's Discovery</p>
          <p>Isaac Newton showed white light is composed of all colors</p>
          <p className="font-semibold text-purple-300 mt-2">Recombination</p>
          <p>A second inverted prism recombines spectrum back to white light</p>
          <p className="font-semibold text-purple-300 mt-2">Cauchy's Equation</p>
          <p>n(λ) = A + B/λ² + C/λ⁴  (empirical dispersion relation)</p>
          <p className="font-semibold text-purple-300 mt-2">Chromatic Aberration</p>
          <p>Lenses focus different colors at different points</p>
          <p className="font-semibold text-purple-300 mt-2">Rainbow Formation</p>
          <p>Water droplets act as prisms, dispersing sunlight into spectra</p>
          <div className="flex gap-1 mt-2">
            {rainbowColors.map((c, i) => (
              <div key={i} className="w-6 h-3 rounded" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsDispersion3d };
