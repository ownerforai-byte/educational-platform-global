"use client";

import { Crown, ShieldCheck } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useSession } from "@/features/auth/hooks/use-session";
import { PlanIncludes } from "@/features/profile/plan-includes";
import { isOwnerAccount } from "@/lib/owner";

/**
 * /owner/sections — Section Access Rules (plan.md §6 "Content control", §8 P4:
 * "Owner console gains … section `minTier` control"; §9: "Owner console can
 * grant/adjust every tier and change section minimums").
 *
 * The section registry (lib/sections.ts) holds the CODE defaults; each change
 * here is stored as `settings.key = "section_min_tier.<id>"`, published on
 * GET /api/config, and applied by the rails, the /plans matrix and the section
 * gate everywhere at once. Operator-only: hidden below the operator tier.
 */

export default function OwnerSectionsPage() {
  const { user, isLoading } = useSession();
  const isOwner = isOwnerAccount(user);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <ShieldCheck className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Card className="border-primary/20 p-8">
          <div className="mx-auto inline-flex items-center rounded-2xl border border-border/60 bg-muted/50 px-3 py-1.5 text-muted-foreground/70 grayscale opacity-70" aria-disabled="true">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
              Owner only
            </span>
          </div>
          <CardTitle className="mt-4 text-xl">Operator surface</CardTitle>
          <CardDescription className="mt-2 text-sm">
            This area is not available for your account.
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-amber-500/10 p-2.5">
          <Crown className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Section settings</h1>
          <p className="text-xs text-muted-foreground">
            What each plan includes. One click sets the plan that opens a section, and the marks update immediately.
          </p>
        </div>
      </div>
      <PlanIncludes editable={isOwnerAccount(user)} />
    </div>
  );
}
