"use client";

import { useId } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronRight,
  CircleAlert,
  Clock,
  CloudOff,
  GraduationCap,
  Hourglass,
  LifeBuoy,
  LockKeyhole,
  LogIn,
  Mail,
  SearchX,
  ServerCrash,
  ShieldAlert,
  Sparkles,
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

/** Leading icon per quick-link destination — native list-row styling. */
const QUICK_LINK_ICONS: Record<string, LucideIcon> = {
  "/help": LifeBuoy,
  "/contact": Mail,
  "/home": GraduationCap,
  "/plans": Sparkles,
  "/login": LogIn,
  "/status": Activity,
};

const TREATMENTS: Record<
  ErrorPageTreatment,
  {
    stripe: string;
    glow: string;
    icon: string;
    ring: string;
  }
> = {
  amber: {
    stripe: "from-amber-400 via-amber-500 to-orange-500",
    glow: "bg-amber-500/25",
    icon: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
    ring: "ring-amber-500/25",
  },
  indigo: {
    stripe: "from-indigo-400 via-indigo-500 to-violet-500",
    glow: "bg-indigo-500/25",
    icon: "bg-indigo-500/15 text-indigo-800 dark:text-indigo-200",
    ring: "ring-indigo-500/25",
  },
  rose: {
    stripe: "from-rose-400 via-rose-500 to-pink-500",
    glow: "bg-rose-500/25",
    icon: "bg-rose-500/15 text-rose-800 dark:text-rose-200",
    ring: "ring-rose-500/25",
  },
  violet: {
    stripe: "from-violet-400 via-violet-500 to-purple-500",
    glow: "bg-violet-500/25",
    icon: "bg-violet-500/15 text-violet-800 dark:text-violet-200",
    ring: "ring-violet-500/25",
  },
  orange: {
    stripe: "from-orange-400 via-orange-500 to-amber-500",
    glow: "bg-orange-500/25",
    icon: "bg-orange-500/15 text-orange-800 dark:text-orange-200",
    ring: "ring-orange-500/25",
  },
  yellow: {
    stripe: "from-yellow-400 via-yellow-500 to-amber-400",
    glow: "bg-yellow-500/25",
    icon: "bg-yellow-500/15 text-yellow-900 dark:text-yellow-100",
    ring: "ring-yellow-500/25",
  },
  red: {
    stripe: "from-red-400 via-red-500 to-rose-600",
    glow: "bg-red-500/25",
    icon: "bg-red-500/15 text-red-800 dark:text-red-200",
    ring: "ring-red-500/25",
  },
  cyan: {
    stripe: "from-cyan-400 via-cyan-500 to-sky-500",
    glow: "bg-cyan-500/25",
    icon: "bg-cyan-500/15 text-cyan-900 dark:text-cyan-100",
    ring: "ring-cyan-500/25",
  },
  teal: {
    stripe: "from-teal-400 via-teal-500 to-emerald-500",
    glow: "bg-teal-500/25",
    icon: "bg-teal-500/15 text-teal-900 dark:text-teal-100",
    ring: "ring-teal-500/25",
  },
  blue: {
    stripe: "from-blue-400 via-blue-500 to-indigo-500",
    glow: "bg-blue-500/25",
    icon: "bg-blue-500/15 text-blue-900 dark:text-blue-100",
    ring: "ring-blue-500/25",
  },
  sky: {
    stripe: "from-sky-400 via-sky-500 to-cyan-500",
    glow: "bg-sky-500/25",
    icon: "bg-sky-500/15 text-sky-900 dark:text-sky-100",
    ring: "ring-sky-500/25",
  },
  slate: {
    stripe: "from-slate-400 via-slate-500 to-zinc-500",
    glow: "bg-slate-500/20",
    icon: "bg-slate-500/15 text-slate-800 dark:text-slate-200",
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

/**
 * THE ERROR SCREEN — designed like a native app error state (owner 2026-11-26:
 * "design its error pages properly like a native app and insert their working
 * and professional links").
 *
 * One centered column, like a phone screen: connectivity chip, a large tinted
 * icon tile, one short title, one short instruction, full-width pill actions
 * stacked the way native apps stack them, and the quick links as tappable
 * list rows with leading icons and chevrons. Every link resolves to a real
 * route (see ERROR_PAGE_ACTION_HREFS / ERROR_QUICK_LINKS in lib/errors).
 */
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
    const buttonClass = cn(
      "h-12 w-full rounded-full text-sm font-bold sm:w-auto sm:min-w-44 sm:px-8",
      secondary && "border-2",
    );

    if (action === "home" || action === "login" || action === "plans") {
      const href = ERROR_PAGE_ACTION_HREFS[action];
      return (
        <Button key={key} asChild variant={buttonVariant} className={buttonClass}>
          <Link href={href}>{label}</Link>
        </Button>
      );
    }

    return (
      <Button
        key={key}
        type="button"
        variant={buttonVariant}
        className={buttonClass}
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
        "relative flex w-full items-center justify-center overflow-hidden px-5 py-10 sm:px-6",
        compact
          ? "min-h-[60vh]"
          : "min-h-[calc(100dvh-3.5rem)] flex-1 bg-background sm:min-h-[calc(100dvh-4rem)]",
      )}
    >
      {/* Ambient light — one bloom behind the icon, one low corner wash */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full blur-[110px]",
          treatment.glow,
        )}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center motion-safe:animate-fade-in">
        {/* Connectivity chip — the native status pill */}
        <span
          role="status"
          aria-live="polite"
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur"
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

        {/* Icon tile — large, tinted, gradient-ringed */}
        <div className="relative mt-7">
          <div
            className={cn(
              "pointer-events-none absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br opacity-25 blur-xl",
              treatment.stripe,
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "relative flex h-24 w-24 items-center justify-center rounded-[1.75rem] shadow-lg shadow-black/5 ring-1 ring-inset ring-border/50",
              treatment.icon,
            )}
          >
            <Icon className="h-11 w-11" strokeWidth={1.6} aria-hidden="true" />
          </div>
        </div>

        {/* Code chip + title + one-line instruction */}
        <span className="mt-6 inline-flex rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          {PLATFORM_DISPLAY_NAME} · {definition.displayCode}
        </span>
        <h1
          id={titleId}
          className="mt-3 text-[1.65rem] font-extrabold leading-tight tracking-tight sm:text-3xl"
        >
          {definition.title}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          {definition.hint}
        </p>

        {/* Actions — stacked full-width pills, native app order */}
        <div className="mt-8 flex w-full flex-col items-center gap-3">
          {actionButton(definition.primaryAction, definition.primaryLabel)}
          {definition.secondaryAction && definition.secondaryLabel
            ? actionButton(definition.secondaryAction, definition.secondaryLabel, true)
            : null}
        </div>

        {/* Quick links — tappable native list rows with leading icons */}
        <nav aria-label="Helpful links" className="mt-9 w-full">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Quick links
          </p>
          <ul className="mt-3 overflow-hidden rounded-2xl border border-border/70 bg-card/90 text-left shadow-sm backdrop-blur">
            {quickLinks.map((link, index) => {
              const RowIcon = QUICK_LINK_ICONS[link.href] ?? CircleAlert;
              return (
                <li
                  key={link.href}
                  className={cn(index > 0 && "border-t border-border/60")}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted/70 text-foreground/80 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                      <RowIcon className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-sm font-semibold">{link.label}</span>
                    <ChevronRight
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </Container>
  );
}
