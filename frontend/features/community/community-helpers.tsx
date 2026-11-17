import Link from "next/link";
import type { SessionUser } from "@/features/auth/types";
import type { FeedComment, FeedPost } from "@/lib/api/community-feed";
import {
  chipBtn,
  emptyStatePanel,
  ghostLink,
  primaryCta,
  surfaceCardFlat,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";
import { publicErrorMessage } from "@/lib/errors/app-error";
import { AlertCircle, ArrowLeft, Bookmark, MessageSquare, Plus, SearchX } from "lucide-react";

export const POLL_MS = 45_000;
export const MAX_FILES = 4;
export const MAX_BYTES = 3 * 1024 * 1024;
export const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg";

export type BoardView = "feed" | "new" | "post" | "edit" | "mine" | "person" | "unavailable";

export function statusOf(err: unknown): number {
  return typeof (err as { status?: number })?.status === "number" ? (err as { status: number }).status : 0;
}

export function messageOf(err: unknown, fallback = "Something went wrong."): string {
  return publicErrorMessage(err, fallback);
}

export function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function looksLikeQuestion(post: Pick<FeedPost, "title" | "body">): boolean {
  const title = post.title.trim();
  const combined = `${title} ${post.body}`.trim();
  if (combined.includes("?")) return true;
  return /^(how|what|why|when|where|which|can|could|should|is|are|do|does|explain|define)\b/i.test(title);
}

/** Fast plain-text excerpt for feed list rows (avoids running unified/KaTeX per row). */
export function plainExcerpt(markdown: string, maxChars = 180): string {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^[#>*\-\s]+/gm, " ")
    .replace(/[*_~|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (stripped.length <= maxChars) return stripped;
  return `${stripped.slice(0, maxChars).trimEnd()}…`;
}

function sameComments(a?: FeedComment[], b?: FeedComment[]): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (
      a[i].id !== b[i].id ||
      a[i].updatedAt !== b[i].updatedAt ||
      a[i].body !== b[i].body ||
      a[i].author.followingByYou !== b[i].author.followingByYou
    ) {
      return false;
    }
  }
  return true;
}

function samePostSnapshot(a: FeedPost, b: FeedPost): boolean {
  return (
    a.id === b.id &&
    a.updatedAt === b.updatedAt &&
    a.title === b.title &&
    a.body === b.body &&
    a.category === b.category &&
    a.likeCount === b.likeCount &&
    a.likedByYou === b.likedByYou &&
    a.commentCount === b.commentCount &&
    a.author.followingByYou === b.author.followingByYou &&
    a.assistantReply?.posted === b.assistantReply?.posted &&
    a.assistantReply?.canApprove === b.assistantReply?.canApprove &&
    a.attachments.length === b.attachments.length &&
    sameComments(a.comments, b.comments)
  );
}

/**
 * Merge a refreshed post with local UI state (preserving optimistic pending
 * comments) while keeping exact referential identity when nothing changed so
 * memoized feed rows do not re-render on background polls.
 */
export function mergePostSnapshot(local: FeedPost, incoming: FeedPost): FeedPost {
  const localComments = local.comments;
  const incomingComments = incoming.comments;

  let comments: FeedComment[] | undefined = incomingComments ?? localComments;
  let pendingCount = 0;

  if (incomingComments) {
    const pendingExtras = (localComments ?? []).filter(
      (row) =>
        row.id.startsWith("pending-comment-") &&
        !incomingComments.some((item) => item.id === row.id),
    );
    pendingCount = pendingExtras.length;
    comments = pendingExtras.length > 0 ? [...incomingComments, ...pendingExtras] : incomingComments;
  } else if (localComments) {
    pendingCount = localComments.filter((row) => row.id.startsWith("pending-comment-")).length;
  }

  const commentCount = incoming.commentCount + pendingCount;
  const candidate: FeedPost = {
    ...incoming,
    ...(comments !== undefined ? { comments } : {}),
    commentCount,
    assistantReply: incoming.assistantReply ?? local.assistantReply,
  };

  return samePostSnapshot(local, candidate) ? local : candidate;
}

export function mergeById(current: FeedPost[], incoming: FeedPost[]): FeedPost[] {
  const byCurrentId = new Map(current.map((post) => [post.id, post]));
  const seen = new Set(incoming.map((post) => post.id));
  const fresh = incoming.map((post) => {
    const previous = byCurrentId.get(post.id);
    if (!previous) return post;
    return mergePostSnapshot(previous, post);
  });
  const tail = current.filter((post) => !seen.has(post.id));
  const next = tail.length > 0 ? [...fresh, ...tail] : fresh;

  if (
    next.length === current.length &&
    next.every((item, idx) => item === current[idx])
  ) {
    return current;
  }
  return next;
}

export function canModerate(user: SessionUser | null): boolean {
  return user?.role === "pro" || user?.role === "owner";
}

export function CommunityBackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className={ghostLink}>
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}

export function CommunityLoading({ label = "Loading community…" }: { label?: string }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      <div className={cn(surfaceCardFlat, "divide-y divide-border/60 overflow-hidden")}>
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="space-y-2.5 p-4 motion-safe:animate-pulse motion-reduce:animate-none"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="h-3.5 w-36 rounded-md bg-muted/65" />
              <div className="h-3 w-20 rounded-md bg-muted/45" />
            </div>
            <div className="h-4 w-3/4 max-w-md rounded-md bg-muted/60" />
            <div className="h-3 w-5/6 rounded-md bg-muted/45" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommunityUnavailable() {
  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-8 sm:px-4">
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-primary">
          <AlertCircle className="h-5 w-5" aria-hidden />
        </div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">This post is unavailable</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          It may have been removed, or you do not have access to edit it.
        </p>
        <Link href="/ai/community" className={cn(ghostLink, "mt-5")}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Community
        </Link>
      </div>
    </div>
  );
}

export function FeedEmpty({
  mine,
  kind,
  onClearFilters,
}: {
  mine?: boolean;
  kind?: "default" | "mine" | "saved" | "filtered";
  onClearFilters?: () => void;
}) {
  const resolvedKind = kind ?? (mine ? "mine" : "default");

  if (resolvedKind === "saved") {
    return (
      <div className={cn(emptyStatePanel, "space-y-3 p-8 text-center")}>
        <Bookmark className="mx-auto h-9 w-9 text-primary/45" aria-hidden />
        <p className="text-sm font-medium text-foreground">No saved posts</p>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Save useful notes, formulas, and discussions from the feed to revisit them here.
        </p>
        <div className="pt-1">
          <Link href="/ai/community" className={cn(chipBtn, "min-h-11")}>
            Browse public feed
          </Link>
        </div>
      </div>
    );
  }

  if (resolvedKind === "filtered") {
    return (
      <div className={cn(emptyStatePanel, "space-y-3 p-8 text-center")}>
        <SearchX className="mx-auto h-9 w-9 text-primary/45" aria-hidden />
        <p className="text-sm font-medium text-foreground">No matching posts</p>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Try a broader search term or reset your active filters.
        </p>
        {onClearFilters ? (
          <div className="pt-1">
            <button type="button" onClick={onClearFilters} className={cn(chipBtn, "min-h-11")}>
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn(emptyStatePanel, "space-y-3 p-8 text-center")}>
      <MessageSquare className="mx-auto h-9 w-9 text-primary/45" aria-hidden />
      <p className="text-sm font-medium text-foreground">
        {resolvedKind === "mine" ? "You have not published a post yet." : "No posts yet."}
      </p>
      <p className="mx-auto max-w-sm text-sm text-muted-foreground">
        {resolvedKind === "mine"
          ? "Share a study note, worked solution, or question with classmates."
          : "Be the first to share a study note or question."}
      </p>
      <div className="pt-1">
        <Link href="/ai/community/new" className={cn(primaryCta, "min-h-11 px-4 py-2")}>
          <Plus className="h-4 w-4" aria-hidden />
          New post
        </Link>
      </div>
    </div>
  );
}
