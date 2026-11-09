import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticeSessionLoader } from "@/components/practice/session-loader";

export const metadata: Metadata = {
  title: "Practice session",
  description:
    "A practice run: four-option MCQs with an explanation for every option, or writing questions with model answers and concept contrasts.",
};

function SessionFallback() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-4" aria-busy="true" aria-live="polite">
      <div className="h-10 animate-pulse rounded-xl border border-border bg-card" />
      <div className="h-72 animate-pulse rounded-2xl border border-border bg-card" />
    </div>
  );
}

export default function PracticeSessionPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-6 sm:px-4 sm:py-8">
      <Suspense fallback={<SessionFallback />}>
        <PracticeSessionLoader />
      </Suspense>
    </div>
  );
}
