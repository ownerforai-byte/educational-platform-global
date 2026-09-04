"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Vector Operations — NEB Analytic Geometry & Vectors (Maths 11)
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

export function VectorOperationsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<VectorMode>("addition");
  const [a, setA] = useState({ x: 3, y: 1, z: 0 });
  const [b, setB] = useState({ x: 1, y: 3, z: 0 });
  const [c, setC] = useState({ x: 0, y: 2, z: 2 });
  const [k, setK] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    let animPhase = 0;
    const meshes: THREE.Object3D[] = [];

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
        push(new THREE.ArrowHelper(dir, from, len, color, 0.2, 0.12));
        const mid = from.clone().add(to).multiplyScalar(0.5);
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, mid.clone().add(new THREE.Vector3(0, 0.6, 0)), 0.8));
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

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
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
  }, [mode, a, b, c, k, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Vector Operations" description="Interactive 3D vector visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Vector Operations — Addition, Collinearity & Coplanarity</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Definitions</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Collinear vectors:</strong> A and B are collinear if A = kB for some scalar k.</p>
            <p><strong className="text-foreground">Coplanar vectors:</strong> Three vectors are coplanar if their scalar triple product A·(B×C) = 0.</p>
            <p><strong className="text-foreground">Linear combination:</strong> v = c₁a + c₂b + c₃c for scalars c₁, c₂, c₃.</p>
            <p><strong className="text-foreground">Linearly independent:</strong> No non-trivial combination gives the zero vector.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
