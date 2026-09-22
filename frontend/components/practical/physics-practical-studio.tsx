"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  Compass,
  Zap,
  Activity,
  Maximize2,
  Sliders,
  CheckCircle2,
  Info,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export type PhysicsLabMode =
  | "vernier-caliper"
  | "micrometer-screw"
  | "simple-pendulum"
  | "prism-refraction"
  | "resonance-tube"
  | "meter-bridge";

interface PhysicsPracticalStudioProps {
  initialLab?: PhysicsLabMode;
  onSelectExperiment?: (title: string) => void;
}

export function PhysicsPracticalStudio({
  initialLab = "vernier-caliper",
  onSelectExperiment,
}: PhysicsPracticalStudioProps) {
  const [activeLab, setActiveLab] = useState<PhysicsLabMode>(initialLab);

  useEffect(() => {
    if (initialLab) {
      setActiveLab(initialLab);
    }
  }, [initialLab]);

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Studio Header / Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/30 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              Virtual Physics Apparatus Workbench
              <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                Live Physical Simulation
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Interactive precision instruments with real-feeling physics, zero error adjustments, and live data calculations
            </p>
          </div>
        </div>

        {/* Lab Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border/50">
          {[
            { id: "vernier-caliper", label: "Vernier Caliper", icon: "📐" },
            { id: "micrometer-screw", label: "Screw Gauge", icon: "🔩" },
            { id: "simple-pendulum", label: "Simple Pendulum", icon: "⏱️" },
            { id: "prism-refraction", label: "Prism & Minimum Dev.", icon: "🌈" },
            { id: "resonance-tube", label: "Resonance Tube", icon: "🔊" },
            { id: "meter-bridge", label: "Meter Bridge", icon: "⚡" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveLab(item.id as PhysicsLabMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLab === item.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Workspace */}
      <div className="p-4 sm:p-6">
        {activeLab === "vernier-caliper" && <VernierCaliperSimulator />}
        {activeLab === "micrometer-screw" && <ScrewGaugeSimulator />}
        {activeLab === "simple-pendulum" && <SimplePendulumSimulator />}
        {activeLab === "prism-refraction" && <PrismRefractionSimulator />}
        {activeLab === "resonance-tube" && <ResonanceTubeSimulator />}
        {activeLab === "meter-bridge" && <MeterBridgeSimulator />}
      </div>
    </div>
  );
}

/* =========================================================================
   1. VERNIER CALIPER SIMULATOR
   ========================================================================= */
function VernierCaliperSimulator() {
  // Value in millimeters (e.g. 0 to 100 mm)
  const [measurementMm, setMeasurementMm] = useState<number>(24.6);
  const [zeroErrorMm, setZeroErrorMm] = useState<number>(0.0);
  const [objectShape, setObjectShape] = useState<"sphere" | "cylinder" | "block" | "none">("sphere");
  const [showLoupe, setShowLoupe] = useState<boolean>(true);

  // Least count = 1 MSD (1 mm) - 1 VSD (0.9 mm) = 0.1 mm = 0.01 cm
  const leastCountMm = 0.1;

  // Main Scale Reading (MSR) = floor of measured position in mm
  const correctedValue = Math.max(0, measurementMm + zeroErrorMm);
  const msr = Math.floor(correctedValue);
  // Vernier Scale Reading (VSR) = fractional coincidence (0 to 9)
  const vsr = Math.round(((correctedValue - msr) / leastCountMm) * 10) / 10;
  const vernierCoincidence = Math.round((correctedValue - msr) / leastCountMm) % 10;
  const calculatedTotal = (msr + vernierCoincidence * leastCountMm).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Visual Workbench Canvas (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            {/* Ambient metallic grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Header Badge */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/20 border border-sky-500/30 px-2.5 py-1 text-xs font-semibold text-sky-300">
                Precision: 0.1 mm (0.01 cm)
              </span>
              <div className="text-xs text-slate-400">
                Object: <span className="font-semibold text-sky-400 capitalize">{objectShape}</span>
              </div>
            </div>

            {/* SVG Vernier Caliper */}
            <div className="relative w-full overflow-x-auto py-4 flex justify-center">
              <svg viewBox="0 0 760 260" className="w-full max-w-[720px] h-auto drop-shadow-2xl">
                <defs>
                  <linearGradient id="caliperSteel" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <linearGradient id="sliderSteel" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>

                {/* Fixed Main Beam */}
                <rect x="40" y="70" width="680" height="50" rx="3" fill="url(#caliperSteel)" stroke="#475569" strokeWidth="1.5" />
                {/* Fixed Left Jaw (Outside & Inside) */}
                <path d="M40,70 L40,220 C40,235 60,230 65,210 L75,70 Z" fill="url(#caliperSteel)" stroke="#475569" strokeWidth="1.5" />
                <path d="M40,70 L40,15 C40,5 55,10 65,25 L75,70 Z" fill="url(#caliperSteel)" stroke="#475569" strokeWidth="1.5" />

                {/* Object between jaws */}
                {objectShape !== "none" && (
                  <g transform={`translate(${75}, 130)`}>
                    {objectShape === "sphere" && (
                      <circle
                        cx={measurementMm * 4.5 / 2}
                        cy="35"
                        r={Math.max(6, (measurementMm * 4.5) / 2)}
                        fill="url(#goldBrass)"
                        stroke="#92400e"
                        strokeWidth="1.5"
                        className="drop-shadow-md"
                      />
                    )}
                    {objectShape === "cylinder" && (
                      <rect
                        x="0"
                        y="0"
                        width={measurementMm * 4.5}
                        height="70"
                        rx="4"
                        fill="url(#goldBrass)"
                        stroke="#92400e"
                        strokeWidth="1.5"
                      />
                    )}
                    {objectShape === "block" && (
                      <rect
                        x="0"
                        y="5"
                        width={measurementMm * 4.5}
                        height="60"
                        rx="2"
                        fill="#38bdf8"
                        stroke="#0284c7"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                )}

                {/* Main Scale Markings (0 to 14 cm, scale: 4.5 px per mm) */}
                {Array.from({ length: 141 }).map((_, i) => {
                  const x = 90 + i * 4.5;
                  const isCm = i % 10 === 0;
                  const isHalfCm = i % 5 === 0 && !isCm;
                  const lineH = isCm ? 24 : isHalfCm ? 16 : 10;
                  return (
                    <g key={`ms-${i}`}>
                      <line x1={x} y1="70" x2={x} y2={70 + lineH} stroke="#0f172a" strokeWidth={isCm ? 1.5 : 1} />
                      {isCm && (
                        <text x={x} y="110" fontSize="10" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                          {i / 10}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Sliding Vernier Assembly (Translates with measurementMm) */}
                <g transform={`translate(${measurementMm * 4.5}, 0)`}>
                  {/* Slider Body */}
                  <rect x="75" y="60" width="110" height="70" rx="4" fill="url(#sliderSteel)" stroke="#334155" strokeWidth="1.5" opacity="0.95" />
                  {/* Movable Right Jaw */}
                  <path d="M75,70 L75,220 C75,235 55,230 50,210 L60,70 Z" fill="url(#sliderSteel)" stroke="#334155" strokeWidth="1.5" />
                  <path d="M75,70 L75,15 C75,5 60,10 50,25 L60,70 Z" fill="url(#sliderSteel)" stroke="#334155" strokeWidth="1.5" />

                  {/* Vernier Scale Window */}
                  <rect x="85" y="64" width="70" height="32" rx="2" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />

                  {/* Vernier Scale Markings (10 divisions spanning 9 MSD = 40.5 px -> 4.05 px/div) */}
                  {Array.from({ length: 11 }).map((_, vi) => {
                    const vx = 90 + vi * 4.05;
                    const isTen = vi === 0 || vi === 10 || vi === 5;
                    const vh = isTen ? 14 : 8;
                    const isMatch = vi === vernierCoincidence;
                    return (
                      <g key={`vs-${vi}`}>
                        <line
                          x1={vx}
                          y1="64"
                          x2={vx}
                          y2={64 + vh}
                          stroke={isMatch ? "#dc2626" : "#0f172a"}
                          strokeWidth={isMatch ? 2 : 1}
                        />
                        {(vi === 0 || vi === 5 || vi === 10) && (
                          <text x={vx} y="90" fontSize="8" fontWeight="bold" fill={isMatch ? "#dc2626" : "#334155"} textAnchor="middle">
                            {vi}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Sliding thumb clamp screw */}
                  <circle cx="160" cy="95" r="7" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Magnifier Loupe View */}
            {showLoupe && (
              <div className="mt-2 rounded-xl bg-slate-800/80 border border-slate-700/80 p-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold">
                    🔍
                  </span>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-200">Vernier Coincidence Loupe: </span>
                    Division <span className="font-bold text-sky-400 text-sm">#{vernierCoincidence}</span> aligns with the main scale mark.
                  </div>
                </div>
                <div className="text-xs text-slate-300 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
                  Total = MSR ({msr} mm) + ({vernierCoincidence} × 0.1 mm) = <span className="text-emerald-400 font-bold">{calculatedTotal} mm</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Controls Bar */}
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-primary" />
                Adjust Jaw Opening / Object Thickness:
              </label>
              <span className="text-sm font-bold text-primary font-mono">{measurementMm.toFixed(1)} mm ({((measurementMm) / 10).toFixed(2)} cm)</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="0.1"
              value={measurementMm}
              onChange={(e) => setMeasurementMm(parseFloat(e.target.value))}
              className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">Object Type</label>
                <select
                  value={objectShape}
                  onChange={(e) => setObjectShape(e.target.value as any)}
                  className="w-full text-xs rounded-lg border border-border bg-background px-2.5 py-1.5 font-medium"
                >
                  <option value="sphere">Metal Sphere</option>
                  <option value="cylinder">Beaker / Cylinder</option>
                  <option value="block">Glass Block</option>
                  <option value="none">No Object (Zero Test)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-muted-foreground block mb-1">Zero Error Calib.</label>
                <select
                  value={zeroErrorMm}
                  onChange={(e) => setZeroErrorMm(parseFloat(e.target.value))}
                  className="w-full text-xs rounded-lg border border-border bg-background px-2.5 py-1.5 font-medium"
                >
                  <option value="0.0">No Zero Error (0.0 mm)</option>
                  <option value="0.3">+0.3 mm (Positive Error)</option>
                  <option value="-0.2">-0.2 mm (Negative Error)</option>
                </select>
              </div>

              <div className="col-span-2 flex items-end gap-2">
                <button
                  onClick={() => setMeasurementMm(25.4)}
                  className="flex-1 text-xs font-semibold py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Preset 1" (25.4mm)
                </button>
                <button
                  onClick={() => setMeasurementMm(0.0)}
                  className="flex-1 text-xs font-semibold py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Close Jaws (0 mm)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Observation & Calculation Sidebar (1 Col) */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Live Reading Breakdown
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Least Count (LC):</span>
                <span className="font-mono font-semibold text-foreground">0.1 mm (0.01 cm)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Main Scale Reading (MSR):</span>
                <span className="font-mono font-semibold text-foreground">{msr} mm</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Vernier Coincidence (VSR):</span>
                <span className="font-mono font-semibold text-sky-500 font-bold">{vernierCoincidence} div</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Fractional Value (VSR × LC):</span>
                <span className="font-mono font-semibold text-foreground">{(vernierCoincidence * leastCountMm).toFixed(2)} mm</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Zero Correction (±e):</span>
                <span className="font-mono font-semibold text-amber-500">{zeroErrorMm >= 0 ? `-${zeroErrorMm} mm` : `+${Math.abs(zeroErrorMm)} mm`}</span>
              </div>

              <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 mt-2">
                <div className="text-[11px] font-semibold text-primary uppercase">Corrected Observed Dimension</div>
                <div className="text-xl font-extrabold text-foreground font-mono mt-0.5">
                  {calculatedTotal} mm
                  <span className="text-xs text-muted-foreground font-normal ml-2">(= {(parseFloat(calculatedTotal) / 10).toFixed(3)} cm)</span>
                </div>
              </div>
            </div>

            {/* Formula Cheat Card */}
            <div className="rounded-xl bg-muted/50 p-3 text-xs space-y-1.5 text-muted-foreground border border-border/40">
              <div className="font-semibold text-foreground text-[11px] uppercase tracking-wider">Formula in Practical Notebook</div>
              <div className="font-mono text-[11px] text-foreground bg-background px-2 py-1 rounded border border-border/60">
                Total Reading = MSR + (VSR × LC) - (±Zero Error)
              </div>
              <p className="text-[11px] leading-relaxed pt-1">
                Always record at least 5 readings at different cross-sections of the specimen and compute the mean diameter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. MICROMETER SCREW GAUGE SIMULATOR
   ========================================================================= */
function ScrewGaugeSimulator() {
  const [thicknessMm, setThicknessMm] = useState<number>(3.64);
  const [zeroErrorMm, setZeroErrorMm] = useState<number>(0.0);
  const pitchMm = 1.0;
  const totalCircularDivisions = 100;
  const leastCountMm = pitchMm / totalCircularDivisions; // 0.01 mm

  const msr = Math.floor(thicknessMm);
  const circularReading = Math.round(((thicknessMm - msr) / leastCountMm)) % totalCircularDivisions;
  const total = (msr + circularReading * leastCountMm - zeroErrorMm).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                Least Count: 0.01 mm (10 µm)
              </span>
              <span className="text-xs text-slate-400">Pitch: 1.0 mm | Circular Div: 100</span>
            </div>

            {/* SVG Screw Gauge */}
            <div className="relative w-full overflow-x-auto py-4 flex justify-center">
              <svg viewBox="0 0 740 260" className="w-full max-w-[700px] h-auto drop-shadow-2xl">
                <defs>
                  <linearGradient id="frameCast" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="metalChrome" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <linearGradient id="thimbleKnurl" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                </defs>

                {/* U-Shaped Heavy Cast Frame */}
                <path
                  d="M120,60 C40,60 40,220 180,220 C240,220 280,180 280,140 L240,140 C240,170 210,190 175,190 C90,190 85,90 135,90 L135,60 Z"
                  fill="url(#frameCast)"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <text x="135" y="150" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">
                  0 - 25 mm / 0.01 mm
                </text>

                {/* Left Fixed Anvil */}
                <rect x="130" y="90" width="20" height="20" rx="1" fill="url(#metalChrome)" stroke="#334155" />

                {/* Specimen Wire / Sheet */}
                {thicknessMm > 0 && (
                  <rect
                    x="150"
                    y="75"
                    width={thicknessMm * 8}
                    height="50"
                    rx="2"
                    fill="#f59e0b"
                    stroke="#b45309"
                    strokeWidth="1.5"
                    className="drop-shadow-md"
                  />
                )}

                {/* Movable Spindle */}
                <rect
                  x={150 + thicknessMm * 8}
                  y="90"
                  width={200 - thicknessMm * 8}
                  height="20"
                  fill="url(#metalChrome)"
                  stroke="#334155"
                />

                {/* Main Sleeve (Barrel with Linear Pitch scale) */}
                <rect x="330" y="80" width="130" height="40" fill="url(#metalChrome)" stroke="#334155" strokeWidth="1.5" />
                {/* Reference Baseline */}
                <line x1="330" y1="100" x2="455" y2="100" stroke="#0f172a" strokeWidth="1.5" />
                {/* Upper millimeter ticks & Lower half-millimeter ticks */}
                {Array.from({ length: 26 }).map((_, i) => {
                  const sx = 340 + i * 4.2;
                  const isUpper = i % 2 === 0;
                  return (
                    <g key={`sg-sleeve-${i}`}>
                      {isUpper ? (
                        <>
                          <line x1={sx} y1="92" x2={sx} y2="100" stroke="#0f172a" strokeWidth="1.2" />
                          {(i / 2) % 5 === 0 && (
                            <text x={sx} y="88" fontSize="8" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                              {i / 2}
                            </text>
                          )}
                        </>
                      ) : (
                        <line x1={sx} y1="100" x2={sx} y2="108" stroke="#0f172a" strokeWidth="1" />
                      )}
                    </g>
                  );
                })}

                {/* Rotating Thimble & Ratchet Assembly (Moves with thickness) */}
                <g transform={`translate(${thicknessMm * 8}, 0)`}>
                  {/* Beveled Thimble */}
                  <polygon points="440,70 470,75 470,125 440,130" fill="url(#thimbleKnurl)" stroke="#334155" strokeWidth="1.5" />
                  <rect x="470" y="75" width="80" height="50" rx="2" fill="url(#thimbleKnurl)" stroke="#334155" strokeWidth="1.5" />

                  {/* Circular Scale Ticks on Bevel */}
                  {Array.from({ length: 21 }).map((_, c) => {
                    const offsetDiv = (circularReading - 10 + c + 100) % 100;
                    const ty = 75 + c * 2.5;
                    const isTen = offsetDiv % 10 === 0;
                    const isMatch = offsetDiv === circularReading;
                    return (
                      <g key={`circ-${c}`}>
                        <line
                          x1="440"
                          y1={ty}
                          x2="452"
                          y2={ty}
                          stroke={isMatch ? "#ef4444" : "#0f172a"}
                          strokeWidth={isMatch ? 2 : 1}
                        />
                        {isTen && (
                          <text x="460" y={ty + 3} fontSize="7" fontWeight="bold" fill={isMatch ? "#ef4444" : "#1e293b"}>
                            {offsetDiv}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Ratchet Cap */}
                  <rect x="550" y="85" width="35" height="30" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                  <line x1="560" y1="85" x2="560" y2="115" stroke="#64748b" strokeWidth="1" />
                  <line x1="570" y1="85" x2="570" y2="115" stroke="#64748b" strokeWidth="1" />
                </g>
              </svg>
            </div>

            <div className="mt-2 rounded-xl bg-slate-800/80 border border-slate-700/80 p-3 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-semibold text-slate-200">Linear Scale (Sleeve): </span>
                <span className="text-emerald-400 font-bold">{msr} mm</span>
                <span className="mx-2 text-slate-500">|</span>
                <span className="font-semibold text-slate-200">Circular Coincidence (HSR): </span>
                <span className="text-sky-400 font-bold">#{circularReading}</span>
              </div>
              <div className="font-mono text-emerald-400 font-bold">
                Reading = {msr} + ({circularReading} × 0.01) = {total} mm
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Thimble Rotation / Thickness:
              </label>
              <span className="text-sm font-bold text-primary font-mono">{thicknessMm.toFixed(2)} mm</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.01"
              value={thicknessMm}
              onChange={(e) => setThicknessMm(parseFloat(e.target.value))}
              className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setThicknessMm(0.38)}
                className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                Thin Wire (0.38 mm)
              </button>
              <button
                onClick={() => setThicknessMm(1.85)}
                className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                Metal Plate (1.85 mm)
              </button>
              <button
                onClick={() => setThicknessMm(5.24)}
                className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                Lead Shot (5.24 mm)
              </button>
            </div>
          </div>
        </div>

        {/* Observation & Calculations */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Screw Gauge Formula & Calculations
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Pitch:</span>
                <span className="font-mono font-semibold">1.0 mm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Number of Circular Divs:</span>
                <span className="font-mono font-semibold">100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Least Count (LC = Pitch/N):</span>
                <span className="font-mono font-semibold text-emerald-500 font-bold">0.01 mm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Linear Scale Reading (MSR):</span>
                <span className="font-mono font-semibold">{msr} mm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Circular Scale Reading (CSR):</span>
                <span className="font-mono font-semibold text-sky-500 font-bold">{circularReading}</span>
              </div>
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 mt-2">
                <div className="text-[11px] font-semibold text-primary uppercase">Total Measured Thickness</div>
                <div className="text-xl font-extrabold text-foreground font-mono mt-0.5">
                  {total} mm
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
   3. SIMPLE PENDULUM SIMULATOR
   ========================================================================= */
function SimplePendulumSimulator() {
  const [lengthM, setLengthM] = useState<number>(0.8); // 80 cm
  const [gravityPreset, setGravityPreset] = useState<string>("kathmandu");
  const [gravityG, setGravityG] = useState<number>(9.802);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [initialAngleDeg, setInitialAngleDeg] = useState<number>(8); // Small angle approx (< 10 deg)
  const [recordedLaps, setRecordedLaps] = useState<{ length: number; time20: number; period: number; tSquared: number }[]>([
    { length: 0.5, time20: 28.36, period: 1.418, tSquared: 2.011 },
    { length: 0.7, time20: 33.56, period: 1.678, tSquared: 2.816 },
    { length: 0.9, time20: 38.08, period: 1.904, tSquared: 3.625 },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef<number>((initialAngleDeg * Math.PI) / 180);
  const velocityRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  // Theoretical Period T = 2π √(L/g)
  const theoreticalPeriod = useMemo(() => {
    return 2 * Math.PI * Math.sqrt(lengthM / gravityG);
  }, [lengthM, gravityG]);

  // Handle Gravity Presets
  const handleGravityChange = (val: string) => {
    setGravityPreset(val);
    if (val === "kathmandu") setGravityG(9.802);
    else if (val === "standard") setGravityG(9.80665);
    else if (val === "equator") setGravityG(9.780);
    else if (val === "pole") setGravityG(9.832);
    else if (val === "moon") setGravityG(1.62);
  };

  // Canvas Pendulum Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = isRunning;

    const render = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      if (running) {
        // Differential equation: θ'' = -(g/L) * sin(θ) - damping * θ'
        const accel = -(gravityG / lengthM) * Math.sin(angleRef.current) - 0.015 * velocityRef.current;
        velocityRef.current += accel * dt;
        angleRef.current += velocityRef.current * dt;
      }

      // Drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const originX = canvas.width / 2;
      const originY = 30;
      const scale = 220; // pixels per meter
      const bobX = originX + lengthM * scale * Math.sin(angleRef.current);
      const bobY = originY + lengthM * scale * Math.cos(angleRef.current);

      // Support stand
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(originX - 60, originY);
      ctx.lineTo(originX + 60, originY);
      ctx.stroke();

      // Pivot dot
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(originX, originY, 4, 0, 2 * Math.PI);
      ctx.fill();

      // String line
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Metallic Bob with 3D gradient
      const bobRadius = 14;
      const grad = ctx.createRadialGradient(bobX - 4, bobY - 4, 2, bobX, bobY, bobRadius);
      grad.addColorStop(0, "#fbbf24");
      grad.addColorStop(0.7, "#d97706");
      grad.addColorStop(1, "#78350f");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#92400e";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Angle indicator arc
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(originX, originY, 60, Math.PI / 2 - Math.abs(angleRef.current), Math.PI / 2 + Math.abs(angleRef.current));
      ctx.stroke();
      ctx.setLineDash([]);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, lengthM, gravityG]);

  const addCurrentReading = () => {
    const period = theoreticalPeriod;
    const time20 = period * 20;
    const tSquared = period * period;
    setRecordedLaps((prev) => [
      ...prev,
      {
        length: lengthM,
        time20: Math.round(time20 * 100) / 100,
        period: Math.round(period * 1000) / 1000,
        tSquared: Math.round(tSquared * 1000) / 1000,
      },
    ]);
  };

  // Linear Regression on L vs T^2
  const computedGFromSlope = useMemo(() => {
    if (recordedLaps.length < 2) return gravityG;
    const n = recordedLaps.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    recordedLaps.forEach((d) => {
      sumX += d.tSquared;
      sumY += d.length;
      sumXY += d.tSquared * d.length;
      sumXX += d.tSquared * d.tSquared;
    });
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    // T^2 = (4π^2 / g) * L => L / T^2 = g / (4π^2) => g = 4π^2 * slope
    return 4 * Math.PI * Math.PI * slope;
  }, [recordedLaps, gravityG]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden">
            <div className="flex justify-between items-center mb-2 z-10 relative">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/20 border border-sky-500/30 px-2.5 py-1 text-xs font-semibold text-sky-300">
                Harmonic Oscillation | g = {gravityG} m/s²
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isRunning ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-emerald-500 text-white"
                  }`}
                >
                  {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {isRunning ? "Pause" : "Release"}
                </button>
                <button
                  onClick={() => {
                    angleRef.current = (initialAngleDeg * Math.PI) / 180;
                    velocityRef.current = 0;
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Reset displacement"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Pendulum Animation Canvas */}
            <div className="flex justify-center">
              <canvas ref={canvasRef} width={500} height={320} className="w-full max-w-[480px] h-[300px]" />
            </div>

            {/* Live Period Readout */}
            <div className="mt-2 rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400">Time for 20 Oscillations (20T): </span>
                <span className="font-mono font-bold text-sky-400">{(theoreticalPeriod * 20).toFixed(2)} s</span>
              </div>
              <div>
                <span className="text-slate-400">Period (T): </span>
                <span className="font-mono font-bold text-emerald-400">{theoreticalPeriod.toFixed(3)} s</span>
              </div>
              <button
                onClick={addCurrentReading}
                className="px-3 py-1 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                + Log Reading to Table
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-foreground">Effective Length (L):</label>
                  <span className="text-xs font-mono font-bold text-primary">{(lengthM * 100).toFixed(0)} cm ({lengthM.toFixed(2)} m)</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="1.3"
                  step="0.05"
                  value={lengthM}
                  onChange={(e) => setLengthM(parseFloat(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Location / Gravity Preset:</label>
                <select
                  value={gravityPreset}
                  onChange={(e) => handleGravityChange(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border bg-background px-3 py-1.5 font-medium"
                >
                  <option value="kathmandu">Kathmandu, Nepal (g = 9.802 m/s²)</option>
                  <option value="standard">Standard Sea Level (g = 9.807 m/s²)</option>
                  <option value="equator">Equator (g = 9.780 m/s²)</option>
                  <option value="pole">North Pole (g = 9.832 m/s²)</option>
                  <option value="moon">Moon (g = 1.620 m/s²)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Observation Table & L vs T^2 Graph */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
            <h4 className="text-sm font-bold text-foreground flex items-center justify-between border-b border-border/60 pb-2">
              <span>Observation Table (L vs T²)</span>
              <span className="text-xs text-muted-foreground font-normal">{recordedLaps.length} readings</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="py-1">L (m)</th>
                    <th className="py-1">20T (s)</th>
                    <th className="py-1">T (s)</th>
                    <th className="py-1">T² (s²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recordedLaps.map((row, idx) => (
                    <tr key={idx} className="font-mono">
                      <td className="py-1 text-foreground font-semibold">{row.length.toFixed(2)}</td>
                      <td className="py-1">{row.time20.toFixed(2)}</td>
                      <td className="py-1">{row.period.toFixed(3)}</td>
                      <td className="py-1 text-emerald-500 font-bold">{row.tSquared.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Regression G value */}
            <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 text-xs space-y-1">
              <div className="text-[11px] font-semibold text-primary uppercase">Calculated Value of 'g' from Slope:</div>
              <div className="text-xl font-extrabold text-foreground font-mono">
                {computedGFromSlope.toFixed(3)} m/s²
              </div>
              <div className="text-[10px] text-muted-foreground">
                Formula: g = 4π² × (Slope of L vs T²) = 4π² × (L / T²)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. PRISM & MINIMUM DEVIATION SIMULATOR
   ========================================================================= */
function PrismRefractionSimulator() {
  const [incidentAngleDeg, setIncidentAngleDeg] = useState<number>(48);
  const [prismAngleDeg, setPrismAngleDeg] = useState<number>(60);
  const [refractiveIndex, setRefractiveIndex] = useState<number>(1.52); // Crown glass
  const [isWhiteLight, setIsWhiteLight] = useState<boolean>(true);

  // Snell's law at Face 1: sin(i1) = μ * sin(r1) => r1 = arcsin(sin(i1) / μ)
  const i1Rad = (incidentAngleDeg * Math.PI) / 180;
  const ARad = (prismAngleDeg * Math.PI) / 180;

  const r1Rad = Math.asin(Math.min(1, Math.sin(i1Rad) / refractiveIndex));
  const r2Rad = ARad - r1Rad;

  // Total internal reflection check at Face 2
  const isTIR = Math.sin(r2Rad) * refractiveIndex > 1;
  const i2Rad = isTIR ? 0 : Math.asin(Math.min(1, refractiveIndex * Math.sin(r2Rad)));

  const r1Deg = (r1Rad * 180) / Math.PI;
  const r2Deg = (r2Rad * 180) / Math.PI;
  const i2Deg = (i2Rad * 180) / Math.PI;
  // Deviation δ = i1 + i2 - A
  const deviationDeg = isTIR ? 0 : incidentAngleDeg + i2Deg - prismAngleDeg;

  // Minimum Deviation when i1 = i2 and r1 = r2 = A/2
  // μ = sin((A + Dm)/2) / sin(A/2) => Dm = 2 * arcsin(μ * sin(A/2)) - A
  const minimumDeviationDeg = useMemo(() => {
    const val = 2 * Math.asin(refractiveIndex * Math.sin(ARad / 2)) - ARad;
    return (val * 180) / Math.PI;
  }, [refractiveIndex, ARad]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                Ray Optics & Dispersion | Prism A = {prismAngleDeg}°
              </span>
              <span className="text-xs text-slate-400">
                Min Deviation (Dm): <span className="text-indigo-400 font-bold">{minimumDeviationDeg.toFixed(2)}°</span>
              </span>
            </div>

            {/* Prism Optical Ray Tracing SVG */}
            <div className="relative w-full overflow-x-auto py-2 flex justify-center">
              <svg viewBox="0 0 600 320" className="w-full max-w-[560px] h-[280px]">
                <defs>
                  <linearGradient id="prismGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Triangular Glass Prism */}
                <polygon points="300,40 180,260 420,260" fill="url(#prismGlass)" stroke="#38bdf8" strokeWidth="2" />
                <text x="300" y="32" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">
                  A = {prismAngleDeg}°
                </text>

                {/* Face 1 Normal line */}
                <line x1="160" y1="110" x2="290" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" />
                {/* Face 2 Normal line */}
                <line x1="440" y1="110" x2="310" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="4,4" />

                {/* Incident Ray */}
                <line x1="80" y1={150 - (incidentAngleDeg - 30) * 1.5} x2="235" y2="150" stroke="#facc15" strokeWidth="2.5" />
                {/* Arrow on Incident Ray */}
                <polygon points="150,140 160,144 150,148" fill="#facc15" />

                {/* Refracted Ray through glass */}
                <line x1="235" y1="150" x2="365" y2="150 + (r2Deg - r1Deg) * 1.5" stroke="#facc15" strokeWidth="2.5" />

                {/* Emergent Rays (Dispersed Spectrum or Single Ray) */}
                {!isTIR && (
                  <>
                    {isWhiteLight ? (
                      <g>
                        {/* Red Ray */}
                        <line x1="365" y1="155" x2="520" y2={155 + deviationDeg * 1.6} stroke="#ef4444" strokeWidth="2" />
                        {/* Yellow Ray */}
                        <line x1="365" y1="155" x2="520" y2={160 + deviationDeg * 1.7} stroke="#eab308" strokeWidth="2" />
                        {/* Green Ray */}
                        <line x1="365" y1="155" x2="520" y2={165 + deviationDeg * 1.8} stroke="#22c55e" strokeWidth="2" />
                        {/* Violet Ray */}
                        <line x1="365" y1="155" x2="520" y2={170 + deviationDeg * 2.0} stroke="#a855f7" strokeWidth="2" />
                      </g>
                    ) : (
                      <line x1="365" y1="155" x2="520" y2={155 + deviationDeg * 1.7} stroke="#facc15" strokeWidth="2.5" />
                    )}
                  </>
                )}
              </svg>
            </div>

            <div className="mt-2 rounded-xl bg-slate-900/90 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400">Angle of Incidence (i₁): </span>
                <span className="font-mono font-bold text-amber-400">{incidentAngleDeg}°</span>
              </div>
              <div>
                <span className="text-slate-400">Angle of Emergence (i₂): </span>
                <span className="font-mono font-bold text-sky-400">{i2Deg.toFixed(1)}°</span>
              </div>
              <div>
                <span className="text-slate-400">Deviation Angle (δ): </span>
                <span className="font-mono font-bold text-emerald-400">{deviationDeg.toFixed(2)}°</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-foreground">Angle of Incidence (i₁):</label>
                  <span className="text-xs font-mono font-bold text-primary">{incidentAngleDeg}°</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="75"
                  step="1"
                  value={incidentAngleDeg}
                  onChange={(e) => setIncidentAngleDeg(parseFloat(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Prism Material (μ):</label>
                <select
                  value={refractiveIndex}
                  onChange={(e) => setRefractiveIndex(parseFloat(e.target.value))}
                  className="w-full text-xs rounded-lg border border-border bg-background px-3 py-1.5 font-medium"
                >
                  <option value="1.52">Crown Glass (μ = 1.52)</option>
                  <option value="1.66">Flint Glass (μ = 1.66)</option>
                  <option value="1.33">Water Hollow Prism (μ = 1.33)</option>
                  <option value="2.42">Diamond (μ = 2.42)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Refractive Index Formula Breakdown */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Prism Refractive Index Formula
            </h4>
            <div className="rounded-xl bg-muted/60 p-3 font-mono text-center text-xs text-foreground font-semibold border border-border/60">
              μ = sin((A + Dm)/2) / sin(A/2)
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Prism Angle (A):</span>
                <span className="font-mono font-semibold">{prismAngleDeg}°</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Minimum Deviation (Dm):</span>
                <span className="font-mono font-semibold text-indigo-500 font-bold">{minimumDeviationDeg.toFixed(2)}°</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Calculated μ:</span>
                <span className="font-mono font-semibold text-emerald-500 font-bold">{refractiveIndex.toFixed(3)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. RESONANCE TUBE SPEED OF SOUND SIMULATOR
   ========================================================================= */
function ResonanceTubeSimulator() {
  const [frequencyHz, setFrequencyHz] = useState<number>(512);
  const [waterLevelCm, setWaterLevelCm] = useState<number>(16.5);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const actualSpeedSound = 343; // m/s at 20°C
  const tubeDiameterCm = 3.0;
  const endCorrectionCm = 0.3 * tubeDiameterCm; // e = 0.3d = 0.9 cm

  // 1st Resonance Length l1 = λ/4 - e = (v/(4f)) - e
  const wavelengthCm = (actualSpeedSound / frequencyHz) * 100;
  const l1Cm = wavelengthCm / 4 - endCorrectionCm;
  const l2Cm = (3 * wavelengthCm) / 4 - endCorrectionCm;

  // Resonance match intensity (Gaussian proximity peak)
  const dist1 = Math.abs(waterLevelCm - l1Cm);
  const dist2 = Math.abs(waterLevelCm - l2Cm);
  const resonanceIntensity = Math.max(Math.exp(-(dist1 * dist1) / 3), Math.exp(-(dist2 * dist2) / 3));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300">
                Tuning Fork: {frequencyHz} Hz | λ = {wavelengthCm.toFixed(1)} cm
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold ${
                    soundEnabled ? "bg-amber-500 text-slate-900 font-bold" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  {soundEnabled ? "Audio Active" : "Mute Sound"}
                </button>
              </div>
            </div>

            {/* Resonance Tube SVG */}
            <div className="relative w-full overflow-x-auto py-2 flex justify-center">
              <svg viewBox="0 0 500 300" className="w-full max-w-[480px] h-[260px]">
                {/* Tuning fork with vibration waves */}
                <g transform="translate(190, 15)">
                  <rect x="15" y="0" width="8" height="35" rx="2" fill="#94a3b8" />
                  <rect x="35" y="0" width="8" height="35" rx="2" fill="#94a3b8" />
                  <rect x="15" y="35" width="28" height="8" rx="2" fill="#94a3b8" />
                  <rect x="25" y="43" width="8" height="25" rx="1" fill="#64748b" />
                  {/* Acoustic glow waves if at resonance */}
                  {resonanceIntensity > 0.4 && (
                    <circle cx="29" cy="20" r={40 * resonanceIntensity} fill="none" stroke="#f59e0b" strokeWidth="2" opacity={resonanceIntensity} />
                  )}
                </g>

                {/* Glass Cylinder Column */}
                <rect x="200" y="80" width="60" height="200" fill="rgba(56, 189, 248, 0.05)" stroke="#38bdf8" strokeWidth="2" rx="2" />

                {/* Water Column inside tube (height inverted: air column length) */}
                <rect
                  x="202"
                  y={80 + waterLevelCm * 2.2}
                  width="56"
                  height={200 - waterLevelCm * 2.2}
                  fill="#0284c7"
                  opacity="0.8"
                />

                {/* Standing Wave Visualizer inside Air Column */}
                <path
                  d={`M200,80 Q230,${80 + (waterLevelCm * 2.2) / 2} 200,${80 + waterLevelCm * 2.2} M260,80 Q230,${
                    80 + (waterLevelCm * 2.2) / 2
                  } 260,${80 + waterLevelCm * 2.2}`}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={1.5 + resonanceIntensity * 2}
                  strokeDasharray="3,3"
                />

                {/* Air Column Height Metric Arrow */}
                <line x1="280" y1="80" x2="280" y2={80 + waterLevelCm * 2.2} stroke="#f8fafc" strokeWidth="1.5" />
                <text x="290" y={85 + (waterLevelCm * 2.2) / 2} fontSize="11" fontWeight="bold" fill="#f8fafc">
                  l = {waterLevelCm.toFixed(1)} cm
                </text>
              </svg>
            </div>

            {/* Resonance Loudness Status */}
            <div className="mt-2 rounded-xl bg-slate-900 border border-slate-800 p-3 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Resonance State:</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full transition-all duration-150" style={{ width: `${resonanceIntensity * 100}%` }} />
                </div>
                <span className="font-mono font-bold text-amber-400">{(resonanceIntensity * 100).toFixed(0)}% LOUDNESS</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-foreground">Air Column Length (l):</label>
                  <span className="text-xs font-mono font-bold text-primary">{waterLevelCm.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="65"
                  step="0.5"
                  value={waterLevelCm}
                  onChange={(e) => setWaterLevelCm(parseFloat(e.target.value))}
                  className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Tuning Fork Frequency (f):</label>
                <select
                  value={frequencyHz}
                  onChange={(e) => setFrequencyHz(parseInt(e.target.value))}
                  className="w-full text-xs rounded-lg border border-border bg-background px-3 py-1.5 font-medium"
                >
                  <option value="512">512 Hz (Standard Tuning)</option>
                  <option value="480">480 Hz</option>
                  <option value="340">340 Hz</option>
                  <option value="256">256 Hz</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Speed of Sound Calculations */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Resonance & Velocity of Sound
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">1st Resonance (l₁ = λ/4 - e):</span>
                <span className="font-mono font-bold text-sky-500">{l1Cm.toFixed(1)} cm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">2nd Resonance (l₂ = 3λ/4 - e):</span>
                <span className="font-mono font-bold text-emerald-500">{l2Cm.toFixed(1)} cm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">End Correction (e = 0.3d):</span>
                <span className="font-mono">{endCorrectionCm.toFixed(2)} cm</span>
              </div>

              <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 mt-2">
                <div className="text-[11px] font-semibold text-primary uppercase">Calculated Velocity of Sound</div>
                <div className="text-xl font-extrabold text-foreground font-mono mt-0.5">
                  v = 2f(l₂ - l₁) = {actualSpeedSound} m/s
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
   6. METER BRIDGE SIMULATOR (Wheatstone Bridge)
   ========================================================================= */
function MeterBridgeSimulator() {
  const [jockeyPositionCm, setJockeyPositionCm] = useState<number>(45.0);
  const [knownResistanceR, setKnownResistanceR] = useState<number>(10.0);
  const actualUnknownS = 12.22; // Unknown resistor in Ohm

  // Null point condition: R / S = l / (100 - l) => S_calc = R * (100 - l) / l
  const calculatedS = (knownResistanceR * (100 - jockeyPositionCm)) / jockeyPositionCm;
  const nullPointCm = (100 * knownResistanceR) / (knownResistanceR + actualUnknownS);
  const galvanometerDeflection = (jockeyPositionCm - nullPointCm) * 3.2; // mA

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300">
                Wheatstone Bridge Principle: R / S = l / (100 - l)
              </span>
              <span className="text-xs text-slate-400">
                Balance Point: <span className="text-emerald-400 font-bold">{nullPointCm.toFixed(1)} cm</span>
              </span>
            </div>

            {/* Meter Bridge SVG */}
            <div className="relative w-full overflow-x-auto py-2 flex justify-center">
              <svg viewBox="0 0 600 240" className="w-full max-w-[560px] h-[220px]">
                {/* Wooden Board Base */}
                <rect x="40" y="40" width="520" height="160" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="2" />

                {/* Thick Copper Strips */}
                <path d="M60,60 L140,60 L140,80 L80,80 L80,140 L60,140 Z" fill="#f59e0b" stroke="#b45309" />
                <rect x="180" y="60" width="240" height="20" fill="#f59e0b" stroke="#b45309" />
                <path d="M540,60 L460,60 L460,80 L520,80 L520,140 L540,140 Z" fill="#f59e0b" stroke="#b45309" />

                {/* 100 cm Constantan/Manganin Wire */}
                <line x1="70" y1="130" x2="530" y2="130" stroke="#f1f5f9" strokeWidth="2.5" />

                {/* Left Gap: Known Resistance Box R */}
                <rect x="140" y="55" width="40" height="28" rx="2" fill="#1e293b" stroke="#64748b" />
                <text x="160" y="73" fontSize="10" fontWeight="bold" fill="#f8fafc" textAnchor="middle">
                  R={knownResistanceR}Ω
                </text>

                {/* Right Gap: Unknown Coil S */}
                <rect x="420" y="55" width="40" height="28" rx="2" fill="#1e293b" stroke="#64748b" />
                <text x="440" y="73" fontSize="10" fontWeight="bold" fill="#f8fafc" textAnchor="middle">
                  S=?
                </text>

                {/* Center Galvanometer */}
                <circle cx="300" cy="100" r="24" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                <line x1="300" y1="100" x2={300 + Math.max(-20, Math.min(20, galvanometerDeflection))} y2="84" stroke="#ef4444" strokeWidth="2" />
                <text x="300" y="116" fontSize="8" fontWeight="bold" fill="#f8fafc" textAnchor="middle">G (0-Center)</text>

                {/* Sliding Jockey touching the wire */}
                <g transform={`translate(${70 + jockeyPositionCm * 4.6}, 130)`}>
                  <polygon points="0,0 -6,-15 6,-15" fill="#38bdf8" />
                  <line x1="0" y1="-15" x2={300 - (70 + jockeyPositionCm * 4.6)} y2="-30" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                </g>
              </svg>
            </div>

            <div className="mt-2 rounded-xl bg-slate-900 border border-slate-800 p-3 flex items-center justify-between text-xs">
              <span className="text-slate-300">Galvanometer Needle Deflection:</span>
              <span className={`font-mono font-bold ${Math.abs(galvanometerDeflection) < 1 ? "text-emerald-400" : "text-amber-400"}`}>
                {Math.abs(galvanometerDeflection) < 0.5 ? "0 mA (NULL POINT ACHIEVED! 🎉)" : `${galvanometerDeflection.toFixed(1)} mA deflection`}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-foreground">Slide Jockey Position (l):</label>
              <span className="text-xs font-mono font-bold text-primary">{jockeyPositionCm.toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="0.1"
              value={jockeyPositionCm}
              onChange={(e) => setJockeyPositionCm(parseFloat(e.target.value))}
              className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Unknown Resistance Calculation
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Known Resistor (R):</span>
                <span className="font-mono font-bold">{knownResistanceR} Ω</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Balancing Length (l):</span>
                <span className="font-mono">{jockeyPositionCm.toFixed(1)} cm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/30">
                <span className="text-muted-foreground">Remaining Length (100 - l):</span>
                <span className="font-mono">{(100 - jockeyPositionCm).toFixed(1)} cm</span>
              </div>

              <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 mt-2">
                <div className="text-[11px] font-semibold text-primary uppercase">Calculated Unknown (S)</div>
                <div className="text-xl font-extrabold text-foreground font-mono mt-0.5">
                  {calculatedS.toFixed(2)} Ω
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
