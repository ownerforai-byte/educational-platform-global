"use client";

import { useState } from "react";
import { Schematic } from "./schematic-frame";

export function DistancePointToLineVisual() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const [c, setC] = useState(-5);
  const [x0, setX0] = useState(1);
  const [y0, setY0] = useState(2);

  const w = 360;
  const h = 300;
  const ox = w / 2;
  const oy = h / 2;
  const scale = 30;

  // Line: ax + by + c = 0  →  y = (-ax - c) / b
  const linePoints: string[] = [];
  for (let px = -w; px <= w * 2; px += 2) {
    const x = (px - ox) / scale;
    const y = b !== 0 ? (-a * x - c) / b : 0;
    const sy = oy - y * scale;
    if (sy >= -20 && sy <= h + 20) {
      linePoints.push(`${px},${sy.toFixed(1)}`);
    }
  }

  // Projection of (x0, y0) onto ax + by + c = 0
  const det = a * a + b * b;
  const projX = (b * b * x0 - a * b * y0 - a * c) / det;
  const projY = (a * a * y0 - a * b * x0 - b * c) / det;

  const d = Math.abs(a * x0 + b * y0 + c) / Math.sqrt(det);

  return (
    <div className="space-y-4">
      {/* Input controls */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-2">
          <p className="font-semibold text-orange-500">Line: ax + by + c = 0</p>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">a</span>
            <input
              type="range" min="-5" max="5" step="0.5" value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="font-mono w-8">{a}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">b</span>
            <input
              type="range" min="-5" max="5" step="0.5" value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="font-mono w-8">{b}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">c</span>
            <input
              type="range" min="-10" max="10" step="1" value={c}
              onChange={(e) => setC(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="font-mono w-8">{c}</span>
          </label>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-cyan-400">Point: (x₀, y₀)</p>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">x₀</span>
            <input
              type="range" min="-5" max="5" step="0.5" value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="font-mono w-8">{x0}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">y₀</span>
            <input
              type="range" min="-5" max="5" step="0.5" value={y0}
              onChange={(e) => setY0(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="font-mono w-8">{y0}</span>
          </label>
        </div>
      </div>

      {/* Visualization */}
      <Schematic
          w={w} h={h} ox={ox} oy={oy} scale={scale}
          tickStep={1}
          xLabel="x" yLabel="y"
          legend={[
            { color: "#f97316", label: "line  ax + by + c = 0" },
            { color: "#22d3ee", label: "point P(x₀, y₀)" },
            { color: "#fbbf24", label: "perpendicular foot" },
          ]}
        >
          {/* Line */}
          {linePoints.length > 1 && (
            <polyline points={linePoints.join(" ")} fill="none" stroke="#f97316" strokeWidth="2.5" />
          )}
          {/* Point */}
          <circle cx={ox + x0 * scale} cy={oy - y0 * scale} r="5" fill="#22d3ee" />
          <text x={ox + x0 * scale + 8} y={oy - y0 * scale - 8} fill="#22d3ee" fontSize="11" fontWeight="600">
            P(x₀, y₀)
          </text>
          {/* Perpendicular to foot */}
          <line x1={ox + x0 * scale} y1={oy - y0 * scale} x2={ox + projX * scale} y2={oy - projY * scale} stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Foot */}
          <circle cx={ox + projX * scale} cy={oy - projY * scale} r="3.5" fill="#fbbf24" />
          {/* Right angle marker */}
          <polygon
            points={`${ox + projX * scale},${oy - projY * scale} ${ox + projX * scale + 6},${oy - projY * scale} ${ox + projX * scale},${oy - projY * scale - 6}`}
            fill="none" stroke="#fbbf24" strokeWidth="1"
          />
          {/* Distance label */}
          <text x={(ox + x0 * scale + ox + projX * scale) / 2 + 8} y={(oy - y0 * scale + oy - projY * scale) / 2} fill="#fbbf24" fontSize="10" fontWeight="600">
            d = {d.toFixed(2)}
          </text>
        </Schematic>

      {/* Formula display */}
      <div className="p-3 rounded-lg bg-muted/30 text-sm">
        <p><strong>Formula:</strong> d = |ax₀ + by₀ + c| / √(a² + b²)</p>
        <p className="mt-1"><strong>Calculation:</strong> d = |{a}×{x0} + {b}×{y0} + ({c})| / √({a}² + {b}²)</p>
        <p className="font-semibold text-orange-500 mt-1">d = {d.toFixed(3)} units</p>
      </div>
    </div>
  );
}
