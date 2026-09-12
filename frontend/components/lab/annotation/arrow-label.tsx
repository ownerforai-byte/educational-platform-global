"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ArrowLabel — long-arrow annotation overlay for lab animations.
 *
 * Renders a long SVG arrow with an arrowhead plus a small label chip at the
 * tail. Position with percentage coordinates relative to the PARENT container
 * (the parent must be `relative`). Use it to label parts of a 3D / motion
 * animation: forces, velocities, particles, phases, axes, etc.
 */

type ArrowLabelProps = {
  /** Label text shown in the chip at the arrow tail */
  label: string;
  /** Arrow tail position, % of container width */
  x1: number;
  /** Arrow tail position, % of container height */
  y1: number;
  /** Arrow head position, % of container width */
  x2: number;
  /** Arrow head position, % of container height */
  y2: number;
  /** Accent color (hex) for arrow + chip */
  color?: string;
  /** Sub-label rendered under the main label (e.g. value or formula) */
  sub?: string;
  /** Animation delay in seconds for staggered entrance */
  delay?: number;
};

export function ArrowLabel({
  label,
  x1,
  y1,
  x2,
  y2,
  color = "#3b82f6",
  sub,
  delay = 0,
  viewportRelative = false,
}: ArrowLabelProps & { viewportRelative?: boolean }) {
  const uid = `al-${x1}-${y1}-${x2}-${y2}-${color.replace("#", "")}`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0, left: 0, top: 0 });
  const prevVpW = useRef(0);
  const prevVpH = useRef(0);

  // Observe container dimensions for dynamic positioning
  useEffect(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setDimensions({ w: rect.width, h: rect.height, left: rect.left, top: rect.top });
    prevVpW.current = window.innerWidth;
    prevVpH.current = window.innerHeight;
  }, []);

  // Recalculate on viewport resize (debounced with rAF)
  useEffect(() => {
    let rafId: number;
    const handle = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        setDimensions({ w: rect.width, h: rect.height, left: rect.left, top: rect.top });
      });
    };
    window.addEventListener("resize", handle);
    return () => { window.removeEventListener("resize", handle); cancelAnimationFrame(rafId); };
  }, []);

  // Convert percentage coords to absolute pixels, with optional viewport-relative offset
  const px = (
    coord: number,
    _dim: "w" | "h",
    isX: boolean,
  ) => {
    const basePct = coord;
    const vpOffset = viewportRelative ? (window.innerWidth * 0.02) : 0;
    if (isX) {
      return dimensions.w > 0 ? (basePct / 100) * dimensions.w + (viewportRelative ? (window.innerWidth - prevVpW.current) * 0.5 : 0) : 0;
    } else {
      return dimensions.h > 0 ? (basePct / 100) * dimensions.h + (viewportRelative ? (window.innerHeight - prevVpH.current) * 0.5 : 0) : 0;
    }
  };

  const chipAlign = x1 <= 50 ? "items-start text-left" : "items-end text-right";

  // Fallback: if dimensions not ready, render at 0 so layout doesn't break
  const x1Abs = dimensions.w > 0 ? px(x1, "w", true) + dimensions.left : x1;
  const y1Abs = dimensions.h > 0 ? px(y1, "h", false) + dimensions.top : y1;
  const x2Abs = dimensions.w > 0 ? px(x2, "w", true) + dimensions.left : x2;
  const y2Abs = dimensions.h > 0 ? px(y2, "h", false) + dimensions.top : y2;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-20 animate-in fade-in duration-700"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Long arrow — uses absolute pixel coords for proper scaling */}
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <marker
            id={`${uid}-head`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill={color} />
          </marker>
        </defs>
        <line
          x1={x1Abs}
          y1={y1Abs}
          x2={x2Abs}
          y2={y2Abs}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 4"
          markerEnd={`url(#${uid}-head)`}
          className="drop-shadow"
        />
      </svg>

      {/* Label chip at the tail — positioned in viewport coords */}
      <div
        className={`absolute flex flex-col gap-0.5 ${chipAlign}`}
        style={{
          left: x1Abs,
          top: y1Abs,
          transform: "translate(-4px, -110%)",
          position: "absolute",
        }}
      >
        <span
          className="inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-semibold shadow-sm backdrop-blur-sm"
          style={{
            borderColor: `${color}55`,
            backgroundColor: `${color}14`,
            color,
          }}
        >
          {label}
        </span>
        {sub && (
          <span className="whitespace-nowrap rounded bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shadow-sm">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * AnimationFrame — relative container that hosts an animation and its
 * ArrowLabel annotation overlays. Every lab animation should be wrapped in
 * this so labels have a stable coordinate space.
 */
export function AnimationFrame({
  children,
  heightClass = "min-h-[320px]",
}: {
  children: React.ReactNode;
  heightClass?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-border bg-background ${heightClass}`}>
      {children}
    </div>
  );
}
