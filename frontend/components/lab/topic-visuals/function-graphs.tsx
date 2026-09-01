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
   Functions — NEB Algebra (Maths 11)
   Interactive function explorer: domain, range, inverse,
   composite, and various function types.
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

type FuncType = "linear" | "quadratic" | "cubic" | "reciprocal" | "exponential" | "logarithmic" | "trig" | "inverse";

export function FunctionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [funcType, setFuncType] = useState<FuncType>("quadratic");
  const [params, setParams] = useState({ a: 1, b: -2, c: -3, k: 1, h: 0 });
  const [showDomainRange, setShowDomainRange] = useState(true);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const getFunc = (x: number) => {
    switch (funcType) {
      case "linear": return params.a * x + params.b;
      case "quadratic": return params.a * x * x + params.b * x + params.c;
      case "cubic": return params.a * x * x * x + params.b * x;
      case "reciprocal": return params.a / (x - params.b);
      case "exponential": return params.a * Math.exp(params.b * x);
      case "logarithmic": return params.a * Math.log(Math.abs(x - params.b) + 0.1);
      case "trig": return params.a * Math.sin(params.b * x);
      case "inverse": return params.a * Math.sqrt(Math.abs(x));
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
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const curvePts: THREE.Vector3[] = [];
        let dyMin = Infinity, dyMax = -Infinity;
        for (let i = 0; i <= 400; i++) {
          const x = -10 + (i / 400) * 20;
          try {
            const y = getFunc(x);
            if (isFinite(y) && Math.abs(y) < 50) {
              curvePts.push(new THREE.Vector3(x, y, 0.02));
              dyMin = Math.min(dyMin, y);
              dyMax = Math.max(dyMax, y);
            } else {
              curvePts.push(curvePts[curvePts.length - 1]);
            }
          } catch {
            curvePts.push(curvePts[curvePts.length - 1]);
          }
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        if (showDomainRange) {
          const fName = funcType.charAt(0).toUpperCase() + funcType.slice(1);
          let domain = "all reals", range = "all reals";
          if (funcType === "logarithmic") domain = "x ≠ 0";
          else if (funcType === "reciprocal") { domain = "x ≠ h"; range = "y ≠ 0"; }
          else if (funcType === "inverse") { domain = "x ≥ 0"; range = "y ≥ 0"; }
          else if (funcType === "exponential") { range = "y > 0"; }
          else if (funcType === "trig") { range = `[${(-params.a).toFixed(1)}, ${(params.a).toFixed(1)}]`; }

          const labelY = Math.min(8, Math.max(-8, dyMax + 1.5));
          push(mkSprite(`f(x) = ${fName}  Domain: ${domain}`, "#7dd3fc", new THREE.Vector3(-7, labelY, 0), 0.8));
          push(mkSprite(`Range: ${range}`, "#fb923c", new THREE.Vector3(-7, labelY - 1.0, 0), 0.8));
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
  }, [funcType, params, showDomainRange, isWebGL, getFunc]);

  if (!isWebGL) {
    return <WebGLFallback title="Functions" description="Function graph explorer — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Functions — Domain, Range &amp; Types</span>
          <span className="text-xs text-muted-foreground font-normal">Explore different function families</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Function Type">
          <Tabs value={funcType} onValueChange={(v) => setFuncType(v as FuncType)} className="mt-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="linear" className="text-xs">Linear</TabsTrigger>
              <TabsTrigger value="quadratic" className="text-xs">Quadratic</TabsTrigger>
              <TabsTrigger value="cubic" className="text-xs">Cubic</TabsTrigger>
              <TabsTrigger value="reciprocal" className="text-xs">Reciprocal</TabsTrigger>
              <TabsTrigger value="exponential" className="text-xs">Exponential</TabsTrigger>
              <TabsTrigger value="logarithmic" className="text-xs">Logarithmic</TabsTrigger>
              <TabsTrigger value="trig" className="text-xs">Trigonometric</TabsTrigger>
              <TabsTrigger value="inverse" className="text-xs">Inverse/Root</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">a:</Label><Input type="number" step="0.5" value={params.a} onChange={(e) => setParams({ ...params, a: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">b:</Label><Input type="number" step="0.5" value={params.b} onChange={(e) => setParams({ ...params, b: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">c:</Label><Input type="number" step="0.5" value={params.c} onChange={(e) => setParams({ ...params, c: Number(e.target.value) })} className="mt-1" /></div>
            <div className="w-16"><Label className="text-xs text-muted-foreground">h:</Label><Input type="number" step="0.5" value={params.h} onChange={(e) => setParams({ ...params, h: Number(e.target.value) })} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Function:</strong> A relation where each input x has exactly one output y = f(x).</p>
            <p><strong className="text-foreground">Domain:</strong> All possible input values (x-values) for which f is defined.</p>
            <p><strong className="text-foreground">Range:</strong> All possible output values (y-values) that f can produce.</p>
            <p><strong className="text-foreground">One-to-one:</strong> Each y-value corresponds to exactly one x-value (passes horizontal line test).</p>
            <p><strong className="text-foreground">Inverse function f⁻¹:</strong> Swaps domain and range; reflects across y = x.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
