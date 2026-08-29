"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface LabInputProps {
  id: string;
  label: string;
  hint?: string;
  unit?: string;
  icon?: ReactNode;
  error?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  step?: string;
  min?: string;
  max?: string;
  className?: string;
}

export function LabInput({
  id,
  label,
  hint,
  unit,
  icon,
  error,
  value,
  onChange,
  placeholder,
  type = "number",
  step,
  min,
  max,
  className,
}: LabInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="flex items-center gap-2">
        {icon && <span className="flex-shrink-0 text-muted-foreground">{icon}</span>}
        <Input
          id={id}
          type={type}
          step={step}
          min={min}
          max={max}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
