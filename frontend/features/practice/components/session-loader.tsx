"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { findSubjectBySlug } from "@/lib/core/syllabus";
import { mcqQuestionsForSubject } from "@/lib/practice/mcq-bank";
import { writingQuestionsForSubject } from "@/lib/practice/writing-bank";
import type { PracticeMode } from "@/lib/practice/types";
import { PracticeSession, type PracticeQuestion } from "./practice-session";

function normaliseMode(value: string | null): PracticeMode {
  return value === "writing" ? "writing" : "mcq";
}

/**
 * URL → session. `/practice/session?mode=mcq&subject=physics` is the only
 * place a run starts, so a session can be linked, shared or reloaded without
 * hidden state.
 */
export function PracticeSessionLoader() {
  const router = useRouter();
  const params = useSearchParams();
  const subjectSlug = params.get("subject") ?? "";
  const mode = normaliseMode(params.get("mode"));
  const found = findSubjectBySlug(subjectSlug);

  if (!found) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 text-center">
        <h1 className="text-lg font-bold">That subject was not recognised</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a subject and a mode to start a practice run.
        </p>
        <Link
          href="/practice"
          className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          Open Practice
        </Link>
      </div>
    );
  }

  const label = found.subject.name;
  const subjectHref = `/practice/${found.subject.slug}`;
  const questions: PracticeQuestion[] =
    mode === "mcq"
      ? mcqQuestionsForSubject(found.subject.slug)
      : writingQuestionsForSubject(found.subject.slug);

  return (
    <PracticeSession
      key={`${mode}:${found.subject.slug}`}
      mode={mode}
      subjectLabel={label}
      subjectHref={subjectHref}
      questions={questions}
      onExit={() => router.push(subjectHref)}
    />
  );
}
