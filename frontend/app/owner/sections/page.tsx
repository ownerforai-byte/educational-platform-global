"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Crown, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  applySectionOverrides,
  sectionById,
  type SectionTierOverrides,
} from "@/lib/sections";
import { ACCESS_LEVELS, ACCESS_LABELS, type AccessLevel } from "@/lib/access-level";
import { useSectionTierOverrides, refreshSectionTierOverrides } from "@/lib/hooks/use-section-tiers";
import { updateOwnerSettings } from "@/lib/api/owner";

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

const TIER_CHIP: Record<AccessLevel, string> = {
  guest: "bg-slate-500/15 text-slate-500",
  member: "bg-emerald-500/15 text-emerald-500",
  plus: "bg-sky-500/15 text-sky-500",
  pro: "bg-violet-500/15 text-violet-500",
  owner: "bg-amber-500/15 text-amber-500",
};

export default function OwnerSectionsPage() {
  const { user, isLoading } = useSession();
  const isOwner = user?.role === "owner" || user?.role === "pro";
  const overrides = useSectionTierOverrides();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(
    async (sectionId: string, rung: AccessLevel) => {
      setBusyId(sectionId);
      setError(null);
      try {
        await updateOwnerSettings([
          { key: `section_min_tier.${sectionId}`, value: rung },
        ]);
        await refreshSectionTierOverrides();
        setSavedId(sectionId);
        setTimeout(() => setSavedId((id) => (id === sectionId ? null : id)), 2500);
      } catch {
        setError("That minimum did not save — try again.");
      } finally {
        setBusyId(null);
      }
    },
    [],
  );

  // Drop any leftover timers on unmount (React 18 strict-mode safe).
  useEffect(() => () => setSavedId(null), []);

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

  const sections = applySectionOverrides(overrides);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-amber-500/10 p-2.5">
          <Crown className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Section settings</h1>
          <p className="text-xs text-muted-foreground">
            Each section and the plan that opens it. Changes apply across the
            rails, /plans and the section views immediately.
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-500">
          {error}
        </p>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Registry ({sections.length} sections)</CardTitle>
          <CardDescription className="text-xs">
            Defaults come from lib/sections.ts; your adjustments are stored in platform
            settings (<code>section_min_tier.&lt;id&gt;</code>) and published on /api/config.
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
                {sections.map((s) => {
                  const codeDefault = sectionById(s.id)?.minTier;
                  const adjusted = codeDefault !== undefined && codeDefault !== s.minTier;
                  return (
                    <tr key={s.id} className="border-b border-border/40 last:border-0">
                      <td className="px-3 py-2 font-medium">
                        {s.title}
                        {adjusted && (
                          <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                            default: {ACCESS_LABELS[codeDefault!]}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <select
                            aria-label={`Minimum rung for ${s.title}`}
                            value={s.minTier}
                            disabled={busyId === s.id}
                            onChange={(e) => save(s.id, e.target.value as AccessLevel)}
                            className={`h-8 rounded-lg border border-border bg-background px-2 text-[11px] font-semibold ${
                              TIER_CHIP[s.minTier].split(" ")[1]
                            }`}
                          >
                            {ACCESS_LEVELS.map((rung) => (
                              <option key={rung} value={rung}>
                                {ACCESS_LABELS[rung]}
                              </option>
                            ))}
                          </select>
                          {savedId === s.id && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                              <CheckCircle2 className="h-3 w-3" /> Saved
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        <Link href={s.href} className="hover:text-primary hover:underline">
                          {s.href}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
