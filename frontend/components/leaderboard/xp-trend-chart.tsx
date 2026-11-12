"use client";

import { useEffect, useMemo, useState } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { getXpHistory, type XpPoint } from "@/lib/api/leaderboard";

/**
 * XP trend — the "accelerated / constant / decelerated" chart.
 *
 * Cumulative points plotted over dates (the student's earning trajectory),
 * with every stretch coloured by how the daily earning rate is moving: green
 * when it is accelerating, blue when it is flat, amber when it is slowing.
 * Hover or tap a point to see exactly what was done that day (sets played,
 * questions answered, XP earned).
 */

type Trend = "accelerated" | "constant" | "decelerated" | "neutral";

const TREND_COLOR: Record<Trend, string> = {
  accelerated: "#10b981",
  constant: "#38bdf8",
  decelerated: "#f59e0b",
  neutral: "#94a3b8",
};

const TREND_LABEL: Record<Trend, string> = {
  accelerated: "Accelerated",
  constant: "Constant",
  decelerated: "Decelerated",
  neutral: "Start",
};

const TREND_ICON: Record<Trend, typeof TrendingUp> = {
  accelerated: TrendingUp,
  constant: Minus,
  decelerated: TrendingDown,
  neutral: Minus,
};

/** A day's rate is "constant" when it is within 10 % of the previous day. */
function trendFor(prev: XpPoint | undefined, curr: XpPoint): Trend {
  if (!prev) return "neutral";
  const diff = curr.xp - prev.xp;
  const band = Math.max(1, Math.round(prev.xp * 0.1));
  if (diff > band) return "accelerated";
  if (diff < -band) return "decelerated";
  return "constant";
}

function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

export function XpTrendChart() {
  const [points, setPoints] = useState<XpPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    getXpHistory()
      .then((res) => {
        if (alive) setPoints(res.points);
      })
      .catch(() => {
        if (alive) setError("Could not load your XP trend.");
      });
    return () => {
      alive = false;
    };
  }, []);

  const series = useMemo(() => {
    if (!points) return [];
    let cumulative = 0;
    return points.map((p, i) => {
      cumulative += p.xp;
      return { ...p, cumulative, trend: trendFor(points[i - 1], p) };
    });
  }, [points]);

  const geometry = useMemo(() => {
    if (series.length === 0) return null;
    const W = 720;
    const H = 280;
    const padL = 46;
    const padR = 18;
    const padT = 18;
    const padB = 34;
    const innerW = W - padL - padR;
    const innerH = H - padT - padB;
    const maxCum = series[series.length - 1]?.cumulative || 1;
    const x = (i: number) =>
      padL + (series.length === 1 ? innerW / 2 : (i / (series.length - 1)) * innerW);
    const y = (v: number) => padT + innerH - (v / maxCum) * innerH;
    return { W, H, padL, padR, padT, padB, innerW, innerH, maxCum, x, y };
  }, [series]);

  if (error) {
    return (
      <p role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {error}
      </p>
    );
  }
  if (!points) {
    return <p className="px-1 py-6 text-sm text-muted-foreground">Loading your XP trend…</p>;
  }
  if (series.length === 0 || !geometry) {
    return (
      <p className="px-1 py-6 text-sm text-muted-foreground">
        No XP yet — answer a quiz and your earning trend will appear here.
      </p>
    );
  }

  const { W, H, padL, padR, padT, padB, innerH, maxCum, x, y } = geometry;

  // Stacked area + individually coloured segments (the stretch INTO point i
  // takes point i's trend, so the colour tracks the rate of change).
  const areaPath = [
    `M ${x(0)} ${padT + innerH}`,
    ...series.map((pt, i) => `L ${x(i)} ${y(pt.cumulative)}`),
    `L ${x(series.length - 1)} ${padT + innerH}`,
    "Z",
  ].join(" ");

  const activePoint = active !== null ? series[active] : null;

  return (
    <section
      aria-labelledby="xp-trend-heading"
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 id="xp-trend-heading" className="text-sm font-bold text-foreground">
          XP trend
          <span className="ml-2 text-[11px] font-normal text-muted-foreground">
            points over time · coloured by how fast you earn
          </span>
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold">
          {(["accelerated", "constant", "decelerated"] as const).map((trend) => {
            const Icon = TREND_ICON[trend];
            return (
              <span key={trend} className="inline-flex items-center gap-1 text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: TREND_COLOR[trend] }} />
                <Icon className="h-3 w-3" aria-hidden="true" />
                {TREND_LABEL[trend]}
              </span>
            );
          })}
        </div>
      </div>

      <div className="relative px-2 py-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-64 w-full"
          role="img"
          aria-label="Line chart of cumulative XP over dates, coloured by whether your earning is accelerating, constant or decelerating."
        >
          {/* y grid + labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <g key={f}>
              <line x1={padL} x2={W - padR} y1={y(maxCum * f)} y2={y(maxCum * f)} stroke="currentColor" className="text-border/50" strokeWidth={1} />
              <text x={padL - 8} y={y(maxCum * f) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
                {Math.round(maxCum * f)}
              </text>
            </g>
          ))}

          {/* area under the curve */}
          <path d={areaPath} className="fill-primary/10" />

          {/* coloured segments */}
          {series.slice(1).map((pt, idx) => (
            <line
              key={`seg-${idx}`}
              x1={x(idx)}
              y1={y(series[idx].cumulative)}
              x2={x(idx + 1)}
              y2={y(pt.cumulative)}
              stroke={TREND_COLOR[pt.trend]}
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}

          {/* points */}
          {series.map((pt, i) => (
            <circle
              key={`pt-${i}`}
              cx={x(i)}
              cy={y(pt.cumulative)}
              r={active === i ? 6 : 4}
              className="cursor-pointer fill-card stroke-foreground"
              strokeWidth={active === i ? 3 : 2}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive((v) => (v === i ? null : i))}
            />
          ))}

          {/* x labels (sparse) */}
          {series.map((pt, i) =>
            i % Math.ceil(series.length / 6) === 0 || i === series.length - 1 ? (
              <text key={`lbl-${i}`} x={x(i)} y={H - 10} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {shortDate(pt.date)}
              </text>
            ) : null,
          )}
        </svg>

        {/* tooltip */}
        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-xl"
            style={{
              left: `clamp(70px, ${((x(series.indexOf(activePoint)) / W) * 100).toFixed(2)}%, calc(100% - 70px))`,
              top: 8,
            }}
          >
            <p className="font-bold text-foreground">{activePoint.date}</p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{activePoint.xp.toLocaleString()} XP</span> that day ·{" "}
              {activePoint.cumulative.toLocaleString()} total
            </p>
            <p className="text-muted-foreground">
              {activePoint.sets} set{activePoint.sets === 1 ? "" : "s"} · {activePoint.answered} question
              {activePoint.answered === 1 ? "" : "s"} answered
            </p>
            <p className="mt-0.5 font-semibold" style={{ color: TREND_COLOR[activePoint.trend] }}>
              {TREND_LABEL[activePoint.trend]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
