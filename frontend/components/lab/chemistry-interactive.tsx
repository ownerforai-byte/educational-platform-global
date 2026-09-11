"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";


function PhCalculator() {
  const [mode, setMode] = useState<"acid" | "base">("acid");
  const [concentration, setConcentration] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    try {
      const c = parseFloat(concentration);
      if (isNaN(c) || c <= 0) throw new Error("Enter a valid positive concentration");

      let ph: number;
      if (mode === "acid") {
        ph = -Math.log10(c);
        if (ph > 7) throw new Error("Acid concentration too low — pH would be above 7");
        setResult(`pH = ${ph.toFixed(4)} (Acidic)`);
      } else {
        const poh = -Math.log10(c);
        ph = 14 - poh;
        if (ph < 7) throw new Error("Base concentration too low — pH would be below 7");
        setResult(`pH = ${ph.toFixed(4)} (Basic)`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
    }
  };

  const getPhColor = (ph: number) => {
    if (ph < 3) return "text-red-600";
    if (ph < 6) return "text-orange-600";
    if (ph === 7) return "text-green-600";
    if (ph < 11) return "text-blue-600";
    return "text-purple-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>pH Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="pH Input Options">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Type:</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acid">Acid (H⁺)</SelectItem>
                <SelectItem value="base">Base (OH⁻)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="concentration">Concentration (mol/L)</Label>
            <Input id="concentration" type="number" step="0.0001" placeholder="e.g. 0.01" value={concentration} onChange={(e) => setConcentration(e.target.value)} />
          </div>

          <Button onClick={calculate} className="w-full">Calculate pH</Button>
        </CollapsibleControls>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {result && <p className={`text-sm font-medium ${getPhColor(parseFloat(result.split("=")[1]?.split(" ")[0] || "7"))}`}>{result}</p>}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">pH Scale</p>
          <div className="flex h-4 rounded overflow-hidden">
            <div className="flex-1 bg-red-500" />
            <div className="flex-1 bg-orange-500" />
            <div className="flex-1 bg-yellow-500" />
            <div className="flex-1 bg-green-500" />
            <div className="flex-1 bg-blue-500" />
            <div className="flex-1 bg-purple-500" />
          </div>
          <div className="flex justify-between mt-1">
            <span>0</span>
            <span>7</span>
            <span>14</span>
          </div>
          <p className="mt-2">pH = -log₁₀[H⁺]. Acids have pH &lt; 7, bases have pH &gt; 7, neutral is pH = 7.</p>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">The pH scale is logarithmic: pH 3 is 10× more acidic than pH 4, and 100× more acidic than pH 5. Strong acids give low pH; strong bases give high pH.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Each unit change in pH represents a tenfold change in [H⁺]. Neutral water at 25 °C has [H⁺] = 10⁻⁷ M (pH 7). pH + pOH = 14.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Blood pH (~7.4), stomach acid (~1.5–3.5), and soil pH all affect biological and chemical systems. Small pH shifts can denature proteins or kill crops.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TitrationSimulator() {
  const [acidMolarity, setAcidMolarity] = useState(0.1);
  const [acidVolume, setAcidVolume] = useState(25);
  const [baseMolarity, setBaseMolarity] = useState(0.1);
  const [baseVolume, setBaseVolume] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const molesAcid = acidMolarity * (acidVolume / 1000);
    const molesBase = baseMolarity * (baseVolume / 1000);
    const totalVolume = (acidVolume + baseVolume) / 1000;

    if (totalVolume === 0) {
      setResult("Enter base volume to see results");
      return;
    }

    const excessAcid = molesAcid - molesBase;
    const excessMoles = Math.abs(excessAcid);
    const concentration = excessMoles / totalVolume;

    let ph: number;
    if (excessAcid > 0) {
      ph = -Math.log10(concentration);
      setResult(`Excess acid: ${excessMoles.toFixed(6)} mol → pH ≈ ${ph.toFixed(2)}`);
    } else if (excessAcid < 0) {
      const poh = -Math.log10(concentration);
      ph = 14 - poh;
      setResult(`Excess base: ${excessMoles.toFixed(6)} mol → pH ≈ ${ph.toFixed(2)}`);
    } else {
      setResult("Equivalence point reached! pH ≈ 7 (neutral)");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Titration Simulator (Strong Acid + Strong Base)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Titration Parameters">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="acidMolarity">Acid Molarity (M)</Label>
              <Input id="acidMolarity" type="number" step="0.01" value={acidMolarity} onChange={(e) => setAcidMolarity(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acidVolume">Acid Volume (mL)</Label>
              <Input id="acidVolume" type="number" step="1" value={acidVolume} onChange={(e) => setAcidVolume(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseMolarity">Base Molarity (M)</Label>
              <Input id="baseMolarity" type="number" step="0.01" value={baseMolarity} onChange={(e) => setBaseMolarity(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseVolume">Base Volume Added (mL)</Label>
              <Input id="baseVolume" type="number" step="1" value={baseVolume} onChange={(e) => setBaseVolume(Number(e.target.value))} />
            </div>
          </div>

          <Button onClick={calculate} className="w-full">Simulate Titration</Button>
        </CollapsibleControls>

        {result && <p className="text-sm font-medium text-green-600">{result}</p>}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Formula: M₁V₁ = M₂V₂ (at equivalence)</p>
          <p>Simulates strong acid-strong base titration. Enter acid properties and base volume added to calculate resulting pH.</p>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">As base is added, pH rises slowly at first, then jumps sharply near the equivalence point, then levels off. The jump is the “steep” part of the titration curve.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">At equivalence, moles acid = moles base. For strong acid + strong base, pH = 7. Before equivalence, pH is set by excess acid; after, by excess base.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Titration determines unknown concentrations in pharmaceuticals, water quality, and food chemistry. The equivalence point is the analytical target.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ConcentrationCalculator() {
  const [mode, setMode] = useState<"molarity" | "dilution">("molarity");
  const [moles, setMoles] = useState("");
  const [volume, setVolume] = useState("");
  const [m1, setM1] = useState("");
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);

    try {
      if (mode === "molarity") {
        const n = parseFloat(moles);
        const v = parseFloat(volume);
        if (isNaN(n) || isNaN(v) || v <= 0) throw new Error("Enter valid moles and volume");
        const m = n / (v / 1000);
        setResult(`Molarity = ${m.toFixed(4)} mol/L`);
      } else {
        const m1Val = parseFloat(m1);
        const v1Val = parseFloat(v1);
        const v2Val = parseFloat(v2);
        if (isNaN(m1Val) || isNaN(v1Val) || isNaN(v2Val) || v2Val <= 0) throw new Error("Enter valid values");
        const m2 = (m1Val * v1Val) / v2Val;
        setResult(`M₂ = ${m2.toFixed(4)} mol/L`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Concentration Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Concentration Inputs">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Mode:</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="molarity">Molarity (M = n/V)</SelectItem>
                <SelectItem value="dilution">Dilution (M₁V₁ = M₂V₂)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mode === "molarity" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="moles">Moles of solute (mol)</Label>
                <Input id="moles" type="number" step="0.001" value={moles} onChange={(e) => setMoles(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Volume of solution (mL)</Label>
                <Input id="volume" type="number" step="1" value={volume} onChange={(e) => setVolume(e.target.value)} />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="m1">Initial Molarity (M₁)</Label>
                <Input id="m1" type="number" step="0.01" value={m1} onChange={(e) => setM1(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v1">Initial Volume (V₁ mL)</Label>
                <Input id="v1" type="number" step="1" value={v1} onChange={(e) => setV1(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="v2">Final Volume (V₂ mL)</Label>
                <Input id="v2" type="number" step="1" value={v2} onChange={(e) => setV2(e.target.value)} />
              </div>
            </div>
          )}

          <Button onClick={calculate} className="w-full">Calculate</Button>
        </CollapsibleControls>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {result && <p className="text-sm font-medium text-green-600">{result}</p>}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Molarity = Moles / Volume(L)</p>
          <p>Dilution equation: M₁V₁ = M₂V₂. Used to calculate concentration after dilution or mixing.</p>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Molarity is moles per liter. Dilution keeps solute constant while increasing volume, so M₁V₁ = M₂V₂. The more you dilute, the lower the molarity.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Concentration and volume are inversely proportional during dilution. To halve molarity, you must double the final volume.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Preparing lab reagents, IV drips, and chemical process feeds all depend on exact molarity. A dilution mistake can ruin an experiment or harm a patient.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function MolarMassCalculator() {
  const [formula, setFormula] = useState("H2O");
  const [result, setResult] = useState<string | null>(null);

  const ATOMIC_MASSES: Record<string, number> = {
    H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
    F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
    Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38,
    Ag: 107.87, Ba: 137.33, I: 126.90, Pb: 207.2,
  };

  const calculate = () => {
    const matches = formula.match(/([A-Z][a-z]?)(\d*)/g) || [];
    let totalMass = 0;
    const breakdown: string[] = [];
    for (const match of matches) {
      const elementMatch = match.match(/([A-Z][a-z]?)(\d*)/);
      if (!elementMatch) continue;
      const element = elementMatch[1];
      const count = elementMatch[2] ? parseInt(elementMatch[2]) : 1;
      const mass = ATOMIC_MASSES[element];
      if (mass) {
        totalMass += mass * count;
        breakdown.push(`${element}${elementMatch[2] || ""}: ${(mass * count).toFixed(3)} g/mol`);
      }
    }
    setResult(`Molar Mass of ${formula} = ${totalMass.toFixed(3)} g/mol\n\nBreakdown:\n${breakdown.join("\n")}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Molar Mass Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Formula Input">
          <div className="space-y-2">
            <Label htmlFor="formula">Chemical Formula</Label>
            <Input id="formula" value={formula} onChange={(e) => setFormula(e.target.value)} placeholder="e.g. H2O, CO2, NaCl" />
          </div>

          <Button onClick={calculate} className="w-full">Calculate Molar Mass</Button>
        </CollapsibleControls>

        {result && <pre className="text-sm font-medium text-green-600 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-3">{result}</pre>}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Common elements: H, C, N, O, Na, Cl, Fe, Cu, etc.</p>
          <p>Enter a chemical formula like H2O, CO2, NaCl. Subscripts are automatically parsed.</p>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Each element contributes its atomic mass multiplied by its subscript. The sum is the molar mass in g/mol.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Molar mass is the bridge between mass and moles. 1 mole of any substance contains the same number of entities (6.022 × 10²³), but different substances have different masses per mole.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Stoichiometry, solution preparation, and yield calculations all require molar mass. Without it, you cannot convert between grams and moles.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function GasLawsCalculator() {
  const [mode, setMode] = useState<"combined" | "boyle" | "charles" | "ideal">("combined");
  const [p1, setP1] = useState("");
  const [v1, setV1] = useState("");
  const [t1, setT1] = useState("");
  const [p2, setP2] = useState("");
  const [v2, setV2] = useState("");
  const [t2, setT2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const toKelvin = (celsius: string) => {
    const c = parseFloat(celsius);
    return isNaN(c) ? NaN : c + 273.15;
  };

  const calculate = () => {
    setResult(null);
    try {
      if (mode === "combined") {
        const P1 = parseFloat(p1), V1 = parseFloat(v1), T1 = toKelvin(t1);
        const P2 = parseFloat(p2), V2 = parseFloat(v2), T2 = toKelvin(t2);
        if ([P1, V1, T1, P2, V2, T2].some(isNaN)) throw new Error("Fill all fields");
        const missing = [P2, V2, T2].filter(isNaN).length;
        if (missing > 1) throw new Error("Leave only ONE field empty to solve");
        if (P1 <= 0 || V1 <= 0 || T1 <= 0) throw new Error("P1, V1, T1 must be positive");
        if (!isNaN(P2) && P2 < 0) throw new Error("Pressure cannot be negative");
        if (!isNaN(V2) && V2 < 0) throw new Error("Volume cannot be negative");
        if (!isNaN(T2) && T2 <= 0) throw new Error("Temperature must be in Kelvin (must be > 0)");

        if (isNaN(P2)) { const val = (P1 * V1 * T2) / (V2 * T1); setResult(`P₂ = ${val.toFixed(4)} (units)`); }
        else if (isNaN(V2)) { const val = (P1 * V1 * T2) / (P2 * T1); setResult(`V₂ = ${val.toFixed(4)} (units)`); }
        else { const val = (P2 * V2 * T1) / (P1 * V1); setResult(`T₂ = ${val.toFixed(2)} K = ${(val - 273.15).toFixed(2)} °C`); }
      } else if (mode === "boyle") {
        const P1 = parseFloat(p1), V1 = parseFloat(v1), P2 = parseFloat(p2), V2 = parseFloat(v2);
        if ([P1, V1, P2, V2].some(isNaN)) throw new Error("Fill all fields");
        if ([P1, V1, P2, V2].some((v) => v <= 0)) throw new Error("Values must be positive");
        const missing = [P2, V2].filter(isNaN).length;
        if (missing > 1) throw new Error("Leave only ONE field empty");
        if (isNaN(P2)) { const val = (P1 * V1) / V2; setResult(`P₂ = ${val.toFixed(4)} (P₁V₁ = P₂V₂)`); }
        else { const val = (P1 * V1) / P2; setResult(`V₂ = ${val.toFixed(4)} (P₁V₁ = P₂V₂)`); }
      } else if (mode === "charles") {
        const V1 = parseFloat(v1), T1 = toKelvin(t1), V2 = parseFloat(v2), T2 = toKelvin(t2);
        if ([V1, T1, V2, T2].some(isNaN)) throw new Error("Fill all fields");
        if ([V1, T1, V2, T2].some((v) => v <= 0)) throw new Error("Values must be positive");
        const missing = [V2, T2].filter(isNaN).length;
        if (missing > 1) throw new Error("Leave only ONE field empty");
        if (isNaN(V2)) { const val = (V1 * T2) / T1; setResult(`V₂ = ${val.toFixed(4)} (V₁/T₁ = V₂/T₂)`); }
        else { const val = (V1 * T2) / V2; setResult(`T₂ = ${val.toFixed(2)} K = ${(val - 273.15).toFixed(2)} °C (V₁/T₁ = V₂/T₂)`); }
      } else {
        const P = parseFloat(p1), V = parseFloat(v1), T = toKelvin(t1);
        const n = parseFloat(p2);
        if ([P, V, T, n].some(isNaN)) throw new Error("Fill all fields");
        if ([P, V, T, n].some((v) => v <= 0)) throw new Error("Values must be positive");
        const missing = [P, V, T, n].filter(isNaN).length;
        if (missing > 1) throw new Error("Leave only ONE field empty");
        const R = 0.0821;
        if (isNaN(P)) { const val = (n * R * T) / V; setResult(`P = ${val.toFixed(4)} atm`); }
        else if (isNaN(V)) { const val = (n * R * T) / P; setResult(`V = ${val.toFixed(4)} L`); }
        else if (isNaN(T)) { const val = (P * V) / (n * R); setResult(`T = ${val.toFixed(2)} K = ${(val - 273.15).toFixed(2)} °C`); }
        else { const val = (P * V) / (R * T); setResult(`n = ${val.toFixed(4)} mol`); }
      }
    } catch (err) {
      setResult(err instanceof Error ? err.message : "Error");
    }
  };

  const labels: Record<string, { p1: string; v1: string; t1: string; p2: string; v2: string; t2: string }> = {
    combined: { p1: "P₁", v1: "V₁", t1: "T₁ (°C)", p2: "P₂", v2: "V₂", t2: "T₂ (°C)" },
    boyle: { p1: "P₁", v1: "V₁", p2: "P₂", v2: "V₂", t1: "", t2: "" },
    charles: { v1: "V₁", t1: "T₁ (°C)", v2: "V₂", t2: "T₂ (°C)", p1: "", p2: "" },
    ideal: { p1: "P (atm)", v1: "V (L)", t1: "T (°C)", p2: "n (mol)", v2: "", t2: "" },
  };

  const lbl = labels[mode];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gas Laws Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Gas Law Inputs">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Law:</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="combined">Combined Gas Law</SelectItem>
                <SelectItem value="boyle">Boyle&apos;s (P₁V₁ = P₂V₂)</SelectItem>
                <SelectItem value="charles">Charles&apos;s (V₁/T₁ = V₂/T₂)</SelectItem>
                <SelectItem value="ideal">Ideal Gas (PV = nRT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {lbl.p1 && (
              <div className="space-y-2">
                <Label htmlFor="p1">{lbl.p1}</Label>
                <Input id="p1" value={p1} onChange={(e) => setP1(e.target.value)} placeholder={lbl.p1} />
              </div>
            )}
            {lbl.v1 && (
              <div className="space-y-2">
                <Label htmlFor="v1">{lbl.v1}</Label>
                <Input id="v1" value={v1} onChange={(e) => setV1(e.target.value)} placeholder={lbl.v1} />
              </div>
            )}
            {lbl.t1 && (
              <div className="space-y-2">
                <Label htmlFor="t1">{lbl.t1}</Label>
                <Input id="t1" value={t1} onChange={(e) => setT1(e.target.value)} placeholder={lbl.t1} />
              </div>
            )}
            {lbl.p2 && (
              <div className="space-y-2">
                <Label htmlFor="p2">{lbl.p2}</Label>
                <Input id="p2" value={p2} onChange={(e) => setP2(e.target.value)} placeholder={lbl.p2} />
              </div>
            )}
            {lbl.v2 && (
              <div className="space-y-2">
                <Label htmlFor="v2">{lbl.v2}</Label>
                <Input id="v2" value={v2} onChange={(e) => setV2(e.target.value)} placeholder={lbl.v2} />
              </div>
            )}
            {lbl.t2 && (
              <div className="space-y-2">
                <Label htmlFor="t2">{lbl.t2}</Label>
                <Input id="t2" value={t2} onChange={(e) => setT2(e.target.value)} placeholder={lbl.t2} />
              </div>
            )}
          </div>

          <Button onClick={calculate} className="w-full">Calculate</Button>
        </CollapsibleControls>

        {result && <pre className="text-sm font-medium text-green-600 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-3">{result}</pre>}

        <div className="rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Gas Laws:</p>
          <p>Boyle: P₁V₁ = P₂V₂ (T constant) | Charles: V₁/T₁ = V₂/T₂ (P constant) | Ideal: PV = nRT</p>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">Compressing a gas (reducing V) raises P if T is constant (Boyle). Heating a gas at constant pressure expands it (Charles). The ideal gas law combines both with amount of substance n.</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">Pressure × volume is constant at fixed T. Volume is directly proportional to absolute temperature at fixed P. Real gases deviate at high P / low T; ideal gas is an approximation.</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">Gas laws predict weather behavior, engine efficiency, scuba tank safety, and cryogenic storage. They are the starting point for thermodynamics.</p>
        </div>
      </CardContent>
    </Card>
  );
}

export interface ChemistryInteractiveProps {
  defaultTab?: string;
}

export function ChemistryInteractive({ defaultTab = "ph" }: ChemistryInteractiveProps = {}) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="ph">pH Calculator</TabsTrigger>
        <TabsTrigger value="titration">Titration</TabsTrigger>
        <TabsTrigger value="concentration">Concentration</TabsTrigger>
        <TabsTrigger value="molarmass">Molar Mass</TabsTrigger>
        <TabsTrigger value="gaslaws">Gas Laws</TabsTrigger>
      </TabsList>
      <TabsContent value="ph" className="mt-4">
        <PhCalculator />
      </TabsContent>
      <TabsContent value="titration" className="mt-4">
        <TitrationSimulator />
      </TabsContent>
      <TabsContent value="concentration" className="mt-4">
        <ConcentrationCalculator />
      </TabsContent>
      <TabsContent value="molarmass" className="mt-4">
        <MolarMassCalculator />
      </TabsContent>
      <TabsContent value="gaslaws" className="mt-4">
        <GasLawsCalculator />
      </TabsContent>
    </Tabs>
  );
}
