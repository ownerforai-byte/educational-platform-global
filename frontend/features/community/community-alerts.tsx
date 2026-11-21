"use client";

import { AlertCircle } from "lucide-react";
import { surfaceCard } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

export function CommunityMigrationNotice({ migrated }: { migrated: boolean }) {
  if (migrated) return null;
  return (
    <p className={cn(surfaceCard, "flex items-start gap-2 p-3.5 text-sm text-muted-foreground")}>
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      Community posts are not set up on this deployment yet.
    </p>
  );
}

export function CommunityErrorAlert({ error }: { error: string | null }) {
  if (!error) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      {error}
    </p>
  );
}