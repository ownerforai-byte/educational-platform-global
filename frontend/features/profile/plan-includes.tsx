"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { updateOwnerSettings } from "@/lib/api/owner";
import {
  ACCESS_LABELS,
  ACCESS_LEVELS,
  accessLevelFor,
  type AccessLevel,
} from "@/lib/core/access-level";
import {
  previewSectionTier,
  refreshSectionTierOverrides,
  useSectionTierOverrides,
} from "@/lib/hooks/use-section-tiers";
import { applySectionOverrides } from "@/lib/sections";
import { cn } from "@/lib/utils";

function includes(min: AccessLevel, plan: AccessLevel): boolean {
  return ACCESS_LEVELS.indexOf(plan) >= ACCESS_LEVELS.indexOf(min);
}

/**
 * What each plan includes, one row per real section.
 * Operators set the opening plan with one click; the marks change immediately.
 */
export function PlanIncludes({ editable = false }: { editable?: boolean }) {
  const { user } = useSession();
  const mine = accessLevelFor(user);
  const overrides = useSectionTierOverrides();
  const sections = applySectionOverrides(overrides);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(sectionId: string, plan: AccessLevel) {
    const current = applySectionOverrides(overrides).find((section) => section.id === sectionId);
    if (!current || current.minTier === plan || busyId) return;
    const previous = overrides[sectionId] ?? null;
    setBusyId(sectionId);
    setError(null);
    previewSectionTier(sectionId, plan);
    try {
      await updateOwnerSettings([{ key: `section_min_tier.${sectionId}`, value: plan }]);
      await refreshSectionTierOverrides();
    } catch {
      previewSectionTier(sectionId, previous);
      setError("That plan change did not save. It has been put back.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="space-y-3">
      <header>
        <h2 className="text-lg font-semibold tracking-tight">What each plan includes</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {editable
            ? "Each section is listed once. Click a plan to open the section there. The marks update on that click."
            : `Your plan is ${ACCESS_LABELS[mine]}. A mark means that plan includes the section.`}
        </p>
      </header>
      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Section</th>
              {ACCESS_LEVELS.map((plan) => (
                <th
                  key={plan}
                  className={cn(
                    "px-3 py-2.5 text-center font-medium",
                    plan === mine && "text-foreground",
                  )}
                >
                  {ACCESS_LABELS[plan]}
                  {plan === mine ? <span className="mt-0.5 block normal-case tracking-normal">Yours</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5">
                  <span className="block font-medium">{section.title}</span>
                  <span className="block text-xs text-muted-foreground">Opens at {ACCESS_LABELS[section.minTier]}</span>
                </td>
                {ACCESS_LEVELS.map((plan) => {
                  const on = includes(section.minTier, plan);
                  const isMinimum = section.minTier === plan;
                  const label = `${section.title} ${on ? "included" : "not included"} in ${ACCESS_LABELS[plan]}`;
                  return (
                    <td key={plan} className={cn("px-3 py-2 text-center", plan === mine && "bg-muted/30")}>
                      {editable ? (
                        <button
                          type="button"
                          aria-label={
                            isMinimum
                              ? `${label}. This is the opening plan.`
                              : `${label}. Open it at ${ACCESS_LABELS[plan]}.`
                          }
                          aria-pressed={isMinimum}
                          disabled={busyId === section.id}
                          onClick={() => void choose(section.id, plan)}
                          className={cn(
                            "inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors",
                            isMinimum
                              ? "border-foreground bg-foreground text-background"
                              : on
                                ? "border-border bg-card text-foreground hover:bg-muted"
                                : "border-transparent text-muted-foreground/40 hover:border-border hover:bg-muted",
                          )}
                        >
                          {on ? <Check className="h-3.5 w-3.5" /> : "—"}
                        </button>
                      ) : on ? (
                        <Check className="mx-auto h-3.5 w-3.5 text-foreground" aria-label={label} />
                      ) : (
                        <span className="text-muted-foreground/40" aria-label={label}>
                          —
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
