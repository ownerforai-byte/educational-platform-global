import { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { EmptyState } from "@/components/content/empty-state";

export const metadata: Metadata = {
  title: "R Notes — Deprecated",
};

export default function RNotesDisabledPage() {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 text-center space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">⚠️ Page Disabled</h1>
      <p className="text-lg text-muted-foreground">
        The standalone <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">/r-notes</code> route has been removed.
      </p>
      <div className="space-y-2 text-sm text-muted-foreground max-w-md mx-auto">
        <p>Ravikishan and R-export notes are now integrated directly into each topic page.</p>
        <p>Navigate to <strong>Subject → Chapter → Topic</strong> to see notes alongside the syllabus.</p>
      </div>
      <div className="pt-4">
        <BackButton />
      </div>
    </div>
  );
}
