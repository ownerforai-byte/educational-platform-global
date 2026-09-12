/**
 * Functions Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics Algebra → Function
 * Topic: Class 11 Mathematics → Unit: Algebra → Function
 */

"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Calculator,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Function Graph Visual ---------- */
function FunctionGraphVisual() {
  const [funcType, setFuncType] = useState<string>("linear");
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(0);
  const [paramC, setParamC] = useState<number>(0);

  const w = 400;
  const h2 = 300;
  const ox = 80;
  const oy = h2 - 40;
  const scale = 50;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Function definitions
  const getFuncValue = (x: number): number => {
    switch (funcType) {
      case "linear":
        return paramA * x + paramB;
      case "quadratic":
        return paramA * x * x + paramB * x + paramC;
      case "cubic":
        return paramA * x * x * x + paramB * x + paramC;
      case "sin":
        return paramA * Math.sin(paramB * x + paramC);
      case "cos":
        return paramA * Math.cos(paramB * x + paramC);
      case "exp":
        return paramA * Math.exp(paramB * x + paramC);
      case "log":
        return paramA * Math.log(paramB * x + paramC);
      default:
        return paramA * x + paramB;
    }
  };

  // Generate graph points
  const graphPoints: string[] = [];
  const step = 0.1;
  for (let vx = -4; vx <= 4; vx += step) {
    const vy = getFuncValue(vx);
    const sy = toSvgY(vy);
    if (sy >= 0 && sy <= h2) {
      graphPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Function:</span>
          <select
            value={funcType}
            onChange={(e) => setFuncType(e.target.value)}
            className="px-2 py-1 text-sm border rounded-md bg-background"
          >
            <option value="linear">Linear (ax + b)</option>
            <option value="quadratic">Quadratic (ax² + bx + c)</option>
            <option value="cubic">Cubic (ax³ + bx + c)</option>
            <option value="sin">Sin (a·sin(bx + c))</option>
            <option value="cos">Cos (a·cos(bx + c))</option>
            <option value="exp">Exp (a·e^(bx + c))</option>
            <option value="log">Log (a·log(bx + c))</option>
          </select>
        </div>
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
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">c = </span>
          <input
            type="number"
            value={paramC}
            onChange={(e) => setParamC(parseFloat(e.target.value) || 0)}
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

          {/* Graph line */}
          {graphPoints.length > 1 && (
            <polyline
              points={graphPoints.join(" ")}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
            />
          )}

          {/* Origin */}
          <circle cx={ox} cy={oy} r="2" fill="#64748b" />
        </svg>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Function Graph:</strong> Adjust parameters to see how they affect the graph. Use sliders to change a, b, c values.
      </div>
    </div>
  );
}

/* ---------- Inverse Function Visual ---------- */
function InverseFunctionVisual() {
  const [showInverse, setShowInverse] = useState<boolean>(true);
  const [tracePoint, setTracePoint] = useState<number>(0);

  const w = 400;
  const h2 = 300;
  const ox = 80;
  const oy = h2 - 40;
  const scale = 50;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // f(x) = x² + 1 for x >= 0, domain [0, ∞)
  const f = (x: number) => x * x + 1;

  // Generate function graph points
  const funcPoints: string[] = [];
  for (let vx = -2; vx <= 3; vx += 0.1) {
    const vy = f(vx);
    const sy = toSvgY(vy);
    if (sy >= 0 && sy <= h2) {
      funcPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Generate inverse function graph points (y = sqrt(x - 1))
  const inversePoints: string[] = [];
  for (let vx = 0; vx <= 5; vx += 0.1) {
    const vy = Math.sqrt(vx - 1);
    const sy = toSvgY(vy);
    if (sy >= 0 && sy <= h2) {
      inversePoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Trace point on function and its reflection
  const traceX = tracePoint;
  const traceY = f(traceX);
  const inverseTraceX = traceY;
  const inverseTraceY = Math.sqrt(traceX - 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant={showInverse ? "default" : "outline"}
          size="sm"
          onClick={() => setShowInverse(!showInverse)}
        >
          {showInverse ? "Hide Inverse" : "Show Inverse"}
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Trace x = </span>
          <input
            type="number"
            value={tracePoint}
            onChange={(e) => setTracePoint(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground"
            step="0.1"
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

          {/* Diagonal line y=x */}
          <line
            x1={ox}
            y1={oy}
            x2={toSvgX(3)}
            y2={toSvgY(3)}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x={toSvgX(2.5)} y={toSvgY(2.5) - 5} fill="#64748b" fontSize="9">y = x</text>

          {/* Function f(x) */}
          {funcPoints.length > 1 && (
            <polyline
              points={funcPoints.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Inverse function f⁻¹(x) */}
          {showInverse && inversePoints.length > 1 && (
            <polyline
              points={inversePoints.join(" ")}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
            />
          )}

          {/* Trace point on function */}
          <circle cx={toSvgX(traceX)} cy={toSvgY(traceY)} r="4" fill="#38bdf8" />
          <text x={toSvgX(traceX) + 6} y={toSvgY(traceY) - 6} fill="#38bdf8" fontSize="9">
            ({traceX.toFixed(1)}, {traceY.toFixed(1)})
          </text>

          {/* Trace point on inverse */}
          {showInverse && (
            <>
              <circle cx={toSvgX(inverseTraceX)} cy={toSvgY(inverseTraceY)} r="4" fill="#a855f7" />
              <text x={toSvgX(inverseTraceX) + 6} y={toSvgY(inverseTraceY) + 12} fill="#a855f7" fontSize="9">
                ({inverseTraceX.toFixed(1)}, {inverseTraceY.toFixed(2)})
              </text>
            </>
          )}

          {/* Origin */}
          <circle cx={ox} cy={oy} r="2" fill="#64748b" />
        </svg>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Inverse Function:</strong> The inverse f⁻¹(x) is the reflection of f(x) across the line y = x. Trace points move together as you adjust x.
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Domain and Range",
    points: [
      "Domain: All possible input values (x-values) for which the function is defined",
      "Range: All possible output values (y-values) that the function can produce",
      "Example: f(x) = 1/x has domain x ≠ 0, range y ≠ 0",
    ],
  },
  {
    title: "Types of Functions",
    points: [
      "One-One (Injective): Each element of range comes from exactly one element of domain",
      "Onto (Surjective): Every element of codomain is mapped to by some element of domain",
      "Bijective: Both one-one and onto — has a perfect inverse function",
    ],
  },
  {
    title: "Inverse Functions",
    points: [
      "f⁻¹(f(x)) = x and f(f⁻¹(y)) = y",
      "To find inverse: swap x and y, then solve for y",
      "Inverse exists only if function is bijective",
      "Graphically: reflection across the line y = x",
    ],
  },
  {
    title: "Composite Functions",
    points: [
      "(f ∘ g)(x) = f(g(x))",
      "Order matters: f ∘ g ≠ g ∘ f in general",
      "Domain of f ∘ g is the domain of g, restricted to values where g(x) is in the domain of f",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function FunctionsResources() {
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
                Functions — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercises 2.1, 2.2, 2.3 covering domain, range, inverse, and transcendental functions
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-2-1",
              title: "Exercise 2.1 — Functions",
              description:
                "Domain, range, value of function, types of functions.",
              url: "https://drive.google.com/file/d/18ynkIlnes7uXUrYMpr0Lct7ynuXAZVwO/preview",
              pdfUrl:
                "https://drive.google.com/file/d/18ynkIlnes7uXUrYMpr0Lct7ynuXAZVwO/view?usp=sharing",
              tags: ["Exercise 2.1", "Domain", "Range"],
            },
            {
              id: "ex-2-2",
              title: "Exercise 2.2 — Functions",
              description:
                "Inverse functions, composite functions, algebraic functions.",
              url: "https://drive.google.com/file/d/190PXn0rSfQQ8SRbG3fCYoimvcrhhZHIj/preview",
              pdfUrl:
                "https://drive.google.com/file/d/190PXn0rSfQQ8SRbG3fCYoimvcrhhZHIj/view?usp=sharing",
              tags: ["Exercise 2.2", "Inverse", "Composite"],
            },
            {
              id: "ex-2-3",
              title: "Exercise 2.3 — Functions",
              description:
                "Transcendental functions: trigonometric, exponential, logarithmic.",
              url: "https://drive.google.com/file/d/194eNJqBngCR5o_zbcZ0exFCXJaOso3Ob/preview",
              pdfUrl:
                "https://drive.google.com/file/d/194eNJqBngCR5o_zbcZ0exFCXJaOso3Ob/view?usp=sharing",
              tags: ["Exercise 2.3", "Transcendental", "Exponential"],
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
              <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Interactive Visualizations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore functions, their graphs, and inverses
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="graph" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="graph">Function Graph</TabsTrigger>
              <TabsTrigger value="inverse">Inverse Functions</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="graph" className="space-y-4">
              <FunctionGraphVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Interactive Grapher:</strong> Select a function type and adjust parameters to see how the graph changes in real-time.
              </div>
            </TabsContent>

            <TabsContent value="inverse" className="space-y-4">
              <InverseFunctionVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Inverse Function:</strong> The inverse is the reflection across y = x. Trace points move symmetrically as you adjust x.
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
