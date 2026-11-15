"use client";

import Link from "next/link";
import { MarkdownBody } from "@/features/community/markdown-body";
import { cn } from "@/lib/utils";

/** Bot study answers are for signed-in members only — guests see a blur gate. */
export function MemberOnlyMarkdown({
  text,
  locked,
  className,
}: {
  text: string;
  locked: boolean;
  className?: string;
}) {
  if (!locked) return <MarkdownBody text={text} className={className} />;
  const decoy =
    "Study note preview · general guidance · syllabus-aligned outline · members-only detail.";
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border border-border/70 bg-muted/20", className)}
      data-testid="bot-answer-guest-gate"
    >
      <div className="pointer-events-none select-none blur-md" aria-hidden>
        <MarkdownBody text={decoy} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/75 p-4 text-center backdrop-blur-[2px]">
        <p className="text-xs font-semibold text-foreground">Bot answers are for members</p>
        <p className="max-w-xs text-[11px] text-muted-foreground">
          Community is open to everyone. Sign in to read Community bot replies.
        </p>
        <Link href="/login" className="text-xs font-bold text-primary underline-offset-2 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}