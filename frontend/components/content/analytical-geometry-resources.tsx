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
import { DistancePointToLineVisual } from "./distance-point-to-line";
import { AngleBetweenLinesVisual } from "./angle-between-lines";
import { ParallelLinesVisual } from "./parallel-lines";

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

/* ---------- Theorem: Distance from Point to Line ---------- */
const DISTANCE_THEOREM = `
<strong>Theorem:</strong> The shortest distance from a point P(x₀, y₀) to the line Ax + By + C = 0 is:
<br/><br/>
<span class="text-orange-500 font-bold text-lg">d = |Ax₀ + By₀ + C| / √(A² + B²)</span>
<br/><br/>
<strong>Proof:</strong>
<br/>1. Let L be the line Ax + By + C = 0
<br/>2. The perpendicular from P to L has direction (A, B)
<br/>3. Parametric form of perpendicular: (x, y) = (x₀ + At, y₀ + Bt)
<br/>4. Substitute into line equation: A(x₀ + At) + B(y₀ + Bt) + C = 0
<br/>5. Solve for t: t = −(Ax₀ + By₀ + C)/(A² + B²)
<br/>6. Distance d = |t|√(A² + B²) = |Ax₀ + By₀ + C| / √(A² + B²) ∎
`.trim();

/* ---------- Theorem: Angle Between Two Lines ---------- */
const ANGLE_THEOREM = `
<strong>Theorem:</strong> The acute angle θ between two lines with slopes m₁ and m₂ is:
<br/><br/>
<span class="text-orange-500 font-bold text-lg">tan θ = |(m₂ − m₁) / (1 + m₁m₂)|</span>
<br/><br/>
<strong>Proof:</strong>
<br/>1. Let α₁, α₂ be angles made by lines with positive x-axis
<br/>2. Then m₁ = tan α₁, m₂ = tan α₂
<br/>3. Angle between lines: θ = |α₂ − α₁|
<br/>4. tan θ = tan|α₂ − α₁| = |tan(α₂ − α₁)|
<br/>5. Using formula: tan(A−B) = (tanA − tanB)/(1 + tanA·tanB)
<br/>6. Therefore: tan θ = |(m₂ − m₁)/(1 + m₁m₂)| ∎
`.trim();

/* ---------- Theorem: Distance Between Parallel Lines ---------- */
const PARALLEL_THEOREM = `
<strong>Theorem:</strong> Distance between parallel lines Ax + By + C₁ = 0 and Ax + By + C₂ = 0 is:
<br/><br/>
<span class="text-orange-500 font-bold text-lg">d = |C₁ − C₂| / √(A² + B²)</span>
<br/><br/>
<strong>Proof:</strong>
<br/>1. Take any point on first line: Ax₀ + By₀ + C₁ = 0
<br/>2. Distance to second line = |Ax₀ + By₀ + C₂| / √(A² + B²)
<br/>3. Since Ax₀ + By₀ = −C₁, distance = |−C₁ + C₂| / √(A² + B²)
<br/>4. Therefore: d = |C₁ − C₂| / √(A² + B²) ∎
`.trim();

/* ---------- Theorem: Condition for Concurrency ---------- */
const CONCURRENT_THEOREM = `
<strong>Theorem:</strong> Three lines a₁x + b₁y + c₁ = 0, a₂x + b₂y + c₂ = 0, a₃x + b₃y + c₃ = 0 are concurrent if:
<br/><br/>
<span class="text-orange-500 font-bold text-lg">a₁(b₂c₃ − b₃c₂) − b₁(a₂c₃ − a₃c2) + c₁(a₂b₃ − a₃b₂) = 0</span>
<br/><br/>
<strong>Proof:</strong>
<br/>1. Solve first two lines to find their intersection point (x, y)
<br/>2. Substitute into third line
<br/>3. Using Cramer's rule or elimination, condition for all three to pass through same point:
<br/>4. det [[a₁,b₁,c₁],[a₂,b₂,c₂],[a₃,b₃,c₃]] = 0 ∎
`.trim();

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
          <Tabs defaultValue="theorems" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="theorems">Theorems</TabsTrigger>
              <TabsTrigger value="conics">Conic Sections</TabsTrigger>
              <TabsTrigger value="point-line">Point to Line</TabsTrigger>
              <TabsTrigger value="angle">Angle</TabsTrigger>
              <TabsTrigger value="parallel">Parallel</TabsTrigger>
            </TabsList>

            <TabsContent value="theorems" className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-semibold text-orange-500 mb-2">Theorem 1: Distance from Point to Line</h4>
                  <div className="text-sm prose prose-sm" dangerouslySetInnerHTML={{ __html: DISTANCE_THEOREM }} />
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-semibold text-orange-500 mb-2">Theorem 2: Angle Between Two Lines</h4>
                  <div className="text-sm prose prose-sm" dangerouslySetInnerHTML={{ __html: ANGLE_THEOREM }} />
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-semibold text-orange-500 mb-2">Theorem 3: Distance Between Parallel Lines</h4>
                  <div className="text-sm prose prose-sm" dangerouslySetInnerHTML={{ __html: PARALLEL_THEOREM }} />
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-semibold text-orange-500 mb-2">Theorem 4: Condition for Concurrency</h4>
                  <div className="text-sm prose prose-sm" dangerouslySetInnerHTML={{ __html: CONCURRENT_THEOREM }} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="point-line" className="space-y-4">
              <DistancePointToLineVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Simulation:</strong> Drag the sliders to adjust the line parameters (a, b, c) and point coordinates (x₀, y₀). The cyan dashed line shows the perpendicular from the point to the line.
              </div>
            </TabsContent>

            <TabsContent value="angle" className="space-y-4">
              <AngleBetweenLinesVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Simulation:</strong> Adjust slopes m₁, m₂ and y-intercepts c₁, c₂ to see how the angle between two lines changes. The intersection point is marked in yellow.
              </div>
            </TabsContent>

            <TabsContent value="parallel" className="space-y-4">
              <ParallelLinesVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Simulation:</strong> Adjust A, B to change the slope, and C₁, C₂ to shift the parallel lines. The distance between them is shown as a dashed line.
              </div>
            </TabsContent>

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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
