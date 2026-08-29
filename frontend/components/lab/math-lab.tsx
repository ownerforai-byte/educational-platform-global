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
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
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
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
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
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
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
