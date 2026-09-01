/**
 * Differentiation Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics → Unit: Calculus → Differentiation
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Derivative Graph Visual ---------- */
function DerivativeGraphVisual() {
  const [selectedFunc, setSelectedFunc] = useState<"x2" | "x3" | "sin" | "exp">("x2");
  const [pointX, setPointX] = useState(1);

  // Define functions and their derivatives
  const functions = {
    x2: {
      f: (x: number) => x * x,
      fPrime: (x: number) => 2 * x,
      color: "#38bdf8",
      derivativeColor: "#a855f7",
    },
    x3: {
      f: (x: number) => x * x * x,
      fPrime: (x: number) => 3 * x * x,
      color: "#38bdf8",
      derivativeColor: "#a855f7",
    },
    sin: {
      f: (x: number) => Math.sin(x),
      fPrime: (x: number) => Math.cos(x),
      color: "#38bdf8",
      derivativeColor: "#a855f7",
    },
    exp: {
      f: (x: number) => Math.exp(x),
      fPrime: (x: number) => Math.exp(x),
      color: "#38bdf8",
      derivativeColor: "#a855f7",
    },
  };

  const { f, fPrime, color, derivativeColor } = functions[selectedFunc];

  const w = 450;
  const h = 300;
  const ox = 60;
  const oy = h - 40;
  const scale = 40;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Graph points for function
  const funcPoints: string[] = [];
  for (let vx = -4; vx <= 4; vx += 0.05) {
    const sy = toSvgY(f(vx));
    if (sy >= 0 && sy <= h) {
      funcPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Graph points for derivative
  const derivPoints: string[] = [];
  for (let vx = -4; vx <= 4; vx += 0.05) {
    const sy = toSvgY(fPrime(vx));
    if (sy >= 0 && sy <= h) {
      derivPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Tangent line at pointX
  const tangentY = f(pointX);
  const tangentSlope = fPrime(pointX);
  const tangentIntercept = tangentY - tangentSlope * pointX;

  // Tangent line endpoints (extend beyond visible area)
  const tangentX1 = -10;
  const tangentY1 = tangentSlope * tangentX1 + tangentIntercept;
  const tangentX2 = 10;
  const tangentY2 = tangentSlope * tangentX2 + tangentIntercept;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Function: </span>
          <select
            value={selectedFunc}
            onChange={(e) => setSelectedFunc(e.target.value as any)}
            className="bg-transparent border-b border-foreground ml-1 focus:outline-none"
          >
            <option value="x2">f(x) = x²</option>
            <option value="x3">f(x) = x³</option>
            <option value="sin">f(x) = sin(x)</option>
            <option value="exp">f(x) = eˣ</option>
          </select>
        </div>
        <div>
          <span className="text-muted-foreground">Point x = </span>
          <input
            type="number"
            value={pointX}
            onChange={(e) => setPointX(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
            min="-4"
            max="4"
          />
        </div>
        <div className="font-mono text-purple-500">
          f&prime;({pointX}) = {tangentSlope.toFixed(3)}
        </div>
      </div>
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full max-w-lg border rounded-lg bg-slate-950"
        >
          {/* Axes */}
          <line x1={0} y1={oy} x2={w} y2={oy} stroke="#475569" strokeWidth="1" />
          <line x1={ox} y1={0} x2={ox} y2={h} stroke="#475569" strokeWidth="1" />
          <text x={w - 10} y={oy - 5} fill="#64748b" fontSize="10">x</text>
          <text x={ox + 5} y={12} fill="#64748b" fontSize="10">y</text>

          {/* Function curve */}
          {funcPoints.length > 1 && (
            <polyline
              points={funcPoints.join(" ")}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          )}

          {/* Derivative curve */}
          {derivPoints.length > 1 && (
            <polyline
              points={derivPoints.join(" ")}
              fill="none"
              stroke={derivativeColor}
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )}

          {/* Tangent line */}
          <line
            x1={toSvgX(tangentX1)}
            y1={toSvgY(tangentY1)}
            x2={toSvgX(tangentX2)}
            y2={toSvgY(tangentY2)}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="3 3"
          />

          {/* Point on function */}
          <circle
            cx={toSvgX(pointX)}
            cy={toSvgY(tangentY)}
            r="5"
            fill={color}
            stroke="#fff"
            strokeWidth="2"
          />

          {/* Point on derivative */}
          <circle
            cx={toSvgX(pointX)}
            cy={toSvgY(tangentSlope)}
            r="4"
            fill={derivativeColor}
            stroke="#fff"
            strokeWidth="1.5"
          />

          {/* Labels */}
          <text
            x={toSvgX(pointX) + 8}
            y={toSvgY(tangentY) - 8}
            fill={color}
            fontSize="10"
          >
            ({pointX}, {tangentY.toFixed(1)})
          </text>
          <text
            x={toSvgX(pointX) + 8}
            y={toSvgY(tangentSlope) - 8}
            fill={derivativeColor}
            fontSize="10"
          >
            ({pointX}, {tangentSlope.toFixed(1)})
          </text>
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Derivative Visualization:</strong> The blue curve shows f(x) and the purple dashed curve shows f&prime;(x). At x = {pointX}, the tangent line (orange dashed) has slope {tangentSlope.toFixed(3)}, which is the value of the derivative at that point.
      </div>
    </div>
  );
}

/* ---------- Chain Rule Visual ---------- */
function ChainRuleVisual() {
  const [innerFunc, setInnerFunc] = useState("x^2");
  const [outerFunc, setOuterFunc] = useState("sin(x)");

  // Parse and evaluate functions
  const evaluate = (expr: string, x: number): number => {
    try {
      // Simple parser for common expressions
      if (expr === "x^2") return x * x;
      if (expr === "x^3") return x * x * x;
      if (expr === "2x") return 2 * x;
      if (expr === "x+1") return x + 1;
      if (expr === "sin(x)") return Math.sin(x);
      if (expr === "cos(x)") return Math.cos(x);
      if (expr === "exp(x)") return Math.exp(x);
      if (expr === "sqrt(x)") return Math.sqrt(x);
      if (expr === "x") return x;
      return x;
    } catch {
      return x;
    }
  };

  const derivativeOf = (expr: string): ((x: number) => number) => {
    try {
      if (expr === "x^2") return (x) => 2 * x;
      if (expr === "x^3") return (x) => 3 * x * x;
      if (expr === "2x") return (x) => 2;
      if (expr === "x+1") return (x) => 1;
      if (expr === "sin(x)") return (x) => Math.cos(x);
      if (expr === "cos(x)") return (x) => -Math.sin(x);
      if (expr === "exp(x)") return (x) => Math.exp(x);
      if (expr === "sqrt(x)") return (x) => 0.5 / Math.sqrt(x);
      if (expr === "x") return (x) => 1;
      return (x) => 1;
    } catch {
      return (x) => 1;
    }
  };

  const x = 1.5; // Evaluation point
  const innerVal = evaluate(innerFunc, x);
  const outerVal = evaluate(outerFunc, innerVal);

  const innerDeriv = derivativeOf(innerFunc)(x);
  const outerDerivAtInner = derivativeOf(outerFunc)(innerVal);

  const chainRuleResult = outerDerivAtInner * innerDeriv;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-2">Inner function g(x)</label>
          <select
            value={innerFunc}
            onChange={(e) => setInnerFunc(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="x^2">x²</option>
            <option value="x^3">x³</option>
            <option value="2x">2x</option>
            <option value="x+1">x + 1</option>
            <option value="sin(x)">sin(x)</option>
            <option value="cos(x)">cos(x)</option>
            <option value="exp(x)">eˣ</option>
            <option value="sqrt(x)">√x</option>
            <option value="x">x</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Outer function f(u)</label>
          <select
            value={outerFunc}
            onChange={(e) => setOuterFunc(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="sin(x)">sin(u)</option>
            <option value="cos(x)">cos(u)</option>
            <option value="exp(x)">eᵘ</option>
            <option value="x^2">u²</option>
            <option value="x^3">u³</option>
            <option value="2x">2u</option>
            <option value="x+1">u + 1</option>
            <option value="sqrt(x)">√u</option>
            <option value="x">u</option>
          </select>
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold">
          f(g(x)) = {outerFunc.replace("(x)", `(${innerVal.toFixed(2)})`)} = {outerVal.toFixed(3)}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Chain Rule Steps:</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 font-mono text-sm mt-1">1.</div>
            <div>
              <strong>Identify inner and outer functions:</strong> g(x) = {innerFunc}, f(u) = {outerFunc}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-blue-500 font-mono text-sm mt-1">2.</div>
            <div>
              <strong>Differentiate outer function:</strong> f&prime;(u) = {derivativeOf(outerFunc).toString().replace("x", "u")}
              <br />At u = {innerVal.toFixed(2)}: f&prime;({innerVal.toFixed(2)}) = {outerDerivAtInner.toFixed(3)}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-blue-500 font-mono text-sm mt-1">3.</div>
            <div>
              <strong>Differentiate inner function:</strong> g&prime;(x) = {derivativeOf(innerFunc).toString().replace("x", "x")}
              <br />At x = {x}: g&prime;({x}) = {innerDeriv.toFixed(3)}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-blue-500 font-mono text-sm mt-1">4.</div>
            <div>
              <strong>Apply Chain Rule:</strong> [f(g(x))]&prime; = f&prime;(g(x)) · g&prime;(x)
              <br /><span className="text-purple-500 font-mono">= {outerDerivAtInner.toFixed(3)} · {innerDeriv.toFixed(3)}</span>
              <br /><span className="text-green-500 font-bold">= {chainRuleResult.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Chain Rule:</strong> When differentiating a composite function f(g(x)), first differentiate the outer function f at g(x), then multiply by the derivative of the inner function g at x. This gives the derivative of the composition.
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Power Rule",
    points: [
      "For any real number n, d/dx[xⁿ] = n·xⁿ⁻¹",
      "Example: d/dx[x⁵] = 5x⁴, d/dx[x⁻²] = -2x⁻³",
      "Works for all n including fractions and negatives",
    ],
  },
  {
    title: "Product Rule",
    points: [
      "For two differentiable functions u(x) and v(x):",
      "d/dx[u·v] = u&prime;·v + u·v&prime;",
      "Example: d/dx[x²·sin(x)] = 2x·sin(x) + x²·cos(x)",
      "Remember: 'first times derivative of second plus second times derivative of first'",
    ],
  },
  {
    title: "Quotient Rule",
    points: [
      "For two differentiable functions u(x) and v(x) where v(x) ≠ 0:",
      "d/dx[u/v] = (u&prime;·v - u·v&prime;) / v²",
      "Example: d/dx[sin(x)/x] = (x·cos(x) - sin(x)) / x²",
      "Remember: 'low d-high minus high d-low over low squared'",
    ],
  },
  {
    title: "Chain Rule",
    points: [
      "For composite function f(g(x)):",
      "d/dx[f(g(x))] = f&prime;(g(x)) · g&prime;(x)",
      "Example: d/dx[sin(x²)] = cos(x²) · 2x",
      "Differentiate outer function first, then multiply by derivative of inner function",
    ],
  },
  {
    title: "Trigonometric Derivatives",
    points: [
      "d/dx[sin(x)] = cos(x)",
      "d/dx[cos(x)] = -sin(x)",
      "d/dx[tan(x)] = sec²(x)",
      "d/dx[cot(x)] = -csc²(x)",
      "d/dx[sec(x)] = sec(x)·tan(x)",
      "d/dx[csc(x)] = -csc(x)·cot(x)",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function DifferentiationResources() {
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
                Differentiation — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercises 16.1–16.3 from WebNotee
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-16-1",
              title: "Exercise 16.1 — Derivative by Definition",
              description: "First principles differentiation, limit definition of derivative, finding derivatives from first principles.",
              url: "https://drive.google.com/file/d/1FGWhIJhsNnPSKHHsb2DGnIdN-0fU1HiZ/preview",
              pdfUrl: "https://drive.google.com/file/d/1FGWhIJhsNnPSKHHsb2DGnIdN-0fU1HiZ/view?usp=sharing",
              tags: ["Exercise 16.1", "First Principles", "Definition"],
            },
            {
              id: "ex-16-2",
              title: "Exercise 16.2 — Rules of Differentiation",
              description: "Power rule, product rule, quotient rule, chain rule applications.",
              url: "https://drive.google.com/file/d/1G0SVNMbjGcN-JYQSMwt2kgcigfbnyqSJ/preview",
              pdfUrl: "https://drive.google.com/file/d/1G0SVNMbjGcN-JYQSMwt2kgcigfbnyqSJ/view?usp=sharing",
              tags: ["Exercise 16.2", "Product Rule", "Chain Rule"],
            },
            {
              id: "ex-16-3",
              title: "Exercise 16.3 — Trigonometric, Exponential & Logarithmic Derivatives",
              description: "Derivatives of sin, cos, tan, eˣ, ln x and their compositions.",
              url: "https://drive.google.com/file/d/1-TdxCLUdfCGzqvklQyNoRICAObWhMJjE/preview",
              pdfUrl: "https://drive.google.com/file/d/1-TdxCLUdfCGzqvklQyNoRICAObWhMJjE/view?usp=sharing",
              tags: ["Exercise 16.3", "Trig Derivatives", "Exp/Log"],
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
                Explore differentiation concepts interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="derivative" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="derivative">Derivative Graph</TabsTrigger>
              <TabsTrigger value="chain">Chain Rule</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="derivative" className="space-y-4">
              <DerivativeGraphVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Understanding Derivatives:</strong> The derivative measures the instantaneous rate of change of a function. Visually, it's the slope of the tangent line at any point on the curve. Try different functions and move the point to see how the derivative changes.
              </div>
            </TabsContent>

            <TabsContent value="chain" className="space-y-4">
              <ChainRuleVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Chain Rule:</strong> When you have a function inside another function (a composition), you need the chain rule to differentiate it. Differentiate the outer function first, then multiply by the derivative of the inner function.
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
