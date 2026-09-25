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

// Fixed optical-tube geometry used for the magnification readouts.
const TUBE_LENGTH_CM = 16;
const NEAR_POINT_CM = 25;

export default function OpticsMicroscope3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [fObjective, setFObjective] = useState(1);
  const [fEyepiece, setFEyepiece] = useState(2.5);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showRays, setShowRays] = useState(true);
  const [runId, setRunId] = useState(0);

  const mObj = TUBE_LENGTH_CM / fObjective;
  const mEye = NEAR_POINT_CM / fEyepiece;
  const mTotal = mObj * mEye;

  const presets: ScenePreset[] = [
    {
      name: "Scanning 4×",
      hint: "Long focal lengths — wide field of view for locating the specimen.",
      apply: () => { setFObjective(4); setFEyepiece(10); setRunId((r) => r + 1); },
    },
    {
      name: "Low power 40×",
      hint: "Typical classroom observation setting.",
      apply: () => { setFObjective(2); setFEyepiece(5); setRunId((r) => r + 1); },
    },
    {
      name: "High power 160×",
      hint: "Short objective focal length — fine cellular detail.",
      apply: () => { setFObjective(1); setFEyepiece(2.5); setRunId((r) => r + 1); },
    },
    {
      name: "Oil immersion 800×",
      hint: "Very short fₒ — maximum useful magnification with oil immersion.",
      apply: () => { setFObjective(0.2); setFEyepiece(1); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setFObjective(1);
    setFEyepiece(2.5);
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
    scene.background = new THREE.Color(0x831843);
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
      new THREE.CylinderGeometry(1.2, 1.2, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0xe879f9, transparent: true, opacity: 0.6 })
    );
    objLens.rotation.z = Math.PI / 2;
    objLens.position.set(-1, -1, 0);
    scene.add(objLens);

    const eyeLens = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0xf472b6, transparent: true, opacity: 0.6 })
    );
    eyeLens.rotation.z = Math.PI / 2;
    eyeLens.position.set(2, 1, 0);
    scene.add(eyeLens);

    const tube = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.15, 0.15),
      new THREE.MeshPhongMaterial({ color: 0xf9a8d4 })
    );
    tube.position.set(0.5, 0, 0);
    scene.add(tube);

    // Stage for specimen
    const stage = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.05, 0.5),
      new THREE.MeshPhongMaterial({ color: 0xf472b6 })
    );
    stage.position.set(-2, -2.5, 0);
    scene.add(stage);

    // Light source
    const light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16),
      new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.5 })
    );
    light.rotation.z = Math.PI / 2;
    light.position.set(-3, -2.8, 0);
    scene.add(light);

    const updateRays = () => {
      const points = [
        new THREE.Vector3(-3.5, -2, 0),
        new THREE.Vector3(-1, -1, 0),
        new THREE.Vector3(0.5, 0.5, 0),
        new THREE.Vector3(2, 1, 0),
        new THREE.Vector3(3.5, 2.5, 0),
      ];
      const ray = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0xf472b6 })
      );
      ray.visible = showRays;
      scene.add(ray);

      const sp1 = mkSprite("Objective", "#e879f9");
      scene.add(sp1);
      sp1.position.set(-1, -2.2, 0);
      sp1.visible = showLabels;
      labelSprites.push(sp1);
      const sp2 = mkSprite("Eyepiece", "#f472b6");
      scene.add(sp2);
      sp2.position.set(2, 2.2, 0);
      sp2.visible = showLabels;
      labelSprites.push(sp2);

      // Image labels
      const spImg = mkSprite("Real Image", "#22d3ee");
      scene.add(spImg);
      spImg.position.set(-0.5, 0.3, 0);
      spImg.visible = showLabels;
      labelSprites.push(spImg);
      const spFinal = mkSprite("Virtual Image", "#fbbf24");
      scene.add(spFinal);
      spFinal.position.set(2.5, 1.8, 0);
      spFinal.visible = showLabels;
      labelSprites.push(spFinal);

      // Object label
      const spObj = mkSprite("Object", "#f472b6");
      scene.add(spObj);
      spObj.position.set(-2.5, -2.8, 0);
      spObj.visible = showLabels;
      labelSprites.push(spObj);

      return { ray };
    };

    const rayHelper = updateRays();
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
      objLens.geometry.dispose();
      objLens.material.dispose();
      eyeLens.geometry.dispose();
      eyeLens.material.dispose();
      tube.geometry.dispose();
      tube.material.dispose();
      stage.geometry.dispose();
      stage.material.dispose();
      light.geometry.dispose();
      light.material.dispose();
      rayHelper.ray.geometry.dispose();
      rayHelper.ray.material.dispose();
      labelSprites.forEach((s) => { s.material.map?.dispose(); s.material.dispose(); });
      renderer.dispose();
      controls?.dispose();
    };
  }, [isWebGL, runId, showLabels, showRays]);

  if (!isWebGL) return <WebGLFallback title="Microscope" />;

  return (
    <Card className="border-rose-500/30">
      <CardHeader>
        <CardTitle className="text-rose-300">
          Optics: Compound Microscope
          <span className="block text-xs font-normal text-rose-400/70 mt-1">
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
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-rose-500/50 bg-rose-500/10 text-rose-300" : "border-rose-900 bg-rose-900/30 text-rose-400/60"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowRays((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showRays ? "border-pink-400/50 bg-pink-400/10 text-pink-300" : "border-rose-900 bg-rose-900/30 text-rose-400/60"}`}
            >
              Rays
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-rose-900 bg-rose-900/40 text-rose-300 hover:bg-rose-800/50 transition-colors"
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
              <Label className="text-rose-300">Objective Focal Length (cm)</Label>
              <Input type="number" step={0.1} min={0.2} max={5} value={fObjective}
                onChange={(e) => setFObjective(Number(e.target.value))}
                className="bg-rose-900/50 border-rose-700 text-rose-100" />
              <p className="text-xs text-rose-400">{fObjective} cm</p>
            </div>
            <div className="space-y-2">
              <Label className="text-rose-300">Eyepiece Focal Length (cm)</Label>
              <Input type="number" step={0.1} min={1} max={10} value={fEyepiece}
                onChange={(e) => setFEyepiece(Number(e.target.value))}
                className="bg-rose-900/50 border-rose-700 text-rose-100" />
              <p className="text-xs text-rose-400">{fEyepiece} cm</p>
            </div>
          </div>
        </CollapsibleControls>
        <ReadoutGrid
          className="mt-4"
          items={[
            { label: "Objective mag (L/fₒ)", value: mObj.toFixed(1), unit: "×" },
            { label: "Eyepiece mag (D/fₑ)", value: mEye.toFixed(1), unit: "×" },
            { label: "Total magnification", value: mTotal.toFixed(0), unit: "×", highlight: mTotal >= 400 },
            { label: "fₒ / fₑ", value: `${fObjective.toFixed(1)} / ${fEyepiece.toFixed(1)}`, unit: "cm" },
          ]}
        />
        <div className="mt-4 p-3 rounded-lg border-l-4 border-rose-500 bg-rose-950/50 text-rose-200 text-sm space-y-2">
          <p className="font-semibold text-rose-300">Magnification</p>
          <p>M = (L / fₒ) × (D / fₑ)</p>
          <p className="font-semibold text-rose-300 mt-2">Where</p>
          <p>L = tube length, D = near point (25 cm)</p>
          <p className="font-semibold text-rose-300 mt-2">Resolution Limit</p>
          <p>d = 0.61λ / NA (Abbe's criterion)</p>
          <p className="font-semibold text-rose-300 mt-2">Total Magnification</p>
          <p>M_total = M_objective × M_eyepiece</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsMicroscope3d };
