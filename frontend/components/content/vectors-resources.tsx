/**
 * Vectors Resources Panel
 * Displays interactive visuals + theory for Class 11 Mathematics → Vectors
 */

"use client";

import { useState } from "react";
import { BookOpen, Calculator, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

/* ---------- 2D Vectors Visual ---------- */
function Vectors2DVisual() {
  const [ax, setAx] = useState(2);
  const [ay, setAy] = useState(1);
  const [bx, setBx] = useState(1);
  const [by, setBy] = useState(2);

  const sumX = ax + bx;
  const sumY = ay + by;
  const magA = Math.sqrt(ax * ax + ay * ay);
  const magB = Math.sqrt(bx * bx + by * by);
  const magSum = Math.sqrt(sumX * sumX + sumY * sumY);
  const thetaA = (Math.atan2(ay, ax) * 180) / Math.PI;
  const thetaB = (Math.atan2(by, bx) * 180) / Math.PI;

  const w = 400;
  const h = 350;
  const ox = 60;
  const oy = h - 50;
  const scale = 50;
  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  const originX = toSvgX(0);
  const originY = toSvgY(0);
  const aTipX = toSvgX(ax);
  const aTipY = toSvgY(ay);
  const bTipX = toSvgX(bx);
  const bTipY = toSvgY(by);
  const sumTipX = toSvgX(sumX);
  const sumTipY = toSvgY(sumY);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="text-blue-500 font-semibold mb-1">Vector a⃗</div>
          <div className="font-mono">({ax.toFixed(1)}, {ay.toFixed(1)})</div>
          <div className="text-blue-400 mt-1">|a⃗| = {magA.toFixed(2)}</div>
          <div className="text-blue-400">θ = {thetaA.toFixed(1)}°</div>
        </div>
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="text-red-500 font-semibold mb-1">Vector b⃗</div>
          <div className="font-mono">({bx.toFixed(1)}, {by.toFixed(1)})</div>
          <div className="text-red-400 mt-1">|b⃗| = {magB.toFixed(2)}</div>
          <div className="text-red-400">θ = {thetaB.toFixed(1)}°</div>
        </div>
        <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="text-green-500 font-semibold mb-1">a⃗ + b⃗</div>
          <div className="font-mono">({sumX.toFixed(1)}, {sumY.toFixed(1)})</div>
          <div className="text-green-400 mt-1">|sum| = {magSum.toFixed(2)}</div>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground block mb-1">a⃗ = ({ax.toFixed(1)}, {ay.toFixed(1)})</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-blue-400">ax</span>
            <Slider value={[ax]} onValueChange={([v]) => setAx(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
          <div>
            <span className="text-xs text-blue-400">ay</span>
            <Slider value={[ay]} onValueChange={([v]) => setAy(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground block mb-1">b⃗ = ({bx.toFixed(1)}, {by.toFixed(1)})</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-red-400">bx</span>
            <Slider value={[bx]} onValueChange={([v]) => setBx(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
          <div>
            <span className="text-xs text-red-400">by</span>
            <Slider value={[by]} onValueChange={([v]) => setBy(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg border rounded-lg bg-slate-950">
          <defs>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
            </marker>
          </defs>

          {Array.from({ length: 9 }, (_, i) => i - 4).map((v) => (
            <g key={`grid-${v}`}>
              <line x1={toSvgX(v)} y1={0} x2={toSvgX(v)} y2={h} stroke="#334155" strokeWidth="0.5" opacity="0.4" />
              <line x1={0} y1={toSvgY(v)} x2={w} y2={toSvgY(v)} stroke="#334155" strokeWidth="0.5" opacity="0.4" />
            </g>
          ))}

          <line x1={0} y1={originY} x2={w} y2={originY} stroke="#64748b" strokeWidth="1.5" />
          <line x1={originX} y1={0} x2={originX} y2={h} stroke="#64748b" strokeWidth="1.5" />
          <text x={w - 10} y={originY - 5} fill="#94a3b8" fontSize="10">x</text>
          <text x={originX + 5} y={12} fill="#94a3b8" fontSize="10">y</text>

          {/* Parallelogram (dashed) */}
          <polygon
            points={`${originX},${originY} ${aTipX},${aTipY} ${toSvgX(bx + ax)},${toSvgY(by + ay)} ${bTipX},${bTipY}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          <line x1={originX} y1={originY} x2={bTipX} y2={bTipY} stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
          <text x={bTipX + 5} y={bTipY - 5} fill="#ef4444" fontSize="10">b⃗</text>

          <line x1={originX} y1={originY} x2={aTipX} y2={aTipY} stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
          <text x={aTipX + 5} y={aTipY + 12} fill="#3b82f6" fontSize="10">a⃗</text>

          <line x1={originX} y1={originY} x2={sumTipX} y2={sumTipY} stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <text x={sumTipX + 5} y={sumTipY - 5} fill="#22c55e" fontSize="10">a⃗+b⃗</text>

          <circle cx={originX} cy={originY} r="3" fill="#f8fafc" />
        </svg>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Parallelogram Rule:</strong> The sum a⃗ + b⃗ is the diagonal of the parallelogram formed by a⃗ and b⃗.
        Compute component-wise: (ax+bx, ay+by). Magnitude: |v⃗| = √(vx² + vy²). Direction: θ = arctan(vy/vx).
      </div>
    </div>
  );
}

/* ---------- Dot Product Visual ---------- */
function DotProductVisual() {
  const [ax, setAx] = useState(3);
  const [ay, setAy] = useState(1);
  const [bx, setBx] = useState(1);
  const [by, setBy] = useState(3);

  const dotProduct = ax * bx + ay * by;
  const magA = Math.sqrt(ax * ax + ay * ay);
  const magB = Math.sqrt(bx * bx + by * by);
  const cosTheta = magA * magB !== 0 ? dotProduct / (magA * magB) : 0;
  const thetaRad = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
  const thetaDeg = (thetaRad * 180) / Math.PI;
  const isPerpendicular = Math.abs(dotProduct) < 0.01;

  const w = 400;
  const h = 350;
  const ox = 80;
  const oy = h - 60;
  const scale = 55;
  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  const originX = toSvgX(0);
  const originY = toSvgY(0);
  const aTipX = toSvgX(ax);
  const aTipY = toSvgY(ay);
  const bTipX = toSvgX(bx);
  const bTipY = toSvgY(by);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="text-blue-500 font-semibold">Vector a⃗</div>
          <div className="font-mono mt-1">({ax.toFixed(1)}, {ay.toFixed(1)})</div>
          <div className="text-blue-400">|a⃗| = {magA.toFixed(2)}</div>
        </div>
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="text-red-500 font-semibold">Vector b⃗</div>
          <div className="font-mono mt-1">({bx.toFixed(1)}, {by.toFixed(1)})</div>
          <div className="text-red-400">|b⃗| = {magB.toFixed(2)}</div>
        </div>
      </div>

      <div className="p-3 rounded-lg border bg-slate-950">
        <div className="text-center font-mono text-sm mb-2">
          <span className="text-blue-400">a⃗</span> · <span className="text-red-400">b⃗</span>
          <span className="text-muted-foreground"> = ({ax.toFixed(1)})(</span>
          <span className="text-red-400">{bx.toFixed(1)}</span>
          <span className="text-muted-foreground">) + ({ay.toFixed(1)})(</span>
          <span className="text-red-400">{by.toFixed(1)}</span>
          <span className="text-muted-foreground">) = </span>
          <span className={`font-bold ${isPerpendicular ? "text-green-400" : "text-yellow-400"}`}>
            {dotProduct.toFixed(2)}
          </span>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          = |a⃗||b⃗|cos θ = {magA.toFixed(2)} × {magB.toFixed(2)} × cos({thetaDeg.toFixed(1)}°)
        </div>
        <div className="text-center text-xs mt-1">
          θ = <span className={`font-semibold ${isPerpendicular ? "text-green-400" : "text-yellow-400"}`}>
            {thetaDeg.toFixed(1)}°
          </span>
          {isPerpendicular && <span className="text-green-400 ml-2">⟹ Perpendicular!</span>}
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground block mb-1">a⃗ = ({ax.toFixed(1)}, {ay.toFixed(1)})</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-blue-400">ax</span>
            <Slider value={[ax]} onValueChange={([v]) => setAx(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
          <div>
            <span className="text-xs text-blue-400">ay</span>
            <Slider value={[ay]} onValueChange={([v]) => setAy(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground block mb-1">b⃗ = ({bx.toFixed(1)}, {by.toFixed(1)})</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-red-400">bx</span>
            <Slider value={[bx]} onValueChange={([v]) => setBx(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
          <div>
            <span className="text-xs text-red-400">by</span>
            <Slider value={[by]} onValueChange={([v]) => setBy(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg border rounded-lg bg-slate-950">
          <defs>
            <marker id="arrow-dp-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-dp-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>

          {Array.from({ length: 9 }, (_, i) => i - 4).map((v) => (
            <g key={`grid-${v}`}>
              <line x1={toSvgX(v)} y1={0} x2={toSvgX(v)} y2={h} stroke="#334155" strokeWidth="0.5" opacity="0.4" />
              <line x1={0} y1={toSvgY(v)} x2={w} y2={toSvgY(v)} stroke="#334155" strokeWidth="0.5" opacity="0.4" />
            </g>
          ))}

          <line x1={0} y1={originY} x2={w} y2={originY} stroke="#64748b" strokeWidth="1.5" />
          <line x1={originX} y1={0} x2={originX} y2={h} stroke="#64748b" strokeWidth="1.5" />

          {/* Angle arc */}
          {thetaDeg > 5 && thetaDeg < 175 && (
            <path
              d={`M ${originX + 30} ${originY} A 30 30 0 0 ${thetaDeg > 90 ? 1 : 0} ${originX + 30 * Math.cos(thetaRad)} ${originY - 30 * Math.sin(thetaRad)}}`}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              opacity="0.7"
            />
          )}

          <line x1={originX} y1={originY} x2={aTipX} y2={aTipY} stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-dp-blue)" />
          <text x={aTipX + 5} y={aTipY + 12} fill="#3b82f6" fontSize="10">a⃗</text>

          <line x1={originX} y1={originY} x2={bTipX} y2={bTipY} stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-dp-red)" />
          <text x={bTipX + 5} y={bTipY - 5} fill="#ef4444" fontSize="10">b⃗</text>

          <circle cx={originX} cy={originY} r="3" fill="#f8fafc" />
          <text x={originX + 5} y={originY + 12} fill="#94a3b8" fontSize="9">O</text>
        </svg>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Dot Product Properties:</strong>
        {" a⃗ · b⃗ = |a⃗||b⃗|cos θ = ax·bx + ay·by"}
        {isPerpendicular && (
          <span className="text-green-500 ml-1">
            {" When a⃗ · b⃗ = 0, the vectors are perpendicular (θ = 90°)."}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- Linear Dependence Visual ---------- */
function LinearDependenceVisual() {
  const [mode, setMode] = useState<"dependent" | "independent">("independent");
  const [v1x, setV1x] = useState(2);
  const [v1y, setV1y] = useState(1);
  const [v2x, setV2x] = useState(-1);
  const [v2y, setV2y] = useState(2);
  const [v3x, setV3x] = useState(1);
  const [v3y, setV3y] = useState(3);

  const scale = 50;
  const w = 400;
  const h = 350;
  const ox = 60;
  const oy = h - 50;
  const toSvgX = (vx: number) => ox + vx * scale;
  const toSvgY = (vy: number) => oy - vy * scale;

  const det = v1x * v2y - v1y * v2x;
  let c1 = 0, c2 = 0, isDependent = false;
  if (Math.abs(det) > 0.001) {
    c1 = (v3x * v2y - v2x * v3y) / det;
    c2 = (v1x * v3y - v3x * v1y) / det;
    isDependent = Math.abs(c1 * v1x + c2 * v2x - v3x) < 0.1 && Math.abs(c1 * v1y + c2 * v2y - v3y) < 0.1;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("dependent")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            mode === "dependent"
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
              : "bg-muted text-muted-foreground border border-muted"
          }`}
        >
          Linearly Dependent
        </button>
        <button
          onClick={() => setMode("independent")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            mode === "independent"
              ? "bg-green-500/20 text-green-400 border border-green-500/40"
              : "bg-muted text-muted-foreground border border-muted"
          }`}
        >
          Linearly Independent
        </button>
      </div>

      {mode === "dependent" && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
          <div className="font-semibold text-amber-400 mb-1">Dependent Case</div>
          <div className="font-mono">
            v₃ = <span className="text-blue-400">{c1.toFixed(2)}</span>·v₁ + <span className="text-red-400">{c2.toFixed(2)}</span>·v₂
          </div>
          <div className="text-muted-foreground mt-1">
            Check: {c1.toFixed(2)}·({v1x.toFixed(1)},{v1y.toFixed(1)}) + {c2.toFixed(2)}·({v2x.toFixed(1)},{v2y.toFixed(1)})
            = ({(c1 * v1x + c2 * v2x).toFixed(2)}, {(c1 * v1y + c2 * v2y).toFixed(2)})
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20">
          <div className="text-blue-500 font-semibold">v₁</div>
          <div className="font-mono">({v1x.toFixed(1)}, {v1y.toFixed(1)})</div>
        </div>
        <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
          <div className="text-red-500 font-semibold">v₂</div>
          <div className="font-mono">({v2x.toFixed(1)}, {v2y.toFixed(1)})</div>
        </div>
        <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
          <div className="text-green-500 font-semibold">v₃</div>
          <div className="font-mono">({v3x.toFixed(1)}, {v3y.toFixed(1)})</div>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground block mb-1">v₁ = ({v1x.toFixed(1)}, {v1y.toFixed(1)})</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-blue-400">v₁ₓ</span>
            <Slider value={[v1x]} onValueChange={([v]) => setV1x(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
          <div>
            <span className="text-xs text-blue-400">v₁ᵧ</span>
            <Slider value={[v1y]} onValueChange={([v]) => setV1y(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground block mb-1">v₂ = ({v2x.toFixed(1)}, {v2y.toFixed(1)})</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-red-400">v₂ₓ</span>
            <Slider value={[v2x]} onValueChange={([v]) => setV2x(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
          <div>
            <span className="text-xs text-red-400">v₂ᵧ</span>
            <Slider value={[v2y]} onValueChange={([v]) => setV2y(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground block mb-1">v₃ = ({v3x.toFixed(1)}, {v3y.toFixed(1)})</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-green-400">v₃ₓ</span>
            <Slider value={[v3x]} onValueChange={([v]) => setV3x(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
          <div>
            <span className="text-xs text-green-400">v₃ᵧ</span>
            <Slider value={[v3y]} onValueChange={([v]) => setV3y(v)} min={-4} max={4} step={0.1} className="mt-1" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg border rounded-lg bg-slate-950">
          <defs>
            <marker id="arrow-ldep-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-ldep-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
            <marker id="arrow-ldep-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
            </marker>
          </defs>

          {Array.from({ length: 9 }, (_, i) => i - 4).map((v) => (
            <g key={`grid-${v}`}>
              <line x1={toSvgX(v)} y1={0} x2={toSvgX(v)} y2={h} stroke="#334155" strokeWidth="0.5" opacity="0.4" />
              <line x1={0} y1={toSvgY(v)} x2={w} y2={toSvgY(v)} stroke="#334155" strokeWidth="0.5" opacity="0.4" />
            </g>
          ))}

          <line x1={0} y1={oy} x2={w} y2={oy} stroke="#64748b" strokeWidth="1.5" />
          <line x1={ox} y1={0} x2={ox} y2={h} stroke="#64748b" strokeWidth="1.5" />

          <line x1={ox} y1={oy} x2={toSvgX(v1x)} y2={toSvgY(v1y)} stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-ldep-blue)" />
          <text x={toSvgX(v1x) + 5} y={toSvgY(v1y) + 12} fill="#3b82f6" fontSize="10">v₁</text>

          <line x1={ox} y1={oy} x2={toSvgX(v2x)} y2={toSvgY(v2y)} stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-ldep-red)" />
          <text x={toSvgX(v2x) + 5} y={toSvgY(v2y) - 5} fill="#ef4444" fontSize="10">v₂</text>

          <line x1={ox} y1={oy} x2={toSvgX(v3x)} y2={toSvgY(v3y)} stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrow-ldep-green)" />
          <text x={toSvgX(v3x) + 5} y={toSvgY(v3y) + 12} fill="#22c55e" fontSize="10">v₃</text>

          <circle cx={ox} cy={oy} r="3" fill="#f8fafc" />
        </svg>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <strong className="text-foreground">Linear Dependence:</strong>
        {mode === "dependent"
          ? " Vectors are linearly dependent if one can be written as a linear combination of the others. Here, v₃ = c₁v₁ + c₂v₂."
          : " Vectors are linearly independent if no vector can be expressed as a linear combination of the others. The only solution to c₁v₁ + c₂v₂ + c₃v₃ = 0 is c₁ = c₂ = c₃ = 0."
        }
      </div>
    </div>
  );
}

/* ---------- Theory Content ---------- */
const THEORY_SECTIONS = [
  {
    title: "Vector Notation & Types",
    points: [
      "A vector has both magnitude and direction, written as v⃗ = (vx, vy) in 2D",
      "Collinear vectors: parallel to the same line (v⃗ = k·u⃗ for scalar k)",
      "Coplanar vectors: lie in the same plane (any 3 vectors in 2D are coplanar)",
      "Example: (2,3) and (4,6) are collinear since (4,6) = 2·(2,3)",
    ],
  },
  {
    title: "Linear Combination",
    points: [
      "A linear combination: c₁v₁⃗ + c₂v₂⃗ + ... + cₙvₙ⃗ where cᵢ are scalars",
      "Example: 2(1,0) + 3(0,1) = (2,3)",
      "Any vector in the plane can be written as a combination of two non-parallel vectors",
      "The set of all linear combinations forms the span of the vectors",
    ],
  },
  {
    title: "Linear Dependence / Independence",
    points: [
      "Dependent: c₁v₁⃗ + c₂v₂⃗ + ... + cₙvₙ⃗ = 0⃗ with not all cᵢ = 0",
      "Independent: the only solution is c₁ = c₂ = ... = cₙ = 0",
      "In 2D: two vectors are dependent iff they are parallel (one is a scalar multiple of the other)",
      "In 2D: at most 2 vectors can be independent; any 3+ are dependent",
    ],
  },
  {
    title: "Dot Product",
    points: [
      "a⃗ · b⃗ = |a⃗||b⃗|cos θ = ax·bx + ay·by",
      "Properties: commutative (a⃗·b⃗ = b⃗·a⃗), distributive over addition",
      "a⃗ · b⃗ = 0 ⟹ vectors are perpendicular (θ = 90°)",
      "a⃗ · a⃗ = |a⃗|² (dot product with itself gives squared magnitude)",
    ],
  },
  {
    title: "Conditions for Collinearity & Coplanarity",
    points: [
      "Two vectors a⃗ and b⃗ are collinear iff a⃗ × b⃗ = 0 (cross product is zero)",
      "In 2D: collinear iff ax·by - ay·bx = 0 (determinant is zero)",
      "Three vectors are coplanar iff their scalar triple product is zero",
      "In 3D: coplanar iff det(v₁, v₂, v₃) = 0",
    ],
  },
];

/* ---------- Main Panel ---------- */
export function VectorsResources() {
  return (
    <div className="space-y-6">
      {/* PDF Resources */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Vectors — Resources</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exercises covering vector operations, dot product, and linear dependence
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: "vec-1",
              title: "Vectors — Basic Operations",
              description: "Vector addition, subtraction, scalar multiplication, and magnitude.",
              tags: ["Addition", "Magnitude", "Scalar Mult"],
            },
            {
              id: "vec-2",
              title: "Vectors — Dot Product & Applications",
              description: "Dot product, angle between vectors, projection, and perpendicularity.",
              tags: ["Dot Product", "Projection", "Angle"],
            },
          ].map((res) => (
            <div
              key={res.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-background/60 hover:bg-accent/50 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{res.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{res.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Interactive Visuals */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Interactive Visualizations</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore vectors, dot product, and linear dependence visually
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="2d" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="2d">2D Vectors</TabsTrigger>
              <TabsTrigger value="dot">Dot Product</TabsTrigger>
              <TabsTrigger value="linear">Linear Dependence</TabsTrigger>
            </TabsList>

            <TabsContent value="2d" className="space-y-4">
              <Vectors2DVisual />
            </TabsContent>

            <TabsContent value="dot" className="space-y-4">
              <DotProductVisual />
            </TabsContent>

            <TabsContent value="linear" className="space-y-4">
              <LinearDependenceVisual />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Theory Summary */}
      <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Theory Summary</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Key concepts for Class 11 Vectors
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {THEORY_SECTIONS.map((sec) => (
              <div key={sec.title} className="p-3 rounded-lg border bg-background/60">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {sec.title}
                </h4>
                <ul className="space-y-1">
                  {sec.points.map((p, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-1.5"
                    >
                      <span className="text-green-500 mt-0.5">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
