/**
 * Canonical per-subject identity for the whole app.
 *
 * Historically every page carried its own hand-copied `SUBJECT_THEMES` /
 * `SUBJECT_EMOJI` map, so a subject could render as one glyph on one screen
 * and nothing at all on the next. This module is the single source of truth:
 * a natural symbol per subject plus its accent classes.
 *
 * Palette rule: natural things first (plants, water, stone, sky, soil, fire).
 * The earlier tech set (⚡ 🚀 🛡️ 🔢 ⚛️) read as machine icons, so subject
 * glyphs now favour the physical world. Book-like glyphs (📖 💡 📜 🔬) stay,
 * since they name real objects rather than digital ones.
 */

export type SubjectVisual = {
  /** Natural symbol rendered next to the subject name. */
  glyph: string;
  /** Card ring colour, including hover state. */
  border: string;
  /** Gradient backdrop classes for `bg-gradient-to-br`. */
  bg: string;
  /** Pill / badge classes. */
  badge: string;
  /** Tint for the bare symbol when used inline. */
  text: string;
};

const FALLBACK: SubjectVisual = {
  glyph: "📘",
  border: "border-border/70 hover:border-primary",
  bg: "from-primary/10 via-card to-card",
  badge: "bg-primary/15 text-primary",
  text: "text-primary",
};

const VISUALS: Record<string, SubjectVisual> = {
  mathematics: {
    glyph: "☀️",
    border: "border-violet-500/30 hover:border-violet-500",
    bg: "from-violet-500/10 via-card to-card",
    badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    text: "text-violet-500",
  },
  physics: {
    glyph: "🌌",
    border: "border-sky-500/30 hover:border-sky-500",
    bg: "from-sky-500/10 via-card to-card",
    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    text: "text-sky-500",
  },
  chemistry: {
    glyph: "🧪",
    border: "border-amber-500/30 hover:border-amber-500",
    bg: "from-amber-500/10 via-card to-card",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    text: "text-amber-500",
  },
  biology: {
    glyph: "🌿",
    border: "border-emerald-500/30 hover:border-emerald-500",
    bg: "from-emerald-500/10 via-card to-card",
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    text: "text-emerald-500",
  },
  english: {
    glyph: "📖",
    border: "border-blue-500/30 hover:border-blue-500",
    bg: "from-blue-500/10 via-card to-card",
    badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    text: "text-blue-500",
  },
  nepali: {
    glyph: "🇳🇵",
    border: "border-rose-500/30 hover:border-rose-500",
    bg: "from-rose-500/10 via-card to-card",
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    text: "text-rose-500",
  },
  geography: {
    glyph: "🏔️",
    border: "border-cyan-500/30 hover:border-cyan-500",
    bg: "from-cyan-500/10 via-card to-card",
    badge: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
    text: "text-cyan-500",
  },
  history: {
    glyph: "📜",
    border: "border-orange-500/30 hover:border-orange-500",
    bg: "from-orange-500/10 via-card to-card",
    badge: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
    text: "text-orange-500",
  },
  environment: {
    glyph: "🌲",
    border: "border-lime-500/30 hover:border-lime-500",
    bg: "from-lime-500/10 via-card to-card",
    badge: "bg-lime-500/15 text-lime-600 dark:text-lime-400",
    text: "text-lime-500",
  },
  economics: {
    glyph: "🌾",
    border: "border-indigo-500/30 hover:border-indigo-500",
    bg: "from-indigo-500/10 via-card to-card",
    badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
    text: "text-indigo-500",
  },
  "general knowledge": {
    glyph: "💡",
    border: "border-fuchsia-500/30 hover:border-fuchsia-500",
    bg: "from-fuchsia-500/10 via-card to-card",
    badge: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400",
    text: "text-fuchsia-500",
  },
  "computer science": {
    glyph: "🧠",
    border: "border-teal-500/30 hover:border-teal-500",
    bg: "from-teal-500/10 via-card to-card",
    badge: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
    text: "text-teal-500",
  },
  practical: {
    glyph: "🔬",
    border: "border-emerald-500/30 hover:border-emerald-500",
    bg: "from-emerald-500/10 via-card to-card",
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    text: "text-emerald-500",
  },
};

/**
 * Accepts the many shapes callers hold: slugs (`"physics"`), composite keys
 * (`"11/Physics"`) and display names (`"General Knowledge"`).
 */
function normalizeKey(key: string): string {
  const tail = key.includes("/") ? key.slice(key.lastIndexOf("/") + 1) : key;
  return tail.trim().toLowerCase();
}

export function getSubjectVisual(key?: string | null): SubjectVisual {
  if (!key) return FALLBACK;
  return VISUALS[normalizeKey(key)] ?? FALLBACK;
}

export { VISUALS as SUBJECT_VISUALS };
