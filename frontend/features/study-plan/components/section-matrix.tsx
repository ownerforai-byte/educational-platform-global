"use client";

import { Check } from "lucide-react";
import { ACCESS_LABELS, ACCESS_LEVELS, type AccessLevel } from "@/lib/core/access-level";
import { applySectionOverrides } from "@/lib/sections";
import { useSectionTierOverrides } from "@/lib/hooks/use-section-tiers";

/**
 * The /plans availability matrix — the content universe derived from the
 * section registry (plan.md §3), with the current plan configuration applied
 * (plan.md §8 P4), so this table always matches what the section gates
 * actually enforce ("plans-table parity").
 */

const RUNG_ORDER: readonly AccessLevel[] = ACCESS_LEVELS;

function reaches(min: AccessLevel, rung: AccessLevel): boolean {
  return RUNG_ORDER.indexOf(rung) >= RUNG_ORDER.indexOf(min);
}

export function SectionMatrix() {
  const overrides = useSectionTierOverrides();
  const rows = applySectionOverrides(overrides).map((s) => ({
    section: s.title,
    min: s.minTier,
  }));

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70">
      <table className="w-full min-w-[640px] text-left text-xs">
        <thead>
          <tr className="border-b border-border/70 bg-muted/30 text-[11px] uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-2.5 font-semibold">Section</th>
            {RUNG_ORDER.map((rung) => (
              <th key={rung} className="px-3 py-2.5 text-center font-semibold">
                {ACCESS_LABELS[rung]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.section} className="border-b border-border/40 last:border-0">
              <td className="px-4 py-2 font-medium text-foreground">{row.section}</td>
              {RUNG_ORDER.map((rung) => (
                <td key={rung} className="px-3 py-2 text-center">
                  {reaches(row.min, rung) ? (
                    <Check className="mx-auto h-3.5 w-3.5 text-primary" />
                  ) : (
                    <span
                      className="mx-auto block text-muted-foreground/40 text-center"
                      aria-label="Not included in this plan"
                    >
                      —
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
