"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LabCard } from "@/components/lab/lab-card";
import { LabInput } from "@/components/lab/lab-input";
import { LabResult } from "@/components/lab/lab-result";
import { Sparkles, RotateCcw } from "lucide-react";

/**
 * Universal Equation Solver — a premium lab.
 *
 * Solves three classes of equations with full step-by-step working, the way a
 * teacher would show on a board:
 *   1. Linear     ax + b = c
 *   2. Quadratic  ax² + bx + c = 0  (real + complex roots, vertex, sum/product)
 *   3. System     a₁x + b₁y = c₁, a₂x + b₂y = c₂ (Cramer's rule / determinant)
 *
 * Includes science-formula presets (Ohm's law, Newton's 2nd law, kinematics)
 * so physics/chemistry students can solve textbook equations directly.
 */

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "undefined";
  if (Math.abs(n) < 1e-10) return "0";
  return String(Number(n.toPrecision(10)));
}

function fmtSigned(n: number): string {
  if (Math.abs(n) < 1e-10) return "0";
  return `${n < 0 ? "−" : ""}${fmt(Math.abs(n))}`;
}

const parseNum = (v: string, fallback = 0): number => {
  const n = Number(v.trim());
  return Number.isFinite(n) ? n : fallback;
};

/* ------------------------------------------------------------------ */
/* Linear: ax + b = c                                                  */
/* ------------------------------------------------------------------ */

interface LinearResult {
  solution: string;
  steps: string[];
  degenerate?: string;
}

function solveLinear(a: number, b: number, c: number): LinearResult {
  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b - c) < 1e-12) {
      return {
        solution: "Infinite solutions",
        steps: [`Given ${fmt(b)} = ${fmt(c)}`],
        degenerate: "Every value of x satisfies the equation (a = 0 and b = c).",
      };
    }
    return {
      solution: "No solution",
      steps: [`Given ${fmt(b)} = ${fmt(c)}`],
      degenerate: "Contradiction — no value of x can make both sides equal (a = 0, b ≠ c).",
    };
  }
  const x = (c - b) / a;
  return {
    solution: `x = ${fmt(x)}`,
    steps: [
      `Start with ax + b = c  →  ${fmt(a)}·x + ${fmtSigned(b)} = ${fmt(c)}`,
      `Subtract b from both sides: ax = c − b  →  ${fmt(a)}·x = ${fmt(c - b)}`,
      `Divide both sides by a: x = (c − b) / a  →  x = ${fmt(c - b)} / ${fmt(a)}`,
      `Therefore x = ${fmt(x)}`,
    ],
  };
}
/* ------------------------------------------------------------------ */
/* Quadratic: ax² + bx + c = 0                                         */
/* ------------------------------------------------------------------ */

interface QuadraticResult {
  solution: string;
  steps: string[];
  discriminant: number;
  vertexX: number;
  vertexY: number;
  sumRoots: number;
  productRoots: number;
  complex: boolean;
}

function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  const notQuadratic = Math.abs(a) < 1e-12;
  const D = notQuadratic ? 0 : b * b - 4 * a * c;
  let solution: string;
  let complex = false;
  const steps: string[] = [];

  if (notQuadratic) {
    const lin = solveLinear(b, c, 0);
    solution = lin.solution;
    steps.push(...lin.steps);
  } else {
    steps.push(`Given quadratic: ${fmt(a)}x² + ${fmtSigned(b)}x + ${fmtSigned(c)} = 0`);
    steps.push(
      `Compute the discriminant Δ = b² − 4ac  →  ${fmt(b)}² − 4·(${fmt(a)})·(${fmt(c)}) = ${fmt(D)}`
    );
    if (D > 0) {
      const x1 = (-b + Math.sqrt(D)) / (2 * a);
      const x2 = (-b - Math.sqrt(D)) / (2 * a);
      solution = `x₁ = ${fmt(x1)},  x₂ = ${fmt(x2)}`;
      steps.push("Δ > 0 → two distinct real roots, x = (−b ± √Δ) / 2a:");
      steps.push(`x₁ = (−${fmt(b)} + √${fmt(D)}) / (2·${fmt(a)}) = ${fmt(x1)}`);
      steps.push(`x₂ = (−${fmt(b)} − √${fmt(D)}) / (2·${fmt(a)}) = ${fmt(x2)}`);
    } else if (D === 0) {
      const x = -b / (2 * a);
      solution = `x = ${fmt(x)} (repeated root)`;
      steps.push(`Δ = 0 → one repeated real root: x = −b / 2a = ${fmt(x)}`);
    } else {
      complex = true;
      const re = -b / (2 * a);
      const im = Math.sqrt(-D) / (2 * Math.abs(a));
      solution = `x = ${fmt(re)} ± ${fmt(im)}i`;
      steps.push("Δ < 0 → two complex conjugate roots, x = (−b ± i√|Δ|) / 2a:");
      steps.push(`x = ${fmt(re)} ± i·${fmt(im)}`);
    }
  }

  const aEff = notQuadratic ? 1 : a;
  return {
    solution,
    steps,
    discriminant: D,
    vertexX: -b / (2 * aEff),
    vertexY: -(D / (4 * aEff)),
    sumRoots: -b / aEff,
    productRoots: c / aEff,
    complex,
  };
}

/* ------------------------------------------------------------------ */
/* System 2×2: a₁x + b₁y = c₁ ; a₂x + b₂y = c₂                        */
/* ------------------------------------------------------------------ */

interface SystemResult {
  solution: string;
  steps: string[];
  degenerate?: string;
}

function solveSystem(a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): SystemResult {
  const D = a1 * b2 - a2 * b1;
  const steps: string[] = [
    `Determinant Δ = a₁·b₂ − a₂·b₁  →  (${fmt(a1)})(${fmt(b2)}) − (${fmt(a2)})(${fmt(b1)}) = ${fmt(D)}`,
  ];
  if (Math.abs(D) > 1e-12) {
    const x = (c1 * b2 - c2 * b1) / D;
    const y = (a1 * c2 - a2 * c1) / D;
    steps.push(`By Cramer's rule: x = (c₁·b₂ − c₂·b₁)/Δ = ${fmt(x)}`);
    steps.push(`Similarly: y = (a₁·c₂ − a₂·c₁)/Δ = ${fmt(y)}`);
    return { solution: `x = ${fmt(x)},  y = ${fmt(y)}`, steps };
  }
  const proportional =
    Math.abs(c2) < 1e-9
      ? Math.abs(a2) < 1e-9 && Math.abs(b2) < 1e-9
      : Math.abs(a1 * c2 - a2 * c1) < 1e-9 && Math.abs(b1 * c2 - b2 * c1) < 1e-9;
  if (proportional) {
    return {
      solution: "Infinite solutions (coincident lines)",
      steps,
      degenerate: "The two equations are multiples of each other — the system is dependent.",
    };
  }
  return {
    solution: "No solution (parallel lines)",
    steps,
    degenerate: "The lines are parallel and never intersect — the system is inconsistent.",
  };
}
/* ------------------------------------------------------------------ */
/* Presets + shared UI                                                 */
/* ------------------------------------------------------------------ */

type LinearInputs = { a: string; b: string; c: string };
type QuadraticInputs = { a: string; b: string; c: string };
type SystemInputs = { a1: string; b1: string; c1: string; a2: string; b2: string; c2: string };

const linearPresets = [
  { name: "Ohm's law V = I·R", values: { a: "10", b: "0", c: "5" }, hint: "Solve I when R = 10 Ω, V = 5 V" },
  { name: "Newton's 2nd F = m·a", values: { a: "2.5", b: "0", c: "12" }, hint: "Solve a when m = 2.5 kg, F = 12 N" },
];

const quadraticPresets = [
  { name: "Kinematics ½at² + ut = s", values: { a: "2", b: "4", c: "-6" }, hint: "½a=2, u=4, −s=−6" },
  { name: "Projectile h = ut − ½gt²", values: { a: "-4.9", b: "20", c: "0" }, hint: "½g≈4.9, u=20" },
];

const systemPresets = [
  { name: "2×2 example", values: { a1: "2", b1: "3", c1: "13", a2: "4", b2: "-1", c2: "5" }, hint: "x = 2, y = 3" },
];

function StepsPanel({ steps, note }: { steps: string[]; note?: string }) {
  return (
    <Card className="bg-muted/30">
      <CardContent className="space-y-3 p-4">
        <p className="text-sm font-semibold">Step-by-step solution</p>
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                {i + 1}
              </span>
              <span className="whitespace-pre-line text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
        {note && <p className="text-xs text-amber-600 dark:text-amber-400">{note}</p>}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function PremiumEquationSolver({ className }: { className?: string }) {
  const [linear, setLinear] = useState<LinearInputs>({ a: "3", b: "2", c: "11" });
  const [quad, setQuad] = useState<QuadraticInputs>({ a: "1", b: "-3", c: "2" });
  const [sys, setSys] = useState<SystemInputs>({ a1: "2", b1: "3", c1: "13", a2: "4", b2: "-1", c2: "5" });

  const linearResult = useMemo(
    () => solveLinear(parseNum(linear.a, 1), parseNum(linear.b), parseNum(linear.c)),
    [linear]
  );
  const quadResult = useMemo(
    () => solveQuadratic(parseNum(quad.a, 1), parseNum(quad.b), parseNum(quad.c)),
    [quad]
  );
  const systemResult = useMemo(
    () =>
      solveSystem(
        parseNum(sys.a1, 1),
        parseNum(sys.b1, 1),
        parseNum(sys.c1, 1),
        parseNum(sys.a2, 1),
        parseNum(sys.b2, 1),
        parseNum(sys.c2, 1)
      ),
    [sys]
  );

  const resetLinear = () => setLinear({ a: "3", b: "2", c: "11" });
  const resetQuadratic = () => setQuad({ a: "1", b: "-3", c: "2" });
  const resetSystem = () => setSys({ a1: "2", b1: "3", c1: "13", a2: "4", b2: "-1", c2: "5" });

  return (
    <div className={`space-y-6 ${className}`}>
      <LabCard
        title="Universal Equation Solver"
        icon={<Sparkles className="h-5 w-5 text-amber-500" />}
        description="Premium lab — solve linear, quadratic, and system equations with full step-by-step working. Pick a science preset or enter your own coefficients."
      >
        <Tabs defaultValue="linear" className="w-full">
          <TabsList className="flex-wrap">
            <TabsTrigger value="linear">Linear ax + b = c</TabsTrigger>
            <TabsTrigger value="quadratic">Quadratic ax² + bx + c = 0</TabsTrigger>
            <TabsTrigger value="system">System (2×2)</TabsTrigger>
          </TabsList>

          {/* Linear ------------------------------------------------------ */}
          <TabsContent value="linear" className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <LabInput id="lin-a" label="a" value={linear.a} onChange={(v) => setLinear({ ...linear, a: v })} className="w-full" />
              <LabInput id="lin-b" label="b" value={linear.b} onChange={(v) => setLinear({ ...linear, b: v })} className="w-full" />
              <LabInput id="lin-c" label="c" value={linear.c} onChange={(v) => setLinear({ ...linear, c: v })} className="w-full" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetLinear} className="text-xs">
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
              {linearPresets.map((p) => (
                <Button key={p.name} variant="outline" size="sm" className="text-xs" onClick={() => setLinear({ ...p.values })}>
                  {p.name}
                </Button>
              ))}
            </div>
            <LabResult label="Solution" value={linearResult.solution} highlight />
            <StepsPanel steps={linearResult.steps} note={linearResult.degenerate} />
          </TabsContent>
{/* Quadratic --------------------------------------------------- */}
          <TabsContent value="quadratic" className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <LabInput id="q-a" label="a" value={quad.a} onChange={(v) => setQuad({ ...quad, a: v })} className="w-full" />
              <LabInput id="q-b" label="b" value={quad.b} onChange={(v) => setQuad({ ...quad, b: v })} className="w-full" />
              <LabInput id="q-c" label="c" value={quad.c} onChange={(v) => setQuad({ ...quad, c: v })} className="w-full" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetQuadratic} className="text-xs">
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
              {quadraticPresets.map((p) => (
                <Button key={p.name} variant="outline" size="sm" className="text-xs" onClick={() => setQuad({ ...p.values })}>
                  {p.name}
                </Button>
              ))}
            </div>
            <LabResult label="Solution" value={quadResult.solution} highlight />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <LabResult label="Discriminant Δ" value={fmt(quadResult.discriminant)} />
              <LabResult label="Vertex x" value={fmt(quadResult.vertexX)} />
              <LabResult label="Sum of roots" value={fmt(quadResult.sumRoots)} />
              <LabResult label="Product of roots" value={fmt(quadResult.productRoots)} />
            </div>
            <StepsPanel steps={quadResult.steps} />
          </TabsContent>

          {/* System ------------------------------------------------------ */}
          <TabsContent value="system" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <LabInput id="s-a1" label="a₁" value={sys.a1} onChange={(v) => setSys({ ...sys, a1: v })} />
              <LabInput id="s-b1" label="b₁" value={sys.b1} onChange={(v) => setSys({ ...sys, b1: v })} />
              <LabInput id="s-c1" label="c₁" value={sys.c1} onChange={(v) => setSys({ ...sys, c1: v })} />
              <LabInput id="s-a2" label="a₂" value={sys.a2} onChange={(v) => setSys({ ...sys, a2: v })} />
              <LabInput id="s-b2" label="b₂" value={sys.b2} onChange={(v) => setSys({ ...sys, b2: v })} />
              <LabInput id="s-c2" label="c₂" value={sys.c2} onChange={(v) => setSys({ ...sys, c2: v })} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetSystem} className="text-xs">
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
              {systemPresets.map((p) => (
                <Button key={p.name} variant="outline" size="sm" className="text-xs" onClick={() => setSys({ ...p.values })}>
                  {p.name}
                </Button>
              ))}
            </div>
            <LabResult label="Solution" value={systemResult.solution} highlight />
            <StepsPanel steps={systemResult.steps} note={systemResult.degenerate} />
          </TabsContent>
        </Tabs>

        <Card className="border-dashed">
          <CardContent className="space-y-2 p-4 text-xs sm:text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">How this lab helps you</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Every step is explained like a board solution — great for exam practice.</li>
              <li>Science presets link equations to real contexts (Ohm&apos;s law, Newton&apos;s 2nd law, kinematics).</li>
              <li>Watch how Δ &gt; 0, Δ = 0, and Δ &lt; 0 change the set of roots.</li>
            </ul>
          </CardContent>
        </Card>
      </LabCard>
    </div>
  );
}