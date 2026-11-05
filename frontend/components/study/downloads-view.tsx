"use client";

/**
 * Offline Study — saves unit packs to localStorage so they are readable
 * inside the app without a network connection.
 *
 * NO file downloads are offered here. Content stays in the app.
 * Only owners can access this page (minTier: "owner" in sections.ts).
 *
 * Storage key: "neb-offline-packs:v1"
 * Shape: Record<packId, { title, savedAt, markdown, count }>
 */

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  CloudOff,
  Loader2,
  Save,
  Trash2,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ComingSoon } from "@/components/content/coming-soon";
import type { FormulaSheetUnit } from "@/lib/formula-sheet";
import { buildUnitPack, packItemCount, packToMarkdown } from "@/lib/offline-pack";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { listGoalSubjects } from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { useSubjectBank } from "./use-subject-bank";
import { SubjectSelect } from "./subject-select";

// ─── Storage ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "neb-offline-packs:v1";

interface StoredPack {
  id: string;
  title: string;
  savedAt: string;   // ISO date
  markdown: string;  // full unit pack text
  count: number;     // total items
}

function readStoredPacks(): Record<string, StoredPack> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredPack>) : {};
  } catch {
    return {};
  }
}

function writeStoredPacks(packs: Record<string, StoredPack>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packs));
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

function packId(classSlug: string, subjectSlug: string, unitId: string): string {
  return `${classSlug}/${subjectSlug}/${unitId}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// ─── Mirrors FORMULA_SUBJECTS (lib/formula-sheet.ts is server-only) ──────────
const FORMULA_SLUGS: string[] = ["physics", "mathematics", "chemistry"];

// ─── OfflineReader — shows a saved pack inline ────────────────────────────────
function OfflineReader({ pack, onClose }: { pack: StoredPack; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-bold">{pack.title}</h2>
          <p className="text-xs text-muted-foreground">
            Saved {formatDate(pack.savedAt)} · {pack.count} items
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onClose}>
          ← Back
        </Button>
      </div>
      <div className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed whitespace-pre-wrap font-mono max-h-[60vh] overflow-y-auto overscroll-contain">
        {pack.markdown}
      </div>
    </div>
  );
}

// ─── Main view ────────────────────────────────────────────────────────────────
export function DownloadsView() {
  const { goals } = useStudyGoals();
  const fallback = listGoalSubjects()[0]?.key ?? "";
  const [picked, setPicked] = useState<string | null>(null);
  const subjectKey = picked ?? goals.subjects[0] ?? fallback;
  const [classSlug, subjectSlug] = subjectKey.split("/");
  const { bank, loading, failed } = useSubjectBank(subjectKey || null);
  const units = useMemo(() => getSubjectSyllabus(classSlug, subjectSlug)?.units ?? [], [classSlug, subjectSlug]);
  const [unitId, setUnitId] = useState("");
  const activeUnit = units.find((u) => u.id === unitId) ?? units[0];
  const [formulaUnit, setFormulaUnit] = useState<FormulaSheetUnit | null>(null);

  // Saved packs state
  const [savedPacks, setSavedPacks] = useState<Record<string, StoredPack>>({});
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [reading, setReading] = useState<StoredPack | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setSavedPacks(readStoredPacks());
  }, []);

  useEffect(() => {
    setFormulaUnit(null);
    if (!activeUnit || !FORMULA_SLUGS.includes(subjectSlug)) return;
    let cancelled = false;
    fetch(`/api/formula-unit?subject=${encodeURIComponent(subjectSlug)}&unit=${encodeURIComponent(activeUnit.id)}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ unit: FormulaSheetUnit | null }>) : null))
      .then((r) => !cancelled && setFormulaUnit(r?.unit ?? null))
      .catch(() => !cancelled && setFormulaUnit(null));
    return () => { cancelled = true; };
  }, [subjectSlug, activeUnit]);

  const pack = useMemo(
    () => (bank && activeUnit ? buildUnitPack(activeUnit.title, activeUnit.id, bank, formulaUnit) : null),
    [bank, activeUnit, formulaUnit],
  );
  const count = pack ? packItemCount(pack) : 0;

  const currentId = activeUnit ? packId(classSlug, subjectSlug, activeUnit.id) : null;
  const alreadySaved = currentId ? !!savedPacks[currentId] : false;

  const saveForOffline = () => {
    if (!pack || !activeUnit || !currentId || saving) return;
    setSaving(true);
    try {
      const markdown = packToMarkdown(pack);
      const stored: StoredPack = {
        id: currentId,
        title: pack.title,
        savedAt: new Date().toISOString(),
        markdown,
        count: packItemCount(pack),
      };
      const next = { ...savedPacks, [currentId]: stored };
      writeStoredPacks(next);
      setSavedPacks(next);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const removeOfflinePack = (id: string) => {
    const next = { ...savedPacks };
    delete next[id];
    writeStoredPacks(next);
    setSavedPacks(next);
  };

  const savedList = Object.values(savedPacks).sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
  );

  // If reading a saved pack, show the inline reader
  if (reading) {
    return (
      <div className="container max-w-3xl py-8 space-y-6">
        <OfflineReader pack={reading} onClose={() => setReading(null)} />
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8 space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <CloudOff className="h-6 w-6" /> Offline Study
        </h1>
        <p className="text-sm text-muted-foreground">
          Save units to your device. Once saved, they open inside the app
          without any internet connection.
        </p>
      </div>

      {/* Offline badge */}
      <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/8 px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
        <WifiOff className="h-4 w-4 shrink-0" />
        Content is stored in your browser — readable with no signal.
      </div>

      {/* Subject + unit picker */}
      <div className="flex flex-wrap items-center gap-3">
        <Label htmlFor="dl-subject">Subject</Label>
        <SubjectSelect
          id="dl-subject"
          value={subjectKey}
          chosen={goals.subjects}
          onChange={(k) => { setPicked(k); setUnitId(""); }}
        />
        <Label htmlFor="dl-unit">Unit</Label>
        <select
          id="dl-unit"
          className="h-9 rounded-md border bg-background px-2 text-sm"
          value={activeUnit?.id ?? ""}
          onChange={(e) => setUnitId(e.target.value)}
        >
          {units.map((u) => (
            <option key={u.id} value={u.id}>{u.title}</option>
          ))}
        </select>
      </div>

      {/* Pack preview + save button */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Preparing pack…
        </div>
      )}
      {!loading && (failed || !pack || count === 0) && (
        <ComingSoon
          title="Pack for this unit"
          kind="Notes"
          message="No notes, past questions, drills or formulas are indexed for this unit yet."
          backHref="/pyqs"
          backLabel="PYQ bank"
        />
      )}
      {!loading && pack && count > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <CardTitle className="text-base">{pack.title}</CardTitle>
                <CardDescription className="mt-0.5">
                  {pack.theory.length} concept notes · {pack.pyqs.length} exam years ·{" "}
                  {pack.drills.length} drills · {pack.formulas.length} formulas
                </CardDescription>
              </div>
              {alreadySaved && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                  <CheckCircle2 className="h-3 w-3" /> Saved offline
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={saveForOffline}
              disabled={saving || justSaved}
              variant={alreadySaved ? "outline" : "default"}
              className="gap-2"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : justSaved ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving…" : justSaved ? "Saved!" : alreadySaved ? "Update saved pack" : "Save for offline"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Saved packs list */}
      {savedList.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            <BookOpen className="h-4 w-4" /> Saved packs ({savedList.length})
          </h2>
          {savedList.map((sp) => (
            <Card key={sp.id} className="overflow-hidden">
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-sm">{sp.title}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3 shrink-0" />
                    {formatDate(sp.savedAt)} · {sp.count} items
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs"
                    onClick={() => setReading(sp)}
                  >
                    <BookOpen className="h-3.5 w-3.5" /> Read
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeOfflinePack(sp.id)}
                    title="Remove from offline storage"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {savedList.length === 0 && !loading && (
        <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
          No units saved yet. Pick a unit above and tap "Save for offline".
        </div>
      )}
    </div>
  );
}
