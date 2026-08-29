"use client";

import { ReactNode } from "react";

interface LabResultProps {
  value: string | number | ReactNode;
  label?: string;
  unit?: string;
  className?: string;
  highlight?: boolean;
  error?: boolean;
}

export function LabResult({ value, label, unit, className, highlight, error }: LabResultProps) {
  const baseClasses = "rounded-lg border p-3 sm:p-4 text-center";
  const stateClasses = error
    ? "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400"
    : highlight
      ? "border-primary/50 bg-primary/5 text-lg sm:text-xl font-semibold text-primary"
      : "border-border bg-muted/30 text-foreground";

  return (
    <div className={`${baseClasses} ${stateClasses} ${className}`}>
      {label && <p className="mb-1 text-xs sm:text-sm font-medium opacity-75">{label}</p>}
      <div className="flex flex-wrap items-baseline justify-center gap-2">
        <span className="break-words">{value}</span>
        {unit && <span className="text-sm opacity-75">{unit}</span>}
      </div>
    </div>
  );
}
