"use client";

import { cn } from "@/lib/utils";
import { Cuboid, BookOpen, Calculator } from "lucide-react";
import { useEffect, useRef } from "react";

interface LabWorkspaceProps {
  type: "3d" | "theory" | "calculator";
  children: React.ReactNode;
  className?: string;
}

export function LabWorkspace({ type, children, className }: LabWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-fit 3D canvas to container on mount and resize
    if (type !== "3d") return;
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const w = container.clientWidth;
      const h = Math.min(window.innerHeight * 0.5, 500);
      // Apply responsive sizing to any canvas or Three.js containers
      const canvases = container.querySelectorAll("canvas");
      canvases.forEach((c) => {
        c.style.width = "100%";
        c.style.height = "100%";
        c.style.maxHeight = `${h}px`;
      });
      // Also handle any container divs that might hold the canvas
      const wrappers = container.querySelectorAll('[class*="canvas"], [class*="three"]');
      wrappers.forEach((w) => {
        (w as HTMLElement).style.width = "100%";
        (w as HTMLElement).style.height = "100%";
        (w as HTMLElement).style.maxHeight = `${h}px`;
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [type]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-xl border border-border bg-card overflow-hidden",
        "flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          {type === "3d" && <Cuboid className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
          {type === "theory" && <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
          {type === "calculator" && <Calculator className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
          <span className="text-xs md:text-sm font-medium text-muted-foreground capitalize">
            {type === "3d" ? "3D Lab" : type === "theory" ? "Theory Lab" : "Calculator"}
          </span>
        </div>
        <div className="flex-1 h-px bg-border/ml-auto" />
      </div>

      {/* Content Area - Responsive height for 3D, auto for others */}
      <div className={cn(
        "flex-1 p-2 md:p-4",
        type === "3d" && "min-h-[300px] md:min-h-[400px] max-h-[65vh] overflow-auto"
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
    <div className="space-y-3 md:space-y-4">
      {/* Lab Info Bar — hidden when title is empty (used by lab page) */}
      {title && (
        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-base md:text-lg font-semibold truncate">{title}</h2>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border shrink-0", statusColors[status])}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      )}

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
    <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
      {children}
    </div>
  );
}

/** Wrapper for theory content */
export function LabTheoryContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 md:space-y-4 max-w-3xl px-1">
      {children}
    </div>
  );
}

/** Wrapper for calculator components */
export function LabCalcContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl space-y-3 md:space-y-4 px-1">
      {children}
    </div>
  );
}
