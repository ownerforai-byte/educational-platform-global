/**
 * Analytical Geometry Resources Panel
 * Displays PDF resources + interactive 3D visuals for the Analytic Geometry topic.
 * Topic: Class 11 Mathematics → Unit: Analytic Geometry (20 hours)
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- PDF resource data ---------- */
const PDF_RESOURCES = [
  {
    id: "webnotee-ex9.1",
    title: "Exercise 9.1 — Analytical Geometry Solutions",
    source: "WebNotee.com",
    description:
      "Complete solutions for Exercise 9.1: equations of straight lines, slope-intercept form, double-intercept form, normal form, linear equations, points of concurrencies, and two sides of a line.",
    url: "https://drive.google.com/file/d/1D-kZXzO-LbPL9jZkPIAXCV6zjhJknlzt/view?usp=sharing",
    previewUrl:
      "https://drive.google.com/file/d/1D-kZXzO-LbPL9jZkPIAXCV6zjhJknlzt/preview",
    tags: ["Exercise 9.1", "Straight Lines", "Linear Equations"],
  },
  {
    id: "webnotee-page",
    title: "WebNotee — Analytical Geometry Chapter Notes",
    source: "WebNotee.com",
    description:
      "Online notes with theory, key formulas, and important points of concurrencies (Orthocentre, Circumcentre, Incentre, Centroid).",
    url: "https://webnotee.com/analytical-geometry-class-11-mathematics-solutions/",
    tags: ["Theory", "Concurrencies", "Notes"],
  },
];

/* ---------- Theory content from webnotee.com ---------- */
const THEORY_SECTIONS = [
  {
    title: "Equations of Straight Lines",
    points: [
      "Line parallel to x-axis: x = a (y-axis when a = 0)",
      "Line parallel to y-axis: y = b (x-axis when b = 0)",
      "Slope-intercept form: y = mx + c",
      "Double-intercept form: x/a + y/b = 1",
      "Normal form: x cos α + y sin α = p",
      "Point-slope form: y − y₁ = m(x − x₁)",
      "Two-point form: y − y₁ = {(y₂−y₁)/(x₂−x₁)}(x − x₁)",
    ],
  },
  {
    title: "Linear Equation",
    points: [
      "General form: Ax + By + C = 0 (A, B not both zero)",
      "Always represents a straight line",
    ],
  },
  {
    title: "Important Points of Concurrencies",
    points: [
      "Orthocentre — perpendiculars from vertices to opposite sides",
      "Circumcentre — perpendicular bisectors of sides",
      "Incentre — bisectors of internal angles",
      "Centroid — medians of the triangle",
    ],
  },
  {
    title: "The Two Sides of a Line",
    points: [
      "For P(x₁,y₁), Q(x₂,y₂) and line Ax+By+C=0:",
      "If R divides PQ internally (m:n > 0) → P, Q on opposite sides",
      "If R divides PQ externally (m:n < 0) → P, Q on same side",
    ],
  },
];

/* ---------- Inline 3D visual — Conic Section Interactive ---------- */
function ConicVisual() {
  const [slope, setSlope] = useState(0.4);
  const type =
    slope < 0.98 ? "Ellipse" : slope <= 1.02 ? "Parabola" : "Hyperbola";

  // Simple SVG-based 2D projection of the 3D concept
  const w = 360;
  const h = 280;
  const cx = w / 2;
  const cy = h / 2;

  // Double cone outline
  const coneTop = `M ${cx} ${cy - 100} L ${cx - 80} ${cy} L ${cx} ${cy + 100}`;
  const coneBot = `M ${cx} ${cy - 100} L ${cx + 80} ${cy} L ${cx} ${cy + 100}`;

  // Slicing plane (tilted by slope)
  const angle = Math.atan(slope);
  const planeLen = 120;
  const px1 = cx - planeLen * Math.cos(angle);
  const py1 = cy + 30 - planeLen * Math.sin(angle);
  const px2 = cx + planeLen * Math.cos(angle);
  const py2 = cy + 30 + planeLen * Math.sin(angle);

  // Intersection curve approximation
  const curveRadius = slope < 0.98 ? 30 + (1 - slope) * 20 : slope <= 1.02 ? 40 : 25;
  const curveCx = cx;
  const curveCy = cy + 30;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Plane slope:</span>
        <input
          type="range"
          min="0"
          max="2"
          step="0.02"
          value={slope}
          onChange={(e) => setSlope(parseFloat(e.target.value))}
          className="w-40"
        />
        <span className="text-sm font-semibold text-orange-500">{type}</span>
      </div>
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full max-w-md border rounded-lg bg-slate-950"
        >
          {/* Cone outlines */}
          <path d={coneTop} stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d={coneBot} stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.6" />
          {/* Cone body fill */}
          <polygon
            points={`${cx},${cy - 100} ${cx - 80},${cy} ${cx},${cy + 100} ${cx + 80},${cy}`}
            fill="#38bdf8"
            opacity="0.08"
          />
          {/* Slicing plane */}
          <line
            x1={px1}
            y1={py1}
            x2={px2}
            y2={py2}
            stroke="#facc15"
            strokeWidth="2"
            opacity="0.7"
          />
          <line
            x1={px1 - 10}
            y1={py1 - 5}
            x2={px2 + 10}
            y2={py2 - 5}
            stroke="#facc15"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* Intersection curve */}
          {slope < 0.98 && (
            <ellipse
              cx={curveCx}
              cy={curveCy}
              rx={curveRadius}
              ry={curveRadius * (1 - slope * 0.3)}
              fill="none"
              stroke="#f97316"
              strokeWidth="2.5"
            />
          )}
          {slope > 1.02 && (
            <>
              <path
                d={`M ${curveCx - curveRadius} ${curveCy} Q ${curveCx} ${curveCy - 40} ${curveCx + curveRadius} ${curveCy}`}
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <path
                d={`M ${curveCx - curveRadius} ${curveCy} Q ${curveCx} ${curveCy + 40} ${curveCx + curveRadius} ${curveCy}`}
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
              />
            </>
          )}
          {slope >= 0.98 && slope <= 1.02 && (
            <path
              d={`M ${curveCx - 40} ${curveCy + 50} Q ${curveCx} ${curveCy - 10} ${curveCx + 40} ${curveCy + 50}`}
              fill="none"
              stroke="#f97316"
              strokeWidth="2.5"
            />
          )}
          {/* Labels */}
          <text x={cx - 70} y={cy - 90} fill="#38bdf8" fontSize="11" fontWeight="600">
            Double Cone
          </text>
          <text x={px2 - 30} y={py2 - 12} fill="#facc15" fontSize="10" fontWeight="600">
            Plane
          </text>
          <text x={cx - 20} y={h - 10} fill="#f97316" fontSize="12" fontWeight="700">
            {type}
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ---------- Straight Line Visual ---------- */
function StraightLineVisual() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(-6);

  const w = 360;
  const h = 300;
  const ox = w / 2;
  const oy = h / 2;
  const scale = 25;

  // Line: ax + by + c = 0  →  y = (-ax - c) / b
  const linePoints: string[] = [];
  for (let px = -w; px <= w * 2; px += 2) {
    const x = (px - ox) / scale;
    const y = b !== 0 ? (-a * x - c) / b : 0;
    const sy = oy - y * scale;
    if (sy >= -20 && sy <= h + 20) {
      linePoints.push(`${px},${sy.toFixed(1)}`);
    }
  }

  // Perpendicular from origin
  const d = Math.abs(c) / Math.sqrt(a * a + b * b);
  const footX = (-a * c) / (a * a + b * b);
  const footY = (-b * c) / (a * a + b * b);
  const footPx = ox + footX * scale;
  const footPy = oy - footY * scale;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="text-muted-foreground">
          a = <input type="number" value={a} onChange={e => setA(+e.target.value)} className="w-12 bg-transparent border-b text-foreground ml-1" />
        </label>
        <label className="text-muted-foreground">
          b = <input type="number" value={b} onChange={e => setB(+e.target.value)} className="w-12 bg-transparent border-b text-foreground ml-1" />
        </label>
        <label className="text-muted-foreground">
          c = <input type="number" value={c} onChange={e => setC(+e.target.value)} className="w-12 bg-transparent border-b text-foreground ml-1" />
        </label>
        <span className="text-xs font-mono text-orange-500">
          {a}x + {b}y + {c} = 0
        </span>
      </div>
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md border rounded-lg bg-slate-950">
          {/* Axes */}
          <line x1={0} y1={oy} x2={w} y2={oy} stroke="#475569" strokeWidth="0.5" />
          <line x1={ox} y1={0} x2={ox} y2={h} stroke="#475569" strokeWidth="0.5" />
          <text x={w - 15} y={oy - 5} fill="#64748b" fontSize="10">x</text>
          <text x={ox + 5} y={12} fill="#64748b" fontSize="10">y</text>
          {/* Origin */}
          <circle cx={ox} cy={oy} r="2" fill="#64748b" />
          {/* The line */}
          {linePoints.length > 1 && (
            <polyline points={linePoints.join(" ")} fill="none" stroke="#f97316" strokeWidth="2.5" />
          )}
          {/* Perpendicular from origin */}
          <line x1={ox} y1={oy} x2={footPx} y2={footPy} stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx={footPx} cy={footPy} r="3" fill="#22d3ee" />
          {/* Right angle marker */}
          {b !== 0 && (
            <text x={ox + (footPx - ox) / 2 - 5} y={oy + (footPy - oy) / 2 + 3} fill="#22d3ee" fontSize="10">∟</text>
          )}
          {/* Labels */}
          <text x={5} y={h - 5} fill="#f97316" fontSize="10" fontWeight="600">
            Line: {a}x + {b}y + {c} = 0
          </text>
          <text x={5} y={h - 18} fill="#22d3ee" fontSize="10">
            ⊥ distance from origin = {d.toFixed(2)}
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ---------- Main Panel ---------- */
export function AnalyticalGeometryResources() {
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
                Analytical Geometry — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercise solutions & study materials for Chapter 9
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {PDF_RESOURCES.map((res) => (
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

          {/* Inline PDF preview */}
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2 font-medium">
              📄 Exercise 9.1 PDF Preview:
            </p>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border">
              <iframe
                src="https://drive.google.com/file/d/1D-kZXzO-LbPL9jZkPIAXCV6zjhJknlzt/preview"
                className="w-full h-full"
                allow="autoplay"
                title="Analytical Geometry Exercise 9.1 PDF"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D / Interactive Visuals */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              <Play className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Interactive Visuals
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore conic sections & straight lines interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="conics" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="conics">Conic Sections</TabsTrigger>
              <TabsTrigger value="line">Straight Line</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="conics" className="space-y-4">
              <ConicVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Conic Sections:</strong> Every
                conic is the intersection of a plane with a right circular double
                cone. Drag the slope slider to see how the curve changes: circle (m
                = 0) → ellipse → parabola → hyperbola as tilt increases.
              </div>
              <Button asChild size="sm" variant="outline">
                <a href="/lab/math-3d-geometry" target="_blank" rel="noopener noreferrer">
                  <Play className="w-3.5 h-3.5 mr-1" />
                  Open Full 3D Lab
                </a>
              </Button>
            </TabsContent>

            <TabsContent value="line" className="space-y-4">
              <StraightLineVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Straight Lines:</strong> Adjust
                a, b, c to see how the line Ax + By + C = 0 moves. The cyan dashed
                line shows the perpendicular distance from the origin to the line.
              </div>
            </TabsContent>

            <TabsContent value="theory" className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {THEORY_SECTIONS.map((sec) => (
                  <div
                    key={sec.title}
                    className="p-3 rounded-lg border bg-background/60"
                  >
                    <h4 className="text-sm font-semibold mb-2">{sec.title}</h4>
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
