"use client";

import { STANDARD_ANGLES, TRIG_VITALS, deg2rad, shapeToTrigFn, type TrigFn } from "@/lib/graphs-angle";
import { exactValueAt, nearestStandardDeg } from "@/lib/graphs-angle";
import { Compass, MoveHorizontal, Zap } from "lucide-react";

/**
 * TrigQuadrantMap — the "four-axis" companion visual under every trig graph.
 *
 * A unit circle with a rotating arm at the live θ (linked to the explorer's
 * cursor), the four quadrants labelled with the ASTC rule, shading where the
 * function is positive, dots at the function's special angles (zeros, peaks,
 * asymptote rays), and a vitals panel spelling out range, zero family (nπ),
 * peak/trough/asymptote families and the period.
 */

const C = 110; // circle centre (px in the 260-wide viewBox)
const R = 82; // circle radius

export function TrigQuadrantMap({
  fn,
  thetaDeg,
  onPickAngle,
}: {
  fn: TrigFn;
  /** Live angle from the explorer cursor, in degrees (unwrapped, may exceed period). */
  thetaDeg: number;
  /** Click a special angle to move the explorer cursor there. */
  onPickAngle?: (deg: number) => void;
}) {
  const v = TRIG_VITALS[fn];
  const th = ((thetaDeg % 360) + 360) % 360;
  const rad = deg2rad(th);
  const q = quadOf(th);
  const isPos = q > 0 && v.positiveQuads.includes(q as 1 | 2 | 3 | 4);
  // unit-circle point (SVG y grows downward → negate)
  const px = C + R * Math.cos(rad);
  const py = C - R * Math.sin(rad);

  const fVal = (deg: number) => {
    const e = exactValueAt(fn, deg % 360 === 0 && deg !== 0 ? 360 : deg % 360);
    return e;
  };

  // special angles for this fn: zeros, peaks, troughs (asymptotes drawn as rays)
  const specials: { deg: number; label: string; kind: "zero" | "peak" | "trough" }[] = [];
  if (fn === "sin" || fn === "cosec") {
    if (fn === "sin") specials.push({ deg: 0, label: "0 = nπ", kind: "zero" }, { deg: 180, label: "π = nπ", kind: "zero" });
    specials.push({ deg: 90, label: "+1", kind: "peak" }, { deg: 270, label: "−1", kind: "trough" });
  }
  if (fn === "cos" || fn === "sec") {
    if (fn === "cos") specials.push({ deg: 90, label: "0 = π/2+nπ", kind: "zero" }, { deg: 270, label: "0", kind: "zero" });
    specials.push({ deg: 0, label: "+1", kind: "peak" }, { deg: 180, label: "−1", kind: "trough" });
  }
  if (fn === "tan" || fn === "cot") {
    if (fn === "tan") specials.push({ deg: 0, label: "0 = nπ", kind: "zero" }, { deg: 180, label: "0", kind: "zero" });
    else specials.push({ deg: 90, label: "0 = π/2+nπ", kind: "zero" }, { deg: 270, label: "0", kind: "zero" });
  }

  const quadsPositive = v.positiveQuads;

  return (
    <div className="rounded-2xl border border-border/70 bg-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border/60 flex items-center gap-2 flex-wrap">
        <Compass className="h-4 w-4 text-primary" />
        <p className="text-xs font-bold uppercase tracking-wider text-foreground">
          The four axes — unit circle at θ = {Math.round(thetaDeg)}°
        </p>
        <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
          isPos
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
            : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
        }`}>
          {q < 0 ? "on an axis" : `Q${q} — ${isPos ? "positive" : "negative"}`}
        </span>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-0">
        {/* ── The circle ── */}
        <div className="p-3 flex items-center justify-center bg-muted/20">
          <svg viewBox="0 0 260 240" className="w-full max-w-[260px] select-none" role="img" aria-label={`Unit circle showing ${fn} at ${Math.round(thetaDeg)} degrees`}>
            {/* quadrant shading where fn > 0 */}
            {quadsPositive.map((q) => (
              <path
                key={q}
                d={quadPath(q)}
                fill="#10b981"
                opacity={0.07}
              />
            ))}

            {/* axes */}
            <line x1={C - R - 16} y1={C} x2={C + R + 16} y2={C} stroke="#a1a1aa" strokeWidth="1.4" />
            <line x1={C} y1={C - R - 14} x2={C} y2={C + R + 14} stroke="#a1a1aa" strokeWidth="1.4" />
            <text x={C + R + 10} y={C - 6} fontSize="9" fill="#71717a">x</text>
            <text x={C + 6} y={C - R - 6} fontSize="9" fill="#71717a">y</text>

            {/* asymptote rays (dashed red) where the fn dies */}
            {(fn === "tan" || fn === "sec" ? [90, 270] : fn === "cot" || fn === "cosec" ? [0, 180] : []).map((deg) => {
              const r2 = deg2rad(deg);
              const ex = C + (R + 14) * Math.cos(r2);
              const ey = C - (R + 14) * Math.sin(r2);
              return (
                <line key={deg} x1={C} y1={C} x2={ex} y2={ey} stroke="#ef4444" strokeWidth="1.1" strokeDasharray="4 3" opacity="0.7" />
              );
            })}

            {/* the unit circle */}
            <circle cx={C} cy={C} r={R} fill="none" stroke="#52525b" strokeWidth="1.6" />

            {/* quadrant labels + ASTC letters */}
            <QuadrantLabels active={quadOf(th)} positives={quadsPositive} />

            {/* standard-angle ticks (every 45°) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const r2 = deg2rad(deg);
              const x1 = C + R * Math.cos(r2);
              const y1 = C - R * Math.sin(r2);
              const x2 = C + (R + 5) * Math.cos(r2);
              const y2 = C - (R + 5) * Math.sin(r2);
              return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a1a1aa" strokeWidth="1" />;
            })}

            {/* special-angle dots */}
            {specials.map((s) => {
              const r2 = deg2rad(s.deg);
              const cx = C + R * Math.cos(r2);
              const cy = C - R * Math.sin(r2);
              const col = s.kind === "zero" ? "#10b981" : s.kind === "peak" ? "#0ea5e9" : "#8b5cf6";
              return (
                <g key={`${s.deg}-${s.kind}`} className={onPickAngle ? "cursor-pointer" : undefined} onClick={() => onPickAngle?.(s.deg)}>
                  <circle cx={cx} cy={cy} r="4.5" fill={col} stroke="#fafafa" strokeWidth="1" />
                  <text x={cx + 7} y={cy - 6} fontSize="8.5" fill={col} fontWeight="700">{s.label}</text>
                </g>
              );
            })}

            {/* the rotating arm */}
            <line x1={C} y1={C} x2={px} y2={py} stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx={px} cy={py} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.4" />
            {/* the projection that IS the function value */}
            {(fn === "sin" || fn === "cosec") && (
              <line x1={px} y1={py} x2={px} y2={C} stroke="#0ea5e9" strokeWidth="1.6" strokeDasharray="3 2.5" opacity="0.9" />
            )}
            {(fn === "cos" || fn === "sec") && (
              <line x1={px} y1={py} x2={C} y2={py} stroke="#0ea5e9" strokeWidth="1.6" strokeDasharray="3 2.5" opacity="0.9" />
            )}
            {(fn === "tan" || fn === "cot") && (
              <line x1={px} y1={py} x2={fn === "tan" ? px : C} y2={fn === "tan" ? C : py} stroke="#0ea5e9" strokeWidth="1.6" strokeDasharray="3 2.5" opacity="0.9" />
            )}

            {/* angle arc + label */}
            <text x={C + 22 * Math.cos(rad / 2)} y={C - 22 * Math.sin(rad / 2)} fontSize="10" fill="#f59e0b" fontWeight="700" textAnchor="middle">
              θ
            </text>
            <text x={C} y={C + R + 30} fontSize="11" fill="#52525b" textAnchor="middle" fontWeight="600">
              θ = {Math.round(thetaDeg)}° — live from the graph above
            </text>
          </svg>
        </div>

        {/* ── The vitals ── */}
        <div className="p-4 space-y-2.5 border-t md:border-t-0 md:border-l border-border/60">
          <Vital label="Range" value={v.range} accent="text-sky-600 dark:text-sky-400" />
          <Vital label="Zeros" value={v.zeros} accent="text-emerald-600 dark:text-emerald-400" />
          {v.peaks && <Vital label="Peaks" value={v.peaks} accent="text-violet-600 dark:text-violet-400" />}
          {v.troughs && <Vital label="Troughs" value={v.troughs} accent="text-violet-600 dark:text-violet-400" />}
          {v.asymptotes && <Vital label="Asymptotes" value={v.asymptotes} accent="text-red-600 dark:text-red-400" />}
          <Vital label="Period" value={v.period} accent="text-amber-600 dark:text-amber-400" />
          <Vital label="Sign rule (ASTC)" value={v.astc} accent="text-primary" />

          <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3 flex items-start gap-2 mt-1">
            <Zap className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-foreground leading-relaxed">
              <strong>Circle → curve:</strong> {v.note} Right now the arm sits at {Math.round(thetaDeg)}° and{" "}
              {q >= 0 ? (
                <>
                  {fn} is <strong>{isPos ? "positive" : "negative"}</strong> there —
                  watch the curve above sit {isPos ? "above" : "below"} the axis at the same angle.
                </>
              ) : (
                <>the arm lies ON an axis — {fn} is {fVal(th) === null ? "undefined (asymptote!)" : "exactly 0, ±1 there"}.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Vital({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex gap-2 items-baseline">
      <span className={`text-[11px] font-bold uppercase tracking-wider shrink-0 w-24 ${accent}`}>{label}</span>
      <span className="text-xs text-foreground leading-relaxed">{value}</span>
    </div>
  );
}

function quadOf(deg: number): -1 | 1 | 2 | 3 | 4 {
  const d = ((deg % 360) + 360) % 360;
  if (d === 0 || d === 90 || d === 180 || d === 270) return -1; // on an axis
  if (d < 90) return 1;
  if (d < 180) return 2;
  if (d < 270) return 3;
  return 4;
}

function quadPath(q: 1 | 2 | 3 | 4): string {
  // wedge from centre spanning the quadrant
  const [a0, a1] = q === 1 ? [0, 90] : q === 2 ? [90, 180] : q === 3 ? [180, 270] : [270, 360];
  const r0 = deg2rad(a0);
  const r1 = deg2rad(a1);
  const x0 = C + R * Math.cos(r0);
  const y0 = C - R * Math.sin(r0);
  const x1 = C + R * Math.cos(r1);
  const y1 = C - R * Math.sin(r1);
  return `M ${C} ${C} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

function QuadrantLabels({ active, positives }: { active: number; positives: (1 | 2 | 3 | 4)[] }) {
  const items: { q: 1 | 2 | 3 | 4; letter: string; x: number; y: number }[] = [
    { q: 1, letter: "A", x: C + 34, y: C - 34 },
    { q: 2, letter: "S", x: C - 34, y: C - 34 },
    { q: 3, letter: "T", x: C - 34, y: C + 40 },
    { q: 4, letter: "C", x: C + 34, y: C + 40 },
  ];
  return (
    <g>
      {items.map(({ q, letter, x, y }) => {
        const pos = positives.includes(q);
        return (
          <g key={q}>
            <text x={x} y={y} fontSize="13" fontWeight="800" textAnchor="middle" fill={pos ? "#10b981" : "#ef4444"} opacity={active === q ? 1 : 0.55}>
              {letter}
            </text>
            <text x={x} y={y + 10} fontSize="7.5" textAnchor="middle" fill={pos ? "#10b981" : "#ef4444"} opacity={active === q ? 0.95 : 0.5}>
              {pos ? "+" : "−"}
            </text>
          </g>
        );
      })}
    </g>
  );
}
