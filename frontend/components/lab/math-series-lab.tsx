"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { evaluateMath } from "@/lib/math-expression";

function ArithmeticSequence() {
  const [a, setA] = useState("2");
  const [d, setD] = useState("3");
  const [n, setN] = useState("10");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const a1 = parseFloat(a);
    const diff = parseFloat(d);
    const count = parseInt(n, 10);
    if (Number.isNaN(a1) || Number.isNaN(diff) || Number.isNaN(count) || count <= 0) {
      setResult("Please enter valid numbers (n ≥ 1).");
      return;
    }
    const nth = a1 + (count - 1) * diff;
    const sum = (count / 2) * (a1 + nth);
    const terms = Array.from({ length: Math.min(count, 12) }, (_, i) => a1 + i * diff);
    const termTxt = terms.join(", ") + (count > 12 ? ", …" : "");
    setResult(
      `a₁ = ${a1}, d = ${diff}\n\nFirst terms: ${termTxt}\n\naₙ = ${a1} + (${count} − 1)(${diff}) = ${nth}\nSₙ = (${count}/2)(${a1} + ${nth}) = ${sum.toFixed(2)}`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arithmetic Sequence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="ap-a">First term (a₁)</Label>
            <Input id="ap-a" type="number" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ap-d">Common difference (d)</Label>
            <Input id="ap-d" type="number" value={d} onChange={(e) => setD(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ap-n">Number of terms (n)</Label>
            <Input id="ap-n" type="number" min={1} value={n} onChange={(e) => setN(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate}>Show Terms, nth Term & Sum</Button>
        {result && <pre className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-xs">{result}</pre>}
        <p className="text-xs text-muted-foreground">aₙ = a₁ + (n−1)d,  Sₙ = n/2 (a₁ + aₙ)</p>
      </CardContent>
    </Card>
  );
}

function GeometricSequence() {
  const [a, setA] = useState("1");
  const [r, setR] = useState("2");
  const [n, setN] = useState("10");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const a1 = parseFloat(a);
    const ratio = parseFloat(r);
    const count = parseInt(n, 10);
    if (Number.isNaN(a1) || Number.isNaN(ratio) || Number.isNaN(count) || count <= 0) {
      setResult("Please enter valid values (n ≥ 1).");
      return;
    }
    const nth = a1 * Math.pow(ratio, count - 1);
    const sum = ratio === 1 ? a1 * count : (a1 * (1 - Math.pow(ratio, count))) / (1 - ratio);
    const terms = Array.from({ length: Math.min(count, 12) }, (_, i) => a1 * Math.pow(ratio, i));
    setResult(
      `a₁ = ${a1}, r = ${ratio}\nFirst terms: ${terms.map((t) => (Number.isInteger(t) ? t : t.toFixed(3))).join(", ")}${count > 12 ? ", …" : ""}\n\naₙ = ${a1} × ${ratio}^(${count}−1) = ${nth}\nSₙ = ${sum.toFixed(2)}`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geometric Sequence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="gp-a">First term (a₁)</Label>
            <Input id="gp-a" type="number" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="gp-r">Common ratio (r)</Label>
            <Input id="gp-r" type="number" value={r} onChange={(e) => setR(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="gp-n">Number of terms (n)</Label>
            <Input id="gp-n" type="number" min={1} value={n} onChange={(e) => setN(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate}>Calculate nth Term & Sum</Button>
        {result && <pre className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-xs">{result}</pre>}
        <p className="text-xs text-muted-foreground">aₙ = a₁·rⁿ⁻¹,  Sₙ = a₁(1−rⁿ)/(1−r). For |r| {"<"} 1, the infinite sum is a₁/(1−r).</p>
      </CardContent>
    </Card>
  );
}

function SeriesSumTool() {
  const [expression, setExpression] = useState("2n+1");
  const [from, setFrom] = useState("1");
  const [to, setTo] = useState("10");
  const [result, setResult] = useState<string | null>(null);

  // Throws on invalid input so `calculate` can surface a friendly message.
  const safeEval = (expr: string, n: number): number => evaluateMath(expr, { n });

  const calculate = () => {
    const n0 = parseInt(from, 10);
    const n1 = parseInt(to, 10);
    if (Number.isNaN(n0) || Number.isNaN(n1) || n0 <= 0 || n1 < n0) {
      setResult("Please enter valid bounds (1 ≤ from ≤ to).");
      return;
    }
    try {
      let sum = 0;
      const terms: string[] = [];
      for (let n = n0; n <= n1; n++) {
        const t = safeEval(expression, n);
        sum += t;
        terms.push(String(Number.isInteger(t) ? t : t.toFixed(3)));
      }
      setResult(
        `Σ (${expression}) from n=${n0} to ${n1}\n\nTerms: ${terms.join(", ")}\n\nSum = ${sum.toFixed(4)}`
      );
    } catch {
      setResult("Invalid expression. Use n as the variable (e.g. n^2, 2*n+1, n^3).");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Series Summation Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="series-expr">Expression (in n)</Label>
            <Input id="series-expr" placeholder="e.g. n^2, 2*n+1, n^3" value={expression} onChange={(e) => setExpression(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="series-from">From n =</Label>
            <Input id="series-from" type="number" min={1} value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="series-to">To n =</Label>
            <Input id="series-to" type="number" min={1} value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate}>Sum the Series</Button>
        {result && <pre className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-xs">{result}</pre>}
        <p className="text-xs text-muted-foreground">Works for any polynomial/rational expression using n. Common sums: Σn = n(n+1)/2, Σn² = n(n+1)(2n+1)/6.</p>
      </CardContent>
    </Card>
  );
}

export function MathSeriesLab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sequences & Series Lab</CardTitle>
        <p className="text-xs text-muted-foreground">Arithmetic, geometric progressions, and summation of series</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="arithmetic" className="w-full">
          <TabsList className="flex-wrap">
            <TabsTrigger value="arithmetic">Arithmetic</TabsTrigger>
            <TabsTrigger value="geometric">Geometric</TabsTrigger>
            <TabsTrigger value="summation">Summation</TabsTrigger>
          </TabsList>
          <TabsContent value="arithmetic" className="mt-4">
            <ArithmeticSequence />
          </TabsContent>
          <TabsContent value="geometric" className="mt-4">
            <GeometricSequence />
          </TabsContent>
          <TabsContent value="summation" className="mt-4">
            <SeriesSumTool />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}