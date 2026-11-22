"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Bot, CheckCircle2, MessageCircle, PenLine, Share2 } from "lucide-react";
import { getPost, sharePath } from "@/lib/api/community-feed";
import { mentionsCommunityBot } from "@/lib/community-bot";
import { ghostLink, primaryCta, surfaceCard } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

export type CommunitySuccessAction =
  | "posted"
  | "updated"
  | "comment"
  | "saved"
  | "shared"
  | "reposted";

const SUCCESS_META: Record<
  CommunitySuccessAction,
  { title: string; body: string; icon: typeof CheckCircle2 }
> = {
  posted: {
    title: "Post published",
    body: "Your post is live on the community feed. Members can like, reply, and save it.",
    icon: CheckCircle2,
  },
  updated: {
    title: "Post updated",
    body: "Your changes are saved. Everyone sees the latest version on the feed.",
    icon: PenLine,
  },
  comment: {
    title: "Reply posted",
    body: "Your comment is visible on the thread. You can keep the conversation going anytime.",
    icon: MessageCircle,
  },
  saved: {
    title: "Post saved",
    body: "This post is on your Saved list so you can find it quickly later.",
    icon: Bookmark,
  },
  shared: {
    title: "Link copied",
    body: "Share the link anywhere—class chats, study groups, or social apps.",
    icon: Share2,
  },
  reposted: {
    title: "Reposted",
    body: "Your repost helps more learners discover this thread.",
    icon: Share2,
  },
};

function parseAction(raw: string | null): CommunitySuccessAction {
  if (raw && raw in SUCCESS_META) return raw as CommunitySuccessAction;
  return "posted";
}

function useVeerReplyStatus(postId: string | null, enabled: boolean) {
  const [state, setState] = useState<"writing" | "replied" | null>(null);

  useEffect(() => {
    if (!postId || !enabled) return;
    let cancelled = false;
    let attempts = 0;
    let timer: number | undefined;

    async function check(): Promise<void> {
      try {
        const detail = await getPost(postId as string);
        const post = detail.post;
        if (cancelled) return;
        if (post) {
          if (post.assistantReply?.posted) {
            setState("replied");
            return;
          }
          if (mentionsCommunityBot(`${post.title}\n${post.body}`)) {
            setState((current) => current ?? "writing");
          }
        }
      } catch {
        /* best-effort status only */
      }
      if (cancelled || attempts >= 12) return;
      attempts += 1;
      timer = window.setTimeout(() => void check(), 2_500);
    }

    void check();
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [postId, enabled]);

  return state;
}

function VeerReplyStatus({ postId }: { postId: string }) {
  const status = useVeerReplyStatus(postId, true);
  const postHref = sharePath(postId);
  if (!status) return null;
  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-[13px] font-medium",
        status === "replied"
          ? "border-primary/30 bg-primary/5 text-primary"
          : "border-border/70 bg-muted/40 text-muted-foreground",
      )}
    >
      {status === "replied" ? (
        <Bot className="h-4 w-4 shrink-0" aria-hidden />
      ) : (
        <span
          className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden
        />
      )}
      {status === "replied" ? (
        <span>
          Veer AI has replied. {" "}
          <Link href={postHref} className="underline underline-offset-2 hover:text-primary">
            Read the reply
          </Link>
        </span>
      ) : (
        <span>Veer AI is writing a reply to your post…</span>
      )}
    </div>
  );
}

export function CommunityActionSuccessView({
  action,
  postId,
}: {
  action?: string | null;
  postId?: string | null;
}) {
  const resolved = parseAction(action ?? null);
  const meta = SUCCESS_META[resolved];
  const Icon = meta.icon;
  const postHref = postId ? sharePath(postId) : null;

  return (
    <div className="mx-auto w-full max-w-lg px-3 py-10 sm:px-4">
      <div className={cn(surfaceCard, "space-y-5 p-6 sm:p-8")}>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-xl font-bold tracking-tight text-foreground">{meta.title}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{meta.body}</p>
        </div>
        {postId && (resolved === "posted" || resolved === "updated") ? (
          <VeerReplyStatus postId={postId} />
        ) : null}
        <div className="flex flex-wrap gap-2 pt-1">
          {postHref ? (
            <Link href={postHref} className={primaryCta}>
              View post
            </Link>
          ) : null}
          <Link href="/ai/community" className={ghostLink}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Community
          </Link>
          {resolved === "saved" ? (
            <Link href="/ai/community?view=saved" className={ghostLink}>
              Open saved posts
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CommunityCelebrationBanner({
  action,
  postId,
  onDismiss,
}: {
  action: CommunitySuccessAction;
  postId?: string;
  onDismiss: () => void;
}) {
  const meta = SUCCESS_META[action];
  const postHref = postId ? sharePath(postId) : null;

  return (
    <div
      className="flex flex-col gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-3 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between"
      role="status"
    >
      <p>
        <span className="font-semibold text-emerald-800 dark:text-emerald-300">{meta.title}.</span>{" "}
        <span className="text-muted-foreground">{meta.body}</span>
      </p>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {postHref ? (
          <Link
            href={`/ai/community/done?action=${action}&postId=${encodeURIComponent(postId!)}`}
            className="text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Details
          </Link>
        ) : null}
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-background/60"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}