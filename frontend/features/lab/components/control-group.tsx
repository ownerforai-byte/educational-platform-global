"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ControlGroupItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  hint?: string;
  content: ReactNode;
  defaultOpen?: boolean;
  accent?: "primary" | "violet" | "emerald" | "amber" | "rose";
};

const ACCENT_OPEN: Record<string, string> = {
  primary: "border-primary/40 bg-primary/5",
  violet: "border-violet-400/50 bg-violet-500/10",
  emerald: "border-emerald-400/50 bg-emerald-500/10",
  amber: "border-amber-400/50 bg-amber-500/10",
  rose: "border-rose-400/50 bg-rose-500/10",
};

const ACCENT_HEADER: Record<string, string> = {
  primary: "hover:bg-primary/10",
  violet: "hover:bg-violet-500/10",
  emerald: "hover:bg-emerald-500/10",
  amber: "hover:bg-amber-500/10",
  rose: "hover:bg-rose-500/10",
};

/**
 * ControlGroup — one bordered, individually-collapsible section.
 * Controlled: open state comes from the parent (ControlPanel),
 * so only ONE section can be open at a time in an accordion.
 */
export function ControlGroup({
  label,
  icon,
  content,
  hint,
  open,
  onToggle,
  accent = "primary",
  step,
}: {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  hint?: string;
  open: boolean;
  onToggle: () => void;
  accent?: "primary" | "violet" | "emerald" | "amber" | "rose";
  step?: number;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border-2 transition-colors",
        open ? ACCENT_OPEN[accent] : "border-border/60 bg-background hover:border-muted-foreground/40"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-semibold text-foreground transition-colors",
          ACCENT_HEADER[accent]
        )}
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-2">
          {typeof step === "number" && (
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                open ? "bg-foreground text-background" : "bg-muted-foreground/20 text-muted-foreground"
              )}
            >
              {step}
            </span>
          )}
          {icon}
          <span className="truncate">{label}</span>
        </span>
        {open ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
      </button>

      {hint && (!open ? <p className="px-3 pb-2 text-xs text-muted-foreground">{hint}</p> : null)}

      {open && (
        <div className="border-t border-border/50 px-3 pb-3 pt-2">
          {hint && <p className="mb-2 text-xs text-muted-foreground">{hint}</p>}
          {content}
        </div>
      )}
    </div>
  );
}

/**
 * ControlPanel — an accordion of bordered control sections that can be
 * expanded ONE AT A TIME. Every section gets a clear boundary box with a
 * step number, so the user can click through inputs step by step.
 */
export function ControlPanel({
  groups,
  className,
}: {
  groups: ControlGroupItem[];
  className?: string;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(groups.filter((g) => g.defaultOpen).map((g) => g.id))
  );

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.clear();
        next.add(id);
      }
      return next;
    });

  return (
    <div className={cn("space-y-2 rounded-xl border border-border/70 bg-muted/15 p-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-1 px-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          ⚙️ Control Panel — expand a step to change it
        </p>
        <button
          type="button"
          onClick={() => setOpenIds(new Set())}
          className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          Collapse all
        </button>
      </div>

      {groups.map((group, i) => (
        <ControlGroup
          key={group.id}
          label={group.label}
          icon={group.icon}
          hint={group.hint}
          content={group.content}
          accent={group.accent}
          step={i + 1}
          open={openIds.has(group.id)}
          onToggle={() => toggle(group.id)}
        />
      ))}
    </div>
  );
}