import { shapeToPath, type ShapeName } from "@/lib/graphs-shapes";
import { ASYMPTOTES_DEG, ZEROS_DEG, type TrigFn } from "@/lib/graphs-angle";

const PALETTE = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#a855f7", "#14b8a6"];

/** shape → trig function, for automatic asymptote/zero overlay lines. */
const SHAPE_TRIG: Partial<Record<ShapeName, TrigFn>> = {
  sine: "sin", cosine: "cos", tangent: "tan", cotangent: "cot", secant: "sec", cosecant: "cosec",
};

/**
 * Renders a graph entry's visual output as a clean SVG sketch:
 * axes with labels, one styled path per series, optional legend and marks.
 */
export function GraphSketch({
  series,
  marks,
  axes,
  height = 260,
  showLegend = true,
  angleAxis,
}: {
  series: { shape: ShapeName; variant?: number; label?: string; dashed?: boolean; fill?: boolean }[];
  marks?: { x: number; y?: number; label: string; type?: "point" | "vline" | "hline" }[];
  axes: { x: string; y: string };
  height?: number;
  showLegend?: boolean;
  angleAxis?: { periodDeg: number; ticksDeg: number[] };
}) {
  const W = 460;
  const H = height;
  const pad = 38;
  const iw = W - pad - 14;
  const ih = H - pad - 16;

  const toPx = (nx: number, ny: number) => ({
    x: pad + nx * iw,
    y: pad + (1 - ny) * ih,
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto block max-w-full"
        role="img"
        aria-label={`Graph of ${axes.y} versus ${axes.x}`}
      >
        {/* plot frame */}
        <rect x={pad} y={pad} width={iw} height={ih} fill="white" stroke="#d4d4d8" rx={6} />
        {/* grid: fine 0.2 lines + stronger quadrant lines */}
        {[0.2, 0.4, 0.6, 0.8].map((g) => (
          <g key={`f${g}`} stroke="#f6f6f8">
            <line x1={pad + g * iw} y1={pad} x2={pad + g * iw} y2={pad + ih} />
            <line x1={pad} y1={pad + g * ih} x2={pad + iw} y2={pad + g * ih} />
          </g>
        ))}
        {[0.25, 0.5, 0.75].map((g) => (
          <g key={g} stroke={g === 0.5 ? "#e7e7ec" : "#efeff3"}>
            <line x1={pad + g * iw} y1={pad} x2={pad + g * iw} y2={pad + ih} />
            <line x1={pad} y1={pad + g * ih} x2={pad + iw} y2={pad + g * ih} />
          </g>
        ))}
        {/* axes */}
        <line x1={pad} y1={pad + ih} x2={pad + iw} y2={pad + ih} stroke="#71717a" strokeWidth={1.6} />
        <line x1={pad} y1={pad} x2={pad} y2={pad + ih} stroke="#71717a" strokeWidth={1.6} />

        {/* angle axis: asymptotes, zeros, degree ticks + labels */}
        {angleAxis && (() => {
          const trig = SHAPE_TRIG[series[0]?.shape];
          const asyms = trig ? ASYMPTOTES_DEG[trig].filter((d) => d > 0 && d < angleAxis.periodDeg) : [];
          const zeros = trig ? ZEROS_DEG[trig].filter((d) => d > 0 && d < angleAxis.periodDeg) : [];
          const step = angleAxis.ticksDeg.length > 10 ? 2 : 1;
          return (
            <g>
              {asyms.map((deg) => (
                <line
                  key={`a${deg}`}
                  x1={pad + (deg / angleAxis.periodDeg) * iw}
                  y1={pad - 4}
                  x2={pad + (deg / angleAxis.periodDeg) * iw}
                  y2={pad + ih}
                  stroke="#ef4444"
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  opacity={0.65}
                />
              ))}
              {zeros.map((deg) => (
                <circle
                  key={`z${deg}`}
                  cx={pad + (deg / angleAxis.periodDeg) * iw}
                  cy={pad + ih}
                  r={2.6}
                  fill="#10b981"
                />
              ))}
              {angleAxis.ticksDeg.map((deg, i) => (
                <g key={`t${deg}`}>
                  <line
                    x1={pad + (deg / angleAxis.periodDeg) * iw}
                    y1={pad + ih}
                    x2={pad + (deg / angleAxis.periodDeg) * iw}
                    y2={pad + ih + 4}
                    stroke="#a1a1aa"
                    strokeWidth={0.8}
                  />
                  {i % step === 0 && (
                    <text
                      x={pad + (deg / angleAxis.periodDeg) * iw}
                      y={pad + ih + 15}
                      fontSize={8.5}
                      fill="#52525b"
                      textAnchor="middle"
                    >
                      {deg}°
                    </text>
                  )}
                </g>
              ))}
            </g>
          );
        })()}

        <text x={pad + iw} y={pad + ih + (angleAxis ? 28 : 15)} fontSize={11.5} fill="#3f3f46" textAnchor="end" fontWeight={500}>
          {axes.x} →
        </text>
        <text x={pad - 6} y={pad - 12} fontSize={11.5} fill="#3f3f46" textAnchor="start" fontWeight={500}>
          ↑ {axes.y}
        </text>
        <text x={pad - 9} y={pad + ih + 12} fontSize={10} fill="#a1a1aa" textAnchor="end">O</text>

        {/* series */}
        {series.map((s, i) => {
          const d = shapeToPath(s.shape, s.variant);
          const color = PALETTE[i % PALETTE.length];
          return (
            <g key={i}>
              {/* shapeToPath outputs percent coords 0-100; map into the plot box */}
              {s.fill && (
                <path
                  d={`${d} L100,100 L0,100 Z`}
                  transform={`translate(${pad}, ${pad}) scale(${iw / 100}, ${ih / 100})`}
                  fill={color}
                  fillOpacity={s.dashed ? 0.06 : 0.1}
                  stroke="none"
                />
              )}
              {/* soft halo underlay for depth */}
              <path
                d={d}
                transform={`translate(${pad}, ${pad}) scale(${iw / 100}, ${ih / 100})`}
                fill="none"
                stroke={color}
                strokeWidth={5.5}
                strokeOpacity={0.14}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={d}
                transform={`translate(${pad}, ${pad}) scale(${iw / 100}, ${ih / 100})`}
                fill="none"
                stroke={color}
                strokeWidth={2.3}
                strokeDasharray={s.dashed ? "6 4" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* marks */}
        {marks?.map((m, i) => {
          const p = toPx(m.x, m.y ?? 0.5);
          if (m.type === "vline") {
            return (
              <g key={`m${i}`}>
                <line x1={p.x} y1={pad} x2={p.x} y2={pad + ih} stroke="#94a3b8" strokeDasharray="4 3" />
                <text x={p.x + 3} y={pad + 12} fontSize={10} fill="#64748b">{m.label}</text>
              </g>
            );
          }
          if (m.type === "hline") {
            return (
              <g key={`m${i}`}>
                <line x1={pad} y1={p.y} x2={pad + iw} y2={p.y} stroke="#94a3b8" strokeDasharray="4 3" />
                <text x={pad + 4} y={p.y - 4} fontSize={10} fill="#64748b">{m.label}</text>
              </g>
            );
          }
          return (
            <g key={`m${i}`}>
              <circle cx={p.x} cy={p.y} r={6.5} fill="#ef4444" opacity={0.16} />
              <circle cx={p.x} cy={p.y} r={3.3} fill="#ef4444" stroke="#ffffff" strokeWidth={1.1} />
              <text x={p.x + 7} y={p.y - 6} fontSize={10} fill="#52525b" fontWeight={500}>{m.label}</text>
            </g>
          );
        })}

        {/* legend */}
        {showLegend && series.some((s) => s.label) && (
          <g>
            {series
              .filter((s) => s.label)
              .slice(0, 4)
              .map((s, i) => {
                const li = series.indexOf(s);
                const color = PALETTE[li % PALETTE.length];
                const lx = pad + 10;
                const ly = pad + 16 + i * 15;
                return (
                  <g key={`l${i}`}>
                    <rect
                      x={lx - 5}
                      y={ly - 8}
                      width={Math.min(180, 38 + s.label!.length * 5.6)}
                      height={16}
                      rx={8}
                      fill="#ffffff"
                      fillOpacity={0.85}
                      stroke={color}
                      strokeOpacity={0.25}
                    />
                    <line
                      x1={lx}
                      y1={ly}
                      x2={lx + 22}
                      y2={ly}
                      stroke={color}
                      strokeWidth={2.6}
                      strokeDasharray={s.dashed ? "6 4" : undefined}
                    />
                    <text x={lx + 28} y={ly + 3.5} fontSize={10.5} fill="#3f3f46" fontWeight={500}>{s.label}</text>
                  </g>
                );
              })}
          </g>
        )}
      </svg>
    </div>
  );
}
