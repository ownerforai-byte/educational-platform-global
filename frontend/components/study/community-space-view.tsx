"use client";

/**
 * /community/[id]: one subject space — study links, the Ask board and the
 * peer discussion board. The board is live data (threads, replies, upvotes
 * from /api/community); until the community tables are migrated on a
 * deployment it says so honestly instead of pretending to be a preview.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  HelpCircle,
  Loader2,
  MessageCircle,
  Plus,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createThread,
  listThreads,
  toggleUpvote,
  type CommunityThread,
} from "@/lib/api/community";
import type { CommunitySpace } from "@/lib/community";

const MAX_TITLE = 140;
const MAX_BODY = 4000;

function ThreadRow({
  spaceId,
  thread,
  onUpvote,
}: {
  spaceId: string;
  thread: CommunityThread;
  onUpvote: (threadId: string) => void;
}) {
  return (
    <li className="rounded-xl border border-border/60 bg-card p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/community/${spaceId}/${thread.id}`}
            className="text-sm font-semibold text-foreground hover:text-primary hover:underline"
          >
            {thread.title}
          </Link>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{thread.body}</p>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            {thread.author} · {new Date(thread.createdAt).toLocaleDateString()} ·{" "}
            {thread.replyCount} {thread.replyCount === 1 ? "reply" : "replies"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onUpvote(thread.id)}
          aria-pressed={thread.upvotedByYou}
          aria-label={`Upvote ${thread.title}`}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
            thread.upvotedByYou
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          <ThumbsUp className="h-3 w-3" aria-hidden="true" />
          {thread.upvotes}
        </button>
      </div>
    </li>
  );
}

export function CommunitySpaceView({ space }: { space: CommunitySpace }) {
  const [threads, setThreads] = useState<CommunityThread[] | null>(null);
  const [migrated, setMigrated] = useState(true);
  const [failed, setFailed] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    listThreads(space.id)
      .then((r) => {
        setThreads(r.threads);
        setMigrated(r.migrated);
      })
      .catch(() => setFailed(true));
  };

  useEffect(load, [space.id]);

  const submit = async () => {
    const cleanTitle = title.trim();
    const cleanBody = body.trim();
    if (cleanTitle.length < 4) return setError("Give the discussion a title (at least 4 characters).");
    if (cleanBody.length < 1) return setError("Write something in the body.");
    if (cleanTitle.length > MAX_TITLE || cleanBody.length > MAX_BODY) {
      return setError(`Keep the title under ${MAX_TITLE} and the body under ${MAX_BODY} characters.`);
    }
    setError(null);
    setPosting(true);
    try {
      const res = await createThread(space.id, cleanTitle, cleanBody);
      if (res.migrated && res.thread) {
        setThreads((prev) => [res.thread as CommunityThread, ...(prev ?? [])]);
        setTitle("");
        setBody("");
        setShowComposer(false);
      } else {
        setMigrated(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post the discussion.");
    } finally {
      setPosting(false);
    }
  };

  const upvote = async (threadId: string) => {
    try {
      const res = await toggleUpvote(threadId);
      if (!res.migrated) return setMigrated(false);
      setThreads((prev) =>
        (prev ?? []).map((t) =>
          t.id === threadId
            ? { ...t, upvotes: res.upvotes, upvotedByYou: res.upvotedByYou }
            : t,
        ),
      );
    } catch {
      /* keep the board as-is; the vote simply did not register */
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <nav className="text-sm text-muted-foreground">
        <Link href="/community" className="hover:text-foreground">
          Community
        </Link>{" "}
        / <span className="font-medium text-foreground">{space.title}</span>
      </nav>
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" /> Study this subject
            </CardTitle>
            <CardDescription>Notes, units and past questions for {space.subjectName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={space.subjectHref} className="text-sm font-semibold text-primary hover:underline">
              Open {space.subjectName} →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-4 w-4" /> Stuck on something?
            </CardTitle>
            <CardDescription>Ask the Veer tutor a {space.subjectName} question.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/ask?space=${encodeURIComponent(space.id)}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Go to the Ask board →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Peer discussion board — live threads, replies and upvotes. */}
      <section aria-labelledby="discussions-heading" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="discussions-heading" className="flex items-center gap-2 text-base font-semibold">
            <MessageCircle className="h-4 w-4" /> {space.subjectName} discussions
          </h2>
          {migrated && (
            <Button size="sm" className="rounded-xl" onClick={() => setShowComposer((v) => !v)}>
              <Plus className="h-3.5 w-3.5" /> Start a discussion
            </Button>
          )}
        </div>

        {showComposer && migrated && (
          <Card>
            <CardContent className="space-y-3 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="thread-title">Title</Label>
                <Input
                  id="thread-title"
                  value={title}
                  maxLength={MAX_TITLE}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What is the discussion about?"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="thread-body">Body</Label>
                <Textarea
                  id="thread-body"
                  value={body}
                  maxLength={MAX_BODY}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Explain your question or idea…"
                  rows={4}
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <div className="flex gap-2">
                <Button size="sm" className="rounded-xl" onClick={submit} disabled={posting}>
                  {posting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                  Post discussion
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    setShowComposer(false);
                    setError(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {failed ? (
          <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Discussions could not be loaded right now — try again in a moment.
          </p>
        ) : !migrated ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
            Discussions are not set up on this deployment yet. The board opens as soon as the
            community tables are migrated.
          </p>
        ) : threads === null ? (
          <p className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading discussions…
          </p>
        ) : threads.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
            No discussions yet — start the first {space.subjectName} discussion.
          </p>
        ) : (
          <ul className="space-y-2">
            {threads.map((thread) => (
              <ThreadRow key={thread.id} spaceId={space.id} thread={thread} onUpvote={upvote} />
            ))}
          </ul>
        )}

        <Link
          href="/community"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          All spaces <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  );
}
