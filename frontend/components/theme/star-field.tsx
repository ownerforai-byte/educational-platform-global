"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

type StaticStar = {
  x: number;
  y: number;
  r: number;
  alpha: number;
};

/**
 * A star in 3D "world" space (camera at the origin, looking down +Z).
 * Each frame the star advances toward the camera (z shrinks); the projected
 * screen position is `cx + x*f/z, cy + y*f/z`, so a far star sits tiny near
 * the vanishing point and a near one streaks out large and fast — real
 * perspective depth, not a 2D translate.
 */
type Star3D = {
  x: number;
  y: number;
  z: number;
  v: number; // forward speed toward the camera (world units/sec)
  drift: number; // constant +x world drift → the stream flows left → right
  brightness: number;
};

const STATIC_STAR_DENSITY = 0.000016; // a quiet, sparse sky
const MAX_STATIC_STARS = 64;

const STAR3D_COUNT = 90; // keep the 3D stream sparse so the sky stays calm
const SPREAD = 1500; // half-extent of the spawn box (world units)
const Z_FAR = 4200; // just behind the far spawn plane
const Z_NEAR = 2; // "right in front of the camera"

const seedStar = (s: Star3D, randomDepth: boolean) => {
  s.x = (Math.random() * 2 - 1) * SPREAD;
  s.y = (Math.random() * 2 - 1) * SPREAD;
  s.z = randomDepth
    ? Z_NEAR + Math.random() * (Z_FAR - Z_NEAR) // initial fill: depth everywhere
    : Z_FAR * (0.86 + Math.random() * 0.14); // respawn: come from deep space
  s.v = 500 + Math.random() * 900;
  s.drift = 30 + Math.random() * 90; // always pushes the flow to the right
  s.brightness = 0.5 + Math.random() * 0.5;
};

/**
 * "Nebula Sky" overlay: a quiet sky with a sparse 3D perspective stream —
 * stars fly from deep space toward the viewer (growing + accelerating as
 * they approach, like real depth) and the whole flow goes left → right.
 * Purely decorative:
 *  - `mix-blend-mode: screen` + `pointer-events: none` (via .starfield CSS).
 *  - Pauses its RAF loop when the tab is hidden.
 *  - `prefers-reduced-motion`: static faint stars only, no 3D stream.
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

    // The space stream only makes sense on the dark/space themes.
    if (!dark) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let staticStars: StaticStar[] = [];
    let stars: Star3D[] = [];
    let rafId = 0;
    let running = true;
    let lastTs = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

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

      stars = Array.from({ length: STAR3D_COUNT }, () => {
        const s: Star3D = { x: 0, y: 0, z: 1, v: 0, drift: 0, brightness: 1 };
        seedStar(s, true);
        return s;
      });
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

      ctx.clearRect(0, 0, width, height);

      // Quiet, static background stars.
      for (const s of staticStars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 226, 255, ${s.alpha})`;
        ctx.fill();
      }

      // Perspective projection: the vanishing point sits on the LEFT
      // (cx = 12% of the width) so the whole stream fans out toward the
      // right — "coming forward from us, one direction, left to right".
      const cx = width * 0.12;
      const cy = height * 0.5;
      const f = height * 0.9; // focal length

      ctx.globalCompositeOperation = "lighter"; // glows sum up on the dark sky
      const light = "224, 232, 255";
      for (const s of stars) {
        const z1 = s.z;
        const z2 = z1 - s.v * dt; // advance toward the camera
        if (z2 <= Z_NEAR) {
          // It reached "right in front of us" → send it back to deep space.
          seedStar(s, false);
          continue;
        }
        s.z = z2;
        s.x += s.drift * dt; // lateral push → left-to-right flow

        // Project old and new positions (the segment between them is the
        // streak; it is short when far, long when near — real depth cue).
        const ox = s.x - s.drift * dt;
        const sx = cx + (ox / z1) * f;
        const sy = cy + (s.y / z1) * f;
        const nx = cx + (s.x / z2) * f;
        const ny = cy + (s.y / z2) * f;

        // Skip drawing off-screen stars (they keep advancing in 3D).
        if (
          nx < -80 ||
          nx > width + 80 ||
          ny < -80 ||
          ny > height + 80
        )
          continue;

        // Depth 0 (far/deep) → 1 (right in front): controls size + light.
        const depth = 1 - z2 / Z_FAR;
        const a =
          s.brightness * Math.min(0.6, 0.04 + Math.pow(depth, 1.6) * 0.55);
        const grad = ctx.createLinearGradient(sx, sy, nx, ny);
        grad.addColorStop(0, `rgba(${light}, 0)`);
        grad.addColorStop(1, `rgba(${light}, ${a})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6 + depth * 2.0;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(nx, ny);
        ctx.stroke();
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
      paintStatic(); // no 3D stream for reduced motion
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
