"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Timer } from "lucide-react";
import type { Difficulty, PracticeMode } from "@/lib/practice/types";

export interface LaunchQuestion {
  topic: string;
  difficulty?: Difficulty;
}

const LENGTHS = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 0, label: "All" },
] as const;

/**
 * Builds a real practice URL from the questions this subject already has.
 * Every control changes the link; nothing here is a dead button.
 */
export function PracticeLauncher({
  subjectSlug,
  mode,
  questions,
}: {
  subjectSlug: string;
  mode: PracticeMode;
  questions: LaunchQuestion[];
}) {
  const router = useRouter();
  const topics = useMemo(
    () => [...new Set(questions.map((question) => question.topic))].sort((a, b) => a.localeCompare(b)),
    [questions],
  );
  const difficulties = useMemo(() => {
    const present = new Set(questions.map((question) => question.difficulty).filter(Boolean));
    return (["easy", "intermediate", "hard"] as const).filter((level) => present.has(level));
  }, [questions]);

  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [limit, setLimit] = useState(mode === "mcq" ? 5 : 0);
  const [timed, setTimed] = useState(false);

  const matching = questions.filter((question) => {
    if (topic !== "all" && question.topic !== topic) return false;
    if (difficulty !== "all" && question.difficulty !== difficulty) return false;
    return true;
  }).length;
  const count = limit > 0 ? Math.min(limit, matching) : matching;
  const secondsEach = mode === "mcq" ? 75 : 180;

  function start() {
    const params = new URLSearchParams({ mode, subject: subjectSlug });
    if (topic !== "all") params.set("topic", topic);
    if (difficulty !== "all") params.set("difficulty", difficulty);
    if (limit > 0) params.set("limit", String(limit));
    if (timed) params.set("timed", "1");
    router.push(`/practice/session?${params.toString()}`);
  }

  if (questions.length === 0) return null;

  return (
    <form
      className="rounded-2xl border border-border bg-card p-4 sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (count > 0) start();
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-foreground">
            Start a {mode === "mcq" ? "multiple-choice" : "writing"} set
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {count} question{count === 1 ? "" : "s"}
            {timed ? ` · ${Math.ceil((count * secondsEach) / 60)} min` : " · untimed"}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-semibold text-muted-foreground">
          Topic
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground"
          >
            <option value="all">All topics</option>
            {topics.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {difficulties.length > 0 && (
          <fieldset className="min-w-0">
            <legend className="text-xs font-semibold text-muted-foreground">Difficulty</legend>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <FilterChip active={difficulty === "all"} onClick={() => setDifficulty("all")}>
                All
              </FilterChip>
              {difficulties.map((level) => (
                <FilterChip
                  key={level}
                  active={difficulty === level}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </FilterChip>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="text-xs font-semibold text-muted-foreground">Length</legend>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {LENGTHS.map((option) => (
              <FilterChip
                key={option.label}
                active={limit === option.value}
                onClick={() => setLimit(option.value)}
              >
                {option.label}
              </FilterChip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold text-muted-foreground">Clock</legend>
          <div className="mt-1">
            <FilterChip active={timed} onClick={() => setTimed((value) => !value)}>
              <Timer className="h-3.5 w-3.5" aria-hidden="true" />
              {timed ? "Timed" : "Untimed"}
            </FilterChip>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={count === 0}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {count === 0 ? "No questions for this filter" : `Start ${count} question${count === 1 ? "" : "s"}`}
        {count > 0 && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold capitalize transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}
