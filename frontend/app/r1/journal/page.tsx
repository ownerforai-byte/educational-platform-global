"use client";

import { useEffect, useState } from "react";
import { Save, Trash2 } from "lucide-react";
import {
  useDeleteR1Journal,
  useR1Journal,
  useSaveR1Journal,
} from "@/features/r1/hooks";

const MOODS = ["great", "good", "okay", "low", "rough"];

export default function R1JournalPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const { data: entries, isLoading } = useR1Journal();
  const saveEntry = useSaveR1Journal();
  const deleteEntry = useDeleteR1Journal();

  const entryForDate = (entries ?? []).find((e) => e.entryDate === date);

  const [form, setForm] = useState({ title: "", body: "", mood: "", tags: "" });

  useEffect(() => {
    setForm({
      title: entryForDate?.title ?? "",
      body: entryForDate?.body ?? "",
      mood: entryForDate?.mood ?? "",
      tags: (entryForDate?.tags ?? []).join(", "),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, entryForDate?.id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.body.trim()) return;
    saveEntry.mutate({
      entryDate: date,
      title: form.title.trim(),
      body: form.body.trim(),
      mood: form.mood || null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 20),
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Journal</h1>
          <p className="text-sm text-muted-foreground">Your private daily writing.</p>
        </div>
        <label className="text-xs text-muted-foreground">
          Entry date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="ml-2 rounded-lg border border-border/60 bg-background px-2 py-1.5 text-sm"
          />
        </label>
      </header>

      <form
        onSubmit={submit}
        className="space-y-3 rounded-2xl border border-border/60 bg-card p-4"
      >
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Title (optional)"
          className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm font-medium"
          maxLength={200}
        />
        <textarea
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          placeholder="How did today go?"
          rows={10}
          className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm leading-relaxed"
          required
          maxLength={20000}
        />
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Mood:</span>
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setForm((f) => ({ ...f, mood: f.mood === m ? "" : m }))}
                className={
                  form.mood === m
                    ? "rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    : "rounded-lg px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted/60"
                }
              >
                {m}
              </button>
            ))}
          </div>
          <input
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            placeholder="tags, comma, separated"
            className="rounded-xl border border-border/60 bg-background px-3 py-2 text-xs"
          />
          <button
            type="submit"
            disabled={saveEntry.isPending}
            className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {entryForDate ? "Update entry" : "Save entry"}
          </button>
        </div>
      </form>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Past entries
        </h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (entries ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground">No entries yet.</p>
        ) : (
          <ul className="space-y-2">
            {(entries ?? []).map((entry) => (
              <li key={entry.id} className="rounded-2xl border border-border/60 bg-card p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setDate(entry.entryDate)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {entry.entryDate}
                      </span>
                      {entry.mood && (
                        <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                          {entry.mood}
                        </span>
                      )}
                      {entry.tags.map((t) => (
                        <span key={t} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1 text-sm font-medium">{entry.title || "Untitled"}</div>
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                      {entry.body}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteEntry.mutate(entry.id)}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
