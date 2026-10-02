"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

type Streak = {
  x0: number;
  y0: number;
  dirX: number;
  dirY: number;
  speed: number; // px/sec along the path
  tail: number; // px length of the visible trail
  baseR: number; // base head radius (grows as it "comes near")
  exitDist: number; // distance until it leaves the screen
  traveled: number;
  flashSpeed: number; // Hz-ish phase speed for the green flash
  phase: number;
};

type StaticStar = {
  x: number;
  y: number;
  r: number;
  alpha: number;
};


const STATIC_STAR_DENSITY = 0.000016; // a quiet, sparse sky
const MAX_STATIC_STARS = 64;
const MAX_STREAKS = 3; // at most a few comets on screen at once

/* ── The streak is a soft white: deep/blur at the far end in dark
   violet/charcoal (#1f1924) and "clear/flash" at the near end in white.
   Depth t (0→1) lerps between them, so it reads as arriving from deep
   inside and clearing up to a bright white streak near. */
const FAR = { r: 31, g: 25, b: 36 }; // #1f1924
const NEAR = { r: 255, g: 255, b: 255 }; // white

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};
const rgba = (r: number, g: number, b: number, a: number) =>
  `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${a})`;

/* "Natural" but LARGE gap: always at least 40s, with longer random waits
   on top — e.g. 40s then 60s then 120s then 45s … */
const naturalGap = () => {
  const r = Math.random();
  if (r < 0.45) return 40 + Math.random() * 20; // 40–60s
  if (r < 0.8) return 60 + Math.random() * 40; // 60–100s
  return 100 + Math.random() * 50; // 100–150s (the long, quiet wait)
};

/**
 * "Nebula Sky" overlay: a quiet sky with the occasional comet that arrives
 * from deep inside — starting dim, slightly blurred and dark-violet, then
 * sharpening and flashing vibrant spring green as it crosses the screen
 * toward the bottom-right base (past the mid of the bottom/right edges, with
 * only a rare shot elsewhere). Purely decorative:
 *  - `mix-blend-mode: screen` + `pointer-events: none` (via .starfield CSS).
 *  - Pauses its RAF loop when the tab is hidden.
 *  - `prefers-reduced-motion`: static faint stars only, no comets.
 *
 * Mounted exactly once in the root layout so every page shows the sky.
 */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Comets only make sense on the dark/space themes — nothing to do here.
    if (!dark) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let staticStars: StaticStar[] = [];
    let streaks: Streak[] = [];
    let nextSpawnAt = 0;
    let rafId = 0;
    let running = true;
    let lastTs = 0;
    let now = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    // How far a straight line from (x0,y0) heading (dirX,dirY) travels before
    // it leaves the screen (with a small margin). Used as the total path
    // length and to know when a comet is done.
    const exitDist = (
      x0: number,
      y0: number,
      dirX: number,
      dirY: number,
      margin = 90,
    ) => {
      let d = Infinity;
      if (dirX > 0) d = Math.min(d, (width + margin - x0) / dirX);
      else if (dirX < 0) d = Math.min(d, (-margin - x0) / dirX);
      if (dirY > 0) d = Math.min(d, (height + margin - y0) / dirY);
      else if (dirY < 0) d = Math.min(d, (-margin - y0) / dirY);
      if (!isFinite(d) || d <= 0) d = width * 2; // fallback, just let it run
      return d;
    };

    const spawnStreak = () => {
      // Start "deep inside" / one side: the upper-left region (may be off-screen).
      const x0 = width * (-0.08 + Math.random() * 0.42);
      const y0 = height * (-0.08 + Math.random() * 0.42);

      // End point: 85% of the time it ends past the mid of the bottom base
      // AND past the mid of the right perpendicular (bottom-right base).
      let xEnd: number;
      let yEnd: number;
      if (Math.random() < 0.85) {
        xEnd = width * (0.55 + Math.random() * 0.55); // 55%–110%
        yEnd = height * (0.55 + Math.random() * 0.55); // 55%–110%
      } else {
        // Rare chance: somewhere else.
        xEnd = width * Math.random();
        yEnd = height * Math.random();
      }

      let dx = xEnd - x0;
      let dy = yEnd - y0;
      const mag = Math.hypot(dx, dy) || 1;
      dx /= mag;
      dy /= mag;

      const total = exitDist(x0, y0, dx, dy);

      streaks.push({
        x0,
        y0,
        dirX: dx,
        dirY: dy,
        speed: 130 + Math.random() * 130, // long, slow drift — a lazy comet
        tail: 320 + Math.random() * 180, // a long line trailing behind
        baseR: 1.4 + Math.random() * 1.2,
        exitDist: total,
        traveled: 0,
        flashSpeed: 2.2 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
      });
    };

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = dpr();
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(
        MAX_STATIC_STARS,
        Math.round(width * height * STATIC_STAR_DENSITY),
      );
      staticStars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.35 + Math.random() * 0.85,
        alpha: 0.1 + Math.random() * 0.26,
      }));
      // First comet arrives shortly, then a natural rhythm takes over.
      nextSpawnAt = 1;
    };

    const paintStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of staticStars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 226, 255, ${s.alpha})`;
        ctx.fill();
      }
    };

    const paintFrame = (ts: number) => {
      if (!running) return;
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0;
      lastTs = ts;
      now += dt;

      ctx.clearRect(0, 0, width, height);

      // Quiet, static background stars.
      for (const s of staticStars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 226, 255, ${s.alpha})`;
        ctx.fill();
      }

      // Natural rhythm: spawn when due, then wait a random short/med/long gap.
      if (now >= nextSpawnAt && streaks.length < MAX_STREAKS) {
        spawnStreak();
        nextSpawnAt = now + naturalGap();
      }

      ctx.globalCompositeOperation = "lighter"; // glows sum up on the dark sky
      streaks = streaks.filter((st) => st.traveled < st.exitDist);
      for (const st of streaks) {
        st.traveled += st.speed * dt;
        const t = Math.min(1, st.traveled / st.exitDist); // 0 (far) → 1 (near)
        const x = st.x0 + st.dirX * st.traveled;
        const y = st.y0 + st.dirY * st.traveled;
        const k = smoothstep(t); // depth easing

        // Color: dark-violet (far/blur) → spring-green (near/clear).
        const r = lerp(FAR.r, NEAR.r, k);
        const g = lerp(FAR.g, NEAR.g, k);
        const b = lerp(FAR.b, NEAR.b, k);

        // "A little blur" when far, "clear" when near: the soft halo is wider
        // and dimmer at the start, tighter and brighter at the end.
        const blurR = st.baseR * (9 + (1 - k) * 10); // far → ~19x, near → 9x
        const coreR = st.baseR * (0.5 + k * 1.1); // grows as it comes near

        // Flash: a green pulse that ramps in as the comet gets near.
        const flashEnv = 0.5 + 0.5 * Math.sin(now * st.flashSpeed + st.phase);
        const flash = (0.15 + 0.85 * k) * flashEnv;
        const headAlpha = Math.min(0.95, 0.25 + 0.5 * k + 0.35 * flash);

        // Comet tail: a straight line back toward the deep/far end, fading
        // from green (near the head) to dark violet (deep inside).
        const tx = x - st.dirX * st.tail;
        const ty = y - st.dirY * st.tail;
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, rgba(FAR.r, FAR.g, FAR.b, 0));
        grad.addColorStop(0.55, rgba(lerp(FAR.r, NEAR.r, 0.3), lerp(FAR.g, NEAR.g, 0.3), lerp(FAR.b, NEAR.b, 0.3), 0.12));
        grad.addColorStop(1, rgba(r, g, b, 0.5 * headAlpha + 0.25 * flash));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + k * 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Soft "blur" halo (wide when far).
        const halo = ctx.createRadialGradient(x, y, 0, x, y, blurR);
        halo.addColorStop(0, rgba(r, g, b, headAlpha * 0.55));
        halo.addColorStop(0.35, rgba(r, g, b, headAlpha * 0.22));
        halo.addColorStop(1, rgba(r, g, b, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, blurR, 0, Math.PI * 2);
        ctx.fill();

        // Sharp clear core (the "clear" part when near).
        ctx.fillStyle = rgba(r, g, b, headAlpha);
        ctx.beginPath();
        ctx.arc(x, y, coreR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      rafId = requestAnimationFrame(paintFrame);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        lastTs = 0;
        if (reduceMotion.matches) paintStatic();
        else rafId = requestAnimationFrame(paintFrame);
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    const onResize = () => {
      build();
      if (reduceMotion.matches) paintStatic();
    };

    build();
    if (reduceMotion.matches) {
      paintStatic(); // no comets for reduced motion
    } else {
      rafId = requestAnimationFrame(paintFrame);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="starfield"
      aria-hidden="true"
      style={dark ? undefined : { display: "none" }}
    />
  );
}
