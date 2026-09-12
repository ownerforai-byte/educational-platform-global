/**
 * Application of Derivatives Resources Panel
 * Displays interactive visuals + theory for Class 11 Application of Derivatives
 * Topic: Class 11 Mathematics → Unit: Calculus → Application of Derivatives
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Tangent & Normal Visual ---------- */
function TangentNormalVisual() {
  const [x0, setX0] = useState(1.5);

  // f(x) = x² (a simple parabola for clear tangent/normal illustration)
  const f = (v: number) => v * v;
  const fp = (v: number) => 2 * v; // derivative

  const wy = f(x0);
  const slope = fp(x0);

  const w = 400;
  const h2 = 320;
  const ox = 60;
  const oy = h2 - 40;
  const scale = 40;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Graph points
  const graphPoints: string[] = [];
  for (let vx = -1; vx <= 5; vx += 0.02) {
    const sy = toSvgY(f(vx));
    if (sy >= 0 && sy <= h2) {
      graphPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Tangent line: y - wy = slope*(x - x0)
  const tangentPoints: string[] = [];
  for (let vx = -1; vx <= 5; vx += 0.05) {
    const vy = wy + slope * (vx - x0);
    const sy = toSvgY(vy);
    if (sy >= -20 && sy <= h2 + 20) {
      tangentPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Normal line: y - wy = -1/slope*(x - x0)
  const normalPoints: string[] = [];
  if (Math.abs(slope) > 0.001) {
    const nSlope = -1 / slope;
    for (let vx = -1; vx <= 5; vx += 0.05) {
      const vy = wy + nSlope * (vx - x0);
      const sy = toSvgY(vy);
      if (sy >= -20 && sy <= h2 + 20) {
        normalPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
      }
    }
  }

  const ptX = toSvgX(x0);
  const ptY = toSvgY(wy);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">x₀ = </span>
          <input
            type="range"
            min={-0.5}
            max={4.5}
            step={0.05}
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
            className="w-32 ml-2"
          />
          <span className="font-mono ml-2">{x0.toFixed(2)}</span>
        </div>
        <div className="font-mono text-cyan-500">
          f'(x₀) = {slope.toFixed(2)}
        </div>
        <div className="font-mono text-purple-400">
          slope = 2x₀
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

          {/* Graph curve */}
          {graphPoints.length > 1 && (
            <polyline
              points={graphPoints.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Tangent line */}
          {tangentPoints.length > 1 && (
            <polyline
              points={tangentPoints.join(" ")}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              opacity="0.9"
            />
          )}

          {/* Normal line */}
          {normalPoints.length > 1 && (
            <polyline
              points={normalPoints.join(" ")}
              fill="none"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              opacity="0.9"
            />
          )}

          {/* Point on curve */}
          <circle cx={ptX} cy={ptY} r="5" fill="#f97316" />

          {/* Labels */}
          <text x={ptX + 8} y={ptY - 8} fill="#f97316" fontSize="10" fontWeight="600">
            ({x0.toFixed(1)}, {wy.toFixed(1)})
          </text>
          <text x={ptX + 10} y={ptY + 14} fill="#22d3ee" fontSize="9">
            tangent
          </text>
          <text x={ptX - 35} y={ptY - 12} fill="#a855f7" fontSize="9">
            normal
          </text>

          {/* Axis ticks */}
          {[-1, 0, 1, 2, 3, 4, 5].map((v) => (
            <text key={v} x={toSvgX(v)} y={oy + 12} fill="#64748b" fontSize="9" textAnchor="middle">
              {v}
            </text>
          ))}
          {[0, 1, 2, 3, 4, 9, 16, 20].map((v) => {
            if (v > 20) return null;
            return (
              <text key={v} x={ox - 5} y={toSvgY(v) + 4} fill="#64748b" fontSize="9" textAnchor="end">
                {v}
              </text>
            );
          })}
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Tangent line:</strong> y − f(x₀) = f'(x₀)(x − x₀) &nbsp;|&nbsp;
        <strong className="text-foreground">Normal line:</strong> y − f(x₀) = −1/f'(x₀)(x − x₀)
      </div>
    </div>
  );
}

/* ---------- Max/Min Visual ---------- */
function MaxMinVisual() {
  const [showCritical, setShowCritical] = useState(true);

  // f(x) = x³/3 - 2x (cubic with local max and min)
  const f = (v: number) => (v * v * v) / 3 - 2 * v;
  const fp = (v: number) => v * v - 2; // derivative: 3x²/3 - 2 = x² - 2
  const fpp = (v: number) => 2 * v; // second derivative

  // Critical points: f'(x) = 0 → x² - 2 = 0 → x = ±√2
  const critPoints = [Math.sqrt(2), -Math.sqrt(2)];
  const localMaxX = -Math.sqrt(2);
  const localMinX = Math.sqrt(2);

  const w = 400;
  const h2 = 300;
  const ox = 60;
  const oy = h2 - 30;
  const scale = 50;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Graph points
  const graphPoints: string[] = [];
  const increasingPoints: string[] = [];
  const decreasingPoints: string[] = [];

  for (let vx = -3; vx <= 3.5; vx += 0.02) {
    const vy = f(vx);
    const sy = toSvgY(vy);
    if (sy >= 0 && sy <= h2) {
      graphPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
      const derivVal = fp(vx);
      if (derivVal > 0.01) {
        increasingPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
      } else if (derivVal < -0.01) {
        decreasingPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show-critical"
            checked={showCritical}
            onChange={(e) => setShowCritical(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="show-critical" className="text-muted-foreground cursor-pointer">
            Show critical points
          </label>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
          <span className="text-muted-foreground">Increasing (f' &gt; 0)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="text-muted-foreground">Decreasing (f' &lt; 0)</span>
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

          {/* Decreasing regions */}
          {decreasingPoints.length > 1 && (
            <polyline
              points={decreasingPoints.join(" ")}
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              opacity="0.7"
            />
          )}

          {/* Increasing regions */}
          {increasingPoints.length > 1 && (
            <polyline
              points={increasingPoints.join(" ")}
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              opacity="0.7"
            />
          )}

          {/* Overall curve (subtle) */}
          {graphPoints.length > 1 && (
            <polyline
              points={graphPoints.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              opacity="0.5"
            />
          )}

          {/* Critical points */}
          {showCritical && critPoints.map((cx, idx) => {
            const cy = f(cx);
            const svgX = toSvgX(cx);
            const svgY = toSvgY(cy);
            const isMax = fpp(cx) < 0;
            return (
              <g key={idx}>
                <circle cx={svgX} cy={svgY} r="6" fill={isMax ? "#f59e0b" : "#8b5cf6"} stroke="white" strokeWidth="2" />
                <text x={svgX} y={svgY - 12} fill={isMax ? "#f59e0b" : "#8b5cf6"} fontSize="9" fontWeight="600" textAnchor="middle">
                  {isMax ? "Local Max" : "Local Min"}
                </text>
                <text x={svgX} y={svgY + 18} fill="#94a3b8" fontSize="8" textAnchor="middle">
                  x = {cx.toFixed(2)}
                </text>
                {/* Vertical dashed to axis */}
                <line
                  x1={svgX}
                  y1={svgY}
                  x2={svgX}
                  y2={oy}
                  stroke={isMax ? "#f59e0b" : "#8b5cf6"}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
              </g>
            );
          })}

          {/* x-axis labels */}
          {[-3, -2, -1, 0, 1, 2, 3].map((v) => (
            <text key={v} x={toSvgX(v)} y={oy + 12} fill="#64748b" fontSize="9" textAnchor="middle">
              {v}
            </text>
          ))}
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">First Derivative Test:</strong>{" "}
        f'(x) = x² − 2 = 0 at x = ±√2.
        Local max at x = −√2 (f'' &lt; 0), local min at x = +√2 (f'' &gt; 0).
        Function increases where f' &gt; 0, decreases where f' &lt; 0.
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Tangent & Normal Lines",
    points: [
      "Tangent line at x = a: y − f(a) = f'(a)(x − a)",
      "Normal line at x = a: y − f(a) = −1/f'(a)(x − a) (perpendicular to tangent)",
      "The derivative f'(a) gives the slope of the tangent line at that point",
      "If f'(a) = 0, the tangent is horizontal (critical point candidate)",
    ],
  },
  {
    title: "Increasing & Decreasing",
    points: [
      "Function is increasing on intervals where f'(x) > 0",
      "Function is decreasing on intervals where f'(x) < 0",
      "Critical points occur where f'(x) = 0 or f'(x) is undefined",
      "Sign chart of f' determines where function rises or falls",
    ],
  },
  {
    title: "Local Extrema (Max/Min)",
    points: [
      "Local maximum at x = a: f'(a) = 0 and f''(a) < 0 (concave down)",
      "Local minimum at x = a: f'(a) = 0 and f''(a) > 0 (concave up)",
      "Second Derivative Test: use sign of f'' to classify critical points",
      "First Derivative Test: check sign change of f' around critical point",
    ],
  },
  {
    title: "Rate of Change",
    points: [
      "Derivative f'(x) represents instantaneous rate of change of f at x",
      "Average rate of change = [f(b) − f(a)] / (b − a) over [a, b]",
      "Instantaneous rate = lim(h→0) [f(x+h) − f(x)] / h = f'(x)",
      "Applications: velocity (derivative of position), marginal cost, growth rates",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function ApplicationDerivativesResources() {
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
                Application of Derivatives — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercise 17 from WebNotee
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-17",
              title: "Exercise 17 — Application of Derivatives",
              description:
                "Tangent and normal lines, increasing/decreasing functions, local maxima and minima, rate of change applications.",
              url: "https://drive.google.com/file/d/18H5WZC7V3TJck4nFUz3R7mlcQJcTNHEk/preview",
              pdfUrl: "https://drive.google.com/file/d/18H5WZC7V3TJck4nFUz3R7mlcQJcTNHEk/view?usp=sharing",
              tags: ["Exercise 17", "Application", "Derivatives"],
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
                Explore tangents, normals, and extrema interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tangent" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tangent">Tangent & Normal</TabsTrigger>
              <TabsTrigger value="extrema">Max/Min</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="tangent" className="space-y-4">
              <TangentNormalVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Moving the point:</strong> Drag the slider to move the point of tangency along the curve.
                The cyan dashed line is the tangent; the purple dashed line is the normal (perpendicular to tangent).
              </div>
            </TabsContent>

            <TabsContent value="extrema" className="space-y-4">
              <MaxMinVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Color-coded regions:</strong> Green shows where f'(x) &gt; 0 (increasing),
                red shows where f'(x) &lt; 0 (decreasing). Amber dot = local max, purple dot = local min.
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
