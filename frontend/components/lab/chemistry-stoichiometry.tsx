"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MoleCalculator() {
  const [mass, setMass] = useState("18");
  const [molarMass, setMolarMass] = useState("18.015");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const m = parseFloat(mass);
    const M = parseFloat(molarMass);
    if (Number.isNaN(m) || Number.isNaN(M) || M <= 0) {
      setResult("Please enter valid numbers (molar mass > 0).");
      return;
    }
    const n = m / M;
    const particles = n * 6.022e23;
    setResult(
      `Moles (n) = ${n.toFixed(4)} mol\nParticles (N) = ${particles.toExponential(3)}\nFormula: n = m / M  and  N = n × Nₐ`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mole & Particle Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="mol-mass">Mass (g)</Label>
            <Input id="mol-mass" type="number" value={mass} onChange={(e) => setMass(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="mol-molar">Molar mass (g/mol)</Label>
            <Input id="mol-molar" type="number" value={molarMass} onChange={(e) => setMolarMass(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate}>Calculate Moles & Particles</Button>
        {result && (
          <pre className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-xs">{result}</pre>
        )}
        <p className="text-xs text-muted-foreground">Avogadro&rsquo;s number Nₐ = 6.022 × 10²³ mol⁻¹</p>
      </CardContent>
    </Card>
  );
}

function LimitingReagent() {
  const [equation] = useState("N₂ + 3H₂ → 2NH₃");
  const [coeffA, setCoeffA] = useState("1");
  const [coeffB, setCoeffB] = useState("3");
  const [molesA, setMolesA] = useState("2");
  const [molesB, setMolesB] = useState("2");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const a = parseFloat(coeffA);
    const b = parseFloat(coeffB);
    const nA = parseFloat(molesA);
    const nB = parseFloat(molesB);
    if (!a || !b || a <= 0 || b <= 0 || nA < 0 || nB < 0) {
      setResult("Please enter valid positive coefficients and non-negative moles.");
      return;
    }
    const limA = nA / a;
    const limB = nB / b;
    if (limA < limB) {
      const usedB = (nA / a) * b;
      setResult(
        `A (${nA} mol) / ${a} = ${limA.toFixed(3)}\nB (${nB} mol) / ${b} = ${limB.toFixed(3)}\n\nLimiting reagent: Reactant A is consumed first.\nB used = ${usedB.toFixed(3)} mol, B left = ${(nB - usedB).toFixed(3)} mol.`
      );
    } else {
      const usedA = (nB / b) * a;
      setResult(
        `A (${nA} mol) / ${a} = ${limA.toFixed(3)}\nB (${nB} mol) / ${b} = ${limB.toFixed(3)}\n\nLimiting reagent: Reactant B is consumed first.\nA used = ${usedA.toFixed(3)} mol, A left = ${(nA - usedA).toFixed(3)} mol.`
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Limiting Reagent Finder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border border-border bg-muted/40 p-2 text-center text-sm font-medium">{equation}</div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Reactant A coefficient</Label>
            <Input type="number" value={coeffA} onChange={(e) => setCoeffA(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Moles of A</Label>
            <Input type="number" value={molesA} onChange={(e) => setMolesA(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Reactant B coefficient</Label>
            <Input type="number" value={coeffB} onChange={(e) => setCoeffB(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Moles of B</Label>
            <Input type="number" value={molesB} onChange={(e) => setMolesB(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate}>Find Limiting Reagent</Button>
        {result && <pre className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-xs">{result}</pre>}
        <p className="text-xs text-muted-foreground">Divide each reactant&rsquo;s moles by its coefficient; the smaller ratio is the limiting reagent.</p>
      </CardContent>
    </Card>
  );
}

const COMMON_ELEMENTS: Record<string, number> = {
  H: 1.008, He: 4.003, C: 12.011, N: 14.007, O: 15.999, F: 18.998,
  Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
  Cl: 35.45, K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38,
  Ag: 107.87, Ba: 137.33, Au: 196.97,
};

function parseFormula(formula: string): { symbol: string; count: number }[] {
  const parts: { symbol: string; count: number }[] = [];
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(formula)) !== null) {
    const symbol = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    parts.push({ symbol, count });
  }
  return parts;
}

function PercentComposition() {
  const [formula, setFormula] = useState("H2O");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);
    const parts = parseFormula(formula.trim());
    if (parts.length === 0) {
      setError("Could not parse the formula. Use format like H2O, CO2, or CaCO3.");
      return;
    }
    let totalMass = 0;
    for (const p of parts) {
      const m = COMMON_ELEMENTS[p.symbol];
      if (!m) {
        setError(`Unknown element symbol "${p.symbol}". Supported: ${Object.keys(COMMON_ELEMENTS).join(", ")}`);
        return;
      }
      totalMass += m * p.count;
    }
    const lines = parts.map((p) => {
      const m = COMMON_ELEMENTS[p.symbol] * p.count;
      const pct = ((m / totalMass) * 100).toFixed(2);
      return `${p.symbol}${p.count > 1 ? p.count : ""}: ${pct}%  (${m.toFixed(3)} g/mol)`;
    });
    setResult(
      `Formula: ${formula.trim()}\nMolar mass: ${totalMass.toFixed(3)} g/mol\n\n${lines.join("\n")}`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Percent Composition Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="formula-input">Chemical formula</Label>
          <Input id="formula-input" placeholder="e.g. H2O, CO2, C6H12O6" value={formula} onChange={(e) => setFormula(e.target.value)} />
        </div>
        <Button onClick={calculate}>Calculate % Composition</Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {result && <pre className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-xs">{result}</pre>}
        <p className="text-xs text-muted-foreground">% element = (contribution to molar mass ÷ total molar mass) × 100.</p>
      </CardContent>
    </Card>
  );
}

export function ChemistryStoichiometry() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stoichiometry Lab</CardTitle>
        <p className="text-xs text-muted-foreground">Moles, percent composition, and limiting reagents</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mole" className="w-full">
          <TabsList className="flex-wrap">
            <TabsTrigger value="mole">Moles & Particles</TabsTrigger>
            <TabsTrigger value="composition">% Composition</TabsTrigger>
            <TabsTrigger value="limiting">Limiting Reagent</TabsTrigger>
          </TabsList>
          <TabsContent value="mole" className="mt-4">
            <MoleCalculator />
          </TabsContent>
          <TabsContent value="composition" className="mt-4">
            <PercentComposition />
          </TabsContent>
          <TabsContent value="limiting" className="mt-4">
            <LimitingReagent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
