import Link from "next/link";
import { BookOpen } from "lucide-react";

export function BiologyShowcase() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Biology</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Study cell biology, genetics, ecology and human physiology through interactive models.
      </p>
      <Link
        href="/lab/biology"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        Explore Biology <BookOpen className="h-4 w-4" />
      </Link>
    </div>
  );
}
