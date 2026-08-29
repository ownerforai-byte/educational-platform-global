"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function UnitCircle() {
  const [angleDeg, setAngleDeg] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) / 2 - 30;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = "rgba(148,163,184,0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.stroke();
    }

    // axes
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();

    // unit circle
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    const rad = (angleDeg * Math.PI) / 180;
    const px = cx + R * Math.cos(rad);
    const py = cy - R * Math.sin(rad);

    // angle arc
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * 0.3, cy);
    ctx.arc(cx, cy, R * 0.3, 0, -rad, true);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // hypotenuse
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // sine (vertical)
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // cosine (horizontal)
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, cy);
    ctx.stroke();

    // dot on circle
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();

    const sinV = Math.sin(rad).toFixed(4);
    const cosV = Math.cos(rad).toFixed(4);
    const tanV = Math.cos(rad) !== 0 ? Math.tan(rad).toFixed(4) : "undefined";

    // labels
    ctx.font = "400 12px Inter, sans-serif";
    ctx.fillStyle = "#22d3ee";
    ctx.fillText(`sin(${angleDeg}°) = ${sinV}`, 12, 24);
    ctx.fillStyle = "#f472b6";
    ctx.fillText(`cos(${angleDeg}°) = ${cosV}`, 12, 44);
    ctx.fillStyle = "#fbbf24";
    ctx.fillText(`tan(${angleDeg}°) = ${tanV}`, 12, 64);

    // triangle right-angle marker
    ctx.strokeStyle = "rgba(226,232,240,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px - 10, cy);
    ctx.lineTo(px - 10, cy - 10);
    ctx.lineTo(px, cy - 10);
    ctx.stroke();
  }, [angleDeg]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Circle & Trigonometric Functions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={480} height={480} className="mx-auto w-full max-w-lg rounded-lg border border-border" aria-label="Unit circle showing sine and cosine" />
        <div className="mx-auto flex max-w-lg flex-wrap items-center gap-3">
          <Label htmlFor="trig-angle">Angle</Label>
          <Input id="trig-angle" type="number" min={0} max={360} value={angleDeg} onChange={(e) => setAngleDeg(Number(e.target.value))} className="w-24" />
          <input
            type="range"
            min={0}
            max={360}
            value={angleDeg}
            onChange={(e) => setAngleDeg(Number(e.target.value))}
            className="flex-1"
            aria-label="Angle slider"
          />
          <span className="text-xs text-muted-foreground">Blue = sine, pink = cosine, yellow = angle</span>
        </div>
      </CardContent>
    </Card>
  );
}

function TrigGraph() {
  const [func, setFunc] = useState<"sin" | "cos" | "tan">("sin");
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // axes
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();

    // grid
    ctx.strokeStyle = "rgba(148,163,184,0.12)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const scale = 60;
    ctx.strokeStyle = func === "sin" ? "#22d3ee" : func === "cos" ? "#f472b6" : "#fbbf24";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= W; px += 1) {
      const x = (px - cx) / scale;
      let y: number;
      if (func === "sin") y = amplitude * Math.sin(frequency * x);
      else if (func === "cos") y = amplitude * Math.cos(frequency * x);
      else y = amplitude * Math.tan(frequency * x);
      // clamp tan spikes
      if (Math.abs(y) > 5) y = 5 * Math.sign(y);
      const py = cy - y * scale;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // x labels every π
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px Inter, sans-serif";
    for (let k = -3; k <= 3; k++) {
      if (k === 0) continue;
      ctx.fillText(`${k}π`, cx + k * scale * Math.PI - 10, cy + 18);
    }
    ctx.fillText("0", cx - 6, cy + 18);
  }, [func, amplitude, frequency]);

  const period = Math.abs(frequency) > 0 ? (2 * Math.PI) / Math.abs(frequency) : Infinity;
  const periodTxt = Number.isFinite(period) ? `${period.toFixed(2)} rad` : "undefined";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trigonometric Function Graph</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={600} height={360} className="w-full rounded-lg border border-border" aria-label="Trigonometric function graph" />
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <Label>Function</Label>
            <select value={func} onChange={(e) => setFunc(e.target.value as "sin" | "cos" | "tan")} className="w-24 rounded-md border bg-background px-2 py-1 text-sm">
              <option value="sin">sin(x)</option>
              <option value="cos">cos(x)</option>
              <option value="tan">tan(x)</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="trig-amp">Amplitude</Label>
            <Input id="trig-amp" type="number" min={0.1} max={3} step={0.1} value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="w-24" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="trig-freq">Frequency</Label>
            <Input id="trig-freq" type="number" min={0.1} max={5} step={0.1} value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-24" />
          </div>
          <span className="text-xs text-muted-foreground">Period = {periodTxt}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function MathTrigonometry() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trigonometry Lab</CardTitle>
        <p className="text-xs text-muted-foreground">Unit circle and sine/cosine/tangent graphs</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="circle" className="w-full">
          <TabsList className="flex-wrap">
            <TabsTrigger value="circle">Unit Circle</TabsTrigger>
            <TabsTrigger value="graph">Function Graphs</TabsTrigger>
          </TabsList>
          <TabsContent value="circle" className="mt-4">
            <UnitCircle />
          </TabsContent>
          <TabsContent value="graph" className="mt-4">
            <TrigGraph />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}