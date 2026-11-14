import Link from "next/link";
import type { SessionUser } from "@/features/auth/types";
import type { FeedPost } from "@/lib/api/community-feed";
import { emptyStatePanel, ghostLink, surfaceCardFlat } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft, MessageSquare } from "lucide-react";

export const POLL_MS = 20_000;
export const MAX_FILES = 4;
export const MAX_BYTES = 3 * 1024 * 1024;
export const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg";

export type BoardView = "feed" | "new" | "post" | "edit" | "mine" | "person" | "unavailable";

export function statusOf(err: unknown): number {
  return typeof (err as { status?: number })?.status === "number" ? (err as { status: number }).status : 0;
}

export function messageOf(err: unknown, fallback = "Something went wrong."): string {
  return err instanceof Error && err.message ? err.message : fallback;
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

export function mergeById(current: FeedPost[], incoming: FeedPost[]): FeedPost[] {
  const seen = new Set(incoming.map((post) => post.id));
  const fresh = incoming.map((post) => {
    const previous = current.find((item) => item.id === post.id);
    if (previous?.comments && !post.comments) return { ...post, comments: previous.comments };
    return post;
  });
  return [...fresh, ...current.filter((post) => !seen.has(post.id))];
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
    <div className="space-y-4" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className={cn(surfaceCardFlat, "space-y-3 p-4 sm:p-5 motion-safe:animate-pulse motion-reduce:animate-none")}
          style={row > 0 ? { animationDelay: `${row * 120}ms` } : undefined}
        >
          <div className="flex gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-muted/70" />
            <div className="min-w-0 flex-1 space-y-2 pt-1">
              <div className="h-3.5 w-32 rounded-md bg-muted/60" />
              <div className="h-2.5 w-24 rounded-md bg-muted/50" />
            </div>
          </div>
          <div className="h-4 w-3/4 max-w-md rounded-md bg-muted/60" />
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded-md bg-muted/45" />
            <div className="h-2.5 w-5/6 rounded-md bg-muted/40" />
          </div>
          <div className="flex gap-2 border-t border-border/50 pt-3">
            <div className="h-7 w-14 rounded-lg bg-muted/50" />
            <div className="h-7 w-20 rounded-lg bg-muted/45" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CommunityUnavailable() {
  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-8 sm:px-4">
      <div className={cn("rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8")}>
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

export function FeedEmpty({ mine }: { mine: boolean }) {
  return (
    <p className={cn(emptyStatePanel, "p-8 text-center text-sm text-muted-foreground")}>
      <MessageSquare className="mx-auto mb-3 h-10 w-10 text-primary/40" aria-hidden />
      {mine ? "You have not published a post yet." : "No posts yet. Be the first to share a study note."}
    </p>
  );
}
