"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GraphEntry, GraphDetailInfo } from "@/lib/graphs";
import { shapeYAt, shapeSlopeAt, shapeAreaUntil } from "@/lib/graphs-shapes";
import { Play, Pause, RotateCcw, Activity, GitCompareArrows, Eye } from "lucide-react";

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

export const SERIES_COLORS = ["#38bdf8", "#fbbf24", "#34d399", "#f472b6"];

function curvePoints(shape: GraphEntry["series"][number]["shape"], variant: number | undefined) {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = i / 120;
    const y = shapeYAt(shape, variant, x);
    pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
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
  const [x, setX] = useState(0.3);
  const [showArea, setShowArea] = useState(true);
  const [playing, setPlaying] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number>(0);

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
              setX(0.3);
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

      {/* OUTPUT PANELS — all conditions compared at this x */}
      <div className="rounded-2xl border border-border/70 bg-card overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border/60 flex items-center gap-2">
          <GitCompareArrows className="h-4 w-4 text-primary" />
          <p className="text-xs font-bold uppercase tracking-wider text-foreground">
            All conditions at {g.axes.x} = {Math.round(x * 100)}%
          </p>
        </div>
        <div className="divide-y divide-border/60">
          {rows.map((r) => {
            const m2 =
              (shapeSlopeAt(g.series[r.i].shape, g.series[r.i].variant, Math.min(1, x + 0.01)) -
                shapeSlopeAt(g.series[r.i].shape, g.series[r.i].variant, Math.max(0, x - 0.01))) / 0.02;
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
                <span className="text-xs text-muted-foreground">
                  {g.axes.y.split("(")[0].trim()}: <span className="font-bold text-foreground">{Math.round(r.y * 100)}%</span>
                </span>
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
          <strong>{rows[focus]?.label}:</strong> at {g.axes.x} = {Math.round(x * 100)}%, {g.axes.y} is at{" "}
          {Math.round(fY * 100)}% with slope {fM.toFixed(2)} — {fBehaviour.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
