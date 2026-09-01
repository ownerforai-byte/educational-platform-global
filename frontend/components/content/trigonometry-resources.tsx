/**
 * Trigonometry Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics → Unit: Trigonometry
 */

"use client";

import { useState } from "react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ---------- Unit Circle Visual ---------- */
function UnitCircleVisual() {
  const [angle, setAngle] = useState(45);
  const rad = (angle * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);
  const tanVal = Math.tan(rad);

  const cx = 150;
  const cy = 150;
  const r = 100;

  const pointX = cx + cosVal * r;
  const pointY = cy - sinVal * r;

  const quadrant =
    angle >= 0 && angle < 90
      ? "I"
      : angle >= 90 && angle < 180
        ? "II"
        : angle >= 180 && angle < 270
          ? "III"
          : "IV";

  const refAngle =
    angle <= 90
      ? angle
      : angle <= 180
        ? 180 - angle
        : angle <= 270
          ? angle - 180
          : 360 - angle;

  const sinColor = "#ef4444";
  const cosColor = "#22c55e";
  const tanColor = "#f59e0b";

  // Small wave inset
  const waveW = 120;
  const waveH = 50;
  const waveOx = 280;
  const waveOy = 100;
  const waveScale = 30;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">θ =</span>
          <span className="font-mono font-semibold w-14 text-center">{angle}°</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Quad:</span>
          <span className="font-mono font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
            {quadrant}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Ref angle:</span>
          <span className="font-mono font-semibold w-12 text-center">{refAngle.toFixed(1)}°</span>
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox="0 0 400 300" className="w-full max-w-md border rounded-lg bg-slate-950">
          {/* Axes */}
          <line x1={20} y1={cy} x2={280} y2={cy} stroke="#475569" strokeWidth="1.5" />
          <line x1={cx} y1={20} x2={cx} y2={280} stroke="#475569" strokeWidth="1.5" />
          <text x={270} y={cy - 6} fill="#64748b" fontSize="10">x</text>
          <text x={cx + 6} y={28} fill="#64748b" fontSize="10">y</text>

          {/* Circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#8b5cf6" strokeWidth="1.5" />

          {/* Angle arc */}
          {angle > 0 && (
            <path
              d={(() => {
                const startAngle = 0;
                const endAngle = -rad;
                const largeArc = angle > 180 ? 1 : 0;
                const endX = cx + 20 * Math.cos(endAngle);
                const endY = cy - 20 * Math.sin(endAngle);
                return `M ${cx + 20} ${cy} A 20 20 0 ${largeArc} 0 ${endX} ${endY}`;
              })()}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.8"
            />
          )}

          {/* Cos line (horizontal projection) */}
          <line
            x1={cx}
            y1={cy}
            x2={pointX}
            y2={cy}
            stroke={cosColor}
            strokeWidth="2.5"
            opacity="0.8"
          />
          <text x={(cx + pointX) / 2 - 8} y={cy + 14} fill={cosColor} fontSize="9">
            cos={cosVal.toFixed(2)}
          </text>

          {/* Sin line (vertical projection) */}
          <line
            x1={pointX}
            y1={cy}
            x2={pointX}
            y2={pointY}
            stroke={sinColor}
            strokeWidth="2.5"
            opacity="0.8"
          />
          <text x={pointX + 6} y={(cy + pointY) / 2} fill={sinColor} fontSize="9">
            sin={sinVal.toFixed(2)}
          </text>

          {/* Tan line */}
          {Math.abs(tanVal) < 5 && (
            <line
              x1={cx + r}
              y1={cy}
              x2={cx + r}
              y2={cy - tanVal * r}
              stroke={tanColor}
              strokeWidth="2"
              strokeDasharray="4 2"
              opacity="0.8"
            />
          )}

          {/* Point on circle */}
          <circle cx={pointX} cy={pointY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />

          {/* Radial line */}
          <line x1={cx} y1={cy} x2={pointX} y2={pointY} stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />

          {/* Quadrant labels */}
          <text x={cx + r + 8} y={cy - 10} fill="#94a3b8" fontSize="9">QI</text>
          <text x={cx - r - 28} y={cy - 10} fill="#94a3b8" fontSize="9">QII</text>
          <text x={cx - r - 28} y={cy + 18} fill="#94a3b8" fontSize="9">QIII</text>
          <text x={cx + r + 8} y={cy + 18} fill="#94a3b8" fontSize="9">QIV</text>

          {/* Wave inset */}
          <rect x={waveOx} y={waveOy} width={waveW} height={waveH} fill="#1e293b" stroke="#475569" strokeWidth="0.5" rx="4" />
          <text x={waveOx + 4} y={waveOy + 10} fill="#94a3b8" fontSize="7">wave projection</text>

          {/* Sin wave */}
          <path
            d={Array.from({ length: waveW }, (_, i) => {
              const x = waveOx + i;
              const theta = (i / waveW) * 2 * Math.PI;
              const y = waveOy + waveH / 2 - Math.sin(theta) * (waveH / 2 - 4);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ")}
            fill="none"
            stroke={sinColor}
            strokeWidth="1"
            opacity="0.7"
          />

          {/* Cos wave */}
          <path
            d={Array.from({ length: waveW }, (_, i) => {
              const x = waveOx + i;
              const theta = (i / waveW) * 2 * Math.PI;
              const y = waveOy + waveH / 2 - Math.cos(theta) * (waveH / 2 - 4);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ")}
            fill="none"
            stroke={cosColor}
            strokeWidth="1"
            opacity="0.7"
          />

          {/* Current position marker on waves */}
          {(() => {
            const markerX = waveOx + ((rad % (2 * Math.PI)) / (2 * Math.PI)) * waveW;
            return (
              <>
                <circle cx={markerX} cy={waveOy + waveH / 2 - sinVal * (waveH / 2 - 4)} r="2.5" fill={sinColor} />
                <circle cx={markerX} cy={waveOy + waveH / 2 - cosVal * (waveH / 2 - 4)} r="2.5" fill={cosColor} />
              </>
            );
          })()}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="text-red-500 font-semibold">sin(θ)</div>
          <div className="font-mono">{sinVal.toFixed(4)}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="text-green-500 font-semibold">cos(θ)</div>
          <div className="font-mono">{cosVal.toFixed(4)}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <div className="text-yellow-500 font-semibold">tan(θ)</div>
          <div className="font-mono">
            {Math.abs(tanVal) > 1e6 ? "undef" : tanVal.toFixed(4)}
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">
          θ = {angle}° ({((angle * Math.PI) / 180).toFixed(3)} rad)
        </label>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>
    </div>
  );
}

/* ---------- Inverse Trig Visual ---------- */
function InverseTrigVisual() {
  const [x, setX] = useState(0.5);
  const [activeFn, setActiveFn] = useState<"sin" | "cos" | "tan">("sin");

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const safeX = clamp(x, -1, 1);

  const sinInv = Math.asin(safeX);
  const cosInv = Math.acos(safeX);
  const tanInv = Math.atan(safeX);

  const results = {
    sin: { value: sinInv, deg: (sinInv * 180) / Math.PI, domain: "[-1, 1]", range: "[-π/2, π/2]" },
    cos: { value: cosInv, deg: (cosInv * 180) / Math.PI, domain: "[-1, 1]", range: "[0, π]" },
    tan: { value: tanInv, deg: (tanInv * 180) / Math.PI, domain: "ℝ", range: "(-π/2, π/2)" },
  };

  const cur = results[activeFn];

  // SVG graph parameters
  const w = 300;
  const h = 220;
  const ox = 30;
  const oy = h - 30;
  const scaleX = 80;
  const scaleY = 40;

  const toSvgX = (vx: number) => ox + (vx + 1.5) * scaleX;
  const toSvgY = (vy: number) => oy - vy * scaleY;

  const fnPath = (fn: (v: number) => number, color: string) => {
    const steps = 200;
    const domainMin = -1.4;
    const domainMax = 1.4;
    let d = "";
    let prevY: number | null = null;
    for (let i = 0; i <= steps; i++) {
      const vx = domainMin + (i / steps) * (domainMax - domainMin);
      let vy: number;
      try {
        vy = fn(vx);
        if (!isFinite(vy) || Math.abs(vy) > 5) {
          prevY = null;
          continue;
        }
      } catch {
        prevY = null;
        continue;
      }
      const sx = toSvgX(vx);
      const sy = toSvgY(vy);
      if (prevY === null) {
        d += `M ${sx} ${sy} `;
      } else {
        d += `L ${sx} ${sy} `;
      }
      prevY = vy;
    }
    return <path d={d} fill="none" stroke={color} strokeWidth="2" opacity="0.8" />;
  };

  const pointSvgX = toSvgX(safeX);
  const pointSvgY = toSvgY(cur.value);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">x =</span>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(parseFloat(e.target.value) || 0)}
            className="w-20 bg-transparent border-b text-foreground"
            step="0.1"
            min={-1}
            max={1}
          />
        </div>
        <div className="flex gap-2">
          {(["sin", "cos", "tan"] as const).map((fn) => (
            <Button
              key={fn}
              variant={activeFn === fn ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFn(fn)}
              className="text-xs"
            >
              {fn}⁻¹
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-sm border rounded-lg bg-slate-950">
          {/* Axes */}
          <line x1={ox} y1={oy} x2={w - 10} y2={oy} stroke="#475569" strokeWidth="1" />
          <line x1={ox} y1={oy - 80} x2={ox} y2={oy + 5} stroke="#475569" strokeWidth="1" />
          <text x={w - 15} y={oy + 14} fill="#64748b" fontSize="9">x</text>
          <text x={ox + 6} y={oy - 75} fill="#64748b" fontSize="9">y</text>

          {/* Domain boundaries */}
          <line x1={toSvgX(-1)} y1={oy - 80} x2={toSvgX(-1)} y2={oy + 5} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
          <line x1={toSvgX(1)} y1={oy - 80} x2={toSvgX(1)} y2={oy + 5} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
          <text x={toSvgX(-1) - 8} y={oy + 14} fill="#ef4444" fontSize="7">-1</text>
          <text x={toSvgX(1) - 4} y={oy + 14} fill="#ef4444" fontSize="7">1</text>

          {/* Range boundaries */}
          <line x1={ox} y1={toSvgY(Math.PI / 2)} x2={w - 10} y2={toSvgY(Math.PI / 2)} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
          <line x1={ox} y1={toSvgY(-Math.PI / 2)} x2={w - 10} y2={toSvgY(-Math.PI / 2)} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
          <text x={ox - 4} y={toSvgY(Math.PI / 2) + 3} fill="#94a3b8" fontSize="7">π/2</text>
          <text x={ox - 4} y={toSvgY(-Math.PI / 2) + 3} fill="#94a3b8" fontSize="7">-π/2</text>

          {/* All three curves */}
          {fnPath(Math.asin, "#3b82f6")}
          {fnPath(Math.acos, "#10b981")}
          {fnPath(Math.atan, "#f59e0b")}

          {/* Current point */}
          <circle cx={pointSvgX} cy={pointSvgY} r="4" fill={activeFn === "sin" ? "#3b82f6" : activeFn === "cos" ? "#10b981" : "#f59e0b"} stroke="#fff" strokeWidth="1.5" />

          {/* Legend */}
          <circle cx={15} cy={15} r="4" fill="#3b82f6" />
          <text x={22} y={18} fill="#94a3b8" fontSize="8">sin⁻¹</text>
          <circle cx={60} cy={15} r="4" fill="#10b981" />
          <text x={67} y={18} fill="#94a3b8" fontSize="8">cos⁻¹</text>
          <circle cx={105} cy={15} r="4" fill="#f59e0b" />
          <text x={112} y={18} fill="#94a3b8" fontSize="8">tan⁻¹</text>
        </svg>
      </div>

      <div className="p-3 rounded-lg border bg-background/60">
        <div className="text-sm font-semibold mb-2">
          {activeFn === "sin" ? "sin⁻¹" : activeFn === "cos" ? "cos⁻¹" : "tan⁻¹"}({x.toFixed(2)})
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Value: </span>
            <span className="font-mono">{cur.value.toFixed(4)} rad</span>
          </div>
          <div>
            <span className="text-muted-foreground">Degrees: </span>
            <span className="font-mono">{cur.deg.toFixed(2)}°</span>
          </div>
          <div>
            <span className="text-muted-foreground">Domain: </span>
            <span className="font-mono">{cur.domain}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Range: </span>
            <span className="font-mono">{cur.range}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Inverse Trigonometric Functions:</strong> Each inverse trig function returns the angle whose trig ratio equals the input.
        The principal value branch restricts the output to a specific interval, ensuring the function is one-to-one.
      </div>
    </div>
  );
}

/* ---------- Trig Equations Visual ---------- */
function TrigEquationsVisual() {
  const [k, setK] = useState(0.5);
  const [activeEq, setActiveEq] = useState<"sin" | "cos" | "tan">("sin");

  const alpha = Math.asin(Math.min(1, Math.max(-1, k)));
  const alphaDeg = (alpha * 180) / Math.PI;

  const results = {
    sin: {
      generalSol: `x = nπ + (-1)ⁿ · α`,
      principal: `α = sin⁻¹(${k.toFixed(2)}) = ${alphaDeg.toFixed(1)}°`,
      first: `x = ${alphaDeg.toFixed(1)}° or x = ${(180 - alphaDeg).toFixed(1)}°`,
      n2: `x = ${(alphaDeg + 360).toFixed(1)}° or x = ${(180 - alphaDeg + 360).toFixed(1)}°`,
      nNeg: `x = ${(-alphaDeg).toFixed(1)}° or x = ${(-180 + alphaDeg).toFixed(1)}°`,
    },
    cos: {
      generalSol: `x = 2nπ ± α`,
      principal: `α = cos⁻¹(${k.toFixed(2)}) = ${alphaDeg.toFixed(1)}°`,
      first: `x = ±${alphaDeg.toFixed(1)}°`,
      n2: `x = 360° ± ${alphaDeg.toFixed(1)}°`,
      nNeg: `x = -360° ± ${alphaDeg.toFixed(1)}°`,
    },
    tan: {
      generalSol: `x = nπ + α`,
      principal: `α = tan⁻¹(${k.toFixed(2)}) = ${alphaDeg.toFixed(1)}°`,
      first: `x = ${alphaDeg.toFixed(1)}°`,
      n2: `x = ${alphaDeg.toFixed(1)}° + 180° = ${(alphaDeg + 180).toFixed(1)}°`,
      nNeg: `x = ${alphaDeg.toFixed(1)}° - 180° = ${(alphaDeg - 180).toFixed(1)}°`,
    },
  };

  const cur = results[activeEq];
  const color = activeEq === "sin" ? "#ef4444" : activeEq === "cos" ? "#22c55e" : "#f59e0b";

  // Small circle visualization
  const circleR = 70;
  const ccx = 100;
  const ccy = 100;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">k =</span>
          <input
            type="number"
            value={k}
            onChange={(e) => setK(parseFloat(e.target.value) || 0)}
            className="w-20 bg-transparent border-b text-foreground"
            step="0.1"
            min={-1}
            max={1}
          />
        </div>
        <div className="flex gap-2">
          {(["sin", "cos", "tan"] as const).map((fn) => (
            <Button
              key={fn}
              variant={activeEq === fn ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveEq(fn)}
              className="text-xs"
            >
              {fn}(x) = k
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Circle diagram */}
        <div className="flex justify-center">
          <svg viewBox="0 0 200 200" className="w-full max-w-[200px] border rounded-lg bg-slate-950">
            <circle cx={ccx} cy={ccy} r={circleR} fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
            <line x1={10} y1={ccy} x2={190} y2={ccy} stroke="#475569" strokeWidth="0.5" />
            <line x1={ccx} y1={10} x2={ccx} y2={190} stroke="#475569" strokeWidth="0.5" />

            {/* Solutions as points */}
            {(() => {
              const pts: { x: number; y: number; label: string }[] = [];
              const degs =
                activeEq === "sin"
                  ? [alphaDeg, 180 - alphaDeg]
                  : activeEq === "cos"
                    ? [alphaDeg, 360 - alphaDeg]
                    : [alphaDeg, alphaDeg + 180];
              degs.forEach((d) => {
                const rad = (d * Math.PI) / 180;
                pts.push({
                  x: ccx + circleR * Math.cos(rad),
                  y: ccy - circleR * Math.sin(rad),
                  label: `${d.toFixed(0)}°`,
                });
              });
              return pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill={color} stroke="#fff" strokeWidth="1.5" />
                  <text x={p.x + 8} y={p.y - 4} fill={color} fontSize="8">
                    {p.label}
                  </text>
                </g>
              ));
            })()}

            <text x={ccx + circleR + 5} y={ccy + 3} fill="#94a3b8" fontSize="8">θ</text>
            <text x={5} y={ccy - 5} fill="#94a3b8" fontSize="8">0</text>
          </svg>
        </div>

        {/* Solution display */}
        <div className="space-y-2">
          <div className="p-3 rounded-lg border bg-background/60">
            <div className="text-xs text-muted-foreground mb-1">General Solution</div>
            <div className="font-mono text-lg font-semibold" style={{ color }}>
              {cur.generalSol}
            </div>
          </div>
          <div className="p-3 rounded-lg border bg-background/60">
            <div className="text-xs text-muted-foreground mb-1">Principal Value</div>
            <div className="font-mono text-sm">{cur.principal}</div>
          </div>
          <div className="p-3 rounded-lg border bg-background/60">
            <div className="text-xs text-muted-foreground mb-1">First Quadrant Solutions (0°–360°)</div>
            <div className="font-mono text-sm space-y-0.5">
              <div>{cur.first}</div>
              <div>{cur.n2}</div>
              <div className="text-muted-foreground">{cur.nNeg}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">
          k = {k.toFixed(2)} (adjust to see how solutions change)
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={k}
          onChange={(e) => setK(parseFloat(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">General Solutions:</strong>
        {activeEq === "sin" && " For sin(x) = k, solutions repeat every 2π with symmetry about π/2."}
        {activeEq === "cos" && " For cos(x) = k, solutions are symmetric about the x-axis with period 2π."}
        {activeEq === "tan" && " For tan(x) = k, solutions repeat every π with no symmetry restriction."}
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Inverse Circular Functions",
    points: [
      "sin⁻¹(x): domain [-1, 1], range [-π/2, π/2] (principal branch)",
      "cos⁻¹(x): domain [-1, 1], range [0, π] (principal branch)",
      "tan⁻¹(x): domain ℝ, range (-π/2, π/2) (principal branch)",
      "sec⁻¹(x): domain |x| ≥ 1, range [0, π] \\ {π/2}",
      "cosec⁻¹(x): domain |x| ≥ 1, range [-π/2, π/2] \\ {0}",
      "cot⁻¹(x): domain ℝ, range (0, π)",
    ],
  },
  {
    title: "Key Identities",
    points: [
      "sin⁻¹(x) + cos⁻¹(x) = π/2 for x ∈ [-1, 1]",
      "tan⁻¹(x) + cot⁻¹(x) = π/2 for all x ∈ ℝ",
      "sec⁻¹(x) + cosec⁻¹(x) = π/2 for |x| ≥ 1",
      "tan⁻¹(a) - tan⁻¹(b) = tan⁻¹((a-b)/(1+ab))",
      "2tan⁻¹(x) = sin⁻¹(2x/(1+x²)) = cos⁻¹((1-x²)/(1+x²))",
    ],
  },
  {
    title: "General Solutions",
    points: [
      "sin(x) = sin(α) ⇒ x = nπ + (-1)ⁿ·α, n ∈ ℤ",
      "cos(x) = cos(α) ⇒ x = 2nπ ± α, n ∈ ℤ",
      "tan(x) = tan(α) ⇒ x = nπ + α, n ∈ ℤ",
      "If sin(x) = k, then α = sin⁻¹(k) is the principal value",
      "All solutions are obtained by adding integer multiples of the period",
    ],
  },
  {
    title: "Principal Value Branches",
    points: [
      "The principal value branch is the restricted domain that makes the function one-to-one",
      "sin⁻¹: restricted to [-π/2, π/2] — includes quadrants I and IV",
      "cos⁻¹: restricted to [0, π] — includes quadrants I and II",
      "tan⁻¹: restricted to (-π/2, π/2) — includes quadrants I and IV",
      "The principal value is the unique output in the restricted range",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function TrigonometryResources() {
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
              <CardTitle className="text-lg">
                Trigonometry — Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Inverse circular functions, trigonometric equations, and identities
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "trig-1",
              title: "Exercise — Inverse Trigonometric Functions",
              description:
                "Domain, range, principal value branches, and identities of inverse trig functions.",
              url: "https://drive.google.com/file/d/1example-trig-inverses/preview",
              pdfUrl: "https://drive.google.com/file/d/1example-trig-inverses/view?usp=sharing",
              tags: ["Inverse Trig", "Identities", "Principal Value"],
            },
            {
              id: "trig-2",
              title: "Exercise — Trigonometric Equations",
              description:
                "General solutions for sin(x)=k, cos(x)=k, tan(x)=k and related problems.",
              url: "https://drive.google.com/file/d/1example-trig-eq/preview",
              pdfUrl: "https://drive.google.com/file/d/1example-trig-eq/view?usp=sharing",
              tags: ["Trig Equations", "General Solution", "Periodicity"],
            },
          ].map((res) => (
            <div
              key={res.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-background/60 hover:bg-accent/50 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{res.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {res.description}
                </p>
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
              <CardTitle className="text-lg">
                Interactive Visualizations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore the unit circle, inverse trig functions, and trig equations
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="unit-circle" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="unit-circle">Unit Circle</TabsTrigger>
              <TabsTrigger value="inverse-trig">Inverse Trig</TabsTrigger>
              <TabsTrigger value="trig-eq">Trig Equations</TabsTrigger>
            </TabsList>

            <TabsContent value="unit-circle" className="space-y-4">
              <UnitCircleVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Unit Circle:</strong> For any angle θ, the point on the unit circle is (cos θ, sin θ).
                The sine is the y-coordinate, cosine is the x-coordinate, and tangent is sin/cos.
                The reference angle is the acute angle to the x-axis.
              </div>
            </TabsContent>

            <TabsContent value="inverse-trig" className="space-y-4">
              <InverseTrigVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">Inverse Trig Graphs:</strong> The graphs show sin⁻¹(x), cos⁻¹(x), and tan⁻¹(x).
                Each is the reflection of its parent function across y = x, restricted to the principal branch.
              </div>
            </TabsContent>

            <TabsContent value="trig-eq" className="space-y-4">
              <TrigEquationsVisual />
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong className="text-foreground">General Solutions:</strong> Adjust k to see how the solutions change on the unit circle.
                The general solution accounts for all angles that satisfy the equation, using integer n.
              </div>
            </TabsContent>

            <TabsContent value="theory" className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {THEORY_SECTIONS.map((sec) => (
                  <div
                    key={sec.title}
                    className="p-3 rounded-lg border bg-background/60"
                  >
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      {sec.title}
                    </h4>
                    <ul className="space-y-1">
                      {sec.points.map((p, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground flex items-start gap-1.5"
                        >
                          <span className="text-purple-500 mt-0.5">•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
