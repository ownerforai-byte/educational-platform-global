import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  History,
  MessageSquare,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Status",
  description:
    "Service information, quick checks and support paths for Ravikisan's Platform.",
};

type StatusCard = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

const CHECKS: StatusCard[] = [
  {
    icon: WifiOff,
    title: "Check your connection",
    body: "If a page looks empty, confirm the device is online, then read the offline guide for the limits of cached study material.",
    href: "/offline",
    linkLabel: "Offline guide",
  },
  {
    icon: Activity,
    title: "Try a clean reload",
    body: "Refresh the route once. If it still fails, send feedback with the route path and what you expected to see.",
    href: "/feedback",
    linkLabel: "Send feedback",
  },
  {
    icon: History,
    title: "Check recent changes",
    body: "The changelog and announcements explain shipped changes, planned work and content updates.",
    href: "/changelog",
    linkLabel: "Open changelog",
  },
];

const UPDATES: StatusCard[] = [
  {
    icon: Bell,
    title: "Announcements",
    body: "Platform news and syllabus changes, newest first.",
    href: "/announcements",
    linkLabel: "View announcements",
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    body: "Report a bug, broken link or content error with the exact route.",
    href: "/feedback",
    linkLabel: "Report a problem",
  },
  {
    icon: History,
    title: "Notice board",
    body: "Account notices grouped by what they affect.",
    href: "/notice",
    linkLabel: "Open notices",
  },
];

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <Link
        href="/home"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Home
      </Link>

      <header className="sequential-block-reveal rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Activity className="h-3.5 w-3.5" aria-hidden="true" />
          Service information
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Platform status, without invented telemetry
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Live uptime signals are not wired up yet, so this page does not claim that every service is
          operational. Use the checks below, then use the support paths if something still looks wrong.
        </p>
      </header>

      <section
        className="sequential-block-reveal"
        style={{ animationDelay: "90ms" }}
        aria-labelledby="quick-checks"
      >
        <h2 id="quick-checks" className="mb-3 text-lg font-bold tracking-tight text-foreground">
          Quick checks
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="sequential-block-reveal rounded-2xl border border-border/70 bg-card p-5"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-foreground">{card.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{card.body}</p>
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:opacity-80"
                >
                  {card.linkLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="sequential-block-reveal"
        style={{ animationDelay: "180ms" }}
        aria-labelledby="updates"
      >
        <h2 id="updates" className="mb-3 text-lg font-bold tracking-tight text-foreground">
          Where updates appear
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {UPDATES.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="sequential-block-reveal rounded-2xl border border-border/70 bg-card p-5"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-foreground">{card.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{card.body}</p>
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:opacity-80"
                >
                  {card.linkLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <p className="sequential-block-reveal rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4 text-xs leading-6 text-muted-foreground" style={{ animationDelay: "270ms" }}>
        If one route fails but the rest of the app works, include the exact path in your feedback. For
        account or access questions, the Help Center explains the tier gates and approval flow.
      </p>
    </div>
  );
}
