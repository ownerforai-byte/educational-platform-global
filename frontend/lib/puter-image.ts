"use client";

/**
 * PUTER.JS FALLBACK — the second drawing engine of the "agent picks the
 * engine" policy (owner 2026-09-30): the server-side Agnes image models try
 * first; when they fail, the browser draws the same prompt via Puter.js.
 *
 * Puter.js runs CLIENT-SIDE under the User-Pays model: the student signs in
 * to their own free Puter account and their allocation covers the cost — the
 * platform pays nothing, needs no key and no backend. The first fallback
 * use in a session may trigger puter's sign-in prompt; a declined sign-in
 * (or any error) simply means "no picture" — the answer text is never
 * blocked by a missing figure.
 *
 * The CDN script is loaded lazily on first need (no cost to the bundle or
 * to answers that never need a fallback).
 */

declare global {
  interface Window {
    puter?: {
      ai?: {
      txt2img: (prompt: string, opts?: Record<string, unknown>) => Promise<unknown>;
      chat?: (prompt: string, opts?: Record<string, unknown>) => Promise<unknown>;
    };
      auth?: { isSignedIn: () => boolean; signIn: () => Promise<unknown> };
    };
  }
}

type Puter = NonNullable<Window["puter"]>;
let puterPromise: Promise<Puter | null> | null = null;

/** Lazily load Puter.js exactly once per page. Resolves null when unavailable.
 *  Exported so the text engine (lib/puter-chat.ts) reuses this exact loader —
 *  one <script> tag per page, shared by image and chat fallbacks. */
export function loadPuter(): Promise<Puter | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.puter?.ai?.txt2img) {
    return Promise.resolve(window.puter ?? null);
  }
  if (!puterPromise) {
    puterPromise = new Promise<Puter | null>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://js.puter.com/v2/";
      script.async = true;
      script.onload = () => resolve(window.puter ?? null);
      script.onerror = () => resolve(null);
      document.head.appendChild(script);
      // A dead CDN must never hang a fallback: 20s ceiling.
      setTimeout(() => resolve(window.puter ?? null), 20_000);
    });
  }
  return puterPromise;
}

/**
 * Draw one figure in the student's browser. Returns an image URL (puter hands
 * back a data-URL <img>), or null on any failure — callers treat null as
 * "no picture", never as an error.
 */
export async function drawFigureWithPuter(prompt: string): Promise<string | null> {
  const clean = (prompt ?? "").trim();
  if (!clean) return null;
  try {
    const puter = await loadPuter();
    if (!puter?.ai?.txt2img) return null;

    // The User-Pays model: confirm the student's own allocation on first use.
    if (typeof puter.auth?.isSignedIn === "function" && !puter.auth.isSignedIn()) {
      await puter.auth.signIn();
    }

    const result = await puter.ai.txt2img(clean);
    // txt2img resolves to an <img> element whose src is a data: URL.
    const url =
      (result as { src?: string })?.src ?? (typeof result === "string" ? result : undefined);
    return url && url.length > 0 ? url : null;
  } catch (err) {
    console.warn(
      "[puter-image] fallback draw failed:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}
