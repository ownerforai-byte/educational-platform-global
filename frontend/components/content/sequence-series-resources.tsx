/**
 * Sequence & Series Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics → Unit: Algebra → Sequence and Series
 */

"use client";

import { useState, useMemo } from "react";
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

/* ---------- AP Visual ---------- */
function APVisual() {
  const [a, setA] = useState(2);
  const [d, setD] = useState(3);
  const [n, setN] = useState(6);

  const terms = useMemo(
    () => Array.from({ length: n }, (_, i) => a + i * d),
    [a, d, n]
  );
  const sum = (n / 2) * (2 * a + (n - 1) * d);
  const maxTerm = Math.max(...terms.map(Math.abs), 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 text-sm">
        <label className="space-y-1">
          <span className="text-muted-foreground">First term (a): {a}</span>
          <input
            type="range"
            min={-10}
            max={20}
            value={a}
            onChange={(e) => setA(+e.target.value)}
            className="w-full"
          />
        </label>
        <label className="space-y-1">
          <span className="text-muted-foreground">Common diff (d): {d}</span>
          <input
            type="range"
            min={-10}
            max={10}
            value={d}
            onChange={(e) => setD(+e.target.value)}
            className="w-full"
          />
        </label>
        <label className="space-y-1">
          <span className="text-muted-foreground">Terms (n): {n}</span>
          <input
            type="range"
            min={2}
            max={15}
            value={n}
            onChange={(e) => setN(+e.target.value)}
            className="w-full"
          />
        </label>
      </div>

      <svg viewBox="0 0 500 200" className="w-full rounded-lg border bg-background">
        <line x1="40" y1="160" x2="480" y2="160" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3" />
        {terms.map((t, i) => {
          const barH = Math.abs(t) / maxTerm * 120;
          const x = 50 + i * (440 / n);
          const barY = t >= 0 ? 160 - barH : 160;
          return (
            <g key={i}>
              <rect
                x={x}
                y={barY}
                width={Math.max(440 / n - 8, 4)}
                height={barH}
                fill={t >= 0 ? "#38bdf8" : "#f87171"}
                rx={3}
                opacity={0.85}
              />
              <text
                x={x + (440 / n - 8) / 2}
                y={t >= 0 ? barY - 5 : barY + barH + 14}
                textAnchor="middle"
                fontSize="11"
                fill="hsl(var(--foreground))"
              >
                {t}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-3 text-xs bg-muted/30 p-3 rounded-lg">
        <span><strong>Sum (Sₙ)</strong> = {sum}</span>
        <span className="text-muted-foreground">|</span>
        <span>Sₙ = n/2 × (2a + (n−1)d) = {n}/2 × ({2 * a} + {(n - 1) * d})</span>
        <span className="text-muted-foreground">|</span>
        <span>Last term = {terms[terms.length - 1]}</span>
      </div>
    </div>
  );
}

/* ---------- GP Visual ---------- */
function GPVisual() {
  const [a, setA] = useState(16);
  const [r, setR] = useState(0.5);
  const [n, setN] = useState(8);

  const terms = useMemo(
    () => Array.from({ length: n }, (_, i) => a * Math.pow(r, i)),
    [a, r, n]
  );
  const sum =
    Math.abs(r) === 1
      ? a * n
      : Math.abs(r) < 1
      ? (a * (1 - Math.pow(r, n))) / (1 - r)
      : (a * (Math.pow(r, n) - 1)) / (r - 1);
  const maxTerm = Math.max(...terms.map(Math.abs), 1);
  const converges = Math.abs(r) < 1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 text-sm">
        <label className="space-y-1">
          <span className="text-muted-foreground">First term (a): {a}</span>
          <input
            type="range"
            min={1}
            max={32}
            value={a}
            onChange={(e) => setA(+e.target.value)}
            className="w-full"
          />
        </label>
        <label className="space-y-1">
          <span className="text-muted-foreground">Ratio (r): {r.toFixed(2)}</span>
          <input
            type="range"
            min={-2}
            max={2}
            step={0.05}
            value={r}
            onChange={(e) => setR(+e.target.value)}
            className="w-full"
          />
        </label>
        <label className="space-y-1">
          <span className="text-muted-foreground">Terms (n): {n}</span>
          <input
            type="range"
            min={2}
            max={15}
            value={n}
            onChange={(e) => setN(+e.target.value)}
            className="w-full"
          />
        </label>
      </div>

      <svg viewBox="0 0 500 200" className="w-full rounded-lg border bg-background">
        <line x1="40" y1="160" x2="480" y2="160" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3" />
        {terms.map((t, i) => {
          const barH = Math.min(Math.abs(t) / maxTerm * 130, 140);
          const x = 50 + i * (440 / n);
          return (
            <g key={i}>
              <rect
                x={x}
                y={160 - barH}
                width={Math.max(440 / n - 8, 4)}
                height={barH}
                fill={t >= 0 ? "#a855f7" : "#f87171"}
                rx={3}
                opacity={0.85}
              />
              <text
                x={x + (440 / n - 8) / 2}
                y={160 - barH - 5}
                textAnchor="middle"
                fontSize="10"
                fill="hsl(var(--foreground))"
              >
                {Math.abs(t) >= 100 ? t.toFixed(0) : t.toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-3 text-xs bg-muted/30 p-3 rounded-lg">
        <span><strong>Sₙ</strong> = {sum.toFixed(2)}</span>
        <span className="text-muted-foreground">|</span>
        <span className={converges ? "text-green-600" : "text-orange-500"}>
          {converges
            ? `Converges — S∞ = ${((a) / (1 - r)).toFixed(2)}`
            : Math.abs(r) >= 1
            ? "Diverges (|r| ≥ 1)"
            : ""}
        </span>
      </div>
    </div>
  );
}

/* ---------- AM-GM-HM Visual ---------- */
function AMGMHMVisual() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(9);

  const am = (a + b) / 2;
  const gm = Math.sqrt(a * b);
  const hm = a > 0 && b > 0 ? (2 * a * b) / (a + b) : 0;

  const vals = [am, gm, hm].filter((v) => v > 0);
  const maxVal = Math.max(...vals, 1);
  const barW = 100;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label className="space-y-1">
          <span className="text-muted-foreground">a: {a}</span>
          <input
            type="range"
            min={1}
            max={20}
            value={a}
            onChange={(e) => setA(+e.target.value)}
            className="w-full"
          />
        </label>
        <label className="space-y-1">
          <span className="text-muted-foreground">b: {b}</span>
          <input
            type="range"
            min={1}
            max={20}
            value={b}
            onChange={(e) => setB(+e.target.value)}
            className="w-full"
          />
        </label>
      </div>

      <svg viewBox="0 0 500 180" className="w-full rounded-lg border bg-background">
        {/* AM bar */}
        <rect x={60} y={20} width={(am / maxVal) * 300} height={30} fill="#38bdf8" rx={4} opacity={0.85} />
        <text x={50} y={40} textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">AM</text>
        <text x={65 + (am / maxVal) * 300} y={40} fontSize="12" fill="hsl(var(--foreground))" fontWeight="600">
          {am.toFixed(2)}
        </text>

        {/* GM bar */}
        <rect x={60} y={70} width={(gm / maxVal) * 300} height={30} fill="#a855f7" rx={4} opacity={0.85} />
        <text x={50} y={90} textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">GM</text>
        <text x={65 + (gm / maxVal) * 300} y={90} fontSize="12" fill="hsl(var(--foreground))" fontWeight="600">
          {gm.toFixed(2)}
        </text>

        {/* HM bar */}
        <rect x={60} y={120} width={(hm / maxVal) * 300} height={30} fill="#22c55e" rx={4} opacity={0.85} />
        <text x={50} y={140} textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">HM</text>
        <text x={65 + (hm / maxVal) * 300} y={140} fontSize="12" fill="hsl(var(--foreground))" fontWeight="600">
          {hm.toFixed(2)}
        </text>
      </svg>

      <div className="text-xs bg-muted/30 p-3 rounded-lg text-center">
        <span className="font-semibold">AM ≥ GM ≥ HM</span>
        <span className="text-muted-foreground ml-2">
          {am.toFixed(2)} ≥ {gm.toFixed(2)} ≥ {hm.toFixed(2)}
        </span>
        {a === b && <span className="ml-2 text-green-600">(Equality holds — a = b)</span>}
      </div>
    </div>
  );
}

/* ---------- Main Panel ---------- */
export function SequenceSeriesResources() {
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
              <CardTitle className="text-lg">Sequence &amp; Series — Resources</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercise solutions from WebNotee
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "ex-4-1",
              title: "Exercise 4.1 — Sequences",
              description: "Arithmetic, geometric, and harmonic sequences; finding terms, common difference/ratio.",
              url: "https://drive.google.com/file/d/1IHGvx_rmJ7vgsWns1bqGTyL_IMdQ7RUG/preview",
              pdfUrl: "https://drive.google.com/file/d/1IHGvx_rmJ7vgsWns1bqGTyL_IMdQ7RUG/view?usp=sharing",
              tags: ["Exercise 4.1", "Sequences", "AP/GP"],
            },
            {
              id: "ex-4-2",
              title: "Exercise 4.2 — Series",
              description: "Summation of series, A.M., G.M., H.M. and their relations, infinite geometric series.",
              url: "https://drive.google.com/file/d/1N9HP7ZfGL4vPCIEv_5xFYHZyIQ_x3JAv/preview",
              pdfUrl: "https://drive.google.com/file/d/1N9HP7ZfGL4vPCIEv_5xFYHZyIQ_x3JAv/view?usp=sharing",
              tags: ["Exercise 4.2", "Series", "AM/GM/HM"],
            },
          ].map((res) => (
            <div
              key={res.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-background/60 hover:bg-accent/50 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{res.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{res.description}</p>
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
              <CardTitle className="text-lg">Interactive Visualizations</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore sequences, series, and inequalities interactively
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ap" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ap">AP Visual</TabsTrigger>
              <TabsTrigger value="gp">GP Visual</TabsTrigger>
              <TabsTrigger value="amgm">AM-GM-HM</TabsTrigger>
            </TabsList>

            <TabsContent value="ap" className="space-y-4">
              <APVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Arithmetic Progression:</strong> Each term differs by a constant common difference d.
                The nth term is a + (n−1)d and the sum of n terms is Sₙ = n/2 × [2a + (n−1)d].
              </div>
            </TabsContent>

            <TabsContent value="gp" className="space-y-4">
              <GPVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Geometric Progression:</strong> Each term is multiplied by a constant ratio r.
                When |r| &lt; 1, the infinite series converges to S∞ = a / (1−r).
              </div>
            </TabsContent>

            <TabsContent value="amgm" className="space-y-4">
              <AMGMHMVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">AM ≥ GM ≥ HM:</strong> For positive numbers a and b,
                the arithmetic mean is always ≥ geometric mean ≥ harmonic mean, with equality when a = b.
                <br />AM = (a+b)/2, GM = √(ab), HM = 2ab/(a+b)
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Theory Summary */}
      <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Theory Summary</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Key formulas and properties
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 rounded-lg bg-green-50/50 dark:bg-green-950/10 border border-green-200/50 dark:border-green-800/30">
              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Arithmetic Sequence</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>nth term: aₙ = a + (n−1)d</li>
                <li>Sum: Sₙ = n/2 × (2a + (n−1)d) = n/2 × (a + aₙ)</li>
                <li>Arithmetic Mean: A.M. = (a + b) / 2</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-purple-50/50 dark:bg-purple-950/10 border border-purple-200/50 dark:border-purple-800/30">
              <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Geometric Sequence</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>nth term: aₙ = arⁿ⁻¹</li>
                <li>Finite sum: Sₙ = a(1−rⁿ)/(1−r), r ≠ 1</li>
                <li>Infinite sum: S∞ = a/(1−r), |r| &lt; 1</li>
                <li>Geometric Mean: G.M. = √(ab)</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-800/30">
              <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Harmonic Sequence</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>a₁, a₂, a₃, ... is H.P. if 1/a₁, 1/a₂, 1/a₃, ... is A.P.</li>
                <li>Harmonic Mean: H.M. = 2ab/(a+b)</li>
                <li>H.M. = G.M.² / A.M.</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-800/30">
              <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Key Inequalities</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>A.M. ≥ G.M. ≥ H.M. (for positive reals)</li>
                <li>Equality iff all numbers are equal</li>
                <li>For n numbers: A.M. = Σxᵢ/n, G.M. = (∏xᵢ)¹ᐟⁿ</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
