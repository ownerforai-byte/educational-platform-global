"use client";

import { useState } from "react";

export function ParallelLinesVisual() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c1, setC1] = useState(-4);
  const [c2, setC2] = useState(4);

  const w = 360;
  const h = 300;
  const ox = w / 2;
  const oy = h / 2;
  const scale = 30;

  // Line 1: ax + by + c1 = 0 → y = (-ax - c1)/b
  const line1Points: string[] = [];
  for (let px = -w; px <= w * 2; px += 2) {
    const x = (px - ox) / scale;
    const y = b !== 0 ? (-a * x - c1) / b : 0;
    const sy = oy - y * scale;
    if (sy >= -20 && sy <= h + 20) {
      line1Points.push(`${px},${sy.toFixed(1)}`);
    }
  }

  // Line 2: ax + by + c2 = 0
  const line2Points: string[] = [];
  for (let px = -w; px <= w * 2; px += 2) {
    const x = (px - ox) / scale;
    const y = b !== 0 ? (-a * x - c2) / b : 0;
    const sy = oy - y * scale;
    if (sy >= -20 && sy <= h + 20) {
      line2Points.push(`${px},${sy.toFixed(1)}`);
    }
  }

  const d = Math.abs(c1 - c2) / Math.sqrt(a * a + b * b);

  // Foot of perpendicular from a point on line 1 to line 2
  const ptOnLine1_x = 0;
  const ptOnLine1_y = -c1 / b;
  const footX = (b * b * ptOnLine1_x - a * b * ptOnLine1_y - a * c2) / (a * a + b * b);
  const footY = (a * a * ptOnLine1_y - a * b * ptOnLine1_x - b * c2) / (a * a + b * b);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-2">
          <p className="font-semibold text-blue-500">Line 1: {a}x + {b}y + {c1} = 0</p>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">a</span>
            <input type="range" min="-3" max="3" step="0.5" value={a} onChange={(e) => setA(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{a}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">b</span>
            <input type="range" min="-3" max="3" step="0.5" value={b} onChange={(e) => setB(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{b}</span>
          </label>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-red-500">Line 2: {a}x + {b}y + {c2} = 0</p>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">C₁</span>
            <input type="range" min="-10" max="10" step="1" value={c1} onChange={(e) => setC1(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{c1}</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground w-4">C₂</span>
            <input type="range" min="-10" max="10" step="1" value={c2} onChange={(e) => setC2(parseFloat(e.target.value))} className="w-full" />
            <span className="font-mono w-8">{c2}</span>
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md border rounded-lg bg-slate-950">
          {/* Axes */}
          <line x1={0} y1={oy} x2={w} y2={oy} stroke="#475569" strokeWidth="0.5" />
          <line x1={ox} y1={0} x2={ox} y2={h} stroke="#475569" strokeWidth="0.5" />
          {/* Line 1 */}
          {line1Points.length > 1 && (
            <polyline points={line1Points.join(" ")} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          )}
          {/* Line 2 */}
          {line2Points.length > 1 && (
            <polyline points={line2Points.join(" ")} fill="none" stroke="#ef4444" strokeWidth="2.5" />
          )}
          {/* Distance indicator - perpendicular from line 1 to line 2 */}
          <line x1={ox + ptOnLine1_x * scale} y1={oy - ptOnLine1_y * scale} x2={ox + footX * scale} y2={oy - footY * scale} stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx={ox + ptOnLine1_x * scale} cy={oy - ptOnLine1_y * scale} r="3" fill="#3b82f6" />
          <circle cx={ox + footX * scale} cy={oy - footY * scale} r="3" fill="#ef4444" />
          {/* Right angle marker */}
          <polygon
            points={`${ox + footX * scale},${oy - footY * scale} ${ox + footX * scale + 6},${oy - footY * scale} ${ox + footX * scale},${oy - footY * scale - 6}`}
            fill="none" stroke="#fbbf24" strokeWidth="1"
          />
        </svg>
      </div>

      <div className="p-3 rounded-lg bg-muted/30 text-sm">
        <p><strong>Formula:</strong> d = |C₁ − C₂| / √(A² + B²)</p>
        <p className="mt-1"><strong>Calculation:</strong> d = |{c1} − {c2}| / √({a}² + {b}²)</p>
        <p className="font-semibold text-orange-500 mt-1">d = {d.toFixed(3)} units</p>
        <p className="text-muted-foreground mt-1">Both lines have same slope: {a}/{b === 0 ? 'undefined' : -a/b}</p>
      </div>
    </div>
  );
}
