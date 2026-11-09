"use client";

/**
 * /community/[id]/[threadId] — one discussion thread: the opening post, its
 * replies and an upvote toggle, all live from /api/community. Authors are
 * masked server-side; this view never sees a raw name or user id.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MessageCircle, Send, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createReply,
  getThread,
  toggleUpvote,
  type CommunityReply,
  type CommunityThread,
} from "@/lib/api/community";

const MAX_BODY = 4000;

export function CommunityThreadView({
  spaceId,
  threadId,
  spaceName,
}: {
  spaceId: string;
  threadId: string;
  spaceName: string;
}) {
  const [thread, setThread] = useState<CommunityThread | null>(null);
  const [replies, setReplies] = useState<CommunityReply[]>([]);
  const [migrated, setMigrated] = useState(true);
  const [failed, setFailed] = useState(false);
  const [missing, setMissing] = useState(false);
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getThread(threadId)
      .then((r) => {
        if (cancelled) return;
        setMigrated(r.migrated);
        if (r.migrated && r.thread) {
          setThread(r.thread);
          setReplies(r.replies);
        } else if (r.migrated) {
          setMissing(true);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if ((err as { status?: number }).status === 404) setMissing(true);
        else setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [threadId]);

  const submit = async () => {
    const clean = body.trim();
    if (clean.length < 1) return setError("Write a reply first.");
    if (clean.length > MAX_BODY) return setError(`Keep the reply under ${MAX_BODY} characters.`);
    setError(null);
    setPosting(true);
    try {
      const res = await createReply(threadId, clean);
      if (res.migrated && res.reply) {
        setReplies((prev) => [...prev, res.reply as CommunityReply]);
        setBody("");
      } else {
        setMigrated(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post the reply.");
    } finally {
      setPosting(false);
    }
  };

  const upvote = async () => {
    try {
      const res = await toggleUpvote(threadId);
      if (!res.migrated) return setMigrated(false);
      setThread((prev) =>
        prev ? { ...prev, upvotes: res.upvotes, upvotedByYou: res.upvotedByYou } : prev,
      );
    } catch {
      /* the vote simply did not register */
    }
  };

  return (
    <div className="space-y-6">
      {failed ? (
        <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          This discussion could not be loaded right now — try again in a moment.
        </p>
      ) : missing ? (
        <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          This discussion does not exist (it may have been deleted by its author).
        </p>
      ) : !migrated ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
          Discussions are not set up on this deployment yet.
        </p>
      ) : !thread ? (
        <p className="flex items-center gap-2 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading discussion…
        </p>
      ) : (
        <>
          <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-foreground">{thread.title}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {thread.author} · {new Date(thread.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={upvote}
                aria-pressed={thread.upvotedByYou}
                aria-label="Upvote this discussion"
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  thread.upvotedByYou
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
                {thread.upvotes}
              </button>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {thread.body}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </p>
          </article>

          <section aria-label="Replies" className="space-y-2">
            {replies.map((reply) => (
              <article
                key={reply.id}
                className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
              >
                <p className="text-xs text-muted-foreground">
                  {reply.author} · {new Date(reply.createdAt).toLocaleString()}
                </p>
                <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {reply.body}
                </p>
              </article>
            ))}
          </section>

          <section aria-label="Write a reply" className="rounded-2xl border border-border bg-card p-4">
            <Label htmlFor="reply-body">Your reply</Label>
            <Textarea
              id="reply-body"
              value={body}
              maxLength={MAX_BODY}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Help your classmate out…"
              rows={3}
              className="mt-1.5"
            />
            {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
            <Button size="sm" className="mt-2 rounded-xl" onClick={submit} disabled={posting}>
              {posting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              Post reply
            </Button>
          </section>
        </>
      )}

      <Link
        href={`/community/${spaceId}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {spaceName} community
      </Link>
    </div>
  );
}
