/**
 * Additional-Question Visuals
 * Interactive SVG visuals that accompany the "Extra Hard Questions" cards
 * for each Class 11 mathematics topic panel. All coordinate plots use the
 * shared <Schematic> frame (grid, arrowed axes, ticks, legend).
 *
 * Exported components:
 *  - MatricesDetAdditionalVisual
 *  - QuadraticAdditionalVisual
 *  - AnalyticGeomAdditionalVisual
 *  - LimitsAdditionalVisual
 *  - DerivativesAdditionalVisual
 */

"use client";

import { useState } from "react";
import { Schematic } from "./schematic-frame";

/* ================================================================
   Shared helpers
   ================================================================ */

function Slider({
  label, value, min, max, step = 1, onChange, display,
}: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; display?: string;
}) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground w-8">{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1"
      />
      <span className="font-mono w-10 text-right">{display ?? value.toFixed(2)}</span>
    </label>
  );
}

function VisCard({ title, children, color = "orange" }: {
  title: string; children: React.ReactNode; color?: "orange" | "green" | "blue" | "purple" | "red";
}) {
  const border = {
    orange: "border-orange-300 dark:border-orange-800 bg-orange-50/40 dark:bg-orange-950/20",
    green:  "border-green-300  dark:border-green-800  bg-green-50/40  dark:bg-green-950/20",
    blue:   "border-blue-300   dark:border-blue-800   bg-blue-50/40   dark:bg-blue-950/20",
    purple: "border-purple-300 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20",
    red:    "border-red-300    dark:border-red-800    bg-red-50/40    dark:bg-red-950/20",
  }[color];
  const heading = {
    orange: "text-orange-600 dark:text-orange-400",
    green:  "text-green-600  dark:text-green-400",
    blue:   "text-blue-600   dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    red:    "text-red-600    dark:text-red-400",
  }[color];
  return (
    <div className={`rounded-lg border p-3 space-y-2 ${border}`}>
      <p className={`text-xs font-semibold ${heading}`}>{title}</p>
      {children}
    </div>
  );
}

/* ================================================================
   1. MATRICES & DETERMINANTS
   ================================================================ */

export function MatricesDetAdditionalVisual() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);
  const det = a * d - b * c;

  const w = 280, h = 200, ox = w / 2, oy = h / 2, sc = 40;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy - v * sc;

  // Parallelogram columns: col1 = (a, c), col2 = (b, d)
  const p1 = { x: X(a), y: Y(c) };
  const p2 = { x: X(b), y: Y(d) };
  const p3 = { x: X(a + b), y: Y(c + d) };
  const origin = { x: X(0), y: Y(0) };

  const [showABInverse, setShowABInverse] = useState(false);

  return (
    <div className="space-y-3">
      <VisCard title="Q1 · Determinant as Parallelogram Area  (det(2A) = 2² · det(A))" color="orange">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Slider label="a" value={a} min={-3} max={3} step={0.5} onChange={setA} />
            <Slider label="b" value={b} min={-3} max={3} step={0.5} onChange={setB} />
            <Slider label="c" value={c} min={-3} max={3} step={0.5} onChange={setC} />
            <Slider label="d" value={d} min={-3} max={3} step={0.5} onChange={setD} />
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
              <div>det(A) = {det.toFixed(2)}</div>
              <div>det(2A) = 4 · {det.toFixed(2)} = <strong>{(4 * det).toFixed(2)}</strong></div>
              <div>det(A⁻¹) = 1/{det.toFixed(2)} = <strong>{det !== 0 ? (1 / det).toFixed(3) : "∞"}</strong></div>
            </div>
            <Schematic
              w={w} h={h} ox={ox} oy={oy} scale={sc}
              tickStep={1}
              legend={[
                { color: "#f97316", label: "area of A = |det(A)|" },
                { color: "#38bdf8", label: "2A (4× area)", dashed: true },
              ]}
            >
              <polygon
                points={`${origin.x},${origin.y} ${p1.x},${p1.y} ${p3.x},${p3.y} ${p2.x},${p2.y}`}
                fill="#f97316" opacity="0.25" stroke="#f97316" strokeWidth="1.5"
              />
              <polygon
                points={`${origin.x},${origin.y} ${X(2 * a)},${Y(2 * c)} ${X(2 * (a + b))},${Y(2 * (c + d))} ${X(2 * b)},${Y(2 * d)}`}
                fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8"
              />
              <circle cx={origin.x} cy={origin.y} r={3} fill="#fbbf24" />
              <text x={origin.x + 6} y={origin.y + 12} fill="#f97316" fontSize="8">|A|</text>
            </Schematic>
          </div>
        </div>
      </VisCard>

      <VisCard title="Q3 · (AB)⁻¹ = B⁻¹A⁻¹  (Verify with A=[[1,2],[3,4]], B=[[0,1],[1,0]])" color="blue">
        <button
          onClick={() => setShowABInverse(!showABInverse)}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 underline cursor-pointer"
        >
          {showABInverse ? "Hide" : "Show"} worked values
        </button>
        {showABInverse && (
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-muted/30 p-2 rounded">
              <p className="text-muted-foreground mb-1">AB</p>
              <p>[2, 1]<br />[4, 2]</p>
            </div>
            <div className="bg-muted/30 p-2 rounded">
              <p className="text-muted-foreground mb-1">(AB)⁻¹</p>
              <p>[−1/4, 1/2]<br />[3/4, −1/4]</p>
            </div>
            <div className="bg-muted/30 p-2 rounded">
              <p className="text-muted-foreground mb-1">B⁻¹A⁻¹</p>
              <p>[−1/4, 1/2]<br />[3/4, −1/4]</p>
              <p className="text-green-500 mt-1">✓ Equal</p>
            </div>
          </div>
        )}
      </VisCard>

      <VisCard title="Q4 · Counter-Example: det(A+B) ≠ det(A)+det(B)" color="red">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <p className="text-muted-foreground">A = I₂, B = I₂</p>
            <p>det(A+B) = det(2I) = <strong className="text-red-500">4</strong></p>
            <p>det(A)+det(B) = 1+1 = <strong className="text-red-500">2</strong></p>
          </div>
          <div>
            <div className="font-mono text-sm p-2 bg-slate-800 rounded text-center">4 ≠ 2 ✗</div>
          </div>
        </div>
      </VisCard>
    </div>
  );
}

/* ================================================================
   2. QUADRATIC EQUATION
   ================================================================ */

export function QuadraticAdditionalVisual() {
  const [k, setK] = useState(0.5);
  const D1 = 9 - 4 * k;
  const root1 = k !== 0 ? (3 + Math.sqrt(Math.abs(D1))) / (2 * k) : 0;
  const root2 = k !== 0 ? (3 - Math.sqrt(Math.abs(D1))) / (2 * k) : 0;

  // Q3: Biquadratic x⁴ - 5x² + 4
  const [showBiquad, setShowBiquad] = useState(true);
  const w2 = 320, h2 = 200, ox2 = w2 / 2, oy2 = h2 / 2, sc2 = 35;
  const X2 = (u: number) => ox2 + u * sc2;
  const Y2 = (v: number) => oy2 - v * sc2;
  const biquadPoints: string[] = [];
  for (let vx = -3; vx <= 3; vx += 0.05) {
    const vy = Math.pow(vx, 4) - 5 * vx * vx + 4;
    const sy = Y2(vy);
    if (sy >= -10 && sy <= h2 + 10) biquadPoints.push(`${X2(vx)},${sy.toFixed(1)}`);
  }

  // Q5: α,β roots of x²-3x+1 → new roots α²/β, β²/α
  const alpha = (3 + Math.sqrt(5)) / 2;
  const beta = (3 - Math.sqrt(5)) / 2;
  const newRoot1 = alpha * alpha / beta;
  const newRoot2 = beta * beta / alpha;

  return (
    <div className="space-y-3">
      <VisCard title="Q1 · Values of k: kx²−3x+1=0 has two distinct real roots" color="orange">
        <Slider label="k" value={k} min={-2} max={4} step={0.05} onChange={setK} display={k.toFixed(2)} />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/30 p-2 rounded">
            <div>D = 9−4k = <strong>{D1.toFixed(2)}</strong></div>
            <div className={D1 > 0 ? "text-green-500" : "text-red-500"}>
              {D1 > 0 ? "✓ Two distinct real roots" : D1 === 0 ? "Repeated root" : "No real roots"}
            </div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            {k !== 0 && D1 > 0 ? (
              <>
                <div>x₁ = {root1.toFixed(3)}</div>
                <div>x₂ = {root2.toFixed(3)}</div>
              </>
            ) : (
              <div className="text-muted-foreground">—</div>
            )}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Condition: D &gt; 0 AND k ≠ 0 → k &lt; 9/4 AND k ≠ 0
        </div>
      </VisCard>

      <VisCard title="Q3 · Biquadratic x⁴−5x²+4=0 — four real roots: ±1, ±2" color="blue">
        <button
          onClick={() => setShowBiquad(!showBiquad)}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 underline cursor-pointer"
        >
          {showBiquad ? "Hide graph" : "Show graph"}
        </button>
        {showBiquad && (
          <Schematic
            w={w2} h={h2} ox={ox2} oy={oy2} scale={sc2}
            tickStep={1}
            legend={[
              { color: "#38bdf8", label: "x⁴ − 5x² + 4" },
              { color: "#10b981", label: "roots: ±1, ±2" },
            ]}
          >
            {biquadPoints.length > 1 && (
              <polyline points={biquadPoints.join(" ")} fill="none" stroke="#38bdf8" strokeWidth="2" />
            )}
            {[-2, -1, 1, 2].map((r) => (
              <g key={r}>
                <circle cx={X2(r)} cy={Y2(0)} r={4} fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                <text x={X2(r) - 4} y={Y2(0) + 16} fill="#10b981" fontSize="9">{r}</text>
              </g>
            ))}
          </Schematic>
        )}
        <div className="text-xs text-muted-foreground">
          u = x²: u²−5u+4 = 0 → u = 1, 4 → x = ±1, ±2
        </div>
      </VisCard>

      <VisCard title="Q5 · New quadratic from α²/β, β²/α where α,β roots of x²−3x+1=0" color="purple">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground mb-1">Original roots</div>
            <div>α = {alpha.toFixed(4)}</div>
            <div>β = {beta.toFixed(4)}</div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground mb-1">New roots</div>
            <div>α²/β = {newRoot1.toFixed(4)}</div>
            <div>β²/α = {newRoot2.toFixed(4)}</div>
            <div className="text-green-500 mt-1">New quadratic: x²−18x+1=0</div>
          </div>
        </div>
      </VisCard>
    </div>
  );
}

/* ================================================================
   3. ANALYTICAL GEOMETRY
   ================================================================ */

export function AnalyticGeomAdditionalVisual() {
  // Q2: Angle between 6x²−xy−2y²=0  (a=6, h=-0.5, b=-2)
  const a = 6, hVal = -0.5, b = -2;
  const tanTheta = (2 * Math.sqrt(hVal * hVal - a * b)) / (a + b);
  const thetaDeg = Math.atan(tanTheta) * 180 / Math.PI;

  // Q3: Pair of lines x²−6xy+8y²=0 → y=x/2, y=x/4
  const w3 = 320, h3 = 240, ox3 = w3 / 2, oy3 = h3 / 2, sc3 = 40;
  const X3 = (u: number) => ox3 + u * sc3;
  const Y3 = (v: number) => oy3 - v * sc3;
  const linePts = (m: number) => {
    const pts: string[] = [];
    for (let vx = -4; vx <= 4; vx += 0.05) {
      pts.push(`${X3(vx)},${Y3(m * vx)}`);
    }
    return pts;
  };

  // Q4: Parabola y²=8x, a=2
  const w4 = 320, h4 = 220, ox4 = 30, oy4 = h4 / 2, sc4 = 30;
  const X4 = (u: number) => ox4 + u * sc4;
  const Y4 = (v: number) => oy4 - v * sc4;
  const upperPts: string[] = [];
  const lowerPts: string[] = [];
  for (let vx = 0; vx <= 3.5; vx += 0.05) {
    const vy = Math.sqrt(8 * vx);
    upperPts.push(`${X4(vx)},${Y4(vy)}`);
    lowerPts.push(`${X4(vx)},${Y4(-vy)}`);
  }

  return (
    <div className="space-y-3">
      <VisCard title="Q2 · Angle between 6x²−xy−2y²=0" color="blue">
        <div className="text-xs space-y-1">
          <div>a={a}, 2h=−1 → h={hVal}, b={b}</div>
          <div>tan θ = 2√(h²−ab)/(a+b) = 2√(0.25+12)/4 = 2×3.5/4 = <strong>{tanTheta.toFixed(3)}</strong></div>
          <div className="text-blue-500">θ = {thetaDeg.toFixed(2)}°</div>
        </div>
      </VisCard>

      <VisCard title="Q3 · Pair of lines x²−6xy+8y²=0 → y=x/2 AND y=x/4" color="orange">
        <Schematic
          w={w3} h={h3} ox={ox3} oy={oy3} scale={sc3}
          tickStep={1}
          legend={[
            { color: "#f97316", label: "y = x/2" },
            { color: "#38bdf8", label: "y = x/4" },
            { color: "#fbbf24", label: "origin" },
          ]}
        >
          {linePts(0.5).length > 1 && <polyline points={linePts(0.5).join(" ")} fill="none" stroke="#f97316" strokeWidth="2" />}
          {linePts(0.25).length > 1 && <polyline points={linePts(0.25).join(" ")} fill="none" stroke="#38bdf8" strokeWidth="2" />}
          <circle cx={X3(0)} cy={Y3(0)} r={4} fill="#fbbf24" />
        </Schematic>
        <div className="text-xs text-muted-foreground">
          Factor: x²−6xy+8y² = (x−2y)(x−4y) = 0
        </div>
      </VisCard>

      <VisCard title="Q4 · Parabola y²=8x (a=2), passes through (2,4)" color="green">
        <Schematic
          w={w4} h={h4} ox={ox4} oy={oy4} scale={sc4}
          tickStep={1}
          xLabel="x" yLabel="y"
          legend={[
            { color: "#38bdf8", label: "y² = 8x" },
            { color: "#f97316", label: "(2, ±4)" },
          ]}
        >
          {upperPts.length > 1 && <polyline points={upperPts.join(" ")} fill="none" stroke="#38bdf8" strokeWidth="2" />}
          {lowerPts.length > 1 && <polyline points={lowerPts.join(" ")} fill="none" stroke="#38bdf8" strokeWidth="2" />}
          <circle cx={X4(2)} cy={Y4(4)} r={5} fill="#f97316" stroke="#fff" strokeWidth="1.5" />
          <text x={X4(2) + 8} y={Y4(4) - 8} fill="#f97316" fontSize="10" fontWeight="600">(2, 4)</text>
          <circle cx={X4(2)} cy={Y4(-4)} r={5} fill="#f97316" stroke="#fff" strokeWidth="1.5" />
          <text x={X4(2) + 8} y={Y4(-4) + 14} fill="#f97316" fontSize="10">(2, −4)</text>
        </Schematic>
        <div className="text-xs text-muted-foreground">y² = 4ax → 4a = 8 → a = 2</div>
      </VisCard>

      <VisCard title="Q6 · Chord of Contact (Polar) of y²=4ax from point (x₁, y₁)" color="purple">
        <div className="text-xs space-y-1 text-muted-foreground">
          <div>For y² = 4ax, the chord of contact from (x₁,y₁) is:</div>
          <div className="font-mono text-foreground">yy₁ − 2a(x + x₁) = 0</div>
          <div className="font-mono text-purple-500">yy₁ = 2a(x + x₁)</div>
          <div className="mt-1">This is the polar line — it is the line joining the two points of contact
            of the tangents drawn from (x₁, y₁) to the parabola.</div>
        </div>
      </VisCard>
    </div>
  );
}

/* ================================================================
   4. LIMITS & CONTINUITY
   ================================================================ */

export function LimitsAdditionalVisual() {
  // Q1: Taylor limit of sin(5x)−5sin(x) / x³ → −20
  const [x, setX] = useState(0.5);
  const sinVal = Math.sin(5 * x) - 5 * Math.sin(x);
  const ratio = x !== 0 ? sinVal / (x * x * x) : -20;

  // Q5: (1+x)ⁿ−(1−x)ⁿ / 2x → n (as x→0), n=3
  const [n, setN] = useState(3);
  const binomVal = x !== 0 ? (Math.pow(1 + x, n) - Math.pow(1 - x, n)) / (2 * x) : n;

  return (
    <div className="space-y-3">
      <VisCard title="Q1 · lim(x→0) [sin(5x) − 5sin(x)] / x³ = −20  (Taylor series)" color="orange">
        <Slider label="x" value={x} min={0.01} max={3} step={0.01} onChange={setX} display={x.toFixed(3)} />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">sin(5x)−5sin(x)</div>
            <div className="font-mono">{sinVal.toFixed(6)}</div>
            <div>x³ = {Math.pow(x, 3).toFixed(6)}</div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Ratio</div>
            <div className="font-mono text-lg text-orange-500">{ratio.toFixed(4)}</div>
            <div className="text-green-500">→ approaches −20 as x→0</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
          Taylor: sin x = x − x³/6 + O(x⁵).  sin(5x)−5sin(x) = (5x − 125x³/6) − 5(x − x³/6) = −120x³/6 = −20x³
        </div>
      </VisCard>

      <VisCard title="Q3 · lim(x→∞)(1+2/x)ˣ = e²  — interactive slider" color="blue">
        <Slider label="x" value={x} min={1} max={100} step={1} onChange={setX} display={x.toFixed(1)} />
        <div className="flex items-center gap-3 text-xs">
          <div className="font-mono text-blue-500 text-lg">
            {(1 + 2 / x) ** x}
          </div>
          <div className="text-muted-foreground">
            = {((1 + 2 / x) ** x).toFixed(6)}
            <br />
            e² ≈ {Math.E ** 2}
          </div>
        </div>
      </VisCard>

      <VisCard title="Q5 · lim(x→0) [(1+x)ⁿ − (1−x)ⁿ] / 2x = n  (binomial)" color="purple">
        <div className="flex gap-4 items-start">
          <div className="space-y-1 flex-1">
            <Slider label="n" value={n} min={1} max={8} step={1} onChange={setN} display={`${n}`} />
            <Slider label="x" value={x} min={0.001} max={1} step={0.001} onChange={setX} display={x.toFixed(3)} />
          </div>
          <div className="text-xs bg-muted/30 p-2 rounded min-w-[100px]">
            <div>Ratio = <strong className="text-purple-500 text-base">{binomVal.toFixed(4)}</strong></div>
            <div className="text-muted-foreground">→ n = {n} as x→0</div>
          </div>
        </div>
      </VisCard>
    </div>
  );
}

/* ================================================================
   5. DIFFERENTIATION
   ================================================================ */

export function DerivativesAdditionalVisual() {
  // Q6: f(x) = x³ − 12x + 2 on [−3, 3] — show critical points
  const f = (t: number) => t * t * t - 12 * t + 2;
  const w = 340, h = 220, ox = w / 2, oy = h / 2, sc = 18;
  const X = (u: number) => ox + u * sc;
  const Y = (v: number) => oy - v * sc;

  const curvePts: string[] = [];
  for (let t = -3; t <= 3; t += 0.02) {
    const sy = Y(f(t));
    if (sy >= -5 && sy <= h + 5) curvePts.push(`${X(t)},${sy.toFixed(1)}`);
  }

  const cp1 = { x: -2, y: f(-2) };
  const cp2 = { x: 2, y: f(2) };
  const ep1 = { x: -3, y: f(-3) };
  const ep2 = { x: 3, y: f(3) };

  // Q1: x^x curve
  const [xVal, setXVal] = useState(1.5);
  const xPowX = Math.pow(xVal, xVal);
  const dXPowX = xPowX * (Math.log(xVal) + 1);
  const w2 = 300, h2 = 180, ox2 = 30, oy2 = h2 - 20, sc2 = 30;
  const X2 = (u: number) => ox2 + u * sc2;
  const Y2 = (v: number) => oy2 - v * sc2;
  const xPowXCurve: string[] = [];
  for (let t = 0.01; t <= 3; t += 0.02) {
    const v = Math.pow(t, t);
    const sy = Y2(v);
    if (sy >= 0 && sy <= h2) xPowXCurve.push(`${X2(t)},${sy.toFixed(1)}`);
  }

  return (
    <div className="space-y-3">
      <VisCard title="Q6 · f(x)=x³−12x+2 on [−3,3] — find max/min using derivatives" color="orange">
        <Schematic
          w={w} h={h} ox={ox} oy={oy} scale={sc}
          tickStep={2}
          legend={[
            { color: "#38bdf8", label: "f(x)" },
            { color: "#f97316", label: "local max (x=−2)" },
            { color: "#ef4444", label: "local min (x=2)" },
            { color: "#a855f7", label: "endpoints" },
          ]}
          xLabel="x" yLabel="f(x)"
        >
          {curvePts.length > 1 && (
            <polyline points={curvePts.join(" ")} fill="none" stroke="#38bdf8" strokeWidth="2" />
          )}
          <circle cx={X(cp1.x)} cy={Y(cp1.y)} r={5} fill="#f97316" stroke="#fff" strokeWidth="1.5" />
          <text x={X(cp1.x) - 42} y={Y(cp1.y) - 8} fill="#f97316" fontSize="9" fontWeight="600">
            max {cp1.y}
          </text>
          <circle cx={X(cp2.x)} cy={Y(cp2.y)} r={5} fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x={X(cp2.x) + 8} y={Y(cp2.y) + 12} fill="#ef4444" fontSize="9" fontWeight="600">
            min {cp2.y}
          </text>
          <circle cx={X(ep1.x)} cy={Y(ep1.y)} r={4} fill="#a855f7" stroke="#fff" strokeWidth="1" />
          <text x={X(ep1.x) - 34} y={Y(ep1.y) - 8} fill="#a855f7" fontSize="9">{ep1.y}</text>
          <circle cx={X(ep2.x)} cy={Y(ep2.y)} r={4} fill="#a855f7" stroke="#fff" strokeWidth="1" />
          <text x={X(ep2.x) + 8} y={Y(ep2.y) + 12} fill="#a855f7" fontSize="9">{ep2.y}</text>
        </Schematic>
        <div className="text-xs grid grid-cols-2 gap-2">
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Candidates: f(−3), f(−2), f(2), f(3)</div>
            <div>17, 14, −14, −13</div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-green-500">Max = 17 at x = −3</div>
            <div className="text-red-500">Min = −14 at x = 2</div>
          </div>
        </div>
      </VisCard>

      <VisCard title="Q1 · y = xˣ — log differentiation: y' = xˣ(ln x + 1)" color="blue">
        <Slider label="x" value={xVal} min={0.1} max={3} step={0.05} onChange={setXVal} display={xVal.toFixed(2)} />
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">xˣ</div>
            <div className="font-mono text-blue-500 text-sm">{xPowX.toFixed(4)}</div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">ln(x) + 1</div>
            <div className="font-mono text-purple-500 text-sm">{(Math.log(xVal) + 1).toFixed(4)}</div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">y' = xˣ(ln x+1)</div>
            <div className="font-mono text-green-500 text-sm">{dXPowX.toFixed(4)}</div>
          </div>
        </div>
        <Schematic
          w={w2} h={h2} ox={ox2} oy={oy2} scale={sc2}
          tickStep={1}
          yLabel="y"
          legend={[
            { color: "#38bdf8", label: "y = xˣ" },
            { color: "#f97316", label: "xˣ at x = " + xVal.toFixed(1) },
          ]}
        >
          {xPowXCurve.length > 1 && (
            <polyline points={xPowXCurve.join(" ")} fill="none" stroke="#38bdf8" strokeWidth="2" />
          )}
          <circle cx={X2(xVal)} cy={Y2(xPowX)} r={4} fill="#f97316" stroke="#fff" strokeWidth="1.5" />
        </Schematic>
      </VisCard>

      <VisCard title="Q2 · y = arctan((√(1+x²)−1)/x) simplifies to (1/2)·arctan(x)" color="green">
        <div className="text-xs space-y-1 text-muted-foreground">
          <div>Let x = tan θ. Then √(1+x²) = sec θ.</div>
          <div>Argument = (sec θ − 1) / tan θ = tan(θ/2)</div>
          <div>∴ y = arctan(tan(θ/2)) = θ/2 = <strong className="text-green-500">(1/2)·arctan(x)</strong></div>
          <div>∴ dy/dx = <strong className="text-green-500">1/[2(1+x²)]</strong></div>
        </div>
      </VisCard>

      <VisCard title="Q4 · y = ln[tan(π/4 + x/2)] — derivative = sec(x)" color="purple">
        <div className="text-xs space-y-1 text-muted-foreground">
          <div>Chain rule: d/dx [ln(tan(u))] where u = π/4 + x/2</div>
          <div>= [1/tan(u)] · sec²(u) · (1/2)</div>
          <div>= 1/(2·sin(u)·cos(u)) = 1/sin(2u) = 1/sin(π/2 + x)</div>
          <div>∴ dy/dx = <strong className="text-purple-500">1/cos(x) = sec(x)</strong></div>
        </div>
      </VisCard>

      <VisCard title="Q3 · Leibniz 2nd-derivative rule: (fg)'' = f''g + 2f'g' + fg''" color="red">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Starting from (fg)' = f'g + fg' :</div>
          <div>(fg)'' = (f'g + fg')' = f''g + f'g' + f'g' + fg''</div>
          <div>= <strong className="text-red-500">f''g + 2f'g' + fg''</strong> ✓</div>
        </div>
      </VisCard>
    </div>
  );
}
