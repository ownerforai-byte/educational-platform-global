/**
 * Spark access rules for the NEB portal (owner decision 2026-10-12: the only
 * currency word is "spark" — never "coin", never "credit").
 *
 * SPARK BILLING — "charge for actual note or content -- remove for others":
 *   - actual note/content unlocks (theory notes, question/PYQ sets) → 1 spark
 *   - 3D/AR labs, HD visuals, Diagram Hub → FREE (no spark, no lock)
 *
 * Two separate spark pools exist:
 *   - CONTENT SPARK — spent only on note/content unlocks (this file's matrix).
 *   - AI SPARK — informational daily counter shown ONLY at the top of the
 *     Veer chat; chat is free and no AI spark is ever spent.
 *
 * A successful unlock stays open for UNLOCK_WINDOW_SECONDS (20 minutes) and then
 * the module re-locks automatically (no page reload required).
 */

import { PDF_VIEWER_PATH } from "@/lib/pdf-src";

export type ContentCategory = "lab3d" | "visuals" | "theory" | "reference" | "imagehub";

export interface CategoryRule {
  /** Content-spark cost for one 20-minute unlock window (0 = free, no lock). */
  cost: number;
  /** Display label used on unlock overlays. */
  label: string;
  /** Emoji used on the unlock overlay. */
  emoji: string;
}

export const TOKEN_MATRIX: Record<ContentCategory, CategoryRule> = {
  lab3d: {
    cost: 0,
    label: "Interactive Simulation Lab (3D / AR)",
    emoji: "🔬",
  },
  visuals: {
    cost: 0,
    label: "High-Definition Visuals (Infographics, Diagrams, Maps)",
    emoji: "🖼️",
  },
  theory: {
    cost: 1,
    label: "Core Syllabus Notes (actual note)",
    emoji: "📚",
  },
  reference: {
    cost: 1,
    label: "Question & PYQ Sets (actual content)",
    emoji: "📝",
  },
  imagehub: {
    cost: 0,
    label: "Diagram Hub (Drawing Studio)",
    emoji: "🎨",
  },
};

/** Absolute lock window: expiration = current Unix epoch + 1200 seconds. */
export const UNLOCK_WINDOW_SECONDS = 1200;

/**
 * Intercepted-action notice copy.
 *
 * Owner request 2026-10-17 ("change this from box … to login is mentored like
 * at 8:00PM"): the closing line changed from "Login functions work properly
 * only after final administrative verification and system approval." to say
 * login is handled at 8:00 PM. Wording kept close to the owner's own.
 */
export const NOTICE_COPY =
  "Notice: Access to full write privileges requires clearance. Account creation runs on a manual check loop. Login is mentored at 8:00 PM.";

/** Internal portal entry path used by the notice's login button. */
export const LOGIN_PATH = "/login";

/**
 * Routes that stay fully public: home baseline, the credits wallet itself,
 * the quiz (free guest pool), and the profile/progress account surfaces.
 * 2026-09-27: /ai-quiz joins the public list. 2026-10-13: /ai and /chat
 * rejoin it — Veer chat is open to every tier, metered by its own AI sparks
 * (guest 1 / member 7 / plus 25 / pro 50 / owner unlimited per UTC day),
 * never by content sparks, so the coin gate passes them untouched.
 */
export const PUBLIC_PATHS = [
  "/",
  "/home",
  "/login",
  "/signup",
  "/ai-quiz",
  "/ai",
  "/chat",
  "/credits",
  "/profile",
  // Owner request (2026-09-30): the notice board, notifications center, and
  // the PRO plan explanation are never coin-gated — they are read-through pages,
  // reachable by link and header controls. Listed here so the resolver returns
  // null and the gate renders them untouched (never blurred, no lock overlay).
  "/notice",
  "/notifications",
  "/pro-plan",
] as const;

/**
 * Privileged control surfaces (owner/admin/controller) are exempt from the
 * coin gate — they carry their own role checks and must never be blurred for
 * an operator who is mid-session.
 */
export const EXEMPT_PATHS = [
  "/owner",
  "/admin",
  "/controller",
  // The R1 daily-life layer (owner + granted emails) carries its own access
  // gate and is never coin-gated.
  "/r1",
] as const;

const REFERENCE_ROUTES = /^\/(pyqs|quiz|resources|ai-quiz|exam-countdown|progress)(\/|$)/;

function matchesList(pathname: string, list: readonly string[]): boolean {
  return list.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isPublicPath(pathname: string): boolean {
  return matchesList(pathname, PUBLIC_PATHS);
}

/**
 * Map any internal route to the coin category that gates it.
 * Returns null for public routes (home, auth, credits wallet) and exempt
 * privileged surfaces (owner console, owner-only Veer chat).
 *
 * Owner request 2026-10-06: /mind-studio resolves to the `imagehub` category
 * (5 coins) — the Diagram Hub is displayed as a premium coin-gated section,
 * owners open it free (the unlock server charges owner emails 0), and
 * non-owners are refused the unlock entirely (provider + server guard).
 *
 * Everything not matched explicitly falls back to `theory` (1 coin) so that
 * notes, syllabus, theorems, derivations, knowledge hubs and subject pages are
 * all covered by the 1-coin core-chapter rule.
 */
export function categoryForPath(pathname: string): ContentCategory | null {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (isPublicPath(path)) return null;
  if (matchesList(path, EXEMPT_PATHS)) return null;
  // The Diagram Hub: owner-exclusive access card (free — never a spark).
  if (path === "/mind-studio" || path.startsWith("/mind-studio/")) return "imagehub";
  // FREE by policy ("remove for others"): labs, sims, visuals, mindmaps,
  // legends — no category, no lock, no spark.
  if (/^\/(lab|sim|periodic-table|graphs|mindmap|legend|visual)(\/|$)/.test(path)) return null;
  if (REFERENCE_ROUTES.test(path)) return "reference";
  // Everything else is an actual note/content page → the 1-content-spark rule.
  return "theory";
}

/**
 * Unlock-window key for a route.
 *
 * `/pdfs/read` is the viewer tab every document on `/pdfs` opens into (each in
 * its own browser tab). It must share the library's key, otherwise unlocking
 * the PDF Library and then clicking "Open" would charge a second coin in the
 * new tab — the window is persisted per key in `unlock-store.ts`, so one
 * unlock covers the list and every document tab opened from it.
 */
export function creditModuleKey(pathname: string): string {
  const path = pathname.split("?")[0] || "/";
  if (path === PDF_VIEWER_PATH) return "route:/pdfs";
  return `route:${path}`;
}

/** HH:MM:SS formatter for the unlock countdown badge. */
export function formatRemaining(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
