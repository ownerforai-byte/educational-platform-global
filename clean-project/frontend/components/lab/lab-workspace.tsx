"use client";

import { cn } from "@/lib/utils";
import { Cuboid, BookOpen, Calculator } from "lucide-react";

interface LabWorkspaceProps {
  type: "3d" | "theory" | "calculator";
  children: React.ReactNode;
  className?: string;
}

export function LabWorkspace({ type, children, className }: LabWorkspaceProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card overflow-hidden",
        "flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          {type === "3d" && <Cuboid className="h-5 w-5 text-primary" />}
          {type === "theory" && <BookOpen className="h-5 w-5 text-primary" />}
          {type === "calculator" && <Calculator className="h-5 w-5 text-primary" />}
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {type === "3d" ? "3D Lab" : type === "theory" ? "Theory Lab" : "Calculator"}
          </span>
        </div>
        <div className="flex-1 h-px bg-border/ml-auto" />
      </div>

      {/* Content Area - Responsive height for 3D, auto for others */}
      <div className={cn(
        "flex-1 p-4",
        type === "3d" && "min-h-[400px] max-h-[600px] overflow-auto"
      )}>
        {children}
      </div>
    </div>
  );
}

interface LabContainerProps {
  title: string;
  description: string;
  status: "active" | "development" | "new" | "premium";
  children: React.ReactNode;
  type: "3d" | "theory" | "calculator";
}

export function LabContainer({ title, description, status, children, type }: LabContainerProps) {
  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    development: "bg-blue-100 text-blue-700 border-blue-200",
    new: "bg-purple-100 text-purple-700 border-purple-200",
    premium: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <div className="space-y-4">
      {/* Lab Info Bar */}
      <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span className={cn("text-xs px-2 py-0.5 rounded-full border", statusColors[status])}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Lab Content Area */}
      <LabWorkspace type={type}>
        {children}
      </LabWorkspace>
    </div>
  );
}

/** Wrapper for 3D canvas components that need fixed dimensions */
export function Lab3DContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}

/** Wrapper for theory content */
export function LabTheoryContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 max-w-3xl">
      {children}
    </div>
  );
}

/** Wrapper for calculator components */
export function LabCalcContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl space-y-4">
      {children}
    </div>
  );
}
