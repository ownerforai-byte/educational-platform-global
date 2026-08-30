"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { useWebGLCanvas, WebGLFallback } from "@/components/lab/webgl-fallback";
import { isWebGLAvailable } from "@/lib/webgl";
import { evaluateMath, evaluateComplex } from "@/lib/math-expression";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function ParametricCurvePlotter() {
  const [xExpr, setXExpr] = useState("cos(t) * (3 + sin(t))");
  const [yExpr, setYExpr] = useState("sin(t) * (3 + Sin(t))");
  const [zExpr, setZExpr] = useState("sin(t)");
  const [tMin, setTMin] = useState("0");
  const [tMax, setTMax] = useState("6.28");
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  const parseExpr = useMemo(() => {
    return (expr: string, t: number): number => {
      try {
        const result = evaluateMath(expr, { t });
        return typeof result === "number" && Number.isFinite(result) ? result : NaN;
      } catch { return NaN; }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        if (!isWebGLAvailable()) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 6, 10);
                if (!isWebGLAvailable()) {
          return;
        }
const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        const grid = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(grid);
        const axes = new THREE.AxesHelper(5);
        scene.add(axes);

        const group = new THREE.Group();
        scene.add(group);

        function rebuild() {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Line || child instanceof THREE.Mesh) { child.geometry?.dispose(); (child.material as THREE.Material)?.dispose(); }
          }
          const tMinVal = parseFloat(tMin) || 0;
          const tMaxVal = parseFloat(tMax) || Math.PI * 2;
          const steps = 500;
          const points: THREE.Vector3[] = [];
          for (let i = 0; i <= steps; i++) {
            const t = tMinVal + (i / steps) * (tMaxVal - tMinVal);
            const x = parseExpr(xExpr, t);
            const y = parseExpr(yExpr, t);
            const z = parseExpr(zExpr, t);
            if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
              points.push(new THREE.Vector3(x, y, z));
            }
          }
          if (points.length > 1) {
            const curve = new (THREE as any).CatmullRomCurve3(points);
            const tubeGeo = new THREE.TubeGeometry(curve, 300, 0.08, 8, false);
            const tubeMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, roughness: 0.2, metalness: 0.3 });
            const tube = new THREE.Mesh(tubeGeo, tubeMat);
            group.add(tube);
            const startSphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.4 }));
            startSphere.position.copy(points[0]);
            group.add(startSphere);
            const endSphere = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.4 }));
            endSphere.position.copy(points[points.length - 1]);
            group.add(endSphere);
          }
        }

        rebuild();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => { cancelled = true; };
  }, [xExpr, yExpr, zExpr, tMin, tMax, parseExpr]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Parametric Curve Plotter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Parametric Equations">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1"><Label htmlFor="x">x(t)</Label><Input id="x" value={xExpr} onChange={(e) => setXExpr(e.target.value)} placeholder="e.g. cos(t)" /></div>
            <div className="space-y-1"><Label htmlFor="y">y(t)</Label><Input id="y" value={yExpr} onChange={(e) => setYExpr(e.target.value)} placeholder="e.g. sin(t)" /></div>
            <div className="space-y-1"><Label htmlFor="z">z(t)</Label><Input id="z" value={zExpr} onChange={(e) => setZExpr(e.target.value)} placeholder="e.g. t/5" /></div>
            <div className="space-y-1"><Label htmlFor="tmin">t min</Label><Input id="tmin" value={tMin} onChange={(e) => setTMin(e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="tmax">t max</Label><Input id="tmax" value={tMax} onChange={(e) => setTMax(e.target.value)} /></div>
          </div>
        </CollapsibleControls>
        {error ? <WebGLFallback /> : <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D parametric curve" />}
        <p className="text-xs text-muted-foreground">Enter parametric equations x(t), y(t), z(t). Supports: +, -, *, /, ^, sin, cos, tan, sqrt, abs, exp, log, pi. Green = start, Red = end.</p>
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">You enter x(t), y(t), z(t) and see a 3D tube curve. Green dot = start, red dot = end. Drag to rotate.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Parametric equations describe curves where x, y, z are each functions of a parameter t. The curve can loop, knot, or spiral in 3D space.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Parametric curves model robot arms, roller coaster tracks, particle trajectories, and Bezier curves in computer graphics.</p>
        </div>
</CardContent>
    </Card>
  );
}

function VectorFieldVisualizer() {
  const [fieldType, setFieldType] = useState<"vortex" | "saddle" | "radial" | "helix">("vortex");
  const containerRef = useRef<HTMLDivElement>(null);

  const getVector = useMemo(() => {
    return (x: number, y: number, z: number, type: string): THREE.Vector3 => {
      switch (type) {
        case "vortex": return new THREE.Vector3(-y, x, z * 0.1);
        case "saddle": return new THREE.Vector3(x, -y, z);
        case "radial": return new THREE.Vector3(x, y, z);
        case "helix": return new THREE.Vector3(-y, x, 1);
        default: return new THREE.Vector3();
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
if (!isWebGLAvailable()) {
          return;
        }
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 8, 12);
                if (!isWebGLAvailable()) {
          return;
        }
const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        const grid = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(grid);

        const group = new THREE.Group();
        scene.add(group);

        function rebuild() {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.ArrowHelper) {
              const helper = child as any;
              helper.line?.geometry?.dispose();
              if (helper.line?.material) (helper.line.material as THREE.Material).dispose();
              helper.cone?.geometry?.dispose();
              if (helper.cone?.material) (helper.cone.material as THREE.Material).dispose();
            }
          }
          const resolution = 6;
          const spacing = 2;
          for (let i = -resolution; i <= resolution; i++) {
            for (let j = -resolution; j <= resolution; j++) {
              for (let k = -resolution; k <= resolution; k++) {
                const x = i * spacing;
                const y = j * spacing;
                const z = k * spacing;
                const v = getVector(x, y, z, fieldType);
                const mag = v.length();
                if (mag < 0.001) continue;
                const len = Math.min(1.5, mag * 0.3);
                const dir = v.clone().normalize();
                const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(x, y, z), len, 0x3b82f6, len * 0.3, len * 0.2);
                const arrowAny = arrow as any;
                if (arrowAny.line?.material) { arrowAny.line.material.transparent = true; arrowAny.line.material.opacity = Math.min(1, mag * 0.05); }
                group.add(arrow);
              }
            }
          }
        }

        rebuild();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => { cancelled = true; };
  }, [fieldType, getVector]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Vector Field Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Field Options">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Field:</Label>
            <Select value={fieldType} onValueChange={(v) => setFieldType(v as typeof fieldType)}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="vortex">Vortex (Curl)</SelectItem>
                <SelectItem value="saddle">Saddle Point</SelectItem>
                <SelectItem value="radial">Radial (Div)</SelectItem>
                <SelectItem value="helix">Helix</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D vector field" />
        <p className="text-xs text-muted-foreground">Blue arrows show vector field F(x,y,z) at grid points. Arrow length = magnitude. Vortex: F = (-y, x, 0.1z). Saddle: F = (x, -y, z). Radial: F = (x, y, z).</p>
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Blue arrows fill a 3D grid. Arrow direction = vector direction; length = magnitude. Patterns: vortex, saddle, radial, helix.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Vortex fields have curl (rotation). Radial fields have divergence (source/sink). Saddle points have both. Helix fields twist around an axis.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Vector fields model fluid flow, electromagnetic fields, wind patterns, and gradient descent in optimization. Divergence and curl are key concepts in vector calculus.</p>
        </div>
</CardContent>
    </Card>
  );
}

function ComplexFunctionPlotter() {
  const [func, setFunc] = useState("z^2");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(5, 5, 8);
                if (!isWebGLAvailable()) {
          return;
        }
const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dir = new THREE.DirectionalLight(0xffffff, 1);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        const grid = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(grid);

        const complexToColor = (z: { x: number; y: number }): THREE.Color => {
          const mag = Math.sqrt(z.x * z.x + z.y * z.y);
          const phase = Math.atan2(z.y, z.x);
          const hue = (phase + Math.PI) / (2 * Math.PI);
          const lightness = Math.min(0.8, 0.3 + mag * 0.1);
          const color = new THREE.Color();
          color.setHSL(hue, 0.8, lightness);
          return color;
        };

        const computeComplex = (zReal: number, zImag: number, expr: string): { x: number; y: number } => {
          try {
            return evaluateComplex(expr, zReal, zImag);
          } catch { return { x: NaN, y: NaN }; }
        };

        const group = new THREE.Group();
        scene.add(group);

        function rebuild() {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Mesh || child instanceof THREE.Points) { child.geometry.dispose(); (child.material as THREE.Material).dispose(); }
          }

          const size = 4;
          const divisions = 40;
          const planeGeo = new THREE.PlaneGeometry(size * 2, size * 2, divisions, divisions);
          const positions = planeGeo.attributes.position as THREE.BufferAttribute;
          const colors: number[] = [];

          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const result = computeComplex(x, y, func);
            if (Number.isFinite(result.x) && Number.isFinite(result.y)) {
              const mag = Math.sqrt(result.x * result.x + result.y * result.y);
              const height = Math.min(3, Math.log(mag + 1) * 0.5);
              positions.setZ(i, height);
              const color = complexToColor(result);
              colors.push(color.r, color.g, color.b);
            } else {
              positions.setZ(i, 0);
              colors.push(0.1, 0.1, 0.1);
            }
          }

          planeGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
          planeGeo.computeVertexNormals();
          const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.3, metalness: 0.2, side: THREE.DoubleSide });
          const mesh = new THREE.Mesh(planeGeo, material);
          mesh.rotation.x = -Math.PI / 2;
          group.add(mesh);

          const axisGeo = new THREE.CylinderGeometry(0.02, 0.02, size * 2 + 2, 8);
          const axisMat = new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.3 });
          const axisX = new THREE.Mesh(axisGeo, axisMat);
          axisX.rotation.z = Math.PI / 2;
          group.add(axisX);
          const axisY = new THREE.Mesh(axisGeo, axisMat);
          group.add(axisY);
        }

        rebuild();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        function handleResize() {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    load();
    return () => { cancelled = true; };
  }, [func]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Complex Function Plotter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Function Options">
          <div className="space-y-1">
            <Label htmlFor="func">f(z)</Label>
            <Input id="func" value={func} onChange={(e) => setFunc(e.target.value)} placeholder="e.g. z^2, sin(z), 1/z" />
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-border" aria-label="3D complex function" />
        <p className="text-xs text-muted-foreground">Domain coloring with height = log|f(z)|. Hue = arg(f(z)). Red = real axis, Blue = imaginary. Supports: +, -, *, /, ^, sin, cos, tan, sqrt, abs, exp, log, pi, i.</p>
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">A colored 3D surface represents f(z). Hue = argument (angle) of the output; height = magnitude. Domain coloring reveals zeros and poles.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Complex functions map the 2D complex plane to another 2D complex plane. The surface height shows magnitude; color shows phase. Zeros appear as sinks; poles as spikes.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Complex analysis underpins signal processing (FFT), quantum mechanics, fluid dynamics, and conformal mapping used in map projections and circuit design.</p>
        </div>
</CardContent>
    </Card>
  );
}

export function MathAdvanced3D() {
  return (
    <Tabs defaultValue="parametric" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="parametric">Parametric Curves</TabsTrigger>
        <TabsTrigger value="vectorfield">Vector Field</TabsTrigger>
        <TabsTrigger value="complex">Complex Functions</TabsTrigger>
      </TabsList>
      <TabsContent value="parametric" className="mt-4">
        <ParametricCurvePlotter />
      </TabsContent>
      <TabsContent value="vectorfield" className="mt-4">
        <VectorFieldVisualizer />
      </TabsContent>
      <TabsContent value="complex" className="mt-4">
        <ComplexFunctionPlotter />
      </TabsContent>
    </Tabs>
  );
}
