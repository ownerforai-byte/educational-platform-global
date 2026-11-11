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
   Vector Applications 3D — NEB Analytic Geometry & Vectors (Maths 11)
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

const MODE_INFO: Record<VectorMode, { concept: string; formula: string; interpretation: string; fact: string; tip: string }> = {
  addition: {
    concept: "Resultant by the parallelogram / triangle law",
    formula: "R = A + B = (Ax+Bx, Ay+By, Az+Bz)",
    interpretation: "Two forces, velocities or displacements acting together add as the adjacent sides of a parallelogram; the diagonal is the resultant.",
    fact: "Resolving into components is the reverse trick: F = Fxî + Fyĵ + Fzk̂ — addition of perpendicular pieces rebuilds the same vector.",
    tip: "Classic NEB application: a boat crossing a river — resultant velocity = velocity of boat + velocity of stream (head-to-tail triangle).",
  },
  scalar: {
    concept: "Scalar multiplication of a physical vector",
    formula: "kA = (kAx, kAy, kAz), |kA| = |k|·|A|",
    interpretation: "Doubling a force doubles its magnitude along the same line of action; k negative reverses the sense (e.g. reaction −F).",
    fact: "Work W = F·s and impulse F·Δt are scalars built from vectors — magnitude scaling shows up everywhere in mechanics.",
    tip: "The unit vector in A's direction is Â = A/|A| — it is just scalar multiplication with k = 1/|A|.",
  },
  collinear: {
    concept: "Collinear (parallel) vectors",
    formula: "A ∥ B ⟺ A = kB for some scalar k ⟺ A × B = 0",
    interpretation: "Both vectors share the same line of action, so their components are in proportion: Ax/Bx = Ay/By = Az/Bz.",
    fact: "In 3-D geometry, parallel lines are detected exactly this way: their direction vectors must satisfy d₁ = k·d₂.",
    tip: "To prove points P, Q, R are collinear, form the displacement vectors PQ and QR and show PQ = k·QR.",
  },
  coplanar: {
    concept: "Coplanarity & scalar triple product (volumes)",
    formula: "A·(B × C) = 0",
    interpretation: "The scalar triple product is the volume of the parallelepiped built on A, B, C — zero volume means all three flatten into one plane.",
    fact: "|A·(B×C)| is exactly the volume a parallelepiped needs — coplanar edges give a squashed, zero-volume box.",
    tip: "Concurrent forces in equilibrium that lie in one plane are coplanar vectors — their STP must vanish.",
  },
  "linear-combo": {
    concept: "Linear combination (resolution of vectors)",
    formula: "R = c₁A + c₂B (scene uses c₁ = 1.5, c₂ = 0.8)",
    interpretation: "Combining scaled copies of A and B always lands in the plane containing both — that plane is their span.",
    fact: "Any vector in space resolves uniquely as xî + yĵ + zk̂ — a linear combination of the standard basis (position vector OP = r).",
    tip: "NEB questions like 'express MN in terms of a, b, c' are pure linear-combination exercises — hunt for the path and add along it.",
  },
};

export function VectorApplications3DVisual() {
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

  const info = MODE_INFO[mode];

  const fmtV = (v: THREE.Vector3) => `(${v.x.toFixed(1)}, ${v.y.toFixed(1)}, ${v.z.toFixed(1)})`;
  const va = new THREE.Vector3(a.x, a.y, a.z);
  const vb = new THREE.Vector3(b.x, b.y, b.z);
  const vc = new THREE.Vector3(c.x, c.y, c.z);
  const vSum = va.clone().add(vb);
  const vCross = va.clone().cross(vb);
  const vSTP = va.dot(vb.clone().cross(vc));

  const presets: ScenePreset[] = [
    { name: "Resultant force A + B", hint: "Two forces add as adjacent sides of a parallelogram", apply: () => { setMode("addition"); setA({ x: 3, y: 1, z: 0 }); setB({ x: 1, y: 3, z: 0 }); setRunId((r) => r + 1); } },
    { name: "Scale a force k = 1.5", hint: "kA keeps the line of action, multiplies magnitude", apply: () => { setMode("scalar"); setK(1.5); setRunId((r) => r + 1); } },
    { name: "Parallel members B = 2A", hint: "Parallel lines share one direction vector: A × B = 0", apply: () => { setMode("collinear"); setA({ x: 2, y: 1, z: 0 }); setB({ x: 4, y: 2, z: 0 }); setRunId((r) => r + 1); } },
    { name: "Flat box: volume = 0", hint: "Coplanar edges ⇒ A·(B×C) = 0, no 3-D box", apply: () => { setMode("coplanar"); setA({ x: 3, y: 1, z: 0 }); setB({ x: 1, y: 3, z: 0 }); setC({ x: 2, y: 2, z: 0 }); setRunId((r) => r + 1); } },
    { name: "Cube edges: real volume", hint: "Volume of a parallelepiped = |A·(B×C)|", apply: () => { setMode("coplanar"); setA({ x: 2, y: 0, z: 0 }); setB({ x: 0, y: 2, z: 0 }); setC({ x: 0, y: 0, z: 2 }); setRunId((r) => r + 1); } },
    { name: "Resolve: 1.5A + 0.8B", hint: "Any vector in the A–B plane is a linear combination of them", apply: () => { setMode("linear-combo"); setRunId((r) => r + 1); } },
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
          labelSprites.push(push(mkSprite("Triangle: A then B â†’ R", "#7dd3fc", new THREE.Vector3(-4, 4, 0), 0.8)));
        } else if (mode === "scalar") {
          // kA
          const scaled = A.clone().multiplyScalar(k);
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), scaled, 0xf97316, `kA (${k})`);
          labelSprites.push(push(mkSprite(`k·A = (${(k * a.x).toFixed(1)}, ${(k * a.y).toFixed(1)}, ${(k * a.z).toFixed(1)})`, "#fb923c", new THREE.Vector3(-4, 4, 0), 0.8)));
        } else if (mode === "collinear") {
          // Two vectors collinear if A = kB
          const bScaled = B.clone().multiplyScalar(2);
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), bScaled, 0x22c55e, "2B");
          drawArrow(new THREE.Vector3(0, 0, 0), B, 0x3b82f6, "B");
          labelSprites.push(push(mkSprite("Collinear: A = 2B â†’ same line through origin", "#a78bfa", new THREE.Vector3(-4, 4, 0), 0.85)));
        } else if (mode === "coplanar") {
          // Three vectors coplanar if scalar triple product = 0
          drawArrow(new THREE.Vector3(0, 0, 0), A, 0xef4444, "A");
          drawArrow(new THREE.Vector3(0, 0, 0), B, 0x22c55e, "B");
          drawArrow(new THREE.Vector3(0, 0, 0), C, 0x3b82f6, "C");
          labelSprites.push(push(mkSprite("Coplanar: A, B, C lie in same plane", "#7dd3fc", new THREE.Vector3(-4, 4, 0), 0.85)));
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
          drawArrow(new THREE.Vector3(0, 0, 0), result, 0xf97316, `câ‚A+câ‚‚B`);
          labelSprites.push(push(mkSprite(`Linear combo: 1.5A + 0.8B`, "#fb923c", new THREE.Vector3(-4, 4, 0), 0.85)));
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
    return <WebGLFallback title="Vector Applications 3D" description="Interactive 3D vector visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Vector Applications 3D — Addition, Collinearity & Coplanarity</span>
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
              <TabsTrigger value="scalar" className="text-xs">Scalar Ã— v</TabsTrigger>
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
            { label: info.concept, value: info.formula, highlight: true },
            { label: "Resultant A + B", value: fmtV(vSum) },
            { label: `k·A (k = ${k})`, value: fmtV(va.clone().multiplyScalar(k)) },
            { label: "Parallelogram area |A × B|", value: vCross.length().toFixed(2), unit: "sq units" },
            { label: "Triangle area ½|A × B|", value: (vCross.length() / 2).toFixed(2), unit: "sq units" },
            { label: "Box volume |A · (B × C)|", value: Math.abs(vSTP).toFixed(2), unit: "cu units" },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Definitions</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Collinear vectors:</strong> A and B are collinear if A = kB for some scalar k.</p>
            <p><strong className="text-foreground">Coplanar vectors:</strong> Three vectors are coplanar if their scalar triple product A·(BÃ—C) = 0.</p>
            <p><strong className="text-foreground">Linear combination:</strong> v = câ‚a + câ‚‚b + câ‚ƒc for scalars câ‚, câ‚‚, câ‚ƒ.</p>
            <p><strong className="text-foreground">Linearly independent:</strong> No non-trivial combination gives the zero vector.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
