import { NotebookPen } from "lucide-react";
import Link from "next/link";

import { UnderProgressNotice } from "@/components/content/under-progress";

/**
 * Compact inline "under progress" banner for syllabus topic pages whose
 * authored notes have not been published yet (owner 2026-10-12: "if not note
 * then add like under progress will be added in future update with meaningful
 * icons"). Shown above the topic workspace; the mindmap / 3D / syllabus panels
 * below still render.
 */
export function TopicComingSoonBanner({
  topicTitle,
  backHref,
  backLabel,
}: {
  topicTitle: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3" data-topic-coming-soon="true">
      <UnderProgressNotice
        className="flex-1"
        icon={<NotebookPen className="h-4 w-4" />}
        title="Topic notes under progress — will be added in a future update"
        description={`\u201C${topicTitle}\u201D is an official syllabus topic. Written notes, worked examples and visuals are under progress and will be added in a future update. The syllabus, mindmap and any available resources already work below.`}
      />
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex min-h-11 shrink-0 items-center self-start rounded-lg border border-border/80 bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {backLabel ?? "Back"}
        </Link>
      )}
    </div>
  );
}
