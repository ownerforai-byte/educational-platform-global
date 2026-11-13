"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ArrowLeft } from "lucide-react";
import { getPracticeAttempt, type PracticeAttempt } from "@/features/practice/history";

function useAttempt(id: string): PracticeAttempt | null {
  return useSyncExternalStore(
    () => () => {},
    () => getPracticeAttempt(id),
    () => null,
  );
}

export default function PracticeResultPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const attempt = useAttempt(id);

  if (!ready) {
    return <p className="px-3 py-10 text-sm text-muted-foreground">Loading result…</p>;
  }

  if (!attempt) {
    return (
      <div className="mx-auto max-w-xl px-3 py-10 text-center">
        <h1 className="text-xl font-black">That result is not on this device</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Practice results stay in this browser. If you finished the set on another device, it will not be here.
        </p>
        <Link href="/practice/history" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
          Back to history
        </Link>
      </div>
    );
  }

  const misses = attempt.review.filter((item) => !item.correct);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5 px-3 py-6 sm:px-4 sm:py-8">
      <Link
        href="/practice/history"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Practice history
      </Link>
      <header className="rounded-2xl border border-border bg-card p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Saved result</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight">
          {attempt.subjectLabel} · {attempt.scorePct}%
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {attempt.mode === "mcq" ? "Multiple choice" : "Writing"}
          {attempt.timed ? " · Timed" : ""} · {attempt.correct}/{attempt.answered} · +{attempt.xp} XP
          {attempt.topic ? ` · ${attempt.topic}` : ""}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">{new Date(attempt.createdAt).toLocaleString()}</p>
        <Link
          href={`/practice/session?mode=${attempt.mode}&subject=${attempt.subjectSlug}${
            attempt.topic ? `&topic=${encodeURIComponent(attempt.topic)}` : ""
          }${attempt.difficulty ? `&difficulty=${attempt.difficulty}` : ""}${attempt.timed ? "&timed=1" : ""}`}
          className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
        >
          Practice this again
        </Link>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-bold">
          {misses.length === 0 ? "Nothing to revisit" : `${misses.length} to revisit`}
        </h2>
        {(misses.length > 0 ? misses : attempt.review).map((item) => (
          <article key={item.id} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{item.topic}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{item.prompt}</p>
            <p className="mt-2 text-xs text-rose-700 dark:text-rose-300">You chose: {item.chosen}</p>
            <p className="mt-1 text-xs text-foreground">Answer: {item.answer}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.explanation}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
