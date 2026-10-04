import { apiFetch } from "@/lib/api-client";

/**
 * IMAGE HISTORY CLIENT — the account-saved gallery (owner request 2026-10-04:
 * "enable saving of image for every user … hardcode its history saving").
 *
 * The server draws (/api/ai/image, /api/ai/figure) already save themselves
 * against the signed-in user; this module is the hub's window onto that
 * store — load the gallery on mount, add the one engine the server never sees
 * (puter.js draws in the browser), and clear the account when asked.
 *
 * Every call resolves instead of throwing: a signed-out tab, an unmigrated
 * table or a cold backend degrades to the session-only gallery, never to an
 * error screen.
 */

/** One label + its explanation, as saved from a vector figure's <title> parts. */
export type HistoryFigurePart = { name: string; detail: string };

/** One row of the saved history (GET /api/ai/image-history). */
export type ImageHistoryRow = {
  id: string;
  kind: "figure" | "picture";
  prompt: string;
  url?: string | null;
  svg?: string | null;
  caption?: string | null;
  archetype?: string | null;
  engine?: string | null;
  parts?: HistoryFigurePart[] | null;
  createdAt: string;
};

/** The payload the hub sends to record a browser-drawn (puter.js) picture. */
export type SaveHistoryItem = {
  kind: "figure" | "picture";
  prompt: string;
  url?: string;
  svg?: string;
  caption?: string;
  archetype?: string;
  engine?: string;
  parts?: HistoryFigurePart[];
};

/** Load the signed-in user's saved draws, newest first. */
export async function loadImageHistory(limit = 60): Promise<ImageHistoryRow[]> {
  try {
    const res = await apiFetch<{ items?: ImageHistoryRow[] }>(
      `/api/ai/image-history?limit=${limit}`,
    );
    if (!Array.isArray(res?.items)) return [];
    return res.items.filter(
      (row): row is ImageHistoryRow =>
        !!row && typeof row.id === "string" && (row.kind === "figure" || row.kind === "picture"),
    );
  } catch {
    return [];
  }
}

/** Save one item (used for puter.js results — server engines save themselves). */
export async function saveImageHistoryItem(item: SaveHistoryItem): Promise<boolean> {
  try {
    await apiFetch("/api/ai/image-history", {
      method: "POST",
      body: JSON.stringify(item),
    });
    return true;
  } catch {
    return false;
  }
}

/** Clear the account's whole saved history. */
export async function clearImageHistory(): Promise<boolean> {
  try {
    await apiFetch("/api/ai/image-history", { method: "DELETE" });
    return true;
  } catch {
    return false;
  }
}
