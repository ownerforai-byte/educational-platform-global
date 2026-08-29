import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Construction, Clock, Sparkles } from "lucide-react";

export type StatusBadgeVariant = "active" | "development" | "coming-soon" | "complete";

export interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  className?: string;
}

const variants = {
  active: {
    icon: Sparkles,
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  development: {
    icon: Construction,
    label: "In Development",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  "coming-soon": {
    icon: Clock,
    label: "Coming Soon",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  complete: {
    icon: CheckCircle,
    label: "Complete",
    className: "bg-primary/10 text-primary border-primary/30",
  },
};

export function StatusBadge({ variant, className }: StatusBadgeProps) {
  const { icon: Icon, label, className: variantClassName } = variants[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all",
        variantClassName,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
