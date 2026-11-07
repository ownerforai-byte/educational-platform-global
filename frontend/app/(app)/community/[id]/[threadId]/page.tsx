import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, ThumbsUp, Reply } from "lucide-react";
import { getCommunitySpace } from "@/lib/community";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; threadId: string }>;
}): Promise<Metadata> {
  const { id, threadId } = await params;
  const space = getCommunitySpace(id);
  const title = threadId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: space ? `${title} — ${space.subjectName} Community` : title,
    description: `Discussion thread in the ${space?.subjectName ?? "community"} study space.`,
  };
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string; threadId: string }>;
}) {
  const { id, threadId } = await params;
  const space = getCommunitySpace(id);
  if (!space) notFound();

  const threadTitle = threadId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href={`/community/${id}`} className="hover:text-foreground">
            {space.title}
          </Link>
          {" / "}
          <span className="text-foreground">{threadTitle}</span>
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{threadTitle}</h1>
      </div>

      {/* Thread posts */}
      <div className="space-y-4">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Student</p>
              <p className="text-xs text-muted-foreground">Started this discussion</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground">
            This is where the original post would appear. The community backend
            is not yet connected — once it is, posts, replies, and upvotes will
            load here in real time.
          </p>
          <div className="mt-4 flex gap-4">
            <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ThumbsUp className="h-4 w-4" />
              Upvote
            </button>
            <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <Reply className="h-4 w-4" />
              Reply
            </button>
          </div>
        </article>
      </div>

      {/* Reply placeholder */}
      <div className="rounded-2xl border border-border bg-muted/40 p-5 text-center">
        <p className="text-sm text-muted-foreground">
          The community discussion backend is being set up. You&apos;ll be able to
          post replies and start threads here once it&apos;s live.
        </p>
        <Link
          href={`/community/${id}`}
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Back to {space.subjectName} community
        </Link>
      </div>

      <Link
        href={`/community/${id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Community
      </Link>
    </div>
  );
}
