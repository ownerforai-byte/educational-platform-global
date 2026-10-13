"use client";

import { useState } from "react";
import { Archive, CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import {
  useCreateR1Habit,
  useDeleteR1Habit,
  useR1Habits,
  useSetR1HabitCheckin,
  useUpdateR1Habit,
} from "@/features/r1/hooks";
import { cn } from "@/lib/utils";

function lastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    days.push(new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  }
  return days;
}

export default function R1HabitsPage() {
  const days = lastNDays(7);
  const { data: habits, isLoading } = useR1Habits({
    from: days[0],
    to: days[days.length - 1],
  });
  const createHabit = useCreateR1Habit();
  const updateHabit = useUpdateR1Habit();
  const deleteHabit = useDeleteR1Habit();
  const setCheckin = useSetR1HabitCheckin();

  const [name, setName] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createHabit.mutate({ name: name.trim() }, { onSuccess: () => setName("") });
  };

  const visible = (habits ?? []).filter((h) => showArchived || !h.archived);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold tracking-tight">Habits</h1>
        <p className="text-sm text-muted-foreground">Daily check-ins and streaks.</p>
      </header>

      <form onSubmit={submit} className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit (e.g. Morning revision)"
          className="max-w-sm flex-1 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          required
          maxLength={80}
        />
        <button
          type="submit"
          disabled={createHabit.isPending}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add habit
        </button>
      </form>

      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={showArchived}
          onChange={(e) => setShowArchived(e.target.checked)}
          className="rounded"
        />
        Show archived
      </label>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">No habits yet — add one above.</p>
      ) : (
        <div className="space-y-2">
          {visible.map((h) => {
            const streak = currentStreak(h.checkins, days);
            return (
              <div
                key={h.id}
                className="rounded-2xl border border-border/60 bg-card p-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn("text-sm font-medium", h.archived && "opacity-50")}
                      >
                        {h.name}
                      </span>
                      {streak > 0 && (
                        <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                          {streak} day streak
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateHabit.mutate({ id: h.id, input: { archived: !h.archived } })
                    }
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted/60"
                    title={h.archived ? "Restore" : "Archive"}
                  >
                    <Archive className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteHabit.mutate(h.id)}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2.5 grid grid-cols-7 gap-1.5">
                  {days.map((d) => {
                    const done = h.checkins.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() =>
                          setCheckin.mutate({ habitId: h.id, date: d, done: !done })
                        }
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border px-1 py-2 text-[10px] transition-all",
                          done
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border/60 text-muted-foreground hover:border-primary/30"
                        )}
                      >
                        {done ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                        <span>{d.slice(5)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Consecutive checked days ending today (using the visible window's dates). */
function currentStreak(checkins: string[], days: string[]): number {
  const set = new Set(checkins);
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (set.has(days[i])) streak++;
    else if (i < days.length - 1) break;
  }
  return streak;
}
