"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

type Streak = {
  x0: number;
  y0: number;
  dirX: number;
  dirY: number;
  speed: number; // px/sec along the path (fast — a quick deep flash)
  tail: number; // px length of the thin visible trail
  baseR: number; // head radius (kept small/thin)
  exitDist: number; // distance until it leaves the screen
  traveled: number;
  life: number; // seconds the flash lasts, then it fades out on its own
  age: number;
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
      // A short "deep inside" flash: a tiny, thin, fast diagonal streak that
      // happens far away (dim + brief), not a screen-crossing comet.
      // Direction is limited to true diagonals (both |dx| and |dy| matter),
      // picking one of the four diagonal quadrants at random.
      const quadrant = Math.random() < 0.5 ? 1 : -1; // + / - X
      const qY = Math.random() < 0.5 ? 1 : -1; // + / - Y
      // Diagonal: keep the angle within ~30°–60° of the X axis so it always
      // reads as a slant, never horizontal or vertical.
      const diag = (30 + Math.random() * 30) * (Math.PI / 180); // 30–60°
      const dx = Math.cos(diag) * quadrant;
      const dy = Math.sin(diag) * qY;

      const x0 = width * (0.15 + Math.random() * 0.7);
      const y0 = height * (0.15 + Math.random() * 0.7);

      // Short travel (a quick dart), not a full traverse of the screen.
      const total = exitDist(x0, y0, dx, dy);
      const life = 0.5 + Math.random() * 0.6; // brief flash, then fade

      streaks.push({
        x0,
        y0,
        dirX: dx,
        dirY: dy,
        speed: 900 + Math.random() * 700, // fast — a quick deep flash
        tail: 70 + Math.random() * 70, // a short, thin dash
        baseR: 0.7 + Math.random() * 0.5, // keep the head small/thin
        exitDist: total,
        traveled: 0,
        life,
        age: 0,
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
      streaks = streaks.filter((st) => st.age < st.life && st.traveled < st.exitDist);
      for (const st of streaks) {
        st.age += dt;
        st.traveled += st.speed * dt;
        const x = st.x0 + st.dirX * st.traveled;
        const y = st.y0 + st.dirY * st.traveled;

        // Brief fade-in/out envelope so it "happens far away": appears,
        // darts diagonally, then disappears on its own (no screen traverse).
        const p = Math.min(1, st.age / st.life);
        const envelope = Math.sin(Math.PI * p); // 0 → 1 → 0

        // Subtle blue-white streak, kept dim so it reads as "deep inside".
        const light = "224, 232, 255";
        const a = 0.5 * envelope; // peak brightness, still soft
        const tx = x - st.dirX * st.tail;
        const ty = y - st.dirY * st.tail;
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${light}, 0)`);
        grad.addColorStop(0.7, `rgba(${light}, ${a * 0.5})`);
        grad.addColorStop(1, `rgba(${light}, ${a})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.9; // thin line
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        // A small, soft head glow at the leading tip.
        const haloR = st.baseR * 4;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, haloR);
        halo.addColorStop(0, `rgba(${light}, ${a * 0.6})`);
        halo.addColorStop(1, `rgba(${light}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, haloR, 0, Math.PI * 2);
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
