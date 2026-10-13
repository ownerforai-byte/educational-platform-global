"use client";

import Link from "next/link";
import { useState } from "react";
import { Activity, CalendarCheck, CheckCircle2, Circle, NotebookPen, Repeat } from "lucide-react";
import {
  useR1Activities,
  useR1Habits,
  useR1Journal,
  useR1Plans,
  useSetR1HabitCheckin,
} from "@/features/r1/hooks";
import { cn } from "@/lib/utils";

/** Today's snapshot on the R1 home: habits, activities, upcoming plans, journal. */
export function TodayPanel() {
  const today = new Date().toISOString().slice(0, 10);
  const { data: habits } = useR1Habits();
  const { data: activities } = useR1Activities({ from: today, to: today });
  const { data: plans } = useR1Plans({ from: today });
  const { data: journal } = useR1Journal({ from: today, to: today });
  const setCheckin = useSetR1HabitCheckin();
  const [savingHabit, setSavingHabit] = useState<string | null>(null);

  const todayHabits = (habits ?? []).filter((h) => !h.archived);
  const upcoming = (plans ?? [])
    .filter((p) => p.status === "planned" || p.status === "in_progress")
    .slice(0, 5);

  const toggleHabit = (habitId: string, date: string, done: boolean) => {
    setSavingHabit(habitId);
    setCheckin.mutate(
      { habitId, date, done },
      { onSettled: () => setSavingHabit(null) }
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Habits */}
      <section className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Repeat className="h-4 w-4 text-primary" /> Habits today
          </h3>
          <Link href="/r1/habits" className="text-xs text-primary hover:underline">
            Manage
          </Link>
        </div>
        {todayHabits.length === 0 ? (
          <EmptyRow label="No habits yet — start one on the Habits page." />
        ) : (
          <ul className="mt-3 space-y-1.5">
            {todayHabits.map((h) => {
              const done = h.checkins.includes(today);
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    disabled={savingHabit === h.id}
                    onClick={() => toggleHabit(h.id, today, !done)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition-all",
                      done
                        ? "border-primary/40 bg-primary/10"
                        : "border-border/60 hover:border-primary/30 hover:bg-muted/40"
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className={cn(done && "line-through opacity-70")}>{h.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Activities */}
      <section className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-primary" /> Logged today
          </h3>
          <Link href="/r1/activities" className="text-xs text-primary hover:underline">
            Open log
          </Link>
        </div>
        {(activities ?? []).length === 0 ? (
          <EmptyRow label="Nothing logged today yet." />
        ) : (
          <ul className="mt-3 space-y-1.5">
            {(activities ?? []).slice(0, 5).map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-2.5 rounded-xl border border-border/60 px-3 py-2 text-sm"
              >
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase">
                  {a.category}
                </span>
                <span className="flex-1 truncate">{a.title}</span>
                {a.startTime && (
                  <span className="text-xs text-muted-foreground">
                    {a.startTime}
                    {a.endTime ? `–${a.endTime}` : ""}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Upcoming plans */}
      <section className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <CalendarCheck className="h-4 w-4 text-primary" /> Coming up
          </h3>
          <Link href="/r1/plans" className="text-xs text-primary hover:underline">
            All plans
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <EmptyRow label="No upcoming plans — add one on the Plans page." />
        ) : (
          <ul className="mt-3 space-y-1.5">
            {upcoming.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-2.5 rounded-xl border border-border/60 px-3 py-2 text-sm"
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    p.priority === "high"
                      ? "bg-red-500"
                      : p.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  )}
                />
                <span className="flex-1 truncate">{p.title}</span>
                <span className="text-xs text-muted-foreground">
                  {p.dueDate ?? "no date"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Journal prompt */}
      <section className="rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <NotebookPen className="h-4 w-4 text-primary" /> Journal
          </h3>
          <Link href="/r1/journal" className="text-xs text-primary hover:underline">
            {journal && journal.length > 0 ? "Edit today" : "Write today"}
          </Link>
        </div>
        {journal && journal.length > 0 ? (
          <div className="mt-3 rounded-xl border border-border/60 px-3 py-2 text-sm">
            <div className="font-medium">{journal[0].title || "Today's entry"}</div>
            <p className="mt-1 line-clamp-3 text-muted-foreground">{journal[0].body}</p>
          </div>
        ) : (
          <EmptyRow label="No entry yet — how did today go?" />
        )}
      </section>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <p className="mt-3 text-sm text-muted-foreground">{label}</p>;
}
