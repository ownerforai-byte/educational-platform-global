"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listOwnerAssignableBadges } from "@rn/shared/badges";
import { updateOwnerUserBadges } from "@/lib/api/owner";
import { parseAssignedBadgeIds } from "@rn/shared/badges";
import { PlatformBadge } from "@/features/badges/platform-badge";
import { cn } from "@/lib/utils";

export function OwnerUserBadgesPanel({
  userId,
  profileExtras,
  onSaved,
}: {
  userId: string;
  profileExtras: Record<string, unknown> | undefined;
  onSaved?: () => void;
}) {
  const catalog = useMemo(() => listOwnerAssignableBadges(), []);
  const initial = useMemo(() => parseAssignedBadgeIds(profileExtras?.assignedBadgeIds), [profileExtras]);
  const [selected, setSelected] = useState<string[]>(initial);
  const [saving, setSaving] = useState(false);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await updateOwnerUserBadges(userId, selected);
      toast.success("Profile badges updated");
      onSaved?.();
    } catch {
      toast.error("Could not save badges");
    } finally {
      setSaving(false);
    }
  }, [userId, selected, onSaved]);

  return (
    <div className="rounded-lg border border-border/80 bg-muted/20 p-3 space-y-3">
      <p className="flex items-center gap-2 text-xs font-bold text-foreground">
        <Award className="h-3.5 w-3.5 text-primary" />
        Assign badges (teacher, special, honorary)
      </p>
      {selected.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {selected.map((id) => (
            <PlatformBadge key={id} badgeId={id} flashTier={5} compact />
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-muted-foreground">No owner-assigned badges yet.</p>
      )}
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Catalog</h3>
      <ul className="max-h-48 overflow-y-auto space-y-1 pr-1">
        {catalog.map((row) => {
          const on = selected.includes(row.id);
          return (
            <li key={row.id}>
              <button
                type="button"
                onClick={() => toggle(row.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-md border px-2 py-1 text-left text-[11px] transition-colors",
                  on ? "border-primary/40 bg-primary/10" : "border-border/70 hover:bg-muted/50",
                )}
              >
                <span className="font-medium text-foreground">{row.label}</span>
                <span className="capitalize text-muted-foreground">{row.rarity}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <Button size="sm" disabled={saving} onClick={() => void save()}>
        {saving ? "Saving…" : "Save badges"}
      </Button>
    </div>
  );
}