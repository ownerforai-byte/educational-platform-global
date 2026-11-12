"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const chipClass = (active?: boolean, className?: string) =>
  cn(
    "inline-flex rounded-md border px-2.5 py-1.5 text-left text-[11px] font-medium leading-snug transition",
    active
      ? "border-[color:var(--brand)]/50 bg-[color:var(--brand)]/15 text-[color:var(--brand)]"
      : "border-border/70 bg-card/60 text-foreground/85 hover:border-[color:var(--brand)]/40 hover:bg-[color:var(--brand)]/8",
    className,
  );

/** Compact key-term style box used across Veer Chat / Widget / Workspace. */
export function VeerChip({
  label,
  active,
  onClick,
  href,
  className,
  title,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  title?: string;
}) {
  if (href) {
    return (
      <Link href={href} title={title ?? label} className={chipClass(active, className)}>
        {label}
      </Link>
    );
  }
  return (
    <button
      type="button"
      title={title ?? label}
      onClick={onClick}
      className={chipClass(active, className)}
    >
      {label}
    </button>
  );
}

export function VeerSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-2", className)}>
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h2>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </section>
  );
}
