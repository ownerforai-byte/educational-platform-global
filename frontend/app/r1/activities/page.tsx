"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  useCreateR1Activity,
  useDeleteR1Activity,
  useR1Activities,
} from "@/features/r1/hooks";

const CATEGORIES = ["general", "study", "work", "health", "sleep", "social", "other"];

export default function R1ActivitiesPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const range = useMemo(
    () => ({ ...(from ? { from } : {}), ...(to ? { to } : {}) }),
    [from, to]
  );
  const { data: activities, isLoading } = useR1Activities(range);
  const createActivity = useCreateR1Activity();
  const deleteActivity = useDeleteR1Activity();

  const [form, setForm] = useState({
    activityDate: new Date().toISOString().slice(0, 10),
    title: "",
    category: "general",
    startTime: "",
    endTime: "",
    minutes: "",
    description: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    createActivity.mutate(
      {
        activityDate: form.activityDate,
        title: form.title.trim(),
        category: form.category,
        startTime: form.startTime || null,
        endTime: form.endTime || null,
        minutes: form.minutes ? Number(form.minutes) : null,
        description: form.description.trim() || null,
      },
      { onSuccess: () => setForm((f) => ({ ...f, title: "", description: "" })) }
    );
  };

  const byDate = new Map<string, NonNullable<typeof activities>>();
  for (const a of activities ?? []) {
    const list = byDate.get(a.activityDate) ?? [];
    list.push(a);
    byDate.set(a.activityDate, list);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold tracking-tight">Daily activities</h1>
        <p className="text-sm text-muted-foreground">Record what you did — day by day.</p>
      </header>

      <form
        onSubmit={submit}
        className="grid gap-3 rounded-2xl border border-border/60 bg-card p-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <input
          type="date"
          value={form.activityDate}
          onChange={(e) => setForm((f) => ({ ...f, activityDate: e.target.value }))}
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          placeholder="Start"
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          placeholder="End"
        />
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="What did you do?"
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm sm:col-span-2"
          required
          maxLength={200}
        />
        <input
          type="number"
          min={0}
          max={1440}
          value={form.minutes}
          onChange={(e) => setForm((f) => ({ ...f, minutes: e.target.value }))}
          placeholder="Minutes"
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={createActivity.isPending}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
        <input
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Notes (optional)"
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm sm:col-span-2 lg:col-span-3"
          maxLength={5000}
        />
      </form>

      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs text-muted-foreground">
          From
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="ml-2 rounded-lg border border-border/60 bg-background px-2 py-1.5 text-sm"
          />
        </label>
        <label className="text-xs text-muted-foreground">
          To
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="ml-2 rounded-lg border border-border/60 bg-background px-2 py-1.5 text-sm"
          />
        </label>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : byDate.size === 0 ? (
        <p className="text-sm text-muted-foreground">No activities in this range yet.</p>
      ) : (
        <div className="space-y-5">
          {Array.from(byDate.entries()).map(([date, list]) => (
            <section key={date}>
              <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{date}</h2>
              <ul className="space-y-2">
                {list.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase">
                          {a.category}
                        </span>
                        <span className="text-sm font-medium">{a.title}</span>
                      </div>
                      {(a.startTime || a.minutes != null) && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {a.startTime
                            ? `${a.startTime}${a.endTime ? ` – ${a.endTime}` : ""}`
                            : null}
                          {a.minutes != null ? ` · ${a.minutes} min` : null}
                        </div>
                      )}
                      {a.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteActivity.mutate(a.id)}
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
