/**
 * Credit / coin access rules for the NEB portal.
 *
 * Every content segment is locked behind a coin unlock window:
 *   - 3D / AR simulation labs  → 5 coins
 *   - HD visuals (infographics, diagrams, maps) → 2 coins
 *   - core syllabus chapters (theory notes) → 1 coin
 *   - auxiliary reference materials (questions / PYQ sets) → 1 coin
 *
 * A successful unlock stays open for UNLOCK_WINDOW_SECONDS (2 hours) and then
 * the module re-locks automatically (no page reload required).
 */

export type ContentCategory = "lab3d" | "visuals" | "theory" | "reference";

export interface CategoryRule {
  /** Coin cost for one 2-hour unlock window. */
  cost: number;
  /** Display label used on unlock overlays. */
  label: string;
  /** Emoji used on the unlock overlay. */
  emoji: string;
}

export const TOKEN_MATRIX: Record<ContentCategory, CategoryRule> = {
  lab3d: {
    cost: 5,
    label: "Interactive Simulation Lab (3D / AR)",
    emoji: "🔬",
  },
  visuals: {
    cost: 2,
    label: "High-Definition Visuals (Infographics, Diagrams, Maps)",
    emoji: "🖼️",
  },
  theory: {
    cost: 1,
    label: "Core Syllabus Chapter (Theory Notes)",
    emoji: "📚",
  },
  reference: {
    cost: 1,
    label: "Auxiliary Reference Material (Questions / Sets)",
    emoji: "📝",
  },
};

/** Absolute lock window: expiration = current Unix epoch + 7200 seconds. */
export const UNLOCK_WINDOW_SECONDS = 7200;

/**
 * Intercepted-action notice copy. DO NOT CHANGE A SINGLE WORD.
 */
export const NOTICE_COPY =
  "Notice: Access to full write privileges requires clearance. Account creation runs on a manual check loop. Login functions work properly only after final administrative verification and system approval.";

/** Internal portal entry path used by the notice's login button. */
export const LOGIN_PATH = "/login";

/**
 * Routes that stay fully public: home baseline, the AI chat tutor (external
 * sources are allowed there only when the platform vault lacks the answer),
 * and the credits wallet itself.
 */
export const PUBLIC_PATHS = [
  "/",
  "/home",
  "/login",
  "/signup",
  "/chat",
  "/ai",
  "/credits",
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
] as const;

const LAB_ROUTES = /^\/(lab|sim|periodic-table)(\/|$)/;
const VISUAL_ROUTES = /^\/(graphs|mindmap|legend|visual)(\/|$)/;
const REFERENCE_ROUTES = /^\/(pyqs|quiz|resources|ai-quiz|exam-countdown|progress)(\/|$)/;

function matchesList(pathname: string, list: readonly string[]): boolean {
  return list.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isPublicPath(pathname: string): boolean {
  return matchesList(pathname, PUBLIC_PATHS);
}

/**
 * Map any internal route to the coin category that gates it.
 * Returns null for public routes (home, AI chat, auth, credits wallet).
 *
 * Everything not matched explicitly falls back to `theory` (1 coin) so that
 * notes, syllabus, theorems, derivations, knowledge hubs and subject pages are
 * all covered by the 1-coin core-chapter rule.
 */
export function categoryForPath(pathname: string): ContentCategory | null {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (isPublicPath(path)) return null;
  if (matchesList(path, EXEMPT_PATHS)) return null;
  if (LAB_ROUTES.test(path)) return "lab3d";
  if (VISUAL_ROUTES.test(path)) return "visuals";
  if (REFERENCE_ROUTES.test(path)) return "reference";
  return "theory";
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
