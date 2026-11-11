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

export function KirchhoffsLawsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [v1, setV1] = useState(12);
  const [v2, setV2] = useState(6);
  const [r1, setR1] = useState(4);
  const [r2, setR2] = useState(2);
  const [r3, setR3] = useState(6);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [showCurrents, setShowCurrents] = useState(true);
  const [runId, setRunId] = useState(0);

  // Mesh analysis of the two-loop circuit (same equations as in the scene).
  const denom = r1 * r2 + r2 * r3 + r3 * r1;
  const i1 = (v1 * (r2 + r3) - v2 * r3) / denom;
  const i2 = (v2 * (r1 + r3) - v1 * r3) / denom;
  const i3 = i1 - i2;
  const powerSupplied = v1 * i1 + v2 * i2;

  const DEFAULTS = { v1: 12, v2: 6, r1: 4, r2: 2, r3: 6 };
  const presets: ScenePreset[] = [
    {
      name: "Default circuit",
      hint: "12 V / 6 V sources with mixed resistances.",
      apply: () => { setV1(12); setV2(6); setR1(4); setR2(2); setR3(6); setRunId((r) => r + 1); },
    },
    {
      name: "Balanced (I₃ = 0)",
      hint: "Both junctions at equal potential — no current in the middle branch.",
      apply: () => { setV1(6); setV2(12); setR1(4); setR2(14); setR3(3); setRunId((r) => r + 1); },
    },
    {
      name: "Equal sources",
      hint: "Identical batteries and resistors — symmetry forces I₃ = 0.",
      apply: () => { setV1(12); setV2(12); setR1(6); setR2(6); setR3(4); setRunId((r) => r + 1); },
    },
    {
      name: "Strong V₁ drive",
      hint: "24 V dominates — I₂ reverses direction.",
      apply: () => { setV1(24); setV2(6); setR1(2); setR2(8); setR3(4); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setV1(DEFAULTS.v1);
    setV2(DEFAULTS.v2);
    setR1(DEFAULTS.r1);
    setR2(DEFAULTS.r2);
    setR3(DEFAULTS.r3);
    setShowLabels(true);
    setShowCurrents(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    const solveCircuit = () => {
      const denom = r1 * r2 + r2 * r3 + r3 * r1;
      const i1 = (v1 * (r2 + r3) - v2 * r3) / denom;
      const i2 = (v2 * (r1 + r3) - v1 * r3) / denom;
      const i3 = i1 - i2;
      return { i1, i2, i3 };
    };

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    const currentObjs: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 12);

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
      const addCurrent = <T extends THREE.Object3D>(o: T): T => { o.visible = showCurrents; push(o); currentObjs.push(o); return o; };

      const { i1, i2, i3 } = solveCircuit();

      // Circuit layout - two loops sharing middle branch
      // Loop 1 (left): V1 - R1 - R3
      // Loop 2 (right): V2 - R2 - R3
      const nodes = {
        topLeft: new THREE.Vector3(-3, 2, 0),
        topMid: new THREE.Vector3(0, 2, 0),
        topRight: new THREE.Vector3(3, 2, 0),
        botLeft: new THREE.Vector3(-3, -2, 0),
        botMid: new THREE.Vector3(0, -2, 0),
        botRight: new THREE.Vector3(3, -2, 0),
      };

      // Wires
      const wireColor = 0x94a3b8;
      const wirePairs = [
        [nodes.topLeft, nodes.topMid], [nodes.topMid, nodes.topRight],
        [nodes.botLeft, nodes.botMid], [nodes.botMid, nodes.botRight],
        [nodes.topLeft, nodes.botLeft], [nodes.topRight, nodes.botRight],
        [nodes.topMid, nodes.botMid],
      ];
      wirePairs.forEach(([a, b]) => {
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([a, b]),
          new THREE.LineBasicMaterial({ color: wireColor }),
        ));
      });

      // Resistors (zigzag)
      const drawResistor = (start: THREE.Vector3, end: THREE.Vector3, color: number, label: string) => {
        const pts: THREE.Vector3[] = [];
        const dx = end.x - start.x, dy = end.y - start.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const segments = 10;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const px = start.x + t * dx;
          const py = start.y + t * dy;
          const perpX = -dy / len * 0.15 * Math.sin(t * Math.PI * segments);
          const perpY = dx / len * 0.15 * Math.sin(t * Math.PI * segments);
          pts.push(new THREE.Vector3(px + perpX, py + perpY, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color })));
        addLabel(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, start.clone().add(end).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.5, 0)), 0.65));
      };

      drawResistor(nodes.topLeft, nodes.topMid, 0xef4444, `R₁=${r1}Ω`);
      drawResistor(nodes.topMid, nodes.topRight, 0x3b82f6, `R₂=${r2}Ω`);
      drawResistor(nodes.topMid, nodes.botMid, 0xfbbf24, `R₃=${r3}Ω`);

      // Batteries
      const drawBattery = (pos: THREE.Vector3, voltage: number, polarity: "top+" | "bot+") => {
        const color = polarity === "top+" ? 0xef4444 : 0x3b82f6;
        push(new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.2, 0.3),
          new THREE.MeshBasicMaterial({ color }),
        )).position.copy(pos);
        addLabel(mkSprite(`${voltage}V`, "#ffffff", pos.clone().add(new THREE.Vector3(0, polarity === "top+" ? 0.6 : -0.6, 0)), 0.6));
      };

      drawBattery(nodes.botLeft, v1, "top+");
      drawBattery(nodes.botRight, v2, "top+");

      // Current arrows with labels
      const drawCurrentArrow = (from: THREE.Vector3, to: THREE.Vector3, current: number, color: number, label: string) => {
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const dir = to.clone().sub(from).normalize();
        addCurrent(new LiveLeaderLine(dir, mid.clone().sub(dir.clone().multiplyScalar(0.5)), 0.6, color, 0.15, 0.08));
        const s = addLabel(mkSprite(`${label}=${current.toFixed(2)}A`, `#${color.toString(16).padStart(6, "0")}`, mid.clone().add(new THREE.Vector3(0, 0.6, 0)), 0.7));
        s.visible = showLabels && showCurrents;
        currentObjs.push(s);
      };

      drawCurrentArrow(nodes.topLeft, nodes.topMid, i1, 0x22d3ee, "I₁");
      drawCurrentArrow(nodes.topMid, nodes.topRight, i2, 0xa78bfa, "I₂");
      drawCurrentArrow(nodes.topMid, nodes.botMid, i3, 0x34d399, "I₃");

      // Kirchhoff's junction rule label
      const juncLabelPos = new THREE.Vector3(2, 3.5, 0);
      const juncTarget = new THREE.Vector3(0, 2, 0);
      const juncDir = juncTarget.clone().sub(juncLabelPos).normalize();
      push(new LiveLeaderLine(juncDir, juncLabelPos, juncLabelPos.distanceTo(juncTarget) * 0.9, 0xef4444, 0.15, 0.1));
      addLabel(mkSprite("KCL: I₁ = I₂ + I₃", "#ef4444", juncLabelPos.clone().sub(juncDir.multiplyScalar(0.5)), 0.8));

      // Loop rule label
      const loopLabelPos = new THREE.Vector3(-3.5, -3, 0);
      const loopTarget = new THREE.Vector3(0, 0, 0);
      const loopDir = loopTarget.clone().sub(loopLabelPos).normalize();
      push(new LiveLeaderLine(loopDir, loopLabelPos, loopLabelPos.distanceTo(loopTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      addLabel(mkSprite("KVL: ΣV = 0 around any loop", "#fbbf24", loopLabelPos.clone().sub(loopDir.multiplyScalar(0.5)), 0.75));

      const update = () => {
        while (meshes.length > 60) {
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
  }, [v1, v2, r1, r2, r3, isWebGL, runId, showLabels, showCurrents]);

  if (!isWebGL) {
    return <WebGLFallback title="Kirchhoff's Laws" description="Circuit with current arrows showing KCL and KVL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Kirchhoff's Laws — Circuit Analysis</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Circuit Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">V₁ (V):</Label>
              <Input type="range" min={1} max={24} step={1} value={v1} onChange={(e) => setV1(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{v1}V</p>
            </div>
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">V₂ (V):</Label>
              <Input type="range" min={1} max={24} step={1} value={v2} onChange={(e) => setV2(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{v2}V</p>
            </div>
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">R₁ (Ω):</Label>
              <Input type="range" min={1} max={20} step={1} value={r1} onChange={(e) => setR1(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{r1}Ω</p>
            </div>
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">R₂ (Ω):</Label>
              <Input type="range" min={1} max={20} step={1} value={r2} onChange={(e) => setR2(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{r2}Ω</p>
            </div>
            <div className="w-20">
              <Label className="text-xs text-muted-foreground">R₃ (Ω):</Label>
              <Input type="range" min={1} max={20} step={1} value={r3} onChange={(e) => setR3(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{r3}Ω</p>
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
              onClick={() => setShowCurrents((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showCurrents ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Current arrows
            </button>
          </div>
          <button
            onClick={resetAll}
            title="Reset to defaults"
            className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground transition-colors hover:bg-muted"
          >
            Reset
          </button>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Branch current I₁", value: i1.toFixed(2), unit: "A" },
            { label: "Branch current I₂", value: i2.toFixed(2), unit: "A" },
            { label: "Branch current I₃", value: i3.toFixed(2), unit: "A", highlight: Math.abs(i3) < 0.01 },
            { label: "Power supplied", value: powerSupplied.toFixed(1), unit: "W" },
          ]}
        />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">KCL (Junction Rule):</strong> ΣI_in = ΣI_out at any junction — charge conservation.</p>
            <p><strong className="text-foreground">KVL (Loop Rule):</strong> ΣV = 0 around any closed loop — energy conservation.</p>
            <p><strong className="text-foreground">Sign convention:</strong> Voltage rise across battery (− to +), drop across resistor (with current).</p>
            <p><strong className="text-foreground">Method:</strong> Assign current directions, write KCL at junctions, KVL for independent loops.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
