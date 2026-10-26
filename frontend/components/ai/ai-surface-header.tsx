"use client";

import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

/**
 * Shared AI surface header (plan.md §13 — M4).
 *
 * One header pattern for every Veer surface: a gradient hero strip with the
 * tool identity on the left, a badge + pool meter on the right, and an
 * optional feature-card row underneath. The tutor console, history console
 * and quiz studio all render this instead of rolling their own hero.
 */
export interface AiSurfaceHeaderProps {
  /** Tool identity. */
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** Tailwind accent classes for the icon chip, e.g. `text-fuchsia-500 border-fuchsia-500/25 bg-fuchsia-500/10`. */
  accent: string;
  /** Gradient origin class for the hero strip, e.g. `from-fuchsia-500/[0.07]`. */
  gradientFrom: string;
  /** Small pill above the title (e.g. "Practice", "Saved chats"). */
  badge?: string;
  /** Optional feature cards rendered in the hero strip. */
  features?: Array<{ icon: LucideIcon; title: string; text: string }>;
  /** Pool meter slot (AiPlanStrip / AiSparkBadge) — right-aligned in the hero. */
  meter?: React.ReactNode;
  /** Breadcrumb label; the "AI Studio" crumb links back to /ai. */
  crumb?: string;
}

export function AiSurfaceHeader({
  icon: Icon,
  title,
  subtitle,
  accent,
  gradientFrom,
  badge,
  features,
  meter,
  crumb,
}: AiSurfaceHeaderProps) {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-3">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          AI Studio
        </Link>
        {crumb && (
          <>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-xs font-semibold text-foreground">{crumb}</span>
          </>
        )}
      </div>

      {/* Gradient hero strip */}
      <div
        className={`mb-4 rounded-2xl border border-border/70 bg-gradient-to-br ${gradientFrom} via-card to-card p-4 sm:p-5`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${accent}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              {badge && (
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {badge}
                </p>
              )}
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          {meter && <div className="min-w-0 flex-1 sm:max-w-xs">{meter}</div>}
        </div>

        {features && features.length > 0 && (
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {features.map((f) => {
              const FeatureIcon = f.icon;
              return (
                <li key={f.title} className="rounded-xl border border-border/60 bg-card/80 p-3">
                  <FeatureIcon className="h-3.5 w-3.5 text-primary" />
                  <p className="mt-1.5 text-xs font-bold text-foreground">{f.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
