"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Plus, Trash2, XCircle } from "lucide-react";
import {
  useCreateR1Plan,
  useDeleteR1Plan,
  useR1Plans,
  useUpdateR1Plan,
} from "@/features/r1/hooks";
import type { R1PlanPriority, R1PlanStatus } from "@/lib/api/r1";
import { cn } from "@/lib/utils";

const STATUS_TABS: { key: "all" | R1PlanStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "planned", label: "Planned" },
  { key: "in_progress", label: "In progress" },
  { key: "done", label: "Done" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_ICON: Record<R1PlanStatus, typeof Circle> = {
  planned: Circle,
  in_progress: Circle,
  done: CheckCircle2,
  cancelled: XCircle,
};

export default function R1PlansPage() {
  const [tab, setTab] = useState<"all" | R1PlanStatus>("all");
  const query = useMemo(() => (tab === "all" ? {} : { status: tab }), [tab]);
  const { data: plans, isLoading } = useR1Plans(query);
  const createPlan = useCreateR1Plan();
  const updatePlan = useUpdateR1Plan();
  const deletePlan = useDeleteR1Plan();

  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    priority: "medium" as R1PlanPriority,
    description: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    createPlan.mutate(
      {
        title: form.title.trim(),
        dueDate: form.dueDate || null,
        priority: form.priority,
        description: form.description.trim() || null,
      },
      { onSuccess: () => setForm({ title: "", dueDate: "", priority: "medium", description: "" }) }
    );
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold tracking-tight">Plans</h1>
        <p className="text-sm text-muted-foreground">Everything coming up — organised.</p>
      </header>

      <form
        onSubmit={submit}
        className="grid gap-3 rounded-2xl border border-border/60 bg-card p-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="What's the plan?"
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm lg:col-span-2"
          required
          maxLength={200}
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
        />
        <select
          value={form.priority}
          onChange={(e) =>
            setForm((f) => ({ ...f, priority: e.target.value as R1PlanPriority }))
          }
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
        >
          <option value="low">low priority</option>
          <option value="medium">medium priority</option>
          <option value="high">high priority</option>
        </select>
        <button
          type="submit"
          disabled={createPlan.isPending}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
        <input
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Details (optional)"
          className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm lg:col-span-5"
          maxLength={5000}
        />
      </form>

      <div className="flex flex-wrap gap-1.5">
        {STATUS_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              tab === t.key
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (plans ?? []).length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="space-y-2">
          {(plans ?? []).map((p) => {
            const Icon = STATUS_ICON[p.status];
            return (
              <li
                key={p.id}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-3.5"
              >
                <button
                  type="button"
                  title={p.status === "done" ? "Reopen" : "Mark done"}
                  onClick={() =>
                    updatePlan.mutate({
                      id: p.id,
                      input: { status: p.status === "done" ? "planned" : "done" },
                    })
                  }
                  className={cn(
                    "mt-0.5 rounded-lg p-1 transition-colors",
                    p.status === "done" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        p.status === "done" && "line-through opacity-70"
                      )}
                    >
                      {p.title}
                    </span>
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase",
                        p.priority === "high"
                          ? "bg-red-500/10 text-red-600"
                          : p.priority === "medium"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-emerald-500/10 text-emerald-600"
                      )}
                    >
                      {p.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {p.dueDate ?? "no date"}
                    </span>
                  </div>
                  {p.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {p.status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => updatePlan.mutate({ id: p.id, input: { status: "cancelled" } })}
                      className="rounded-lg p-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
                      title="Cancel"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deletePlan.mutate(p.id)}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
