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

export default function OpticsReflection3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [mode, setMode] = useState<"concave" | "convex">("concave");
  const [angle, setAngle] = useState(45);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showNormals, setShowNormals] = useState(true);
  const [runId, setRunId] = useState(0);

  const DEFAULTS = { mode: "concave" as const, angle: 45 };

  const presets: ScenePreset[] = [
    {
      name: "Normal incidence (0°)",
      hint: "Ray along the normal — reflects straight back on itself.",
      apply: () => { setMode("concave"); setAngle(0); setRunId((r) => r + 1); },
    },
    {
      name: "Concave 45°",
      hint: "Classic setup — θᵢ = θᵣ = 45°, ray turns by 90°.",
      apply: () => { setMode("concave"); setAngle(45); setRunId((r) => r + 1); },
    },
    {
      name: "Convex 60°",
      hint: "Diverging mirror — reflected ray spreads away from the axis.",
      apply: () => { setMode("convex"); setAngle(60); setRunId((r) => r + 1); },
    },
    {
      name: "Grazing (80°)",
      hint: "Near-parallel to the surface — reflection still obeys θᵢ = θᵣ.",
      apply: () => { setMode("concave"); setAngle(80); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setMode(DEFAULTS.mode);
    setAngle(DEFAULTS.angle);
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
    scene.background = new THREE.Color(0x1e1b4b);
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const labelSprites: THREE.Sprite[] = [];

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

    const mirrorGeo = mode === "concave"
      ? new THREE.SphereGeometry(3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
      : new THREE.SphereGeometry(3, 32, 16, Math.PI, Math.PI * 2, 0, Math.PI / 2);
    const mirrorMat = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      side: THREE.DoubleSide,
      shininess: 100,
      transparent: true,
      opacity: 0.85,
    });
    const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
    mirror.rotation.x = Math.PI / 2;
    mirror.position.z = mode === "concave" ? -0.1 : 0.1;
    scene.add(mirror);

    const normalGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -3),
    ]);
    const normalMat = new THREE.LineBasicMaterial({ color: 0xa5b4fc, linewidth: 2 });
    const normalLine = new THREE.Line(normalGeo, normalMat);
    normalLine.visible = showNormals;
    scene.add(normalLine);

    const normalLabel = mkSprite("Normal", "#a5b4fc");
    scene.add(normalLabel);
    normalLabel.position.set(0.3, 0.3, -1.5);
    normalLabel.visible = showLabels && showNormals;
    labelSprites.push(normalLabel);

    const surfaceLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3, 0, -3),
        new THREE.Vector3(3, 0, -3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x7c3aed })
    );
    scene.add(surfaceLine);

    const updateRays = () => {
      const theta = (angle * Math.PI) / 180;
      const rayLen = 4;
      const startDir = new THREE.Vector3(0, -Math.sin(theta), Math.cos(theta));
      const hitPoint = new THREE.Vector3(0, 0, -3);
      const normalDir = new THREE.Vector3(0, 0, -1);
      const reflectDir = startDir.clone().reflect(normalDir);

      const rayGeo = new THREE.BufferGeometry().setFromPoints([
        hitPoint.clone().add(startDir.clone().multiplyScalar(-rayLen)),
        hitPoint.clone(),
      ]);
      const rayMat = new THREE.LineBasicMaterial({ color: 0xf59e0b });
      const ray = new THREE.Line(rayGeo, rayMat);
      scene.add(ray);

      const rEnd = hitPoint.clone().add(reflectDir.clone().multiplyScalar(rayLen));
      const reflGeo = new THREE.BufferGeometry().setFromPoints([hitPoint, rEnd]);
      const reflRay = new THREE.Line(reflGeo, new THREE.LineBasicMaterial({ color: 0x22d3ee }));
      scene.add(reflRay);

      scene.add(mkSprite("Incident", "#f59e0b"));
      const incLabel = scene.children[scene.children.length - 1] as THREE.Sprite;
      incLabel.position.set(-1.5, 0.5, -1);
      incLabel.visible = showLabels;
      labelSprites.push(incLabel);
      const spec = mkSprite("Reflected", "#22d3ee");
      scene.add(spec);
      spec.position.set(1.5, 0.5, -1);
      spec.visible = showLabels;
      labelSprites.push(spec);
      return { ray, reflRay, spec };
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
      mirrorGeo.dispose();
      mirrorMat.dispose();
      normalGeo.dispose();
      normalMat.dispose();
      rayHelper.ray.geometry.dispose();
      rayHelper.ray.material.dispose();
      rayHelper.reflRay.geometry.dispose();
      rayHelper.reflRay.material.dispose();
      rayHelper.spec.material.map?.dispose();
      rayHelper.spec.material.dispose();
      surfaceLine.geometry.dispose();
      surfaceLine.material.dispose();
      normalLabel.material.map?.dispose();
      normalLabel.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [mode, angle, isWebGL, runId, showLabels, showNormals]);

  if (!isWebGL) return <WebGLFallback title="Reflection" />;

  return (
    <Card className="border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300">
          Optics: Reflection in Mirrors
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
              onClick={() => setShowNormals((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showNormals ? "border-indigo-400/50 bg-indigo-400/10 text-indigo-300" : "border-purple-900 bg-purple-900/40 text-purple-400/60"}`}
            >
              Normal
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
            { label: "Angle of incidence θᵢ", value: angle, unit: "°" },
            { label: "Angle of reflection θᵣ", value: angle, unit: "°", highlight: true },
            { label: "Glancing angle (90° − θ)", value: 90 - angle, unit: "°" },
            { label: "Mirror type", value: mode === "concave" ? "Concave (converging)" : "Convex (diverging)" },
          ]}
        />
        <CollapsibleControls label="Mirror Configuration">
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["concave", "convex"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    mode === m
                      ? "bg-purple-600 text-white"
                      : "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Label className="text-purple-300">Angle of Incidence (°)</Label>
              <Input
                type="number"
                min={0}
                max={89}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="bg-purple-900/50 border-purple-700 text-purple-100"
              />
              <p className="text-xs text-purple-400">{angle}°</p>
            </div>
            <div className="rounded-md bg-purple-900/30 p-2 text-xs text-purple-300">
              <p className="font-semibold">Note:</p>
              <p>For concave mirrors, rays converge after reflection. For convex mirrors, rays diverge.</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-purple-500 bg-purple-950/50 text-purple-200 text-sm space-y-2">
          <p className="font-semibold text-purple-300">Law of Reflection</p>
          <p>θ<sub className="text-purple-400">incident</sub> = θ<sub className="text-purple-400">reflected</sub></p>
          <p className="font-semibold text-purple-300 mt-2">Mirror Formula</p>
          <p>1/f = 1/v + 1/u</p>
          <p className="font-semibold text-purple-300 mt-2">Magnification</p>
          <p>m = -v/u (negative = inverted image)</p>
          <p className="text-purple-400 mt-1">Concave mirrors: real/inverted images when object beyond F. Convex mirrors: always virtual/upright images.</p>
          <p className="font-semibold text-purple-300 mt-2">Image Formation</p>
          <p>Object at ∞ → image at F (real, point-sized)</p>
          <p className="text-purple-400">Object at F → image at ∞ (highly magnified)</p>
          <p className="font-semibold text-purple-300 mt-2">Applications</p>
          <p>Concave: headlights, shaving mirrors, solar furnaces. Convex: rear-view mirrors, security mirrors.</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsReflection3d };
