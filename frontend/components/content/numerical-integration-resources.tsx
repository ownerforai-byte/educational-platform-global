/**
 * Numerical Integration Resources Panel
 * Displays interactive visuals + theory for Class 11 Numerical Integration
 * Topic: Class 11 Mathematics → Unit: Calculus → Integration
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

/* ---------- Trapezoidal Rule Visual ---------- */
function TrapezoidalVisual() {
  const [n, setN] = useState(5);
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);

  // f(x) = x² for simplicity
  const f = (x: number) => x * x;
  const h = (b - a) / n;

  // Calculate exact integral
  const exactIntegral = (b * b * b) / 3 - (a * a * a) / 3;

  // Calculate approximate integral using trapezoidal rule
  let approxIntegral = 0;
  approxIntegral += f(a);
  for (let i = 1; i < n; i++) {
    approxIntegral += 2 * f(a + i * h);
  }
  approxIntegral += f(b);
  approxIntegral *= h / 2;

  const error = Math.abs(exactIntegral - approxIntegral);

  const w = 450;
  const h2 = 280;
  const ox = 60;
  const oy = h2 - 40;
  const scale = 80;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Generate trapezoids
  const trapezoids: React.ReactElement[] = [];
  for (let i = 0; i < n; i++) {
    const x0 = a + i * h;
    const x1 = a + (i + 1) * h;
    const y0 = f(x0);
    const y1 = f(x1);

    // Trapezoid coordinates
    const points = [
      `${toSvgX(x0)},${toSvgY(y0)}`,
      `${toSvgX(x1)},${toSvgY(y1)}`,
      `${toSvgX(x1)},${toSvgY(0)}`,
      `${toSvgX(x0)},${toSvgY(0)}`,
    ].join(" ");

    trapezoids.push(
      <polygon
        key={`trap-${i}`}
        points={points}
        fill="rgba(139, 92, 246, 0.3)"
        stroke="rgba(139, 92, 246, 0.8)"
        strokeWidth="1"
      />
    );
  }

  // Curve points
  const curvePoints: string[] = [];
  for (let x = a; x <= b; x += 0.02) {
    curvePoints.push(`${toSvgX(x)},${toSvgY(f(x))}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">a = </span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-12 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
        <div>
          <span className="text-muted-foreground">b = </span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 2)}
            className="w-12 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
        <div>
          <span className="text-muted-foreground">n = </span>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
            className="w-12 bg-transparent border-b text-foreground ml-1"
            min="1"
            max="20"
          />
        </div>
        <div className="font-mono text-purple-500 ml-2">
          Area ≈ {approxIntegral.toFixed(4)}
        </div>
        <div className="font-mono text-blue-500">
          Exact = {exactIntegral.toFixed(4)}
        </div>
        <div className="font-mono text-red-500">
          Error = {error.toFixed(4)}
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

          {/* X-axis ticks */}
          {Array.from({ length: Math.ceil((b - a) / 0.5) + 1 }).map((_, i) => {
            const x = a + i * 0.5;
            if (x > b) return null;
            return (
              <g key={`xtick-${i}`}>
                <line x1={toSvgX(x)} y1={oy} x2={toSvgX(x)} y2={oy + 5} stroke="#475569" strokeWidth="1" />
                <text x={toSvgX(x)} y={oy + 15} fill="#64748b" fontSize="9" textAnchor="middle">
                  {x.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Curve */}
          {curvePoints.length > 1 && (
            <polyline
              points={curvePoints.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Trapezoids */}
          {trapezoids}

          {/* Vertical lines at divisions */}
          {Array.from({ length: n }).map((_, i) => {
            const x = a + i * h;
            return (
              <line
                key={`div-${i}`}
                x1={toSvgX(x)}
                y1={toSvgY(0)}
                x2={toSvgX(x)}
                y2={toSvgY(f(x))}
                stroke="rgba(139, 92, 246, 0.6)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Points on curve */}
          {Array.from({ length: n + 1 }).map((_, i) => {
            const x = a + i * h;
            const y = f(x);
            return (
              <circle
                key={`point-${i}`}
                cx={toSvgX(x)}
                cy={toSvgY(y)}
                r="3"
                fill="#a855f7"
              />
            );
          })}
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Trapezoidal Rule:</strong> As n increases, the trapezoids better approximate the area under the curve.
        The formula is ∫ₐᵇ f(x)dx ≈ h/2[f(x₀) + 2f(x₁) + ... + 2f(xₙ₋₁) + f(xₙ)]
      </div>
    </div>
  );
}

/* ---------- Simpson's Rule Visual ---------- */
function SimpsonVisual() {
  const [n, setN] = useState(4);
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [panel, setPanel] = useState<2 | 4 | 6 | 8>(4);

  // f(x) = x² for simplicity
  const f = (x: number) => x * x;
  const h = (b - a) / panel;

  // Calculate exact integral
  const exactIntegral = (b * b * b) / 3 - (a * a * a) / 3;

  // Calculate approximate integral using Simpson's rule
  let approxIntegral = f(a);
  for (let i = 1; i < panel; i++) {
    const x = a + i * h;
    approxIntegral += (i % 2 === 0 ? 2 : 4) * f(x);
  }
  approxIntegral += f(b);
  approxIntegral *= h / 3;

  const error = Math.abs(exactIntegral - approxIntegral);

  const w = 450;
  const h2 = 280;
  const ox = 60;
  const oy = h2 - 40;
  const scale = 80;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Generate parabolas for each panel
  const parabolas: React.ReactElement[] = [];
  const points: React.ReactElement[] = [];

  for (let i = 0; i < panel; i++) {
    const x0 = a + i * h;
    const x1 = a + (i + 1) * h;
    const xm = (x0 + x1) / 2;

    // Points for this panel
    const p0 = { x: x0, y: f(x0) };
    const p1 = { x: xm, y: f(xm) };
    const p2 = { x: x1, y: f(x1) };

    points.push(
      <circle key={`simp-point-${i}-0`} cx={toSvgX(p0.x)} cy={toSvgY(p0.y)} r="3" fill="#a855f7" />
    );
    points.push(
      <circle key={`simp-point-${i}-1`} cx={toSvgX(p1.x)} cy={toSvgY(p1.y)} r="3" fill="#a855f7" />
    );
    points.push(
      <circle key={`simp-point-${i}-2`} cx={toSvgX(p2.x)} cy={toSvgY(p2.y)} r="3" fill="#a855f7" />
    );

    // Parabola approximation (quadratic Bezier)
    const curvePoints: string[] = [];
    for (let t = 0; t <= 1; t += 0.05) {
      const mt = 1 - t;
      const x = mt * mt * p0.x + 2 * mt * t * xm + t * t * p2.x;
      const y = mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y;
      curvePoints.push(`${toSvgX(x)},${toSvgY(y)}`);
    }

    parabolas.push(
      <polyline
        key={`simp-curve-${i}`}
        points={curvePoints.join(" ")}
        fill="none"
        stroke="rgba(139, 92, 246, 0.7)"
        strokeWidth="2"
      />
    );
  }

  // Curve points for actual function
  const curvePoints: string[] = [];
  for (let x = a; x <= b; x += 0.02) {
    curvePoints.push(`${toSvgX(x)},${toSvgY(f(x))}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">a = </span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-12 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
        <div>
          <span className="text-muted-foreground">b = </span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 2)}
            className="w-12 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
        <div className="flex gap-1">
          <span className="text-muted-foreground">Panels: </span>
          {[2, 4, 6, 8].map((val) => (
            <button
              key={val}
              onClick={() => setPanel(val as 2 | 4 | 6 | 8)}
              className={`px-2 py-0.5 text-xs rounded ${panel === val ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="font-mono text-purple-500 ml-2">
          Area ≈ {approxIntegral.toFixed(4)}
        </div>
        <div className="font-mono text-blue-500">
          Exact = {exactIntegral.toFixed(4)}
        </div>
        <div className="font-mono text-red-500">
          Error = {error.toFixed(4)}
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

          {/* X-axis ticks */}
          {Array.from({ length: Math.ceil((b - a) / 0.5) + 1 }).map((_, i) => {
            const x = a + i * 0.5;
            if (x > b) return null;
            return (
              <g key={`simp-xtick-${i}`}>
                <line x1={toSvgX(x)} y1={oy} x2={toSvgX(x)} y2={oy + 5} stroke="#475569" strokeWidth="1" />
                <text x={toSvgX(x)} y={oy + 15} fill="#64748b" fontSize="9" textAnchor="middle">
                  {x.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Actual curve */}
          {curvePoints.length > 1 && (
            <polyline
              points={curvePoints.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Simpson parabolas */}
          {parabolas}

          {/* Points */}
          {points}

          {/* Vertical lines at divisions */}
          {Array.from({ length: panel }).map((_, i) => {
            const x = a + i * h;
            return (
              <line
                key={`simp-div-${i}`}
                x1={toSvgX(x)}
                y1={toSvgY(0)}
                x2={toSvgX(x)}
                y2={toSvgY(f(x))}
                stroke="rgba(139, 92, 246, 0.6)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            );
          })}
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Simpson's 1/3 Rule:</strong> Uses parabolic arcs to approximate the curve. More accurate than trapezoidal rule for smooth functions.
        The formula is ∫ₐᵇ f(x)dx ≈ h/3[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(xₙ)] where n is even.
      </div>
    </div>
  );
}

/* ---------- Theory Summary ---------- */
const THEORY_SECTIONS = [
  {
    title: "Trapezoidal Rule",
    points: [
      "Approximates ∫ₐᵇ f(x)dx using trapezoids under the curve",
      "Formula: ∫ₐᵇ f(x)dx ≈ h/2[f(x₀) + 2f(x₁) + 2f(x₂) + ... + 2f(xₙ₋₁) + f(xₙ)]",
      "where h = (b-a)/n and n is the number of subintervals",
      "Error decreases as n increases",
    ],
  },
  {
    title: "Simpson's 1/3 Rule",
    points: [
      "Uses parabolic arcs instead of straight lines for better accuracy",
      "Formula: ∫ₐᵇ f(x)dx ≈ h/3[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(xₙ)]",
      "n must be even (number of panels)",
      "More accurate than trapezoidal rule for smooth functions",
      "Error is proportional to h⁴ vs h² for trapezoidal rule",
    ],
  },
  {
    title: "Comparison",
    points: [
      "Both methods divide [a,b] into n subintervals",
      "Trapezoidal uses straight lines (linear approximation)",
      "Simpson's uses parabolas (quadratic approximation)",
      "Simpson's is generally more accurate for the same n",
      "Trapezoidal can handle functions with discontinuities better",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function NumericalIntegrationResources() {
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
                Numerical Integration — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercise 20.1 from NCERT Class 11 Mathematics
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-20-1",
              title: "Exercise 20.1 — Numerical Integration",
              description:
                "Trapezoidal and Simpson's rule problems for approximating definite integrals.",
              url: "https://drive.google.com/file/d/1FQDiw_IgwErLheuBYmUTTsTMKkAzRhSZ/preview",
              pdfUrl: "https://drive.google.com/file/d/1FQDiw_IgwErLheuBYmUTTsTMKkAzRhSZ/view?usp=sharing",
              tags: ["Exercise 20.1", "Trapezoidal", "Simpson's"],
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
                Explore numerical integration methods interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trapezoidal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trapezoidal">Trapezoidal Rule</TabsTrigger>
              <TabsTrigger value="simpson">Simpson's Rule</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="trapezoidal" className="space-y-4">
              <TrapezoidalVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">How it works:</strong> The trapezoidal rule approximates the area under a curve by dividing it into trapezoids rather than rectangles.
                As you increase n, the approximation becomes more accurate.
              </div>
            </TabsContent>

            <TabsContent value="simpson" className="space-y-4">
              <SimpsonVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">How it works:</strong> Simpson's rule fits parabolas to each pair of subintervals, providing a better approximation than straight lines.
                Click the panel buttons to see how the approximation improves with more panels.
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