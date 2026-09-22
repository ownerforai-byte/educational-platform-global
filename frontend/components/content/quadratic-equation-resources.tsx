/**
 * Quadratic Equation Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics → Algebra → Quadratic Equation
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Calculator,
  TrendingUp,
  MoveHorizontal,
  Target,
  Lightbulb,
  Play,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { QuadraticAdditionalVisual } from "./additional-questions-visuals";
import { Schematic } from "./schematic-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

/* ---------- Parabola Visual ---------- */
function ParabolaVisual() {
  const [a, setA] = useState([1]);
  const [b, setB] = useState([0]);
  const [c, setC] = useState([0]);

  // Calculate discriminant and roots
  const discriminant = b[0] ** 2 - 4 * a[0] * c[0];
  const root1 = (-b[0] + Math.sqrt(Math.abs(discriminant))) / (2 * a[0]);
  const root2 = (-b[0] - Math.sqrt(Math.abs(discriminant))) / (2 * a[0]);

  const w = 450;
  const h2 = 320;
  const ox = 80;
  const oy = h2 - 40;
  const scale = 40;

  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  // Graph points
  const graphPoints: string[] = [];
  for (let vx = -10; vx <= 10; vx += 0.2) {
    const vy = a[0] * vx * vx + b[0] * vx + c[0];
    const sy = toSvgY(vy);
    if (sy >= -10 && sy <= h2 + 10) {
      graphPoints.push(`${toSvgX(vx)},${sy.toFixed(1)}`);
    }
  }

  // Vertex calculation
  const vertexX = -b[0] / (2 * a[0]);
  const vertexY = a[0] * vertexX * vertexX + b[0] * vertexX + c[0];

  // Axis of symmetry
  const axisX = toSvgX(vertexX);

  // Roots (x-intercepts)
  const roots: { x: number; y: number; color: string }[] = [];
  if (discriminant >= 0) {
    roots.push({ x: root1, y: 0, color: "#10b981" });
    roots.push({ x: root2, y: 0, color: "#10b981" });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">a =</span>
          <span className="font-mono font-semibold w-12 text-center">
            {a[0].toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">b =</span>
          <span className="font-mono font-semibold w-12 text-center">
            {b[0].toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">c =</span>
          <span className="font-mono font-semibold w-12 text-center">
            {c[0].toFixed(1)}
          </span>
        </div>
        <div className="font-mono text-orange-500 ml-4">
          D = {discriminant.toFixed(2)}
        </div>
      </div>

      <div className="flex justify-center">
        <Schematic
          w={w} h={h2} ox={ox} oy={oy} scale={scale}
          tickStep={1}
          legend={[
            { color: "#38bdf8", label: "y = ax² + bx + c" },
            { color: "#6366f1", label: "axis of symmetry", dashed: true },
            { color: "#f97316", label: "vertex" },
            { color: "#facc15", label: "y-intercept" },
            { color: "#10b981", label: "roots" },
          ]}
          xLabel="x" yLabel="y"
        >
          {/* Axis of symmetry (dashed) */}
          <line x1={axisX} y1={0} x2={axisX} y2={h2} stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          {/* Parabola */}
          {graphPoints.length > 1 && (
            <polyline points={graphPoints.join(" ")} fill="none" stroke="#38bdf8" strokeWidth="2" />
          )}
          {/* y-intercept */}
          <circle cx={toSvgX(0)} cy={toSvgY(c[0])} r="4" fill="#facc15" stroke="#fff" strokeWidth="1" />
          {/* Vertex */}
          <circle cx={toSvgX(vertexX)} cy={toSvgY(vertexY)} r="6" fill="#f97316" stroke="#fff" strokeWidth="2" />
          {/* Roots */}
          {roots.map((root, index) => (
            <circle key={index} cx={toSvgX(root.x)} cy={toSvgY(root.y)} r="5" fill={root.color} stroke="#fff" strokeWidth="1.5" />
          ))}
          {/* Labels */}
          <text x={axisX + 4} y={h2 - 6} fill="#6366f1" fontSize="9">{`x = `}{vertexX.toFixed(2)}</text>
          {roots.length > 0 && (
            <text x={toSvgX(roots[0].x) - 4} y={toSvgY(0) - 10} fill="#10b981" fontSize="9">{`x₁ = `}{root1.toFixed(2)}</text>
          )}
          {roots.length > 1 && (
            <text x={toSvgX(roots[1].x) + 4} y={toSvgY(0) - 10} fill="#10b981" fontSize="9">{`x₂ = `}{root2.toFixed(2)}</text>
          )}
        </Schematic>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Vertex</div>
          <div className="font-mono">
            ({vertexX.toFixed(2)}, {vertexY.toFixed(2)})
          </div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Axis of Symmetry</div>
          <div className="font-mono">x = {vertexX.toFixed(2)}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Discriminant (D)</div>
          <div className="font-mono">
            {discriminant > 0 ? "D > 0" : discriminant === 0 ? "D = 0" : "D < 0"}
          </div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <div className="text-muted-foreground">Roots</div>
          <div className="font-mono">
            {discriminant >= 0 ? `${root1.toFixed(2)}, ${root2.toFixed(2)}` : "Complex"}
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Parabola Properties:</strong> The graph of y = ax² + bx + c is a parabola.
        The vertex is at x = -b/(2a), and the parabola opens upward if a {'>'} 0, downward if a {'<'} 0.
        The discriminant D = b² - 4ac determines the nature of the roots.
      </div>
    </div>
  );
}

/* ---------- Root Visualization ---------- */
function RootVisual() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-4);

  // Calculate discriminant and roots
  const discriminant = b * b - 4 * a * c;
  const hasRealRoots = discriminant >= 0;
  const root1 = (-b + Math.sqrt(Math.abs(discriminant))) / (2 * a);
  const root2 = (-b - Math.sqrt(Math.abs(discriminant))) / (2 * a);

  // Sum and product of roots
  const sum = -b / a;
  const product = c / a;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">a =</span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">b =</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">c =</span>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(parseFloat(e.target.value) || 0)}
            className="w-16 bg-transparent border-b text-foreground ml-1"
            step="0.1"
          />
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border">
        <div className="text-sm font-mono text-purple-400 mb-3">
          Quadratic Formula:
        </div>
        <div className="text-lg font-mono text-center">
          x = <span className="text-blue-400">(-b ± √D) / 2a</span>
        </div>
        <div className="text-sm text-center mt-2 text-muted-foreground">
          where D = b² - 4ac is the discriminant
        </div>

        <div className="mt-4 p-3 bg-slate-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Discriminant:</span>
            <span
              className={`font-mono font-semibold ${
                discriminant > 0 ? "text-green-400" :
                discriminant === 0 ? "text-yellow-400" :
                "text-red-400"
              }`}
            >
              D = {discriminant.toFixed(2)}
            </span>
          </div>
          <div className="mt-2 text-sm">
            {discriminant > 0 && "✓ Two distinct real roots"}
            {discriminant === 0 && "✓ Two equal real roots"}
            {discriminant < 0 && "✓ Two complex conjugate roots"}
          </div>
        </div>

        {hasRealRoots ? (
          <div className="mt-4 space-y-2">
            <div className="text-sm font-mono">
              x₁ = (-{b} + √{discriminant.toFixed(2)}) / {2 * a} = {root1.toFixed(4)}
            </div>
            <div className="text-sm font-mono">
              x₂ = (-{b} - √{discriminant.toFixed(2)}) / {2 * a} = {root2.toFixed(4)}
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <div className="text-sm">
              Roots are complex: x = {(-b / (2 * a)).toFixed(4)} ± {Math.sqrt(Math.abs(discriminant)).toFixed(4)}i / {2 * a}
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="p-2 bg-slate-800 rounded">
            <div className="text-muted-foreground text-xs">Sum of Roots</div>
            <div className="font-mono">α + β = {-b / a}</div>
            <div className="font-mono text-green-400">= {sum.toFixed(4)}</div>
          </div>
          <div className="p-2 bg-slate-800 rounded">
            <div className="text-muted-foreground text-xs">Product of Roots</div>
            <div className="font-mono">αβ = {c / a}</div>
            <div className="font-mono text-green-400">= {product.toFixed(4)}</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Key Formulas:</strong> For ax² + bx + c = 0:
        Sum of roots = -b/a, Product of roots = c/a. The discriminant D = b² - 4ac determines
        the nature of roots: D{'>'}0 (two distinct real), D=0 (one real root), D{'<'}0 (complex roots).
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Standard Form",
    points: [
      "A quadratic equation has the form: ax² + bx + c = 0",
      "Where a, b, c are real numbers and a ≠ 0",
      "Example: 2x² - 5x + 3 = 0 is quadratic, x² + 4 = 0 is quadratic",
    ],
  },
  {
    title: "Discriminant",
    points: [
      "D = b² - 4ac is called the discriminant",
      "D > 0: Two distinct real roots",
      "D = 0: One real root (two equal roots)",
      "D < 0: Two complex conjugate roots",
    ],
  },
  {
    title: "Quadratic Formula",
    points: [
      "The roots of ax² + bx + c = 0 are given by:",
      "x = (-b ± √(b² - 4ac)) / 2a",
      "This formula works for all quadratic equations",
    ],
  },
  {
    title: "Sum and Product of Roots",
    points: [
      "If α and β are roots of ax² + bx + c = 0:",
      "Sum: α + β = -b/a",
      "Product: αβ = c/a",
      "These relationships help solve problems without finding roots",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function QuadraticEquationResources() {
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
                Quadratic Equation — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercises covering discriminant, roots, and properties
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-6-1",
              title: "Exercise 6.1 — Quadratic Equation",
              description:
                "Nature of roots, discriminant, relation between roots and coefficients.",
              url: "https://drive.google.com/file/d/1f_c0UjCEB2k6ibaIOKKQhiSvXfJAmLaO/preview",
              pdfUrl: "https://drive.google.com/file/d/1f_c0UjCEB2k6ibaIOKKQhiSvXfJAmLaO/view?usp=sharing",
              tags: ["Exercise 6.1", "Discriminant", "Roots"],
            },
            {
              id: "ex-6-2",
              title: "Exercise 6.2 — Quadratic Equation",
              description:
                "Formation of quadratic equations, symmetric roots, common roots.",
              url: "https://drive.google.com/file/d/1flIIoFOv5jlGQdu-Fzfs6Gf4HRCrh6VA/preview",
              pdfUrl: "https://drive.google.com/file/d/1flIIoFOv5jlGQdu-Fzfs6Gf4HRCrh6VA/view?usp=sharing",
              tags: ["Exercise 6.2", "Symmetric Roots", "Formation"],
            },
            {
              id: "ex-6-3",
              title: "Exercise 6.3 — Quadratic Equation",
              description:
                "Advanced problems: quadratic inequalities, location of roots.",
              url: "https://drive.google.com/file/d/1fpcYpvdGjs1XznNjLfQwQ8ZIDIZvahHN/preview",
              pdfUrl: "https://drive.google.com/file/d/1fpcYpvdGjs1XznNjLfQwQ8ZIDIZvahHN/view?usp=sharing",
              tags: ["Exercise 6.3", "Inequalities", "Advanced"],
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
                <a href={res.url}>
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
                Explore quadratic equations and their properties
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="parabola" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="parabola">Parabola Visual</TabsTrigger>
              <TabsTrigger value="roots">Root Visual</TabsTrigger>
              <TabsTrigger value="theory">Theory Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="parabola" className="space-y-4">
              <ParabolaVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Parabola Properties:</strong> The graph of a quadratic
                function is a parabola. The coefficient 'a' determines the direction and width, 'b' affects
                the position, and 'c' is the y-intercept. The vertex represents the maximum or minimum point.
              </div>
            </TabsContent>

            <TabsContent value="roots" className="space-y-4">
              <RootVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Quadratic Formula:</strong> Use the quadratic formula to find
                roots. The discriminant D = b² - 4ac tells you the nature of the roots. Sum and product of
                roots can be found directly from coefficients using Vieta's formulas.
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





{/* Solved Solutions & Extra Hard Questions */}
      <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Solved Solutions &amp; Extra Hard Questions</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Concept notes, step-by-step solutions, and advanced problems for Quadratic Equations
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-4 h-4" /> Concept &amp; Meaning
            </h4>
            <MathMarkdown
              className="text-xs text-muted-foreground bg-amber-50/40 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200/50 dark:border-amber-900/40"
              content={`A <strong>quadratic equation</strong> has the form $ax^2 + bx + c = 0$ with $a \\neq 0$; its graph is a parabola. The <strong>discriminant</strong> $D = b^2 - 4ac$ sets the nature of the roots: $D > 0$ means two distinct real roots, $D = 0$ means one repeated real root, $D < 0$ means two complex conjugate roots. <strong>Vieta's formulas</strong> link roots to coefficients without solving: sum $\\alpha + \\beta = -b/a$ and product $\\alpha\\beta = c/a$.`}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
              <BookOpen className="w-4 h-4" /> Solved Solution — Building a Quadratic from Its Roots
            </h4>
            <MathMarkdown
              className="text-xs bg-green-50/40 dark:bg-green-950/20 p-3 rounded-lg border border-green-200/50 dark:border-green-900/40"
              content={`**Problem:** Find the quadratic equation with roots $\\alpha = 2 + \\sqrt{3}$ and $\\beta = 2 - \\sqrt{3}$.

**Solution:**
Sum: $\\alpha + \\beta = (2+\\sqrt{3}) + (2-\\sqrt{3}) = 4$
Product: $\\alpha\\beta = (2+\\sqrt{3})(2-\\sqrt{3}) = 4 - 3 = 1$

The quadratic is $x^2 - (\\alpha+\\beta)x + \\alpha\\beta = 0$:
$$\\boxed{x^2 - 4x + 1 = 0}$$

**Verification:** $D = 16 - 4 = 12 > 0$ &rarr; two distinct real roots &check;.`}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Target className="w-4 h-4" /> Extra Hard Questions
            </h4>
            <div className="space-y-2">
              {[
                { q: "Find all real values of k for which $kx^2 - 3x + 1 = 0$ has two distinct real roots.", hint: "Two distinct real roots means D &gt; 0 AND a &ne; 0.", ans: "$D = 9 - 4k &gt; 0$ &rarr; $k &lt; 9/4$; also $k \\neq 0$. So $k \\in (-\\infty,0) \\cup (0, 9/4)$." },
                { q: "Prove: if $a + b + c = 0$, then $x = 1$ is always a root of $ax^2 + bx + c = 0$.", hint: "Substitute $x = 1$ and use the given condition.", ans: "$a(1)^2 + b(1) + c = a + b + c = 0$ &check;, so $(x - 1)$ is a factor." },
                { q: "Solve the biquadratic $x^4 - 5x^2 + 4 = 0$ and list all four roots.", hint: "Substitute $u = x^2$ to reduce to a quadratic in u.", ans: "$u^2 - 5u + 4 = 0$ &rarr; $u = 1, 4$ &rarr; $x = \\pm 1, \\pm 2$ (four real roots)." },
                { q: "Find the values of m for which $mx^2 + (2m+1)x + m + 1 = 0$ has equal roots.", hint: "Equal roots means D = 0.", ans: "$D = (2m+1)^2 - 4m(m+1) = 1$ for all m, so $D=0$ is impossible: no real m gives equal roots." },
                { q: "If $\\alpha, \\beta$ are the roots of $x^2 - 3x + 1 = 0$, form the quadratic whose roots are $\\alpha^2/\\beta$ and $\\beta^2/\\alpha$.", hint: "Use sum/product of $\\alpha, \\beta$ to get the new sum and product.", ans: "New sum $= (\\alpha^3+\\beta^3)/(\\alpha\\beta) = ((\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta))/(\\alpha\\beta) = 18$; new product $= \\alpha\\beta = 1$. So $x^2 - 18x + 1 = 0$." },
              ].map((item, i) => (
                <details key={i} className="rounded-lg border bg-background/60 p-3">
                  <summary className="text-sm cursor-pointer list-none flex items-start gap-2">
                    <span className="text-purple-500 font-semibold shrink-0">Q{i + 1}.</span>
                    <MathMarkdown content={item.q} className="flex-1 text-xs" />
                  </summary>
                  <div className="mt-2 space-y-2 text-xs pl-6">
                    <MathMarkdown
                      content={"**Hint:** " + item.hint}
                      className="text-muted-foreground"
                    />
                    <MathMarkdown
                      content={"**Answer:** " + item.ans}
                      className="text-green-700 dark:text-green-400 bg-green-50/40 dark:bg-green-950/20 p-2 rounded-lg border border-green-200/50 dark:border-green-900/40"
                    />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Additional Question Visuals */}
      <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <Play className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Additional-Question Visuals — Quadratic Equation</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">Interactive visuals for the extra hard questions above</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <QuadraticAdditionalVisual />
        </CardContent>
      </Card>

    </div>
  );
}
