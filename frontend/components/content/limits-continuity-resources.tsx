/**
 * Limits and Continuity Resources Panel
 * Displays interactive visuals + theory for Class 11 Limits and Continuity
 * Topic: Class 11 Mathematics → Unit: Calculus → Limits and Continuity
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

/* ---------- Limit Interactive Visual ---------- */
function LimitVisual() {
  const [target, setTarget] = useState(2);
  const [h, setH] = useState(0.5);

  // f(x) = (x² - 4) / (x - 2) = x + 2 for x ≠ 2, limit = 4 at x = 2
  const f = (v: number) => v + 2;
  const limitVal = f(target);

  const w = 400;
  const h2 = 300;
  const ox = 80;
  const oy = h2 - 40;
  const scale = 50;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Graph points
  const graphPoints: string[] = [];
  for (let vx = -2; vx <= 6; vx += 0.05) {
    if (Math.abs(vx - target) < 0.01) continue;
    const sy = toSvgY(f(vx));
    if (sy >= -10 && sy <= h2 + 10) {
      graphPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Hole at target
  const holeX = toSvgX(target);
  const holeY = toSvgY(limitVal);

  // Approach points
  const leftX = toSvgX(target - h);
  const leftY = toSvgY(f(target - h));
  const rightX = toSvgX(target + h);
  const rightY = toSvgY(f(target + h));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Target x = </span>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
          />
        </div>
        <div>
          <span className="text-muted-foreground">h = </span>
          <input
            type="number"
            value={h}
            onChange={(e) => setH(parseFloat(e.target.value) || 0.1)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
        <div className="font-mono text-orange-500">
          f(x) = (x²−4)/(x−2), lim = {limitVal}
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
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Hole at target */}
          <circle cx={holeX} cy={holeY} r="5" fill="none" stroke="#f97316" strokeWidth="2" />

          {/* Target vertical dashed line */}
          <line
            x1={holeX}
            y1={holeY + 10}
            x2={holeX}
            y2={h2}
            stroke="#f97316"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          {/* Approach lines */}
          <line x1={leftX} y1={leftY} x2={rightX} y2={rightY} stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
          <circle cx={leftX} cy={leftY} r="4" fill="#a855f7" />
          <circle cx={rightX} cy={rightY} r="4" fill="#a855f7" />

          {/* Labels */}
          <text x={holeX - 5} y={holeY - 10} fill="#f97316" fontSize="10" fontWeight="600">
            hole
          </text>
          <text x={leftX - 15} y={leftY - 8} fill="#a855f7" fontSize="9">
            x−h
          </text>
          <text x={rightX + 5} y={rightY - 8} fill="#a855f7" fontSize="9">
            x+h
          </text>
          <text x={holeX + 8} y={oy + 15} fill="#f97316" fontSize="10">
            x={target}
          </text>
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">How limits work:</strong> As h → 0,
        both (x−h) and (x+h) approach the target. The function approaches{" "}
        <span className="text-orange-500 font-mono">{limitVal}</span> even though
        f({target}) is undefined (hole).
      </div>
    </div>
  );
}

/* ---------- Continuity Visual ---------- */
function ContinuityVisual() {
  const [discontinuityType, setDiscontinuityType] = useState<"removable" | "jump" | "infinite">("removable");

  const w = 400;
  const h2 = 280;
  const ox = 60;
  const oy = h2 - 30;
  const scale = 60;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  const graphPointsL: string[] = [];
  const graphPointsR: string[] = [];

  if (discontinuityType === "removable") {
    // f(x) = x + 1 for x ≠ 2, hole at (2,3)
    for (let vx = 0; vx < 2; vx += 0.02) {
      const sy = toSvgY(vx + 1);
      if (sy >= 0 && sy <= h2) graphPointsL.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
    for (let vx = 2.01; vx <= 4; vx += 0.02) {
      const sy = toSvgY(vx + 1);
      if (sy >= 0 && sy <= h2) graphPointsR.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  } else if (discontinuityType === "jump") {
    // f(x) = x for x < 2, f(x) = x - 1 for x >= 2
    for (let vx = 0; vx < 2; vx += 0.02) {
      const sy = toSvgY(vx);
      if (sy >= 0 && sy <= h2) graphPointsL.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
    for (let vx = 2; vx <= 4; vx += 0.02) {
      const sy = toSvgY(vx - 1);
      if (sy >= 0 && sy <= h2) graphPointsR.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  } else {
    // f(x) = 1/(x-2), vertical asymptote at x=2
    for (let vx = 0; vx < 1.9; vx += 0.02) {
      const vy = 1 / (vx - 2);
      const sy = toSvgY(vy);
      if (sy >= 0 && sy <= h2) graphPointsL.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
    for (let vx = 2.1; vx <= 4; vx += 0.02) {
      const vy = 1 / (vx - 2);
      const sy = toSvgY(vy);
      if (sy >= 0 && sy <= h2) graphPointsR.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  const targetX = toSvgX(2);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["removable", "jump", "infinite"] as const).map((type) => (
          <Button
            key={type}
            variant={discontinuityType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setDiscontinuityType(type)}
            className="text-xs"
          >
            {type === "removable" ? "Hole" : type === "jump" ? "Jump" : "Asymptote"}
          </Button>
        ))}
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

          {/* Asymptote line for infinite type */}
          {discontinuityType === "infinite" && (
            <line
              x1={targetX}
              y1={0}
              x2={targetX}
              y2={h2}
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              opacity="0.7"
            />
          )}

          {/* Graph left */}
          {graphPointsL.length > 1 && (
            <polyline
              points={graphPointsL.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}
          {/* Graph right */}
          {graphPointsR.length > 1 && (
            <polyline
              points={graphPointsR.join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
          )}

          {/* Discontinuity markers */}
          {discontinuityType === "removable" && (
            <circle cx={targetX} cy={toSvgY(3)} r="5" fill="none" stroke="#f97316" strokeWidth="2" />
          )}
          {discontinuityType === "jump" && (
            <>
              <circle cx={targetX} cy={toSvgY(2)} r="4" fill="#a855f7" />
              <circle cx={targetX} cy={toSvgY(1)} r="4" fill="#22d3ee" />
            </>
          )}

          {/* Vertical dashed at discontinuity */}
          <line
            x1={targetX}
            y1={targetX > 0 ? 0 : h2}
            x2={targetX}
            y2={h2}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />

          <text x={targetX - 5} y={oy + 15} fill="#f97316" fontSize="10">
            x=2
          </text>
        </svg>
      </div>
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground capitalize">{discontinuityType} discontinuity at x = 2:</strong>{" "}
        {discontinuityType === "removable" && "lim(x→2) f(x) = 3 exists, but f(2) is undefined. The hole can be 'filled'."}
        {discontinuityType === "jump" && "lim(x→2⁻) f(x) = 2 ≠ lim(x→2⁺) f(x) = 1. The graph jumps — limit does not exist."}
        {discontinuityType === "infinite" && "f(x) → ±∞ as x → 2. Vertical asymptote — not continuous."}
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Right-Hand Limit (RHL)",
    points: [
      "lim(x→a⁺) f(x) = L₁ means f(x) approaches L₁ as x approaches a from values greater than a",
      "Also written as lim(x→a+0) f(x) = f(a + 0)",
      "Example: For f(x) = |x|/x, RHL at x=0 is +1",
    ],
  },
  {
    title: "Left-Hand Limit (LHL)",
    points: [
      "lim(x→a⁻) f(x) = L₂ means f(x) approaches L₂ as x approaches a from values less than a",
      "Also written as lim(x→a−0) f(x) = f(a − 0)",
      "Example: For f(x) = |x|/x, LHL at x=0 is −1",
    ],
  },
  {
    title: "Limit Existence Condition",
    points: [
      "lim(x→a) f(x) exists if and only if LHL = RHL",
      "If LHL ≠ RHL, the limit does not exist (DNE)",
      "The function value f(a) does not affect whether the limit exists",
    ],
  },
  {
    title: "Continuity Conditions",
    points: [
      "f is continuous at x = a if: (1) f(a) is defined, (2) lim(x→a) f(x) exists, (3) lim(x→a) f(x) = f(a)",
      "All three conditions must be satisfied simultaneously",
      "Discontinuous if ANY condition fails",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function LimitsContinuityResources() {
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
                Limits & Continuity — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercises 15.1, 15.2, 15.3 from WebNotee
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-15-1",
              title: "Exercise 15.1 — Function & Limits Review",
              description:
                "Review of functions, domain, range, value of function, and introduction to limits.",
              url: "https://drive.google.com/file/d/1AzJClQ9yS-1cbHLjgU5HEO4DrlyEdh6x/preview",
              pdfUrl: "https://drive.google.com/file/d/1AzJClQ9yS-1cbHLjgU5HEO4DrlyEdh6x/view?usp=sharing",
              tags: ["Exercise 15.1", "Functions", "Introduction"],
            },
            {
              id: "ex-15-2",
              title: "Exercise 15.2 — Trigonometric Limits",
              description:
                "Limits of sin, cos, tan, and other trigonometric functions. Standard limit formulas.",
              url: "https://drive.google.com/file/d/1BHRefOfe4aUssh4OdLDf4SvciIuxRgyr/preview",
              pdfUrl: "https://drive.google.com/file/d/1BHRefOfe4aUssh4OdLDf4SvciIuxRgyr/view?usp=sharing",
              tags: ["Exercise 15.2", "Trigonometric", "Formulas"],
            },
            {
              id: "ex-15-3",
              title: "Exercise 15.3 — Continuity",
              description:
                "Right-hand limit, left-hand limit, continuity of functions, types of discontinuity.",
              url: "https://drive.google.com/file/d/1BNiGWmNx2Br1hJf9bL0fsrXmAs8a6ctW/preview",
              pdfUrl: "https://drive.google.com/file/d/1BNiGWmNx2Br1hJf9bL0fsrXmAs8a6ctW/view?usp=sharing",
              tags: ["Exercise 15.3", "Continuity", "Discontinuity"],
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

      {/* Interactive 3D / SVG Visuals */}
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
                Explore limits and continuity types interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="limit" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="limit">Limit Behavior</TabsTrigger>
              <TabsTrigger value="continuity">Continuity Types</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="limit" className="space-y-4">
              <LimitVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Understanding Limits:</strong>{" "}
                The function f(x) = (x²−4)/(x−2) simplifies to x+2 everywhere except x=2,
                where it has a hole. As x approaches 2, f(x) approaches 4 — that's the limit.
              </div>
            </TabsContent>

            <TabsContent value="continuity" className="space-y-4">
              <ContinuityVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Three Types of Discontinuity:</strong>{" "}
                Removable (hole), Jump (LHL ≠ RHL), and Infinite (asymptote).
                Click each button to see how the graph behaves.
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
