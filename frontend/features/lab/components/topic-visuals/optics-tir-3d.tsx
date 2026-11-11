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

export default function OpticsTIR3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [n1, setN1] = useState(1.5);
  const [n2, setN2] = useState(1.0);
  const [incAngle, setIncAngle] = useState(42);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showNormals, setShowNormals] = useState(true);
  const [runId, setRunId] = useState(0);

  // Live readouts from current params
  const criticalDeg = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : NaN;
  const isTIR = Number.isFinite(criticalDeg) && incAngle > criticalDeg;
  const sinT2 = (n1 / n2) * Math.sin((incAngle * Math.PI) / 180);
  const refrDeg = sinT2 <= 1 ? (Math.asin(sinT2) * 180) / Math.PI : NaN;

  const DEFAULTS = { n1: 1.5, n2: 1.0, incAngle: 42 };
  const presets: ScenePreset[] = [
    {
      name: "Glass → Air (at θc)",
      hint: "θᵢ ≈ θc = 41.8° — refracted ray skims the surface (90°).",
      apply: () => { setN1(1.5); setN2(1.0); setIncAngle(42); setRunId((r) => r + 1); },
    },
    {
      name: "Glass → Air (TIR)",
      hint: "θᵢ = 50° > θc — total internal reflection, no light escapes.",
      apply: () => { setN1(1.5); setN2(1.0); setIncAngle(50); setRunId((r) => r + 1); },
    },
    {
      name: "Water → Air",
      hint: "θc ≈ 48.8° — why fish see the world through a 97° window.",
      apply: () => { setN1(1.33); setN2(1.0); setIncAngle(60); setRunId((r) => r + 1); },
    },
    {
      name: "Diamond → Air",
      hint: "θc ≈ 24.4° — tiny critical angle traps light, giving diamond its sparkle.",
      apply: () => { setN1(2.42); setN2(1.0); setIncAngle(30); setRunId((r) => r + 1); },
    },
    {
      name: "Below critical (refracts)",
      hint: "θᵢ = 20° < θc — most light refracts out, faint partial reflection.",
      apply: () => { setN1(1.5); setN2(1.0); setIncAngle(20); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setN1(DEFAULTS.n1);
    setN2(DEFAULTS.n2);
    setIncAngle(DEFAULTS.incAngle);
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
    scene.background = new THREE.Color(0x7c2d12);
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

    const halfPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4),
      new THREE.MeshPhongMaterial({ color: 0xea580c, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    );
    halfPlane.position.y = -0.5;
    scene.add(halfPlane);

    const interfaceLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xf97316 })
    );
    scene.add(interfaceLine);

    const textureLines: THREE.Line[] = [];

    let normalLine: THREE.Line;
    let normalLabel: THREE.Sprite;

    const updateRays = () => {
      const theta1 = (incAngle * Math.PI) / 180;
      const sinTheta2 = (n1 / n2) * Math.sin(theta1);
      const isTIR = sinTheta2 > 1;
      const criticalAngle = Math.asin(n2 / n1) * (180 / Math.PI);

      const origin = new THREE.Vector3(0, 0, 0);
      const incDir = new THREE.Vector3(0, -Math.sin(theta1), -Math.cos(theta1));
      const incRay = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          origin.clone().add(incDir.clone().multiplyScalar(-3.5)), origin,
        ]),
        new THREE.LineBasicMaterial({ color: 0xf59e0b })
      );
      scene.add(incRay);

      if (!isTIR) {
        const theta2 = Math.asin(Math.min(sinTheta2, 1));
        const refrDir = new THREE.Vector3(0, Math.sin(theta2), -Math.cos(theta2));
        const refrRay = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(refrDir.multiplyScalar(3.5))]),
          new THREE.LineBasicMaterial({ color: 0x22d3ee })
        );
        scene.add(refrRay);
        const reflDir2 = new THREE.Vector3(0, Math.sin(theta1), Math.cos(theta1));
        const reflRay2 = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(reflDir2.multiplyScalar(2))]),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 })
        );
        scene.add(reflRay2);
      } else {
        const reflDir = new THREE.Vector3(0, Math.sin(theta1), Math.cos(theta1));
        const reflRay = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(reflDir.multiplyScalar(3.5))]),
          new THREE.LineBasicMaterial({ color: 0x22d3ee })
        );
        scene.add(reflRay);
      }

      normalLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(0, 2.5, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xa5b4fc, linewidth: 2 })
      );
      normalLine.visible = showNormals;
      scene.add(normalLine);

      normalLabel = addLabel(mkSprite("Normal", "#a5b4fc"));
      normalLabel.position.set(0.3, 2, 0);
      normalLabel.visible = showLabels && showNormals;

      // Surface texture lines
      for (let i = -3; i <= 3; i++) {
        const texLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(i * 1.2, -0.3, 0), new THREE.Vector3(i * 1.2, -2, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0xea580c, transparent: true, opacity: 0.3 })
        );
        scene.add(texLine);
        textureLines.push(texLine);
      }

      const sp1 = addLabel(mkSprite(isTIR ? "TIR!" : "Refracted", isTIR ? "#22d3ee" : "#fbbf24"));
      sp1.position.set(2, 0.8, 0);
      const spCrit = addLabel(mkSprite("θc=" + criticalAngle.toFixed(1) + "°", "#fb923c"));
      spCrit.position.set(-2, -1.5, 0);
      return { incRay, normalLine };
    };

    const rayHelpers = updateRays();
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
      halfPlane.geometry.dispose();
      halfPlane.material.dispose();
      interfaceLine.geometry.dispose();
      interfaceLine.material.dispose();
      normalLine.geometry.dispose();
      if (!(normalLine.material instanceof Array)) normalLine.material.dispose();
      normalLabel.material.map?.dispose();
      normalLabel.material.dispose();
      // Cleanup texture lines
      textureLines.forEach((l) => {
        l.geometry.dispose();
        if (!(l.material instanceof Array)) (l.material as THREE.Material).dispose();
      });
      renderer.dispose();
      controls?.dispose();
    };
  }, [n1, n2, incAngle, isWebGL, runId, showLabels, showNormals]);

  if (!isWebGL) return <WebGLFallback title="Total Internal Reflection" />;

  return (
    <Card className="border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-orange-300">
          Optics: Total Internal Reflection
          <span className="block text-xs font-normal text-orange-400/70 mt-1">
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
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-orange-500/50 bg-orange-500/10 text-orange-300" : "border-orange-900 bg-orange-900/40 text-orange-400/60"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowNormals((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showNormals ? "border-indigo-400/50 bg-indigo-400/10 text-indigo-300" : "border-orange-900 bg-orange-900/40 text-orange-400/60"}`}
            >
              Normal
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-orange-900 bg-orange-900/40 text-orange-300 hover:bg-orange-800/50 transition-colors"
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
        </div>
        <ReadoutGrid
          className="mb-4"
          items={[
            { label: "Critical angle θc", value: Number.isFinite(criticalDeg) ? criticalDeg.toFixed(1) : "—", unit: Number.isFinite(criticalDeg) ? "°" : undefined },
            { label: "Angle of incidence θ₁", value: incAngle, unit: "°" },
            { label: "Regime", value: isTIR ? "Total internal reflection" : Number.isFinite(criticalDeg) ? "Refraction (+ partial reflection)" : "No TIR possible (n₁ ≤ n₂)", highlight: isTIR },
            { label: "Angle of refraction θ₂", value: Number.isFinite(refrDeg) ? refrDeg.toFixed(1) : "— (TIR)", unit: Number.isFinite(refrDeg) ? "°" : undefined },
          ]}
        />
        <CollapsibleControls label="TIR Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-orange-300">n₁ (Denser Medium)</Label>
              <Input type="number" step={0.01} min={1.01} max={3} value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="bg-orange-900/50 border-orange-700 text-orange-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-orange-300">n₂ (Rarer Medium)</Label>
              <Input type="number" step={0.01} min={1} max={n1} value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="bg-orange-900/50 border-orange-700 text-orange-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-orange-300">Angle of Incidence (°)</Label>
              <Input type="number" min={0} max={89} value={incAngle}
                onChange={(e) => setIncAngle(Number(e.target.value))}
                className="bg-orange-900/50 border-orange-700 text-orange-100" />
              <p className="text-xs text-orange-400">{incAngle}°</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-orange-500 bg-orange-950/50 text-orange-200 text-sm space-y-2">
          <p className="font-semibold text-orange-300">Critical Angle</p>
          <p>sin(θc) = n₂ / n₁</p>
          <p className="font-semibold text-orange-300 mt-2">Condition for TIR</p>
          <p>θ {'>'} θc and light travels denser → rarer</p>
          <p className="font-semibold text-orange-300 mt-2">Applications</p>
          <p>Optical fibers: light trapped by repeated TIR inside core</p>
          <p className="text-orange-400">Mirages: TIR in hot air layers near ground</p>
          <p className="font-semibold text-orange-300 mt-2">Fiber Optics</p>
          <p>Acceptance angle: sin(θₐ) = √(n₁² - n₂²)</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsTIR3d };
