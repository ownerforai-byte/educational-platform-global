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

export default function OpticsRefraction3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [n1, setN1] = useState(1.0);
  const [n2, setN2] = useState(1.5);
  const [incAngle, setIncAngle] = useState(45);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showNormals, setShowNormals] = useState(true);
  const [runId, setRunId] = useState(0);

  // Live readouts from current params
  const theta1 = (incAngle * Math.PI) / 180;
  const sinTheta2 = (n1 / n2) * Math.sin(theta1);
  const theta2Deg = sinTheta2 <= 1 ? (Math.asin(sinTheta2) * 180) / Math.PI : NaN;
  const relIndex = n2 / n1;
  const brewsterDeg = (Math.atan(n2 / n1) * 180) / Math.PI;
  const deviationDeg = Number.isFinite(theta2Deg) ? incAngle - theta2Deg : NaN;

  const DEFAULTS = { n1: 1.0, n2: 1.5, incAngle: 45 };
  const presets: ScenePreset[] = [
    {
      name: "Air → Glass",
      hint: "n₁ = 1.00, n₂ = 1.50 — ray bends toward the normal.",
      apply: () => { setN1(1.0); setN2(1.5); setIncAngle(45); setRunId((r) => r + 1); },
    },
    {
      name: "Air → Water",
      hint: "n₁ = 1.00, n₂ = 1.33 — the classic pool-bottom illusion.",
      apply: () => { setN1(1.0); setN2(1.33); setIncAngle(40); setRunId((r) => r + 1); },
    },
    {
      name: "Glass → Air",
      hint: "Dense to rare — ray bends away from the normal.",
      apply: () => { setN1(1.5); setN2(1.0); setIncAngle(30); setRunId((r) => r + 1); },
    },
    {
      name: "Air → Diamond",
      hint: "n₂ = 2.42 — extreme bending gives diamond its fire.",
      apply: () => { setN1(1.0); setN2(2.42); setIncAngle(45); setRunId((r) => r + 1); },
    },
    {
      name: "Normal incidence",
      hint: "θ₁ = 0° — light passes straight through, no bending.",
      apply: () => { setN1(1.0); setN2(1.5); setIncAngle(0); setRunId((r) => r + 1); },
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
    scene.background = new THREE.Color(0x0c4a6e);
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

    const interfacePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 6),
      new THREE.MeshPhongMaterial({ color: 0x0891b2, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
    );
    interfacePlane.rotation.x = -Math.PI / 2;
    scene.add(interfacePlane);

    const interfaceLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(5, 0, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(interfaceLine);

    const updateRays = () => {
      const theta1 = (incAngle * Math.PI) / 180;
      const sinTheta2 = (n1 / n2) * Math.sin(theta1);
      const theta2 = Math.asin(Math.min(sinTheta2, 1));

      const origin = new THREE.Vector3(0, 0, 0);
      const rayDir = new THREE.Vector3(0, -Math.sin(theta1), -Math.cos(theta1));
      const refractDir = new THREE.Vector3(0, Math.sin(theta2), -Math.cos(theta2));

      const incRay = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          origin.clone().add(rayDir.clone().multiplyScalar(-4)),
          origin,
        ]),
        new THREE.LineBasicMaterial({ color: 0xf59e0b })
      );
      scene.add(incRay);

      const refrRay = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(refractDir.multiplyScalar(4))]),
        new THREE.LineBasicMaterial({ color: 0x22d3ee })
      );
      scene.add(refrRay);

      const normalLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -3, 0),
          new THREE.Vector3(0, 3, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xa5b4fc, linewidth: 2 })
      );
      normalLine.visible = showNormals;
      scene.add(normalLine);

      const normalLabel = addLabel(mkSprite("Normal", "#a5b4fc"));
      normalLabel.position.set(0.3, 2, 0);

      const interfaceLabel = addLabel(mkSprite("Interface", "#22d3ee"));
      interfaceLabel.position.set(3.5, 0.3, 0);

      // Medium boundary lines
      const boundLine1 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-5, 0.5, 0), new THREE.Vector3(5, 0.5, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.4 })
      );
      scene.add(boundLine1);
      const boundLabel1 = addLabel(mkSprite("n₁ medium", "#0ea5e9"));
      boundLabel1.position.set(-3.5, 0.6, 0);
      const boundLabel2 = addLabel(mkSprite("n₂ medium", "#06b6d4"));
      boundLabel2.position.set(-3.5, -0.6, 0);

      const spN1 = addLabel(mkSprite("n₁=" + n1, "#f59e0b"));
      spN1.position.set(-2, 1.5, 0);
      const sp2 = addLabel(mkSprite("n₂=" + n2, "#22d3ee"));
      sp2.position.set(2, 1.5, 0);
      const spAngle = addLabel(mkSprite(incAngle + "°", "#fbbf24"));
      spAngle.position.set(-0.5, -0.5, 0);

      return { incRay, refrRay, normalLine, boundLine1, normalLabel, interfaceLabel, boundLabel1, boundLabel2 };
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
      interfacePlane.geometry.dispose();
      interfacePlane.material.dispose();
      interfaceLine.geometry.dispose();
      interfaceLine.material.dispose();
      rayHelpers.incRay.geometry.dispose();
      rayHelpers.incRay.material.dispose();
      rayHelpers.refrRay.geometry.dispose();
      rayHelpers.refrRay.material.dispose();
      rayHelpers.normalLine.geometry.dispose();
      if (!(rayHelpers.normalLine.material instanceof Array)) rayHelpers.normalLine.material.dispose();
      rayHelpers.normalLabel.material.map?.dispose();
      rayHelpers.normalLabel.material.dispose();
      rayHelpers.interfaceLabel.material.map?.dispose();
      rayHelpers.interfaceLabel.material.dispose();
      rayHelpers.boundLine1.geometry.dispose();
      if (!(rayHelpers.boundLine1.material instanceof Array)) rayHelpers.boundLine1.material.dispose();
      rayHelpers.boundLabel1.material.map?.dispose();
      rayHelpers.boundLabel1.material.dispose();
      rayHelpers.boundLabel2.material.map?.dispose();
      rayHelpers.boundLabel2.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [n1, n2, incAngle, isWebGL, runId, showLabels, showNormals]);

  if (!isWebGL) return <WebGLFallback title="Refraction" />;

  return (
    <Card className="border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-300">
          Optics: Refraction & Snell&apos;s Law
          <span className="block text-xs font-normal text-cyan-400/70 mt-1">
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
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-cyan-900 bg-cyan-900/40 text-cyan-400/60"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowNormals((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showNormals ? "border-indigo-400/50 bg-indigo-400/10 text-indigo-300" : "border-cyan-900 bg-cyan-900/40 text-cyan-400/60"}`}
            >
              Normal
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-cyan-900 bg-cyan-900/40 text-cyan-300 hover:bg-cyan-800/50 transition-colors"
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
        </div>
        <ReadoutGrid
          className="mb-4"
          items={[
            { label: "Angle of incidence θ₁", value: incAngle, unit: "°" },
            { label: "Angle of refraction θ₂", value: Number.isFinite(theta2Deg) ? theta2Deg.toFixed(1) : "TIR", unit: Number.isFinite(theta2Deg) ? "°" : undefined, highlight: !Number.isFinite(theta2Deg) },
            { label: "Relative index n₂/n₁", value: relIndex.toFixed(2) },
            { label: "Brewster angle θB", value: brewsterDeg.toFixed(1), unit: "°" },
            { label: "Deviation (θ₁ − θ₂)", value: Number.isFinite(deviationDeg) ? deviationDeg.toFixed(1) : "—", unit: Number.isFinite(deviationDeg) ? "°" : undefined },
            { label: "Bends toward normal", value: n2 > n1 ? "Yes (n₂ > n₁)" : n2 < n1 ? "No (n₂ < n₁)" : "None (n₁ = n₂)" },
          ]}
        />
        <CollapsibleControls label="Refractive Indices & Angle">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-cyan-300">n₁ (Incident Medium)</Label>
              <Input type="number" step={0.01} min={1} max={3} value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="bg-cyan-900/50 border-cyan-700 text-cyan-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-cyan-300">n₂ (Refracting Medium)</Label>
              <Input type="number" step={0.01} min={1} max={3} value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="bg-cyan-900/50 border-cyan-700 text-cyan-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-cyan-300">Angle of Incidence (°)</Label>
              <Input type="number" min={0} max={89} value={incAngle}
                onChange={(e) => setIncAngle(Number(e.target.value))}
                className="bg-cyan-900/50 border-cyan-700 text-cyan-100" />
              <p className="text-xs text-cyan-400">{incAngle}°</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-cyan-500 bg-cyan-950/50 text-cyan-200 text-sm space-y-2">
          <p className="font-semibold text-cyan-300">Snell&apos;s Law</p>
          <p>n₁ sin(θ₁) = n₂ sin(θ₂)</p>
          <p className="font-semibold text-cyan-300 mt-2">Refractive Index</p>
          <p>n = c / v  (speed of light ratio)</p>
          <p className="font-semibold text-cyan-300 mt-2">Brewster's Angle</p>
          <p>tan(θB) = n₂/n₁  (polarized reflection)</p>
          <p className="font-semibold text-cyan-300 mt-2">Lateral Shift</p>
          <p>Light shifts sideways when passing through parallel slab</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsRefraction3d };
