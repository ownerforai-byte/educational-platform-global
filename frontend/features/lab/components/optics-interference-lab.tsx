"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Pause, Play } from "lucide-react";

function wavelengthToRGB(nm: number): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  return [Math.max(r, 0), Math.max(g, 0), Math.max(b, 0)];
}

/**
 * Young's Double-Slit Interference — live wavefront field + screen intensity.
 * Pure canvas (zero deps). Physics: path difference d·sin(theta), I = I0·cos^2(phi/2).
 */
export function OpticsInterferenceLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wavelength, setWavelength] = useState(550);
  const [slitSep, setSlitSep] = useState(40);
  const [screenDist, setScreenDist] = useState(1.2);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = (canvas.width = 920);
    const H = (canvas.height = 420);

    // low-res field buffer (cheap per-pixel wave math), scaled up on blit
    // Uses getImageData/putImageData — the classic, universally supported path
    // (CanvasRenderingContext2D.createImageData is NOT available on 2D contexts).
    const off = document.createElement("canvas");
    off.width = 280; off.height = 128;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.fillStyle = "rgba(0,0,0,0)";
    octx.fillRect(0, 0, off.width, off.height);
    const img = octx.getImageData(0, 0, off.width, off.height);
    const data = img.data;

    let raf = 0; let t = 0; let alive = true;

    const draw = () => {
      if (!alive) return;
      const lam = wavelength * 1e-9;
      const d = slitSep * 1e-6;
      const L = screenDist;
      const [R, G, B] = wavelengthToRGB(wavelength);
      const s1x = 56, s1y = H / 2 - 11, s2y = H / 2 + 11;
      const screenX = 660;

      // ---- wavefield (two circular sources interfere) ----
      const fw = off.width, fh = off.height;
      const sx = fw / screenX, sy = fh / H;
      const k = (2 * Math.PI) / (lam * 90000); // scaled wavenumber for pixel space
      const wt = t;
      for (let py = 0; py < fh; py++) {
        const Y = py / sy;
        for (let px = 0; px < fw; px++) {
          const X = px / sx;
          const i = (py * fw + px) * 4;
          if (X >= 2 && X <= 8 && Math.abs(Y - H / 2) > 11) {
            data[i] = 30; data[i + 1] = 36; data[i + 2] = 56; data[i + 3] = 255;
            continue;
          }
          const r1 = Math.sqrt((X - s1x) * (X - s1x) + (Y - s1y) * (Y - s1y)) + 1e-6;
          const r2 = Math.sqrt((X - s1x) * (X - s1x) + (Y - s2y) * (Y - s2y)) + 1e-6;
          if (r1 < 5 || r2 < 5) { data[i] = 30; data[i + 1] = 36; data[i + 2] = 56; data[i + 3] = 255; continue; }
          if (X >= screenX - 1) { data[i + 3] = 0; continue; }
          const a = Math.sin(k * r1 - wt) + Math.sin(k * r2 - wt);
          const v = Math.max(0, a) * 0.42;
          data[i] = R * 255 * v + 6;
          data[i + 1] = G * 255 * v + 8;
          data[i + 2] = B * 255 * v + 14;
          data[i + 3] = 255;
        }
      }
      octx.putImageData(img, 0, 0);

      // ---- compose ----
      ctx.fillStyle = "#05070f";
      ctx.fillRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(off, 0, 0, screenX, H);

      // ---- screen intensity strip: I = cos^2(pi d y / (lam L)) ----
      const viewM = 0.06; // 6 cm of screen visible
      for (let y = 0; y < H; y++) {
        const ym = ((y - H / 2) / H) * viewM;
        const delta = (d * ym) / L;
        const inten = Math.pow(Math.cos((Math.PI * delta) / lam), 2);
        ctx.fillStyle = "rgba(" + Math.round(R * 255) + "," + Math.round(G * 255) + "," + Math.round(B * 255) + "," + inten.toFixed(3) + ")";
        ctx.fillRect(screenX, y, W - screenX - 6, 1);
      }
      // barrier + screen hardware
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(2, 0, 6, H / 2 - 12);
      ctx.fillRect(2, H / 2 + 12, 6, H / 2 - 12);
      ctx.fillRect(screenX - 3, 0, 3, H);
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "12px sans-serif";
      ctx.fillText("coherent source", 12, 20);
      ctx.fillText("double slit", 34, H / 2 - 20);
      ctx.fillText("screen (intensity)", screenX + 12, 20);

      if (playing) t += 0.16;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [wavelength, slitSep, screenDist, playing]);

  const betaMM = ((wavelength * 1e-9 * screenDist) / (slitSep * 1e-6)) * 1000;
  const fringeCount = betaMM > 0.05 ? Math.min(60, Math.floor(60 / betaMM)) : 0;
  const [R, G, B] = wavelengthToRGB(wavelength);
  const swatch = "rgb(" + Math.round(R * 255) + "," + Math.round(G * 255) + "," + Math.round(B * 255) + ")";

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <canvas ref={canvasRef} className="w-full" />
      </div>
      {/* Controls */}
      <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 lg:grid-cols-3">
        <div className="space-y-3">
          <div>
            <Label htmlFor="wl" className="block text-slate-300">
              Wavelength <span className="font-mono text-sky-300">{wavelength} nm</span>
            </Label>
            <Slider id="wl" min={380} max={700} step={5} value={[wavelength]} onValueChange={(v) => setWavelength(v[0])} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="slit" className="block text-slate-300">
              Slit separation <span className="font-mono text-sky-300">{slitSep} µm</span>
            </Label>
            <Slider id="slit" min={20} max={120} step={2} value={[slitSep]} onValueChange={(v) => setSlitSep(v[0])} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="dist" className="block text-slate-300">
              Screen distance <span className="font-mono text-sky-300">{screenDist.toFixed(1)} m</span>
            </Label>
            <Slider id="dist" min={50} max={250} step={5} value={[Math.round(screenDist * 100)]} onValueChange={(v) => setScreenDist(v[0] / 100)} className="mt-1" />
          </div>
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
          <h3 className="text-sm font-semibold text-slate-200">Live readout</h3>
          <p className="mt-1.5 text-sm text-slate-300">
            Fringe spacing β = λL/d ={" "}
            <span className="font-mono text-amber-300">{betaMM.toFixed(3)} mm</span>
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Bright fringes on 6 cm screen:{" "}
            <span className="font-mono text-amber-300">{fringeCount}</span>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Waves leaving both slits reinforce wherever the path difference is a
            whole number of wavelengths (bright) and cancel in between (dark).
            Raise λ or L to spread the fringes; widen the slit separation d to
            pack them closer.
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
          <h3 className="text-sm font-semibold text-slate-200">Light colour</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span aria-hidden="true" className="h-6 w-6 rounded-full border border-white/20" style={{ backgroundColor: swatch }} />
            <span className="font-mono text-sm text-slate-300">{wavelength} nm</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Pattern intensity: I = I₀ cos²(πd·y / λL). The central maximum sits at
            θ = 0; bright fringes appear at d·sinθ = mλ.
          </p>
        </div>
      </div>
    </div>
  );
}