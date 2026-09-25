"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GraphEntry, GraphDetailInfo } from "@/lib/graphs";
import { shapeYAt, shapeSlopeAt, shapeAreaUntil } from "@/lib/graphs-shapes";
import {
  STANDARD_ANGLES,
  exactValueAt,
  nearestStandardDeg,
  radLabel,
  ASYMPTOTES_DEG,
  type TrigFn,
} from "@/lib/graphs-angle";
import { Play, Pause, RotateCcw, Activity, GitCompareArrows, Eye, MoveHorizontal } from "lucide-react";
import { TrigQuadrantMap } from "@/components/graphs/trig-quadrant-map";

/**
 * Common interactive renderer for every graph page — ALL conditions are
 * visualised at once, each in its own colour, with a live point on every
 * curve at the chosen x. The output panels below identify each condition's
 * value/slope/area at that instant, and the comparison section spells out
 * the visible differences between them.
 */

const W = 560;
const H = 340;
const PAD_L = 46;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 40;
const PW = W - PAD_L - PAD_R;
const PH = H - PAD_T - PAD_B;

const px = (x: number) => PAD_L + x * PW;
const py = (y: number) => PAD_T + (1 - y) * PH;

/** shape → trig function, when this graph is angle-based. */
const SHAPE_TRIG: Record<string, TrigFn> = {
  sine: "sin", cosine: "cos", tangent: "tan", cotangent: "cot", secant: "sec", cosecant: "cosec",
};

export const SERIES_COLORS = ["#38bdf8", "#fbbf24", "#34d399", "#f472b6"];

function curvePoints(shape: GraphEntry["series"][number]["shape"], variant: number | undefined) {
  // Sample with asymptote breaking: a jump > 0.4 in normalized y between
  // consecutive samples starts a new subpath so no false vertical wall is
  // drawn through discontinuities (tan, cot, sec, csc …).
  const segs: string[] = [];
  let cur: string[] = [];
  let prevY: number | null = null;
  for (let i = 0; i <= 120; i++) {
    const x = i / 120;
    const y = shapeYAt(shape, variant, x);
    if (prevY !== null && Math.abs(y - prevY) > 0.4 && cur.length > 1) {
      segs.push("M" + cur.join(" L"));
      cur = [];
    }
    cur.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
    prevY = y;
  }
  if (cur.length > 1) segs.push("M" + cur.join(" L"));
  return segs.join(" ");
}

function slopeWord(m: number) {
  if (Math.abs(m) < 0.02) return "flat";
  return m > 0 ? "rising" : "falling";
}

function behaviourOf(m: number, m2: number) {
  const nearPeak = Math.abs(m) < 0.06;
  if (nearPeak && m2 < -0.02) return "At a peak — momentarily at a maximum.";
  if (nearPeak && m2 > 0.02) return "At a trough — momentarily at a minimum.";
  if (Math.abs(m) < 0.02) return "Flat — not changing here.";
  if (m > 0) return `Rising ${m2 > 0.02 ? "and steepening" : m2 < -0.02 ? "but flattening" : "steadily"}.`;
  return `Falling ${m2 > 0.02 ? "but flattening" : m2 < -0.02 ? "and steepening" : "steadily"}.`;
}

export function GraphExplorer({ g, detail }: { g: GraphEntry; detail?: GraphDetailInfo }) {
  const [focus, setFocus] = useState(0);
  const [x, setX] = useState(() => (g.angleAxis ? 45 / g.angleAxis.periodDeg : 0.3));
  const [showArea, setShowArea] = useState(true);
  const [playing, setPlaying] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number>(0);

  // ── Angle mapping: when the graph carries an angleAxis, x IS the angle ──
  const angle = g.angleAxis;
  const trig = SHAPE_TRIG[g.series[0]?.shape ?? ""];
  const period = angle?.periodDeg ?? 0;
  const degNow = Math.round(x * period);
  const snapDeg = nearestStandardDeg(degNow);
  const exact = trig && period ? exactValueAt(trig, snapDeg) : null;
  const radNow = period ? radLabel(snapDeg) : null;
  const asyms = trig && period ? ASYMPTOTES_DEG[trig].filter((d) => d >= 0 && d <= period) : [];

  const play = useCallback(() => {
    setPlaying((p) => {
      if (p) {
        cancelAnimationFrame(rafRef.current);
        return false;
      }
      const step = () => {
        setX((prev) => {
          const next = prev + 0.006;
          if (next >= 1) {
            setPlaying(false);
            return 1;
          }
          rafRef.current = requestAnimationFrame(step);
          return next;
        });
      };
      rafRef.current = requestAnimationFrame(step);
      return true;
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const setFromClient = useCallback((clientX: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const frac = (clientX - rect.left) / rect.width;
    const xx = (frac * W - PAD_L) / PW;
    setX(Math.min(1, Math.max(0, xx)));
  }, []);

  const dragging = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setPlaying(false);
    setFromClient(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClient(e.clientX);
  };
  const stop = () => (dragging.current = false);

  const compare = detail?.compare;
  const focused = g.series[focus] ?? g.series[0];

  // Per-curve values at the shared x.
  const rows = g.series.map((s, i) => ({
    i,
    label: s.label ?? `Curve ${i + 1}`,
    color: SERIES_COLORS[i % SERIES_COLORS.length],
    y: shapeYAt(s.shape, s.variant, x),
    m: shapeSlopeAt(s.shape, s.variant, x),
    area: shapeAreaUntil(s.shape, s.variant, x),
  }));

  const fY = rows[focus]?.y ?? 0.5;
  const fM = shapeSlopeAt(focused.shape, focused.variant, x);
  const fM2 =
    (shapeSlopeAt(focused.shape, focused.variant, Math.min(1, x + 0.01)) -
      shapeSlopeAt(focused.shape, focused.variant, Math.max(0, x - 0.01))) / 0.02;
  const fBehaviour = behaviourOf(fM, fM2);

  // Tangent for the focused curve.
  const tx0 = Math.max(0, x - 0.1);
  const tx1 = Math.min(1, x + 0.1);
  const ty0 = Math.min(1, Math.max(0, fY + fM * (tx0 - x)));
  const ty1 = Math.min(1, Math.max(0, fY + fM * (tx1 - x)));

  // Area polygon 0..x for the focused curve.
  const areaPts: string[] = [`${px(0)},${py(0)}`];
  for (let i = 0; i <= 60; i++) {
    const xx = (x * i) / 60;
    areaPts.push(`${px(xx).toFixed(1)},${py(shapeYAt(focused.shape, focused.variant, xx)).toFixed(1)}`);
  }
  areaPts.push(`${px(x).toFixed(1)},${py(0)}`);

  return (
    <div className="space-y-4">
      {/* Legend — every condition, clickable to focus */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground self-center mr-1">
          {g.series.length > 1 ? "Conditions (click to focus):" : "Curve:"}
        </span>
        {g.series.map((s, i) => (
          <button
            key={i}
            onClick={() => setFocus(i)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
              i === focus
                ? "bg-card border-transparent text-foreground shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
            />
            {s.label ?? `Curve ${i + 1}`}
          </button>
        ))}
        {g.series.length > 1 && (
          <button
            onClick={() => setShowArea((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
              showArea ? "bg-primary/10 text-primary border-primary/30" : "bg-card text-muted-foreground border-border"
            }`}
          >
            <Eye className="h-3 w-3" />
            Areas
          </button>
        )}
      </div>

      {/* The plot — all conditions at once */}
      <div className="rounded-2xl border border-border/70 bg-card p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full select-none touch-none cursor-crosshair"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stop}
          onPointerLeave={stop}
        >
          {[0.25, 0.5, 0.75].map((t) => (
            <line key={`v${t}`} x1={px(t)} y1={py(0)} x2={px(t)} y2={py(1)} stroke="currentColor" className="text-border/50" strokeWidth="0.7" />
          ))}
          {[0.25, 0.5, 0.75].map((t) => (
            <line key={`h${t}`} x1={px(0)} y1={py(t)} x2={px(1)} y2={py(t)} stroke="currentColor" className="text-border/50" strokeWidth="0.7" />
          ))}
          <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(0)} stroke="currentColor" className="text-muted-foreground" strokeWidth="1.4" />
          <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(1)} stroke="currentColor" className="text-muted-foreground" strokeWidth="1.4" />
          <text x={px(1)} y={py(0) + 16} textAnchor="end" className="fill-muted-foreground" fontSize="12">{g.axes.x} →</text>
          <text x={px(0) - 6} y={py(1) - 4} textAnchor="start" className="fill-muted-foreground" fontSize="12">↑ {g.axes.y}</text>

          {/* ── Angle axis: asymptotes, zero dots, degree tick labels ── */}
          {angle && trig && (() => {
            const visible = angle.ticksDeg.filter((d) => d > 0 && d < period);
            const step = visible.length > 10 ? 2 : 1;
            return (
              <g>
                {asyms.filter((d) => d > 0 && d < period).map((d) => (
                  <g key={`ax${d}`}>
                    <line x1={px(d / period)} y1={py(1)} x2={px(d / period)} y2={py(0)} stroke="#ef4444" strokeWidth="1.1" strokeDasharray="4 3" opacity="0.7" />
                    <text x={px(d / period) + 3} y={py(1) + 10} fontSize="9" fill="#ef4444" opacity="0.9">{d}°</text>
                  </g>
                ))}
                {visible.map((d, i) => (
                  <g key={`tk${d}`}>
                    <line x1={px(d / period)} y1={py(0)} x2={px(d / period)} y2={py(0) + 3} stroke="currentColor" className="text-muted-foreground" strokeWidth="0.8" />
                    {i % step === 0 && (
                      <text x={px(d / period)} y={py(0) + 14} fontSize="8.5" textAnchor="middle" className="fill-muted-foreground">
                        {d}°
                      </text>
                    )}
                  </g>
                ))}
              </g>
            );
          })()}

          {/* area under the focused curve */}
          {showArea && (
            <polygon points={areaPts.join(" ")} fill={SERIES_COLORS[focus % SERIES_COLORS.length]} opacity="0.14" />
          )}

          {/* every curve, every colour, always */}
          {g.series.map((s, i) => (
            <path
              key={i}
              d={curvePoints(s.shape, s.variant)}
              fill="none"
              stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
              strokeWidth={i === focus ? 2.8 : 1.9}
              opacity={i === focus ? 1 : 0.75}
              strokeDasharray={s.dashed ? "5 4" : undefined}
            />
          ))}

          {/* tangent for the focused curve */}
          <line x1={px(tx0)} y1={py(ty0)} x2={px(tx1)} y2={py(ty1)} stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="6 4" opacity="0.9" />

          {/* guide line + a live point on EVERY curve */}
          <line x1={px(x)} y1={py(0)} x2={px(x)} y2={py(Math.max(...rows.map((r) => r.y)))} stroke="currentColor" className="text-muted-foreground/50" strokeWidth="1" strokeDasharray="3 3" />
          {rows.map((r) => (
            <circle
              key={r.i}
              cx={px(x)}
              cy={py(r.y)}
              r={r.i === focus ? 5.5 : 3.5}
              fill={r.color}
              stroke={r.i === focus ? "#0f172a" : "none"}
              strokeWidth="1.2"
              opacity={r.i === focus ? 1 : 0.85}
            />
          ))}
          {rows.map((r) =>
            r.i === focus ? <circle key={`halo${r.i}`} cx={px(x)} cy={py(r.y)} r="10" fill={r.color} opacity="0.22" /> : null
          )}
        </svg>

        {/* slider + controls */}
        <div className="flex items-center gap-3 px-3 pb-2">
          {angle && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary whitespace-nowrap">
              <MoveHorizontal className="h-3.5 w-3.5" />
              θ = {degNow}° {radNow ? `(${radNow} rad)` : ""}
            </span>
          )}
          <button
            onClick={play}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:border-primary/50 transition-colors"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play sweep"}
          </button>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(x * 1000)}
            onChange={(e) => {
              setPlaying(false);
              setX(Number(e.target.value) / 1000);
            }}
            className="flex-1 accent-[#38bdf8]"
            aria-label="Drag along the x-axis"
          />
          <button
            onClick={() => {
              setPlaying(false);
              setX(g.angleAxis ? 45 / g.angleAxis.periodDeg : 0.3);
              setFocus(0);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:border-primary/50 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
        <p className="px-3 pb-2 text-[11px] text-muted-foreground">
          Drag on the graph or use the slider — every condition's point moves together. The dashed amber line is the focused curve's tangent; the shaded region is its area.
        </p>
      </div>

      {/* ── The four-axis unit-circle companion — live θ from the cursor ── */}
      {angle && trig && (
        <TrigQuadrantMap
          fn={trig}
          thetaDeg={degNow}
          onPickAngle={(d) => {
            setPlaying(false);
            const wrapped = ((d % period) + period) % period;
            setX(wrapped / period);
          }}
        />
      )}

      {/* OUTPUT PANELS — all conditions compared at this x */}
      <div className="rounded-2xl border border-border/70 bg-card overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border/60 flex items-center gap-2">
          <GitCompareArrows className="h-4 w-4 text-primary" />
          <p className="text-xs font-bold uppercase tracking-wider text-foreground">
            {angle && trig
              ? `All conditions at θ = ${degNow}° (${radNow} rad) · nearest standard ${snapDeg}°`
              : `All conditions at ${g.axes.x} = ${Math.round(x * 100)}%`}
          </p>
          {angle && trig && exact && (
            <span className="ml-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              exact at {snapDeg}°: {trig} {snapDeg}° = {exact}
            </span>
          )}
        </div>
        <div className="divide-y divide-border/60">
          {rows.map((r) => {
            const m2 =
              (shapeSlopeAt(g.series[r.i].shape, g.series[r.i].variant, Math.min(1, x + 0.01)) -
                shapeSlopeAt(g.series[r.i].shape, g.series[r.i].variant, Math.max(0, x - 0.01))) / 0.02;
            const rowTrig = SHAPE_TRIG[g.series[r.i].shape ?? ""];
            const rowExact = angle && rowTrig ? exactValueAt(rowTrig, snapDeg) : null;
            const onAsymptote = angle && rowTrig ? ASYMPTOTES_DEG[rowTrig].includes(snapDeg) : false;
            return (
              <button
                key={r.i}
                onClick={() => setFocus(r.i)}
                className={`w-full text-left px-4 py-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 transition-colors ${
                  r.i === focus ? "bg-primary/[0.06]" : "hover:bg-muted/40"
                }`}
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                <span className="text-sm font-bold text-foreground min-w-28">{r.label}</span>
                {rowExact ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {rowTrig}({snapDeg}°) = {rowExact}
                  </span>
                ) : onAsymptote ? (
                  <span className="text-xs font-bold text-red-600 dark:text-red-400">
                    {rowTrig}({snapDeg}°) = ±∞ — asymptote
                  </span>
                ) : null}
                <span className="text-xs text-muted-foreground">
                  slope <span className="font-bold text-foreground">{r.m.toFixed(2)}</span> ({slopeWord(r.m)})
                </span>
                <span className="text-xs text-muted-foreground">
                  area <span className="font-bold text-foreground">{Math.round(r.area * 100)}%</span>
                </span>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 ml-auto">{behaviourOf(r.m, m2)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* What is happening on the focused curve */}
      <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3.5 flex items-start gap-2">
        <Activity className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-foreground">
          <strong>{rows[focus]?.label}:</strong> at{" "}
          {angle && trig ? `θ = ${degNow}° (${radNow} rad)` : `${g.axes.x} = ${Math.round(x * 100)}%`}, {g.axes.y} is at{" "}
          {Math.round(fY * 100)}% with slope {fM.toFixed(2)} — {fBehaviour.toLowerCase()}
        </p>
      </div>

      {/* Standard-angle value table — the six functions at every standard angle */}
      {angle && trig && (
        <StandardAngleTable
          activeFn={trig}
          highlightDeg={snapDeg}
          onPick={(d) => {
            setPlaying(false);
            // wrap into the visible period (210° ≡ 30° for tan/cot)
            const wrapped = ((d % period) + period) % period;
            setX(wrapped / period);
          }}
        />
      )}
    </div>
  );
}

/**
 * The exact-value table: every standard angle × the six functions, the
 * active function's column emphasised, asymptotes marked ±∞. Clicking an
 * angle row moves the explorer's cursor there.
 */
function StandardAngleTable({
  activeFn,
  highlightDeg,
  onPick,
}: {
  activeFn: TrigFn;
  highlightDeg: number;
  onPick: (deg: number) => void;
}) {
  const FNS: TrigFn[] = ["sin", "cos", "tan", "cot", "sec", "cosec"];
  const angles = STANDARD_ANGLES;
  return (
    <div className="rounded-2xl border border-border/70 bg-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border/60">
        <p className="text-xs font-bold uppercase tracking-wider text-foreground">
          Exact values at the standard angles — click a row to jump the cursor there
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/40">
              <th className="px-3 py-2 text-left font-bold text-muted-foreground">θ (deg)</th>
              <th className="px-3 py-2 text-left font-bold text-muted-foreground">θ (rad)</th>
              {FNS.map((f) => (
                <th
                  key={f}
                  className={`px-3 py-2 text-left font-bold ${f === activeFn ? "text-primary" : "text-muted-foreground"}`}
                >
                  {f === activeFn ? `▸ ${f} x` : `${f} x`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {angles.map((a) => {
              const isHi = a.deg === highlightDeg;
              const isAsym = ASYMPTOTES_DEG[activeFn].includes(a.deg);
              return (
                <tr
                  key={a.deg}
                  onClick={() => onPick(a.deg)}
                  className={`cursor-pointer border-t border-border/50 transition-colors ${
                    isHi ? "bg-primary/[0.09] font-semibold" : "hover:bg-muted/30"
                  }`}
                >
                  <td className={`px-3 py-1.5 ${isHi ? "text-primary font-bold" : "text-foreground"}`}>{a.deg}°</td>
                  <td className="px-3 py-1.5 text-muted-foreground">{a.rad}</td>
                  {FNS.map((f) => {
                    const v = exactValueAt(f, a.deg);
                    const isCol = f === activeFn;
                    return (
                      <td
                        key={f}
                        className={`px-3 py-1.5 whitespace-nowrap ${
                          v === null
                            ? "text-red-500/80 font-bold"
                            : isCol
                              ? "text-foreground font-semibold"
                              : "text-muted-foreground"
                        }`}
                      >
                        {v === null ? (isCol ? "±∞ ⚡" : "undef") : v}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
      <p className="px-4 py-2 text-[11px] text-muted-foreground">
        Red <strong>undef / ±∞</strong> cells are the asymptote angles — the function does not exist there. These 17 angles are the whole exact-value toolkit the board asks from.
      </p>
    </div>
  );
}
