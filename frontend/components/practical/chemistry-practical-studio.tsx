"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  FlaskConical,
  TestTube,
  Flame,
  Clock,
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  Layers,
  Activity,
  CheckCircle2,
  Info,
  Droplets,
  Zap,
} from "lucide-react";

export type ChemistryLabMode =
  | "titration-simulator"
  | "salt-analysis"
  | "chemical-kinetics"
  | "organic-diagnostic";

interface ChemistryPracticalStudioProps {
  initialLab?: ChemistryLabMode;
}

export function ChemistryPracticalStudio({
  initialLab = "titration-simulator",
}: ChemistryPracticalStudioProps) {
  const [activeLab, setActiveLab] = useState<ChemistryLabMode>(initialLab);

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/30 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              Virtual Chemistry Apparatus Workbench
              <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                Interactive Reaction Simulation
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Dynamic burettes, flame tests, qualitative radical identification, and clock reaction kinetics
            </p>
          </div>
        </div>

        {/* Lab Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border/50">
          {[
            { id: "titration-simulator", label: "Titration Studio", icon: "🧪" },
            { id: "salt-analysis", label: "Qualitative Salt Analysis", icon: "🔥" },
            { id: "chemical-kinetics", label: "Kinetics (Clock Rxn)", icon: "⏱️" },
            { id: "organic-diagnostic", label: "Organic Functional Groups", icon: "🧬" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveLab(item.id as ChemistryLabMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLab === item.id
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {activeLab === "titration-simulator" && <TitrationSimulator />}
        {activeLab === "salt-analysis" && <QualitativeSaltAnalysisSimulator />}
        {activeLab === "chemical-kinetics" && <ChemicalKineticsSimulator />}
        {activeLab === "organic-diagnostic" && <OrganicDiagnosticSimulator />}
      </div>
    </div>
  );
}

/* =========================================================================
   1. ACID-BASE & REDOX TITRATION SIMULATOR
   ========================================================================= */
function TitrationSimulator() {
  const [titrationType, setTitrationType] = useState<"acid-base" | "redox" | "weak-strong">("acid-base");
  const [indicator, setIndicator] = useState<"phenolphthalein" | "methyl-orange" | "kmno4">("phenolphthalein");
  const [addedTitrantMl, setAddedTitrantMl] = useState<number>(0);
  const [isDripping, setIsDripping] = useState<boolean>(false);
  const [dripRate, setDripRate] = useState<number>(1); // 1 = slow drop, 3 = fast drop
  const [concordantReadings, setConcordantReadings] = useState<number[]>([20.0, 20.1]);

  const equivalencePointMl = 20.0; // 20.0 mL of 0.1M titrant
  const maxBuretteMl = 50.0;

  // Drip interval effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isDripping && addedTitrantMl < maxBuretteMl) {
      interval = setInterval(() => {
        setAddedTitrantMl((prev) => {
          const next = Math.min(maxBuretteMl, prev + 0.1 * dripRate);
          if (next >= maxBuretteMl) setIsDripping(false);
          return Math.round(next * 10) / 10;
        });
      }, 120 / dripRate);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDripping, dripRate, addedTitrantMl]);

  // Compute live pH
  const currentPh = useMemo(() => {
    if (titrationType === "redox") return 7.0; // Not applicable directly
    const diff = addedTitrantMl - equivalencePointMl;
    if (diff < -5) return 1.2 + (addedTitrantMl / equivalencePointMl) * 1.5;
    if (diff >= -5 && diff < -0.1) return 2.7 + ((addedTitrantMl - 15) / 5) * 1.8;
    if (Math.abs(diff) <= 0.1) return 7.0;
    if (diff > 0.1 && diff <= 5) return 9.5 + ((diff) / 5) * 2.2;
    return 11.7 + Math.min(1.2, ((diff - 5) / 25) * 1.0);
  }, [addedTitrantMl, equivalencePointMl, titrationType]);

  // Compute Solution Color in Flask
  const flaskColor = useMemo(() => {
    if (titrationType === "redox") {
      // KMnO4 self-indicator (colorless before eq, permanent pale pink after eq)
      if (addedTitrantMl < equivalencePointMl) return "rgba(241, 245, 249, 0.2)";
      return "rgba(244, 114, 182, 0.6)"; // Pink KMnO4
    }

    if (indicator === "phenolphthalein") {
      if (currentPh < 8.2) return "rgba(241, 245, 249, 0.2)"; // Colorless in acid
      if (currentPh >= 8.2 && currentPh < 10) return "rgba(244, 114, 182, 0.5)"; // Pale pink endpoint
      return "rgba(219, 39, 119, 0.85)"; // Deep pink in excess alkali
    }

    if (indicator === "methyl-orange") {
      if (currentPh < 3.1) return "rgba(239, 68, 68, 0.8)"; // Red
      if (currentPh >= 3.1 && currentPh <= 4.4) return "rgba(249, 115, 22, 0.85)"; // Orange endpoint
      return "rgba(234, 179, 8, 0.85)"; // Yellow in alkaline
    }

    return "rgba(241, 245, 249, 0.2)";
  }, [currentPh, indicator, titrationType, addedTitrantMl]);

  const logReading = () => {
    setConcordantReadings((prev) => [...prev, addedTitrantMl]);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Burette & Flask Simulation Visual (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300">
                0.1 M NaOH (Burette) vs 20 mL 0.1 M HCl (Flask)
              </span>
              <span className="text-xs font-mono text-slate-300">
                pH: <span className="text-amber-400 font-bold text-sm">{currentPh.toFixed(2)}</span>
              </span>
            </div>

            {/* SVG Apparatus Graphic */}
            <div className="relative w-full overflow-x-auto py-2 flex justify-center">
              <svg viewBox="0 0 540 340" className="w-full max-w-[500px] h-[320px]">
                <defs>
                  <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Burette Clamp & Stand */}
                <rect x="220" y="20" width="8" height="300" fill="#475569" rx="2" />
                <rect x="180" y="310" width="160" height="15" fill="#334155" rx="3" />
                <rect x="228" y="100" width="30" height="10" fill="#64748b" rx="2" />
                <rect x="228" y="180" width="30" height="10" fill="#64748b" rx="2" />

                {/* Graduated Glass Burette Tube */}
                <rect x="250" y="30" width="24" height="180" fill="rgba(241, 245, 249, 0.08)" stroke="#94a3b8" strokeWidth="1.5" rx="2" />

                {/* Liquid column inside burette (lowers as addedTitrantMl increases) */}
                <rect
                  x="251"
                  y={30 + (addedTitrantMl / maxBuretteMl) * 178}
                  width="22"
                  height={178 - (addedTitrantMl / maxBuretteMl) * 178}
                  fill="#38bdf8"
                  opacity="0.6"
                />

                {/* Burette Graduations */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const gy = 35 + i * 17;
                  return (
                    <g key={`bur-${i}`}>
                      <line x1="250" y1={gy} x2="258" y2={gy} stroke="#f8fafc" strokeWidth="1" />
                      <text x="246" y={gy + 3} fontSize="7" fill="#cbd5e1" textAnchor="end" fontWeight="bold">
                        {i * 5}
                      </text>
                    </g>
                  );
                })}

                {/* Stopcock valve */}
                <circle cx="262" cy="216" r="6" fill="#f59e0b" stroke="#78350f" />
                <line x1="254" y1="216" x2="270" y2="216" stroke="#ffffff" strokeWidth="2" />

                {/* Burette Tip nozzle */}
                <polygon points="258,222 266,222 263,238 261,238" fill="rgba(241, 245, 249, 0.3)" stroke="#94a3b8" />

                {/* Drip Droplet Animation */}
                {isDripping && (
                  <circle cx="262" cy="245" r="2.5" fill="#38bdf8" className="animate-bounce" />
                )}

                {/* Conical Flask */}
                <polygon
                  points="230,300 294,300 274,250 250,250"
                  fill={flaskColor}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                <ellipse cx="262" cy="300" rx="32" ry="5" fill={flaskColor} stroke="#94a3b8" strokeWidth="1.5" />

                {/* Magnetic Stirrer Vortex inside flask */}
                <ellipse cx="262" cy="290" rx="12" ry="3" fill="none" stroke="#f8fafc" strokeWidth="1" strokeDasharray="3,3" />

                {/* Live Volume Label */}
                <text x="320" y="120" fontSize="12" fontWeight="bold" fill="#38bdf8">
                  V = {addedTitrantMl.toFixed(1)} mL
                </text>
              </svg>
            </div>

            {/* End Point Flash Alert */}
            <div className="mt-2 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: flaskColor }} />
                <span className="text-slate-300 font-semibold">Indicator Status: </span>
                <span className="text-amber-400 font-bold">
                  {addedTitrantMl >= equivalencePointMl
                    ? "Persistent End Point Reached! 🎯"
                    : addedTitrantMl >= equivalencePointMl - 1.5
                    ? "Transient Color Flash (Near End Point!)"
                    : "Titration in Progress"}
                </span>
              </div>
              <button
                onClick={logReading}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors"
              >
                + Record Titre Value
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDripping(!isDripping)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isDripping
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {isDripping ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isDripping ? "Close Stopcock" : "Open Stopcock (Drop)"}
                </button>
                <button
                  onClick={() => {
                    setAddedTitrantMl(0);
                    setIsDripping(false);
                  }}
                  className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground"
                  title="Refill Burette"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground font-medium">Flow Speed:</span>
                {[1, 2, 4].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setDripRate(speed)}
                    className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                      dripRate === speed
                        ? "bg-amber-500 text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">Titration Pair</label>
                <select
                  value={titrationType}
                  onChange={(e) => setTitrationType(e.target.value as any)}
                  className="w-full text-xs rounded-lg border border-border bg-background px-2.5 py-1.5 font-medium"
                >
                  <option value="acid-base">HCl vs NaOH (Strong/Strong)</option>
                  <option value="redox">KMnO₄ vs Oxalic Acid (Redox)</option>
                  <option value="weak-strong">CH₃COOH vs NaOH (Weak/Strong)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">Indicator</label>
                <select
                  value={indicator}
                  onChange={(e) => setIndicator(e.target.value as any)}
                  className="w-full text-xs rounded-lg border border-border bg-background px-2.5 py-1.5 font-medium"
                >
                  <option value="phenolphthalein">Phenolphthalein (pH 8.2 - 10.0)</option>
                  <option value="methyl-orange">Methyl Orange (pH 3.1 - 4.4)</option>
                  <option value="kmno4">Self-Indicator (KMnO₄)</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-end">
                <button
                  onClick={() => setAddedTitrantMl(19.8)}
                  className="w-full text-xs font-semibold py-2 rounded-lg border border-border hover:bg-muted"
                >
                  Skip Near Eq. (19.8 mL)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Normality & Concurrence Table */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2 flex items-center justify-between">
              <span>Volumetric Observation Table</span>
              <span className="text-xs text-muted-foreground font-normal">{concordantReadings.length} trials</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="py-1">Trial</th>
                    <th className="py-1">Initial (mL)</th>
                    <th className="py-1">Final (mL)</th>
                    <th className="py-1">Titre (mL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 font-mono">
                  {concordantReadings.map((v, i) => (
                    <tr key={i}>
                      <td className="py-1 font-semibold text-foreground">#{i + 1}</td>
                      <td className="py-1">0.0</td>
                      <td className="py-1">{v.toFixed(1)}</td>
                      <td className="py-1 text-amber-500 font-bold">{v.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Normality Equation V1N1 = V2N2 */}
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 space-y-1.5 text-xs">
              <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase">
                Law of Equivalence (V₁N₁ = V₂N₂)
              </div>
              <div className="font-mono text-foreground font-bold">
                N_acid = (V_base × N_base) / V_acid
              </div>
              <div className="text-[11px] text-muted-foreground">
                Concordant Titre Volume = <span className="font-bold text-foreground">20.00 mL</span>
              </div>
              <div className="text-base font-extrabold text-foreground font-mono mt-1">
                Strength = 0.100 N (3.65 g/L HCl)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. QUALITATIVE INORGANIC SALT ANALYSIS SIMULATOR
   ========================================================================= */
function QualitativeSaltAnalysisSimulator() {
  const [selectedCation, setSelectedCation] = useState<string>("Cu2+");
  const [selectedAnion, setSelectedAnion] = useState<string>("SO42-");
  const [activeTest, setActiveTest] = useState<"flame" | "wet-nh4oh" | "wet-k4fecn6" | "silver-nitrate" | "barium-chloride">("flame");

  // Flame color lookup
  const flameColors: Record<string, { color: string; label: string }> = {
    "Cu2+": { color: "#22c55e", label: "Brilliant Greenish-Blue (Peacock Feather)" },
    "Ca2+": { color: "#ea580c", label: "Brick Red Flame" },
    "Ba2+": { color: "#a3e635", label: "Apple Green Flame" },
    "Na+": { color: "#facc15", label: "Golden Yellow Flame" },
    "K+": { color: "#c084fc", label: "Lilac / Violet Flame" },
    "Fe3+": { color: "#e2e8f0", label: "No Characteristic Flame (Non-volatile)" },
    "Pb2+": { color: "#93c5fd", label: "Dull Greyish-Blue" },
    "NH4+": { color: "#e2e8f0", label: "No Characteristic Flame" },
  };

  // Wet reaction result lookup
  const getWetResult = () => {
    if (activeTest === "wet-nh4oh") {
      if (selectedCation === "Cu2+") return { ppt: "Pale Blue ppt of Cu(OH)₂ (dissolves in excess to deep azure blue [Cu(NH₃)₄]²⁺)", color: "#0284c7" };
      if (selectedCation === "Fe3+") return { ppt: "Reddish-Brown gelatinous ppt of Fe(OH)₃", color: "#78350f" };
      if (selectedCation === "Pb2+") return { ppt: "White ppt of Pb(OH)₂", color: "#f8fafc" };
      return { ppt: "No characteristic precipitate", color: "#e2e8f0" };
    }
    if (activeTest === "wet-k4fecn6") {
      if (selectedCation === "Cu2+") return { ppt: "Chocolate Brown ppt of Cu₂[Fe(CN)₆]", color: "#451a03" };
      if (selectedCation === "Fe3+") return { ppt: "Intense Prussian Blue ppt/colloid of Fe₄[Fe(CN)₆]₃", color: "#1e3a8a" };
      return { ppt: "No distinct colored precipitate", color: "#e2e8f0" };
    }
    if (activeTest === "barium-chloride") {
      if (selectedAnion === "SO42-") return { ppt: "Heavy White ppt of BaSO₄ (insoluble in dil. HCl)", color: "#f8fafc" };
      return { ppt: "No precipitate", color: "#e2e8f0" };
    }
    if (activeTest === "silver-nitrate") {
      if (selectedAnion === "Cl-") return { ppt: "Curdy White ppt of AgCl (soluble in NH₄OH)", color: "#ffffff" };
      if (selectedAnion === "Br-") return { ppt: "Pale Yellow ppt of AgBr (sparingly soluble)", color: "#fef08a" };
      if (selectedAnion === "I-") return { ppt: "Bright Yellow ppt of AgI (insoluble in NH₄OH)", color: "#eab308" };
      return { ppt: "No precipitate", color: "#e2e8f0" };
    }
    return { ppt: "", color: "" };
  };

  const wetResult = getWetResult();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300">
                Qualitative Inorganic Scheme (Salt: {selectedCation} + {selectedAnion})
              </span>
              <span className="text-xs text-slate-400 capitalize">Test: {activeTest.replace("-", " ")}</span>
            </div>

            {/* Test Visualization Canvas */}
            <div className="flex justify-center items-center py-6 h-[220px]">
              {activeTest === "flame" ? (
                <div className="flex flex-col items-center gap-3">
                  {/* Bunsen Burner & Colored Flame */}
                  <div className="relative flex justify-center">
                    <div
                      className="w-16 h-28 rounded-full blur-md opacity-90 transition-colors duration-500"
                      style={{ backgroundColor: flameColors[selectedCation]?.color || "#38bdf8" }}
                    />
                    <div
                      className="absolute bottom-0 w-8 h-20 rounded-full blur-xs opacity-95 transition-colors duration-500"
                      style={{ backgroundColor: flameColors[selectedCation]?.color || "#38bdf8" }}
                    />
                    {/* Nichrome loop in flame */}
                    <div className="absolute -top-4 w-1 h-32 bg-slate-400 transform -rotate-12" />
                    <div className="absolute -top-6 left-5 w-4 h-4 rounded-full border border-slate-300" />
                  </div>
                  <div className="text-xs font-bold text-slate-200">
                    {flameColors[selectedCation]?.label}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  {/* Test Tube with Liquid & Precipitate */}
                  <div className="w-16 h-36 rounded-b-full border-2 border-slate-400 bg-slate-900/60 p-1 relative overflow-hidden flex flex-col justify-end">
                    <div
                      className="w-full rounded-b-full transition-all duration-500"
                      style={{
                        height: "75%",
                        backgroundColor: wetResult.color,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                  <div className="text-xs font-bold text-amber-400 text-center max-w-sm">
                    {wetResult.ppt}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs flex justify-between items-center">
              <span className="text-slate-400">Diagnostic Inference:</span>
              <span className="font-bold text-emerald-400">
                Confirms Presence of {activeTest === "barium-chloride" || activeTest === "silver-nitrate" ? selectedAnion : selectedCation} Radical
              </span>
            </div>
          </div>

          {/* Test Selector Tabs */}
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "flame", label: "Flame Test (Dry)", icon: "🔥" },
                { id: "wet-nh4oh", label: "NH₄OH Test", icon: "🧪" },
                { id: "wet-k4fecn6", label: "K₄[Fe(CN)₆] Test", icon: "🍫" },
                { id: "silver-nitrate", label: "AgNO₃ (Halides)", icon: "⚪" },
                { id: "barium-chloride", label: "BaCl₂ (Sulphate)", icon: "🛡️" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTest(t.id as any)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    activeTest === t.id
                      ? "bg-amber-500 text-white"
                      : "border border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">Cation (Basic Radical)</label>
                <select
                  value={selectedCation}
                  onChange={(e) => setSelectedCation(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border bg-background px-2.5 py-1.5 font-medium"
                >
                  <option value="Cu2+">Cu²⁺ (Copper - Group II)</option>
                  <option value="Fe3+">Fe³⁺ (Iron - Group III)</option>
                  <option value="Pb2+">Pb²⁺ (Lead - Group I)</option>
                  <option value="Ba2+">Ba²⁺ (Barium - Group V)</option>
                  <option value="Ca2+">Ca²⁺ (Calcium - Group V)</option>
                  <option value="Na+">Na⁺ (Sodium)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">Anion (Acidic Radical)</label>
                <select
                  value={selectedAnion}
                  onChange={(e) => setSelectedAnion(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border bg-background px-2.5 py-1.5 font-medium"
                >
                  <option value="SO42-">SO₄²⁻ (Sulphate)</option>
                  <option value="Cl-">Cl⁻ (Chloride)</option>
                  <option value="Br-">Br⁻ (Bromide)</option>
                  <option value="I-">I⁻ (Iodide)</option>
                  <option value="CO32-">CO₃²⁻ (Carbonate)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Scheme Reference Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Systematic Salt Analysis Blueprint
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-muted/50 border border-border/40">
                <div className="font-semibold text-foreground">Group I (dil. HCl):</div>
                <div className="text-muted-foreground">Pb²⁺ → White ppt PbCl₂</div>
              </div>
              <div className="p-2 rounded-lg bg-muted/50 border border-border/40">
                <div className="font-semibold text-foreground">Group II (H₂S + dil. HCl):</div>
                <div className="text-muted-foreground">Cu²⁺ → Black ppt CuS</div>
              </div>
              <div className="p-2 rounded-lg bg-muted/50 border border-border/40">
                <div className="font-semibold text-foreground">Group III (NH₄Cl + NH₄OH):</div>
                <div className="text-muted-foreground">Fe³⁺ → Brown ppt Fe(OH)₃, Al³⁺ → Gelatinous white</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. CHEMICAL KINETICS CLOCK REACTION SIMULATOR
   ========================================================================= */
function ChemicalKineticsSimulator() {
  const [thiosulphateConc, setThiosulphateConc] = useState<number>(0.1); // 0.02 to 0.2 M
  const [temperatureC, setTemperatureC] = useState<number>(25);
  const [elapsedTimeS, setElapsedTimeS] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Time taken for cross to disappear: t ∝ 1 / (k * [Na2S2O3])
  const calculatedReactionTime = useMemo(() => {
    // Arrhenius temperature acceleration factor (doubles every 10 deg)
    const tempFactor = Math.pow(2, (temperatureC - 25) / 10);
    return Math.max(4, Math.round((4.0 / thiosulphateConc) / tempFactor));
  }, [thiosulphateConc, temperatureC]);

  const opacityPercent = Math.min(100, (elapsedTimeS / calculatedReactionTime) * 100);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && elapsedTimeS < calculatedReactionTime) {
      timer = setInterval(() => {
        setElapsedTimeS((prev) => {
          const next = prev + 1;
          if (next >= calculatedReactionTime) setIsRunning(false);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, elapsedTimeS, calculatedReactionTime]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300">
                Na₂S₂O₃ + 2HCl → 2NaCl + SO₂ + S↓ + H₂O
              </span>
              <span className="text-xs font-mono text-slate-300">
                Stopwatch: <span className="text-amber-400 font-bold text-sm">{elapsedTimeS} s</span>
              </span>
            </div>

            {/* Beaker placed over 'X' Tile Visual */}
            <div className="flex justify-center items-center py-6">
              <div className="relative w-48 h-48 rounded-2xl bg-white border-4 border-slate-300 flex items-center justify-center shadow-2xl">
                {/* Bold Cross Mark on Paper */}
                <span className="text-6xl font-black text-slate-900 select-none">✕</span>

                {/* Colloidal Sulfur Turbidity Layer */}
                <div
                  className="absolute inset-0 rounded-xl bg-amber-100/95 transition-opacity duration-300 flex items-center justify-center"
                  style={{ opacity: opacityPercent / 100 }}
                >
                  {opacityPercent >= 100 && (
                    <span className="text-xs font-bold text-slate-700 bg-white/80 px-2 py-1 rounded shadow">
                      Cross Disappeared! ⏱️
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs flex justify-between items-center">
              <span className="text-slate-400">Turbidity Formation:</span>
              <span className="font-bold text-amber-400">{opacityPercent.toFixed(0)}% Opaque (Sulfur Precipitated)</span>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-white font-bold text-xs"
                >
                  {isRunning ? "Pause Stopwatch" : "Start Reaction (Add HCl)"}
                </button>
                <button
                  onClick={() => {
                    setElapsedTimeS(0);
                    setIsRunning(false);
                  }}
                  className="p-2 rounded-lg border border-border hover:bg-muted"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs font-mono text-muted-foreground">Expected Time: {calculatedReactionTime} s</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">
                  Na₂S₂O₃ Concentration: {thiosulphateConc} M
                </label>
                <input
                  type="range"
                  min="0.02"
                  max="0.2"
                  step="0.02"
                  value={thiosulphateConc}
                  onChange={(e) => setThiosulphateConc(parseFloat(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">
                  Temperature: {temperatureC} °C
                </label>
                <input
                  type="range"
                  min="15"
                  max="55"
                  step="5"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseInt(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rate Curve Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Rate of Reaction vs Concentration
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Reaction Order:</span>
                <span className="font-mono font-bold text-foreground">First Order in Thiosulphate</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Rate (1/t):</span>
                <span className="font-mono font-bold text-emerald-500">{(1 / calculatedReactionTime).toFixed(4)} s⁻¹</span>
              </div>

              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mt-2">
                <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase">Conclusion</div>
                <div className="text-xs text-foreground mt-1 leading-relaxed">
                  Rate of reaction is directly proportional to concentration of sodium thiosulphate. The 1/t vs concentration plot is a straight line through the origin.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. ORGANIC FUNCTIONAL GROUP DIAGNOSTIC LAB
   ========================================================================= */
function OrganicDiagnosticSimulator() {
  const [selectedGroup, setSelectedGroup] = useState<string>("aldehyde");

  const diagnostics: Record<string, { reagent: string; observation: string; reaction: string }> = {
    aldehyde: {
      reagent: "Tollens' Reagent (Ammoniacal AgNO₃)",
      observation: "Shining Silver Mirror deposited on inner glass wall of test tube ✨",
      reaction: "R-CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → R-COO⁻ + 2Ag↓ (Silver mirror) + 4NH₃ + 2H₂O",
    },
    alcohol: {
      reagent: "Sodium metal (Dry piece)",
      observation: "Brisk effervescence with evolution of colourless H₂ gas (burns with pop sound)",
      reaction: "2R-OH + 2Na → 2R-ONa + H₂↑",
    },
    phenol: {
      reagent: "Neutral Ferric Chloride (FeCl₃)",
      observation: "Deep violet / purple coloration formed",
      reaction: "6C₆H₅OH + FeCl₃ → [Fe(OC₆H₅)₆]³⁻ (Violet complex) + 3H⁺ + 3Cl⁻",
    },
    carboxylic: {
      reagent: "Sodium Bicarbonate (NaHCO₃)",
      observation: "Brisk effervescence of CO₂ gas (turns lime water milky)",
      reaction: "R-COOH + NaHCO₃ → R-COONa + CO₂↑ + H₂O",
    },
    amine: {
      reagent: "Carbylamine Test (CHCl₃ + alc. KOH)",
      observation: "Extremely offensive / foul smell of isocyanide (carbylamine)",
      reaction: "R-NH₂ + CHCl₃ + 3KOH → R-NC + 3KCl + 3H₂O",
    },
  };

  const current = diagnostics[selectedGroup];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300 capitalize">
                {selectedGroup} Diagnostic Test
              </span>
              <span className="text-xs text-slate-400">Reagent: {current.reagent}</span>
            </div>

            <div className="flex flex-col items-center justify-center py-8 h-[200px]">
              <div className="w-20 h-36 rounded-b-full border-2 border-slate-400 bg-slate-900/60 p-1 relative overflow-hidden flex flex-col justify-end shadow-2xl">
                {selectedGroup === "aldehyde" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-white to-slate-300 opacity-90" />
                )}
                {selectedGroup === "phenol" && (
                  <div className="w-full h-3/4 rounded-b-full bg-purple-700/80" />
                )}
                {selectedGroup === "carboxylic" && (
                  <div className="w-full h-3/4 rounded-b-full bg-sky-500/40 flex items-center justify-center">
                    <span className="text-xs font-bold animate-pulse text-white">🫧 CO₂ Bubbles</span>
                  </div>
                )}
                {selectedGroup === "alcohol" && (
                  <div className="w-full h-3/4 rounded-b-full bg-slate-300/40 flex items-center justify-center">
                    <span className="text-xs font-bold animate-pulse text-white">🫧 H₂ Gas</span>
                  </div>
                )}
                {selectedGroup === "amine" && (
                  <div className="w-full h-3/4 rounded-b-full bg-amber-500/40" />
                )}
              </div>
              <div className="mt-4 text-xs font-bold text-amber-400 text-center max-w-md">
                {current.observation}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-bold text-foreground">Select Organic Functional Group:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {["aldehyde", "alcohol", "phenol", "carboxylic", "amine"].map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedGroup === grp
                      ? "bg-amber-500 text-white shadow-sm"
                      : "border border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {grp}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Chemical Reaction Equation
            </h4>
            <div className="rounded-xl bg-muted/60 p-3 font-mono text-xs text-foreground leading-relaxed border border-border/50">
              {current.reaction}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
