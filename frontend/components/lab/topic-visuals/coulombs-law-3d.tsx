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

export function CoulombsLawVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [q1, setQ1] = useState(5);
  const [q2, setQ2] = useState(-3);
  const [distance, setDistance] = useState(4);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [showField, setShowField] = useState(true);
  const [runId, setRunId] = useState(0);
  // Speed lives in a ref so changing it never tears down the WebGL scene.
  const speedRef = useRef(1);
  speedRef.current = speed;

  const k = 9e9;
  const forceN = (k * Math.abs(q1 * q2) * 1e-12) / (distance * distance);
  const isAttractive = q1 * q2 < 0;
  const eDueQ1 = (k * Math.abs(q1) * 1e-6) / (distance * distance); // N/C at q₂
  const energyMJ = (9 * q1 * q2) / distance; // mJ

  const DEFAULTS = { q1: 5, q2: -3, distance: 4 };
  const presets: ScenePreset[] = [
    {
      name: "Attraction ±5 μC",
      hint: "Equal opposite charges at 3 m — a clean attractive pair.",
      apply: () => { setQ1(5); setQ2(-5); setDistance(3); setRunId((r) => r + 1); },
    },
    {
      name: "Strong repulsion",
      hint: "Like charges close together — large repulsive force.",
      apply: () => { setQ1(8); setQ2(8); setDistance(2); setRunId((r) => r + 1); },
    },
    {
      name: "Weak & far apart",
      hint: "Small charges at 8 m — inverse-square law makes F tiny.",
      apply: () => { setQ1(2); setQ2(-1); setDistance(8); setRunId((r) => r + 1); },
    },
    {
      name: "Symmetric ±10 μC",
      hint: "Maximum charges at 5 m — compare with the close pair.",
      apply: () => { setQ1(10); setQ2(-10); setDistance(5); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setQ1(DEFAULTS.q1);
    setQ2(DEFAULTS.q2);
    setDistance(DEFAULTS.distance);
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
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    const fieldObjs: THREE.Object3D[] = [];
    let forceArrow: THREE.ArrowHelper;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 3, 10);

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
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { s.visible = showLabels; push(s); labelSprites.push(s); return s; };
      const addField = <T extends THREE.Object3D>(o: T): T => { o.visible = showField; push(o); fieldObjs.push(o); return o; };

      const k = 9e9;
      const forceMag = Math.abs(k * q1 * q2 / (distance * distance)) * 0.001;
      const isAttractive = q1 * q2 < 0;
      const forceColor = isAttractive ? 0x34d399 : 0xef4444;

      // Charge 1 (left)
      const c1Color = q1 > 0 ? 0xef4444 : 0x3b82f6;
      const c1 = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 24, 24),
        new THREE.MeshBasicMaterial({ color: c1Color }),
      )) as THREE.Mesh;
      c1.position.set(-distance / 2, 0, 0);
      addLabel(mkSprite(`${q1 > 0 ? "+" : ""}${q1} μC`, c1Color === 0xef4444 ? "#ef4444" : "#3b82f6", new THREE.Vector3(-distance / 2, 1.2, 0), 0.8));

      // Charge 2 (right)
      const c2Color = q2 > 0 ? 0xef4444 : 0x3b82f6;
      const c2 = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.4 * Math.abs(q2) / 5, 24, 24),
        new THREE.MeshBasicMaterial({ color: c2Color }),
      )) as THREE.Mesh;
      c2.position.set(distance / 2, 0, 0);
      addLabel(mkSprite(`${q2 > 0 ? "+" : ""}${q2} μC`, c2Color === 0xef4444 ? "#ef4444" : "#3b82f6", new THREE.Vector3(distance / 2, 1.2, 0), 0.8));

      // Force arrows on charges
      const forceDir1 = isAttractive ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(-1, 0, 0);
      const forceDir2 = isAttractive ? new THREE.Vector3(-1, 0, 0) : new THREE.Vector3(1, 0, 0);
      const arrow1 = push(new LiveLeaderLine(forceDir1, c1.position.clone(), Math.min(forceMag * 2, 3), forceColor, 0.2, 0.1)) as THREE.ArrowHelper;
      const arrow2 = push(new LiveLeaderLine(forceDir2, c2.position.clone(), Math.min(forceMag * 2, 3), forceColor, 0.2, 0.1)) as THREE.ArrowHelper;
      forceArrow = arrow1;

      // Long arrow label for force
      const fLabelPos = new THREE.Vector3(0, 3, 0);
      const fTarget = new THREE.Vector3(0, 0, 0);
      const fDir = fTarget.clone().sub(fLabelPos).normalize();
      push(new LiveLeaderLine(fDir, fLabelPos, fLabelPos.distanceTo(fTarget) * 0.9, forceColor, 0.15, 0.1));
      addLabel(mkSprite(`F = ${forceMag.toFixed(2)} N (${isAttractive ? "attractive" : "repulsive"})`, "#34d399", fLabelPos.clone().sub(fDir.multiplyScalar(0.5)), 0.75));

      // Distance label
      const dLabelPos = new THREE.Vector3(0, -2.5, 0);
      const dTarget = new THREE.Vector3(distance / 2, 0, 0);
      const dDir = dTarget.clone().sub(dLabelPos).normalize();
      push(new LiveLeaderLine(dDir, dLabelPos, dLabelPos.distanceTo(dTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      addLabel(mkSprite(`r = ${distance} m`, "#fbbf24", dLabelPos.clone().sub(dDir.multiplyScalar(0.5)), 0.8));

      // Coulomb's law formula label
      const formulaLabelPos = new THREE.Vector3(-4.5, 2, 0);
      const formulaTarget = new THREE.Vector3(0, 0, 0);
      const formulaDir = formulaTarget.clone().sub(formulaLabelPos).normalize();
      push(new LiveLeaderLine(formulaDir, formulaLabelPos, formulaLabelPos.distanceTo(formulaTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      addLabel(mkSprite("F = kq₁q₂/r²", "#a78bfa", formulaLabelPos.clone().sub(formulaDir.multiplyScalar(0.5)), 0.8));

      // Field lines from q1 to q2 (if attractive) or away (if repulsive)
      const numLines = 8;
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const pts: THREE.Vector3[] = [];
        const start = new THREE.Vector3(-distance / 2, 0, 0);
        for (let r = 0; r <= distance; r += 0.2) {
          const x = -distance / 2 + r * Math.cos(angle) * (distance / 2);
          const y = r * Math.sin(angle) * (distance / 2) * 0.5;
          const z = 0;
          pts.push(new THREE.Vector3(x, y, z));
        }
        const color = isAttractive ? 0x34d399 : 0xef4444;
        addField(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 }),
        ));
      }

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
        if (animating) {
          animTime += 0.03 * speedRef.current;
          const oscillation = Math.sin(animTime * 3) * 0.3;
          if (forceArrow) {
            forceArrow.setLength(Math.max(0.5, forceMag + oscillation), 0.2, 0.12);
          }
        }
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
  }, [q1, q2, distance, isWebGL, animating, runId, showLabels, showField]);

  if (!isWebGL) {
    return <WebGLFallback title="Coulomb's Law" description="Two point charges with force and field line visualization." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Coulomb's Law — Force Between Charges</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Charge Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">q₁ (μC):</Label>
              <Input type="range" min={-10} max={10} step={1} value={q1} onChange={(e) => setQ1(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{q1} μC</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">q₂ (μC):</Label>
              <Input type="range" min={-10} max={10} step={1} value={q2} onChange={(e) => setQ2(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{q2} μC</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Distance r (m):</Label>
              <Input type="range" min={1} max={8} step={0.5} value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{distance} m</p>
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
            { label: "Force F", value: forceN.toExponential(2), unit: "N", highlight: true },
            { label: "Force type", value: q1 * q2 === 0 ? "None (q = 0)" : isAttractive ? "Attractive" : "Repulsive" },
            { label: "E from q₁ at r", value: eDueQ1.toFixed(0), unit: "N/C" },
            { label: "Potential energy U", value: energyMJ.toFixed(1), unit: "mJ" },
          ]}
        />

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Coulomb's Law:</strong> F = kq₁q₂/r² where k = 9×10⁹ N·m²/C².</p>
            <p><strong className="text-foreground">Like charges repel:</strong> Both positive or both negative → force pushes apart.</p>
            <p><strong className="text-foreground">Opposite charges attract:</strong> One positive, one negative → force pulls together.</p>
            <p><strong className="text-foreground">Superposition:</strong> Net force on a charge = vector sum of forces from all other charges.</p>
            <p><strong className="text-foreground">Inverse square law:</strong> Doubling distance reduces force to ¼.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
