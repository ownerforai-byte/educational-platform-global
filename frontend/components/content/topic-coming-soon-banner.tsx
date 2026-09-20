import { Construction } from "lucide-react";
import Link from "next/link";

/**
 * Compact inline "Coming Soon" banner for syllabus topic pages whose
 * authored notes have not been published yet. Shown above the topic
 * workspace; the mindmap / 3D / syllabus panels below still render.
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
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/5 px-5 py-4"
      data-topic-coming-soon="true"
    >
      <div className="flex items-start gap-3 flex-1">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
          <Construction className="h-4 w-4" />
        </span>
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-foreground">
            Coming Soon — notes in preparation for this topic
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            &ldquo;{topicTitle}&rdquo; is an official syllabus topic. Written notes,
            worked examples and visuals are being authored for it. The syllabus,
            mindmap and any available resources already work below.
          </p>
        </div>
      </div>
      {backHref && (
        <Link
          href={backHref}
          className="shrink-0 self-start rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
        >
          {backLabel ?? "Back"}
        </Link>
      )}
    </div>
  );
}
