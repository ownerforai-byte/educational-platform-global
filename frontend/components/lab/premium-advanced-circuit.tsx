"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { LabCard } from "@/components/lab/lab-card";
import { LabInput } from "@/components/lab/lab-input";
import { LabResult } from "@/components/lab/lab-result";
import { CircuitBoard, RotateCcw, Zap } from "lucide-react";

/**
 * Advanced Circuit Simulator — a premium lab.
 *
 * Live interactive DC + RC simulation, no "Calculate" button — everything
 * recomputes as you type. Includes an animated SVG charge/discharge curve.
 *   1. Series / Parallel analyzer  → R_eq, I, P + per-resistor breakdown
 *   2. RC charging / discharging   → τ = RC, animated Vc(t) curve + slider
 *   3. RC time table               → Vc / Vr / I at 0 … 5τ
 *
 * Physics:
 *   Series :   R_eq = R₁ + R₂ + … ,   I = V/R_eq  (same I, V splits)
 *   Parallel : 1/R_eq = Σ 1/R,  V same, I splits
 *   Charge :   Vc(t) = V·(1 − e^(−t/RC)) ,  I(t) = (V/R)·e^(−t/RC)
 *   Discharge: Vc(t) = V·e^(−t/RC)
 */

interface Resistor {
  r: number;
  current: number;
  voltage: number;
  power: number;
}

function parseResistors(str: string): number[] {
  return str
    .split(/[,;\s]+/)
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);
}

function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 1e-12) return "0";
  return String(Number(n.toPrecision(digits + 2)));
}

function suffixVal(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1e12) return `${fmt(n / 1e12)}T`;
  if (abs >= 1e9) return `${fmt(n / 1e9)}G`;
  if (abs >= 1e6) return `${fmt(n / 1e6)}M`;
  if (abs >= 1e3) return `${fmt(n / 1e3)}k`;
  if (abs >= 1) return fmt(n);
  if (abs >= 1e-3) return `${fmt(n * 1e3)}m`;
  if (abs >= 1e-6) return `${fmt(n * 1e6)}µ`;
  return fmt(n);
}

function formattedPower(resistors: Resistor[]): string {
  const total = resistors.reduce((a, d) => a + d.power, 0);
  return `${suffixVal(total)} W`;
}

function formattedTime(sec: number): string {
  if (!Number.isFinite(sec)) return "—";
  if (Math.abs(sec) >= 1) return `${fmt(sec)} s`;
  if (Math.abs(sec) >= 1e-3) return `${fmt(sec * 1e3)} ms`;
  if (Math.abs(sec) >= 1e-6) return `${fmt(sec * 1e6)} µs`;
  return `${fmt(sec)} s`;
}

function formattedCharge(coulomb: number): string {
  return `${suffixVal(coulomb)} C`;
}

/* --------------------- SVG building blocks ----------------------- */

function ResistorGlyph({ x, y, label }: { x: number; y: number; label?: string }) {
  const d = `M ${x - 10} ${y} l 4 0 l 2 -5 l 4 5 l 4 -5 l 4 5 l 4 -5 l 4 5 l 2 -5 l 4 0`;
  return (
    <g>
      <path d={d} fill="none" stroke="currentColor" strokeWidth={1.6} />
      {label ? (
        <text x={x} y={y + 18} textAnchor="middle" fontSize={9} fill="currentColor" style={{ opacity: 0.85 }}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function ResistorGlyphRot({ x, y }: { x: number; y: number }) {
  const d = `M ${x} ${y - 10} l 0 4 l 5 -2 l -5 4 l 5 4 l -5 4 l 5 4 l -5 4 l 0 2 l 0 4`;
  return <path d={d} fill="none" stroke="currentColor" strokeWidth={1.6} />;
}

function SeriesDiagram({ resistances, current: _current }: { resistances: number[]; current: number }) {
  const n = resistances.length;
  const W = 320;
  const H = 110;
  const x0 = 40;
  const span = W - x0 - 30;
  const gap = span / n;
  const centers = resistances.map((_, i) => x0 + gap * (i + 0.5));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto text-foreground" role="img" aria-label="Series circuit diagram">
      <g stroke="currentColor" strokeWidth={1.6} fill="none">
        <line x1={16} y1={30} x2={16} y2={44} />
        <line x1={11} y1={44} x2={21} y2={44} />
        <line x1={13} y1={50} x2={19} y2={50} />
        <line x1={16} y1={50} x2={16} y2={92} />
        <text x={9} y={28} fontSize={10} fill="currentColor">
          V
        </text>
        {/* top conductor from battery to first resistor */}
        <line x1={30} y1={60} x2={centers[0] - 10} y2={60} />
        {/* bottom rail back to battery */}
        <line x1={x0} y1={90} x2={W - 20} y2={90} />
        <line x1={W - 20} y1={60} x2={W - 20} y2={90} />
        <line x1={centers[n - 1] + 10} y1={60} x2={W - 20} y2={60} />
        {/* connectors from top rail to bottom rail at each resistor */}
        {centers.map((cx, i) => (
          <g key={i}>
            <line x1={cx} y1={60} x2={cx} y2={44} />
            <ResistorGlyph x={cx} y={40} label={`R${i + 1}=${resistances[i]}Ω`} />
          </g>
        ))}
      </g>
    </svg>
  );
}

function ParallelDiagram({ resistances, voltage }: { resistances: number[]; voltage: number }) {
  const n = resistances.length;
  const W = 320;
  const H = 40 + n * 40 + 22;
  const x0 = 34;
  const xEnd = W - 26;
  const centers = n === 1 ? [W / 2] : resistances.map((_, i) => x0 + ((xEnd - x0) * i) / (n - 1));
  const topY = 22;
  const botY = H - 12;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto text-foreground" role="img" aria-label="Parallel circuit diagram">
      <g stroke="currentColor" strokeWidth={1.6} fill="none">
        <line x1={x0} y1={topY} x2={xEnd} y2={topY} />
        <line x1={x0} y1={botY} x2={xEnd} y2={botY} />
        {/* battery on left rails */}
        <line x1={16} y1={topY} x2={16} y2={botY} />
        <line x1={11} y1={topY} x2={11} y2={botY} />
        <text x={9} y={(topY + botY) / 2} fontSize={10} fill="currentColor">
          V
        </text>
        {centers.map((cx, i) => {
          const mid = (topY + botY) / 2;
          return (
            <g key={i}>
              <line x1={cx} y1={topY} x2={cx} y2={mid - 11} />
              <ResistorGlyphRot x={cx} y={mid} />
              <line x1={cx} y1={mid + 11} x2={cx} y2={botY} />
              <text x={cx} y={H - 2} fontSize={9} fill="currentColor" textAnchor="middle">
                R{i + 1}={resistances[i]}Ω · {fmt(voltage / resistances[i])}A
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function RcCurve({
  vMax,
  tau,
  tauMultiplier,
  charge,
}: {
  vMax: number;
  tau: number;
  tauMultiplier: number;
  charge: boolean;
}) {
  const W = 360;
  const H = 210;
  const padL = 30;
  const padR = 12;
  const padT = 16;
  const padB = 26;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const tMax = Math.max(6 * tau, 1e-9);

  const fn = (t: number) => (charge ? vMax * (1 - Math.exp(-t / tau)) : vMax * Math.exp(-t / tau));
  const x = (t: number) => padL + (t / tMax) * plotW;
  const y = (v: number) => padT + plotH - (v / vMax) * plotH;

  const pts: string[] = [];
  const steps = 90;
  for (let i = 0; i <= steps; i++) {
    const t = (tMax * i) / steps;
    pts.push(`${x(t).toFixed(2)},${y(fn(t)).toFixed(2)}`);
  }

  const k = Math.min(Math.max(tauMultiplier, 0), 5);
  const markerX = x(k * tau);
  const markerY = y(fn(k * tau));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="RC voltage curve">
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="currentColor" strokeWidth={1.4} className="text-muted-foreground" />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="currentColor" strokeWidth={1.4} className="text-muted-foreground" />
      <text x={padL} y={padT - 5} fontSize={10} className="fill-muted-foreground">
        {charge ? "Vc = V·(1 − e^(−t/τ))" : "Vc = V·e^(−t/τ)"}
      </text>
      <text x={W - padR} y={H - 6} fontSize={9} textAnchor="end" className="fill-muted-foreground">
        t (τ)
      </text>
      {[1, 2, 3, 4, 5].map((kk) => (
        <line key={kk} x1={x(kk * tau)} y1={padT} x2={x(kk * tau)} y2={H - padB} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3 3" className="text-muted-foreground/50" />
      ))}
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth={2.2} className="text-primary" />
      {charge && (
        <line x1={padL} y1={y(vMax)} x2={W - padR} y2={y(vMax)} stroke="currentColor" strokeWidth={1} strokeDasharray="4 3" className="text-destructive/60" />
      )}
      <line x1={markerX} y1={padT} x2={markerX} y2={H - padB} stroke="currentColor" strokeWidth={1.2} className="text-amber-500" />
      <circle cx={markerX} cy={markerY} r={4} fill="currentColor" className="text-amber-500" />
    </svg>
  );
}

export function PremiumAdvancedCircuitSimulator() {
  /* ---- Tab 1 : Series / Parallel analysis ---- */
  const [resistorsStr, setResistorsStr] = useState("10, 20, 30");
  const [seriesVoltage, setSeriesVoltage] = useState("12");

  const resistanceAnalysis = useMemo(() => {
    const resistances = parseResistors(resistorsStr);
    const v = parseFloat(seriesVoltage);
    if (resistances.length < 1 || !Number.isFinite(v) || v <= 0) return null;

    const rSeries = resistances.reduce((a, b) => a + b, 0);
    const iSeriesTotal = v / rSeries;
    const seriesDrops: Resistor[] = resistances.map((r) => ({
      r,
      current: iSeriesTotal,
      voltage: iSeriesTotal * r,
      power: iSeriesTotal ** 2 * r,
    }));

    const rParallel = 1 / resistances.reduce((a, b) => a + 1 / b, 0);
    const iParallelTotal = v / rParallel;
    const parallelDrops: Resistor[] = resistances.map((r) => ({
      r,
      current: v / r,
      voltage: v,
      power: (v / r) ** 2 * r,
    }));

    return { resistances, v, rSeries, iSeriesTotal, seriesDrops, rParallel, iParallelTotal, parallelDrops };
  }, [resistorsStr, seriesVoltage]);

  /* ---- Tab 2 & 3: RC circuit ---- */
  const [rcVoltage, setRcVoltage] = useState("5");
  const [rcResistance, setRcResistance] = useState("1000");
  const [rcCap, setRcCap] = useState("0.001");
  const [chargeMode, setChargeMode] = useState<"charge" | "discharge">("charge");
  const [tauSlider, setTauSlider] = useState(1);

  const rc = useMemo(() => {
    const V = parseFloat(rcVoltage);
    const R = parseFloat(rcResistance);
    const C = parseFloat(rcCap);
    if (!Number.isFinite(V) || !Number.isFinite(R) || !Number.isFinite(C) || R <= 0 || C <= 0 || V <= 0) {
      return null;
    }
    const tau = R * C;
    const t = tauSlider * tau;
    const vc = chargeMode === "charge" ? V * (1 - Math.exp(-t / tau)) : V * Math.exp(-t / tau);
    const i = (V / R) * Math.exp(-t / tau);
    const q = C * vc;
    const i0 = V / R;
    return { V, R, C, tau, t, vc, i, q, i0 };
  }, [rcVoltage, rcResistance, rcCap, chargeMode, tauSlider]);

  const resetAnalysis = () => {
    setResistorsStr("10, 20, 30");
    setSeriesVoltage("12");
  };
  const resetRc = () => {
    setRcVoltage("5");
    setRcResistance("1000");
    setRcCap("0.001");
    setChargeMode("charge");
    setTauSlider(1);
  };

  /* ---- RC time table rows ---- */
  const timeTable = rc
    ? ([0, 0.25, 0.5, 1, 1.5, 2, 3, 5] as const).map((k) => {
        const tsec = k * rc.tau;
        const vc = chargeMode === "charge" ? rc.V * (1 - Math.exp(-k)) : rc.V * Math.exp(-k);
        const vr = rc.V - vc;
        const i = rc.i0 * Math.exp(-k);
        const q = rc.C * vc;
        return { k, tsec, vc, vr, i, q };
      })
    : [];

return (
    <div className="space-y-4">
      <LabCard
        title="Advanced Circuit Simulator"
        icon={<CircuitBoard className="h-5 w-5 text-amber-500" />}
        description="Series, parallel and RC circuits — live-simulated with per-component analysis and an animated charge curve."
      >
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="flex-wrap h-auto justify-start">
            <TabsTrigger value="analysis">Series / Parallel</TabsTrigger>
            <TabsTrigger value="rc">RC Circuit</TabsTrigger>
            <TabsTrigger value="table">RC Time Table</TabsTrigger>
          </TabsList>

          {/* ---------------- TAB 1: SERIES/PARALLEL ---------------- */}
          <TabsContent value="analysis" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <LabInput
                id="sp-v"
                label="Supply voltage V"
                unit="volts"
                value={seriesVoltage}
                onChange={(v) => setSeriesVoltage(v)}
                hint="e.g. 8"
              />
              <LabInput
                id="sp-r"
                label="Resistors R"
                unit="ohms"
                value={resistorsStr}
                onChange={(v) => setResistorsStr(v)}
                hint="comma separated, e.g. 10, 20, 30"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetAnalysis} className="text-xs">
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
            </div>

            {resistanceAnalysis ? (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <LabResult label="Series R_total" value={suffixVal(resistanceAnalysis.rSeries)} unit="Ω" highlight />
                  <LabResult label="Series current I" value={suffixVal(resistanceAnalysis.iSeriesTotal)} unit="A" />
                  <LabResult label="Parallel R_total" value={suffixVal(resistanceAnalysis.rParallel)} unit="Ω" highlight />
                  <LabResult label="Parallel I_total" value={suffixVal(resistanceAnalysis.iParallelTotal)} unit="A" />
                </div>

                <Card>
                  <CardContent className="space-y-3 p-4">
                    <p className="text-sm font-semibold">Series connection</p>
                    <SeriesDiagram resistances={resistanceAnalysis.seriesDrops.map((d) => d.r)} current={resistanceAnalysis.iSeriesTotal} />

<div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-muted-foreground">
                            <th className="py-1 pr-3 text-left font-medium">Resistor</th>
                            <th className="py-1 pr-3 text-right font-medium">Voltage drop Vr</th>
                            <th className="py-1 pr-3 text-right font-medium">Current</th>
                            <th className="py-1 text-right font-medium">Power</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resistanceAnalysis.seriesDrops.map((d, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-1 pr-3">R{i + 1} ({fmt(d.r)} Ω)</td>
                              <td className="py-1 pr-3 text-right">{fmt(d.voltage)} V</td>
                              <td className="py-1 pr-3 text-right">{suffixVal(d.current)} A</td>
                              <td className="py-1 text-right">{suffixVal(d.power)} W</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="font-semibold text-primary">
                            <td className="py-1 pr-3">Σ (KVL check)</td>
                            <td className="py-1 pr-3 text-right">{fmt(resistanceAnalysis.seriesDrops.reduce((a, d) => a + d.voltage, 0))} V</td>
                            <td className="py-1 pr-3 text-right">{suffixVal(resistanceAnalysis.iSeriesTotal)} A</td>
                            <td className="py-1 text-right">{formattedPower(resistanceAnalysis.seriesDrops)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Series — the same current flows through every resistor; voltage splits in proportion to R (V = I·R). The sum of the drops always equals the supply voltage.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="space-y-3 p-4">
                    <p className="text-sm font-semibold">Parallel connection</p>
                    <ParallelDiagram resistances={resistanceAnalysis.parallelDrops.map((d) => d.r)} voltage={resistanceAnalysis.v} />
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-muted-foreground">
                            <th className="py-1 pr-3 text-left font-medium">Resistor</th>
                            <th className="py-1 pr-3 text-right font-medium">Branch current</th>
                            <th className="py-1 pr-3 text-right font-medium">Voltage</th>
                            <th className="py-1 text-right font-medium">Power</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resistanceAnalysis.parallelDrops.map((d, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-1 pr-3">R{i + 1} ({fmt(d.r)} Ω)</td>
                              <td className="py-1 pr-3 text-right">{suffixVal(d.current)} A</td>
                              <td className="py-1 pr-3 text-right">{fmt(d.voltage)} V</td>
                              <td className="py-1 text-right">{suffixVal(d.power)} W</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="font-semibold text-primary">
                            <td className="py-1 pr-3">Totals (KCL check)</td>
                            <td className="py-1 pr-3 text-right">{suffixVal(resistanceAnalysis.iParallelTotal)} A</td>
                            <td className="py-1 pr-3 text-right">{fmt(resistanceAnalysis.v)} V</td>
                            <td className="py-1 text-right">{formattedPower(resistanceAnalysis.parallelDrops)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Parallel — the same voltage appears across every branch; current splits inversely to R (smaller R draws more current). R_total is always smaller than the smallest resistor.
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <LabResult error label="Check inputs" value="Voltage must be positive with at least one resistor > 0." />
            )}
          </TabsContent>

{/* ---------------- TAB 2: RC CIRCUIT ---------------- */}
          <TabsContent value="rc" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <LabInput id="rc-v" label="Battery EMF" unit="volts" value={rcVoltage} onChange={(v) => setRcVoltage(v)} hint="e.g. 5" />
              <LabInput id="rc-r" label="Resistance" unit="ohms" value={rcResistance} onChange={(v) => setRcResistance(v)} hint="e.g. 1000" />
              <LabInput id="rc-c" label="Capacitance" unit="farads" value={rcCap} onChange={(v) => setRcCap(v)} hint="e.g. 0.001 (1 mF)" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium">Mode:</span>
              {(["charge", "discharge"] as const).map((m) => (
                <Button
                  key={m}
                  size="sm"
                  variant={chargeMode === m ? "default" : "outline"}
                  className="text-xs capitalize"
                  onClick={() => setChargeMode(m)}
                >
                  {m}
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={resetRc} className="text-xs">
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
            </div>

            {rc ? (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <LabResult label="Time constant τ = RC" value={formattedTime(rc.tau)} highlight />
                  <LabResult label="Capacitor voltage Vc" value={fmt(rc.vc)} unit="V" />
                  <LabResult label="Circuit current I" value={suffixVal(rc.i)} unit="A" />
                  <LabResult label="Charge stored Q" value={formattedCharge(rc.q)} />
                </div>

                <Card>
                  <CardContent className="space-y-3 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{chargeMode === "charge" ? "Charging curve" : "Discharge curve"}</p>
                      <span className="text-xs font-medium text-muted-foreground">
                        t = <span className="text-primary">{fmt(tauSlider, 1)}</span> τ
                      </span>
                    </div>
                    <div className="rounded-md border border-border bg-background p-1">
                      <RcCurve vMax={rc.V} tau={rc.tau} tauMultiplier={tauSlider} charge={chargeMode === "charge"} />
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-amber-500" />
                      <Slider
                        min={0}
                        max={5}
                        step={0.05}
                        value={[tauSlider]}
                        onValueChange={(vals) => setTauSlider(Number(vals[0]))}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      At t = τ the capacitor reaches ~63% of the battery EMF (charging) and falls to ~37% (discharging) —
                      the one-number rule-of-thumb for every RC circuit.
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <LabResult error label="Check inputs" value="Need R > 0, C > 0 and V > 0 to compute the time constant." />
            )}
          </TabsContent>

{/* ---------------- TAB 3: RC TIME TABLE ---------------- */}
          <TabsContent value="table" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <LabInput id="t-v" label="Battery voltage V" unit="volts" value={rcVoltage} onChange={(v) => setRcVoltage(v)} />
              <LabInput id="t-r" label="Resistance" unit="ohms" value={rcResistance} onChange={(v) => setRcResistance(v)} />
              <LabInput id="t-c" label="Capacitance" unit="farads" value={rcCap} onChange={(v) => setRcCap(v)} />
            </div>
            {rc ? (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-medium">Treated as:</span>
                  {(["charge", "discharge"] as const).map((m) => (
                    <Button
                      key={m}
                      size="sm"
                      variant={chargeMode === m ? "default" : "outline"}
                      className="text-xs capitalize"
                      onClick={() => setChargeMode(m)}
                    >
                      {m}
                    </Button>
                  ))}
                </div>
                <LabResult label="Time constant τ" value={formattedTime(rc.tau)} highlight />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="py-1 pr-3 font-medium">t</th>
                        <th className="py-1 pr-3 text-right font-medium">Elapsed time</th>
                        <th className="py-1 pr-3 text-right font-medium">Vc</th>
                        <th className="py-1 pr-3 text-right font-medium">Vr</th>
                        <th className="py-1 pr-3 text-right font-medium">I</th>
                        <th className="py-1 pr-3 text-right font-medium">Q</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeTable.map((row, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-1 pr-3">{row.k}τ</td>
                          <td className="py-1 pr-3 text-right">{formattedTime(row.tsec)}</td>
                          <td className="py-1 pr-3 text-right">{fmt(row.vc)} V</td>
                          <td className="py-1 pr-3 text-right">{fmt(row.vr)} V</td>
                          <td className="py-1 pr-3 text-right">{suffixVal(row.i)} A</td>
                          <td className="py-1 pr-3 text-right">{formattedCharge(row.q)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Vc sits on the capacitor, Vr across the resistor. Notice Vc + Vr always sums to the battery EMF, while the current decays to ~0 after a few time constants.
                </p>
              </>
            ) : (
              <LabResult error label="Check inputs" value="Provide valid V, R, C to build the time table." />
            )}
          </TabsContent>
        </Tabs>

        <Card className="border-dashed">
          <CardContent className="space-y-2 p-4 text-xs sm:text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">How this lab helps you</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Series adds resistances; parallel always makes R_total smaller than the smallest resistor.</li>
              <li>The RC time constant τ = R·C sets how quickly a capacitor fills or drains — roughly 63% per τ.</li>
              <li>Drag the marker to read exact Vc, I and Q at any instant, then cross-check with the formula.</li>
            </ul>
          </CardContent>
        </Card>
      </LabCard>
    </div>
  );
}