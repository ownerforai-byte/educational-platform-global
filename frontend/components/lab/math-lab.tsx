"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { evaluate } from "mathjs";

function MeaningPanel({ title, meaning, points }: { title: string; meaning: string; points: string[] }) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 p-3 w-full" role="region" aria-label="Concept explanation">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Concept & Why It Matters</p>
      <h4 className="mt-1 text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{meaning}</p>
      {points.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground" role="list">
          {points.map((p, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-primary" aria-hidden="true">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type FunctionGraphProps = {
  fn: (x: number) => number;
  range: { min: number; max: number };
  color?: string;
};

function FunctionGraph({ fn, range, color = "#2563eb" }: FunctionGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    setDimensions({ width: rect.width, height: rect.height });

    ctx.clearRect(0, 0, rect.width, rect.height);

    const padding = 40;
    const width = rect.width - padding * 2;
    const height = rect.height - padding * 2;

    // Grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * width;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, rect.height - padding);
      ctx.stroke();
      const y = padding + (i / 10) * height;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, rect.height - padding);
    ctx.lineTo(rect.width - padding, rect.height - padding);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, rect.height - padding);
    ctx.stroke();

    // Curve
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= width; px++) {
      const x = range.min + (px / width) * (range.max - range.min);
      const y = typeof fn === "function" ? fn(x) : NaN;
      if (!Number.isFinite(y)) {
        started = false;
        continue;
      }
      const canvasY = rect.height - padding - ((y - range.min) / (range.max - range.min)) * height;
      if (!started) {
        ctx.moveTo(padding + px, canvasY);
        started = true;
      } else {
        ctx.lineTo(padding + px, canvasY);
      }
    }
    ctx.stroke();
  }, [fn, range, color, dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-auto min-h-[200px] max-h-[400px]" 
        aria-label="Function graph visualization"
        role="img"
        style={{ height: 'auto' }}
      />
    </div>
  );
}

function InteractiveFunctionGraph() {
  const [fnExpr, setFnExpr] = useState("x^2");
  const [graphFn, setGraphFn] = useState<(x: number) => number>((x) => x * x);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function updateFunction(expr: string) {
    setFnExpr(expr);
    setError(null);
    setIsLoading(true);
    try {
      const fn = (x: number) => {
        const result = evaluate(expr, { x });
        return Number(result);
      };
      setGraphFn(fn);
    } catch {
      setError("Invalid expression. Try: x^2, sin(x), 2*x+3");
      setGraphFn(() => () => NaN);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full" role="region" aria-label="Interactive function grapher">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Interactive Function Grapher</span>
          <span className="text-xs text-muted-foreground font-normal">Type any function and press Plot</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Function Options">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end w-full">
            <div className="flex-1 space-y-2 w-full">
              <Label htmlFor="function">f(x)</Label>
              <Input
                id="function"
                value={fnExpr}
                onChange={(e) => setFnExpr(e.target.value)}
                placeholder="e.g. x^2, sin(x), 2*x+3"
                className="w-full"
                aria-describedby="function-help"
              />
              <p id="function-help" className="text-xs text-muted-foreground">
                Supports: +, -, *, /, ^, sin, cos, tan, sqrt, abs, log, exp
              </p>
            </div>
            <Button 
              onClick={() => updateFunction(fnExpr)} 
              className="w-full sm:w-auto"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Plotting..." : "Plot"}
            </Button>
          </div>
          {error && (
            <p className="text-xs text-destructive" role="alert">{error}</p>
          )}
          <div className="flex flex-wrap gap-2 w-full" role="group" aria-label="Preset functions">
            {["x^2", "x^3", "sin(x)", "cos(x)", "2*x+3", "x^2-4", "abs(x)", "1/x"].map((preset) => (
              <Button 
                key={preset} 
                variant="outline" 
                size="sm" 
                onClick={() => updateFunction(preset)} 
                className="flex-1 min-w-[80px] touch-manipulation"
                aria-label={`Plot ${preset}`}
              >
                {preset}
              </Button>
            ))}
          </div>
        </CollapsibleControls>
        <FunctionGraph fn={graphFn} range={{ min: -10, max: 10 }} />
        <MeaningPanel
          title="Function Transformation (Class 11)"
          meaning="A function maps each input x to exactly one output f(x). Understanding transformations helps you sketch graphs without plotting every point."
          points={[
            "f(x) + k → shift up k • f(x) − k → shift down k",
            "f(x − h) → shift right h • f(x + h) → shift left h",
            "−f(x) → reflection in x-axis • f(−x) → reflection in y-axis",
            "y = ax² + bx + c: |a| > 1 stretches, |a| < 1 compresses; a < 0 reflects",
            "Vertex of parabola = point where the graph turns",
          ]}
        />
      </CardContent>
    </Card>
  );
}

function CoordinateGeometry3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState("points");
  const sceneRef = useRef<{ dispose: () => void } | null>(null);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        if (cancelled || !containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        scene.fog = new THREE.Fog(0x0f172a, 40, 90);

        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 6, 12);

        if (!isWebGL) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 20, 15);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.6);
        dirLight2.position.set(-10, -5, -10);
        scene.add(dirLight2);

        const pointLight = new THREE.PointLight(0x22d3ee, 0.8, 50);
        pointLight.position.set(0, 0, 15);
        scene.add(pointLight);

        const gridHelper = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        const group = new THREE.Group();
        scene.add(group);

        const addPoint = (x: number, y: number, z: number, color = 0xef4444) => {
          const geo = new THREE.SphereGeometry(0.15, 16, 16);
          const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.3 });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(x, y, z);
          mesh.castShadow = true;
          group.add(mesh);
        };

        const addLine = (start: [number, number, number], end: [number, number, number], color = 0x22c55e) => {
          const material = new THREE.LineBasicMaterial({ color });
          const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, material);
          group.add(line);
        };

        const addPlane = (y: number, color = 0x6366f1) => {
          const planeGeo = new THREE.PlaneGeometry(12, 12);
          const planeMat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.4, side: THREE.DoubleSide, roughness: 0.6, metalness: 0.1 });
          const plane = new THREE.Mesh(planeGeo, planeMat);
          plane.rotation.x = -Math.PI / 2;
          plane.position.y = y;
          plane.receiveShadow = true;
          group.add(plane);
        };

        const renderScene = (currentMode: string) => {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
              child.geometry?.dispose();
              (child.material as THREE.Material)?.dispose();
            }
          }

          if (currentMode === "points") {
            addPoint(1, 2, 3, 0xef4444);
            addPoint(-2, 1, 4, 0x3b82f6);
            addPoint(3, -1, 2, 0x22c55e);
            addPoint(0, 0, 0, 0xfbbf24);
            addPoint(2, 3, 1, 0xa855f7);
            addLine([0, 0, 0], [1, 2, 3], 0xef4444);
            addLine([0, 0, 0], [-2, 1, 4], 0x3b82f6);
            addLine([1, 2, 3], [-2, 1, 4], 0x22c55e);
          } else if (currentMode === "plane") {
            addPlane(2, 0x6366f1);
            addPoint(1, 2, 3, 0xef4444);
            addPoint(-2, 2, 4, 0x3b82f6);
            addPoint(3, 2, 2, 0x22c55e);
            addLine([-5, 2, -5], [5, 2, -5], 0x6366f1);
            addLine([-5, 2, -5], [-5, 2, 5], 0x6366f1);
            addLine([5, 2, -5], [5, 2, 5], 0x6366f1);
            addLine([-5, 2, 5], [5, 2, 5], 0x6366f1);
          } else if (currentMode === "vector") {
            addPoint(0, 0, 0, 0xfbbf24);
            addLine([0, 0, 0], [3, 4, 0], 0xef4444);
            addLine([0, 0, 0], [0, 3, 4], 0x3b82f6);
            addLine([0, 0, 0], [4, 0, 3], 0x22c55e);
            const dir1 = new THREE.Vector3(3, 4, 0).normalize();
            const coneGeo = new THREE.ConeGeometry(0.15, 0.5, 8);
            const coneMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.3 });
            const cone = new THREE.Mesh(coneGeo, coneMat);
            cone.position.copy(dir1.clone().multiplyScalar(5));
            cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir1);
            cone.castShadow = true;
            group.add(cone);
          }
        };

        renderScene(mode);

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        const resizeObserver = new ResizeObserver(() => {
          if (!container || cancelled) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        });
        resizeObserver.observe(container);

        sceneRef.current = {
          dispose: () => {
            cancelled = true;
            resizeObserver.disconnect();
            renderer.dispose();
            if (container && renderer.domElement.parentNode === container) {
              container.removeChild(renderer.domElement);
            }
          }
        };

        return () => {
          cancelled = true;
          resizeObserver.disconnect();
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch {
        // 3D not available
      }
    }

    const cleanup = load();
    return () => {
      cancelled = true;
      cleanup.then((fn) => fn?.());
    };
  }, [mode, isWebGL]);

  useEffect(() => {
    return () => {
      sceneRef.current?.dispose();
    };
  }, []);

  if (!isWebGL) {
    return (
      <WebGLFallback 
        title="Coordinate Geometry 3D"
        description="3D visualization requires WebGL support. Try a modern browser or enable hardware acceleration."
      />
    );
  }

  return (
    <div className="space-y-3 w-full">
      <div 
        ref={containerRef} 
        className="lab-3d-container w-full rounded-md border border-border" 
        aria-label="Interactive 3D coordinate geometry"
        role="img"
        style={{ height: 'clamp(300px, 50vh, 600px)' }}
      />
      <CollapsibleControls label="Mode Options">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <Label>Mode:</Label>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="w-full sm:w-40 touch-manipulation">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Points & Lines</SelectItem>
              <SelectItem value="plane">Plane</SelectItem>
              <SelectItem value="vector">Vectors</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <p className="text-xs text-muted-foreground">
        Interactive 3D coordinate geometry. Drag to rotate, scroll to zoom. Red/Blue/Green = X/Y/Z axes.
      </p>
    </div>
  );
}

function MathSurfaces3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [surfaceType, setSurfaceType] = useState("saddle");
  const sceneRef = useRef<{ dispose: () => void } | null>(null);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
  }, []);

  const getSurfaceZ = (x: number, y: number, type: string): number => {
    switch (type) {
      case "saddle":
        return (x * x - y * y) / 4;
      case "wave":
        return Math.sin(x) * Math.cos(y);
      case "ripple":
        return Math.sin(Math.sqrt(x * x + y * y)) * 2;
      case "peak":
        return Math.exp(-(x * x + y * y) / 8) * 3;
      case "plane":
        return 0.5 * x + 0.3 * y;
      case "cylinder":
        return Math.sin(x) * 1.5;
      default:
        return 0;
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        if (cancelled || !containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        scene.fog = new THREE.Fog(0x0f172a, 40, 90);

        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 8, 12);

        if (!isWebGL) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 20, 15);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.6);
        dirLight2.position.set(-10, -5, -10);
        scene.add(dirLight2);

        const pointLight = new THREE.PointLight(0x22d3ee, 0.8, 50);
        pointLight.position.set(0, 0, 15);
        scene.add(pointLight);

        const gridHelper = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(gridHelper);

        const group = new THREE.Group();
        scene.add(group);

        const createSurface = (type: string) => {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Mesh) {
              child.geometry?.dispose();
              (child.material as THREE.Material)?.dispose();
            }
          }

          const size = 8;
          const divisions = 80;
          const geometry = new THREE.PlaneGeometry(size * 2, size * 2, divisions, divisions);
          const positions = geometry.attributes.position as THREE.BufferAttribute;
          const colors: number[] = [];

          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = getSurfaceZ(x, y, type);
            positions.setZ(i, z);

            const intensity = (z + 2) / 4;
            const r = intensity * 0.2 + 0.1;
            const g = intensity * 0.8 + 0.1;
            const b = intensity * 0.6 + 0.2;
            colors.push(r, g, b);
          }

          geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
          geometry.computeVertexNormals();

          const material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.25,
            metalness: 0.35,
            side: THREE.DoubleSide,
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.rotation.x = -Math.PI / 2;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          group.add(mesh);
        };

        createSurface(surfaceType);

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        const resizeObserver = new ResizeObserver(() => {
          if (!container || cancelled) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        });
        resizeObserver.observe(container);

        sceneRef.current = {
          dispose: () => {
            cancelled = true;
            resizeObserver.disconnect();
            renderer.dispose();
            if (container && renderer.domElement.parentNode === container) {
              container.removeChild(renderer.domElement);
            }
          }
        };

        return () => {
          cancelled = true;
          resizeObserver.disconnect();
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch {
        // 3D not available
      }
    }

    const cleanup = load();
    return () => {
      cancelled = true;
      cleanup.then((fn) => fn?.());
    };
  }, [surfaceType, isWebGL]);

  useEffect(() => {
    return () => {
      sceneRef.current?.dispose();
    };
  }, []);

  if (!isWebGL) {
    return (
      <WebGLFallback 
        title="3D Mathematical Surfaces"
        description="3D visualization requires WebGL support. Try a modern browser or enable hardware acceleration."
      />
    );
  }

  const surfaceLabels: Record<string, string> = {
    saddle: "Saddle (z = x² − y²)",
    wave: "Wave (z = sin(x)·cos(y))",
    ripple: "Ripple (z = sin(√(x²+y²)))",
    peak: "Peak (z = e^−(x²+y²)/8)",
    plane: "Plane (z = 0.5x + 0.3y)",
    cylinder: "Cylinder (z = sin(x))",
  };

  return (
    <div className="space-y-3 w-full">
      <div 
        ref={containerRef} 
        className="lab-3d-container w-full rounded-md border border-border" 
        aria-label="3D mathematical surfaces"
        role="img"
        style={{ height: 'clamp(300px, 50vh, 600px)' }}
      />
      <CollapsibleControls label="Surface Options">
        <div className="flex flex-wrap items-center gap-2 w-full">
          <Label>Surface:</Label>
          <Select value={surfaceType} onValueChange={setSurfaceType}>
            <SelectTrigger className="w-full sm:w-52 touch-manipulation">
              <SelectValue placeholder="Select surface" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(surfaceLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CollapsibleControls>
      <MeaningPanel
        title="3D Surfaces & Functions (Class 11)"
        meaning="A surface z = f(x, y) shows how the output varies over the xy-plane. The color gradient indicates height, helping you visualize multi-variable functions."
        points={[
          "Plane: z = ax + by + c → flat surface, slope determined by a and b",
          "Paraboloid: z = x² + y² → like a bowl opening upward",
          "Saddle: z = x² − y² → curves up one way, down the other",
          "Wave: z = sin(x)·cos(y) → periodic in both directions",
          "Rotation, zoom, and color mapping help understand 3D shapes",
        ]}
      />
    </div>
  );
}

function Parabola3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ dispose: () => void } | null>(null);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        if (cancelled || !containerRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        scene.fog = new THREE.Fog(0x0f172a, 40, 90);

        const container = containerRef.current;
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 6, 12);

        if (!isWebGL) return;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 20, 15);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.6);
        dirLight2.position.set(-10, -5, -10);
        scene.add(dirLight2);

        const pointLight = new THREE.PointLight(0x22d3ee, 0.8, 50);
        pointLight.position.set(0, 0, 15);
        scene.add(pointLight);

        const gridHelper = new THREE.GridHelper(20, 40, 0x334155, 0x1e293b);
        scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        const points: THREE.Vector3[] = [];
        const segments = 200;
        for (let i = 0; i <= segments; i++) {
          const x = -6 + (i / segments) * 12;
          const y = x * x;
          points.push(new THREE.Vector3(x, y, 0));
        }

        const curve = new (THREE as any).CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 200, 0.12, 8, false);
        const tubeMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.25, metalness: 0.35 });
        const parabola = new THREE.Mesh(tubeGeometry, tubeMaterial);
        parabola.castShadow = true;
        parabola.receiveShadow = true;
        scene.add(parabola);

        const vertexPoints = points.filter((_, i) => i % 20 === 0);
        vertexPoints.forEach((point) => {
          const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
          const sphereMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.3 });
          const sphere = new THREE.Mesh(sphereGeo, sphereMat);
          sphere.position.copy(point);
          sphere.castShadow = true;
          scene.add(sphere);
        });

        const focusPoint = new THREE.Vector3(0, 0.25, 0);
        const focusGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const focusMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2, emissive: 0xfbbf24, emissiveIntensity: 0.4, metalness: 0.2 });
        const focusSphere = new THREE.Mesh(focusGeo, focusMat);
        focusSphere.position.copy(focusPoint);
        focusSphere.castShadow = true;
        scene.add(focusSphere);

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        const resizeObserver = new ResizeObserver(() => {
          if (!container || cancelled) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        });
        resizeObserver.observe(container);

        sceneRef.current = {
          dispose: () => {
            cancelled = true;
            resizeObserver.disconnect();
            renderer.dispose();
            if (container && renderer.domElement.parentNode === container) {
              container.removeChild(renderer.domElement);
            }
          }
        };

        return () => {
          cancelled = true;
          resizeObserver.disconnect();
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch {
        // 3D not available
      }
    }

    const cleanup = load();
    return () => {
      cancelled = true;
      cleanup.then((fn) => fn?.());
    };
  }, [isWebGL]);

  useEffect(() => {
    return () => {
      sceneRef.current?.dispose();
    };
  }, []);

  if (!isWebGL) {
    return (
      <WebGLFallback 
        title="3D Parabola"
        description="3D visualization requires WebGL support. Try a modern browser or enable hardware acceleration."
      />
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="lab-3d-container w-full rounded-md border border-border" 
      aria-label="Interactive 3D parabola visualization"
      role="img"
      style={{ height: 'clamp(300px, 50vh, 600px)' }}
    />
  );
}

export function MathLab() {
  const [tab, setTab] = useState("geometry");

  return (
    <Card className="w-full" role="region" aria-label="Mathematics laboratory">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Mathematics Lab</span>
          <span className="text-xs text-muted-foreground font-normal">Interactive geometry, graphs & algebra for Class 11</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full" role="tablist" aria-label="Lab sections">
          <TabsList className="flex-wrap w-full" role="tablist">
            <TabsTrigger value="geometry" className="flex-1 min-w-[120px] touch-manipulation" role="tab" aria-selected={tab === "geometry"}>
              Coordinate Geometry
            </TabsTrigger>
            <TabsTrigger value="graph" className="flex-1 min-w-[120px] touch-manipulation" role="tab" aria-selected={tab === "graph"}>
              Function Graphs
            </TabsTrigger>
            <TabsTrigger value="surface" className="flex-1 min-w-[120px] touch-manipulation" role="tab" aria-selected={tab === "surface"}>
              3D Surfaces
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geometry" className="mt-4" role="tabpanel" aria-labelledby="tab-geometry">
            <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><p className="text-muted-foreground">Loading 3D geometry...</p></div>}>
              <MathGeometry3D />
            </Suspense>
          </TabsContent>

          <TabsContent value="graph" className="mt-4" role="tabpanel" aria-labelledby="tab-graph">
            <div className="space-y-6 w-full">
              <InteractiveFunctionGraph />
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>3D Parabola (y = x²)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground">Loading parabola...</p></div>}>
                    <Parabola3D />
                  </Suspense>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Coordinate Geometry in 3D</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Interactive 3D coordinate geometry with points, lines, planes, and vectors.
                  </p>
                  <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground">Loading 3D scene...</p></div>}>
                    <CoordinateGeometry3D />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="surface" className="mt-4" role="tabpanel" aria-labelledby="tab-surface">
            <div className="space-y-6 w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>3D Mathematical Surfaces</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><p className="text-muted-foreground">Loading surfaces...</p></div>}>
                    <MathSurfaces3D />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
