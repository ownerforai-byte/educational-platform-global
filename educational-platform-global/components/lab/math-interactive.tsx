"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ControlPanel } from "@/components/lab/control-group";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { useWebGLCanvas, WebGLFallback } from "@/components/lab/webgl-fallback";
import { isWebGLAvailable } from "@/lib/webgl";
import { FunctionSquare, Sigma, Table2, Infinity as InfinityIcon, Grid3x3, Columns3, Move3d } from "lucide-react";
import * as THREE from "three";

function Field({ id, label, hint, ...props }: { id: string; label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="rounded-md border border-border bg-background p-2">
      <Label htmlFor={id} className="text-xs font-semibold text-foreground">{label}</Label>
      {hint && <p className="mb-1 text-[10px] text-muted-foreground">{hint}</p>}
      <Input id={id} {...props} className="mt-1" />
    </div>
  );
}

function sanitizeMathExpr(expr: string): string {
  return expr
    .replace(/\^/g, "**")
    .replace(/sqrt/g, "Math.sqrt")
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/abs/g, "Math.abs")
    .replace(/exp/g, "Math.exp")
    .replace(/log/g, "Math.log")
    .replace(/pi/g, "Math.PI");
}

function safeCall(fn: (x: number) => unknown, x: number): number {
  try {
    const r = fn(x);
    return typeof r === "number" && Number.isFinite(r) ? r : NaN;
  } catch {
    return NaN;
  }
}

function evaluateZ(expr: string, x: number, y: number): number {
  try {
    const sanitized = sanitizeMathExpr(expr);
    const fn = new Function("x", "y", `"use strict"; return (${sanitized});`) as (x: number, y: number) => unknown;
    const result = fn(x, y);
    return typeof result === "number" && Number.isFinite(result) ? result : NaN;
  } catch {
    return NaN;
  }
}

function FunctionGraph({ fn, range, color = "#2563eb", tangentAt }: { fn: (x: number) => number; range: { min: number; max: number }; color?: string; tangentAt?: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (typeof fn !== "function") return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const padding = 40;
    const width = rect.width - padding * 2;
    const height = rect.height - padding * 2;

    // Sample the function over the visible x-window and DERIVE the y-window
    // from the data (no hardcoded vertical bounds — steep/shifted curves stay in view).
    let yMin = Infinity;
    let yMax = -Infinity;
    for (let px = 0; px <= width; px++) {
      const x = range.min + (px / width) * (range.max - range.min);
      const y = safeCall(fn, x);
      if (Number.isFinite(y)) {
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
      }
    }

    // Optional tangent line at x₀ — correct formula: y = f(x₀) + f′(x₀)·(x − x₀).
    // The segment participates in the y-window so it is always visible.
    let tangentInfo: { x0: number; y0: number; m: number } | null = null;
    if (tangentAt != null && Number.isFinite(tangentAt) && tangentAt >= range.min && tangentAt <= range.max) {
      const h = 1e-4;
      const x0 = tangentAt;
      const y0 = safeCall(fn, x0);
      const m = (safeCall(fn, x0 + h) - safeCall(fn, x0 - h)) / (2 * h); // numeric derivative = slope
      if (Number.isFinite(y0) && Number.isFinite(m)) {
        tangentInfo = { x0, y0, m };
        const tHalf = (range.max - range.min) * 0.25;
        for (const tx of [x0 - tHalf, x0 + tHalf]) {
          const ty = y0 + m * (tx - x0);
          if (Number.isFinite(ty)) {
            yMin = Math.min(yMin, ty);
            yMax = Math.max(yMax, ty);
          }
        }
      }
    }

    // Nothing drawable (e.g. invalid expression) → leave a blank grid.
    if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
      ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const gx = padding + (i / 10) * width;
        ctx.beginPath(); ctx.moveTo(gx, padding); ctx.lineTo(gx, rect.height - padding); ctx.stroke();
      }
      return;
    }

    let yPad = (yMax - yMin) * 0.12;
    if (yPad <= 0) yPad = Math.max(Math.abs(yMax), Math.abs(yMin), 1) * 0.5;
    yMin -= yPad;
    yMax += yPad;

    const toCanvasX = (x: number) => padding + ((x - range.min) / (range.max - range.min)) * width;
    const toCanvasY = (y: number) => rect.height - padding - ((y - yMin) / (yMax - yMin)) * height;

    // Grid
    ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const gx = padding + (i / 10) * width;
      ctx.beginPath(); ctx.moveTo(gx, padding); ctx.lineTo(gx, rect.height - padding); ctx.stroke();
      const gy = padding + (i / 10) * height;
      ctx.beginPath(); ctx.moveTo(padding, gy); ctx.lineTo(rect.width - padding, gy); ctx.stroke();
    }

    // Axes through the origin (drawn only when inside the visible window)
    ctx.strokeStyle = "#64748b"; ctx.lineWidth = 2;
    if (yMin < 0 && yMax > 0) {
      ctx.beginPath(); ctx.moveTo(padding, toCanvasY(0)); ctx.lineTo(rect.width - padding, toCanvasY(0)); ctx.stroke();
    }
    if (range.min < 0 && range.max > 0) {
      ctx.beginPath(); ctx.moveTo(toCanvasX(0), padding); ctx.lineTo(toCanvasX(0), rect.height - padding); ctx.stroke();
    }

    // Curve
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= width; px++) {
      const x = range.min + (px / width) * (range.max - range.min);
      const y = safeCall(fn, x);
      if (!Number.isFinite(y)) { started = false; continue; }
      const canvasY = toCanvasY(Math.max(yMin, Math.min(yMax, y)));
      if (!started) { ctx.moveTo(padding + px, canvasY); started = true; }
      else ctx.lineTo(padding + px, canvasY);
    }
    ctx.stroke();

    // Tangent line + contact point
    if (tangentInfo) {
      const { x0, y0, m } = tangentInfo;
      const tHalf = (range.max - range.min) * 0.25;
      const tx1 = x0 - tHalf;
      const tx2 = x0 + tHalf;
      ctx.strokeStyle = "#9333ea";
      ctx.lineWidth = 1.75;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(toCanvasX(tx1), toCanvasY(Math.max(yMin, Math.min(yMax, y0 + m * (tx1 - x0)))));
      ctx.lineTo(toCanvasX(tx2), toCanvasY(Math.max(yMin, Math.min(yMax, y0 + m * (tx2 - x0)))));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#9333ea";
      ctx.beginPath();
      ctx.arc(toCanvasX(x0), toCanvasY(y0), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "600 12px Inter, sans-serif";
      ctx.fillStyle = "#9333ea";
      ctx.fillText(`f′(${x0.toFixed(2)}) ≈ ${m.toFixed(3)}`, toCanvasX(x0) + 8, toCanvasY(y0) - 8);
    }

    // Axis labels
    ctx.font = "11px Inter, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(range.min.toFixed(1), padding - 10, rect.height - padding + 14);
    ctx.fillText(range.max.toFixed(1), rect.width - padding - 10, rect.height - padding + 14);
  }, [fn, range, color, tangentAt]);

  return <canvas ref={canvasRef} className="h-[300px] w-full" aria-label="Function graph" />;
}

function DerivativeIntegralSolver() {
  const [expr, setExpr] = useState("x^2");
  const [xValue, setXValue] = useState("");
  const [intFrom, setIntFrom] = useState("-10");
  const [intTo, setIntTo] = useState("10");
  const [derivative, setDerivative] = useState<string | null>(null);
  const [integral, setIntegral] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [graphFn, setGraphFn] = useState<(x: number) => number>((x) => x * x);

  // Sanitized parser so math functions like sin(x), sqrt(x), pi actually work
  // (previously only raw JavaScript expressions were valid).
  const parseExpr = (expr: string): ((x: number) => number) => {
    const sanitized = sanitizeMathExpr(expr);
    const fn = new Function("x", `"use strict"; return (${sanitized});`) as (x: number) => unknown;
    return (x: number) => safeCall(fn, x);
  };

  const compute = () => {
    setError(null); setDerivative(null); setIntegral(null);
    try {
      const fn = parseExpr(expr);
      // Validation probe — throws on syntactically invalid input before any state updates.
      safeCall(fn, 1);
      setGraphFn(() => fn);
      const h = 0.0001;
      const derivativeFn = (x: number) => (safeCall(fn, x + h) - safeCall(fn, x - h)) / (2 * h);
      const x = parseFloat(xValue);
      if (!isNaN(x)) {
        const slope = derivativeFn(x);
        setDerivative(Number.isFinite(slope)
          ? `f'(${x}) ≈ ${slope.toFixed(6)}  (slope of tangent at x = ${x})`
          : `f'(${x}) is undefined there`);
      } else {
        setDerivative(`f'(x) ≈ (f(x+h) − f(x−h)) / 2h — enter an x above to evaluate it`);
      }
      const a = parseFloat(intFrom), b = parseFloat(intTo);
      if (isNaN(a) || isNaN(b) || a === b) {
        setError("Enter two different integration bounds");
        return;
      }
      let sum = 0;
      let anyFinite = false;
      const n = 1000, dx = (b - a) / n;
      for (let i = 0; i < n; i++) {
        const v = safeCall(fn, a + i * dx);
        if (Number.isFinite(v)) { sum += v * dx; anyFinite = true; }
      }
      setIntegral(anyFinite
        ? `∫ from ${a} to ${b} ≈ ${sum.toFixed(4)}`
        : `∫ from ${a} to ${b}: f is not defined on this interval`);
    } catch {
      setError("Invalid expression. Use x as variable, e.g. x^2, sin(x), 2*x+1");
    }
  };

  // Live tangent point for the graph overlay (correct tangent drawn by FunctionGraph).
  const parsedX = parseFloat(xValue);
  const tangentAt = xValue.trim() !== "" && !isNaN(parsedX) ? parsedX : null;

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><FunctionSquare className="h-5 w-5 text-emerald-500" /> Derivative & Integral Solver</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "diff-expr",
              label: "Step 1 — Type your function",
              hint: "Use x as the variable. Examples: x^2, sin(x), 2*x+1",
              content: <Field id="expr" label="f(x)" hint="x^2 → derivative 2x, integral x³/3" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="e.g. x^2, sin(x)" />,
            },
            {
              id: "diff-xval",
              label: "Step 2 — Pick a point (optional)",
              hint: "Evaluate the instantaneous rate of change at this x.",
              content: <Field id="xval" label="Evaluate f′(x) at x" type="number" value={xValue} onChange={(e) => setXValue(e.target.value)} placeholder="e.g. 2" />,
            },
            {
              id: "diff-bounds",
              label: "Step 3 — Integration bounds",
              hint: "The numerical integral ∫ₐᵇ f(x)dx is computed over this interval.",
              content: (
                <div className="grid grid-cols-2 gap-2">
                  <Field id="int-from" label="From a" type="number" value={intFrom} onChange={(e) => setIntFrom(e.target.value)} />
                  <Field id="int-to" label="To b" type="number" value={intTo} onChange={(e) => setIntTo(e.target.value)} />
                </div>
              ),
            },
            {
              id: "diff-run",
              label: "Step 4 — Compute",
              hint: "Slope of tangent + net area under the curve. The dashed purple line on the graph is the tangent at your x.",
              content: <Button onClick={compute} className="w-full">Compute Derivative & Integral</Button>,
            },
          ]}
        />
        {error && <p className="rounded-md border border-red-400/40 bg-red-500/10 p-2 text-sm text-red-500">{error}</p>}
        {derivative && <p className="rounded-md border border-emerald-400/40 bg-emerald-500/10 p-2 text-sm font-medium text-emerald-600">{derivative}</p>}
        {integral && <p className="rounded-md border border-sky-400/40 bg-sky-500/10 p-2 text-sm font-medium text-sky-600">{integral}</p>}
        <FunctionGraph fn={graphFn} range={{ min: -10, max: 10 }} color="#22c55e" tangentAt={tangentAt} />
        <TheoryPanel
          title="Derivative & Integral — Theory & What to Notice"
          vocabulary="Derivative f′(x) = instantaneous rate of change (slope of the tangent line). Integral = net area between curve and x-axis (accumulation)."
          look="The green curve is f(x). The derivative tells you how steep the tangent is at each point — where the curve is flat (vertex) the derivative should be 0. The integral is the signed area − below the axis it counts negative."
          predict="For f(x) = x²: what do you predict f′(2) will be? Answer — 4. For f(x) = sin(x), the integral over [−π, π] should be ≈ 0 because crest and trough cancel."
          principle="The Fundamental Theorem of Calculus: differentiation and integration are inverse operations. ∫f′(x)dx = f(x) + C. The derivative measures the slope of the tangent; the integral measures net accumulation."
          why="Derivatives optimize — airlines use them to minimize fuel; engineers find max stress points. Integrals compute distance travelled from speed, work done from force, and even the centre of mass of a bridge."
        />
      </CardContent>
    </Card>
  );
}

function QuadraticSolver() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("0");
  const [c, setC] = useState("-4");
  const [result, setResult] = useState<string | null>(null);
  const [graphFn, setGraphFn] = useState<(x: number) => number>((x) => x * x - 4);

  const solve = () => {
    const av = parseFloat(a), bv = parseFloat(b), cv = parseFloat(c);
    if (isNaN(av) || av === 0) { setResult("Coefficient 'a' cannot be zero"); return; }
    const discriminant = bv * bv - 4 * av * cv;
    setResult("");
    if (discriminant > 0) {
      const x1 = (-bv + Math.sqrt(discriminant)) / (2 * av);
      const x2 = (-bv - Math.sqrt(discriminant)) / (2 * av);
      setResult(`Two real roots: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`);
    } else if (Math.abs(discriminant) < 1e-10) {
      setResult(`One real root: x = ${(-bv / (2 * av)).toFixed(4)}`);
    } else {
      const real = -bv / (2 * av);
      const imag = Math.sqrt(-discriminant) / (2 * av);
      setResult(`Complex roots: x = ${real.toFixed(4)} ± ${imag.toFixed(4)}i`);
    }
    setGraphFn(() => (x: number) => av * x * x + bv * x + cv);
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Sigma className="h-5 w-5 text-violet-500" /> Quadratic Equation Solver</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "quad-coeff-a",
              label: "Step 1 — x² coefficient (a)",
              hint: "Controls width & direction of the parabola.",
              content: <Field id="a" label="a (x² coefficient)" hint="a>0 → ∪ upward, a<0 → ∩ downward" type="number" value={a} onChange={(e) => setA(e.target.value)} />,
            },
            {
              id: "quad-coeff-bc",
              label: "Step 2 — x coefficient (b) and constant (c)",
              hint: "b shifts the vertex left/right; c is the y-intercept.",
              content: (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field id="b" label="b (x coefficient)" type="number" value={b} onChange={(e) => setB(e.target.value)} />
                  <Field id="c" label="c (constant)" hint="Where the parabola meets the y-axis" type="number" value={c} onChange={(e) => setC(e.target.value)} />
                </div>
              ),
            },
            {
              id: "quad-run",
              label: "Step 3 — Solve",
              content: <Button onClick={solve} className="w-full">Solve ax² + bx + c = 0</Button>,
            },
          ]}
        />
        {result && <p className="rounded-md border border-emerald-400/40 bg-emerald-500/10 p-2 text-sm font-medium text-emerald-600">{result}</p>}
        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Formula: x = (−b ± √(b²−4ac)) / 2a</p>
          <p>Discriminant D = b² − 4ac decides the root type.</p>
        </div>
        <TheoryPanel
          title="Quadratics — Theory & What to Notice"
          vocabulary="Root (zero) = where the parabola crosses the x-axis. Vertex = the turning point. Discriminant D = b²−4ac."
          look="The purple parabola is ax²+bx+c. When D > 0 it cuts the x-axis twice; D = 0 it just touches once at the vertex; D < 0 it never reaches the x-axis (roots are complex)."
          predict="Before clicking Solve: for a = 1, b = 0, c = −4, predict the roots. They should be x = 2 and x = −2 because (x−2)(x+2)=x²−4. Rotate the c value to +1 and predict whether roots stay real."
          principle="D>0 two real roots, D=0 one repeated root, D<0 two complex conjugate roots. The axis of symmetry is always x = −b/2a — the vertex lies exactly halfway between the roots."
          why="Ballistics: the height of a thrown ball is h(t) = −½gt² + v₀t + h₀. Solving the quadratic gives when the ball hits the ground. Economists model profit of an item as a quadratic to find the price that maximizes profit."
        />
        <FunctionGraph fn={graphFn} range={{ min: -10, max: 10 }} color="#a855f7" />
      </CardContent>
    </Card>
  );
}

function StatisticsCalculator() {
  const [values, setValues] = useState("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
  const [stats, setStats] = useState<{ mean: number; median: number; mode: number[]; stdDev: number; min: number; max: number; count: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const nums = values.split(",").map(Number).filter((n) => !isNaN(n));
    if (nums.length === 0) { setError("Enter valid comma-separated numbers"); return; }
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const median = nums.length % 2 === 0 ? (sorted[nums.length / 2 - 1] + sorted[nums.length / 2]) / 2 : sorted[Math.floor(nums.length / 2)];
    const freq: Record<number, number> = {};
    nums.forEach((n) => { freq[n] = (freq[n] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const mode = Object.keys(freq).filter((k) => freq[Number(k)] === maxFreq).map(Number);
    const variance = nums.reduce((s, n) => s + Math.pow(n - mean, 2), 0) / nums.length;
    setStats({ mean, median, mode, stdDev: Math.sqrt(variance), min: sorted[0], max: sorted[sorted.length - 1], count: nums.length });
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Table2 className="h-5 w-5 text-orange-500" /> Statistics Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "stats-input",
              label: "Step 1 — Enter your data",
              hint: "Comma-separated numbers, e.g. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
              content: <Field id="values" label="Data values (comma-separated)" value={values} onChange={(e) => setValues(e.target.value)} placeholder="e.g. 1, 2, 3, 4, 5" />,
            },
            {
              id: "stats-run",
              label: "Step 2 — Compute",
              content: <Button onClick={calculate} className="w-full">Calculate Statistics</Button>,
            },
          ]}
        />
        {error && <p className="rounded-md border border-red-400/40 bg-red-500/10 p-2 text-sm text-red-500">{error}</p>}
        {stats && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-center"><p className="text-xs text-muted-foreground">Count</p><p className="text-lg font-semibold">{stats.count}</p></div>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-center"><p className="text-xs text-muted-foreground">Mean</p><p className="text-lg font-semibold">{stats.mean.toFixed(4)}</p></div>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-center"><p className="text-xs text-muted-foreground">Median</p><p className="text-lg font-semibold">{stats.median.toFixed(4)}</p></div>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-center"><p className="text-xs text-muted-foreground">Mode</p><p className="text-lg font-semibold">{stats.mode.join(", ")}</p></div>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-center"><p className="text-xs text-muted-foreground">Std Dev</p><p className="text-lg font-semibold">{stats.stdDev.toFixed(4)}</p></div>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-center"><p className="text-xs text-muted-foreground">Min / Max</p><p className="text-lg font-semibold">{stats.min} / {stats.max}</p></div>
          </div>
        )}
        <TheoryPanel
          title="Statistics — Theory & What to Notice"
          vocabulary="Mean = arithmetic average. Median = middle value when sorted. Mode = most frequent value. Standard deviation (σ) = how spread about the mean the data is."
          look="Add an extreme outlier (say append 1000) and recalculate: the mean jumps but the median barely moves. That's why median is called 'robust to outliers'. Std dev shows how much the data clusters around the mean."
          predict="For the data 1–10, predict: mean? (=5.5) — median? (=5.5) — mode? (no repeats, each number has equal frequency). Now change one value in this check against predictions."
          principle="Mean = Σx/n. Median = middle when sorted. Variance = Σ(x−mean)²/n = the average squared distance from the mean. Std dev = √variance. The 68-95-99.7 rule: for bell-shaped data, ~68% of points lie within ±1σ of the mean."
          why="Polling margin-of-error, manufacturing tolerances, financial risk metrics like volatility, and lab error analysis all rely on standard deviation / mean. Quality control: small σ = consistent production."
        />
      </CardContent>
    </Card>
  );
}

function MatrixOperations() {
  const [matrixA, setMatrixA] = useState("1,2,3\n4,5,6\n7,8,9");
  const [matrixB, setMatrixB] = useState("9,8,7\n6,5,4\n3,2,1");
  const [operation, setOperation] = useState<"add" | "multiply" | "transpose">("add");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseMatrix = (input: string): number[][] => input.trim().split("\n").map((row) => row.split(",").map(Number));
  const formatMatrix = (matrix: number[][]): string => matrix.map((row) => row.join("\t")).join("\n");

  const calculate = () => {
    setError(null); setResult(null);
    try {
      const a = parseMatrix(matrixA);
      const b = parseMatrix(matrixB);
      if (operation === "add") {
        if (a.length !== b.length || a[0].length !== b[0].length) throw new Error("Matrices must have same dimensions for addition");
        setResult(formatMatrix(a.map((row, i) => row.map((val, j) => val + b[i][j]))));
      } else if (operation === "multiply") {
        if (a[0].length !== b.length) throw new Error("Columns of A must equal rows of B for multiplication");
        const product = a.map((rowA) => b[0].map((_, j) => rowA.reduce((sum, val, k) => sum + val * b[k][j], 0)));
        setResult(formatMatrix(product.map((row) => row.map((val) => Number(val.toFixed(4))))));
      } else {
        setResult(formatMatrix(a[0].map((_, j) => a.map((row) => row[j]))));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Matrix operation error");
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Grid3x3 className="h-5 w-5 text-rose-500" /> Matrix Operations</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "mat-op",
              label: "Step 1 — Choose the operation",
              hint: "Add, multiply, or transpose.",
              content: (
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background p-2">
                  <Label className="text-xs">Operation:</Label>
                  <Select value={operation} onValueChange={(v) => setOperation(v as typeof operation)}>
                    <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add (A + B)</SelectItem>
                      <SelectItem value="multiply">Multiply (A × B)</SelectItem>
                      <SelectItem value="transpose">Transpose (Aᵀ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ),
            },
            {
              id: "mat-a",
              label: "Step 2 — Enter Matrix A",
              hint: "Each row on its own line; numbers separated by commas.",
              content: (
                <div className="rounded-md border border-border bg-background p-2">
                  <Label htmlFor="matrixA" className="text-xs font-semibold">Matrix A (rows: comma, cols: newline)</Label>
                  <textarea id="matrixA" value={matrixA} onChange={(e) => setMatrixA(e.target.value)} rows={5} className="mt-1 w-full rounded-md border border-border bg-background p-2 text-sm font-mono" />
                </div>
              ),
            },
            {
              id: "mat-b",
              label: "Step 3 — Enter Matrix B",
              hint: "Only needed for add / multiply.",
              content: (
                <div className="rounded-md border border-border bg-background p-2">
                  <Label htmlFor="matrixB" className="text-xs font-semibold">Matrix B</Label>
                  <textarea id="matrixB" value={matrixB} onChange={(e) => setMatrixB(e.target.value)} rows={5} className="mt-1 w-full rounded-md border border-border bg-background p-2 text-sm font-mono" />
                </div>
              ),
            },
            {
              id: "mat-run",
              label: "Step 4 — Calculate",
              content: <Button onClick={calculate} className="w-full">Calculate</Button>,
            },
          ]}
        />
        {error && <p className="rounded-md border border-red-400/40 bg-red-500/10 p-2 text-sm text-red-500">{error}</p>}
        {result && (
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="mb-1 text-xs text-muted-foreground">Result:</p>
            <pre className="text-sm font-mono whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        <TheoryPanel
          title="Matrices — Theory & What to Notice"
          vocabulary="Matrix = a rectangular grid of numbers. Row × column dimension (e.g. 3×3). Transpose flips rows into columns (Aᵀ)."
          look="Addition is element-by-element — same grid size only. Multiplication uses row × column dot products — number of columns of A must equal rows of B. Transpose flips the grid on the diagonal."
          predict="Predict: is A×B ever equal to B×A? Usually no — matrix multiplication is NOT commutative. Try to prove it with the tool by swapping A and B and comparing results."
          principle="Matrix multiplication (AB)ᵢⱼ = Σₖ AᵢₖBₖⱼ. Multiplying a vector by a matrix rotates/stretches it — the heart of 3D graphics, robotics kinematics, and Markov chain calculations."
          why="Graphics engines apply matrices every frame to rotate and scale 3D models. Systems of equations collapse to AX = B. Markov chains model page-rank with repeated matrix multiplication."
        />
      </CardContent>
    </Card>
  );
}

function Plotter3D() {
  const [expr, setExpr] = useState("sin(sqrt(x^2+y^2))");
  const [range, setRange] = useState("5");
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
        if (cancelled || !containerRef.current) return;
        if (!isWebGLAvailable()) return;
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a);
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 8, 12);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const dir = new THREE.DirectionalLight(0xffffff, 1.2);
        dir.position.set(10, 20, 15);
        scene.add(dir);
        scene.add(new THREE.GridHelper(20, 40, 0x334155, 0x1e293b));
        const group = new THREE.Group();
        scene.add(group);

        const createSurface = () => {
          while (group.children.length > 0) {
            const child = group.children[0];
            group.remove(child);
            if (child instanceof THREE.Mesh) { child.geometry?.dispose(); (child.material as THREE.Material).dispose(); }
          }
          const size = parseFloat(range) || 5;
          const geometry = new THREE.PlaneGeometry(size * 2, size * 2, 80, 80);
          const positions = geometry.attributes.position as THREE.BufferAttribute;
          const colors: number[] = [];
          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = evaluateZ(expr, x, y);
            positions.setZ(i, Number.isFinite(z) ? z : 0);
            const intensity = Number.isFinite(z) ? Math.max(0, Math.min(1, (z + size) / (2 * size))) : 0;
            colors.push(0.1 + intensity * 0.6, 0.2 + intensity * 0.7, 0.3 + intensity * 0.5);
          }
          geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
          geometry.computeVertexNormals();
          const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.25, metalness: 0.35, side: THREE.DoubleSide }));
          mesh.rotation.x = -Math.PI / 2;
          group.add(mesh);
        };

        createSurface();

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        const handleResize = () => {
          if (!container || cancelled) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        };
      } catch { /* 3D not available */ }
    }
    const loadPromise = load();
    return () => {
      cancelled = true;
      loadPromise.then((dispose) => dispose?.());
    };
  }, [expr, range]);

  return (
    <div className="space-y-3">
      {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" aria-label="3D function plotter" />}
      <ControlPanel
        groups={[
          {
            id: "plot-expr",
            label: "Step 1 — Define z = f(x, y)",
            hint: "Try sin(sqrt(x^2+y^2)) for ripples, x^2+y^2 for a bowl.",
            content: (
              <div className="rounded-md border border-border bg-background p-2">
                <Label className="text-xs font-semibold">f(x, y):</Label>
                <Input value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="e.g. sin(sqrt(x^2+y^2))" className="mt-1" />
              </div>
            ),
          },
          {
            id: "plot-range",
            label: "Step 2 — Set the size of the region",
            hint: "Range controls how wide the surface spans on x and y.",
            content: <Field id="range" label="Range (units)" type="number" value={range} onChange={(e) => setRange(e.target.value)} />,
          },
        ]}
      />
      <p className="text-xs text-muted-foreground">3D surface plot. Supports: +, −, ×, ÷, ^, sin, cos, tan, sqrt, abs, exp, log, pi, e. Drag to rotate, scroll to zoom. The tall peaks are shown in bright colors, valleys in dark blues.</p>
    </div>
  );
}

function LimitCalculator() {
  const [expr, setExpr] = useState("sin(x)/x");
  const [approach, setApproach] = useState("0");
  const [result, setResult] = useState<string | null>(null);

  const compute = () => {
    try {
      const sanitized = expr.replace(/\^/g, "**").replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan").replace(/sqrt/g, "Math.sqrt").replace(/abs/g, "Math.abs").replace(/exp/g, "Math.exp").replace(/log/g, "Math.log").replace(/pi/g, "Math.PI").replace(/e(?![a-z])/g, "Math.E");
      const fn = new Function("x", `return ${sanitized};`);
      const a = parseFloat(approach);
      if (isNaN(a)) throw new Error("Enter a valid approach value");
      const hValues = [1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8];
      const values = hValues.map((h) => {
        const left = fn(a - h), right = fn(a + h);
        return { h, left: Number.isFinite(left) ? left : NaN, right: Number.isFinite(right) ? right : NaN };
      });
      const last = values[values.length - 1];
      if (isNaN(last.left) || isNaN(last.right)) throw new Error("Function undefined at this point");
      const diff = Math.abs(last.left - last.right);
      const limitEstimate = (last.left + last.right) / 2;
      setResult(`Limit as x → ${a} ≈ ${limitEstimate.toFixed(6)}\nLeft limit: ${last.left.toFixed(6)}\nRight limit: ${last.right.toFixed(6)}\nDifference: ${diff.toFixed(8)}`);
    } catch { setResult("Error computing limit. Check expression."); }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><InfinityIcon className="h-5 w-5 text-yellow-500" /> Limit Calculator</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "limit-expr",
              label: "Step 1 — Enter f(x)",
              hint: "Classic example: sin(x)/x as x → 0 (limit is 1).",
              content: <Field id="expr" label="f(x)" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="e.g. sin(x)/x" />,
            },
            {
              id: "limit-approach",
              label: "Step 2 — Approach value",
              hint: "What x is tending toward.",
              content: <Field id="approach" label="Approach x →" value={approach} onChange={(e) => setApproach(e.target.value)} placeholder="e.g. 0" />,
            },
            {
              id: "limit-run",
              label: "Step 3 — Compute",
              content: <Button onClick={compute} className="w-full">Compute Limit</Button>,
            },
          ]}
        />
        {result && <pre className="rounded-md border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm font-medium whitespace-pre-wrap text-emerald-600">{result}</pre>}
        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Numerical Limit Estimation</p>
          <p>Uses symmetric difference: lim f(x) ≈ (f(a−h) + f(a+h)) / 2 as h → 0</p>
        </div>
        <TheoryPanel
          title="Limits — Theory & What to Notice"
          vocabulary="Limit L = the value f(x) gets arbitrarily close to as x approaches a. Left/right limits are the values from each side."
          look="As h shrinks (1e-1 → 1e-8), the left and right estimates should converge onto the same number. When the 'Difference' column vanishes, the limit exists. If the two sides never agree, the limit does not exist."
          predict="For sin(x)/x at x=0, direct substitution 0/0 fails — but the symmetric difference should home in on 1.0. For 1/x at x=0, left → −∞ and right → +∞ so no limit exists. Try both."
          principle="A limit exists only if left and right limits are EQUAL. Limits build derivatives (lim h→0 (f(x+h)−f(x))/h) and integrals — they give calculus its continuity. L'Hôpital's rule handles 0/0-style limits by comparing derivatives of top and bottom."
          why="Engineers use limits to compute instantaneous velocity and acceleration; scientists use them to calculate rates of chemical reactions at specific instants; economists use them for marginal costs and elasticity at exact points."
        />
      </CardContent>
    </Card>
  );
}

function SystemSolver() {
  const [mode, setMode] = useState<"2x2" | "3x3">("2x2");
  const [a1, setA1] = useState("2"); const [b1, setB1] = useState("3"); const [c1, setC1] = useState("8"); const [d1, setD1] = useState("6");
  const [a2, setA2] = useState("1"); const [b2, setB2] = useState("2"); const [c2, setC2] = useState("5"); const [d2, setD2] = useState("7");
  const [a3, setA3] = useState("1"); const [b3, setB3] = useState("1"); const [c3, setC3] = useState("3"); const [d3, setD3] = useState("4");
  const [result, setResult] = useState<string | null>(null);

  const solve2x2 = () => {
    const A = parseFloat(a1), B = parseFloat(b1), C = parseFloat(c1);
    const D = parseFloat(a2), E = parseFloat(b2), F = parseFloat(c2);
    if ([A, B, C, D, E, F].some(isNaN)) { setResult("Enter all coefficients"); return; }
    const det = A * E - B * D;
    if (Math.abs(det) < 1e-10) { setResult("No unique solution (determinant ≈ 0)"); return; }
    setResult(`x = ${((C * E - B * F) / det).toFixed(6)}\ny = ${((A * F - C * D) / det).toFixed(6)}`);
  };

  const solve3x3 = () => {
    const a = parseFloat(a1), b = parseFloat(b1), c = parseFloat(c1), d = parseFloat(d1);
    const e = parseFloat(a2), f = parseFloat(b2), g = parseFloat(c2), h = parseFloat(d2);
    const i = parseFloat(a3), j = parseFloat(b3), k = parseFloat(c3), l = parseFloat(d3);
    if ([a, b, c, d, e, f, g, h, i, j, k, l].some(isNaN)) { setResult("Enter all coefficients"); return; }
    const det = a * (f * k - g * j) - b * (e * k - g * i) + c * (e * j - f * i);
    if (Math.abs(det) < 1e-10) { setResult("No unique solution (determinant ≈ 0)"); return; }
    const x = (d * (f * k - g * j) - b * (h * k - g * l) + c * (h * j - f * l)) / det;
    const y = (a * (h * k - g * l) - d * (e * k - g * i) + c * (e * l - h * i)) / det;
    const z = (a * (f * l - h * j) - b * (e * l - h * i) + d * (e * j - f * i)) / det;
    setResult(`x = ${x.toFixed(6)}\ny = ${y.toFixed(6)}\nz = ${z.toFixed(6)}`);
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Columns3 className="h-5 w-5 text-blue-500" /> System of Equations Solver</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "sys-size",
              label: "Step 1 — Choose system size",
              hint: "2×2 (two lines) or 3×3 (three planes).",
              content: (
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background p-2">
                  <Label className="text-xs">Size:</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2x2">2 × 2</SelectItem>
                      <SelectItem value="3x3">3 × 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ),
            },
            {
              id: "sys-inputs",
              label: "Step 2 — Enter coefficients",
              hint: "a₁x + b₁y = c₁ (2×2) or a₁x + b₁y + c₁z = d₁ (3×3).",
              content: (
                <div className="rounded-md border border-border bg-background p-2">
                  {mode === "2x2" ? (
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Eq 1: a₁x + b₁y = c₁</p>
                      <div className="grid grid-cols-3 gap-2">
                        <Input value={a1} onChange={(e) => setA1(e.target.value)} placeholder="a₁" />
                        <Input value={b1} onChange={(e) => setB1(e.target.value)} placeholder="b₁" />
                        <Input value={c1} onChange={(e) => setC1(e.target.value)} placeholder="c₁" />
                      </div>
                      <p className="text-xs font-medium">Eq 2: a₂x + b₂y = c₂</p>
                      <div className="grid grid-cols-3 gap-2">
                        <Input value={a2} onChange={(e) => setA2(e.target.value)} placeholder="a₂" />
                        <Input value={b2} onChange={(e) => setB2(e.target.value)} placeholder="b₂" />
                        <Input value={c2} onChange={(e) => setC2(e.target.value)} placeholder="c₂" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Eq 1: a₁x + b₁y + c₁z = d₁</p>
                      <div className="grid grid-cols-4 gap-2">
                        <Input value={a1} onChange={(e) => setA1(e.target.value)} placeholder="a₁" />
                        <Input value={b1} onChange={(e) => setB1(e.target.value)} placeholder="b₁" />
                        <Input value={c1} onChange={(e) => setC1(e.target.value)} placeholder="c₁" />
                        <Input value={d1} onChange={(e) => setD1(e.target.value)} placeholder="d₁" />
                      </div>
                      <p className="text-xs font-medium">Eq 2: a₂x + b₂y + c₂z = d₂</p>
                      <div className="grid grid-cols-4 gap-2">
                        <Input value={a2} onChange={(e) => setA2(e.target.value)} placeholder="a₂" />
                        <Input value={b2} onChange={(e) => setB2(e.target.value)} placeholder="b₂" />
                        <Input value={c2} onChange={(e) => setC2(e.target.value)} placeholder="c₂" />
                        <Input value={d2} onChange={(e) => setD2(e.target.value)} placeholder="d₂" />
                      </div>
                      <p className="text-xs font-medium">Eq 3: a₃x + b₃y + c₃z = d₃</p>
                      <div className="grid grid-cols-4 gap-2">
                        <Input value={a3} onChange={(e) => setA3(e.target.value)} placeholder="a₃" />
                        <Input value={b3} onChange={(e) => setB3(e.target.value)} placeholder="b₃" />
                        <Input value={c3} onChange={(e) => setC3(e.target.value)} placeholder="c₃" />
                        <Input value={d3} onChange={(e) => setD3(e.target.value)} placeholder="d₃" />
                      </div>
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: "sys-run",
              label: "Step 3 — Solve",
              content: <Button onClick={mode === "2x2" ? solve2x2 : solve3x3} className="w-full">Solve System</Button>,
            },
          ]}
        />
        {result && <pre className="rounded-md border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm font-medium whitespace-pre-wrap text-emerald-600">{result}</pre>}
        <TheoryPanel
          title="Systems — Theory & What to Notice"
          vocabulary="Linear equation in 2D = a straight line; in 3D = a plane. Determinant = a scale factor; a zero determinant means a flat/degenerate system."
          look="The solution to a 2×2 system is the intersection point of two lines. A zero determinant → the lines are parallel (no intersection) or exactly the same (infinite solutions). A 3×3 solution is the shared point of three planes."
          predict="Two parallel lines (same slopes and different intercepts) will report 'No unique solution'. Two lines with different slopes will always share exactly one point — that's the unique solution."
          principle="Cramer's rule: x = det(Aₓ)/det(A), y = det(Aᵧ)/det(A). Whenever det(A) = 0, the inverse matrix doesn't exist and the system is singular — encoding why normal equations can't be solved uniquely."
          why="Electric circuits (Kirchhoff's laws), supply-and-demand equilibrium, chemical reaction balance, and even 3D graphics projections all reduce to solving systems of linear equations."
        />
      </CardContent>
    </Card>
  );
}

function VectorOperations() {
  const [mode, setMode] = useState<"add" | "dot" | "cross">("add");
  const [x1, setX1] = useState("3"); const [y1, setY1] = useState("4"); const [z1, setZ1] = useState("0");
  const [x2, setX2] = useState("1"); const [y2, setY2] = useState("2"); const [z2, setZ2] = useState("3");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const A = [parseFloat(x1), parseFloat(y1), parseFloat(z1)];
    const B = [parseFloat(x2), parseFloat(y2), parseFloat(z2)];
    if (A.some(isNaN) || B.some(isNaN)) { setResult("Enter all components"); return; }
    if (mode === "add") {
      const sum = A.map((a, i) => a + B[i]);
      setResult(`A + B = (${sum[0].toFixed(2)}, ${sum[1].toFixed(2)}, ${sum[2].toFixed(2)})`);
    } else if (mode === "dot") {
      const dot = A[0]*B[0] + A[1]*B[1] + A[2]*B[2];
      const magA = Math.sqrt(A[0]**2 + A[1]**2 + A[2]**2);
      const magB = Math.sqrt(B[0]**2 + B[1]**2 + B[2]**2);
      const angle = Math.acos(Math.max(-1, Math.min(1, dot / (magA * magB)))) * 180 / Math.PI;
      setResult(`A · B = ${dot.toFixed(4)}\n|A| = ${magA.toFixed(4)}\n|B| = ${magB.toFixed(4)}\nAngle = ${angle.toFixed(2)}°`);
    } else {
      const cross = [A[1]*B[2] - A[2]*B[1], A[2]*B[0] - A[0]*B[2], A[0]*B[1] - A[1]*B[0]];
      setResult(`A × B = (${cross[0].toFixed(2)}, ${cross[1].toFixed(2)}, ${cross[2].toFixed(2)})`);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Move3d className="h-5 w-5 text-cyan-500" /> Vector Operations</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ControlPanel
          groups={[
            {
              id: "vec-op",
              label: "Step 1 — Which operation?",
              hint: "Add (combine), dot (alignment), cross (perpendicular).",
              content: (
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background p-2">
                  <Label className="text-xs">Operation:</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                    <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Addition (A + B)</SelectItem>
                      <SelectItem value="dot">Dot Product (A · B)</SelectItem>
                      <SelectItem value="cross">Cross Product (A × B)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ),
            },
            {
              id: "vec-a",
              label: "Step 2 — Vector A components",
              content: (
                <div className="grid grid-cols-3 gap-2 rounded-md border border-border bg-background p-2">
                  <Field id="x1" label="Aₓ" type="number" value={x1} onChange={(e) => setX1(e.target.value)} />
                  <Field id="y1" label="Aᵧ" type="number" value={y1} onChange={(e) => setY1(e.target.value)} />
                  <Field id="z1" label="A_z" type="number" value={z1} onChange={(e) => setZ1(e.target.value)} />
                </div>
              ),
            },
            {
              id: "vec-b",
              label: "Step 3 — Vector B components",
              content: (
                <div className="grid grid-cols-3 gap-2 rounded-md border border-border bg-background p-2">
                  <Field id="x2" label="Bₓ" type="number" value={x2} onChange={(e) => setX2(e.target.value)} />
                  <Field id="y2" label="Bᵧ" type="number" value={y2} onChange={(e) => setY2(e.target.value)} />
                  <Field id="z2" label="B_z" type="number" value={z2} onChange={(e) => setZ2(e.target.value)} />
                </div>
              ),
            },
            {
              id: "vec-run",
              label: "Step 4 — Calculate",
              content: <Button onClick={calculate} className="w-full">Calculate</Button>,
            },
          ]}
        />
        {result && <pre className="rounded-md border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm font-medium whitespace-pre-wrap text-emerald-600">{result}</pre>}
        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Vector Formulas:</p>
          <p>A + B = (Aₓ+Bₓ, Aᵧ+Bᵧ, A_z+B_z) | A · B = AₓBₓ + AᵧBᵧ + A_zB_z | A × B = (AᵧB_z−A_zBᵧ, A_zBₓ−AₓB_z, AₓBᵧ−AᵧBₓ)</p>
        </div>
        <TheoryPanel
          title="Vectors — Theory & What to Notice"
          vocabulary="Vector = quantity with both magnitude and direction. Dot product A·B = |A||B|cosθ. Cross product magnitude = |A||B|sinθ — the area of the parallelogram they form."
          look="Try A = (1, 0, 0) and B = (0, 1, 0): dot = 0 (they are perpendicular), cross = (0, 0, 1) pointing along the z-axis — the direction that pocket right-hand rule says is 'out of the page'."
          predict="Before clicking: what is the dot product between A=(3,4,0) and B=(1,2,3)? Then check the angle — near 47° since cosine ≈ 0.68."
          principle="A·B = 0 means the vectors are perpendicular. The cross product is perpendicular to both original vectors (via right-hand rule) and its magnitude gives the area of the parallelogram. A·A = |A|²."
          why="Work W = F·d uses the dot product; torque τ = r×F uses the cross product; the normal vector needed to paint 3D polygons comes straight from a cross product of two edge vectors."
        />
      </CardContent>
    </Card>
  );
}

export interface MathInteractiveProps {
  defaultTab?: string;
}

export function MathInteractive({ defaultTab = "derivative" }: MathInteractiveProps = {}) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="derivative">Derivative & Integral</TabsTrigger>
        <TabsTrigger value="quadratic">Quadratic Solver</TabsTrigger>
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
        <TabsTrigger value="matrix">Matrix Ops</TabsTrigger>
        <TabsTrigger value="plotter3d">3D Plotter</TabsTrigger>
        <TabsTrigger value="limit">Limit</TabsTrigger>
        <TabsTrigger value="system">System Solver</TabsTrigger>
        <TabsTrigger value="vectors">Vectors</TabsTrigger>
      </TabsList>
      <TabsContent value="derivative" className="mt-4"><DerivativeIntegralSolver /></TabsContent>
      <TabsContent value="quadratic" className="mt-4"><QuadraticSolver /></TabsContent>
      <TabsContent value="statistics" className="mt-4"><StatisticsCalculator /></TabsContent>
      <TabsContent value="matrix" className="mt-4"><MatrixOperations /></TabsContent>
      <TabsContent value="plotter3d" className="mt-4"><Plotter3D /></TabsContent>
      <TabsContent value="limit" className="mt-4"><LimitCalculator /></TabsContent>
      <TabsContent value="system" className="mt-4"><SystemSolver /></TabsContent>
      <TabsContent value="vectors" className="mt-4"><VectorOperations /></TabsContent>
    </Tabs>
  );
}