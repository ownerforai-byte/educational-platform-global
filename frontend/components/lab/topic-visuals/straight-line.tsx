"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, PlaybackBar, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/* ============================================================
   Straight Line — NEB Analytic Geometry (Maths 11, Unit 9)
   Interactive 2D plot showing all standard forms of a line
   and the angle between two lines.
   ============================================================ */

function mkLabel(text: string, color: string, x: number, y: number, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
  ctx.fillRect(4, 4, 504, 120);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 504, 120);
  ctx.font = "bold 40px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sprite.position.set(x, y, 0);
  sprite.scale.set(2.5 * scale, 0.6 * scale, 1);
  return sprite;
}

function addLabel(scene: THREE.Scene, meshes: THREE.Object3D[], labelSprites: THREE.Sprite[], text: string, color: number, x: number, y: number, scale = 0.6) {
  const s = mkLabel(text, `#${color.toString(16).padStart(6, "0")}`, x, y, scale);
  scene.add(s);
  meshes.push(s);
  labelSprites.push(s);
}

type LineForm = "slope" | "intercept" | "two-point" | "general";

const SL_INFO: Record<LineForm, { head: string; eq: string; slope: string; interceptNote: string; example: string }> = {
  slope: {
    head: "Slope–intercept form",
    eq: "y = mx + c",
    slope: "m = tan θ, the gradient (rise over run).",
    interceptNote: "c is the y-intercept: the point (0, c).",
    example: "y = 2x + 1 has slope 2 and crosses the y-axis at 1.",
  },
  intercept: {
    head: "Intercept form",
    eq: "x/a + y/b = 1",
    slope: "m = −b/a.",
    interceptNote: "a and b are the x- and y-intercepts.",
    example: "x/3 + y/6 = 1 cuts the axes at (3, 0) and (0, 6).",
  },
  "two-point": {
    head: "Two-point form",
    eq: "y − y₁ = m(x − x₁),  m = (y₂ − y₁)/(x₂ − x₁)",
    slope: "Slope from the two given points.",
    interceptNote: "Vertical line (x₁ = x₂) has undefined slope: x = x₁.",
    example: "Through (−1, 2) and (3, 4): m = 1/2, so y − 2 = ½(x + 1).",
  },
  general: {
    head: "General form",
    eq: "ax + by + c = 0",
    slope: "m = −a/b  (b ≠ 0).",
    interceptNote: "x-intercept −c/a, y-intercept −c/b.",
    example: "2x − 3y + 6 = 0 → slope 2/3, y-intercept 2.",
  },
};

export function StraightLineVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [form, setForm] = useState<LineForm>("slope");
  const [m, setM] = useState(1);
  const [c, setC] = useState(0);
  const [x1, setX1] = useState(-2);
  const [y1, setY1] = useState(-1);
  const [x2, setX2] = useState(2);
  const [y2, setY2] = useState(3);
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [cc, setCc] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const playingRef = useRef(true);

  useEffect(() => { speedRef.current = speed; playingRef.current = playing; }, [speed, playing]);

  const info = SL_INFO[form];

  const defaults = { m: 1, c: 0, x1: -2, y1: -1, x2: 2, y2: 3, a: 1, b: -2, cc: 2 };

  const presets: ScenePreset[] = [
    { name: "y = 2x − 3", hint: "Positive slope, negative y-intercept", apply: () => { setForm("slope"); setM(2); setC(-3); setRunId((r) => r + 1); } },
    { name: "Horizontal y = 2", hint: "Zero slope: m = 0", apply: () => { setForm("slope"); setM(0); setC(2); setRunId((r) => r + 1); } },
    { name: "Intercept x/4 + y/3 = 1", hint: "Cuts the axes at (4, 0) and (0, 3)", apply: () => { setForm("intercept"); setA(4); setB(3); setRunId((r) => r + 1); } },
    { name: "Through (−2, −1) & (2, 3)", hint: "Two-point form: slope 1, intercept 1", apply: () => { setForm("two-point"); setX1(-2); setY1(-1); setX2(2); setY2(3); setRunId((r) => r + 1); } },
    { name: "General 2x − 3y + 6 = 0", hint: "Slope = −a/b = 2/3", apply: () => { setForm("general"); setA(2); setB(-3); setCc(6); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setForm("slope");
    setM(defaults.m); setC(defaults.c);
    setX1(defaults.x1); setY1(defaults.y1); setX2(defaults.x2); setY2(defaults.y2);
    setA(defaults.a); setB(defaults.b); setCc(defaults.cc);
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
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
    let movingPoint: THREE.Mesh;
    const segA = new THREE.Vector2(-10, 0);
    const segB = new THREE.Vector2(10, 0);

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.enableZoom = true;
      controls.minDistance = 5;
      controls.maxDistance = 30;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Axis helper
      const mkAxis = (from: THREE.Vector2, to: THREE.Vector2, color: number, label: string) => {
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(from.x, from.y, 0),
            new THREE.Vector3(to.x, to.y, 0),
          ]),
          new THREE.LineBasicMaterial({ color, linewidth: 2 }),
        ));
        push(mkLabel(label, `#${color.toString(16).padStart(6, "0")}`, to.x, to.y, 0.7));
      };
      mkAxis(new THREE.Vector2(-10, 0), new THREE.Vector2(10, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector2(0, -10), new THREE.Vector2(0, 10), 0x22c55e, "y");

      // Grid
      for (let i = -10; i <= 10; i++) {
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]),
          new THREE.LineBasicMaterial({ color: 0x1e293b }),
        ));
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]),
          new THREE.LineBasicMaterial({ color: 0x1e293b }),
        ));
      }
      push(new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshBasicMaterial({ color: 0x0f172a, side: THREE.DoubleSide }),
      ));

      // Origin dot
      push(new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }))).position.set(0, 0, 0.01);

      const updateLine = () => {
        // Remove old line
        const lineIdx = meshes.findIndex(m => (m as any).userData?.isLine);
        if (lineIdx !== -1) {
          const old = meshes[lineIdx];
          scene.remove(old);
          meshes.splice(lineIdx, 1);
        }
        const labelIdx = meshes.findIndex(m => (m as any).userData?.isLabel);
        if (labelIdx !== -1) {
          scene.remove(meshes[labelIdx]);
          meshes.splice(labelIdx, 1);
        }

        let pts: [number, number][];
        let label: string;
        const color = 0x22d3ee;

        if (form === "slope") {
          // y = mx + c
          pts = [[-10, m * (-10) + c], [10, m * 10 + c]];
          label = `y = ${m.toFixed(1)}x + ${c.toFixed(1)}`;
        } else if (form === "intercept") {
          // x/a + y/b = 1
          const aVal = a || 1;
          const bVal = b || 1;
          pts = [[aVal, 0], [0, bVal]];
          label = `x/${aVal.toFixed(1)} + y/${bVal.toFixed(1)} = 1`;
        } else if (form === "two-point") {
          const dx = x2 - x1, dy = y2 - y1;
          if (Math.abs(dx) < 0.01) {
            pts = [[x1, -10], [x1, 10]];
            label = `x = ${x1.toFixed(1)} (vertical)`;
          } else {
            const slope = dy / dx;
            const intercept = y1 - slope * x1;
            pts = [[-10, slope * (-10) + intercept], [10, slope * 10 + intercept]];
            label = `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`;
          }
        } else {
          // ax + by + c = 0
          const aV = a, bV = b;
          if (Math.abs(bV) < 0.01) {
            pts = [[-cc / aV, -10], [-cc / aV, 10]];
            label = `x = ${(-cc / aV).toFixed(2)} (vertical)`;
          } else {
            const slope = -aV / bV;
            const intercept = -cc / bV;
            pts = [[-10, slope * (-10) + intercept], [10, slope * 10 + intercept]];
            label = `${aV.toFixed(1)}x + ${bV.toFixed(1)}y + ${cc.toFixed(1)} = 0`;
          }
        }

        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(pts[0][0], pts[0][1], 0.02),
          new THREE.Vector3(pts[1][0], pts[1][1], 0.02),
        ]);
        const lineMesh = push(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color, linewidth: 3 })));
        lineMesh.userData.isLine = true;

        // Endpoints of the drawn segment (used by the traveling point)
        segA.set(pts[0][0], pts[0][1]);
        segB.set(pts[1][0], pts[1][1]);

        // Slope triangle indicator
        const midX = (pts[0][0] + pts[1][0]) / 2;
        const midY = (pts[0][1] + pts[1][1]) / 2;
        addLabel(scene, meshes, labelSprites, label, color, midX + 1.5, midY + 1, 0.6);
        (push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
        )) as any).position.set(midX, midY, 0.03);
        movingPoint = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xf97316 }),
        )) as THREE.Mesh;
        movingPoint.position.set(midX, midY, 0.04);
        (meshes[meshes.length - 1] as any).userData.isLabel = false;
      };

      updateLine();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (playingRef.current) {
          animTime += 0.016 * speedRef.current;
          const t = (Math.sin(animTime * 0.8) + 1) / 2;
          if (movingPoint) {
            movingPoint.position.x = segA.x + (segB.x - segA.x) * t;
            movingPoint.position.y = segA.y + (segB.y - segA.y) * t;
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
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [form, m, c, a, b, cc, x1, y1, x2, y2, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Straight Line Visual" description="Interactive 2D line explorer — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Straight Line — All Standard Forms</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to pan · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Line Form">
          <Tabs value={form} onValueChange={(v) => setForm(v as LineForm)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="slope" className="text-xs">Slope-Intercept</TabsTrigger>
              <TabsTrigger value="intercept" className="text-xs">Intercept Form</TabsTrigger>
              <TabsTrigger value="two-point" className="text-xs">Two-Point</TabsTrigger>
              <TabsTrigger value="general" className="text-xs">General Form</TabsTrigger>
            </TabsList>
          </Tabs>

          {form === "slope" && (
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="w-20"><Label className="text-xs text-muted-foreground">m (slope):</Label><Input type="number" step="0.5" value={m} onChange={(e) => setM(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-20"><Label className="text-xs text-muted-foreground">c (y-int):</Label><Input type="number" step="0.5" value={c} onChange={(e) => setC(Number(e.target.value))} className="mt-1" /></div>
            </div>
          )}
          {form === "intercept" && (
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="w-20"><Label className="text-xs text-muted-foreground">a (x-int):</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value) || 0.01)} className="mt-1" /></div>
              <div className="w-20"><Label className="text-xs text-muted-foreground">b (y-int):</Label><Input type="number" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value) || 0.01)} className="mt-1" /></div>
            </div>
          )}
          {form === "two-point" && (
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="w-14"><Label className="text-xs text-muted-foreground">x₁:</Label><Input type="number" step="1" value={x1} onChange={(e) => setX1(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-14"><Label className="text-xs text-muted-foreground">y₁:</Label><Input type="number" step="1" value={y1} onChange={(e) => setY1(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-14"><Label className="text-xs text-muted-foreground">x₂:</Label><Input type="number" step="1" value={x2} onChange={(e) => setX2(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-14"><Label className="text-xs text-muted-foreground">y₂:</Label><Input type="number" step="1" value={y2} onChange={(e) => setY2(Number(e.target.value))} className="mt-1" /></div>
            </div>
          )}
          {form === "general" && (
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="w-14"><Label className="text-xs text-muted-foreground">a:</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value) || 0.01)} className="mt-1" /></div>
              <div className="w-14"><Label className="text-xs text-muted-foreground">b:</Label><Input type="number" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value) || 0.01)} className="mt-1" /></div>
              <div className="w-14"><Label className="text-xs text-muted-foreground">c:</Label><Input type="number" step="0.5" value={cc} onChange={(e) => setCc(Number(e.target.value))} className="mt-1" /></div>
            </div>
          )}
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <PlaybackBar playing={playing} onPlayToggle={() => setPlaying((p) => !p)} speed={speed} onSpeedChange={setSpeed} onReset={resetAll} />

        <ReadoutGrid
          items={(() => {
            let slope: number | null = null;
            let yInt: number | null = null;
            let xInt: number | null = null;
            if (form === "slope") {
              slope = m; yInt = c; xInt = m !== 0 ? -c / m : null;
            } else if (form === "intercept") {
              const aV = a || 1, bV = b || 1;
              slope = -bV / aV; yInt = bV; xInt = aV;
            } else if (form === "two-point") {
              const dx = x2 - x1, dy = y2 - y1;
              if (Math.abs(dx) < 1e-9) { xInt = x1; }
              else { slope = dy / dx; yInt = y1 - slope * x1; xInt = slope !== 0 ? -yInt / slope : null; }
            } else {
              if (Math.abs(b) < 1e-9) { xInt = Math.abs(a) > 1e-9 ? -cc / a : null; }
              else { slope = -a / b; yInt = -cc / b; xInt = Math.abs(a) > 1e-9 ? -cc / a : null; }
            }
            const angle = slope === null ? "90° (vertical)" : `${(Math.atan(slope) * 180 / Math.PI).toFixed(1)}°`;
            return [
              { label: "Form", value: `${info.head}: ${info.eq}`, highlight: true },
              { label: "Slope m", value: slope === null ? "undefined (vertical)" : slope.toFixed(3) },
              { label: "Inclination θ = tan⁻¹m", value: angle },
              { label: "y-intercept", value: yInt === null ? "—" : `(0, ${yInt.toFixed(2)})` },
              { label: "x-intercept", value: xInt === null ? "—" : `(${xInt.toFixed(2)}, 0)` },
            ];
          })()}
        />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-500">Key Concepts</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li><strong className="text-foreground">{info.head}:</strong> {info.eq} — {info.slope} {info.interceptNote} Example: {info.example}</li>
            <li><strong className="text-foreground">Angle between two lines:</strong> tan θ = |(m₂ − m₁)/(1 + m₁m₂)|</li>
            <li><strong className="text-foreground">Perpendicular:</strong> m₁ · m₂ = −1</li>
            <li><strong className="text-foreground">Parallel:</strong> m₁ = m₂</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
