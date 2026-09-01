/**
 * Curve Sketching Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics Algebra → Curve Sketching
 * Topic: Class 11 Mathematics → Unit: Algebra → Curve Sketching
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Activity,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Symmetry Visual ---------- */
function SymmetryVisual() {
  const [funcType, setFuncType] = useState<"cos" | "sin">("cos");
  const [period, setPeriod] = useState<number>(1);
  const [showSymmetryAxis, setShowSymmetryAxis] = useState<boolean>(true);

  const w = 400;
  const h2 = 280;
  const ox = 60;
  const oy = h2 - 40;
  const scale = 50;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Function definitions
  const f = (x: number): number => {
    if (funcType === "cos") {
      return Math.cos(period * x);
    } else {
      return Math.sin(period * x);
    }
  };

  // Generate graph points
  const graphPoints: string[] = [];
  const step = 0.1;
  for (let vx = -4; vx <= 4; vx += step) {
    const vy = f(vx);
    const sy = toSvgY(vy);
    if (sy >= 0 && sy <= h2) {
      graphPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Symmetry axis (x = 0 for cos, x = π/(2*period) for sin)
  const symmetryAxisX = funcType === "cos" ? 0 : Math.PI / (2 * period);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Function:</span>
          <select
            value={funcType}
            onChange={(e) => setFuncType(e.target.value as "cos" | "sin")}
            className="px-2 py-1 text-sm border rounded-md bg-background"
          >
            <option value="cos">Cosine (even function)</option>
            <option value="sin">Sine (odd function)</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Period = </span>
          <input
            type="number"
            value={period}
            onChange={(e) => setPeriod(parseFloat(e.target.value) || 1)}
            className="w-16 bg-transparent border-b text-foreground"
            step="0.1"
          />
        </div>
        <Button
          variant={showSymmetryAxis ? "default" : "outline"}
          size="sm"
          onClick={() => setShowSymmetryAxis(!showSymmetryAxis)}
        >
          {showSymmetryAxis ? "Hide Axis" : "Show Axis"}
        </Button>
      </div>

      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${w} ${h2}`}
          className="w-full max-w-lg border rounded-lg bg-slate-950"
        >
          {/* Axes */}
          <line x1={0} y1={oy} x2={w} y2={oy} stroke="#475569" strokeWidth="1" />
          <line x1={ox} y1={0} x2={ox} y2={h2} stroke="#475569" strokeWidth="1" />
          <text x={w - 10} y={oy - 5} fill="#64748b" fontSize="10">x</text>
          <text x={ox + 5} y={12} fill="#64748b" fontSize="10">f(x)</text>

          {/* Symmetry axis */}
          {showSymmetryAxis && (
            <line
              x1={toSvgX(symmetryAxisX)}
              y1={0}
              x2={toSvgX(symmetryAxisX)}
              y2={h2}
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          )}

          {/* Graph line */}
          {graphPoints.length > 1 && (
            <polyline
              points={graphPoints.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Origin */}
          <circle cx={ox} cy={oy} r="2" fill="#64748b" />
        </svg>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Symmetry:</strong> {funcType === "cos" ? "Cosine is an even function — symmetric about the y-axis (f(x) = f(-x))." : "Sine is an odd function — symmetric about the origin (f(-x) = -f(x))."}{" "}
        Adjust the period to see how symmetry changes.
      </div>
    </div>
  );
}

/* ---------- Monotonicity Visual ---------- */
function MonotonicityVisual() {
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(0);

  const w = 400;
  const h2 = 300;
  const ox = 80;
  const oy = h2 - 40;
  const scale = 50;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // f(x) = ax³ + bx
  const f = (x: number): number => paramA * x * x * x + paramB * x;

  // Derivative f'(x) = 3ax² + b
  const fPrime = (x: number): number => 3 * paramA * x * x + paramB;

  // Generate graph points with color based on monotonicity
  const graphPoints: { x: number; y: number; increasing: boolean }[] = [];
  const step = 0.1;
  for (let vx = -3; vx <= 3; vx += step) {
    const vy = f(vx);
    const sy = toSvgY(vy);
    if (sy >= 0 && sy <= h2) {
      const isIncreasing = fPrime(vx) >= 0;
      graphPoints.push({ x: toSvgX(vx), y: sy, increasing: isIncreasing });
    }
  }

  // Generate SVG polylines split by increasing/decreasing
  const increasingPath: string[] = [];
  const decreasingPath: string[] = [];
  let lastIncreasing: boolean | null = null;

  for (const pt of graphPoints) {
    if (lastIncreasing !== pt.increasing) {
      // New segment starts
      if (increasingPath.length > 1) {
        increasingPath.push(`${pt.x},${pt.y.toFixed(1)}`);
      }
      if (decreasingPath.length > 1) {
        decreasingPath.push(`${pt.x},${pt.y.toFixed(1)}`);
      }
      lastIncreasing = pt.increasing;
    }

    if (pt.increasing) {
      increasingPath.push(`${pt.x},${pt.y.toFixed(1)}`);
    } else {
      decreasingPath.push(`${pt.x},${pt.y.toFixed(1)}`);
    }
  }

  // Find critical points (where derivative = 0)
  const criticalPoints: number[] = [];
  for (let vx = -3; vx <= 3; vx += 0.1) {
    const df1 = fPrime(vx - 0.1);
    const df2 = fPrime(vx + 0.1);
    if (df1 * df2 <= 0) {
      criticalPoints.push(vx);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">a = </span>
          <input
            type="number"
            value={paramA}
            onChange={(e) => setParamA(parseFloat(e.target.value) || 1)}
            className="w-16 bg-transparent border-b text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">b = </span>
          <input
            type="number"
            value={paramB}
            onChange={(e) => setParamB(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${w} ${h2}`}
          className="w-full max-w-lg border rounded-lg bg-slate-950"
        >
          {/* Axes */}
          <line x1={0} y1={oy} x2={w} y2={oy} stroke="#475569" strokeWidth="1" />
          <line x1={ox} y1={0} x2={ox} y2={h2} stroke="#475569" strokeWidth="1" />
          <text x={w - 10} y={oy - 5} fill="#64748b" fontSize="10">x</text>
          <text x={ox + 5} y={12} fill="#64748b" fontSize="10">f(x)</text>

          {/* Increasing segments (green) */}
          {increasingPath.length > 1 && (
            <polyline
              points={increasingPath.join(" ")}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
            />
          )}

          {/* Decreasing segments (red) */}
          {decreasingPath.length > 1 && (
            <polyline
              points={decreasingPath.join(" ")}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
            />
          )}

          {/* Critical points */}
          {criticalPoints.map((cp, idx) => (
            <g key={idx}>
              <circle
                cx={toSvgX(cp)}
                cy={toSvgY(f(cp))}
                r="4"
                fill="#f97316"
                stroke="#ffffff"
                strokeWidth="1"
              />
              <text
                x={toSvgX(cp) + 6}
                y={toSvgY(f(cp)) - 6}
                fill="#f97316"
                fontSize="9"
              >
                CP
              </text>
            </g>
          ))}

          {/* Origin */}
          <circle cx={ox} cy={oy} r="2" fill="#64748b" />
        </svg>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Monotonicity:</strong> The graph is colored <span className="text-green-500">green</span> where increasing and <span className="text-red-500">red</span> where decreasing. Orange dots mark critical points where monotonicity changes.
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Even and Odd Functions",
    points: [
      "Even: f(-x) = f(x), symmetric about the y-axis (e.g., x², cos(x))",
      "Odd: f(-x) = -f(x), symmetric about the origin (e.g., x³, sin(x))",
      "Most functions are neither even nor odd",
    ],
  },
  {
    title: "Periodicity",
    points: [
      "f(x + T) = f(x) for all x, where T is the period",
      "Smallest positive T is the fundamental period",
      "sin and cos have period 2π; tan has period π",
    ],
  },
  {
    title: "Monotonicity",
    points: [
      "Increasing: f'(x) > 0 — graph rises left to right",
      "Decreasing: f'(x) < 0 — graph falls left to right",
      "Critical points: f'(x) = 0 or f'(x) does not exist",
      "Local max/min occur at critical points",
    ],
  },
  {
    title: "Quadratic and Cubic Graphs",
    points: [
      "Quadratic: parabola opening up (a > 0) or down (a < 0)",
      "Cubic: at least one real root, always crosses x-axis",
      "Cubic can have local max and min (two critical points)",
      "Quadratic has vertex at x = -b/(2a)",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function CurveSketchingResources() {
  return (
    <div className="space-y-6">
      {/* PDF Resources */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Curve Sketching — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercise 3.1 with symmetry, periodicity, and graph sketching techniques
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-3-1",
              title: "Exercise 3.1 — Curve Sketching",
              description:
                "Odd/even functions, periodicity, symmetry, monotonicity, graph sketching.",
              url: "https://drive.google.com/file/d/15QQAJxSUYiKmcuaLSWS_Ewo5Ps7nzn9w/preview",
              pdfUrl:
                "https://drive.google.com/file/d/15QQAJxSUYiKmcuaLSWS_Ewo5Ps7nzn9w/view?usp=sharing",
              tags: ["Exercise 3.1", "Symmetry", "Graphs"],
            },
          ].map((res) => (
            <div
              key={res.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-background/60 hover:bg-accent/50 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{res.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {res.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="shrink-0">
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Open
                </a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Interactive Visuals */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Interactive Visualizations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore symmetry, periodicity, and monotonicity of curves
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="symmetry" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="symmetry">Symmetry</TabsTrigger>
              <TabsTrigger value="monotonicity">Monotonicity</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="symmetry" className="space-y-4">
              <SymmetryVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Symmetry Properties:</strong> Toggle between cos (even) and sin (odd) to see different symmetry types. The dashed orange line shows the axis of symmetry.
              </div>
            </TabsContent>

            <TabsContent value="monotonicity" className="space-y-4">
              <MonotonicityVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Monotonicity:</strong> The graph is colored <span className="text-green-500">green</span> where increasing and <span className="text-red-500">red</span> where decreasing. Orange dots mark critical points.
              </div>
            </TabsContent>

            <TabsContent value="theory" className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {THEORY_SECTIONS.map((sec) => (
                  <div
                    key={sec.title}
                    className="p-3 rounded-lg border bg-background/60"
                  >
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      {sec.title}
                    </h4>
                    <ul className="space-y-1">
                      {sec.points.map((p, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground flex items-start gap-1.5"
                        >
                          <span className="text-purple-500 mt-0.5">•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
