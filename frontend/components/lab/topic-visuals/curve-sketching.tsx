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
   Curve Sketching — NEB Algebra (Maths 11)
   Visualizes symmetry (even/odd), periodicity, monotonicity,
   and characteristic graphs of key function families.
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
  s.scale.set(3.0 * scale, 0.56 * scale, 1);
  return s;
}

type CurveType = "quadratic" | "cubic" | "rational" | "trig-asin" | "trig-acos" | "exponential" | "logarithmic";

export function CurveSketchingVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [curveType, setCurveType] = useState<CurveType>("quadratic");
  const [params, setParams] = useState({ a: 1, b: 0, c: -2 });
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const getFunc = (x: number) => {
    switch (curveType) {
      case "quadratic": return params.a * x * x + params.b * x + params.c;
      case "cubic": return params.a * x * x * x + params.b * x;
      case "rational": return 1 / (x * x - 1);
      case "trig-asin": return Math.asin(x / 2) * 2;
      case "trig-acos": return Math.acos(x / 2) * 2;
      case "exponential": return params.a * Math.exp(-params.b * x * x);
      case "logarithmic": return params.a * Math.log(x + params.c + 2);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];

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

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const mkAxis = (from: THREE.Vector2, to: THREE.Vector2, color: number, label: string) => {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(from.x, from.y, 0), new THREE.Vector3(to.x, to.y, 0)]), new THREE.LineBasicMaterial({ color })));
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(to.x, to.y, 0.05), 0.6));
      };
      mkAxis(new THREE.Vector2(-10, 0), new THREE.Vector2(10, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector2(0, -10), new THREE.Vector2(0, 10), 0x22c55e, "y");
      // Symmetry axes
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]), new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.15, gapSize: 0.1 })));
      (meshes[meshes.length - 1] as any).computeLineDistances();
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 25) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const curvePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 400; i++) {
          const x = -10 + (i / 400) * 20;
          try {
            const y = getFunc(x);
            if (isFinite(y) && Math.abs(y) < 15) {
              curvePts.push(new THREE.Vector3(x, y, 0.02));
            }
          } catch { /* skip undefined */ }
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        // Key features
        const features: string[] = [];
        let labelColor = "#fbbf24";

        if (curveType === "quadratic") {
          const vertexX = -params.b / (2 * params.a);
          const vertexY = getFunc(vertexX);
          features.push(`Vertex: (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`);
          features.push(`Axis of symmetry: x = ${vertexX.toFixed(2)}`);
          features.push(`Even symmetry about x = ${vertexX.toFixed(2)}`);
          const v = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 })));
          v.position.set(vertexX, vertexY, 0.05);
          push(mkSprite("vertex", "#fb923c", new THREE.Vector3(vertexX, vertexY + 0.8, 0), 0.7));
        } else if (curveType === "cubic") {
          features.push("Odd function: f(−x) = −f(x) — origin symmetry");
          features.push("Inflection point at origin (for b>0, two turning points)");
        } else if (curveType === "rational") {
          features.push("Vertical asymptotes at x = ±1");
          features.push("Horizontal asymptote: y = 0");
          push(mkSprite("asymptotes x=±1", "#a78bfa", new THREE.Vector3(5, 4, 0), 0.75));
          // Asymptote lines
          [-1, 1].forEach((ax) => {
            push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ax, -10, 0), new THREE.Vector3(ax, 10, 0)]), new THREE.LineDashedMaterial({ color: 0xa78bfa, dashSize: 0.2, gapSize: 0.1 })));
            (meshes[meshes.length - 1] as any).computeLineDistances();
          });
        } else if (curveType === "trig-asin") {
          features.push("Domain: [−2, 2]");
          features.push("Range: [−π, π]");
          features.push("Odd function — symmetry about origin");
        } else if (curveType === "trig-acos") {
          features.push("Domain: [−2, 2]");
          features.push("Range: [0, π]");
          features.push("Decreasing on its domain");
        } else if (curveType === "exponential") {
          features.push(`Gaussian: y = ${params.a}e^(−${params.b}x²)`);
          features.push("Even function — maximum at x = 0");
          features.push("Monotonic: increasing on (−∞, 0), decreasing on (0, ∞)");
          const peak = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
          peak.position.set(0, params.a, 0.05);
          push(mkSprite("max at x=0", "#f87171", new THREE.Vector3(0.8, params.a + 0.5, 0), 0.7));
        } else if (curveType === "logarithmic") {
          features.push("Domain: x > −c (vertical asymptote)");
          features.push("Range: all reals");
          features.push("Monotonically increasing");
        }

        features.push(`f is ${curveType} function`);
        push(mkSprite(features[0], labelColor, new THREE.Vector3(-7, 6, 0), 0.75));
        push(mkSprite(features[1] || "", "#7dd3fc", new THREE.Vector3(-7, 5.0, 0), 0.75));
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

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
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
  }, [curveType, params, isWebGL, getFunc]);

  if (!isWebGL) {
    return <WebGLFallback title="Curve Sketching" description="Graph analysis — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Curve Sketching — Properties &amp; Graphs</span>
          <span className="text-xs text-muted-foreground font-normal">Symmetry, monotonicity, asymptotes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Function Family">
          <Tabs value={curveType} onValueChange={(v) => setCurveType(v as CurveType)} className="mt-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quadratic" className="text-xs">Quadratic</TabsTrigger>
              <TabsTrigger value="cubic" className="text-xs">Cubic</TabsTrigger>
              <TabsTrigger value="rational" className="text-xs">Rational</TabsTrigger>
              <TabsTrigger value="trig-asin" className="text-xs">sin⁻¹</TabsTrigger>
              <TabsTrigger value="trig-acos" className="text-xs">cos⁻¹</TabsTrigger>
              <TabsTrigger value="exponential" className="text-xs">eˣ</TabsTrigger>
              <TabsTrigger value="logarithmic" className="text-xs">ln x</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">a:</Label><Input type="number" step="0.5" value={params.a} onChange={(e) => setParams({ ...params, a: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">b:</Label><Input type="number" step="0.5" value={params.b} onChange={(e) => setParams({ ...params, b: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">c:</Label><Input type="number" step="0.5" value={params.c} onChange={(e) => setParams({ ...params, c: Number(e.target.value) })} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Sketching Properties</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Even function:</strong> f(−x) = f(x) — symmetric about y-axis.</p>
            <p><strong className="text-foreground">Odd function:</strong> f(−x) = −f(x) — symmetric about origin.</p>
            <p><strong className="text-foreground">Periodic:</strong> f(x + T) = f(x) — repeats every period T.</p>
            <p><strong className="text-foreground">Monotonic:</strong> Always increasing or always decreasing on an interval.</p>
            <p><strong className="text-foreground">Asymptote:</strong> Line the curve approaches but never touches.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
