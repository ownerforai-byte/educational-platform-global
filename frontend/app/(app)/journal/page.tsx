import type { Metadata } from "next";
import Link from "next/link";
import { NotebookPen } from "lucide-react";

export const metadata: Metadata = {
  title: "Study Journal — Ravikisan's Platform",
  description: "Private study journal for your own entries.",
};

/**
 * Study journal placeholder. Keep the Pro nav destination so the member surface stays intact.
 */
export default function JournalPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-muted/40">
        <NotebookPen className="h-5 w-5 text-primary" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-xl font-extrabold tracking-tight">Study Journal</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        The private daily journal is currently being refreshed.
        Your other Pro study surfaces stay open meanwhile.
      </p>
      <Link
        href="/home/member"
        className="mt-6 inline-flex h-11 items-center rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground"
      >
        Back to study desk
      </Link>
    </div>
  );
}
