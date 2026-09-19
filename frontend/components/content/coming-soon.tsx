import Link from "next/link";
import { Construction, ChevronRight } from "lucide-react";

/**
 * Universal "Coming Soon" placeholder shown on routed theorem/proof/
 * derivation pages whose content has not been authored yet.
 */
export function ComingSoon({
  title,
  unitTitle,
  subjectSlug,
  classSlug,
  kind = "Theorem",
  backHref,
  backLabel,
}: {
  title: string;
  unitTitle?: string;
  subjectSlug?: string;
  classSlug?: string;
  kind?: "Theorem" | "Proof" | "Derivation";
  backHref?: string;
  backLabel?: string;
}) {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      {backHref && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={backHref} className="hover:text-foreground">
            {backLabel ?? "Back"}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-foreground truncate">{title}</span>
        </nav>
      )}

      <div className="rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/5 p-8 sm:p-10 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
          <Construction className="h-7 w-7" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {(unitTitle || subjectSlug) && (
          <p className="text-sm text-muted-foreground">
            {unitTitle ? `${unitTitle} · ` : ""}
            {subjectSlug ? cap(subjectSlug) : ""}
            {classSlug ? ` · ${cap(classSlug.replace("-notes", ""))}` : ""}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <Construction className="h-3 w-3" />
          {kind} Coming Soon
        </span>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          This page is reserved on the official syllabus track. Step-by-step
          content is being authored and will appear here soon.
        </p>
        {backHref && (
          <Link
            href={backHref}
            className="inline-block text-sm font-semibold text-primary hover:underline"
          >
            ← {backLabel ?? "Back"}
          </Link>
        )}
      </div>
    </div>
  );
}
