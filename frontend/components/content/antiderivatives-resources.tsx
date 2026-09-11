/**
 * Antiderivatives Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics — Antiderivatives
 * Topic: Class 11 Mathematics → Unit: Calculus → Antiderivatives
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

/* ---------- Antiderivative Visual ---------- */
function AntiderivativeVisual() {
  const [constant, setConstant] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);

  // f(x) = x² (the derivative function)
  const f = (x: number) => x * x;

  // F(x) = x³/3 + C (the antiderivative family)
  const F = (x: number, C: number) => x * x * x / 3 + C;

  const w = 400;
  const h2 = 300;
  const ox = 50;
  const oy = h2 - 40;
  const scaleX = 50;
  const scaleY = 8;

  const toSvgX = (vx: number) => ox + vx * scaleX;
  const toSvgY = (vy: number) => oy - vy * scaleY;

  // Graph points for f(x) = x² (derivative)
  const graphPointsF: string[] = [];
  for (let vx = -1; vx <= 3.5; vx += 0.02) {
    const sy = toSvgY(f(vx));
    if (sy >= 0 && sy <= h2) {
      graphPointsF.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Graph points for F(x) = x³/3 + C (antiderivatives for different C values)
  const cValues = [-4, -2, 0, 2, 4];
  const CPoints: string[][] = [];
  for (const c of cValues) {
    const pts: string[] = [];
    for (let vx = -2.5; vx <= 3.5; vx += 0.02) {
      const sy = toSvgY(F(vx, c));
      if (sy >= 0 && sy <= h2) {
        pts.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
      }
    }
    CPoints.push(pts);
  }

  // Highlight the active curve (C = constant)
  const activeIdx = cValues.indexOf(constant);
  const activePts = activeIdx >= 0 ? CPoints[activeIdx] : [];

  const aX = toSvgX(a);
  const bX = toSvgX(b);
  const integralValue = F(b, constant) - F(a, constant);
  const areaTop = toSvgY(F(b, constant));
  const areaBot = toSvgY(0);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">C = </span>
          <input
            type="range"
            min={-5}
            max={5}
            step={1}
            value={constant}
            onChange={(e) => setConstant(parseInt(e.target.value))}
            className="w-24 ml-1"
          />
          <span className="ml-2 font-mono text-purple-500">{constant}</span>
        </div>
        <div>
          <span className="text-muted-foreground">a = </span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-14 bg-transparent border-b text-foreground ml-1"
          />
        </div>
        <div>
          <span className="text-muted-foreground">b = </span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
            className="w-14 bg-transparent border-b text-foreground ml-1"
          />
        </div>
        <div className="font-mono text-blue-500">
          ∫f(x)dx = F(x)+C
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
          <text x={ox + 5} y={12} fill="#64748b" fontSize="10">F(x)</text>

          {/* All antiderivative curves */}
          {CPoints.map((pts, i) => {
            const c = cValues[i];
            const isActive = c === constant;
            return (
              <polyline
                key={i}
                points={pts.join(" ")}
                fill="none"
                stroke={isActive ? "#a855f7" : "#475569"}
                strokeWidth={isActive ? 2.5 : 1}
                opacity={isActive ? 1 : 0.3}
              />
            );
          })}

          {/* f(x) = x² curve (derivative) */}
          {graphPointsF.length > 1 && (
            <polyline
              points={graphPointsF.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              opacity="0.7"
            />
          )}

          {/* Shaded area between a and b */}
          {(() => {
            const areaPts: string[] = [];
            for (let vx = a; vx <= b; vx += 0.02) {
              const sy = toSvgY(F(vx, constant));
              if (sy >= 0 && sy <= h2) {
                areaPts.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
              }
            }
            if (areaPts.length > 1) {
              const lastPt = areaPts[areaPts.length - 1].split(",").map(Number);
              const firstPt = areaPts[0].split(",").map(Number);
              return (
                <>
                  <polygon
                    points={`
                      ${toSvgX(a)},${oy}
                      ${areaPts.join(" ")}
                      ${toSvgX(b)},${oy}
                    `}
                    fill="#a855f7"
                    fillOpacity="0.15"
                    stroke="none"
                  />
                  <polyline
                    points={areaPts.join(" ")}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  />
                </>
              );
            }
            return null;
          })()}

          {/* Bounds markers */}
          <line x1={aX} y1={oy} x2={aX} y2={toSvgY(F(a, constant))} stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1={bX} y1={oy} x2={bX} y2={toSvgY(F(b, constant))} stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x={aX - 5} y={oy + 15} fill="#f97316" fontSize="10">a={a}</text>
          <text x={bX - 5} y={oy + 15} fill="#f97316" fontSize="10">b={b}</text>

          {/* Labels */}
          <text x={w - 80} y={20} fill="#38bdf8" fontSize="9">f(x)=x²</text>
          <text x={w - 80} y={32} fill="#a855f7" fontSize="9">F(x)=x³/3+C</text>
          <text x={10} y={16} fill="#64748b" fontSize="10" fontWeight="600">
            Area = {integralValue.toFixed(2)}
          </text>
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Family of antiderivatives:</strong>{" "}
        Adjust <span className="text-purple-500 font-mono">C</span> to see how the antiderivative curves shift up/down.
        The shaded area between <span className="text-orange-500 font-mono">a</span> and{" "}
        <span className="text-orange-500 font-mono">b</span> equals{" "}
        <span className="text-blue-500 font-mono">F(b) − F(a) = {integralValue.toFixed(2)}</span>,
        demonstrating the Fundamental Theorem of Calculus.
      </div>
    </div>
  );
}

/* ---------- Area Under Curve Visual ---------- */
function AreaUnderCurveVisual() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);

  // f(x) = x²
  const f = (x: number) => x * x;
  // F(x) = x³/3
  const F = (x: number) => x * x * x / 3;

  const w = 400;
  const h2 = 280;
  const ox = 50;
  const oy = h2 - 40;
  const scaleX = 60;
  const scaleY = 30;

  const toSvgX = (vx: number) => ox + vx * scaleX;
  const toSvgY = (vy: number) => oy - vy * scaleY;

  // Graph points for f(x) = x²
  const graphPoints: string[] = [];
  for (let vx = -0.5; vx <= 3.5; vx += 0.02) {
    const sy = toSvgY(f(vx));
    if (sy >= 0 && sy <= h2) {
      graphPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Build area polygon points
  const areaPts: string[] = [];
  for (let vx = a; vx <= b; vx += 0.02) {
    const sy = toSvgY(f(vx));
    if (sy >= 0 && sy <= h2) {
      areaPts.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  const areaValue = F(b) - F(a);
  const aX = toSvgX(a);
  const bX = toSvgX(b);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">a = </span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
          />
        </div>
        <div>
          <span className="text-muted-foreground">b = </span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
          />
        </div>
        <div className="font-mono text-blue-500">
          ∫f(x)dx = F(x)+C
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

          {/* Shaded area */}
          {areaPts.length > 1 && (
            <polygon
              points={`
                ${toSvgX(a)},${oy}
                ${areaPts.join(" ")}
                ${toSvgX(b)},${oy}
              `}
              fill="#a855f7"
              fillOpacity="0.2"
            />
          )}

          {/* f(x) = x² curve */}
          {graphPoints.length > 1 && (
            <polyline
              points={graphPoints.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Bounds */}
          <line x1={aX} y1={oy} x2={aX} y2={toSvgY(f(a))} stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1={bX} y1={oy} x2={bX} y2={toSvgY(f(b))} stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x={aX - 5} y={oy + 15} fill="#f97316" fontSize="10">a={a}</text>
          <text x={bX - 5} y={oy + 15} fill="#f97316" fontSize="10">b={b}</text>

          {/* Value label */}
          <text x={10} y={16} fill="#64748b" fontSize="10" fontWeight="600">
            Area = {areaValue.toFixed(3)}
          </text>
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Area under the curve:</strong>{" "}
        The shaded region between <span className="text-orange-500 font-mono">x = {a}</span> and{" "}
        <span className="text-orange-500 font-mono">x = {b}</span> under f(x) = x² has area{" "}
        <span className="text-blue-500 font-mono">{areaValue.toFixed(3)}</span>.
        This equals <span className="font-mono">F(b) − F(a)</span> where F(x) = x³/3.
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Power Rule",
    points: [
      "∫xⁿ dx = xⁿ⁺¹/(n+1) + C, for n ≠ −1",
      "The exponent increases by 1 and is then divided by the new exponent",
      "Always add the constant of integration +C",
    ],
  },
  {
    title: "Reciprocal Rule",
    points: [
      "∫(1/x) dx = ln|x| + C",
      "This is the exception to the power rule (n = −1 case)",
      "The result involves the natural logarithm",
    ],
  },
  {
    title: "Exponential Rule",
    points: [
      "∫eˣ dx = eˣ + C",
      "The exponential function is its own derivative and antiderivative",
      "∫aˣ dx = aˣ/ln(a) + C for a > 0, a ≠ 1",
    ],
  },
  {
    title: "Trigonometric Rules",
    points: [
      "∫sin x dx = −cos x + C",
      "∫cos x dx = sin x + C",
      "∫sec²x dx = tan x + C and ∫csc²x dx = −cot x + C",
    ],
  },
  {
    title: "Fundamental Theorem of Calculus",
    points: [
      "If F is an antiderivative of f on [a, b], then ∫ₐᵇ f(x)dx = F(b) − F(a)",
      "Connects differentiation and integration as inverse operations",
      "Allows computation of definite integrals using antiderivatives",
    ],
  },
  {
    title: "Key Properties",
    points: [
      "Linearity: ∫[af(x) + bg(x)]dx = a∫f(x)dx + b∫g(x)dx",
      "Additivity: ∫ₐᵇ f dx + ∫ᵇᶜ f dx = ∫ₐᶜ f dx",
      "Reversal: ∫ₐᵇ f dx = −∫ᵇᵃ f dx",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function AntiderivativesResources() {
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
                Antiderivatives — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercises 18.1 through 18.6 from WebNotee
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-18-1",
              title: "Exercise 18.1 — Introduction to Antiderivatives",
              description:
                "Concept of antiderivatives, reverse differentiation, indefinite integrals, and basic examples.",
              url: "https://drive.google.com/file/d/159Tkm10QwCAz5ph3f97Eem8-4i_sbzXU/preview",
              pdfUrl: "https://drive.google.com/file/d/159Tkm10QwCAz5ph3f97Eem8-4i_sbzXU/view?usp=sharing",
              tags: ["Exercise 18.1", "Introduction", "Indefinite Integral"],
            },
            {
              id: "ex-18-2",
              title: "Exercise 18.2 — Standard Antiderivatives",
              description:
                "Power rule, reciprocal rule, exponential and trigonometric antiderivatives with practice problems.",
              url: "https://drive.google.com/file/d/15OsIsDIeTHyReGJalzNdoJyIF8eD1uIs/preview",
              pdfUrl: "https://drive.google.com/file/d/15OsIsDIeTHyReGJalzNdoJyIF8eD1uIs/view?usp=sharing",
              tags: ["Exercise 18.2", "Standard Forms", "Formulas"],
            },
            {
              id: "ex-18-3",
              title: "Exercise 18.3 — Simple Integration",
              description:
                "Integration of polynomial functions, sums and differences, scalar multiplication of integrals.",
              url: "https://drive.google.com/file/d/15YVrgYOnWAfqkt9oAtXIn33_px80lKXj/preview",
              pdfUrl: "https://drive.google.com/file/d/15YVrgYOnWAfqkt9oAtXIn33_px80lKXj/view?usp=sharing",
              tags: ["Exercise 18.3", "Polynomials", "Practice"],
            },
            {
              id: "ex-18-4",
              title: "Exercise 18.4 — Definite Integrals",
              description:
                "Fundamental Theorem of Calculus, computing definite integrals using antiderivatives, area interpretation.",
              url: "https://drive.google.com/file/d/15bSLTd8jMvbTD4B1Satk7Hp-NRuRZDjl/preview",
              pdfUrl: "https://drive.google.com/file/d/15bSLTd8jMvbTD4B1Satk7Hp-NRuRZDjl/view?usp=sharing",
              tags: ["Exercise 18.4", "Definite Integral", "FTC"],
            },
            {
              id: "ex-18-5",
              title: "Exercise 18.5 — Area Under Curve",
              description:
                "Applications of definite integrals to find area bounded by curves, between curves, and with respect to axes.",
              url: "https://drive.google.com/file/d/15eivB-jnJX7TmCObRyQ7m0r9QDRQSMO3/preview",
              pdfUrl: "https://drive.google.com/file/d/15eivB-jnJX7TmCObRyQ7m0r9QDRQSMO3/view?usp=sharing",
              tags: ["Exercise 18.5", "Area", "Applications"],
            },
            {
              id: "ex-18-6",
              title: "Exercise 18.6 — Mixed Problems",
              description:
                "Comprehensive practice combining all antiderivative techniques, word problems, and advanced applications.",
              url: "https://drive.google.com/file/d/1IAXReeR_rY3UfUASOiE6fskH_KeBV1JK/preview",
              pdfUrl: "https://drive.google.com/file/d/1IAXReeR_rY3UfUASOiE6fskH_KeBV1JK/view?usp=sharing",
              tags: ["Exercise 18.6", "Mixed", "Review"],
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

      {/* Interactive SVG Visuals */}
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
                Explore antiderivatives and area under curves interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="antiderivative" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="antiderivative">Antiderivative Family</TabsTrigger>
              <TabsTrigger value="area">Area Under Curve</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="antiderivative" className="space-y-4">
              <AntiderivativeVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Antiderivative family:</strong>{" "}
                All curves differ by a vertical shift (constant C).
                The Fundamental Theorem tells us that <span className="font-mono">∫ₐᵇ f(x)dx = F(b) − F(a)</span>,
                independent of C — the constant cancels out.
              </div>
            </TabsContent>

            <TabsContent value="area" className="space-y-4">
              <AreaUnderCurveVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Area interpretation:</strong>{" "}
                The definite integral <span className="font-mono">∫ₐᵇ f(x)dx</span>
                represents the signed area between the curve and the x-axis from x = a to x = b.
                Drag the bounds to explore different regions.
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
