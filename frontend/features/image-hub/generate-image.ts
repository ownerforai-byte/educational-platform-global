import { apiFetch } from "@/lib/api-client";
import { drawFigureWithPuter } from "@/lib/puter-image";

/**
 * Engine order for the Diagram Hub (owner request 2026-10-02: replace the
 * mind console with an image generator). Exactly the platform's established
 * policy — SERVER first, BROWSER second:
 *
 *   1. POST /api/ai/image  → the server's raster image chain, owner-gated
 *      server-side.
 *   2. puter.js txt2img    → the User-Pays browser fallback, used when the
 *      server endpoint fails for ANY reason (403, 503 engines down, network).
 *
 * `requestHubFigure` prepends one more server engine for academic requests
 * (owner request 2026-10-03): POST /api/ai/figure draws a labelled VECTOR
 * figure whose parts open their details on hover, and only falls through to
 * the raster chain above when the vector pass draws nothing.
 *
 * Returns null only when BOTH engines fail — the hub shows that as an error
 * and keeps the prompt, never losing the student's (owner's) text.
 *
 * The default engines are injected so tests can pin the order without a
 * network or a DOM.
 */

/**
 * The badge the hub shows for anything the server drew. The server persists
 * whatever model answered, which is a vendor id the owner asked never to see
 * (2026-10-07) — so the UI names the engine by what it does.
 */
export const SERVER_DRAW_LABEL = "Diagram";

export type HubImageResult = {
  url: string;
  engine: "diagram" | "puter";
  /** Human label for the gallery badge, e.g. "Diagram". */
  label: string;
  /**
   * Discriminator for the gallery. Optional because a raster result is the
   * only thing `requestHubImage` ever returns; `requestHubFigure` narrows the
   * union with it.
   */
  kind?: "picture";
};

export type HubEngineFail = "figure" | "diagram" | "puter";

/** One hoverable part of a vector figure: the label and its one-line detail. */
export type HubFigurePart = { name: string; detail: string };

/** A vector academic figure — every labelled part opens its detail on hover. */
export type HubFigureResult = {
  kind: "figure";
  /** The validated SVG source, rendered through the platform's figure pipeline. */
  svg: string;
  caption: string;
  /** Archetype the request was classified into ("Labelled structure", …). */
  archetype: string;
  parts: HubFigurePart[];
  engine: "vector";
  label: string;
};

export type HubFigureDeps = {
  /** Vector call (default: POST /api/ai/figure). Resolve null on any failure. */
  requestFigure?: (
    prompt: string,
  ) => Promise<{
    svg?: string;
    caption?: string;
    kind?: string;
    parts?: HubFigurePart[];
  } | null>;
  /** Raster chain, used when the vector pass produced nothing. */
  requestServer?: HubImageDeps["requestServer"];
  drawWithPuter?: HubImageDeps["drawWithPuter"];
  onEngineFail?: (engine: HubEngineFail) => void;
};

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
      engine: "diagram",
      label: SERVER_DRAW_LABEL,
    };
  }
  deps.onEngineFail?.("diagram");

  const fromPuter = await puter(clean);
  if (fromPuter) {
    return { url: fromPuter, engine: "puter", label: "puter.js (browser)" };
  }
  deps.onEngineFail?.("puter");
  return null;
}

async function defaultRequestFigure(
  prompt: string,
): Promise<{ svg?: string; caption?: string; kind?: string; parts?: HubFigurePart[] } | null> {
  try {
    return await apiFetch<{
      svg?: string;
      caption?: string;
      kind?: string;
      parts?: HubFigurePart[];
    }>("/api/ai/figure", { method: "POST", body: JSON.stringify({ prompt }) });
  } catch {
    return null;
  }
}

/**
 * Academic figures (owner request 2026-10-03): "train it for all kind of
 * academic images like lifecycle, labelling, all parts name with their interface
 * with supporting details which opens after hovering".
 *
 * A raster painter cannot spell, so it can never deliver "every part named" —
 * the VECTOR writer is tried first and returns one SVG in which each labelled
 * part carries `NAME — detail` that opens on hover. The raster chain stays as
 * the fallback: if the vector pass fails, the picture engines (server raster →
 * puter.js) draw the same prompt, so the owner always gets an image.
 *
 * Engine order: figure → server raster → puter.js. Returns null only when all
 * three failed.
 */
export async function requestHubFigure(
  prompt: string,
  deps: HubFigureDeps = {},
): Promise<HubFigureResult | HubImageResult | null> {
  const clean = prompt.trim();
  if (!clean) return null;

  const figure = deps.requestFigure ?? defaultRequestFigure;
  const fromFigure = await figure(clean);
  if (fromFigure?.svg) {
    return {
      kind: "figure",
      svg: fromFigure.svg,
      caption: fromFigure.caption?.trim() || clean,
      archetype: fromFigure.kind?.trim() || "figure",
      parts: Array.isArray(fromFigure.parts) ? fromFigure.parts : [],
      engine: "vector",
      label: "vector figure",
    };
  }
  deps.onEngineFail?.("figure");

  return requestHubImage(clean, {
    requestServer: deps.requestServer,
    drawWithPuter: deps.drawWithPuter,
    onEngineFail: deps.onEngineFail,
  });
}
