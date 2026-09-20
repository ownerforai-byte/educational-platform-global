import Link from "next/link";
import {
  Construction,
  ChevronRight,
  Sigma,
  BookOpen,
  KeyRound,
  AlertTriangle,
  ExternalLink,
  Scale,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  getHighYieldTopicData,
  hasHighYieldTopicData,
  type HighYieldTopicData,
} from "@/lib/high-yield-topic-facts";

/**
 * Rich syllabus-topic scaffold shown on theorem/derivation pages whose full
 * step-by-step derivation has not been authored yet. Never a bare "Coming
 * Soon": it surfaces the topic's high-yield governing laws, key formulas,
 * terms and traps, plus direct navigation into the topic's full notes.
 */
export function DerivationScaffold({
  topicTitle,
  unitTitle,
  unitId,
  subjectSlug,
  classSlug,
  topicSlug,
  kind,
  backHref,
  backLabel,
}: {
  topicTitle: string;
  unitTitle?: string;
  unitId?: string;
  subjectSlug?: string;
  classSlug?: string;
  topicSlug?: string;
  kind?: "Theorem" | "Proof" | "Derivation";
  backHref?: string;
  backLabel?: string;
}) {
  const hy: HighYieldTopicData | null =
    subjectSlug && topicSlug
      ? getHighYieldTopicData(subjectSlug, topicSlug, topicTitle, unitId)
      : null;
  const hasHy = hasHighYieldTopicData(hy);
  const notesHref =
    classSlug && subjectSlug && unitId && topicSlug
      ? `/${classSlug}/${subjectSlug}/chapters/${unitId}/topics/${topicSlug}`
      : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      {backHref && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={backHref} className="hover:text-foreground">
            {backLabel ?? "Back"}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate">{topicTitle}</span>
        </nav>
      )}

      {/* Header + status */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
            <Construction className="h-3 w-3" />
            Full {kind ?? "Derivation"} Coming Soon
          </span>
          {unitTitle && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
              {unitTitle}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          {topicTitle}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This official NEB syllabus topic is queued for a full step-by-step{" "}
          {(kind ?? "derivation").toLowerCase()} with its special cases. Everything
          already available for it — laws, formulas, definitions, traps and the
          complete notes — is below and inside the linked topic page.
        </p>
      </div>

      {/* High-yield content */}
      {hasHy && hy && (
        <div className="space-y-4">
          {hy.governingLaws.length > 0 && (
            <section className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Scale className="h-3.5 w-3.5 text-primary" />
                Governing Laws &amp; Principles
              </h2>
              <div className="space-y-3">
                {hy.governingLaws.slice(0, 4).map((law, i) => (
                  <div key={i} className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2">
                    <h3 className="text-sm font-bold text-foreground">{law.name}</h3>
                    <div className="rounded-lg bg-background/80 border border-border/50 px-3 py-2 overflow-x-auto">
                      <MathMarkdown content={`$$${law.formula}$$`} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {law.statement}
                      <span className="block mt-1 text-[11px] text-muted-foreground/80">
                        <strong className="text-foreground">Conditions:</strong> {law.conditions}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hy.speedFormulas.length > 0 && (
            <section className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Sigma className="h-3.5 w-3.5 text-primary" />
                Key Formulas
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {hy.speedFormulas.slice(0, 6).map((f, i) => (
                  <div key={i} className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3 space-y-1">
                    <p className="text-xs font-bold text-foreground">{f.name}</p>
                    <div className="rounded-lg bg-background/80 border border-border/50 px-3 py-1.5 overflow-x-auto">
                      <MathMarkdown content={`$${f.formula}$`} />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {f.description}
                      {f.unit ? ` · unit: ${f.unit}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hy.keyTermsAndDefinitions.length > 0 && (
            <section className="rounded-2xl border border-border/80 bg-card p-5 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-primary" />
                Key Terms &amp; Definitions
              </h2>
              <ul className="space-y-2">
                {hy.keyTermsAndDefinitions.slice(0, 5).map((t, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">{t.term}:</span>{" "}
                    {t.definition}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hy.entranceTraps.length > 0 && (
            <section className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                Examination Traps
              </h2>
              <ul className="space-y-1.5">
                {hy.entranceTraps.slice(0, 4).map((t, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-amber-500 font-bold">⚠</span>{" "}
                    <span className="text-foreground font-semibold">{t.trap}</span> — {t.truth}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Navigate into full notes */}
      {notesHref && (
        <Link
          href={notesHref}
          className="group flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 hover:bg-primary/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-bold text-foreground">
                Open the full notes for this topic
              </p>
              <p className="text-xs text-muted-foreground">
                Authored notes, worked examples, visuals and the interactive mindmap
              </p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      )}
    </div>
  );
}
