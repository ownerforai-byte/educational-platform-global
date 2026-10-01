import { apiFetch } from "@/lib/api-client";
import { drawFigureWithPuter } from "@/lib/puter-image";

/**
 * Engine order for the Image Hub (owner request 2026-10-02: "agnes 2.1
 * flash and js to generate image"). Exactly the platform's established
 * policy — SERVER first, BROWSER second:
 *
 *   1. POST /api/ai/image  → Agnes image chain (agnes-image-2.1-flash →
 *      2.0-flash), owner-gated server-side.
 *   2. puter.js txt2img    → the User-Pays browser fallback, used when the
 *      server endpoint fails for ANY reason (403, 503 engines down, network).
 *
 * Returns null only when BOTH engines fail — the hub shows that as an error
 * and keeps the prompt, never losing the student's (owner's) text.
 *
 * The default engines are injected so tests can pin the order without a
 * network or a DOM.
 */

export type HubImageResult = {
  url: string;
  engine: "agnes" | "puter";
  /** Human label for the gallery badge, e.g. "agnes-image-2.1-flash". */
  label: string;
};

export type HubEngineFail = "agnes" | "puter";

export type HubImageDeps = {
  /** Server call (default: POST /api/ai/image). Resolve null on any failure. */
  requestServer?: (
    prompt: string,
  ) => Promise<{ url?: string; model?: string | null } | null>;
  /** Browser call (default: puter.js txt2img). Resolve null on failure. */
  drawWithPuter?: (prompt: string) => Promise<string | null>;
  /** Progress hook: fired when an engine gives up, before the next tries. */
  onEngineFail?: (engine: HubEngineFail) => void;
};

async function defaultRequestServer(
  prompt: string,
): Promise<{ url?: string; model?: string | null } | null> {
  try {
    return await apiFetch<{ url?: string; model?: string | null }>(
      "/api/ai/image",
      { method: "POST", body: JSON.stringify({ prompt }) },
    );
  } catch {
    // apiFetch throws on 4xx/5xx (engines down, session expired) — that is
    // exactly when the browser fallback takes over.
    return null;
  }
}

export async function requestHubImage(
  prompt: string,
  deps: HubImageDeps = {},
): Promise<HubImageResult | null> {
  const clean = prompt.trim();
  if (!clean) return null;

  const server = deps.requestServer ?? defaultRequestServer;
  const puter = deps.drawWithPuter ?? drawFigureWithPuter;

  const fromServer = await server(clean);
  if (fromServer?.url) {
    return {
      url: fromServer.url,
      engine: "agnes",
      label: fromServer.model || "agnes-image-2.1-flash",
    };
  }
  deps.onEngineFail?.("agnes");

  const fromPuter = await puter(clean);
  if (fromPuter) {
    return { url: fromPuter, engine: "puter", label: "puter.js (browser)" };
  }
  deps.onEngineFail?.("puter");
  return null;
}
