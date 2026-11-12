import { apiFetch } from "@/lib/api-client";

/**
 * Engine order for the Diagram Hub (owner request 2026-10-02: replace the
 * mind console with an image generator). All drawing is SERVER-SIDE — the
 * browser fallback was removed on 2026-11-12, so the platform no longer
 * loads any third-party AI runtime in a student's tab:
 *
 *   1. POST /api/ai/image  → the server's raster image chain.
 *
 * `requestHubFigure` prepends one more server engine for academic requests
 * (owner request 2026-10-03): POST /api/ai/figure draws a labelled VECTOR
 * figure whose parts open their details on hover, and only falls through to
 * the raster chain above when the vector pass draws nothing.
 *
 * Returns null when the server engines fail — the hub shows that as an error
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
  engine: "diagram";
  /** Human label for the gallery badge, e.g. "Diagram". */
  label: string;
  /**
   * Discriminator for the gallery. Optional because a raster result is the
   * only thing `requestHubImage` ever returns; `requestHubFigure` narrows the
   * union with it.
   */
  kind?: "picture";
};

export type HubEngineFail = "figure" | "diagram";

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
  onEngineFail?: (engine: HubEngineFail) => void;
};

export type HubImageDeps = {
  /** Server call (default: POST /api/ai/image). Resolve null on any failure. */
  requestServer?: (
    prompt: string,
  ) => Promise<{ url?: string; model?: string | null } | null>;
  /** Progress hook: fired when an engine gives up. */
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
    // apiFetch throws on 4xx/5xx (engines down, session expired) — the hub
    // reports that honestly instead of silently substituting another engine.
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
  const fromServer = await server(clean);
  if (fromServer?.url) {
    return {
      url: fromServer.url,
      engine: "diagram",
      label: SERVER_DRAW_LABEL,
    };
  }
  deps.onEngineFail?.("diagram");
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
 * part carries `NAME — detail` that opens on hover. The server raster engine
 * stays as the fallback when the vector pass draws nothing.
 *
 * Engine order: figure → server raster. Returns null only when both failed.
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
    onEngineFail: deps.onEngineFail,
  });
}
