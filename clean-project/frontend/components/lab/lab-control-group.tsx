"use client";

import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface LabControlGroupProps {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function LabControlGroup({ label, hint, children, className }: LabControlGroupProps) {
  return (
    <div className={`space-y-2 rounded-lg border border-border bg-muted/30 p-3 sm:p-4 ${className}`}>
      <Label className="text-sm font-semibold sm:text-base">{label}</Label>
      {hint && <p className="text-xs text-muted-foreground sm:text-sm">{hint}</p>}
      <div className="space-y-2 pt-2">
        {children}
      </div>
    </div>
  );
}
