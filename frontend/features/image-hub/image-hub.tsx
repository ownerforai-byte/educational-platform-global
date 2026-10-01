"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Download,
  ExternalLink,
  Image as ImageIcon,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  requestHubImage,
  type HubEngineFail,
  type HubImageResult,
} from "./generate-image";

/**
 * IMAGE HUB (owner request 2026-10-02): "replace the mind console with
 * agnes 2.1 flash and js to generate image means it is image hub".
 *
 * This is the whole /mind-studio interface now — the diagram workspace is
 * gone. Describe a picture; the server draws it with the Agnes image chain
 * (agnes-image-2.1-flash first), and if that fails the browser retries the
 * same prompt through puter.js. Results accumulate in a gallery that
 * survives reloads (sessionStorage, this device only — the route itself is
 * owner-gated by app/(app)/mind-studio/layout.tsx).
 */

type GalleryItem = HubImageResult & {
  id: string;
  prompt: string;
  at: number;
};

const STORE_KEY = "neb_image_hub_gallery";
const MAX_PROMPT = 500;
const GALLERY_CAP = 24;

const EXAMPLES = [
  "A snow leopard resting on a Himalayan cliff at dawn, photorealistic",
  "NEB physics ray diagram: convex lens with three principal rays",
  "Watercolour plate of a dhaka topi beside a math notebook",
];

function newItem(p: string, result: HubImageResult): GalleryItem {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    prompt: p,
    at: Date.now(),
    ...result,
  };
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

export function ImageHub() {
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState<HubEngineFail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);

  // Restore the gallery after mount (sessionStorage is client-only).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setItems(
          parsed.filter(
            (it): it is GalleryItem =>
              !!it && typeof (it as GalleryItem).url === "string",
          ),
        );
      }
    } catch {
      /* storage blocked — start with an empty gallery */
    }
  }, []);

  const saveItems = (next: GalleryItem[]) => {
    setItems(next);
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(next.slice(0, GALLERY_CAP)));
    } catch {
      /* storage blocked — the in-memory gallery still works */
    }
  };

  async function generate() {
    const p = prompt.trim();
    if (!p || busy) return;
    setError(null);
    setBusy("agnes");
    try {
      const result = await requestHubImage(p, {
        onEngineFail: (engine) => setBusy(engine),
      });
      if (!result) {
        setError(
          "Neither engine could draw this — the Agnes chain may be busy, and the puter.js fallback needs its browser sign-in. Your prompt is kept below; try again.",
        );
        return;
      }
      saveItems([newItem(p, result), ...items]);
      setPrompt("");
    } finally {
      setBusy(null);
    }
  }

  const status =
    busy === "agnes"
      ? "Drawing with Agnes 2.1 Flash…"
      : busy === "puter"
        ? "Agnes unavailable — drawing in your browser with puter.js…"
        : null;

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-lg shadow-violet-500/20">
          <ImageIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Image Hub
            <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-widest rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-violet-500">
              Owner only
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Describe a picture — Agnes 2.1 Flash draws it, puter.js in your
            browser as the fallback.
          </p>
        </div>
      </div>

      {/* ── Composer ── */}
      <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
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
          placeholder="Describe the image you want — subject, style, colours, mood…"
          className="w-full resize-y rounded-xl border border-border/60 bg-background/80 px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/30"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLES.map((ex) => (
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
            {busy ? "Drawing…" : "Draw image"}
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground/70">
          ⌘/Ctrl + Enter to draw · max {MAX_PROMPT} characters
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

      {/* ── Gallery ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Gallery{" "}
          <span className="text-foreground/60">({items.length})</span>
        </h2>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => saveItems([])}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border/60 px-6 py-12 text-center">
          <ImageIcon className="h-9 w-9 text-muted-foreground/50" />
          <p className="text-sm font-semibold text-muted-foreground">
            No images yet
          </p>
          <p className="max-w-md text-xs text-muted-foreground/70">
            Everything you draw lands here — newest first, kept for this
            session with a download button on each picture.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
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
                  <span className="flex gap-1.5 opacity-80 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() =>
                        void downloadImage(
                          item.url,
                          `image-hub-${item.id}.png`,
                        )
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
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
