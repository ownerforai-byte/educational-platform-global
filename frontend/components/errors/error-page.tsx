"use client";

import { useId } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleAlert,
  Clock,
  CloudOff,
  Hourglass,
  LockKeyhole,
  SearchX,
  ServerCrash,
  ShieldAlert,
  TimerReset,
  Unplug,
  WifiOff,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLATFORM_DISPLAY_NAME } from "@/lib/core/platform-brand";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";
import {
  ERROR_PAGE_ACTION_HREFS,
  ERROR_PAGE_REGISTRY,
  errorQuickLinksForVariant,
  resolveErrorPageVariant,
  type ErrorPageAction,
  type ErrorPageIcon,
  type ErrorPageTreatment,
  type ErrorPageVariant,
} from "@/lib/errors/error-page";
import { cn } from "@/lib/utils";

const ICONS: Record<ErrorPageIcon, LucideIcon> = {
  alert: CircleAlert,
  lock: LockKeyhole,
  shield: ShieldAlert,
  search: SearchX,
  clock: Clock,
  "rate-limit": TimerReset,
  server: ServerCrash,
  gateway: Unplug,
  maintenance: Wrench,
  hourglass: Hourglass,
  network: WifiOff,
  offline: CloudOff,
};

const TREATMENTS: Record<
  ErrorPageTreatment,
  {
    stripe: string;
    glow: string;
    icon: string;
    code: string;
    ring: string;
  }
> = {
  amber: {
    stripe: "from-amber-400 via-amber-500 to-orange-500",
    glow: "bg-amber-500/20",
    icon: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
    code: "text-amber-500/20",
    ring: "ring-amber-500/25",
  },
  indigo: {
    stripe: "from-indigo-400 via-indigo-500 to-violet-500",
    glow: "bg-indigo-500/20",
    icon: "bg-indigo-500/15 text-indigo-800 dark:text-indigo-200",
    code: "text-indigo-500/20",
    ring: "ring-indigo-500/25",
  },
  rose: {
    stripe: "from-rose-400 via-rose-500 to-pink-500",
    glow: "bg-rose-500/20",
    icon: "bg-rose-500/15 text-rose-800 dark:text-rose-200",
    code: "text-rose-500/20",
    ring: "ring-rose-500/25",
  },
  violet: {
    stripe: "from-violet-400 via-violet-500 to-purple-500",
    glow: "bg-violet-500/20",
    icon: "bg-violet-500/15 text-violet-800 dark:text-violet-200",
    code: "text-violet-500/20",
    ring: "ring-violet-500/25",
  },
  orange: {
    stripe: "from-orange-400 via-orange-500 to-amber-500",
    glow: "bg-orange-500/20",
    icon: "bg-orange-500/15 text-orange-800 dark:text-orange-200",
    code: "text-orange-500/20",
    ring: "ring-orange-500/25",
  },
  yellow: {
    stripe: "from-yellow-400 via-yellow-500 to-amber-400",
    glow: "bg-yellow-500/20",
    icon: "bg-yellow-500/15 text-yellow-900 dark:text-yellow-100",
    code: "text-yellow-500/20",
    ring: "ring-yellow-500/25",
  },
  red: {
    stripe: "from-red-400 via-red-500 to-rose-600",
    glow: "bg-red-500/20",
    icon: "bg-red-500/15 text-red-800 dark:text-red-200",
    code: "text-red-500/20",
    ring: "ring-red-500/25",
  },
  cyan: {
    stripe: "from-cyan-400 via-cyan-500 to-sky-500",
    glow: "bg-cyan-500/20",
    icon: "bg-cyan-500/15 text-cyan-900 dark:text-cyan-100",
    code: "text-cyan-500/20",
    ring: "ring-cyan-500/25",
  },
  teal: {
    stripe: "from-teal-400 via-teal-500 to-emerald-500",
    glow: "bg-teal-500/20",
    icon: "bg-teal-500/15 text-teal-900 dark:text-teal-100",
    code: "text-teal-500/20",
    ring: "ring-teal-500/25",
  },
  blue: {
    stripe: "from-blue-400 via-blue-500 to-indigo-500",
    glow: "bg-blue-500/20",
    icon: "bg-blue-500/15 text-blue-900 dark:text-blue-100",
    code: "text-blue-500/20",
    ring: "ring-blue-500/25",
  },
  sky: {
    stripe: "from-sky-400 via-sky-500 to-cyan-500",
    glow: "bg-sky-500/20",
    icon: "bg-sky-500/15 text-sky-900 dark:text-sky-100",
    code: "text-sky-500/20",
    ring: "ring-sky-500/25",
  },
  slate: {
    stripe: "from-slate-400 via-slate-500 to-zinc-500",
    glow: "bg-slate-500/15",
    icon: "bg-slate-500/15 text-slate-800 dark:text-slate-200",
    code: "text-slate-500/20",
    ring: "ring-slate-500/25",
  },
};

export interface ErrorPageProps {
  /** Direct static page variant, or the fallback when no error is supplied. */
  variant?: ErrorPageVariant;
  error?: unknown;
  /** In-place boundary recovery. Static pages reload when this is omitted. */
  reset?: () => void;
  /** Fits inside the app shell instead of filling the viewport. */
  compact?: boolean;
}

export function ErrorPage({
  variant = "500",
  error,
  reset,
  compact = false,
}: ErrorPageProps) {
  const isOnline = useOnlineStatus();
  const resolvedVariant = resolveErrorPageVariant(error, { isOnline, fallback: variant });
  const definition = ERROR_PAGE_REGISTRY[resolvedVariant];
  const treatment = TREATMENTS[definition.treatment];
  const Icon = ICONS[definition.icon];
  const titleId = useId();
  const quickLinks = errorQuickLinksForVariant(resolvedVariant);
  const Container = compact ? "section" : "main";

  const retry = () => {
    if (reset) reset();
    else window.location.reload();
  };
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.assign(ERROR_PAGE_ACTION_HREFS.home);
  };

  const actionButton = (
    action: ErrorPageAction,
    label: string,
    secondary = false,
  ) => {
    const key = `${action}-${secondary ? "secondary" : "primary"}`;
    const buttonVariant = secondary ? "outline" : "default";

    if (action === "home" || action === "login" || action === "plans") {
      const href = ERROR_PAGE_ACTION_HREFS[action];
      return (
        <Button key={key} asChild variant={buttonVariant} className="rounded-full px-5">
          <Link href={href}>{label}</Link>
        </Button>
      );
    }

    return (
      <Button
        key={key}
        type="button"
        variant={buttonVariant}
        className="rounded-full px-5"
        onClick={action === "back" ? goBack : retry}
      >
        {label}
      </Button>
    );
  };

  return (
    <Container
      id={compact ? undefined : "main-content"}
      tabIndex={compact ? undefined : -1}
      role="alert"
      aria-labelledby={titleId}
      data-error-variant={resolvedVariant}
      data-connectivity={isOnline ? "online" : "offline"}
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6",
        compact
          ? "min-h-[60vh]"
          : "min-h-[calc(100dvh-3.5rem)] flex-1 bg-background sm:min-h-[calc(100dvh-4rem)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-28 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full blur-[120px]",
          treatment.glow,
        )}
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

      <div
        className={cn(
          "relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-border/80 bg-card/95 text-card-foreground shadow-2xl shadow-black/5 backdrop-blur-sm",
          treatment.ring,
          "ring-1",
        )}
      >
        <div
          className={cn("h-1.5 w-full bg-gradient-to-r", treatment.stripe)}
          aria-hidden="true"
        />

        <div className="relative grid sm:grid-cols-[9.5rem_1fr]">
          <div
            className={cn(
              "relative hidden border-b border-border/60 bg-muted/30 sm:flex sm:flex-col sm:border-b-0 sm:border-r sm:p-6",
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                "select-none text-5xl font-black leading-none tracking-tighter",
                treatment.code,
              )}
            >
              {definition.displayCode}
            </span>
            <p className="mt-auto pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {PLATFORM_DISPLAY_NAME}
            </p>
          </div>

          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-2 top-0 select-none text-[7rem] font-black leading-none tracking-tighter sm:hidden",
              treatment.code,
            )}
          >
            {definition.displayCode}
          </span>

          <div className="relative flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Something went wrong
              </p>
              <span
                role="status"
                aria-live="polite"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isOnline ? "bg-emerald-500" : "bg-slate-400",
                  )}
                  aria-hidden="true"
                />
                {isOnline
                  ? resolvedVariant === "offline"
                    ? "Connection restored"
                    : "Online"
                  : "Offline"}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ring-border/50",
                  treatment.icon,
                )}
              >
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 space-y-2 pt-0.5">
                <h1 id={titleId} className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {definition.title}
                </h1>
                <p className="text-base font-medium text-foreground/90">{definition.hint}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {actionButton(definition.primaryAction, definition.primaryLabel)}
              {definition.secondaryAction && definition.secondaryLabel
                ? actionButton(definition.secondaryAction, definition.secondaryLabel, true)
                : null}
            </div>

            <nav
              aria-label="Helpful links"
              className="flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quick links
              </span>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Container>
  );
}