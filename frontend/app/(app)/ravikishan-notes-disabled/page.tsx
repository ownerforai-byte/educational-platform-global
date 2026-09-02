import { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { EmptyState } from "@/components/content/empty-state";

export const metadata: Metadata = {
  title: "Ravikishan Notes — Deprecated",
};

export default function RavikishanNotesDisabledPage() {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 text-center space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">⚠️ Page Disabled</h1>
      <p className="text-lg text-muted-foreground">
        The <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">/ravikishan-notes</code> route has been removed.
      </p>
      <div className="space-y-2 text-sm text-muted-foreground max-w-md mx-auto">
        <p>All ravikishan content has been migrated into the official topic pages.</p>
        <p>Go to <strong>Home → Subject → Unit → Topic</strong> to view integrated notes.</p>
      </div>
      <div className="pt-4">
        <BackButton />
      </div>
    </div>
  );
}
