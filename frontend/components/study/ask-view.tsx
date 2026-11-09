"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { chat } from "@/lib/api/ai";
import { createThread } from "@/lib/api/community";
import { InteractiveMarkdown } from "@/components/content/interactive-markdown";
import { AiReplyCard } from "@/components/ai/ai-reply-card";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { buildAskPrompt, getCommunitySpace, listCommunitySpaces, MAX_QUESTION_LENGTH, validateQuestion } from "@/lib/community";

/** /ask: question box answered by the Veer tutor, with a live "ask the community" panel. */
export function AskView() {
  const spaces = listCommunitySpaces();
  const initial = getCommunitySpace(useSearchParams().get("space") ?? "")?.id ?? "";
  const [spaceId, setSpaceId] = useState(initial);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [postedThread, setPostedThread] = useState<{ id: string } | null>(null);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

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

  async function postToCommunity() {
    const invalid = validateQuestion(question);
    if (invalid) return setPostError(invalid);
    const space = getCommunitySpace(spaceId);
    if (!space) return setPostError("Pick a subject so the right community sees it.");
    setPostError(null);
    setPosting(true);
    try {
      const title = question.trim().slice(0, 120);
      const res = await createThread(space.id, title, question.trim());
      if (res.migrated && res.thread) {
        setPostedThread({ id: res.thread.id });
      } else {
        setPostError("Discussions are not set up on this deployment yet.");
      }
    } catch (err) {
      setPostError(err instanceof Error ? err.message : "Could not post to the community.");
    } finally {
      setPosting(false);
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
        <AiReplyCard
          title="Veer tutor"
          reply={answer}
          context={{
            surface: "ask",
            subjectName: getCommunitySpace(spaceId)?.subjectName,
            subjectSlug: getCommunitySpace(spaceId)?.subjectSlug,
          }}
        >
          <InteractiveMarkdown content={answer} className="chat-reading" />
        </AiReplyCard>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageCircle className="h-4 w-4" /> Ask the community
          </CardTitle>
          <CardDescription>
            Post the same question to the{" "}
            {getCommunitySpace(spaceId)?.subjectName ?? "subject"} community — classmates answer
            as replies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {postedThread ? (
            <p className="text-sm">
              Posted to the community.{" "}
              <Link
                href={`/community/${spaceId}/${postedThread.id}`}
                className="font-semibold text-primary hover:underline"
              >
                Open the discussion →
              </Link>
            </p>
          ) : (
            <>
              {postError && <p className="text-xs text-destructive">{postError}</p>}
              <button
                type="button"
                onClick={postToCommunity}
                disabled={posting || !spaceId}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted disabled:opacity-50"
              >
                {posting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageCircle className="h-4 w-4" />
                )}
                Post this question to the community
              </button>
              {!spaceId && (
                <p className="text-xs text-muted-foreground">Pick a subject above first.</p>
              )}
            </>
          )}
          <p className="text-xs text-muted-foreground">
            Or browse{" "}
            <Link href="/community" className="font-semibold text-primary hover:underline">
              all community spaces
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
