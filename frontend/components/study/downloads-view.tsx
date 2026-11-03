"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ComingSoon } from "@/components/content/coming-soon";
import type { FormulaSheetUnit } from "@/lib/formula-sheet";
import { buildUnitPack, packFilename, packItemCount, packToMarkdown } from "@/lib/offline-pack";
import { getSubjectSyllabus } from "@/lib/syllabus";
import { getGrant } from "@/lib/content/grant-store";
import { creditModuleKey } from "@/features/credits/constants";
import { listGoalSubjects } from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { useSubjectBank } from "./use-subject-bank";
import { SubjectSelect } from "./subject-select";

// Mirrors FORMULA_SUBJECTS (lib/formula-sheet.ts is server-only: it reads node:fs).
const FORMULA_SLUGS: string[] = ["physics", "mathematics", "chemistry"];

/** /downloads: offline Markdown packs per unit (notes, PYQs, drills, formulas) from existing readers. */
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

  useEffect(() => {
    setFormulaUnit(null);
    if (!activeUnit || !FORMULA_SLUGS.includes(subjectSlug)) return;
    let cancelled = false;
    const moduleKey = creditModuleKey(window.location.pathname);
    const grant = getGrant(moduleKey);
    if (!grant) return;
    fetch(`/api/formula-unit?subject=${encodeURIComponent(subjectSlug)}&unit=${encodeURIComponent(activeUnit.id)}`, {
      credentials: "include",
      headers: { "X-Unlock-Grant": grant, "X-Unlock-Key": moduleKey },
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ unit: FormulaSheetUnit | null }>) : null))
      .then((r) => !cancelled && setFormulaUnit(r?.unit ?? null))
      .catch(() => !cancelled && setFormulaUnit(null));
    return () => {
      cancelled = true;
    };
  }, [subjectSlug, activeUnit]);

  const pack = useMemo(
    () => (bank && activeUnit ? buildUnitPack(activeUnit.title, activeUnit.id, bank, formulaUnit) : null),
    [bank, activeUnit, formulaUnit],
  );
  const count = pack ? packItemCount(pack) : 0;

  const download = () => {
    if (!pack) return;
    const blob = new Blob([packToMarkdown(pack)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = packFilename(pack.title);
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Download className="h-6 w-6" /> Downloads
        </h1>
        <p className="text-sm text-muted-foreground">
          Offline packs for one unit: concept notes, past questions, drills and formulas in a single Markdown file.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Label htmlFor="dl-subject">Subject</Label>
        <SubjectSelect
          id="dl-subject"
          value={subjectKey}
          chosen={goals.subjects}
          onChange={(k) => {
            setPicked(k);
            setUnitId("");
          }}
        />
        <Label htmlFor="dl-unit">Unit</Label>
        <select
          id="dl-unit"
          className="h-9 rounded-md border bg-background px-2 text-sm"
          value={activeUnit?.id ?? ""}
          onChange={(e) => setUnitId(e.target.value)}
        >
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.title}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Preparing pack…</p>}
      {!loading && (failed || !pack || count === 0) && (
        <ComingSoon
          title="Pack for this unit"
          kind="Notes"
          message="No notes, past questions, drills or formulas are indexed for this unit yet. The pack appears here once the pyq-bank or formula sheet covers it."
          backHref="/pyqs"
          backLabel="PYQ bank"
        />
      )}
      {!loading && pack && count > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{pack.title}</CardTitle>
            <CardDescription>
              {pack.theory.length} concept notes, {pack.pyqs.length} exam years, {pack.drills.length} drills,{" "}
              {pack.formulas.length} formulas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={download}>
              <Download className="mr-2 h-4 w-4" /> Download pack
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
