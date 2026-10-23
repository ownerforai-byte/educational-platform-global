"use client";

import Link from "next/link";
import { Crown, Lock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/features/auth/hooks/use-session";
import { SECTIONS } from "@/lib/sections";
import { ACCESS_LABELS, type AccessLevel } from "@/lib/access-level";

/**
 * /owner/sections — Section Access Rules (plan.md §6, "Content control").
 *
 * The owner console's read-only map of every content section and the minimum
 * rung that opens it. Operator-only: hidden below the owner rung. The section
 * registry (lib/sections.ts) is the single source this renders.
 */

const TIER_CHIP: Record<AccessLevel, string> = {
  visitor: "bg-slate-500/15 text-slate-500",
  member: "bg-emerald-500/15 text-emerald-500",
  plus: "bg-sky-500/15 text-sky-500",
  pro: "bg-violet-500/15 text-violet-500",
  owner: "bg-amber-500/15 text-amber-500",
};

export default function OwnerSectionsPage() {
  const { user, isLoading } = useSession();
  const isOwner = user?.role === "owner" || user?.role === "pro";

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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="mt-4 text-xl">Operator surface</CardTitle>
          <CardDescription className="mt-2 text-sm">
            The section access rules live in the owner console.
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-amber-500/10 p-2.5">
          <Crown className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Section Access Rules</h1>
          <p className="text-xs text-muted-foreground">
            Every content section and its minimum rung — the map the platform enforces.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Registry ({SECTIONS.length} sections)</CardTitle>
          <CardDescription className="text-xs">
            Defined in lib/sections.ts — consumed by the home rail, /plans and the gates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30 text-[10px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2 font-semibold">Section</th>
                  <th className="px-3 py-2 font-semibold">Opens at</th>
                  <th className="px-3 py-2 font-semibold">Route</th>
                </tr>
              </thead>
              <tbody>
                {SECTIONS.map((s) => (
                  <tr key={s.id} className="border-b border-border/40 last:border-0">
                    <td className="px-3 py-2 font-medium">{s.title}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${TIER_CHIP[s.minTier]}`}>
                        {ACCESS_LABELS[s.minTier]}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      <Link href={s.href} className="hover:text-primary hover:underline">
                        {s.href}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
