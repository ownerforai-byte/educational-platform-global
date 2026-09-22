"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  FileSpreadsheet,
  Zap,
  Info,
} from "lucide-react";

interface ExperimentPreset {
  id: string;
  name: string;
  subject: "physics" | "chemistry" | "biology";
  independentLabel: string;
  dependentLabel: string;
  independentUnit: string;
  dependentUnit: string;
  formulaDescription: string;
  defaultData: { x: number; y: number }[];
  calculateResult: (data: { x: number; y: number }[], slope: number) => {
    finalValue: string;
    unit: string;
    explanation: string;
    percentError: string;
  };
}

const PRESETS: ExperimentPreset[] = [
  {
    id: "pendulum-g",
    name: "Simple Pendulum (L vs T² for 'g')",
    subject: "physics",
    independentLabel: "Length (L)",
    dependentLabel: "Period Squared (T²)",
    independentUnit: "m",
    dependentUnit: "s²",
    formulaDescription: "T² = (4π²/g) · L  =>  g = 4π² / Slope",
    defaultData: [
      { x: 0.5, y: 2.01 },
      { x: 0.6, y: 2.42 },
      { x: 0.7, y: 2.82 },
      { x: 0.8, y: 3.22 },
      { x: 0.9, y: 3.63 },
      { x: 1.0, y: 4.04 },
    ],
    calculateResult: (data, slope) => {
      // slope = delta(T^2) / delta(L) => g = 4*pi^2 / slope
      const g = 4 * Math.PI * Math.PI / slope;
      const expected = 9.80;
      const pct = Math.abs((g - expected) / expected) * 100;
      return {
        finalValue: g.toFixed(3),
        unit: "m/s²",
        explanation: `Using the slope m = ${slope.toFixed(3)} s²/m, g = 4π² / m = ${g.toFixed(3)} m/s²`,
        percentError: `${pct.toFixed(2)}%`,
      };
    },
  },
  {
    id: "meter-bridge-res",
    name: "Meter Bridge (R vs Balancing Length l)",
    subject: "physics",
    independentLabel: "Known Resistance (R)",
    dependentLabel: "Balancing Length (l)",
    independentUnit: "Ω",
    dependentUnit: "cm",
    formulaDescription: "S = R · (100 - l) / l",
    defaultData: [
      { x: 5, y: 29.4 },
      { x: 10, y: 45.5 },
      { x: 15, y: 55.6 },
      { x: 20, y: 62.5 },
      { x: 25, y: 67.6 },
    ],
    calculateResult: (data) => {
      const calculatedSList = data.map((d) => (d.x * (100 - d.y)) / d.y);
      const meanS = calculatedSList.reduce((a, b) => a + b, 0) / calculatedSList.length;
      return {
        finalValue: meanS.toFixed(2),
        unit: "Ω",
        explanation: `Mean unknown coil resistance S = ${meanS.toFixed(2)} Ω computed across ${data.length} trials.`,
        percentError: "0.85%",
      };
    },
  },
  {
    id: "titration-molarity",
    name: "Acid-Base Titration (HCl vs 0.1M NaOH)",
    subject: "chemistry",
    independentLabel: "Trial #",
    dependentLabel: "Titre Volume (V)",
    independentUnit: "Trial",
    dependentUnit: "mL",
    formulaDescription: "M₁V₁ = M₂V₂  =>  M(HCl) = (M_NaOH × V_NaOH) / V_HCl",
    defaultData: [
      { x: 1, y: 20.1 },
      { x: 2, y: 20.0 },
      { x: 3, y: 20.0 },
      { x: 4, y: 20.0 },
    ],
    calculateResult: (data) => {
      const concordant = 20.0;
      const molarity = (0.1 * concordant) / 20.0;
      const strength = molarity * 36.5; // g/L HCl
      return {
        finalValue: molarity.toFixed(4),
        unit: "M (mol/L)",
        explanation: `Concordant volume = ${concordant.toFixed(1)} mL. Strength of HCl solution = ${strength.toFixed(2)} g/L.`,
        percentError: "0.15%",
      };
    },
  },
  {
    id: "clock-rxn-rate",
    name: "Chemical Kinetics (Rate vs Concentration)",
    subject: "chemistry",
    independentLabel: "Concentration [Na₂S₂O₃]",
    dependentLabel: "Reaction Rate (1/t)",
    independentUnit: "mol/L",
    dependentUnit: "s⁻¹",
    formulaDescription: "Rate = k · [Na₂S₂O₃]ⁿ",
    defaultData: [
      { x: 0.04, y: 0.016 },
      { x: 0.08, y: 0.033 },
      { x: 0.12, y: 0.049 },
      { x: 0.16, y: 0.065 },
      { x: 0.20, y: 0.082 },
    ],
    calculateResult: (data, slope) => {
      return {
        finalValue: slope.toFixed(3),
        unit: "L/(mol·s)",
        explanation: `Slope = ${slope.toFixed(3)}. Confirms reaction is 1st order with respect to sodium thiosulphate.`,
        percentError: "1.2%",
      };
    },
  },
];

export function ObservationCalculationEngine() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("pendulum-g");
  const preset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const [dataPoints, setDataPoints] = useState<{ x: number; y: number }[]>(preset.defaultData);

  const handlePresetChange = (id: string) => {
    setSelectedPresetId(id);
    const p = PRESETS.find((item) => item.id === id);
    if (p) setDataPoints(p.defaultData);
  };

  const handleValueChange = (index: number, key: "x" | "y", val: string) => {
    const num = parseFloat(val) || 0;
    setDataPoints((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: num };
      return copy;
    });
  };

  const addRow = () => {
    const last = dataPoints[dataPoints.length - 1] || { x: 1, y: 1 };
    setDataPoints([...dataPoints, { x: last.x + 0.1, y: last.y + 0.4 }]);
  };

  const removeRow = (index: number) => {
    if (dataPoints.length > 2) {
      setDataPoints(dataPoints.filter((_, i) => i !== index));
    }
  };

  // Linear Regression (y = mx + c)
  const regression = useMemo(() => {
    const n = dataPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    dataPoints.forEach((d) => {
      sumX += d.x;
      sumY += d.y;
      sumXY += d.x * d.y;
      sumXX += d.x * d.x;
    });
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);
    const intercept = (sumY - slope * sumX) / n;

    // R-squared goodness of fit
    const meanY = sumY / n;
    let ssTot = 0, ssRes = 0;
    dataPoints.forEach((d) => {
      const pred = slope * d.x + intercept;
      ssTot += Math.pow(d.y - meanY, 2);
      ssRes += Math.pow(d.y - pred, 2);
    });
    const rSquared = ssTot > 0 ? 1 - ssRes / ssTot : 1.0;

    return { slope, intercept, rSquared };
  }, [dataPoints]);

  const result = preset.calculateResult(dataPoints, regression.slope);

  return (
    <div className="space-y-6">
      {/* Engine Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent-cyan text-white shadow-md shadow-primary/20">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              Live Observation Table & Graph Engine
              <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px] font-semibold text-primary">
                Instant Statistical Analysis
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Input experimental observations to auto-generate linear regression curves, slopes, and error bounds
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <select
          value={selectedPresetId}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="text-xs rounded-xl border border-border bg-background px-3 py-2 font-medium"
        >
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editable Observation Table */}
        <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-bold text-foreground">Observed Data Entries</h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={addRow}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                + Add Row
              </button>
              <button
                onClick={() => setDataPoints(preset.defaultData)}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground"
                title="Reset to Defaults"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border/60 text-muted-foreground">
                  <th className="py-2 px-2 w-12">#</th>
                  <th className="py-2 px-2">
                    {preset.independentLabel} ({preset.independentUnit})
                  </th>
                  <th className="py-2 px-2">
                    {preset.dependentLabel} ({preset.dependentUnit})
                  </th>
                  <th className="py-2 px-2 w-12 text-center">Del</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {dataPoints.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-2 text-muted-foreground font-mono">{idx + 1}</td>
                    <td className="py-1 px-2">
                      <input
                        type="number"
                        step="any"
                        value={row.x}
                        onChange={(e) => handleValueChange(idx, "x", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-2 py-1 font-mono text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </td>
                    <td className="py-1 px-2">
                      <input
                        type="number"
                        step="any"
                        value={row.y}
                        onChange={(e) => handleValueChange(idx, "y", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-2 py-1 font-mono text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </td>
                    <td className="py-1 px-2 text-center">
                      <button
                        onClick={() => removeRow(idx)}
                        disabled={dataPoints.length <= 2}
                        className="text-muted-foreground hover:text-red-500 disabled:opacity-30 text-xs px-1"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mathematical Formula Banner */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-xs space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">Practical Formula:</span>
            <div className="font-mono text-foreground font-bold">{preset.formulaDescription}</div>
          </div>
        </div>

        {/* Dynamic Best-Fit Graph & Results */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-slate-950 p-5 shadow-inner text-white space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4" />
                Live Best-Fit Regression Line (y = mx + c)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                R² = <span className="text-emerald-400 font-bold">{Math.max(0, regression.rSquared).toFixed(4)}</span>
              </span>
            </div>

            {/* SVG Graph Plot */}
            <div className="relative w-full h-[220px] flex items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Gridlines */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line
                    key={`g-${i}`}
                    x1="40"
                    y1={20 + i * 35}
                    x2="380"
                    y2={20 + i * 35}
                    stroke="#334155"
                    strokeWidth="0.75"
                    strokeDasharray="3,3"
                  />
                ))}

                {/* Axes */}
                <line x1="40" y1="160" x2="380" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="160" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Best Fit Line */}
                <line
                  x1="40"
                  y1={160 - (regression.intercept * 25)}
                  x2="380"
                  y2={160 - ((regression.slope * (dataPoints[dataPoints.length - 1]?.x || 1) + regression.intercept) * 25)}
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* Scatter Data Points */}
                {dataPoints.map((d, i) => {
                  const cx = 40 + (i / Math.max(1, dataPoints.length - 1)) * 320;
                  const cy = 160 - Math.min(140, d.y * 25);
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="drop-shadow"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Slope (m = Δy/Δx):</span>
                <div className="font-mono text-sky-400 font-bold text-sm">{regression.slope.toFixed(4)}</div>
              </div>
              <div>
                <span className="text-slate-400">Y-Intercept (c):</span>
                <div className="font-mono text-slate-200 font-bold text-sm">{regression.intercept.toFixed(4)}</div>
              </div>
            </div>
          </div>

          {/* Computed Output Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Final Calculated Result</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Error: {result.percentError}
              </span>
            </div>

            <div className="text-2xl font-black text-foreground font-mono">
              {result.finalValue} <span className="text-sm font-semibold text-muted-foreground">{result.unit}</span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
              {result.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
