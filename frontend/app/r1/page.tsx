"use client";

import Link from "next/link";
import { Activity, CalendarCheck, NotebookPen, Repeat } from "lucide-react";
import { PlatformOverview } from "@/components/r1/platform-overview";
import { TimeTrackerCard } from "@/components/r1/time-tracker-card";
import { TodayPanel } from "@/components/r1/today-panel";
import { useSession } from "@/features/auth/hooks/use-session";

const MODULES = [
  {
    href: "/r1/activities",
    label: "Daily activities",
    desc: "Record what you do, day by day",
    icon: Activity,
  },
  {
    href: "/r1/plans",
    label: "Plans",
    desc: "Everything coming up, organised",
    icon: CalendarCheck,
  },
  {
    href: "/r1/journal",
    label: "Journal",
    desc: "Your private daily writing",
    icon: NotebookPen,
  },
  {
    href: "/r1/habits",
    label: "Habits",
    desc: "Daily check-ins and streaks",
    icon: Repeat,
  },
];

export default function R1HomePage() {
  const { user } = useSession();
  const firstName = (user?.fullName ?? user?.email ?? "").split(/[ @]/)[0];

  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          R1 · daily life
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {firstName ? `Welcome back, ${firstName}` : "Welcome to R1"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your day, your plans, your journal — and one opening into everything fun.
        </p>
      </section>

      <PlatformOverview />

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Your modules
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="group rounded-2xl border border-border/60 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-2 text-sm font-semibold">{m.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{m.desc}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Time tracker
        </h2>
        <TimeTrackerCard />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Today
        </h2>
        <TodayPanel />
      </section>
    </div>
  );
}
