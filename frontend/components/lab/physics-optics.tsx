"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback, useWebGLCanvas } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ============ Common Medium data (refractive indices) ============ */
export const OPTICAL_MEDIUMS = [
  { name: "Vacuum", n: 1.0, color: "#0f172a", description: "Perfect vacuum â€” speed of light is absolute maximum (3.00 Ã— 10â¸ m/s). Reference medium where n = 1 exactly." },
  { name: "Air", n: 1.0003, color: "#1e293b", description: "Standard atmosphere (1 atm, 20Â°C). Light slows by only 0.03% â€” for most school problems air is treated as n â‰ˆ 1." },
  { name: "Water", n: 1.333, color: "#0ea5e9", description: "Pure water at 20Â°C. Light slows to ~75% of its vacuum speed. Causes noticeable bending when light enters from air." },
  { name: "Ice", n: 1.309, color: "#a5f3fc", description: "Crystalline ice (Hâ‚‚O solid). Slightly less dense optically than liquid water; vitreous ice ~1.31â€“1.31." },
  { name: "Glass slab (crown)", n: 1.52, color: "#38bdf8", description: "Crown glass (SiOâ‚‚ + Naâ‚‚O + CaO, ~72% SiOâ‚‚). The classic 'glass slab' in Lab experiments â€” lateral shift is easy to observe." },
  { name: "Glass slab (flint)", n: 1.62, color: "#818cf8", description: "Flint glass (adds PbO) â€” higher dispersion, used in prisms and achromatic lenses." },
  { name: "Plexiglass (acrylic)", n: 1.49, color: "#67e8f9", description: "PMMA acrylic. Common in optics kits and lens experiments; n â‰ˆ 1.48â€“1.50." },
  { name: "Glycerin", n: 1.473, color: "#fbbf24", description: "Viscous organic liquid; used to demonstrate refraction and density layers." },
  { name: "Quartz (fused silica)", n: 1.458, color: "#e2e8f0", description: "Pure SiOâ‚‚ glass. Low thermal expansion, used in UV optics and optical fibers." },
  { name: "Diamond", n: 2.417, color: "#34d399", description: "Highest natural refractive index. Critical angle only ~24.4Â° â†’ brilliant total internal reflection, the reason diamonds sparkle." },
  { name: "Sapphire", n: 1.768, color: "#3b82f6", description: "Alâ‚‚Oâ‚ƒ crystal; hard, durable, used in watch crystals and high-end optics." },
  { name: "Ruby", n: 1.770, color: "#f43f5e", description: "Alâ‚‚Oâ‚ƒ doped with CrÂ³âº; same index as sapphire (~1.77), reddish colour." },
  { name: "Carbon disulfide", n: 1.628, color: "#fde047", description: "CSâ‚‚ liquid â€” high index, highly dispersive; classic prism demo liquid." },
  { name: "Benzene", n: 1.501, color: "#94a3b8", description: "Aromatic liquid; index â‰ˆ 1.50, close to crown glass." },
  { name: "Ethanol", n: 1.361, color: "#fb923c", description: "Ethyl alcohol; lighter than water yet slightly higher index than water." },
  { name: "Olive oil", n: 1.468, color: "#84cc16", description: "Vegetable oil; often used to show that oil floats on water and refracts slightly more." },
  { name: "Sea water (3.5% salinity)", n: 1.343, color: "#0ea5e9", description: "Salt water at 20Â°C, 3.5% salinity. Slightly denser than pure water â€” refraction increases with salinity, used by sailors for crude refraction-based depth readings." },
  { name: "Sugar solution (30%)", n: 1.38, color: "#fcd34d", description: "Sucrose syrup at 30% concentration, n â‰ˆ 1.38. Higher sugar = higher index â€” the principle behind the sugar refractometer." },
  { name: "Glass BK7 (borosilicate)", n: 1.517, color: "#7dd3fc", description: "BK7 â€” premium optical glass (Schott). Standard for lab lenses, n = 1.517 at 587.6 nm." },
  { name: "Soda-lime glass", n: 1.52, color: "#38bdf8", description: "Everyday window glass â‰ˆ 1.52. Same as crown glass â€” used in most school 'glass slab' experiments." },
  { name: "Dense flint (SF10)", n: 1.728, color: "#818cf8", description: "SF10 glass â€” very high dispersion and index 1.728. Used in high-power achromatic lenses." },
  { name: "Polycarbonate", n: 1.585, color: "#c4b5fd", description: "PC plastic â‰ˆ 1.585. Strong, impact-resistant; used in lenses, safety glasses, and CD/DVDs." },
  { name: "Salt (halite, NaCl)", n: 1.544, color: "#f0abfc", description: "Rock-salt crystal n = 1.544. Transparent in the infrared â€” used in IR spectroscopy windows." },
  { name: "Zircon", n: 1.92, color: "#fda4af", description: "ZrSiOâ‚„ mineral, n â‰ˆ 1.92. A cheap diamond simulant with noticeable dispersion." },
  { name: "Naphthalene", n: 1.589, color: "#fbbf24", description: "Câ‚â‚€Hâ‚ˆ crystal, n = 1.589. Highly dispersive aromatic solid." },
  { name: "Methanol", n: 1.329, color: "#67e8f9", description: "Methyl alcohol â€” index 1.329, very close to water." },
  { name: "Acetone", n: 1.359, color: "#94a3b8", description: "Câ‚ƒHâ‚†O solvent, n = 1.359. Similar to ethanol." },
] as const;

export type OpticalMedium = (typeof OPTICAL_MEDIUMS)[number];

function findMedium(n: number, fallback = OPTICAL_MEDIUMS[0]) {
  return OPTICAL_MEDIUMS.find((m) => m.n === n) ?? fallback;
}

/* ============ Reflection ============ */
function ReflectionLab() {
  const [angle, setAngle] = useState(30);
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

    // mirror (vertical)
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();

    // normal
    ctx.strokeStyle = "rgba(148,163,184,0.35)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, cy + 150);
    ctx.lineTo(cx, cy - 150);
    ctx.stroke();
    ctx.setLineDash([]);

    const len = 210;
    const rad = (angle * Math.PI) / 180;
    const incX = cx - len * Math.cos(rad);
    const incY = cy - len * Math.sin(rad);
    const refX = cx + len * Math.cos(rad);
    const refY = cy - len * Math.sin(rad);

    // incident ray
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(incX, incY);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // reflected ray
    ctx.strokeStyle = "#22d3ee";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(refX, refY);
    ctx.stroke();

    // angle arcs
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 50, -rad, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 42, 0, rad);
    ctx.stroke();

    // labels
    ctx.fillStyle = "#fbbf24";
    ctx.font = "500 14px Inter, sans-serif";
    ctx.fillText("Incident angle " + angle + "Â°", cx - 120, cy + 78);
    ctx.fillStyle = "#22d3ee";
    ctx.fillText("Reflected angle " + angle + "Â°", cx + 10, cy + 78);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "400 12px Inter, sans-serif";
    ctx.fillText("Normal", cx + 6, cy - 152);
  }, [angle]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reflection of Light</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={600} height={360} className="w-full rounded-lg border border-border" aria-label="Reflection of light on a plane mirror" />
        <div className="flex flex-wrap items-center gap-3">
          <Label htmlFor="reflection-angle">Angle of incidence</Label>
          <Input id="reflection-angle" type="number" min={0} max={89} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-24" />
          <input type="range" min={0} max={89} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="min-w-40 flex-1" aria-label="Reflection angle slider" />
          <span className="text-xs text-muted-foreground">Law of reflection: angle of incidence = angle of reflection</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Medium selector helper ---------- */
function MediumSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (medium: OpticalMedium) => void;
}) {
  const selected = findMedium(value);
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold text-foreground">{label}</Label>
      <Select value={String(selected.n)} onValueChange={(v) => {
        const medium = OPTICAL_MEDIUMS.find((m) => String(m.n) === v) ?? OPTICAL_MEDIUMS[0];
        onChange(medium);
      }}>
        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
        <SelectContent>
          {OPTICAL_MEDIUMS.map((m) => (
            <SelectItem key={m.name} value={String(m.n)}>
              {m.name} (n = {m.n})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="rounded-md bg-muted/40 p-2 text-[11px] leading-relaxed text-muted-foreground">
        {selected.description}
      </p>
    </div>
  );
}

/* ---------- Refraction (Snell + TIR) with optical mediums ---------- */
function RefractionLab() {
  const [medium1, setMedium1] = useState<OpticalMedium>(OPTICAL_MEDIUMS[0]); // Vacuum
  const [medium2, setMedium2] = useState<OpticalMedium>(OPTICAL_MEDIUMS[4]); // Crown glass
  const [angle, setAngle] = useState(40);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const n1 = medium1.n;
  const n2 = medium2.n;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cy = H / 2;
    const cx = W / 2;

    ctx.clearRect(0, 0, W, H);
    // Upper medium tint
    ctx.fillStyle = medium1.color;
    ctx.fillRect(0, 0, W, cy);
    // Lower medium tint
    ctx.fillStyle = medium2.color;
    ctx.fillRect(0, cy, W, H - cy);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();

    const rad = (angle * Math.PI) / 180;
    const sin2 = (n1 * Math.sin(rad)) / n2;
    const clamped = Math.min(1, Math.max(-1, sin2));
    const theta2 = clamped >= 1 ? Math.PI / 2 : Math.asin(clamped);
    const cAngle = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;
    const isTIR = cAngle !== null && angle >= cAngle;

    const len = 180;
    // incident ray
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - len * Math.cos(rad), cy - len * Math.sin(rad));
    ctx.lineTo(cx, cy);
    ctx.stroke();

    if (isTIR) {
      // reflected back into medium 1 (drawn in red toward upper-right)
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + len * Math.cos(rad), cy - len * Math.sin(rad));
      ctx.stroke();
      ctx.fillStyle = "#f87171";
      ctx.font = "600 14px Inter, sans-serif";
      ctx.fillText("Total internal reflection - no refracted ray", 30, H - 16);
    } else if (theta2 > 0) {
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + len * Math.cos(theta2), cy + len * Math.sin(theta2));
      ctx.stroke();
    }

    // labels
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 13px Inter, sans-serif";
    ctx.fillText(`${medium1.name}  (nâ‚ = ${n1})`, cx - 180, 24);
    ctx.fillText(`${medium2.name}  (nâ‚‚ = ${n2})`, cx - 180, H - 16);
    ctx.fillStyle = "#fbbf24";
    ctx.font = "600 14px Inter, sans-serif";
    ctx.fillText("Î¸â‚ = " + angle + "Â°", cx - 190, cy - 78);
    if (cAngle !== null) {
      ctx.fillStyle = "#f8fafc";
      ctx.font = "400 13px Inter, sans-serif";
      ctx.fillText("Critical angle = " + cAngle.toFixed(1) + "Â°", cx - 180, cy + 88);
    }
    if (theta2 > 0 && !isTIR) {
      ctx.fillStyle = "#22d3ee";
      ctx.font = "500 13px Inter, sans-serif";
      ctx.fillText("Î¸â‚‚ = " + ((theta2 * 180) / Math.PI).toFixed(1) + "Â° (Snell's law)", cx + 40, cy + 44);
    }

    // Info box: speed ratio
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "400 12px Inter, sans-serif";
    ctx.fillText("Speed ratio vâ‚/vâ‚‚ = nâ‚‚/nâ‚ â‰ˆ " + (n2 / n1).toFixed(3), 16, H - 36);
  }, [n1, n2, angle, medium1, medium2]);

  const critical = n1 > n2 ? ((Math.asin(n2 / n1) * 180) / Math.PI).toFixed(1) : "â€”";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refraction â€” Snell&rsquo;s Law & TIR</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={600} height={360} className="w-full rounded-lg border border-border" aria-label="Refraction and total internal reflection at a boundary" />
        <div className="grid gap-4 sm:grid-cols-3">
          <MediumSelect id="medium1" label="Incident medium (above)" value={n1} onChange={setMedium1} />
          <MediumSelect id="medium2" label="Refracted medium (below)" value={n2} onChange={setMedium2} />
          <div className="space-y-1">
            <Label htmlFor="refraction-angle" className="text-xs font-semibold text-foreground">Î¸â‚ (Â°)</Label>
            <Input id="refraction-angle" type="number" min={1} max={89} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
          </div>
        </div>
        <input type="range" min={1} max={89} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" aria-label="Incidence angle slider" />
        <p className="text-xs text-muted-foreground">
          Pick a medium preset above â€” each has a real refractive index. Try Glass slab (n = 1.52) â†’ Air (n â‰ˆ 1): as Î¸â‚ passes the critical angle ({critical}Â°), the ray reflects internally instead of refracting.
        </p>
      </CardContent>
    </Card>
  );
}

/* ---------- Medium Explorer (all refractive index mediums) ---------- */
function MediumExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(4); // default Crown glass
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    const medium = OPTICAL_MEDIUMS[selectedIndex];
    const c = medium.color;

    // The "light beam" is drawn as a straight line â€” in this explorer the
    // medium is uniform, so light travels straight. Colours show speed.
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(60, H / 2);
    ctx.lineTo(W - 60, H / 2);
    ctx.stroke();

    // Speed of light bar (relative speed v = câ‚€/n)
    const v = 1 / medium.n;
    const barMax = W - 240;
    const barLength = Math.max(20, barMax * v);
    // label
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 16px Inter, sans-serif";
    ctx.fillText(medium.name, 40, 54);
    ctx.fillStyle = "#fbbf24";
    ctx.font = "500 14px Inter, sans-serif";
    ctx.fillText("n = " + medium.n + "   v = " + (v * 3.0e8).toExponential(1).replace("e+", "Ã—10^") + " m/s", 40, 84);

    // speed bar
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(40, H / 2 + 30, barMax, 16);
    ctx.fillStyle = medium.color;
    ctx.fillRect(40, H / 2 + 30, barLength, 16);
    ctx.strokeStyle = "#475569";
    ctx.strokeRect(40, H / 2 + 30, barMax, 16);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 11px Inter, sans-serif";
    ctx.fillText("0", 40, H / 2 + 62);
    ctx.fillText("câ‚€ (300,000 km/s)", 40 + barMax - 110, H / 2 + 62);

    // Description box
    ctx.fillStyle = "#1e293b";
    const lines = wrapText(ctx, medium.description, W - 80);
    const boxH = lines.length * 18 + 24;
    ctx.fillRect(40, H / 2 + 76, W - 80, boxH);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "400 12px Inter, sans-serif";
    lines.forEach((line, i) => ctx.fillText(line, 52, H / 2 + 96 + i * 17));
  }, [selectedIndex]);

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optical Medium Explorer</CardTitle>
        <p className="text-xs text-muted-foreground">Compare refractive indices and the speed of light in each medium</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={600} height={420} className="w-full rounded-lg border border-border" aria-label="Optical medium comparison chart" />
        <div className="space-y-2">
          <Label htmlFor="medium-explorer" className="text-xs font-semibold text-foreground">Select a medium</Label>
          <Select value={String(selectedIndex)} onValueChange={(v) => setSelectedIndex(Number(v))}>
            <SelectTrigger className="w-full max-w-md"><SelectValue /></SelectTrigger>
            <SelectContent>
              {OPTICAL_MEDIUMS.map((m, i) => (
                <SelectItem key={m.name} value={String(i)}>{m.name} ({m.n})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {OPTICAL_MEDIUMS.map((m, i) => (
            <button
              key={m.name}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`rounded-md border p-2 text-left transition-colors ${i === selectedIndex ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"}`}
            >
              <span className="flex items-center gap-2 text-xs font-semibold">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: m.color }} />
                {m.name}
              </span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">n = {m.n}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Lateral Shift (glass slab) ---------- */
function LateralShiftLab() {
  const [n, setN] = useState(1.52);
  const [thickness, setThickness] = useState(60);
  const [angle, setAngle] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    const rad = (angle * Math.PI) / 180;
    // Snell for entry into slab (air â†’ glass)
    const sinR = Math.sin(rad) / n;
    const r = Math.asin(Math.min(1, sinR));
    const rad2 = (angle * Math.PI) / 180;

    const slabTop = H / 2 - thickness / 2;
    const slabBottom = H / 2 + thickness / 2;

    // Glass slab region
    ctx.fillStyle = "rgba(56,189,248,0.18)";
    ctx.fillRect(cx - 110, slabTop, 220, thickness);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 110, slabTop, 220, thickness);
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText(`Glass slab (n = ${n})`, cx - 90, slabTop - 8);

    // Incident ray (from upper-left to top surface)
    const entryX = cx;
    const entryY = slabTop;
    const incLen = 120;
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(entryX - incLen * Math.cos(rad), entryY - incLen * Math.sin(rad));
    ctx.lineTo(entryX, entryY);
    ctx.stroke();

    // Refracted ray inside slab
    const exitX = cx + thickness * Math.tan(r);
    const exitY = slabBottom;
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(entryX, entryY);
    ctx.lineTo(exitX, exitY);
    ctx.stroke();

    // Emergent ray (parallel to incident, shifted)
    const outLen = 120;
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(exitX, exitY);
    ctx.lineTo(exitX + outLen * Math.cos(rad2), exitY + outLen * Math.sin(rad2));
    ctx.stroke();

    // Normal at entry
    ctx.strokeStyle = "rgba(148,163,184,0.35)";
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(entryX, slabTop - 24);
    ctx.lineTo(entryX, slabBottom + 24);
    ctx.stroke();
    ctx.setLineDash([]);

    // Lateral shift distance (d)
    const lateralOffset = exitX - entryX;
    ctx.strokeStyle = "#f87171";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(exitX, entryY);
    ctx.lineTo(exitX, sliceY(entryY));
    ctx.stroke();
    ctx.setLineDash([]);
    function sliceY(y: number) {
      return entryY + lateralShift();
    }

    function lateralShift() {
      const t = thickness;
      const cosR = Math.cos(Math.min(r, 1.55));
      const shift = (t * Math.sin(rad - r)) / Math.max(cosR, 0.1);
      return shift;
    }
    const shift = lateralShift();

    // Labels
    ctx.fillStyle = "#fbbf24";
    ctx.font = "600 14px Inter, sans-serif";
    ctx.fillText("Î¸â‚ = " + angle + "Â°", entryX - 140, entryY - 40);
    ctx.fillStyle = "#22d3ee";
    ctx.fillText("Î¸â‚‚ = " + ((r * 180) / Math.PI).toFixed(1) + "Â°", exitX + 10, entryY + 20);
    ctx.fillStyle = "#f87171";
    ctx.font = "500 13px Inter, sans-serif";
    ctx.fillText("Lateral shift d â‰ˆ " + shift.toFixed(1) + " px", exitX - 40, entryY - 6);

    // Formula bar
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "400 12px Inter, sans-serif";
    ctx.fillText("d = tÂ·sin(Î¸â‚ âˆ’ Î¸â‚‚) / cos(Î¸â‚‚)", 40, H - 24);
  }, [n, thickness, angle]);

  const critical = n > 1 ? ((Math.asin(1 / n) * 180) / Math.PI).toFixed(1) : "â€”";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lateral Shift â€” Glass Slab</CardTitle>
        <p className="text-xs text-muted-foreground">Light entering and leaving a parallel-sided glass slab emerges parallel to the incident ray but shifted sideways</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={620} height={340} className="w-full rounded-lg border border-border" aria-label="Lateral shift through a glass slab" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="slab-n" className="text-xs font-semibold text-foreground">Refractive index (n)</Label>
            <Select value={String(n)} onValueChange={(v) => setN(Number(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Air (1.00)</SelectItem>
                <SelectItem value="1.309">Ice (1.31)</SelectItem>
                <SelectItem value="1.333">Water (1.33)</SelectItem>
                <SelectItem value="1.458">Quartz (1.46)</SelectItem>
                <SelectItem value="1.49">Plexiglass (1.49)</SelectItem>
                <SelectItem value="1.52">Crown glass (1.52)</SelectItem>
                <SelectItem value="1.62">Flint glass (1.62)</SelectItem>
                <SelectItem value="1.77">Sapphire (1.77)</SelectItem>
                <SelectItem value="2.417">Diamond (2.42)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="slab-thickness" className="text-xs font-semibold text-foreground">Slab thickness (px)</Label>
            <Input id="slab-thickness" type="number" min={20} max={120} step={5} value={thickness} onChange={(e) => setThickness(Number(e.target.value))} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="slab-angle" className="text-xs font-semibold text-foreground">Angle of incidence (Â°)</Label>
            <Input id="slab-angle" type="number" min={1} max={85} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
          </div>
        </div>
        <input type="range" min={1} max={85} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" aria-label="Glass slab angle slider" />
        <p className="text-xs text-muted-foreground">
          The emergent ray is parallel to the incident ray. Lateral shift increases with thickness, and with refractive index (compare n = 1.33 water vs n = 2.42 diamond). Critical angle in this medium â‰ˆ {critical}Â° â€” beyond that, light reflects instead of escaping.
        </p>
      </CardContent>
    </Card>
  );
}

/* ---------- Prism & Dispersion ---------- */
function PrismDispersion() {
  const [angle, setAngle] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cy = H / 2;
    const cx = W / 2;
    const prismSize = 120;
    const apexX = cx;
    const apexY = cy - prismSize * 0.6;
    const baseY = cy + prismSize * 0.6;
    const baseHalf = prismSize * 0.55;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // incoming white ray
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(60, apexY);
    ctx.lineTo(apexX, apexY);
    ctx.stroke();

    // prism triangle
    ctx.fillStyle = "rgba(226,232,240,0.15)";
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(apexX, apexY);
    ctx.lineTo(cx - baseHalf, baseY);
    ctx.lineTo(cx + baseHalf, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // dispersed rays (rainbow)
    const colors = ["#ef4444", "#f97316", "#fbbf24", "#22c55e", "#22d3ee", "#3b82f6", "#a855f7"];
    const spreadAmt = angle * 1.2;
    colors.forEach((color, i) => {
      const off = (i - 3) * (5 + spreadAmt / 22);
      const offY = 28 + spreadAmt * 1.5;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(apexX, apexY);
      ctx.lineTo(cx + off * 1.7, apexY + offY);
      ctx.lineTo(cx + off, H - (i * 8 + 34));
      ctx.stroke();
    });

    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 15px Inter, sans-serif";
    ctx.fillText("White light", 80, apexY - 14);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "400 13px Inter, sans-serif";
    ctx.fillText("Dispersion: each wavelength bends differently", 60, H - 52);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Refracting angle: " + angle + "Â°", W - 210, 28);
  }, [angle]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prism & Dispersion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={640} height={360} className="w-full rounded-lg border border-border" aria-label="White light dispersion through a prism" />
        <div className="flex flex-wrap items-center gap-3">
          <Label htmlFor="prism-angle">Prism refracting angle</Label>
          <Input id="prism-angle" type="number" min={10} max={60} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-24" />
          <input type="range" min={10} max={60} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="min-w-40 flex-1" aria-label="Prism angle slider" />
          <span className="text-xs text-muted-foreground">Refraction depends on wavelength; red bends least, violet most.</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Aperture & Light Cone ---------- */
function ApertureLab() {
  const [aperture, setAperture] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cy = H / 2;
    const diaphragmX = W * 0.35;
    const halfOpen = aperture * 3;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // incoming parallel rays
    ctx.strokeStyle = "rgba(251,191,36,0.8)";
    ctx.lineWidth = 2;
    const rays = [-3, -1.5, 0, 1.5, 3];
    rays.forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(0, cy + y * 12);
      ctx.lineTo(diaphragmX, cy + y * 12);
      ctx.stroke();
    });

    // diaphragm wall with transparent opening
    ctx.fillStyle = "#334155";
    ctx.fillRect(diaphragmX - 10, 0, 20, H);
    ctx.clearRect(diaphragmX - 10, cy - halfOpen, 20, halfOpen * 2);

    // cone of rays after aperture
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      const startY = cy - halfOpen + (i / 4) * halfOpen * 2;
      const endY = cy + (startY - cy) * 3;
      ctx.beginPath();
      ctx.moveTo(diaphragmX, startY);
      ctx.lineTo(W, endY);
      ctx.stroke();
    }

    ctx.fillStyle = "#fbbf24";
    ctx.font = "500 14px Inter, sans-serif";
    ctx.fillText("Parallel rays", 20, 30);
    ctx.fillStyle = "#22d3ee";
    ctx.fillText("Aperture controls spread", W - 220, 30);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText("Aperture: " + aperture + " mm", diaphragmX - 24, cy + 28);
  }, [aperture]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aperture & Light Cone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={600} height={360} className="w-full rounded-lg border border-border" aria-label="Light passing through a variable aperture" />
        <div className="flex flex-wrap items-center gap-3">
          <Label htmlFor="aperture">Aperture (mm)</Label>
          <Input id="aperture" type="number" min={0.5} max={6} step={0.5} value={aperture} onChange={(e) => setAperture(Number(e.target.value))} className="w-24" />
          <input type="range" min={0.5} max={6} step={0.5} value={aperture} onChange={(e) => setAperture(Number(e.target.value))} className="min-w-40 flex-1" aria-label="Aperture slider" />
          <span className="text-xs text-muted-foreground">Smaller aperture = wider cone (sharper but dimmer); larger = tighter beam (brighter).</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Diffraction & Interference (screen) ---------- */
function DiffractionLab() {
  const [wavelength, setWavelength] = useState(550);
  const [slits, setSlits] = useState(1); // 1 = single slit, 2 = double slit
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const barrierX = W * 0.25;
    const screenX = W - 36;
    const N = 600;
    const wlScale = wavelength / 550;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // sample the intensity and draw column on screen
    for (let v = 0; v < N; v++) {
      const y = 12 + (v / N) * (H - 24);
      const t = (v - N / 2) / 95;
      let I: number;
      if (slits === 1) {
        const b = 0.26;
        const x = Math.PI * b * t;
        I = Math.abs(x) < 1e-6 ? 1 : Math.pow(Math.sin(x) / x, 2);
      } else {
        const d = 0.22;
        const b = 0.12;
        const alpha = Math.PI * d * t;
        const beta = Math.PI * b * t;
        const envelope = Math.abs(beta) < 1e-6 ? 1 : Math.pow(Math.sin(beta) / beta, 2);
        I = Math.pow(Math.cos(alpha), 2) * envelope;
      }
      const intensity = Math.max(0, Math.min(255, Math.floor(I * 255 * wlScale)));
      ctx.fillStyle = "rgb(" + intensity + "," + intensity + "," + Math.min(255, intensity * 1.15) + ")";
      ctx.fillRect(screenX, y, 12, (H - 24) / N + 1);
    }

    // barrier
    ctx.fillStyle = "#334155";
    ctx.fillRect(barrierX - 8, 0, 16, H);
    if (slits === 1) {
      ctx.clearRect(barrierX - 8, H / 2 - 4, 16, 8);
    } else {
      ctx.clearRect(barrierX - 8, H / 2 - 12, 16, 8);
      ctx.clearRect(barrierX - 8, H / 2 + 4, 16, 8);
    }

    // screen edge
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(screenX - 4, 0);
    ctx.lineTo(screenX - 4, H);
    ctx.stroke();

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 13px Inter, sans-serif";
    ctx.fillText(slits === 1 ? "Single slit" : "Double slit", barrierX - 30, 20);
    ctx.fillText("Î» = " + wavelength + " nm", screenX - 24, 20);
  }, [wavelength, slits]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diffraction & Interference</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={600} height={360} className="w-full rounded-lg border border-border" aria-label="Diffraction and interference pattern" />
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <Label htmlFor="diff-wl">Wavelength (nm)</Label>
            <Input id="diff-wl" type="number" min={380} max={750} step={10} value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} className="w-24" />
          </div>
          <input type="range" min={380} max={750} step={10} value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} className="min-w-40 flex-1" aria-label="Wavelength slider" />
          <div className="space-y-1">
            <Label>Setup</Label>
            <select value={slits} onChange={(e) => setSlits(Number(e.target.value))} className="w-28 rounded-md border bg-background px-2 py-1 text-sm">
              <option value={1}>Single slit</option>
              <option value={2}>Double slit</option>
            </select>
          </div>
          <span className="text-xs text-muted-foreground">Single slit â†’ central bright + fading fringes; double slit â†’ fine interference fringes inside a sinc envelope.</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Wavefront Interference (2D ripple) ---------- */
function WaveInterference() {
  const [freq, setFreq] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const time = performance.now() * 0.001 * 0.6;
    const lambda = 46 / freq;
    const img = ctx.getImageData(0, 0, W, H);
    const data = img.data;

    for (let y = 0; y < H; y += 2) {
      for (let x = 0; x < W; x += 2) {
        const d1 = Math.sqrt((x - W * 0.35) * (x - W * 0.35) + (y - H / 2) * (y - H / 2));
        const d2 = Math.sqrt((x - W * 0.65) * (x - W * 0.65) + (y - H / 2) * (y - H / 2));
        const v =
          0.55 * Math.sin((2 * Math.PI * d1) / lambda - time * 5) +
          0.55 * Math.sin((2 * Math.PI * d2) / lambda - time * 5);
        const i = (y * W + x) * 4;
        if (v > 0) {
          data[i] = 120 + 120 * Math.min(1, v);
          data[i + 1] = 170 + 80 * Math.min(1, v);
          data[i + 2] = 255;
        } else {
          data[i] = 15;
          data[i + 1] = 20 + 60 * Math.abs(v);
          data[i + 2] = 60 + 60 * Math.abs(v);
        }
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);

    // source markers
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(W * 0.35, H / 2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.65, H / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 13px Inter, sans-serif";
    ctx.fillText("Two coherent point sources", W / 2 - 84, 20);
  }, [freq]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wave Interference</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas ref={canvasRef} width={560} height={360} className="w-full rounded-lg border border-border" aria-label="Two-source wave interference pattern" />
        <div className="flex flex-wrap items-center gap-3">
          <Label htmlFor="wave-freq">Frequency</Label>
          <input type="range" min={1} max={5} step={0.1} value={freq} onChange={(e) => setFreq(Number(e.target.value))} id="wave-freq" className="min-w-40 flex-1" aria-label="Wave frequency slider" />
          <span className="text-xs text-muted-foreground">Lower frequency = longer wavelength â†’ wider fringes.</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- 3D Lens Visualization ---------- */
function Lens3D() {
  const [focalLength, setFocalLength] = useState(3);
  const [lensType, setLensType] = useState<"convex" | "concave">("convex");
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let rayGroup: THREE.Group;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 4, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Lens (convex or concave)
      const lensGroup = new THREE.Group();
      const lensGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.3, 32);
      const lensMat = new THREE.MeshPhysicalMaterial({
        color: lensType === "convex" ? 0x38bdf8 : 0x818cf8,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.5,
      });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.z = Math.PI / 2;
      lensGroup.add(lens);
      scene.add(lensGroup);

      // Focal point markers
      const focusGeo = new THREE.SphereGeometry(0.15, 16, 16);
      const focusMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.5 });
      const focus1 = new THREE.Mesh(focusGeo, focusMat);
      focus1.position.set(-focalLength, 0, 0);
      scene.add(focus1);
      const focus2 = new THREE.Mesh(focusGeo, focusMat);
      focus2.position.set(focalLength, 0, 0);
      scene.add(focus2);

      // Ray group
      rayGroup = new THREE.Group();
      scene.add(rayGroup);

      const rebuildRays = () => {
        while (rayGroup.children.length > 0) {
          const child = rayGroup.children[0];
          rayGroup.remove(child);
          if (child instanceof THREE.Line) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        }

        const rayColors = [0xef4444, 0x22c55e, 0x3b82f6, 0xfbbf24];
        const rayHeights = [1.2, 0.6, 0, -0.6];

        rayHeights.forEach((h, i) => {
          const color = rayColors[i % rayColors.length];
          const start = new THREE.Vector3(-6, h, 0);
          const end = new THREE.Vector3(6, h, 0);

          if (lensType === "convex") {
            // Parallel rays converge at focal point
            const focusX = focalLength;
            const focusY = 0;
            const midX = 0;
            const midY = h;
            const endX = 6;
            const endY = h + (focusY - h) * ((6 - midX) / (focusX - midX));

            const points = [start, new THREE.Vector3(midX, midY, 0), new THREE.Vector3(endX, endY, 0)];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({ color, linewidth: 2 });
            rayGroup.add(new THREE.Line(geo, mat));
          } else {
            // Diverging rays appear to come from virtual focus
            const focusX = -focalLength;
            const focusY = 0;
            const midX = 0;
            const midY = h;
            const endX = 6;
            const endY = h + (focusY - h) * ((6 - midX) / (focusX - midX));

            const points = [start, new THREE.Vector3(midX, midY, 0), new THREE.Vector3(endX, endY, 0)];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({ color, linewidth: 2 });
            rayGroup.add(new THREE.Line(geo, mat));
          }
        });
      };

      rebuildRays();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [focalLength, lensType]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Lens Visualization</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate â€¢ Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Focal Length (units)</Label>
            <Input type="number" min={1} max={5} step={0.5} value={focalLength} onChange={(e) => setFocalLength(Number(e.target.value))} className="w-24" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Lens Type</Label>
            <select value={lensType} onChange={(e) => setLensType(e.target.value as "convex" | "concave")} className="w-32 rounded-md border bg-background px-2 py-1 text-sm">
              <option value="convex">Convex (Converging)</option>
              <option value="concave">Concave (Diverging)</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {lensType === "convex"
            ? "Parallel rays converge at the focal point F. The focal length f determines how strongly the lens bends light."
            : "Parallel rays diverge as if coming from a virtual focus behind the lens. The focal length f is negative for a concave lens."}
        </p>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">ðŸ“˜ Observation & Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            A 3D lens with parallel light rays. Yellow spheres mark the focal points. For a convex lens, rays converge at F; for a concave lens, they diverge as if from a virtual focus.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            The lens formula 1/f = 1/v âˆ’ 1/u governs image formation. A convex lens (f {'>'} 0) converges light; a concave lens (f {'<'} 0) diverges it. The power P = 1/f in dioptres.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Lenses are the heart of cameras, telescopes, microscopes, eyeglasses, and projectors. Understanding how they bend light lets us design optical instruments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- 3D Prism Dispersion ---------- */
function Prism3D() {
  const [refractingAngle, setRefractingAngle] = useState(60);
  const containerRef = useRef<HTMLDivElement>(null);
  const { error } = useWebGLCanvas(containerRef);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let rayGroup: THREE.Group;

    const init = async () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 4, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      scene.add(grid);

      // Prism (triangular)
      const prismGroup = new THREE.Group();
      const shape = new THREE.Shape();
      const halfBase = 2;
      const height = 3;
      const apexAngle = (refractingAngle * Math.PI) / 180;
      const apexX = 0;
      const apexY = height;
      const baseY = 0;

      shape.moveTo(-halfBase, baseY);
      shape.lineTo(halfBase, baseY);
      shape.lineTo(apexX, apexY);
      shape.closePath();

      const extrudeSettings = { depth: 0.5, bevelEnabled: false };
      const prismGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.6,
      });
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.position.z = -0.25;
      prismGroup.add(prism);
      scene.add(prismGroup);

      // Ray group
      rayGroup = new THREE.Group();
      scene.add(rayGroup);

      const rebuildRays = () => {
        while (rayGroup.children.length > 0) {
          const child = rayGroup.children[0];
          rayGroup.remove(child);
          if (child instanceof THREE.Line) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        }

        // White light enters from left
        const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e, 0x22d3ee, 0x3b82f6, 0xa855f7];
        const spread = 0.8;

        colors.forEach((color, i) => {
          const offset = (i - 3) * (spread / 3);
          const start = new THREE.Vector3(-6, 1.5, 0);
          const mid = new THREE.Vector3(0, 1.5, 0);
          const end = new THREE.Vector3(6, 1.5 + offset, 0);

          const points = [start, mid, end];
          const geo = new THREE.BufferGeometry().setFromPoints(points);
          const mat = new THREE.LineBasicMaterial({ color, linewidth: 2 });
          rayGroup.add(new THREE.Line(geo, mat));
        });
      };

      rebuildRays();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [refractingAngle]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Prism Dispersion</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate â€¢ Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <WebGLFallback /> : <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />}
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Refracting Angle (Â°)</Label>
            <Input type="number" min={30} max={80} value={refractingAngle} onChange={(e) => setRefractingAngle(Number(e.target.value))} className="w-24" />
          </div>
          <input type="range" min={30} max={80} value={refractingAngle} onChange={(e) => setRefractingAngle(Number(e.target.value))} className="min-w-40 flex-1" aria-label="Prism angle slider" />
        </div>
        <p className="text-xs text-muted-foreground">
          White light entering a prism is dispersed into its constituent colours. Violet (short wavelength) bends most; red (long wavelength) bends least. The deviation Î´ â‰ˆ (n âˆ’ 1)Â·A for a thin prism.
        </p>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">ðŸ“˜ Observation & Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            A 3D triangular prism with white light entering from the left and dispersing into a rainbow on the right. The spread increases with the refracting angle.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Dispersion occurs because the refractive index depends on wavelength: n_violet {'>'} n_red. The dispersive power Ï‰ = (n_violet âˆ’ n_red)/(n_yellow âˆ’ 1) measures how strongly a material spreads colours.
          </p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Dispersion explains rainbows, prism spectroscopy, chromatic aberration in lenses, and how we analyse the composition of stars from their spectra.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function PhysicsOptics() {
  const [tab, setTab] = useState("reflection");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Optics Lab</CardTitle>
        <p className="text-xs text-muted-foreground">Reflection, refraction, optical mediums, lateral shift, dispersion, diffraction, and interference</p>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex-wrap">
            <TabsTrigger value="reflection">Reflection</TabsTrigger>
            <TabsTrigger value="refraction">Refraction</TabsTrigger>
            <TabsTrigger value="lateral">Lateral Shift</TabsTrigger>
            <TabsTrigger value="mediums">Mediums</TabsTrigger>
            <TabsTrigger value="prism">Prism</TabsTrigger>
            <TabsTrigger value="lens3d">3D Lens</TabsTrigger>
            <TabsTrigger value="prism3d">3D Prism</TabsTrigger>
            <TabsTrigger value="aperture">Aperture</TabsTrigger>
            <TabsTrigger value="diffraction">Diffraction</TabsTrigger>
            <TabsTrigger value="wave">Interference</TabsTrigger>
          </TabsList>
          <TabsContent value="reflection" className="mt-4">
            <ReflectionLab />
          </TabsContent>
          <TabsContent value="refraction" className="mt-4">
            <RefractionLab />
          </TabsContent>
          <TabsContent value="lateral" className="mt-4">
            <LateralShiftLab />
          </TabsContent>
          <TabsContent value="mediums" className="mt-4">
            <MediumExplorer />
          </TabsContent>
          <TabsContent value="prism" className="mt-4">
            <PrismDispersion />
          </TabsContent>
          <TabsContent value="lens3d" className="mt-4">
            <Lens3D />
          </TabsContent>
          <TabsContent value="prism3d" className="mt-4">
            <Prism3D />
          </TabsContent>
          <TabsContent value="aperture" className="mt-4">
            <ApertureLab />
          </TabsContent>
          <TabsContent value="diffraction" className="mt-4">
            <DiffractionLab />
          </TabsContent>
          <TabsContent value="wave" className="mt-4">
            <WaveInterference />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

