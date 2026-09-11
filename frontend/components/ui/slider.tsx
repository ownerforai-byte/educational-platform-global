"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight accessible range slider.
 *
 * API-compatible with the Radix-style usage in this codebase:
 *   <Slider min={0} max={10} step={0.5} value={[v]} onValueChange={(vals) => …} />
 */
export function Slider({
  className,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  value?: number[];
  onValueChange?: (value: number[]) => void;
}) {
  const current = Array.isArray(value) ? value[0] : Number(value);

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={Number.isFinite(current) ? current : min}
      disabled={disabled}
      onChange={(e) => onValueChange?.([Number(e.target.value)])}
      className={cn(
        "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    />
  );
}

export default Slider;