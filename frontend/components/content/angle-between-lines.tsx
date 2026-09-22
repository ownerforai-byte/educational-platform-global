"use client";

import { useState } from "react";
import { Schematic } from "./schematic-frame";

export function AngleBetweenLinesVisual() {
  const [m1, setM1] = useState(0.5);
  const [m2, setM2] = useState(-0.8);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);

  const w = 360;
  const h = 300;
  const ox = w / 2;
  const oy = h / 2;
  const scale = 40;

  const angle = Math.abs(Math.atan((m2 - m1) / (1 + m1 * m2))) * (180 / Math.PI);
  const angle2 = 180 - angle;

  // Line 1: y = m1*x + c1
  const line1Points: string[] = [];
  for (let px = -w; px <= w * 2; px += 2) {
    const x = (px - ox) / scale;
    const y = m1 * x + c1;
    const sy = oy - y * scale;
    if (sy >= -20 && sy <= h + 20) {
      line1Points.push(`${px},${sy.toFixed(1)}`);
    }
  }

  // Line 2: y = m2*x + c2
  const line2Points: string[] = [];
  for (let px = -w; px <= w * 2; px += 2) {
    const x = (px - ox) / scale;
    const y = m2 * x + c2;
    const sy = oy - y * scale;
    if (sy >= -20 && sy <= h + 20) {
      line2Points.push(`${px},${sy.toFixed(1)}`);
    }
  }

  // Intersection point
  const ix = (c2 - c1) / (m1 - m2);
  const iy = m1 * ix + c1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-2">
          <p className="font-semibold text-blue-500">Line 1: y = m₁x + c₁</p>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">m₁</span>
            <input type="range" min="-3" max="3" step="0.1" value={m1} onChange={(e) => setM1(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{m1.toFixed(1)}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">c₁</span>
            <input type="range" min="-5" max="5" step="0.5" value={c1} onChange={(e) => setC1(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{c1}</span>
          </label>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-red-500">Line 2: y = m₂x + c₂</p>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">m₂</span>
            <input type="range" min="-3" max="3" step="0.1" value={m2} onChange={(e) => setM2(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{m2.toFixed(1)}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">c₂</span>
            <input type="range" min="-5" max="5" step="0.5" value={c2} onChange={(e) => setC2(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{c2}</span>
          </label>
        </div>
      </div>

      <Schematic
          w={w} h={h} ox={ox} oy={oy} scale={scale}
          tickStep={1}
          xLabel="x" yLabel="y"
          legend={[
            { color: "#3b82f6", label: "line 1  (m₁)" },
            { color: "#ef4444", label: "line 2  (m₂)" },
            { color: "#fbbf24", label: "intersection" },
          ]}
        >
          {/* Line 1 */}
          {line1Points.length > 1 && (
            <polyline points={line1Points.join(" ")} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          )}
          {/* Line 2 */}
          {line2Points.length > 1 && (
            <polyline points={line2Points.join(" ")} fill="none" stroke="#ef4444" strokeWidth="2.5" />
          )}
          {/* Angle arc at intersection */}
          <path
            d={`M ${ox + ix * scale + 26} ${oy - iy * scale} A 26 26 0 0 0 ${ox + ix * scale + 20} ${oy - iy * scale + 15}`}
            fill="none" stroke="#a78bfa" strokeWidth="1.5"
          />
          {/* Intersection */}
          <circle cx={ox + ix * scale} cy={oy - iy * scale} r="4" fill="#fbbf24" />
          <text x={ox + ix * scale + 8} y={oy - iy * scale - 8} fill="#fbbf24" fontSize="10" fontWeight="600">
            ({ix.toFixed(1)}, {iy.toFixed(1)})
          </text>
          {/* Angle readout */}
          <text x={w - 8} y={h - 8} fill="#a78bfa" fontSize="11" fontWeight="700" textAnchor="end">
            θ = {angle.toFixed(1)}°
          </text>
        </Schematic>

      <div className="p-3 rounded-lg bg-muted/30 text-sm">
        <p><strong>Formula:</strong> tan θ = |(m₂ − m₁)/(1 + m₁m₂)</p>
        <p className="mt-1"><strong>Calculation:</strong> tan θ = |({m2} − {m1})/(1 + {m1}×{m2})|</p>
        <p className="font-semibold text-orange-500 mt-1">θ = {angle.toFixed(2)}° (acute angle)</p>
        <p className="text-muted-foreground">Supplementary angle: {angle2.toFixed(2)}°</p>
        <p className="mt-1 text-muted-foreground">
          {Math.abs(m1 * m2 - 1) < 0.01 ? "✓ Lines are perpendicular!" :
           Math.abs(m1 - m2) < 0.01 ? "✓ Lines are parallel!" : ""}
        </p>
      </div>
    </div>
  );
}
