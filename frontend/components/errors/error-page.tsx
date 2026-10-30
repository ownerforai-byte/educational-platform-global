"use client";

import { useId } from "react";
import Link from "next/link";
import {
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
import { useOnlineStatus } from "@/lib/hooks/use-online-status";
import {
  ERROR_PAGE_REGISTRY,
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
  { stripe: string; icon: string; code: string; badge: string }
> = {
  amber: {
    stripe: "bg-amber-500",
    icon: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    code: "text-amber-500/10",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200",
  },
  indigo: {
    stripe: "bg-indigo-500",
    icon: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    code: "text-indigo-500/10",
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-800 dark:text-indigo-200",
  },
  rose: {
    stripe: "bg-rose-500",
    icon: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    code: "text-rose-500/10",
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-200",
  },
  violet: {
    stripe: "bg-violet-500",
    icon: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    code: "text-violet-500/10",
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-800 dark:text-violet-200",
  },
  orange: {
    stripe: "bg-orange-500",
    icon: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    code: "text-orange-500/10",
    badge: "border-orange-500/30 bg-orange-500/10 text-orange-800 dark:text-orange-200",
  },
  yellow: {
    stripe: "bg-yellow-500",
    icon: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
    code: "text-yellow-500/10",
    badge: "border-yellow-500/30 bg-yellow-500/10 text-yellow-800 dark:text-yellow-200",
  },
  red: {
    stripe: "bg-red-500",
    icon: "bg-red-500/10 text-red-700 dark:text-red-300",
    code: "text-red-500/10",
    badge: "border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-200",
  },
  cyan: {
    stripe: "bg-cyan-500",
    icon: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
    code: "text-cyan-500/10",
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-800 dark:text-cyan-200",
  },
  teal: {
    stripe: "bg-teal-500",
    icon: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    code: "text-teal-500/10",
    badge: "border-teal-500/30 bg-teal-500/10 text-teal-800 dark:text-teal-200",
  },
  blue: {
    stripe: "bg-blue-500",
    icon: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    code: "text-blue-500/10",
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-800 dark:text-blue-200",
  },
  sky: {
    stripe: "bg-sky-500",
    icon: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    code: "text-sky-500/10",
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-800 dark:text-sky-200",
  },
  slate: {
    stripe: "bg-slate-500",
    icon: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
    code: "text-slate-500/10",
    badge: "border-slate-500/30 bg-slate-500/10 text-slate-800 dark:text-slate-200",
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

function errorDigest(error: unknown): string | undefined {
  const digest = (error as { digest?: unknown } | null | undefined)?.digest;
  return typeof digest === "string" && digest.length > 0 ? digest : undefined;
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
  const Container = compact ? "section" : "main";
  const digest = errorDigest(error);

  const retry = () => {
    if (reset) reset();
    else window.location.reload();
  };
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.assign("/");
  };

  const actionButton = (
    action: ErrorPageAction,
    label: string,
    secondary = false,
  ) => {
    const key = `${action}-${secondary ? "secondary" : "primary"}`;
    const buttonVariant = secondary ? "outline" : "default";

    if (action === "home" || action === "login") {
      return (
        <Button key={key} asChild variant={buttonVariant}>
          <Link href={action === "login" ? "/login" : "/"}>{label}</Link>
        </Button>
      );
    }

    return (
      <Button
        key={key}
        type="button"
        variant={buttonVariant}
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
        compact ? "min-h-[60vh]" : "min-h-screen bg-background",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--muted)),transparent_62%)] opacity-70" />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-border bg-card text-card-foreground shadow-xl">
        <div className={cn("h-1.5 w-full", treatment.stripe)} aria-hidden="true" />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -right-3 top-2 select-none text-[9rem] font-black leading-none tracking-tighter sm:text-[12rem]",
            treatment.code,
          )}
        >
          {definition.displayCode}
        </span>

        <div className="relative flex flex-col items-start gap-5 p-6 sm:p-10">
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <span
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-wide",
                treatment.badge,
              )}
            >
              {definition.statusLabel}
            </span>
            <span
              role="status"
              aria-live="polite"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"
            >
              <span
                className={cn("h-2 w-2 rounded-full", isOnline ? "bg-emerald-500" : "bg-slate-400")}
                aria-hidden="true"
              />
              {isOnline
                ? resolvedVariant === "offline"
                  ? "Connection restored"
                  : "Online"
                : "Offline"}
            </span>
          </div>

          <div
            className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", treatment.icon)}
            aria-hidden="true"
          >
            <Icon className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <div className="space-y-3">
            <h1 id={titleId} className="text-3xl font-bold tracking-tight sm:text-4xl">
              {definition.title}
            </h1>
            <p className="text-base font-medium text-foreground/90">{definition.description}</p>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">{definition.detail}</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {actionButton(definition.primaryAction, definition.primaryLabel)}
            {definition.secondaryAction && definition.secondaryLabel
              ? actionButton(definition.secondaryAction, definition.secondaryLabel, true)
              : null}
          </div>

          {digest ? (
            <p className="break-all font-mono text-xs text-muted-foreground">Reference: {digest}</p>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
