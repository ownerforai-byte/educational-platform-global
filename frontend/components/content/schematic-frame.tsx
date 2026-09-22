/**
 * Shared schematic frame for math coordinate plots.
 * Renders a consistent look: dark bg, unit grid, x/y axes with arrowheads,
 * numeric tick marks/labels, an optional legend row, and then your plot
 * children in the SAME pixel space (toX = ox + u*scale, toY = oy - v*scale).
 */

"use client";

import type React from "react";

export type LegendItem = {
  color: string;
  label: string;
  dashed?: boolean;
};

type SchematicProps = {
  w: number;
  h: number;
  /** pixel position of the origin */
  ox: number;
  oy: number;
  /** pixels per unit (used for both axes unless scaleX/scaleY given) */
  scale: number;
  /** override pixels-per-unit for the x-axis */
  scaleX?: number;
  /** override pixels-per-unit for the y-axis */
  scaleY?: number;
  legend?: LegendItem[];
  showGrid?: boolean;
  /** units between grid lines */
  gridStep?: number;
  /** units between numeric tick labels */
  tickStep?: number;
  showTicks?: boolean;
  xLabel?: string;
  yLabel?: string;
  noAxes?: boolean;
  /** custom formatter for x tick labels */
  xTickLabel?: (v: number) => string;
  /** custom formatter for y tick labels */
  yTickLabel?: (v: number) => string;
  children?: React.ReactNode;
};

export function Schematic({
  w,
  h,
  ox,
  oy,
  scale,
  scaleX,
  scaleY,
  legend,
  showGrid = true,
  gridStep = 1,
  tickStep = 1,
  showTicks = true,
  xLabel = "x",
  yLabel = "y",
  noAxes = false,
  xTickLabel,
  yTickLabel,
  children,
}: SchematicProps) {
  const sx = scaleX ?? scale;
  const sy = scaleY ?? scale;
  const X = (u: number) => ox + u * sx;
  const Y = (v: number) => oy - v * sy;

  const xmin = Math.ceil((0 - ox) / sx);
  const xmax = Math.floor((w - ox) / sx);
  const vtop = Math.floor(oy / sy);
  const vbot = Math.ceil((oy - h) / sy);

  const gridV: React.ReactElement[] = [];
  const gridH: React.ReactElement[] = [];
  if (showGrid) {
    for (let u = xmin; u <= xmax; u += gridStep) {
      if (u === 0) continue;
      gridV.push(
        <line key={"gv" + u} x1={X(u)} y1={0} x2={X(u)} y2={h} stroke="#1e293b" strokeWidth={0.5} />,
      );
    }
    for (let v = vbot; v <= vtop; v += gridStep) {
      if (v === 0) continue;
      gridH.push(
        <line key={"gh" + v} x1={0} y1={Y(v)} x2={w} y2={Y(v)} stroke="#1e293b" strokeWidth={0.5} />,
      );
    }
  }

  const ticks: React.ReactElement[] = [];
  if (showTicks) {
    for (let u = xmin; u <= xmax; u += tickStep) {
      if (u === 0) continue;
      ticks.push(
        <g key={"tx" + u}>
          <line x1={X(u)} y1={oy - 3} x2={X(u)} y2={oy + 3} stroke="#94a3b8" strokeWidth={1} />
          <text x={X(u)} y={oy + 13} fill="#64748b" fontSize={8} textAnchor="middle">
            {xTickLabel ? xTickLabel(u) : u}
          </text>
        </g>,
      );
    }
    for (let v = vbot; v <= vtop; v += tickStep) {
      if (v === 0) continue;
      ticks.push(
        <g key={"ty" + v}>
          <line x1={ox - 3} y1={Y(v)} x2={ox + 3} y2={Y(v)} stroke="#94a3b8" strokeWidth={1} />
          <text x={ox - 6} y={Y(v) + 3} fill="#64748b" fontSize={8} textAnchor="end">
            {yTickLabel ? yTickLabel(v) : v}
          </text>
        </g>,
      );
    }
  }

  return (
    <div className="w-full">
      {legend && legend.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 text-[11px]">
          {legend.map((it, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block w-4 h-0.5 rounded"
                style={{
                  backgroundColor: it.dashed ? "transparent" : it.color,
                  borderTop: it.dashed ? `1px dashed ${it.color}` : undefined,
                }}
              />
              <span className="text-muted-foreground">{it.label}</span>
            </span>
          ))}
        </div>
      )}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full border rounded-lg bg-slate-950"
        style={{ aspectRatio: `${w}/${h}` }}
      >
        {gridV}
        {gridH}
        {!noAxes && (
          <>
            <line x1={0} y1={oy} x2={w} y2={oy} stroke="#475569" strokeWidth={1} />
            <line x1={ox} y1={0} x2={ox} y2={h} stroke="#475569" strokeWidth={1} />
            <polygon points={`${w},${oy} ${w - 8},${oy - 3} ${w - 8},${oy + 3}`} fill="#475569" />
            <polygon points={`${ox},0 ${ox - 3},8 ${ox + 3},8`} fill="#475569" />
            <text x={w - 12} y={oy - 6} fill="#94a3b8" fontSize={9} textAnchor="end">
              {xLabel}
            </text>
            <text x={ox + 6} y={12} fill="#94a3b8" fontSize={9}>
              {yLabel}
            </text>
            <text x={ox - 6} y={oy + 12} fill="#64748b" fontSize={8} textAnchor="end">
              0
            </text>
          </>
        )}
        {ticks}
        {children}
      </svg>
    </div>
  );
}
