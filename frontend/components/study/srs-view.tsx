"use client";

import { useEffect, useMemo, useState } from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ComingSoon } from "@/components/content/coming-soon";
import {
  buildCards,
  dueQueue,
  isoDay,
  readSrsStore,
  sm2,
  writeSrsStore,
  type SrsQuality,
  type SrsStore,
} from "@/lib/srs";
import { listGoalSubjects } from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { useSubjectBank } from "./use-subject-bank";
import { SubjectSelect } from "./subject-select";

const GRADES: Array<{ q: SrsQuality; label: string }> = [
  { q: 1, label: "Again" },
  { q: 3, label: "Hard" },
  { q: 4, label: "Good" },
  { q: 5, label: "Easy" },
];

/** /srs: flashcards from concept notes + PYQs (pyq-bank) on an SM-2 schedule. */
export function SrsView() {
  const { goals } = useStudyGoals();
  const fallback = listGoalSubjects()[0]?.key ?? "";
  const [picked, setPicked] = useState<string | null>(null);
  const subjectKey = picked ?? goals.subjects[0] ?? fallback;
  const { bank, loading, failed } = useSubjectBank(subjectKey || null);
  const [store, setStore] = useState<SrsStore>({});
  const [revealed, setRevealed] = useState(false);
  useEffect(() => setStore(readSrsStore()), []);

  const today = isoDay(new Date());
  const cards = useMemo(() => (bank ? buildCards(subjectKey, bank) : []), [bank, subjectKey]);
  const queue = useMemo(() => dueQueue(cards, store, today), [cards, store, today]);
  const current = queue.due[0] ?? queue.fresh[0] ?? null;

  const grade = (q: SrsQuality) => {
    if (!current) return;
    const next = { ...store, [current.id]: sm2(store[current.id], q, today) };
    setStore(next);
    writeSrsStore(next);
    setRevealed(false);
  };

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Layers className="h-6 w-6" /> Spaced repetition
        </h1>
        <p className="text-sm text-muted-foreground">
          Cards come from concept notes and past questions. Review state stays on this device.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="srs-subject">Subject</Label>
        <SubjectSelect
          id="srs-subject"
          value={subjectKey}
          chosen={goals.subjects}
          onChange={(k) => {
            setPicked(k);
            setRevealed(false);
          }}
        />
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading cards…</p>}
      {!loading && (failed || cards.length === 0) && (
        <ComingSoon
          title="Cards for this subject"
          kind="Notes"
          message="No concept notes or past questions are indexed for this subject yet. Cards appear here as the pyq-bank grows."
          backHref="/pyqs"
          backLabel="PYQ bank"
        />
      )}

      {!loading && cards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {current ? (current.kind === "concept" ? "Concept" : current.kind === "pyq" ? "Past question" : "Drill") : "All done"}
            </CardTitle>
            <CardDescription>
              {queue.due.length} due, {queue.fresh.length} new today, {cards.length} cards in deck
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {current ? (
              <>
                <p className="whitespace-pre-wrap text-sm font-medium">{current.front}</p>
                {revealed ? (
                  <>
                    <p className="whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">{current.back}</p>
                    <div className="flex flex-wrap gap-2">
                      {GRADES.map((g) => (
                        <Button key={g.label} variant="outline" onClick={() => grade(g.q)}>
                          {g.label}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <Button onClick={() => setRevealed(true)}>Show answer</Button>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Nothing due. Come back tomorrow.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
