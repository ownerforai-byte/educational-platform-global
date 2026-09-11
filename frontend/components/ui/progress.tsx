"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
  accentColor?: string;
}

export function Progress({ value, className, indicatorClassName, accentColor }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("h-2 w-full rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-2 rounded-full transition-all", indicatorClassName)}
        style={{ width: `${clamped}%`, backgroundColor: accentColor || undefined }}
      />
    </div>
  );
}
