"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Lock, NotebookPen, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel } from "@/lib/access-level";
import {
  useDeleteR1Journal,
  useR1Journal,
  useSaveR1Journal,
} from "@/features/r1/hooks";

/**
 * /journal — the study journal (plan.md §3, section "Journal").
 *
 * Owner policy 2026-10-23: the journal is open to the Plus and Pro rungs
 * (and owner). Below that rung the page renders a locked card that routes to
 * /plans instead of hiding itself. Entries are one per user per day, private,
 * and backed by the shared journal API.
 */

function todayIso(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function JournalPage() {
  const { user, isLoading } = useSession();
  const allowed = hasLevel(user, "plus");

  const { data: entries, isLoading: entriesLoading } = useR1Journal(undefined, allowed);
  const saveEntry = useSaveR1Journal();
  const deleteEntry = useDeleteR1Journal();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Card className="p-8">
          <CardTitle className="text-xl">Sign in to write your journal</CardTitle>
          <CardDescription className="mt-2 text-sm">
            The study journal belongs to your account — entries stay private to you.
          </CardDescription>
          <Button asChild className="mt-6 h-10 rounded-xl px-5 text-sm font-semibold">
            <Link href="/login">Sign in</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Card className="border-primary/20 p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="mt-4 text-xl">The Journal opens at Plus</CardTitle>
          <CardDescription className="mx-auto mt-2 max-w-md text-sm">
            Study Journal is a Plus and Pro section — private daily entries for your
            preparation. Upgrade your plan to start writing.
          </CardDescription>
          <Button asChild className="mt-6 h-10 rounded-xl px-5 text-sm font-semibold">
            <Link href="/plans">See the plans</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const today = todayIso();
  const todayEntry = entries?.find((e) => e.entryDate === today);

  const save = async () => {
    if (!body.trim()) return;
    await saveEntry.mutateAsync({
      entryDate: today,
      title: title.trim() || undefined,
      body: body.trim(),
    });
    setTitle("");
    setBody("");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary/10 p-2.5">
          <NotebookPen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Journal</h1>
          <p className="text-xs text-muted-foreground">
            One private entry per day — your preparation, in your words.
          </p>
        </div>
      </div>

      {/* Today's entry */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">
            {todayEntry ? `Today · ${today}` : `Write today · ${today}`}
          </CardTitle>
          <CardDescription className="text-xs">
            {todayEntry
              ? "Saving again replaces today's entry."
              : "Saving creates today's entry. Keep it short — a paragraph beats a page."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            maxLength={200}
            className="h-10 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none focus:border-primary"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={todayEntry ? todayEntry.body.slice(0, 120) : "What did you study today?"}
            rows={4}
            maxLength={20000}
            className="w-full rounded-xl border border-border/70 bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              {todayEntry ? "Today's entry exists." : "No entry yet for today."}
            </span>
            <Button
              onClick={save}
              disabled={saveEntry.isPending || !body.trim()}
              className="h-9 rounded-xl px-4 text-xs font-semibold"
            >
              {saveEntry.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" /> Save entry
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Past entries */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Earlier entries
        </h2>
        {entriesLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (entries ?? []).length === 0 ? (
          <p className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-6 text-center text-xs text-muted-foreground">
            Nothing yet — today is a good day for the first entry.
          </p>
        ) : (
          <div className="space-y-3">
            {(entries ?? [])
              .filter((e) => e.entryDate !== today)
              .map((e) => (
                <Card key={e.id}>
                  <CardContent className="flex items-start justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-primary">{e.entryDate}</span>
                        {e.title && <span className="truncate text-sm font-semibold">{e.title}</span>}
                      </div>
                      <p className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                        {e.body}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteEntry.mutate(e.id)}
                      aria-label={`Delete entry ${e.entryDate}`}
                      className="rounded-lg p-1.5 text-muted-foreground/60 transition hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
