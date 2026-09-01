/**
 * Statistics and Probability Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics → Unit: Statistics and Probability
 */

"use client";

import { useState, useMemo } from "react";
import { BookOpen, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ============================================================
   TAB 1 — DISPERSION: Data-Set Visualizer
   ============================================================ */

function DispersionVisual() {
  const [rawInput, setRawInput] = useState("2,4,4,4,5,5,7,9");
  const [sliderCount, setSliderCount] = useState(8);

  const data = useMemo(() => {
    const nums = rawInput
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
    return nums.slice(0, 10);
  }, [rawInput]);

  const n = data.length;

  const stats = useMemo(() => {
    if (n === 0) return null;
    const mean = data.reduce((a, b) => a + b, 0) / n;
    const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    const stdDev = Math.sqrt(variance);
    const range = Math.max(...data) - Math.min(...data);
    const sorted = [...data].sort((a, b) => a - b);
    const q1Idx = Math.floor(n * 0.25);
    const q3Idx = Math.floor(n * 0.75);
    const q1 = sorted[q1Idx];
    const q3 = sorted[q3Idx];
    const iqr = q3 - q1;
    const cv = mean !== 0 ? (stdDev / Math.abs(mean)) * 100 : 0;
    return { mean, variance, stdDev, range, q1, q3, iqr, cv };
  }, [data, n]);

  const maxVal = Math.max(...data, 1);
  const barH = 28;
  const rowGap = 4;
  const chartH = n * (barH + rowGap);
  const chartW = 480;
  const labelW = 130;
  const barAreaW = chartW - labelW - 60;

  const barColor = (v: number) => {
    if (!stats) return "#6366f1";
    const deviation = Math.abs(v - stats.mean);
    const maxDev = stats.range / 2 || 1;
    const ratio = deviation / maxDev;
    if (ratio < 0.35) return "#22c55e";
    if (ratio < 0.65) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="space-y-4">
      {/* Input row */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-muted-foreground">
          Enter 5–10 numbers (comma-separated):
        </label>
        <input
          type="text"
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          className="px-3 py-1.5 rounded-md border bg-background text-sm font-mono"
        />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>Points: {Math.min(Math.max(n, 0), 10)}</span>
          <input
            type="range"
            min={3}
            max={10}
            value={Math.min(Math.max(n, 0), 10)}
            onChange={(e) => setSliderCount(parseInt(e.target.value))}
            className="w-32"
          />
          <span className="text-muted-foreground/60">
            (show first {Math.min(Math.max(n, 0), 10)} values)
          </span>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <svg viewBox={`0 0 ${chartW} ${Math.max(chartH, 80)}`} className="w-full">
        {/* Axis */}
        <line
          x1={labelW}
          y1={chartH + 8}
          x2={chartW}
          y2={chartH + 8}
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        {/* Mean line */}
        {stats && n > 0 && (
          <line
            x1={labelW + (stats.mean / maxVal) * barAreaW}
            y1={0}
            x2={labelW + (stats.mean / maxVal) * barAreaW}
            y2={chartH}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
        )}

        {data.slice(0, sliderCount).map((v, i) => {
          const y = i * (barH + rowGap) + 4;
          const w = (v / maxVal) * barAreaW;
          const c = barColor(v);
          return (
            <g key={i}>
              {/* Label */}
              <text
                x={labelW - 6}
                y={y + barH / 2 + 4}
                textAnchor="end"
                fontSize="11"
                fill="hsl(var(--foreground))"
                fontFamily="monospace"
              >
                x<sub>{i + 1}</sub> = {v}
              </text>
              {/* Bar */}
              <rect
                x={labelW}
                y={y}
                width={Math.max(w, 2)}
                height={barH}
                rx="3"
                fill={c}
                opacity="0.85"
              />
              {/* Value on bar */}
              <text
                x={labelW + w + 5}
                y={y + barH / 2 + 4}
                fontSize="10"
                fill={c}
                fontFamily="monospace"
              >
                {v}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {[
            { label: "Mean", value: stats.mean.toFixed(4), color: "text-amber-500" },
            { label: "Variance (σ²)", value: stats.variance.toFixed(4), color: "text-purple-500" },
            { label: "Std Dev (σ)", value: stats.stdDev.toFixed(4), color: "text-blue-500" },
            { label: "Range", value: stats.range.toFixed(4), color: "text-rose-500" },
            { label: "IQR", value: stats.iqr.toFixed(4), color: "text-emerald-500" },
            { label: "Q1", value: stats.q1.toFixed(2), color: "" },
            { label: "Q3", value: stats.q3.toFixed(2), color: "" },
            { label: "CV (%)", value: stats.cv.toFixed(2), color: "text-cyan-500" },
          ].map((s) => (
            <div key={s.label} className="p-2 rounded-md bg-muted/50">
              <div className="text-muted-foreground">{s.label}</div>
              <div className={`font-mono font-semibold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Formulas */}
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg space-y-1">
        <div>
          <strong className="text-foreground">Mean:</strong> x̄ = (Σxᵢ) / n
        </div>
        <div>
          <strong className="text-foreground">Variance:</strong> σ² = Σ(xᵢ − x̄)² / n
        </div>
        <div>
          <strong className="text-foreground">Standard Deviation:</strong> σ = √σ²
        </div>
        <div>
          <strong className="text-foreground">Coefficient of Variation:</strong> CV = (σ / |x̄|) × 100%
        </div>
        <div>
          <strong className="text-foreground">Bar colors:</strong>{" "}
          <span className="text-green-500">Green</span> = close to mean ·{" "}
          <span className="text-yellow-500">Yellow</span> = moderate ·{" "}
          <span className="text-red-500">Red</span> = far from mean
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TAB 2 — PROBABILITY: Coin / Dice Simulator
   ============================================================ */

function ProbabilityVisual() {
  const [trials, setTrials] = useState(100);
  const [outcome, setOutcome] = useState<"coin" | "dice">("coin");
  const [coinCount, setCoinCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [flipped, setFlipped] = useState(false);

  const performFlip = () => {
    const newResults: number[] = [];
    for (let i = 0; i < trials; i++) {
      if (outcome === "coin") {
        newResults.push(Math.random() < 0.5 ? 0 : 1);
      } else {
        newResults.push(Math.floor(Math.random() * 6));
      }
    }
    setResults(newResults);
    setFlipped(true);
  };

  const freqTable = useMemo(() => {
    const counts: Record<number, number> = {};
    results.forEach((r) => {
      counts[r] = (counts[r] || 0) + 1;
    });
    return counts;
  }, [results]);

  const total = results.length || 1;

  const chartW = 480;
  const chartH = 200;
  const padL = 44;
  const padB = 32;
  const barAreaW = chartW - padL - 16;
  const barAreaH = chartH - padB - 16;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Type:</span>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value as "coin" | "dice")}
            className="bg-background border rounded-md px-2 py-1 text-xs"
          >
            <option value="coin">Coin Flip</option>
            <option value="dice">Dice Roll</option>
          </select>
        </div>

        {outcome === "coin" && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Coins:</span>
            <input
              type="range"
              min={1}
              max={3}
              value={coinCount}
              onChange={(e) => setCoinCount(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="font-mono">{coinCount}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Trials (N):</span>
          {[10, 50, 100, 500, 1000].map((v) => (
            <button
              key={v}
              onClick={() => setTrials(v)}
              className={`px-2 py-1 rounded text-xs font-mono ${
                trials === v
                  ? "bg-primary text-primary-foreground"
                  : "border bg-background"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <button
          onClick={performFlip}
          className="ml-auto px-4 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold"
        >
          {flipped ? "Re-Simulate" : "Simulate"}
        </button>
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
        {/* Axes */}
        <line x1={padL} y1={padB} x2={padL} y2={16} stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1={padL} y1={chartH - padB} x2={chartW - 8} y2={chartH - padB} stroke="hsl(var(--border))" strokeWidth="1" />

        {(() => {
          const keys = outcome === "coin"
            ? Array.from({ length: coinCount + 1 }, (_, i) => i)
            : [0, 1, 2, 3, 4, 5];
          const maxCount = Math.max(...keys.map((k) => freqTable[k] || 0), 1);
          const barW = barAreaW / keys.length;
          const theoretical = outcome === "coin" ? trials / 2 : trials / 6;

          return keys.map((k, idx) => {
            const count = freqTable[k] || 0;
            const barHeight = (count / maxCount) * barAreaH;
            const x = padL + idx * barW + barW * 0.15;
            const w = barW * 0.7;
            const y = chartH - padB - barHeight;
            const label = outcome === "coin" ? `H=${k}` : `Face ${k + 1}`;
            const expProb = outcome === "coin" ? 0.5 : 1 / 6;
            const actualProb = count / total;
            return (
              <g key={k}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={barHeight}
                  rx="2"
                  fill={Math.abs(actualProb - expProb) < 0.05 ? "#22c55e" : "#6366f1"}
                  opacity="0.85"
                />
                <text
                  x={x + w / 2}
                  y={chartH - padB + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill="hsl(var(--foreground))"
                >
                  {label}
                </text>
                <text
                  x={x + w / 2}
                  y={y - 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="hsl(var(--muted-foreground))"
                  fontFamily="monospace"
                >
                  {count}
                </text>
              </g>
            );
          });
        })()}

        {/* Theoretical line */}
        {(() => {
          const theoretical = outcome === "coin" ? trials / 2 : trials / 6;
          const maxCount = Math.max(
            ...(outcome === "coin"
              ? Array.from({ length: coinCount + 1 }, (_, i) => freqTable[i] || 0)
              : [0, 1, 2, 3, 4, 5].map((k) => freqTable[k] || 0)),
            1
          );
          const y = chartH - padB - (theoretical / maxCount) * barAreaH;
          return (
            <line
              x1={padL}
              y1={y}
              x2={chartW - 8}
              y2={y}
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          );
        })()}
      </svg>

      {/* Frequency table */}
      {results.length > 0 && (() => {
        const keys = outcome === "coin"
          ? Array.from({ length: coinCount + 1 }, (_, i) => i)
          : [0, 1, 2, 3, 4, 5];
        const expProb = outcome === "coin" ? 0.5 : 1 / 6;
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1 px-2 text-muted-foreground">Outcome</th>
                  <th className="text-right py-1 px-2 text-muted-foreground">Frequency</th>
                  <th className="text-right py-1 px-2 text-muted-foreground">Exp. Prob</th>
                  <th className="text-right py-1 px-2 text-muted-foreground">Actual Prob</th>
                  <th className="text-right py-1 px-2 text-muted-foreground">Diff</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => {
                  const count = freqTable[k] || 0;
                  const actual = count / total;
                  return (
                    <tr key={k} className="border-b border-muted/30">
                      <td className="py-1 px-2 font-mono">
                        {outcome === "coin" ? `Heads=${k}` : `Face ${k + 1}`}
                      </td>
                      <td className="py-1 px-2 text-right font-mono">{count}</td>
                      <td className="py-1 px-2 text-right font-mono text-amber-500">
                        {(expProb * 100).toFixed(1)}%
                      </td>
                      <td className="py-1 px-2 text-right font-mono">{(actual * 100).toFixed(1)}%</td>
                      <td className={`py-1 px-2 text-right font-mono ${Math.abs(actual - expProb) < 0.05 ? "text-green-500" : "text-red-500"}`}>
                        {(Math.abs(actual - expProb) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* Law of Large Numbers note */}
      {results.length > 0 && (
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <strong className="text-foreground">Law of Large Numbers:</strong> As N increases, the
          experimental probability converges toward the theoretical probability.
          Try increasing N to 500 or 1000 to see the frequencies stabilize.
        </div>
      )}
    </div>
  );
}

/* ============================================================
   TAB 3 — DISTRIBUTIONS: Binomial B(n, p)
   ============================================================ */

function DistributionsVisual() {
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);

  const q = 1 - p;
  const mean = n * p;
  const variance = n * p * q;
  const stdDev = Math.sqrt(variance);

  const pmf = useMemo(() => {
    const vals: { k: number; prob: number }[] = [];
    for (let k = 0; k <= n; k++) {
      // Binomial coefficient via multiplication
      let comb = 1;
      for (let i = 0; i < k; i++) {
        comb *= (n - i) / (i + 1);
      }
      const prob = comb * (p ** k) * (q ** (n - k));
      vals.push({ k, prob });
    }
    return vals;
  }, [n, p]);

  const maxProb = Math.max(...pmf.map((v) => v.prob), 0.001);
  const chartW = 520;
  const chartH = 220;
  const padL = 44;
  const padB = 36;
  const barAreaW = chartW - padL - 12;
  const barAreaH = chartH - padB - 20;
  const barW = barAreaW / (n + 1);

  return (
    <div className="space-y-4">
      {/* Sliders */}
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground font-mono">n =</span>
          <input
            type="range"
            min={1}
            max={20}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-32"
          />
          <span className="font-mono font-semibold w-6">{n}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground font-mono">p =</span>
          <input
            type="range"
            min={5}
            max={95}
            value={Math.round(p * 100)}
            onChange={(e) => setP(parseInt(e.target.value) / 100)}
            className="w-32"
          />
          <span className="font-mono font-semibold w-10">{p.toFixed(2)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 rounded-md bg-muted/50">
          <div className="text-muted-foreground">Mean (μ)</div>
          <div className="font-mono font-semibold text-amber-500">np = {mean.toFixed(2)}</div>
        </div>
        <div className="p-2 rounded-md bg-muted/50">
          <div className="text-muted-foreground">Variance (σ²)</div>
          <div className="font-mono font-semibold text-purple-500">npq = {variance.toFixed(2)}</div>
        </div>
        <div className="p-2 rounded-md bg-muted/50">
          <div className="text-muted-foreground">Std Dev (σ)</div>
          <div className="font-mono font-semibold text-blue-500">{stdDev.toFixed(2)}</div>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
        {/* Axes */}
        <line x1={padL} y1={padB} x2={padL} y2={chartH - padB} stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1={padL} y1={chartH - padB} x2={chartW - 4} y2={chartH - padB} stroke="hsl(var(--border))" strokeWidth="1" />

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = chartH - padB - f * barAreaH;
          return (
            <text key={f} x={padL - 4} y={y + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">
              {f.toFixed(2)}
            </text>
          );
        })}

        {/* Bars */}
        {pmf.map(({ k, prob }) => {
          const barHeight = (prob / maxProb) * barAreaH;
          const x = padL + k * barW + barW * 0.1;
          const w = barW * 0.8;
          const y = chartH - padB - barHeight;
          const isMode = Math.abs(k - mean) < 0.5;
          return (
            <g key={k}>
              <rect
                x={x}
                y={y}
                width={w}
                height={Math.max(barHeight, 1)}
                rx="1"
                fill={isMode ? "#f59e0b" : "#6366f1"}
                opacity="0.9"
              />
              <text
                x={x + w / 2}
                y={chartH - padB + 13}
                textAnchor="middle"
                fontSize="9"
                fill="hsl(var(--foreground))"
              >
                {k}
              </text>
              <text
                x={x + w / 2}
                y={y - 3}
                textAnchor="middle"
                fontSize="8"
                fill="hsl(var(--muted-foreground))"
                fontFamily="monospace"
              >
                {prob.toFixed(3)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Formula */}
      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Binomial PMF:</strong>{" "}
        P(X = k) = C(n,k) · p<sup>k</sup> · (1−p)<sup>n−k</sup>
        <br />
        <strong className="text-foreground">Mean:</strong> μ = np &nbsp;·&nbsp;
        <strong className="text-foreground">Variance:</strong> σ² = npq &nbsp;·&nbsp;
        <strong className="text-foreground">Std Dev:</strong> σ = √(npq)
      </div>
    </div>
  );
}

/* ============================================================
   THEORY SUMMARY
   ============================================================ */

const THEORY_SECTIONS = [
  {
    title: "Measures of Dispersion",
    points: [
      "Range = Maximum − Minimum",
      "Interquartile Range (IQR) = Q3 − Q1",
      "Variance (σ²) = Σ(xᵢ − x̄)² / n",
      "Standard Deviation (σ) = √σ²",
      "Coefficient of Variation (CV) = (σ / |x̄|) × 100%",
    ],
  },
  {
    title: "Karl Pearson's Skewness",
    points: [
      "Skewness = (Mean − Mode) / σ",
      "Alternative: Skewness = 3(Mean − Median) / σ",
      "Positive skew → tail to the right; Negative skew → tail to the left",
    ],
  },
  {
    title: "Probability — Definitions",
    points: [
      "Mathematical (Classical): P(A) = Favorable outcomes / Total outcomes",
      "Empirical (Relative Frequency): P(A) = f(A) / n, as n → ∞",
      "Axiomatic: P(S) = 1, 0 ≤ P(A) ≤ 1, P(A∪B) = P(A)+P(B) if disjoint",
    ],
  },
  {
    title: "Rules of Probability",
    points: [
      "Addition Rule: P(A∪B) = P(A) + P(B) − P(A∩B)",
      "For mutually exclusive: P(A∪B) = P(A) + P(B)",
      "Multiplication Rule: P(A∩B) = P(A)·P(B|A)",
    ],
  },
  {
    title: "Independent Events",
    points: [
      "A and B are independent if P(A∩B) = P(A)·P(B)",
      "Equivalently: P(A|B) = P(A) and P(B|A) = P(B)",
      "If independent: P(A∪B) = P(A) + P(B) − P(A)·P(B)",
    ],
  },
];

/* ============================================================
   MAIN PANEL
   ============================================================ */

export function StatisticsProbabilityResources() {
  return (
    <div className="space-y-6">
      {/* Interactive Visuals */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Interactive Visualizations</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore dispersion, probability simulation, and the binomial distribution
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dispersion" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dispersion">Dispersion</TabsTrigger>
              <TabsTrigger value="probability">Probability</TabsTrigger>
              <TabsTrigger value="distributions">Distributions</TabsTrigger>
            </TabsList>

            <TabsContent value="dispersion" className="space-y-4">
              <DispersionVisual />
            </TabsContent>

            <TabsContent value="probability" className="space-y-4">
              <ProbabilityVisual />
            </TabsContent>

            <TabsContent value="distributions" className="space-y-4">
              <DistributionsVisual />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Theory Summary */}
      <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Theory Summary</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Key formulas and concepts for Statistics and Probability
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {THEORY_SECTIONS.map((sec) => (
              <div
                key={sec.title}
                className="p-3 rounded-lg border bg-background/60"
              >
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  {sec.title}
                </h4>
                <ul className="space-y-1">
                  {sec.points.map((p, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-1.5"
                    >
                      <span className="text-green-500 mt-0.5 shrink-0">•</span>
                      <span dangerouslySetInnerHTML={{ __html: p }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
