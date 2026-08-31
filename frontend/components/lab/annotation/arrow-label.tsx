"use client";

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
}: ArrowLabelProps) {
  const uid = `al-${x1}-${y1}-${x2}-${y2}-${color.replace("#", "")}`;
  const chipAlign = x1 <= 50 ? "items-start text-left" : "items-end text-right";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 animate-in fade-in duration-700"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Long arrow */}
      <svg className="absolute inset-0 h-full w-full overflow-visible">
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
          x1={`${x1}%`}
          y1={`${y1}%`}
          x2={`${x2}%`}
          y2={`${y2}%`}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 4"
          markerEnd={`url(#${uid}-head)`}
          className="drop-shadow"
        />
      </svg>

      {/* Label chip at the tail */}
      <div
        className={`absolute flex flex-col gap-0.5 ${chipAlign}`}
        style={{ left: `${x1}%`, top: `${y1}%`, transform: "translate(-4px, -110%)" }}
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
