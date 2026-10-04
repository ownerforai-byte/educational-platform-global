"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Download,
  ExternalLink,
  History as HistoryIcon,
  Image as ImageIcon,
  ListTree,
  Sparkles,
  Trash2,
} from "lucide-react";
import { InteractiveMarkdown } from "@/components/content/interactive-markdown";
import {
  requestHubFigure,
  requestHubImage,
  type HubEngineFail,
  type HubFigurePart,
  type HubImageResult,
} from "./generate-image";
import {
  clearImageHistory,
  loadImageHistory,
  saveImageHistoryItem,
  type ImageHistoryRow,
} from "./history";

/**
 * IMAGE HUB (owner request 2026-10-02: "replace the mind console with
 * agnes 2.1 flash and js to generate image means it is image hub").
 *
 * OPEN TO EVERY SIGNED-IN STUDENT (owner request 2026-10-04: "enable saving
 * of image for every user") — the former owner-only gate is gone, and the
 * gallery is now the ACCOUNT's saved history, not a device session:
 *
 *   · every server draw (vector figure, Agnes picture) is saved by the
 *     backend itself — hardcoded, no client opt-in;
 *   · browser-drawn puter.js pictures are saved by the hub right after they
 *     land;
 *   · the session cache below stays as the offline/unmigrated fallback.
 *
 * Two modes (owner request 2026-10-03: "train it for all kind of academic
 * images like lifecycle, labelling, all parts name with their interface with
 * supporting details which opens after hovering"):
 *
 *   · ACADEMIC FIGURE (default) — the vector writer draws one exam-grade SVG
 *     in the platform's house style: a life cycle, a labelled structure, an
 *     apparatus, a process, a graph, a circuit, a ray diagram, a free-body
 *     diagram, a geometry figure, a hierarchy, a comparison or a timeline.
 *     Every labelled part is `<g><title>NAME — detail</title>`, so hovering or
 *     tapping a part opens its explanation, and the same legend is listed as
 *     "Parts & details" under the figure.
 *   · PICTURE — the raster chain (Agnes image models, then puter.js in the
 *     browser) for photos, watercolours and anything pictorial.
 */

type Mode = "figure" | "picture";

type GalleryFigure = {
  kind: "figure";
  id: string;
  prompt: string;
  at: number;
  /** The validated SVG source. */
  svg: string;
  caption: string;
  /** Archetype id from the writer ("lifecycle", "labelled", …). */
  archetype: string;
  parts: HubFigurePart[];
};

type GalleryPicture = HubImageResult & {
  kind: "picture";
  id: string;
  prompt: string;
  at: number;
};

type GalleryItem = GalleryFigure | GalleryPicture;

type Filter = "all" | "figure" | "picture";

const STORE_KEY = "neb_image_hub_gallery";
const MAX_PROMPT = 500;
const GALLERY_CAP = 60;
/** sessionStorage holds ~5 MB; keep the payload well under it. */
const STORE_BUDGET = 2_000_000;

const EXAMPLES: Record<Mode, string[]> = {
  figure: [
    "Labelled diagram of the human heart with every part named",
    "Life cycle of Plasmodium with the ploidy at each stage",
    "Free-body diagram of a block sliding down an incline",
    "Graph of binding energy per nucleon versus mass number",
  ],
  picture: [
    "A snow leopard resting on a Himalayan cliff at dawn, photorealistic",
    "Watercolour plate of a dhaka topi beside a math notebook",
    "NEB physics ray diagram: convex lens with three principal rays",
  ],
};

/** Archetype ids → the badge the student reads. */
const ARCHETYPE_LABELS: Record<string, string> = {
  lifecycle: "Life cycle",
  labelled: "Labelled structure",
  apparatus: "Apparatus",
  process: "Process",
  graph: "Graph",
  circuit: "Circuit",
  ray: "Ray diagram",
  "free-body": "Free-body diagram",
  geometry: "Geometry figure",
  hierarchy: "Hierarchy",
  comparison: "Comparison",
  timeline: "Timeline",
  illustration: "Illustration",
};

function archetypeLabel(kind: string): string {
  return ARCHETYPE_LABELS[kind] ?? (kind ? kind.replace(/-/g, " ") : "Figure");
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** "just now" / "4 min ago" / "2 h ago" / "3 d ago" / a date — human, not ISO. */
function timeAgo(at: number): string {
  const seconds = Math.max(1, Math.round((Date.now() - at) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} d ago`;
  return new Date(at).toLocaleDateString();
}

/** Cross-origin safe download: fetch → blob → click; window.open as last resort. */
async function downloadImage(url: string, filename: string): Promise<void> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const blob = await res.blob();
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  } catch {
    window.open(url, "_blank", "noopener");
  }
}

/** A vector figure downloads as the .svg the writer drew. */
function downloadSvg(svg: string, filename: string): void {
  try {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  } catch {
    /* the figure is already on screen — nothing else to do */
  }
}

/** The figure travels through the platform's sanitized figure pipeline. */
function figureMarkdown(item: GalleryFigure): string {
  const caption = item.caption.replace(/[`\r\n]+/g, " ").trim();
  return "```svg " + caption + "\n" + item.svg + "\n```";
}

/**
 * Rebuild one gallery item from the session cache. Runs on untrusted JSON (an
 * old session, a hand-edited value), so it validates and NORMALISES — the `kind`
 * discriminator is re-derived here rather than trusted, and anything that is
 * not a figure or a picture is dropped.
 */
function parseStored(value: unknown): GalleryItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== "string" || typeof item.prompt !== "string") return null;
  const at = typeof item.at === "number" ? item.at : Date.now();

  if (typeof item.svg === "string") {
    return {
      kind: "figure",
      id: item.id,
      prompt: item.prompt,
      at,
      svg: item.svg,
      caption: typeof item.caption === "string" ? item.caption : "",
      archetype: typeof item.archetype === "string" ? item.archetype : "figure",
      parts: Array.isArray(item.parts)
        ? item.parts.filter(
            (part): part is HubFigurePart =>
              !!part && typeof (part as HubFigurePart).name === "string",
          )
        : [],
    };
  }

  if (typeof item.url === "string") {
    return {
      kind: "picture",
      id: item.id,
      prompt: item.prompt,
      at,
      url: item.url,
      engine: item.engine === "puter" ? "puter" : "agnes",
      label: typeof item.label === "string" ? item.label : "picture",
    };
  }

  return null;
}

/** Rebuild one gallery item from a saved history row (server JSON, still validated). */
function parseHistoryRow(row: ImageHistoryRow): GalleryItem | null {
  const at = Date.parse(row.createdAt);
  const prompt = typeof row.prompt === "string" ? row.prompt : "";
  if (row.kind === "figure") {
    if (typeof row.svg !== "string" || !row.svg || !prompt) return null;
    return {
      kind: "figure",
      id: row.id,
      prompt,
      at: Number.isFinite(at) ? at : Date.now(),
      svg: row.svg,
      caption: typeof row.caption === "string" ? row.caption : "",
      archetype: typeof row.archetype === "string" && row.archetype ? row.archetype : "figure",
      parts: Array.isArray(row.parts)
        ? row.parts.filter(
            (part): part is HubFigurePart =>
              !!part && typeof (part as HubFigurePart).name === "string",
          )
        : [],
    };
  }
  if (typeof row.url !== "string" || !row.url || !prompt) return null;
  return {
    kind: "picture",
    id: row.id,
    prompt,
    at: Number.isFinite(at) ? at : Date.now(),
    url: row.url,
    engine: row.engine === "puter" ? "puter" : "agnes",
    label: typeof row.engine === "string" && row.engine ? row.engine : "agnes-image-2.1-flash",
  };
}

/** Dedupe key: the same drawing saved by the server and cached locally matches. */
function itemKey(item: GalleryItem): string {
  return item.kind === "figure" ? `figure|${item.svg}` : `picture|${item.url}`;
}

export function ImageHub() {
  const [mode, setMode] = useState<Mode>("figure");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState<HubEngineFail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // Restore the session cache first (instant paint), then merge the account
  // history on top of it. The account list is the truth — the server saved
  // every server draw — so the session copy only survives when the server
  // never saw the item (e.g. a puter.js save that failed).
  useEffect(() => {
    let local: GalleryItem[] = [];
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          local = parsed
            .map(parseStored)
            .filter((item): item is GalleryItem => item !== null);
        }
      }
    } catch {
      /* storage blocked — start with an empty gallery */
    }
    setItems(local);

    let cancelled = false;
    void loadImageHistory().then((rows) => {
      if (cancelled || rows.length === 0) return;
      const fromServer = rows
        .map(parseHistoryRow)
        .filter((item): item is GalleryItem => item !== null);
      if (fromServer.length === 0) return;
      const seen = new Set(fromServer.map(itemKey));
      const merged = [...fromServer, ...local.filter((item) => !seen.has(itemKey(item)))]
        .sort((a, b) => b.at - a.at)
        .slice(0, GALLERY_CAP);
      setItems(merged);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const saveItems = (next: GalleryItem[]) => {
    setItems(next);
    try {
      // Figures carry their whole drawing, so the payload is capped: newest
      // first, keeping only what fits. The in-memory gallery keeps everything.
      const kept: GalleryItem[] = [];
      let size = 0;
      for (const item of next) {
        if (kept.length >= GALLERY_CAP) break;
        const cost = JSON.stringify(item).length;
        if (size + cost > STORE_BUDGET) break;
        kept.push(item);
        size += cost;
      }
      sessionStorage.setItem(STORE_KEY, JSON.stringify(kept));
    } catch {
      /* storage blocked — the in-memory gallery still works */
    }
  };

  function newFigureItem(p: string, result: Extract<Awaited<ReturnType<typeof requestHubFigure>>, { kind: "figure" }>): GalleryFigure {
    return {
      kind: "figure",
      id: newId(),
      prompt: p,
      at: Date.now(),
      svg: result.svg,
      caption: result.caption,
      archetype: result.archetype,
      parts: result.parts,
    };
  }

  function newPictureItem(p: string, result: HubImageResult): GalleryPicture {
    return { kind: "picture", id: newId(), prompt: p, at: Date.now(), ...result };
  }

  const failedBothEngines =
    "Neither engine could draw this — the figure writer and the Agnes chain may be busy, and the puter.js fallback needs its browser sign-in. Your prompt is kept below; try again.";

  async function generate() {
    const p = prompt.trim();
    if (!p || busy) return;
    setError(null);
    setBusy(mode === "figure" ? "figure" : "agnes");
    try {
      if (mode === "figure") {
        const result = await requestHubFigure(p, {
          onEngineFail: (engine) => setBusy(engine),
        });
        if (!result) {
          setError(failedBothEngines);
          return;
        }
        saveItems([
          result.kind === "figure"
            ? newFigureItem(p, result)
            : newPictureItem(p, result),
          ...items,
        ]);
        // The vector writer and the Agnes chain save themselves server-side;
        // when the raster fallback drew this instead, only this browser holds
        // the picture — so the hub is the one that records it. (A raster
        // result from this chain never carries kind: "figure".)
        if (result.kind !== "figure" && result.engine === "puter") {
          void saveImageHistoryItem({
            kind: "picture",
            prompt: p,
            url: result.url,
            engine: result.label,
          });
        }
        setPrompt("");
        return;
      }

      const result = await requestHubImage(p, {
        onEngineFail: (engine) => setBusy(engine),
      });
      if (!result) {
        setError(failedBothEngines);
        return;
      }
      saveItems([newPictureItem(p, result), ...items]);
      // The Agnes chain saved itself server-side; a puter.js picture exists
      // only in this browser, so the hub is the one that records it.
      if (result.engine === "puter") {
        void saveImageHistoryItem({
          kind: "picture",
          prompt: p,
          url: result.url,
          engine: result.label,
        });
      }
      setPrompt("");
    } finally {
      setBusy(null);
    }
  }

  function clearAll() {
    saveItems([]);
    void clearImageHistory();
  }

  const status =
    busy === "figure"
      ? "Drawing the figure — naming every part…"
      : busy === "agnes"
        ? mode === "figure"
          ? "Figure writer unavailable — drawing with Agnes 2.1 Flash…"
          : "Drawing with Agnes 2.1 Flash…"
        : busy === "puter"
          ? "Agnes unavailable — drawing in your browser with puter.js…"
          : null;

  const figureCount = items.filter((item) => item.kind === "figure").length;
  const pictureCount = items.length - figureCount;
  const shown =
    filter === "all"
      ? items
      : items.filter((item) => item.kind === filter);

  const modeButton = (value: Mode, label: string, hint: string) => (
    <button
      type="button"
      onClick={() => setMode(value)}
      aria-pressed={mode === value}
      title={hint}
      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
        mode === value
          ? "border-violet-500/40 bg-violet-500/15 text-violet-600 dark:text-violet-300"
          : "border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground hover:border-primary/40"
      }`}
    >
      {label}
    </button>
  );

  const filterButton = (value: Filter, label: string, count: number) => (
    <button
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
        filter === value
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {label} <span className="opacity-70">({count})</span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-lg shadow-violet-500/20">
          <ImageIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="flex flex-wrap items-center gap-2 text-2xl font-black tracking-tight">
            Image Hub
            <span className="inline-flex items-center gap-1 align-middle text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-600 dark:text-emerald-300">
              <HistoryIcon className="h-3 w-3" />
              Saved to your account
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Academic figures drawn as labelled vector diagrams — every part
            opens its detail on hover — plus Agnes 2.1 Flash pictures with
            puter.js as the browser fallback. Everything you draw is kept in
            your history, on any device you sign in from.
          </p>
        </div>
      </div>

      {/* ── Composer ── */}
      <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {modeButton(
            "figure",
            "Academic figure",
            "Vector figure: life cycle, labelled structure, apparatus, graph, circuit, ray or free-body diagram…",
          )}
          {modeButton("picture", "Picture", "Agnes 2.1 Flash raster image — photos, art, mood boards")}
          <span className="text-[11px] text-muted-foreground/70">
            {mode === "figure"
              ? "Every part is labelled and hoverable — the details open on hover or tap."
              : "A painted image, no labels."}
          </span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              void generate();
            }
          }}
          maxLength={MAX_PROMPT}
          rows={3}
          placeholder={
            mode === "figure"
              ? "Describe the image or figure you want — e.g. labelled diagram of the nephron, or the life cycle of a fern…"
              : "Describe the image you want — subject, style, colours, mood…"
          }
          className="w-full resize-y rounded-xl border border-border/60 bg-background/80 px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/30"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLES[mode].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setPrompt(ex)}
                className="max-w-[240px] truncate rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                title={ex}
              >
                {ex}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => void generate()}
            disabled={!!busy || !prompt.trim()}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4" />
            {busy ? "Drawing…" : mode === "figure" ? "Draw figure" : "Draw image"}
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground/70">
          ⌘/Ctrl + Enter to draw · max {MAX_PROMPT} characters · every drawing
          is saved to your history automatically
        </p>
      </div>

      {/* ── Status / error ── */}
      {status && (
        <div className="flex items-center gap-2.5 rounded-xl border border-sky-500/25 bg-sky-500/10 px-3.5 py-2.5 text-sm text-sky-600 dark:text-sky-300">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
          {status}
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-sm text-amber-600 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Gallery / history ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Your history{" "}
          <span className="text-foreground/60">({items.length})</span>
        </h2>
        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {filterButton("all", "All", items.length)}
            {figureCount > 0 && filterButton("figure", "Figures", figureCount)}
            {pictureCount > 0 && filterButton("picture", "Pictures", pictureCount)}
            <button
              type="button"
              onClick={clearAll}
              className="ml-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear history
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border/60 px-6 py-12 text-center">
          <ImageIcon className="h-9 w-9 text-muted-foreground/50" />
          <p className="text-sm font-semibold text-muted-foreground">
            No images yet
          </p>
          <p className="max-w-md text-xs text-muted-foreground/70">
            Everything you draw lands here — newest first, saved to your
            account, with hover explanations on every labelled part of a figure
            and a download button on each item.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((item) =>
            item.kind === "figure" ? (
              <figure
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card sm:col-span-2 xl:col-span-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500">
                      {archetypeLabel(item.archetype)} · vector figure
                    </p>
                    {/* The caption itself is rendered by the figure pipeline
                        (its own <figcaption>), so the header carries the
                        request instead of repeating it. */}
                    <p className="truncate text-xs text-muted-foreground" title={item.prompt}>
                      {item.prompt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground/70">
                      {timeAgo(item.at)}
                    </span>
                    <span className="flex gap-1.5 opacity-80 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => downloadSvg(item.svg, `figure-${item.id}.svg`)}
                        className="rounded-lg border border-border/60 bg-muted/40 p-1.5 hover:border-primary/40 hover:text-primary transition-colors"
                        title="Download SVG"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  </div>
                </div>

                <div className="bg-white px-3 py-3">
                  {/* The platform's figure pipeline: sanitized, and every
                      labelled part opens its <title> on hover / focus / tap. */}
                  <InteractiveMarkdown
                    content={figureMarkdown(item)}
                    className="prose-sm max-w-none"
                  />
                </div>

                {item.parts.length > 0 && (
                  <figcaption className="space-y-2 border-t border-border/60 p-3">
                    <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <ListTree className="h-3.5 w-3.5" />
                      Parts &amp; details ({item.parts.length})
                    </p>
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {item.parts.map((part, index) => (
                        <li
                          key={`${index}-${part.name}`}
                          className="rounded-lg border border-border/50 bg-muted/40 px-2.5 py-1.5 text-[11px] leading-relaxed"
                        >
                          <span className="font-semibold text-foreground">
                            {part.name}
                          </span>
                          {part.detail && (
                            <span className="text-muted-foreground"> — {part.detail}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-muted-foreground/70">
                      Hover, focus or tap a labelled part in the figure to open
                      its explanation.
                    </p>
                  </figcaption>
                )}

              </figure>
            ) : (
              <figure
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- runtime engine output: signed https URLs AND data: URLs from puter.js, which next/image cannot optimize */}
                <img
                  src={item.url}
                  alt={item.prompt}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="space-y-2 p-3">
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {item.prompt}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`max-w-[60%] truncate rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        item.engine === "agnes"
                          ? "bg-sky-500/15 text-sky-500"
                          : "bg-emerald-500/15 text-emerald-500"
                      }`}
                      title={item.label}
                    >
                      {item.label}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground/70">
                        {timeAgo(item.at)}
                      </span>
                      <span className="flex gap-1.5 opacity-80 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() =>
                            void downloadImage(item.url, `image-hub-${item.id}.png`)
                          }
                          className="rounded-lg border border-border/60 bg-muted/40 p-1.5 hover:border-primary/40 hover:text-primary transition-colors"
                          title="Download"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-border/60 bg-muted/40 p-1.5 hover:border-primary/40 hover:text-primary transition-colors"
                          title="Open full size"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </span>
                    </span>
                  </div>
                </figcaption>
              </figure>
            ),
          )}
        </div>
      )}
    </div>
  );
}
