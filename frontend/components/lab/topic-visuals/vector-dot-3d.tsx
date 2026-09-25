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
import { ScenePresets, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

/* ============================================================
   Dot Product 3D — NEB Analytic Geometry & Vectors (Maths 11)
   Shows vector addition, scalar multiplication, collinearity,
   coplanarity, and linear dependence / independence.
   ============================================================ */

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
  s.scale.set(2.8 * scale, 0.52 * scale, 1);
  return s;
}

type VectorMode = "addition" | "scalar" | "collinear" | "coplanar" | "linear-combo";

const DOT_INFO: Record<VectorMode, { concept: string; formula: string; interpretation: string; fact: string; tip: string }> = {
  addition: {
    concept: "Dot product and the cosine rule",
    formula: "|a + b|² = |a|² + |b|² + 2a·b",
    interpretation: "The cross term 2a·b measures how much of b points along a.",
    fact: "Pythagoras |a + b|² = |a|² + |b|² holds only when a·b = 0, i.e. a ⊥ b.",
    tip: "Expand (a + b)·(a + b) using a·a = |a|² — a dot product is a number, not a vector.",
  },
  scalar: {
    concept: "Scalars factor out of the dot product",
    formula: "(ka)·b = k(a·b) = a·(kb)",
    interpretation: "Stretching a by k multiplies every projection contribution by k.",
    fact: "A negative k flips the angle to 180° − θ, so the sign of a·b reverses.",
    tip: "The dot product is bilinear: it distributes over addition and pulls scalars out.",
  },
  collinear: {
    concept: "Cauchy–Schwarz inequality",
    formula: "|a·b| ≤ |a||b|, equality ⇔ a = kB",
    interpretation: "For parallel vectors cosθ = ±1, so the dot product reaches its maximum magnitude.",
    fact: "θ = 0° gives a·b = |a||b|; θ = 180° gives a·b = −|a||b|.",
    tip: "If |a·b| = |a||b| you have found a dependence — the vectors are collinear.",
  },
  coplanar: {
    concept: "Orthogonality via the dot product",
    formula: "c·(a×b) = 0 ⇔ a, b, c coplanar",
    interpretation: "c has no component along the plane normal n = a×b, so it lies in the plane of a and b.",
    fact: "This test is the scalar triple product [a b c] — it equals a 3×3 determinant.",
    tip: "To test coplanarity, dot the third vector with the cross product of the first two.",
  },
  "linear-combo": {
    concept: "Coefficients by projection",
    formula: "If v = c₁a + c₂b with a ⊥ b, then c₁ = (v·a)/(a·a)",
    interpretation: "Dotting with a kills the perpendicular term and isolates c₁.",
    fact: "This is the same idea behind Fourier coefficients and least-squares fitting.",
    tip: "Orthogonal bases make projections trivial — dot with each basis vector in turn.",
  },
};

export function VectorDot3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [mode, setMode] = useState<VectorMode>("addition");
  const [a, setA] = useState({ x: 3, y: 1, z: 0 });
  const [b, setB] = useState({ x: 1, y: 3, z: 0 });
  const [c, setC] = useState({ x: 0, y: 2, z: 2 });
  const [k, setK] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = DOT_INFO[mode];
  const dotAB = a.x * b.x + a.y * b.y + a.z * b.z;
  const magA = Math.hypot(a.x, a.y, a.z);
  const magB = Math.hypot(b.x, b.y, b.z);
  const thetaDeg = magA > 0 && magB > 0
    ? (Math.acos(Math.min(1, Math.max(-1, dotAB / (magA * magB)))) * 180) / Math.PI
    : NaN;
  const compB = magB > 0 ? dotAB / magB : NaN;

  const presets: ScenePreset[] = [
    { name: "Right angle (a·b = 0)", hint: "θ = 90°, so |a + b|² = |a|² + |b|²", apply: () => { setMode("addition"); setA({ x: 2, y: 1, z: 0 }); setB({ x: -1, y: 2, z: 0 }); setRunId((r) => r + 1); } },
    { name: "Exact 60° angle", hint: "a = (1,1,0), b = (2,0,2): cosθ = 1/2", apply: () => { setMode("addition"); setA({ x: 1, y: 1, z: 0 }); setB({ x: 2, y: 0, z: 2 }); setRunId((r) => r + 1); } },
    { name: "Collinear (θ = 0°)", hint: "A = 2B ⇒ a·b = |a||b| — Cauchy–Schwarz equality", apply: () => { setMode("collinear"); setA({ x: 2, y: 0, z: 0 }); setB({ x: 1, y: 0, z: 0 }); setRunId((r) => r + 1); } },
    { name: "Coplanar triple", hint: "All z-components zero ⇒ c·(a×b) = 0", apply: () => { setMode("coplanar"); setC({ x: 1, y: 2, z: 0 }); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setMode("addition");
    setA({ x: 3, y: 1, z: 0 });
    setB({ x: 1, y: 3, z: 0 });
    setC({ x: 0, y: 2, z: 2 });
    setK(2);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    let animPhase = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(7, 6, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.minDistance = 3;
      controls.maxDistance = 20;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const G = 6;
      const mkAxis = (from: THREE.Vector3, to: THREE.Vector3, color: number, label: string) => {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), new THREE.LineBasicMaterial({ color })));
        const cone = push(new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.25, 8), new THREE.MeshBasicMaterial({ color })));
        cone.position.copy(to);
        cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, to.clone().multiplyScalar(1.1), 0.6));
      };
      mkAxis(new THREE.Vector3(-G, 0, 0), new THREE.Vector3(G, 0, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector3(0, 0, -G), new THREE.Vector3(0, 0, G), 0x22c55e, "z");
      mkAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, G, 0), 0x3b82f6, "y");
      push(new THREE.GridHelper(G * 2, G * 2, 0x334155, 0x1e293b));

      const toVec = (p: { x: number; y: number; z: number }) => new THREE.Vector3(p.x, p.z, p.y);

      const drawArrow = (from: THREE.Vector3, to: THREE.Vector3, color: number, label: string) => {
        const dir = to.clone().sub(from).normalize();
        const len = to.clone().sub(from).length();
        push(new LiveLeaderLine(dir, from, len, color, 0.2, 0.12));
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const s = push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, mid.clone().add(new THREE.Vector3(0, 0.6, 0)), 0.8));
        labelSprites.push(s);
      };

      const update = () => {
        // Clear dynamic
        while (meshes.length > 18) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        const A = toVec(a), B = toVec(b), C = toVec(c);

        if (mode === "addition") {
          // Parallelogram law of addition: A + B
          const sum = A.clone().add(B);
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), B, 0x22c55e, "B");
          // Parallelogram edges
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([A, sum]), new THREE.LineDashedMaterial({ color: 0x22c55e, dashSize: 0.15, gapSize: 0.1 })) as any);
          (meshes[meshes.length - 1] as any).computeLineDistances();
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([B, sum]), new THREE.LineDashedMaterial({ color: 0xef4444, dashSize: 0.15, gapSize: 0.1 })) as any);
          (meshes[meshes.length - 1] as any).computeLineDistances();
          drawArrow(new THREE.Vector3(0, 0, 0), sum, 0xf97316, "A + B");
          // Triangle method: B from tip of A
          push(mkSprite("Triangle: A then B → R", "#7dd3fc", new THREE.Vector3(-4, 4, 0), 0.8));
        } else if (mode === "scalar") {
          // kA
          const scaled = A.clone().multiplyScalar(k);
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), scaled, 0xf97316, `kA (${k})`);
          push(mkSprite(`k·A = (${(k * a.x).toFixed(1)}, ${(k * a.y).toFixed(1)}, ${(k * a.z).toFixed(1)})`, "#fb923c", new THREE.Vector3(-4, 4, 0), 0.8));
        } else if (mode === "collinear") {
          // Two vectors collinear if A = kB
          const bScaled = B.clone().multiplyScalar(2);
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), bScaled, 0x22c55e, "2B");
          drawArrow(new THREE.Vector3(0, 0, 0), B, 0x3b82f6, "B");
          push(mkSprite("Collinear: A = 2B → same line through origin", "#a78bfa", new THREE.Vector3(-4, 4, 0), 0.85));
        } else if (mode === "coplanar") {
          // Three vectors coplanar if scalar triple product = 0
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), B, 0x22c55e, "B");
          drawArrow(new THREE.Vector3(0, 0, 0), C, 0x3b82f6, "C");
          push(mkSprite("Coplanar: A, B, C lie in same plane", "#7dd3fc", new THREE.Vector3(-4, 4, 0), 0.85));
          // Show plane
          const normal = A.clone().cross(B).normalize();
          const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(6, 6),
            new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.15, side: THREE.DoubleSide }),
          );
          plane.position.copy(normal.clone().multiplyScalar(1.5));
          plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
          push(plane);
        } else if (mode === "linear-combo") {
          // Linear combo: c1*A + c2*B
          const c1 = 1.5, c2 = 0.8;
          const result = A.clone().multiplyScalar(c1).add(B.clone().multiplyScalar(c2));
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), B, 0x22c55e, "B");
          drawArrow(new THREE.Vector3(0, 0, 0), result, 0xf97316, `c₁A+c₂B`);
          push(mkSprite(`Linear combo: 1.5A + 0.8B`, "#fb923c", new THREE.Vector3(-4, 4, 0), 0.85));
        }
      };

      update();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        animTime += 0.02;
        animPhase = Math.sin(animTime) * 0.3;
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
  }, [mode, a, b, c, k, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Dot Product 3D" description="Interactive 3D vector visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Dot Product 3D — Addition, Collinearity & Coplanarity</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-blue-500/50 bg-blue-500/10 text-blue-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Vector Mode">
          <Tabs value={mode} onValueChange={(v) => setMode(v as VectorMode)} className="mt-1">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="addition" className="text-xs">Addition</TabsTrigger>
              <TabsTrigger value="scalar" className="text-xs">Scalar × v</TabsTrigger>
              <TabsTrigger value="collinear" className="text-xs">Collinear</TabsTrigger>
              <TabsTrigger value="coplanar" className="text-xs">Coplanar</TabsTrigger>
              <TabsTrigger value="linear-combo" className="text-xs">Linear Combo</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="Vector Components">
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <p className="text-xs font-semibold text-red-400 mb-1">A</p>
              <div className="flex gap-2">
                <div className="w-12"><Label className="text-xs text-muted-foreground">x:</Label><Input type="number" step="0.5" value={a.x} onChange={(e) => setA({ ...a, x: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-12"><Label className="text-xs text-muted-foreground">y:</Label><Input type="number" step="0.5" value={a.y} onChange={(e) => setA({ ...a, y: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-12"><Label className="text-xs text-muted-foreground">z:</Label><Input type="number" step="0.5" value={a.z} onChange={(e) => setA({ ...a, z: Number(e.target.value) })} className="mt-1" /></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-400 mb-1">B</p>
              <div className="flex gap-2">
                <div className="w-12"><Label className="text-xs text-muted-foreground">x:</Label><Input type="number" step="0.5" value={b.x} onChange={(e) => setB({ ...b, x: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-12"><Label className="text-xs text-muted-foreground">y:</Label><Input type="number" step="0.5" value={b.y} onChange={(e) => setB({ ...b, y: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-12"><Label className="text-xs text-muted-foreground">z:</Label><Input type="number" step="0.5" value={b.z} onChange={(e) => setB({ ...b, z: Number(e.target.value) })} className="mt-1" /></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-400 mb-1">C (for coplanar)</p>
              <div className="flex gap-2">
                <div className="w-12"><Label className="text-xs text-muted-foreground">x:</Label><Input type="number" step="0.5" value={c.x} onChange={(e) => setC({ ...c, x: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-12"><Label className="text-xs text-muted-foreground">y:</Label><Input type="number" step="0.5" value={c.y} onChange={(e) => setC({ ...c, y: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-12"><Label className="text-xs text-muted-foreground">z:</Label><Input type="number" step="0.5" value={c.z} onChange={(e) => setC({ ...c, z: Number(e.target.value) })} className="mt-1" /></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-orange-400 mb-1">k (scalar)</p>
              <div className="w-16"><Input type="number" step="0.5" value={k} onChange={(e) => setK(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "a · b", value: dotAB.toFixed(2), highlight: true },
            { label: "|a|", value: magA.toFixed(2) },
            { label: "|b|", value: magB.toFixed(2) },
            { label: "Angle θ", value: Number.isNaN(thetaDeg) ? "—" : `${thetaDeg.toFixed(1)}°` },
            { label: "comp_b a = a·b̂", value: Number.isNaN(compB) ? "—" : compB.toFixed(2) },
            { label: info.concept, value: info.formula },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Definitions</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Dot product:</strong> a·b = |a||b|cosθ — a scalar; positive for acute θ, zero at 90°, negative for obtuse θ.</p>
            <p><strong className="text-foreground">Collinear vectors:</strong> A and B are collinear if A = kB for some scalar k.</p>
            <p><strong className="text-foreground">Coplanar vectors:</strong> Three vectors are coplanar if their scalar triple product A·(B×C) = 0.</p>
            <p><strong className="text-foreground">Linear combination:</strong> v = c₁a + c₂b + c₃c for scalars c₁, c₂, c₃.</p>
            <p><strong className="text-foreground">{info.concept}:</strong> {info.interpretation} {info.tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
