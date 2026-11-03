"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ComingSoon } from "@/components/content/coming-soon";
import { chat } from "@/lib/api/ai";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { buildAskPrompt, getCommunitySpace, listCommunitySpaces, MAX_QUESTION_LENGTH, validateQuestion } from "@/lib/community";

/** /ask: question box answered by the Veer tutor (existing /api/ai chat); peer answers await a backend. */
export function AskView() {
  const spaces = listCommunitySpaces();
  const initial = getCommunitySpace(useSearchParams().get("space") ?? "")?.id ?? "";
  const [spaceId, setSpaceId] = useState(initial);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    const invalid = validateQuestion(question);
    if (invalid) return setError(invalid);
    setError(null);
    setAnswer(null);
    setBusy(true);
    try {
      const res = await chat([
        { role: "system", content: PLATFORM_SYSTEM_PROMPT },
        { role: "user", content: buildAskPrompt(question, getCommunitySpace(spaceId)?.subjectName) },
      ]);
      setAnswer(res.response);
    } catch {
      setError("The Veer tutor could not answer right now. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Ask a question</h1>
        <p className="text-sm text-muted-foreground">Get an answer from the Veer tutor, grounded in your NEB subject.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your question</CardTitle>
          <CardDescription>One credit is used per answer, the same as the Veer chat.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="ask-space">Subject</Label>
          <select
            id="ask-space"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
            className="block w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="">Any subject</option>
            {spaces.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          <Label htmlFor="ask-question">Question</Label>
          <textarea
            id="ask-question"
            value={question}
            maxLength={MAX_QUESTION_LENGTH}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            className="block w-full rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="e.g. Why does the period of a pendulum not depend on its mass?"
          />
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Ask Veer
          </button>
        </CardContent>
      </Card>
      {answer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Veer tutor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{answer}</p>
          </CardContent>
        </Card>
      )}
      <ComingSoon
        title="Peer answers"
        kind="Notes"
        message="Answers from other students need a community backend, which is not built yet. Tutor answers above work today."
        backHref="/community"
        backLabel="Community"
      />
    </div>
  );
}
