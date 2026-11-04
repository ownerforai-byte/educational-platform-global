import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";

interface UnderDevelopmentProps {
  title: string;
  description?: string;
  /** Back-link destination. Defaults to "/" */
  backHref?: string;
  backLabel?: string;
}

/**
 * Shared shell for pages that are planned but not yet built.
 * Drop it as the sole child of any stub page.tsx.
 */
export function UnderDevelopment({
  title,
  description,
  backHref = "/",
  backLabel = "Go back",
}: UnderDevelopmentProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
        <Construction className="h-8 w-8" />
      </div>

      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
          Currently under development 🚧, will be added in future update.
        </p>
      </div>

      <Link
        href={backHref}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
    </div>
  );
}
