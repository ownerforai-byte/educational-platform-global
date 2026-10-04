"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Download,
  ExternalLink,
  Image as ImageIcon,
  Info,
  Loader2,
  Save,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  fetchImageFacts,
  googleImagesLink,
  type GoogleImageResult,
} from "./google-search";
import { downloadImage } from "./download";

/**
 * DETAILS INTERFACE (owner request 2026-10-04: "best detailed, info fact and
 * create the details interface") — what opens when a Google result is clicked
 * in the Image Hub.
 *
 * Three blocks, richest first:
 *   1. the FULL-SIZE image on a calm backdrop (Google's link, not a thumbnail),
 *   2. the metadata Google actually gave us — title, source host + page,
 *      pixel size and the description line — every field honestly labelled,
 *   3. the VEER FACTS card: 5 official-syllabus facts about the SUBJECT the
 *      picture shows, written by the tutor with the platform's allowlist
 *      policy (the picture itself is never treated as a source of truth).
 *
 * Best-effort by contract: facts resolve to null when no LLM is available,
 * the panel then says so instead of failing the modal; downloads fall back to
 * opening the foreign URL when a blob fetch is blocked by the host.
 */

type Props = {
  result: GoogleImageResult;
  /** The search the result came from — the facts subject and the save prompt. */
  query: string;
  onClose: () => void;
  /** Hub-owned persistence: add to the gallery + account history. */
  onSave?: () => void;
};

type FactsState =
  | { status: "loading" }
  | { status: "ready"; facts: string[] }
  | { status: "unavailable" };

export function ImageDetails({ result, query, onClose, onSave }: Props) {
  const [facts, setFacts] = useState<FactsState>({ status: "loading" });
  const [saved, setSaved] = useState(false);

  const subject = query.trim() || result.title;

  // Facts load once per opened image — never blocking the picture itself.
  useEffect(() => {
    let active = true;
    setFacts({ status: "loading" });
    void fetchImageFacts(subject).then((lines) => {
      if (!active) return;
      setFacts(
        lines && lines.length > 0
          ? { status: "ready", facts: lines }
          : { status: "unavailable" },
      );
    });
    return () => {
      active = false;
    };
  }, [subject]);

  // Escape closes the dialog.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sourceHost = result.host || "";
  const sizeKnown = (result.width ?? 0) > 0 && (result.height ?? 0) > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Image details: ${result.title}`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border/70 bg-card shadow-2xl"
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-500">
              <ImageIcon className="h-3 w-3" />
              Image details
            </p>
            <h2 className="mt-1 truncate text-base font-bold text-foreground" title={result.title}>
              {result.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="shrink-0 rounded-lg border border-border/60 bg-muted/40 p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[1.35fr_1fr]">
          {/* ── The picture, full size ── */}
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- Google's
                full-size link is a foreign host with arbitrary dimensions;
                next/image cannot optimize it. */}
            <img
              src={result.url}
              alt={result.title}
              className="max-h-[52vh] w-full rounded-xl border border-border/60 bg-muted/30 object-contain"
            />
            <div className="flex flex-wrap gap-2">
              {onSave && (
                <button
                  type="button"
                  onClick={() => {
                    if (saved) return;
                    onSave();
                    setSaved(true);
                  }}
                  disabled={saved}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-3.5 py-2 text-xs font-bold text-white transition-all hover:brightness-110 disabled:opacity-70"
                >
                  <Save className="h-3.5 w-3.5" />
                  {saved ? "Saved to history" : "Save to my history"}
                </button>
              )}
              <button
                type="button"
                onClick={() => void downloadImage(result.url, "image-details.png")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
              {result.page && (
                <a
                  href={result.page}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Source page
                </a>
              )}
              <a
                href={googleImagesLink(subject)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
                title="See this search on Google Images"
              >
                <Search className="h-3.5 w-3.5" />
                On Google
              </a>
            </div>
          </div>

          {/* ── Info + facts ── */}
          <div className="space-y-4">
            <section className="space-y-2 rounded-xl border border-border/60 bg-muted/20 p-3.5">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                Image information
              </p>
              <dl className="space-y-1.5 text-xs">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Source</dt>
                  <dd className="min-w-0 flex-1 break-words font-medium text-foreground/90">
                    {sourceHost || "unknown host"}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Size</dt>
                  <dd className="font-mono text-foreground/90">
                    {sizeKnown ? `${result.width} × ${result.height} px` : "not reported"}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Found for</dt>
                  <dd className="min-w-0 flex-1 break-words text-foreground/90">{subject}</dd>
                </div>
              </dl>
              {result.snippet ? (
                <p className="border-t border-border/50 pt-2 text-xs leading-relaxed text-muted-foreground">
                  {result.snippet}
                </p>
              ) : (
                <p className="border-t border-border/50 pt-2 text-xs italic text-muted-foreground/70">
                  No description provided with this result.
                </p>
              )}
            </section>

            <section className="space-y-2 rounded-xl border border-primary/25 bg-primary/5 p-3.5">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                Veer facts
              </p>

              {facts.status === "loading" && (
                <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Writing exam facts about {subject}…
                </p>
              )}

              {facts.status === "ready" && (
                <>
                  <ul className="space-y-1.5">
                    {facts.facts.map((fact, index) => (
                      <li
                        key={`${index}-${fact.slice(0, 24)}`}
                        className="flex gap-2 text-xs leading-relaxed text-foreground/90"
                      >
                        <span className="mt-px font-mono text-[10px] font-bold text-primary">
                          {index + 1}
                        </span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="inline-flex items-center gap-1.5 border-t border-primary/20 pt-2 text-[10px] text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" />
                    Official syllabus sources — the picture is never the source of truth.
                  </p>
                </>
              )}

              {facts.status === "unavailable" && (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Facts are unavailable right now — the image information above
                  still shows everything Google gave us for this result.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
