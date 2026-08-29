import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface IconBadgeProps {
  icon: LucideIcon;
  variant?: "primary" | "success" | "info" | "warning" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  accent: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

const sizeStyles = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const iconSizeStyles = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function IconBadge({
  icon: Icon,
  variant = "primary",
  size = "md",
  className,
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        "icon-badge inline-flex items-center justify-center rounded-xl border transition-all duration-300",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      <Icon className={iconSizeStyles[size]} />
    </div>
  );
}
