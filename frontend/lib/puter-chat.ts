"use client";

/**
 * PUTER.JS TEXT ENGINE — the browser-side half of the platform's
 * "Agnes first, puter.js fallback" policy (owner 2026-09-30), now also used
 * for diagram text generation in Mind Studio.
 *
 * Puter.js runs CLIENT-SIDE under the User-Pays model: the student signs in
 * to their own free Puter account and their allocation covers the cost — the
 * platform pays nothing, needs no key and no backend. The CDN script is the
 * same one lib/puter-image.ts loads, shared through loadPuter().
 *
 * A declined sign-in or any error throws; callers decide what that means
 * (Mind Studio surfaces it alongside the Agnes failure notes).
 */

import { loadPuter } from "./puter-image";

/** Overall ceiling — a diagram can be long, but a dead network must not hang. */
const CHAT_TIMEOUT_MS = 75_000;

/** Pull plain text out of the shapes puter.ai.chat has been seen to return. */
export function extractPuterText(result: unknown): string {
  if (typeof result === "string") return result;
  if (!result || typeof result !== "object") return "";
  const res = result as {
    text?: unknown;
    content?: unknown;
    message?: { content?: unknown };
  };
  const content = res.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) =>
        typeof part === "string"
          ? part
          : typeof (part as { text?: unknown })?.text === "string"
            ? ((part as { text: string }).text)
            : "",
      )
      .join("");
  }
  if (typeof res.text === "string") return res.text;
  if (typeof res.content === "string") return res.content;
  return "";
}

/**
 * Ask puter.js for one completion. Returns the reply text, or throws when
 * puter is unavailable, declines sign-in, answers empty, or times out.
 */
export async function chatWithPuter(prompt: string): Promise<string> {
  const clean = (prompt ?? "").trim();
  if (!clean) throw new Error("Empty prompt");

  const puter = await loadPuter();
  if (!puter?.ai?.chat) throw new Error("puter.js is unavailable");

  // The User-Pays model: confirm the student's own allocation on first use.
  if (typeof puter.auth?.isSignedIn === "function" && !puter.auth.isSignedIn()) {
    await puter.auth.signIn();
  }

  const result = await Promise.race([
    puter.ai.chat(clean),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("puter.js timed out")), CHAT_TIMEOUT_MS),
    ),
  ]);

  const text = extractPuterText(result).trim();
  if (!text) throw new Error("puter.js returned an empty reply");
  return text;
}
