"use client";

/**
 * ValueChip — a live readout chip that surfaces a single computed value
 * next to a visualization so the user sees it without hunting through
 * controls. Phase 3 glanceability layer (PhET "values" toggle convention).
 *
 * Intended to sit alongside a slider / control group in a lab card:
 *   <ValueChip label="Resultant" value={mag} unit="m" accent />
 */
import { useEffect, useState } from "react";

export interface ValueChipProps {
  /** Short label shown above / left of the value. */
  label: string;
  /** The live value. Strings render verbatim; numbers are formatted. */
  value: number | string;
  /** Optional unit suffix (e.g. "m", "°", "N"). */
  unit?: string;
  /** Number of fraction digits when value is a number (default 2, trailing zeros trimmed). */
  digits?: number;
  /** Highlight this chip (accent color). Used for headline results. */
  accent?: boolean;
  className?: string;
}

export function ValueChip({
  label,
  value,
  unit,
  digits = 2,
  accent = false,
  className = "",
}: ValueChipProps) {
  // Guard against hydration flashes when a chip first mounts mid-frame.
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const text =
    typeof value === "number" ? formatNumber(value, digits) : String(value);

  const base =
    "inline-flex items-baseline gap-1 rounded-lg border px-2 py-1 text-xs font-semibold backdrop-blur";
  const tone = accent
    ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-100"
    : "border-slate-600/60 bg-slate-900/70 text-slate-100";

  return (
    <span
      className={`${base} ${tone} transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-40"
      } ${className}`}
      title={`${label} = ${text}${unit ? " " + unit : ""}`}
    >
      <span className="text-[10px] uppercase tracking-wide opacity-70">{label}</span>
      <span className="font-mono">{text}</span>
      {unit ? <span className="text-[10px] opacity-70">{unit}</span> : null}
    </span>
  );
}

export function formatNumber(n: number, digits: number): string {
  if (!Number.isFinite(n)) return String(n);
  const s = n.toFixed(digits);
  // Trim trailing zeros but keep at least one decimal-looking token clean.
  return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}
