"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const chipClass = (active?: boolean, className?: string) =>
  cn(
    "inline-flex shrink-0 items-center gap-0.5 rounded border border-dashed px-1.5 py-0.5 text-left text-[9px] font-medium leading-tight transition",
    active
      ? "border-emerald-600/55 bg-emerald-500/15 text-emerald-800 dark:border-emerald-400/50 dark:text-emerald-200"
      : "border-emerald-700/25 bg-emerald-500/[0.04] text-foreground/85 hover:border-emerald-600/45 hover:bg-emerald-500/10 dark:border-emerald-400/25",
    className,
  );

/** Compact natural key-term chip — Veer Chat / Widget / Workspace / replies. */
export function VeerChip({
  label,
  active,
  onClick,
  href,
  className,
  title,
  icon: Icon,
  tabIndex,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  title?: string;
  icon?: LucideIcon;
  tabIndex?: number;
}) {
  const body = (
    <>
      {Icon ? (
        <Icon
          className="h-2.5 w-2.5 shrink-0 text-emerald-700/80 dark:text-emerald-300/80"
          aria-hidden="true"
        />
      ) : null}
      <span>{label}</span>
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        title={title ?? label}
        className={chipClass(active, className)}
        tabIndex={tabIndex}
      >
        {body}
      </Link>
    );
  }
  return (
    <button
      type="button"
      title={title ?? label}
      onClick={onClick}
      tabIndex={tabIndex}
      className={chipClass(active, className)}
    >
      {body}
    </button>
  );
}

export function VeerSection({
  title,
  children,
  className,
  icon: Icon,
  scroll = "x",
  border = "dash",
  "aria-label": ariaLabel,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
  /** Horizontal chip row by default — avoids vertical home scroll. */
  scroll?: "x" | "wrap";
  /** Section frame: dashed (default), solid line, or none. */
  border?: "dash" | "line" | "none";
  "aria-label"?: string;
}) {
  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn(
        "min-w-0 space-y-1 rounded px-1.5 py-1",
        border === "dash" &&
          "border border-dashed border-emerald-700/30 bg-emerald-500/[0.03] dark:border-emerald-400/30",
        border === "line" &&
          "border border-emerald-700/35 bg-emerald-500/[0.03] dark:border-emerald-400/35",
        className,
      )}
    >
      <h2 className="flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-emerald-800/70 dark:text-emerald-300/70">
        {Icon ? (
          <Icon className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        ) : null}
        {title}
      </h2>
      <div
        className={cn(
          "flex gap-1",
          scroll === "x"
            ? "flex-nowrap overflow-x-auto overscroll-x-contain pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "flex-wrap",
        )}
      >
        {children}
      </div>
    </section>
  );
}
