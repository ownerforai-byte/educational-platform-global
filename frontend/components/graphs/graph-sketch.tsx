import { shapeToPath, type ShapeName } from "@/lib/graphs-shapes";

const PALETTE = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#a855f7", "#14b8a6"];

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
}: {
  series: { shape: ShapeName; variant?: number; label?: string; dashed?: boolean }[];
  marks?: { x: number; y?: number; label: string; type?: "point" | "vline" | "hline" }[];
  axes: { x: string; y: string };
  height?: number;
  showLegend?: boolean;
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
        {/* grid */}
        {[0.25, 0.5, 0.75].map((g) => (
          <g key={g} stroke="#f1f1f4">
            <line x1={pad + g * iw} y1={pad} x2={pad + g * iw} y2={pad + ih} />
            <line x1={pad} y1={pad + g * ih} x2={pad + iw} y2={pad + g * ih} />
          </g>
        ))}
        {/* axes */}
        <line x1={pad} y1={pad + ih} x2={pad + iw} y2={pad + ih} stroke="#71717a" strokeWidth={1.6} />
        <line x1={pad} y1={pad} x2={pad} y2={pad + ih} stroke="#71717a" strokeWidth={1.6} />
        <text x={pad + iw} y={pad + ih + 14} fontSize={11} fill="#52525b" textAnchor="end">
          {axes.x} →
        </text>
        <text x={pad - 6} y={pad - 12} fontSize={11} fill="#52525b" textAnchor="start">
          ↑ {axes.y}
        </text>

        {/* series */}
        {series.map((s, i) => {
          const d = shapeToPath(s.shape, s.variant);
          const color = PALETTE[i % PALETTE.length];
          return (
            <g key={i}>
              {/* shapeToPath outputs percent coords 0-100; map into the plot box */}
              <path
                d={d}
                transform={`translate(${pad}, ${pad}) scale(${iw / 100}, ${ih / 100})`}
                fill="none"
                stroke={color}
                strokeWidth={2.2}
                strokeDasharray={s.dashed ? "5 4" : undefined}
                strokeLinecap="round"
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
              <circle cx={p.x} cy={p.y} r={3.4} fill="#ef4444" />
              <text x={p.x + 5} y={p.y - 5} fontSize={10} fill="#64748b">{m.label}</text>
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
                    <line
                      x1={lx}
                      y1={ly}
                      x2={lx + 22}
                      y2={ly}
                      stroke={color}
                      strokeWidth={2.4}
                      strokeDasharray={s.dashed ? "5 4" : undefined}
                    />
                    <text x={lx + 28} y={ly + 3.5} fontSize={10.5} fill="#3f3f46">{s.label}</text>
                  </g>
                );
              })}
          </g>
        )}
      </svg>
    </div>
  );
}
